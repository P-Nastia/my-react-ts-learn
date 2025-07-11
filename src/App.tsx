import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router";
import React from "react";

// Auth check
import RequireAdmin from "./components/protectedRoute/requireAdmin.tsx";

// Lazy-loaded layouts
const UserLayout = React.lazy(() => import("./layout/user/UserLayout.tsx"));
const AdminLayout = React.lazy(() => import("./layout/admin/AdminLayout.tsx"));

// Lazy-loaded pages
const UserHomePage = React.lazy(() => import("./pages/OtherPage/UserHomePage.tsx"));
const LoginPage = React.lazy(() => import("./pages/Account/login/index.tsx"));
const ForgotPasswordPage = React.lazy(() => import("./pages/Account/forgotPassword/index.tsx"));
const ForgotSuccessPage = React.lazy(() => import("./pages/Account/forgotSucces/index.tsx"));
const ResetPasswordPage = React.lazy(() => import("./pages/Account/resetPassword/index.tsx"));
const RegistrationPage = React.lazy(() => import("./pages/Account/register/index.tsx"));
const ProductsPage = React.lazy(() => import("./pages/Product/list/index.tsx"));
const NotFound = React.lazy(() => import("./pages/OtherPage/NotFound.tsx"));

const DashboardHome = React.lazy(() => import("./pages/Dashboard/DashboardHome.tsx"));

const CategoriesListPage = React.lazy(() => import("./pages/Categories"));
const CategoriesCreatePage = React.lazy(() => import("./pages/Categories/create"));
const CategoriesEditPage = React.lazy(() => import("./pages/Categories/edit"));

const AdminProductListPage = React.lazy(() => import("./admin/pages/Products/list/adminProductsListPage.tsx"));
const AdminProductCreatePage = React.lazy(() => import("./admin/pages/Products/create/adminProductCreatePage.tsx"));

const AdminUsersPage = React.lazy(() => import("./admin/pages/Users"));
const AdminUserEditPage = React.lazy(() => import("./admin/pages/Users/edit"));

const App: React.FC = () => {
  return (
      <Router>
        <Routes>

          {/* User Routes */}
          <Route path="/" element={
            <React.Suspense fallback={<>...</>}>
              <UserLayout />
            </React.Suspense>
          }>
            <Route index element={
              <React.Suspense fallback={<>...</>}>
                <UserHomePage />
              </React.Suspense>
            } />
            <Route path="login" element={
              <React.Suspense fallback={<>...</>}>
                <LoginPage />
              </React.Suspense>
            } />
            <Route path="forgot-password" element={
              <React.Suspense fallback={<>...</>}>
                <ForgotPasswordPage />
              </React.Suspense>
            } />
            <Route path="forgot-success" element={
              <React.Suspense fallback={<>...</>}>
                <ForgotSuccessPage />
              </React.Suspense>
            } />
            <Route path="reset-password" element={
              <React.Suspense fallback={<>...</>}>
                <ResetPasswordPage />
              </React.Suspense>
            } />
            <Route path="register" element={
              <React.Suspense fallback={<>...</>}>
                <RegistrationPage />
              </React.Suspense>
            } />
            <Route path="products" element={
              <React.Suspense fallback={<>...</>}>
                <ProductsPage />
              </React.Suspense>
            } />
          </Route>

          {/* Admin Routes */}
          <Route path="admin" element={<RequireAdmin />}>
            <Route element={
              <React.Suspense fallback={<>...</>}>
                <AdminLayout />
              </React.Suspense>
            }>
              <Route path="home" element={
                <React.Suspense fallback={<>...</>}>
                  <DashboardHome />
                </React.Suspense>
              } />

              <Route path="categories">
                <Route index element={
                  <React.Suspense fallback={<>...</>}>
                    <CategoriesListPage />
                  </React.Suspense>
                } />
                <Route path="create" element={
                  <React.Suspense fallback={<>...</>}>
                    <CategoriesCreatePage />
                  </React.Suspense>
                } />
                <Route path="edit/:id" element={
                  <React.Suspense fallback={<>...</>}>
                    <CategoriesEditPage />
                  </React.Suspense>
                } />
              </Route>

              <Route path="products">
                <Route index element={
                  <React.Suspense fallback={<>...</>}>
                    <AdminProductListPage />
                  </React.Suspense>
                } />
                <Route path="create" element={
                  <React.Suspense fallback={<>...</>}>
                    <AdminProductCreatePage />
                  </React.Suspense>
                } />
              </Route>

              <Route path="users">
                <Route index element={
                  <React.Suspense fallback={<>...</>}>
                    <AdminUsersPage />
                  </React.Suspense>
                } />
                <Route path="edit/:id" element={
                  <React.Suspense fallback={<>...</>}>
                    <AdminUserEditPage />
                  </React.Suspense>
                } />
              </Route>
            </Route>
          </Route>

          {/* Not Found */}
          <Route path="*" element={
            <React.Suspense fallback={<>...</>}>
              <NotFound />
            </React.Suspense>
          } />

        </Routes>
      </Router>
  );
};

export default App;
