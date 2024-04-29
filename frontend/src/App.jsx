import {BrowserRouter as Router,Routes, Route} from "react-router-dom";
import CreatePost from "./components/Create/Create";
import Home from "./components/Home"; 


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts/create" element={<CreatePost />} />
      </Routes>
    </Router>
  );
} 

export default App