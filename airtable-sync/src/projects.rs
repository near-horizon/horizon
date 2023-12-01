use futures::StreamExt;
use sqlx::PgPool;

use crate::{check_if_exist, get_all_at, EntityType, ProjectFields, RecordWithIDAndNEAR};

pub async fn get_projects_from_app(pool: &PgPool) -> anyhow::Result<Vec<ProjectFields>> {
    let projects = sqlx::query!(
        r#"
        SELECT *
        FROM projects
        "#,
    )
    .fetch_all(pool)
    .await?;

    Ok(projects
        .into_iter()
        .map(|project| ProjectFields {
            name: project.name,
            founders: project.founders.join(","),
            email: "".to_string(),
            id: project.id,
            verticals: project
                .vertical
                .as_object()
                .unwrap()
                .keys()
                .cloned()
                .collect::<Vec<String>>(),
            stage: project.stage,
            location: project.geo,
            source: vec!["Horizon".to_string()],
        })
        .collect::<Vec<_>>())
}

pub async fn get_projects_for_deletion(
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
                    EntityType::Project,
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
