import { useSelector } from 'react-redux'
import { selectAllPosts, getPostsError, getPostsStatus, fetchPosts } from './postsSlice' 
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import PostsExcerpt from './PostsExcerpt'
// not used, but is an alternative. 
// selectAllPosts is a selector function that can be used to extract data from the Redux store state.

const PostsList = () => {
    const dispatch = useDispatch()

    // useSelector is a hook that takes state provided by the context and returns data from the Redux store 
    const posts = useSelector(selectAllPosts)
    const error = useSelector(getPostsError)
    const postsStatus = useSelector(getPostsStatus)

    useEffect(() => {
        if (postsStatus === 'idle') {
            dispatch(fetchPosts())
        }
    }, [postsStatus, dispatch])
    
    let content;
    if (postsStatus === 'loading') {
        content = <p>Loading...</p>;
    } else if (postsStatus === 'succeeded') {
        const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))
        content = orderedPosts.map(post =>  <PostsExcerpt key={post.id} post={post} />)
    } else if (postsStatus === 'failed') {
        content = <p>{error}</p>
    }
    return (
        <section>
            <h2>Posts</h2>
            {content}
        </section>
    )
}

export default PostsList