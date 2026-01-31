import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, ArrowLeft, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useToast } from "@/hooks/use-toast";
import logoImage from "@/assets/logo.jpg";

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

export default function Contact() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "Thank you for contacting us. We'll get back to you soon.",
    });
  };
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl"
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <motion.div 
            className="flex items-center gap-2.5 cursor-pointer"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400 }}
            onClick={() => navigate("/")}
          >
            <img src={logoImage} alt="REPitchBook Logo" className="h-9 w-9 rounded-xl object-cover" />
            <span className="text-base font-semibold tracking-tight text-foreground">REPitchBook</span>
          </motion.div>
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              onClick={() => navigate("/")}
              className="h-9 px-4 text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <section className="pt-32 pb-24">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid gap-12 lg:grid-cols-2"
          >
            {/* Contact Info */}
            <motion.div variants={itemVariants}>
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-6">
                Get in Touch
              </h1>
              <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
                Have questions about REPitchBook? We'd love to hear from you. 
                Send us a message and we'll respond as soon as possible.
              </p>

              <div className="space-y-6">
                <motion.div 
                  variants={itemVariants}
                  className="flex items-start gap-4 p-4 rounded-xl bg-muted/30 border border-border/50"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Email</h3>
                    <p className="text-muted-foreground">support@repitchbook.com</p>
                  </div>
                </motion.div>

                <motion.div 
                  variants={itemVariants}
                  className="flex items-start gap-4 p-4 rounded-xl bg-muted/30 border border-border/50"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Phone</h3>
                    <p className="text-muted-foreground">+91 98765 43210</p>
                  </div>
                </motion.div>

                <motion.div 
                  variants={itemVariants}
                  className="flex items-start gap-4 p-4 rounded-xl bg-muted/30 border border-border/50"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Office</h3>
                    <p className="text-muted-foreground">
                      Bandra Kurla Complex, Mumbai<br />
                      Maharashtra 400051, India
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div 
              variants={itemVariants}
              className="p-8 rounded-2xl bg-card border border-border/50 shadow-xl"
            >
              <h2 className="text-2xl font-bold text-foreground mb-6">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="John" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Doe" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="john@example.com" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone (Optional)</Label>
                  <Input id="phone" type="tel" placeholder="+91 98765 43210" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea 
                    id="message" 
                    placeholder="Tell us about your inquiry..." 
                    className="min-h-[120px] resize-none"
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-12 bg-gradient-primary text-primary-foreground font-medium"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </form>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
