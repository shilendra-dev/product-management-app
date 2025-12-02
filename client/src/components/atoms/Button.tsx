import { buttonVariants, Button as UiButton } from "../ui/button";
import { type VariantProps } from "class-variance-authority"

function Button(
  props: React.ComponentProps<"button"> &
    VariantProps<typeof buttonVariants> & {
      asChild?: boolean;
    }
) {
  return <UiButton {...props} />;
}

export default Button;
