import React from "react";
import styled from "styled-components";
import {Link,withRouter} from "react-router-dom";
import Input from "./Input";
import useInput from "../Hooks/useInput";
import { Compass, HeartEmpty, User, Logo } from "./Icons";
import { useQuery } from "react-apollo-hooks";
import { ME } from "../SharedQueries";

// style 관련
const Header = styled.header`
    width: 100%;
    background-color: white;
    border: 0;
    border-bottom: ${props=>props.theme.boxBorder};
    border-radius: 0px;
    margin-bottom: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 25px 0px;
    z-index: 2;
`;

const HeaderWrapper = styled.div`
    width: 100%;
    max-width: ${props=>props.theme.maxWidth};
    display: flex;
    justify-content: center;
`;

const HeaderColumn = styled.div`
    width: 33%;
    text-align: center;
    &:first-child{
        margin-right:auto;
        text-align: left;
    }
    &:last-child{
        margin-left: auto;
        text-align: right;
    }
`;

const SearchInput = styled(Input)`
    background-color: ${props=>props.theme.bgColor};
    padding: 5px;
    font-size: 14px;
    border-radius: 3px;
    height: auto;
    text-align: center;
    width: 70%;
    &::placeholder{
        opacity: 0.8;
        font-weight: 200;
    }
`;

const HeaderLink = styled(Link)`
    &:not(:last-child){
        margin-right: 30px;
    }
`;

export default withRouter(({history}) => {
    const search = useInput("");
    // query 사용하기 위한 hook
    const {data, loading} = useQuery(ME);
    if (loading){
        return "";
    };
    const {me} = data;
    console.log(me);
    // withRouter에서 주는 object 중에서 history.push 이용해서 해당 url로 렌더링
    const onSearchSubmit = (e) => {
        e.preventDefault();
        history.push(`/search?term=${search.value}`);
    };
    return (
        <Header>
            <HeaderWrapper>
                <HeaderColumn>
                    <Link to="/">
                        <Logo />
                    </Link>
                </HeaderColumn>
                <HeaderColumn>
                    <form onSubmit={onSearchSubmit}>
                        <SearchInput value={search.value} onChange={search.onChange} placeholder="Search"/>
                    </form>
                </HeaderColumn>
                <HeaderColumn>
                    <HeaderLink to="/explore">
                        <Compass />
                    </HeaderLink>
                    <HeaderLink to="/notifications">
                        <HeartEmpty />
                    </HeaderLink>
                    {!me ? (
                        <HeaderLink to="/#">
                            <User />
                        </HeaderLink>
                    ) : (
                        <HeaderLink to={me.username}><User /></HeaderLink>
                    )}
                </HeaderColumn>
            </HeaderWrapper>
        </Header>
    );
});