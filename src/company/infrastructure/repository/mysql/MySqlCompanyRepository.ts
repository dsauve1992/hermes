import ID from '../../../../shared/base/domain/valueObject/ID';
import { execute } from '../../../../shared/infrastructure/database/mysql/MySQLConnector';
import Company from '../../../domain/entity/Company';
import CompanyRepository from '../../../domain/repository/CompanyRepository';
import Name from '../../../domain/valueObject/Name';

class MySqlCompanyRepository implements CompanyRepository {
  async add(company: Company): Promise<void> {
    const queryStr = 'INSERT INTO Company (id, name) VALUES (?, ?);';

    if (await this.find(company.getID())) {
      throw new Error(`Company with ID ${company.getID()} already exist`);
    }

    await execute(queryStr, [company.getID().toString(), company.getName().toString()]);
  }

  async find(id: ID): Promise<Company | undefined> {
    const queryStr = 'SELECT * FROM Company WHERE id = ?';

    const result = await execute<{id:string, name:string}[]>(queryStr, [id.toString()]);

    if (result.length === 0) {
      return undefined;
    }

    return Company.of(
      ID.of(result[0].id),
      Name.of(result[0].name),
    );
  }

  async findRequired(id: ID): Promise<Company> {
    const company : Company | undefined = await this.find(id);

    if (!company) {
      throw new Error(`Unable to find company with id ${id}`);
    }

    return company;
  }

  async delete(id: ID): Promise<void> {
    const queryStr = 'DELETE FROM Company where id = ?;';

    if (await this.find(id)) {
      return execute(queryStr, [id.toString()]);
    }

    throw new Error(`Unable to delete company with id ${id}`);
  }

  private;
}

export default MySqlCompanyRepository;
