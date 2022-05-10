import ID from '../valueObject/ID'

interface IdGenerator {
  next(): ID
}

export default IdGenerator
