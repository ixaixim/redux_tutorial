import { useSelector } from 'react-redux'
import { selectAllPosts } from './postsSlice' 
// not used, but is an alternative. 
// selectAllPosts is a selector function that can be used to extract data from the Redux store state.
import PostAuthor from './PostAuthor'
import TimeAgo from './TimeAgo'
import ReactionButtons from './ReactionButtons'

const PostsList = () => {
    // useSelector is a hook that takes state provided by the context and returns data from the Redux store 
    const posts = useSelector(state => state.posts)

    const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date)) 
    // localeCompare converts the date strings to numbers and compares them
    // slice returns a shallow copy of the array
    
    const renderedPosts = orderedPosts.map(post => (
        <article key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content.substring(0, 100)}</p>
            <p className='postCredits'>
                <PostAuthor userId={post.userId} />
                <TimeAgo timestamp={post.date} />
            </p>
            <ReactionButtons post={post} />

        </article>
    ))

    return (
        <section>
            <h2>Posts</h2>
            {renderedPosts}
        </section>
    )
}

export default PostsList