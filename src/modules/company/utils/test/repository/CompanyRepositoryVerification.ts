import CompanyRepository from '../../../domain/repository/CompanyRepository'
import CompanyRepositoryVerify from './CompanyRepositoryVerify'

class CompanyRepositoryVerification {
  static verifyThat(repository: CompanyRepository): CompanyRepositoryVerify {
    return new CompanyRepositoryVerify(repository)
  }
}

export default CompanyRepositoryVerification
