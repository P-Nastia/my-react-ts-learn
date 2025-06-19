import './App.css'
import {BrowserRouter as Router, Route, Routes} from "react-router";
import DashboardHome from "./pages/Dashboard/DashboardHome.tsx";
import AdminLayout from "./layout/admin/AdminLayout.tsx";
import NotFound from "./pages/OtherPage/NotFound.tsx";
import CategoriesListPage from "./pages/Categories";
import UserLayout from "./layout/user/UserLayout.tsx";
import UserHomePage from "./pages/OtherPage/UserHomePage.tsx";

const App: React.FC = () => {
  console.log("App rendered");

  return (
      <>
        <Router>
          <Routes>
            <Route path="/" element={<UserLayout />}>
              <Route index element={<UserHomePage />} />
            </Route>


            <Route path={"admin"} element={<AdminLayout />}>
              <Route path="home" element={<DashboardHome />}/>

              <Route path="categories">
                <Route index  element={<CategoriesListPage />} />
              </Route>
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </>
  )
}

export default App