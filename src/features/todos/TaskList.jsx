import styled from "styled-components";
import { HiPencil, HiCheck, HiTrash } from "react-icons/hi2";
import { useAuth } from "../../context/AuthContext";
import Spinner from "../../ui/Spinner";
import { formatDistanceFromNow } from "../../utils/helpers";
import Modal from "../../ui/Modal";
import { useState } from "react";
import ModalEditTask from "../../ui/ModalEditTask ";

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

const Text = styled.span`
  font-size: 1.6rem;

  @media (max-width: 500px) {
    font-size: 1.4rem;
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

const CheckIcon = styled(HiCheck).attrs((props) => ({}))`
  cursor: pointer;
  font-size: 1.8rem;
  color: ${(props) => (props.$completed ? "#0f0" : "#f00")};
  transition: color 0.3s;

  &:hover {
    color: ${(props) => (props.$completed ? "#326e38" : "#a24848")};
  }
  @media (max-width: 500px) {
    &:hover {
      color: initial;
    }
  }
`;

function TaskList() {
  const { todos, isLoading, toggleComplete, deleteTask } = useAuth();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editTodo, setEditTodo] = useState(null);

  return (
    <>
      {isLoading && <Spinner />}
      <List>
        {todos.map((todo) => (
          <TaskItem key={todo.id}>
            <div>
              <Text
                style={{
                  textDecoration: todo.completed ? "line-through" : "none",
                }}
              >
                {todo.title}
              </Text>
              <br />
              <DateText>{formatDistanceFromNow(todo.created_at)}</DateText>
            </div>
            <Icons>
              <CheckIcon
                title="Mark as complete"
                onClick={() => toggleComplete(todo.id, todo.completed)}
                $completed={todo.completed}
              />

              <HiPencil onClick={() => setEditTodo(todo)} />
              <HiTrash
                onClick={() => setShowDeleteModal(true)}
                title="Delete task"
              />
              {showDeleteModal && (
                <Modal
                  onCancel={() => setShowDeleteModal(false)}
                  onConfirm={() => {
                    deleteTask(todo.id);
                    setShowDeleteModal(false);
                  }}
                  message="Are you sure you want to delete this task?"
                />
              )}
            </Icons>
            {editTodo?.id === todo.id && (
              <ModalEditTask
                todo={editTodo}
                onCancel={() => setEditTodo(null)}
              />
            )}{" "}
          </TaskItem>
        ))}
      </List>
    </>
  );
}

export default TaskList;
