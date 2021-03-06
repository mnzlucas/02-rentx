import { inject, injectable } from 'tsyringe';

import { ISpecificationsRepository } from '../../repositories/ISpecificationsRepository';

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateSpecificationUseCase {
  constructor(
    @inject('SpecificationsRepository')
    private SpecificationsRepository: ISpecificationsRepository,
  ) {}

  execute({ name, description }: IRequest): void {
    const specificationAlreadyExists =
      this.SpecificationsRepository.findByName(name);

    if (specificationAlreadyExists) {
      throw new Error('Specification nAlready Exists');
    }
    this.SpecificationsRepository.create({
      name,
      description,
    });
  }
}

export { CreateSpecificationUseCase };
