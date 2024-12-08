import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import AccountsPage from './pages/AccountsPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Layout><Dashboard /></Layout>} />
        <Route path="/accounts" element={<Layout><AccountsPage /></Layout>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;