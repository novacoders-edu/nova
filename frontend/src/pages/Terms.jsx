import React from "react";
import {
  FileText,
  ShieldCheck,
  Users,
  AlertTriangle,
  Mail,
} from "lucide-react";

function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-black text-white px-5 md:px-10 lg:px-20 py-24">
      
      {/* Hero Section */}
      <div className="max-w-5xl mx-auto text-center mb-16">
        <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-400/20 text-cyan-400 px-4 py-2 rounded-full text-sm mb-6">
          <FileText size={16} />
          Terms & Conditions
        </div>

        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
          Terms & Conditions
        </h1>

        <p className="text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed">
          Welcome to Nova Coders. By accessing our website, participating in
          our events, or using our services, you agree to comply with the
          following terms and conditions.
        </p>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto space-y-10">

        {/* Section */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-4">
            <Users className="text-cyan-400" />
            <h2 className="text-2xl font-semibold">
              Community Guidelines
            </h2>
          </div>

          <p className="text-gray-400 leading-relaxed">
            Nova Coders is a technology-driven developer community. Users are
            expected to maintain respectful communication, ethical behavior,
            and professionalism during events, hackathons, workshops, and
            community interactions.
          </p>
        </div>

        {/* Section */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-4">
            <ShieldCheck className="text-blue-400" />
            <h2 className="text-2xl font-semibold">
              Intellectual Property
            </h2>
          </div>

          <p className="text-gray-400 leading-relaxed">
            All content, branding, logos, designs, event materials, and
            digital assets available on the Nova Coders platform are the
            property of Nova Coders unless otherwise stated. Unauthorized
            copying, redistribution, or misuse is prohibited.
          </p>
        </div>

        {/* Section */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="text-emerald-400" />
            <h2 className="text-2xl font-semibold">
              Event Participation
            </h2>
          </div>

          <p className="text-gray-400 leading-relaxed">
            Participants registering for hackathons, workshops, or events
            must provide accurate information. Nova Coders reserves the
            right to modify schedules, eligibility, rules, or participation
            guidelines whenever necessary.
          </p>
        </div>

        {/* Section */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-4">
            <FileText className="text-purple-400" />
            <h2 className="text-2xl font-semibold">
              Limitation of Liability
            </h2>
          </div>

          <p className="text-gray-400 leading-relaxed">
            Nova Coders is not responsible for any direct or indirect damages,
            technical interruptions, data loss, or third-party platform issues
            that may arise while using our website, attending events, or
            interacting with community services.
          </p>
        </div>

        {/* Section */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-4">
            <ShieldCheck className="text-orange-400" />
            <h2 className="text-2xl font-semibold">
              Policy Updates
            </h2>
          </div>

          <p className="text-gray-400 leading-relaxed">
            Nova Coders may update or modify these Terms & Conditions at any
            time without prior notice. Continued use of our platform
            indicates acceptance of the updated terms.
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
            For questions related to these Terms & Conditions, partnerships,
            or event participation, contact the Nova Coders team.
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

export default TermsAndConditions;