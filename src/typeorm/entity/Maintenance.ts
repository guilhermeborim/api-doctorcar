import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { MaintenanceType } from "./MaintenanceType";
import { Vehicle } from "./Vehicle";

@Entity()
export class Maintenance {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Vehicle, (vehicle) => vehicle.maintenances)
  vehicle: Vehicle;

  @ManyToOne(
    () => MaintenanceType,
    (maintenanceType) => maintenanceType.maintenances,
  )
  maintenanceType: MaintenanceType;

  @Column({ type: "integer", nullable: false })
  kilometersAtService: number;

  @Column({ type: "integer", nullable: false })
  kilometersNextService: number;

  @Column({ type: "date", nullable: false })
  dateOfService: Date;

  @Column({ type: "float", nullable: false })
  serviceCoast: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
