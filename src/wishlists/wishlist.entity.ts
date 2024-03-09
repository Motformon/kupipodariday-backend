import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

//id — уникальный числовой идентификатор. Генерируется автоматически и является первичным ключем каждой из таблиц;
//createdAt — дата создания, тип значения Date;
//updatedAt — дата изменения, тип значения Date.

//name — название списка. Не может быть длиннее 250 символов и короче одного;
//description — описание подборки, строка до 1500 символов;
//image — обложка для подборки;
//items содержит набор ссылок на подарки.

@Entity()
export class Wishlist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: new Date() })
  createdAt: Date;

  @Column({ default: new Date() })
  updatedAt: Date;

  @Column()
  name: string;

  // @Column()
  // description: string;
  //
  // @Column()
  // image: string;
  //
  // @Column()
  // items: any;
}
