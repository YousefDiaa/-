export interface Teacher {
  id: string;
  name: string;
  subject: string;
  description: string;
  bio: string;
  experience: string; // e.g., "15 عاماً من الخبرة"
  rating: number;
  ratingCount: number;
  photoUrl: string;
  branches: string[];
  schedule: { day: string; time: string; type: "سنتر" | "أونلاين" }[];
  individualLessons: { id: string; title: string; price: number; description: string }[];
}

export interface Package {
  id: string;
  name: string;
  type: "single" | "multi" | "scientific" | "literary" | "vip" | "revision";
  typeName: string; // Arabic name
  description: string;
  includedTeachers: string[]; // Teacher IDs
  includedBooks: string[]; // Book titles
  price?: number;
  image: string;
}

export interface Book {
  id: string;
  title: string;
  teacherId: string;
  teacherName: string;
  subject: string;
  description: string;
  price: number;
  coverUrl: string;
}

export type CartItemType = "lesson" | "package" | "book" | "seat";

export interface CartItem {
  id: string; // unique item id
  itemType: CartItemType;
  title: string;
  subtitle: string; // e.g. teacher name or subject
  price: number;
  originalId: string; // references actual Teacher ID, Package ID, or Book ID
}

export interface StudentInfo {
  fullName: string;
  phone: string;
  parentPhone: string;
  governorate: string;
  branch: string; // Selected study branch: "علمي علوم" | "علمي رياضة" | "أدبي"
  grade: string; // "الصف الأول" | "الصف الثاني" | "الصف الثالث"
}

export interface SupportRequest {
  id: string;
  studentInfo: StudentInfo;
  items: CartItem[];
  notes: string;
  status: "pending" | "confirmed" | "cancelled";
  createdAt: string;
}
