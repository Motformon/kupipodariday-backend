import { IsEmail, IsOptional, IsString, IsUrl, Length } from 'class-validator';
import { Exclude } from 'class-transformer';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinTable,
} from 'typeorm';
import { Wish } from '../../wishes/entities/wish.entity';
import { Offer } from '../../offers/entities/offer.entity';
import { Wishlist } from 'src/wishlists/entities/wishlist.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: new Date() })
  createdAt: Date;

  @Column({ default: new Date() })
  updatedAt: Date;

  @Column({ unique: true })
  @IsString()
  @Length(2, 30, { message: 'Длина текста должна быть от 2 до 30 символов!' })
  username: string;

  @Column({ default: 'Пока ничего не рассказал о себе' })
  @IsString()
  @IsOptional()
  @Length(2, 200, {
    message: 'Длина текста о себе должна быть от 2 до 200 символов!',
  })
  about: string;

  @Column({ default: 'https://i.pravatar.cc/300' })
  @IsOptional()
  @IsUrl()
  avatar: string;

  @Column({ unique: true, select: false })
  @IsEmail()
  email: string;

  @Column({ select: false })
  @IsString()
  password: string;

  @OneToMany(() => Wish, (wish) => wish.owner)
  @JoinTable()
  wishes: Wish[];

  @OneToMany(() => Offer, (offer) => offer.user)
  offers: Offer[];

  @OneToMany(() => Wishlist, (wishlist) => wishlist.owner)
  wishlists: Wishlist[];
}
