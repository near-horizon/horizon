use num_traits::{FromPrimitive, ToPrimitive};
use serde::Serialize;
use sqlx::{types::BigDecimal, PgPool};

#[derive(Debug, Serialize)]
pub struct Metrics {
    pub date: String,
    completed: i64,
    completed_90: i64,
    avarage: f64,
    projects: i64,
    vendors: i64,
    backers: i64,
    requests: i64,
    proposals: i64,
    contributions: i64,
    avarage_transactions_per_project: f64,
    avarage_requests_per_project: f64,
    avarage_mau_without_max: f64,
    avarage_mau: f64,
}

#[allow(clippy::too_many_lines)]
pub async fn get(pool: &PgPool) -> Result<Metrics, Box<dyn std::error::Error>> {
    let metrics = sqlx::query!(
        r#"
        SELECT
          (
            SELECT
              COUNT(*) AS completed
            FROM
              projects
            WHERE
              completion >= 1
          ) AS completed,
          (
            SELECT
              COUNT(*) AS completed
            FROM
              projects
            WHERE
              completion >= 0.9
          ) AS completed_90,
          (
            SELECT
              AVG(completion) AS avarage
            FROM
              projects
          ) AS avarage,
          (
            SELECT
              COUNT(*)
            FROM
              projects
          ) AS projects,
          (
            SELECT
              COUNT(*)
            FROM
              vendors
          ) AS vendors,
          (
            SELECT
              COUNT(*)
            FROM
              investors
          ) AS backers,
          (
            SELECT
              COUNT(*)
            FROM
              requests
          ) AS requests,
          (
            SELECT
              COUNT(*)
            FROM
              proposals
          ) AS proposals,
          (
            SELECT
              COUNT(*)
            FROM
              contributions
          ) AS contributions,
          (
            SELECT
              AVG(count) AS count
            FROM
              (
                SELECT
                  COUNT(*) AS count,
                  COALESCE(args ->> 'project_id', args ->> 'account_id') AS project_id
                FROM
                  transactions
                WHERE
                  method_name IN (
                    'add_project',
                    'edit_project',
                    'remove_project',
                    'add_founders',
                    'remove_founders',
                    'add_team',
                    'remove_team',
                    'add_request',
                    'edit_request',
                    'remove_request',
                    'reject_proposal',
                    'add_contribution',
                    'remove_contribution',
                    'add_contribution_action',
                    'complete_contribution',
                    'add_vendor_feedback',
                    'accept_claim',
                    'reject_claim'
                  )
                GROUP BY
                  COALESCE(args ->> 'project_id', args ->> 'account_id')
              ) AS counts
          ) AS avarage_transactions_per_project,
          (
            SELECT
              AVG(count) AS count
            FROM
              projects
              LEFT JOIN (
                SELECT
                  COUNT(*) AS count,
                  project_id
                FROM
                  requests
                GROUP BY
                  project_id
              ) AS counts ON projects.id = counts.project_id
          ) AS avarage_requests_per_project,
          (
            SELECT
              AVG(userbase) AS count
            FROM
              projects
            WHERE
              userbase < (
                SELECT
                  MAX(userbase)
                FROM
                  projects
              )
          ) AS avarage_mau_without_max,
          (
            SELECT
              AVG(userbase) AS count
            FROM
              projects
          ) AS avarage_mau
        "#,
    )
    .fetch_one(pool)
    .await?;

    Ok(Metrics {
        date: String::new(),
        completed: metrics.completed.unwrap_or(0),
        completed_90: metrics.completed_90.unwrap_or(0),
        avarage: metrics.avarage.unwrap_or(0.0),
        projects: metrics.projects.unwrap_or(0),
        vendors: metrics.vendors.unwrap_or(0),
        backers: metrics.backers.unwrap_or(0),
        requests: metrics.requests.unwrap_or(0),
        proposals: metrics.proposals.unwrap_or(0),
        contributions: metrics.contributions.unwrap_or(0),
        avarage_transactions_per_project: metrics
            .avarage_transactions_per_project
            .unwrap_or(BigDecimal::from_u8(0).unwrap())
            .to_f64()
            .unwrap_or(0.0),
        avarage_requests_per_project: metrics
            .avarage_requests_per_project
            .unwrap_or(BigDecimal::from_u8(0).unwrap())
            .to_f64()
            .unwrap_or(0.0),
        avarage_mau_without_max: metrics
            .avarage_mau_without_max
            .unwrap_or(BigDecimal::from_u8(0).unwrap())
            .to_f64()
            .unwrap_or(0.0),
        avarage_mau: metrics
            .avarage_mau
            .unwrap_or(BigDecimal::from_u8(0).unwrap())
            .to_f64()
            .unwrap_or(0.0),
    })
}
