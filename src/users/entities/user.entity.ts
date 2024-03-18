import { IsEmail, IsOptional, IsString, IsUrl, Length } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
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
  @IsString({ message: 'Ошибка валидации переданных значений' })
  @Length(2, 30, { message: 'Длина текста должна быть от 2 до 30 символов!' })
  username: string;

  @Column({ default: 'Пока ничего не рассказал о себе' })
  @IsString({ message: 'Ошибка валидации переданных значений' })
  @IsOptional()
  @Length(2, 200, {
    message: 'Длина текста о себе должна быть от 2 до 200 символов!',
  })
  about: string;

  @Column({ default: 'https://i.pravatar.cc/300' })
  @IsOptional()
  @IsUrl({}, { message: 'Ошибка валидации переданных значений' })
  avatar: string;

  @IsEmail({}, { message: 'Ошибка валидации переданных значений' })
  @Column({ unique: true, select: false })
  email: string;

  @Column({ select: false })
  @IsString({ message: 'Ошибка валидации переданных значений' })
  password: string;

  @OneToMany(() => Wish, (wish) => wish.owner)
  wishes: Wish[];

  @OneToMany(() => Offer, (offer) => offer.user)
  offers: Offer[];

  @OneToMany(() => Wishlist, (wishlist) => wishlist.owner)
  wishlists: Wishlist[];
}
