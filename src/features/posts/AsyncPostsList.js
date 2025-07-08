import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { fetchPosts, selectPostIds, selectPostById, selectPostsStatus, selectPostsError } from "./asyncPostsSlice";
import AsyncPostAuthor from "./AsyncPostAuthor";
import AsyncReactionButtons from "./AsyncReactionButtons";
import { useEffect } from "react";
import Spinner from "../../components/Spinner";
import React from "react";

function PostExcerpt({postId}) {
    console.log('PostExcerpt render');
    const post = useSelector((state) => selectPostById(state, postId))
    return <article>
        <h3><Link to={`/async/posts/${post.id}`}>{post.title}</Link></h3>
        <p>{post.content.substring(0, 100)}</p>
        <AsyncPostAuthor userId={post.user}></AsyncPostAuthor>
        <AsyncReactionButtons post={post}></AsyncReactionButtons>
    </article>
}

export default function AsyncPostsList() {
    console.log('AsyncPostsList render');
    const dispatch = useDispatch()
    const postStatus = useSelector(selectPostsStatus)
    useEffect(() => {
        if (postStatus === 'idle') {
            dispatch(fetchPosts())
        }
    }, [postStatus, dispatch])

    // const posts = useSelector(selectAllPosts)
    const orderedPostIds = useSelector(selectPostIds)
    const postsError= useSelector(selectPostsError)
    let content = null
    if (postStatus === 'pending') {
        content = <Spinner text='Loading...'></Spinner>
    } else if (postStatus === 'succeeded') {
        content = orderedPostIds.map((postId) => <PostExcerpt key={postId} postId={postId}>
        </PostExcerpt>)
    } else if (postStatus === 'rejected') {
        content = <div>{postsError}</div>
    }

    return (<section>
        <h2>Posts</h2>
        {content}
    </section>)
}