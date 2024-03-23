import { UseCaseInterface } from '@domain/contract/http-router.contract';
import { CategoryRepositoryInterface, CreateStoryProps, StoryRepositoryInterface } from './story.contract';
import { StoryModel } from './story.model';
import { BadRequestError } from '@domain/error/semantic.error';


export class CreateStoryUseCase implements UseCaseInterface {
  constructor(private storyRepository: StoryRepositoryInterface, private categoryRepository: CategoryRepositoryInterface){}

  async execute(props: CreateStoryProps): Promise<void> {
    const category = await this.categoryRepository.findById(props.categoryId)
    if(!category)throw new BadRequestError('categoryId does not exists')

    const story = new StoryModel(props)
    return this.storyRepository.createStory(story)
  }

}
