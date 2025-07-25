import { useState } from "react";
import styled from "styled-components";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useOutsideClick } from "../hooks/useOutsideClick";

const Overlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const Modall = styled(motion.div)`
  background: white;
  padding: 2rem 3rem;
  border-radius: 1rem;
  text-align: center;
  max-width: 400px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
`;

const Message = styled.p`
  margin-bottom: 2rem;
  font-size: 1.6rem;
  font-weight: 500;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
`;

const Button = styled.button`
  padding: 0.6rem 1.4rem;
  font-size: 1.4rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  background-color: ${(props) => (props.cancel ? "#ccc" : "#e74c3c")};
  color: white;

  &:hover {
    opacity: 0.9;
  }
`;

const CheckboxWrapper = styled.div`
  margin-top: 1.6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;

  input {
    width: 1.4rem;
    height: 1.4rem;
    cursor: pointer;
  }

  label {
    font-size: 1.3rem;
    cursor: pointer;
    user-select: none;
  }
`;

function Modal({
  onCancel,
  onConfirm,
  message,
  showCheckbox = false,
  onCheckboxChange,
}) {
  const ref = useOutsideClick(onCancel);
  const [checked, setChecked] = useState(false);

  function handleCheckboxChange(e) {
    const isChecked = e.target.checked;
    setChecked(isChecked);
    onCheckboxChange?.(isChecked);
  }

  return createPortal(
    <AnimatePresence>
      <Overlay
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <Modall
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.2 }}
          ref={ref}
        >
          <Message>{message}</Message>

          <Buttons>
            <Button cancel="true" onClick={onCancel}>
              Cancel
            </Button>
            <Button onClick={onConfirm} autoFocus>
              Yes
            </Button>
          </Buttons>

          {showCheckbox && (
            <CheckboxWrapper>
              <input
                type="checkbox"
                id="dont-show-again"
                checked={checked}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="dont-show-again">Don’t show again</label>
            </CheckboxWrapper>
          )}
        </Modall>
      </Overlay>
    </AnimatePresence>,
    document.body
  );
}

export default Modal;
