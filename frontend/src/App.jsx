import CreatePost from "./components/Create/CreatePost.jsx";
import {BrowserRouter as Router,Routes, Route} from "react-router-dom"; 


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/posts/create" element={<CreatePost />} />
        {/* <Route path="/posts/edit/:id" element={<EditDog />} /> */}
      </Routes>
    </Router>
  );
} 

export default App
