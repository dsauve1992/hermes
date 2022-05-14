import UseCase from '../../../shared/base/usecase/UseCase'
import { ListCompanyUseCaseRequest } from './ListCompanyUseCaseRequest'
import { ListCompanyUseCaseResponse } from './ListCompanyUseCaseResponse'
import CompanyRepository from '../../domain/repository/CompanyRepository'
import Company from '../../domain/entity/Company'

export class ListCompanyUseCase implements UseCase<ListCompanyUseCaseRequest, ListCompanyUseCaseResponse> {
  constructor(private repository: CompanyRepository) {}

  async execute(): Promise<ListCompanyUseCaseResponse> {
    const companies: Company[] = await this.repository.findAll()

    const companyResponses = companies.map((company) => ({
      id: company.getID().toString(),
      name: company.getName().toString(),
    }))

    return {
      companies: companyResponses,
    }
  }
}
