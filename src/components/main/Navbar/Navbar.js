import React, { Component } from "react";
import { Button } from "./button";
import { MenuItems } from "./MenuItems";
import './Navbar.css'
import { BrowserRouter as Router, Switch, Route ,Link} from "react-router-dom" ;

class Navbar extends Component {
    state ={ clicked:false }
   
    handleClick=()=>{
        this.setState({clicked: !this.state.clicked})
    }
  render() {
    return (
      <nav className="NavbarItems">
         <Link to="/">  <img src="../../images/logo.png"  className = "logo" alt="" /></Link>  
        <div className="menu-icon" onClick={this.handleClick}>
                <i className={this.state.clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
        </div>
        <input type="text" className="search-bar " value={this.props.subreddit} onChange={e=>this.props.setSubreddit(e.target.value)}/>
        <i class="fas fa-search"></i>
        <ul className={this.state.clicked ? 'nav-menu active' : 'nav-menu'}>
          {MenuItems.map((item, index) => {
            return (
              <li key={index}>
                <Link  className={item.cName} to={item.url}>   {item.title} </Link>
              </li>
            );
          })}
      {this.props.user!=null ?  <li >
                <Link  user={this.props.user} className="nav-links" to='/favorites'>  favorites </Link>
              </li> :null}
        </ul>
        {this.props.user!=null ? <Button onClick={()=>{ this.props.firebase.SignoutUser().then(result=>alert("you've loged out "));this.props.setUser(null) ;}}>Logout</Button> :
        <Button onClick={()=>{ this.props.popup ? this.props.setPopup(false):this.props.setPopup(true) } } >Join us</Button> }
      </nav>
    );
  }
}
export default Navbar;
