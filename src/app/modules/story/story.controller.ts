import { ControllerInterface } from '@domain/contract/http-router.contract'
import { CreateStoryUseCase } from './story.usecase'
import { CreateStoryProps } from './story.contract'
import { CheckProps } from '@domain/decorator/check-props.decorator'

export class CreateStoryController implements ControllerInterface {
  constructor(private useCase: CreateStoryUseCase) {}

  @CheckProps(['title', 'author', 'categoryId', 'description', 'coverImage'])
  async handle(props: CreateStoryProps): Promise<void> {
    return this.useCase.execute(props)
  }
}
