import styled from "styled-components";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { createPortal } from "react-dom";
import { useOutsideClick } from "../hooks/useOutsideClick";

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(2px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;

const Modal = styled.div`
  background-color: white;
  padding: 2.4rem;
  border-radius: 1rem;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  width: 90%;
  max-width: 400px;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  font-size: 1.6rem;
  margin-bottom: 2rem;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`;

const Button = styled.button`
  background-color: ${(props) =>
    props.variant === "cancel" ? "#ddd" : "var(--color-brand-500)"};
  color: ${(props) => (props.variant === "cancel" ? "#333" : "#fff")};
  border: none;
  padding: 0.8rem 1.6rem;
  border-radius: 5px;
  font-size: 1.4rem;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

function ModalEditTask({ todo, onCancel }) {
  const { editTask } = useAuth();
  const [newTitle, setNewTitle] = useState(todo.title);
  const ref = useOutsideClick(onCancel);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!newTitle) return;
    await editTask(todo.id, newTitle);
    onCancel();
  }

  return createPortal(
    <Overlay>
      <Modal ref={ref}>
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <Buttons>
            <Button type="button" variant="cancel" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </Buttons>
        </form>
      </Modal>
    </Overlay>,
    document.body
  );
}

export default ModalEditTask;
