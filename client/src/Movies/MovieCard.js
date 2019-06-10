import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'

export default class MovieCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      movies: [],
      movie: null
    }
  }

  componentDidMount() {
    // change this line to grab the id passed on the URL
    const id = this.props.match.params.movieId;
    this.fetchMovie(id);
  }

  fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(response => {
        this.setState(() => ({ movies: response.data }));
      })
      .catch(error => {
        console.error(error);
      });
  };

  componentWillReceiveProps(newProps){
    if(this.props.match.params.id !== newProps.match.params.id){
      this.fetchMovie(newProps.match.params.id);
    }
  }

  saveMovie = () => {
    const addToSavedList = this.props.addToSavedList;
    addToSavedList(this.state.movie)
  }

  render() {
    if (!this.state.movie) {
      return <div>Loading movie information...</div>;
    }
    return(
      <div className="movie-list">
        {this.state.movies.map(movie => (
          <MovieDetails key={movie.id} movie={movie} />
        ))}
    </div>
    )
    

    
  }
}

function MovieDetails({ movie }) {
  const { title, director, metascore, stars } = this.state.movie;
  return (
    <div  className="movie-card">
      <Link to={`/movies/${movie.id}`}>{title}</Link>
      <div className="movie-director">
        Director: <em>{director}</em>
      </div>
      <div className="movie-metascore">
        Metascore: <strong>{metascore}</strong>
      </div>
      <h3>Actors</h3>

      {stars.map(star => (
        <div key={star} className="movie-star">
          {star}
        </div>
      ))} 
      <div className="save-button" onClick={this.props.addToSavedList}>Save</div>
    </div>
  );
}