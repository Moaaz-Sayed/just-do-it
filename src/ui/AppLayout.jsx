import { Outlet } from "react-router-dom";
import Header from "./Header";
import Logo from "./Logo";
import styled from "styled-components";

const LayoutWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Main = styled.main`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background-color: var(--color-grey-50);
`;

function AppLayout() {
  return (
    <LayoutWrapper>
      <Header>
        <Logo />
      </Header>
      <Main>
        <Outlet />
      </Main>
    </LayoutWrapper>
  );
}

export default AppLayout;
