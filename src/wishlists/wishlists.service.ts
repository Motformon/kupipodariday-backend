import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Wishlist } from './entities/wishlist.entity';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { User } from '../users/entities/user.entity';
import { Wish } from '../wishes/entities/wish.entity';

@Injectable()
export class WishlistsService {
  constructor(
    @InjectRepository(Wishlist)
    private readonly wishlistRepository: Repository<Wishlist>,
  ) {}

  findAll(): Promise<Wishlist[]> {
    return this.wishlistRepository.find({
      relations: {
        owner: true,
        items: true,
      },
    });
  }

  findById(id: number): Promise<Wishlist> {
    return this.wishlistRepository.findOne({
      where: {
        id,
      },
      relations: {
        owner: true,
        items: true,
      },
    });
  }

  removeById(id: number) {
    return this.wishlistRepository.delete({ id });
  }

  updateById(
    id: number,
    updateWishlistDto: UpdateWishlistDto,
    owner: User,
    wishes: Wish[],
  ) {
    return this.wishlistRepository.update(
      { id },
      {
        owner,
        items: wishes,
        image: updateWishlistDto.image,
        name: updateWishlistDto.name,
        updatedAt: new Date(),
      },
    );
  }

  create(
    createWishlistDto: CreateWishlistDto,
    owner: User,
    wishes: Wish[],
  ): Promise<Wishlist> {
    return this.wishlistRepository.save({
      owner,
      items: wishes,
      image: createWishlistDto.image,
      name: createWishlistDto.name,
    });
  }
}
