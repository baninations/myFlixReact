import { ButtonGroup, Container, Button, Form } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { UpdateView } from "./update-profile";
import { useHistory } from "react-router-dom";
import { DeRegister } from "./deregister-user";
import { LoginView } from "../login-view/login-view";
import { Row, Col, Container, Nav } from "react-bootstrap";
import { FavMovie } from "./fav-movie";
import { MovieCard } from "../movie/movie-card/movie-card";
import { useState } from "react";

export const ProfileView = ({ user, onLoggedOut, movies }) => {
  const [searchQuery, setSearchQuery] = useState("");
  console.log("5555movies: ", movies);
  if (!user) {
    return <Navigate to="/login" />;
  } else {
    let favouriteMovie = movies.filter((m) =>
      user.FavoriteMovies.includes(m._id)
    );
    if (searchQuery) {
      favouriteMovie = favouriteMovie.filter((movie) =>
        movie.Title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return (
      <>
        <Form className="mb-3">
          <Form.Control
            type="text"
            placeholder="Search favorite movies"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Form>
        {
          <>
            {favouriteMovie.map((movie) => (
              <Col className="mb-4" key={movie.id} xs={12} sm={6} md={4} lg={3}>
                <MovieCard
                  movie={movie}
                  user={user}
                  method={"DELETE"}
                  messageOK={"Movie deleted"}
                  messageFailed={"failed to delete message"}
                  fav={"Remove"}
                />
              </Col>
            ))}
          </>
        }
        <UpdateView user={user} />
        <DeRegister user={user} onLoggedOut={onLoggedOut} />
      </>
    );
  }
};
