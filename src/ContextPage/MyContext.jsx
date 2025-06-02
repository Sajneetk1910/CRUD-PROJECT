import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [editData, setEditData] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
  });

  console.log("form data",formData)
  return (
    <UserContext.Provider
      value={{ editData, setEditData, formData, setFormData }}
    >
      {children}
      </UserContext.Provider>
  )
}