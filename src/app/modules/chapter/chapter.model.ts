import { ChapterModelInterface, CreateChapterProps } from './chapter.contract';
import { v4 as uuidv4 } from 'uuid'

export class ChapterModel implements ChapterModelInterface {
  id: string;
  storyId: string;
  chapterNumber: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;

  constructor(props: CreateChapterProps) {
    this.id = uuidv4()
    this.storyId = props.storyId
    this.chapterNumber = props.chapterNumber
    this.title = props.title
    this.content = props.content
    this.createdAt = new Date().toISOString()
    this.updatedAt = new Date().toISOString()
  }
}
