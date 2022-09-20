import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import ResponsiveAppBar from './shared/ResponsiveAppBar';
import Motivation from './Components/Motivation';
import PerformancePieChart from './Components/PerformancePieChart';
import PerformanceSatisfactionBarChart from './Components/PerformanceSatisfactionBarChart';

function App() {
    return (
        <BrowserRouter>
            <ResponsiveAppBar />
            <Switch>
                <Route path="/motivation" exact>
                    <Motivation/>
                </Route>
                <Route path="/performance" exact>
                    <PerformancePieChart/>
                    <PerformanceSatisfactionBarChart/>
                </Route>
            </Switch>
        </BrowserRouter>
    );
}

export default App;