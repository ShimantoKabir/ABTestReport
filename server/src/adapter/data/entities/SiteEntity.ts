import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class SiteEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique: true})
  siteName: string;

  @Column()
  clientName: string;

  @Column()
  toolType: number;

  @Column({unique: true})
  apiKey: string;
}
