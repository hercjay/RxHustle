import logo from './logo.svg';
import './App.css';


import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import FindShifts from './pages/FindShifts';
import PostShifts from './pages/PostShifts';
import UserProfile from './pages/UserProfile';
import AccountSettings from './pages/AccountSettings';
import Logout from './pages/Logout';



const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/find-shifts" component={FindShifts} />
          <Route path="/post-shifts" component={PostShifts} />
          <Route path="/user-profile" component={UserProfile} />
          <Route path="/account-settings" component={AccountSettings} />
          <Route path="/logout" component={Logout} />
        </Switch>
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
