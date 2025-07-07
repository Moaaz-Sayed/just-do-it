import styled from "styled-components";

const StyledHeading = styled.h1`
  font-size: 5.2rem;
  font-weight: 600;
  color: var(--color-grey-800);
  text-align: center;
`;

function Heading({ children }) {
  return <StyledHeading>{children}</StyledHeading>;
}

export default Heading;
