import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import supabase from "../services/supabase";
import toast from "react-hot-toast";
const AuthContext = createContext();

function AuthProvider({ children }) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    addTodo: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const [user, setUser] = useState(null);
  const [todos, setTodos] = useState([]);

  const updateField = (name, value) => {
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const showTodos = useCallback(
    async function () {
      if (!user) return;
      setIsLoading(true);

      const { data, error } = await supabase
        .from("todos")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) {
        toast.error("Failed to fetch todos: " + error.message);
        setIsLoading(false);
        return;
      }

      setTodos(data);
      setIsLoading(false);
    },
    [user]
  );

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

  useEffect(() => {
    if (user) showTodos();
  }, [user, showTodos]);

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
    setTodos([]);
    toast.success("Logged out successfully!");
  }

  async function addTask() {
    const { addTodo } = formData;
    if (!user || !addTodo) return;

    setIsAdding(true);

    const { error } = await supabase
      .from("todos")
      .insert([
        {
          title: addTodo,
          user_id: user.id,
        },
      ])
      .select();

    if (error) {
      toast.error("Failed to add task: " + error.message);
    } else {
      toast.success("Task added successfully");
      showTodos();
      setFormData((data) => ({ ...data, addTodo: "" }));
    }

    setIsAdding(false);
  }

  async function toggleComplete(id, currentStatus) {
    const { error } = await supabase
      .from("todos")
      .update({ completed: !currentStatus })
      .eq("id", id);

    if (error) {
      toast.error("Failed to update task: " + error.message);
    } else {
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id ? { ...todo, completed: !currentStatus } : todo
        )
      );
    }
  }

  async function deleteTask(id) {
    const { error } = await supabase.from("todos").delete().eq("id", id);

    if (error) {
      toast.error("Failed to Delete task: " + error.message);
    } else {
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    }
  }

  async function editTask(id, newTitle) {
    const { error } = await supabase
      .from("todos")
      .update({ title: newTitle })
      .eq("id", id)
      .select();
    if (error) {
      toast.error("Failed to update task: " + error.message);
    } else {
      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === id ? { ...todo, title: newTitle } : todo
        )
      );
    }
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
        todos,
        showTodos,
        logout,
        addTask,
        isAdding,
        toggleComplete,
        deleteTask,
        editTask,
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
