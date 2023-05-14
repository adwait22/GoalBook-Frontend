import React, { Component } from 'react';
import "./SignUp.css";
import {  auth } from "../firebase";
import 'firebase/auth'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            emailId: null,
            name: null,
            username: null,
            password: null
        }
    }

    newSignUp = () => {

        auth.createUserWithEmailAndPassword(this.state.emailId, this.state.password)

            .then((userCredential) => {

                var user = userCredential.user;

                let payload = {
                    "userId": user.uid,
                    "username": this.state.username,
                    "name": this.state.name,
                    "profileImage": ""
                }
                console.log(userCredential.user)

                const requestOptions = {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                }

                fetch("https://jsonplaceholder.typicode.com/posts", requestOptions)
                    .then(response => response.json())
                    .then(data => {
                        console.log(data)
                    })
                    .catch(error => {
                        console.log(error)
                    })

                toast.success('Go to Login Page to SignIn with your credentials');

            })
            .catch((error) => {
                console.log(`${error.message}`)
                toast.error(`${error.message}`);
            });
    }

    render() {
        return (
            <div>
                <ToastContainer />
                <input className="logipage__text" onChange={(event) => { this.state.emailId = event.currentTarget.value; }} type="text" placeholder="Email" />
                <input className="logipage__text" onChange={(event) => { this.state.name = event.currentTarget.value; }} type="text" placeholder="Full Name" />
                <input className="logipage__text" onChange={(event) => { this.state.username = event.currentTarget.value; }} type="text" placeholder="Username" />
                <input className="logipage__text" onChange={(event) => { this.state.password = event.currentTarget.value; }} type="password" placeholder="Password" />
                <button className="login__button" onClick={this.newSignUp} >Sign up</button>
            </div>
        );
    }
}

export default SignUp;