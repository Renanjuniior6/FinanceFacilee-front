import axios from "axios"

import {
  Category,
  CreateCategory,
  CreateTransaction,
  Dashboard,
  DashboardFilters,
  FinancialEvolution,
  FinancialEvolutionFilters,
  Transaction,
  TransactionFilter,
} from "./api-types"

export class APIService {
  private static client = axios.create({
    baseURL: "http://localhost:3333",
  })

  static async getDashboard({
    beginDate,
    endDate,
  }: DashboardFilters): Promise<Dashboard> {
    const { data } = await APIService.client.get<Dashboard>(
      "/transactions/dashboard",
      {
        params: {
          beginDate,
          endDate,
        },
      },
    )

    return data
  }

  static async createTransaction(
    createTransactionData: CreateTransaction,
  ): Promise<Transaction> {
    const { data } = await APIService.client.post<Transaction>(
      "/transactions",
      createTransactionData,
    )
    return data
  }

  static async getTransactions({
    title,
    categoryId,
    beginDate,
    endDate,
  }: TransactionFilter): Promise<Transaction[]> {
    const { data } = await APIService.client.get<Transaction[]>(
      "/transactions",
      {
        params: {
          ...(title?.length && { title }),
          ...(categoryId?.length && { categoryId }),
          beginDate,
          endDate,
        },
      },
    )

    return data
  }

  static async createCategory(
    createCategoryData: CreateCategory,
  ): Promise<Category> {
    const { data } = await APIService.client.post<Category>(
      "/categories",
      createCategoryData,
    )

    return data
  }

  static async getCategories(): Promise<Category[]> {
    const { data } = await APIService.client.get<Category[]>("/categories")

    return data
  }

  static async getFinancialEvolution({
    year,
  }: FinancialEvolutionFilters): Promise<FinancialEvolution[]> {
    const { data } = await APIService.client.get<FinancialEvolution[]>(
      "/transactions/financial-evolution",
      {
        params: {
          year,
        },
      },
    )

    return data
  }
}
