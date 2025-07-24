import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { UserProfile } from '../lib/supabase';
import { User, LogOut, BookOpen, Award, Clock, TrendingUp } from 'lucide-react';

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        setUser(session.user);
        
        // Get user profile
        const { data: profileData } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
        
        setProfile(profileData);
      } else {
        window.location.href = '/';
      }
      
      setLoading(false);
    };

    getUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">در حال بارگذاری...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/70 backdrop-blur-sm border-b border-white/20 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center ml-3">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">پلتفرم آموزشی</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <User className="w-5 h-5 text-gray-400 ml-2" />
                <span className="text-gray-700 font-medium">{profile?.full_name}</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center text-gray-600 hover:text-red-600 transition-colors"
              >
                <LogOut className="w-5 h-5 ml-1" />
                خروج
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-2xl p-8 text-white mb-8">
          <h2 className="text-3xl font-bold mb-2">سلام {profile?.full_name}! 👋</h2>
          <p className="text-blue-100 text-lg">به پلتفرم آموزشی خوش آمدید. آماده یادگیری هستید؟</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center ml-4">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">۱۲</h3>
                <p className="text-gray-600">دوره‌های در حال مطالعه</p>
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center ml-4">
                <Award className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">۵</h3>
                <p className="text-gray-600">مدرک کسب شده</p>
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center ml-4">
                <Clock className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">۴۸</h3>
                <p className="text-gray-600">ساعت مطالعه</p>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Info */}
        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-white/20 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">اطلاعات پروفایل</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">ایمیل</p>
              <p className="font-medium text-gray-900">{user?.email}</p>
            </div>
            {profile?.phone && (
              <div>
                <p className="text-sm text-gray-600">شماره تماس</p>
                <p className="font-medium text-gray-900">{profile.phone}</p>
              </div>
            )}
            {profile?.city && (
              <div>
                <p className="text-sm text-gray-600">شهر</p>
                <p className="font-medium text-gray-900">{profile.city}</p>
              </div>
            )}
            {profile?.education_level && (
              <div>
                <p className="text-sm text-gray-600">سطح تحصیلات</p>
                <p className="font-medium text-gray-900">{profile.education_level}</p>
              </div>
            )}
          </div>
          
          {profile?.interests && profile.interests.length > 0 && (
            <div className="mt-4">
              <p className="text-sm text-gray-600 mb-2">علایق</p>
              <div className="flex flex-wrap gap-2">
                {profile.interests.map((interest, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Recent Activity */}
        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <h3 className="text-xl font-bold text-gray-900 mb-4">فعالیت‌های اخیر</h3>
          <div className="space-y-4">
            <div className="flex items-center p-4 bg-blue-50 rounded-lg">
              <TrendingUp className="w-5 h-5 text-blue-600 ml-3" />
              <div>
                <p className="font-medium text-gray-900">دوره ریاضی پیشرفته</p>
                <p className="text-sm text-gray-600">آخرین بازدید: ۲ ساعت پیش</p>
              </div>
            </div>
            <div className="flex items-center p-4 bg-green-50 rounded-lg">
              <Award className="w-5 h-5 text-green-600 ml-3" />
              <div>
                <p className="font-medium text-gray-900">مدرک برنامه‌نویسی پایتون</p>
                <p className="text-sm text-gray-600">دریافت شده: ۱ روز پیش</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}