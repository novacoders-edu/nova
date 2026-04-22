import React, { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { certificateAPI } from "../api/api";
import SEO from "../components/SEO";
import { ShieldCheck, Award } from "lucide-react";

function CertificateVerify() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [verificationResult, setVerificationResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const formattedIssueDate = useMemo(
    () =>
      verificationResult?.data?.issueDate
        ? new Date(verificationResult.data.issueDate).toLocaleDateString()
        : "",
    [verificationResult?.data?.issueDate],
  );

  const verificationMessage = useMemo(
    () => verificationResult?.message || "",
    [verificationResult?.message],
  );

  const onSubmit = async (data) => {
    setLoading(true);
    setVerificationResult(null);
    try {
      const result = await certificateAPI.verifyCertificate(data.certificateId);

      if (result.success && result.data.valid) {
        setVerificationResult({
          valid: true,
          data: result.data.data,
          message: "Certificate is valid!",
        });
      } else {
        setVerificationResult({
          valid: false,
          message:
            result.data?.message || result.error?.message ||
            "Certificate is invalid or not found",
        });
      }
    } catch (error) {
      setVerificationResult({
        valid: false,
        message: "An error occurred while verifying the certificate.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white mt-16 sm:mt-20">
      <SEO 
        title="Verify Certificate"
        description="Verify your hackathon certificates instantly."
      />
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="pointer-events-none absolute left-1/2 top-0 sm:top-10 h-40 w-40 sm:h-72 sm:w-72 -translate-x-1/2 rounded-full bg-cyan-500/20 blur-3xl"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="pointer-events-none absolute -right-32 sm:-right-20 top-1/4 h-40 w-40 sm:h-60 sm:w-60 rounded-full bg-violet-500/20 blur-3xl"
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
        className="relative mx-auto flex min-h-screen items-center justify-center px-3 sm:px-4 py-6 sm:py-10"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative w-full max-w-2xl overflow-hidden rounded-[20px] sm:rounded-[32px] border border-white/10 bg-slate-900/95 p-4 sm:p-8 shadow-2xl shadow-cyan-500/10"
        >
          <div className="pointer-events-none absolute -bottom-24 left-1/3 h-72 w-72 rounded-full bg-sky-500/10 blur-3xl" />
          <div className="pointer-events-none absolute -top-16 right-8 h-48 w-48 rounded-full bg-fuchsia-500/10 blur-3xl" />

          <div className="relative z-10">
            <div className="mb-4 sm:mb-6 flex flex-col gap-3 sm:gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-3 lg:gap-4">
                <div className="relative flex h-14 w-14 sm:h-20 sm:w-20 items-center justify-center rounded-[20px] sm:rounded-[28px] bg-slate-950/95 p-3 sm:p-4 text-cyan-400 shadow-[inset_4px_4px_20px_rgba(56,189,248,0.12),12px_12px_50px_rgba(15,23,42,0.6)] ring-1 ring-white/10">
                  <div className="absolute -left-3 -top-3 h-6 w-6 rounded-full bg-cyan-400/20 blur-xl" />
                  <div className="absolute -right-3 -bottom-3 h-6 w-6 rounded-full bg-violet-500/20 blur-xl" />
                  <ShieldCheck className="relative h-9 w-9 drop-shadow-[0_25px_45px_rgba(14,116,144,0.25)]" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm uppercase tracking-[0.25em] sm:tracking-[0.35em] text-cyan-300/70">
                    Authenticity Check
                  </p>
                  <h1 className="text-2xl sm:text-4xl font-semibold text-white leading-tight">
                    Verify Certificate
                  </h1>
                </div>
              </div>
            
            </div>

            <motion.form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4 sm:space-y-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="rounded-2xl sm:rounded-3xl border border-white/10 bg-slate-950/80 p-3 sm:p-4 shadow-inner shadow-black/20">
                <label className="mb-2 sm:mb-3 block text-xs sm:text-sm font-medium text-slate-300">
                  Certificate ID
                </label>
                <input
                  {...register("certificateId", {
                    required: "Certificate ID is required",
                  })}
                  type="text"
                  placeholder="e.g. NC-HG2-2026-0001"
                  className="w-full rounded-2xl sm:rounded-3xl border border-white/10 bg-slate-900 px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-white shadow-sm outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20"
                />
                {errors.certificateId && (
                  <p className="mt-2 text-xs sm:text-sm text-rose-400">
                    {errors.certificateId.message}
                  </p>
                )}
              </div>

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex w-full items-center justify-center gap-2 sm:gap-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-semibold text-slate-950 shadow-xl shadow-cyan-500/20 transition disabled:cursor-not-allowed disabled:opacity-70"
              >
                  <span className="relative inline-flex h-8 sm:h-10 w-8 sm:w-10 items-center justify-center rounded-full bg-white/90 text-cyan-700 shadow-[0_15px_30px_rgba(6,182,212,0.25)]">
                      <Award className="h-4 sm:h-5 w-4 sm:w-5" />
                  </span>
                {loading ? "Verifying..." : "Check Certificate"}
              </motion.button>
            </motion.form>

            {verificationResult && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className={`mt-6 sm:mt-8 overflow-hidden rounded-[20px] sm:rounded-[32px] border border-white/10 bg-slate-950/95 p-4 sm:p-6 shadow-[0_30px_100px_rgba(15,23,42,0.35)] ${
                  verificationResult.valid
                    ? "shadow-emerald-500/20"
                    : "shadow-rose-500/20"
                }`}
              >
                <div className="mb-4 sm:mb-5 flex flex-col gap-3 sm:gap-4">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
                      <motion.div
                        initial={{ rotate: -12, y: 0 }}
                        animate={{ rotate: [ -12, 10, -12 ], y: [0, -8, 0] }}
                        transition={{ repeat: Infinity, duration: 2.8, ease: "easeInOut" }}
                        className={`relative flex h-12 sm:h-16 w-12 sm:w-16 items-center justify-center rounded-[20px] sm:rounded-[28px] border border-white/10 ${
                          verificationResult.valid
                            ? "bg-emerald-500/10"
                            : "bg-rose-500/10"
                        } shadow-[0_20px_60px_rgba(8,145,178,0.18)]`}
                      >
                        <div className="absolute inset-0 rounded-full bg-cyan-400/10 blur-2xl" />
                        <div className="absolute -left-2 -top-2 h-5 w-5 rounded-full bg-white/10 blur-xl" />
                        <div className="absolute -right-2 -bottom-2 h-5 w-5 rounded-full bg-white/10 blur-xl" />
                          <Award className="relative h-6 sm:h-8 w-6 sm:w-8 text-cyan-300 drop-shadow-[0_10px_25px_rgba(56,189,248,0.35)]" />
                      </motion.div>
                      <div>
                        <p className={`text-lg sm:text-xl font-semibold ${verificationResult.valid ? "text-emerald-200" : "text-rose-200"}`}>
                          {verificationResult.message}
                        </p>
                        <p className="text-xs sm:text-sm text-slate-400">
                          {verificationResult.valid
                            ? "Certificate identity confirmed with secure verification."
                            : "No matching certificate was found for this ID."}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                {verificationResult.valid && verificationResult.data && (
                  <div className="grid gap-3 sm:gap-4 rounded-[20px] sm:rounded-[28px] border border-white/10 bg-slate-950/90 p-3 sm:p-5 shadow-[inset_0_0_0_1px_rgba(148,163,184,0.06)]">
                    <div className="grid gap-2 sm:gap-3 grid-cols-1 sm:grid-cols-2">
                      <div className="rounded-2xl sm:rounded-3xl bg-slate-900/80 p-3 sm:p-4 shadow-sm shadow-black/20">
                        <p className="text-xs uppercase tracking-[0.18em] sm:tracking-[0.22em] text-slate-400">Name</p>
                        <p className="mt-1 sm:mt-2 text-sm sm:text-base font-semibold text-white break-words">{verificationResult.data.name}</p>
                      </div>
                      <div className="rounded-2xl sm:rounded-3xl bg-slate-900/80 p-3 sm:p-4 shadow-sm shadow-black/20">
                        <p className="text-xs uppercase tracking-[0.18em] sm:tracking-[0.22em] text-slate-400">College</p>
                        <p className="mt-1 sm:mt-2 text-sm sm:text-base font-semibold text-white break-words">{verificationResult.data.college}</p>
                      </div>
                    </div>
                    <div className="grid gap-2 sm:gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                      <div className="rounded-2xl sm:rounded-3xl bg-slate-900/80 p-3 sm:p-4 shadow-sm shadow-black/20">
                        <p className="text-xs uppercase tracking-[0.18em] sm:tracking-[0.22em] text-slate-400">Event</p>
                        <p className="mt-1 sm:mt-2 text-xs sm:text-sm font-semibold text-white break-words">{verificationResult.data.eventName}</p>
                      </div>
                      <div className="rounded-2xl sm:rounded-3xl bg-slate-900/80 p-3 sm:p-4 shadow-sm shadow-black/20">
                        <p className="text-xs uppercase tracking-[0.18em] sm:tracking-[0.22em] text-slate-400">Role</p>
                        <p className="mt-1 sm:mt-2 text-xs sm:text-sm font-semibold text-white break-words">{verificationResult.data.role}</p>
                      </div>
                      <div className="rounded-2xl sm:rounded-3xl bg-slate-900/80 p-3 sm:p-4 shadow-sm shadow-black/20">
                        <p className="text-xs uppercase tracking-[0.18em] sm:tracking-[0.22em] text-slate-400">Issued By</p>
                        <p className="mt-1 sm:mt-2 text-xs sm:text-sm font-semibold text-white break-words">{verificationResult.data.issuedBy}</p>
                      </div>
                    </div>
                    <div className="rounded-2xl sm:rounded-3xl bg-gradient-to-r from-cyan-500/5 via-slate-900/40 to-blue-500/5 p-3 sm:p-4 text-xs sm:text-sm text-slate-200">
                      <p>
                        <span className="font-semibold text-white">Issue Date:</span>{" "}
                        {formattedIssueDate}
                      </p>
                      <p className="text-slate-400 mt-1">
                        This certificate is valid for presentation and authentication.
                      </p>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default CertificateVerify;
