import React, { Component } from 'react';
import "../LoginPage/LoginPage.css"
import { auth } from "../firebase";
import 'firebase/auth'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            emailId: null,
            password: null
        }
    }

    login = () => {

        auth.signInWithEmailAndPassword(this.state.emailId, this.state.password)

            .then((userCredential) => {

                var user = userCredential.user;

                console.log(user)

                axios.post('http://localhost:9090/login', {
                    userId: user.uid
                })
                    .then(res => {

                        let payload = {
                            userId: user.uid,
                            username: res.data.username,
                            name: res.data.name,
                            url: res.data.url
                        }
                        localStorage.setItem("users", JSON.stringify(payload));

                        window.location.reload();
                    })
                    .catch(e => {
                        console.log(e)
                    })
            })
            .catch((error) => {
                toast.error(`${error.message}`);
            });
    }

    render() {
        return (
            <div>
                <ToastContainer />
                <input className="logipage__text" onChange={(event) => { this.state.emailId = event.currentTarget.value }} type="text" placeholder="Email" />
                <input className="logipage__text" onChange={(event) => { this.state.password = event.currentTarget.value }} type="password" placeholder="Password" />
                <button className="login__button" onClick={this.login}>Log In</button>
            </div>
        );
    }
}

export default SignIn;