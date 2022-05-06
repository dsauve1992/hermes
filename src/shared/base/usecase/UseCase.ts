interface UseCase<Request, Response> {
  execute(request: Request): Promise<Response>
}

export interface VoidedUseCase<Request> extends UseCase<Request, void> {}

export default UseCase
