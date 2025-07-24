import Heading from "../ui/Heading";
import TodoForm from "../features/todos/TodoForm";
import TaskList from "../features/todos/TaskList";
import styled from "styled-components";
import { HiOutlineLogout } from "react-icons/hi";
import { useAuth } from "../context/AuthContext";
import Modal from "../ui/Modal";
import { useState } from "react";
import { useTodos } from "../context/TodosContext";
import Spinner from "../ui/Spinner";

const Wrapper = styled.main`
  min-height: 100vh;
  background: linear-gradient(to right, #e0f7ff, #ffffff);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 6rem;
  position: relative;
`;

const LogoutButton = styled.button`
  position: absolute;
  top: 2rem;
  right: 2rem;
  background: none;
  border: none;
  font-size: 2.4rem;
  cursor: pointer;
  color: #333;

  &:hover {
    color: #e74c3c;
  }
`;

function Todos() {
  const { logout } = useAuth();
  const { todos, isLoading } = useTodos();

  const [showModal, setShowModal] = useState();

  return (
    <Wrapper>
      <LogoutButton onClick={() => setShowModal(true)} title="Logout">
        <HiOutlineLogout />
      </LogoutButton>

      {showModal && (
        <Modal
          onCancel={() => setShowModal(false)}
          onConfirm={() => {
            logout();
            setShowModal(false);
          }}
          message="Are you sure you want to log out?"
        />
      )}

      <Heading>Just do it.💪</Heading>
      <TodoForm />
      {todos.length > 0 ? (
        <TaskList />
      ) : (
        <>
          {isLoading && <Spinner />}
          <h2 style={{ marginTop: "100px" }}>Add Some Tasks😀</h2>
        </>
      )}
    </Wrapper>
  );
}

export default Todos;
