use aws_sdk_s3 as s3;
use tokio::process;

fn ensure_env(name: &str) -> String {
    std::env::var(name).unwrap_or_else(|_| panic!("{name} must be set"))
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

#[tokio::main]
async fn main() {
    let config = aws_config::load_from_env().await;
    let client = s3::Client::new(&config);
    let bucket = ensure_env("AWS_S3_BUCKET");
    // let list = client
    //     .list_objects_v2()
    //     .bucket(bucket)
    //     .send()
    //     .await
    //     .unwrap_or_else(|e| panic!("Failed to list objects {e:?}"));

    let file = download_file(&client, &bucket, "2023/06/06").await;

    std::fs::write("backup.sql.gz", file)
        .unwrap_or_else(|e| panic!("Failed to write backup to disk {e:?}"));

    process::Command::new("gzip")
        .arg("--decompress")
        .arg("backup.sql.gz")
        .status()
        .await
        .unwrap_or_else(|e| panic!("Failed to unzip backup {e:?}"));
}
