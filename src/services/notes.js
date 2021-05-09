import axios from 'axios';

const baseURL = "http://localhost:3001/api/notes"

let token = null;

const setToken = newToken => {
    token = `Bearer ${newToken}`;
}


const getAll = () => {
    return axios.get(baseURL)
    .then(response => {
      const {data} = response
      return data
    })
}

const create = (note) => {
    const config = {
        headers: {
            Authorization: token
        }
    }
    
    return axios.post(baseURL, note, config)
        .then(response => {
            const {data} = response
            return data
        })
}

const update = (id, note) => {

    console.log("PUT", token)

    const config = {
        headers: {
            Authorization: token
        }
    }
    
    return axios.put(`${baseURL}/${id}`, note, config)
        .then(response => {
            const {data} = response
            return data
        })
}

export default {setToken, getAll, create, update}