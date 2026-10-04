import React, { useState } from 'react';
import {
  Lock,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { supabase } from '../lib/supabase';

interface UpdatePasswordViewProps {
  onComplete: () => void;
}

export const UpdatePasswordView: React.FC<UpdatePasswordViewProps> = ({
  onComplete
}) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const handleUpdatePassword = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setMessage('');
    setSuccess(false);

    if (!password) {
      setMessage('Please enter a new password.');
      return;
    }

    if (password.length < 6) {
      setMessage('Password should be at least 6 characters.');
      return;
    }

    if (password !== confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.auth.updateUser({
        password
      });

      if (error) {
        throw error;
      }

      setSuccess(true);
      setMessage('Password updated successfully!');

      setPassword('');
      setConfirmPassword('');

      setTimeout(() => {
        onComplete();
      }, 1500);
    } catch (error) {
      console.error('Password update error:', error);

      if (error instanceof Error) {
        setMessage(error.message);
      } else {
        setMessage(
          'Could not update your password. Please try again.'
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-950 flex items-center justify-center px-4 py-8">

      <div className="w-full max-w-md">

        {/* Header */}
        <div className="text-center mb-8">

          <div className="mx-auto w-16 h-16 rounded-2xl bg-amber-400 flex items-center justify-center shadow-lg mb-4">
            <Lock className="w-8 h-8 text-slate-950" />
          </div>

          <h1 className="text-3xl font-black text-white">
            DevLearn
          </h1>

          <p className="text-indigo-200 mt-2">
            Create a new password 🔐
          </p>

        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8">

          <div className="text-center mb-6">

            <h2 className="text-2xl font-bold text-slate-900">
              Update Password
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Choose a new password for your DevLearn account.
            </p>

          </div>

          <form
            onSubmit={handleUpdatePassword}
            className="space-y-5"
          >

            {/* New Password */}
            <div>

              <label className="block text-sm font-semibold text-slate-700 mb-2">
                New Password
              </label>

              <div className="relative">

                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />

                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter new password"
                  autoComplete="new-password"
                  disabled={loading}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-12 text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>

              </div>

            </div>

            {/* Confirm Password */}
            <div>

              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Confirm New Password
              </label>

              <div className="relative">

                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />

                <input
                  type={
                    showConfirmPassword
                      ? 'text'
                      : 'password'
                  }
                  value={confirmPassword}
                  onChange={(e) =>
                    setConfirmPassword(e.target.value)
                  }
                  placeholder="Confirm new password"
                  autoComplete="new-password"
                  disabled={loading}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-12 text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(
                      !showConfirmPassword
                    )
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>

              </div>

            </div>

            {/* Message */}
            {message && (
              <div
                className={`rounded-xl px-4 py-3 text-sm flex items-start gap-2 ${
                  success
                    ? 'bg-emerald-50 border border-emerald-100 text-emerald-700'
                    : 'bg-rose-50 border border-rose-100 text-rose-700'
                }`}
              >
                {success ? (
                  <CheckCircle2 className="w-5 h-5 shrink-0" />
                ) : (
                  <AlertCircle className="w-5 h-5 shrink-0" />
                )}

                <span>{message}</span>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading || success}
              className="w-full rounded-xl bg-indigo-600 py-3.5 font-bold text-white shadow-lg transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? 'Updating...'
                : success
                ? 'Password Updated'
                : 'Update Password'}
            </button>

          </form>

          {/* Creator Credit */}
          <p className="text-center text-xs text-slate-400 mt-6">
            Designed &amp; Developed by{' '}
            <span className="font-black text-indigo-600">
              Hari Charan Mohamatam
            </span>
          </p>

        </div>

      </div>

    </div>
  );
};

export default UpdatePasswordView;