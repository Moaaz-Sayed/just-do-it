import styled from "styled-components";

const StyledInput = styled.input`
  flex: 1;
  padding: 1.4rem 1.6rem;
  font-size: 1.8rem;
  border: 1px solid var(--color-grey-300);
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  color: var(--color-grey-700);

  &:focus {
    outline: 2px solid var(--color-brand-600);
  }
`;

function Input({ placeholder, type, value, onChange }) {
  return (
    <StyledInput
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
}

export default Input;
