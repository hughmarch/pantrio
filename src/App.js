import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Pantry from './pages/Pantry.js';
import Layout from "./pages/Layout";
import Recipes from "./pages/Recipes";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <div className="content">
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Pantry />}/>
              <Route path="recipes" element={<Recipes />}/>
            </Route>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
