import styled from "styled-components"

import { theme } from "../../style/theme"

type ContainerProps = {
  $variant: "balance" | "incomes" | "expenses"
}

const variantColorMap = {
  balance: theme.colors.info,
  incomes: theme.colors.sucess,
  expenses: theme.colors.error,
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  gap: 0.5rem;
  background-color: ${theme.colors.dark};
  border-radius: 0.25rem;
  width: 100%;

  svg {
    width: 1.75rem;
    height: 1.75rem;
    fill: ${(props) => variantColorMap[props.$variant]};
  }

  span {
    font-size: 1rem;
    font-weight: 300;
    color: ${theme.colors.neutral};
  }

  strong {
    font-size: 1.5rem;
    font-weight: 500;
    color: ${(props) => variantColorMap[props.$variant]};
  }
`
