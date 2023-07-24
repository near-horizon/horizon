# Time metrics

This binary crate captures metrics for each day since the 2023/06/06 up to the day
it is ran on.

Here are the steps this program goes through:

1. Download [pg_dump](https://www.postgresql.org/docs/current/app-pgdump.html)
   files from the AWS S3 bucket which contains daily snapshots of the Horizon database.
2. Decompress dumps
3. Restore the dumps in a local docker container and capture the metrics
   (analogous to the metrics seen in the [metrics.rs](../api/src/routes/data/metrics.rs)
   file) and store the result in a CSV file.
