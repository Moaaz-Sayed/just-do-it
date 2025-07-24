import { useState } from "react";
import { HiTrash } from "react-icons/hi2";
import styled from "styled-components";
import { useTodos } from "../../context/TodosContext";
import Input from "../../ui/Input";
import Modal from "../../ui/Modal";
import { formatDistanceFromNow } from "../../utils/helpers";

const List = styled.ul`
  margin-top: 2.4rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  width: 60%;

  @media (max-width: 500px) {
    width: 90%;
  }
`;

const TaskItem = styled.li`
  background-color: var(--color-grey-200);
  padding: 1rem 2rem;
  border-radius: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 500px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.8rem;
    border-radius: 20px;
    padding: 1.2rem;
  }
`;

const TaskContent = styled.div`
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
`;

const Text = styled.span`
  font-size: 1.9rem;
  display: inline-block;
  transition: color 0.3s ease, text-decoration 0.3s ease;

  /* @media (max-width: 500px) {
    font-size: 1.4rem;
  } */
`;

const Checkbox = styled.input.attrs({ type: "checkbox" })`
  width: 1.6rem;
  height: 1.6rem;
  accent-color: var(--color-brand-500);
  margin-right: 1rem;
  transform: scale(1);
  transition: transform 0.2s ease;

  &:checked {
    transform: scale(1.2);
  }

  @media (max-width: 500px) {
    width: 1.2rem;
    height: 1.2rem;
    margin-right: 0.6rem;
    margin-bottom: 0.6rem;

    &:checked {
      transform: scale(1.1);
    }
  }
`;

const Icons = styled.div`
  display: flex;
  gap: 1.2rem;

  svg {
    cursor: pointer;
    font-size: 1.8rem;
    transition: color 0.2s;

    &:hover {
      color: var(--color-brand-200);
    }
  }

  @media (max-width: 500px) {
    justify-content: center;
    svg {
      font-size: 1.6rem;
    }
  }
`;

const DateText = styled.span`
  font-size: 1.2rem;
  color: var(--color-grey-600);

  @media (max-width: 500px) {
    font-size: 1rem;
  }
`;

function TaskList() {
  const {
    todos,
    toggleComplete,
    deleteTask,
    formData,
    updateField,
    startEditing,
    editTask,
  } = useTodos();

  const [todoToDelete, setTodoToDelete] = useState(null);
  const [currentlyEditingId, setCurrentlyEditingId] = useState(null);

  function handleEdit(todo) {
    if (todo.title === formData.editTodo) return setCurrentlyEditingId(null);
    editTask();
    setCurrentlyEditingId(null);
  }

  return (
    <>
      <List>
        {todos.map((todo) => (
          <TaskItem key={todo.id}>
            <div>
              <TaskContent>
                <Checkbox
                  checked={todo.completed}
                  onChange={() => toggleComplete(todo.id, todo.completed)}
                />
                {currentlyEditingId === todo.id ? (
                  <Input
                    autoFocus
                    type="text"
                    value={formData.editTodo}
                    onChange={(e) => updateField("editTodo", e.target.value)}
                    onBlur={() => {
                      handleEdit(todo);
                    }}
                  />
                ) : (
                  <Text
                    onClick={() => {
                      startEditing(todo);
                      setCurrentlyEditingId(todo.id);
                    }}
                    style={{
                      textDecoration: todo.completed ? "line-through" : "none",
                      cursor: "pointer",
                    }}
                    title="Click to edit"
                  >
                    {todo.title}
                  </Text>
                )}
              </TaskContent>
              • Added{" "}
              <DateText>{formatDistanceFromNow(todo.created_at)}</DateText>
              {todo.updated_at &&
                new Date(todo.updated_at).getTime() !==
                  new Date(todo.created_at).getTime() && (
                  <>
                    • Edited{" "}
                    <DateText>
                      {formatDistanceFromNow(todo.updated_at)}
                    </DateText>
                  </>
                )}
            </div>
            <Icons>
              <HiTrash
                onClick={() => setTodoToDelete(todo)}
                title="Delete task"
              />
              {todoToDelete?.id === todo.id && (
                <Modal
                  onCancel={() => setTodoToDelete(null)}
                  onConfirm={() => {
                    deleteTask(todoToDelete.id);
                    setTodoToDelete(null);
                  }}
                  message="Are you sure you want to delete this task?"
                />
              )}
            </Icons>
          </TaskItem>
        ))}
      </List>
    </>
  );
}

export default TaskList;
