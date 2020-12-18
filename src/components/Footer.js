import React from 'react'
import { NavLink, useHistory } from 'react-router-dom';
import { auth } from '../Firebase';
import './Footer.css';

const Footer = (props) => {
    const history = useHistory();

    const logoutHandler = () => {
        auth.signOut().then(() => {
            history.push("/signin");
        }).catch(err => {
            console.log(err)
        })
    }

    const {isLoggedIn} = props;
    console.log(isLoggedIn)
    return (
        <div className="Footer">
            <div className="FooterContainer">
                <div className="First">
                    <NavLink to="/"><p>HOME</p></NavLink>
                    {isLoggedIn?
                    <p onClick={logoutHandler}>LOGOUT</p>:
                    <NavLink to="/signin"><p>LOGIN</p></NavLink>
                    }
                </div>
                <div className="Second">
                    <NavLink to="/history"><p>HISTORY</p></NavLink>
                    <NavLink to="/faq"><p>FAQ</p></NavLink>
                    <NavLink to="/terms"><p>TERMS & CONDITIONS</p></NavLink>
                    <NavLink to="/contact"><p>CONTACT US</p></NavLink>
                </div>
                <div className="Third">
                    <h3>Follow Us On:</h3>
                    <div className="Container">
                        <p>
                            <span><i class="fa fa-facebook-square" aria-hidden="true"></i></span>
                        </p>
                        <p>
                            <span><i class="fa fa-linkedin-square" aria-hidden="true"></i></span>
                        </p>
                        <p>
                            <span> <i class="fa fa-twitter-square" aria-hidden="true"></i></span>
                        </p>
                    </div>
                </div>
            </div>
            <div className="Bottom">
                <p>UltraExchange <span>&copy;</span> All Rights Are Reserved.</p>
            </div>
        </div>
    )
}

export default Footer
