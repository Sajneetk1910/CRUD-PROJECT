import { Button, Card, TextField } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../ContextPage/MyContext";

function AddUser() {
  const navigate = useNavigate();
  const { formData, setFormData, editData, setEditData } =
    useContext(UserContext);

  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const API_URL = "http://localhost:3000/users";

  useEffect(() => {
    if (success) {
      setEditData(null);
      setFormData({ name: "", description: "", image: "" });
      navigate("/getuser");
    }
  }, [success, navigate, setEditData, setFormData]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const method = editData ? "PUT" : "POST";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsPending(true);

    const { name, description, image } = formData;
    if (!name || !description || !image) {
      setError("All fields are required.");
      setIsPending(false);
      return;
    }

    try {
      const url = editData ? `${API_URL}/${editData}` : `${API_URL}`;
      const response = await fetch(url, {
        method: method,
        body: JSON.stringify({ name, description, image }),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("Failed to submit form data.");
      }

      const data = await response.json();
      console.log("Submitted data:", data);
      setSuccess(true);
    } catch (err) {
      setError(err.message || "An error occurred.");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="items-center min-h-screen bg-gray-100 py-10 px-6">
      <h1 className="text-4xl font-bold text-center text-gray-900 mb-6">
        {editData ? "Edit List" : "Books Listing"}
      </h1>

      <div className="max-w-xl mx-auto">
        <Card className="p-8 shadow-lg rounded-2xl">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="w-full mx-auto">
              <TextField
                name="name"
                label="Name"
                variant="outlined"
                fullWidth
                size="medium"
                value={formData.name}
                onChange={handleChange}
                required
                InputProps={{
                  style: {
                    fontSize: "1.1rem",
                    padding: "4px",
                    marginBottom: "4px",
                  },
                }}
                InputLabelProps={{ style: { fontSize: "16px" } }}
              />
            </div>

            <div className="w-full mx-auto">
              <TextField
                name="description"
                label="Description"
                variant="outlined"
                fullWidth
                size="medium"
                value={formData.description}
                onChange={handleChange}
                required
                InputProps={{
                  style: {
                    fontSize: "1.1rem",
                    padding: "4px",
                    marginBottom: "4px",
                  },
                }}
                InputLabelProps={{ style: { fontSize: "16px" } }}
              />
            </div>

            <div className="w-full mx-auto">
              <TextField
                name="image"
                label="Image URL"
                variant="outlined"
                fullWidth
                size="medium"
                value={formData.image}
                onChange={handleChange}
                required
                InputProps={{
                  style: {
                    fontSize: "1.1rem",
                    padding: "4px",
                    marginBottom: "4px",
                  },
                }}
                InputLabelProps={{ style: { fontSize: "16px" } }}
              />
            </div>

            <div className="flex justify-center">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isPending}
                className="w-1/2 py-3 text-lg"
              >
                {editData ? "Update" : "Submit"}
              </Button>
            </div>

            {error && (
              <div className="text-center text-red-600 text-lg font-medium">
                {error}
              </div>
            )}

            {success && (
              <div className="text-center text-green-600 text-lg font-medium">
                {editData ? "User updated!" : "User added successfully!"}
              </div>
            )}
          </form>
        </Card>
      </div>
    </div>
  );
}

export default AddUser;
