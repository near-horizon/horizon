#![warn(clippy::all, clippy::pedantic)]

mod metrics;

use aws_sdk_s3 as s3;
use chrono::TimeZone;
use futures::StreamExt;
use std::{io::Write, process};

fn ensure_env(name: &str) -> String {
    std::env::var(name).unwrap_or_else(|_| panic!("{name} must be set"))
}

async fn get_key(client: &s3::Client, bucket: &str, prefix: String) -> Option<String> {
    let list = client
        .list_objects_v2()
        .bucket(bucket)
        .prefix(prefix)
        .send()
        .await
        .unwrap_or_else(|e| panic!("Failed to list objects {e:?}"));

    let objects = list.contents()?;

    let key = objects.first()?.key()?.to_owned();

    Some(key)
}

async fn download_file(client: &s3::Client, bucket: &str, key: &str) -> Vec<u8> {
    let backup = client
        .get_object()
        .bucket(bucket)
        .key(key)
        .send()
        .await
        .unwrap_or_else(|e| panic!("Failed to get backup {e:?}"));

    let Ok(body) = backup.body.collect().await else {
        panic!("Failed to get backup body");
    };

    body.to_vec()
}

async fn decompress_file(path: String) -> Result<(), Box<dyn std::error::Error>> {
    let status = tokio::process::Command::new("gzip")
        .arg("--decompress")
        .arg("--force")
        .arg(path)
        .status()
        .await?;

    assert!(status.success(), "Failed to decompress backup");

    Ok(())
}

async fn create_path(path: String) -> Result<(), Box<dyn std::error::Error>> {
    tokio::fs::create_dir_all(path).await?;

    Ok(())
}

fn restore_backup(file: &str) -> Result<(), Box<dyn std::error::Error>> {
    let mut psql = process::Command::new("psql")
        .arg("-h")
        .arg(ensure_env("PGHOST"))
        .arg("-p")
        .arg(ensure_env("PGPORT"))
        .arg("-U")
        .arg(ensure_env("PGUSER"))
        .arg("-w")
        .stdin(std::process::Stdio::piped())
        .spawn()
        .unwrap_or_else(|e| panic!("Failed to spawn psql {e:?}"));

    psql.stdin
        .as_mut()
        .unwrap_or_else(|| panic!("Stdin of psql not captured"))
        .write_all(file.as_bytes())
        .unwrap_or_else(|e| panic!("Failed to write to psql stdin {e:?}"));

    psql.wait()
        .unwrap_or_else(|e| panic!("Failed to wait for psql {e:?}"));

    Ok(())
}

#[tokio::main]
async fn main() {
    let config = aws_config::load_from_env().await;
    let client = s3::Client::new(&config);
    let bucket = ensure_env("AWS_S3_BUCKET");
    let _: String = ensure_env("PGPASSWORD");
    let start_date = chrono::Utc.with_ymd_and_hms(2023, 6, 6, 0, 0, 0).unwrap();
    let end_date = chrono::Utc::now();
    let days_count = end_date.signed_duration_since(start_date).num_days();

    let keys = futures::stream::iter((0..=days_count).map(|day| {
        let date = start_date
            .checked_add_days(chrono::Days::new(day.try_into().unwrap()))
            .unwrap_or_else(|| panic!("Failed to add days"));
        let prefix = date.format("%Y/%m/%d").to_string();
        get_key(&client, &bucket, prefix)
    }))
    .buffer_unordered(10)
    .collect::<Vec<_>>()
    .await
    .into_iter()
    .flatten()
    .collect::<Vec<_>>();

    let mut files = futures::stream::iter(keys.into_iter().map(|key| async {
        let file = download_file(&client, &bucket, &key).await;

        create_path(key.split('/').take(3).collect::<Vec<_>>().join("/"))
            .await
            .unwrap_or_else(|_| panic!("Failed to create backup directory"));
        tokio::fs::write(key.clone(), file)
            .await
            .unwrap_or_else(|e| panic!("Failed to write backup to disk {e:?}"));

        let clone = key.clone();

        decompress_file(key)
            .await
            .unwrap_or_else(|e| panic!("Failed to decompress backup {e:?}"));

        let path = clone.strip_suffix(".gz").unwrap().to_string();

        (
            path.clone(),
            tokio::fs::read_to_string(path.clone())
                .await
                .unwrap_or_else(|e| panic!("Failed to read backup from disk {e:?} {path:?}",)),
        )
    }))
    .buffer_unordered(10)
    .collect::<Vec<_>>()
    .await;

    files.sort_by(|(a, _), (b, _)| a.cmp(b));

    let pool = sqlx::postgres::PgPoolOptions::new()
        .connect("postgres://admin:admin@localhost:5432/admin")
        .await
        .unwrap_or_else(|e| {
            panic!("Failed to connect to database {e:?}");
        });

    let mut writer = csv::Writer::from_path("metrics.csv").unwrap();

    for (path, file) in files {
        println!("Restoring backup {path}");

        restore_backup(&file).unwrap_or_else(|e| {
            panic!("Failed to restore backup {e:?}");
        });

        println!("Restored backup {path}");

        let mut metrics = metrics::get(&pool).await.unwrap_or_else(|e| {
            panic!("Failed to get metrics {e:?}");
        });

        metrics.date = path.split('/').take(3).collect::<Vec<_>>().join("/");

        writer
            .serialize(metrics)
            .unwrap_or_else(|e| panic!("Failed to serialize metrics {e:?}"));

        println!("Captured metrics");
    }

    writer
        .flush()
        .unwrap_or_else(|e| panic!("Failed to flush metrics {e:?}"));
}
