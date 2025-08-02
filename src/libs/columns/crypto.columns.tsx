import IndeterminateCheckbox from "@/components/ui/IndeterminateCheckbox";
import { createColumnHelper, type ColumnDef } from "@tanstack/react-table";

import dayjs from "dayjs";
import "dayjs/locale/es";
import localizedFormat from "dayjs/plugin/localizedFormat";
dayjs.extend(localizedFormat);

export interface Crypto {
  id: string;
  name: string;
  symbol: string;
  slug: string;
  num_market_pairs: number;
  date_added: string;
  tags: string[];
  max_supply: number;
  circulating_supply: number;
  total_supply: number;
  platform: string;
  cmc_rank: number;
  last_updated: string;
  quote: {
    USD: {
      price: number;
      volume_24h: number;
      market_cap: number;
      percent_change_1h: number;
      percent_change_24h: number;
      percent_change_7d: number;
      percent_change_30d: number;
      percent_change_60d: number;
      percent_change_90d: number;
      last_updated: string;
    };
  };
}

const columnHelper = createColumnHelper<Crypto>();

export const customersColumns = [
  {
    id: "select",
    header: ({ table }) => (
      <IndeterminateCheckbox
        {...{
          checked: table.getIsAllRowsSelected(),
          indeterminate: table.getIsSomeRowsSelected(),
          onChange: table.getToggleAllRowsSelectedHandler(),
        }}
      />
    ),
    cell: ({ row }) => (
      <div className="px-1">
        <IndeterminateCheckbox
          {...{
            checked: row.getIsSelected(),
            disabled: !row.getCanSelect(),
            indeterminate: row.getIsSomeSelected(),
            onChange: row.getToggleSelectedHandler(),
          }}
        />
      </div>
    ),
  },
  columnHelper.accessor("id", {
    header: "ID",
    cell: ({ row }) => <span>{row?.original?.id}</span>,
  }),
  columnHelper.accessor("name", {
    header: "Nombre",
    cell: ({ row }) => (
      //   <span
      //     onClick={() =>
      //       handleCopyText(row.original.email, "el correo electrónico")
      //     }
      //     className="cursor-pointer hover:text-dizlogik-700"
      //   >
      //     {row.original.email}
      //   </span>
      <span>{row?.original?.name}</span>
    ),
  }),
  columnHelper.accessor("symbol", {
    header: "Símbolo",
    cell: ({ row }) => {
      return <span>{row?.original?.symbol}</span>;
    },
  }),

  columnHelper.accessor("date_added", {
    header: "Fecha de agregado",
    cell: ({ row }) => {
      const createdAt = row?.original?.date_added;
      return (
        <span>
          {createdAt ? dayjs(createdAt).locale("es").format("LLL") : "--"}
        </span>
      );
    },
  }),
  columnHelper.accessor("quote.USD", {
    header: "Actualizado",
    cell: ({ row }) => {
      const updatedAt = row?.original?.last_updated;
      return (
        <span>
          {updatedAt ? dayjs(updatedAt).locale("es").format("LLL") : "--"}
        </span>
      );
    },
  }),
  columnHelper.display({
    id: "acciones",
    header: "",
    cell: ({ row }) => (
      <div className="flex justify-center gap-2 relative">
        {/* <Suspense fallback={""}>
          <Modal
            trigger={
              <span className="text-dizlogik-700 hover:text-dizlogik-800 cursor-pointer">
                <Edit width={18} height={18} styles={""} />
              </span>
            }
            stylesTrigger=""
            title="Editar cliente"
          >
            <Form type="edit" user={row.original} />
          </Modal>
        </Suspense>
        <Suspense fallback={""}>
          <Modal
            trigger={
              <span className="text-dizlogik-700 hover:text-dizlogik-800 cursor-pointer">
                <Delete width={18} height={18} styles={""} />
              </span>
            }
            stylesTrigger=""
            title="Eliminar cliente"
          >
            <FormDelete type="delete-user" user={row.original} />
          </Modal>
        </Suspense> */}
      </div>
    ),
  }),
] as ColumnDef<Crypto, unknown>[];
