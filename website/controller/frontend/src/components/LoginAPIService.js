import axios from "axios"

export default class LoginAPIService {


    static LoginUser(body) {
        const requestOptions = {
            method: "POST",
            headers : {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body)
        }
        return fetch("http://127.0.0.1:8000/auth/", requestOptions)
        .then(response => response.json())
    }
}