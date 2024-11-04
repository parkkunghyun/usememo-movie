import React from 'react'

// https://image.tmdb.org/t/p/w185/bMGcJVd4hXlDcevRJZBK5qROlyP.jpg

const MovieCard = ({ movie }) => {

  return (
      <div className='flex w-[200px] flex-col items-center justify-center border-2 p-2 rounded-lg shadow-lg m-2 hover:scale-110'>
          <img className='w-[100px] h-[120px]' src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`} alt="포스터" />
          <h3 className='text-white font-bold text-xl'>{movie.title}</h3>
          <p className='text-white'>개볼일: {movie.release_date}</p>
    </div>
  )
}

export default MovieCard