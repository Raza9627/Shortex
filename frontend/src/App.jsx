import { BrowserRouter, Routes, Route } from "react-router-dom";

import Homepage from "./pages/Homepage";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import ChangePassword from "./pages/ChangePassword"
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Blog from "./pages/Blog";
const App = () => {
    return (
        <BrowserRouter>
            <Routes>

                <Route path="/" element={<Homepage />} />

                <Route path="/login" element={<Login />} />

                <Route path="/register" element={<Register />} />

                <Route path="/privacy" element={<Privacy />} />

                <Route path="/terms" element={<Terms />} />
 
               <Route path="/change-password" element={<ChangePassword />} />

               <Route path="/forgot-password" element={<ForgotPassword />} />
               <Route path="/reset-password/:token" element={<ResetPassword />} />
               <Route path="/blog" element={<Blog />} />
               
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
};

export default App;