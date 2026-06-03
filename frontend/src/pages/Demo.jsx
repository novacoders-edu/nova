import React, { useContext } from "react";
import ProfileCard from "../components/ProfileCard";
import { DataContext } from "../context/DataProvider";
import SEO from "../components/SEO";

const Demo = () => {
  const { team } = useContext(DataContext);
  console.log(team);

  if (!team || team.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#020712] text-white">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-cyan-400"></div>
          <p className="text-gray-400 text-sm font-medium tracking-wide">Loading team profiles...</p>
        </div>
      </div>
    );
  }

  // Helper to extract a display handle from social links or fall back to name
  const getHandle = (member) => {
    const githubLink = member.socialLinks?.find((link) =>
      link.url.includes("github.com")
    );
    if (githubLink) {
      // Extract github username from url
      const parts = githubLink.url.split("github.com/");
      if (parts[1]) return parts[1].replace(/\/$/, "");
    }
    return member.name.toLowerCase().replace(/\s+/g, "");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#030712] via-[#0c1329] to-[#1e253f] py-20 px-4 sm:px-6 md:px-10 lg:px-20 text-white relative overflow-hidden">
      <SEO
        title="Interactive Core Profiles"
        description="Experience the high-performance holographic 3D profile cards of the Nova Coders core development team."
      />

      {/* Decorative blurred glow in the background */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Showcase Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/5 text-xs sm:text-sm text-cyan-300 backdrop-blur-md">
            <span className="font-semibold">Interactive Showcase</span>
            <span className="text-cyan-500/50">|</span>
            <span>Holographic 3D Cards</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4 bg-gradient-to-r from-white via-cyan-100 to-blue-400 bg-clip-text text-transparent">
            Meet the Core Team
          </h1>
          <p className="text-gray-400 text-sm sm:text-base md:text-lg leading-relaxed">
            Interact with our premium glassmorphic depth cards. Hover to activate stunning gradient glow reflections,
            built with custom physics-based parallax tilt effects for both desktop and mobile devices.
          </p>
        </div>

        {/* Dynamic Responsive Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6 lg:gap-8 justify-items-center">
          {team.map((member, index) => {
            // Elegant, curated palettes for each team member to look ultra-premium
            const cardPalettes = [
              {
                glow: "rgba(34, 211, 238, 0.4)", // Cyan
                gradient: "linear-gradient(145deg, rgba(8, 47, 73, 0.7) 0%, rgba(34, 211, 238, 0.15) 100%)",
              },
              {
                glow: "rgba(168, 85, 247, 0.4)", // Purple
                gradient: "linear-gradient(145deg, rgba(46, 16, 101, 0.7) 0%, rgba(168, 85, 247, 0.15) 100%)",
              },
              {
                glow: "rgba(16, 185, 129, 0.4)", // Emerald
                gradient: "linear-gradient(145deg, rgba(6, 78, 59, 0.7) 0%, rgba(16, 185, 129, 0.15) 100%)",
              },
              {
                glow: "rgba(244, 63, 94, 0.4)", // Rose
                gradient: "linear-gradient(145deg, rgba(136, 19, 55, 0.7) 0%, rgba(244, 63, 94, 0.15) 100%)",
              },
            ];

            const themeStyle = cardPalettes[index % cardPalettes.length];

            return (
              <ProfileCard
                key={member.id || `member-${index}`}
                name={member.name}
                title={member.role}
                handle={getHandle(member)}
                status="Online"
                contactText="Connect"
                avatarUrl={member.avatar}
                showUserInfo={true}
                enableTilt={true}
                enableMobileTilt={true}
                behindGlowEnabled={true}
                behindGlowColor={themeStyle.glow}
                innerGradient={themeStyle.gradient}
                socialLinks={member.socialLinks}
                onContactClick={() => {
                  const linkedIn = member.socialLinks?.find((link) =>
                    link.url.includes("linkedin.com")
                  );
                  if (linkedIn) {
                    window.open(linkedIn.url, "_blank", "noopener,noreferrer");
                  } else {
                    console.log(`No LinkedIn link available for ${member.name}`);
                  }
                }}
                iconUrl="/assets/demo/iconpattern.png"
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Demo;
