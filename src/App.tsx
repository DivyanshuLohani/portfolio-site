import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProjectsPage from "./pages/ProjectsPage";
import HomePage from "./pages/HomePage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/projects/",
      element: <ProjectsPage />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
