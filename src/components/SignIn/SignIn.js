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

        // localStorage.setItem("users","admin");
        // window.location.reload();

        auth.signInWithEmailAndPassword(this.state.emailId, this.state.password)

            .then((userCredential) => {

                var user = userCredential.user;
                let payload = {}

                console.log(user)



                axios.post('http://localhost:9090/login', {
                    user_id: user.uid
                })
                    .then(res => {
                        // ---------------------FOR API TESTING START---------------------

                        // let res = {
                        //     name: 'test-mock',
                        //     username: 'hero-test'
                        // }

                        // ---------------------FOR API TESTING END---------------------
                        payload = {
                            "userId": user.uid,
                            "username": res.userName,
                            "name": res.name,
                            "profileImage": ""
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