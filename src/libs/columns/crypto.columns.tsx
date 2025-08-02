import IndeterminateCheckbox from "@/components/ui/IndeterminateCheckbox";
import type { Crypto } from "@/types/crypto";
import { createColumnHelper, type ColumnDef } from "@tanstack/react-table";

import dayjs from "dayjs";
import "dayjs/locale/es";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { formatterus } from "../utils/formatter";
dayjs.extend(localizedFormat);

const columnHelper = createColumnHelper<Crypto>();

export const customersColumns = [
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
