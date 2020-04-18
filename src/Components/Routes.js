// 어떤 라우터들을 다루는지 나옴
import React from "react";
import PropTypes from "prop-types";
import {Route, Switch, Redirect} from "react-router-dom";
import Auth from "../Routes/Auth";
import Feed from "../Routes/Feed";
import Explore from "../Routes/Explore";
import Profile from "../Routes/Profile";
import Search from "../Routes/Search";
import ViewPost from "../Routes/ViewPost";


// 로그인이 되어있으면, 바로 피드 라우터로 이동 or 로그안 안되어 있으면 로그인 페이지로 이동
const LoggedInRoutes = () => (
    // 스위치는 딱 하나의 라우터만 렌더링 해준다
    <Switch>
        <Route exact path="/" component={Feed} />
        <Route path="/explore" component={Explore} />
        <Route path="/search" component={Search} />
        <Route path="/:username" component={Profile} />
        <Route path="/viewPost/:file.id" component={ViewPost} />
        <Redirect from="*" to="/" />
    </Switch>
);

const LoggedOutRoutes = () => (
    <Switch>
        <Route exact path="/" component={Auth}></Route>
        <Redirect from="*" to="/" />
    </Switch>
);

const AppRouter = ({isLoggedIn}) => (
    isLoggedIn? <LoggedInRoutes/> : <LoggedOutRoutes/>
);

AppRouter.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired
};

export default AppRouter;