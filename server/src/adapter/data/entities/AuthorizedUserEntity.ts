import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class AuthorizedUserEntity {

  @PrimaryGeneratedColumn()
  id?: number;

  @Column({unique: true})
  email: string;
}