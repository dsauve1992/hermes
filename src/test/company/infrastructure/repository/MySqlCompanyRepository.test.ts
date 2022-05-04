import MySqlCompanyRepository from '../../../../company/infrastructure/repository/MySqlCompanyRepository';
import * as MySQLConnector from '../../../../shared/infrastructure/database/mysql/MySQLConnector';
import CompanyRepositoryGiven from '../../../../company/utils/test/repository/CompanyRepositoryGiven';
import Company from '../../../../company/domain/entity/Company';
import ID from '../../../../shared/base/domain/valueObject/ID';
import Name from '../../../../company/domain/valueObject/Name';

let repository : MySqlCompanyRepository;

beforeAll(() => {
  MySQLConnector.init();

  repository = new MySqlCompanyRepository();
});

afterAll(MySQLConnector.end);

describe('adding company', () => {
  it('should throw an error given existing company', async () => {
    const id = ID.of('12345');
    const name = Name.of('My Company');

    const company = Company.of(id, name);

    await CompanyRepositoryGiven.givenThat(repository).alreadyHasCompany(company);

    await expect(repository.add(company)).rejects.toThrow(`Company with ID ${ID.toString()} already exist`);
  });
});
