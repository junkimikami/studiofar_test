import { createBrowserRouter } from "react-router";
import { MainLayout } from "./components/layout/MainLayout";
import { Home } from "./pages/Home";
import { StudioRadiance } from "./pages/StudioRadiance";
import { StudioAir } from "./pages/StudioAir";
import { StudioFuture } from "./pages/StudioFuture";
import { Price } from "./pages/Price";
import { Guide } from "./pages/Guide";
import { Reserve } from "./pages/Reserve";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "studio/radiance",
        Component: StudioRadiance,
      },
      {
        path: "studio/air",
        Component: StudioAir,
      },
      {
        path: "studio/future",
        Component: StudioFuture,
      },
      {
        path: "price",
        Component: Price,
      },
      {
        path: "guide",
        Component: Guide,
      },
      {
        path: "reserve",
        Component: Reserve,
      },
    ],
  },
]);
