import React, { Component } from 'react';
import "./NavBar.css";
import { Grid } from '@mui/material';
import { storage, auth } from "../firebase";
import 'firebase/auth'
import uploadImage from "../../images/upload.png";
import goalbook_logo from "../../images/goalbooklogo.png"
import home from "../../images/home.svg";
import Avatar from '@mui/material/Avatar';
import pp from "../../images/pp1.png"
import axios from 'axios';

class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchBoxOpen: false,
            friendUsername: '',
            isFriend: false,
            friendId: ''
        }
    }

    searchHandler = e => {
        console.log('inside searchHandler')
        if (e.key == "Enter") {

            let query = e.currentTarget.value;

            console.log(query)

            if (query != null || query != undefined) {

                let payload = {
                    userId: JSON.parse(localStorage.getItem("users")).userId,
                    query: query
                }

                let payload2 = {
                    friendUsername: 'kailash',
                    isFriend: false,
                    friendId: '213525'
                }

                // console.log(payload)

                axios.post('https://jsonplaceholder.typicode.com/posts', payload2)
                    .then(res => {
                        if (res.data !== {}) {
                            console.log('inside axios')
                            this.setState({
                                friendUsername: res.data.friendUsername,
                                isFriend: res.data.isFriend,
                                friendId: res.data.friendId,
                                searchBoxOpen: true
                            }, () => {
                                console.log(this.state)
                            })
                            
                        }
                    })
            }

        }
    }

    addFriend = e => {
        axios.post('https://jsonplaceholder.typicode.com/posts', {
            userId: JSON.parse(localStorage.getItem("users")).userId,
            friendId: this.state.friendId
        })
            .then(res => {
                this.setState({
                    searchBoxOpen: false
                })
            })
    }

    logOut = e => {

    }

    render() {
        return (
            <div>

                <div className="navbar__barContent">
                    <Grid container>

                        <Grid item xs={1}>
                            
                        </Grid>

                        <Grid item xs={3}>
                            <img className="navbar_logo" src={goalbook_logo} width="105px" />
                        </Grid>

                        <Grid item xs={4}>
                            <input text="text" className="navbar__searchBar" placeholder="Search" onKeyPress={this.searchHandler} />
                            {this.state.searchBoxOpen &&
                                <div className='searchScreen'>
                                    <p>{this.state.friendUsername} <span><img onClick={this.addFriend} className="mainpage__uploadicon" src={uploadImage} /></span> </p>
                                </div>
                            }
                        </Grid>

                        <Grid item xs={3} style={{ "display": "flex" }} >
                            <img className="navbar__img" src={home} width="25px" />
                            <Avatar src={pp} className="navbar__img" style={{ "maxWidth": "25px", "maxHeight": "25px" }} />
                            <svg onClick={this.logOut} className="navbar__img" height='25px' width='25px' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 192 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128zM160 96c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 32C43 32 0 75 0 128L0 384c0 53 43 96 96 96l64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l64 0z" /></svg>
                        </Grid>

                        <Grid item xs={1}></Grid>

                    </Grid>
                </div>
            </div>
        );
    }
}

export default NavBar;