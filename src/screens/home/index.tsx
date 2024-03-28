import { InputMask } from "@react-input/mask"

import { ButtonIcon } from "../../components/button-icon"
import { Card } from "../../components/card"
import { CategoriesPieChart } from "../../components/categories-pie-chart"
import { CreateDialogCategory } from "../../components/create-category-dialog"
import { CreateTransactionDialog } from "../../components/create-transaction-dialog"
import { FinancialEvolutionBarChart } from "../../components/financial-evolution-bar-chart"
import { Input } from "../../components/input"
import { Title } from "../../components/title"
import { Transaction } from "../../components/transaction"
import {
  Aside,
  Balance,
  ChartAction,
  ChartContainer,
  ChartContent,
  Filters,
  H1,
  Header,
  ImportGroup,
  Main,
  SearchTransaction,
  Section,
  TransactionsGroup,
} from "./styles"

export function Home() {
  return (
    <>
      <Header>
        <H1>FinanceFacilee$</H1>
        <div>
          <CreateTransactionDialog />
          <CreateDialogCategory />
        </div>
      </Header>

      <Main>
        <Section>
          <Filters>
            <Title title="Saldo" subtitle="Receitas e despesas no período" />
            <ImportGroup>
              <InputMask
                component={Input}
                mask="dd/mm/aaaa"
                replacement={{ d: /\d/, m: /\d/, a: /\d/ }}
                variant="dark"
                label="Início"
                placeholder="dd/mm/aaaa"
              />
              <InputMask
                component={Input}
                mask="dd/mm/aaaa"
                replacement={{ d: /\d/, m: /\d/, a: /\d/ }}
                variant="dark"
                label="Fim"
                placeholder="dd/mm/aaaa"
              />
              <ButtonIcon />
            </ImportGroup>
          </Filters>
          <Balance>
            <Card title="Saldo" amount={200000} />
            <Card title="Receita" amount={1000000} variant="incomes" />
            <Card title="Gasto" amount={800000} variant="expenses" />
          </Balance>
          <ChartContainer>
            <Title
              title="Gastos"
              subtitle="Despesas por categoria no período"
            />
            <ChartContent>
              <CategoriesPieChart />
            </ChartContent>
          </ChartContainer>
          <ChartContainer>
            <header>
              <Title
                title="Evolução Financeira"
                subtitle="Saldo, Receitas e Gastos no ano"
              />

              <ChartAction>
                <InputMask
                  component={Input}
                  mask="aaaa"
                  replacement={{ a: /\d/ }}
                  variant="black"
                  label="Ano"
                  placeholder="aaaa"
                />
                <ButtonIcon />
              </ChartAction>
            </header>
            <ChartContent>
              <FinancialEvolutionBarChart />
            </ChartContent>
          </ChartContainer>
        </Section>
        <Aside>
          <header>
            <Title title="Transações" subtitle="Receitas e Gastos no período" />
            <SearchTransaction>
              <Input variant="black" placeholder="Procurar transação..." />
              <ButtonIcon />
            </SearchTransaction>
          </header>
          <TransactionsGroup>
            <Transaction
              id={1}
              amount={50000}
              date="15/01/2024"
              category={{ title: "ALIMENTAÇÃO", color: "#ff33bb" }}
              title="Mercado"
            />
            <Transaction
              id={2}
              amount={6000}
              date="25/01/2024"
              category={{ title: "STREAMING", color: "#00ff00" }}
              title="Netflix"
            />
            <Transaction
              id={3}
              amount={30000}
              date="13/02/2024"
              category={{ title: "COMPRAS", color: "#ff0000" }}
              title="Shopping"
            />
            <Transaction
              id={4}
              amount={10000}
              date="20/02/2024"
              category={{ title: "COMPRAS", color: "#ff0000" }}
              title="Shein"
            />
            <Transaction
              id={5}
              amount={4000}
              date="27/02/2024"
              category={{ title: "STREAMING", color: "#00ff00" }}
              title="Amazon Prime"
            />
          </TransactionsGroup>
        </Aside>
      </Main>
    </>
  )
}
