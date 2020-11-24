import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AuthProvider } from "../context/auth";

// Pages
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import NotFound from "../pages/NotFound";

// Common Components
import LoadingFallback from "../components/shared/LoadingFallback";
import AuthenticatedRoute from "./authenticated-route";

// Lazy Pages
const Dashboard = lazy(() => import("../pages/Dashboard"));

const AppRoutes = () => {
  return (
    <Router>
      <AuthProvider>
        <Suspense fallback={<LoadingFallback />}>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <AuthenticatedRoute path="/dashboard" component={Dashboard} />
            <Route exact path="/" component={Home} />
            <Route path="*" component={NotFound} />
          </Switch>
        </Suspense>
      </AuthProvider>
    </Router>
  );
};

export default AppRoutes;
