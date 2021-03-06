import ID from '../valueObject/ID'

interface Repository<T> {
  find(id: ID): Promise<T | undefined>
  get(id: ID): Promise<T | never>
  getAll(): Promise<T[] | never>
  add(data: T): Promise<void | never>
  delete(id: ID): Promise<void | never>
}

export default Repository
