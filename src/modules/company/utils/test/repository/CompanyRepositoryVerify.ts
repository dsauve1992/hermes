import CompanyRepository from '../../../domain/repository/CompanyRepository'
import ID from '../../../../shared/base/domain/valueObject/ID'
import Name from '../../../domain/valueObject/Name'

class CompanyRepositoryVerify {
  constructor(private repository: CompanyRepository) {}

  async shouldContainCompanyWithName(id: ID, name: Name) {
    const company = await this.repository.get(id)

    expect(company.getName()).toEqual(name)
  }

  async shouldNotContainCompany(id: ID) {
    const company = await this.repository.find(id)

    expect(company).toBeUndefined()
  }
}

export default CompanyRepositoryVerify
