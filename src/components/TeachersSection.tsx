import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Star, MapPin, Calendar, BookOpen, Clock, Plus, Check, ArrowRight,
  Shield, BookMarked, Layers, PhoneCall, Award
} from "lucide-react";
import { Teacher, CartItem } from "../types";
import { MOCK_TEACHERS } from "../data";

interface TeachersSectionProps {
  onAddToRequest: (item: Omit<CartItem, "id">) => void;
  cart: CartItem[];
  selectedTeacher: Teacher | null;
  setSelectedTeacher: (teacher: Teacher | null) => void;
}

export default function TeachersSection({ onAddToRequest, cart, selectedTeacher, setSelectedTeacher }: TeachersSectionProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("الكل");
  const [selectedSubject, setSelectedSubject] = useState("الكل");

  // Get unique branches and subjects
  const allBranches = ["الكل", ...Array.from(new Set(MOCK_TEACHERS.flatMap((t) => t.branches)))];
  const allSubjects = ["الكل", ...Array.from(new Set(MOCK_TEACHERS.map((t) => t.subject.split(" ")[0])))];

  const filteredTeachers = MOCK_TEACHERS.filter((teacher) => {
    const matchesSearch = teacher.name.includes(searchTerm) || teacher.subject.includes(searchTerm);
    const matchesBranch = selectedBranch === "الكل" || teacher.branches.includes(selectedBranch);
    const matchesSubject = selectedSubject === "الكل" || teacher.subject.includes(selectedSubject);
    return matchesSearch && matchesBranch && matchesSubject;
  });

  const isAlreadyInCart = (originalId: string, itemType: string) => {
    return cart.some((item) => item.originalId === originalId && item.itemType === itemType);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      <AnimatePresence mode="wait">
        {!selectedTeacher ? (
          /* TEACHER GRID PAGE */
          <motion.div
            key="grid"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-8 animate-fade-in"
          >
            {/* Header Title */}
            <div className="text-right space-y-3">
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
                نخبة من <span className="gold-gradient-text">عمالقة التدريس</span> بمصر
              </h2>
              <p className="text-gray-400 max-w-2xl text-xs sm:text-sm">
                تصفح السير الذاتية لأكبر المدرسين، واطلع على جداول المحاضرات، واحجز مكانك بالسنتر أو أونلاين على الفور.
              </p>
            </div>

            {/* Search & Filters Panel */}
            <div className="glass-panel p-6 rounded-2xl border border-white/5 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                {/* Search Bar */}
                <div className="flex flex-col gap-1.5 text-right">
                  <label className="text-xs text-brand-gold-300 font-bold">ابحث عن المعلم</label>
                  <input
                    type="text"
                    placeholder="اكتب اسم المدرس أو المادة..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-brand-navy-950 border border-white/10 text-white text-xs placeholder-gray-500 focus:outline-none focus:border-brand-gold-500"
                  />
                </div>

                {/* Branch filter */}
                <div className="flex flex-col gap-1.5 text-right">
                  <label className="text-xs text-brand-gold-300 font-bold">تصفية حسب مقر السنتر</label>
                  <select
                    value={selectedBranch}
                    onChange={(e) => setSelectedBranch(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-brand-navy-950 border border-white/10 text-white text-xs focus:outline-none focus:border-brand-gold-500"
                  >
                    {allBranches.map((branch) => (
                      <option key={branch} value={branch}>{branch}</option>
                    ))}
                  </select>
                </div>

                {/* Subject filter */}
                <div className="flex flex-col gap-1.5 text-right">
                  <label className="text-xs text-brand-gold-300 font-bold">المادة الدراسية</label>
                  <select
                    value={selectedSubject}
                    onChange={(e) => setSelectedSubject(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-brand-navy-950 border border-white/10 text-white text-xs focus:outline-none focus:border-brand-gold-500"
                  >
                    {allSubjects.map((sub) => (
                      <option key={sub} value={sub}>{sub}</option>
                    ))}
                  </select>
                </div>

              </div>
            </div>

            {/* Grid display */}
            {filteredTeachers.length === 0 ? (
              <div className="text-center p-12 glass-panel rounded-2xl border border-white/5 space-y-4">
                <p className="text-gray-400 text-sm font-semibold">عذراً، لم نجد أي مدرسين يطابقون خيارات البحث الحالية.</p>
                <button
                  onClick={() => { setSearchTerm(""); setSelectedBranch("الكل"); setSelectedSubject("الكل"); }}
                  className="px-5 py-2 rounded-xl bg-brand-gold-500 text-brand-navy-950 font-bold text-xs"
                >
                  إعادة تعيين الفلاتر
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredTeachers.map((teacher, idx) => (
                  <motion.div
                    key={teacher.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="glass-panel rounded-3xl overflow-hidden border border-white/5 hover:border-brand-gold-500/30 hover:scale-[1.01] transition-all duration-300 flex flex-col justify-between group"
                  >
                    <div>
                      {/* Teacher Image Area */}
                      <div className="relative h-72 bg-brand-navy-900 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy-950 via-brand-navy-950/20 to-transparent z-10"></div>
                        <img 
                          src={teacher.photoUrl} 
                          alt={teacher.name} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                        {/* Badges */}
                        <div className="absolute top-4 right-4 z-20 flex items-center gap-1 bg-brand-navy-950/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                          <Star className="w-3.5 h-3.5 text-brand-gold-400 fill-current" />
                          <span className="text-white text-xs font-black">{teacher.rating}</span>
                        </div>
                        <div className="absolute top-4 left-4 z-20 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold px-2.5 py-1 rounded-md">
                          متاح للحجز
                        </div>
                        
                        <div className="absolute bottom-4 right-4 left-4 z-20 space-y-1">
                          <p className="text-[10px] text-brand-gold-300 font-bold tracking-widest">{teacher.subject.toUpperCase()}</p>
                          <h3 className="text-xl sm:text-2xl font-black text-white">{teacher.name}</h3>
                        </div>
                      </div>

                      {/* Content Area */}
                      <div className="p-6 space-y-4">
                        <div className="flex items-center gap-2 text-brand-gold-300 text-xs font-semibold">
                          <Award className="w-4 h-4" />
                          <span>{teacher.experience}</span>
                        </div>
                        
                        <p className="text-gray-300 text-xs leading-relaxed line-clamp-3">
                          {teacher.description}
                        </p>

                        {/* Branches Tag list */}
                        <div className="flex flex-wrap gap-1.5 pt-2">
                          {teacher.branches.map((b) => (
                            <span key={b} className="text-[10px] bg-white/5 text-gray-400 border border-white/5 px-2 py-0.5 rounded-md">
                              {b}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Booking CTAs */}
                    <div className="p-6 pt-0 border-t border-white/5 flex items-center justify-between gap-4 mt-auto">
                      <span className="text-[10px] text-gray-500 font-medium">التقييمات ({teacher.ratingCount})</span>
                      <button
                        onClick={() => {
                          setSelectedTeacher(teacher);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        className="px-5 py-2.5 rounded-xl gold-gradient-bg text-brand-navy-950 font-black text-xs hover:opacity-90 transition-all cursor-pointer shadow-md shadow-brand-gold-500/10"
                      >
                        احجز واطلع على الجدول
                      </button>
                    </div>

                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        ) : (
          /* TEACHER PROFILE DETAILS PAGE */
          <motion.div
            key="profile"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="space-y-12 animate-fade-in text-right"
          >
            {/* Back Button */}
            <button
              onClick={() => setSelectedTeacher(null)}
              className="inline-flex items-center gap-2 text-brand-gold-300 font-bold text-xs hover:text-white transition-all cursor-pointer group"
            >
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              <span>العودة لقائمة جميع المدرسين</span>
            </button>

            {/* Profile Intro Banner Card */}
            <div className="glass-panel rounded-3xl overflow-hidden border border-white/10 relative">
              <div className="absolute top-0 right-0 w-80 h-80 bg-brand-gold-500/5 rounded-full blur-3xl"></div>
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-10 items-center">
                
                {/* Photo frame */}
                <div className="lg:col-span-4 relative flex justify-center">
                  <div className="absolute -inset-1 rounded-2xl gold-gradient-bg opacity-20 blur-lg"></div>
                  <div className="relative w-full max-w-[280px] h-[350px] rounded-2xl overflow-hidden border border-white/15 bg-brand-navy-950 p-2">
                    <img 
                      src={selectedTeacher.photoUrl} 
                      alt={selectedTeacher.name} 
                      className="w-full h-full object-cover rounded-xl"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>

                {/* Profile key text */}
                <div className="lg:col-span-8 space-y-6">
                  <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 bg-brand-gold-500/10 border border-brand-gold-500/30 px-3 py-1 rounded-lg text-brand-gold-300 text-xs font-bold">
                      <Shield className="w-3.5 h-3.5" />
                      <span>كبار معلمي الأكاديمية</span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-white">{selectedTeacher.name}</h1>
                    <p className="text-brand-gold-300 text-sm font-bold">{selectedTeacher.subject} • {selectedTeacher.experience}</p>
                  </div>

                  <p className="text-gray-300 text-sm leading-relaxed">
                    {selectedTeacher.bio}
                  </p>

                  <div className="flex flex-wrap gap-4 pt-4 text-xs sm:text-sm border-t border-white/5">
                    <div className="flex items-center gap-2 text-gray-400">
                      <Star className="w-4 h-4 text-brand-gold-400 fill-current" />
                      <span className="text-white font-bold">{selectedTeacher.rating}</span>
                      <span>({selectedTeacher.ratingCount} تقييم حقيقي)</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                      <MapPin className="w-4 h-4 text-brand-gold-400" />
                      <span>متاح بالفروع: <strong className="text-white font-medium">{selectedTeacher.branches.join("، ")}</strong></span>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Detailed Scheduling, Lessons & Books Tab sections */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left sidebar: Schedule & Centers */}
              <div className="lg:col-span-5 space-y-6">
                
                {/* 1. Schedule card */}
                <div className="glass-panel p-6 rounded-2xl border border-white/5 space-y-4">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2 pb-3 border-b border-white/5">
                    <Calendar className="w-5 h-5 text-brand-gold-400" />
                    <span>جدول المحاضرات الأسبوعية</span>
                  </h3>
                  
                  <div className="space-y-3">
                    {selectedTeacher.schedule.map((slot, index) => (
                      <div 
                        key={index} 
                        className="p-3.5 rounded-xl bg-brand-navy-950/60 border border-white/5 flex items-center justify-between text-xs"
                      >
                        <div className="space-y-1">
                          <p className="text-white font-bold">{slot.day}</p>
                          <p className="text-gray-400 font-medium flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-brand-gold-400" />
                            <span>{slot.time}</span>
                          </p>
                        </div>
                        <span className={`px-2.5 py-1 rounded-md font-bold ${
                          slot.type === "سنتر" 
                            ? "bg-amber-500/10 text-amber-400 border border-amber-500/25" 
                            : "bg-blue-500/10 text-blue-400 border border-blue-500/25"
                        }`}>
                          {slot.type}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Booking center seat quick button */}
                  <div className="pt-4">
                    <button
                      onClick={() => {
                        onAddToRequest({
                          itemType: "seat",
                          title: `حجز مقعد سنتر - ${selectedTeacher.name}`,
                          subtitle: selectedTeacher.subject,
                          price: 0, // Seat booking price is calculated at checkout / quotation
                          originalId: selectedTeacher.id
                        });
                      }}
                      className={`w-full py-3 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer ${
                        isAlreadyInCart(selectedTeacher.id, "seat")
                          ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                          : "gold-gradient-bg text-brand-navy-950 hover:opacity-90"
                      }`}
                    >
                      {isAlreadyInCart(selectedTeacher.id, "seat") ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>تمت إضافة المقعد لعربة الطلب</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-4 h-4" />
                          <span>حجز مقعد بالسنتر الآن (طلب تسعير)</span>
                        </>
                      )}
                    </button>
                    <p className="text-[10px] text-gray-500 text-center mt-2">سيتم احتساب سعر الحصة المعتمد في السنتر حسب الفرع المختار بالتفاصيل.</p>
                  </div>
                </div>

                {/* 2. Important guidelines */}
                <div className="glass-panel p-6 rounded-2xl border border-white/5 space-y-4">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <BookMarked className="w-4.5 h-4.5 text-brand-gold-400" />
                    <span>ملاحظات وإرشادات هامة لولي الأمر</span>
                  </h3>
                  <ul className="space-y-2.5 text-xs text-gray-400">
                    <li className="flex items-start gap-2">
                      <span className="text-brand-gold-400 mt-0.5">•</span>
                      <span>الغياب المتكرر لمرتين دون عذر يعرض الطالب للاستبعاد النهائي.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-brand-gold-400 mt-0.5">•</span>
                      <span>يُجرى امتحان مفاجئ دوري في مطلع كل حصة لقياس الاستيعاب.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-brand-gold-400 mt-0.5">•</span>
                      <span>كافة مذكرات وكتب المعلم حصرية ولا تباع في المكتبات الخارجية.</span>
                    </li>
                  </ul>
                </div>

              </div>

              {/* Right main side: Available Packages & Lessons */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* Individual Lessons */}
                <div className="glass-panel p-6 rounded-2xl border border-white/5 space-y-4">
                  <div className="space-y-1">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      <Layers className="w-5 h-5 text-brand-gold-400" />
                      <span>كورسات ومحاضرات فردية متاحة للحجز</span>
                    </h3>
                    <p className="text-gray-400 text-xs">يمكنك حجز محاضرة معينة مسجلة أو مراجعة سريعة لحل تراكم الدروس.</p>
                  </div>

                  <div className="space-y-4">
                    {selectedTeacher.individualLessons.map((lesson) => (
                      <div 
                        key={lesson.id} 
                        className="p-5 rounded-2xl bg-brand-navy-950/40 border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-brand-gold-500/20 transition-all duration-300"
                      >
                        <div className="space-y-1 flex-1 text-right">
                          <h4 className="text-sm sm:text-base font-bold text-white">{lesson.title}</h4>
                          <p className="text-gray-400 text-xs">{lesson.description}</p>
                        </div>
                        <div className="flex sm:flex-col items-end justify-between sm:justify-center gap-2 border-t sm:border-t-0 border-white/5 pt-3 sm:pt-0">
                          <span className="text-brand-gold-300 font-extrabold text-sm sm:text-base">{lesson.price} ج.م</span>
                          
                          <button
                            onClick={() => {
                              onAddToRequest({
                                itemType: "lesson",
                                title: lesson.title,
                                subtitle: selectedTeacher.name,
                                price: lesson.price,
                                originalId: lesson.id
                              });
                            }}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                              isAlreadyInCart(lesson.id, "lesson")
                                ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/25"
                                : "bg-white/5 text-gray-300 hover:bg-brand-gold-500 hover:text-brand-navy-950"
                            }`}
                          >
                            {isAlreadyInCart(lesson.id, "lesson") ? (
                              <>
                                <Check className="w-3.5 h-3.5" />
                                <span>مضاف للطلب</span>
                              </>
                            ) : (
                              <>
                                <Plus className="w-3.5 h-3.5" />
                                <span>إضافة للطلب</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Contact support to book special schedule */}
                <div className="glass-panel p-6 rounded-2xl border border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6 bg-gradient-to-l from-brand-gold-500/5 to-transparent">
                  <div className="space-y-1 text-center sm:text-right">
                    <h4 className="text-white font-bold text-sm">أترغب في مجموعة خاصة بالسنتر؟</h4>
                    <p className="text-gray-400 text-xs">احصل على استشارة سريعة بخصوص حجز مواعيد خاصة لعدد محدود من الطلاب.</p>
                  </div>
                  <button
                    onClick={() => {
                      const el = document.getElementById("contact-section");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="px-5 py-2.5 rounded-xl bg-brand-navy-800 text-brand-gold-300 border border-brand-gold-500/20 text-xs font-bold hover:bg-brand-navy-700 cursor-pointer"
                  >
                    اتصل بدعم الأكاديمية
                  </button>
                </div>

              </div>

            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
