import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UpdateUserDto } from './dto/create-user.dto';
import { CreateUserDto } from './dto/update-user.dto';

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

  removeById(id: number) {
    return this.userRepository.delete({ id });
  }

  updateById(id: number, updateStudentDto: UpdateUserDto) {
    return this.userRepository.update({ id }, updateStudentDto);
  }

  create(createStudentDto: CreateUserDto): Promise<User> {
    return this.userRepository.save(createStudentDto);
  }

}
