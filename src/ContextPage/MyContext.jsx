import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const savedUser = localStorage.getItem("user");
  const [user, setUser] = useState(savedUser ? JSON.parse(savedUser) : null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
  });

  const [editData, setEditData] = useState(null);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        formData,
        setFormData,
        editData,
        setEditData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
