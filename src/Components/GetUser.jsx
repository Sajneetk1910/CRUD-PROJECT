// src/components/GetUser.js
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../ContextPage/MyContext";

function GetUser() {
  const navigate = useNavigate();
  const { setEditData, setFormData } = useContext(UserContext);
  const [data, setData] = useState([]);
  const API_URL = "http://localhost:3001/users";

  const getUserData = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error("Response is not ok");
      }
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const handleDelete = async (userToDelete) => {
    try {
      await fetch(`${API_URL}/${userToDelete}`, {
        method: "DELETE",
      });
      const updatedData = data.filter((user) => user.id !== userToDelete);
      setData(updatedData);
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

  const handleEdit = (val) => {
    setEditData(val.id);
    setFormData(val);
    navigate("/");
  };

  return (
    <div className="flex flex-wrap justify-center gap-4 mt-6 px-4">
      {data.map((user, id) => (
        <Card
          key={id}
          sx={{
            width: 300,
            p: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar
            alt={user.name}
            src={user.image}
            sx={{ width: 160, height: 160, mb: 2 }}
          />
          <CardContent sx={{ textAlign: "center" }}>
            <Typography gutterBottom variant="h6" component="div">
              {user.name}
            </Typography>
            <Typography variant="outlined" color="text.secondary">
              {user.description || "No description."}
            </Typography>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "16px",
                marginTop: "12px",
              }}
            >
              <EditIcon
                onClick={() => handleEdit(user)}
                sx={{ cursor: "pointer", marginRight: "10px" }}
              />
              <DeleteIcon
                onClick={() => handleDelete(user.id)}
                sx={{ cursor: "pointer", color: "red" }}
              />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default GetUser;
