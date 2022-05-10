import Company from '../entity/Company'
import Repository from '../../../shared/base/domain/repository/Repository'

interface CompanyRepository extends Repository<Company> {}

export default CompanyRepository
