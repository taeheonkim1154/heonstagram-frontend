import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import ViewPostPresenter from "./ViewPostPresenter";
import {gql} from "apollo-boost";
import useInput from "../../Hooks/useInput";
import { useMutation } from "react-apollo-hooks";
import {toast} from "react-toastify";

const TOGGLE_LIKE = gql`
    mutation toggleLike($postId: String!){
        toggleLike(postId: $postId)
    }
`;

const ADD_COMMENT = gql`
    mutation addComment($postId: String!, $text: String!){
        addComment(postId:$postId, text: $text){
            id
            text
            user{
                username
            }
        }
    }
`;

const FULLPOST_QUERY = gql`
    query seeFullPost($id: String!){
        id
        location
        caption
        user {
            id
            avatar
            username
        }
        files {
            id
            url
        }
        likeCount
        isLiked
        comments {
            id
            text
            user {
                id
                username
            }
        }
        createdAt
    }
`;

const ViewPostContainer = ({
    id,
    user,
    files,
    likeCount,
    isLiked,
    comments,
    createdAt,
    caption,
    location
}) => {
    const [isLikedS, setIsLiked] = useState(isLiked);
    const [likeCountS, setLikeCount] = useState(likeCount);
    const [currentItem, setCurrentItem] = useState(0);
    const [selfComments, setSelfComments] = useState([]);
    const comment = useInput("");
    const [toggleLikeMutation, {loading9}] = useMutation(TOGGLE_LIKE, {variables: {postId: id}});
    const [addCommentMutation, {loading10}] = useMutation(ADD_COMMENT, {variables: {postId: id, text: comment.value}});
    useEffect(()=>{
        const totalFiles = files.length;
        if (currentItem === totalFiles -1) {
            setTimeout(() => setCurrentItem(0), 3000);
        } else {
            setTimeout(() => setCurrentItem(currentItem + 1), 3000);
        }
    }, [currentItem, files]);

    const toggleLike = () => {
        toggleLikeMutation();
        if(isLikedS === true){
            setIsLiked(false);
            setLikeCount(likeCountS -1);
        } else {
            setIsLiked(true);
            setLikeCount(likeCountS +1);
        }
    };

    const onKeyPress = async(event) => {
        const {which} = event;
        if (which === 13){
            event.preventDefault();
            comment.setValue("");
            try {
                const {data : {addComment}} = await addCommentMutation();
                setSelfComments([...selfComments, addComment]);
            } catch {
                toast.error("Can't send comment");
            }
        }
        return;
    };

    return (
        <ViewPostPresenter
            user={user}
            files={files}
            likeCount={likeCountS}
            location={location}
            caption={caption}
            isLiked={isLikedS}
            comments={comments}
            createdAt={createdAt}
            newComment={comment}
            setIsLiked={setIsLiked}
            setLikeCount={setLikeCount}
            currentItem={currentItem}
            toggleLike={toggleLike}
            onKeyPress={onKeyPress}
            selfComments={selfComments}
        />
    );
};

ViewPostContainer.propTypes = {
    id: PropTypes.string.isRequired,
    user: PropTypes.shape({
      id: PropTypes.string.isRequired,
      avatar: PropTypes.string,
      username: PropTypes.string.isRequired
    }).isRequired,
    files: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired
      })
    ).isRequired,
    likeCount: PropTypes.number.isRequired,
    isLiked: PropTypes.bool.isRequired,
    comments: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        user: PropTypes.shape({
          id: PropTypes.string.isRequired,
          username: PropTypes.string.isRequired
        }).isRequired
      })
    ).isRequired,
    caption: PropTypes.string.isRequired,
    location: PropTypes.string,
    createdAt: PropTypes.string.isRequired
};

export default ViewPostContainer;