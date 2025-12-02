import {
  Dialog as UiDialog,
  DialogTrigger as UiDialogTrigger,
  DialogPortal as UiDialogPortal,
  DialogClose as UiDialogClose,
  DialogOverlay as UiDialogOverlay,
  DialogContent as UiDialogContent,
} from "@components/ui/dialog";
import * as DialogPrimitive from "@radix-ui/react-dialog";

function Dialog(props: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return <UiDialog {...props} />;
}

function DialogTrigger(
  props: React.ComponentProps<typeof DialogPrimitive.Trigger>
) {
  return <UiDialogTrigger {...props} />;
}

function DialogPortal(
  props: React.ComponentProps<typeof DialogPrimitive.Portal>
) {
  return <UiDialogPortal {...props} />;
}

function DialogClose(
  props: React.ComponentProps<typeof DialogPrimitive.Close>
) {
  return <UiDialogClose {...props} />;
}

function DialogOverlay(
  props: React.ComponentProps<typeof DialogPrimitive.Overlay>
) {
  return <UiDialogOverlay {...props} />;
}

function DialogContent(
  props: React.ComponentProps<typeof DialogPrimitive.Content>
) {
  return <UiDialogContent {...props} />;
}

export {
  Dialog,
  DialogTrigger,
  DialogPortal,
  DialogClose,
  DialogOverlay,
  DialogContent,
};
