import { apiClient } from "./apiClient";

export const executeBasicAuthenticationService = (token) => apiClient.get(`/basicAuth`, {
    headers: {
        Authorization: token
    }
});

export const executeJwtcAuthenticationService = (username, password) => apiClient.post(`/authenticate`, {
    username,password
});

