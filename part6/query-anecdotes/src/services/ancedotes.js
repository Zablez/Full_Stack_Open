import axios from "axios"

const baseurl = 'http://localhost:3001/anecdotes'

const getAncedotes = async () => {
    const res = await axios.get(baseurl);
    return res.data
}

const createAncedotes = async (object) => {
    const res = await axios.post(baseurl, object);
    return res.data
}

const voteAncedotes = async (object) => {
    const res = await axios.put(`${baseurl}/${object.id}`, object);
    return res.data
}

export { getAncedotes, createAncedotes, voteAncedotes }