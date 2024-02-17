import './App.css';


import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import FindShifts from './pages/FindShifts';
import PostShifts from './pages/PostShifts';
import UserProfile from './pages/UserProfile';
import AccountSettings from './pages/AccountSettings';
import Logout from './pages/Logout';
import ScrollToTop from './components/common/ScrollToTop';
import Signup from './pages/Signup';



const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <div className='pb-20 bg-slate-100'>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/find-shifts" element={<FindShifts />} />
          <Route path="/post-shifts" element={<PostShifts />} />
          <Route path="/user-profile" element={<UserProfile />} />
          <Route path="/account-settings" element={<AccountSettings />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </Router>
  );
};


// function App() {
//   return (
//     <div className="App">
//       <Navbar />
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//       <main>
//         <h1 className="text-3xl font-bold underline">
//           Hello world!
//         </h1>
//       </main>
//     </div>
//   );
// }

export default App;
