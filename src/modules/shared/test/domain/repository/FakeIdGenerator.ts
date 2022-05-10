import IdGenerator from '../../../base/domain/repository/IdGenerator'
import ID from '../../../base/domain/valueObject/ID'

class FakeIdGenerator implements IdGenerator {
  private values: ID[]

  constructor() {
    this.values = []
  }

  add(id: ID): void {
    this.values.push(id)
  }

  next(): ID {
    if (this.values.length === 0) {
      throw new Error('Unable to generate next ID')
    }

    const [nextId, ...others] = this.values

    this.values = others

    return nextId
  }
}

export default FakeIdGenerator
