import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { sortBy } from "~/lib/constants/filters";

export function SortSelect({
  sort,
  setSort,
}: {
  sort: keyof typeof sortBy;
  setSort: (sort: keyof typeof sortBy) => void;
}) {
  return (
    <div className="flex flex-row items-center justify-end gap-2">
      <b className="whitespace-nowrap">Sort by:</b>
      <Select
        value={sort}
        onValueChange={(sort: keyof typeof sortBy) => setSort(sort)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(sortBy).map(([key, value]) => (
            <SelectItem value={key} key={key}>
              {value}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
