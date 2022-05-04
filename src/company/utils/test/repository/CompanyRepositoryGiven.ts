import Company from '../../../domain/entity/Company';
import CompanyRepository from '../../../domain/repository/CompanyRepository';

class CompanyRepositoryGiven {
  private constructor(
    private repository : CompanyRepository,
  ) {
  }

  static givenThat(repository : CompanyRepository) : CompanyRepositoryGiven {
    return new CompanyRepositoryGiven(repository);
  }

  async alreadyHasCompany(company : Company) : Promise<void> {
    const companyAlreadyExist = !!(await this.repository.find(company.getID()));

    if (!companyAlreadyExist) {
      return this.repository.add(company);
    }

    return Promise.resolve();
  }
}

export default CompanyRepositoryGiven;
