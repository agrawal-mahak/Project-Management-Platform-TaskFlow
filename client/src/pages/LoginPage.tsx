import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import AuthLeftPanel from '../components/AuthLeftPanel';
import GoogleLoginButton from '../components/GoogleLogin';
import './auth.css';
import toast from 'react-hot-toast';
import { loginUser } from '../api/authApi';

interface LoginFormData {
  email: string;
  password: string;
  remember: boolean;
}

const EyeIcon = ({ open }: { open: boolean }) =>
  open ? (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ) : (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );

const LoginPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    defaultValues: { email: '', password: '', remember: false },
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      await loginUser(data.email, data.password);
      toast.success('Logged in successfully');
      navigate('/');
    }
    catch (error: any) {
      toast.error(error.response.data.message || 'Something went wrong');
    }
    finally {
      setIsLoading(false);
    }
  }

  const forgotPassword = () => {
    toast.error('Forgot password not implemented yet');
  }

  return (
    <div className="auth-page">
      <AuthLeftPanel />

      <div className="auth-right">
        <div className="auth-form-container">
          {/* Header */}
          <div className="auth-form-header">
            <h1 className="auth-form-title">Welcome back</h1>
            <p className="auth-form-subtitle">Sign in to your TaskFlow workspace</p>
          </div>

          {/* SSO Buttons */}
          <div className="auth-sso-buttons">
            <GoogleLoginButton mode="signin" showMicrosoft />
          </div>

          {/* Divider */}
          <div className="auth-divider">
            <div className="auth-divider-line" />
            <span className="auth-divider-text">or continue with email</span>
            <div className="auth-divider-line" />
          </div>

          {/* Form */}
          <form id="login-form" className="auth-form" onSubmit={handleSubmit(onSubmit)} noValidate>
            {/* Email */}
            <div className="auth-field">
              <label className="auth-label" htmlFor="login-email">Email address</label>
              <div className="auth-input-wrap">
                <span className="auth-input-icon">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </span>
                <input
                  id="login-email"
                  type="email"
                  className={`auth-input ${errors.email ? 'error' : ''}`}
                  placeholder="you@company.com"
                  autoComplete="email"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: { value: /\S+@\S+\.\S+/, message: 'Enter a valid email' },
                  })}
                />
              </div>
              {errors.email && (
                <span className="auth-field-error">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="11" /><text x="12" y="17" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">!</text></svg>
                  {errors.email.message}
                </span>
              )}
            </div>

            {/* Password */}
            <div className="auth-field">
              <label className="auth-label" htmlFor="login-password">Password</label>
              <div className="auth-input-wrap">
                <span className="auth-input-icon">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0110 0v4" />
                  </svg>
                </span>
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  className={`auth-input ${errors.password ? 'error' : ''}`}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  {...register('password', { required: 'Password is required' })}
                />
                <button
                  type="button"
                  className="auth-pw-toggle"
                  onClick={() => setShowPassword(p => !p)}
                  tabIndex={-1}
                  aria-label="Toggle password visibility"
                >
                  <EyeIcon open={showPassword} />
                </button>
              </div>
              {errors.password && (
                <span className="auth-field-error">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="11" /><text x="12" y="17" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">!</text></svg>
                  {errors.password.message}
                </span>
              )}
            </div>

            {/* Remember me + Forgot password */}
            <div className="auth-options-row">
              <label className="auth-remember">
                <input
                  id="login-remember"
                  type="checkbox"
                  className="auth-checkbox"
                  {...register('remember')}
                />
                Remember me
              </label>
              <Link to="" className="auth-forgot-link" onClick={() => forgotPassword()}>Forgot password?</Link>
            </div>

            {/* Submit */}
            <button
              id="login-submit-btn"
              type="submit"
              className="auth-submit-btn"
              disabled={isLoading}
            >
              {isLoading ? (
                <><div className="auth-spinner" /> Signing in...</>
              ) : (
                <>
                  Sign in
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                  </svg>
                </>
              )}
            </button>
          </form>

          {/* Switch to signup */}
          <div className="auth-switch">
            Don't have an account?{' '}
            <Link to="/signup">Create one free</Link>
          </div>

          <p className="auth-terms">
            By signing in you agree to our{' '}
            <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
