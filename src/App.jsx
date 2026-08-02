import React, { useState, useEffect } from 'react';
import { 
  Package, Truck, CheckCircle2, AlertCircle, Clock, 
  Search, Plus, Filter, BarChart2, ShieldAlert, ArrowRight,
  RefreshCw, Layers, Calendar, User, FileText, Settings, Play
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  
  // العدادات والبيانات
  const [metrics, setMetrics] = useState({
    totalInbound: 1420,
    processing: 385,
    outbound: 890,
    delayed: 45
  });

  const [shipments, setShipments] = useState([
    { id: '#5009', client: 'شركة النور للتجارة', destination: 'القاهرة - المقطم', status: 'جاري التجهيز', progress: 65, time: '10:15 AM' },
    { id: '#8830', client: 'مؤسسة الأمل للصناعة', destination: 'الإسكندرية - سموحة', status: 'تم الاستلام', progress: 100, time: '09:30 AM' },
    { id: '#9102', client: 'مخازن الدلتا الحديثة', destination: 'طنطا - الاستاد', status: 'قيد الشحن', progress: 40, time: '08:45 AM' },
    { id: '#3341', client: 'شركة الفراعنة للاستيراد', destination: 'الجيزة - الهرم', status: 'متأخر', progress: 20, time: 'أمس' },
  ]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col" dir="rtl">
      {/* شريط التنقل العلوي */}
      <header className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-2.5 rounded-xl shadow-md shadow-blue-500/20">
            <Layers className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-wide text-white">TBOS System</h1>
            <p className="text-xs text-slate-400">إدارة حركة المستودعات واللوجستيات</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute right-3 top-2.5 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="بحث برقم الشحنة أو العميل..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-slate-950 border border-slate-700 rounded-lg pr-9 pl-4 py-2 text-sm text-slate-200 focus:outline-none focus:border-blue-500 w-64 transition-all"
            />
          </div>
          <div className="flex items-center gap-2 bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700">
            <User className="w-4 h-4 text-blue-400" />
            <span className="text-xs font-medium text-slate-300">مسؤول النظام</span>
          </div>
        </div>
      </header>

      {/* المحتوى الرئيسي */}
      <main className="flex-1 p-6 max-w-7xl mx-auto w-full space-y-6">
        
        {/* بطاقات الإحصائيات والعدادات */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-400 font-medium">إجمالي الوارد</p>
              <h3 className="text-2xl font-bold text-white mt-1">{metrics.totalInbound}</h3>
              <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full mt-2 inline-block">+12% عن أمس</span>
            </div>
            <div className="bg-blue-500/10 p-3 rounded-xl border border-blue-500/20">
              <Package className="w-6 h-6 text-blue-400" />
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-400 font-medium">تحت المعالجة والتجهيز</p>
              <h3 className="text-2xl font-bold text-white mt-1">{metrics.processing}</h3>
              <span className="text-[10px] text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full mt-2 inline-block">تحديث مستمر</span>
            </div>
            <div className="bg-amber-500/10 p-3 rounded-xl border border-amber-500/20">
              <Clock className="w-6 h-6 text-amber-400" />
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-400 font-medium">الصادر والمنتهى</p>
              <h3 className="text-2xl font-bold text-white mt-1">{metrics.outbound}</h3>
              <span className="text-[10px] text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-full mt-2 inline-block">جاهز للتسليم</span>
            </div>
            <div className="bg-emerald-500/10 p-3 rounded-xl border border-emerald-500/20">
              <Truck className="w-6 h-6 text-emerald-400" />
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-400 font-medium">الشحنات المتأخرة</p>
              <h3 className="text-2xl font-bold text-rose-400 mt-1">{metrics.delayed}</h3>
              <span className="text-[10px] text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded-full mt-2 inline-block">تتطلب تدخل</span>
            </div>
            <div className="bg-rose-500/10 p-3 rounded-xl border border-rose-500/20">
              <ShieldAlert className="w-6 h-6 text-rose-400" />
            </div>
          </div>
        </div>

        {/* قسم جدول الشحنات وسير العمل */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
          <div className="p-5 border-b border-slate-800 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white">حركة الشحنات الحية</h2>
              <p className="text-xs text-slate-400 mt-0.5">متابعة دقيقة لكل المراحل والخطوات اللوجستية</p>
            </div>
            <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all shadow-lg shadow-blue-600/20 flex items-center gap-2">
              <Plus className="w-4 h-4" />
              <span>شحنة جديدة</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-right border-collapse">
              <thead>
                <tr className="bg-slate-950/50 text-slate-400 text-xs border-b border-slate-800">
                  <th className="py-3 px-5 font-semibold">رقم الشحنة</th>
                  <th className="py-3 px-5 font-semibold">العميل</th>
                  <th className="py-3 px-5 font-semibold">وجهة التسليم</th>
                  <th className="py-3 px-5 font-semibold">الحالة</th>
                  <th className="py-3 px-5 font-semibold">معدل الإنجاز</th>
                  <th className="py-3 px-5 font-semibold">الوقت</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-sm">
                {shipments.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-4 px-5 font-mono font-medium text-blue-400">{item.id}</td>
                    <td className="py-4 px-5 text-slate-200">{item.client}</td>
                    <td className="py-4 px-5 text-slate-400">{item.destination}</td>
                    <td className="py-4 px-5">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium inline-block ${
                        item.status === 'تم الاستلام' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                        item.status === 'جاري التجهيز' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                        item.status === 'قيد الشحن' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                        'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="py-4 px-5 w-48">
                      <div className="flex items-center gap-3">
                        <div className="flex-1 bg-slate-800 h-2 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${
                              item.progress === 100 ? 'bg-emerald-500' : 
                              item.progress > 50 ? 'bg-blue-500' : 'bg-amber-500'
                            }`} 
                            style={{ width: `${item.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-slate-400 font-mono">{item.progress}%</span>
                      </div>
                    </td>
                    <td className="py-4 px-5 text-xs text-slate-400 font-mono">{item.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </main>
    </div>
  );
}
