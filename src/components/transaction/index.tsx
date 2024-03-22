import { formatCurrency } from "../../utils/format-currency"
import { Container, Info, Content } from "./styles"

type TransactionProps = {
  id: number
  title: string
  date: string
  amount: number
  category: {
    title: string
    color: string
  }
  variant?: "income" | "expense"
}

export function Transaction({
  amount,
  category,
  date,
  id,
  title,
  variant = "income",
}: TransactionProps) {
  return (
    <Container>
      <Info>
        <span>#{id.toString().padStart(4, "0")}</span>
        <div>
          <strong>{title}</strong>
          <span>{date}</span>
        </div>
      </Info>

      <Content $variant={variant} $tagColor={category.color}>
        <strong>{formatCurrency(amount)}</strong>
        <span>{category.title.toUpperCase()}</span>
      </Content>
    </Container>
  )
}
