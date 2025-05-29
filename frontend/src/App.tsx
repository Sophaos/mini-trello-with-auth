import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router";
// import { BaseLayout } from "./layout/base-layout";
import { LoginPage } from "./pages/login-page";
import { SignUpPage } from "./pages/sign-up-page";
import { BoardsPage } from "./pages/boards-page";
import { BoardPage } from "./pages/board-pages";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route
            element={
              // <BaseLayout>
              <Outlet />
              // </BaseLayout>
            }
          >
            <Route index path="boards" element={<BoardsPage />} />
            <Route path="board/:id" element={<BoardPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/boards" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
