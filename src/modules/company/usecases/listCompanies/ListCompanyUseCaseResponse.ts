export type CompanyResponse = {
  id: string
  name: string
}

export interface ListCompanyUseCaseResponse {
  companies: CompanyResponse[]
}
