import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinTable,
} from 'typeorm';
import { IsNumber, IsString, IsUrl, Length } from 'class-validator';
import { Offer } from '../../offers/entities/offer.entity';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Wish {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: new Date() })
  createdAt: Date;

  @Column({ default: new Date() })
  updatedAt: Date;

  @Column()
  @Length(1, 250, {
    message: 'Длина названия должна быть от 1 до 250 символов!',
  })
  @IsString({ message: 'Ошибка валидации переданных значений' })
  name: string;

  @Column()
  @IsUrl({}, { message: 'Ошибка валидации переданных значений' })
  link: string;

  @Column()
  @IsUrl({}, { message: 'Ошибка валидации переданных значений' })
  image: string;

  @Column()
  @IsNumber({}, { message: 'Ошибка валидации переданных значений' })
  price: number;

  @Column({ default: 0 })
  @IsNumber({}, { message: 'Ошибка валидации переданных значений' })
  raised: number;

  @Column()
  @Length(1, 1024, {
    message: 'Длина текста описания должна быть от 1 до 1024 символов!',
  })
  @IsString({ message: 'Ошибка валидации переданных значений' })
  description: string;

  @Column({ default: 0 })
  @IsNumber({}, { message: 'Ошибка валидации переданных значений' })
  copied: number;

  @OneToMany(() => Offer, (offer) => offer.user)
  offers: Offer[];

  @ManyToOne(() => User, (user) => user.offers)
  @JoinTable()
  owner: User;
}
