import CompanyRepository from '../../../domain/repository/CompanyRepository';
import ID from '../../../../shared/base/domain/valueObject/ID';
import Name from '../../../domain/valueObject/Name';

class CompanyRepositoryVerify {
  constructor(
    private repository : CompanyRepository,
  ) {
  }

  async shouldContainCompanyWithName(id: ID, name : Name) {
    const company = await this.repository.findRequired(id);

    expect(company.getName()).toEqual(name);
  }
}

export default CompanyRepositoryVerify;
