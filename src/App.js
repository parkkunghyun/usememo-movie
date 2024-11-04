import { useEffect, useMemo, useState } from 'react';
import './App.css';
import MovieList from './components/MovieList';

function App() {
  const [page, setPage] = useState(2);
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSortedByDate, setIsSortedByDate] = useState(false);

  const maxPage = 5;

  const apiKey = process.env.REACT_APP_TMDB_API_KEY; // 환경 변수에서 API 키를 가져옵니다.
  const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=ko&page=${page}&region=KR`;

  const nextPage = () => {
    if (page < maxPage) {
      setPage(page + 1);
    }
  };

  const prevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data.results);
        setMovies(data.results);
      } catch (e) {
        console.error('Error', e);
      }
    };

    fetchMovies();
  }, [url]);

  const filterMovies = useMemo(() => {
    return movies.filter((movie) =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [movies, searchTerm]);
  
  const sortedMovies = useMemo(() => {
    return [...filterMovies].sort((a, b) => {
      return new Date(b.release_date) - new Date(a.release_date);
    })
  }, [filterMovies, isSortedByDate]);

  const toggleSortByDate = () => {
    setIsSortedByDate(!isSortedByDate);
  }

  return (
    <div className="App bg-gradient-to-r from-white/100 to-red-500 text-white flex flex-col items-center">
      <h1 className="text-4xl my-4 font-extrabold">Movie List</h1>

      <input
        className="w-[300px] py-2 px-3 text-black font-bold focus:outline-none rounded-full"
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="영화제목을 입력해주세요"
      />

      <button onClick={toggleSortByDate} className='my-2 rounded-full font-bold shadow-lg p-2 bg-pink-500 text-white'>{isSortedByDate ? '날짜순 정렬 해제' : '날짜순 정렬' }</button>

      {/* filterMovies를 MovieList에 전달 */}
      <MovieList movies={isSortedByDate ? sortedMovies : filterMovies} />

      <div className="flex items-center gap-4 m-4">
        <button onClick={prevPage} className="text-2xl font-bold border-white border-4 rounded-full px-2">
          -
        </button>
        <p className="text-2xl font-bold">{page}</p> / <p className="text-2xl font-bold">{maxPage}</p>
        <button onClick={nextPage} className="text-2xl font-bold border-white border-4 rounded-full px-2">
          +
        </button>
      </div>
    </div>
  );
}

export default App;
