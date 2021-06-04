import React from "react";

class About extends React.Component {
  componentDidMount = () => {
    console.log("About")
  };

  render() {
    return (
    <React.Fragment>
      <div style = {{ width : "80px", height : "80px"}}></div>
      <div>About</div>
    </React.Fragment>
    );
  }
}

export default About;
