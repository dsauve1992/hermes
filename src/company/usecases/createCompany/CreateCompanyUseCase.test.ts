import CompanyRepository from '../../domain/repository/CompanyRepository'
import FakeCompanyRepository from '../../infrastructure/repository/fake/FakeCompanyRepository'
import CreateCompanyUseCase from './CreateCompanyUseCase'
import UseCaseVerification from '../../../shared/test/usecase/UseCaseVerification'
import CompanyRepositoryVerification from '../../utils/test/repository/CompanyRepositoryVerification'
import ID from '../../../shared/base/domain/valueObject/ID'
import IdGenerator from '../../../shared/base/domain/repository/IdGenerator'
import FakeIdGenerator from '../../../shared/test/domain/repository/FakeIdGenerator'
import givenThat from '../../../shared/test/domain/repository/FakeIdGeneratorGiven'
import Name from '../../domain/valueObject/Name'

let repository: CompanyRepository
let idGenerator: IdGenerator
let useCase: CreateCompanyUseCase

beforeEach(() => {
  repository = new FakeCompanyRepository()
  idGenerator = new FakeIdGenerator()
  useCase = new CreateCompanyUseCase(repository, idGenerator)
})

it('should create company given valid request', async () => {
  const request = { name: 'My Company' }
  const response = { id: '12345' }

  givenThat(idGenerator as FakeIdGenerator).willGenerate('12345')

  const name = Name.of(request.name)
  const id = ID.of('12345')

  await UseCaseVerification.verifyThat(useCase).withRequest(request).shouldReturnResponse(response)

  await CompanyRepositoryVerification.verifyThat(repository).shouldContainCompanyWithName(id, name)
})

it('should throw exception given empty company name', async () => {
  const request = { name: '' }

  await UseCaseVerification.verifyThat(useCase)
    .withRequest(request)
    .shouldThrowValidationException('Name cannot be empty')
})
