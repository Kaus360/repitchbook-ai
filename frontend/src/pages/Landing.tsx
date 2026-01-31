import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  BarChart3,
  Shield,
  Zap,
  CheckCircle2,
  Sparkles,
  Target,
  Building2,
  MapPin,
  PieChart,
  Home,
  Landmark,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import heroRealEstate from "@/assets/hero-real-estate.jpg";
import logoImage from "@/assets/logo.jpg";
import citiesBg from "@/assets/cities-bg.jpg";
import workflowBg from "@/assets/workflow-bg.jpg";

const features = [
  {
    icon: Zap,
    title: "AI-Powered Analysis",
    description: "Instant investment scoring powered by machine learning models trained on millions of property transactions.",
    gradient: "from-amber-500 to-orange-600",
    bgGlow: "bg-amber-500/20",
  },
  {
    icon: BarChart3,
    title: "Market Intelligence",
    description: "Real-time market data, rental yields, and demand trends across 50+ Indian cities.",
    gradient: "from-cyan-500 to-blue-600",
    bgGlow: "bg-cyan-500/20",
  },
  {
    icon: Shield,
    title: "Risk Assessment",
    description: "Comprehensive risk modeling with scenario analysis and stress testing for real estate investments.",
    gradient: "from-emerald-500 to-teal-600",
    bgGlow: "bg-emerald-500/20",
  },
];

const benefits = [
  "Institutional-grade deal analysis",
  "Real-time market intelligence",
  "AI-powered risk scoring",
  "Comprehensive reporting suite",
];

const stats = [
  { value: "₹1,200 Cr+", label: "Property Value Analyzed", icon: Building2 },
  { value: "97%", label: "Accuracy Rate", icon: Target },
  { value: "2.4s", label: "Avg. Analysis Time", icon: Sparkles },
];

const cities = [
  { name: "Mumbai", properties: "12,400+" },
  { name: "Bengaluru", properties: "9,800+" },
  { name: "Gurugram", properties: "7,200+" },
  { name: "Hyderabad", properties: "6,500+" },
  { name: "Pune", properties: "5,900+" },
];

import avatarMale from "@/assets/avatar-male.png";
import avatarFemale from "@/assets/avatar-female.png";

const testimonials = [
  {
    quote: "REPitchBook has transformed how we evaluate deals. The AI scoring saved us from two bad investments last quarter alone.",
    name: "Vineet Kamle",
    role: "Real Estate Investor",
    company: "Kamle Investments",
    location: "Mumbai",
    avatarImg: avatarMale,
  },
  {
    quote: "My clients love the detailed reports. It adds credibility to every property I present and has increased my close rate by 40%.",
    name: "Priya Sharma",
    role: "Senior Property Broker",
    company: "Prime Realty Group",
    location: "Bengaluru",
    avatarImg: avatarFemale,
  },
  {
    quote: "The market intelligence features are incredible. We now have insights that previously required a full research team.",
    name: "Arjun Mehta",
    role: "Investment Analyst",
    company: "Horizon Capital",
    location: "Gurugram",
    avatarImg: avatarMale,
  },
  {
    quote: "From land acquisition to commercial projects, REPitchBook handles it all. It's become essential to our due diligence process.",
    name: "Kavitha Reddy",
    role: "Development Director",
    company: "Skyrise Developers",
    location: "Hyderabad",
    avatarImg: avatarFemale,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

const scaleVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px]"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.15, 0.1],
            x: [0, 50, 0],
            y: [0, -30, 0]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[100px]"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.2, 0.1],
            x: [0, -40, 0],
            y: [0, 40, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-primary/5 to-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Floating Particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/30 rounded-full"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, i % 2 === 0 ? 20 : -20, 0],
              opacity: [0.3, 0.6, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      {/* Navigation */}
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl"
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <motion.div 
            className="flex items-center gap-2.5"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <img src={logoImage} alt="REPitchBook Logo" className="h-9 w-9 rounded-xl object-cover" />
            <span className="text-base font-semibold tracking-tight text-foreground">REPitchBook</span>
          </motion.div>
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              onClick={() => navigate("/contact")} 
              className="h-9 px-4 text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              Contact Us
            </Button>
            <ThemeToggle />
            <Button 
              onClick={() => navigate("/auth?mode=signin")} 
              className="h-9 bg-gradient-primary px-5 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity"
            >
              Sign In
            </Button>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 lg:pt-44 lg:pb-32 min-h-screen flex items-center">
        {/* Background Image with Fade Effect */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.img 
            src={heroRealEstate} 
            alt="Modern luxury real estate" 
            className="w-full h-full object-cover opacity-40 dark:opacity-25"
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Soft gradient overlays for text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/60" />
        </div>

        <div className="relative mx-auto max-w-6xl px-6 z-10">
          <motion.div 
            className="mx-auto max-w-3xl text-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Badge */}
            <motion.div 
              variants={itemVariants}
              className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm backdrop-blur-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
              </span>
              <span className="text-foreground/80">Trusted by 2,400+ professionals across India</span>
            </motion.div>
            
            {/* Headline with Typing Animation */}
            <motion.h1 
              variants={itemVariants}
              className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl lg:leading-[1.1]"
            >
              <span className="inline-flex flex-wrap justify-center">
                {"Turn Property Data into".split("").map((char, index) => (
                  <motion.span
                    key={`line1-${index}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      duration: 0.03,
                      delay: 0.3 + index * 0.04,
                      ease: "easeOut"
                    }}
                    className={char === " " ? "mr-[0.25em]" : ""}
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </span>
              <br />
              <span className="inline-flex flex-wrap justify-center bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent bg-[length:200%_auto]">
                {"Investor Intelligence".split("").map((char, index) => (
                  <motion.span
                    key={`line2-${index}`}
                    initial={{ opacity: 0, y: 10, scale: 0.8 }}
                    animate={{ 
                      opacity: 1, 
                      y: 0, 
                      scale: 1,
                    }}
                    transition={{ 
                      duration: 0.04,
                      delay: 1.2 + index * 0.05,
                      ease: "easeOut"
                    }}
                    className={char === " " ? "mr-[0.25em]" : ""}
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
                {/* Blinking Cursor */}
                <motion.span
                  className="inline-block w-[3px] h-[1em] bg-primary ml-1 align-middle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 1, 0] }}
                  transition={{ 
                    duration: 0.8, 
                    repeat: Infinity,
                    delay: 2.3,
                    times: [0, 0.1, 0.5, 1]
                  }}
                />
              </span>
            </motion.h1>
            
            {/* Subheadline */}
            <motion.p 
              variants={itemVariants}
              className="mt-6 text-lg text-muted-foreground sm:text-xl max-w-2xl mx-auto leading-relaxed"
            >
              AI-powered deal analysis for smarter real estate decisions. 
              Evaluate properties, assess risk, and generate institutional-grade 
              investment reports in seconds.
            </motion.p>
            
            {/* CTAs */}
            <motion.div 
              variants={itemVariants}
              className="mt-10 flex items-center justify-center"
            >
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate("/auth?mode=signin")}
                className="h-12 px-8 text-sm font-medium border-border/80 hover:bg-accent/10 hover:border-accent/50 transition-all duration-300"
              >
                Sign In to Dashboard
              </Button>
            </motion.div>

            {/* Quick Benefits */}
            <motion.div 
              variants={itemVariants}
              className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-3"
            >
            {benefits.map((benefit, index) => (
              <motion.div 
                key={benefit} 
                className="flex items-center gap-2 text-sm text-muted-foreground"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
              >
                <CheckCircle2 className="h-4 w-4 text-success" />
                <span>{benefit}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        </div>
      </section>

    {/* Cities Coverage */}
    <section className="py-12 border-y border-border/30 relative overflow-hidden">
      {/* Faded Background Image */}
      <div className="absolute inset-0">
        <img 
          src={citiesBg} 
          alt="" 
          className="w-full h-full object-cover opacity-10 dark:opacity-[0.06]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background" />
      </div>
      
      <div className="relative mx-auto max-w-6xl px-6 z-10">
        <motion.div 
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <span className="text-sm text-muted-foreground whitespace-nowrap">Covering properties in</span>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {cities.map((city, index) => (
              <motion.div 
                key={city.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted/50 border border-border/50 backdrop-blur-sm"
              >
                <MapPin className="w-3 h-3 text-primary" />
                <span className="text-sm font-medium text-foreground">{city.name}</span>
                <span className="text-xs text-muted-foreground">({city.properties})</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>

    {/* How It Works Section - Timeline */}
    <section className="py-24 relative overflow-hidden">
      {/* Faded Background Image */}
      <div className="absolute inset-0">
        <img 
          src={workflowBg} 
          alt="" 
          className="w-full h-full object-cover opacity-20 dark:opacity-[0.12]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-transparent to-background/60" />
      </div>
      <div className="relative mx-auto max-w-4xl px-6">
        <motion.div 
          className="mx-auto max-w-2xl text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-4">
            Simple & Powerful
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            How It Works
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            Get institutional-grade property insights in three simple steps
          </p>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Vertical Timeline Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-amber-500 via-cyan-500 to-emerald-500 md:-translate-x-1/2" />

          {/* Step 1 */}
          <motion.div 
            className="relative flex items-start gap-8 mb-12 md:mb-16"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {/* Timeline Node */}
            <div className="absolute left-8 md:left-1/2 w-16 h-16 -translate-x-1/2 flex items-center justify-center">
              <div className="absolute w-16 h-16 rounded-full bg-gradient-to-br from-amber-500/20 to-orange-500/20 animate-pulse" />
              <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/30">
                <Building2 className="w-6 h-6 text-white" />
              </div>
            </div>

            {/* Content - Left side on desktop */}
            <div className="ml-24 md:ml-0 md:w-1/2 md:pr-16 md:text-right">
              <div className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold mb-4">
                Step 1
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-3">Upload Property</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Enter property details — location, price, size, and type. Our system supports residential, commercial, and land investments.
              </p>
              <div className="flex flex-wrap gap-2 md:justify-end">
                <span className="px-3 py-1.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-medium border border-amber-500/20">Location</span>
                <span className="px-3 py-1.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-medium border border-amber-500/20">Price</span>
                <span className="px-3 py-1.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-medium border border-amber-500/20">Size</span>
              </div>
            </div>

            {/* Empty space for right side on desktop */}
            <div className="hidden md:block md:w-1/2" />
          </motion.div>

          {/* Step 2 */}
          <motion.div 
            className="relative flex items-start gap-8 mb-12 md:mb-16"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {/* Timeline Node */}
            <div className="absolute left-8 md:left-1/2 w-16 h-16 -translate-x-1/2 flex items-center justify-center">
              <div className="absolute w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 animate-pulse" style={{ animationDelay: "0.5s" }} />
              <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center shadow-lg shadow-cyan-500/30">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
            </div>

            {/* Empty space for left side on desktop */}
            <div className="hidden md:block md:w-1/2" />

            {/* Content - Right side on desktop */}
            <div className="ml-24 md:ml-0 md:w-1/2 md:pl-16">
              <div className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-xs font-bold mb-4">
                Step 2
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-3">AI Analysis</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Our AI evaluates market trends, rental yields, risk factors, and growth potential using real-time data from across India.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
                  <span className="text-sm text-muted-foreground">Analyzing market data...</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" style={{ animationDelay: "0.2s" }} />
                  <span className="text-sm text-muted-foreground">Computing risk score...</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" style={{ animationDelay: "0.4s" }} />
                  <span className="text-sm text-muted-foreground">Generating insights...</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Step 3 */}
          <motion.div 
            className="relative flex items-start gap-8"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Timeline Node */}
            <div className="absolute left-8 md:left-1/2 w-16 h-16 -translate-x-1/2 flex items-center justify-center">
              <div className="absolute w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500/20 to-teal-500/20 animate-pulse" style={{ animationDelay: "1s" }} />
              <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/30">
                <PieChart className="w-6 h-6 text-white" />
              </div>
            </div>

            {/* Content - Left side on desktop */}
            <div className="ml-24 md:ml-0 md:w-1/2 md:pr-16 md:text-right">
              <div className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs font-bold mb-4">
                Step 3
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-3">Get Report</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Receive a comprehensive investment report with AI score, ROI projections, risk analysis, and actionable recommendations.
              </p>
              <div className="flex items-center gap-3 md:justify-end">
                <div className="flex-1 max-w-32 h-2 rounded-full bg-muted overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 1 }}
                  />
                </div>
                <span className="text-sm font-semibold text-emerald-500">Report Ready</span>
              </div>
            </div>

            {/* Empty space for right side on desktop */}
            <div className="hidden md:block md:w-1/2" />
          </motion.div>
        </div>
      </div>
    </section>

    {/* Testimonials Section */}
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent" />
      <div className="relative mx-auto max-w-6xl px-6">
        <motion.div 
          className="mx-auto max-w-2xl text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-4">
            Success Stories
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Trusted by Real Estate
            <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Professionals Across India
            </span>
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            See how leading investors, brokers, and analysts are making smarter decisions
          </p>
        </motion.div>

        <motion.div 
          className="grid gap-6 md:grid-cols-2"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              variants={itemVariants}
              whileHover={{ y: -5, scale: 1.01 }}
              className="group relative"
            >
              <div className="relative rounded-2xl border border-border/50 bg-card/80 backdrop-blur-sm p-8 transition-all duration-500 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10 h-full">
                {/* Quote icon */}
                <div className="absolute top-6 right-6 text-6xl font-serif text-primary/10 leading-none select-none">
                  "
                </div>
                
                {/* Quote */}
                <p className="relative text-foreground/90 leading-relaxed mb-6 text-lg">
                  "{testimonial.quote}"
                </p>
                
                {/* Author */}
                <div className="flex items-center gap-4">
                  <img 
                    src={testimonial.avatarImg} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover shadow-lg"
                  />
                  <div className="flex-1">
                    <div className="font-semibold text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    <div className="text-xs text-muted-foreground/70 flex items-center gap-1 mt-0.5">
                      <span>{testimonial.company}</span>
                      <span>•</span>
                      <MapPin className="w-3 h-3" />
                      <span>{testimonial.location}</span>
                    </div>
                  </div>
                </div>
                
                {/* Decorative gradient */}
                <div className="absolute bottom-0 left-0 right-0 h-1 rounded-b-2xl bg-gradient-to-r from-primary to-primary/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust indicators */}
        <motion.div 
          className="mt-12 flex flex-wrap items-center justify-center gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center gap-2 text-muted-foreground">
            <div className="flex -space-x-2">
              {["VK", "PS", "AM", "KR"].map((initials, i) => (
                <div 
                  key={initials} 
                  className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-xs font-medium border-2 border-background"
                  style={{ zIndex: 4 - i }}
                >
                  {initials}
                </div>
              ))}
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground text-xs font-medium border-2 border-background">
                +2K
              </div>
            </div>
            <span className="text-sm">Join 2,400+ professionals</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg key={star} className="w-5 h-5 text-amber-500 fill-amber-500" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-sm text-muted-foreground">4.9/5 average rating</span>
          </div>
        </motion.div>
      </div>
    </section>

      {/* Features Section */}
      <section className="py-24 relative">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div 
            className="mx-auto max-w-2xl text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Everything you need to make
              <br />
              <span className="text-primary">confident investment decisions</span>
            </h2>
            <p className="mt-4 text-muted-foreground text-lg">
              Institutional-grade tools designed for modern real estate professionals.
            </p>
          </motion.div>

          <motion.div 
            className="grid gap-6 lg:grid-cols-3"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-8 transition-all duration-500 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/20 overflow-hidden"
              >
                {/* Gradient glow effect */}
                <div className={`absolute -top-20 -right-20 w-40 h-40 ${feature.bgGlow} rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                <div className="relative">
                  <div className={`mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${feature.gradient} shadow-lg`}>
                    <feature.icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="mb-3 text-xl font-semibold text-foreground">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

    {/* Social Proof Section */}
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      <div className="relative mx-auto max-w-6xl px-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl border border-border/50 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl p-12 lg:p-16 overflow-hidden relative"
        >
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-accent/20 to-primary/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
          
          {/* Real estate icons decoration */}
          <div className="absolute top-8 left-8 opacity-10">
            <Landmark className="w-16 h-16 text-primary" />
          </div>
          <div className="absolute bottom-8 right-8 opacity-10">
            <Home className="w-12 h-12 text-accent" />
          </div>
          
          <div className="relative mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-6">
              Trusted by Real Estate Professionals
            </p>
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
              The same analytical rigor used by
              <span className="block mt-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                top real estate investment firms
              </span>
            </h2>
            <p className="mt-6 text-muted-foreground text-lg">
              From residential properties to commercial developments — analyze any deal with institutional precision.
            </p>
            
            {/* Property type badges */}
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {["Residential", "Commercial", "Land", "Pre-launch", "Rental"].map((type) => (
                <span key={type} className="px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm text-primary font-medium">
                  {type}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>


      {/* Footer */}
      <footer className="border-t border-border/50 py-8 relative">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-2">
              <img src={logoImage} alt="REPitchBook Logo" className="h-7 w-7 rounded-lg object-cover" />
              <span className="text-sm font-medium text-foreground">REPitchBook</span>
            </div>
            <p className="text-xs text-muted-foreground">
              © 2026 REPitchBook. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
