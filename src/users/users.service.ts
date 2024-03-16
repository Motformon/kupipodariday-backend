import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { SignUpDto } from '../auth/dto/signup.dto';
import { UpdateMeDto } from './dto/update-me.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  findUsers(query: string): Promise<User[]> {
    return this.userRepository.find({
      where: [{ username: Like(`%${query}%`) }, { email: Like(`%${query}%`) }],
    });
  }

  findById(id: number): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }

  findMe(id: number): Promise<User> {
    return this.userRepository.findOne({
      where: {
        id,
      },
      select: {
        id: true,
        username: true,
        about: true,
        avatar: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  findUserWishes(id: number): Promise<User> {
    return this.userRepository.findOne({
      where: {
        id,
      },
      relations: {
        wishes: {
          owner: true,
          offers: true,
        },
      },
    });
  }

  findAuth(username: string): Promise<User> {
    return this.userRepository.findOne({
      where: {
        username,
      },
      select: {
        password: true,
        username: true,
        id: true,
      },
    });
  }

  findByUsername(username: string): Promise<User> {
    return this.userRepository.findOneBy({ username });
  }

  findByUsernameWishes(username: string): Promise<User> {
    return this.userRepository.findOne({
      where: {
        username,
      },
      relations: {
        wishes: {
          owner: true,
          offers: true,
        },
      },
    });
  }

  updateById(id: number, updateUserDto: UpdateMeDto) {
    return this.userRepository.update(
      { id },
      { ...updateUserDto, updatedAt: new Date() },
    );
  }

  create(createUserDto: SignUpDto): Promise<User> {
    return this.userRepository.save(createUserDto);
  }
}
