import { ListCompanyUseCase } from './ListCompanyUseCase'
import { ListCompanyUseCaseRequest } from './ListCompanyUseCaseRequest'
import { ListCompanyUseCaseResponse } from './ListCompanyUseCaseResponse'
import CompanyRepository from '../../domain/repository/CompanyRepository'
import CompanyRepositoryGiven from '../../utils/test/repository/CompanyRepositoryGiven'
import Company from '../../domain/entity/Company'
import ID from '../../../shared/base/domain/valueObject/ID'
import Name from '../../domain/valueObject/Name'
import UseCaseVerification from '../../../shared/test/usecase/UseCaseVerification'
import FakeCompanyRepository from '../../infrastructure/repository/fake/FakeCompanyRepository'

let repository: CompanyRepository
let useCase: ListCompanyUseCase

const A_COMPANY = Company.of(ID.of('1'), Name.of('Company 1'))
const ANOTHER_COMPANY = Company.of(ID.of('2'), Name.of('Company 2'))

beforeEach(() => {
  repository = new FakeCompanyRepository()

  useCase = new ListCompanyUseCase(repository)
})

it('should list all existing companies', async () => {
  await CompanyRepositoryGiven.givenThat(repository).hasCompany(A_COMPANY)
  await CompanyRepositoryGiven.givenThat(repository).hasCompany(ANOTHER_COMPANY)

  const request: ListCompanyUseCaseRequest = {}
  const response: ListCompanyUseCaseResponse = {
    companies: [
      { id: '1', name: 'Company 1' },
      { id: '2', name: 'Company 2' },
    ],
  }

  await UseCaseVerification.verifyThat(useCase).withRequest(request).shouldReturnResponse(response)
})
