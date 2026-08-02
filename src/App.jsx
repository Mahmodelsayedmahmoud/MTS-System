import React, { useState, useEffect } from 'react';
import { 
  Package, Users, Building2, Clock, CheckCircle, 
  BarChart3, FileText, Search, LogOut, Play, Square, 
  ArrowRight, Download, Plus, Trash2, Shield
} from 'lucide-react';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');

  // بيانات تجريبية للنظام
  const [branches, setBranches] = useState([
    { id: 1, name: 'فرع القاهرة الرئيسي', code: 'CAI-01' },
    { id: 2, name: 'فرع الإسكندرية', code: 'ALX-02' }
  ]);

  const [messengers, setMessengers] = useState([
    { id: 1, name: 'أحمد محمد', phone: '01012345678', branch: 'فرع القاهرة الرئيسي' },
    { id: 2, name: 'محمود حسن', phone: '01198765432', branch: 'فرع الإسكندرية' }
  ]);

  const [tasks, setTasks] = useState([
    { 
      id: 1, 
      code: 'TRK-901', 
      messenger: 'أحمد محمد', 
      branch: 'فرع القاهرة الرئيسي', 
      stage: 'الارد', 
      status: 'جار العمل', 
      timer: 120,
      history: [{ stage: 'الوارد', time: '10:00 AM' }] 
    },
    { 
      id: 2, 
      code: 'TRK-902', 
      messenger: 'محمود حسن', 
      branch: 'فرع الإسكندرية', 
      stage: 'التحضير', 
      status: 'متوقف', 
      timer: 300,
      history: [{ stage: 'الوارد', time: '11:15 AM' }] 
    }
  ]);

  const stages = ['الوارد', 'التحضير', 'الجرد', 'التحميل', 'الكاشير', 'انتهى'];

  const handleLogin = (e) => {
    e.preventDefault();
    if (username && password) {
      setIsLoggedIn(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-right" dir="rtl">
      {!isLoggedIn ? (
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
            <div className="text-center mb-8">
              <div className="bg-blue-600 text-white p-4 rounded-xl inline-block mb-3 shadow-lg">
                <Package size={36} />
              </div>
              <h1 className="text-2xl font-bold text-gray-800">نظام تتبع الرسائل (MTS)</h1>
              <p className="text-gray-500 text-sm mt-1">تسجيل الدخول لإدارة العمليات واللوجستيات</p>
            </div>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">اسم المستخدم</label>
                <input 
                  type="text" 
                  value={username} 
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="أدخل اسم المستخدم"
                  required 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">كلمة المرور</label>
                <input 
                  type="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="أدخل كلمة المرور"
                  required 
                />
              </div>
              <button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-md transition duration-200">
                تسجيل الدخول
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="flex flex-1 flex-col md:flex-row">
          {/* الشريط الجانبي */}
          <aside className="w-full md:w-64 bg-slate-900 text-white p-5 flex flex-col justify-between shadow-xl">
            <div>
              <div className="flex items-center gap-3 mb-8 pb-4 border-b border-slate-800">
                <Package className="text-blue-400" size={30} />
                <span className="text-xl font-bold tracking-wide">MTS System</span>
              </div>
              <nav className="space-y-2">
                <button 
                  onClick={() => setActiveTab('dashboard')} 
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${activeTab === 'dashboard' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-300 hover:bg-slate-800'}`}>
                  <BarChart3 size={20} /> لوحة التحكم
                </button>
                <button 
                  onClick={() => setActiveTab('workflow')} 
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${activeTab === 'workflow' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-300 hover:bg-slate-800'}`}>
                  <Clock size={20} /> سير العمل
                </button>
                <button 
                  onClick={() => setActiveTab('branches')} 
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${activeTab === 'branches' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-300 hover:bg-slate-800'}`}>
                  <Building2 size={20} /> الفروع
                </button>
                <button 
                  onClick={() => setActiveTab('messengers')} 
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${activeTab === 'messengers' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-300 hover:bg-slate-800'}`}>
                  <Users size={20} /> المناديب
                </button>
                <button 
                  onClick={() => setActiveTab('analytics')} 
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${activeTab === 'analytics' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-300 hover:bg-slate-800'}`}>
                  <FileText size={20} /> التحليلات والتقارير
                </button>
              </nav>
            </div>
            <button 
              onClick={() => setIsLoggedIn(false)} 
              className="mt-6 flex items-center justify-center gap-2 w-full bg-red-600/20 text-red-400 hover:bg-red-600 hover:text-white py-3 rounded-xl transition font-medium">
              <LogOut size={18} /> تسجيل الخروج
            </button>
          </aside>

          {/* محتوى الصفحة الرئيسية */}
          <main className="flex-1 p-6 md:p-10 overflow-y-auto">
            <header className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-800">
                {activeTab === 'dashboard' && 'لوحة التحكم الرئيسية'}
                {activeTab === 'workflow' && 'مراحل سير العمل واللوجستيات'}
                {activeTab === 'branches' && 'إدارة الفروع'}
                {activeTab === 'messengers' && 'إدارة المناديب'}
                {activeTab === 'analytics' && 'تقارير التحليلات والتصدير'}
              </h2>
              <div className="flex items-center gap-3 w-full md:w-auto">
                <div className="relative flex-1 md:w-64">
                  <Search className="absolute right-3 top-3 text-gray-400" size={18} />
                  <input 
                    type="text" 
                    placeholder="بحث بالكود أو الاسم..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pr-10 pl-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                </div>
              </div>
            </header>

            {/* محتوى لوحة التحكم */}
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                    <div>
                      <p className="text-gray-500 text-sm">إجمالي الشحنات</p>
                      <h3 className="text-3xl font-bold text-gray-800 mt-1">{tasks.length}</h3>
                    </div>
                    <div className="bg-blue-50 text-blue-600 p-4 rounded-xl"><Package size={24} /></div>
                  </div>
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                    <div>
                      <p className="text-gray-500 text-sm">المناديب النشطون</p>
                      <h3 className="text-3xl font-bold text-gray-800 mt-1">{messengers.length}</h3>
                    </div>
                    <div className="bg-green-50 text-green-600 p-4 rounded-xl"><Users size={24} /></div>
                  </div>
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                    <div>
                      <p className="text-gray-500 text-sm">الفروع المتاحة</p>
                      <h3 className="text-3xl font-bold text-gray-800 mt-1">{branches.length}</h3>
                    </div>
                    <div className="bg-purple-50 text-purple-600 p-4 rounded-xl"><Building2 size={24} /></div>
                  </div>
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                    <div>
                      <p className="text-gray-500 text-sm">حالة النظام</p>
                      <h3 className="text-lg font-bold text-emerald-600 mt-1 flex items-center gap-1">
                        <CheckCircle size={18} /> متصل بـ Supabase
                      </h3>
                    </div>
                    <div className="bg-emerald-50 text-emerald-600 p-4 rounded-xl"><Shield size={24} /></div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">العمليات الأخيرة الحالية</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-right">
                      <thead>
                        <tr className="border-b border-gray-100 text-gray-400 text-sm">
                          <th className="pb-3">كود الشحنة</th>
                          <th className="pb-3">المندوب</th>
                          <th className="pb-3">الفرع</th>
                          <th className="pb-3">المرحلة الحالية</th>
                          <th className="pb-3">الحالة</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50 text-sm">
                        {tasks.map(t => (
                          <tr key={t.id} className="hover:bg-gray-50">
                            <td className="py-3 font-semibold text-blue-600">{t.code}</td>
                            <td className="py-3 text-gray-700">{t.messenger}</td>
                            <td className="py-3 text-gray-700">{t.branch}</td>
                            <td className="py-3"><span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">{t.stage}</span></td>
                            <td className="py-3"><span className="bg-amber-50 text-amber-700 px-3 py-1 rounded-full text-xs font-medium">{t.status}</span></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* صفحة سير العمل */}
            {activeTab === 'workflow' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                  {stages.map((stg, idx) => (
                    <div key={idx} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
                      <div>
                        <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-md">مرحلة {idx + 1}</span>
                        <h4 className="font-bold text-gray-800 mt-2 text-lg">{stg}</h4>
                      </div>
                      <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between items-center">
                        <button className="bg-emerald-50 text-emerald-600 p-2 rounded-lg hover:bg-emerald-100"><Play size={16} /></button>
                        <button className="bg-rose-50 text-rose-600 p-2 rounded-lg hover:bg-rose-100"><Square size={16} /></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* صفحة الفروع */}
            {activeTab === 'branches' && (
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-bold text-gray-800">قائمة الفروع المسجلة</h3>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2 hover:bg-blue-700">
                    <Plus size={16} /> إضافة فرع جديد
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {branches.map(b => (
                    <div key={b.id} className="p-4 border border-gray-100 rounded-xl flex justify-between items-center bg-gray-50">
                      <div>
                        <h4 className="font-bold text-gray-800">{b.name}</h4>
                        <p className="text-sm text-gray-500">الكود التعريفي: {b.code}</p>
                      </div>
                      <button className="text-red-500 hover:bg-red-50 p-2 rounded-lg"><Trash2 size={18} /></button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* صفحة المناديب */}
            {activeTab === 'messengers' && (
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-bold text-gray-800">قائمة المناديب</h3>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2 hover:bg-blue-700">
                    <Plus size={16} /> إضافة مندوب
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {messengers.map(m => (
                    <div key={m.id} className="p-4 border border-gray-100 rounded-xl flex justify-between items-center bg-gray-50">
                      <div>
                        <h4 className="font-bold text-gray-800">{m.name}</h4>
                        <p className="text-sm text-gray-500">الهاتف: {m.phone} | الفرع: {m.branch}</p>
                      </div>
                      <button className="text-red-500 hover:bg-red-50 p-2 rounded-lg"><Trash2 size={18} /></button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* صفحة التحليلات والتقارير */}
            {activeTab === 'analytics' && (
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-6">
                <h3 className="text-lg font-bold text-gray-800">تصدير التقارير البيانية</h3>
                <p className="text-gray-500 text-sm">يمكنك تصدير كافة بيانات شحنات نظام تتبع الرسائل بصيغ متوافقة مع الإدارة.</p>
                <div className="flex gap-4">
                  <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-3 rounded-xl font-medium flex items-center gap-2 shadow-sm">
                    <Download size={18} /> تصدير إلى Excel
                  </button>
                  <button className="bg-rose-600 hover:bg-rose-700 text-white px-5 py-3 rounded-xl font-medium flex items-center gap-2 shadow-sm">
                    <Download size={18} /> تصدير إلى PDF
                  </button>
                </div>
              </div>
            )}
          </main>
        </div>
      )}
    </div>
  );
}
