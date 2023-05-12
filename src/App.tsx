import styles from "./App.module.scss";
import { Route, Routes } from 'react-router-dom'
import Layout from './Components/Layout'
import Body from "./Components/Body";
import Post from "./Components/Post";
import SingIn from "./Components/SingIn";


const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Body />} />
        <Route path='posts/:id' element={<Post />} />
        <Route path='singin' element={<SingIn />} />
      </Route>
    </Routes>
  );
};

export default App;
