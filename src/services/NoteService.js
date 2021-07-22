import httpClient from '../http-common';

const getAll = () => {
    return httpClient.get("/notes")
}

const create = (data) => {
    return httpClient.post("/notes", data);
}

const get = (id) => {
    return httpClient.get(`/notes/${id}`);
}

const remove = (id) => {
    return httpClient.delete(`/notes/${id}`);
}

const funcs = {
    getAll, create, get, remove
}

export default funcs;