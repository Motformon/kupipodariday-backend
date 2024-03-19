import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { Wish } from './entities/wish.entity';
import { User } from '../users/entities/user.entity';

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

  updateRaisedById(wish: Wish, amount: number, userId: number) {
    const raised = wish.raised;
    const price = wish.price;

    if (amount + raised > price) {
      throw new ForbiddenException(
        `Сумма собранных средств не может превышать стоимость подарка! Можно скинуть не больше ${
          price - raised
        }`,
      );
    } else if (price === raised) {
      throw new ForbiddenException(
        'Нельзя скинуться на подарки, на которые уже собраны деньги!',
      );
    } else if (userId === wish.owner.id) {
      throw new ForbiddenException(
        'Нельзя вносить деньги на собственные подарки!',
      );
    }

    return this.wishRepository.update(
      { id: wish.id },
      { raised: raised + amount, updatedAt: new Date() },
    );
  }

  create(createWishDto: CreateWishDto, owner: User): Promise<Wish> {
    return this.wishRepository.save({ ...createWishDto, owner });
  }

  updateCopy(id: number, copied: number) {
    return this.wishRepository.update({ id }, { copied });
  }

  createCopy(createWishDto: Wish): Promise<Wish> {
    return this.wishRepository.save(createWishDto);
  }
}
