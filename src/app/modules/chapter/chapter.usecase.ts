import { UseCaseInterface } from '@domain/contract/http-router.contract';
import { ChapterRepositoryInterface, CreateChapterProps } from './chapter.contract';
import { StoryRepositoryInterface } from '@modules/story/story.contract';
import { BadRequestError } from '@domain/error/semantic.error';
import { ChapterModel } from './chapter.model';


export class CreateChapterUseCase implements UseCaseInterface {
  constructor(private chapterRepository: ChapterRepositoryInterface, private storyRepository: StoryRepositoryInterface){}

  async execute(props: CreateChapterProps): Promise<void> {
    const story = await this.storyRepository.findById(props.storyId)
    if(!story)throw new BadRequestError('storyId does not exist')

    const chapter = new ChapterModel(props)
    this.chapterRepository.createChapter(chapter)
  }

}
