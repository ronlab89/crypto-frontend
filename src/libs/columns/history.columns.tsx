import { createColumnHelper, type ColumnDef } from "@tanstack/react-table";

import dayjs from "dayjs";
import "dayjs/locale/es";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { formatterus } from "../utils/formatter";
import type { itemData } from "@/store/toggle.store";
dayjs.extend(localizedFormat);

const columnHelper = createColumnHelper<itemData>();

export const cryptoHistoryColumns = [
  columnHelper.accessor("id", {
    header: "ID",
    cell: ({ row }) => <span>{row?.original?.id}</span>,
  }),
  columnHelper.accessor("name", {
    header: "Nombre",
    cell: ({ row }) => <span>{row?.original?.name}</span>,
  }),
  columnHelper.accessor("symbol", {
    header: "Símbolo",
    cell: ({ row }) => {
      return <span>{row?.original?.symbol}</span>;
    },
  }),
  columnHelper.accessor("price", {
    header: "Precio actual (USD)",
    cell: ({ row }) => {
      const price = row?.original?.price;
      return <span>{formatterus.format(price)}</span>;
    },
  }),
  columnHelper.accessor("market_cap", {
    header: "Capitalización (USD)",
    cell: ({ row }) => {
      const cap = row?.original?.market_cap;
      return <span>{formatterus.format(cap)}</span>;
    },
  }),
  columnHelper.accessor("createdAt", {
    header: "Actualizado",
    cell: ({ row }) => {
      const updatedAt = row?.original?.createdAt;
      return (
        <span className="">
          {updatedAt ? dayjs(updatedAt).locale("es").format("LL") : "--"}
        </span>
      );
    },
  }),
] as ColumnDef<itemData, unknown>[];
