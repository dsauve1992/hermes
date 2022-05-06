import ID from '../../../base/domain/valueObject/ID'
import FakeIdGenerator from './FakeIdGenerator'

class FakeAccountNumberGeneratorGiven {
  private readonly generator: FakeIdGenerator

  constructor(generator: FakeIdGenerator) {
    this.generator = generator
  }

  public willGenerate(nextValue: string): void {
    const id = ID.of(nextValue)
    this.generator.add(id)
  }
}

function givenThat(generator: FakeIdGenerator): FakeAccountNumberGeneratorGiven {
  return new FakeAccountNumberGeneratorGiven(generator)
}

export default givenThat
