import React from 'react';
import "./Comments.css";
import {Switch, Link} from "react-router-dom"
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import firebase, { auth, provider, db } from "../../firebaseConfig.js"
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import Comment from './Comment';

class Comments extends React.Component {
  
    constructor() {
        super();
        this.state = {
          user: null,
          comments: [],  
          
        }

    }
    componentDidMount() {
      const ref = db
      .collection('MovieComments')
      .doc(this.props.movieid)
      .collection("comments");
      this.setState({ref});
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
          console.log(querySnapshot.docs)
          const comments = querySnapshot.docs.map(doc => doc.data());
          this.setState({ comments });
        });
        
    }


    submitCommentHandler = (event) => {
      event.preventDefault();
      const cmnt = {
        
      };

      cmnt.comment = this.state.comment;
      cmnt.userid = this.state.user.displayName;
      cmnt.replies = [];

      db.collection("MovieComments")
      .doc(this.props.movieid)
      .collection("comments")
      .add(cmnt);

    }

    handleChange = e => {
      this.setState({comment: e.target.value});
    };

    submitReply(comment){
      const replies = comment.replies;
      console.log(comment)
      db.collection("MovieComments")
      .doc(this.props.movieid)
      .collection("comments")
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            var replyRef = db.collection("comments").doc(doc.id);
            console.log(replyRef);
            return replyRef.update({
                comment: comment
            });
        });
    });
    }

    render() {

       return (
         

        
        <div className="Comments">
          <div className = "commentwritebox">
            <h3>Discuss The Movie Here</h3>
            <Form onSubmit={this.submitCommentHandler}>
            <Form.Group controlId="commentForm.ControlTextarea1">
              <Form.Control as="textarea" 
               type="text"
               value={this.state.value}
               placeholder="Enter text"
               onChange={this.handleChange}
               rows="3" />
            </Form.Group>
               <Button type="submit">Submit</Button>
            </Form>
          </div>
          <div className="commentlistbox">
          <h3>Comments</h3>
                {this.state.user ?
                
                    <div>
                      <div>
                      {this.state.comments.map(function(comment) {
                        
                        return <Comment parent={comment} submitReply={this.submitReply.bind(this) } db={db} movieid={this.props.movieid} user={this.state.user} comment={comment}/>
                      }.bind(this))}
                      </div>


                    </div>
                  :
                  <div>
                    <h3>Log in to see Comments</h3>
                  </div>
                }
         </div>
        </div>  
        
       )
   }
}
export default Comments;