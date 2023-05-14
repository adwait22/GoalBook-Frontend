import React, { Component } from 'react';
import "./Post.css";
import Avatar from '@mui/material/Avatar';
import love from "../../images/love.svg";
import comment from "../../images/comment.svg";
import pp from "../../images/pp1.png"
import axios from 'axios';



class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            commentList: [],
            NoOflikes: Number(this.props.likes)
        }
    }

    componentDidMount() {
        this.getComments();
    }

    likeClick = e => {
        e.preventDefault() 
        axios.post('http://localhost:9090/get-like' , {
            post_id: this.props.postId,
            user_id: JSON.parse(localStorage.getItem("users")).userId
        })
        .then(res => {
            if(res.data) {
                this.setState({
                    NoOflikes: Number(this.state.NoOflikes) + 1
                })
            }
            else {
                this.setState({
                    NoOflikes: Number(this.state.NoOflikes) - 1
                })
            }
            
        })
    }

    getComments = () => { //API backend
        // let mockdata = [
        //     {
        //         "username": "ASD",
        //         "commentId": "1234",
        //         "timeStamp": "123456",
        //         "comment": "Comment 1"
        //     },
        //     {
        //         "username": "anindya",
        //         "commentId": "1234",
        //         "timeStamp": "123456",
        //         "comment": "Comment 2"
        //     },
        //     {
        //         "username": "dasgupta",
        //         "commentId": "1234",
        //         "timeStamp": "123456",
        //         "comment": "Comment 3"
        //     }
        // ];
        // this.setState({ commentList: data })

        // +this.props.id
        // fetch('https://jsonplaceholder.typicode.com/posts/')
        //     .then(response => response.json())
        //     .then(data => {
        //         this.setState({ commentList: data });
        //     });
      
        axios.post('http://localhost:9090/get-comment', {
            post_id: this.props.postId
        })
        .then(res => {
            this.setState({ commentList: res.data });
        })

    }

    submitComments = (event) => {
        if (event.key == "Enter") {

            let comment = event.currentTarget.value;

            if (comment != null || comment != undefined) {

                let payload = {
                    "commentId": new Date().getTime() + 1,
                    "user_id": JSON.parse(localStorage.getItem("users")).userId,
                    "post_id": this.props.postId,
                    "comment": comment
                }

                const requestOptions = {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                }

                fetch("http://localhost:9090/comment-on-post", requestOptions)
                    .then(response => response.json())
                    .then(data => {
                        this.getComments();
                    })
                    .catch(error => {

                    })

            }
        }
    }

    render() {
        return (
            <div className="post__container">
                {/* Header */}
                <div className="post__header">
                    <Avatar className="post__image" src={pp} />
                    <div className="post__username">{this.props.username}</div>
                </div>

                {/* Image */}
                <div>
                    <img src={this.props.imageUrl} width="615px" />
                </div>

                {/* Analytics */}
                <div>
                    <div style={{ "marginLeft": "10px" }} onClick={this.likeClick}>
                        <img src={love} className="post_reactimage" />
                    </div>
                    <div style={{ "fontWeight": "bold", "marginLeft": "20px  " }}>
                        {this.state.NoOflikes} likes
                    </div>
                </div>

                {/* Comment Section */}
                <div>
                    {
                        this.state.commentList.map((item, index) => (

                            <div key={index} className="post_comment"><span style={{ "fontWeight": "bold" }}>{item.user.userName}: </span>{item.comment}</div>

                        ))
                    }
                    <input type="text" onKeyPress={this.submitComments} className="post__commentbox" placeholder="Add a comment and press Enter..." />
                </div>

            </div>
        );
    }
}

export default Post;