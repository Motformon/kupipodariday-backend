import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {In, Repository} from 'typeorm';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { Wish } from './wish.entity';
import { User } from '../users/user.entity';

@Injectable()
export class WishesService {
  constructor(
    @InjectRepository(Wish)
    private readonly wishRepository: Repository<Wish>,
  ) {}

  findLast(): Promise<Wish[]> {
    return this.wishRepository.find({
      take: 40,
      order: { createdAt: 'DESC' },
      relations: {
        owner: true,
        offers: true,
      },
    });
  }

  findTop(): Promise<Wish[]> {
    return this.wishRepository.find({
      take: 20,
      order: { copied: 'DESC' },
      relations: {
        owner: true,
        offers: true,
      },
    });
  }

  findById(id: number): Promise<Wish> {
    return this.wishRepository.findOne({
      where: {
        id,
      },
      relations: {
        owner: true,
        offers: true,
      },
    });
  }

  findByIds(ids: number[]): Promise<Wish[]> {
    return this.wishRepository.find({
      where: {
        id: In(ids),
      },
      // relations: {
      //   owner: true,
      //   offers: true,
      // },
    });
  }

  removeById(id: number) {
    return this.wishRepository.delete({ id });
  }

  updateById(id: number, updateWishDto: UpdateWishDto) {
    return this.wishRepository.update(
      { id },
      { ...updateWishDto, updatedAt: new Date() },
    );
  }

  create(createWishDto: CreateWishDto, owner: User): Promise<Wish> {
    return this.wishRepository.save({ ...createWishDto, owner });
  }
}
