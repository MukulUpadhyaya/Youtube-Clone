import "./App.css";
import { Provider } from "react-redux";
import { Header } from "./components/Header";
import { Body } from "./components/Body";
import store from "./utils/store";
import { Router, RouterProvider, createBrowserRouter } from "react-router-dom";
import { MainContainer } from "./components/MainContainer";
import WatchPage from "./components/WatchPage";
import ShowSearchResults from "./components/ShowSearchResults";

function App() {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Header />
          <Body />
        </>
      ),
      children: [
        { path: "/", element: <MainContainer /> },
        {
          path: "/watch",
          element: <WatchPage />,
        },
        {
          path: "/search",
          element: <ShowSearchResults />,
        },
      ],
    },
  ]);

  return (
    <Provider store={store}>
      <div className="">
        {/* <Header></Header> */}
        <RouterProvider router={appRouter}/>
      </div>
    </Provider>
  );
}

export default App;
