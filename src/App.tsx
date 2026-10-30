import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import NewDesign, { DesignDemo } from "./pages/NewDesign";
import NewDesignLegal from "./pages/NewDesignLegal";
import Legal from "./pages/Legal";
import Demo from "./pages/Demo";
import HtmlLang from "./i18n/HtmlLang";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <HtmlLang />
        <Routes>
          <Route path="/" element={<NewDesign />} />
          <Route path="/en" element={<NewDesign />} />
          <Route path="/impressum" element={<NewDesignLegal doc="impressum" />} />
          <Route path="/datenschutz" element={<NewDesignLegal doc="datenschutz" />} />
          <Route path="/en/impressum" element={<NewDesignLegal doc="impressum" />} />
          <Route path="/en/datenschutz" element={<NewDesignLegal doc="datenschutz" />} />
          <Route path="/design" element={<Navigate to="/" replace />} />
          <Route path="/en/design" element={<Navigate to="/en" replace />} />
          <Route path="/design/impressum" element={<Navigate to="/impressum" replace />} />
          <Route path="/design/datenschutz" element={<Navigate to="/datenschutz" replace />} />
          <Route path="/en/design/impressum" element={<Navigate to="/en/impressum" replace />} />
          <Route path="/en/design/datenschutz" element={<Navigate to="/en/datenschutz" replace />} />
          <Route path="/design/demo" element={<DesignDemo />} />
          <Route path="/en/design/demo" element={<DesignDemo />} />
          <Route path="/demo" element={<Demo />} />
          <Route path="/en/demo" element={<Demo />} />
          <Route path="/agb" element={<Legal doc="agb" />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
