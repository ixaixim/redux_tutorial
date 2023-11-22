import { useSelector } from 'react-redux'
import { selectAllPosts, getPostsError, getPostsStatus } from './postsSlice' 
import PostsExcerpt from './PostsExcerpt'

const PostsList = () => {

    // useSelector is a hook that takes state provided by the context and returns data from the Redux store 
    const posts = useSelector(selectAllPosts)
    const error = useSelector(getPostsError)
    const postsStatus = useSelector(getPostsStatus)
    
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
            {content}
        </section>
    )
}

export default PostsList