import UseCase from '../../../shared/base/usecase/UseCase';
import UseCaseRequestVerify from './UseCaseRequestVerify';

class UseCaseVerify<R, P> {
  constructor(
    private readonly useCase: UseCase<R, P>,
  ) {
  }

  withRequest(request : R): UseCaseRequestVerify<R, P> {
    return new UseCaseRequestVerify(this.useCase, request);
  }
}

export default UseCaseVerify;
