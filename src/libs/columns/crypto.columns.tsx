import type { Crypto } from "@/types/crypto";
import { createColumnHelper, type ColumnDef } from "@tanstack/react-table";

import dayjs from "dayjs";
import "dayjs/locale/es";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { formatterus } from "../utils/formatter";
import SelectButton from "@/components/table/SelectButton";
dayjs.extend(localizedFormat);

const columnHelper = createColumnHelper<Crypto>();

export const cryptoPublicColumns = [
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <IndeterminateCheckbox
  //       {...{
  //         checked: table.getIsAllRowsSelected(),
  //         indeterminate: table.getIsSomeRowsSelected(),
  //         onChange: table.getToggleAllRowsSelectedHandler(),
  //       }}
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <div className="px-1">
  //       <IndeterminateCheckbox
  //         {...{
  //           checked: row.getIsSelected(),
  //           disabled: !row.getCanSelect(),
  //           indeterminate: row.getIsSomeSelected(),
  //           onChange: row.getToggleSelectedHandler(),
  //         }}
  //       />
  //     </div>
  //   ),
  // },
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
  columnHelper.accessor("quote.USD.market_cap", {
    header: "Capitalización (USD)",
    cell: ({ row }) => {
      const cap = row?.original?.quote?.USD?.market_cap;
      return <span>{formatterus.format(cap)}</span>;
    },
  }),
  columnHelper.accessor("quote.USD.price", {
    header: "Precio actual (USD)",
    cell: ({ row }) => {
      const price = row?.original?.quote?.USD?.price;
      return <span>{formatterus.format(price)}</span>;
    },
  }),
  columnHelper.accessor("quote.USD", {
    header: "Actualizado",
    cell: ({ row }) => {
      const updatedAt = row?.original?.last_updated;
      return (
        <span>
          {updatedAt ? dayjs(updatedAt).locale("es").format("LL") : "--"}
        </span>
      );
    },
  }),
  columnHelper.display({
    id: "acciones",
    header: "",
    cell: ({ row }) => <SelectButton crypto={row.original.symbol} />,
  }),
] as ColumnDef<Crypto, unknown>[];

export const cryptoSelectedColumns = [
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <IndeterminateCheckbox
  //       {...{
  //         checked: table.getIsAllRowsSelected(),
  //         indeterminate: table.getIsSomeRowsSelected(),
  //         onChange: table.getToggleAllRowsSelectedHandler(),
  //       }}
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <div className="px-1">
  //       <IndeterminateCheckbox
  //         {...{
  //           checked: row.getIsSelected(),
  //           disabled: !row.getCanSelect(),
  //           indeterminate: row.getIsSomeSelected(),
  //           onChange: row.getToggleSelectedHandler(),
  //         }}
  //       />
  //     </div>
  //   ),
  // },
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
  columnHelper.display({
    id: "acciones",
    header: "",
    cell: ({ row }) => (
      <div className="w-full h-full flex justify-center items-center">
        <SelectButton crypto={row.original.id} />,
      </div>
    ),
  }),
] as ColumnDef<Crypto, unknown>[];
