import { createSlice, nanoid } from '@reduxjs/toolkit';
import { sub } from 'date-fns';

const initialState = [
    { 
        id: '1', 
        title: 'First Post!', 
        content: 'Hello!', 
        date: sub(new Date(), { minutes: 10 }).toISOString(),
        reactions: {
            thumbsUp: 0,
            hooray: 0,
            heart: 0,
            rocket: 0,
            eyes: 0
        },
    },
    { 
        id: '2', 
        title: 'Second Post', 
        content: 'More text', 
        date: sub(new Date(), { minutes: 5 }).toISOString(),
        reactions: {
            thumbsUp: 1,
            hooray: 0,
            heart: 0,
            rocket: 0,
            eyes: 0
        }
    }
];

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    // reducers are functions that handle state changes
    // payload is the data that was passed to the action
    // push the new post object into the state array
    reducers: {
        postAdded: {
            reducer(state, action) {
                state.push(action.payload);
            },
            prepare(title, content, userId) {
                return {
                    payload: {
                        id: nanoid(),
                        title,
                        content,
                        date: new Date().toISOString(), // create a timestamp for the post as it is added
                        userId,
                        reactions: {
                            thumbsUp: 0,
                            hooray: 0,
                            heart: 0,
                            rocket: 0,
                            eyes: 0
                        }
                    }
                }
            }
        },
        reactionAdded(state, action) {
            const { postId, reaction } = action.payload;
            const existingPost = state.find(post => post.id === postId);
            if (existingPost) {
                existingPost.reactions[reaction]++;
            }
        }
    }
    // inside createSlice, immer.js is used to allow us to write "mutating" logic in reducers
    // postAdded has a reducer and a prepare callback function
    // reducer updates the state using action payload
    // prepare callback function is used to generate the payload value (in this case 'title' and 'content')
    // as a result: the postAdded reducer will expect 'title' and 'content' as arguments (not the whole post object)
});

//export all posts
export const selectAllPosts = (state) => state.posts;

export const { postAdded, reactionAdded } = postsSlice.actions;

export default postsSlice.reducer;