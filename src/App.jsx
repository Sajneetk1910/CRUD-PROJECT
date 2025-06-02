import { Route, Routes } from "react-router-dom";
import "./App.css";
import AddUser from "./Components/AddUser";
import GetUser from "./Components/GetUser";
import Login from "./Components/Login";
import Navbar from "./Components/Navbar";
import { UserProvider } from "./ContextPage/MyContext";
  
function App() {
  return (
    <>
      <UserProvider>
        <Navbar />
        {/* privateroot , middlewares */}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<AddUser />} />
          <Route path="/getuser" element={<GetUser />} />
        </Routes>
      </UserProvider>
    </>
  );
}
export default App;
// json-server --watch db.json

// npx json-server --watch db.json --port 3001