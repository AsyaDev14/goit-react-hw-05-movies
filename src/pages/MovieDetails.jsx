import { useEffect, useState } from "react"
import { Link, Outlet,  useNavigate,  useParams } from "react-router-dom";
import { getMovieByID } from "routes/api";

export const MovieDetails = () => {
  const { movieId } = useParams();
  const [movieInform, setMovieInform] = useState({});
  const { poster_path, title, vote_average, overview } = movieInform;

  // const location = useLocation();
  const navigate = useNavigate();

  const fullPath = `https://image.tmdb.org/t/p/w500`;
  const releaseDate = new Date(movieInform.release_date).getFullYear();
  const genreName = movieInform.genres && movieInform.genres.map((genre) => genre.name).join(", ");

  // console.log("search", movieId);
  useEffect(() => {
    getMovieByID(movieId)
      .then((data) => {
        if (data) {
          setMovieInform(data)
        }
      })
  }, [movieId])

  // console.log("inform", movieInform);
  return (
    <div>
      {/* switched to home page  */}
      {/* <Link to={location.state?.from ? location.state.from : "/"}>
      </Link> */}
        <button type="button" onClick={()=>navigate(-1)}>Go back</button>

      <div className="main_description">
        <img src={`${fullPath}${poster_path}`} width='200' alt="." />
        <div className="main_thumb">
          <h2>{title}({releaseDate})</h2>
          <p>User Score : {vote_average}</p>
          <h2>Overview</h2>
          <p>{overview}</p>
          <h2>Genres</h2>
          <p>{genreName}</p>
        </div>
      </div>

      <div className="movie_layout">
        <h3>Additional information</h3>
        <ul>
          <li>
            <Link to="cast" className='movie_links'>Cast</Link>
          </li>
          <li>
            <Link to="reviews" className='movie_links'>Reviews</Link>
          </li>
        </ul>
      </div>
      <Outlet />
    </div>
  )
}
