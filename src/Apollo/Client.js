import ApolloClient from "apollo-boost";
import {defaults, resolvers} from "./LocalState";

export default new ApolloClient({
    // 내 graphql API 서버는 포트넘버 3002번에서 돌아간다!!!!!!! 프론트엔드는 3000번인데 이미 사용중이라 3003번으로 되고!
    uri: "http://localhost:3002",
    clientState: {
        defaults,
        resolvers
    }
});