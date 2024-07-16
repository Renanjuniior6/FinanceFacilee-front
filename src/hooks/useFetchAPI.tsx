import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react"

import { APIService } from "../services/api"
import {
  Category,
  Dashboard,
  FinancialEvolution,
  Transaction,
} from "../services/api-types"
import { formatDate } from "../utils/format-date"
import {
  CreateCategoryData,
  CreateTransactionData,
  FinancialEvolutionFilterData,
  TransactionsFilterData,
} from "../validators/types"

interface FetchAPIProps {
  dashboard: Dashboard
  financialEvolution: FinancialEvolution[]
  createCategory: (data: CreateCategoryData) => Promise<void>
  createTransaction: (data: CreateTransactionData) => Promise<void>
  fetchCategories: () => Promise<void>
  fetchTransactions: (filters: TransactionsFilterData) => Promise<void>
  fetchDashboard: (
    filters: Pick<TransactionsFilterData, "beginDate" | "endDate">,
  ) => Promise<void>
  fetchFinancialEvolution: (
    filters: FinancialEvolutionFilterData,
  ) => Promise<void>
  categories: Category[]
  transactions: Transaction[]
}

const FetchAPIContext = createContext<FetchAPIProps>({} as FetchAPIProps)

type FetchAPIProviderProps = {
  children: ReactNode
}

export function FetchAPIProvider({ children }: FetchAPIProviderProps) {
  const [categories, setCategories] = useState<Category[]>([])
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [dashboard, setDashboard] = useState<Dashboard>({} as Dashboard)
  const [financialEvolution, setFinancialEvolution] = useState<
    FinancialEvolution[]
  >([])

  const createTransaction = useCallback(async (data: CreateTransactionData) => {
    await APIService.createTransaction({
      ...data,
      date: formatDate(data.date),
      amount: Number(data.amount.replace(/[^0-9]/g, "")),
    })
  }, [])

  const createCategory = useCallback(async (data: CreateCategoryData) => {
    await APIService.createCategory(data)
  }, [])

  const fetchCategories = useCallback(async () => {
    const data = await APIService.getCategories()

    setCategories(data)
  }, [])

  const fetchTransactions = useCallback(
    async (filters: TransactionsFilterData) => {
      const transactions = await APIService.getTransactions({
        ...filters,
        beginDate: formatDate(filters.beginDate),
        endDate: formatDate(filters.endDate),
      })

      setTransactions(transactions)
    },
    [],
  )

  const fetchDashboard = useCallback(
    async ({
      beginDate,
      endDate,
    }: Pick<TransactionsFilterData, "beginDate" | "endDate">) => {
      const dashboard = await APIService.getDashboard({
        beginDate: formatDate(beginDate),
        endDate: formatDate(endDate),
      })
      setDashboard(dashboard)
    },
    [],
  )

  const fetchFinancialEvolution = useCallback(
    async ({ year }: FinancialEvolutionFilterData) => {
      const financialEvolution = await APIService.getFinancialEvolution({
        year: year.padStart(4, "0"),
      })
      setFinancialEvolution(financialEvolution)
    },
    [],
  )

  return (
    <FetchAPIContext.Provider
      value={{
        dashboard,
        categories,
        transactions,
        financialEvolution,
        fetchTransactions,
        createCategory,
        fetchCategories,
        createTransaction,
        fetchDashboard,
        fetchFinancialEvolution,
      }}
    >
      {children}
    </FetchAPIContext.Provider>
  )
}

export function useFetchAPI(): FetchAPIProps {
  return useContext(FetchAPIContext)
}
