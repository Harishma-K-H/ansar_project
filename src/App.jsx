import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import AdminRoutes from './Admin/routes/AdminRoutes';
import UserRoutes from './User/routes/UserRoutes';
import StaffRoutes from './Staff/routes/StaffRoutes';
import NotFound from './common/NotFound';
import Landing from './common/Landing';


function App()
{


  return (
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/landing" />} />
          <Route path="/admin/*" element={<AdminRoutes />} />
          <Route path="/user/*" element={<UserRoutes />} />
        <Route path="/tech-support/*" element={<StaffRoutes />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/landing" element={<Landing />} />
        </Routes>
        <ToastContainer
          position='bottom-right'
      />
      </Router>
  );
}

export default App;
