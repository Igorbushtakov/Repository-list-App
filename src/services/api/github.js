import axios from 'axios';

const githubApiUrl = import.meta.env.VITE_GITHUB_API_URL;


export const getRepositoriesList = async (page = 1, perPage = 10) => {
    return await axios.get(githubApiUrl, {
        params: {
            per_page: perPage,
            page: page,
        },
    });
};