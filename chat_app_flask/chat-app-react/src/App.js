import './App.css';
import ChatPage from './components/ChatPage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import NotFound from './components/NotFound';
import RegistrationSuccess from './components/RegistrationSuccess';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/login" exact element={<LoginPage/>}/>
          <Route path="/register" exact element={<RegisterPage/>}/>
          <Route path="/" exact element={<ChatPage/>} />
          <Route path="*" element={<NotFound/>}/>
          <Route path="/register/success" element={<RegistrationSuccess/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
