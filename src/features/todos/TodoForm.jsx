import styled from "styled-components";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import { useAuth } from "../../context/AuthContext";
import SpinnerMini from "../../ui/SpinnerMini";
import { useTodos } from "../../context/TodosContext";

const StyledForm = styled.form`
  display: flex;
  gap: 1.2rem;
  margin-top: 3.2rem;
  width: 60%;
  align-items: center;

  @media (max-width: 700px) {
    width: 85%;
  }
  @media (max-width: 432px) {
    flex-direction: column;
    width: 90%;
    gap: 0.8rem;
  }
`;

function TodoForm() {
  const { addTask, formData, updateField, isAdding } = useTodos();
  const { user } = useAuth();
  const username = user.user_metadata.username;

  function handleAddTask(e) {
    e.preventDefault();
    addTask();
  }

  return (
    <>
      <h1>{username}</h1>
      <StyledForm onSubmit={handleAddTask}>
        <Input
          type="text"
          placeholder="Add a task..."
          value={formData.addTodo}
          onChange={(e) => updateField("addTodo", e.target.value)}
        />
        {isAdding ? (
          <SpinnerMini />
        ) : (
          <Button type="submit">I Got This!</Button>
        )}
      </StyledForm>
    </>
  );
}

export default TodoForm;
