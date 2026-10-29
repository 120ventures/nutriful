import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Partner from "./pages/Partner";
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
          <Route path="/" element={<Partner />} />
          <Route path="/design" element={<NewDesign />} />
          <Route path="/design/demo" element={<DesignDemo />} />
          <Route path="/design/impressum" element={<NewDesignLegal doc="impressum" />} />
          <Route path="/design/datenschutz" element={<NewDesignLegal doc="datenschutz" />} />
          <Route path="/en/design" element={<NewDesign />} />
          <Route path="/en/design/demo" element={<DesignDemo />} />
          <Route path="/en/design/impressum" element={<NewDesignLegal doc="impressum" />} />
          <Route path="/en/design/datenschutz" element={<NewDesignLegal doc="datenschutz" />} />
          <Route path="/demo" element={<Demo />} />
          {/* English lives under /en. Legal pages stay German - they are the
              authoritative Austrian originals. */}
          <Route path="/en" element={<Partner />} />
          <Route path="/en/demo" element={<Demo />} />
          <Route path="/impressum" element={<Legal doc="impressum" />} />
          <Route path="/datenschutz" element={<Legal doc="datenschutz" />} />
          <Route path="/agb" element={<Legal doc="agb" />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
