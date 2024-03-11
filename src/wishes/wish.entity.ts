import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { IsUrl, Length } from 'class-validator';
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
  @Length(1, 250)
  name: string;

  @Column()
  @IsUrl()
  link: string;

  @Column()
  @IsUrl()
  image: string;

  @Column('decimal', { precision: 2 })
  price: number;

  @Column('decimal', { precision: 2 })
  raised: number;

  @Column()
  @Length(1, 1024)
  description: string;

  @Column('decimal', { array: true, precision: 2 })
  copied: number[];

  @OneToMany(() => Offer, (offer) => offer.user)
  offers: Offer[];

  @ManyToOne(() => User, (user) => user.offers)
  owner: User;
}
