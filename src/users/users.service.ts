import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { SignUpDto } from '../auth/dto/signup.dto';
import { UpdateMeDto } from './dto/update-me.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findById(id: number): Promise<User> {
    return this.userRepository.findOneBy({ id });
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

  findByUsername(username: string): Promise<User> {
    return this.userRepository.findOneBy({ username });
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
