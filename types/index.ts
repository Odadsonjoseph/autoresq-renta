export interface Company {
  id: string;
  name: string;
  slug: string;
  logo_url: string | null;
  primary_color: string;
  contact_email: string | null;
  contact_phone: string | null;
  address: string | null;
  is_verified: boolean;
  created_at: string;
}

export interface Vehicle {
  id: string;
  company_id: string;
  make: string;
  model: string;
  year: number;
  color: string | null;
  vin: string | null;
  license_plate: string | null;
  retail_price: number;
  broker_price: number | null;
  photos: string[] | null;
  status: 'active' | 'inactive' | 'reserved' | 'rented';
  created_at: string;
}

export interface Customer {
  id: string;
  email: string;
  full_name: string | null;
  phone: string | null;
  id_verified: boolean;
  drivers_license_verified: boolean;
  insurance_verified: boolean;
  created_at: string;
}

export interface Rental {
  id: string;
  vehicle_id: string;
  company_id: string;
  customer_id: string;
  start_date: string;
  end_date: string;
  total_price: number;
  status: 'pending' | 'confirmed' | 'active' | 'completed' | 'cancelled';
  contract_signed: boolean;
  created_at: string;
}

export interface RentalFile {
  id: string;
  rental_id: string;
  customer_id_photo: string | null;
  pre_rental_photos: string[] | null;
  post_rental_photos: string[] | null;
  signed_contract_url: string | null;
  insurance_verification_call_url: string | null;
}

export interface Claim {
  id: string;
  rental_id: string;
  company_id: string;
  auto_rescue_case_id: string | null;
  status: 'open' | 'in_review' | 'resolved';
  description: string | null;
  created_at: string;
}

export interface RoadsideRequest {
  id: string;
  rental_id: string;
  customer_id: string;
  issue_type: 'flat_tire' | 'dead_battery' | 'lockout' | 'accident' | 'other';
  location_lat: number | null;
  location_lng: number | null;
  status: 'pending' | 'dispatched' | 'completed';
  auto_rescue_request_id: string | null;
  created_at: string;
}
