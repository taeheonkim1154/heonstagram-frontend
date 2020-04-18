import React from 'react';
import {gql} from "apollo-boost";
import styled, {ThemeProvider} from "styled-components";
import {HashRouter as Router} from "react-router-dom";
import GlobalStyles from "../Styles/GlobalStyles";
import Theme from '../Styles/Theme';
import Routes from './Routes';
import { useQuery } from 'react-apollo-hooks';
import {ToastContainer, toast} from "react-toastify";
import Footer from './Footer';
import Header from './Header';

// 로그인 상태 나누는 query. @client를 쓰면 데이터를 백엔드 API에서 안 가져오고, 로컬 캐시에서 가져온다
const QUERY = gql`
  {
    isLoggedIn @client
  }
`;

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: ${props => props.theme.maxWidth};
  width: 100%;
`;

export default () => {
  // isLoggedIn 상태 확인하는 query 본다
  const {data : {isLoggedIn}} = useQuery(QUERY);
  return (
    <ThemeProvider theme={Theme}>
      <>
        <GlobalStyles />
        <Router>
          <>
            {isLoggedIn && <Header />}
            <Wrapper>
              {/* isLoggedIn 상태에 따라 Router 실행 */}
              <Routes isLoggedIn={isLoggedIn}/>
              <Footer />
            </Wrapper>
          </>
        </Router>
        <ToastContainer position={toast.POSITION.BOTTOM_LEFT}/>
      </>
    </ThemeProvider>
  );
};