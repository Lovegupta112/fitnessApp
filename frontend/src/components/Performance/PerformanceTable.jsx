import {
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Box,
  Paper,
  TableContainer,
  Table,
  TableBody,
  Button,
  Stack,
  IconButton,
} from "@mui/material";
import { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {
  setUserActivities,
  setDashboardActivities,
  removeDashboardActivity,
  removeUserActivity,
} from "../../app/features/activitySlice";
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const headCells = [
  {
    id: "activityname",
    numeric: true,
    disablePadding: true,
    label: "Activity Name",
  },
  {
    id: "distance",
    numeric: true,
    disablePadding: false,
    label: "Distance",
  },
  {
    id: "time",
    numeric: true,
    disablePadding: false,
    label: "Time",
  },
  {
    id: "performance",
    numeric: true,
    disablePadding: false,
    label: "Performance",
  },
];

const PerformanceTableHead = (props) => {
  const { order, orderBy, onRequestSort } = props;

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <>
      <TableHead>
        <TableRow>
          <TableCell
            sx={{
              fontWeight: "bold",
              fontSize: "1.4rem",
            }}
          >
            S.No
          </TableCell>
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align="left"
              padding="normal"
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
                sx={{
                  fontWeight: "bold",
                  fontSize: "1.4rem",
                }}
              >
                {headCell.label}
              </TableSortLabel>
            </TableCell>
          ))}
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
        </TableRow>
      </TableHead>
    </>
  );
};
const PerformanceTable = () => {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("activityname");
  const [activities, setActivities] = useState([]);
  const [addedActivities, setAddedActivities] = useState([]);
  const dispatch = useDispatch();
  const { userActivities, dashboardActivities } = useSelector(
    (state) => state.activity
  );
  const { selectedActivity } = useSelector((state) => state.filter);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
    // console.log(property, isAsc ? "desc" : "asc");
  };

  useEffect(() => {
    getAllActivity();
  }, []);

  useEffect(() => {
    checkAllDashboardActivities();
  }, [dashboardActivities]);

  const updatedRows = activities
    .filter((activity) => activity.activityname.includes(selectedActivity))
    ?.sort((a, b) => {
      console.log(orderBy, a[orderBy], b[orderBy]);
      if (orderBy === "performance") {
        let aPerformance = getUserPerformance(
          a.unit,
          a.distance,
          a.time
        ).toFixed(2);
        let bPerformance = getUserPerformance(
          b.unit,
          b.distance,
          b.time
        ).toFixed(2);
        if (aPerformance > bPerformance) {
          return order === "asc" ? 1 : -1;
        } else {
          return order === "asc" ? -1 : 1;
        }
      } else {
        if (a[orderBy] > b[orderBy]) {
          return order === "asc" ? 1 : -1;
        } else {
          return order === "asc" ? -1 : 1;
        }
      }
    });

  // useEffect(() => {
  //   getAllActivity();
  //   checkAllDashboardActivities();
  // }, [userActivities]);

  const getAllActivity = async () => {
    try {
      const token = localStorage.getItem("jwt-token");
      const res = await axios.get("/activity/getActivities", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("userActivity: ", [...res.data]);
      setActivities([...res?.data]);
      dispatch(setUserActivities([...res?.data]));
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const checkAllDashboardActivities = () => {
    console.log(Object.keys(dashboardActivities));
    setAddedActivities(Object.keys(dashboardActivities));
  };
  const addToDashboard = (row) => {
    // console.log(row);
    dispatch(
      setDashboardActivities({ activityid: row.activityid, activity: row })
    );
    // setAddedActivities([...addedActivities, row.activityid]);
  };
  const removeFromDashboard = (activityid) => {
    dispatch(removeDashboardActivity({ activityid }));
  };
  const deleteUserActivity = async (activityid) => {
    try {
      const token = localStorage.getItem("jwt-token");
      const deletedActivity = await axios.delete(
        `/activity/deleteActivity/${activityid}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("deleteActivity: ", deletedActivity);
      dispatch(removeUserActivity({ activityid }));
      dispatch(removeDashboardActivity({ activityid }));
      setActivities(
        activities.filter(
          (activity) => Number(activity.activityid) !== activityid
        )
      );
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  function getUserPerformance(unit, distance, time) {
    console.log(unit, distance, time);
    let speedPerformance;
    if (unit === "kms") {
      time = time / 3600;
    }

    speedPerformance = distance / time;
    return speedPerformance;
  }

  return (
    <>
      <Box sx={{ width: "100%" }} padding={2}>
        <Stack sx={{ width: "100%" }}>
          <TableContainer>
            <Table sx={{ minWidth: 750 }} size="medium">
              <PerformanceTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
              />
              <TableBody>
                {updatedRows?.map((row, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{row.activityname}</TableCell>
                      <TableCell>
                        {row.distance}
                        {row.unit}
                      </TableCell>
                      <TableCell>{row.time}</TableCell>
                      <TableCell>
                        {row
                          ? getUserPerformance(
                              row.unit,
                              row.distance,
                              row.time
                            ).toFixed(2)
                          : "NA"}
                      </TableCell>
                      <TableCell>
                        {addedActivities.includes(`${row.activityid}`) ? (
                          <Button
                            variant="contained"
                            sx={{
                              backgroundColor: "crimson",
                            }}
                            onClick={() => removeFromDashboard(row.activityid)}
                          >
                            Remove From Dashboard
                          </Button>
                        ) : (
                          <Button
                            variant="contained"
                            sx={{ backgroundColor: "green" }}
                            onClick={() => addToDashboard(row)}
                          >
                            Add To Dashboard
                          </Button>
                        )}
                      </TableCell>
                      <TableCell>
                        <IconButton
                          size="large"
                          sx={{ color: "burlywood", border: "1px solid " }}
                          onClick={() => deleteUserActivity(row.activityid)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Stack>
      </Box>
    </>
  );
};

export default PerformanceTable;
