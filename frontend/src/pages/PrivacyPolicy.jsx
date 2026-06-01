import React from "react";
import { ShieldCheck, Users, Lock, Mail } from "lucide-react";

function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-900 text-white px-5 md:px-10 lg:px-20 py-24">
      
      {/* Hero Section */}
      <div className="max-w-5xl mx-auto text-center mb-16">
        <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-400/20 text-cyan-400 px-4 py-2 rounded-full text-sm mb-6">
          <ShieldCheck size={16} />
          Privacy & Security
        </div>

        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
          Privacy Policy
        </h1>

        <p className="text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed">
          At Nova Coders, we value your privacy and are committed to
          protecting your personal information while building a secure and
          innovation-driven developer community.
        </p>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto space-y-10">

        {/* Section */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-4">
            <Users className="text-cyan-400" />
            <h2 className="text-2xl font-semibold">
              Information We Collect
            </h2>
          </div>

          <p className="text-gray-400 leading-relaxed">
            We may collect personal information such as your name, email
            address, social profiles, event registrations, and any details
            you voluntarily provide while joining our community, events,
            hackathons, workshops, or contacting Nova Coders.
          </p>
        </div>

        {/* Section */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-4">
            <ShieldCheck className="text-blue-400" />
            <h2 className="text-2xl font-semibold">
              How We Use Your Information
            </h2>
          </div>

          <p className="text-gray-400 leading-relaxed">
            Your information helps us improve our events, developer
            programs, hackathons, collaborations, and community
            experiences. We may also use it to send important updates,
            announcements, certificates, newsletters, and opportunities
            related to Nova Coders.
          </p>
        </div>

        {/* Section */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-4">
            <Lock className="text-emerald-400" />
            <h2 className="text-2xl font-semibold">
              Data Protection & Security
            </h2>
          </div>

          <p className="text-gray-400 leading-relaxed">
            Nova Coders takes reasonable security measures to protect your
            data from unauthorized access, misuse, or disclosure. However,
            while we strive to secure your information, no online platform
            can guarantee absolute security.
          </p>
        </div>

        {/* Section */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-4">
            <ShieldCheck className="text-purple-400" />
            <h2 className="text-2xl font-semibold">
              Your Rights
            </h2>
          </div>

          <p className="text-gray-400 leading-relaxed">
            You have the right to access, update, or request deletion of
            your personal information. You may also opt out of receiving
            promotional or community-related communications at any time.
          </p>
        </div>

        {/* Contact Section */}
        <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-400/20 rounded-3xl p-6 md:p-8">
          <div className="flex items-center gap-3 mb-4">
            <Mail className="text-cyan-400" />
            <h2 className="text-2xl font-semibold">
              Contact Us
            </h2>
          </div>

          <p className="text-gray-300 leading-relaxed mb-4">
            If you have any questions regarding this Privacy Policy or how
            your information is handled, feel free to contact the Nova
            Coders team.
          </p>

          <a
            href="mailto:novacoders007@gmail.com"
            className="text-cyan-400 hover:text-cyan-300 transition-colors text-lg"
          >
            novacoders007@gmail.com
          </a>
        </div>

      </div>
    </div>
  );
}

export default PrivacyPolicy;