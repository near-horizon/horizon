import { InfoTooltip } from "~/components/info-tooltip";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

export function DashboardCard({
  help,
  title,
  description,
  children,
}: {
  help?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-start gap-4 bg-ui-elements-light p-4">
        <CardTitle className="text-lg">{title}</CardTitle>
        {help && <InfoTooltip>{help}</InfoTooltip>}
      </CardHeader>
      <CardContent>
        {description && <CardDescription>{description}</CardDescription>}
        {children}
      </CardContent>
    </Card>
  );
}
