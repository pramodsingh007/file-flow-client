import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./routes/layout/Layout";
import Home from "./routes/Home";
import { ClerkProvider, ClerkLoaded, ClerkLoading } from "@clerk/clerk-react";
import DashboardLayout from "./routes/layout/DashboardLayout";
import Upload from "./routes/Upload";
import SignIn from "./routes/SignIn";
import PrivateRoute from "./privateRoute/PrivateRoute";
import SignUp from "./routes/SignUp";
import Loading from "./components/Loading";
import FilePreview from "./routes/FilePreview";
import MyFiles from "./routes/MyFiles";
import DownloadFile from "./routes/DownloadFile";
import Upgrade from "./routes/Upgrade";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "upload",
        element: (
          <PrivateRoute>
            <Upload />
          </PrivateRoute>
        ),
      },
      {
        path: "upgrade",
        element: (
          <PrivateRoute>
            <Upgrade />
          </PrivateRoute>
        ),
      },

      {
        path: "file-preview/:docId",
        loader: ({ params }) => {
          return fetch(`https://file-flow.onrender.com/file-preview/${params.docId}`)
            .then((res) => res.json())
            .then((data) => data)
            .catch((err) => console.log(err));
        },
        element: (
          <PrivateRoute>
            <FilePreview />
          </PrivateRoute>
        ),
      },
      {
        path:'my-files',
        element:<PrivateRoute><MyFiles/></PrivateRoute>
      }
    ],
  },
  {
    path: "/sign-up",
    element: (
      <>
        <ClerkLoading>
          <Loading></Loading>
        </ClerkLoading>
        <ClerkLoaded>
          <SignUp />
        </ClerkLoaded>
      </>
    ),
  },
  {
    path: "/sign-in",
    element: (
      <>
        <ClerkLoading>
          <Loading></Loading>
        </ClerkLoading>
        <ClerkLoaded>
          <SignIn />
        </ClerkLoaded>
      </>
    ),
  },
  {
    path:'/file/:docId',
    element:<DownloadFile/>,
    loader:({params})=>{
      return fetch(`https://file-flow.onrender.com/get-download-file/${params.docId}`)
      .then(res=>res.json())
      .then(data =>data)
      .catch(err=>console.log(err))
    }
  }
]);

if (!import.meta.env.VITE_REACT_APP_CLERK_PUBLISHABLE_KEY) {
  throw "Missing Publishable Key";
}
const clerkPubKey = import.meta.env.VITE_REACT_APP_CLERK_PUBLISHABLE_KEY;
function App() {
  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <RouterProvider router={router} />
    </ClerkProvider>
  );
}

export default App;
