import React, { useContext } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Mail, MessageSquare, ChevronRight } from "lucide-react";
import ContactFormSection from "../components/ContactFormSection";
import FAQItem from "../components/FAQItem";
import SEO from "../components/SEO";
import { DataContext } from "../context/DataProvider";

// ─── Animation variants ───────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const childFade = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

// Social meta mapping for social links
const socialMeta = {
  FaWhatsapp:   { label: "WhatsApp", color: "hover:border-green-400/50 hover:bg-green-500/10 hover:text-green-400" },
  FaInstagram:  { label: "Instagram", color: "hover:border-pink-400/50 hover:bg-pink-500/10 hover:text-pink-400" },
  FaLinkedinIn: { label: "LinkedIn", color: "hover:border-blue-400/50 hover:bg-blue-500/10 hover:text-blue-400" },
  FaGithub:     { label: "GitHub", color: "hover:border-gray-400/50 hover:bg-gray-500/10 hover:text-gray-300" },
};

export default function Contact() {
  const { faqs, infoCards, reasons, social } = useContext(DataContext);
  const [copied, setCopied] = React.useState(false);

  const handleEmailClick = () => {
    navigator.clipboard.writeText("novacoder007@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white relative">
      <SEO
        title="Contact"
        description="Get in touch with Nova Coders for project collaborations, event partnerships, mentorship, or community inquiries."
        canonicalUrl="https://novacoders.in/contact"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "Nova Coders",
          "url": "https://novacoders.in",
          "telephone": "+91-6397973513",
          "email": "novacoder007@gmail.com",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Aligarh",
            "addressRegion": "Uttar Pradesh",
            "addressCountry": "IN"
          },
          "openingHours": "Mo-Sa 10:00-19:00",
          "sameAs": [
            "https://www.instagram.com/nova_coders_007/",
            "https://www.linkedin.com/company/novacoders007/",
            "https://github.com/novacoders-edu"
          ]
        }}
      />

      {/* ── Hero Section ─────────────────────────────────────────────────── */}
      <section className="relative pt-20 pb-20 px-6 text-center overflow-hidden">
        {/* Ambient background glows */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className=" w-full  bg-blue-600/10 rounded-full   pointer-events-none ">
          <video
            src="contact_video.mp4"
            autoPlay
            loop
            muted
            className="absolute top-0 left-0 w-full h-full object-cover pointer-events-none opacity-40"
          />
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          {/* badge */}
          <motion.div
            variants={fadeUp}
            custom={0}
            initial="hidden"
            animate="visible"
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-sm font-medium text-cyan-300 backdrop-blur-sm"
          >
            <MessageSquare className="h-4 w-4" />
            Get In Touch
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          </motion.div>

          {/* heading */}
          <motion.h1
            variants={fadeUp}
            custom={0.1}
            initial="hidden"
            animate="visible"
            className="mb-5 bg-gradient-to-b from-white via-cyan-100 to-cyan-400 bg-clip-text text-5xl font-extrabold leading-tight text-transparent md:text-7xl tracking-tight"
          >
            Let's Build Something{" "}
            <span className="block md:inline bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Together
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            custom={0.2}
            initial="hidden"
            animate="visible"
            className="mx-auto max-w-2xl text-lg text-gray-300 leading-relaxed md:text-xl"
          >
            Whether you have a project idea, want to collaborate, or just want
            to say hi — we're always happy to hear from you.
          </motion.p>
        </div>

        {/* bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none" />
      </section>

      {/* ── Info cards ─────────────────────────────────────────────────────── */}
      <section className="px-6 md:px-10 lg:px-20 pb-12 -mt-6 relative z-10">
        <motion.div
          className="max-w-5xl mx-auto grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {infoCards.map(
            ({
              icon: Icon,
              label,
              value,
              href,
              sub,
              color,
              border,
              bg,
              glow,
            }) => (
              <motion.div
                key={label}
                variants={childFade}
                className={`group rounded-2xl border ${border} ${bg} ${glow} p-5 backdrop-blur-sm transition-all duration-300 cursor-default`}
              >
                <div
                  className={`mb-3 inline-flex rounded-xl p-2.5 ${bg} border ${border}`}
                >
                  <Icon className={`h-5 w-5 ${color}`} />
                </div>
                <p className="mb-1 text-xs uppercase tracking-widest text-gray-500 font-medium">
                  {label}
                </p>
                {href ? (
                  <a
                    href={href}
                    className={`block text-sm font-semibold ${color} hover:underline break-all leading-snug`}
                  >
                    {value}
                  </a>
                ) : (
                  <p className={`text-sm font-semibold ${color} leading-snug`}>
                    {value}
                  </p>
                )}
                <p className="mt-1.5 text-xs text-gray-500">{sub}</p>
              </motion.div>
            ),
          )}
        </motion.div>
      </section>

      {/* ── Why reach out ──────────────────────────────────────────────────── */}
      <section className="px-6 md:px-10 lg:px-20 py-14 relative overflow-hidden">
        {/* subtle bg */}
        <div className="absolute inset-0 pointer-events-none opacity-5">
          <div className="absolute top-0 left-1/4 w-80 h-80 bg-cyan-500 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-500 rounded-full blur-3xl" />
        </div>

        <div className="max-w-5xl mx-auto relative z-10">
          <div className="mb-10 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          <motion.div
            className="text-center mb-10"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              Why{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Reach Out?
              </span>
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto text-sm md:text-base">
              There are plenty of reasons to connect with us — here are the most
              common ones.
            </p>
          </motion.div>

          <motion.div
            className="grid gap-5 sm:grid-cols-3"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            {reasons.map(({ icon: Icon, title, desc, color, bg, border }) => (
              <motion.div
                key={title}
                variants={childFade}
                className={`group rounded-2xl border ${border} ${bg} p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(34,211,238,0.1)] cursor-default`}
              >
                <div
                  className={`mb-4 inline-flex rounded-xl ${bg} border ${border} p-3`}
                >
                  <Icon className={`h-5 w-5 ${color}`} />
                </div>
                <p className="mb-2 text-base font-semibold text-white">
                  {title}
                </p>
                <p className="text-sm leading-relaxed text-gray-400">{desc}</p>
                <div
                  className={`mt-4 flex items-center gap-1 text-xs ${color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                >
                  <span>Learn more</span>
                  <ChevronRight className="w-3 h-3" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Contact form ───────────────────────────────────────────────────── */}
      <section className="px-6 md:px-10 lg:px-20 py-14 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-8">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-cyan-500 rounded-full blur-3xl" />
        </div>
        <div className="max-w-5xl mx-auto relative z-10">
          <ContactFormSection />
        </div>
      </section>

      {/* ── Social links ───────────────────────────────────────────────────── */}
      <section className="px-6 md:px-10 lg:px-20 py-14">
        <div className="max-w-5xl mx-auto">
          <div className="mb-10 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          <motion.div
            className="text-center mb-10"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              Find Us{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Online
              </span>
            </h2>
            <p className="text-gray-400 text-sm md:text-base">
              Follow along for updates, events, and community highlights.
            </p>
          </motion.div>

          <motion.div
            className="flex flex-wrap justify-center gap-4"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {social.map(({ icon: Icon, url }, i) => {
              const iconName = Icon?.name || Icon?.displayName || "";
              const meta = socialMeta[iconName] || {
                label: iconName.replace(/^Fa/, "") || "Social",
                color: "hover:border-cyan-400/50 hover:bg-cyan-500/10 hover:text-cyan-300",
              };

              return (
                <motion.a
                  key={i}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={childFade}
                  whileHover={{ scale: 1.06, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-6 py-3.5 text-sm font-medium text-gray-300 transition-all duration-200 ${meta.color}`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{meta.label}</span>
                  <ExternalLink className="h-3 w-3 opacity-40" />
                </motion.a>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────────────────────── */}
      <section className="px-6 md:px-10 lg:px-20 py-14 pb-28 relative overflow-hidden">
        {/* bg accent */}
        <div className="absolute inset-0 pointer-events-none opacity-5">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-64 bg-cyan-500 rounded-full blur-3xl" />
        </div>

        <div className="max-w-3xl mx-auto relative z-10">
          <div className="mb-10 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          <motion.div
            className="text-center mb-10"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              Frequently Asked{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Questions
              </span>
            </h2>
            <p className="text-gray-400 text-sm md:text-base">
              Quick answers to the most common questions.
            </p>
          </motion.div>

          <motion.div
            className="space-y-3"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
          >
            {faqs.map((faq, index) => (
              <motion.div key={faq.question} variants={childFade}>
                <FAQItem {...faq} index={index} />
              </motion.div>
            ))}
          </motion.div>

          {/* bottom CTA */}
          <motion.div
            className="mt-12 text-center p-8 rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/8 to-blue-600/8 backdrop-blur-sm"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <p className="text-gray-300 mb-2 text-sm">Still have questions?</p>
            <p className="text-white font-semibold text-lg mb-5">
              We're just a message away.
            </p>
            <a
              href="mailto:novacoder007@gmail.com"
              onClick={handleEmailClick}
              className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold rounded-xl transition-colors duration-200 text-sm"
            >
              <Mail className="w-4 h-4" />
              {copied ? "Email Copied!" : "Email Us Directly"}
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
