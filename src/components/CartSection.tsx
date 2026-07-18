import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  Trash2, Send, CheckCircle2, ShoppingCart, User, Phone, 
  MapPin, ShieldAlert, FileText, ChevronRight, Bookmark, ArrowLeft
} from "lucide-react";
import { CartItem, StudentInfo, SupportRequest } from "../types";
import { MOCK_GOVERNORATES } from "../data";

interface CartSectionProps {
  cart: CartItem[];
  onRemoveFromCart: (id: string) => void;
  onClearCart: () => void;
  setCurrentView: (view: string) => void;
}

export default function CartSection({ cart, onRemoveFromCart, onClearCart, setCurrentView }: CartSectionProps) {
  const [studentInfo, setStudentInfo] = useState<StudentInfo>({
    fullName: "",
    phone: "",
    parentPhone: "",
    governorate: "القاهرة",
    branch: "علمي علوم",
    grade: "الصف الثالث الثانوي"
  });
  
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  // Calculate total price for items that have price
  const totalPrice = cart.reduce((acc, item) => acc + item.price, 0);

  // Group items by type for request summary
  const lessons = cart.filter(item => item.itemType === "lesson");
  const packages = cart.filter(item => item.itemType === "package");
  const books = cart.filter(item => item.itemType === "book");
  const seats = cart.filter(item => item.itemType === "seat");

  const handleSubmitRequest = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: string[] = [];

    // Validations
    if (!studentInfo.fullName.trim()) newErrors.push("اسم الطالب بالكامل مطلوب");
    if (!studentInfo.phone.trim() || studentInfo.phone.length < 10) newErrors.push("رقم هاتف الطالب صحيح مطلوب");
    if (!studentInfo.parentPhone.trim() || studentInfo.parentPhone.length < 10) newErrors.push("رقم هاتف ولي الأمر صحيح مطلوب");
    if (cart.length === 0) newErrors.push("عذراً، عربة طلبك فارغة. يجب حجز حصص أو باقات أو كتب لإرسال الطلب.");

    if (newErrors.length > 0) {
      setErrors(newErrors);
      window.scrollTo({ top: 100, behavior: "smooth" });
      return;
    }

    setErrors([]);
    setIsSubmitting(true);

    // Simulate database write
    setTimeout(() => {
      const newRequest: SupportRequest = {
        id: "REQ_" + Math.random().toString(36).substr(2, 9).toUpperCase(),
        studentInfo,
        items: [...cart],
        notes,
        status: "pending",
        createdAt: new Date().toISOString()
      };

      // Save to localStorage so admin can see it in real-time
      const existingStr = localStorage.getItem("sarh_support_requests");
      const existing: SupportRequest[] = existingStr ? JSON.parse(existingStr) : [];
      existing.unshift(newRequest);
      localStorage.setItem("sarh_support_requests", JSON.stringify(existing));

      setIsSubmitting(false);
      setIsSuccess(true);
      onClearCart();
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-8 animate-fade-in">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative inline-flex items-center justify-center w-24 h-24 rounded-full gold-gradient-bg shadow-xl shadow-brand-gold-500/20"
        >
          <CheckCircle2 className="w-14 h-14 text-brand-navy-950 animate-bounce" />
        </motion.div>

        <div className="space-y-4">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">تم استلام طلبك بنجاح!</h2>
          <p className="text-brand-gold-300 font-bold text-lg">شكراً لثقتك بأكاديمية صرح للثانوية العامة</p>
          <p className="text-gray-400 text-sm max-w-xl mx-auto leading-relaxed">
            لقد تم إرسال معلومات الحجز، وقائمة المدرسين، والكتب المطلوبة، وكافة تفاصيل الطالب مباشرة إلى الدعم الفني للأكاديمية. سيقوم منسق المجموعات بالتواصل معك هاتفياً أو عبر الواتساب خلال الـ 24 ساعة القادمة لتأكيد التوفر وتزويدك بالتفاصيل والأسعار النهائية وتفعيل حسابك.
          </p>
        </div>

        <div className="pt-6 border-t border-white/5 space-y-4">
          <div className="bg-brand-navy-950/60 p-4 rounded-xl border border-brand-gold-500/10 inline-block text-xs text-gray-300">
            📌 الخط الساخن للأكاديمية: <strong className="text-brand-gold-400">١٩٨٧٦</strong> • واتساب الدعم الفني: <strong className="text-brand-gold-400">٠١٢٣٤٥٦٧٨٩٠</strong>
          </div>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => { setIsSuccess(false); setCurrentView("landing"); }}
              className="px-6 py-3 rounded-xl gold-gradient-bg text-brand-navy-950 font-bold text-xs shadow-md cursor-pointer"
            >
              العودة للصفحة الرئيسية
            </button>
            <button
              onClick={() => { setIsSuccess(false); setCurrentView("admin"); }}
              className="px-6 py-3 rounded-xl bg-white/5 text-white border border-white/10 text-xs font-bold hover:bg-white/10 cursor-pointer"
            >
              تتبع الطلبات (لوحة التحكم)
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-right space-y-12">
      
      {/* Title */}
      <div className="space-y-3">
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white flex items-center justify-start gap-3">
          <ShoppingCart className="w-8 h-8 text-brand-gold-400" />
          <span>عربة طلبات <span className="gold-gradient-text">حجز المناهج والكتب</span></span>
        </h2>
        <p className="text-gray-400 max-w-2xl text-xs sm:text-sm">
          أنت الآن بصدد بناء طلب حجز مخصص ومقايسة تسعير. راجع خياراتك من المدرسين والحصص والملازم، وأدخل معلوماتك لرفع الطلب مباشرة للدعم.
        </p>
      </div>

      {errors.length > 0 && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/35 text-rose-400 space-y-2 text-xs">
          <p className="font-bold">يرجى إصلاح الأخطاء التالية للمتابعة:</p>
          <ul className="list-disc pr-4 space-y-1">
            {errors.map((err, i) => <li key={i}>{err}</li>)}
          </ul>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Right side: Items selection listing */}
        <div className="lg:col-span-7 space-y-6">
          <div className="glass-panel p-6 rounded-2xl border border-white/5 space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-white/5">
              <h3 className="text-lg font-bold text-white">المواد والكتب المختارة ({cart.length})</h3>
              {cart.length > 0 && (
                <button
                  onClick={onClearCart}
                  className="text-xs text-rose-400 hover:text-rose-300 font-bold flex items-center gap-1 cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>إفراغ العربة</span>
                </button>
              )}
            </div>

            {cart.length === 0 ? (
              <div className="text-center py-12 space-y-4">
                <ShoppingCart className="w-12 h-12 text-gray-600 mx-auto" />
                <p className="text-gray-400 text-sm font-semibold">عربة حجزك فارغة حالياً.</p>
                <p className="text-gray-500 text-xs">تصفح نخبة المعلمين أو الباقات وأضف حصصك ومستلزماتك الدراسية للبدء.</p>
                <div className="flex justify-center gap-3">
                  <button
                    onClick={() => setCurrentView("teachers")}
                    className="px-4 py-2 rounded-lg bg-brand-gold-500 text-brand-navy-950 text-xs font-bold cursor-pointer"
                  >
                    تصفح المدرسين
                  </button>
                  <button
                    onClick={() => setCurrentView("packages")}
                    className="px-4 py-2 rounded-lg bg-white/5 text-white text-xs font-bold cursor-pointer border border-white/10"
                  >
                    تصفح الباقات
                  </button>
                </div>
              </div>
            ) : (
              <div className="divide-y divide-white/5">
                {cart.map((item) => (
                  <div key={item.id} className="py-4 flex items-center justify-between gap-4 first:pt-0 last:pb-0">
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                          item.itemType === "lesson" ? "bg-amber-500/10 text-amber-400 border border-amber-500/20" :
                          item.itemType === "package" ? "bg-blue-500/10 text-blue-400 border border-blue-500/20" :
                          item.itemType === "book" ? "bg-purple-500/10 text-purple-400 border border-purple-500/20" :
                          "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                        }`}>
                          {item.itemType === "lesson" ? "محاضرة فردية" :
                           item.itemType === "package" ? "باقة دراسية" :
                           item.itemType === "book" ? "كتاب مطبوع" :
                           "مقعد بالسنتر"}
                        </span>
                        <h4 className="text-sm font-bold text-white">{item.title}</h4>
                      </div>
                      <p className="text-gray-400 text-xs">{item.subtitle}</p>
                    </div>

                    <div className="flex items-center gap-4">
                      {item.price > 0 ? (
                        <span className="text-brand-gold-300 font-extrabold text-xs sm:text-sm whitespace-nowrap">{item.price} ج.م</span>
                      ) : (
                        <span className="text-gray-400 text-[10px] bg-white/5 px-2 py-1 rounded">تسعير عند التأكيد</span>
                      )}
                      
                      <button
                        onClick={() => onRemoveFromCart(item.id)}
                        className="p-1.5 rounded bg-rose-500/10 text-rose-400 hover:bg-rose-500 hover:text-white transition-all cursor-pointer"
                        title="حذف البند"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {cart.length > 0 && (
              <div className="pt-4 border-t border-white/5 flex justify-between items-center text-xs">
                <span className="text-gray-400 font-semibold">القيمة التقديرية المقدرة للمستلزمات:</span>
                <span className="text-brand-gold-300 text-xl font-black">{totalPrice} ج.م</span>
              </div>
            )}
          </div>

          {/* Secure transaction declaration */}
          <div className="p-4 rounded-xl bg-brand-navy-950 border border-white/5 flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-brand-gold-400 flex-shrink-0 mt-0.5" />
            <div className="space-y-1 text-xs text-gray-400">
              <h4 className="text-white font-bold">لا توجد رسوم دفع إلكتروني حالياً</h4>
              <p>هذا الطلب يعتبر مقايسة حجز ومراجعة لتوفير المقاعد والكتب الدراسية المطبوعة فحسب. لا يتطلب منك هذا الموقع إدخال أي تفاصيل بطاقات ائتمانية، وتتم تسوية وتأكيد الحساب عبر الدعم الهاتفي هاتفياً أو كاش بالسنتر.</p>
            </div>
          </div>
        </div>

        {/* Left side: Student Info Form & Submit */}
        <div className="lg:col-span-5">
          <form onSubmit={handleSubmitRequest} className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/5 space-y-6">
            <h3 className="text-lg font-bold text-white pb-3 border-b border-white/5 flex items-center gap-2">
              <FileText className="w-5 h-5 text-brand-gold-400" />
              <span>معلومات الطالب والاتصال</span>
            </h3>

            <div className="space-y-4">
              
              {/* Name */}
              <div className="space-y-1.5">
                <label className="text-xs text-gray-300 font-bold">اسم الطالب رباعي *</label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="اسم الطالب كاملاً كما هو بالبطاقة..."
                    value={studentInfo.fullName}
                    onChange={(e) => setStudentInfo({ ...studentInfo, fullName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-brand-navy-950 border border-white/10 text-white text-xs focus:outline-none focus:border-brand-gold-500"
                  />
                </div>
              </div>

              {/* Grid: Phone / Parent Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs text-gray-300 font-bold">رقم هاتف الطالب *</label>
                  <input
                    type="tel"
                    required
                    placeholder="01xxxxxxxxx"
                    value={studentInfo.phone}
                    onChange={(e) => setStudentInfo({ ...studentInfo, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-brand-navy-950 border border-white/10 text-white text-xs focus:outline-none focus:border-brand-gold-500"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs text-gray-300 font-bold">رقم ولي الأمر *</label>
                  <input
                    type="tel"
                    required
                    placeholder="01xxxxxxxxx"
                    value={studentInfo.parentPhone}
                    onChange={(e) => setStudentInfo({ ...studentInfo, parentPhone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-brand-navy-950 border border-white/10 text-white text-xs focus:outline-none focus:border-brand-gold-500"
                  />
                </div>
              </div>

              {/* Governorate dropdown */}
              <div className="space-y-1.5">
                <label className="text-xs text-gray-300 font-bold">المحافظة السكنية *</label>
                <select
                  value={studentInfo.governorate}
                  onChange={(e) => setStudentInfo({ ...studentInfo, governorate: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-brand-navy-950 border border-white/10 text-white text-xs focus:outline-none focus:border-brand-gold-500"
                >
                  {MOCK_GOVERNORATES.map((gov) => (
                    <option key={gov} value={gov}>{gov}</option>
                  ))}
                </select>
              </div>

              {/* Grid: Grade / Study Branch */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs text-gray-300 font-bold">الشعبة الدراسية *</label>
                  <select
                    value={studentInfo.branch}
                    onChange={(e) => setStudentInfo({ ...studentInfo, branch: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-brand-navy-950 border border-white/10 text-white text-xs focus:outline-none focus:border-brand-gold-500"
                  >
                    <option value="علمي علوم">علمي علوم</option>
                    <option value="علمي رياضة">علمي رياضة</option>
                    <option value="أدبي">أدبي</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs text-gray-300 font-bold">الصف الدراسي *</label>
                  <select
                    value={studentInfo.grade}
                    onChange={(e) => setStudentInfo({ ...studentInfo, grade: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-brand-navy-950 border border-white/10 text-white text-xs focus:outline-none focus:border-brand-gold-500"
                  >
                    <option value="الصف الأول الثانوي">الصف الأول الثانوي</option>
                    <option value="الصف الثاني الثانوي">الصف الثاني الثانوي</option>
                    <option value="الصف الثالث الثانوي">الصف الثالث الثانوي (Thanaweya)</option>
                  </select>
                </div>
              </div>

              {/* Notes */}
              <div className="space-y-1.5">
                <label className="text-xs text-gray-300 font-bold">ملاحظات خاصة</label>
                <textarea
                  rows={3}
                  placeholder="مثال: الفرع المفضل للاستلام، مواعيد الحضور الأنسب لك بالسنتر..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-brand-navy-950 border border-white/10 text-white text-xs focus:outline-none focus:border-brand-gold-500"
                />
              </div>

            </div>

            {/* Submit Request button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting || cart.length === 0}
                className="w-full py-4 rounded-xl gold-gradient-bg font-black text-brand-navy-950 hover:opacity-95 text-xs transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-brand-gold-500/20"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-brand-navy-950" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>جاري إرسال الطلب لخدمة العملاء...</span>
                  </span>
                ) : (
                  <>
                    <Send className="w-4.5 h-4.5 text-brand-navy-950" />
                    <span>إرسال طلب الحجز والتواصل معي</span>
                  </>
                )}
              </button>
            </div>

          </form>
        </div>

      </div>

    </div>
  );
}
