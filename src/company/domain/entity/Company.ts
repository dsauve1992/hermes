import ID from '../../../shared/base/domain/valueObject/ID'
import Name from '../valueObject/Name'

class Company {
  private constructor(private id: ID, private name: Name) {}

  static of(id: ID, name: Name) {
    return new Company(id, name)
  }

  getID(): ID {
    return this.id
  }

  getName(): Name {
    return this.name
  }
}

export default Company
