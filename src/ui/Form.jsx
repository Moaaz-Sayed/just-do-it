import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(to right, #e0f7ff, #ffffff);
  overflow: hidden;
  padding: 2rem;
  box-sizing: border-box;
`;

const FormBox = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-200);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);
  padding: 3.2rem;
  width: 100%;
  max-width: 40rem;
`;

const Heading = styled.div`
  font-size: 2.4rem;
  text-align: center;
  margin-bottom: 2.4rem;
  color: var(--color-grey-800);
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

const StyledLink = styled(Link)`
  font-size: 1.4rem;
  text-align: center;
  display: block;
  margin-top: 1.6rem;
  color: var(--color-brand-600);
  text-decoration: none;

  &:hover {
    text-decoration: underline;
    color: var(--color-brand-700);
  }
`;

function Form({ heading, linkText, linkTo, onSubmit, children }) {
  return (
    <Container>
      <FormBox>
        <Heading>{heading}</Heading>
        <StyledForm onSubmit={onSubmit}>{children}</StyledForm>

        {linkText && linkTo && <StyledLink to={linkTo}>{linkText}</StyledLink>}
      </FormBox>
    </Container>
  );
}

export default Form;
