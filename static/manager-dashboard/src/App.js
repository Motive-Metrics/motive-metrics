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
import PersonalityPage from './Components/PersonalityPage';
import PersonalityTest from './Components/PersonalityTest';
import Performance from './Components/Performance';

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
                    <Route path="/personality" element={<PersonalityPage/>}/>
                    <Route path="/test" element={<PersonalityTest/>}/>
                    <Route path="/performance" element={<Performance/>}/>
                </Routes>
            </Router>
        </ThemeProvider>
    );
}

export default App;