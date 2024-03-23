export type CreateStoryProps = {
  title: string
  author: string
  categoryId: string
  description: string
  coverImage: string
}

export interface StoryModelInterface {
  id: string
  title: string
  author: string
  categoryId: string
  description: string
  coverImage: string
  createdAt: string
  updatedAt: string
}

export interface CategoryModelInterface {
  id: string
  name: string
}

export interface StoryRepositoryInterface {
  createStory(story: StoryModelInterface): Promise<void>
}

export interface CategoryRepositoryInterface {
  findById(id: string): Promise<CategoryModelInterface | undefined>
}
