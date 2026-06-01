import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import { Layout, PageCard, Spin } from "./ui/index.ts";
import { PageHome } from "./pages/PageHome.tsx";
import { PageNotFound } from "./pages/PageNotFound.tsx";

const CsvJoinApp = lazy(() => import("./apps/csv-join/App.tsx").then(({ App }) => ({ default: App })));
const App1 = lazy(() => import("./apps/app1/App.tsx").then(({ App }) => ({ default: App })));

const PageLoading = () => (
  <Layout title="Loading">
    <PageCard bodyStyle={{ alignItems: "center", display: "flex", justifyContent: "center", minHeight: 240 }}>
      <Spin />
    </PageCard>
  </Layout>
);

export const App = () => (
  <BrowserRouter basename="tools">
    <Suspense fallback={<PageLoading />}>
      <Routes>
        <Route element={<PageHome />} path="/" />

        <Route element={<CsvJoinApp />} path="/csv-join" />
        <Route element={<App1 />} path="/app1" />

        <Route element={<PageNotFound />} path="*" />
      </Routes>
    </Suspense>
  </BrowserRouter>
);
