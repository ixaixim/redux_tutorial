import { useDispatch } from 'react-redux'
import { reactionAdded } from './postsSlice'

const reactionEmoji = {
    thumbsUp: '👍',
    hooray: '🎉',
    heart: '❤️',
    rocket: '🚀',
    eyes: '👀',
}

const ReactionButtons = ({ post }) => {
    const dispatch = useDispatch()

    // key: name, value: emoji
    // Object.entries returns an array of a given object's own enumerable string-keyed property [key, value] pairs
    // map over the array and return a button for each emoji
    const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
        return (
            <button
                key={name}
                type='button'
                className='reactionButton'
                onClick={() => {
                    console.log(`Button clicked: ${name}`);
                    dispatch(reactionAdded({ postId: post.id, reaction: name }));
                    console.log('after dispatch')
                }}
            >
                {emoji} {post.reactions[name]}
            </button>
        )
    })

    return <div>{reactionButtons}</div>
}

export default ReactionButtons