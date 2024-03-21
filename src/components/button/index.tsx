import { ComponentProps } from "react"

import { Container } from "./styes"

type ButtonProps = ComponentProps<"button"> & {
  variant?: "default" | "outline"
}

export function Button({
  children,
  variant = "default",
  ...props
}: ButtonProps) {
  return (
    <Container {...props} $variant={variant}>
      {children}
    </Container>
  )
}
