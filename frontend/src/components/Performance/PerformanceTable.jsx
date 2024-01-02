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
  TablePagination,
  Typography
} from "@mui/material";
import { useState, useEffect ,useMemo } from "react";
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
    label: "Time(sec)",
  },
  {
    id: "performance",
    numeric: true,
    disablePadding: false,
    label: "Performance",
  },
];


function getUserPerformance(unit, distance, time) {
  console.log(unit, distance, time);
  let speedPerformance;
  if (unit === "kms") {
    time = time / 3600;
  }
  speedPerformance = distance / time;
  return speedPerformance;
}


const PerformanceTableHead = (props) => {
  const { order, orderBy, onRequestSort } = props;

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <>
      <TableHead>
        <TableRow>
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
  const [page,setPage]=useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

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

  const getAllActivity = async () => {
    dispatch(fetchActivities());
  };

  console.log('activities: ',activities);

  // const selected = activities?.filter((activity) =>
  //   activity.activityname?.includes(selectedActivity)
  // );
  // console.log("selected: ",selected);

  let visibleRows = useMemo(()=>activities
    ?.filter((activity) => activity.activityname?.includes(selectedActivity)).slice(page*rowsPerPage,page*rowsPerPage+rowsPerPage),[page,selectedActivity,rowsPerPage,activities]);
   
  if(orderBy){
    visibleRows=visibleRows?.sort((a, b) => {
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
        // console.log(order,orderBy,aValue,bValue);
      }
      if (aValue > bValue) {
        return order === "asc" ? 1 : -1;
      } else {
        return order === "asc" ? -1 : 1;
      }
    });

  }
// console.log('updated',updatedRows);

  const emptyRows =
  page > 0 ? Math.max(0, (1 + page) * rowsPerPage - activities.length) : 0;

// const visibleRows = useMemo(
//   () =>{
//     return updatedRows.slice(
//       page * rowsPerPage,
//       page * rowsPerPage + rowsPerPage,
//     )
//   }
//     ,
//   [order, orderBy, page, rowsPerPage,selectedActivity,activities],
// );



  
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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage=(event)=>{
   setRowsPerPage(Number(event.target.value));
   setPage(0);
  }


  

   console.log('hii',visibleRows,orderBy);

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
                {/* {updatedRows?.map((row, index) => { */}
                {visibleRows?.map((row, index) => {
                  return (
                    <TableRow key={index}>
                      {/* <TableCell>{index + 1}</TableCell> */}
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
                {emptyRows > 0 && (
                  <TableRow style={{height:33*emptyRows}}>
                   <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
            {visibleRows.length<=0 && 
            <Typography sx={{fontSize:'1.3rem',margin:'1rem',textAlign:'center'}}>No User Activity Found !</Typography>
            }
            <TablePagination 
            rowsPerPageOptions={[4,5]}
             rowsPerPage={rowsPerPage}
             component='div'
             count={userActivities.length}
             page={page}
             onPageChange={handleChangePage}
             onRowsPerPageChange={handleChangeRowsPerPage}
            />
        
          </TableContainer>
        </Stack>
      </Box>
    </>
  );
};

export default PerformanceTable;
