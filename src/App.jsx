import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Activity, 
  Building2, 
  Users, 
  FileText, 
  LogOut, 
  Plus, 
  Search, 
  Clock, 
  Car, 
  MapPin, 
  BarChart3, 
  Download 
} from 'lucide-react';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [activeTab, setActiveTab] = useState('workflow');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('all');

  const [messengers, setMessengers] = useState([
    { 
      id: 1, 
      name: 'أحمد محمد', 
      code: '5009', 
      car: 'س ن ر 8830', 
      branchId: 'cairo', 
      status: 'active', 
      prep: { start: true, end: true, time: '10:15 AM' }, 
      incoming: { start: true, end: false, time: '10:45 AM' }, 
      inventory: { start: false, end: false, time: null } 
    },
    { 
      id: 2, 
      name: 'محمد إسماعيل', 
      code: '5008', 
      car: 'ص ل د 1234', 
      branchId: 'tanta', 
      status: 'done', 
      prep: { start: true, end: true, time: '09:00 AM' }, 
      incoming: { start: true, end: true, time: '09:30 AM' }, 
      inventory: { start: true, end: true, time: '10:00 AM' } 
    }
  ]);

  const stages = [
    { key: 'prep', label: 'التحضير' },
    { key: 'incoming', label: 'الوصول' },
    { key: 'inventory', label: 'الجرد' },
    { key: 'loading', label: 'التحميل' },
    { key: 'cashier', label: 'الكاشير' }
  ];

  const handleStartStage = (id, key) => {
    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setMessengers(messengers.map(m => {
      if (m.id === id) {
        return { ...m, [key]: { start: true, end: false, time: currentTime } };
      }
      return m;
    }));
  };

  const handleEndStage = (id, key) => {
    setMessengers(messengers.map(m => {
      if (m.id === id) {
        const stageData = m[key] || {};
        return { ...m, [key]: { ...stageData, end: true } };
      }
      return m;
    }));
  };

  const filteredMessengers = messengers.filter(m => {
    const matchesSearch = m.name.includes(searchQuery) || m.code.includes(searchQuery) || m.car.includes(searchQuery);
    const matchesBranch = selectedBranch === 'all' || m.branchId === selectedBranch;
    return matchesSearch && matchesBranch;
  });

  return (
    <div className="min-h-screen bg-[#0d1117] text-slate-100 flex flex-col md:flex-row font-sans dir-rtl">
      
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-[#161b22] border-l border-slate-800 p-4 flex flex-col justify-between shrink-0">
        <div>
          <div className="flex items-center gap-3 mb-8 px-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center font-bold text-white shadow-lg">
              TB
            </div>
            <div>
              <h1 className="font-extrabold text-lg tracking-wide">TBOS System</h1>
              <p className="text-xs text-slate-400">إدارة اللوجستيات والمخازن</p>
            </div>
          </div>

          <nav className="space-y-1.5">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all ${activeTab === 'dashboard' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'}`}
            >
              <LayoutDashboard size={20} />
              لوحة التحكم
            </button>

            <button
              onClick={() => setActiveTab('workflow')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all ${activeTab === 'workflow' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'}`}
            >
              <Activity size={20} />
              سير العمل المباشر
            </button>

            <button
              onClick={() => setActiveTab('branches')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all ${activeTab === 'branches' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'}`}
            >
              <Building2 size={20} />
              الفروع
            </button>

            <button
              onClick={() => setActiveTab('analytics')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all ${activeTab === 'analytics' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'}`}
            >
              <BarChart3 size={20} />
              التقارير الذكية
            </button>
          </nav>
        </div>

        <button
          onClick={() => setIsLoggedIn(false)}
          className="mt-6 flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm text-rose-400 hover:bg-rose-500/10 transition-all border border-rose-500/20"
        >
          <LogOut size={18} />
          تسجيل الخروج
        </button>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-8 overflow-y-auto bg-[#0d1117]">
        
        {/* Header Title */}
        <header className="mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <h2 className="text-2xl font-black text-white">
              {activeTab === 'dashboard' && 'لوحة التحكم الرئيسية'}
              {activeTab === 'workflow' && 'خط سير العمل المباشر للمناديب'}
              {activeTab === 'branches' && 'إدارة الفروع والسعات'}
              {activeTab === 'analytics' && 'التقارير الذكية والتحليلات'}
            </h2>
            <p className="text-sm text-slate-400 mt-1">متابعة دقيقة لحظية لحركة الشحنات وتجهيز المناديب</p>
          </div>
          
          <div className="flex items-center gap-3">
            <span className="px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              متصل بقاعدة البيانات
            </span>
          </div>
        </header>

        {/* Workflow & Messengers Tab */}
        {activeTab === 'workflow' && (
          <div className="space-y-6">
            
            {/* Search & Filters Bar */}
            <div className="flex flex-col md:flex-row items-center gap-4 bg-[#161b22] p-4 rounded-2xl border border-slate-800">
              <div className="relative flex-1 w-full">
                <Search className="absolute right-3.5 top-3.5 text-slate-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="ابحث باسم المندوب، أو الكود، أو السيارة..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#0d1117] border border-slate-800 rounded-xl px-4 py-2.5 pr-10 text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex items-center gap-2 w-full md:w-auto">
                <select
                  value={selectedBranch}
                  onChange={(e) => setSelectedBranch(e.target.value)}
                  className="bg-[#0d1117] border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="all">جميع الفروع</option>
                  <option value="cairo">فرع القاهرة</option>
                  <option value="tanta">فرع طنطا</option>
                </select>

                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 shadow-lg shadow-blue-600/20 shrink-0">
                  <Plus size={16} />
                  إضافة مندوب
                </button>
              </div>
            </div>

            {/* Messengers List / Cards */}
            <div className="space-y-4">
              {filteredMessengers.map(m => (
                <div key={m.id} className="bg-[#161b22] border border-slate-800 rounded-2xl p-5 shadow-xl hover:border-slate-700 transition-all">
                  
                  {/* Messenger Header Info */}
                  <div className="flex items-center justify-between gap-4 flex-wrap pb-4 border-b border-slate-800/80">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center font-bold text-white text-lg shadow-md">
                        {m.name[0]}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-base text-white">{m.name}</h3>
                          <span className="text-xs bg-slate-800 border border-slate-700 px-2 py-0.5 rounded-md text-slate-300">
                            #{m.code}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
                          <span className="flex items-center gap-1"><Car size={13} /> {m.car}</span>
                          <span className="flex items-center gap-1"><MapPin size={13} /> {m.branchId === 'cairo' ? 'فرع القاهرة' : 'فرع طنطا'}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Stages Buttons Grid with Timers */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mt-4">
                    {stages.map(st => {
                      const stageInfo = m[st.key] || {};
                      const isRunning = stageInfo.start && !stageInfo.end;
                      const isDone = stageInfo.end;

                      return (
                        <div key={st.key} className={`p-3 rounded-xl border ${isDone ? 'bg-emerald-500/5 border-emerald-500/20' : isRunning ? 'bg-blue-600/10 border-blue-500/30' : 'bg-[#0d1117] border-slate-800'}`}>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-bold text-slate-300">{st.label}</span>
                            <div className={`w-2 h-2 rounded-full ${isDone ? 'bg-emerald-500' : isRunning ? 'bg-blue-500 animate-ping' : 'bg-slate-600'}`}></div>
                          </div>

                          {stageInfo.time && (
                            <div className="flex items-center gap-1 text-[11px] text-blue-400 mb-2 font-mono">
                              <Clock size={11} />
                              <span>{stageInfo.time}</span>
                            </div>
                          )}

                          <div className="flex gap-1.5 mt-2">
                            {isDone ? (
                              <span className="w-full text-center text-xs text-emerald-400 py-1 rounded-lg bg-emerald-500/10 font-bold">
                                تم ✓
                              </span>
                            ) : isRunning ? (
                              <button
                                onClick={() => handleEndStage(m.id, st.key)}
                                className="w-full text-xs bg-rose-600 hover:bg-rose-700 text-white py-1.5 rounded-lg font-bold transition-all shadow-sm"
                              >
                                إنهاء
                              </button>
                            ) : (
                              <button
                                onClick={() => handleStartStage(m.id, st.key)}
                                className="w-full text-xs bg-blue-600 hover:bg-blue-700 text-white py-1.5 rounded-lg font-bold transition-all shadow-sm"
                              >
                                بدء
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                </div>
              ))}
            </div>

          </div>
        )}

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#161b22] border border-slate-800 p-6 rounded-2xl shadow-xl">
              <h3 className="text-slate-400 text-sm font-medium">إجمالي المندوبين النشطين</h3>
              <p className="text-3xl font-black text-white mt-2">11 مندوب</p>
            </div>
            <div className="bg-[#161b22] border border-slate-800 p-6 rounded-2xl shadow-xl">
              <h3 className="text-slate-400 text-sm font-medium">متوسط وقت الدورة</h3>
              <p className="text-3xl font-black text-blue-400 mt-2">22 دقيقة</p>
            </div>
            <div className="bg-[#161b22] border border-slate-800 p-6 rounded-2xl shadow-xl">
              <h3 className="text-slate-400 text-sm font-medium">المهام المكتملة اليوم</h3>
              <p className="text-3xl font-black text-emerald-400 mt-2">48 شحنة</p>
            </div>
          </div>
        )}

        {/* Branches Tab */}
        {activeTab === 'branches' && (
          <div className="bg-[#161b22] border border-slate-800 p-6 rounded-2xl shadow-xl">
            <h3 className="text-lg font-bold text-white mb-4">إدارة الفروع والسعات المتاحة</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-[#0d1117] border border-slate-800">
                <h4 className="font-bold text-blue-400">فرع القاهرة الرئيسي</h4>
                <p className="text-xs text-slate-400 mt-1">الأرصفة المتاحة: 3 / 5</p>
              </div>
              <div className="p-4 rounded-xl bg-[#0d1117] border border-slate-800">
                <h4 className="font-bold text-blue-400">فرع طنطا</h4>
                <p className="text-xs text-slate-400 mt-1">الأرصفة المتاحة: 2 / 4</p>
              </div>
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="bg-[#161b22] border border-slate-800 p-6 rounded-2xl shadow-xl space-y-4">
            <h3 className="text-lg font-bold text-white">التقارير البيانية والملفات</h3>
            <div className="flex gap-4">
              <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2">
                <Download size={18} /> تصدير إلى Excel
              </button>
              <button className="bg-rose-600 hover:bg-rose-700 text-white px-4 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2">
                <Download size={18} /> تصدير إلى PDF
              </button>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
