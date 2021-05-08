import axios from 'axios';

export const getAll = () => {
    return axios.get("https://jsonplaceholder.typicode.com/posts")
    .then(response => {
      const {data} = response
      return data
    })
}

export const create = (note) => {
    return axios.post("https://jsonplaceholder.typicode.com/posts", note)
        .then(response => {
            const {data} = response
            return data
        })
}