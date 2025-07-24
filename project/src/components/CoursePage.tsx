import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Star, 
  Clock, 
  Users, 
  Award, 
  Download, 
  Share2, 
  Heart,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  PlayCircle,
  FileText,
  MessageCircle,
  ArrowLeft,
  Calendar,
  Globe,
  Smartphone,
  Monitor,
  BookOpen,
  Target,
  TrendingUp,
  User
} from 'lucide-react';

interface Course {
  id: number;
  title: string;
  instructor: string;
  instructorImage: string;
  instructorBio: string;
  rating: number;
  reviewCount: number;
  students: number;
  duration: string;
  price: string;
  originalPrice?: string;
  image: string;
  level: string;
  category: string;
  description: string;
  whatYouLearn: string[];
  requirements: string[];
  chapters: Chapter[];
  reviews: Review[];
  lastUpdated: string;
  language: string;
  certificate: boolean;
  lifetime: boolean;
  mobile: boolean;
}

interface Chapter {
  id: number;
  title: string;
  duration: string;
  lessons: Lesson[];
}

interface Lesson {
  id: number;
  title: string;
  duration: string;
  type: 'video' | 'quiz' | 'assignment';
  preview?: boolean;
}

interface Review {
  id: number;
  user: string;
  avatar: string;
  rating: number;
  date: string;
  comment: string;
}

interface CoursePageProps {
  courseId: number;
  onBack: () => void;
}

const mockCourse: Course = {
  id: 1,
  title: "ریاضی پایه دهم - جامع و کاربردی",
  instructor: "دکتر احمد محمدی",
  instructorImage: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg",
  instructorBio: "دکتری ریاضی از دانشگاه تهران با بیش از 15 سال تجربه تدریس",
  rating: 4.8,
  reviewCount: 2340,
  students: 12450,
  duration: "45 ساعت",
  price: "299,000",
  originalPrice: "399,000",
  image: "https://images.pexels.com/photos/6238050/pexels-photo-6238050.jpeg",
  level: "مقدماتی",
  category: "ریاضی",
  description: "این دوره جامع ریاضی پایه دهم شامل تمامی مباحث کتاب درسی و تمرین‌های کاربردی است. با روش‌های نوین تدریس و مثال‌های عملی، مفاهیم پیچیده ریاضی را به سادگی یاد خواهید گرفت.",
  whatYouLearn: [
    "تسلط کامل بر مباحث ریاضی پایه دهم",
    "حل مسائل پیچیده با روش‌های ساده",
    "آمادگی برای آزمون‌های مهم",
    "درک عمیق مفاهیم ریاضی",
    "کاربرد ریاضی در زندگی روزمره"
  ],
  requirements: [
    "آشنایی با مباحث ریاضی نهم",
    "داشتن ماشین حساب علمی",
    "انگیزه برای یادگیری",
    "زمان کافی برای تمرین"
  ],
  chapters: [
    {
      id: 1,
      title: "فصل اول: مجموعه‌ها",
      duration: "8 ساعت",
      lessons: [
        { id: 1, title: "مقدمه‌ای بر مجموعه‌ها", duration: "15 دقیقه", type: "video", preview: true },
        { id: 2, title: "عملیات روی مجموعه‌ها", duration: "25 دقیقه", type: "video" },
        { id: 3, title: "تمرین‌های فصل اول", duration: "10 دقیقه", type: "quiz" }
      ]
    },
    {
      id: 2,
      title: "فصل دوم: توابع",
      duration: "12 ساعت",
      lessons: [
        { id: 4, title: "مفهوم تابع", duration: "20 دقیقه", type: "video" },
        { id: 5, title: "انواع توابع", duration: "30 دقیقه", type: "video" },
        { id: 6, title: "نمودار توابع", duration: "25 دقیقه", type: "video" },
        { id: 7, title: "تمرین‌های فصل دوم", duration: "15 دقیقه", type: "assignment" }
      ]
    },
    {
      id: 3,
      title: "فصل سوم: معادلات",
      duration: "15 ساعت",
      lessons: [
        { id: 8, title: "معادلات درجه اول", duration: "18 دقیقه", type: "video" },
        { id: 9, title: "معادلات درجه دوم", duration: "35 دقیقه", type: "video" },
        { id: 10, title: "حل مسائل کاربردی", duration: "28 دقیقه", type: "video" }
      ]
    }
  ],
  reviews: [
    {
      id: 1,
      user: "علی احمدی",
      avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg",
      rating: 5,
      date: "2 هفته پیش",
      comment: "دوره فوق‌العاده‌ای بود. استاد بسیار خوب توضیح می‌دهد و مثال‌های کاربردی زیادی دارد."
    },
    {
      id: 2,
      user: "مریم رضایی",
      avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg",
      rating: 4,
      date: "1 ماه پیش",
      comment: "خیلی مفید بود. فقط کاش تمرین‌های بیشتری داشت."
    }
  ],
  lastUpdated: "آذر 1403",
  language: "فارسی",
  certificate: true,
  lifetime: true,
  mobile: true
};

export default function CoursePage({ courseId, onBack }: CoursePageProps) {
  const [course] = useState<Course>(mockCourse);
  const [activeTab, setActiveTab] = useState<'overview' | 'curriculum' | 'reviews'>('overview');
  const [expandedChapters, setExpandedChapters] = useState<number[]>([1]);
  const [isLiked, setIsLiked] = useState(false);

  const toggleChapter = (chapterId: number) => {
    setExpandedChapters(prev => 
      prev.includes(chapterId) 
        ? prev.filter(id => id !== chapterId)
        : [...prev, chapterId]
    );
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <button
              onClick={onBack}
              className="flex items-center text-gray-600 hover:text-blue-600 transition-colors ml-4"
            >
              <ArrowLeft className="w-5 h-5 ml-2" />
              بازگشت
            </button>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center ml-3">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">آکادمی آنلاین</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Course Header */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                      {course.category}
                    </span>
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                      {course.level}
                    </span>
                  </div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-4">{course.title}</h1>
                  <p className="text-gray-600 text-lg leading-relaxed mb-6">{course.description}</p>
                  
                  {/* Stats */}
                  <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600">
                    <div className="flex items-center">
                      <div className="flex items-center ml-2">
                        {renderStars(course.rating)}
                      </div>
                      <span className="font-medium">{course.rating}</span>
                      <span className="mr-1">({course.reviewCount.toLocaleString()} نظر)</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 ml-1" />
                      <span>{course.students.toLocaleString()} دانش‌آموز</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 ml-1" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 ml-1" />
                      <span>آخرین بروزرسانی: {course.lastUpdated}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setIsLiked(!isLiked)}
                    className={`p-3 rounded-full border-2 transition-all ${
                      isLiked 
                        ? 'border-red-500 bg-red-50 text-red-500' 
                        : 'border-gray-200 hover:border-red-300 text-gray-400 hover:text-red-400'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                  </button>
                  <button className="p-3 rounded-full border-2 border-gray-200 hover:border-blue-300 text-gray-400 hover:text-blue-500 transition-all">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Video Preview */}
              <div className="relative aspect-video bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl overflow-hidden group cursor-pointer">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <div className="w-20 h-20 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play className="w-8 h-8 text-blue-600 mr-1" />
                  </div>
                </div>
                <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                  پیش‌نمایش رایگان
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-white/20 overflow-hidden">
              <div className="flex border-b border-gray-200">
                {[
                  { key: 'overview', label: 'درباره دوره', icon: BookOpen },
                  { key: 'curriculum', label: 'سرفصل‌ها', icon: PlayCircle },
                  { key: 'reviews', label: 'نظرات', icon: MessageCircle }
                ].map(({ key, label, icon: Icon }) => (
                  <button
                    key={key}
                    onClick={() => setActiveTab(key as any)}
                    className={`flex-1 flex items-center justify-center px-6 py-4 font-medium transition-colors ${
                      activeTab === key
                        ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/50'
                        : 'text-gray-600 hover:text-blue-600'
                    }`}
                  >
                    <Icon className="w-5 h-5 ml-2" />
                    {label}
                  </button>
                ))}
              </div>

              <div className="p-8">
                {/* Overview Tab */}
                {activeTab === 'overview' && (
                  <div className="space-y-8">
                    {/* What You'll Learn */}
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                        <Target className="w-6 h-6 text-blue-600 ml-2" />
                        چه چیزی یاد خواهید گرفت
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {course.whatYouLearn.map((item, index) => (
                          <div key={index} className="flex items-start">
                            <CheckCircle className="w-5 h-5 text-green-500 ml-3 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Requirements */}
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">پیش‌نیازها</h3>
                      <ul className="space-y-2">
                        {course.requirements.map((req, index) => (
                          <li key={index} className="flex items-start">
                            <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 ml-3 flex-shrink-0"></div>
                            <span className="text-gray-700">{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Instructor */}
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">مدرس دوره</h3>
                      <div className="flex items-start space-x-4">
                        <img
                          src={course.instructorImage}
                          alt={course.instructor}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-900 mb-1">{course.instructor}</h4>
                          <p className="text-gray-600">{course.instructorBio}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Curriculum Tab */}
                {activeTab === 'curriculum' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-bold text-gray-900">سرفصل دوره</h3>
                      <div className="text-sm text-gray-600">
                        {course.chapters.length} فصل • {course.duration}
                      </div>
                    </div>
                    
                    {course.chapters.map((chapter) => (
                      <div key={chapter.id} className="border border-gray-200 rounded-lg overflow-hidden">
                        <button
                          onClick={() => toggleChapter(chapter.id)}
                          className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
                        >
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center ml-3">
                              <span className="text-blue-600 font-bold text-sm">{chapter.id}</span>
                            </div>
                            <div className="text-right">
                              <h4 className="font-medium text-gray-900">{chapter.title}</h4>
                              <p className="text-sm text-gray-600">{chapter.lessons.length} درس • {chapter.duration}</p>
                            </div>
                          </div>
                          {expandedChapters.includes(chapter.id) ? (
                            <ChevronUp className="w-5 h-5 text-gray-400" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-gray-400" />
                          )}
                        </button>
                        
                        {expandedChapters.includes(chapter.id) && (
                          <div className="border-t border-gray-200">
                            {chapter.lessons.map((lesson) => (
                              <div key={lesson.id} className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                                <div className="flex items-center">
                                  <div className="w-6 h-6 ml-3">
                                    {lesson.type === 'video' && <PlayCircle className="w-6 h-6 text-blue-600" />}
                                    {lesson.type === 'quiz' && <CheckCircle className="w-6 h-6 text-green-600" />}
                                    {lesson.type === 'assignment' && <FileText className="w-6 h-6 text-purple-600" />}
                                  </div>
                                  <div>
                                    <h5 className="font-medium text-gray-900">{lesson.title}</h5>
                                    {lesson.preview && (
                                      <span className="text-xs text-blue-600 font-medium">پیش‌نمایش رایگان</span>
                                    )}
                                  </div>
                                </div>
                                <span className="text-sm text-gray-600">{lesson.duration}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Reviews Tab */}
                {activeTab === 'reviews' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold text-gray-900">نظرات دانش‌آموزان</h3>
                      <div className="flex items-center">
                        <div className="flex items-center ml-2">
                          {renderStars(course.rating)}
                        </div>
                        <span className="font-bold text-lg">{course.rating}</span>
                        <span className="text-gray-600 mr-2">از {course.reviewCount.toLocaleString()} نظر</span>
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      {course.reviews.map((review) => (
                        <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                          <div className="flex items-start space-x-4">
                            <img
                              src={review.avatar}
                              alt={review.user}
                              className="w-12 h-12 rounded-full object-cover"
                            />
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="font-medium text-gray-900">{review.user}</h4>
                                <span className="text-sm text-gray-500">{review.date}</span>
                              </div>
                              <div className="flex items-center mb-2">
                                {renderStars(review.rating)}
                              </div>
                              <p className="text-gray-700">{review.comment}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Purchase Card */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 sticky top-24">
              <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl mb-6 overflow-hidden">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="text-center mb-6">
                <div className="flex items-center justify-center mb-2">
                  <span className="text-3xl font-bold text-gray-900">{course.price.toLocaleString()}</span>
                  <span className="text-lg text-gray-900 mr-2">تومان</span>
                  {course.originalPrice && (
                    <span className="text-lg text-gray-500 line-through mr-3">{course.originalPrice.toLocaleString()}</span>
                  )}
                </div>
                {course.originalPrice && (
                  <div className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium inline-block">
                    {Math.round((1 - parseInt(course.price.replace(',', '')) / parseInt(course.originalPrice.replace(',', ''))) * 100)}% تخفیف
                  </div>
                )}
              </div>

              <div className="space-y-3 mb-6">
                <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-bold text-lg shadow-lg hover:shadow-xl">
                  خرید دوره
                </button>
                <button className="w-full border-2 border-blue-600 text-blue-600 py-3 px-6 rounded-xl hover:bg-blue-50 transition-colors font-medium">
                  افزودن به سبد خرید
                </button>
              </div>

              <div className="text-center text-sm text-gray-600 mb-6">
                ضمانت بازگشت وجه تا 30 روز
              </div>

              {/* Course Features */}
              <div className="space-y-3 border-t border-gray-200 pt-6">
                <h4 className="font-bold text-gray-900 mb-4">این دوره شامل:</h4>
                
                <div className="flex items-center">
                  <Clock className="w-5 h-5 text-gray-400 ml-3" />
                  <span className="text-gray-700">{course.duration} ویدیو</span>
                </div>
                
                {course.mobile && (
                  <div className="flex items-center">
                    <Smartphone className="w-5 h-5 text-gray-400 ml-3" />
                    <span className="text-gray-700">دسترسی از موبایل و تبلت</span>
                  </div>
                )}
                
                {course.lifetime && (
                  <div className="flex items-center">
                    <TrendingUp className="w-5 h-5 text-gray-400 ml-3" />
                    <span className="text-gray-700">دسترسی مادام‌العمر</span>
                  </div>
                )}
                
                {course.certificate && (
                  <div className="flex items-center">
                    <Award className="w-5 h-5 text-gray-400 ml-3" />
                    <span className="text-gray-700">مدرک تکمیل دوره</span>
                  </div>
                )}
                
                <div className="flex items-center">
                  <Download className="w-5 h-5 text-gray-400 ml-3" />
                  <span className="text-gray-700">فایل‌های قابل دانلود</span>
                </div>
                
                <div className="flex items-center">
                  <Globe className="w-5 h-5 text-gray-400 ml-3" />
                  <span className="text-gray-700">زبان: {course.language}</span>
                </div>
              </div>
            </div>

            {/* Related Courses */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h4 className="font-bold text-gray-900 mb-4">دوره‌های مرتبط</h4>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                    <img
                      src={`https://images.pexels.com/photos/${2280549 + i}/pexels-photo-${2280549 + i}.jpeg`}
                      alt="دوره مرتبط"
                      className="w-16 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h5 className="font-medium text-gray-900 text-sm mb-1">ریاضی یازدهم پیشرفته</h5>
                      <div className="flex items-center text-xs text-gray-600">
                        <Star className="w-3 h-3 text-yellow-400 ml-1" />
                        <span>4.7</span>
                        <span className="mr-2">250,000 تومان</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}