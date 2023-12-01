use futures::StreamExt;
use sqlx::PgPool;

use crate::{check_if_exist, get_all_at, EntityType, RecordWithIDAndNEAR, VendorFields};

pub async fn get_contributors_from_app(pool: &PgPool) -> anyhow::Result<Vec<VendorFields>> {
    let vendors = sqlx::query!(
        r#"
        SELECT *
        FROM vendors
        "#,
    )
    .fetch_all(pool)
    .await?;

    Ok(vendors
        .into_iter()
        .map(|vendor| VendorFields {
            id: vendor.id,
            name: vendor.name,
            email: "".to_string(),
            founders: vendor
                .permissions
                .as_object()
                .unwrap()
                .keys()
                .cloned()
                .collect::<Vec<_>>()
                .join(","),
            vendor_type: vendor.vendor_type,
            payments: vendor
                .payments
                .into_iter()
                .map(|p| {
                    p.strip_prefix('\"')
                        .unwrap()
                        .strip_suffix('\"')
                        .unwrap()
                        .to_string()
                })
                .collect::<Vec<_>>(),
            source: vec!["Horizon".to_string()],
        })
        .collect::<Vec<_>>())
}

pub async fn get_contributors_for_deletion(
    client: &reqwest::Client,
    url: &str,
) -> anyhow::Result<Vec<String>> {
    let in_airtable =
        get_all_at::<RecordWithIDAndNEAR>(&client, &format!("{url}?fields%5B%5D=NEAR")).await?;

    let exist = futures::stream::iter(
        in_airtable
            .iter()
            .filter(|record| !record.near.is_empty())
            .map(|record| {
                check_if_exist(
                    &client,
                    "https://beta.app.hzn.xyz",
                    EntityType::Contributor,
                    &record.near,
                )
            }),
    )
    .buffer_unordered(10)
    .collect::<Vec<_>>()
    .await;

    let not_exist = exist
        .into_iter()
        .filter_map(|res| res.ok())
        .filter_map(|(exist, id)| (!exist).then_some(id))
        .collect::<Vec<_>>();

    Ok(in_airtable
        .into_iter()
        .filter_map(|record| not_exist.contains(&record.near).then_some(record.id))
        .collect::<Vec<_>>())
}
