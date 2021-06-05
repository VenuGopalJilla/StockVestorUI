import React from "react";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from "@material-ui/core/Grid";


const styles = (theme) => ({
  root: {
    maxWidth: 250,
  },
  typography: {
    padding: 15,
    color: "#05386B",
  },
  
});

class About extends React.Component {
  componentDidMount = () => {
    console.log("About")
  };

  render() {
    const { classes } = this.props;

    return (
    <React.Fragment>
      <div style = {{ width : '30px', height : '30px'}}></div>
      <div>
        <Typography variant = "h6" className = { classes.typography }>
            Stock Vestor is a tool for stock investors to optimize their returns by predicting the stock price of the given company in midterm investments.
            This tool considers each stock, understands the trend of the stock for short and longer periods, 
            evaluates volatility and risk of the stock, assesses the effect of market sentiment and corporate actions on the stock and advise investors on entry and exit of that stock.
        </Typography>
        <Typography variant = "h6" className = { classes.typography }>
        We are a team of analytics experts who utilize their skills in both technology and social science to find trends and manage data.
        </Typography>
      </div>
      <div>
        <Typography variant = "h6" className = { classes.typography }>
          Our Team :
        </Typography>
        <Grid classes={classes.root} container spacing={4} wrap={'nowrap'}>
          <Grid item>
            <Card className={classes.root}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  alt="Dr.Arun Kumar Parayatham"
                  height="200"
                  width = "300"
                  image="/images/AKP.jpg"
                  title="Dr.Arun Kumar Parayatham"
                />
                <CardContent>
                  <Typography variant="subtitle1" style = {{ color : "#05386B"}}>
                    DR.ARUN KUMAR PARAYATHAM
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item>
            <Card className={classes.root}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  alt="Venu Gopal Jilla"
                  height="200"
                  width = "300"
                  image="/images/My photo.jpg"
                  title="Venu Gopal Jilla"
                />
                <CardContent>
                  <Typography variant="subtitle1" style = {{ color : "#05386B"}}>
                    VENU GOPAL JILLA
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
        </Grid>
        <Grid item>
          <Card className={classes.root}>
            <CardActionArea>
              <CardMedia
                component="img"
                alt="Sai Krishna Nama"
                height="200"
                width = "300"
                image="/images/SKN.jpg"
                title="Sai Krishna Nama"
              />
              <CardContent>
                <Typography variant="subtitle1" style = {{ color : "#05386B"}}>
                  SAI KRISHNA NAMA
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        
        </Grid>
      </div>
    </React.Fragment>
    );
  }
}

export default withStyles(styles, { withTheme: true })(About);
