import React, { useState } from 'react';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  
  const metrics = {
    totalInbound: 1420,
    processing: 385,
    outbound: 890,
    delayed: 45
  };

  const shipments = [
    { id: '#5009', client: 'شركة النور للتجارة', destination: 'القاهرة - المقطم', status: 'جاري التجهيز', progress: 65, time: '10:15 AM' },
    { id: '#8830', client: 'مؤسسة الأمل للصناعة', destination: 'الإسكندرية - سموحة', status: 'تم الاستلام', progress: 100, time: '09:30 AM' },
    { id: '#9102', client: 'مخازن الدلتا الحديثة', destination: 'طنطا - الاستاد', status: 'قيد الشحن', progress: 40, time: '08:45 AM' },
    { id: '#3341', client: 'شركة الفراعنة للاستيراد', destination: 'الجيزة - الهرم', status: 'متأخر', progress: 20, time: 'أمس' },
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#020617', color: '#f8fafc', fontFamily: 'system-ui, sans-serif', direction: 'rtl', paddingBottom: '40px' }}>
      {/* رأس الصفحة */}
      <header style={{ backgroundColor: '#0f172a', borderBottom: '1px solid #1e293b', padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ backgroundColor: '#2563eb', padding: '10px', borderRadius: '12px', color: '#fff', fontWeight: 'bold' }}>TB</div>
          <div>
            <h1 style={{ fontSize: '18px', fontWeight: 'bold', margin: 0, color: '#fff' }}>TBOS System</h1>
            <p style={{ fontSize: '12px', color: '#94a3b8', margin: 0 }}>إدارة حركة المستودعات واللوجستيات</p>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <input 
            type="text" 
            placeholder="بحث برقم الشحنة..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ backgroundColor: '#020617', border: '1px solid #334155', borderRadius: '8px', padding: '8px 12px', color: '#fff', fontSize: '14px', outline: 'none' }}
          />
        </div>
      </header>

      {/* المحتوى */}
      <main style={{ maxWidth: '1200px', margin: '24px auto', padding: '0 16px' }}>
        
        {/* العدادات */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '24px' }}>
          <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '16px', padding: '20px' }}>
            <p style={{ fontSize: '12px', color: '#94a3b8', margin: '0 0 8px 0' }}>إجمالي الوارد</p>
            <h3 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0, color: '#fff' }}>{metrics.totalInbound}</h3>
            <span style={{ fontSize: '11px', color: '#34d399', backgroundColor: 'rgba(52, 211, 153, 0.1)', padding: '2px 8px', borderRadius: '6px', display: 'inline-block', marginTop: '8px' }}>+12% عن أمس</span>
          </div>

          <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '16px', padding: '20px' }}>
            <p style={{ fontSize: '12px', color: '#94a3b8', margin: '0 0 8px 0' }}>تحت المعالجة والتجهيز</p>
            <h3 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0, color: '#fff' }}>{metrics.processing}</h3>
            <span style={{ fontSize: '11px', color: '#fbbf24', backgroundColor: 'rgba(251, 191, 36, 0.1)', padding: '2px 8px', borderRadius: '6px', display: 'inline-block', marginTop: '8px' }}>تحديث مستمر</span>
          </div>

          <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '16px', padding: '20px' }}>
            <p style={{ fontSize: '12px', color: '#94a3b8', margin: '0 0 8px 0' }}>الصادر والمنتهى</p>
            <h3 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0, color: '#fff' }}>{metrics.outbound}</h3>
            <span style={{ fontSize: '11px', color: '#60a5fa', backgroundColor: 'rgba(96, 165, 250, 0.1)', padding: '2px 8px', borderRadius: '6px', display: 'inline-block', marginTop: '8px' }}>جاهز للتسليم</span>
          </div>

          <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '16px', padding: '20px' }}>
            <p style={{ fontSize: '12px', color: '#94a3b8', margin: '0 0 8px 0' }}>الشحنات المتأخرة</p>
            <h3 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0, color: '#fb7185' }}>{metrics.delayed}</h3>
            <span style={{ fontSize: '11px', color: '#fb7185', backgroundColor: 'rgba(251, 113, 133, 0.1)', padding: '2px 8px', borderRadius: '6px', display: 'inline-block', marginTop: '8px' }}>تتطلب تدخل</span>
          </div>
        </div>

        {/* الجدول */}
        <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '16px', overflow: 'hidden' }}>
          <div style={{ padding: '20px', borderBottom: '1px solid #1e293b', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 'bold', margin: 0, color: '#fff' }}>حركة الشحنات الحية</h2>
            <button style={{ backgroundColor: '#2563eb', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>+ شحنة جديدة</button>
          </div>
          
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'right' }}>
              <thead>
                <tr style={{ backgroundColor: '#020617', color: '#94a3b8', fontSize: '13px', borderBottom: '1px solid #1e293b' }}>
                  <th style={{ padding: '12px 16px' }}>رقم الشحنة</th>
                  <th style={{ padding: '12px 16px' }}>العميل</th>
                  <th style={{ padding: '12px 16px' }}>وجهة التسليم</th>
                  <th style={{ padding: '12px 16px' }}>الحالة</th>
                  <th style={{ padding: '12px 16px' }}>الإنجاز</th>
                  <th style={{ padding: '12px 16px' }}>الوقت</th>
                </tr>
              </thead>
              <tbody>
                {shipments.map((item, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid #1e293b', fontSize: '14px' }}>
                    <td style={{ padding: '14px 16px', color: '#60a5fa', fontFamily: 'monospace' }}>{item.id}</td>
                    <td style={{ padding: '14px 16px', color: '#f1f5f9' }}>{item.client}</td>
                    <td style={{ padding: '14px 16px', color: '#94a3b8' }}>{item.destination}</td>
                    <td style={{ padding: '14px 16px' }}>
                      <span style={{ 
                        padding: '4px 10px', borderRadius: '20px', fontSize: '12px',
                        backgroundColor: item.status === 'تم الاستلام' ? 'rgba(52, 211, 153, 0.1)' : item.status === 'جاري التجهيز' ? 'rgba(96, 165, 250, 0.1)' : 'rgba(251, 191, 36, 0.1)',
                        color: item.status === 'تم الاستلام' ? '#34d399' : item.status === 'جاري التجهيز' ? '#60a5fa' : '#fbbf24'
                      }}>
                        {item.status}
                      </span>
                    </td>
                    <td style={{ padding: '14px 16px', width: '150px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ flex: 1, backgroundColor: '#1e293b', height: '8px', borderRadius: '4px', overflow: 'hidden' }}>
                          <div style={{ width: `${item.progress}%`, backgroundColor: '#2563eb', height: '100%' }}></div>
                        </div>
                        <span style={{ fontSize: '12px', color: '#94a3b8' }}>{item.progress}%</span>
                      </div>
                    </td>
                    <td style={{ padding: '14px 16px', color: '#94a3b8', fontSize: '12px' }}>{item.time}</td>
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
