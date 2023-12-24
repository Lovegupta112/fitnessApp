import { useEffect, useState } from "react";
import { Stack, Typography, List, ListItem } from "@mui/material";
import Favorites from "../components/Acivity/Favorites";
import MeasurePerformance from "../components/Acivity/MeasurePerformance";
import { useSelector } from "react-redux";

const ActivityPage = () => {
  const [emptyFields, setEmptyFields] = useState([]);
  const userInfo = useSelector((state) => state.user);


  useEffect(() => {
    let userInfoKeys = Object.keys(userInfo);
    let res = userInfoKeys.filter((infoKey) => {
      if (!userInfo[infoKey]) {
        return infoKey;
      }
    });
    // console.log(res);
    setEmptyFields(res);
  }, [userInfo]);

  console.log({emptyFields});
  return (
    <Stack
      sx={{
        border: "1px solid red",
        minHeight: "calc(100vh - 10vh)",
      }}
      padding={2}
      gap={2}
    >
      <Typography variant="h5" fontWeight="bold">
        Your Activity
      </Typography>
      <Typography color="grey">
       {emptyFields.length>0 ? ` Please Fill ${emptyFields.join(" , ")} fields !`:'Please Select your favorite Activity !   ' }
      </Typography>
      {emptyFields.length > 0 ? (
        ""
      ) : (
        <List>
          <ListItem>
            <Favorites />
          </ListItem>
          <ListItem>
            <MeasurePerformance />
          </ListItem>
        </List>
      )}
    </Stack>
  );
};

export default ActivityPage;
