// User
export interface UserProps {
  name: string;
  email: string;
  password: string;
  profilePicture?: string;
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
  oldPassword: string;
  newPassword: string;
}
// Vehicle
export interface VehicleProps {
  brand: BrandProps;
  model: string;
  licensePlate: string;
  year: number;
  owner: UserProps;
  kilometersDriven: number;
  dailyMileage: number;
  maintenances?: MaintenanceProps[];
  stateVehicle: VehicleStateProps;
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
  vehicle: VehicleProps;
  maintenanceType: MaintenanceTypeProps;
  kilometersAtService: number;
  kilometersNextService: number;
  dateOfService: Date;
  serviceCoast: number;
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
