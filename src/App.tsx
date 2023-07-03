import { Route, Routes } from 'react-router-dom'
import Layout from './Components/Layout'
import PostPage from './Components/Forms/PostPage';
import SingIn from './Components/Forms/SingInPage';
import SingUp from './Components/Forms/SingUpPage';
import RegistrationConfirmation from './Components/Forms/SingUpConfirmationPage';
import Success from './Components/Forms/SuccessPage';
import HomePage from './Components/HomePage';
import { ActivatePage } from './Components/Forms/ActivatePage/ActivatePage';
import SearchPostsPage from './Components/SearchPostsPage/index';
import { RoutesConstants } from './Constants/Routes';
import AddPostPage from './Components/Forms/AddPostPage';

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path={'post/:id'} element={<PostPage />} />
          <Route path='addPost' element={<AddPostPage />} />
          <Route path='singin' element={<SingIn />} />
          <Route path='singup' element={<SingUp />} />
          <Route path='registrationConfirmation' element={<RegistrationConfirmation />} />
          <Route path='activate' element={<ActivatePage />} />
          <Route path='success' element={<Success />} />
          <Route path='search' element={<SearchPostsPage />} />
          <Route path='myposts' element={<HomePage listType='myPosts' />} />
        </Route>
      </Routes>
    </>
  )
}

export default App;



