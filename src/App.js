import React, {Fragment} from 'react';
import './App.css';
import PasswordManager from "./containers/PasswordManager/PasswordManager";
import Footer from "./components/UI/Footer/Footer";

function App() {
    return (
        /*<div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
          </header>
        </div>*/
        <Fragment>
            <PasswordManager/>
            <Footer/>
        </Fragment>
    );
}

export default App;
