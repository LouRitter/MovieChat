import React from 'react';
import "./Comments.css";
import {Switch, Link} from "react-router-dom"
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import firebase, { auth, provider, db } from "../../firebaseConfig.js"
import Form from 'react-bootstrap/Form';



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
            console.log(user);
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

      db
      .collection('MovieComments')
      .doc(this.props.movieid)
      .collection("comments");
        auth.onAuthStateChanged((user) => {
          if (user) {
            console.log(user);
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

    handleChange = e => {
      this.setState({comment: e.target.value});
    };



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
        </div>  
        
       )
   }
}
export default Comments;