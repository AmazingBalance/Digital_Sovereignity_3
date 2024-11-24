import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Home from "./Home";
import Editor from "./Editor";

const App = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/editor" component={Editor} />
                <Route component={<h1>404 НЕ НАЙДЕНА СТРАНИЦА ^-^</h1>} />{" "}
                {/* Страница 404 */}
            </Switch>
        </Router>
    );
};

export default App;
