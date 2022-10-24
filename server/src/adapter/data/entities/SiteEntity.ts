import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class SiteEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  siteName: string;

  @Column()
  clientName: string;

  @Column()
  toolType: number;

  @Column()
  apiKey: string;
}
