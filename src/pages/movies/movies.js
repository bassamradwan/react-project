

import React, { useState, useEffect } from 'react';
import MovieCard from '../../components/moviescard/moviescard';
import MovieDetails from '../../components/moviedetails/moviedetails';
import Pagination from 'react-paginate';
import './movies.css';

function Movies() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  

  useEffect(() => {
    async function fetchMovies() {
      try {
        const apiKey = 'bf86013c066ab4c5f8ff00b2549cde1f';
        let url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=${currentPage + 1}`;
        if (searchQuery) {
          url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchQuery}&page=${currentPage + 1}`;
        }
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch movies');
        }
        const data = await response.json();
        setMovies(data.results);
        setPageCount(data.total_pages);
      } catch (error) {
        console.error(error);
      }
    }

    fetchMovies();
  },
   [currentPage, searchQuery]);

  const handleViewDetails = (movie) => {
    setSelectedMovie(movie);
  };

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };


  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(0);
  };
 
  
  return (
    <div className='container'>
      <div className="mb-3">
        <input
          type="text"
          placeholder="Search for a movie..."
          value={searchQuery}
          onChange={handleSearch}
          className="search-bar"
        />      </div>
      <div className="row">
        {movies.map((movie) => (
          <div className="col-md-4 mb-3" key={movie.id}>
            <MovieCard movie={movie} onViewDetails={handleViewDetails}  />

          </div>
        ))}
      </div>
      <Pagination
        pageCount={pageCount}
        onPageChange={handlePageClick}
        containerClassName="pagination justify-content-center"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        activeClassName="active"
        previousClassName="page-item"
        nextClassName="page-item"
        previousLinkClassName="page-link"
        nextLinkClassName="page-link"
        pageRangeDisplayed={5}

      /><br/>
      {selectedMovie && <MovieDetails movie={selectedMovie}  onClose={() => setSelectedMovie(null)}  />}

    </div>
  );
};

export default Movies;
