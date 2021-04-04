import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:61008',
    header: {
        'Content-Type': 'application / json'
    }
})

export default api;