// 어떤 라우터들을 다루는지 나옴
import React from "react";
import PropTypes from "prop-types";
import {HashRouter as Router, Route, Switch} from "react-router-dom";
import Auth from "../Routes/Auth";
import Feed from "../Routes/Feed";


// 로그인이 되어있으면, 바로 피드 라우터로 이동 or 로그안 안되어 있으면 로그인 페이지로 이동
const LoggedInRoutes = () => <><Route exact path="/" component={Feed}></Route></>

const LoggedOutRoutes = () => <><Route exact path="/" component={Auth}></Route></>

const AppRouter = ({isLoggedIn}) => (
    <Router>
        <Switch>{isLoggedIn? <LoggedInRoutes/> : <LoggedOutRoutes/>}</Switch>
    </Router>
);

AppRouter.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired
};

export default AppRouter;