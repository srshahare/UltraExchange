import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import SignIn from './components/signin/SignIn';
import Footer from './components/Footer';
import {auth} from './Firebase';
import { useEffect, useState } from 'react';
import Layout from './containers/Layout';
import History from './components/history/History';
import Terms from './components/policies/Terms';
import Faq from './components/policies/faq';
import Contact from './containers/contact/Contact';

function App() {

  const [isLoggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if(user) {
        const { displayName, email, photoURL, uid } = user;
        setLoggedIn(true)
        setUser({
          displayName,
          email,
          photoURL,
          uid
        })
      }else {
        setLoggedIn(false)
        console.log("user is signed out")
      }
    })
  }, [])

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact>
            <Navbar loginState={isLoggedIn} user={user} />
            <Layout loginState={isLoggedIn} user={user} />
            <Footer isLoggedIn={isLoggedIn} />
          </Route>
          <Route path="/signin">
            <SignIn />
          </Route>
          <Route path="/history">
            <Navbar loginState={isLoggedIn} user={user} />
            <History />
            <Footer isLoggedIn={isLoggedIn} />
          </Route>
          <Route path="/faq">
            <Navbar loginState={isLoggedIn} user={user} />
            <Faq />
            <Footer isLoggedIn={isLoggedIn} />
          </Route>
          <Route path="/terms">
            <Navbar loginState={isLoggedIn} user={user} />
            <Terms />
            <Footer isLoggedIn={isLoggedIn} />
          </Route>
          <Route path="/contact">
            <Navbar loginState={isLoggedIn} user={user} />
            <Contact />
            <Footer isLoggedIn={isLoggedIn} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
