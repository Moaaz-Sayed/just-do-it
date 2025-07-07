import styled from "styled-components";
import { Link } from "react-router-dom";

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #fefefe;
  text-align: center;
  padding: 2rem;

  h1 {
    font-size: 6rem;
    color: #e74c3c;
  }

  p {
    font-size: 1.8rem;
    margin-bottom: 2rem;
  }

  a {
    font-size: 1.6rem;
    color: #3498db;
    text-decoration: underline;

    &:hover {
      color: #2980b9;
    }
  }
`;

function PageNotFound() {
  return (
    <Wrapper>
      <h1>404</h1>
      <p>Page not found</p>
      <Link to="/">Go back to Home</Link>
    </Wrapper>
  );
}

export default PageNotFound;
