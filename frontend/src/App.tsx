import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router";
import { LoginPage } from "./pages/login-page";
import { SignUpPage } from "./pages/sign-up-page";
import { BoardsPage } from "./pages/boards-page";
import { BoardPage } from "./pages/board-page";
import { MainLayout } from "./layouts/main-layout";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route
            element={
              <MainLayout>
                <Outlet />
              </MainLayout>
            }
          >
            <Route index path="boards" element={<BoardsPage />} />
            <Route path="boards/:id" element={<BoardPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/boards" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
