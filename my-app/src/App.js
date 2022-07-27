import {BrowserRouter as Router, Route,Navigate,Routes} from 'react-router-dom';
import Login from "./components/frontend/auth/Login";
import Register from "./components/frontend/auth/Register";
import axios from 'axios';
import AdminPrivateRoute from './AdminPrivateRoute';

axios.defaults.withCredentials = true;
axios.interceptors.request.use(function(config){
  const token = localStorage.getItem('auth_token');
  config.headers.Authorization = token ? `Bearer ${token}` : ''; 
  return config; 
});
axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.headers.post['Content-type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';

function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
        <Route exact path="/" element= {localStorage.getItem('auth_token') ? <Navigate  to='/' />  : <Login />} /> 
        <Route path="/login" element= {localStorage.getItem('auth_token') ? <Navigate  to='/' />  : <Login />} />
        <Route path="/register" element= {localStorage.getItem('auth_token') ? <Navigate  to='/' />  : <Register />} />
        <Route  path="/admin/*" name="Admin" element={<AdminPrivateRoute/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
