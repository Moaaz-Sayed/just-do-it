import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import Button from "../ui/Button";
import Form from "../ui/Form";
import Input from "../ui/Input";
import Logo from "../ui/Logo";
import Spinner from "../ui/Spinner";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const { formData, updateField, isLoading, signup } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await signup();

    if (res.success) {
      if (res.hasSession) {
        toast.success("Account created! Redirecting...");
        setTimeout(() => navigate("/todos"), 1000);
      } else {
        toast.success("Account created! Please check your email.");
      }
    }
  }

  return (
    <>
      {isLoading && <Spinner />}
      <Form
        heading={<Logo size="large" />}
        linkText="Already have an account? Log in"
        linkTo="/login"
        onSubmit={handleSubmit}
      >
        <Input
          type="text"
          placeholder="User name"
          value={formData.username}
          onChange={(e) => updateField("username", e.target.value)}
          autoFocus
        />
        <Input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => updateField("email", e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => updateField("password", e.target.value)}
        />
        <Button>Sign up</Button>
      </Form>
    </>
  );
}

export default Signup;
