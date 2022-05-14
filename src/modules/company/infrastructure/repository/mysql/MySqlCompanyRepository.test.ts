import MySqlCompanyRepository from './MySqlCompanyRepository'
import * as MySQLConnector from '../../../../shared/infrastructure/database/mysql/MySQLConnector'
import CompanyRepositoryGiven from '../../../utils/test/repository/CompanyRepositoryGiven'
import Company from '../../../domain/entity/Company'
import ID from '../../../../shared/base/domain/valueObject/ID'
import Name from '../../../domain/valueObject/Name'
import CompanyRepositoryVerification from '../../../utils/test/repository/CompanyRepositoryVerification'

let repository: MySqlCompanyRepository

const AN_ID = ID.of('12345')
const A_NAME = Name.of('My Company')

const A_COMPANY = Company.of(AN_ID, A_NAME)

beforeAll(() => {
  MySQLConnector.init()

  repository = new MySqlCompanyRepository()
})

describe('adding company', () => {
  it('should throw an error given existing company', async () => {
    await CompanyRepositoryGiven.givenThat(repository).hasCompany(A_COMPANY)

    await expect(repository.add(A_COMPANY)).rejects.toThrow(`Company with ID ${AN_ID} already exist`)
  })

  it('should add company to database when not already exist', async () => {
    await CompanyRepositoryGiven.givenThat(repository).doesNotHaveCompany(A_COMPANY)

    await repository.add(A_COMPANY)

    await CompanyRepositoryVerification.verifyThat(repository).shouldContainCompanyWithName(AN_ID, A_NAME)
  })
})

describe('find company', () => {
  it('should return undefined when company does not exist in database', async () => {
    await CompanyRepositoryGiven.givenThat(repository).doesNotHaveCompany(A_COMPANY)

    expect(await repository.find(A_COMPANY.getID())).toBeUndefined()
  })

  it('should return company when exist in database', async () => {
    await CompanyRepositoryGiven.givenThat(repository).hasCompany(A_COMPANY)

    expect(await repository.find(A_COMPANY.getID())).toEqual(A_COMPANY)
  })
})

describe('find required company', () => {
  it('should throw an error when company does not exist in database', async () => {
    await CompanyRepositoryGiven.givenThat(repository).doesNotHaveCompany(A_COMPANY)

    await expect(repository.findRequired(A_COMPANY.getID())).rejects.toThrow(`Unable to find company with id ${AN_ID}`)
  })

  it('should return company when exist in database', async () => {
    await CompanyRepositoryGiven.givenThat(repository).hasCompany(A_COMPANY)

    expect(await repository.findRequired(A_COMPANY.getID())).toEqual(A_COMPANY)
  })
})

describe('delete company', () => {
  it('should throw an error when company does not exist in database', async () => {
    await CompanyRepositoryGiven.givenThat(repository).doesNotHaveCompany(A_COMPANY)

    await expect(repository.delete(A_COMPANY.getID())).rejects.toThrow(`Unable to delete company with id ${AN_ID}`)
  })

  it('should delete company from database when exist', async () => {
    await CompanyRepositoryGiven.givenThat(repository).hasCompany(A_COMPANY)

    await repository.delete(A_COMPANY.getID())

    await CompanyRepositoryVerification.verifyThat(repository).shouldNotContainCompany(AN_ID)
  })
})

afterAll(MySQLConnector.end)
