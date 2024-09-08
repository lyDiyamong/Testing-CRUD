import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import EditPage from "./pages/EditPage";
import SignUpForm from "./pages/TestingForm";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/edit/:id" element={<EditPage />} />
                <Route path="/signup" element={<SignUpForm />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
