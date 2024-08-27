import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Brand } from "./Brand";
import { Maintenance } from "./Maintenance";
import { User } from "./User";
import { VehicleState } from "./VehicleState";

@Entity()
export class Vehicle {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Brand, (brand) => brand.vehicles)
  brand: Brand;

  @Column({ type: "text", nullable: false })
  model: string;

  @Column({ type: "varchar", length: "7", nullable: false, unique: true })
  licensePlate: string;

  @Column({ type: "integer", nullable: false })
  year: number;

  @ManyToOne(() => User, (user) => user.vehicles)
  owner: User;

  @Column({ type: "integer", nullable: false })
  kilometersDriven: number;

  @Column({ type: "integer", nullable: false })
  dailyMileage: number;

  @OneToMany(() => Maintenance, (maintenance) => maintenance.vehicle)
  maintenances: Maintenance[];

  @ManyToOne(() => VehicleState, (state) => state.vehicles)
  stateVehicle: VehicleState;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;
}
