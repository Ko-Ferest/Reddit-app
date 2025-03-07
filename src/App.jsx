import { Routes, Route } from "react-router-dom";
import Home from "./features/home/Home";
import "./App.css";
import Header from "./features/header/Header";
import Post from "./features/Post/Post";

function App() {
  return (
    <div className="container">
      <Header />
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
