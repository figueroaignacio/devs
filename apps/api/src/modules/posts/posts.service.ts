import { Injectable } from '@nestjs/common';
import { generateSlug } from 'src/lib/utils';
import { DatabaseService } from '../../database/database.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(private readonly db: DatabaseService) {}

  async createPost(createPostDto: CreatePostDto) {
    const slug = generateSlug(createPostDto.title);

    return this.db.post.create({
      data: {
        ...createPostDto,
        slug,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
  }

  async getAllPosts() {
    return this.db.post.findMany({
      include: {
        author: true,
      },
    });
  }

  async getPostById(id: string) {
    return this.db.post.findUnique({
      where: { id },
      include: {
        author: true,
      },
    });
  }

  async getPostBySlug(slug: string) {
    return this.db.post.findUnique({
      where: { slug },
      include: { author: true },
    });
  }

  async updatePost(id: string, updatePostDto: UpdatePostDto) {
    const updatedSlug = updatePostDto.title
      ? generateSlug(updatePostDto.title)
      : undefined;

    return this.db.post.update({
      where: { id },
      data: {
        ...updatePostDto,
        ...(updatedSlug && { slug: updatedSlug }),
        updatedAt: new Date(),
      },
    });
  }

  async removePost(id: string) {
    return this.db.post.delete({
      where: { id },
    });
  }
}
