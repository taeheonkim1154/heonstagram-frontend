// AuthPresenter.js파일의 양식을 받아 Auth와 관련한 useState 추가 -> index.js에서 렌더링 됨

import React, {useState} from "react";
import {useMutation} from "react-apollo-hooks";
import AuthPresenter from "./AuthPresenter";
import useInput from "../../Hooks/useInput";
import { LOG_IN, CREATE_ACCOUNT, CONFIRM_SECRET, LOCAL_LOG_IN } from "./AuthQueries";
import { toast } from "react-toastify";


export default () => {
    const [action, setAction] = useState("logIn");
    // userInput.js의 훅을 통해, 가변하는 값들을 넣을 수 있다
    const username = useInput("");
    const firstName = useInput("");
    const lastName = useInput("");
    const secret = useInput("");
    const email = useInput("");

    // AuthQueries.js에서 만든 mutation 사용하는 방법 (react-apollo-hooks docs에서 검색 가능!)
    const [requestSecretMutation, {loading}] = useMutation(LOG_IN, {
        variables: {email: email.value}
    });

    const [createAccountMutation, {loading1}] = useMutation(CREATE_ACCOUNT, {
        variables: {
            email: email.value,
            username: username.value,
            firstName: firstName.value,
            lastName: lastName.value
        }
    });

    const [confirmSecretMutation ,{loading2}] = useMutation(CONFIRM_SECRET, {
        variables: {
            email: email.value,
            secret: secret.value
        }
    });

    const [localLogInMutation, {loading3}] = useMutation(LOCAL_LOG_IN);

    // 로그인 버튼 눌러도 새로고침 안되도록 하는 기능
    const onSubmit = async(e) => {
        e.preventDefault();
        if (action === "logIn"){
            if (email.value !== ""){
                try {
                    const {data: {requestSecret}} = await requestSecretMutation();
                    // 계정이 없는 경우, 에러메세지 출력하고, 2초 후에 sign up 페이지로 이동함
                    if(!requestSecret){
                        toast.error("You don't have an account yet, create one!");
                        setTimeout(() => setAction("signUp"), 3000);
                    } else {
                        toast.success("Check your inbox for your login secret");
                        setAction("confirm");
                    }
                } catch {
                    toast.error("Can't request secret, try again");
                }
            } else {
                toast.error("Email is required");
            }
        } else if (action === "signUp") {
            if(email.value !== "" &&
                username.value !== "" &&
                firstName.value !== "" &&
                lastName.value !== ""
            ){
                try {
                    const {data: {createAccount}} = await createAccountMutation();
                    if(!createAccount){
                        toast.error("Can't create account");
                    } else {
                        toast.success("Account created! Log In now");
                        setTimeout(()=>setAction("logIn"), 3000);
                    }
                } catch(e) {
                    toast.error(e.message);
                }
            } else {
                toast.error("All fields are required");
            }
        } else if(action === "confirm"){
            if(secret.value !== ""){
                try {
                    const {data: {confirmSecret : token}} = await confirmSecretMutation();
                    // secret이 일치하면, token 얻게 됨!
                    if (token !== "" && token !== undefined){
                        localLogInMutation({ variables: {token}});
                    } else {
                        throw Error();
                    }
                    //이 부분에 로그인 파트 넣기!!
                } catch {
                    toast.error("Can't confirm secret");
                }
            }
        }
    };

    return <AuthPresenter setAction={setAction} action={action} username={username} firstName={firstName} lastName={lastName} email={email} secret={secret} onSubmit={onSubmit}/>;
};