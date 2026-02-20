import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import MissionPage from "./pages/MissionPage";
import SampradayaListPage from "./pages/SampradayaListPage";
import SampradayaDetailPage from "./pages/SampradayaDetailPage";
import SaintsListPage from "./pages/SaintsListPage";
import SaintDetailPage from "./pages/SaintDetailPage";
import BooksListPage from "./pages/BooksListPage";
import BookDetailPage from "./pages/BookDetailPage";
import VaniPage from "./pages/VaniPage";
import SearchPage from "./pages/SearchPage";
import ContributePage from "./pages/ContributePage";
import AdminPage from "./pages/AdminPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/mission" element={<MissionPage />} />
              <Route path="/sampradaya" element={<SampradayaListPage />} />
              <Route path="/sampradaya/:slug" element={<SampradayaDetailPage />} />
              <Route path="/saints" element={<SaintsListPage />} />
              <Route path="/saint/:slug" element={<SaintDetailPage />} />
              <Route path="/books" element={<BooksListPage />} />
              <Route path="/book/:slug" element={<BookDetailPage />} />
              <Route path="/book/:slug/vani/:vaniNumber" element={<VaniPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/contribute" element={<ContributePage />} />
            </Route>
            <Route path="/admin" element={<AdminPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
