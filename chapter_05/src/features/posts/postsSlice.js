import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import { sub } from 'date-fns';
import axios from 'axios';

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';

const initialState = {
    posts: [],
    status: 'idle', // idle, loading, succeeded, failed
    error: null, 
    count: 0
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

export const updatePost = createAsyncThunk('posts/updatePost', async (initialPost) => {
    const { id } = initialPost;
    try {
        const response = await axios.put(`${POSTS_URL}/${id}`, initialPost);
        return response.data;
    } catch (err) {
        // return err.message;
        return initialPost; // only for testing Redux
    }
})

export const deletePost = createAsyncThunk('posts/deletePost', async (initialPost) => {
    const { id } = initialPost;
    try {
        const response = await axios.delete(`${POSTS_URL}/${id}`);
        if (response?.status === 200) return initialPost;
        return `${response?.status}: ${response?.statusText}`;
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
        reactionAdded(state, action) {
            const { postId, reaction } = action.payload;
            const existingPost = state.posts.find(post => post.id === postId);
            if (existingPost) {
                existingPost.reactions[reaction]++;
            }
        },
        increaseCount(state, action) {
            state.count = state.count + 1
        }
    },

    // handle async actions with extraReducers
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
            .addCase(updatePost.fulfilled, (state, action) => {
                if (!action.payload?.id) {
                    console.log('Update could not complete'); 
                    console.log(action.payload);
                    return;
                }
                const { id } = action.payload;
                action.payload.date = new Date().toISOString();
                const posts = state.posts.filter(post => post.id !== id);
                state.posts = [...posts, action.payload];
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                if (!action.payload?.id) {
                    console.log('Delete could not complete'); 
                    console.log(action.payload);
                    return;
                }
                const { id } = action.payload;
                const posts = state.posts.filter(post => post.id !== id);
                state.posts = posts;
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
export const getCount = (state) => state.posts.count;

export const selectPostById = (state, postId) => state.posts.posts.find(post => post.id === postId);

// memoized selector: only recalculates if the value of the input-selector changes
// helps because userpage will re-render only if the posts for that user change, not if the header changes
export const selectPostsByUser = createSelector(
    [selectAllPosts, (state, userId) => userId],
    (posts, userId) => posts.filter(post => post.userId === userId)
);

export const { increaseCount, reactionAdded } = postsSlice.actions;

export default postsSlice.reducer;