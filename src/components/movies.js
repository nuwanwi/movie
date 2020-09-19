import React, { Component } from "react";
import PropTypes from "prop-types";
import MaterialTable from "material-table";
import { forwardRef } from "react";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import movieDetails from "./moviedetals";
import config from "../config";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getMovies } from "../redux/actions/rootActions";

import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import Paper from "@material-ui/core/Paper";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing.unit * 2,
  },
});

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

export class movies extends Component {
  state = {
    columns: [
      { title: "Name", field: "name" },
      { title: "Year", field: "productionYear" },
      { title: "Genre", field: "genre" },
      { title: "Synopsis Short", field: "synopsisShort" },
      //   { title: "Image", field: "image" },
    ],
  };

  componentDidMount() {
    this.props.getMovies();
    console.log(this.props);
  }

  handleRowClick = (event, rowData) => {
    let rslts = this.props.movieList;
    const index = rslts.indexOf(rowData);
    rslts[index].tableData.checked = !rslts[index].tableData.checked;
    this.setState({ results: rslts }, () => {
      this.handleSelectChange(event, rowData);
    });
  };

  handleSelectChange = (event, rowData) => {
    const { history } = this.props;
    let movieName = rowData.name;
    console.log(`Handle Change ${movieName}`);
    this.props.history.push({
      pathname: `/details/${movieName}`,
      state: "Test State",
    });
  };

  render() {
    const { classes } = this.props;
    const { spacing } = this.state;

    return (
      <div>
        <Grid container spacing={16}>
          <Grid item xs={1}></Grid>
          <Grid item xs={9}>
            <MaterialTable
              title="Movies"
              icons={tableIcons}
              columns={this.state.columns}
              data={this.props.movieList}
              MaterialTable
              onRowClick={this.handleRowClick}
            />
          </Grid>

          <Grid item xs={1}></Grid>
        </Grid>
      </div>
    );
  }
}
movies.propTypes = {
  getMovies: PropTypes.func,
  movies: PropTypes.array,
};
const mapStateToProps = (state) => {
  return {
    movieList: state.rootReducer.movieList,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getMovies: () => dispatch(getMovies()),
  };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(movies));
