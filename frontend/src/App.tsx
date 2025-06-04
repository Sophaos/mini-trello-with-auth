import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router";
import { LoginPage } from "./pages/login-page";
import { SignUpPage } from "./pages/sign-up-page";
import { BoardsPage } from "./pages/boards-page";
import { BoardPage } from "./pages/board-page";
import { MainLayout } from "./layouts/main-layout";
import { ProtectedRoute } from "./auth/protected-route";
import { AuthProvider } from "./contexts/auth-context";

function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route index path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <Outlet />
                  </MainLayout>
                </ProtectedRoute>
              }
            >
              <Route index path="boards" element={<BoardsPage />} />
              <Route path="boards/:id" element={<BoardPage />} />
            </Route>
            <Route path="*" element={<Navigate to="/boards" />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
