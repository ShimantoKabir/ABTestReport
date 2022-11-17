import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class SiteEntity {

  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  siteName: string;

  @Column()
  clientName: string;

  @Column()
  toolType: number;

  @Column()
  apiKey: string;

  @Column()
  sheetId: string;

  @Column()
  isActive: boolean;
}
