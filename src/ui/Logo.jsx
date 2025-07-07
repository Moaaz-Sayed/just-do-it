import styled from "styled-components";

const StyledLogo = styled.h1`
  font-weight: 700;
  font-size: ${(props) => (props.size === "large" ? "3.2rem" : "2rem")};
  color: var(--color-brand-600);
  text-align: center;

  span {
    color: var(--color-grey-700);
    font-weight: 500;
  }
`;

function Logo({ size = "small" }) {
  return (
    <StyledLogo size={size}>
      Just <span>Do it 💪</span>
    </StyledLogo>
  );
}

export default Logo;
