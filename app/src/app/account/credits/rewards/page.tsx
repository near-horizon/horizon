import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { getIncentives } from "~/lib/client/incentives";

export default async function Page() {
  const incentives = await getIncentives();

  return (
    <Table>
      <TableHeader className="bg-gray-50">
        <TableRow className="font-semiBold text-xs text-gray-600">
          <TableHead className="w-2/3">Description</TableHead>
          <TableHead>Reward</TableHead>
          <TableHead>Claiming terms</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Object.entries(incentives).map(([key, value]) => {
          const [frequency, amount] = value;
          return (
            <TableRow key={key}>
              <TableCell className=" font-semiBold text-sm text-text-link">
                {key}
              </TableCell>
              <TableCell className="text-sm font-semibold text-primary-pressed">
                +{amount} NHZN
              </TableCell>
              <TableCell className="text-xs font-normal text-ui-elements-black">
                {frequency}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
