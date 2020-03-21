import React from 'react';
import "./Search.css";

class Search extends React.Component {
   state= {
       title: ''
   }
   handleSubmit = () => {
       let {title} = this.state;
        title = title.toLowerCase()
        .split(' ')
        .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
        .join(' ');
       this.props.handleSendRequest(title)
       this.setState({title: ''})
   }
   handleInputTitle = (event) => {
       event.preventDefault();
       const title = event.target.value;
       this.setState({title});
   }
   render() {
       const {title} = this.state;
       return (
           <div className="search">
               <input className="search-box" type="text" onChange={this.handleInputTitle} value={title}/>
               <input className="button" type="submit" onClick={this.handleSubmit} value="Search"/>
           </div>
       )
   }
}
export default Search;