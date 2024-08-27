import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Vehicle } from "./Vehicle";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "text", nullable: false })
  name: string;

  @Column({ type: "text", nullable: false, unique: true })
  email: string;

  @Column({ type: "text", nullable: false })
  password: string;

  @Column({ type: "text", nullable: true })
  profilePicture: string;

  @OneToMany(() => Vehicle, (vehicle) => vehicle.owner)
  vehicles: Vehicle[];

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;
}
