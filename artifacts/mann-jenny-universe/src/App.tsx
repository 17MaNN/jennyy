import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/components/ThemeProvider";
import Nav from "@/components/Nav";
import Stars from "@/components/Stars";
import ScrollProgress from "@/components/ScrollProgress";
import Home from "@/pages/Home";
import Story from "@/pages/Story";
import Memories from "@/pages/Memories";
import Letters from "@/pages/Letters";
import Messages from "@/pages/Messages";
import Recipes from "@/pages/Recipes";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "3rem",
            fontStyle: "italic",
            fontWeight: 300,
            color: "var(--deep)",
          }}
        >
          Lost in the stars
        </h1>
        <p style={{ color: "var(--muted-color)", fontFamily: "'DM Sans', sans-serif", marginTop: "0.5rem" }}>
          This page doesn't exist yet — but maybe someday it will.
        </p>
      </div>
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/story" component={Story} />
      <Route path="/memories" component={Memories} />
      <Route path="/letters" component={Letters} />
      <Route path="/messages" component={Messages} />
      <Route path="/recipes" component={Recipes} />
      <Route component={NotFoundPage} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Stars />
          <ScrollProgress />
          <Nav />
          <main style={{ position: "relative", zIndex: 1 }}>
            <Router />
          </main>
        </WouterRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
