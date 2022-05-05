import UseCase from '../../base/usecase/UseCase';
import UseCaseVerify from './UseCaseVerify';

class UseCaseVerification {
  static verifyThat<R, P>(useCase : UseCase<R, P>) {
    return new UseCaseVerify(useCase);
  }
}

export default UseCaseVerification;
