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
                </Routes>
            </Router>
        </ThemeProvider>
    );
}

export default App;