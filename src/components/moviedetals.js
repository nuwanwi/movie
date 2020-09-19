import React, { Component, useState } from "react";
import { connect } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

import _ from "lodash";

class moviedetails extends Component {
  render() {
    if (!this.props.filteredMovie) {
      return <div>Loading...</div>;
    } else {
      const filteredMovie = this.props.filteredMovie;
      return (
        <div>
          <Paper elevation={8}>
            <Typography variant="h5" component="h3">
              {filteredMovie.name}
            </Typography>
            <Typography display="inline" component="p">
              {_.removeHTML(filteredMovie.synopsis)}
            </Typography>
          </Paper>
        </div>
      );
    }
  }
}

_.mixin({
  removeHTML: function (str) {
    return String(str).replace(/(<([^>]+)>)/gi, "");
  },
});

const mapstateToProps = (state, ownprops) => {
  let moviename = ownprops.match.params.name;
  if (state.rootReducer.movieList) {
    return {
      filteredMovie: state.rootReducer.movieList.find(
        ({ name }) => name === moviename
      ),
    };
  }
};

export default connect(mapstateToProps)(moviedetails);
