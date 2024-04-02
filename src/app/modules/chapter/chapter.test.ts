import { StoryModelInterface, StoryRepositoryInterface } from '@modules/story/story.contract';
import { ChapterModelInterface, ChapterRepositoryInterface } from './chapter.contract';
import { CreateChapterUseCase } from './chapter.usecase';

const stories: StoryModelInterface[] = [
  {
    id: 'A412312',
    title: 'The warrior',
    description: 'The warrior fighting with bad people',
    author: 'Baldwin',
    categoryId: 'A13413',
    coverImage: 'example.png',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
]

const mockStoryRepository: StoryRepositoryInterface = {
  createStory: function (story: StoryModelInterface): Promise<void> {
    stories.push(story)
    return Promise.resolve()
  },
  findById: async (id: string): Promise<StoryModelInterface | undefined> => {
    return Promise.resolve(stories.find((story) => story.id === id))
  }
}

const chapters: ChapterModelInterface[] = []

const mockChapterRepository: ChapterRepositoryInterface = {
  createChapter: async function (chapter: ChapterModelInterface): Promise<void> {
    Promise.resolve(chapters.push(chapter))
  }
}


describe('Chapter features', () => {
  const createChapterUseCase = new CreateChapterUseCase(mockChapterRepository, mockStoryRepository)

  it('Should be create a chapter', async () => {
    await createChapterUseCase.execute({
      chapterNumber: 1,
      content: 'This is the first paragraph of the story.',
      storyId: 'A412312',
      title: 'Pilot'
    })

    expect(chapters[0].title).toEqual('Pilot')
    expect(chapters[0].content).toEqual('This is the first paragraph of the story.')
  })

  it('Should be throw a story id does not exist', async () => {

    expect(createChapterUseCase.execute({
      chapterNumber: 1,
      content: 'This is the first paragraph of the story.',
      storyId: 'A412312A',
      title: 'Pilot'
    })
    ).rejects.toThrow()
  })

})
