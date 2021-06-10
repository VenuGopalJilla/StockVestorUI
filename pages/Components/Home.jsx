import AppBar from "@material-ui/core/AppBar";
import Drawer from "@material-ui/core/Drawer";
import { withStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import React from "react";
import { Route, Switch, withRouter, HashRouter, Redirect} from "react-router-dom";
import About from "./About";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";
import CompanyDetails from "./CompanyDetails";
import Comparison from "./Comparison";
import NavigationBar from "./NavigationBar";
import PageNotFound from "./PageNotFound";
import Revenue from "./Revenue";
import Sectors from "./Sectors";
import SideBar from "./SideBar";
import SP500 from "./SP500";
import Top from "./Top";
import Simulation from "./Simulation";
import Main from "./Main";
import Login from "./Login";
import Signup from "./Signup";

import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';



const drawerWidth = 280;

const styles = (theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(2),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
    backgroundColor: "#05386B",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(11),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
});


class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      companyNames: [],
      open: false,
    };
  }


  handleDrawerOpen = () => {
    this.setState({ open : true});
  };

  handleDrawerClose = () => {
    this.setState({ open : false});
  };

  componentDidMount = () => {
    console.log("Home");
  };

  modifyOpen = (e) => {
    this.setState({ open: false });
  };

  render() {
    const { classes, theme } = this.props;
    const open = this.state.open;
    let logged = JSON.parse(localStorage.getItem("logged"));
    
    return (
      <React.Fragment>
        <HashRouter>
        <AppBar
          position="relative"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
          style={{ backgroundColor: "#5CDB95", color: "#05386B", position: "fixed"}}
        >
          <Toolbar>
            <IconButton
              disabled = {!logged}
              color="inherit"
              aria-label="open drawer"
              onClick={this.handleDrawerOpen}
              edge="start"
              style={{
                display: logged == null || logged === false ? "none" : "",
              }}
              className={clsx(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <NavigationBar modifyOpen={this.modifyOpen}/>
          </Toolbar>
        </AppBar>
        <div className={classes.root}>
          <Drawer
            className={classes.drawer}
            variant="persistent"
            classes={{
              paper: classes.drawerPaper,
            }}
            anchor="left"
            open={open}
            backgroundColor= "#05386B"
          >
            <div className={classes.drawerHeader}>
            <Typography variant="h6" style = {{ color: "#EDF5E1"}}>STOCK VESTOR</Typography>
              <IconButton onClick={this.handleDrawerClose}>
                {theme.direction === 'ltr' ? <ChevronLeftIcon style = {{ color : "#EDF5E1"}}/> : <ChevronRightIcon style = {{ color : "#EDF5E1"}}/>}
              </IconButton>
            </div>
            <SideBar />
          </Drawer>
          <main className={clsx(classes.content, {
              [classes.contentShift]: open,
            })}>
            <Switch>
              <Route exact path="/" component = {Main}/>
              <Route exact path="/home" component = {Main}/>
              <Route 
                exact 
                path="/login" 
                render={(props) => {
                  if (logged == null || logged === false) {
                    return <Login />;
                  }
                  return <Redirect to="/home" />;
                }}
                />
              <Route 
                exact 
                path="/signup"
                render={(props) => {
                  if (logged == null || logged === false) {
                    return <Signup />;
                  }
                  return <Redirect to="/home" />;
                }}
                />
              <Route exact path="/about" component={About} />
              <Route
                exact
                path="/top/:num/:type"
                render={(props) => {
                  if (logged == null || logged === false) {
                    return <Redirect to="/login" />;
                  }
                  const {
                    match: {
                      params: { num, type },
                    },
                  } = props;
                  return <Top key={`num=${num}&type=${type}`} {...props} />;
                }}
              />
              <Route 
                exact 
                path="/sectors"
                render={(props) => {
                  if (logged == null || logged === false) {
                    return <Redirect to="/login" />;
                  }
                  return <Sectors />;
                }}
                />
              <Route
                exact
                path="/companydetails/:company"
                render={(props) => {
                  if (logged == null || logged === false) {
                    return <Redirect to="/login" />;
                  }
                  const {
                    match: {
                      params: { company },
                    },
                  } = props;
                  return (
                    <CompanyDetails key={`company=${company}`} {...props} />
                  );
                }}
              />
              <Route
                exact
                path="/revenue"
                render={(props) => {
                  if (logged == null || logged === false) {
                    return <Redirect to="/login" />;
                  }
                  return <Revenue companyNames={this.state.companyNames} />;
                }}
              />
              <Route 
                exact 
                path="/sp500"
                render={(props) => {
                  if (logged == null || logged === false) {
                    return <Redirect to="/login" />;
                  }
                  return <SP500 />;
                }}
                />
              <Route 
                exact 
                path="/comparison" 
                render={(props) => {
                  if (logged == null || logged === false) {
                    return <Redirect to="/login" />;
                  }
                  return <Comparison />;
                }}/>
              <Route 
                exact 
                path="/simulation"
                render={(props) => {
                  if (logged == null || logged === false) {
                    return <Redirect to="/login" />;
                  }
                  return <Simulation />;
                }}
                />
              <Route component={PageNotFound} />
            </Switch>
          </main>
        </div>
        </HashRouter>
      </React.Fragment>
    );
  }
}

export default withStyles(styles, { withTheme: true })(withRouter(Home));
