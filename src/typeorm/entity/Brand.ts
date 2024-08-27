import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Vehicle } from "./Vehicle";

@Entity()
export class Brand {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "text", unique: true, nullable: false })
  name: string;

  @Column({ type: "text", nullable: false })
  description: string;

  @Column({ type: "text", nullable: false })
  logo: string;

  @OneToMany(() => Vehicle, (vehicle) => vehicle.brand)
  vehicles: Vehicle[];
}
