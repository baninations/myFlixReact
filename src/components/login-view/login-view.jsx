import { useState } from "react";
import PropTypes, { shape } from "prop-types";
import { Form, Button, Container } from "react-bootstrap";
import "./login-view.scss";

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    // this prevents the default behavior of the form which is to reload the entire page
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
    };
    fetch(
      `https://movies-flix-al-f68cdd84f041.herokuapp.com/login?Username=${data.Username}&Password=${data.Password}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Login response: ", data);
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", data.token);
          onLoggedIn(data.user);
          // onLoggedIn(data.user, data.token);
          window.location.reload();
        } else {
          alert("No such user");
        }
      })
      .catch((e) => {
        console.log("Something went wrong");
      });
  };

  return (
    <Container
      className="container"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Form onSubmit={handleSubmit} className="form">
        <Form.Group controlId="formUsername">
          <Form.Label className="field">Username:</Form.Label>
          <Form.Control
            className="field"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            minLength="3"
          />
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label className="field">Password:</Form.Label>
          <Form.Control
            className="field"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Button className="field" variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired,
};
