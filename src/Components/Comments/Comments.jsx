import React from 'react';
import "./Comments.css";
import {Switch, Link} from "react-router-dom"
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import firebase, { auth, provider } from "../../firebaseConfig.js"

class Comments extends React.Component {
    constructor() {
        super();
        this.state = {
          user: null            
        }

    }
    componentDidMount() {
        auth.onAuthStateChanged((user) => {
          if (user) {
            this.setState({ user });
          } 
        });
    }
    render() {

       return (
         

        
        <div className="Comments">
                {this.state.user ?
                <div>
                    <h1>WOO My Comment Box</h1>
                    <div className="commentList">
                        Yeahhhh I am a CommentList.
                    </div>       
                    <div className="commentForm">
                        Party Parrot time. I am a CommentForm.
                    </div>   
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