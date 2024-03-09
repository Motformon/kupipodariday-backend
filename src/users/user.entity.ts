import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

//id — уникальный числовой идентификатор. Генерируется автоматически и является первичным ключем каждой из таблиц;
//createdAt — дата создания, тип значения Date;
//updatedAt — дата изменения, тип значения Date.
//username — имя пользователя, уникальная строка от 2 до 30 символов, обязательное поле.
//about — **информация о пользователе, строка от 2 до 200 символов. В качестве значения по умолчанию укажите для него строку: «Пока ничего не рассказал о себе».
//avatar — ссылка на аватар. В качестве значения по умолчанию задайте https://i.pravatar.cc/300
//email — адрес электронной почты пользователя, должен быть уникален.
//password — пароль пользователя, строка.
//wishes — список желаемых подарков. Используйте для него соответствующий тип связи.
//offers — содержит список подарков, на которые скидывается пользователь. Установите для него подходящий тип связи.
//wishlists
//содержит список вишлистов, которые создал пользователь. Установите для него подходящий тип связи.

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: new Date() })
  createdAt: Date;

  @Column({ default: new Date() })
  updatedAt: Date;

  @Column()
  username: string;

  // @Column()
  // about: string;
  //
  // @Column()
  // avatar: string;
  //
  // @Column()
  // email: string;
  //
  // @Column()
  // password: string;

  // @Column()
  // wishes: any;
  //
  // @Column()
  // offers: any;
  //
  // @Column()
  // wishlists: any;
}
