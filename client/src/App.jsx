import { BrowserRouter, Routes, Route } from "react-router-dom";
import OldHomePage from "./pages/OldHomePage";
import HomePage from "./pages/HomePage/HomePage";
import PersonalitiesPage from "./pages/PersonalitiesPage/PersonalitiesPage";
import "./App.scss";


function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/old" element={<OldHomePage/>} />
      <Route path="/" element={<HomePage/>} />
      <Route path="/setup" element={<PersonalitiesPage/>} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;