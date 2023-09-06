import "./movie-card.scss";
import PropTypes, { shape } from "prop-types";
import { Card, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({
  movie,
  user,
  method,
  messageOK,
  messageFailed,
  fav,
}) => {
  const favHandle = () => {
    const storedToken = localStorage.getItem("token");
    fetch(
      `https://movies-flix-al-f68cdd84f041.herokuapp.com/users/${user.Username}/movies/${movie._id}`,
      {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${storedToken}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("datAA2222: ", data);
        if (data) {
          localStorage.setItem("user", JSON.stringify(data));
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
    <Card className="card h-100">
      <Card.Img className="imageSize" src={movie.ImagePath} />
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text>{movie.Director.Name}</Card.Text>
        <Row>
          <Col xs={6}>
            <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
              <Button variant="link">Open</Button>
            </Link>
          </Col>
          <Col xs={6} className="text-right">
            <Button
              className="btn-fav"
              size="sm"
              onClick={favHandle}
              variant="danger"
            >
              {fav}
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.number.isRequired,
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Director: shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string,
      Birth: PropTypes.number,
      Genre: shape({
        Name: PropTypes.string.isRequired,
        Description: PropTypes.string,
      }),
      ImagePath: PropTypes.string.isRequired,
    }),
  }).isRequired,
  onMovieClicked: PropTypes.func.isRequired,
};

// import "./movie-card.scss";
// import PropTypes, { shape } from "prop-types";
// import { Card, Button } from "react-bootstrap";
// import { Link } from "react-router-dom";

// export const MovieCard = ({ movie, onMovieClicked }) => {
//   return (
//     <Card className="card h-100" onClick={() => onMovieClicked(movie)}>
//       <Card.Img className="imageSize" src={movie.ImagePath} />
//       <Card.Body>
//         <Card.Title>{movie.Title}</Card.Title>
//         <Card.Text>{movie.Director.Name}</Card.Text>
//         <Button onClick={() => onMovieClicked(movie)} variant="link">
//           Open
//         </Button>
//       </Card.Body>
//     </Card>
//   );
// };

// MovieCard.propTypes = {
//   movie: PropTypes.shape({
//     _id: PropTypes.number.isRequired,
//     Title: PropTypes.string.isRequired,
//     Description: PropTypes.string.isRequired,
//     Director: shape({
//       Name: PropTypes.string.isRequired,
//       Bio: PropTypes.string,
//       Birth: PropTypes.number,
//       Genre: shape({
//         Name: PropTypes.string.isRequired,
//         Description: PropTypes.string,
//       }),
//       ImagePath: PropTypes.string.isRequired,
//     }),
//   }).isRequired,
//   onMovieClicked: PropTypes.func.isRequired,
// };
