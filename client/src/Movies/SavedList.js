import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom'
import { NONAME } from 'dns';

export default class SavedList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="saved-list">
        <h3>Saved Movies:</h3>
        {this.props.list.map(movie => (
          <NavLink 
            to={`movies/${movie.id}`}
            activeStyle={{
              color: "pink"
            }}
            >
            <span className="saved-movie">{movie.title}</span>
          </NavLink>
        ))}
        <Link to="/" className="home-button">Home</Link>
      </div>
    );
  }
}
