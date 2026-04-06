import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { 
  Menu, X, Github, Mail, Phone, Download, ChevronRight, 
  Database, BarChart3, Cpu, Globe, Code2, Layers, 
  ExternalLink, Award, Terminal, Workflow, CheckCircle2,
  ArrowRight, Linkedin
} from 'lucide-react';
import { cn } from './lib/utils';

// --- Types ---

interface Repo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  language: string;
  topics: string[];
}

// --- Components ---

const TypingEffect = ({ texts }: { texts: string[] }) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [blink, setBlink] = useState(true);

  // typeWriter
  useEffect(() => {
    if (subIndex === texts[index].length + 1 && !reverse) {
      setReverse(true);
      return;
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % texts.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, Math.max(reverse ? 75 : subIndex === texts[index].length ? 1000 : 150, Math.random() * 350));

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, texts]);

  // blinker
  useEffect(() => {
    const timeout2 = setTimeout(() => {
      setBlink((prev) => !prev);
    }, 500);
    return () => clearTimeout(timeout2);
  }, [blink]);

  return (
    <span className="font-mono text-gold">
      {`${texts[index].substring(0, subIndex)}${blink ? "|" : " "}`}
    </span>
  );
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Skills', href: '#skills' },
    { name: 'Certs', href: '#certs' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={cn(
      "fixed top-0 w-full z-50 transition-all duration-300",
      isScrolled ? "glass-nav py-3" : "bg-transparent py-6"
    )}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#home" className="text-2xl font-bold tracking-tighter flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-full gold-gradient flex items-center justify-center group-hover:scale-110 transition-transform">
            <Terminal size={16} className="text-black" />
          </div>
          <span className="gold-text-gradient">WICKLIFF</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-xs font-bold uppercase tracking-widest text-text-secondary hover:text-gold transition-colors"
            >
              {link.name}
            </a>
          ))}
          <a 
            href="/Wickliff_CV.pdf"
            download
            className="px-5 py-2 rounded-full gold-gradient text-black font-bold text-xs hover:opacity-90 transition-opacity flex items-center gap-2"
          >
            <Download size={14} />
            CV
          </a>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-text-primary" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-card border-b border-white/5 p-6 flex flex-col gap-4 md:hidden"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-bold uppercase tracking-widest text-text-secondary"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <a 
              href="/Wickliff_CV.pdf"
              download
              className="w-full py-3 rounded-xl gold-gradient text-black font-bold flex items-center justify-center gap-2"
            >
              <Download size={18} />
              Download CV
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 px-6 overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-gold/5 blur-[120px] rounded-full" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-orange/5 blur-[120px] rounded-full" />

      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/20 text-gold text-[10px] font-bold mb-6 tracking-widest uppercase">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-gold"></span>
            </span>
            Available for Opportunities
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight tracking-tighter">
            I'm <span className="gold-text-gradient">Wickliff</span>
          </h1>
          
          <div className="text-xl md:text-2xl font-medium text-text-secondary mb-8 h-8">
            <TypingEffect texts={["Data Analyst", "Data Engineer", "Junior ML Engineer"]} />
          </div>

          <p className="text-lg text-text-secondary mb-10 max-w-lg leading-relaxed">
            Sharp-minded openness focused on building scalable data infrastructure. I specialize in transforming raw data into actionable intelligence through robust ETL pipelines and predictive models.
          </p>

          <div className="flex flex-wrap gap-4">
            <a href="#projects" className="px-8 py-4 rounded-xl gold-gradient text-black font-bold hover:opacity-90 transition-all flex items-center gap-2 shadow-lg shadow-gold/10">
              View Projects <ChevronRight size={20} />
            </a>
            <a href="#contact" className="px-8 py-4 rounded-xl border border-white/10 bg-white/5 font-bold hover:bg-white/10 transition-all">
              Contact Me
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative flex justify-center lg:justify-end"
        >
          <div className="relative w-72 h-72 md:w-96 md:h-96">
            {/* Profile Placeholder */}
            <div className="absolute inset-0 rounded-full border-2 border-gold/20 p-4 animate-[spin_20s_linear_infinite]">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-gold rounded-full blur-sm" />
            </div>
            <div className="absolute inset-4 rounded-full border border-white/10 bg-card overflow-hidden flex items-center justify-center group">
              <div className="absolute inset-0 bg-gradient-to-br from-gold/20 to-transparent opacity-50 group-hover:opacity-70 transition-opacity" />
              <Database size={120} className="text-gold/20 group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute bottom-10 text-center">
                <p className="text-[10px] font-mono text-gold/40 tracking-widest uppercase">System_Status</p>
                <p className="text-xs font-mono text-gold/60">OPTIMIZED</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const SkillsMarquee = () => {
  const skills = [
    "SQL", "Python", "Pandas", "Scikit-learn", "NumPy", "Scipy", 
    "dbt", "Apache Airflow", "MongoDB", "Power BI", "Tableau",
    "FastAPI", "Streamlit", "Docker", "Linux", "Git"
  ];

  return (
    <div className="py-12 bg-card/30 border-y border-white/5 overflow-hidden">
      <div className="animate-marquee">
        {[...skills, ...skills].map((skill, idx) => (
          <div key={idx} className="flex items-center gap-4 px-8">
            <div className="w-2 h-2 rounded-full bg-gold/50" />
            <span className="text-xl md:text-2xl font-bold text-text-secondary/50 hover:text-gold transition-colors cursor-default whitespace-nowrap">
              {skill}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const DataWorkflow = () => {
  const steps = [
    { name: "Collection", icon: <Layers size={20} />, desc: "Ingesting raw data from APIs, DBs, and IoT sensors." },
    { name: "Cleaning", icon: <CheckCircle2 size={20} />, desc: "Removing noise and ensuring data integrity." },
    { name: "Transformation", icon: <Cpu size={20} />, desc: "Modeling data for analytical readiness using dbt." },
    { name: "Storage", icon: <Database size={20} />, desc: "Scalable warehousing in BigQuery or PostgreSQL." },
    { name: "Analysis", icon: <BarChart3 size={20} />, desc: "Extracting patterns with Pandas & Scikit-learn." },
    { name: "Visualization", icon: <Globe size={20} />, desc: "Communicating insights via Power BI & Tableau." }
  ];

  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Data <span className="gold-text-gradient">Workflow</span></h2>
          <p className="text-text-secondary max-w-2xl mx-auto">My systematic approach to engineering high-performance data pipelines.</p>
        </div>

        <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
          {steps.map((step, idx) => (
            <motion.div
              key={step.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="relative p-6 rounded-2xl bg-card border border-white/5 thin-gold-border group"
            >
              <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center mb-4 group-hover:gold-gradient group-hover:text-black transition-all">
                {step.icon}
              </div>
              <h3 className="font-bold text-sm mb-2">{step.name}</h3>
              <p className="text-[10px] text-text-secondary leading-relaxed">{step.desc}</p>
              
              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-2 translate-x-1/2 -translate-y-1/2 z-10 text-gold/20">
                  <ArrowRight size={16} />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Certifications = () => {
  const certs = [
    { provider: "DataCamp", name: "SQL Certification", icon: <Award className="text-gold" /> },
    { provider: "DataCamp", name: "Data Analytics", icon: <Award className="text-gold" /> },
    { provider: "DataCamp", name: "ETL/ELT Python", icon: <Award className="text-gold" /> },
    { provider: "DataCamp", name: "Data Warehousing", icon: <Award className="text-gold" /> },
    { provider: "Cisco", name: "Data Essentials", icon: <Globe className="text-gold" /> },
    { provider: "ML Focus", name: "XGBoost & Random Forest", icon: <Cpu className="text-gold" /> },
    { provider: "ML Focus", name: "Supervised Learning", icon: <CheckCircle2 className="text-gold" /> },
    { provider: "ML Focus", name: "Unsupervised Learning", icon: <Layers className="text-gold" /> }
  ];

  return (
    <section id="certs" className="py-24 px-6 bg-card/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Professional <span className="gold-text-gradient">Certifications</span></h2>
          <p className="text-text-secondary max-w-2xl mx-auto">Validated expertise in data engineering and machine learning.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {certs.map((cert, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="p-6 rounded-2xl bg-card border border-white/5 thin-gold-border flex items-start gap-4"
            >
              <div className="mt-1">{cert.icon}</div>
              <div>
                <p className="text-[10px] font-bold text-gold uppercase tracking-wider mb-1">{cert.provider}</p>
                <h3 className="text-sm font-bold">{cert.name}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Projects = () => {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch('https://api.github.com/users/Wickliffo/repos?sort=updated&per_page=10');
        const data = await response.json();
        // Filter top 4 (excluding forks if possible, or just first 4)
        setRepos(data.slice(0, 4));
      } catch (error) {
        console.error("Error fetching repos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRepos();
  }, []);

  const getProblem = (name: string) => {
    const n = name.toLowerCase();
    if (n.includes('etl') || n.includes('pipeline')) return "Inefficient manual data ingestion causing reporting delays.";
    if (n.includes('ml') || n.includes('predict')) return "Lack of predictive insights for customer behavior optimization.";
    if (n.includes('dashboard') || n.includes('viz')) return "Fragmented data silos preventing unified business visibility.";
    return "Scalability bottlenecks in existing data infrastructure.";
  };

  const getSolution = (name: string) => {
    return `Architected a robust solution using Python and SQL to automate workflows and enhance data reliability.`;
  };

  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Dynamic <span className="gold-text-gradient">Projects</span></h2>
            <p className="text-text-secondary max-w-xl">Live data pulled directly from my GitHub repository engine.</p>
          </div>
          <a href="https://github.com/Wickliffo" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gold font-bold hover:underline">
            View GitHub <Github size={20} />
          </a>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {loading ? (
            [1, 2, 3, 4].map(i => (
              <div key={i} className="h-64 rounded-3xl bg-card animate-pulse border border-white/5" />
            ))
          ) : (
            repos.map((repo, idx) => (
              <motion.div
                key={repo.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group relative p-8 rounded-3xl bg-card border border-white/5 thin-gold-border overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:opacity-100 transition-opacity">
                  <ExternalLink size={20} className="text-gold" />
                </div>
                
                <h3 className="text-2xl font-bold mb-4 group-hover:text-gold transition-colors">{repo.name.replace(/-/g, ' ')}</h3>
                
                <div className="space-y-4 mb-8">
                  <div>
                    <p className="text-[10px] font-bold text-gold uppercase tracking-wider mb-1">Problem</p>
                    <p className="text-sm text-text-secondary">{getProblem(repo.name)}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gold uppercase tracking-wider mb-1">Solution</p>
                    <p className="text-sm text-text-secondary">{getSolution(repo.name)}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {repo.language && (
                    <span className="px-3 py-1 rounded-full bg-gold/10 text-[10px] font-bold text-gold border border-gold/20">
                      {repo.language}
                    </span>
                  )}
                  {repo.topics?.slice(0, 3).map(topic => (
                    <span key={topic} className="px-3 py-1 rounded-full bg-white/5 text-[10px] font-bold text-text-secondary border border-white/10">
                      {topic}
                    </span>
                  ))}
                </div>

                <a 
                  href={repo.html_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="absolute inset-0 z-10"
                />
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-24 px-6 bg-card/30">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-8">Let's Build the <span className="gold-text-gradient">Future of Data</span></h2>
          <p className="text-lg text-text-secondary mb-12 leading-relaxed">
            I'm always looking for challenging projects and collaborative teams. Whether you have a question or just want to say hi, my inbox is always open.
          </p>
          
          <div className="grid sm:grid-cols-2 gap-6 mb-12">
            <a href="mailto:orinawicklff@gmail.com" className="p-8 rounded-3xl bg-card border border-white/5 thin-gold-border group flex flex-col items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gold/10 flex items-center justify-center group-hover:gold-gradient group-hover:text-black transition-all">
                <Mail size={28} />
              </div>
              <div>
                <p className="text-xs text-text-secondary font-bold uppercase tracking-widest mb-1">Email</p>
                <p className="text-lg font-bold">orinawicklff@gmail.com</p>
              </div>
            </a>
            <a href="tel:+254110062168" className="p-8 rounded-3xl bg-card border border-white/5 thin-gold-border group flex flex-col items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gold/10 flex items-center justify-center group-hover:gold-gradient group-hover:text-black transition-all">
                <Phone size={28} />
              </div>
              <div>
                <p className="text-xs text-text-secondary font-bold uppercase tracking-widest mb-1">Phone</p>
                <p className="text-lg font-bold">+254110062168</p>
              </div>
            </a>
          </div>

          <div className="flex justify-center gap-6">
            <a href="https://github.com/Wickliffo" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:text-gold hover:border-gold transition-all">
              <Github size={24} />
            </a>
            <a href="#" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:text-gold hover:border-gold transition-all">
              <Linkedin size={24} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-12 px-6 border-t border-white/5 text-center">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-sm text-text-secondary">
          © {new Date().getFullYear()} <span className="text-gold font-bold">Wickliff Orina</span>. Built with Precision.
        </p>
        <div className="flex gap-8">
          <a href="#home" className="text-xs font-bold uppercase tracking-widest text-text-secondary hover:text-gold transition-colors">Home</a>
          <a href="#projects" className="text-xs font-bold uppercase tracking-widest text-text-secondary hover:text-gold transition-colors">Projects</a>
          <a href="#contact" className="text-xs font-bold uppercase tracking-widest text-text-secondary hover:text-gold transition-colors">Contact</a>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="min-h-screen selection:bg-gold selection:text-black">
      <Navbar />
      <main>
        <Hero />
        <SkillsMarquee />
        <DataWorkflow />
        <Certifications />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
