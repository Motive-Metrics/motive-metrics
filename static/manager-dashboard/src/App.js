import React from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from "react-router-dom";
import { ThemeProvider, createTheme } from '@mui/material/styles';

import ResponsiveAppBar from './shared/ResponsiveAppBar';
import Motivation from './Components/Motivation';
import PerformancePieChart from './Components/PerformancePieChart';
import PerformanceSatisfactionBarChart from './Components/PerformanceSatisfactionBarChart';
import PersonalityHomePage from './Components/PersonalityHomePage';
import PersonalityTest from './Components/PersonalityTest';

function App() {
    const theme = createTheme({
        palette: {
          primary: {
            main: '#1c1c1c'
          },
          secondary: {
            main: '#504F4F'
          }
        }
      });
      
    return (
        <ThemeProvider theme={theme}>
            <Router>
                <ResponsiveAppBar />
                <Routes>
                    <Route path="/motivation" element={<Motivation/>}/>
                    <Route path="/performance" element={<PerformancePieChart/>}/>
                    <Route path="/personality" element={<PersonalityHomePage/>}/>
                    <Route path="/test" element={<PersonalityTest/>}/>
                </Routes>
            </Router>
        </ThemeProvider>
    );
}

export default App;