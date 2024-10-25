import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
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
  idvehicle: string;

  @ManyToOne(() => Brand, (brand) => brand.vehicles)
  @JoinColumn({ name: "brand_id" })
  brand: Brand;

  @Column({ type: "text", nullable: false })
  model: string;

  @Column({ type: "varchar", length: "7", nullable: false, unique: true })
  license_plate: string;

  @Column({ type: "integer", nullable: false })
  year: number;

  @ManyToOne(() => User, (user) => user.vehicles)
  @JoinColumn({ name: "owner_id" })
  owner: User;

  @Column({ type: "integer", nullable: false })
  kilometers_driven: number;

  @Column({ type: "integer", nullable: false })
  daily_mileage: number;

  @OneToMany(() => Maintenance, (maintenance) => maintenance.vehicle)
  maintenances: Maintenance[];

  @ManyToOne(() => VehicleState, (state) => state.vehicles)
  @JoinColumn({ name: "state_vehicle_id" })
  state_vehicle: VehicleState;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;
}
