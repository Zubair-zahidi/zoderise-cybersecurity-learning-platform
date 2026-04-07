import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Shield, BookOpen, Zap, Terminal, Server, Lock, Award, Code } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-primary text-text">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(0,168,204,0.18),transparent_20%),radial-gradient(circle_at_bottom_right,_rgba(45,106,79,0.16),transparent_24%)]" />
      <div className="absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),transparent_40%)]" />
      <div className="relative z-10">
        <header className="max-w-7xl mx-auto flex flex-col gap-4 px-6 py-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-secondary border border-border text-accent shadow-panel">
              <Shield className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.33em] text-muted">Zoderise Academy</p>
              <h1 className="text-2xl font-semibold tracking-tight">Cybersecurity learning built for professionals.</h1>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/login" className="rounded-full border border-border bg-secondary px-5 py-2 text-sm text-muted transition hover:border-accent hover:text-text focus-ring">
              Log in
            </Link>
            <Link to="/register" className="rounded-full bg-accent px-5 py-2 text-sm font-semibold text-primary transition hover:bg-[#0093b3] focus-ring">
              Start free trial
            </Link>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-6 pb-24">
          <section className="glass-card rounded-[24px] border border-border p-10 shadow-panel">
            <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
              <div className="space-y-8">
                <div className="inline-flex items-center gap-3 rounded-full border border-accent/20 bg-accent/10 px-4 py-2 text-sm text-accent">
                  <Zap className="h-4 w-4" />
                  Advanced cybersecurity curriculum — from fundamentals to adversary simulation
                </div>
                <div className="space-y-4">
                  <h2 className="text-5xl font-semibold leading-tight">Deep, credible cybersecurity training without the gimmicks.</h2>
                  <p className="max-w-2xl text-muted">A mature platform for learners who want a polished, operationally credible experience—built around secure workflows, real-world concepts, and modern dark UI.</p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Link to="/register" className="inline-flex items-center justify-center rounded-full bg-accent px-8 py-3 text-sm font-semibold text-primary transition hover:bg-[#0093b3] focus-ring">
                    Start learning now
                  </Link>
                  <a href="#features" className="inline-flex items-center justify-center rounded-full border border-border bg-secondary px-8 py-3 text-sm text-muted transition hover:border-accent hover:text-text focus-ring">
                    Explore the curriculum
                  </a>
                </div>
              </div>

              <div className="space-y-6 rounded-[24px] bg-[#111118] p-8 shadow-panel">
                <div className="rounded-3xl border border-border bg-[#15161c] p-6">
                  <p className="text-sm uppercase tracking-[0.3em] text-muted">Platform snapshot</p>
                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    <Badge label="200 lessons" value="Complete coverage" />
                    <Badge label="300+ quizzes" value="Practice mastery" />
                    <Badge label="Real labs" value="Operational workflows" />
                    <Badge label="Trusted" value="Senior-focused design" />
                  </div>
                </div>
                <div className="rounded-3xl border border-border bg-secondary p-6">
                  <p className="text-sm uppercase tracking-[0.3em] text-muted">Why it stands out</p>
                  <ul className="mt-4 space-y-3 text-sm text-muted">
                    <li>• Dark SOC-inspired interface with glassmorphism.</li>
                    <li>• Clean information hierarchy for security learners.</li>
                    <li>• Fast access to lessons, tasks, and quizzes.</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section id="features" className="mt-16">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.32em] text-muted">Program features</p>
                <h3 className="mt-3 text-3xl font-semibold">Designed for serious cybersecurity learners.</h3>
              </div>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              <FeatureCard icon={BookOpen} title="Structured learning" desc="Clear modules, polished layouts, and a focused progression path." />
              <FeatureCard icon={Terminal} title="Hands-on labs" desc="Real tool demonstrations and practical security exercises." />
              <FeatureCard icon={Code} title="Expert-level material" desc="Security concepts explained with modern, professional clarity." />
              <FeatureCard icon={Server} title="Threat modeling" desc="Build awareness for attacker techniques, detection, and defense." />
              <FeatureCard icon={Lock} title="Phishing detection" desc="Learn to recognize real phishing risks and social engineering techniques." />
              <FeatureCard icon={Award} title="Career-ready" desc="Practice with exercises aligned to cyber roles and industry standards." />
            </div>
          </section>

          <footer className="mt-16 border-t border-border pt-6 text-center text-sm text-muted">
            Developed by Ahmad Zubair Zahidi
          </footer>
        </main>
      </div>
    </div>
  );
};

const Badge = ({ label, value }) => (
  <div className="rounded-3xl border border-border bg-primary p-4">
    <p className="text-xs uppercase tracking-[0.28em] text-muted">{label}</p>
    <p className="mt-3 text-sm font-semibold text-text">{value}</p>
  </div>
);

const FeatureCard = ({ icon: Icon, title, desc }) => (
  <div className="glass-card rounded-[24px] border-border p-6 transition duration-200 hover:border-accent/70 hover:-translate-y-1">
    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#111118] text-accent shadow-panel mb-5">
      <Icon className="h-6 w-6" />
    </div>
    <h3 className="text-xl font-semibold text-text mb-3">{title}</h3>
    <p className="text-muted text-sm leading-relaxed">{desc}</p>
  </div>
);

export default LandingPage;