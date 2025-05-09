import axios from "axios";
import { User } from "./types";

const BACKEND_URL = 'http://localhost:3000';

// returns a JWT token, should be stored in local storage
export async function login(username : string, password : string) : Promise<string> {
    const response = await axios.post(`${BACKEND_URL}/login`, { username, password });
    return response.data.token;
}

// returns the user associated with a given token
export async function getUser(token : string) : Promise<User> {
    const response = await axios.get(`${BACKEND_URL}/user`, { headers: { token }});
    return response.data;
}