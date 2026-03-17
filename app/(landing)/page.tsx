import { LandingNavbar } from "./components/LandingNavbar";
import { HeroSection } from "./components/HeroSection";
import { FeatureSection } from "./components/FeatureSection";
import { CTASection } from "./components/CTASection";
import { Footer } from "./components/Footer";
import { LandingClient } from "./LandingClient";

export default function LandingPage() {
  return (
    <LandingClient>
      <LandingNavbar />

      {/* Hero Section */}
      <HeroSection />

      {/* About Section */}
      <section id="about" className="py-16 md:py-24 px-4 bg-background">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-6 rounded-full bg-primary/40" />
            <h2 className="text-xs font-bold uppercase tracking-widest text-primary">
              Tentang Aplikasi / About
            </h2>
          </div>

          <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-foreground mb-6 leading-tight">
            Mengapa Productivity Tools?
            <br />
            <span className="text-foreground-secondary">Why Choose Us?</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mt-12">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-primary" />
                Dirancang untuk Anda
              </h3>
              <p className="text-foreground-secondary leading-relaxed">
                Aplikasi ini dirancang dengan fokus pada pengalaman pengguna yang sempurna. Setiap fitur dibuat untuk membantu Anda mengelola waktu dan tugas dengan lebih efisien.
              </p>

              <h3 className="text-lg font-semibold text-foreground flex items-center gap-3 pt-4">
                <span className="w-2 h-2 rounded-full bg-success" />
                Fitur Lengkap
              </h3>
              <p className="text-foreground-secondary leading-relaxed">
                Dari timer fokus hingga analitik mendalam, kami menyediakan semua tools yang Anda butuhkan dalam satu platform terintegrasi.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-warning" />
                Ramah Pengguna
              </h3>
              <p className="text-foreground-secondary leading-relaxed">
                Interface yang intuitif membuat Anda bisa mulai langsung tanpa kurva pembelajaran yang curam. Pelajari saat Anda menggunakan.
              </p>

              <h3 className="text-lg font-semibold text-foreground flex items-center gap-3 pt-4">
                <span className="w-2 h-2 rounded-full bg-primary" />
                Aman &amp; Privat
              </h3>
              <p className="text-foreground-secondary leading-relaxed">
                Data Anda adalah prioritas kami. Semua informasi disimpan aman dan tidak pernah dibagikan ke pihak ketiga.
              </p>
            </div>
          </div>

          {/* Divider */}
          <div
            className="h-px my-12"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, var(--border) 50%, transparent 100%)",
              opacity: 0.4,
            }}
          />

          {/* English Version */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-primary" />
                Built for You
              </h3>
              <p className="text-foreground-secondary leading-relaxed">
                This app is designed with a focus on perfect user experience. Every feature is made to help you manage your time and tasks more efficiently.
              </p>

              <h3 className="text-lg font-semibold text-foreground flex items-center gap-3 pt-4">
                <span className="w-2 h-2 rounded-full bg-success" />
                Complete Features
              </h3>
              <p className="text-foreground-secondary leading-relaxed">
                From focus timers to in-depth analytics, we provide all the tools you need in one integrated platform.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-warning" />
                User-Friendly
              </h3>
              <p className="text-foreground-secondary leading-relaxed">
                Intuitive interface means you can start right away without a steep learning curve. Learn as you go.
              </p>

              <h3 className="text-lg font-semibold text-foreground flex items-center gap-3 pt-4">
                <span className="w-2 h-2 rounded-full bg-primary" />
                Safe &amp; Secure
              </h3>
              <p className="text-foreground-secondary leading-relaxed">
                Your data is our priority. All information is stored securely and never shared with third parties.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <FeatureSection />

      {/* CTA Section */}
      <CTASection />

      {/* Footer */}
      <Footer />
    </LandingClient>
  );
}
