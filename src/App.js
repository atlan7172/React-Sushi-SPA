import {Header} from './components'
import Home from "./pages/Home";
import {Route} from "react-router-dom";
import React from "react";
import Cart from "./pages/Cart";

function App() {

    return (
        <div className="wrapper">
            <Header/>
            <div className="content">
                <Route path='/' component={Home} exact/>
                <Route path='/cart' component={Cart} exact/>
            </div>
        </div>
    )
}

export default App;
