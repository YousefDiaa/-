import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  ArrowLeft, CheckCircle2, Star, Users, MapPin, Award, BookOpen, 
  HelpCircle, MessageSquare, Phone, Mail, GraduationCap, ChevronDown, ChevronUp, Clock, Sparkles
} from "lucide-react";
import { MOCK_TEACHERS, MOCK_PACKAGES, MOCK_TESTIMONIALS, MOCK_FAQ } from "../data";
import { Teacher, Package } from "../types";

interface LandingPageProps {
  setCurrentView: (view: string) => void;
  setSelectedTeacher: (teacher: Teacher | null) => void;
  setSelectedPackage: (pkg: Package | null) => void;
}

export default function LandingPage({ setCurrentView, setSelectedTeacher, setSelectedPackage }: LandingPageProps) {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [contactForm, setContactForm] = useState({ name: "", phone: "", grade: "3", msg: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Statistics
  const stats = [
    { value: "+٢٥,٠٠٠", label: "طالب وطالبة تفوقوا معنا", icon: Users },
    { value: "+١٥", label: "كبار معلمي الثانوية العامة", icon: GraduationCap },
    { value: "+١٢", label: "فروع سناتر ومراكز جغرافية", icon: MapPin },
    { value: "٩٨.٧٪", label: "نسبة النجاح والقبول بالكليات", icon: Award }
  ];

  // Why choose us features
  const features = [
    {
      title: "نخبة من كبار الأساتذة",
      desc: "نجمع لك أشهر معلمي مصر الذين لديهم باع طويل في صياغة الامتحانات الوزارية وتذليل العقبات الدراسية.",
      icon: GraduationCap,
      color: "from-amber-500 to-yellow-400"
    },
    {
      title: "نظام متابعة دوري صارم",
      desc: "تقارير أسبوعية لولي الأمر، امتحانات مفاجئة بعد كل محاضرة، وتدريب مستمر لمنع تراكم المنهج.",
      icon: CheckCircle2,
      color: "from-blue-500 to-indigo-600"
    },
    {
      title: "تعليم هجين مرن",
      desc: "تفاعل مباشر داخل السنتر، مع إتاحة منصة إلكترونية مسجل عليها الحصص بجودة عالية للمراجعة طوال العام.",
      icon: BookOpen,
      color: "from-emerald-500 to-teal-600"
    },
    {
      title: "مستلزمات وملازم حصرية",
      desc: "كتب ومذكرات مطبوعة فخمة تصلك لباب المنزل أو تستلمها من السنتر، تغنيك عن أي كتب خارجية أخرى.",
      icon: Sparkles,
      color: "from-purple-500 to-pink-600"
    }
  ];

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (contactForm.name && contactForm.phone) {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setContactForm({ name: "", phone: "", grade: "3", msg: "" });
      }, 5000);
    }
  };

  return (
    <div className="space-y-24 pb-16">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-12 md:py-20">
        {/* Background Gradients & Glow Circles */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-brand-gold-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-brand-navy-500/15 rounded-full blur-3xl"></div>
          <div className="absolute top-10 right-10 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-gold-500/10 border border-brand-gold-400/30 text-brand-gold-300 text-xs sm:text-sm font-semibold tracking-wide">
              <Sparkles className="w-4 h-4 text-brand-gold-400" />
              <span>أقوى منصة تعليمية للثانوية العامة في مصر ٢٠٢٦</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white leading-tight tracking-tight max-w-5xl mx-auto">
              بوابتك المضمونة لتفوّق <br className="hidden sm:inline" />
              <span className="gold-gradient-text">الثانوية العامة</span> مع كبار المعلمين
            </h1>

            {/* Sub-headline */}
            <p className="text-gray-300 text-base sm:text-xl max-w-3xl mx-auto leading-relaxed">
              اختر مدرسيك المفضلين، احجز حصصك، اشترك في باقات المناهج المتكاملة، واحصل على كتب ومذكرات المدرسين لباب بيتك بضغطة زر واحدة.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <button
                onClick={() => { setCurrentView("teachers"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                className="w-full sm:w-auto px-8 py-4 rounded-xl gold-gradient-bg font-bold text-brand-navy-950 shadow-xl shadow-brand-gold-500/35 hover:scale-105 transition-all duration-300 cursor-pointer flex items-center justify-center gap-2"
              >
                <span>احجز مع مدرسك المفضل</span>
                <ArrowLeft className="w-5 h-5" />
              </button>
              
              <button
                onClick={() => { setCurrentView("packages"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/5 text-white border border-white/15 hover:bg-white/10 transition-all duration-300 cursor-pointer font-bold text-sm"
              >
                استكشف باقات التوفير المتكاملة
              </button>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-12 border-t border-white/5">
              <div className="text-center p-3">
                <p className="text-brand-gold-300 text-2xl font-black">١٠٠٪</p>
                <p className="text-gray-400 text-xs mt-1">تغطية لكافة أجزاء المنهج</p>
              </div>
              <div className="text-center p-3">
                <p className="text-brand-gold-300 text-2xl font-black">أونلاين + سنتر</p>
                <p className="text-gray-400 text-xs mt-1">نظام تعليمي هجين متطور</p>
              </div>
              <div className="text-center p-3">
                <p className="text-brand-gold-300 text-2xl font-black">شحن سريع</p>
                <p className="text-gray-400 text-xs mt-1">لكافة المذكرات لجميع المحافظات</p>
              </div>
              <div className="text-center p-3">
                <p className="text-brand-gold-300 text-2xl font-black">متابعة دقيقة</p>
                <p className="text-gray-400 text-xs mt-1">تقارير دورية لأولياء الأمور</p>
              </div>
            </div>

          </motion.div>
        </div>
      </section>

      {/* 2. STATS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/5 text-center group hover:border-brand-gold-500/30 transition-all duration-300"
            >
              <div className="mx-auto w-12 h-12 rounded-xl bg-brand-gold-500/10 flex items-center justify-center text-brand-gold-400 mb-4 group-hover:scale-110 transition-transform">
                <stat.icon className="w-6 h-6" />
              </div>
              <p className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">{stat.value}</p>
              <p className="text-gray-400 text-sm mt-2 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. ACADEMY INTRODUCTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-brand-gold-400 font-bold text-sm">
              <span className="w-8 h-0.5 gold-gradient-bg inline-block"></span>
              <span>عن أكاديمية صَرح</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight">
              نحن لا ندرّس فقط المناهج، <br />
              بل نصنع <span className="gold-gradient-text">قصص النجاح والتفوق</span>
            </h2>
            <p className="text-gray-300 leading-relaxed text-base sm:text-lg">
              تأسست أكاديمية صرح لتكون الصرح التعليمي الأكبر والأحدث في مصر لطلاب المرحلة الثانوية. نحن نوفر بيئة تعليمية متميزة تمزج بين هيبة التعليم التقليدي داخل الفروع المجهزة بأحدث التقنيات البصرية والصوتية، وبين مرونة التعليم الإلكتروني المتكامل عبر منصتنا الرقمية.
            </p>
            <p className="text-gray-400 leading-relaxed text-sm">
              يستطيع الطالب من خلالنا إدارة كامل رحلته التعليمية للثانوية العامة: حجز المقاعد مع أشهر الأساتذة، الاشتراك في المجموعات الخاصة، متابعة أحدث الحصص المسجلة والمباشرة، والحصول على الشروحات والكتب الحصرية المطبوعة والموزعة بانتظام.
            </p>
            <div className="pt-4">
              <button
                onClick={() => { setCurrentView("teachers"); }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-navy-800 text-brand-gold-300 border border-brand-gold-500/20 hover:bg-brand-navy-700 transition-colors cursor-pointer font-bold text-sm"
              >
                <span>تعرّف على طاقم التدريس الخاص بنا</span>
                <ArrowLeft className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="absolute -inset-2 rounded-2xl gold-gradient-bg opacity-10 blur-xl"></div>
            <div className="relative rounded-2xl overflow-hidden border border-white/15 bg-brand-navy-900 p-2">
              <img 
                src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=600" 
                alt="Sarh Academy Classroom" 
                className="rounded-xl w-full h-[350px] object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-6 right-6 left-6 glass-panel p-4 rounded-xl border border-white/10 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full gold-gradient-bg flex items-center justify-center text-brand-navy-950 font-black">
                  ⭐
                </div>
                <div>
                  <p className="text-white text-xs font-black">اعتماد وجدارة تعليمية</p>
                  <p className="text-gray-300 text-[10px]">بإشراف وزارة التربية والتعليم والتعليم الفني</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 4. WHY CHOOSE US */}
      <section className="bg-brand-navy-900/40 py-16 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 text-brand-gold-400 font-bold text-sm justify-center">
              <span className="w-6 h-0.5 gold-gradient-bg inline-block"></span>
              <span>لماذا أكاديمية صَرح؟</span>
              <span className="w-6 h-0.5 gold-gradient-bg inline-block"></span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
              نظام تعليمي متكامل صُمّم <span className="gold-gradient-text">لضمان المركز الأول</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base">
              نوفر لطلابنا معايير جودة فائقة لا تتوفر في أي مكان آخر، للتسهيل عليهم وضمان سلامة المتابعة الدراسية.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="glass-panel p-6 rounded-2xl border border-white/5 hover:border-brand-gold-500/30 transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feat.color} p-0.5 flex items-center justify-center text-white shadow-lg`}>
                    <div className="bg-brand-navy-950 w-full h-full rounded-[10px] flex items-center justify-center">
                      <feat.icon className="w-6 h-6 text-brand-gold-400" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white group-hover:text-brand-gold-400 transition-colors">{feat.title}</h3>
                  <p className="text-gray-400 text-xs leading-relaxed">{feat.desc}</p>
                </div>
                <div className="pt-6">
                  <span className="text-[10px] text-brand-gold-300 font-bold tracking-wider flex items-center gap-1 group-hover:underline">
                    <span>اقرأ المزيد</span>
                    <ArrowLeft className="w-3 h-3" />
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. STUDENT ACHIEVEMENTS / TOP STUDENTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 text-brand-gold-400 font-bold text-sm">
            <span className="w-8 h-0.5 gold-gradient-bg inline-block"></span>
            <span>لوحة الشرف والتفوق</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
            أوائل الجمهورية <span className="gold-gradient-text">خريجو أكاديميتنا</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-xs sm:text-sm">
            كل عام يفخر صرح الأكاديمية بتخريج كوكبة من الطلاب الحاصلين على أعلى المجاميع على مستوى الجمهورية.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {MOCK_TESTIMONIALS.map((student, idx) => (
            <motion.div
              key={student.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
              className="relative p-1 rounded-2xl gold-gradient-bg shadow-xl"
            >
              <div className="bg-brand-navy-900 rounded-[14px] p-6 text-right space-y-4 h-full flex flex-col justify-between">
                
                {/* Score badge */}
                <div className="absolute -top-4 left-6 gold-gradient-bg px-4 py-1 rounded-full text-brand-navy-950 font-black text-sm shadow-md animate-bounce">
                  المجموع: {student.score}
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <img 
                      src={student.avatar} 
                      alt={student.name} 
                      className="w-14 h-14 rounded-full object-cover border-2 border-brand-gold-400"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <h4 className="text-lg font-bold text-white">{student.name}</h4>
                      <p className="text-brand-gold-300 text-xs font-semibold">{student.grade}</p>
                    </div>
                  </div>
                  <div className="flex gap-1 text-brand-gold-400">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                  </div>
                  <p className="text-gray-300 text-xs leading-relaxed italic">
                    &ldquo;{student.text}&rdquo;
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[10px] text-gray-500 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>تم التحقق من النتيجة</span>
                  </span>
                  <span className="text-[10px] text-brand-gold-300 font-bold">كلية قصر العيني</span>
                </div>

              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 6. FEATURED TEACHERS (TEASER) */}
      <section className="bg-brand-navy-950 py-12 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 text-brand-gold-400 font-bold text-sm">
                <span className="w-8 h-0.5 gold-gradient-bg inline-block"></span>
                <span>النخبة التدريسية</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
                عمالقة التدريس <span className="gold-gradient-text">في مكان واحد</span>
              </h2>
              <p className="text-gray-400 max-w-xl text-xs sm:text-sm">
                مجموعة حصرية من كبار الموجهين ومؤلفي الكتب التعليمية لمختلف مواد الثانوية العامة.
              </p>
            </div>
            <button
              onClick={() => { setCurrentView("teachers"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              className="px-6 py-3 rounded-xl border border-brand-gold-500/20 text-brand-gold-400 hover:bg-brand-gold-500/10 transition-colors font-bold text-xs flex items-center gap-2 cursor-pointer"
            >
              <span>عرض جميع المدرسين ({MOCK_TEACHERS.length})</span>
              <ArrowLeft className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {MOCK_TEACHERS.slice(0, 3).map((teacher) => (
              <div 
                key={teacher.id}
                className="glass-panel rounded-2xl overflow-hidden border border-white/5 hover:border-brand-gold-500/30 transition-all duration-300 flex flex-col group"
              >
                {/* Photo & Background decorative */}
                <div className="relative h-64 bg-brand-navy-900 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-navy-950 to-transparent z-10"></div>
                  <img 
                    src={teacher.photoUrl} 
                    alt={teacher.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  {/* Rating Badge */}
                  <div className="absolute top-4 right-4 z-20 flex items-center gap-1 bg-brand-navy-950/85 backdrop-blur px-3 py-1 rounded-full border border-white/10">
                    <Star className="w-3.5 h-3.5 text-brand-gold-400 fill-current" />
                    <span className="text-white text-xs font-bold">{teacher.rating}</span>
                  </div>
                  {/* Subject Badge */}
                  <div className="absolute bottom-4 right-4 z-20 gold-gradient-bg px-3 py-1 rounded-lg text-brand-navy-950 font-black text-xs">
                    {teacher.subject}
                  </div>
                </div>

                {/* Info Content */}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-white group-hover:text-brand-gold-300 transition-colors">{teacher.name}</h3>
                    <p className="text-brand-gold-200 text-[11px] font-semibold">{teacher.experience}</p>
                    <p className="text-gray-400 text-xs line-clamp-2">{teacher.description}</p>
                  </div>

                  <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                    <span className="text-[10px] text-gray-500">الفروع: {teacher.branches.slice(0, 3).join(" • ")}</span>
                    <button
                      onClick={() => {
                        setSelectedTeacher(teacher);
                        setCurrentView("teachers");
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className="px-4 py-2 rounded-lg bg-brand-navy-800 text-brand-gold-300 text-xs font-bold hover:bg-brand-gold-500 hover:text-brand-navy-950 transition-all cursor-pointer"
                    >
                      التفاصيل والحجز
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 7. FEATURED PACKAGES (TEASER) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 text-brand-gold-400 font-bold text-sm">
              <span className="w-8 h-0.5 gold-gradient-bg inline-block"></span>
              <span>باقات ومسارات متميزة</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
              اشتراكات متكاملة <span className="gold-gradient-text">توفر مجهودك ومالك</span>
            </h2>
            <p className="text-gray-400 max-w-xl text-xs sm:text-sm">
              باقات حصرية مجمعة وموفرة تشمل المدرسين والكتب الدراسية وكود المنصة لتفوق دائم ومستمر.
            </p>
          </div>
          <button
            onClick={() => { setCurrentView("packages"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            className="px-6 py-3 rounded-xl border border-brand-gold-500/20 text-brand-gold-400 hover:bg-brand-gold-500/10 transition-colors font-bold text-xs flex items-center gap-2 cursor-pointer"
          >
            <span>عرض كافة الباقات ({MOCK_PACKAGES.length})</span>
            <ArrowLeft className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_PACKAGES.slice(0, 3).map((pkg) => (
            <div 
              key={pkg.id}
              className="glass-panel rounded-2xl overflow-hidden border border-white/5 hover:border-brand-gold-500/30 transition-all duration-300 flex flex-col group"
            >
              <div className="relative h-48 bg-brand-navy-900 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy-950 to-transparent z-10"></div>
                <img 
                  src={pkg.image} 
                  alt={pkg.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 right-4 z-20 bg-brand-gold-500/10 border border-brand-gold-400/30 text-brand-gold-300 text-[10px] font-bold px-3 py-1 rounded-full">
                  {pkg.typeName}
                </div>
              </div>

              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-white group-hover:text-brand-gold-300 transition-colors">{pkg.name}</h3>
                  <p className="text-gray-400 text-xs line-clamp-2">{pkg.description}</p>
                </div>

                <div className="pt-4 border-t border-white/5 space-y-4">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-500">سعر الباقة التقريبي:</span>
                    <span className="text-brand-gold-300 font-extrabold text-base">{pkg.price ? `${pkg.price} ج.م` : "طلب تسعير خاص"}</span>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedPackage(pkg);
                      setCurrentView("packages");
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="w-full py-2.5 rounded-lg gold-gradient-bg hover:opacity-90 text-brand-navy-950 text-xs font-black transition-all cursor-pointer text-center"
                  >
                    استكشاف محتويات الباقة
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. FAQS SECTION (ACCORDION) */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 text-brand-gold-400 font-bold text-sm justify-center">
            <HelpCircle className="w-4 h-4 text-brand-gold-400" />
            <span>الأسئلة الأكثر شيوعاً</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
            لديك استفسار؟ <span className="gold-gradient-text">إجاباتنا الشافية هنا</span>
          </h2>
          <p className="text-gray-400 text-xs sm:text-sm">
            إليك الأجوبة المباشرة على كافة الأسئلة التي تراودك وتراود أولياء الأمور الكرام.
          </p>
        </div>

        <div className="space-y-4">
          {MOCK_FAQ.map((faq, index) => {
            const isOpen = activeFaq === index;
            return (
              <div
                key={index}
                className="glass-panel rounded-xl overflow-hidden border border-white/5 transition-all duration-300"
              >
                <button
                  onClick={() => setActiveFaq(isOpen ? null : index)}
                  className="w-full text-right p-5 flex items-center justify-between gap-4 font-bold text-white text-sm sm:text-base hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <span>{faq.question}</span>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-brand-gold-400 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-brand-gold-400 flex-shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="p-5 pt-0 text-gray-300 text-xs sm:text-sm leading-relaxed border-t border-white/5 bg-brand-navy-900/30 animate-fade-in">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 9. CONTACT SECTION */}
      <section id="contact-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel rounded-3xl overflow-hidden border border-white/10 relative">
          
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-brand-gold-500/5 rounded-full blur-3xl"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Contact Details side */}
            <div className="lg:col-span-5 bg-brand-navy-900/60 p-8 sm:p-12 border-b lg:border-b-0 lg:border-l border-white/10 space-y-8">
              <div className="space-y-3">
                <h3 className="text-2xl sm:text-3xl font-bold text-white">تواصل مع الأكاديمية</h3>
                <p className="text-gray-400 text-xs sm:text-sm">
                  يسعدنا استقبال اتصالاتكم وزيارتكم لفروعنا طوال أيام الأسبوع من الساعة 9 صباحاً وحتى 10 مساءً.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-gold-500/10 flex items-center justify-center text-brand-gold-400 flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-white text-xs font-bold">الخط الساخن والدعم الفني</h4>
                    <p className="text-brand-gold-300 text-base font-bold tracking-wider mt-1">١٩٨٧٦ (من داخل مصر)</p>
                    <p className="text-gray-400 text-[11px] mt-0.5">متاح واتساب: ٠١٢٣٤٥٦٧٨٩٠</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-gold-500/10 flex items-center justify-center text-brand-gold-400 flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-white text-xs font-bold">البريد الإلكتروني للأكاديمية</h4>
                    <p className="text-gray-300 text-xs sm:text-sm mt-1">support@sarh-academy.edu.eg</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-gold-500/10 flex items-center justify-center text-brand-gold-400 flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-white text-xs font-bold">الفرع الرئيسي والمقر العام</h4>
                    <p className="text-gray-300 text-xs mt-1">١٢ شارع التحرير، الدقي، الجيزة، مصر</p>
                    <p className="text-gray-400 text-[10px] mt-0.5">فروع أخرى: مدينة نصر، المعادي، مصر الجديدة، طنطا، المنصورة</p>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-white/5 space-y-3">
                <h4 className="text-white text-xs font-bold">تابعنا على شبكات التواصل الاجتماعي</h4>
                <div className="flex gap-3">
                  <a href="https://www.facebook.com/share/17nefvn5Jw/" target="_blank" rel="noreferrer" className="px-4 py-2 rounded-lg bg-brand-navy-800 hover:bg-brand-gold-500 hover:text-brand-navy-950 text-gray-300 text-xs font-bold transition-all flex items-center gap-1">
                    <span>صفحة الفيسبوك الخاصة بنا</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Form side */}
            <div className="lg:col-span-7 p-8 sm:p-12 space-y-6">
              <div className="space-y-2">
                <h3 className="text-xl sm:text-2xl font-bold text-white">اترك لنا رسالة وسنتصل بك</h3>
                <p className="text-gray-400 text-xs">هل ترغب في توجيه خاص أو باقة معينة؟ املأ البيانات وسيقوم مستشار تعليمي بالتواصل معك هاتفياً.</p>
              </div>

              {isSubmitted ? (
                <div className="p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 space-y-3 text-center">
                  <CheckCircle2 className="w-12 h-12 mx-auto animate-bounce" />
                  <h4 className="text-lg font-bold">تم إرسال رسالتك بنجاح!</h4>
                  <p className="text-xs">شكراً لاهتمامك بأكاديمية صرح، سيقوم مستشارك التعليمي بالتواصل معك خلال الساعات القليلة القادمة.</p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs text-gray-300 font-semibold">اسم الطالب رباعي *</label>
                      <input
                        type="text"
                        required
                        placeholder="أحمد محمد السيد..."
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-brand-navy-950 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-brand-gold-500 text-sm"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs text-gray-300 font-semibold">رقم الهاتف (واتساب) *</label>
                      <input
                        type="tel"
                        required
                        placeholder="01xxxxxxxxx"
                        value={contactForm.phone}
                        onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-brand-navy-950 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-brand-gold-500 text-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs text-gray-300 font-semibold">الصف الدراسي الحالي</label>
                    <select
                      value={contactForm.grade}
                      onChange={(e) => setContactForm({ ...contactForm, grade: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-brand-navy-950 border border-white/10 text-white focus:outline-none focus:border-brand-gold-500 text-sm"
                    >
                      <option value="1">الصف الأول الثانوي</option>
                      <option value="2">الصف الثاني الثانوي</option>
                      <option value="3">الصف الثالث الثانوي (الثانوية العامة)</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs text-gray-300 font-semibold">ملاحظات أو أسئلة إضافية</label>
                    <textarea
                      rows={3}
                      placeholder="اكتب استفسارك هنا، مثال: أرغب في حجز الباقة العلمية ومعرفة تفاصيل الكتب المتاحة..."
                      value={contactForm.msg}
                      onChange={(e) => setContactForm({ ...contactForm, msg: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-brand-navy-950 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-brand-gold-500 text-sm"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl gold-gradient-bg hover:opacity-95 font-bold text-brand-navy-950 text-sm transition-all duration-300 cursor-pointer shadow-lg shadow-brand-gold-500/10 hover:shadow-brand-gold-500/25"
                  >
                    تأكيد الإرسال والاتصال بي
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
