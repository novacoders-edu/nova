import React, { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, CheckCircle, XCircle, LogIn } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../store/userActions";
import { clearError } from "../store/authSlice";
import Button from "./ui/Button";
import InputField from "./ui/InputField";

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

const Signin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (error || successMessage) {
      const timer = setTimeout(() => {
        if (error) dispatch(clearError());
        if (successMessage) setSuccessMessage("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error, successMessage, dispatch]);

  const onSubmit = useCallback(
    async (data) => {
      dispatch(clearError());
      setSuccessMessage("");

      const result = await dispatch(
        loginUser({ email: data.email, password: data.password })
      );

      if (loginUser.fulfilled.match(result)) {
        setSuccessMessage("Login successful! Redirecting...");
        const userData = result.payload?.user || result.payload;
        const isAdmin = userData?.role === "admin";
        reset();
        setTimeout(() => {
          navigate(isAdmin ? "/admin" : "/", { replace: true });
        }, 1200);
      }
    },
    [dispatch, navigate, reset]
  );

  return (
    <motion.div
      className="min-h-screen bg-slate-950 py-10 px-4 sm:px-6 lg:px-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="mx-auto w-full max-w-6xl">
        <div className="grid overflow-hidden rounded-[32px] border border-slate-800 bg-slate-900/95 shadow-2xl shadow-cyan-500/10 backdrop-blur-xl lg:grid-cols-[1.05fr_0.95fr]">
          <div className="relative hidden overflow-hidden rounded-[32px] bg-slate-950/80 p-8 text-white lg:block">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.24),transparent_30%),radial-gradient(circle_at_40%_70%,rgba(139,92,246,0.14),transparent_25%)]" />
            <div className="relative z-10 flex h-full flex-col justify-between">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs uppercase tracking-[0.3em] text-cyan-300">
                  Admin Access
                </span>
                <h1 className="mt-8 text-4xl font-bold leading-tight tracking-tight text-white">
                  Secure, fast sign in for admins
                </h1>
                <p className="mt-4 max-w-xl text-slate-300 leading-7">
                  Access your dashboard, approve members, and review contact inquiries with a secure admin session.
                </p>
              </div>

              <div className="space-y-5">
                <div className="flex gap-3 rounded-3xl border border-white/10 bg-white/5 p-4 shadow-lg shadow-cyan-500/5">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-300">
                    <LogIn className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">Faster access</p>
                    <p className="text-sm text-slate-400">No unnecessary redirects. Login directly to your admin workspace.</p>
                  </div>
                </div>
                <div className="rounded-3xl border border-white/10 bg-white/5 p-4 shadow-lg shadow-cyan-500/5">
                  <p className="font-semibold text-white">Security-first</p>
                  <p className="mt-1 text-sm text-slate-400">Encrypted sessions, token persistence, and admin-only controls keep your data safe.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative p-6 sm:p-8 lg:p-10">
            <motion.div variants={itemVariants} className="relative z-10 mx-auto max-w-xl">
              <div className="flex items-center justify-center gap-3 rounded-3xl border border-slate-700/70 bg-slate-950/70 px-4 py-3 text-slate-200 shadow-inner shadow-slate-900/20">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-500/10 text-cyan-300">
                  <LogIn className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">Admin login</p>
                  <h2 className="text-2xl font-semibold text-white sm:text-3xl">Sign in to continue</h2>
                </div>
              </div>

              <p className="mt-5 text-sm text-slate-400 sm:text-base">
                Enter your email and password to access the admin dashboard. This form is fully responsive and optimized for both mobile and desktop.
              </p>
            </motion.div>

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  className="mt-6 rounded-3xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200 shadow-lg shadow-red-500/10"
                >
                  <div className="flex items-center gap-2">
                    <XCircle className="h-4 w-4" />
                    <span>{error}</span>
                  </div>
                </motion.div>
              )}

              {successMessage && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  className="mt-6 rounded-3xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200 shadow-lg shadow-emerald-500/10"
                >
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4" />
                    <span>{successMessage}</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.form
              onSubmit={handleSubmit(onSubmit)}
              className="mx-auto mt-8 max-w-xl space-y-5"
              variants={itemVariants}
            >
              <motion.div variants={itemVariants}>
                <InputField
                  label="Email Address"
                  type="email"
                  placeholder="hello@novacoders.com"
                  register={register}
                  name="email"
                  validation={{
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Please enter a valid email address",
                    },
                  }}
                  error={errors.email}
                  icon={Mail}
                  inputClassName="py-3 text-sm sm:text-base"
                  autoComplete="email"
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <InputField
                  label="Password"
                  type="password"
                  placeholder="Enter your password"
                  register={register}
                  name="password"
                  validation={{
                    required: "Password is required",
                    minLength: { value: 6, message: "Password must be at least 6 characters" },
                  }}
                  error={errors.password}
                  icon={Lock}
                  showPasswordToggle={true}
                  inputClassName="py-3 text-sm sm:text-base"
                  autoComplete="current-password"
                />
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-4 pt-2">
                <Button
                  type="submit"
                  variant="secondary"
                  disabled={loading}
                  className="flex w-full items-center justify-center gap-3 px-6 py-3 text-base font-semibold"
                >
                  {loading ? (
                    <>
                      <motion.span
                        className="inline-block h-4 w-4 rounded-full border-2 border-white/40 border-t-white"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                      Signing In...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </Button>

                <div className="text-center text-sm text-slate-400 sm:text-base">
                  Need help? Reach out to the admin team or try again with your registered credentials.
                </div>
              </motion.div>
            </motion.form>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Signin;
