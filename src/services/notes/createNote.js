import axios from 'axios';

export const createNote = (note) => {
    return axios.post("https://jsonplaceholder.typicode.com/posts", note)
        .then(response => {
            const {data} = response
            return data
        })
}


