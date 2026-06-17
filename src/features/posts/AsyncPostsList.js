// import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
// import { fetchPosts, selectPostIds, selectPostById, selectPostsStatus, selectPostsError } from "./asyncPostsSlice";
import AsyncPostAuthor from "./AsyncPostAuthor";
import AsyncReactionButtons from "./AsyncReactionButtons";
import { useMemo } from "react";
import Spinner from "../../components/Spinner";

import { useGetPostsQuery } from "../api/apiSlice";

import classnames from "classnames";

// function PostExcerpt({postId}) {
function PostExcerpt({post}) {
    console.log('PostExcerpt render');
    console.log('PostExcerpt post: ', post);
    
    // const post = useSelector((state) => selectPostById(state, postId))
    return <article>
        <h3><Link to={`/async/posts/${post.id}`}>{post.title}</Link></h3>
        <p>{post.content.substring(0, 100)}</p>
        <AsyncPostAuthor userId={post.user}></AsyncPostAuthor>
        <AsyncReactionButtons post={post}></AsyncReactionButtons>
    </article>
}

export default function AsyncPostsList() {
    const {
        data: posts = [],
        isLoading,
        isFetching,
        isSuccess,
        isError,
        error,
        refetch
    } = useGetPostsQuery()

    console.log('posts: ', posts);
    
    const sortedPosts = useMemo(() => {
        const sortedPosts = posts.slice()
        sortedPosts.sort((a, b) => b.date.localeCompare(a.date))
        return sortedPosts
    }, [posts])

    console.log('sortedPosts: ', sortedPosts);

    let content = null
    if (isLoading) {
        content = <Spinner text='Loading...'></Spinner>
    } else if (isSuccess) {
        const renderedPosts = sortedPosts.map((post) =>  <PostExcerpt key={post.id} post={post}></PostExcerpt>)
        const containerClassname = classnames('posts-container', { disabled: isFetching })
        content = <div className={containerClassname}>{ renderedPosts }</div>
    } else if (isError) {
        content = <div>{error.toString()}</div>
    }

    // console.log('AsyncPostsList render');
    // const dispatch = useDispatch()
    // const postStatus = useSelector(selectPostsStatus)
    // useEffect(() => {
    //     if (postStatus === 'idle') {
    //         dispatch(fetchPosts())
    //     }
    // }, [postStatus, dispatch])

    // // const posts = useSelector(selectAllPosts)
    // const orderedPostIds = useSelector(selectPostIds)
    // const postsError= useSelector(selectPostsError)
    // let content = null
    // if (postStatus === 'pending') {
    //     content = <Spinner text='Loading...'></Spinner>
    // } else if (postStatus === 'succeeded') {
    //     content = orderedPostIds.map((postId) => <PostExcerpt key={postId} postId={postId}>
    //     </PostExcerpt>)
    // } else if (postStatus === 'rejected') {
    //     content = <div>{postsError}</div>
    // }

    return (<section>
        <h2>Posts</h2>
        <button onClick={refetch}>{ 'Refetch Posts' }</button>
        {content}
    </section>)
}