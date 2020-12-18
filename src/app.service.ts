import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import {
  UserUpdateInput,
  User,
  UserCreateInput,
  UserWhereUniqueInput,
  UserWhereInput,
  UserOrderByInput,
} from '@prisma/client';

import {
  PostUpdateInput,
  Post,
  PostCreateInput,
  PostWhereUniqueInput,
  PostWhereInput,
  PostOrderByInput,
} from '@prisma/client';
import { PrismaService } from './prisma.service';

@Injectable()
export class AppService  {
  constructor(private prisma: PrismaService) {
  }


  async createUser(data: UserCreateInput): Promise<User> {
    return this.prisma.user.create({
      data,
    });
  }

  async createPost(data: PostCreateInput): Promise<Post> {
    return this.prisma.post.create({
      data,
    });
  }


  async users(){
    const result = await this.prisma.user.count({
      where: {
        posts: {
          some: {
            published: true,
          },
        },
      },
    })
    return result;
  }

  async updatePost(params: {
    where: PostWhereUniqueInput;
    data: PostUpdateInput;
  }): Promise<Post> {
    const { data, where } = params;
    return this.prisma.post.update({
      data,
      where,
    });
  }

  async deletePost(where: PostWhereUniqueInput): Promise<Post> {
    return this.prisma.post.delete({
      where,
    });
  }

}
