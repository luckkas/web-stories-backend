
export interface ChapterModelInterface {
  id: string
  storyId: string
  chapterNumber: number
  title: string
  content: string
  createdAt: string
  updatedAt: string
}

export type CreateChapterProps = {
  storyId: string
  chapterNumber: number
  title: string
  content: string
}


export interface ChapterRepositoryInterface {
  createChapter(chapter: ChapterModelInterface): Promise<void>
}
