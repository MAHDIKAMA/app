import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Mail, Lock, Loader2, Eye, EyeOff } from 'lucide-react';

interface LoginFormProps {
  onSwitchToRegister: () => void;
  onBackToHome: () => void;
}

export default function LoginForm({ onSwitchToRegister, onBackToHome }: LoginFormProps) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        throw error;
      }

      if (data.session) {
        // Redirect to dashboard
        window.location.href = '/dashboard';
      }
    } catch (error: any) {
      if (error.message.includes('Invalid login credentials')) {
        setErrors({ submit: 'ایمیل یا رمز عبور اشتباه است' });
      } else {
        setErrors({ submit: error.message || 'خطایی در ورود رخ داده است' });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <button
          onClick={onBackToHome}
          className="text-blue-600 hover:text-blue-700 mb-4 text-sm"
        >
          ← بازگشت به صفحه اصلی
        </button>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">خوش آمدید</h1>
        <p className="text-gray-600">به حساب کاربری خود وارد شوید</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
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
              className="w-full pr-12 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              placeholder="your@email.com"
              required
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">رمز عبور</label>
          <div className="relative">
            <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full pr-12 pl-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              placeholder="رمز عبور خود را وارد کنید"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
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
              در حال ورود...
            </>
          ) : (
            'ورود'
          )}
        </button>
      </form>

      <div className="text-center">
        <button
          onClick={onSwitchToRegister}
          className="text-blue-600 hover:text-blue-700 font-medium"
        >
          حساب کاربری ندارید؟ ثبت نام کنید
        </button>
      </div>
    </div>
  );
}