import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Wishlist } from './wishlist.entity';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { User } from '../users/user.entity';

@Injectable()
export class WishlistsService {
  constructor(
    @InjectRepository(Wishlist)
    private readonly wishlistRepository: Repository<Wishlist>,
  ) {}

  findAll(): Promise<Wishlist[]> {
    return this.wishlistRepository.find();
  }

  findById(id: number): Promise<Wishlist> {
    return this.wishlistRepository.findOne({
      where: {
        id,
      },
      relations: {
        owner: true,
      },
    });
  }

  removeById(id: number) {
    return this.wishlistRepository.delete({ id });
  }

  updateById(id: number, updateWishlistDto: UpdateWishlistDto) {
    return this.wishlistRepository.update({ id }, updateWishlistDto);
  }

  create(createWishlistDto: CreateWishlistDto, owner: User): Promise<Wishlist> {
    return this.wishlistRepository.save({
      owner,
      items: createWishlistDto.itemsId,
      image: createWishlistDto.image,
      name: createWishlistDto.name,
    });
  }
}
