import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <Router>
      <Helmet>
        <title>Artemis</title>
      </Helmet>

      <Routes>
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
