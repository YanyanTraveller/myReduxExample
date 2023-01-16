import React from "react";
import AboutPage from "./about/AboutPage";
import HomePage from "./home/HomePage";
import {Route, Switch} from "react-router-dom";
import Header from "./common/header";
import PageNotFound from "./pageNotFound";
import CoursePage from "./courses/CoursePage";
import ManageCoursePage from "./courses/ManageCoursePage";

function App(){
    return (<div className="container-fluid">
        <Header></Header>
        <Switch>
        <Route exact path="/"><HomePage></HomePage></Route>
        <Route path="/about"><AboutPage></AboutPage></Route>
        <Route path="/courses"><CoursePage></CoursePage></Route>
        <Route path="/course/:slug" component={ManageCoursePage} />
        <Route path="/course" component={ManageCoursePage} />
        <Route component={PageNotFound}></Route>
        </Switch>
    </div>);
}

export default App;