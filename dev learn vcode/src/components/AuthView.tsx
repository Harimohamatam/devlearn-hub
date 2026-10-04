import React, { useState } from "react";
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  UserPlus,
  LogIn,
  User,
  ArrowLeft,
} from "lucide-react";
import { supabase } from "../lib/supabase";

interface AuthViewProps {
  onLoginSuccess: () => void;
}

const AuthView: React.FC<AuthViewProps> = ({ onLoginSuccess }) => {
  const [isSignup, setIsSignup] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setMessage("");

    if (!email.trim()) {
      setMessage("Please enter your email.");
      return;
    }

    if (isForgotPassword) {
      setLoading(true);

      try {
        const { error } =
          await supabase.auth.resetPasswordForEmail(
            email.trim(),
            {
              redirectTo: `${window.location.origin}/update-password`,
            }
          );

        if (error) {
          throw error;
        }

        setMessage(
          "Password reset link sent! Check your email. 📧"
        );
      } catch (error) {
        if (error instanceof Error) {
          setMessage(error.message);
        } else {
          setMessage(
            "Could not send the reset email. Please try again."
          );
        }
      } finally {
        setLoading(false);
      }

      return;
    }

    if (!password.trim()) {
      setMessage("Please enter your password.");
      return;
    }

    if (isSignup && !username.trim()) {
      setMessage("Please enter a username.");
      return;
    }

    setLoading(true);

    try {
      if (isSignup) {
        const { data, error } =
          await supabase.auth.signUp({
            email: email.trim(),
            password,
            options: {
              data: {
                username: username.trim(),
              },
            },
          });

        if (error) {
          throw error;
        }

        if (data.session) {
          onLoginSuccess();
        } else {
          setMessage(
            "Account created! Please check your email to confirm your account. 📧"
          );
        }
      } else {
        const { error } =
          await supabase.auth.signInWithPassword({
            email: email.trim(),
            password,
          });

        if (error) {
          throw error;
        }

        onLoginSuccess();
      }
    } catch (error) {
      if (error instanceof Error) {
        setMessage(error.message);
      } else {
        setMessage(
          "Something went wrong. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const switchToLogin = () => {
    setIsSignup(false);
    setIsForgotPassword(false);
    setMessage("");
  };

  const switchToSignup = () => {
    setIsSignup(true);
    setIsForgotPassword(false);
    setMessage("");
  };

  const switchToForgotPassword = () => {
    setIsForgotPassword(true);
    setIsSignup(false);
    setMessage("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-950 flex items-center justify-center px-4 py-8">

      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">

          <div className="mx-auto w-16 h-16 rounded-2xl bg-amber-400 flex items-center justify-center shadow-lg mb-4">

            {isForgotPassword ? (
              <Lock className="w-8 h-8 text-slate-950" />
            ) : isSignup ? (
              <UserPlus className="w-8 h-8 text-slate-950" />
            ) : (
              <LogIn className="w-8 h-8 text-slate-950" />
            )}

          </div>

          <h1 className="text-3xl font-black text-white">
            DevLearn
          </h1>

          <p className="text-indigo-200 mt-2">
            {isForgotPassword
              ? "Recover your DevLearn account 🔑"
              : isSignup
              ? "Create your account and start learning 🚀"
              : "Welcome back, developer 👋"}
          </p>

        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8">

          <div className="text-center mb-6">

            <h2 className="text-2xl font-bold text-slate-900">

              {isForgotPassword
                ? "Reset Password"
                : isSignup
                ? "Create Account"
                : "Welcome Back"}

            </h2>

            <p className="text-sm text-slate-500 mt-1">

              {isForgotPassword
                ? "Enter your email and we'll send you a reset link."
                : isSignup
                ? "Create your DevLearn account."
                : "Sign in to continue learning."}

            </p>

          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* Username - Signup only */}
            {isSignup && !isForgotPassword && (
              <div>

                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Username
                </label>

                <div className="relative">

                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />

                  <input
                    type="text"
                    value={username}
                    onChange={(e) =>
                      setUsername(e.target.value)
                    }
                    placeholder="Enter your username"
                    autoComplete="username"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                    disabled={loading}
                  />

                </div>

              </div>
            )}

            {/* Email */}
            <div>

              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Email
              </label>

              <div className="relative">

                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />

                <input
                  type="email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  placeholder="Enter your email"
                  autoComplete="email"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                  disabled={loading}
                />

              </div>

            </div>

            {/* Password */}
            {!isForgotPassword && (
              <div>

                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Password
                </label>

                <div className="relative">

                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />

                  <input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    value={password}
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }
                    placeholder="Enter your password"
                    autoComplete={
                      isSignup
                        ? "new-password"
                        : "current-password"
                    }
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-12 text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                    disabled={loading}
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>

                </div>

              </div>
            )}

            {/* Forgot Password */}
            {!isSignup && !isForgotPassword && (
              <div className="text-right">

                <button
                  type="button"
                  onClick={switchToForgotPassword}
                  className="text-sm font-bold text-indigo-600 hover:text-indigo-800 hover:underline"
                >
                  Forgot password?
                </button>

              </div>
            )}

            {/* Message */}
            {message && (
              <div className="rounded-xl bg-indigo-50 border border-indigo-100 px-4 py-3 text-sm text-indigo-700">
                {message}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-indigo-600 py-3.5 font-bold text-white shadow-lg transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
            >

              {loading
                ? "Please wait..."
                : isForgotPassword
                ? "Send Reset Link"
                : isSignup
                ? "Create Account"
                : "Login"}

            </button>

          </form>

          {/* Bottom navigation */}
          <div className="text-center mt-6">

            {isForgotPassword ? (

              <button
                type="button"
                onClick={switchToLogin}
                className="inline-flex items-center gap-2 font-bold text-indigo-600 hover:text-indigo-800"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Login
              </button>

            ) : (

              <>
                <p className="text-sm text-slate-500">

                  {isSignup
                    ? "Already have an account?"
                    : "Don't have an account?"}

                </p>

                <button
                  type="button"
                  onClick={
                    isSignup
                      ? switchToLogin
                      : switchToSignup
                  }
                  className="mt-1 font-bold text-indigo-600 hover:text-indigo-800"
                >
                  {isSignup
                    ? "Login here"
                    : "Create an account"}
                </button>
              </>

            )}

          </div>

        </div>

        {/* Creator credit */}
        <p className="text-center text-xs text-indigo-200 mt-6">
          Designed &amp; Developed by{" "}
          <span className="font-black text-amber-300">
            Hari Charan Mohamatam
          </span>

        </p>

      </div>

    </div>
  );
};

export default AuthView;
