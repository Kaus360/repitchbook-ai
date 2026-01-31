import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  email: string;
  role: "investor" | "broker" | "analyst";
  name: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo accounts - hardcoded for hackathon
const DEMO_ACCOUNTS: Record<string, { password: string; role: User["role"]; name: string }> = {
  "investor@repitch.ai": { password: "demo123", role: "investor", name: "Vineet Kamle" },
  "broker@repitch.ai": { password: "demo123", role: "broker", name: "Priya Sharma" },
  "analyst@repitch.ai": { password: "demo123", role: "analyst", name: "Arjun Mehta" },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const storedUser = localStorage.getItem("repitchbook-user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem("repitchbook-user");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    const normalizedEmail = email.toLowerCase().trim();
    const account = DEMO_ACCOUNTS[normalizedEmail];

    if (!account) {
      return { success: false, error: "Account not found. Use a demo account." };
    }

    if (account.password !== password) {
      return { success: false, error: "Invalid password. Try 'demo123'" };
    }

    const userData: User = {
      email: normalizedEmail,
      role: account.role,
      name: account.name,
    };

    setUser(userData);
    localStorage.setItem("repitchbook-user", JSON.stringify(userData));
    return { success: true };
  };

  const signup = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    const normalizedEmail = email.toLowerCase().trim();
    
    // For demo, only allow demo accounts
    if (!DEMO_ACCOUNTS[normalizedEmail]) {
      return { 
        success: false, 
        error: "Demo mode: Please use investor@repitch.ai, broker@repitch.ai, or analyst@repitch.ai" 
      };
    }

    return { success: false, error: "Account already exists. Please sign in instead." };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("repitchbook-user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
