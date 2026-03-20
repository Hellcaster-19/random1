import React from 'react';
import { Link } from 'react-router-dom';

const CampaignsPage = () => {
  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 min-h-screen overflow-y-auto" style={{background: 'linear-gradient(180deg, #0B0F14 0%, #0F141B 60%, #0B0F14 100%)'}}>
      <style>{`
        .hover-lift { transition: transform 0.2s ease, box-shadow 0.2s ease; }
        .hover-lift:hover { transform: translateY(-4px); }
        .image-zoom { transition: transform 0.5s ease; }
        .group:hover .image-zoom { transform: scale(1.05); }
        .glow-hover:hover { box-shadow: 0 0 20px rgba(255, 122, 92, 0.2); }
      `}</style>

      <div className="relative flex h-auto w-full flex-col overflow-x-hidden">
        {/* Navigation */}
        <header className="sticky top-0 z-50 w-full border-b border-primary/10 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md px-6 lg:px-40 py-4" style={{background: 'rgba(11, 15, 20, 0.9)', backdropFilter: 'blur(8px)'}}>
          <div className="max-w-[1200px] mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary rounded-lg text-background-dark">
                <span className="material-symbols-outlined block">sentiment_satisfied</span>
              </div>
              <h2 className="text-xl font-bold tracking-tight">Happiness Campaign</h2>
            </div>
            <nav className="hidden md:flex items-center gap-10">
              <Link className="text-sm font-medium hover:text-primary transition-colors" to="/">Home</Link>
              <Link className="text-sm font-medium hover:text-primary transition-colors" to="/tracker">Live Map</Link>
              <Link className="text-sm font-medium text-primary" to="/campaigns">Campaigns</Link>
              <Link className="text-sm font-medium hover:text-primary transition-colors" to="/about">About</Link>
            </nav>
            <button className="flex items-center justify-center rounded-xl h-11 px-6 bg-primary text-background-dark text-sm font-bold hover:opacity-90 transition-all shadow-lg shadow-primary/20">
              <span>Join the Ride</span>
            </button>
          </div>
        </header>

        <main className="max-w-[1200px] mx-auto w-full px-6 lg:px-10 py-12 relative">
          <div className="absolute top-0 left-0 right-0 h-[600px] pointer-events-none" style={{background: 'radial-gradient(circle at left, rgba(255,122,92,0.12), transparent 60%)'}}></div>

          {/* Hero Header Section */}
          <div className="mb-12">
            <div className="flex flex-col gap-4 max-w-2xl">
              <h1 className="text-4xl lg:text-5xl font-black tracking-tight leading-tight text-[#F9FAFB]">
                Explore <span className="text-primary" style={{textShadow: '0 0 18px rgba(255,122,92,0.25)'}}>Happiness</span> Campaigns
              </h1>
              <p className="text-[#D1D5DB] text-lg leading-relaxed">Discover and join community-driven initiatives spreading joy, kindness, and sustainable living across the city.</p>
            </div>
            {/* Filter Tags */}
            <div className="flex flex-wrap gap-3 mt-8">
              <button className="flex items-center gap-2 rounded-full bg-primary px-5 py-2 text-background-dark font-bold text-sm" style={{backgroundColor: '#FF7A5C', color: 'white'}}>
                All Campaigns
              </button>
              <button className="flex items-center gap-2 rounded-full bg-slate-200 dark:bg-white/5 px-5 py-2 text-sm font-medium hover:bg-white/10 transition-colors" style={{backgroundColor: '#1F2933', color: '#D1D5DB'}}>
                <span className="material-symbols-outlined text-sm">event</span> UPCOMING
              </button>
              <button className="flex items-center gap-2 rounded-full bg-slate-200 dark:bg-white/5 px-5 py-2 text-sm font-medium hover:bg-white/10 transition-colors" style={{backgroundColor: '#1F2933', color: '#D1D5DB'}}>
                <span className="material-symbols-outlined text-sm">eco</span> ECO FRIENDLY
              </button>
              <button className="flex items-center gap-2 rounded-full bg-slate-200 dark:bg-white/5 px-5 py-2 text-sm font-medium hover:bg-white/10 transition-colors" style={{backgroundColor: '#1F2933', color: '#D1D5DB'}}>
                <span className="material-symbols-outlined text-sm">volunteer_activism</span> DONATION
              </button>
            </div>
          </div>

          {/* Campaigns Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="group flex flex-col rounded-2xl bg-white dark:bg-white/5 border border-primary/5 overflow-hidden hover-lift glow-hover" style={{backgroundColor: '#111827', border: '1px solid rgba(255, 255, 255, 0.06)'}}>
              <div className="relative h-56 overflow-hidden">
                <div className="absolute inset-0 bg-cover bg-center image-zoom" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAcwDl0DYTlgIYRcSK5v3bFhzjyiQ7TEYjfJtDRrRcUxWBN0EkkgcccOivmy5Lv0qS5q__c91s0rmjHYr7n16rDCKGpZfnFsHapU1m6ZqyFffZ7mWbMUPZmCbaN2nCpV_UpC9JdcUYPb48fk5eCKZPDWBavZwvUFiDouuJOes9VLdwaPzLHYAKH6O3TR9Kaw3xHcyxLPyrnmLXseI-jkwlefYTZovww0FQ8kXbU_YGRxOkUSpjJrzgjcXNXI6uBd5qHnpLVN5allR8')"}}></div>
                <div className="absolute inset-0" style={{background: 'linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.45) 100%)'}}></div>
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="bg-primary/90 text-background-dark text-[10px] font-bold px-2 py-1 rounded-md uppercase">Upcoming</span>
                  <span className="bg-green-500/90 text-white text-[10px] font-bold px-2 py-1 rounded-md uppercase">Eco Friendly</span>
                </div>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">Green City Initiative</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 line-clamp-2">Planting native trees to improve air quality and create vibrant green spaces in the downtown district.</p>
                <div className="mt-auto space-y-4">
                  <div className="flex items-center gap-3 text-sm text-slate-400">
                    <span className="material-symbols-outlined text-primary text-lg">schedule</span>
                    <span>10:00 AM • Sat, Oct 24</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-400">
                    <span className="material-symbols-outlined text-primary text-lg">location_on</span>
                    <span>Central Park South</span>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-primary/10">
                    <div className="flex -space-x-2">
                      <div className="w-8 h-8 rounded-full border-2 border-background-dark bg-slate-300 bg-cover bg-center" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCHbL-sQGjwYYulKkqx942z8-vKjkKBApC9_buqFqO6t4c_ycrKpaeTJ7VZugyfOZq2S3AyIVvi8YT6apfxy3RN0y8kMdAOltkKwYmoho98-yxBDDotplzDUhFDoB_bvJDC9u_XiA43oqmcJbqjVKkdaQFgL05b8mN9gH7qXWoAEuY226KCVvca_003Q--vivERcqiIG0HxouJ-CvpWr7niFjnaV9POhdXFbR2a_cQAY5CSQlMnoZsiruuq7Q_D-KAXZJAMKs7rKA8')"}}></div>
                      <div className="w-8 h-8 rounded-full border-2 border-background-dark bg-slate-300 bg-cover bg-center" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCik_9hW_Sm476heidjs1JHsWcNFMsO5Zxt2Hfaf2FGjKWTHuS3LQXX1ElS6TvVU70caNRHoYIPq-H4u4zp4_I5ozsK1ZXStGF94RA8Sf7MYq3_tC0btshxU-C7PQUrQbFdGKAv2q-iimrJKb6_ArULo8jmk0XY40HiXN0m-gt0r3w5lwPyoZIaG7251B7E-lkKI6AkY9tVKz78hwyE7tDQCOswAQybzBK3Ma5cv5iBramUAKLZ94L8sGN1nd_jmTs6Aw2XOSiLKcQ')"}}></div>
                      <div className="w-8 h-8 rounded-full border-2 border-background-dark bg-slate-300 flex items-center justify-center text-[10px] font-bold bg-primary/20 text-primary">+12</div>
                    </div>
                    <button className="bg-primary text-background-dark px-4 py-2 rounded-lg text-sm font-bold hover:scale-105 transition-transform">Join Campaign</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="group flex flex-col rounded-2xl bg-white dark:bg-white/5 border border-primary/5 overflow-hidden hover-lift glow-hover" style={{backgroundColor: '#111827', border: '1px solid rgba(255, 255, 255, 0.06)'}}>
              <div className="relative h-56 overflow-hidden">
                <div className="absolute inset-0 bg-cover bg-center image-zoom" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDhwo-Qj-vP7-gC6-JjmhHnzQR5pELA6m0LLh6uZTx4Fis27iUNgz3x07uE4rKzmvy8AaiT0_1Xdda5o5oc9MZOaZmAQrIS5Wc1Y05l71uE5e9OmSfpk5p6HDOo_uFa0wYhnVMXNmfxaP-ay3wMI47zHbA4MAwKhiQBDP-mTPaepVnRwUbD194akGFiZGgXzCQKZbgHBCb-PaHpNhTwQdiCo9Way4i_Fc4H9yRAVJ6-vOKMHGPqDF51kpE_HiX2B_bODuAztzyOWWc')"}}></div>
                <div className="absolute inset-0" style={{background: 'linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.45) 100%)'}}></div>
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="bg-blue-500/90 text-white text-[10px] font-bold px-2 py-1 rounded-md uppercase">Donation</span>
                </div>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">Community Food Drive</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 line-clamp-2">Collecting and distributing healthy meals to families in need within our local neighborhood.</p>
                <div className="mt-auto space-y-4">
                  <div className="flex items-center gap-3 text-sm text-slate-400">
                    <span className="material-symbols-outlined text-primary text-lg">schedule</span>
                    <span>08:00 AM • Sun, Oct 25</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-400">
                    <span className="material-symbols-outlined text-primary text-lg">location_on</span>
                    <span>Community Hall Plaza</span>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-primary/10">
                    <div className="flex -space-x-2">
                      <div className="w-8 h-8 rounded-full border-2 border-background-dark bg-slate-300 bg-cover bg-center" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC8Ugxl0lA8u7y5AIuqmOuCXLDzyhMJBsoD6ugIePLPvFiRDLZpoOP5-st6FASSHqkF9LDWR03VOazHLAd0odlmzr-M2EnhlBHQcAzjHGfhag0qznhNNxYc_dxhZ19AwzHtWHxs7lN6StmN3sgYJVbS7f2pOBOkJL0AybDeX_HFPHNRV_QakCPrvnOlrOjXw_D0-Ehkc2prPbtC3AQ6aHhe4hfWybGAEkg0BCQgYlWfula8BMRPBZAUFQRtZ6XPa8mQu28khjkAiJ4')"}}></div>
                      <div className="w-8 h-8 rounded-full border-2 border-background-dark bg-slate-300 bg-cover bg-center" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCklQM5tePrVXdFiuZcbXiN9_rIiLvW_jboUNByvQwi25wBCurBkTcwlGffiV9j6PBKn5GjS7eqmRwGRaTwfdi6n0GEguH3FDWF15kc0Wo6Wm4qSMWt0K9EM_ljZQzghdoc6hS2otGSv1gj1kkZMv1pWvQgiB7q7VykWYn6zX5qluh3viIVHHy2LPkaUDBQ9qekcHvO2pRJEEDNKJ-JVPvnzSpSGQ9NldPRAP6n9l75nuR8PqmV2CalzkIz45xxeV_mHkx8m3qvOEI')"}}></div>
                      <div className="w-8 h-8 rounded-full border-2 border-background-dark bg-slate-300 flex items-center justify-center text-[10px] font-bold bg-primary/20 text-primary">+45</div>
                    </div>
                    <button className="bg-primary text-background-dark px-4 py-2 rounded-lg text-sm font-bold hover:scale-105 transition-transform">Join Campaign</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="group flex flex-col rounded-2xl bg-white dark:bg-white/5 border border-primary/5 overflow-hidden hover-lift glow-hover" style={{backgroundColor: '#111827', border: '1px solid rgba(255, 255, 255, 0.06)'}}>
              <div className="relative h-56 overflow-hidden">
                <div className="absolute inset-0 bg-cover bg-center image-zoom" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBT2pQGRKrpsl6IOc6Zyj2Ha7cOkMozBrs-1mQK0G6hawkJCGu2rlmnt6FUdKMpkF2gn2I_V_MaUxMzhcDudusFZCEzp0mSULBTX07N6V7tzNA4dQhuKFXS2DOzz1nEjtHo-NpkyAS3ZzbJ5krP90NUOUBqgNMEo8AhVR7Ly5nN18-023yHk0vLD9mxIf-kdb9Dq8dW20PO4E1Zp3g9E1W6o8GRw5R2UIOKgTLQlnxnzKGl9e9ZN-nOmOhBXLslS_O5o9oTAHgbDUU')"}}></div>
                <div className="absolute inset-0" style={{background: 'linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.45) 100%)'}}></div>
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="bg-primary/90 text-background-dark text-[10px] font-bold px-2 py-1 rounded-md uppercase">Upcoming</span>
                  <span className="bg-green-500/90 text-white text-[10px] font-bold px-2 py-1 rounded-md uppercase">Eco Friendly</span>
                </div>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">Bike to Happiness</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 line-clamp-2">Join us for a scenic bike ride promoting physical health and sustainable transportation across the city.</p>
                <div className="mt-auto space-y-4">
                  <div className="flex items-center gap-3 text-sm text-slate-400">
                    <span className="material-symbols-outlined text-primary text-lg">schedule</span>
                    <span>07:30 AM • Sat, Oct 31</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-400">
                    <span className="material-symbols-outlined text-primary text-lg">location_on</span>
                    <span>Riverfront Trail</span>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-primary/10">
                    <div className="flex -space-x-2">
                      <div className="w-8 h-8 rounded-full border-2 border-background-dark bg-slate-300 bg-cover bg-center" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCE44Qo16DGPlLp6nYZwomzAri-mA2LBfBv2au_H-z6vj8-ou_D4RhUhIe2qeIMQebgD-p6CW9KzLknhS3W3mGHU3sv5N6rkaOQrKhsc5YuY-pJAid5S_Eqns7-vS-7LfB9HpPH0JTEf48iVrBo9EB9VYr9_wurfdmG5JO16jjs8M9r1aEkY7ySWZFAHK5MBG329Z-uDtzW_L_18W8vO3LPOWdCD5--Z1L_xx__d7Q3BhJZXfxZd6vMWBvVyrEAMayHGGNGKvYAJeg')"}}></div>
                      <div className="w-8 h-8 rounded-full border-2 border-background-dark bg-slate-300 bg-cover bg-center" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA4bSf8CzuOwnP0gMHbTsyDA-9o1qcGbzD0jdayO4jG5tlhl6qxWNdyJghrba2WqrpLwAsXyuJpNQFb-bv_D4Q8zJiBeCXTWIG1RNFN0ET2Y1YTF7iXObJ3gn5rDaRVFWNn85Vaw_nA1iBuvm3esrJOv48McARib-fQ0b4Gv8iWSbTGwVEFVLX1G296usptUzuQgZES35KvLNhvqeEcFO89Wmx3C5OkJT1W-qULj00be-b7XswRBcG8GpZaJAB-0KJCX2w8oDHT2nc')"}}></div>
                      <div className="w-8 h-8 rounded-full border-2 border-background-dark bg-slate-300 flex items-center justify-center text-[10px] font-bold bg-primary/20 text-primary">+108</div>
                    </div>
                    <button className="bg-primary text-background-dark px-4 py-2 rounded-lg text-sm font-bold hover:scale-105 transition-transform">Join Campaign</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 4 - Mindful Mornings */}
            <div className="group flex flex-col rounded-2xl bg-white dark:bg-white/5 border border-primary/5 overflow-hidden hover-lift glow-hover" style={{backgroundColor: '#111827', border: '1px solid rgba(255, 255, 255, 0.06)'}}>
              <div className="relative h-56 overflow-hidden">
                <div className="absolute inset-0 bg-cover bg-center image-zoom" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCYtynxd5t4FQSXFseaARMiXOiNQUfDJFL4C6_fC-gU38Tfi2oGbyAWqaGz7s0gfhRpvjVEXSULDxtAiMkgt86WX6j1ohlrUHWtgSaN8Eo24BL9-4X4oNNHMzF-k6PgaHfjiNOT7CtcsYfAhb7OdOPX-GbR0fjk00r9BdyaI-SVIH5SY32Qly5QWQnXHrLMs4-RyvTGp9ZMvWpLY62PXl4WtCMFELSA-MTAhYZVDBruKAODKrs2ZIEVTE5c4Fb2yzieY0HJTzNLQpo')"}}></div>
                <div className="absolute inset-0" style={{background: 'linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.45) 100%)'}}></div>
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="bg-primary/90 text-background-dark text-[10px] font-bold px-2 py-1 rounded-md uppercase">Upcoming</span>
                </div>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">Mindful Mornings</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 line-clamp-2">Start your day with meditation and gentle yoga sessions designed to foster inner peace and mental clarity.</p>
                <div className="mt-auto space-y-4">
                  <div className="flex items-center gap-3 text-sm text-slate-400">
                    <span className="material-symbols-outlined text-primary text-lg">schedule</span>
                    <span>06:00 AM • Every Tuesday</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-400">
                    <span className="material-symbols-outlined text-primary text-lg">location_on</span>
                    <span>Botanical Gardens</span>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-primary/10">
                    <div className="flex -space-x-2">
                      <div className="w-8 h-8 rounded-full border-2 border-background-dark bg-slate-300 bg-cover bg-center" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBS2LVHxHRZVWFf9X8uP9nXILYAplEVDnMsn-xY7qkPMxNx_C9bPslG7MTa5saRLm_Cn0RIjvgUre03iFNQVag4i_e9rs7Np760-0mBwZZ2aNuT4D_6Hs4sV0GJJ-tjIgOqMOFRkSWPjx1MavF7DjlM5WJ2Pd5OpN2oisRK1psUo_zAjkYanxnoxPOiWBxsm9c9tSi-YcWIR4NEKx8ZmLHoturXMAWZNk-1mGQDS-_Lu2CWARr4sFrS248harJjr9eY8kFArrQSFno')"}}></div>
                      <div className="w-8 h-8 rounded-full border-2 border-background-dark bg-slate-300 flex items-center justify-center text-[10px] font-bold bg-primary/20 text-primary">+89</div>
                    </div>
                    <button className="bg-primary text-background-dark px-4 py-2 rounded-lg text-sm font-bold hover:scale-105 transition-transform">Join Campaign</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 5 - Street Art & Beats */}
            <div className="group flex flex-col rounded-2xl bg-white dark:bg-white/5 border border-primary/5 overflow-hidden hover-lift glow-hover" style={{backgroundColor: '#111827', border: '1px solid rgba(255, 255, 255, 0.06)'}}>
              <div className="relative h-56 overflow-hidden">
                <div className="absolute inset-0 bg-cover bg-center image-zoom" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDN3p3nQLoGKuFL8zxNHSrqXdBeXhY4PZw9dE8LMk7KLhRPUGkvmXWgcXwAzq2AKPqjNBefrcw_B8_foM69gXi8KOAlmKwR8M-YRShJZOI3l6H2dfHeEB7fCoInKhHzEV_zPc6C0rM73vTW2IQrsyzg9dJKW8JDv-Lq0WYe7iTMnHx3FgJj8FFzi_9tZFSV6T6blFbL-ktHUBC9jdDgyo8bEwmKOF78_nc5zFhI2IucRw3VtL7eOlHzYCFz9ED8g0f0himyv6WWd_4')"}}></div>
                <div className="absolute inset-0" style={{background: 'linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.45) 100%)'}}></div>
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="bg-primary/90 text-background-dark text-[10px] font-bold px-2 py-1 rounded-md uppercase">Upcoming</span>
                </div>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">Street Art &amp; Beats</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 line-clamp-2">Celebrating local artists and musicians in a day-long festival of creativity and live performances.</p>
                <div className="mt-auto space-y-4">
                  <div className="flex items-center gap-3 text-sm text-slate-400">
                    <span className="material-symbols-outlined text-primary text-lg">schedule</span>
                    <span>02:00 PM • Nov 05</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-400">
                    <span className="material-symbols-outlined text-primary text-lg">location_on</span>
                    <span>Arts District Square</span>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-primary/10">
                    <div className="flex -space-x-2">
                      <div className="w-8 h-8 rounded-full border-2 border-background-dark bg-slate-300 bg-cover bg-center" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDAIQAWyRu0krz8-4xDd0Yh1-D2k2AUGLD55zkmtN8DQq0PfLX_VCDQD-IwG7y0zGG9pPe1LwCjzucWLUypTnmK8CCnQ9huZUilJry-ryvbDzKNXqiXS-XXkODJUSbUTx3kFERNflNpPqaXgwuLmlGXXworU2Cyj2rWupGS8eJ2lncfYW57G8aT9jmd8szSrMN46cT2F_itEx6l7psfS--DKUJYi3NGtherLQeoIxaBlpnn69IZbNasuaL9micjiFeKtWgZpqjesMw')"}}></div>
                      <div className="w-8 h-8 rounded-full border-2 border-background-dark bg-slate-300 flex items-center justify-center text-[10px] font-bold bg-primary/20 text-primary">+215</div>
                    </div>
                    <button className="bg-primary text-background-dark px-4 py-2 rounded-lg text-sm font-bold hover:scale-105 transition-transform">Join Campaign</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 6 - Paws & Claws Drive */}
            <div className="group flex flex-col rounded-2xl bg-white dark:bg-white/5 border border-primary/5 overflow-hidden hover-lift glow-hover" style={{backgroundColor: '#111827', border: '1px solid rgba(255, 255, 255, 0.06)'}}>
              <div className="relative h-56 overflow-hidden">
                <div className="absolute inset-0 bg-cover bg-center image-zoom" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCuEZwcJoq6DG_SF-J2HCDvH9Vc_Knx1q4tODbV3g5zje-I2RphK6BhzoS9RQZg948_6a6sndutNB-QuzS4wrYpH1e_r9_qDkHjBJRVwVlbrXBOfrTaO__wxGIBTr3wbBPdunbNUP17vqovm4rg5v36xxEJ7jkXbBntXA18tKdQOshno6Et-HgTdeDlea1La4pVkbfWU12Mu2pB-BKofZyl3QOUfy5qEcGwgpLGGwEuw4Na6kzvbwAn5oR9rMdNbeYjZTxxX9tOmRo')"}}></div>
                <div className="absolute inset-0" style={{background: 'linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.45) 100%)'}}></div>
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="bg-blue-500/90 text-white text-[10px] font-bold px-2 py-1 rounded-md uppercase">Donation</span>
                </div>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">Paws &amp; Claws Drive</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 line-clamp-2">Supporting local animal shelters with food, supplies, and volunteer time for our furry friends.</p>
                <div className="mt-auto space-y-4">
                  <div className="flex items-center gap-3 text-sm text-slate-400">
                    <span className="material-symbols-outlined text-primary text-lg">schedule</span>
                    <span>11:00 AM • Sat, Nov 12</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-400">
                    <span className="material-symbols-outlined text-primary text-lg">location_on</span>
                    <span>Westside Pet Center</span>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-primary/10">
                    <div className="flex -space-x-2">
                      <div className="w-8 h-8 rounded-full border-2 border-background-dark bg-slate-300 bg-cover bg-center" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBaGxFYJqcB85SF_qCpblFHSSHThJHhuN9Td55I1KhMVhIcBJDIWIh6o5sVzquarZd3aNW4pnJUvYwKiBwUueiNYvNPSqFG3XZR0di3aM0uKqkBn78LkzjB_ZXfsWZHgGuXeBN4sUnEx-LZcua3MNkbCqIRUM8UrHfs0RyiKsu1VZUp7iqIGbkaCuF46dsiw7GcuTz4SP4kphvDEoqJU3yNjFJrq-6jw1kGOlQQeGQMxLzFI0mf94BalPjeR8xB0YG9-XsX7OeyW24')"}}></div>
                      <div className="w-8 h-8 rounded-full border-2 border-background-dark bg-slate-300 flex items-center justify-center text-[10px] font-bold bg-primary/20 text-primary">+56</div>
                    </div>
                    <button className="bg-primary text-background-dark px-4 py-2 rounded-lg text-sm font-bold hover:scale-105 transition-transform">Join Campaign</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Pagination */}
          <div className="mt-16 flex items-center justify-center gap-4">
            <button className="w-10 h-10 rounded-lg flex items-center justify-center bg-white/5 border border-primary/10 hover:bg-primary/20 transition-colors">
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <div className="flex gap-2">
              <button className="w-10 h-10 rounded-lg flex items-center justify-center bg-primary text-background-dark font-bold">1</button>
              <button className="w-10 h-10 rounded-lg flex items-center justify-center bg-white/5 border border-primary/10 hover:bg-primary/20 transition-colors">2</button>
              <button className="w-10 h-10 rounded-lg flex items-center justify-center bg-white/5 border border-primary/10 hover:bg-primary/20 transition-colors">3</button>
            </div>
            <button className="w-10 h-10 rounded-lg flex items-center justify-center bg-white/5 border border-primary/10 hover:bg-primary/20 transition-colors">
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </main>

        {/* Footer */}
        <footer className="mt-auto border-t border-primary/10 py-12 px-6 lg:px-40 bg-white/5">
          <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-2 space-y-4" style={{backgroundColor: '#111827', border: '1px solid rgba(255, 255, 255, 0.06)'}}>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary rounded-lg text-background-dark">
                  <span className="material-symbols-outlined block">sentiment_satisfied</span>
                </div>
                <h2 className="text-xl font-bold tracking-tight">Happiness Campaign</h2>
              </div>
              <p className="text-slate-400 max-w-sm">A global movement dedicated to bringing people together through simple acts of kindness and sustainable community projects.</p>
            </div>
            <div className="space-y-4" style={{backgroundColor: '#111827', border: '1px solid rgba(255, 255, 255, 0.06)'}}>
              <h4 className="font-bold">Quick Links</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><span className="hover:text-primary transition-colors cursor-pointer">How it works</span></li>
                <li><Link className="hover:text-primary transition-colors" to="/tracker">Live Map</Link></li>
                <li><span className="hover:text-primary transition-colors cursor-pointer">Get Involved</span></li>
                <li><span className="hover:text-primary transition-colors cursor-pointer">Success Stories</span></li>
              </ul>
            </div>
            <div className="space-y-4" style={{backgroundColor: '#111827', border: '1px solid rgba(255, 255, 255, 0.06)'}}>
              <h4 className="font-bold">Contact</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a className="hover:text-primary transition-colors" href="mailto:support@happiness.org">support@happiness.org</a></li>
                <li><span className="hover:text-primary transition-colors cursor-pointer">Twitter</span></li>
                <li><span className="hover:text-primary transition-colors cursor-pointer">Instagram</span></li>
              </ul>
            </div>
          </div>
          <div className="max-w-[1200px] mx-auto mt-12 pt-8 border-t border-primary/5 flex flex-col md:flex-row justify-between gap-4 text-xs text-slate-500">
            <p>© 2023 Happiness Campaign. Spread Joy.</p>
            <div className="flex gap-6">
              <span className="hover:text-primary transition-colors cursor-pointer">Privacy Policy</span>
              <span className="hover:text-primary transition-colors cursor-pointer">Terms of Service</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default CampaignsPage;
