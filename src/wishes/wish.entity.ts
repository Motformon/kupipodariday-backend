import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

//id — уникальный числовой идентификатор. Генерируется автоматически и является первичным ключем каждой из таблиц;
//createdAt — дата создания, тип значения Date;
//updatedAt — дата изменения, тип значения Date.

//name — название подарка. Не может быть длиннее 250 символов и короче одного.
//link — ссылка на интернет-магазин, в котором можно приобрести подарок, строка.
//image
//ссылка на изображение подарка, строка. Должна быть валидным URL.
//price — стоимость подарка, с округлением до сотых, число.
//raised — сумма предварительного сбора или сумма, которую пользователи сейчас готовы скинуть на подарок. Также округляется до сотых.
//owner — ссылка на пользователя, который добавил пожелание подарка.
//description — строка с описанием подарка длиной от 1 и до 1024 символов.
//offers — массив ссылок на заявки скинуться от других пользователей.
//copied — содержит cчётчик тех, кто скопировал подарок себе. Целое десятичное число.

@Entity()
export class Wish {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @Column()
  name: string;

  @Column()
  link: string;

  @Column()
  image: string;

  @Column()
  price: number;

  @Column()
  raised: number;

  @Column()
  owner: string;

  @Column()
  description: string;

  @Column()
  offers: any[];

  @Column()
  copied: any;
}
