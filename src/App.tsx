import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import LandingPage from "./components/LandingPage";
import TeachersSection from "./components/TeachersSection";
import PackagesSection from "./components/PackagesSection";
import BooksStore from "./components/BooksStore";
import CartSection from "./components/CartSection";
import AdminDashboard from "./components/AdminDashboard";
import { Teacher, Package, CartItem } from "./types";
import { 
  ShoppingCart, X, Trash2, ArrowLeft, Heart, 
  HelpCircle, MessageCircle, Phone, Compass, ShieldCheck 
} from "lucide-react";

export default function App() {
  const [currentView, setCurrentView] = useState<string>("landing");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // Cross-page selections
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);

  // Initialize cart from localStorage if exists
  useEffect(() => {
    const savedCart = localStorage.getItem("sarh_academy_cart");
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to parse saved cart");
      }
    }
  }, []);

  // Sync cart to localStorage
  const saveCart = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem("sarh_academy_cart", JSON.stringify(newCart));
  };

  const handleAddToRequest = (newItem: Omit<CartItem, "id">) => {
    const exists = cart.some(
      (item) => item.originalId === newItem.originalId && item.itemType === newItem.itemType
    );
    if (exists) {
      // Toggle remove if clicked again, or just ignore. Let's make it alert or ignore
      return;
    }
    const item: CartItem = {
      ...newItem,
      id: "CART_" + Math.random().toString(36).substr(2, 9).toUpperCase()
    };
    const updated = [...cart, item];
    saveCart(updated);
    setIsCartOpen(true); // Open slide drawer on add
  };

  const handleRemoveFromCart = (id: string) => {
    const updated = cart.filter((item) => item.id !== id);
    saveCart(updated);
  };

  const handleClearCart = () => {
    saveCart([]);
  };

  // Safe router
  const renderActiveView = () => {
    switch (currentView) {
      case "landing":
        return (
          <LandingPage 
            setCurrentView={setCurrentView} 
            setSelectedTeacher={setSelectedTeacher}
            setSelectedPackage={setSelectedPackage}
          />
        );
      case "teachers":
        return (
          <TeachersSection 
            onAddToRequest={handleAddToRequest}
            cart={cart}
            selectedTeacher={selectedTeacher}
            setSelectedTeacher={setSelectedTeacher}
          />
        );
      case "packages":
        return (
          <PackagesSection 
            onAddToRequest={handleAddToRequest}
            cart={cart}
            selectedPackage={selectedPackage}
            setSelectedPackage={setSelectedPackage}
          />
        );
      case "store":
        return (
          <BooksStore 
            onAddToRequest={handleAddToRequest}
            cart={cart}
          />
        );
      case "cart":
        return (
          <CartSection 
            cart={cart}
            onRemoveFromCart={handleRemoveFromCart}
            onClearCart={handleClearCart}
            setCurrentView={setCurrentView}
          />
        );
      case "admin":
        return (
          <AdminDashboard />
        );
      default:
        return (
          <LandingPage 
            setCurrentView={setCurrentView} 
            setSelectedTeacher={setSelectedTeacher}
            setSelectedPackage={setSelectedPackage}
          />
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-brand-navy-950 text-gray-100 font-sans antialiased selection:bg-brand-gold-400 selection:text-brand-navy-950 relative overflow-hidden">
      
      {/* Background Gradients & Glow Circles for Frosted Glass theme */}
      <div className="absolute top-0 right-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute -top-48 -right-48 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px]"></div>
        <div className="absolute -bottom-48 -left-48 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[100px]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/5 rounded-full blur-[150px]"></div>
      </div>

      {/* Dynamic Header Navbar */}
      <div className="relative z-10">
        <Navbar 
          currentView={currentView} 
          setCurrentView={setCurrentView} 
          cart={cart} 
          setIsCartOpen={setIsCartOpen}
        />
      </div>

      {/* Main Container Stage */}
      <main className="flex-1 relative z-10">
        {renderActiveView()}
      </main>

      {/* 10. PREMIUM FOOTER */}
      <footer className="relative z-10 bg-white/5 backdrop-blur-xl border-t border-white/10 pt-16 pb-8 text-right">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand & Mission column */}
          <div className="space-y-4">
            <span className="text-2xl font-black text-white">
              أكاديمية <span className="gold-gradient-text">صَرح</span>
            </span>
            <p className="text-gray-400 text-xs leading-relaxed">
              الصرح التعليمي المتكامل الأقوى في مصر لتأهيل طلاب شهادة الثانوية العامة للتفوق والحصول على أعلى الدرجات والقبول بكليات القمة مع أشهر المدرسين.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-gray-500 font-bold">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>مؤسسة تعليمية رسمية مرخصة</span>
            </div>
          </div>

          {/* Quick links */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm border-r-2 border-brand-gold-400 pr-2">تصفح المنصة</h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li>
                <button onClick={() => { setCurrentView("landing"); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="hover:text-brand-gold-300 transition-colors cursor-pointer">
                  الصفحة الرئيسية
                </button>
              </li>
              <li>
                <button onClick={() => { setCurrentView("teachers"); setSelectedTeacher(null); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="hover:text-brand-gold-300 transition-colors cursor-pointer">
                  نخبة كبار المدرسين
                </button>
              </li>
              <li>
                <button onClick={() => { setCurrentView("packages"); setSelectedPackage(null); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="hover:text-brand-gold-300 transition-colors cursor-pointer">
                  الباقات السنوية الموفرة
                </button>
              </li>
              <li>
                <button onClick={() => { setCurrentView("store"); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="hover:text-brand-gold-300 transition-colors cursor-pointer">
                  متجر الكتب والمذكرات
                </button>
              </li>
            </ul>
          </div>

          {/* Services & Support */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm border-r-2 border-brand-gold-400 pr-2">الدعم الفني والخدمات</h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li>
                <span className="text-gray-400">الخط الساخن: <strong className="text-brand-gold-400 font-bold">١٩٨٧٦</strong></span>
              </li>
              <li>
                <span className="text-gray-400">دعم الواتساب: <strong className="text-brand-gold-400 font-bold">٠١٢٣٤٥٦٧٨٩٠</strong></span>
              </li>
              <li>
                <button onClick={() => { setCurrentView("admin"); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="hover:text-brand-gold-300 text-brand-gold-300/80 transition-colors cursor-pointer">
                  بوابة المدير (الإدارة)
                </button>
              </li>
            </ul>
          </div>

          {/* Location details */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm border-r-2 border-brand-gold-400 pr-2">المقر الرئيسي</h4>
            <p className="text-gray-400 text-xs leading-relaxed">
              ١٢ شارع التحرير، أمام محطة مترو الدقي، الجيزة، مصر. <br />
              مواعيد العمل: من الساعة ٩ صباحاً وحتى ١٠ مساءً يومياً.
            </p>
          </div>

        </div>

        {/* Bottom copyright segment */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© ٢٠٢٦ أكاديمية صرح للثانوية العامة. جميع الحقوق محفوظة.</p>
          <p className="flex items-center gap-1.5">
            <span>صُنع بحب وتفوق لخدمة الطلاب في مصر</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-current" />
          </p>
        </div>
      </footer>

      {/* FLOATING CART DRAWER MODAL (SLIDE-OVER) */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true">
          <div className="absolute inset-0 bg-brand-navy-950/80 backdrop-blur-sm transition-opacity" onClick={() => setIsCartOpen(false)}></div>
          
          <div className="absolute inset-y-0 left-0 max-w-full flex">
            <div className="w-screen max-w-md bg-brand-navy-900 border-r border-white/10 text-right flex flex-col shadow-2xl animate-slide-in">
              
              {/* Drawer Header */}
              <div className="p-6 border-b border-white/5 flex items-center justify-between bg-brand-navy-950">
                <div className="flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5 text-brand-gold-400" />
                  <h2 className="text-lg font-bold text-white">حقيبة طلبات الحجز</h2>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Body (Items list) */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {cart.length === 0 ? (
                  <div className="text-center py-12 space-y-3">
                    <ShoppingCart className="w-12 h-12 text-gray-600 mx-auto" />
                    <p className="text-gray-400 text-sm font-semibold">حقيبتك فارغة حالياً</p>
                    <p className="text-gray-500 text-xs">احجز حصصاً فردية أو ملازم لمتابعة تفوقك.</p>
                  </div>
                ) : (
                  <div className="space-y-3 divide-y divide-white/5">
                    {cart.map((item) => (
                      <div key={item.id} className="pt-3 first:pt-0 flex items-center justify-between gap-3 text-xs">
                        <div className="space-y-1 text-right flex-1">
                          <p className="text-white font-bold">{item.title}</p>
                          <p className="text-gray-400 text-[10px]">{item.subtitle}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-brand-gold-300 font-extrabold whitespace-nowrap">
                            {item.price > 0 ? `${item.price} ج.م` : "تسعير لاحق"}
                          </span>
                          <button
                            onClick={() => handleRemoveFromCart(item.id)}
                            className="text-rose-400 hover:text-rose-300 p-1 cursor-pointer"
                            title="حذف البند"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Drawer Footer and Checkout buttons */}
              {cart.length > 0 && (
                <div className="p-6 border-t border-white/5 bg-brand-navy-950 space-y-4">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-400 font-semibold">مجموع الكتب والخدمات:</span>
                    <span className="text-brand-gold-400 font-black text-lg">
                      {cart.reduce((s, i) => s + i.price, 0)} ج.م
                    </span>
                  </div>

                  <div className="space-y-2">
                    <button
                      onClick={() => {
                        setIsCartOpen(false);
                        setCurrentView("cart");
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className="w-full py-3 rounded-xl gold-gradient-bg font-black text-brand-navy-950 text-xs shadow-md cursor-pointer flex items-center justify-center gap-2"
                    >
                      <span>تأكيد الطلب وحجز الحصص</span>
                      <ArrowLeft className="w-4 h-4 text-brand-navy-950" />
                    </button>

                    <button
                      onClick={() => setIsCartOpen(false)}
                      className="w-full py-2.5 rounded-xl bg-white/5 text-white border border-white/10 hover:bg-white/10 text-xs font-semibold cursor-pointer text-center"
                    >
                      مواصلة التصفح واختيار مواد أخرى
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      )}

      {/* FLOATING HELPLINE WIDGET (WHATSAPP CALL TO ACTION FOR HIGH CONVERSION) */}
      <div className="fixed bottom-6 right-6 z-40">
        <a 
          href="https://wa.me/201234567890?text=أرغب%20في%20الاستفسار%20عن%20حجوزات%20أكاديمية%20صرح"
          target="_blank" 
          rel="noreferrer"
          className="flex items-center justify-center w-14 h-14 rounded-full bg-emerald-500 text-white shadow-2xl hover:scale-110 active:scale-95 transition-all cursor-pointer group relative"
          title="تواصل معنا واتساب مباشرة"
        >
          <MessageCircle className="w-8 h-8 fill-current" />
          <span className="absolute right-16 bg-emerald-500 text-white text-xs font-black px-3 py-1.5 rounded-lg shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity hidden sm:inline-block pointer-events-none">
            واتساب الأكاديمية المباشر
          </span>
          <span className="absolute -top-1 -left-1 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500"></span>
          </span>
        </a>
      </div>

    </div>
  );
}
