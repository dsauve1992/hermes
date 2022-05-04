import Company from '../../../../company/domain/entity/Company';
import ID from '../valueObject/ID';

interface Repository<T> {
  find(id: ID): Promise<T | undefined>
  findRequired(id: ID): Promise<T | never>
  add(company: Company): Promise<void | never>
}

export default Repository;
