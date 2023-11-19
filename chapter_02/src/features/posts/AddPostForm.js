import React from 'react'
import { useState } from 'react'
// useState is a local state to this component (no need to use Redux useSelector hook)
import { useDispatch, useSelector } from 'react-redux'
import { postAdded } from './postsSlice'
import { selectAllUsers } from '../users/usersSlice'

const AddPostForm = () => {
    const dispatch = useDispatch()
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [userId, setUserId ] = useState('')

    const users = useSelector(selectAllUsers)

    const onTitleChanged = e => setTitle(e.target.value)
    const onContentChanged = e => setContent(e.target.value)
    const onAuthorChanged = e => setUserId(e.target.value)

    // when clicking the button we dispatch the redux reducer action 
    // the action will save the new post to the Redux store 
    // we then reset the form fields to empty strings
    const onSavePostClicked = () => {
        if (title && content) {
            dispatch(
                postAdded(title, content, userId) // the slice handles title and content
            )
            setTitle('')
            setContent('')
        }
    }

    const canSave = Boolean(title) && Boolean(content) && Boolean(userId) // check if all fields are filled out

    const usersOptions = users.map(user => (
        <option key={user.id} value={user.id}>
            {user.name}
        </option>
    ))

  return (
    <section>
        <h2>Add a New Post</h2>
        <form>
            <label htmlFor='postTitle'>Post Title:</label>
            <input
                type='text'
                id='postTitle'
                name='postTitle'
                value={title}
                onChange={onTitleChanged}
            />
            <label htmlFor='postAuthor'>Author:</label>
            <select id='postAuthor' value={userId} onChange={onAuthorChanged}>
                <option value=''></option>
                {usersOptions}
            </select>

            <label htmlFor='postContent'>Content:</label>
            <textarea
                id='postContent'
                name='postContent'
                value={content}
                onChange={onContentChanged}
            />
            <button 
                type='button'
                onClick={onSavePostClicked}
                disabled={!canSave} // disable the button if the form is not filled outw
            >Save Post</button>
        </form>
    </section>

  )
}

export default AddPostForm