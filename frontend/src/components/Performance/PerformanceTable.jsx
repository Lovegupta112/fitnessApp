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
  fetchActivities,
  deleteActivity,
  updateDashboardActivityStatus,
} from "../../app/features/activitySlice";
import { toast } from "react-toastify";

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
  const [orderBy, setOrderBy] = useState("");
  const [activities, setActivities] = useState([]);
  // const [addedActivities, setAddedActivities] = useState([]);
  const dispatch = useDispatch();
  const { userActivities } = useSelector((state) => state.activity);
  const { selectedActivity } = useSelector((state) => state.filter);

  // console.log(userActivities);
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
    setActivities(userActivities);
  }, [userActivities]);

  // const selected = activities?.filter((activity) =>
  //   activity.activityname?.includes(selectedActivity)
  // );
  // console.log("selected: ",selected);

  let updatedRows = activities
    ?.filter((activity) => activity.activityname?.includes(selectedActivity))
   
  if(orderBy){
    updatedRows=updatedRows?.sort((a, b) => {
      // console.log(orderBy, a,b);
      let aValue;
      let bValue;
      if (orderBy === "performance") {
        aValue = Number(getUserPerformance(a.unit, a.distance, a.time).toFixed(2));
        bValue = Number(getUserPerformance(b.unit, b.distance, b.time).toFixed(2));
      }
      else if (orderBy === "distance") {
        aValue =a.unit === "Kms" ? Number(a[orderBy]) * 1000 : Number(a[orderBy]);
        bValue =b.unit === "Kms" ? Number(b[orderBy]) * 1000 : Number(b[orderBy]);
      } else if (orderBy === "time") {
        aValue = Number(a[orderBy]);
        bValue = Number(b[orderBy]);
      }
      else{
        aValue=a[orderBy] || '';
        bValue=b[orderBy] || '';
        console.log(order,orderBy,aValue,bValue);
      }
      if (aValue > bValue) {
        return order === "asc" ? 1 : -1;
      } else {
        return order === "asc" ? -1 : 1;
      }
    });

  }
  const getAllActivity = async () => {
    dispatch(fetchActivities());
  };

  const addToDashboard = (activityid) => {
    dispatch(updateDashboardActivityStatus({ activityid, status: true }));
    toast.success("Activity Added !");
  };
  const removeFromDashboard = (activityid) => {
    dispatch(updateDashboardActivityStatus({ activityid, status: false }));
    toast.info("Activity Removed !");
  };
  const deleteUserActivity = async (activityid) => {
    dispatch(deleteActivity(activityid));
    toast.success("Activity Completely Deleted !");
    setActivities(
      activities.filter(
        (activity) => Number(activity.activityid) !== activityid
      )
    );
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

   console.log(activities,updatedRows,orderBy);

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
                        {row.dashboardstatus ? (
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
                            onClick={() => addToDashboard(row.activityid)}
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
