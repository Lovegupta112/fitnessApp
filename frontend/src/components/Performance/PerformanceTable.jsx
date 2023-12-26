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
import { useState ,useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { useSelector ,useDispatch} from "react-redux";
import { setUserActivities ,setDashboardActivities } from "../../app/features/activitySlice";
axios.defaults.baseURL=import.meta.env.VITE_BASE_URL;

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
        </TableRow>
      </TableHead>
    </>
  );
};
const PerformanceTable = () => {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("activityName");
  const [activities,setActivities]=useState([]);
 const  [addedActivities,setAddedActivities]=useState([]);
  const dispatch=useDispatch();
  const {userActivities,dashboardActivities}=useSelector((state)=>state.activity);
 

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
    // console.log(property, isAsc ? "desc" : "asc");
  };

  const updatedRows = activities?.sort((a, b) => {
    // console.log(orderBy,a[orderBy],b[orderBy]);
    if (a[orderBy] > b[orderBy]) {
      return order === "asc" ? 1 : -1;
    } else {
      return order === "asc" ? -1 : 1;
    }
  });


  useEffect(()=>{
     getAllActivity();
  },[userActivities]);


  const getAllActivity=async()=>{
    try{
      const token=localStorage.getItem('jwt-token');
       const res=await axios.get('/activity/getActivities',{headers:{
        'Authorization':`Bearer ${token}`
       }})
       console.log('userActivity: ',res.data);
       setActivities(res.data);
    }
    catch(error){
        console.log('Error: ',error);
    }
  }

  const addToDashboard=(row)=>{
    // console.log(row);
    dispatch(setUserActivities(row));
   setAddedActivities([...addedActivities,row.activityid]);
  }

  return (
    <>
      <Box sx={{ width: "100%" }} padding={2}>
        <Stack sx={{ width: "100%" }}>
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              size="medium"
            >
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
                       {addedActivities.includes(row.activityid)?
                        <Button
                        variant="contained"
                        sx={{ backgroundColor: "green" }}
                      onClick={()=>addToDashboard(row)}
                      >
                        Add To Dashboard
                      </Button>
                       :
                       <Button variant="contained" sx={{
                        backgroundColor:'crimson'
                     }}>Remove From Dashboard</Button>
                       }
                       
                      </TableCell>
                      {/* <TableCell></TableCell> */}
                      <TableCell>
                        <IconButton
                          size="large"
                          sx={{ color: "crimson", border: "1px solid " }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
                {}
              </TableBody>
            </Table>
          </TableContainer>
        </Stack>
      </Box>
    </>
  );
};

export default PerformanceTable;
