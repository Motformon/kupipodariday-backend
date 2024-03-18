import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Wish } from '../../wishes/entities/wish.entity';
import { IsNumber } from 'class-validator';

@Entity()
export class Offer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: new Date() })
  createdAt: Date;

  @Column({ default: new Date() })
  updatedAt: Date;

  @Column('numeric', { scale: 2 })
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'Ошибка валидации переданных значений' },
  )
  amount: number;

  @Column({ default: false })
  hidden: boolean;

  @OneToOne(() => Wish)
  @JoinColumn()
  item: Wish;

  @ManyToOne(() => User, (user) => user.wishes)
  user: User;
}
