# AutoresQ Renta - Full Stack Application

## Database Schema (Supabase)

### Tables

```sql
-- Companies (rental car companies and brokers)
CREATE TABLE companies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  logo_url TEXT,
  primary_color TEXT DEFAULT '#2C3E50',
  contact_email TEXT,
  contact_phone TEXT,
  address TEXT,
  stripe_customer_id TEXT,
  is_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Users (company staff and admins)
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID REFERENCES companies(id),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  role TEXT DEFAULT 'staff', -- admin, staff
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Vehicles/Fleet
CREATE TABLE vehicles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID REFERENCES companies(id) NOT NULL,
  make TEXT NOT NULL,
  model TEXT NOT NULL,
  year INTEGER NOT NULL,
  color TEXT,
  vin TEXT,
  license_plate TEXT,
  retail_price DECIMAL(10,2) NOT NULL,
  broker_price DECIMAL(10,2),
  photos TEXT[], -- array of photo URLs
  status TEXT DEFAULT 'active', -- active, inactive, reserved, rented
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Vehicle Listings (shareable between companies)
CREATE TABLE listing_access (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vehicle_id UUID REFERENCES vehicles(id) NOT NULL,
  source_company_id UUID REFERENCES companies(id) NOT NULL,
  target_company_id UUID REFERENCES companies(id) NOT NULL,
  status TEXT DEFAULT 'pending', -- pending, approved, denied
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Customers/Renters
CREATE TABLE customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  phone TEXT,
  id_photo_url TEXT,
  self_photo_url TEXT,
  drivers_license_url TEXT,
  drivers_license_verified BOOLEAN DEFAULT false,
  id_verified BOOLEAN DEFAULT false,
  insurance_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Rentals/Bookings
CREATE TABLE rentals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vehicle_id UUID REFERENCES vehicles(id) NOT NULL,
  company_id UUID REFERENCES companies(id) NOT NULL,
  customer_id UUID REFERENCES customers(id) NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  total_price DECIMAL(10,2) NOT NULL,
  status TEXT DEFAULT 'pending', -- pending, confirmed, active, completed, cancelled
  contract_signed BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Rental Files (documents, photos, verification records)
CREATE TABLE rental_files (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  rental_id UUID REFERENCES rentals(id) NOT NULL,
  customer_id_photo TEXT,
  customer_self_photo TEXT,
  drivers_license TEXT,
  insurance_policy TEXT,
  pre_rental_photos TEXT[],
  post_rental_photos TEXT[],
  signed_contract_url TEXT,
  insurance_verification_call_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Claims
CREATE TABLE claims (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  rental_id UUID REFERENCES rentals(id) NOT NULL,
  company_id UUID REFERENCES companies(id) NOT NULL,
  auto_rescue_case_id TEXT,
  status TEXT DEFAULT 'open', -- open, in_review, resolved
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Roadside Requests
CREATE TABLE roadside_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  rental_id UUID REFERENCES rentals(id) NOT NULL,
  customer_id UUID REFERENCES customers(id) NOT NULL,
  issue_type TEXT NOT NULL, -- flat_tire, dead_battery, lockout, accident, other
  location_lat FLOAT,
  location_lng FLOAT,
  status TEXT DEFAULT 'pending', -- pending, dispatched, completed
  auto_rescue_request_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Community Posts
CREATE TABLE community_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID REFERENCES companies(id) NOT NULL,
  content TEXT NOT NULL,
  media_urls TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Community Groups
CREATE TABLE community_groups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  created_by UUID REFERENCES companies(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Group Members
CREATE TABLE group_members (
  group_id UUID REFERENCES community_groups(id),
  company_id UUID REFERENCES companies(id),
  PRIMARY KEY (group_id, company_id)
);
```

## API Endpoints (Next.js Routes)

### Public Routes
- `GET /[company-slug]` - White label company profile
- `GET /[company-slug]/vehicles` - Available vehicles
- `GET /[company-slug]/vehicles/[id]` - Vehicle details

### Company Routes (Authenticated)
- `POST /api/companies` - Create company
- `GET /api/companies/[id]` - Get company
- `PATCH /api/companies/[id]` - Update company
- `GET /api/vehicles` - List company's vehicles
- `POST /api/vehicles` - Add vehicle
- `PATCH /api/vehicles/[id]` - Update vehicle
- `POST /api/listing-access/request` - Request listing access
- `POST /api/listing-access/approve` - Approve listing access

### Customer Routes
- `POST /api/auth/register` - Customer registration
- `POST /api/auth/verify-id` - Submit ID verification
- `POST /api/auth/verify-license` - Submit license
- `POST /api/auth/verify-insurance` - Submit insurance

### Booking Routes
- `POST /api/rentals` - Create booking
- `GET /api/rentals/[id]` - Get booking details
- `POST /api/rentals/[id]/sign` - Sign contract
- `PATCH /api/rentals/[id]/confirm` - Company confirms
- `PATCH /api/rentals/[id]/photos` - Upload pre/post photos

### Claims & Roadside
- `POST /api/claims` - File claim
- `POST /api/roadside` - Request roadside assistance
- `GET /api/roadside/[id]/track` - Track request status

### Community
- `GET /api/community/posts` - List posts
- `POST /api/community/posts` - Create post
- `GET /api/community/groups` - List groups
- `POST /api/community/groups` - Create group

## Environment Variables

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://[project-ref].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[anon-key]
SUPABASE_SERVICE_ROLE_KEY=[service-role-key]

# Stripe
STRIPE_SECRET_KEY=[stripe-secret]
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=[stripe-publishable]

# App
NEXT_PUBLIC_APP_URL=https://autoresq-renta.vercel.app

# Auth
NEXTAUTH_SECRET=[nextauth-secret]
NEXTAUTH_URL=https://autoresq-renta.vercel.app
```

## Getting Started

1. First, set up Supabase project with the schema
2. Deploy to Vercel
3. Configure environment variables
4. Run the app

## Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Supabase
- **Database**: PostgreSQL (Supabase)
- **Auth**: Supabase Auth
- **Payments**: Stripe
- **Storage**: Supabase Storage
