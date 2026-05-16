import Link from "next/link";
import { BookOpen, ShoppingBag, Settings, LogOut, ChevronRight } from "lucide-react";

const PROJECTS = [
  { id: "1", title: "Summer in Santorini", date: "Oct 15, 2025", status: "Draft", image: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?auto=format&fit=crop&q=80&w=400" },
  { id: "2", title: "Paris Escapade", date: "Sep 02, 2025", status: "Printed", image: "https://images.unsplash.com/photo-1502602881469-447806500c53?auto=format&fit=crop&q=80&w=400" },
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#F7F9FC] py-12">
      <div className="container max-w-6xl">
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Sidebar */}
          <aside className="w-full md:w-64 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-sm border border-[#EBF0FA] p-6 mb-6">
              <div className="w-16 h-16 rounded-full bg-[#1A3A6B] text-white flex items-center justify-center text-xl font-serif font-bold mb-4">
                JD
              </div>
              <h2 className="text-lg font-bold text-[#0B1629]">John Doe</h2>
              <p className="text-sm text-gray-500 mb-6">john.doe@example.com</p>
              
              <nav className="flex flex-col gap-2">
                <Link href="/dashboard" className="flex items-center gap-3 px-4 py-2.5 bg-[#EFF3FF] text-[#1A3A6B] font-semibold rounded-lg">
                  <BookOpen size={18} /> My Projects
                </Link>
                <Link href="#" className="flex items-center gap-3 px-4 py-2.5 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                  <ShoppingBag size={18} /> Order History
                </Link>
                <Link href="#" className="flex items-center gap-3 px-4 py-2.5 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                  <Settings size={18} /> Settings
                </Link>
                <Link href="/" className="flex items-center gap-3 px-4 py-2.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors mt-4">
                  <LogOut size={18} /> Sign Out
                </Link>
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            <div className="bg-white rounded-xl shadow-sm border border-[#EBF0FA] p-8">
              <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-serif font-bold text-[#0B1629]">My Projects</h1>
                <Link href="/collections/all" className="btn btn-sm" style={{ background: "#C4973A", color: "#0B1629" }}>
                  Create New Book
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {PROJECTS.map(p => (
                  <div key={p.id} className="group border border-[#EBF0FA] rounded-xl overflow-hidden hover:shadow-md transition-shadow">
                    <div className="aspect-[4/3] bg-gray-100 relative">
                      <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                      <div className="absolute top-3 right-3 px-3 py-1 bg-white/90 backdrop-blur-sm text-xs font-bold uppercase tracking-wider rounded-full text-[#1A3A6B]">
                        {p.status}
                      </div>
                    </div>
                    <div className="p-5 flex items-center justify-between">
                      <div>
                        <h3 className="font-bold text-[#0B1629] mb-1">{p.title}</h3>
                        <p className="text-sm text-gray-500">Last edited: {p.date}</p>
                      </div>
                      <Link href={`/editor/${p.id}`} className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-[#1A3A6B] group-hover:text-white transition-colors">
                        <ChevronRight size={20} />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </main>
          
        </div>
      </div>
    </div>
  );
}
