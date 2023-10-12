import { ListPageLayout } from "./list-page-layout";
import { Home } from "./home";

export default function HomePage() {
  return (
    <ListPageLayout title="Explore NEAR Horizon">
      <Home />
    </ListPageLayout>
  );
}
