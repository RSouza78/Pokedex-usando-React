import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ApiConsult from './components/api/Api-Consult';
import PokemonDetails from './components/pokemonDetails/PokemonDetails';
import { ThemeProvider, useTheme } from './contexts/Theme-Contexts';
import styled from 'styled-components';
import GlobalStyle from './components/globalStyle/GlobalStyle';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <GlobalStyle />
      <AppContent />
    </ThemeProvider>
  );
}

function AppContent() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <AppContainer isDarkMode={isDarkMode}>
      <Router>
        <div className="container">
          <label htmlFor="theme-toggle" className="toggle-label">
            <input
              type="checkbox"
              id="theme-toggle"
              checked={isDarkMode}
              onChange={toggleTheme}
            />
            Alterar Tema
          </label>
        </div>
        <Routes>
          <Route path="/" element={<ApiConsult />} />
          <Route path="/pokemon/:name" element={<PokemonDetails />} />
        </Routes>
      </Router>
    </AppContainer>
  );
}

const AppContainer = styled.div`
  background-image: ${({ isDarkMode }) =>
    isDarkMode
      ? "url('/dark.png')"
      : "url('/light.jpg')"};
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  min-height: 100vh;
  width: 100vw;
  transition: background-image 0.5s ease-in-out;
  overflow-y: auto;
`;

export default App;
