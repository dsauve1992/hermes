import Company from '../../../domain/entity/Company'
import CompanyRepository from '../../../domain/repository/CompanyRepository'
import ID from '../../../../shared/base/domain/valueObject/ID'

class FakeCompanyRepository implements CompanyRepository {
  private data: Map<string, Company>

  constructor() {
    this.data = new Map<string, Company>()
  }

  async find(id: ID): Promise<Company | undefined> {
    return this.data.get(id.toString())
  }

  async findRequired(id: ID): Promise<Company | never> {
    if (this.data.has(id.toString())) {
      return this.data.get(id.toString())
    }

    throw new Error(`Cannot find Company with ID ${id}`)
  }

  async add(company: Company): Promise<void> {
    this.data.set(company.getID().toString(), company)
  }

  async delete(id: ID): Promise<void> {
    this.data.delete(id.toString())
  }

  async findAll(): Promise<Company[]> {
    return Array.from(this.data.values())
  }
}

export default FakeCompanyRepository
