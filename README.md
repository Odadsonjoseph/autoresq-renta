# AutoresQ Renta - Platform System Build

The platform operates as a two-sided ecosystem — one side facing the end customer, the other connecting the rental car industry internally. A rental car company or broker signs up, gets verified, and receives their own branded profile with a unique link. They build out their fleet by adding vehicle listings with photos and pricing, and can expand their visible inventory by requesting access to other companies' listings, which then appear on their profile as their own. When they share their link with a customer, the customer lands on what feels like that company's own standalone app — no platform branding, no way to navigate elsewhere. The customer creates an account, goes through ID, driver's license, and insurance verification, browses available vehicles, signs a digital contract, and completes their booking. Every rental automatically generates a file that captures all documents, photos, signatures, and verification records in one place. If the renter needs roadside assistance during the rental, they request it directly from the app, which dispatches Auto Rescue and pulls all the rental data automatically. If a vehicle is damaged, the company files a claim in one click, and everything Auto Rescue needs — photos, ID, contract, insurance info — is already attached and pushed directly into the Auto Rescue CRM. Running underneath all of this is a private, members-only community where rental car companies and brokers interact with each other — sharing inventory, posting to a public feed, creating private groups, and doing business the way they already do in group chats, but inside a structured, organized platform. The whole system is designed so that the industry keeps operating exactly as it already does, just cleaner, faster, and fully connected to Auto Rescue's services on the backend.

## 1. User Roles & Access

| Role | Access Level |
|------|--------------|
| Rental Car Company | White label profile, fleet management, backend community, listing marketplace |
| Broker | White label profile, no owned fleet required, backend community, listing marketplace |
| End Customer/Renter | Company profile only, booking, document upload, roadside requests |
| Admin (Auto Rescue) | Full platform access, claims management, CRM oversight |

## 2. Authentication & Onboarding

### Company/Broker Onboarding
- Business verification on signup (not open to public)
- Upload business documents
- Set up branded profile (logo, name, colors, contact info)
- Add payment/payout information

### Customer Onboarding (via Company Profile)
- Create account through company's white label link
- Upload government-issued ID
- Upload self-photo
- Driver's license verification (third-party API)
- Insurance policy information input

## 3. White Label Profile System
- Each company gets a unique URL/link
- Profile displays only that company's branding and inventory
- Zero navigation to platform homepage or other profiles
- Customer has no awareness of underlying platform
- Profile contains: Company branding, Active vehicle listings, Booking flow, Customer account portal

## 4. Fleet & Listing Management

### Company Side
- Add/edit/delete vehicle listings
- Per listing: Photos (multiple), Vehicle details, Retail price, Broker/fleet price, Availability calendar, Listing status

### Listing Share System
- Company A requests access to Company B's listing
- Company B approves/denies
- If approved, listing appears on Company A's profile
- Customer sees it as Company A's own vehicle
- Source company is never exposed to customer

## 5. Rental File System

Each booking generates a rental file containing:
- Customer ID photo
- Customer self-photo
- Driver's license
- Insurance policy info
- Pre-rental vehicle photos
- Post-rental vehicle photos
- Signed digital contract
- Rental terms
- Payment record
- Insurance verification call recording
- Claim history

## 6. Digital Contract System
- Standardized contract templates built into platform
- Company can customize within allowed parameters
- Customer receives contract on their phone
- Customer signs digitally within the app
- Signed contract auto-saved to rental file

## 7. Verification System

### ID Verification
- Customer uploads ID photo
- Third-party API validates authenticity

### Driver's License Verification
- Customer uploads license
- Third-party API validates

### Insurance Coverage Verification
- Customer inputs policy number and insurance provider
- AI agent places outbound call to insurance company
- Verifies policy is active and customer is listed driver
- Recording saved to rental file

## 8. Booking Flow

### Customer
1. Lands on company's white label profile
2. Browses available listings
3. Selects vehicle and dates
4. Creates account or logs in
5. Completes verification steps
6. Reviews and signs contract
7. Submits payment
8. Receives booking confirmation

### Company
1. Receives booking notification
2. Reviews customer verification status
3. Confirms or declines booking
4. Uploads pre-rental vehicle photos at pickup
5. Marks rental as active
6. Uploads post-rental photos at return
7. Closes rental file

## 9. Roadside & Tow Request (Customer-Facing)
- Available to customer during active rental only
- Customer selects issue type
- Customer shares live location
- Request sent to Auto Rescue dispatch
- Rental file data auto-attached to request

## 10. Claims Filing System

### Company-Initiated Claim
- Company opens rental file
- Clicks "File Claim"
- Selects Auto Rescue
- Claim created on Auto Rescue CRM automatically
- All rental file documents auto-upload to claim

### Auto Rescue CRM Side
- New claim appears in CRM with all documents pre-loaded
- Assigned to adjuster

## 11. Backend Community (B2B Only)

- Public Feed with posts visible to all
- Private Groups for invite-only collaboration
- Company Discovery to browse and request access
- Notifications for all platform activity

## 12. Dashboard — Company/Broker

- Active rentals overview
- Fleet availability calendar
- Rental file history and search
- Claim status tracker
- Listing share requests
- Customer database
- Revenue and booking analytics

## 13. Dashboard — Customer

- Active and past rentals
- Rental file details per booking
- Document upload status
- Contract access
- Roadside request history

## 14. Admin Dashboard (Auto Rescue)

- All companies and brokers on platform
- All rental files (searchable)
- All claims (active and closed)
- Roadside requests and dispatch management
- AI verification call logs
- Platform-wide analytics

## 15. Integrations Required

| Integration | Purpose |
|------------|---------|
| ID Verification API | Real-time ID and license validation |
| AI Voice Agent | Outbound insurance verification calls |
| Auto Rescue CRM | Auto-populate and manage claims |
| Payment Processor | In-app booking payments |
| Cloud Storage | Rental file document and photo storage |
| Push Notifications | Booking, claim, and community alerts |
| SMS/Email | Verification codes, booking confirmations |

---

## Tech Stack Recommendation

**Frontend**: Next.js 14+ (App Router) with TypeScript
**Styling**: Tailwind CSS
**Database**: PostgreSQL (Supabase)
**Auth**: Supabase Auth or Clerk
**Payments**: Stripe
**Storage**: Supabase Storage / AWS S3
**SMS**: Twilio
**Email**: Resend
**Push Notifications**: OneSignal or Supabase Edge Functions

**Architecture**:
- Multi-tenant white label system using subdomains or path-based routing
- Role-based access control (RBAC)
- API-first design for future mobile app
- Webhook integrations for Auto Rescue CRM

---

This is a full-stack platform system. Development can begin immediately once the tech stack is confirmed.
