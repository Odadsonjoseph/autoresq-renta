import Link from 'next/link';

export default function DemoCompanyPage() {
  const vehicles = [
    {
      id: '1',
      make: 'Tesla',
      model: 'Model 3',
      year: 2024,
      price: 89,
      image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800',
    },
    {
      id: '2',
      make: 'BMW',
      model: '3 Series',
      year: 2024,
      price: 79,
      image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800',
    },
    {
      id: '3',
      make: 'Mercedes',
      model: 'C-Class',
      year: 2024,
      price: 99,
      image: 'https://images.unsplash.com/photo-1544639331-30939ebd7dd2?w=800',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Company Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center text-2xl font-bold text-blue-600">
              D
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white">Demo Company</h1>
              <p className="text-blue-200">Premium Car Rentals</p>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Search */}
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
        <div className="grid md:grid-cols-3 gap-6">
          {vehicles.map((vehicle) => (
            <div key={vehicle.id} className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700 hover:border-amber-500 transition group">
              <div className="h-48 bg-slate-700 relative">
                <img src={vehicle.image} alt={`${vehicle.make} ${vehicle.model}`} className="w-full h-full object-cover group-hover:scale-105 transition" />
                <span className="absolute top-3 right-3 bg-amber-500 text-slate-900 text-sm font-semibold px-3 py-1 rounded-full">
                  ${vehicle.price}/day
                </span>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold text-white">{vehicle.make} {vehicle.model}</h3>
                <p className="text-slate-400">{vehicle.year}</p>
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
