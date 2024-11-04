import React from 'react';
import MovieCard from './MovieCard';

const MovieList = ({ movies }) => {
  return (
    <div className='md:grid-cols-3 lg:grid-cols-4 grid grid-cols-2 gap-4 mt-4'>
      {movies.length > 0 ? (
        movies.map(movie => <MovieCard key={movie.id} movie={movie} />)
      ) : (
        <p>No movies found</p>
      )}
    </div>
  );
};

export default MovieList;
