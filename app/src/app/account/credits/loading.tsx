import { Skeleton } from "~/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
export default function Loading() {
  return (
    <Table>
      <TableHeader className="bg-gray-50">
        <TableRow className="font-semiBold text-xs text-gray-600">
          <TableHead>
            <Skeleton className="h-12 w-full rounded-none" />
          </TableHead>
          <TableHead>
            <Skeleton className="h-12 w-full rounded-none" />
          </TableHead>
          <TableHead>
            <Skeleton className="h-12 w-full rounded-none" />
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {[...Array(5).keys()].map((key) => (
          <TableRow key={key}>
            <TableCell>
              <Skeleton className="roundednone h-12 w-full rounded-none" />
            </TableCell>
            <TableCell>
              <Skeleton className="roundednone h-12 w-full rounded-none" />
            </TableCell>
            <TableCell>
              <Skeleton className="roundednone h-12 w-full rounded-none" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
