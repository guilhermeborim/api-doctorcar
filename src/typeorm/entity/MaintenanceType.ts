import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Maintenance } from "./Maintenance";

@Entity()
export class MaintenanceType {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "text", unique: true, nullable: false })
  name: string;

  @Column({ type: "text", array: true, nullable: false })
  benefits: string[];

  @Column({ type: "text", nullable: false })
  icon: string;

  @OneToMany(() => Maintenance, (maintenance) => maintenance.maintenance_type)
  maintenances: Maintenance[];
}
