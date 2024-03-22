import { InputMask } from "@react-input/mask"

import { Button } from "../../components/button"
import { ButtonIcon } from "../../components/button-icon"
import { Card } from "../../components/card"
import { Input } from "../../components/input"
import { Logo } from "../../components/logo"
import { Title } from "../../components/title"
import { Transaction } from "../../components/transaction"
import {
  Aside,
  Balance,
  ChartAction,
  ChartContainer,
  ChartContent,
  Filters,
  Header,
  ImportGroup,
  Main,
  SearchTransaction,
  Section,
} from "./styles"

export function Home() {
  return (
    <>
      <Header>
        <Logo />
        <div>
          <Button>Nova transação</Button>
          <Button>Nova categoria</Button>
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
            <Card title="Saldo" amount={1000000} />
            <Card title="Saldo" amount={1000000} variant="incomes" />
            <Card title="Saldo" amount={1000000} variant="expenses" />
          </Balance>
          <ChartContainer>
            <Title
              title="Gastos"
              subtitle="Despesas por categoria no período"
            />
            <ChartContent></ChartContent>
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
            <ChartContent></ChartContent>
          </ChartContainer>
        </Section>
        <Aside>
          <header>
            <Title title="Transações" subtitle="Receitas e Gastos no período" />
            <SearchTransaction>
              <Input variant="black" placeholder="Procurar transação..." />
              <ButtonIcon />
            </SearchTransaction>
            <Transaction
              id={1}
              amount={20000}
              date="22/03/2024"
              category={{ title: "ALIMENTAÇÃO", color: "#ff33bb" }}
              title="Mercado"
            />
            <Transaction
              id={1}
              amount={20000}
              date="22/03/2024"
              category={{ title: "ALIMENTAÇÃO", color: "#ff33bb" }}
              title="Mercado"
            />
            <Transaction
              id={1}
              amount={20000}
              date="22/03/2024"
              category={{ title: "ALIMENTAÇÃO", color: "#ff33bb" }}
              title="Mercado"
            />
          </header>
        </Aside>
      </Main>
    </>
  )
}
