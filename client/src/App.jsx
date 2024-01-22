import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GlobalStyle } from "../GlobalStyle"
import Home from "./components/Home";
import RegisterPage from "./components/RegisterPage";
import LoginPage from "./components/LoginPage";
import StartPage from "./components/StartPage";
import QuestionBox from './components/QuestionBox';
import ProgressReport from "./components/ProgressReport";
const App=()=> {
  return (
      <Router>
        <GlobalStyle/>
          <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/register" element={<RegisterPage/>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/startpage" element={<StartPage/>} />
          <Route path="/questionBox/:languageType" element={<QuestionBox/>} />
          <Route path="/progressReport" element={<ProgressReport/>} />
          </Routes>
      </Router>
  )
}

export default App
