import React, { useState } from "react";
import { motion } from "motion/react";
import { Search, Plus, Check, BookOpen, User, Star, Filter, HelpCircle } from "lucide-react";
import { Book, CartItem } from "../types";
import { MOCK_BOOKS } from "../data";

interface BooksStoreProps {
  onAddToRequest: (item: Omit<CartItem, "id">) => void;
  cart: CartItem[];
}

export default function BooksStore({ onAddToRequest, cart }: BooksStoreProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("الكل");

  const subjects = ["الكل", "الفيزياء", "الكيمياء", "الأحياء", "اللغة العربية", "اللغة الإنجليزية", "التاريخ والجغرافيا"];

  const filteredBooks = MOCK_BOOKS.filter((book) => {
    const matchesSearch = book.title.includes(searchTerm) || book.teacherName.includes(searchTerm);
    const matchesSubject = selectedSubject === "الكل" || book.subject.includes(selectedSubject);
    return matchesSearch && matchesSubject;
  });

  const isAlreadyInCart = (originalId: string, itemType: string) => {
    return cart.some((item) => item.originalId === originalId && item.itemType === itemType);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 text-right">
      
      {/* Header text */}
      <div className="space-y-3">
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
          متجر الكتب <span className="gold-gradient-text">والمذكرات الرسمية</span>
        </h2>
        <p className="text-gray-400 max-w-2xl text-xs sm:text-sm">
          احصل على ملازم الشرح وبنوك الأسئلة ومذكرات المراجعة النهائية لكافة المواد المطبوعة بجودة فاخرة لضمان التحصيل المتكامل.
        </p>
      </div>

      {/* Control Panel: Search & Filter bar */}
      <div className="glass-panel p-6 rounded-2xl border border-white/5 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Search Input */}
          <div className="flex flex-col gap-1.5 text-right">
            <label className="text-xs text-brand-gold-300 font-bold">ابحث عن الكتاب أو ملزمة المعلم</label>
            <div className="relative">
              <input
                type="text"
                placeholder="اكتب اسم الكتاب أو المدرس..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-brand-navy-950 border border-white/10 text-white text-xs placeholder-gray-500 focus:outline-none focus:border-brand-gold-500"
              />
            </div>
          </div>

          {/* Subject Selector dropdown */}
          <div className="flex flex-col gap-1.5 text-right">
            <label className="text-xs text-brand-gold-300 font-bold">تصفية حسب المادة</label>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-brand-navy-950 border border-white/10 text-white text-xs focus:outline-none focus:border-brand-gold-500"
            >
              {subjects.map((sub) => (
                <option key={sub} value={sub}>{sub}</option>
              ))}
            </select>
          </div>

        </div>
      </div>

      {/* Grid displays */}
      {filteredBooks.length === 0 ? (
        <div className="text-center p-12 glass-panel rounded-2xl border border-white/5 space-y-4">
          <p className="text-gray-400 text-sm font-semibold">لم نجد كتباً مطابقة لبحثك الحالي.</p>
          <button
            onClick={() => { setSearchTerm(""); setSelectedSubject("الكل"); }}
            className="px-5 py-2 rounded-xl bg-brand-gold-500 text-brand-navy-950 font-bold text-xs cursor-pointer"
          >
            مسح خيارات البحث
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBooks.map((book, idx) => {
            const alreadySelected = isAlreadyInCart(book.id, "book");
            return (
              <motion.div
                key={book.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="glass-panel rounded-3xl overflow-hidden border border-white/5 hover:border-brand-gold-500/30 hover:scale-[1.01] transition-all duration-300 flex flex-col justify-between group"
              >
                
                {/* Book Layout Body */}
                <div className="p-6 space-y-4">
                  {/* Book Cover Container Mockup */}
                  <div className="relative h-64 w-full bg-brand-navy-950 rounded-2xl overflow-hidden flex items-center justify-center p-4 border border-white/5 shadow-inner">
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-navy-900 to-transparent z-10"></div>
                    <img 
                      src={book.coverUrl} 
                      alt={book.title} 
                      className="h-full max-w-[170px] rounded-lg shadow-2xl object-cover transform group-hover:scale-105 group-hover:rotate-1 transition-all duration-300"
                      referrerPolicy="no-referrer"
                    />
                    {/* Subject badge on image */}
                    <div className="absolute bottom-4 right-4 z-20 gold-gradient-bg px-2.5 py-0.5 rounded text-brand-navy-950 font-black text-[10px]">
                      {book.subject}
                    </div>
                  </div>

                  {/* Details block */}
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-white group-hover:text-brand-gold-300 transition-colors leading-snug">
                      {book.title}
                    </h3>
                    
                    <div className="flex items-center gap-2 text-xs text-brand-gold-200">
                      <User className="w-3.5 h-3.5" />
                      <span>الأستاذ: <strong className="text-white">{book.teacherName}</strong></span>
                    </div>

                    <p className="text-gray-400 text-xs leading-relaxed line-clamp-2">
                      {book.description}
                    </p>
                  </div>
                </div>

                {/* Footer and Price/Booking trigger */}
                <div className="p-6 pt-0 border-t border-white/5 flex items-center justify-between gap-4 mt-auto">
                  <div className="flex flex-col items-start text-right">
                    <span className="text-[10px] text-gray-500">سعر النسخة:</span>
                    <span className="text-brand-gold-400 font-extrabold text-base">{book.price} ج.م</span>
                  </div>

                  <button
                    onClick={() => {
                      onAddToRequest({
                        itemType: "book",
                        title: book.title,
                        subtitle: book.teacherName,
                        price: book.price,
                        originalId: book.id
                      });
                    }}
                    className={`px-5 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                      alreadySelected
                        ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/35"
                        : "gold-gradient-bg text-brand-navy-950 hover:opacity-90"
                    }`}
                  >
                    {alreadySelected ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>تمت الإضافة</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4" />
                        <span>إضافة لحسابي</span>
                      </>
                    )}
                  </button>
                </div>

              </motion.div>
            );
          })}
        </div>
      )}

      {/* Book Delivery Notice Banner */}
      <div className="glass-panel p-6 rounded-2xl border border-white/5 bg-gradient-to-l from-brand-gold-500/5 to-transparent flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center md:text-right">
          <h4 className="text-white font-bold text-sm">ميزة التوصيل والخدمات اللوجستية لباب المنزل</h4>
          <p className="text-gray-400 text-xs">نقوم بشحن وتوصيل كافة الكتب والمذكرات المطلوبة لباب منزلك بجميع محافظات مصر عبر شركة شحن مخصصة للطلاب.</p>
        </div>
        <div className="text-brand-gold-300 text-xs font-black border border-brand-gold-500/20 px-4 py-2 rounded-lg bg-brand-navy-950/85">
          شحن موحد لجميع محافظات مصر خلال 48 ساعة
        </div>
      </div>

    </div>
  );
}
