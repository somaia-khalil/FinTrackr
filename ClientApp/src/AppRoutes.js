import ApiAuthorzationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import { Counter } from "./components/Counter";
import Dashboard from "./components/Dashboard";
import Home from "./components/Home";

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/counter',
    element: <Counter />
  },
  {
    path: '/dashboard',
    requireAuth: true,
    element: <Dashboard />
  },
  ...ApiAuthorzationRoutes
];

export default AppRoutes;
