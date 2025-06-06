import { Route, Routes } from "react-router-dom";
import "./App.css";
import AddUser from "./Components/AddUser";
import GetUser from "./Components/GetUser";
import Login from "./Components/Login";
import Navbar from "./Components/Navbar";
import { UserProvider } from "./ContextPage/MyContext";
import PrivateRoute from "./Middlewares/PrivateRoute";

function App() {
  return (
    <UserProvider>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <AddUser />
            </PrivateRoute>
          }
        />
        <Route
          path="/getuser"
          element={
            <PrivateRoute>
              <GetUser />
            </PrivateRoute>
          }
        />
      </Routes>
    </UserProvider>
  );
}

export default App;

// npx json-server --watch db.json --port 3001