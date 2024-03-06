import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

//id — уникальный числовой идентификатор. Генерируется автоматически и является первичным ключем каждой из таблиц;
//createdAt — дата создания, тип значения Date;
//updatedAt — дата изменения, тип значения Date.

//user содержит id желающего скинуться;
//item содержит ссылку на товар;
//amount — сумма заявки, округляется до двух знаков после запятой;
//hidden — флаг, который определяет показывать ли информацию о скидывающемся в списке. По умолчанию равен false.

@Entity()
export class Offer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @Column()
  user: number;

  @Column()
  amount: number;

  @Column()
  item: string;

  @Column()
  hidden: boolean;
}
