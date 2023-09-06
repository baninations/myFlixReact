import { Button } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Link } from "react-router-dom";

export const DeRegister = ({ user, onLoggedOut }) => {
  const deleteUser = () => {
    const storedToken = localStorage.getItem("token");
    fetch(
      `https://movies-flix-al-f68cdd84f041.herokuapp.com/users/${user.Username}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${storedToken}`,
        },
      }
    ).then((response) => {
      if (response.ok) {
        onLoggedOut();
        alert("User deleted");
      } else {
        alert("Error deleting user");
      }
    });
  };

  return (
    <>
      <Button onClick={deleteUser} className="mt-5" variant="danger">
        Delete Account
      </Button>
    </>
  );
};
