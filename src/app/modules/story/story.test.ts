import {
  CategoryModelInterface,
  CategoryRepositoryInterface,
  StoryModelInterface,
  StoryRepositoryInterface,
} from './story.contract'
import { CreateStoryController } from './story.controller'
import { StoryModel } from './story.model'
import { CreateStoryUseCase } from './story.usecase'

const stories: StoryModelInterface[] = [{
  author: 'George Martin',
  description: 'An action story',
  categoryId: 'a143141',
  coverImage: 'example.png',
  createdAt: new Date().toISOString(),
  id: 'asf143143',
  title: 'The strange man',
  updatedAt: new Date().toISOString()
}]


const categories: CategoryModelInterface[] = [
  {
    id: 'a143141',
    name: 'Action',
  },
  {
    id: '634513dada1',
    name: 'Horror',
  },
]

const mockStoryRepository: StoryRepositoryInterface = {
  createStory: async (story: StoryModel): Promise<void> => {
    stories.push(story)
  },
  findById: function (id: string): Promise<StoryModelInterface> {
    throw new Error('Function not implemented.')
  }
}

const mockCategoryRepository: CategoryRepositoryInterface = {
  findById: async (id: string): Promise<CategoryModelInterface | undefined> => {
    return Promise.resolve(categories.find((cat) => cat.id === id))
  },
}

describe('StoryFeatures', () => {
  describe('CreateStoryUseCase', () => {
    const createStoryUseCase = new CreateStoryUseCase(mockStoryRepository, mockCategoryRepository)
    const createStoryController = new CreateStoryController(createStoryUseCase)

    it('Should be create a story', async () => {
      await createStoryController.handle({
        title: 'Shadow Knight',
        author: 'Sins Maker',
        categoryId: 'a143141',
        coverImage: 'image.png',
        description: 'A great knight and your horse',
      })

      expect(stories[1].title).toEqual('Shadow Knight')
      expect(stories[1].author).toEqual('Sins Maker')
    })

    it('Should be throw an error for category id does not exists', async () => {
      expect(
        createStoryController.handle({
          title: 'Knight',
          author: 'Sins Maker',
          categoryId: '0',
          coverImage: 'image.png',
          description: 'Test',
        }),
      ).rejects.toThrow()
    })
  })
})
