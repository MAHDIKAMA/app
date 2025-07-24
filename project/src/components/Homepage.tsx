import React from 'react';
import { 
  BookOpen, 
  Users, 
  Award, 
  Play, 
  Star, 
  Clock, 
  TrendingUp,
  CheckCircle,
  ArrowLeft,
  Search,
  Filter,
  User,
  Heart,
  Share2,
  Download
} from 'lucide-react';

interface Course {
  id: number;
  title: string;
  instructor: string;
  rating: number;
  students: number;
  duration: string;
  price: string;
  originalPrice?: string;
  image: string;
  level: string;
  category: string;
  isPopular?: boolean;
}

const courses: Course[] = [
  {
    id: 1,
    title: "ریاضی پایه دهم - جامع و کاربردی",
    instructor: "دکتر احمد محمدی",
    rating: 4.8,
    students: 2340,
    duration: "45 ساعت",
    price: "299,000",
    originalPrice: "399,000",
    image: "https://images.pexels.com/photos/6238050/pexels-photo-6238050.jpeg",
    level: "مقدماتی",
    category: "ریاضی",
    isPopular: true
  },
  {
    id: 2,
    title: "فیزیک یازدهم - مکانیک و حرکت",
    instructor: "مهندس سارا احمدی",
    rating: 4.9,
    students: 1890,
    duration: "38 ساعت",
    price: "349,000",
    image: "https://images.pexels.com/photos/8500/apple-desk-laptop-working.jpg",
    level: "متوسط",
    category: "فیزیک"
  },
  {
    id: 3,
    title: "شیمی دوازدهم - آلی و معدنی",
    instructor: "دکتر مریم رضایی",
    rating: 4.7,
    students: 1560,
    duration: "52 ساعت",
    price: "279,000",
    originalPrice: "350,000",
    image: "https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg",
    level: "پیشرفته",
    category: "شیمی"
  },
  {
    id: 4,
    title: "زبان انگلیسی - مکالمه و گرامر",
    instructor: "استاد علی نوری",
    rating: 4.6,
    students: 3200,
    duration: "60 ساعت",
    price: "199,000",
    image: "https://images.pexels.com/photos/267669/pexels-photo-267669.jpeg",
    level: "همه سطوح",
    category: "زبان"
  }
];

const categories = [
  { name: "ریاضی", icon: "📊", count: 45 },
  { name: "فیزیک", icon: "⚡", count: 32 },
  { name: "شیمی", icon: "🧪", count: 28 },
  { name: "زیست", icon: "🧬", count: 35 },
  { name: "زبان", icon: "🗣️", count: 52 },
  { name: "ادبیات", icon: "📚", count: 38 }
];

const stats = [
  { label: "دانش‌آموز فعال", value: "50,000+", icon: Users },
  { label: "دوره آموزشی", value: "500+", icon: BookOpen },
  { label: "استاد مجرب", value: "200+", icon: Award },
  { label: "ساعت آموزش", value: "10,000+", icon: Clock }
];

interface HomepageProps {
  onLogin: () => void;
  onRegister: () => void;
  onCourseClick: (courseId: number) => void;
}

export default function Homepage({ onLogin, onRegister, onCourseClick }: HomepageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center ml-3">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                آکادمی آنلاین
              </h1>
            </div>
            
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#courses" className="text-gray-700 hover:text-blue-600 transition-colors">دوره‌ها</a>
              <a href="#about" className="text-gray-700 hover:text-blue-600 transition-colors">درباره ما</a>
              <a href="#contact" className="text-gray-700 hover:text-blue-600 transition-colors">تماس</a>
            </nav>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={onLogin}
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                ورود
              </button>
              <button
                onClick={onRegister}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium"
              >
                ثبت نام
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute -top-40 -right-32 w-96 h-96 bg-gradient-to-br from-blue-400/30 to-purple-400/30 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-32 w-96 h-96 bg-gradient-to-tr from-purple-400/30 to-blue-400/30 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-right">
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                آینده‌ای روشن با
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block">
                  یادگیری آنلاین
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                بهترین دوره‌های آموزشی را از اساتید مجرب بیاموزید و مهارت‌های خود را ارتقا دهید.
                بیش از ۵۰۰ دوره در انتظار شماست.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button
                  onClick={onRegister}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium text-lg shadow-lg hover:shadow-xl"
                >
                  شروع یادگیری
                </button>
                <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl hover:border-blue-500 hover:text-blue-600 transition-all duration-200 font-medium text-lg">
                  مشاهده دوره‌ها
                </button>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/20">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">دوره محبوب امروز</h3>
                  <span className="bg-gradient-to-r from-orange-400 to-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    🔥 داغ
                  </span>
                </div>
                <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl mb-4 flex items-center justify-center">
                  <Play className="w-16 h-16 text-blue-600" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">ریاضی پایه دهم - جامع و کاربردی</h4>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>دکتر احمد محمدی</span>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 ml-1" />
                    <span>4.8</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">دسته‌بندی دوره‌ها</h2>
            <p className="text-xl text-gray-600">در هر زمینه‌ای که علاقه دارید، دوره‌های متنوعی در انتظار شماست</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category, index) => (
              <div
                key={index}
                className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-200 cursor-pointer border border-white/20 hover:border-blue-200"
              >
                <div className="text-4xl mb-4">{category.icon}</div>
                <h3 className="font-bold text-gray-900 mb-2">{category.name}</h3>
                <p className="text-gray-600 text-sm">{category.count} دوره</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Courses Section */}
      <section id="courses" className="py-20 bg-white/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">دوره‌های محبوب</h2>
              <p className="text-xl text-gray-600">بهترین دوره‌های انتخاب شده توسط دانش‌آموزان</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="جستجو در دوره‌ها..."
                  className="pr-12 pl-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/70 backdrop-blur-sm"
                />
              </div>
              <button className="flex items-center space-x-2 px-4 py-3 border border-gray-200 rounded-lg hover:bg-white/70 transition-colors">
                <Filter className="w-5 h-5" />
                <span>فیلتر</span>
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {courses.map((course) => (
              <div
                key={course.id}
                onClick={() => onCourseClick(course.id)}
                className="bg-white/70 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-200 border border-white/20 group"
              >
                {course.isPopular && (
                  <div className="absolute top-4 right-4 z-10 bg-gradient-to-r from-orange-400 to-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    محبوب
                  </div>
                )}
                
                <div className="relative overflow-hidden">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                    <Play className="w-12 h-12 text-white" />
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-lg text-xs font-medium">
                      {course.category}
                    </span>
                    <span className="text-gray-500 text-sm">{course.level}</span>
                  </div>
                  
                  <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">{course.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{course.instructor}</p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 ml-1" />
                      <span className="text-sm font-medium">{course.rating}</span>
                      <span className="text-gray-500 text-sm mr-2">({course.students})</span>
                    </div>
                    <div className="flex items-center text-gray-500 text-sm">
                      <Clock className="w-4 h-4 ml-1" />
                      {course.duration}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-2xl font-bold text-gray-900">{course.price}</span>
                      <span className="text-sm text-gray-900 mr-1">تومان</span>
                      {course.originalPrice && (
                        <span className="text-sm text-gray-500 line-through mr-2">{course.originalPrice}</span>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                        <Heart className="w-5 h-5" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-blue-500 transition-colors">
                        <Share2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium">
              مشاهده همه دوره‌ها
              <ArrowLeft className="w-5 h-5 mr-2 inline" />
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">چرا ما را انتخاب کنید؟</h2>
            <p className="text-xl text-gray-600">امکانات ویژه‌ای که تجربه یادگیری شما را بهتر می‌کند</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-white/70 backdrop-blur-sm rounded-2xl border border-white/20">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">کیفیت تضمینی</h3>
              <p className="text-gray-600">تمام دوره‌ها توسط اساتید مجرب و با تجربه تهیه شده‌اند</p>
            </div>
            
            <div className="text-center p-8 bg-white/70 backdrop-blur-sm rounded-2xl border border-white/20">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Download className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">دسترسی مادام‌العمر</h3>
              <p className="text-gray-600">پس از خرید، برای همیشه به دوره دسترسی خواهید داشت</p>
            </div>
            
            <div className="text-center p-8 bg-white/70 backdrop-blur-sm rounded-2xl border border-white/20">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">مدرک معتبر</h3>
              <p className="text-gray-600">پس از تکمیل دوره، مدرک معتبر دریافت خواهید کرد</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-700">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">آماده شروع یادگیری هستید؟</h2>
          <p className="text-xl text-blue-100 mb-8">
            همین حالا ثبت نام کنید و به جمع بیش از ۵۰ هزار دانش‌آموز موفق بپیوندید
          </p>
          <button
            onClick={onRegister}
            className="bg-white text-blue-600 px-8 py-4 rounded-xl hover:bg-gray-50 transition-all duration-200 font-bold text-lg shadow-lg hover:shadow-xl"
          >
            ثبت نام رایگان
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center ml-3">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold">آکادمی آنلاین</h3>
              </div>
              <p className="text-gray-400 mb-4">
                بهترین پلتفرم آموزش آنلاین برای یادگیری مهارت‌های جدید
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">دوره‌ها</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">ریاضی</a></li>
                <li><a href="#" className="hover:text-white transition-colors">فیزیک</a></li>
                <li><a href="#" className="hover:text-white transition-colors">شیمی</a></li>
                <li><a href="#" className="hover:text-white transition-colors">زبان انگلیسی</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">پشتیبانی</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">راهنما</a></li>
                <li><a href="#" className="hover:text-white transition-colors">تماس با ما</a></li>
                <li><a href="#" className="hover:text-white transition-colors">سوالات متداول</a></li>
                <li><a href="#" className="hover:text-white transition-colors">قوانین و مقررات</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">تماس با ما</h4>
              <div className="space-y-2 text-gray-400">
                <p>📧 info@academy.com</p>
                <p>📞 021-12345678</p>
                <p>📍 تهران، ایران</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 آکادمی آنلاین. تمام حقوق محفوظ است.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}