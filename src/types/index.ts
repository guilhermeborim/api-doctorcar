// User
export interface UserProps {
  name: string;
  email: string;
  password: string;
  profile_picture?: string;
  vehicles: VehicleProps[];
}

export interface UserCreateProps {
  name: string;
  email: string;
  password: string;
}

export interface UserLoginProps {
  email: string;
  password: string;
}

export interface UserChangePasswordProps {
  email: string;
  old_password: string;
  new_password: string;
}
// Vehicle
export interface VehicleProps {
  id?: string;
  brand_id: BrandProps;
  model: string;
  license_plate: string;
  year: number;
  owner_id?: UserProps;
  kilometers_driven: number;
  daily_mileage: number;
  maintenances?: MaintenanceProps[];
  state_vehicle_id: VehicleStateProps;
}

// Brand
export interface BrandProps {
  name: string;
  description: string;
  logo: string;
  vehicles?: VehicleProps[];
}

// Maintenance
export interface MaintenanceProps {
  vehicle_id: VehicleProps;
  maintenance_type_id: MaintenanceTypeProps;
  kilometers_at_service: number;
  kilometers_next_service: number;
  date_of_service: Date;
  service_coast: number;
}

// MaintenanceType
export interface MaintenanceTypeProps {
  name: string;
  benefits: string[];
  icon: string;
  maintenances?: MaintenanceProps[];
}

// VehicleState
export interface VehicleStateProps {
  name: string;
  vehicles: VehicleProps[];
}
