import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Modal from "./components/jira/modal/Modal";
import Dashboard from "./pages/dashboard/Dashboard";
import Loading from "./components/loading/Loading";
import UserManagement from "./pages/userManagement/UserManagement";
import ProjectManagement from "./pages/projectManagement/ProjectManagement";
import CreateProject from "./pages/createProject/CreateProject";
import DrawerFormEditUser from "./components/drawer/DrawerFormEditUser";
import DrawerHOC from "./HOC/drawerHOC/DrawerHOC";
import Profile from "./pages/profile/Profile";
import About from "./pages/about/About";
import ModalJira from "./components/jira/modal/Modal";
import ProtectedRoute from "./HOC/protectedRoute/ProtectedRoute";
import MenuTablet from "./components/jira/MenuTablet";

function App() {
  return (
    <>
      <ModalJira />
      <Loading />
      <DrawerHOC />
      <MenuTablet />
      <Switch>
        <Route exact path={"/login"} component={Login} />
        <Route exact path={"/signup"} component={Signup} />
        <Route
          exact
          path={"/projectmanagement"}
          component={ProjectManagement}
        />
        <Route exact path={"/"} component={ProjectManagement} />
        <Route exact path={"/usermanagement"} component={UserManagement} />
        <Route exact path={"/createproject"} component={CreateProject} />
        <Route exact path={"/project/:id"} component={Dashboard} />
        <Route exact path={"/profile"} component={Profile} />
        <Route exact path={"/about"} component={About} />
      </Switch>
    </>
  );
}

export default App;
