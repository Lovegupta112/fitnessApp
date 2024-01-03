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
  import { useSelector, useDispatch} from "react-redux";
  import { fetchUsersIfActivityExist} from "../../app/features/connectionSlice";
 import { addConnection ,cancelConnection } from "../../app/features/connectionSlice";

  import { toast } from "react-toastify";
  
  axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
  
  const headCells = [
    {
      id: "sno",
      numeric: true,
      disablePadding: true,
      label: "S No.",
    },
    {
      id: "username",
      numeric: true,
      disablePadding: false,
      label: "UserName",
    },
    // {
    //   id: "info",
    //   numeric: true,
    //   disablePadding: false,
    //   label: "User Information",
    // },
    {
      id: "request",
      numeric: true,
      disablePadding: false,
      label: "Request Status",
    },
  ];
  
  
  const UsersTableHead = () => {
  
   
    return (
      <>
        <TableHead>
          <TableRow>
            {headCells.map((headCell) => (
              <TableCell
                key={headCell.id}
                align="left"
                padding="normal"
                sx={{fontWeight:'900',fontSize:'1.3rem'}}
              >
              {headCell.label}
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
    const [page,setPage]=useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
   
    const dispatch=useDispatch();
    const {users}=useSelector((state)=>state.connection);
    const user=useSelector((state)=>state.user);
    console.log('current user: ',user)
    


    useEffect(()=>{
    dispatch(fetchUsersIfActivityExist());
    },[])

    useEffect(()=>{
    },[]);
   
  
    console.log('users: ',users);
 
  
    let visibleRows = useMemo(()=>users.filter((userobj)=>userobj.acceptedrequest!==true).slice(page*rowsPerPage,page*rowsPerPage+rowsPerPage),[page,rowsPerPage,users]);
     
    console.log('visibleRows: ',visibleRows);
 
    const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - users.length) : 0;
  

  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage=(event)=>{
     setRowsPerPage(Number(event.target.value));
     setPage(0);
    }
  
    const connectUser=(row)=>{
    // console.log(row,user.userid);
    // dispatch(addConnection({connectionid:row.userid}));
    dispatch(addConnection({connectionid:row.userid,senderid:user.userid,acceptedrequest:false}));
    }
  
   const acceptUserRequest=(row)=>{
   console.log(row);
   }

   const cancelUserRequest=(row)=>{
 console.log('cancelling ..',row);
//  dispatch(deleteRequest(row.userid));
dispatch(cancelConnection({connectionid:row.connectionid,senderid:user.userid}));
   }
  
    return (
      <>
        <Box sx={{ width: "100%" }} padding={2}>
          <Stack sx={{ width: "100%" }}>
            <TableContainer>
              <Table sx={{ minWidth: 750 }} size="medium">
                <UsersTableHead/>
                <TableBody>
                  {/* {updatedRows?.map((row, index) => { */}
                  {visibleRows?.map((row, index) => {
                    
                    return (
                      <TableRow key={index}>
                        {/* <TableCell>{index + 1}</TableCell> */}
                        <TableCell>{index+1}</TableCell>
                        <TableCell>
                       {row.username}
                        </TableCell>
                        {row.acceptedrequest===null &&  <TableCell>
                      <Button variant="contained" onClick={()=>connectUser(row)}>
                          Connect
                      </Button>
                  </TableCell> }
                   {(row.acceptedrequest===false && row.connectionid===user.userid )&& <TableCell>
                    <Button variant="contained" onClick={()=>acceptUserRequest(row)} sx={{
                          backgroundColor:'palevioletred',
                          '&:hover':{
                            backgroundColor:'palevioletred',
                          }
                        }} >
                            Request Recieved 
                        </Button>
                   </TableCell> }
                     {(row.acceptedrequest===false && row.connectionid!==user.userid ) &&  <TableCell>
                         <Button variant="contained"  sx={{
                           backgroundColor:'crimson'
                         }} onClick={()=>cancelUserRequest(row)}>
                           Cancel Request
                         </Button>
                     </TableCell>}

                       <TableCell></TableCell>
                       <TableCell></TableCell>
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
              <Typography sx={{fontSize:'1.3rem',margin:'1rem',textAlign:'center'}}>No User Found !</Typography>
              }
              <TablePagination 
              rowsPerPageOptions={[5,6]}
               rowsPerPage={rowsPerPage}
               component='div'
               count={users.length}
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
  