import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Vehicle } from "./Vehicle";

@Entity()
export class VehicleState {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "text", nullable: false })
  name: string;

  @OneToMany(() => Vehicle, (vehicle) => vehicle.state_vehicle)
  vehicles: Vehicle[];
}
