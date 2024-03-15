import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn, ManyToMany} from 'typeorm';
import { IsUrl, Length, MaxLength } from 'class-validator';
import { User } from '../users/user.entity';
import { Wish } from '../wishes/wish.entity';

@Entity()
export class Wishlist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: new Date() })
  createdAt: Date;

  @Column({ default: new Date() })
  updatedAt: Date;

  @Column()
  @Length(1, 250, {
    message: 'Длина названия должна быть от 2 до 200 символов!',
  })
  name: string;

  @Column({ default: '' })
  @MaxLength(1500, {
    message: 'Длина описания должна быть до 1500 символов!',
  })
  description: string;

  @Column()
  @IsUrl()
  image: string;

  @ManyToOne(() => User, (user) => user.wishlists)
  owner: User;

  @ManyToMany(() => Wish)
  @JoinColumn()
  items: Wish[];
}
