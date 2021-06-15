import {
  Chip,
  Divider,
  Grid,
  Paper,
  Typography,
  withStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Collapse ,
} from "@material-ui/core";
import React from "react";
import axios from "axios";
import Dashboard from "./Dashboard";
import Loader from "react-loader-spinner";
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';



const styles = (theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 150,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  table: {
    minWidth: 5, 
  },
  tableCell : {
    color: "#05386B",
    fontWeight : 'bold',
  },
});

class CompanyDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      companyDetails: [],
      companyCurrentDayStockDetails: [],
      selectedCompany: "",
      loading: true,
      stockkeys: [
        "Date",
        "Open Price",
        "High Price",
        "Low Price",
        "Close Price",
        "WAP",
        "No.of Shares",
        "No. of Trades",
        "Total Turnover (Rs.)",
        "% Deli. Qty to Traded Qty",
        "Spread High-Low",
        "Spread Close-Open",
      ],
      stockdetails: [],
      open: false,
    };
  }

  componentDidMount = () => {
    console.log("CompanyDetails");
    const { match } = this.props;
    const company = match.params.company;
    this.setState({ selectedCompany: company }, () => {
      this.getCompanyDetails(this.state.selectedCompany);
    });
  };

  getCompanyDetails = async (company) => {
    await axios.get("/api/companydetails?company=" + company).then((s) => {
      if (s.status === 200) {
        let companyDetails = s.data;
        axios
        .get("/api/getsuggestions?company=" + company)
        .then((t) => {
          if (t.status === 200) {
            companyDetails = Object.assign(companyDetails, t.data);
          }
        })
        .catch((e) => {
          console.log(e);
        });
        this.setState({ companyDetails: companyDetails, loading: false }, () => {});
      } else {
        this.setState({ companyDetails: [], loading: false }, () => {});
      }
    });
    await axios
      .get("/api/previousdaystockdetails?company=" + company)
      .then((s) => {
        if (s.status === 200) {
          this.setState({ stockdetails: s.data, loading: false }, () => {});
        } else {
          this.setState({ stockdetails: [], loading: false }, () => {});
        }
      })
      .catch((e) => {
        console.log(e);
        this.setState({ stockdetails: [], loading: false }, () => {});
      });
  };

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        {this.state.selectedCompany !== "" && (
          <div>
            <Paper
              elevation={0}
              style={{
                display: "flex",
                padding: "15px",
                margin: "15px",
                justifyContent: "center",
                backgroundColor: "#05386B",
                color : "#5CDB95"
              }}
            >
              <Typography variant="subtitle1" >{this.state.selectedCompany}</Typography>
            </Paper>
            {/* <Divider /> */}
            {this.state.loading === true ? (
              <Loader type="ThreeDots" color="#05386B" height={80} width={80}/>
            ) : (
              <Grid container>
                <Grid item xs = {4}>
                  <Paper>
                    {Object.keys(this.state.companyDetails).map((key) => {
                      if (this.state.companyDetails[key] === null) {
                        return <span></span>;
                      }
                      if (key === "suggest") {
                        return <span></span>;
                      } else {
                        return (
                            <TableContainer component={Paper}>
                              <Table className={classes.table} size="small" aria-label="a dense table">
                                <TableBody>
                                    <TableRow key={key}>
                                      <TableCell className = { classes.tableCell } component="th" scope="row">
                                        {key}
                                      </TableCell>
                                      <TableCell className = { classes.tableCell } align="right">{this.state.companyDetails[key]}</TableCell>
                                    </TableRow>
                                </TableBody>
                              </Table>
                            </TableContainer>
                        ); 
                      }
                    
                    })}
                  </Paper>
                </Grid>
                <Grid item xs = { 4 }>
                  {Object.keys(this.state.companyDetails).map((key) => {
                    let value = "";
                    if (this.state.companyDetails[key] === null) {
                      return <span></span>;
                    }
                    if (key === "suggest") {
                      if (this.state.companyDetails[key] === "buy" || this.state.companyDetails[key] === "sell") {
                        value = this.state.companyDetails[key].toUpperCase();
                      } else {
                        value = "HOLD";
                      }
                      return (
                        <span>
                        
                        </span>
                      );
                    }
                  })}
                </Grid>
              </Grid>
            )}
          </div>
        )}
        {/* <Divider />
        <Divider /> */}
        {this.state.stockdetails.length !== 0 &&
          this.state.stockkeys.map((key) => {
            let impKeys = ["Open Price", "High Price", "Low Price", "Close Price"];
            
            if (impKeys.includes(key)) {
              let res = key.toUpperCase() + " : " + this.state.stockdetails[key];
              return (
                <Chip
                  color="primary"
                  variant="outlined"
                  label={res}
                  style={{ margin: "5px",
                  backgroundColor: "#05386B",
                  color : "#5CDB95"}}
                />
              ); 
            } else {
            let res = key + " : " + this.state.stockdetails[key];
            return (
              <Chip
                color="primary"
                variant="outlined"
                label={res}
                style={{ margin: "5px",
                backgroundColor: "#5CDB95",
                color :  "#05386B" }}
              />
            );
          }
          })}
        {this.state.selectedCompany !== "" &&
          this.state.stockdetails.length !== 0 && (
            <Dashboard company={this.state.selectedCompany} />
          )}
      </React.Fragment>
    );
  }
}


export default withStyles(styles, { withTheme: true })(CompanyDetails);
