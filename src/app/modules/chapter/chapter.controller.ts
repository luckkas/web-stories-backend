import { ControllerInterface } from '@domain/contract/http-router.contract';
import { CreateChapterUseCase } from './chapter.usecase';
import { CreateChapterProps } from './chapter.contract';
import { CheckProps } from '@domain/decorator/check-props.decorator';


export class CreateChapterController implements ControllerInterface {
  constructor(private useCase: CreateChapterUseCase){}

  @CheckProps(['storyId', 'chapterNumber', 'title', 'content'])
  async handle(props: CreateChapterProps): Promise<void> {
    this.useCase.execute(props)
  }

}
