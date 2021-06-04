import React from "react";
import Paper from '@material-ui/core/Paper';
import {
  withStyles,
} from "@material-ui/core";

const styles = (theme) => ({
  paper : {
    fontSize: 46,
    fontStyle: "Italic",
    color : "#05386B",
    alignContent: "center",
    alignItems: 'center',
  },
});

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount = () => {
    console.log("Main");
  };
  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <img
          src="\images\stocks6.png"
          style={{
            position: "relative",
            top: 35,
            left: 0,
            width: "100%",
            height: "90%",
          }}
        />
        <div style = {{ width : "100px", height : "100px"}}></div>
        <Paper elevation = {0} className = {classes.paper}>"Know what you own, and know why you own it."</Paper>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Main);