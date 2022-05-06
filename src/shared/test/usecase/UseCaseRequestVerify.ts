import UseCase from '../../base/usecase/UseCase'

class UseCaseRequestVerify<R, P> {
  constructor(private readonly useCase: UseCase<R, P>, private readonly request: R) {}

  async shouldReturnResponse(expectedResponse: P): Promise<void> {
    const response = await this.useCase.execute(this.request)
    expect(response).toEqual(expectedResponse)
  }

  async shouldThrowValidationException(message: string): Promise<void> {
    await expect(this.useCase.execute(this.request)).rejects.toThrow(message)
  }
}

export default UseCaseRequestVerify
