import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import User from './Page/User/User'
import Home from './Page/Home';
import DetailFilmAdmin from "./Page/Admin/DetailFilmAdmin"
import DetailTVAdmin from "./Page/Admin/DetailTVAdmin"
import MoviePage from './Page/User/Movies'
import TvPage from './Page/User/TV-Series'
import MovieDetail from './Page/User/Movie-Detail';
import TVDetail from './Page/User/TV-Details'
import Profile from './Page/User/Profile';
import Payment from './Page/User/Payment';
import Admin from './Page/Admin/AdminPage';
import FilmAdmin from './Page/Admin/FilmAdmin';
import AddFilm from './Page/Admin/AddFilmAdmin';
import { API, setAuthToken } from './Config/Api';
import { PrivateRouteAdmin, PrivateRouteLogin, PrivateRouteUser } from './Component/PrivateRoute'
import { useContext, useEffect, useState } from 'react';
import { UserContext } from './Context/userContext';



function App() {

  let navigate = useNavigate()

  const [state, dispatch] = useContext(UserContext)
  const [isLoading, setIsLoading] = useState(null)

  const checkUser = async () => {
    try {
      const response = await API.get("/check-auth")
      console.log("Check user success : ", response)

      let payload = response.data.data

      payload.token = localStorage.token

      dispatch({
        type: "USER_SUCCESS",
        payload,
      })
      setIsLoading(false)
    } catch (error) {
      console.log("check user failed : ", error)
      dispatch({
        type: "AUTH_ERROR"
      })
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token)
      checkUser()
    } else {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    if (!isLoading) {
      if (state.isLogin === false ) {
        navigate("/auth")
      }
    }
  }, [isLoading])

  return (
    <>
      {isLoading ? null : (
        <Routes>
          <Route path='/auth' element={<Home />} />
            <Route element={<PrivateRouteLogin />}>
              <Route element={<PrivateRouteUser />} >
                <Route path='/' element={<User />} />
                <Route path='/movie' element={<MoviePage />} />
                <Route path='/tvseries' element={<TvPage />} />
                <Route path='/detailmovie/:id' element={<MovieDetail />} />
                <Route path='/detailtv/:id' element={<TVDetail />} />
                <Route path='/profile' element={<Profile />} />
                <Route path='/payment' element={<Payment />} />
              </Route>
              <Route element={<PrivateRouteAdmin />} >
                <Route path='/admin' element={<Admin />} />
                <Route path='/filmadmin' element={<FilmAdmin />} />
                <Route path='/detailtvadmin/:id' element={<DetailTVAdmin />} />
                <Route path='/addfilmadmin' element={<AddFilm />} />
                <Route path='/detailfilmadmin/:id' element={<DetailFilmAdmin />} />
              </Route>
          </Route>
        </Routes>
      )}
    </>
  );
}

export default App;
