import React from 'react';
import "./Comments.css";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
class Comment extends React.Component {
    constructor() {
        super();
        this.state = {
          user: null,
          comments: [],  
          showReplyBox: false,
        }

    }
    submitReplyHandler = (event) => {
        event.preventDefault();
        const cmnt = {
          
        };
        
        cmnt.comment = this.state.comment;
        cmnt.userid = this.props.user.displayName;
        cmnt.replies =  [];
        
        this.props.comment.replies.push(cmnt);
        console.log(this.props.comment);
        this.props.submitReply(this.props.parent);
        // this.props.db.collection("MovieComments")
        // .doc(this.props.movieid)
        // .collection("comments")
        // .add(cmnt);
        this.forceUpdate();

      }
  
      handleChange = e => {
        this.setState({comment: e.target.value});
      };
  
  
    handleReplyClick = e => {
        this.setState({showReplyBox : !this.state.showReplyBox });
        console.log(this.state.showReplyBox);
      }



    render() {
      var comment = this.props.comment
      var user = this.props.user
      var submitReply = this.props.submitReply;
      var parent = this.props.parent
      return <div className="Comment">
                        <div className="commentbox">
                            <h4> {comment.userid}</h4>
                            <span >{comment.comment}</span>
                            <Button className="showMoreButton btn-xs" onClick={this.handleReplyClick}>Reply</Button>
                            {this.state.showReplyBox ? ( 
                              <Form onSubmit={this.submitReplyHandler}>
                              <Form.Group controlId="commentForm.ControlTextarea1">
                                <Form.Control as="textarea" 
                                type="text"
                                value={this.state.replyvalue}
                                placeholder="Enter text"
                                onChange={this.handleChange}
                                rows="1" />
                              </Form.Group>
                                <Button type="submit">Submit</Button>
                              </Form>
                            ):(
                              <div></div>
                            )}
                         { comment.replies.length >= 0 && comment.replies.map(function(child) {
                                return <Comment parent={parent} submitReply={submitReply} user={user} key={child.id} comment={child}/>
                         })}
                        </div> 

                        </div>
    }
  }
  export default Comment;