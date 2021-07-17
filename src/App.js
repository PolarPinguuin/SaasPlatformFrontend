import logo from './logo.svg';
import './App.css';
import MainForm from "./components/forms/MainForm";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <MainForm/>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        draggable={false}
        pauseOnHover={true}
        closeOnClick={true}
      />
    </div>
  );
}

export default App;
