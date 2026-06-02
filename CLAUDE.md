# AutoresQ Renta - White-label Rental Car Platform

## Quick Deploy

### 1. Supabase Setup
1. Create project at supabase.com
2. Run SQL from `docs/SYSTEM.md` in SQL Editor
3. Insert demo data:
```sql
INSERT INTO companies (name, slug, primary_color, is_verified) 
VALUES ('Demo Company', 'demo-company', '#2563eb', true);

-- Get the company ID, then add vehicles:
INSERT INTO vehicles (company_id, make, model, year, retail_price, status) VALUES 
(...);
```

### 2. Environment Variables
```
NEXT_PUBLIC_SUPABASE_URL=https://[project].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### 3. Deploy
```bash
npm install
npm run build
# Deploy to Vercel
```

## Project Structure

- `app/page.tsx` - Landing page
- `app/[slug]/page.tsx` - White-label company pages (dynamic)
- `app/demo-company/` - Demo company (static)
- `app/api/` - API routes
- `lib/supabase.ts` - Supabase client
- `types/index.ts` - TypeScript interfaces
