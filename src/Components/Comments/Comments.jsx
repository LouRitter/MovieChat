import React from 'react';
import "./Comments.css";
import {Switch, Link} from "react-router-dom"
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import firebase, { auth, provider, db } from "../../firebaseConfig.js"

class Comments extends React.Component {
  
    constructor() {
        super();
        this.state = {
          user: null,
          comments: [],           
        }

    }
    componentDidMount() {
        auth.onAuthStateChanged((user) => {
          if (user) {
            this.setState({ user });
          } 
        });
        db.collection("MovieComments")
        .doc(this.props.movieid)
        .collection("comments")
        .get()
        .then(querySnapshot => {
          const comments = querySnapshot.docs.map(doc => doc.data());
          console.log(comments);
          this.setState({ comments });
          

        });
        
    }



    render() {


       return (
         

        
        <div className="Comments">
          <h1>Comments</h1>
                {this.state.user ?
                    <div>
                      {this.state.comments.map((comment, key) =>(
                        <div className="commentbox">
                            <h4> {comment.userid}</h4>
                            <span key={key}>{comment.comment}</span>
                            {comment.replies.map((reply, key) =>(
                              <div className="replybox">
                              <h5>{reply.userid}</h5>
                              <span>{reply.comment}</span>
                              </div>
                            ))}
                        </div>

                      ))
                      
                      }

                    </div>
                  :
                  <div>
                    <h3>Log in to see Comments</h3>
                  </div>
                }
         
            
        </div>  
        
       )
   }
}
export default Comments;