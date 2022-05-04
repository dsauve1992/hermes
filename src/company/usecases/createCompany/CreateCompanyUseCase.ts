import CompanyRepository from '../../domain/repository/CompanyRepository';
import CreateCompanyUseCaseRequest from './CreateCompanyUseCaseRequest';
import CreateCompanyUseCaseResponse from './CreateCompanyUseCaseResponse';
import IdGenerator from '../../../shared/base/domain/repository/IdGenerator';
import Company from '../../domain/entity/Company';
import UseCase from '../../../shared/base/usecase/UseCase';
import Name from '../../domain/valueObject/Name';

class CreateCompanyUseCase implements
  UseCase<CreateCompanyUseCaseRequest, CreateCompanyUseCaseResponse> {
  constructor(
    private repository : CompanyRepository,
    private idGenerator : IdGenerator,
  ) {
  }

  async execute(request : CreateCompanyUseCaseRequest) : Promise<CreateCompanyUseCaseResponse> {
    const name = Name.of(request.name);
    const id = this.idGenerator.next();
    const company = Company.of(id, name);

    await this.repository.add(company);

    return { id: id.toString() };
  }
}

export default CreateCompanyUseCase;
