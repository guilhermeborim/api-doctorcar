import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { MaintenanceType } from "./MaintenanceType";
import { Vehicle } from "./Vehicle";

@Entity()
export class Maintenance {
  @PrimaryGeneratedColumn("uuid")
  idmaintenance: string;

  @ManyToOne(() => Vehicle, (vehicle) => vehicle.maintenances)
  @JoinColumn({ name: "vehicle_id" })
  vehicle: Vehicle;

  @ManyToOne(
    () => MaintenanceType,
    (maintenanceType) => maintenanceType.maintenances,
  )
  @JoinColumn({ name: "maintenance_type_id" })
  maintenance_type: MaintenanceType;

  @Column({ type: "integer", nullable: false })
  kilometers_at_service: number;

  @Column({ type: "integer", nullable: false })
  kilometers_next_service: number;

  @Column({ type: "date", nullable: false })
  date_of_service: Date;

  @Column({ type: "float", nullable: false })
  service_coast: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
