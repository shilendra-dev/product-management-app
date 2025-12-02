import { Label as UiLabel } from "@components/ui/label";
import * as LabelPrimitive from "@radix-ui/react-label"

function Label(props: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return <UiLabel {...props} />;
}

export { Label };
