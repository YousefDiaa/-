import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { 
  Users, BookOpen, Layers, GraduationCap, DollarSign, Clock, Check, X,
  Trash2, Plus, RefreshCw, Calendar, MapPin, Eye, FileSpreadsheet, Settings, BarChart2
} from "lucide-react";
import { Teacher, Package, Book, SupportRequest, StudentInfo } from "../types";
import { MOCK_TEACHERS, MOCK_PACKAGES, MOCK_BOOKS } from "../data";

interface AdminDashboardProps {
  onRefreshData?: () => void;
}

export default function AdminDashboard({ onRefreshData }: AdminDashboardProps) {
  const [requests, setRequests] = useState<SupportRequest[]>([]);
  const [activeTab, setActiveTab] = useState<"analytics" | "requests" | "teachers" | "packages" | "books" | "homepage">("analytics");
  
  // States for Adding new items
  const [teachersList, setTeachersList] = useState<Teacher[]>(MOCK_TEACHERS);
  const [packagesList, setPackagesList] = useState<Package[]>(MOCK_PACKAGES);
  const [booksList, setBooksList] = useState<Book[]>(MOCK_BOOKS);

  // Forms states
  const [newTeacher, setNewTeacher] = useState({
    name: "", subject: "", experience: "", description: "", bio: "", photoUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=300"
  });

  const [newBook, setNewBook] = useState({
    title: "", teacherName: "", subject: "", description: "", price: 150, coverUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=300"
  });

  // Load and seed requests from localStorage
  const loadRequests = () => {
    const dataStr = localStorage.getItem("sarh_support_requests");
    if (dataStr) {
      setRequests(JSON.parse(dataStr));
    } else {
      // Seed with some very premium high-fidelity demo requests
      const demoRequests: SupportRequest[] = [
        {
          id: "REQ_98X21",
          studentInfo: {
            fullName: "يوسف ضياء الدين",
            phone: "01012345678",
            parentPhone: "01287654321",
            governorate: "القاهرة",
            branch: "علمي علوم",
            grade: "الصف الثالث الثانوي"
          },
          items: [
            { id: "1", itemType: "package", title: "الباقة العلمية الذهبية المتكاملة (علوم)", subtitle: "الباقة العلمية المتكاملة", price: 4500, originalId: "p1" },
            { id: "2", itemType: "book", title: "كتاب الفريد في النحو والبلاغة", subtitle: "أ. محمد الصاوي", price: 150, originalId: "b2" }
          ],
          notes: "أرجو شحن الكتب إلى الدقي في أقرب وقت لحضور محاضرة السبت أونلاين.",
          status: "pending",
          createdAt: new Date(Date.now() - 3600000 * 2).toISOString()
        },
        {
          id: "REQ_45Y89",
          studentInfo: {
            fullName: "أحمد عبد الله الحسيني",
            phone: "01198765432",
            parentPhone: "01512345678",
            governorate: "الجيزة",
            branch: "علمي رياضة",
            grade: "الصف الثالث الثانوي"
          },
          items: [
            { id: "3", itemType: "seat", title: "حجز مقعد سنتر - د. محمود الجوهري", subtitle: "الفيزياء (Physics)", price: 0, originalId: "t1" },
            { id: "4", itemType: "book", title: "مرجع الجوهري في الفيزياء", subtitle: "د. محمود الجوهري", price: 180, originalId: "b1" }
          ],
          notes: "أريد حجز مقعد سنتر الدقي.",
          status: "confirmed",
          createdAt: new Date(Date.now() - 3600000 * 12).toISOString()
        },
        {
          id: "REQ_12Z34",
          studentInfo: {
            fullName: "منة الله رشاد",
            phone: "01234560987",
            parentPhone: "01009876543",
            governorate: "الإسكندرية",
            branch: "أدبي",
            grade: "الصف الثاني الثانوي"
          },
          items: [
            { id: "5", itemType: "package", title: "الباقة الأدبية المتميزة", subtitle: "الباقة الأدبية المتكاملة", price: 3800, originalId: "p2" }
          ],
          notes: "أنا بالصف الثاني الثانوي، هل هذه الباقة تناسبني أم هناك باقة مخصصة؟",
          status: "cancelled",
          createdAt: new Date(Date.now() - 3600000 * 24).toISOString()
        }
      ];
      localStorage.setItem("sarh_support_requests", JSON.stringify(demoRequests));
      setRequests(demoRequests);
    }
  };

  useEffect(() => {
    loadRequests();
  }, []);

  const handleUpdateStatus = (id: string, newStatus: "pending" | "confirmed" | "cancelled") => {
    const updated = requests.map(req => {
      if (req.id === id) {
        return { ...req, status: newStatus };
      }
      return req;
    });
    setRequests(updated);
    localStorage.setItem("sarh_support_requests", JSON.stringify(updated));
  };

  const handleDeleteRequest = (id: string) => {
    if (window.confirm("هل أنت متأكد من حذف هذا الطلب نهائياً؟")) {
      const filtered = requests.filter(req => req.id !== id);
      setRequests(filtered);
      localStorage.setItem("sarh_support_requests", JSON.stringify(filtered));
    }
  };

  const handleAddTeacher = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTeacher.name && newTeacher.subject) {
      const added: Teacher = {
        id: "t_" + Date.now(),
        name: newTeacher.name,
        subject: newTeacher.subject,
        experience: newTeacher.experience || "١٠ أعوام من التميز",
        description: newTeacher.description || "معلم معتمد متميز.",
        bio: newTeacher.bio || "سيرة ذاتية متميزة لمعلم الأكاديمية.",
        rating: 4.8,
        ratingCount: 120,
        photoUrl: newTeacher.photoUrl,
        branches: ["الدقي", "أونلاين"],
        schedule: [{ day: "السبت", time: "02:00 م", type: "سنتر" }],
        individualLessons: []
      };
      const updated = [...teachersList, added];
      setTeachersList(updated);
      setNewTeacher({ name: "", subject: "", experience: "", description: "", bio: "", photoUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=300" });
      alert("تمت إضافة المعلم بنجاح للوحة التحكم!");
    }
  };

  const handleAddBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (newBook.title && newBook.subject) {
      const added: Book = {
        id: "b_" + Date.now(),
        title: newBook.title,
        teacherId: "t1",
        teacherName: newBook.teacherName || "مدرس الأكاديمية الرئيسي",
        subject: newBook.subject,
        description: newBook.description || "كتاب تعليمي ممتاز لشرح وتطبيقات المنهج.",
        price: Number(newBook.price) || 120,
        coverUrl: newBook.coverUrl
      };
      const updated = [...booksList, added];
      setBooksList(updated);
      setNewBook({ title: "", teacherName: "", subject: "", description: "", price: 150, coverUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=300" });
      alert("تمت إضافة الكتاب بنجاح لمتجر الأكاديمية!");
    }
  };

  // Analytics helper functions
  const totalIncomingPrice = requests.reduce((acc, req) => {
    if (req.status !== "cancelled") {
      const reqSum = req.items.reduce((s, it) => s + it.price, 0);
      return acc + reqSum;
    }
    return acc;
  }, 0);

  const pendingRequests = requests.filter(r => r.status === "pending");
  const confirmedRequests = requests.filter(r => r.status === "confirmed");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 text-right">
      
      {/* Header title */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-white/10">
        <div className="space-y-2">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">لوحة تحكم <span className="gold-gradient-text">إدارة الأكاديمية</span></h2>
          <p className="text-gray-400 text-xs sm:text-sm">مركز تحكم المدير لمتابعة طلبات التسجيل، وتحديث بيانات الأساتذة، ومبيعات الملازم ومؤشرات الأداء.</p>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={loadRequests}
            className="p-3 rounded-xl bg-white/5 border border-white/10 text-brand-gold-300 hover:bg-white/10 cursor-pointer flex items-center gap-2 text-xs font-bold"
          >
            <RefreshCw className="w-4 h-4" />
            <span>تحديث البيانات</span>
          </button>
        </div>
      </div>

      {/* Tabs list */}
      <div className="flex flex-wrap gap-2 pb-1 overflow-x-auto justify-start border-b border-white/5">
        <button
          onClick={() => setActiveTab("analytics")}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === "analytics" ? "gold-gradient-bg text-brand-navy-950 font-black" : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
          }`}
        >
          <BarChart2 className="w-4.5 h-4.5" />
          <span>مؤشرات الأداء والتحليلات</span>
        </button>

        <button
          onClick={() => setActiveTab("requests")}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 relative ${
            activeTab === "requests" ? "gold-gradient-bg text-brand-navy-950 font-black" : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
          }`}
        >
          <FileSpreadsheet className="w-4.5 h-4.5" />
          <span>طلبات الحجز الواردة</span>
          {pendingRequests.length > 0 && (
            <span className="absolute -top-1 -left-1 flex h-5 w-5 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white">
              {pendingRequests.length}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab("teachers")}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === "teachers" ? "gold-gradient-bg text-brand-navy-950 font-black" : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
          }`}
        >
          <GraduationCap className="w-4.5 h-4.5" />
          <span>إدارة المعلمين والجداول</span>
        </button>

        <button
          onClick={() => setActiveTab("books")}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === "books" ? "gold-gradient-bg text-brand-navy-950 font-black" : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
          }`}
        >
          <BookOpen className="w-4.5 h-4.5" />
          <span>متجر الكتب والأسعار</span>
        </button>
      </div>

      {/* Tabs contents */}
      <div className="space-y-6">
        
        {/* TAB 1: ANALYTICS */}
        {activeTab === "analytics" && (
          <div className="space-y-8 animate-fade-in">
            {/* Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              
              <div className="glass-panel p-6 rounded-2xl border border-white/5 text-right space-y-2">
                <p className="text-gray-400 text-xs font-semibold">إجمالي الحجوزات النشطة</p>
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-extrabold text-white">{requests.length} طلب</span>
                  <div className="w-10 h-10 rounded-xl bg-brand-gold-500/10 flex items-center justify-center text-brand-gold-400"><FileSpreadsheet className="w-5 h-5" /></div>
                </div>
                <p className="text-emerald-400 text-[11px]">مكتمل الحجز: {confirmedRequests.length}</p>
              </div>

              <div className="glass-panel p-6 rounded-2xl border border-white/5 text-right space-y-2">
                <p className="text-gray-400 text-xs font-semibold">الإيرادات المتوقعة (المقايسات)</p>
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-extrabold text-brand-gold-400">{totalIncomingPrice} ج.م</span>
                  <div className="w-10 h-10 rounded-xl bg-brand-gold-500/10 flex items-center justify-center text-brand-gold-400"><DollarSign className="w-5 h-5" /></div>
                </div>
                <p className="text-gray-500 text-[11px]">من إجمالي الباقات والمستلزمات الصالحة</p>
              </div>

              <div className="glass-panel p-6 rounded-2xl border border-white/5 text-right space-y-2">
                <p className="text-gray-400 text-xs font-semibold">الطلبات المعلقة بالمراجعة</p>
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-extrabold text-white">{pendingRequests.length} معلق</span>
                  <div className="w-10 h-10 rounded-xl bg-brand-gold-500/10 flex items-center justify-center text-brand-gold-400"><Clock className="w-5 h-5" /></div>
                </div>
                <p className="text-rose-400 text-[11px]">بحاجة لاتصال هاتفي عاجل</p>
              </div>

              <div className="glass-panel p-6 rounded-2xl border border-white/5 text-right space-y-2">
                <p className="text-gray-400 text-xs font-semibold">المدرسون النشطون</p>
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-extrabold text-white">{teachersList.length} أستاذ</span>
                  <div className="w-10 h-10 rounded-xl bg-brand-gold-500/10 flex items-center justify-center text-brand-gold-400"><GraduationCap className="w-5 h-5" /></div>
                </div>
                <p className="text-gray-500 text-[11px]">في 6 تخصصات أساسية للشعبتين</p>
              </div>

            </div>

            {/* Simulated Charts and Visual distributions */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Popular Teachers ranking */}
              <div className="lg:col-span-7 glass-panel p-6 rounded-2xl border border-white/5 space-y-4 text-right">
                <h3 className="text-lg font-bold text-white flex items-center gap-2 pb-2 border-b border-white/5">
                  <Users className="w-5 h-5 text-brand-gold-400" />
                  <span>مبيعات المعلمين وشعبية الإقبال</span>
                </h3>
                
                <div className="space-y-4">
                  {teachersList.slice(0, 4).map((t, index) => {
                    // simulate enrollment scale
                    const widthPercent = [92, 78, 65, 42][index] || 30;
                    const bookings = [480, 395, 320, 210][index] || 120;
                    return (
                      <div key={t.id} className="space-y-1.5 text-xs">
                        <div className="flex justify-between font-bold text-white">
                          <span>{t.name} ({t.subject})</span>
                          <span className="text-brand-gold-300">{bookings} حجز جديد</span>
                        </div>
                        <div className="w-full bg-brand-navy-950 h-3 rounded-full overflow-hidden p-0.5">
                          <div 
                            style={{ width: `${widthPercent}%` }} 
                            className="h-full gold-gradient-bg rounded-full shadow-inner"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Geographic / Grade distribution cards */}
              <div className="lg:col-span-5 glass-panel p-6 rounded-2xl border border-white/5 space-y-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2 pb-2 border-b border-white/5">
                  <MapPin className="w-5 h-5 text-brand-gold-400" />
                  <span>أكثر المحافظات تسجيلاً لطلب عروض أسعار</span>
                </h3>

                <div className="space-y-3 text-xs">
                  <div className="flex justify-between items-center py-2 border-b border-white/5">
                    <span className="text-white font-bold">1. القاهرة والضواحي</span>
                    <span className="px-2.5 py-0.5 bg-brand-gold-500/10 text-brand-gold-300 rounded-md font-bold">٥٤٪ من الطلبات</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-white/5">
                    <span className="text-white font-bold">2. الجيزة وأكتوبر</span>
                    <span className="px-2.5 py-0.5 bg-brand-gold-500/10 text-brand-gold-300 rounded-md font-bold">٢٨٪ من الطلبات</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-white font-bold">3. الإسكندرية والوجه البحري</span>
                    <span className="px-2.5 py-0.5 bg-brand-gold-500/10 text-brand-gold-300 rounded-md font-bold">١٨٪ من الطلبات</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 2: REQUESTS MANAGER */}
        {activeTab === "requests" && (
          <div className="space-y-6 animate-fade-in">
            <div className="glass-panel p-6 rounded-2xl border border-white/5 space-y-4">
              <h3 className="text-lg font-bold text-white">إدارة طلبات تسجيل الطلاب والاتصال المباشر</h3>
              
              {requests.length === 0 ? (
                <p className="text-center text-gray-500 py-12 text-sm">لا توجد أي طلبات مسجلة حالياً.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-right text-xs">
                    <thead>
                      <tr className="border-b border-white/10 text-brand-gold-300 text-xs">
                        <th className="py-3 px-4">رقم الطلب</th>
                        <th className="py-3 px-4">بيانات الطالب</th>
                        <th className="py-3 px-4">المحافظة / الشعبة</th>
                        <th className="py-3 px-4">المستلزمات المطلوبة</th>
                        <th className="py-3 px-4">ملاحظات الطالب</th>
                        <th className="py-3 px-4">الحالة والتأكيد</th>
                        <th className="py-3 px-4 text-center">حذف</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-gray-300">
                      {requests.map((req) => {
                        const total = req.items.reduce((acc, it) => acc + it.price, 0);
                        return (
                          <tr key={req.id} className="hover:bg-white/5 transition-colors">
                            <td className="py-4 px-4 font-bold text-brand-gold-400 whitespace-nowrap">{req.id}</td>
                            <td className="py-4 px-4 space-y-1">
                              <p className="text-white font-bold text-sm">{req.studentInfo.fullName}</p>
                              <p className="text-gray-400 font-mono">هاتف الطالب: {req.studentInfo.phone}</p>
                              <p className="text-gray-400 font-mono">ولي الأمر: {req.studentInfo.parentPhone}</p>
                            </td>
                            <td className="py-4 px-4 space-y-1">
                              <p className="text-white font-medium">{req.studentInfo.governorate}</p>
                              <p className="text-brand-gold-300 text-[10px] font-bold">{req.studentInfo.grade} • {req.studentInfo.branch}</p>
                            </td>
                            <td className="py-4 px-4 space-y-1">
                              <div className="space-y-0.5 max-w-[200px]">
                                {req.items.map((it, idx) => (
                                  <p key={idx} className="text-white text-[11px] truncate">
                                    • {it.title} ({it.price > 0 ? `${it.price} ج.م` : "تأكيد"})
                                  </p>
                                ))}
                              </div>
                              {total > 0 && <p className="text-brand-gold-300 font-black text-xs mt-1.5 border-t border-white/5 pt-1">الإجمالي: {total} ج.م</p>}
                            </td>
                            <td className="py-4 px-4 max-w-xs whitespace-normal truncate text-gray-400 leading-relaxed italic">
                              {req.notes || "لا يوجد"}
                            </td>
                            <td className="py-4 px-4 whitespace-nowrap space-y-2">
                              <span className={`inline-block px-2.5 py-1 rounded-md font-bold text-[10px] ${
                                req.status === "pending" ? "bg-amber-500/15 text-amber-400 border border-amber-500/20" :
                                req.status === "confirmed" ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20" :
                                "bg-rose-500/15 text-rose-400 border border-rose-500/20"
                              }`}>
                                {req.status === "pending" ? "معلق بالانتظار" :
                                 req.status === "confirmed" ? "مؤكد ومكتمل" :
                                 "ملغي"}
                              </span>
                              
                              {/* Status control buttons */}
                              <div className="flex gap-1">
                                <button
                                  onClick={() => handleUpdateStatus(req.id, "confirmed")}
                                  className="p-1 rounded bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500 hover:text-brand-navy-950 transition-all cursor-pointer"
                                  title="تأكيد الحجز وتفعيل الكود"
                                >
                                  <Check className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => handleUpdateStatus(req.id, "cancelled")}
                                  className="p-1 rounded bg-rose-500/10 text-rose-400 hover:bg-rose-500 hover:text-white transition-all cursor-pointer"
                                  title="إلغاء الطلب"
                                >
                                  <X className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                            <td className="py-4 px-4 text-center">
                              <button
                                onClick={() => handleDeleteRequest(req.id)}
                                className="p-1.5 rounded bg-white/5 text-rose-400 hover:bg-rose-500 hover:text-white transition-all cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 3: TEACHERS MANAGER */}
        {activeTab === "teachers" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fade-in">
            {/* List of current teachers */}
            <div className="lg:col-span-7 glass-panel p-6 rounded-2xl border border-white/5 space-y-4">
              <h3 className="text-lg font-bold text-white">طاقم التدريس الحالي بالأكاديمية</h3>
              
              <div className="space-y-3">
                {teachersList.map((teacher) => (
                  <div key={teacher.id} className="flex items-center justify-between p-3 rounded-xl bg-brand-navy-950/60 border border-white/5">
                    <div className="flex items-center gap-3 text-right">
                      <img 
                        src={teacher.photoUrl} 
                        alt={teacher.name} 
                        className="w-12 h-12 rounded-full object-cover border border-brand-gold-500"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <p className="text-white font-bold">{teacher.name}</p>
                        <p className="text-xs text-brand-gold-300">{teacher.subject}</p>
                      </div>
                    </div>
                    <span className="text-gray-500 text-xs font-semibold">{teacher.experience}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Add teacher form */}
            <div className="lg:col-span-5">
              <form onSubmit={handleAddTeacher} className="glass-panel p-6 rounded-2xl border border-white/5 space-y-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2 pb-2 border-b border-white/5">
                  <Plus className="w-5 h-5 text-brand-gold-400" />
                  <span>إضافة معلم جديد</span>
                </h3>

                <div className="space-y-3 text-xs">
                  <div className="space-y-1">
                    <label className="text-gray-400 font-bold">اسم الأستاذ *</label>
                    <input
                      type="text"
                      required
                      placeholder="الأستاذ الدكتور..."
                      value={newTeacher.name}
                      onChange={(e) => setNewTeacher({ ...newTeacher, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-brand-navy-950 border border-white/10 text-white text-xs focus:outline-none focus:border-brand-gold-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-gray-400 font-bold">المادة والشعبة *</label>
                    <input
                      type="text"
                      required
                      placeholder="الكيمياء / علمي علوم..."
                      value={newTeacher.subject}
                      onChange={(e) => setNewTeacher({ ...newTeacher, subject: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-brand-navy-950 border border-white/10 text-white text-xs focus:outline-none focus:border-brand-gold-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-gray-400 font-bold">الخبرة التدريسية *</label>
                    <input
                      type="text"
                      required
                      placeholder="15 عاماً في تدريس الثانوية..."
                      value={newTeacher.experience}
                      onChange={(e) => setNewTeacher({ ...newTeacher, experience: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-brand-navy-950 border border-white/10 text-white text-xs focus:outline-none focus:border-brand-gold-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-gray-400 font-bold">نبذة تعريفية سريعة</label>
                    <textarea
                      rows={2}
                      placeholder="أسطورة تدريس المادة..."
                      value={newTeacher.description}
                      onChange={(e) => setNewTeacher({ ...newTeacher, description: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-brand-navy-950 border border-white/10 text-white text-xs focus:outline-none focus:border-brand-gold-500"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl gold-gradient-bg font-black text-brand-navy-950 text-xs shadow-md shadow-brand-gold-500/10 hover:opacity-90 transition-all cursor-pointer"
                >
                  حفظ المعلم وإتاحته للطلاب
                </button>
              </form>
            </div>
          </div>
        )}

        {/* TAB 4: BOOKS MANAGER */}
        {activeTab === "books" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fade-in">
            {/* List of current books */}
            <div className="lg:col-span-7 glass-panel p-6 rounded-2xl border border-white/5 space-y-4">
              <h3 className="text-lg font-bold text-white">الكتب والمراجع المتاحة بالمتجر</h3>
              
              <div className="space-y-3">
                {booksList.map((book) => (
                  <div key={book.id} className="flex items-center justify-between p-3 rounded-xl bg-brand-navy-950/60 border border-white/5 text-xs">
                    <div className="text-right">
                      <p className="text-white font-bold">{book.title}</p>
                      <p className="text-gray-400">تأليف: {book.teacherName} • مادة: {book.subject}</p>
                    </div>
                    <span className="text-brand-gold-300 font-bold">{book.price} ج.م</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Add book form */}
            <div className="lg:col-span-5">
              <form onSubmit={handleAddBook} className="glass-panel p-6 rounded-2xl border border-white/5 space-y-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2 pb-2 border-b border-white/5">
                  <Plus className="w-5 h-5 text-brand-gold-400" />
                  <span>إضافة كتاب أو ملزمة</span>
                </h3>

                <div className="space-y-3 text-xs">
                  <div className="space-y-1">
                    <label className="text-gray-400 font-bold">عنوان الكتاب *</label>
                    <input
                      type="text"
                      required
                      placeholder="التميز في الفيزياء للشرح..."
                      value={newBook.title}
                      onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-brand-navy-950 border border-white/10 text-white text-xs focus:outline-none focus:border-brand-gold-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-gray-400 font-bold">اسم المدرس مؤلف المادة *</label>
                    <input
                      type="text"
                      required
                      placeholder="د. محمود الجوهري..."
                      value={newBook.teacherName}
                      onChange={(e) => setNewBook({ ...newBook, teacherName: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-brand-navy-950 border border-white/10 text-white text-xs focus:outline-none focus:border-brand-gold-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-gray-400 font-bold">المادة الدراسية *</label>
                    <input
                      type="text"
                      required
                      placeholder="الفيزياء..."
                      value={newBook.subject}
                      onChange={(e) => setNewBook({ ...newBook, subject: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-brand-navy-950 border border-white/10 text-white text-xs focus:outline-none focus:border-brand-gold-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-gray-400 font-bold">سعر النسخة (جنيه مصري) *</label>
                    <input
                      type="number"
                      required
                      placeholder="150"
                      value={newBook.price}
                      onChange={(e) => setNewBook({ ...newBook, price: Number(e.target.value) })}
                      className="w-full px-4 py-2.5 rounded-xl bg-brand-navy-950 border border-white/10 text-white text-xs focus:outline-none focus:border-brand-gold-500"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl gold-gradient-bg font-black text-brand-navy-950 text-xs shadow-md shadow-brand-gold-500/10 hover:opacity-90 transition-all cursor-pointer"
                >
                  حفظ الكتاب وإتاحته بالمتجر
                </button>
              </form>
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
