import styled from "styled-components";

const StyledButtonForm = styled.button`
  padding: 1.2rem;
  background-color: var(--color-brand-600);
  color: white;
  font-size: 1.6rem;
  border: none;
  border-radius: var(--border-radius-sm);

  &:hover {
    background-color: var(--color-brand-700);
  }
`;

function Button({ children, onClick, autoFocus }) {
  return (
    <StyledButtonForm onClick={onClick} autoFocus={autoFocus}>
      {children}
    </StyledButtonForm>
  );
}

export default Button;
