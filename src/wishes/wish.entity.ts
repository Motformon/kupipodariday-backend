import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne, JoinTable,
} from 'typeorm';
import {IsNumber, IsString, IsUrl, Length} from 'class-validator';
import { Offer } from '../offers/offer.entity';
import { User } from '../users/user.entity';

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
  @IsString()
  name: string;

  @Column()
  @IsUrl()
  link: string;

  @Column()
  @IsUrl()
  image: string;

  @Column()
  @IsNumber()
  price: number;

  // @Column()
  // raised: number;

  @Column()
  @Length(1, 1024, {
    message: 'Длина текста описания должна быть от 1 до 1024 символов!',
  })
  @IsString()
  description: string;

  // @Column('decimal', { array: true, precision: 2 })
  // copied: number[];

  @OneToMany(() => Offer, (offer) => offer.user)
  offers: Offer[];

  @ManyToOne(() => User, (user) => user.offers)
  @JoinTable()
  owner: User;
}
