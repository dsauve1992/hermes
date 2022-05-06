class ID {
  private readonly value: string

  private constructor(value: string) {
    this.value = value
  }

  public static of(value: string) {
    return new ID(value)
  }

  toString(): string {
    return this.value
  }
}

export default ID
