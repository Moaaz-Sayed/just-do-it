import { useNavigate } from "react-router-dom";
import Button from "../ui/Button";
import Form from "../ui/Form";
import Input from "../ui/Input";
import Logo from "../ui/Logo";
import Spinner from "../ui/Spinner";

import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

function Login() {
  const navigate = useNavigate();
  const { formData, updateField, isLoading, login } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await login();

    if (res.success) {
      if (res.hasSession) {
        toast.success("You are successfully logged in...");
        setTimeout(() => navigate("/todos"), 1000);
      }
    }
  }

  return (
    <>
      {isLoading && <Spinner />}
      <Form
        heading={<Logo size="large" />}
        linkText="Don't have an account? Sign up"
        linkTo="/signup"
        onSubmit={handleSubmit}
      >
        <Input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => updateField("email", e.target.value)}
          autoFocus
        />
        <Input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => updateField("password", e.target.value)}
        />
        <Button>Log in</Button>
      </Form>
    </>
  );
}

export default Login;
