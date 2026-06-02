import Link from 'next/link';
import { supabase } from '@/lib/supabase';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function CompanyPage({ params }: PageProps) {
  const { slug } = await params;

  // Get company
  const { data: company } = await supabase
    .from('companies')
    .select('*')
    .eq('slug', slug)
    .single();

  if (!company) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl text-white mb-4">Company not found</h1>
          <Link href="/" className="text-amber-400 hover:text-amber-300">Go Home</Link>
        </div>
      </div>
    );
  }

  // Get active vehicles
  const { data: vehicles } = await supabase
    .from('vehicles')
    .select('*')
    .eq('company_id', company.id)
    .eq('status', 'active')
    .order('created_at', { ascending: false });

  const primaryColor = company.primary_color || '#2C3E50';

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Company Header */}
      <div className="bg-gradient-to-r" style={{ background: `linear-gradient(to right, ${primaryColor}, ${primaryColor}dd)` }}>
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="flex items-center gap-4 mb-4">
            {company.logo_url ? (
              <img src={company.logo_url} alt={company.name} className="w-16 h-16 rounded-xl object-cover" />
            ) : (
              <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center text-2xl font-bold text-white">
                {company.name.charAt(0)}
              </div>
            )}
            <div>
              <h1 className="text-4xl font-bold text-white">{company.name}</h1>
              {company.is_verified && (
                <span className="inline-flex items-center gap-1 text-blue-200 text-sm mt-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Verified
                </span>
              )}
            </div>
          </div>
          {company.address && (
            <p className="text-white/80">{company.address}</p>
          )}
        </div>
      </div>

      {/* Search */}
      <div className="max-w-7xl mx-auto px-6 -mt-8">
        <div className="bg-slate-800 rounded-2xl p-6 shadow-xl border border-slate-700">
          <div className="grid md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm text-slate-400 mb-2">Pick-up Location</label>
              <input type="text" placeholder="City or Airport" className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400" />
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-2">Pick-up Date</label>
              <input type="date" className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white" />
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-2">Drop-off Date</label>
              <input type="date" className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white" />
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-2">&nbsp;</label>
              <button className="w-full px-4 py-3 bg-amber-500 text-slate-900 font-semibold rounded-lg hover:bg-amber-400 transition">
                Search Cars
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Vehicles */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold text-white mb-6">Available Vehicles</h2>
        {vehicles && vehicles.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-6">
            {vehicles.map((vehicle) => (
              <div key={vehicle.id} className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700 hover:border-amber-500 transition group">
                <div className="h-48 bg-slate-700 relative">
                  {vehicle.photos && vehicle.photos.length > 0 ? (
                    <img src={vehicle.photos[0]} alt={`${vehicle.make} ${vehicle.model}`} className="w-full h-full object-cover group-hover:scale-105 transition" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-500">
                      <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                  <span className="absolute top-3 right-3 bg-amber-500 text-slate-900 text-sm font-semibold px-3 py-1 rounded-full">
                    ${vehicle.retail_price}/day
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-white">{vehicle.make} {vehicle.model}</h3>
                  <p className="text-slate-400">{vehicle.year} {vehicle.color && `• ${vehicle.color}`}</p>
                  <div className="flex gap-3 mt-4">
                    <button className="flex-1 px-4 py-2 bg-amber-500 text-slate-900 font-semibold rounded-lg hover:bg-amber-400 transition">
                      Book Now
                    </button>
                    <button className="px-4 py-2 border border-slate-600 text-white rounded-lg hover:bg-slate-700 transition">
                      Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-slate-400 text-lg">No vehicles available at the moment.</p>
          </div>
        )}
      </div>

      {/* Back Link */}
      <div className="max-w-7xl mx-auto px-6 pb-12">
        <Link href="/" className="text-amber-400 hover:text-amber-300 transition">
          ← Back to AutoresQ Renta
        </Link>
      </div>
    </div>
  );
}
