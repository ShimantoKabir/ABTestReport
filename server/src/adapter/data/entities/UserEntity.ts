import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class UserEntity{

  @PrimaryGeneratedColumn()
  id?: number;

  @Column({unique: true})
  username: string;

  @Column()
  password: string;
}
