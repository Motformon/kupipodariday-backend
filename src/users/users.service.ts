import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { SignUpDto } from '../auth/dto/signup.dto';
import {log} from "util";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(email: string): Promise<User> {
    return this.userRepository.findOneBy({ email });
  }

  findById(id: number): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }

  removeById(id: number) {
    return this.userRepository.delete({ id });
  }

  updateById(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.update({ id }, updateUserDto);
  }

  create(createUserDto: SignUpDto): Promise<User> {
    return this.userRepository.save(createUserDto);
  }
}
