import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { UserContext } from './hooks/UserContext';
import useFindUser from './hooks/useFindUser';
import RequireAuth from './components/RequireAuth';
import Login from './pages/Login';
import Register from './pages/Register';
import Monitors from './pages/Monitors';

const App = () => {
  const { user, setUser, isLoading } = useFindUser();

  return (
    <Router>
      <UserContext.Provider value={{ user, setUser, isLoading }}>
        <Helmet>
          <title>Artemis</title>
        </Helmet>

        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/monitors"
            element={
              <RequireAuth>
                <Monitors />
              </RequireAuth>
            }
          />
        </Routes>
      </UserContext.Provider>
    </Router>
  );
};

export default App;
