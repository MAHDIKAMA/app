import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { User, Mail, Lock, Calendar, GraduationCap, Phone, MapPin, Loader2 } from 'lucide-react';

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
  fullName: string;
  dateOfBirth: string;
  educationLevel: string;
  interests: string[];
  phone: string;
  city: string;
}

const educationLevels = [
  'دیپلم',
  'کاردانی',
  'کارشناسی',
  'کارشناسی ارشد',
  'دکتری',
  'سایر'
];

const interestOptions = [
  'ریاضی',
  'فیزیک',
  'شیمی',
  'زیست‌شناسی',
  'تاریخ',
  'جغرافیا',
  'زبان انگلیسی',
  'ادبیات فارسی',
  'علوم کامپیوتر',
  'هنر',
  'موسیقی',
  'ورزش'
];

interface RegistrationFormProps {
  onSwitchToLogin: () => void;
  onBackToHome: () => void;
}

export default function RegistrationForm({ onSwitchToLogin, onBackToHome }: RegistrationFormProps) {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    dateOfBirth: '',
    educationLevel: '',
    interests: [],
    phone: '',
    city: ''
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [success, setSuccess] = useState(false);

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.email) {
      newErrors.email = 'ایمیل الزامی است';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'فرمت ایمیل صحیح نیست';
    }
    
    if (!formData.password) {
      newErrors.password = 'رمز عبور الزامی است';
    } else if (formData.password.length < 6) {
      newErrors.password = 'رمز عبور باید حداقل ۶ کاراکتر باشد';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'رمز عبور و تکرار آن یکسان نیست';
    }
    
    if (!formData.fullName) {
      newErrors.fullName = 'نام کامل الزامی است';
    }
    
    return newErrors;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleInterestChange = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleNextStep = () => {
    const stepErrors = validateStep1();
    setErrors(stepErrors);
    
    if (Object.keys(stepErrors).length === 0) {
      setStep(2);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      // Sign up user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });

      if (authError) {
        throw authError;
      }

      if (authData.user && authData.session) {
        // Create user profile
        const { error: profileError } = await supabase
          .from('user_profiles')
          .insert({
            id: authData.user.id,
            full_name: formData.fullName,
            date_of_birth: formData.dateOfBirth || null,
            education_level: formData.educationLevel || null,
            interests: formData.interests.length > 0 ? formData.interests : null,
            phone: formData.phone || null,
            city: formData.city || null,
          });

        if (profileError) {
          console.error('Profile creation error:', profileError);
        }

        // Redirect to main app
        window.location.href = '/dashboard';
      } else {
        setSuccess(true);
      }
    } catch (error: any) {
      setErrors({ submit: error.message || 'خطایی در ثبت نام رخ داده است' });
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <User className="w-10 h-10 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">ثبت نام موفقیت‌آمیز!</h2>
        <p className="text-gray-600 mb-6">حساب کاربری شما با موفقیت ایجاد شد. در حال انتقال...</p>
        <button
          onClick={() => window.location.href = '/dashboard'}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          ادامه
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Progress bar */}
      <div className="text-center mb-4">
        <button
          type="button"
          onClick={onBackToHome}
          className="text-blue-600 hover:text-blue-700 text-sm"
        >
          ← بازگشت به صفحه اصلی
        </button>
      </div>
      
      <div className="flex items-center justify-center mb-8">
        <div className="flex items-center space-x-4">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
            step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
          }`}>
            1
          </div>
          <div className={`w-16 h-1 ${step >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
            step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
          }`}>
            2
          </div>
        </div>
      </div>

      {step === 1 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">اطلاعات اساسی</h2>
          
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">ایمیل</label>
            <div className="relative">
              <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full pr-12 pl-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="your@email.com"
              />
            </div>
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">نام کامل</label>
            <div className="relative">
              <User className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className={`w-full pr-12 pl-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                  errors.fullName ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="نام و نام خانوادگی"
              />
            </div>
            {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">رمز عبور</label>
            <div className="relative">
              <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={`w-full pr-12 pl-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="حداقل ۶ کاراکتر"
              />
            </div>
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">تکرار رمز عبور</label>
            <div className="relative">
              <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className={`w-full pr-12 pl-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                  errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="تکرار رمز عبور"
              />
            </div>
            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
          </div>

          <button
            type="button"
            onClick={handleNextStep}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 transition-colors font-medium"
          >
            ادامه
          </button>
        </div>
      )}

      {step === 2 && (
        <>
          <div className="space-y-6">
          <div className="flex items-center justify-between mb-8">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              ← بازگشت
            </button>
            <h2 className="text-2xl font-bold text-gray-900">اطلاعات تکمیلی</h2>
            <div></div>
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">تاریخ تولد (اختیاری)</label>
            <div className="relative">
              <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                className="w-full pr-12 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              />
            </div>
          </div>

          {/* Education Level */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">سطح تحصیلات (اختیاری)</label>
            <div className="relative">
              <GraduationCap className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                name="educationLevel"
                value={formData.educationLevel}
                onChange={handleInputChange}
                className="w-full pr-12 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              >
                <option value="">انتخاب کنید</option>
                {educationLevels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">شماره تماس (اختیاری)</label>
            <div className="relative">
              <Phone className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full pr-12 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="09123456789"
              />
            </div>
          </div>

          {/* City */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">شهر (اختیاری)</label>
            <div className="relative">
              <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className="w-full pr-12 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="نام شهر"
              />
            </div>
          </div>

          {/* Interests */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">علایق (اختیاری)</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {interestOptions.map(interest => (
                <button
                  key={interest}
                  type="button"
                  onClick={() => handleInterestChange(interest)}
                  className={`p-3 rounded-lg border-2 transition-colors text-sm font-medium ${
                    formData.interests.includes(interest)
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 bg-white text-gray-700 hover:border-blue-300'
                  }`}
                >
                  {interest}
                </button>
              ))}
            </div>
          </div>

          {errors.submit && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 text-sm">{errors.submit}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-purple-700 focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin ml-2" />
                در حال ثبت نام...
              </>
            ) : (
              'ثبت نام'
            )}
          </button>
        </div>
          
          <div className="text-center mt-6">
            <button
              type="button"
              onClick={onSwitchToLogin}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              قبلاً حساب کاربری دارید؟ وارد شوید
            </button>
          </div>
        </>
      )}
    </form>
  );
}