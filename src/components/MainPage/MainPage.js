import React, { Component } from 'react';
import "./MainPage.css";
import Post from '../Post/Post';
import uploadImage from "../../images/upload.png";
import {storageRef,auth} from "../firebase";
import firebase from 'firebase/compat/app';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';



class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            progressBar: "",
            postArray: []
        }
    }

    componentDidMount() {
        this.getPost();
    }

    getPost = () => { //API
        const thisContext=this;

        axios.post('https://jsonplaceholder.typicode.com/posts', {
            userId: JSON.parse(localStorage.getItem("users")).userId
        })
        .then(res => {
           let mockdata =  [
                    {
                        "postId": "123",
                        "username": "anindya",
                        "imageUrl": "https://firebasestorage.googleapis.com/v0/b/goalbook-59ade.appspot.com/o/images%2Fbcd90c1d4868.png?alt=media&token=c090b6ec-d756-4488-8fab-2f53761577f9",
                        "timeStamp": "1235",
                        "likes": "123"
                    },
                    {
                        "postId": "1456",
                        "username": "anindya",
                        "imageUrl": "https://firebasestorage.googleapis.com/v0/b/goalbook-59ade.appspot.com/o/images%2Fbcd90c1d4868.png?alt=media&token=c090b6ec-d756-4488-8fab-2f53761577f9",
                        "timeStamp": "145",
                        "likes": "134"
                    },
                    {
                        "postId": "156",
                        "username": "anindya",
                        "imageUrl": "https://firebasestorage.googleapis.com/v0/b/goalbook-59ade.appspot.com/o/images%2Fbcd90c1d4868.png?alt=media&token=c090b6ec-d756-4488-8fab-2f53761577f9",
                        "timeStamp": "1234",
                        "likes": "34"
                    }
                ];
            thisContext.setState({postArray: mockdata});
        })
        
        // fetch('https://jsonplaceholder.typicode.com/posts', {})
        //     .then(response => response.json())
        //     .then(data => {
        //         thisContext.setState({postArray: data});
        // });

        // let data = [
        //     {
        //         "postId": "123456",
        //         "userName": "anindya",
        //         "imageUrl": "https://irixlens.com/new/wp-content/uploads/2018/11/IRX_5473.jpg",
        //         "timeStamp": "12345",
        //         "likes": "1234"
        //     },
        //     {
        //         "postId": "123456",
        //         "userName": "anindya",
        //         "imageUrl": "https://irixlens.com/new/wp-content/uploads/2018/11/IRX_5473.jpg",
        //         "timeStamp": "12345",
        //         "likes": "1234"
        //     },
        //     {
        //         "postId": "123456",
        //         "userName": "anindya",
        //         "imageUrl": "https://irixlens.com/new/wp-content/uploads/2018/11/IRX_5473.jpg",
        //         "timeStamp": "12345",
        //         "likes": "1234"
        //     }
        // ];
        // this.setState({ postArray: data })
    }

    upload = event => {

        const thisContext = this

        var metadata = {
            contentType: 'image/jpeg'
        };

        let image = event.target.files[0]

        if (image == null || image == undefined) {
            toast.error('Bad image format. Please provide a valid image')
            return
        }

        var uploadTask = storageRef.child('images/' + image.name).put(image, metadata);

        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
            (snapshot) => {
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                thisContext.setState({ progressBar: progress })
            },
            (error) => {
                console.log(error)
            },
            () => {
                uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                    console.log('File available at', downloadURL);

                    let payload = {
                        "postId": new Date().getTime() + 1,
                        "userId": JSON.parse(localStorage.getItem("users")).userId,
                        "imageUrl": downloadURL,
                        "timeStamp": new Date().getTime(),
                        "likes": 0
                    }

                    const requestOptions = {
                        method: "POST",
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(payload),
                    }

                    fetch("https://jsonplaceholder.typicode.com/posts", requestOptions)
                        .then(response => response.json())
                        .then(data => {
                            console.log(data);
                            thisContext.getPost();
                        })
                        .catch(error => {
                            console.log(error)
                        })

                });
            }
        );
    }

    render() {
        return (
            <div>
                <ToastContainer/>

                <div className="mainpage__container">

                    <div className="mainpage__divider"></div>  

                    <div className="fileupload">
                        <label htmlFor="file-upload" >
                            <img className="mainpage__uploadicon" src={uploadImage} />
                        </label>
                        <input onChange={this.upload} id="file-upload" type="file" />
                    </div>

                    <div className="mainpage__divider"></div>

                </div>

                <div className="upload_text">{this.state.progressBar}</div>

                {
                    this.state.postArray.map((item, index) => (
                        <Post key={index} postId={item.postId} username={item.username} imageUrl={item.imageUrl} likes={item.likes} />
                    ))
                }
            </div>
        );
    }
}

export default MainPage;