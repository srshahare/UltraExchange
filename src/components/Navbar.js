import React from 'react'
import './Navbar.css';
import Avatar from '@material-ui/core/Avatar';
import { NavLink, useHistory } from 'react-router-dom';
import { auth } from '../Firebase';
import MenuIcon from '@material-ui/icons/Menu';

const Navbar = (props) => {
    const {loginState, user} = props;
    const history = useHistory();

    const logoutHandler = () => {
        auth.signOut().then(() => {
            history.push("/signin");
        }).catch(err => {
            console.log(err)
        })
    }

    const expandBar = () => {
        let x = document.getElementById("myLinks");
        if (x.style.display === "block") {
          x.style.display = "none";
        } else {
          x.style.display = "block";
        }
    }

    const hideBar = () => {
        let x = document.getElementById("myLinks");
        x.style.display = "none";
    }

    return (
        <div className="Navbar">
            <div className="MobileMenu">
                <div className="First">
                    <NavLink to="/"><h2>Ultra<span>Exchange</span></h2></NavLink>
                </div>
                <MenuIcon className="menu" onClick={expandBar} />
            </div>

            <div id="myLinks">
                <div className="MobileUser">
                    {loginState?
                    <div>
                    {user !== null?
                    <div className="UserContext">
                        <Avatar alt="User name" src={user.photoURL} />
                        <p>{user.displayName}</p>
                    </div>:
                    ""}
                    </div>:
                    <NavLink to="/signin"><button>Sign In</button></NavLink>
                    }
                </div>
                <div className="MobileContainer">
                    {loginState?
                    <NavLink to="/history" onClick={hideBar} ><p>HISTORY</p></NavLink>:
                    ""
                    }
                    <NavLink to="/faq" onClick={hideBar}><p>FAQ</p></NavLink>
                    <NavLink to="/terms" onClick={hideBar}><p>TERMS & CONDITIONS</p></NavLink>
                    <NavLink to="/contact" onClick={hideBar}><p>CONTACT</p></NavLink>
                    <p onClick={logoutHandler}>LOGOUT</p>
               </div>
            </div>

            <div id="desktopMenu" className="Second">
                {loginState?
               <NavLink to="/history"><p>HISTORY</p></NavLink>:
               ""
               }
               <NavLink to="/faq"><p>FAQ</p></NavLink>
               <NavLink to="/terms"><p>TERMS & CONDITIONS</p></NavLink>
               <NavLink to="/contact"><p>CONTACT</p></NavLink>
               <p style={{marginLeft: '8px'}} onClick={logoutHandler}>LOGOUT</p>
            </div>
            <div className="Third">
                {loginState?
                <div>
                {user !== null?
                <div className="Third">
                    <Avatar alt="User name" src={user.photoURL} />
                    <p>{user.displayName}</p>
                </div>:
                ""}
                </div>:
                <NavLink to="/signin"><button>Sign In</button></NavLink>
                }
            </div>
        </div>
    )
}

export default Navbar;
