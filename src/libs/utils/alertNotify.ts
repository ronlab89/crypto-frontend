import { Toaster, toast } from "sonner";

type NotifyType =
  | "description"
  | "success"
  | "warning"
  | "error"
  | "sonner"
  | "action"
  | "promise";

const notify = (
  type: NotifyType,
  text: string,
  description?: string
): void => {
  if (type === "description") {
    toast.message(text, { description });
  }

  if (type === "success") {
    toast.success(text);
  }

  if (type === "warning") {
    toast.warning(text);
  }

  if (type === "error") {
    toast.error(text);
  }

  if (type === "sonner") {
    toast(text);
  }

  if (type === "action") {
    toast(text, {
      action: {
        label: "Deshacer",
        onClick: () => console.log("Undo"),
      },
    });
  }

  if (type === "promise") {
    const promise = () =>
      new Promise<{ name: string }>((resolve) =>
        setTimeout(() => resolve({ name: "Sonner" }), 2000)
      );

    toast.promise(promise, {
      loading: "Consultando...",
      success: (data) => `${data.name} ${description ?? ""}`,
      error: "Error",
    });
  }
};

export { Toaster, notify };
