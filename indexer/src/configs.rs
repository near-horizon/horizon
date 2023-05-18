use tracing_subscriber::EnvFilter;

pub(crate) fn init_logging() {
    let env_filter = EnvFilter::new("near_lake_framework=info");
    tracing_subscriber::fmt::Subscriber::builder()
        .with_env_filter(env_filter)
        .with_writer(std::io::stderr)
        .init();
}
