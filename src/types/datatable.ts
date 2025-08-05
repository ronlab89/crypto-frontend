import type { ColumnDef } from "@tanstack/react-table";

export interface DataTableProps<T> {
  data: T[];
  columns: ColumnDef<T, unknown>[];
  filter?: boolean;
  search?: boolean;
  pagination?: boolean;
  initialPages?: number;
}
