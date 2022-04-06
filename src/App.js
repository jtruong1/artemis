import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import 'axios-progress-bar/dist/nprogress.css';
import { UserContext } from './hooks/UserContext';
import useFindUser from './hooks/useFindUser';
import RequireAuth from './components/RequireAuth';
import Login from './pages/Login';
import Register from './pages/Register';
import Monitors from './pages/Monitors';
import AddMonitor from './pages/AddMonitor';
import EditMonitor from './pages/EditMonitor';
import StatusPages from './pages/StatusPages';
import AddStatusPage from './pages/AddStatusPage';
import EditStatusPage from './pages/EditStatusPage';
import StatusPage from './pages/StatusPage';

const App = () => {
  const { user, setUser, isLoading } = useFindUser();

  if (isLoading) {
    return null;
  }

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
          <Route
            path="/monitors/add"
            element={
              <RequireAuth>
                <AddMonitor />
              </RequireAuth>
            }
          />
          <Route
            path="/monitors/:id/edit"
            element={
              <RequireAuth>
                <EditMonitor />
              </RequireAuth>
            }
          />
          <Route
            path="/status-pages"
            element={
              <RequireAuth>
                <StatusPages />
              </RequireAuth>
            }
          />
          <Route
            path="/status-pages/add"
            element={
              <RequireAuth>
                <AddStatusPage />
              </RequireAuth>
            }
          />
          <Route
            path="/status-pages/:id/edit"
            element={
              <RequireAuth>
                <EditStatusPage />
              </RequireAuth>
            }
          />
          <Route exact path="/:slug" element={<StatusPage />} />
        </Routes>
      </UserContext.Provider>
    </Router>
  );
};

export default App;
