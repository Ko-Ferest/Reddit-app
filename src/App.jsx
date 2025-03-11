import { Routes, Route } from "react-router-dom";
import Home from "./features/home/Home";
//import Header from "./features/header/Header";
import Post from "./features/Post/Post";
import "./App.css";

function App() {
  return (
    <div className="container">
      <main className="main">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/:id" element={<Post />}></Route>
        </Routes>
      </main>
    </div>
  );
}

export default App;
