import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, X, Github, Mail, Phone, Download, ChevronRight, 
  Database, BarChart3, Cpu, Globe, Layers, 
  ExternalLink, Award, Terminal, CheckCircle2,
  ArrowRight, Linkedin, Code2, Workflow
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
    { name: 'Workflow', href: '#workflow' },
    { name: 'Projects', href: '#projects' },
    { name: 'Certs', href: '#certs' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={cn(
      "fixed top-0 w-full z-50 transition-all duration-300 no-print",
      isScrolled ? "glass-nav py-3" : "bg-transparent py-6"
    )}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#home" className="text-2xl font-display font-extrabold tracking-tighter flex items-center gap-2 group">
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
          <button 
            onClick={() => window.print()}
            className="px-5 py-2 rounded-full gold-gradient text-black font-bold text-xs hover:opacity-90 transition-opacity flex items-center gap-2"
          >
            <Download size={14} />
            Download CV
          </button>
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
            <button 
              onClick={() => {
                window.print();
                setIsMobileMenuOpen(false);
              }}
              className="w-full py-3 rounded-xl gold-gradient text-black font-bold flex items-center justify-center gap-2"
            >
              <Download size={18} />
              Download CV
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 px-6 overflow-hidden no-print">
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
            Sharp-minded Openness
          </div>
          
          <h1 className="text-7xl md:text-9xl font-display font-extrabold mb-6 leading-tight tracking-tighter">
            I'm <span className="gold-text-gradient">Wickliff</span>
          </h1>
          
          <div className="text-xl md:text-2xl font-medium text-text-secondary mb-8 h-8">
            <TypingEffect texts={["Data Analyst", "Data Engineer", "Junior Machine Learning Engineer"]} />
          </div>

          <p className="text-lg text-text-secondary mb-10 max-w-lg leading-relaxed">
            Focused on building scalable data infrastructure and engineering value from raw information. I specialize in transforming complex datasets into actionable intelligence through robust ETL pipelines and predictive models.
          </p>

          <div className="flex flex-wrap gap-4">
            <a href="#projects" className="px-8 py-4 rounded-xl gold-gradient text-black font-bold hover:opacity-90 transition-all flex items-center gap-2 shadow-lg shadow-gold/10">
              View Case Studies <ChevronRight size={20} />
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
            {/* Stylish Circular Frame */}
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

const TechnicalDepth = () => {
  const skillCategories = [
    {
      title: "Data Engineering",
      icon: <Layers className="text-gold" />,
      skills: ["SQL (Expert)", "ETL/ELT", "Data Warehousing", "Data Modeling (Star Schema)", "dbt (Beginner)", "Airflow"]
    },
    {
      title: "Analytics & BI",
      icon: <BarChart3 className="text-gold" />,
      skills: ["Python (Pandas, NumPy)", "Power BI", "Tableau", "EDA"]
    },
    {
      title: "ML Foundations",
      icon: <Cpu className="text-gold" />,
      skills: ["Scikit-learn", "XGBoost", "Random Forest", "Model Evaluation"]
    }
  ];

  return (
    <section id="skills" className="py-24 px-6 no-print">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-extrabold mb-4 uppercase tracking-tighter">Technical <span className="gold-text-gradient">Depth</span></h2>
          <p className="text-text-secondary max-w-2xl mx-auto">Specialized skillsets grouped for engineering excellence.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {skillCategories.map((cat, idx) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-8 rounded-3xl bg-card border border-white/5 thin-gold-border group"
            >
              <div className="w-14 h-14 rounded-2xl bg-gold/10 flex items-center justify-center mb-6 group-hover:gold-gradient group-hover:text-black transition-all">
                {cat.icon}
              </div>
              <h3 className="text-xl font-display font-bold mb-6">{cat.title}</h3>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map(skill => (
                  <span key={skill} className="px-3 py-1 rounded-full bg-white/5 text-xs font-medium text-text-secondary border border-white/10 group-hover:border-gold/30 transition-colors">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ProcessFlow = () => {
  const steps = [
    { name: "Collection", icon: <Database size={20} />, desc: "Ingesting raw data from APIs, DBs, and IoT sensors." },
    { name: "Cleaning", icon: <CheckCircle2 size={20} />, desc: "Removing noise and ensuring data integrity." },
    { name: "Transformation", icon: <Cpu size={20} />, desc: "Modeling data for analytical readiness using dbt." },
    { name: "Storage", icon: <Layers size={20} />, desc: "Scalable warehousing in BigQuery or PostgreSQL." },
    { name: "Visualization", icon: <BarChart3 size={20} />, desc: "Communicating insights via Power BI & Tableau." },
    { name: "Decision Support", icon: <Globe size={20} />, desc: "Driving business value through data-driven decisions." }
  ];

  return (
    <section id="workflow" className="py-24 px-6 bg-card/30 no-print">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-extrabold mb-4 uppercase tracking-tighter">How I Work <span className="gold-text-gradient">With Data</span></h2>
          <p className="text-text-secondary max-w-2xl mx-auto">A systematic approach to engineering high-performance data pipelines.</p>
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

const Projects = () => {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);

  const manualProjects = [
    {
      title: "Sowing Success (ML)",
      problem: "Low crop yield.",
      solution: "Scikit-learn predictive model.",
      impact: "25% yield increase.",
      tech: ["Python", "Scikit-learn", "XGBoost", "Pandas"],
      icon: <Cpu className="text-gold" />
    },
    {
      title: "Kenyan Market Analytics (DE)",
      problem: "Fragmented market data.",
      solution: "PostgreSQL/dbt/Airflow pipeline.",
      impact: "Reduced latency by 80%.",
      tech: ["PostgreSQL", "dbt", "Airflow", "Python"],
      icon: <Layers className="text-gold" />
    },
    {
      title: "RetailFlux (DE)",
      problem: "Manual Walmart data processing.",
      solution: "Automated ETL.",
      impact: "90% automation.",
      tech: ["FastAPI", "MongoDB", "Python", "REST API"],
      icon: <Database className="text-gold" />
    },
    {
      title: "Swiggy Analytics (DA)",
      problem: "Fragmented delivery data.",
      solution: "Star Schema Warehouse.",
      impact: "10% delivery speed improvement.",
      tech: ["SQL", "PostgreSQL", "Data Modeling", "Tableau"],
      icon: <BarChart3 className="text-gold" />
    }
  ];

  useEffect(() => {
    fetch('https://api.github.com/users/Wickliffo/repos?sort=updated&per_page=6')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setRepos(data);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <section id="projects" className="py-24 px-6 no-print">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h2 className="text-3xl md:text-5xl font-display font-extrabold mb-4 uppercase tracking-tighter">Case <span className="gold-text-gradient">Studies</span></h2>
            <p className="text-text-secondary max-w-xl">Real-world solutions engineered for performance, scalability, and business impact.</p>
          </div>
          <a href="https://github.com/Wickliffo" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gold font-bold hover:underline">
            View GitHub <Github size={20} />
          </a>
        </div>

        {/* Manual Overrides */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {manualProjects.map((project, idx) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group relative p-8 rounded-3xl bg-card border border-white/5 thin-gold-border overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:opacity-100 transition-opacity">
                <ExternalLink size={20} className="text-gold" />
              </div>
              
              <h3 className="text-2xl font-display font-bold mb-4 group-hover:text-gold transition-colors">{project.title}</h3>
              
              <div className="space-y-4 mb-8">
                <div>
                  <p className="text-[10px] font-bold text-gold uppercase tracking-wider mb-1">Problem</p>
                  <p className="text-sm text-text-secondary">{project.problem}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gold uppercase tracking-wider mb-1">Solution</p>
                  <p className="text-sm text-text-secondary">{project.solution}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gold uppercase tracking-wider mb-1">Impact</p>
                  <p className="text-sm text-text-primary font-medium">{project.impact}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {project.tech.map(t => (
                  <span key={t} className="px-3 py-1 rounded-full bg-white/5 text-[10px] font-bold text-text-secondary border border-white/10">
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Dynamic GitHub Repos */}
        {!loading && repos.length > 0 && (
          <>
            <div className="text-center mb-12">
              <h3 className="text-xl font-display font-bold uppercase tracking-widest text-text-secondary">Recent Repositories</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {repos.map((repo, idx) => (
                <motion.a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  className="p-6 rounded-2xl bg-card/50 border border-white/5 hover:border-gold/30 transition-all group"
                >
                  <div className="flex justify-between items-start mb-4">
                    <Code2 size={20} className="text-gold/50 group-hover:text-gold transition-colors" />
                    <div className="flex items-center gap-1 text-[10px] text-text-secondary">
                      <Award size={12} /> {repo.stargazers_count}
                    </div>
                  </div>
                  <h4 className="font-bold mb-2 group-hover:text-gold transition-colors truncate">{repo.name}</h4>
                  <p className="text-[10px] text-text-secondary line-clamp-2 mb-4 h-8">{repo.description || "No description provided."}</p>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-gold" />
                    <span className="text-[10px] font-mono text-text-secondary">{repo.language || "Mixed"}</span>
                  </div>
                </motion.a>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

const Certifications = () => {
  const certs = [
    { provider: "DataCamp", name: "Data Engineer Professional", icon: <Award className="text-gold" /> },
    { provider: "DataCamp", name: "Data Engineering Track", icon: <Layers className="text-gold" /> },
    { provider: "DataCamp", name: "Data Analysis with Python", icon: <BarChart3 className="text-gold" /> },
    { provider: "Cisco", name: "Data Essentials", icon: <Globe className="text-gold" /> }
  ];

  return (
    <section id="certs" className="py-24 px-6 bg-card/30 no-print">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-extrabold mb-4 uppercase tracking-tighter">Professional <span className="gold-text-gradient">Certifications</span></h2>
          <p className="text-text-secondary max-w-2xl mx-auto">Validated expertise in data engineering, analysis, and ML infrastructure.</p>
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

const Contact = () => {
  return (
    <section id="contact" className="py-24 px-6 no-print">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-6xl font-display font-extrabold mb-8 uppercase tracking-tighter">Let's Build the <span className="gold-text-gradient">Future of Data</span></h2>
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
                <p className="text-lg font-bold">+254 110 062 168</p>
              </div>
            </a>
          </div>

          <div className="flex justify-center gap-6">
            <a href="https://github.com/Wickliffo" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:text-gold hover:border-gold transition-all">
              <Github size={24} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:text-gold hover:border-gold transition-all">
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
    <footer className="py-12 px-6 border-t border-white/5 text-center no-print">
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

const CVPrintable = () => {
  return (
    <div className="hidden print:block p-10 text-black bg-white min-h-screen font-sans">
      <div className="max-w-4xl mx-auto">
        <header className="border-b-4 border-black pb-8 mb-10 flex justify-between items-end">
          <div>
            <h1 className="text-5xl font-display font-extrabold uppercase tracking-tighter mb-2">Wickliff Orina</h1>
            <p className="text-xl font-bold text-gray-700">Data Engineer | Data Analyst | Junior ML Engineer</p>
          </div>
          <div className="text-right text-sm font-medium">
            <p>orinawicklff@gmail.com</p>
            <p>+254 110 062 168</p>
            <p>github.com/Wickliffo</p>
          </div>
        </header>

        <div className="grid grid-cols-3 gap-10">
          <div className="col-span-2 space-y-10">
            <section>
              <h2 className="text-2xl font-display font-extrabold uppercase border-b-2 border-black mb-4">Professional Summary</h2>
              <p className="text-sm leading-relaxed text-gray-800">
                Data Engineer & Analyst with a systematic approach to engineering value from raw information. Expert in building ETL/ELT pipelines, star schemas, and predictive ML models. Proven track record in reducing data latency and improving reporting accuracy through Python, SQL, and dbt.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-extrabold uppercase border-b-2 border-black mb-4">Key Projects</h2>
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-bold uppercase">Sowing Success (ML)</h3>
                  <p className="text-xs font-bold text-gray-500 mb-2">Python, Scikit-learn, XGBoost, Pandas</p>
                  <p className="text-sm text-gray-800">Problem: Low crop yield. Solution: Scikit-learn predictive model. Impact: 25% yield increase.</p>
                </div>
                <div>
                  <h3 className="text-lg font-bold uppercase">Kenyan Market Analytics (DE)</h3>
                  <p className="text-xs font-bold text-gray-500 mb-2">PostgreSQL, dbt, Airflow, Python</p>
                  <p className="text-sm text-gray-800">Problem: Fragmented market data. Solution: PostgreSQL/dbt/Airflow pipeline. Impact: Reduced latency by 80%.</p>
                </div>
                <div>
                  <h3 className="text-lg font-bold uppercase">RetailFlux (DE)</h3>
                  <p className="text-xs font-bold text-gray-500 mb-2">FastAPI, MongoDB, Python, REST API</p>
                  <p className="text-sm text-gray-800">Problem: Manual Walmart data processing. Solution: Automated ETL. Impact: 90% automation.</p>
                </div>
                <div>
                  <h3 className="text-lg font-bold uppercase">Swiggy Analytics (DA)</h3>
                  <p className="text-xs font-bold text-gray-500 mb-2">SQL, PostgreSQL, Data Modeling, Tableau</p>
                  <p className="text-sm text-gray-800">Problem: Fragmented delivery data. Solution: Star Schema Warehouse. Impact: 10% delivery speed improvement.</p>
                </div>
              </div>
            </section>
          </div>

          <div className="space-y-10">
            <section>
              <h2 className="text-2xl font-display font-extrabold uppercase border-b-2 border-black mb-4">Technical Skills</h2>
              <div className="space-y-4">
                <div>
                  <h4 className="font-bold text-xs uppercase text-gray-500 mb-1">Data Engineering</h4>
                  <p className="text-xs font-bold">SQL (Expert), ETL/ELT, Data Warehousing, Data Modeling, dbt, Airflow</p>
                </div>
                <div>
                  <h4 className="font-bold text-xs uppercase text-gray-500 mb-1">Analytics & BI</h4>
                  <p className="text-xs font-bold">Python (Pandas, NumPy), Power BI, Tableau, EDA</p>
                </div>
                <div>
                  <h4 className="font-bold text-xs uppercase text-gray-500 mb-1">ML Foundations</h4>
                  <p className="text-xs font-bold">Scikit-learn, XGBoost, Random Forest, Model Evaluation</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-display font-extrabold uppercase border-b-2 border-black mb-4">Certifications</h2>
              <div className="space-y-2 text-xs font-bold">
                <p>DataCamp: Data Engineer Professional</p>
                <p>DataCamp: Data Engineering Track</p>
                <p>DataCamp: Data Analysis with Python</p>
                <p>Cisco: Data Essentials</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-display font-extrabold uppercase border-b-2 border-black mb-4">Education</h2>
              <p className="text-xs font-bold">Bachelor of Science in Information Technology</p>
              <p className="text-[10px] text-gray-500">Relevant Coursework: Database Systems, Data Structures, Algorithms</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <div className="min-h-screen selection:bg-gold selection:text-black">
      <div className="no-print">
        <Navbar />
        <main>
          <Hero />
          <TechnicalDepth />
          <ProcessFlow />
          <Projects />
          <Certifications />
          <Contact />
        </main>
        <Footer />
      </div>
      
      {/* Printable CV Component */}
      <CVPrintable />
    </div>
  );
}
