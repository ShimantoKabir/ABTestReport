import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UserEntity{

  @PrimaryGeneratedColumn()
  id?: number;

  @Column({unique: true})
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  token?: string;

  @Column({ nullable: true })
  tokenExp?: number;
}
