import { CreateStoryProps, StoryModelInterface } from './story.contract';
import { v4 as uuidv4 } from 'uuid'


export class StoryModel implements StoryModelInterface {
  id: string;
  title: string;
  author: string;
  categoryId: string;
  description: string;
  coverImage: string;
  createdAt: string;
  updatedAt: string;

  constructor(props: CreateStoryProps) {
    this.id = uuidv4()
    this.title = props.title
    this.author = props.author
    this.categoryId = props.categoryId
    this.description = props.description
    this.coverImage = props.coverImage
    this.createdAt = new Date().toISOString()
    this.updatedAt = new Date().toISOString()
  }

}
