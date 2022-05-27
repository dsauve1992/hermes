import ID from '../../../../shared/base/domain/valueObject/ID'
import AppDataSource from '../../../../shared/infrastructure/database/mysql/data-source'
import Company from '../../../domain/entity/Company'
import CompanyRepository from '../../../domain/repository/CompanyRepository'
import Name from '../../../domain/valueObject/Name'
import { Company as CompanyOrm } from '../model/Company.orm-entity'
import { Repository } from 'typeorm'

class MySqlCompanyRepository implements CompanyRepository {
  private repository: Repository<CompanyOrm>

  constructor() {
    this.repository = AppDataSource.getRepository(CompanyOrm)
  }

  async add(company: Company): Promise<void> {
    if (await this.find(company.getID())) {
      throw new Error(`Company with ID ${company.getID()} already exist`)
    }

    const ormEntity = new CompanyOrm()
    ormEntity.id = company.getID().toString()
    ormEntity.name = company.getName().toString()

    await this.repository.save(ormEntity)
  }

  async find(id: ID): Promise<Company | undefined> {
    const company = await this.repository.findOneBy({ id: id.toString() })

    if (!company) {
      return undefined
    }

    return Company.of(ID.of(company.id), Name.of(company.name))
  }

  async findRequired(id: ID): Promise<Company> {
    const company: Company | undefined = await this.find(id)

    if (!company) {
      throw new Error(`Unable to find company with id ${id}`)
    }

    return company
  }

  async delete(id: ID): Promise<void> {
    if (await this.find(id)) {
      await this.repository.delete(id.toString())
      return
    }

    throw new Error(`Unable to delete company with id ${id}`)
  }

  async findAll(): Promise<Company[]> {
    const data = await this.repository.find()

    return data.map((result) => Company.of(ID.of(result.id), Name.of(result.name)))
  }
}

export default MySqlCompanyRepository
