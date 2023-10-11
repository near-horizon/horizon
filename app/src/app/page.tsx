import { ListPageLayout } from "./list-page-layout";
import { HomeLoader } from "./home-loader";

export default function HomePage() {
  return (
    <ListPageLayout title="Explore NEAR Horizon">
      <HomeLoader />
    </ListPageLayout>
  );
}
