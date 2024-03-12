import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
    return this.wishRepository.find();
  }

  findById(id: number): Promise<Wish> {
    return this.wishRepository.findOneBy({ id });
  }

  removeById(id: number) {
    return this.wishRepository.delete({ id });
  }

  updateById(id: number, updateWishDto: UpdateWishDto) {
    return this.wishRepository.update({ id }, updateWishDto);
  }

  create(createWishDto: CreateWishDto, owner: User): Promise<Wish> {
    return this.wishRepository.save({ ...createWishDto, owner });
  }
}
