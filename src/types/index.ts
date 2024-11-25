// Get User
export interface UserProps {
  id: string;
  name: string;
  email: string;
  password: string;
  profile_picture?: string;
  vehicles: VehicleProps[];
}

// Create User
export interface UserCreateProps {
  name: string;
  email: string;
  password: string;
}

// Login User
export interface UserLoginProps {
  email: string;
  password: string;
}

// Change Password User
export interface UserChangePasswordProps {
  email: string;
  old_password: string;
  new_password: string;
}

// Get Vehicle
export interface VehicleProps {
  id: string;
  brand: BrandProps;
  model: string;
  license_plate: string;
  year: number;
  owner: UserProps;
  kilometers_driven: number;
  daily_mileage: number;
  maintenances?: MaintenanceProps[];
  state_vehicle: VehicleStateProps;
}

// Create Vehicle
export interface VehicleCreateProps {
  model: string;
  license_plate: string;
  year: number;
  kilometers_driven: number;
  daily_mileage: number;
  brand_id: string;
  state_vehicle_id: string;
}
// Get Brand
export interface BrandProps {
  id: string;
  name: string;
  description: string;
  logo: string;
  vehicles?: VehicleProps[];
}

// Create Brand
export interface BrandCreateProps {
  name: string;
  description: string;
  logo: string;
}

// Get Maintenance
export interface MaintenanceProps {
  id: string;
  vehicle: VehicleProps;
  maintenance_type: MaintenanceTypeProps;
  kilometers_at_service: number;
  kilometers_next_service: number;
  date_of_service: Date;
  service_coast: number;
}

// Create Maintenance
export interface MaintenanceCreateProps {
  vehicle_id: string;
  maintenance_type_id: string;
  kilometers_at_service: number;
  kilometers_next_service: number;
  date_of_service: Date;
  service_coast: number;
}

// Get MaintenanceType
export interface MaintenanceTypeProps {
  id: string;
  name: string;
  benefits: string[];
  icon: string;
  maintenances?: MaintenanceProps[];
}

// Create MaintenanceType
export interface MaintenanceTypeCreateProps {
  name: string;
  benefits: string[];
  icon: string;
  active: boolean;
}

// VehicleState
export interface VehicleStateProps {
  id: string;
  name: string;
  vehicles: VehicleProps[];
}

// Create VehicleState
export interface VehicleStateCreateProps {
  name: string;
}

// ApiResponse
export interface ApiResponse {
  status: number;
  message?: string | unknown;
  data?: any;
}
