import { redirect } from "next/navigation";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { env } from "~/env.mjs";
import { getStats } from "~/lib/server/transactions";
import { getUserFromSession } from "~/lib/session";

export default async function AdminPage() {
  const user = await getUserFromSession();

  if (!user || !user.admin) {
    return redirect("/");
  }

  /* eslint-disable @typescript-eslint/no-unsafe-assignment */
  const [
    { average: avg, completed },
    { completed: completed90 },
    data,
    fulfillment,
    avgTx,
    avgReq,
    { average },
    /* eslint-enable @typescript-eslint/no-unsafe-assignment */
  ] = await Promise.all([
    fetch(`${env.API_URL}/data/metrics?above=100`).then((res) => res.json()),
    fetch(`${env.API_URL}/data/metrics?above=90`).then((res) => res.json()),
    getStats(),
    fetch(`${env.API_URL}/data/metrics/average/fulfillment`).then((res) =>
      res.json()
    ),
    fetch(`${env.API_URL}/data/metrics/average/project/transactions`).then(
      (res) => res.json()
    ),
    fetch(`${env.API_URL}/data/metrics/average/project/requests`).then((res) =>
      res.json()
    ),
    fetch(`${env.API_URL}/data/metrics/average/project/mau`).then((res) =>
      res.json()
    ),
  ]);

  return (
    <Table>
      <TableCaption>Horizon Marketplace Metrics</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="">Metric name</TableHead>
          <TableHead className="text-right">Metric value</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Avarage completion</TableCell>
          <TableCell className="text-right">
            {Number(avg).toLocaleString("en-US", {
              style: "percent",
              maximumFractionDigits: 2,
            })}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Count of projects with completed profiles</TableCell>
          <TableCell className="text-right">{completed}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Count of projects with 90% completed profiles</TableCell>
          <TableCell className="text-right">{completed90}</TableCell>
        </TableRow>
        {Object.entries(data).map(([key, value]) => {
          return (
            <TableRow key={key}>
              <TableCell>Number of {key}</TableCell>
              <TableCell className="text-right">{value}</TableCell>
            </TableRow>
          );
        })}
        <TableRow>
          <TableCell>Avarage days to fulfillment</TableCell>
          <TableCell className="text-right">{fulfillment}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Avarage number of transactions per project</TableCell>
          <TableCell className="text-right">
            {Number(avgTx).toLocaleString("en-US", {
              maximumFractionDigits: 2,
            })}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Avarage number of requests per project</TableCell>
          <TableCell className="text-right">
            {Number(avgReq).toLocaleString("en-US", {
              maximumFractionDigits: 2,
            })}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Avarage MAU per project</TableCell>
          <TableCell className="text-right">
            {Number(average).toLocaleString("en-US", {
              maximumFractionDigits: 2,
            })}
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
