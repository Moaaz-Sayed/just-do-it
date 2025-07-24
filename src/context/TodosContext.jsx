import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import supabase from "../services/supabase";
import toast from "react-hot-toast";
import { useAuth } from "./AuthContext";
const TodosContext = createContext();

function TodosProvider({ children }) {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    addTodo: "",
    editTodo: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [todos, setTodos] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const updateField = (name, value) => {
    setFormData((data) => ({ ...data, [name]: value }));
  };

  function startEditing(todo) {
    setEditingId(todo.id);
    setFormData((data) => ({ ...data, editTodo: todo.title }));
  }

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
    if (user) showTodos();
  }, [user, showTodos]);

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

  async function editTask() {
    if (!editingId || !formData.editTodo) return;

    const { error } = await supabase
      .from("todos")
      .update({ title: formData.editTodo })
      .eq("id", editingId)
      .select();

    if (error) {
      toast.error("Failed to update task: " + error.message);
    } else {
      toast.success("Task updated successfully");
      showTodos();
      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === editingId ? { ...todo, title: formData.editTodo } : todo
        )
      );
      setEditingId(null);
      setFormData((data) => ({ ...data, editTodo: "" }));
    }
  }

  return (
    <TodosContext.Provider
      value={{
        updateField,
        formData,
        isLoading,
        user,
        todos,
        showTodos,
        addTask,
        isAdding,
        toggleComplete,
        deleteTask,
        editTask,
        startEditing,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
}

function useTodos() {
  const context = useContext(TodosContext);
  if (context === undefined)
    throw new Error("TodosContext was used outside of TodosProvider");

  return context;
}

export { TodosProvider, useTodos };
