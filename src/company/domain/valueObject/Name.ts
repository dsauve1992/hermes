class Name {
  private constructor(
    private value : string,
  ) {
    if (value === null || value === undefined || value.trim().length === 0) {
      throw new Error('Name cannot be empty');
    }
  }

  static of(value : string) : Name {
    return new Name(value);
  }

  toString() : string {
    return this.value;
  }
}

export default Name;
