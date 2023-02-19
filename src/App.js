import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Pantry from './pages/Pantry.js';
import Layout from "./pages/Layout";
import Recipes from "./pages/Recipes";
import Profile from "./pages/Profile";
import {useState} from "react";

function App() {
  const [username, setUsername] = useState("user");

  return (
    <BrowserRouter>
      <div className="App">
        <div className="content">
          <Routes>
            <Route path="/" element={<Layout username={username}/>}>
              <Route index element={<Pantry />}/>
              <Route path="recipes" element={<Recipes />}/>
              <Route path="profile" element={<Profile onChangeUsername={setUsername} startUsername={username}/>}/>
            </Route>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
