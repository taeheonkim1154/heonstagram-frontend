import React from "react";
import {gql} from "apollo-boost";
import { withRouter } from "react-router";
import { useQuery, useMutation } from "react-apollo-hooks";
import ProfilePresenter from "./ProfilePresenter";

const GET_USER = gql`
    query seeUser($username: String!) {
        seeUser(username: $username) {
            id
            avatar
            username
            fullName
            isFollowing
            isSelf
            bio
            followingCount
            followersCount
            posts {
                id
                files {
                    url
                }
                likeCount
                commentCount
            }
            postsCount
        }
    }
`;

export const LOG_OUT = gql`
    mutation logUserOut {
        logUserOut @client
    }
`;

export default withRouter(({match: {params : {username}}}) => {
    const {data, loading} = useQuery(GET_USER, {variables: {username}});
    const [logOut, {loading8}] = useMutation(LOG_OUT);
    return <ProfilePresenter loading={loading} logOut={logOut} data={data} />;
});