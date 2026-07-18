import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Check, Plus, Sparkles, AlertCircle, Bookmark, Eye, ArrowRight, 
  GraduationCap, BookMarked, ShoppingBag, ShieldCheck, HelpCircle
} from "lucide-react";
import { Package, CartItem } from "../types";
import { MOCK_PACKAGES, MOCK_TEACHERS } from "../data";

interface PackagesSectionProps {
  onAddToRequest: (item: Omit<CartItem, "id">) => void;
  cart: CartItem[];
  selectedPackage: Package | null;
  setSelectedPackage: (pkg: Package | null) => void;
}

export default function PackagesSection({ onAddToRequest, cart, selectedPackage, setSelectedPackage }: PackagesSectionProps) {
  const [activeFilter, setActiveFilter] = useState<string>("الكل");

  const filterTypes = [
    { id: "الكل", label: "كافة الباقات" },
    { id: "scientific", label: "العلمية المتكاملة" },
    { id: "literary", label: "الأدبية المتكاملة" },
    { id: "multi", label: "المواد المشتركة" },
    { id: "revision", label: "المراجعات النهائية" },
    { id: "vip", label: "باقات النخبة VIP" },
    { id: "single", label: "المادة المنفردة" }
  ];

  const filteredPackages = activeFilter === "الكل" 
    ? MOCK_PACKAGES 
    : MOCK_PACKAGES.filter(p => p.type === activeFilter);

  const getTeacherNames = (ids: string[]) => {
    return MOCK_TEACHERS
      .filter(t => ids.includes(t.id))
      .map(t => t.name)
      .join(" • ");
  };

  const isAlreadyInCart = (originalId: string, itemType: string) => {
    return cart.some((item) => item.originalId === originalId && item.itemType === itemType);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 text-right">
      
      <AnimatePresence mode="wait">
        {!selectedPackage ? (
          /* ALL PACKAGES VIEW */
          <motion.div
            key="list"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-8 animate-fade-in"
          >
            {/* Header Titles */}
            <div className="space-y-3">
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
                باقات وباقات <span className="gold-gradient-text">التميز السنوية</span>
              </h2>
              <p className="text-gray-400 max-w-2xl text-xs sm:text-sm">
                احصل على اشتراك سنوي شامل يضم المعلمين والكتب المطبوعة والامتحانات الدورية بأسعار توفيرية منافسة وضمان الترتيب الأول.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2 pb-2 overflow-x-auto justify-start border-b border-white/5 scrollbar-thin">
              {filterTypes.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveFilter(tab.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 whitespace-nowrap cursor-pointer ${
                    activeFilter === tab.id
                      ? "gold-gradient-bg text-brand-navy-950 font-black shadow-md shadow-brand-gold-500/10"
                      : "bg-white/5 text-gray-300 hover:bg-white/10"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Packages Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPackages.map((pkg, idx) => {
                const alreadySelected = isAlreadyInCart(pkg.id, "package");
                return (
                  <motion.div
                    key={pkg.id}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.05 }}
                    className="glass-panel rounded-3xl overflow-hidden border border-white/5 hover:border-brand-gold-500/30 hover:scale-[1.01] transition-all duration-300 flex flex-col justify-between group"
                  >
                    <div>
                      {/* Image header with category tag */}
                      <div className="relative h-56 bg-brand-navy-900 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy-950 via-brand-navy-950/25 to-transparent z-10"></div>
                        <img 
                          src={pkg.image} 
                          alt={pkg.name} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute top-4 right-4 z-20 gold-gradient-bg px-3 py-1 rounded-full text-brand-navy-950 font-black text-[10px]">
                          {pkg.typeName}
                        </div>
                        {pkg.type === "vip" && (
                          <div className="absolute top-4 left-4 z-20 bg-brand-gold-600/90 text-white text-[10px] font-bold px-2.5 py-1 rounded-md flex items-center gap-1 animate-pulse">
                            <Sparkles className="w-3.5 h-3.5 text-brand-gold-200 fill-current" />
                            <span>موصى به</span>
                          </div>
                        )}
                      </div>

                      {/* Content details */}
                      <div className="p-6 space-y-4">
                        <div className="space-y-2">
                          <h3 className="text-xl font-extrabold text-white group-hover:text-brand-gold-400 transition-colors leading-snug">
                            {pkg.name}
                          </h3>
                          <p className="text-gray-400 text-xs leading-relaxed line-clamp-2">
                            {pkg.description}
                          </p>
                        </div>

                        {/* Included Features preview */}
                        <div className="pt-4 border-t border-white/5 space-y-2.5 text-xs text-gray-300">
                          <div className="flex items-start gap-2">
                            <span className="text-brand-gold-400 font-bold">•</span>
                            <span>المدرسون: <strong className="text-white">{getTeacherNames(pkg.includedTeachers)}</strong></span>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="text-brand-gold-400 font-bold">•</span>
                            <span>الكتب والملازم: <strong className="text-white">{pkg.includedBooks.length} كتب مدمجة</strong></span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Footer CTAs */}
                    <div className="p-6 pt-0 space-y-3 mt-auto">
                      <div className="flex justify-between items-center text-xs pb-3 border-t border-white/5 pt-3">
                        <span className="text-gray-500 font-bold">سعر الباقة التقريبي:</span>
                        <span className="text-brand-gold-300 font-black text-lg">
                          {pkg.price ? `${pkg.price} ج.م` : "سعر مخصص"}
                        </span>
                      </div>

                      <div className="grid grid-cols-12 gap-2">
                        <button
                          onClick={() => {
                            setSelectedPackage(pkg);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }}
                          className="col-span-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5"
                          title="عرض تفاصيل محتوى الباقة"
                        >
                          <Eye className="w-4 h-4" />
                          <span>التفاصيل</span>
                        </button>

                        <button
                          onClick={() => {
                            onAddToRequest({
                              itemType: "package",
                              title: pkg.name,
                              subtitle: pkg.typeName,
                              price: pkg.price || 0,
                              originalId: pkg.id
                            });
                          }}
                          className={`col-span-8 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                            alreadySelected
                              ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/35"
                              : "gold-gradient-bg text-brand-navy-950 hover:opacity-90"
                          }`}
                        >
                          {alreadySelected ? (
                            <>
                              <Check className="w-4 h-4" />
                              <span>مضافة للطلب</span>
                            </>
                          ) : (
                            <>
                              <Plus className="w-4 h-4" />
                              <span>اطلب الباقة الدراسية</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        ) : (
          /* DETAILED SINGLE PACKAGE VIEW */
          <motion.div
            key="details"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="space-y-8 animate-fade-in"
          >
            {/* Back CTA link */}
            <button
              onClick={() => setSelectedPackage(null)}
              className="inline-flex items-center gap-2 text-brand-gold-300 font-bold text-xs hover:text-white transition-all cursor-pointer group"
            >
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              <span>العودة لقائمة الباقات</span>
            </button>

            {/* Main Package Showcase */}
            <div className="glass-panel rounded-3xl overflow-hidden border border-white/10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-10 items-center">
                
                {/* Photo showcase */}
                <div className="lg:col-span-5 rounded-2xl overflow-hidden border border-white/15 h-[300px]">
                  <img 
                    src={selectedPackage.image} 
                    alt={selectedPackage.name} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Core parameters */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="space-y-2">
                    <span className="gold-gradient-bg text-brand-navy-950 text-xs font-bold px-3 py-1 rounded-lg">
                      {selectedPackage.typeName}
                    </span>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-2 leading-snug">
                      {selectedPackage.name}
                    </h1>
                  </div>

                  <p className="text-gray-300 text-sm leading-relaxed">
                    {selectedPackage.description}
                  </p>

                  <div className="pt-4 border-t border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <p className="text-gray-500 text-xs">القيمة التقريبية السنوية المقدرة:</p>
                      <p className="text-brand-gold-300 text-3xl font-black mt-1">
                        {selectedPackage.price ? `${selectedPackage.price} ج.م` : "تسعير مخصص طبقاً للكتب"}
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        onAddToRequest({
                          itemType: "package",
                          title: selectedPackage.name,
                          subtitle: selectedPackage.typeName,
                          price: selectedPackage.price || 0,
                          originalId: selectedPackage.id
                        });
                      }}
                      className={`px-8 py-3.5 rounded-xl font-black text-sm transition-all cursor-pointer flex items-center justify-center gap-2 ${
                        isAlreadyInCart(selectedPackage.id, "package")
                          ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                          : "gold-gradient-bg text-brand-navy-950 hover:opacity-90"
                      }`}
                    >
                      {isAlreadyInCart(selectedPackage.id, "package") ? (
                        <>
                          <Check className="w-5 h-5" />
                          <span>تمت إضافة الباقة لعربتك</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-5 h-5" />
                          <span>إضافة هذه الباقة لطلب الحجز</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

              </div>
            </div>

            {/* Content breakdowns: Included Teachers and Included Books */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Included Teachers List */}
              <div className="lg:col-span-6 space-y-4">
                <div className="glass-panel p-6 rounded-2xl border border-white/5 space-y-4">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2 pb-3 border-b border-white/5">
                    <GraduationCap className="w-5 h-5 text-brand-gold-400" />
                    <span>المدرسون المشمولون بالباقة</span>
                  </h3>
                  
                  <div className="space-y-4">
                    {MOCK_TEACHERS.filter(t => selectedPackage.includedTeachers.includes(t.id)).map((teacher) => (
                      <div 
                        key={teacher.id} 
                        className="flex items-center gap-4 p-3 rounded-xl bg-brand-navy-950/60 border border-white/5"
                      >
                        <img 
                          src={teacher.photoUrl} 
                          alt={teacher.name} 
                          className="w-12 h-12 rounded-full object-cover border border-brand-gold-400"
                          referrerPolicy="no-referrer"
                        />
                        <div className="text-right flex-1">
                          <p className="text-sm font-bold text-white">{teacher.name}</p>
                          <p className="text-xs text-brand-gold-300">{teacher.subject}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Included Books and materials */}
              <div className="lg:col-span-6 space-y-4">
                <div className="glass-panel p-6 rounded-2xl border border-white/5 space-y-4">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2 pb-3 border-b border-white/5">
                    <BookMarked className="w-5 h-5 text-brand-gold-400" />
                    <span>الملازم والمناهج الورقية المجانية المرفقة</span>
                  </h3>

                  <div className="space-y-3">
                    {selectedPackage.includedBooks.map((bookTitle, index) => (
                      <div 
                        key={index} 
                        className="flex items-center gap-3 p-3.5 rounded-xl bg-brand-navy-950/40 border border-white/5 text-xs text-gray-300"
                      >
                        <div className="w-8 h-8 rounded-lg bg-brand-gold-500/10 flex items-center justify-center text-brand-gold-400 font-bold flex-shrink-0">
                          {index + 1}
                        </div>
                        <span className="font-semibold text-white">{bookTitle}</span>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 rounded-xl bg-brand-navy-950 border border-white/5 flex items-center gap-3 text-xs text-gray-400">
                    <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    <span>كافة الملازم أصلية وموقعة وتغطي بنك أسئلة الوزارة بالكامل.</span>
                  </div>
                </div>
              </div>

            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
