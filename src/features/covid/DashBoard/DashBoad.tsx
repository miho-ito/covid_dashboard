import React, { useEffect } from "react";
import styles from "./DashBoad.module.css";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Grid,
} from "@material-ui/core";
import { fetchAsyncGet, fetchAsyncGetDaily, selectData } from "../covidSlice";
import SwichCountry from "../SwitchCountry/SwichCountry";
import Chart from "../Chart/Chart";
import PieChart from "../PieChart/PieChart";
import Cards from "../Cards/Cards";

const useStyle = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
  content: {
    marginTop: 85,
  },
}));

const DashBoad: React.FC = () => {
  const classes = useStyle();
  const dispach = useDispatch();
  const data = useSelector(selectData);

  useEffect(() => {
    dispach(fetchAsyncGet());
    dispach(fetchAsyncGetDaily());
  }, [dispach]);

  return (
    <div>
      <AppBar position="absolute">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Covid 19 Live Dashboard
          </Typography>
          {data && (
            <Typography variant="body1">
              {new Date(data.lastUpdate).toDateString()}
            </Typography>
          )}
        </Toolbar>
      </AppBar>
      <Container className={classes.content}>
        <div className={styles.container}>
          <SwichCountry />
        </div>
        <Grid container spacing={3}>
          <Grid item xs={12} md={7}>
            <Chart />
          </Grid>

          <Grid item xs={12} md={5}>
            <PieChart />
          </Grid>

          <Grid item xs={12} md={12}>
            <Cards />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default DashBoad;
