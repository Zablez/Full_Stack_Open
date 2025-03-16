import { useState } from "react"
import { useNavigate } from "react-router-dom"
import useField from "../hooks"

const CreateNew = (props) => {

    const navigate = useNavigate()

    const [content, resetContent] = useField('text')
    const [author, resetAuthor] = useField('text')
    const [info, resetInfo] = useField('text')

    const handleSubmit = (e) => {
        e.preventDefault()
        props.addNew({
            content: content.value,
            author: author.avlue,
            info: info.value,
            votes: 0
        })

        navigate('/')
    }

    const resetForm = () => {
        resetAuthor()
        resetContent()
        resetInfo()
    }

    return (
        <div>
            <h2>create a new anecdote</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    content
                    <input name='content' {...content} />
                </div>
                <div>
                    author
                    <input name='author' {...author} />
                </div>
                <div>
                    url for more info
                    <input name='info' {...info} />
                </div>
                <button type="submit">create</button>
                <button type="button" onClick={resetForm}>reset</button>
            </form>
        </div>
    )
}

export default CreateNew