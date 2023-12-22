import { redirect } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { getIncentives } from "~/lib/client/incentives";
import { DATE } from "~/lib/format";
import { getFilteredTransactions } from "~/lib/server/transactions";
import { getUserFromSession } from "~/lib/session";
import type { Incentives } from "~/lib/validation/incentives";

export default async function Page() {
  const user = await getUserFromSession();

  if (!user.loggedIn) {
    return redirect("/login");
  }

  const [transactions, incentives] = await Promise.all([
    getFilteredTransactions(user.accountId),
    getIncentives(),
  ]);

  return (
    <Table>
      <TableHeader className="bg-gray-50">
        <TableRow className="font-semiBold text-xs text-gray-600">
          <TableHead>Date</TableHead>
          <TableHead className="w-2/3">Transaction</TableHead>
          <TableHead>Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((tx) => (
          <TableRow key={tx.id}>
            <TableCell className=" text-xs font-normal text-text-dark">
              {DATE.date(tx.timestamp).replace(/\//g, ".")}
            </TableCell>
            <TableCell className="text-sm font-semibold text-gray-900">
              {tx.args.incentive as string}
            </TableCell>
            <TableCell className="text-sm font-semibold text-primary-pressed">
              +{incentives[tx.args.incentive as keyof Incentives]?.[1]} NHZN
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
