import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import AuthLeftPanel from '../components/AuthLeftPanel';
import GoogleLoginButton from '../components/GoogleLogin';
import './auth.css';
import { registerUser } from '../api/authApi';
import toast from 'react-hot-toast';

interface SignupFormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
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

/* Compute password strength (0-4) */
const getStrength = (pw: string): number => {
  if (!pw) return 0;
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  return score;
};
const STRENGTH_LABELS = ['', 'Weak', 'Fair', 'Good', 'Strong'];
const STRENGTH_CLASSES = ['', 'active-weak', 'active-fair', 'active-good', 'active-strong'];

const SignupPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignupFormData>({
    defaultValues: { fullName: '', email: '', password: '', confirmPassword: '' },
  });

  const passwordValue = watch('password', '');
  const strength = getStrength(passwordValue);

  const onSubmit = async (data: SignupFormData) => {
    setIsLoading(true);
    try{
      await registerUser(data.fullName,data.email,data.password);
      toast.success('Registered successfully');
      navigate('/login');
    }
    catch (error:any){
      toast.error(error.response.data.message || 'Registration failed. Please try again.');
    }
    finally{
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <AuthLeftPanel />

      <div className="auth-right">
        <div className="auth-form-container">
          {/* Header */}
          <div className="auth-form-header">
            <h1 className="auth-form-title">Create your account</h1>
            <p className="auth-form-subtitle">Start managing projects for free — no credit card required.</p>
          </div>

          {/* SSO Button */}
          <div className="auth-sso-buttons">
            <GoogleLoginButton mode="signup" />
          </div>

          {/* Divider */}
          <div className="auth-divider">
            <div className="auth-divider-line" />
            <span className="auth-divider-text">or with email</span>
            <div className="auth-divider-line" />
          </div>

          {/* Form */}
          <form id="signup-form" className="auth-form" onSubmit={handleSubmit(onSubmit)} noValidate>
            {/* Full Name */}
            <div className="auth-field">
              <label className="auth-label" htmlFor="signup-name">Full name</label>
              <div className="auth-input-wrap">
                <span className="auth-input-icon">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                </span>
                <input
                  id="signup-name"
                  type="text"
                  className={`auth-input ${errors.fullName ? 'error' : ''}`}
                  placeholder="Jane Doe"
                  autoComplete="name"
                  {...register('fullName', { required: 'Full name is required', minLength: { value: 2, message: 'Name too short' } })}
                />
              </div>
              {errors.fullName && (
                <span className="auth-field-error">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="11"/><text x="12" y="17" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">!</text></svg>
                  {errors.fullName.message}
                </span>
              )}
            </div>

            {/* Email */}
            <div className="auth-field">
              <label className="auth-label" htmlFor="signup-email">Work email</label>
              <div className="auth-input-wrap">
                <span className="auth-input-icon">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </span>
                <input
                  id="signup-email"
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
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="11"/><text x="12" y="17" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">!</text></svg>
                  {errors.email.message}
                </span>
              )}
            </div>

            {/* Password */}
            <div className="auth-field">
              <label className="auth-label" htmlFor="signup-password">Password</label>
              <div className="auth-input-wrap">
                <span className="auth-input-icon">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0110 0v4"/>
                  </svg>
                </span>
                <input
                  id="signup-password"
                  type={showPassword ? 'text' : 'password'}
                  className={`auth-input ${errors.password ? 'error' : ''}`}
                  placeholder="Min. 8 characters"
                  autoComplete="new-password"
                  {...register('password', {
                    required: 'Password is required',
                    minLength: { value: 8, message: 'Minimum 8 characters' },
                  })}
                />
                <button
                  type="button"
                  className="auth-pw-toggle"
                  onClick={() => setShowPassword(p => !p)}
                  tabIndex={-1}
                >
                  <EyeIcon open={showPassword} />
                </button>
              </div>
              {errors.password && (
                <span className="auth-field-error">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="11"/><text x="12" y="17" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">!</text></svg>
                  {errors.password.message}
                </span>
              )}

              {/* Strength meter */}
              {passwordValue && (
                <div className="auth-strength">
                  <div className="auth-strength-bars">
                    {[1, 2, 3, 4].map(i => (
                      <div
                        key={i}
                        className={`auth-strength-bar ${strength >= i ? STRENGTH_CLASSES[strength] : ''}`}
                      />
                    ))}
                  </div>
                  <span className="auth-strength-label">{STRENGTH_LABELS[strength]}</span>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div className="auth-field">
              <label className="auth-label" htmlFor="signup-confirm">Confirm password</label>
              <div className="auth-input-wrap">
                <span className="auth-input-icon">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                </span>
                <input
                  id="signup-confirm"
                  type={showConfirm ? 'text' : 'password'}
                  className={`auth-input ${errors.confirmPassword ? 'error' : ''}`}
                  placeholder="Repeat password"
                  autoComplete="new-password"
                  {...register('confirmPassword', {
                    required: 'Please confirm your password',
                    validate: (val: string) => val === passwordValue || 'Passwords do not match',
                  })}
                />
                <button
                  type="button"
                  className="auth-pw-toggle"
                  onClick={() => setShowConfirm(p => !p)}
                  tabIndex={-1}
                >
                  <EyeIcon open={showConfirm} />
                </button>
              </div>
              {errors.confirmPassword && (
                <span className="auth-field-error">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="11"/><text x="12" y="17" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">!</text></svg>
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>

            {/* Submit */}
            <button
              id="signup-submit-btn"
              type="submit"
              className="auth-submit-btn"
              disabled={isLoading}
            >
              {isLoading ? (
                <><div className="auth-spinner" /> Creating account...</>
              ) : (
                <>
                  Create account
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                  </svg>
                </>
              )}
            </button>
          </form>

          {/* Switch to login */}
          <div className="auth-switch">
            Already have an account?{' '}
            <Link to="/login">Sign in</Link>
          </div>

          <p className="auth-terms">
            By creating an account you agree to our{' '}
            <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
