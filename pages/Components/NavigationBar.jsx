import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { 
  Tooltip,
  List,
  ListItem,
  ListItemText,
  Button,
  IconButton
} from "@material-ui/core";
import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import axios from "axios";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";


const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  link: {
    textDecoration: "initial",
  },
  grid: {
    // "&:hover": {
    //   backgroundColor: "#ADD8E0",
    // },
  },
  typography: {
    padding: 15,
    fontSize : 24,
    "&:hover": {
      color: "#EDF5E1",
    },
  },
  largeIcon: {
    width: 50,
    height: 50,
  },
  tooltip: {
    backgroundColor: "white",
    width : 250,
    height: 80,
    color : "#05386B",
  },
  tooltip1: {
    backgroundColor: "white",
    width : 280,
    height: 200,
    color : "#05386B",
  },
  button : {
    backgroundColor: "#05386B",
    color: "#5CDB95",
  },
  listitemtext : {
    fontSize : 14,
    color : "#05386B"
  },
});

class NavigationBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      selectedCompany: " ", 
      companyNames: [],
    };
  }

  selectedCompany = (e, val) => {
    const { history } = this.props;
    if (val === null) {
      history.push("/");
      return;
    }
    this.setState({ selectedCompany: val }, () => {
      history.push("/companydetails/" + this.state.selectedCompany);
      this.setState({ selectedCompany: "" }, () => {});
    });
  };

  componentDidMount = () => {
    console.log("NavigationBar");
    axios
      .get("/api/companyNames")
      .then((s) => {
        if (s.status === 200) {
          this.setState({ companyNames: s.data });
        } else {
          this.setState({ companyNames: [] });
        }
      })
      .catch((e) => console.log(e));
  };


  render() {
    const { classes, history, theme } = this.props;
    const logged = JSON.parse(localStorage.getItem("logged"));
    let details = JSON.parse(localStorage.getItem("details")) || [];

    return (
      <Grid container className={classes.root} spacing={3}>
        <Grid item className={classes.grid}>
          <NavLink to="/" className={classes.link}>
            <Typography className={classes.typography} variant="subtitle1"
            >
              HOME
            </Typography>
          </NavLink>
        </Grid>
        <Grid item className={classes.grid}>
          <NavLink to="/about" className={classes.link}>
            <Typography className={classes.typography} variant="subtitle1"
            >
              ABOUT
            </Typography>
          </NavLink>
        </Grid>

        {logged === true ? (
          <Tooltip
            classes={{ tooltip: classes.tooltip }}
            title={
              <Typography variant="subtitle2">
                It helps to compare the performance of two or more companies at a time.
              </Typography>
            }
            interactive
          >
            <Grid item className={classes.grid}>
              <NavLink to="/comparison" className={classes.link}>
                <Typography className={classes.typography} variant="subtitle1"
                >
                  COMPARISON
                </Typography>
              </NavLink>
            </Grid>
          </Tooltip>
          ) : (
            <span />
        )}

        {logged === true ? (
          <Tooltip
            classes={{ tooltip: classes.tooltip }}
            title={
              <Typography variant="subtitle2">
                It is used to find the expected returns of each company in the coming days. 
              </Typography>
            }
            interactive
          >
            <Grid item className={classes.grid}>
              <NavLink to="/simulation" className={classes.link} >
                <Typography className={classes.typography} variant="subtitle1" 
                >
                  SIMULATION
                </Typography>
              </NavLink>
            </Grid>
          </Tooltip>
          ) : (
            <span />
        )}

            {/* <Grid item className={classes.grid}>
              <Autocomplete
                style={{ 
                  width: "300px",
                  color:"#05386B"
                }}
                value={this.state.selectedCompany}
                onChange={(e, val) => {
                  this.selectedCompany(e, val);
                }}
                id="search for companies"
                marginLeft= "2px"
                freeSolo
                options={this.state.companyNames.map((companyname) => companyname)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="search for companies"
                    margin="normal"
                    variant="outlined"
                    color="#05386B"
                  />
                )}
              />
            </Grid> */}

        
        { logged === false || logged === null ? (
          <Grid item className={classes.grid}>
            <NavLink to="/login" className={classes.link} >
              <Typography className={classes.typography} variant="subtitle1" 
              >
                SIGN IN
              </Typography>
            </NavLink>
          </Grid> ) : (
            <span />
        )}

        { logged === false || logged === null ? (
          <Grid item className={classes.grid}>
            <NavLink to="/signup" className={classes.link}>
              <Typography className={classes.typography} variant="subtitle1" 
              >
                SIGN UP
              </Typography>
            </NavLink>
          </Grid>
         ) : (
          <span/>
        )}

        

        {logged == true ? (
          <Grid item >
            <Tooltip
              classes={{ tooltip: classes.tooltip1 }}
              interactive
              title={
                <List>
                  {Object.keys(details).map((key) => {
                    if (key === "_id" || key == "password") {
                      return;
                    }
                    const value = details[key];
                    // const space = " :: ";
                    // const property = key.toUpperCase()
                    return (
                      <ListItem key={key}>
                        <ListItemText
                          classes = {{ primary: classes.listitemtext }}
                          primary = {value}
                          style = {{
                            fontSize : 6,
                          }}
                        
                        ></ListItemText>
                      </ListItem>
                    );
                  })}
                  <ListItem>
                    <Button
                      className = { classes.button }
                      variant="contained"
                      size = "small"
                      onClick={() => {
                        window.localStorage.clear();
                        // localStorage.setItem("logged", JSON.stringify(false));
                        this.props.modifyOpen(false);
                        history.push("/");
                      }}
                    >
                      Log Out
                    </Button>
                  </ListItem>
                </List>
              }
            >
              <IconButton>
                <AccountCircleIcon className={classes.largeIcon} />
              </IconButton>
            </Tooltip>
          </Grid>
        ) : (
          <span />
        )}





        </Grid>
    );
  }
}


export default withStyles(styles, { withTheme: true })(
  withRouter(NavigationBar)
);
