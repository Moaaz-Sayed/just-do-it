import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import supabase from "../services/supabase";
const AuthContext = createContext();

function AuthProvider({ children }) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const [user, setUser] = useState(null);

  const updateField = (name, value) => {
    setFormData((data) => ({ ...data, [name]: value }));
  };

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session?.user?.id !== user?.id) {
          setUser(session?.user || null);
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [user]);

  async function login() {
    const { email, password } = formData;

    setIsLoading(true);

    let { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast.error("login failed: " + error.message);
      setIsLoading(false);

      return { success: false };
    }

    setFormData({ email: "", password: "" });
    setIsLoading(false);
    setUser(data.user);

    return {
      success: true,
      hasSession: !!data.session,
    };
  }

  async function signup() {
    const { email, password, username } = formData;
    setIsLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { username },
      },
    });

    if (error) {
      toast.error("Signup failed: " + error.message);
      setIsLoading(false);
      return { success: false };
    }

    setFormData({ username: "", email: "", password: "" });

    setIsLoading(false);
    setUser(data.user);
    return {
      success: true,
      hasSession: !!data.session,
    };
  }

  async function logout() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      toast.error("Logout failed: " + error.message);
      return;
    }

    setUser(null);
    toast.success("Logged out successfully!");
  }

  return (
    <AuthContext.Provider
      value={{
        updateField,
        formData,
        isLoading,
        signup,
        login,
        user,
        setUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("AuthContext was used outside of AuthProvider");

  return context;
}

export { AuthProvider, useAuth };
