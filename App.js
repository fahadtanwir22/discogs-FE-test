import logo from "./logo.svg";
import "./App.css";
import { releaseData } from "./data";
import React, { useEffect, useState } from "react";
import Record from "./components/Record";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { sortByYear, sortByTitle } from "./utils";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: "2rem",
  },
}));

function App() {
  // states
  const [records, setRecords] = useState([]);
  const classes = useStyles();
  const [select, setSelect] = React.useState("");

  // functions
  const selectYear = () => {
    setRecords(sortByYear(records));
  };
  const selectTitle = () => {
    setRecords(sortByTitle(records));
  };
  const handleChange = (event) => {
    setSelect(event.target.value);
    switch (event.target.value) {
      case "title":
        selectTitle();
        break;
      case "year":
        selectYear();
        break;
      default:
        break;
    }
  };
  // get records when component renders
  useEffect(() => {
    const getData = async () => {
      const data = await releaseData();
      const releases = data.releases;
      setRecords(releases);
    };
    getData();
  }, []);
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={6} md={8}>
          <Typography variant="h3" component="h2">
            Releases from R&S Records
          </Typography>
        </Grid>
        <Grid item xs={6} md={4}>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-helper-label">
              Sort By Year,A-Z
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={select}
              onChange={handleChange}
              style={{ width: "18em" }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="year">Sort By Year</MenuItem>
              <MenuItem value="title">Sort By A-Z</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={3}
        >
          {records?.map((record) => {
            return (
              <Grid item xs={12} md={3}>
                <Record
                  title={record.title}
                  artist={record.artist}
                  year={record.year}
                  catalog={record.catno}
                  link={record.resource_url}
                />
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
