import { apiClient } from "./apiClient";

// export function retrieveHelloWorldBean(){
//     return axios.get('http://localhost:8080/hello-world-bean')   
// }


export const retrieveHelloWorldBean = () => apiClient.get('/hello-world-bean');

export const retrieveHelloWorldPathVariable = (username, token) => apiClient.get(`/hello-world/path-variable/${username}`);

