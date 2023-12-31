import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit';
import { sub } from 'date-fns';
import axios from 'axios';

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';

const initialState = {
    posts: [],
    status: 'idle', // idle, loading, succeeded, failed
    error: null
}

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    try {
        const response = await axios.get(POSTS_URL);
        return response.data
    } catch (err) {
        return err.message;

    }
})

export const addNewPost = createAsyncThunk('posts/addNewPost', async (initialPost) => {
    try {
        const response = await axios.post(POSTS_URL, initialPost);
        return response.data;
    } catch (err) {
        return err.message;
    }
})

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    // reducers are functions that handle state changes
    // payload is the data that was passed to the action
    // push the new post object into the state array
    reducers: {
        postAdded: {
            // reducer function
            reducer(state, action) {
                state.posts.push(action.payload);
            },
            // prepares the payload value for the reducer
            prepare(title, body, userId) {
                return {
                    payload: {
                        id: nanoid(),
                        title,
                        body,
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
            const existingPost = state.posts.find(post => post.id === postId);
            if (existingPost) {
                existingPost.reactions[reaction]++;
            }
        }
    },

    extraReducers(builder) {
        //similar to switch statement, but based on builder.addCase(action, reducer)
        // these operations set the status state of posts depending on fetchPosts status
        builder
            .addCase(fetchPosts.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = 'succeeded';

                let min = 1;
                const loadedPosts = action.payload.map(post => {
                    post.date = sub(new Date(), { minutes: min++ }).toISOString();
                    post.reactions = {
                        thumbsUp: 0,
                        hooray: 0,
                        heart: 0,
                        rocket: 0,
                        eyes: 0
                    }
                    return post;
                });
                // Filter out any posts that have an ID already present in state.posts
                const newPosts = loadedPosts.filter(
                    loadedPost => !state.posts.some(post => post.id === loadedPost.id)
                );
                // Add any fetched posts to the array
                state.posts = state.posts.concat(newPosts);
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(addNewPost.fulfilled, (state, action) => {
                action.payload.userId = Number(action.payload.userId);
                action.payload.date = new Date().toISOString();
                action.payload.reactions = {
                    thumbsUp: 0,
                    hooray: 0,
                    heart: 0,
                    rocket: 0,
                    eyes: 0
                }
                console.log(action.payload);
                state.posts.push(action.payload);
            })

    }
    // inside createSlice, immer.js is used to allow us to write "mutating" logic in reducers
    // postAdded has a reducer and a prepare callback function
    // reducer updates the state using action payload
    // prepare callback function is used to generate the payload value (in this case 'title' and 'content')
    // as a result: the postAdded reducer will expect 'title' and 'content' as arguments (not the whole post object)
});

//export all posts
export const selectAllPosts = (state) => state.posts.posts;
export const getPostsStatus = (state) => state.posts.status;
export const getPostsError = (state) => state.posts.error;

export const { postAdded, reactionAdded } = postsSlice.actions;

export default postsSlice.reducer;