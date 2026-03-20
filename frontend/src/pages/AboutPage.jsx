import React from 'react';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display transition-colors duration-300 min-h-screen overflow-y-auto" style={{background: 'linear-gradient(180deg, #0B0F14 0%, #0F141B 60%, #0B0F14 100%)'}}>
      <style>{`
        .material-symbols-outlined {
          font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
      `}</style>

      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-50 w-full border-b border-primary/10 backdrop-blur-md" style={{background: 'rgba(11, 15, 20, 0.9)', backdropFilter: 'blur(8px)'}}>
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-primary p-2 rounded-lg">
              <span className="material-symbols-outlined text-background-dark">volunteer_activism</span>
            </div>
            <h2 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">Happiness <span className="text-primary">Campaign</span></h2>
          </div>
          <nav className="hidden md:flex items-center gap-10">
            <Link className="text-sm font-semibold hover:text-primary transition-colors" to="/">Home</Link>
            <Link className="text-sm font-semibold hover:text-primary transition-colors" to="/tracker">Live Map</Link>
            <Link className="text-sm font-semibold hover:text-primary transition-colors" to="/campaigns">Campaigns</Link>
            <Link className="text-sm font-semibold text-primary" to="/about">About</Link>
          </nav>
          <button className="bg-primary text-background-dark px-6 py-2.5 rounded-full text-sm font-bold hover:opacity-90 transition-all shadow-lg shadow-primary/20">
            Join the Ride
          </button>
        </div>
      </header>

      <main className="flex flex-col">
        {/* Section 1: Hero */}
        <section className="relative min-h-[80vh] flex items-center justify-center px-6 overflow-hidden">
          <div className="absolute inset-0" style={{background: 'radial-gradient(circle at top center, rgba(255,122,92,0.12) 0%, rgba(11,15,20,0.9) 65%)'}}></div>
          <div className="max-w-4xl w-full text-center relative z-10">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-8 border border-primary/20">
              <span className="material-symbols-outlined text-sm">cycle</span> Our Movement
            </div>
            <h1 className="text-5xl md:text-7xl font-black leading-[1.1] mb-8 dark:text-white text-slate-900">
              Spreading Happiness Through <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-400">Community Rides</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
              Join our global movement to foster connection and joy through collective cycling experiences. Every pedal stroke brings us closer to a happier world.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="w-full sm:w-auto px-8 py-4 bg-primary text-background-dark font-bold rounded-xl shadow-xl shadow-primary/20 hover:scale-[1.02] transition-transform">Get Started Today</button>
              <button className="w-full sm:w-auto px-8 py-4 bg-background-light dark:bg-white/5 border border-slate-200 dark:border-white/10 font-bold rounded-xl hover:bg-slate-100 dark:hover:bg-white/10 transition-colors">Learn Our Story</button>
            </div>
          </div>
          <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[120%] h-64 bg-gradient-to-t from-background-light dark:from-background-dark to-transparent z-20"></div>
        </section>

        {/* Section 2: Mission */}
        <section className="py-24 px-6 relative">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
              <div className="max-w-2xl">
                <h2 className="text-primary font-bold text-sm tracking-[0.2em] uppercase mb-4">Our Mission</h2>
                <h3 className="text-3xl md:text-4xl font-extrabold dark:text-white text-slate-900">Making the world a friendlier place, one ride at a time.</h3>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="group bg-white p-10 rounded-xl border border-slate-100 hover:border-primary/40 transition-all" style={{backgroundColor: '#111827', border: '1px solid rgba(255, 255, 255, 0.06)'}}>
                <div className="w-14 h-14 bg-primary/20 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-primary text-3xl">sentiment_satisfied</span>
                </div>
                <h4 className="text-xl font-bold mb-4 dark:text-white">Spread Happiness</h4>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">Bringing smiles to every corner of the city by sharing positive energy and collective joy on the road.</p>
              </div>
              <div className="group bg-white p-10 rounded-xl border border-slate-100 hover:border-primary/40 transition-all" style={{backgroundColor: '#111827', border: '1px solid rgba(255, 255, 255, 0.06)'}}>
                <div className="w-14 h-14 bg-primary/20 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-primary text-3xl">group</span>
                </div>
                <h4 className="text-xl font-bold mb-4 dark:text-white">Encourage Community</h4>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">Building strong bonds through shared journeys. We believe that cycling is better when we're together.</p>
              </div>
              <div className="group bg-white p-10 rounded-xl border border-slate-100 hover:border-primary/40 transition-all" style={{backgroundColor: '#111827', border: '1px solid rgba(255, 255, 255, 0.06)'}}>
                <div className="w-14 h-14 bg-primary/20 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-primary text-3xl">public</span>
                </div>
                <h4 className="text-xl font-bold mb-4 dark:text-white">Create Social Impact</h4>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">Driving meaningful change in local neighborhoods by promoting mental health and sustainable commuting.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: How It Works */}
        <section className="py-24 px-6 bg-slate-50 dark:bg-transparent">
          <div className="max-w-7xl mx-auto text-center mb-20">
            <h2 className="text-primary font-bold text-sm tracking-[0.2em] uppercase mb-4">How It Works</h2>
            <h3 className="text-3xl md:text-5xl font-extrabold dark:text-white text-slate-900">Your Journey Starts Here</h3>
          </div>
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center group">
              <div className="relative mb-8">
                <div className="w-24 h-24 bg-white border-4 border-primary rounded-full flex items-center justify-center z-10 relative dark:bg-[#111827]">
                  <span className="material-symbols-outlined text-primary text-4xl">location_on</span>
                </div>
                <div className="absolute -top-2 -right-2 bg-primary text-background-dark w-8 h-8 rounded-full flex items-center justify-center font-black">1</div>
              </div>
              <h4 className="text-xl font-bold mb-3 dark:text-white">Find a Ride</h4>
              <p className="text-slate-500 dark:text-slate-400">Use our live map to discover upcoming community rides happening near you.</p>
            </div>
            {/* Step 2 */}
            <div className="flex flex-col items-center text-center group">
              <div className="relative mb-8">
                <div className="w-24 h-24 bg-white border-4 border-primary rounded-full flex items-center justify-center z-10 relative dark:bg-[#111827]">
                  <span className="material-symbols-outlined text-primary text-4xl">campaign</span>
                </div>
                <div className="absolute -top-2 -right-2 bg-primary text-background-dark w-8 h-8 rounded-full flex items-center justify-center font-black">2</div>
              </div>
              <h4 className="text-xl font-bold mb-3 dark:text-white">Join Campaign</h4>
              <p className="text-slate-500 dark:text-slate-400">Sign up for a mission that resonates with you and get your official rider kit.</p>
            </div>
            {/* Step 3 */}
            <div className="flex flex-col items-center text-center group">
              <div className="relative mb-8">
                <div className="w-24 h-24 bg-white border-4 border-primary rounded-full flex items-center justify-center z-10 relative dark:bg-[#111827]">
                  <span className="material-symbols-outlined text-primary text-4xl">celebration</span>
                </div>
                <div className="absolute -top-2 -right-2 bg-primary text-background-dark w-8 h-8 rounded-full flex items-center justify-center font-black">3</div>
              </div>
              <h4 className="text-xl font-bold mb-3 dark:text-white">Spread Happiness</h4>
              <p className="text-slate-500 dark:text-slate-400">Ride with the pack, share smiles, and make a positive impact in your city.</p>
            </div>
          </div>
        </section>

        {/* Section 4: Team Section */}
        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-primary font-bold text-sm tracking-[0.2em] uppercase mb-4">The Team</h2>
              <h3 className="text-3xl md:text-5xl font-extrabold dark:text-white text-slate-900">Meet the Joymakers</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {/* Team Member 1 */}
              <div className="group">
                <div className="aspect-square rounded-2xl overflow-hidden mb-6 bg-slate-200 dark:bg-primary/10">
                  <img alt="Alex Rivera - Founder" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuADKdB4eBrF3u6XJNUDXqjPlpEKPsFKEuwypLwBcq-vFV-pNVvY1N5OYE345kiwIkjNl8MjmvBGL6d6jsBMtAziXM4L6dQQmTGA57hTywlIKx-UyPUkOjjIWrS-SAk5fykwRg2n4hrbYRs2NH0Nt81Y80_K_czURWEWwpcfbngKhdfnOQLBT3sX1QHxs-afLGp1C6J8YaM7PVOzADvChabEW103KtuAwOocWfV4wVv_dutEK6TKHX7Ww9Fd2qQquWa6KaBDWELSBY8" />
                </div>
                <h4 className="text-lg font-bold dark:text-white">Alex Rivera</h4>
                <p className="text-primary text-sm font-semibold mb-2">Founder &amp; Lead Rider</p>
              </div>
              {/* Team Member 2 */}
              <div className="group">
                <div className="aspect-square rounded-2xl overflow-hidden mb-6 bg-slate-200 dark:bg-primary/10">
                  <img alt="Sarah Chen - Community Director" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDTY2L4CF6MAGI2rUZi5DeFzAfqfnkfyQppFTx6BcghQoBsC2foj-Tq_z2kiw5fZynlwpts4--ucQWHe-kUywDZAVi1axRG6pZzbtG9IpEp-s8vsZFOxa2Y9J3y13PU8BmwxgKofH-YclpUboYkTf3D7fQ2HefoTAGogFa2H-aKiwFQqp5KICB0BJw1jflsPgD1WjGixpN7mYWXU3xHgr1GxF5s-_yeebAwDGv7avEITIXkUUH7R1Z99erjxICwUJ15fCoqYSFB59U" />
                </div>
                <h4 className="text-lg font-bold dark:text-white">Sarah Chen</h4>
                <p className="text-primary text-sm font-semibold mb-2">Community Director</p>
              </div>
              {/* Team Member 3 */}
              <div className="group">
                <div className="aspect-square rounded-2xl overflow-hidden mb-6 bg-slate-200 dark:bg-primary/10">
                  <img alt="Marcus Thorne - Events Logistics" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDSWXiW0QrPJQCF62HqdkM_cx9WUiczUM6UM_z6lnAl-27fApA95J6u8R5Q9tL31STTn-8xSJn70idTRx8rXp7SVX7vsexqTbkUMiblx4_TzCsVsRZk3kE8dllpzlMNgMI9jqJEU8CaXha0p6gql3vg45PTKgMpyzwc-Npl6aIIevIhXj_6q4DuURk6MSzE9NXXfGaJkg0Cv-k-LPnmmXzh9UIZ81cbLiFD70lKuf2JwL1qvWrMnwXLYsjW-FxAtx73U4OfWG87-O0" />
                </div>
                <h4 className="text-lg font-bold dark:text-white">Marcus Thorne</h4>
                <p className="text-primary text-sm font-semibold mb-2">Events Logistics</p>
              </div>
              {/* Team Member 4 */}
              <div className="group">
                <div className="aspect-square rounded-2xl overflow-hidden mb-6 bg-slate-200 dark:bg-primary/10">
                  <img alt="Elena Sokolova - Creative Lead" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDyLtVj1CIB3tJ1808hdzQFBWciFiB4y41D72R7ldu4RhhnDcbzUuM2M2SvE8fSdJCIGzXgPGifX8Azie1a1adHRXXI25QiJA1xldumsTHUEKkvHquTMkhhdtuqblA9X5DfCvWVbMosS1wM13oGDuurku7YB2E-rslZuqNwDOdtHtIhS0_0UXDetNnYCOxR_fyJK7mX8KL45i46XTZMhek3jW0jPFEA75aJcSuh7CYnfnYd6-hc50Wzi8YmQ_6neu2m7NCmyrK4kr8" />
                </div>
                <h4 className="text-lg font-bold dark:text-white">Elena Sokolova</h4>
                <p className="text-primary text-sm font-semibold mb-2">Creative Lead</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Contact Section */}
        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl md:text-5xl font-extrabold dark:text-white text-slate-900 mb-6">Let's Connect and <br /><span className="text-primary">Ride Together</span></h2>
                <p className="text-lg text-slate-600 dark:text-slate-400 mb-10 max-w-md leading-relaxed">
                  Have questions or want to start a chapter in your city? Reach out and we'll get back to you faster than a downhill sprint.
                </p>
                <div className="space-y-6">
                  <a className="flex items-center gap-4 group" href="mailto:hello@happinesscampaign.org">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center group-hover:bg-primary transition-colors">
                      <span className="material-symbols-outlined text-primary group-hover:text-background-dark">mail</span>
                    </div>
                    <span className="text-lg font-semibold hover:text-primary transition-colors">hello@happinesscampaign.org</span>
                  </a>
                  <div className="flex items-center gap-4 group cursor-pointer">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center group-hover:bg-primary transition-colors">
                      <span className="material-symbols-outlined text-primary group-hover:text-background-dark">photo_camera</span>
                    </div>
                    <span className="text-lg font-semibold hover:text-primary transition-colors">@happinesscampaign</span>
                  </div>
                  <div className="flex items-center gap-4 group cursor-pointer">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center group-hover:bg-primary transition-colors">
                      <span className="material-symbols-outlined text-primary group-hover:text-background-dark">share</span>
                    </div>
                    <span className="text-lg font-semibold hover:text-primary transition-colors">Happiness Campaign Official</span>
                  </div>
                </div>
              </div>
              <div className="bg-white p-8 md:p-12 rounded-3xl border border-slate-200 dark:border-primary/20 shadow-2xl">
                <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold uppercase tracking-wider text-slate-500">Name</label>
                      <input className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 focus:border-primary outline-none transition-colors" placeholder="John Doe" type="text" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold uppercase tracking-wider text-slate-500">Email</label>
                      <input className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 focus:border-primary outline-none transition-colors" placeholder="john@example.com" type="email" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-wider text-slate-500">Message</label>
                    <textarea className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 focus:border-primary outline-none transition-colors" placeholder="Tell us how you want to help..." rows="4"></textarea>
                  </div>
                  <button className="w-full bg-primary text-background-dark font-bold py-4 rounded-xl hover:opacity-90 transition-opacity" type="submit">Send Message</button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-background-light border-t border-primary/10 py-12 px-6" style={{backgroundColor: '#0B0F14'}}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 p-2 rounded-lg">
              <span className="material-symbols-outlined text-primary">volunteer_activism</span>
            </div>
            <h2 className="text-xl font-extrabold tracking-tight dark:text-white">Happiness <span className="text-primary">Campaign</span></h2>
          </div>
          <p className="text-slate-500 text-sm">© 2024 Happiness Campaign. All rights reserved. Pedaling towards progress.</p>
          <div className="flex gap-6">
            <span className="text-slate-500 hover:text-primary transition-colors text-sm font-medium cursor-pointer">Privacy Policy</span>
            <span className="text-slate-500 hover:text-primary transition-colors text-sm font-medium cursor-pointer">Terms of Service</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AboutPage;
