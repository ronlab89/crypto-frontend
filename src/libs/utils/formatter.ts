import dayjs from "dayjs";
import "dayjs/locale/es";
import localizedFormat from "dayjs/plugin/localizedFormat";
dayjs.extend(localizedFormat);

const formatterco: Intl.NumberFormat = new Intl.NumberFormat("es", {
  style: "currency",
  currency: "COP",
});

const formatterus: Intl.NumberFormat = new Intl.NumberFormat("en", {
  style: "currency",
  currency: "USD",
});

const formatterDate = (date: string | undefined, type: string) => {
  if (type === "calendar") {
    return dayjs(date).locale("es").format("MMMM D, YYYY");
  }
  if (type === "time") {
    return dayjs(date).locale("es").format("HH:mm");
  }
  if (type === "date") {
    return dayjs(date).locale("es").format("LL");
  }
  if (type === "days") {
    return `${date} días habiles.`;
  }
};

export { formatterco, formatterus, formatterDate };
