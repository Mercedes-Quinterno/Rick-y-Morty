let metadata;
let resultados;
let currentPage = 1;
const BASE_URL = "https://rickandmortyapi.com/api/";

const ENDPOINTS = {
    characters: "character",
    locations: "location",
    episodes: "episode",
}

const fetchApi = (url) => {
    return fetch(url).then((response) => response.json())
        .then((data) => {
            metadata = data.info;
            resultados = data.results;
            return data;
        });
}

const fetchPersonajes = (params) => {
    const urlParams = new URLSearchParams(params).toString();

    return fetchApi(`${BASE_URL}/${ENDPOINTS.characters}?${urlParams}`).then((data) => {
        return data;
    });
}

const fetchUbicaciones = (params) => {
    return fetchApi(`${BASE_URL}/${ENDPOINTS.locations}`);
}

const fetchEpisodios = (params) => {
    return fetchApi(`${BASE_URL}/${ENDPOINTS.episodes}`);
}

const next = () => {
    return fetchApi(metadata.next).then((data) => {
        currentPage = currentPage + 1;
        return data;
    });
}

const prev = () => {
    return fetchApi(metadata.prev).then((data) => {
        currentPage = currentPage - 1;
        return data;
    });
}

const first = (params) => {
    const page = 1;
    const urlParams = new URLSearchParams({...params, page}).toString();

    return fetchApi(`${BASE_URL}/${ENDPOINTS.characters}?${urlParams}`).then((data) => {
        currentPage = page;
        return data;
    });
}

const last = (params) => {
    const page = metadata.pages;
    const urlParams = new URLSearchParams({...params, page}).toString();
    
    return fetchApi(`${BASE_URL}/${ENDPOINTS.characters}?${urlParams}`).then((data) => {
        currentPage = page;
        return data;
    });
}
