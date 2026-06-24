import React, { useContext } from "react";
import { DataContext } from "../../context/DataProvider";
import WinnerCart from "../ui/WinnerCart";

const HackGear1 = () => {
  const { hackGear1 = [] } = useContext(DataContext);

  return (
    <section aria-labelledby="hackgear1-heading" className="max-w-5xl mx-auto px-4 py-12">
      <div className="space-y-6 text-center">
        <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/80">Hack Gear 1.0 Highlights</p>
        <h1 id="hackgear1-heading" className="text-4xl font-bold tracking-tight">
          Meet the teams driving the future of{" "}
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">Nova Coders</span>
        </h1>
        <p className="mx-auto max-w-3xl text-lg text-slate-200/90">
          Hack Gear 1.0 brought together innovators from Aligarh and beyond. These winners combined strong teamwork, product thinking, and execution to build solutions that impressed both judges and mentors.
        </p>

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-slate-950/60 px-5 py-6 text-center sm:px-6">
            <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Participants</p>
            <p className="mt-2 text-3xl font-bold text-white">400+</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-slate-950/60 px-5 py-6 text-center sm:px-6">
            <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Projects built</p>
            <p className="mt-2 text-3xl font-bold text-white">25+</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-slate-950/60 px-5 py-6 text-center sm:px-6">
            <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Worth Prize Pool</p>
            <p className="mt-2 text-3xl font-bold text-white">₹2 Lakh</p>
          </div>
        </div>
      </div>

      <div className="mt-16 space-y-8">
        <div className="space-y-3 text-center">
          <h2 className="text-3xl font-bold">
            Winners from{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">Hack Gear 1.0</span>
          </h2>
          <p className="text-lg text-slate-300/90">A showcase of the most creative projects and the teams who brought them to life.</p>
        </div>

        {hackGear1.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {hackGear1.map((item, index) => (
              <WinnerCart
                key={`${item.teamName ?? item.projectTitle}-${index}`}
                src={item.src}
                imageAlt={item.teamName}
                tag={item.tag}
                teamName={item.teamName}
                projectTitle={item.projectTitle}
                prize={item.prize}
                metrics={[{ label: "Prize Money", value: item.price }]}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-10 text-center text-slate-300">
            <p className="text-lg font-semibold">Winner details are coming soon.</p>
            <p className="mt-2 text-sm text-slate-400">Stay tuned for more highlights from Hack Gear 1.0.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default HackGear1;
