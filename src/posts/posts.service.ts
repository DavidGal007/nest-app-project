import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FilesService } from 'src/files/files.service';
import { CreatePostDto } from './dto/CreatePost.dto';
import { Posts } from './posts.model';

@Injectable()
export class PostsService {

    constructor(@InjectModel(Posts) private postsRepository: typeof Posts, private fileService: FilesService) {}

    async create(dto: CreatePostDto, image: any) {
        const fileName = await this.fileService.createFile(image)
        const post = await this.postsRepository.create({
            ...dto, image: fileName

        })
        return post;
    }
}
