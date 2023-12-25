import { useEffect, useState } from "react";
import { Stack, Typography, List, ListItem } from "@mui/material";
import Favorites from "../components/Acivity/Favorites";
import MeasurePerformance from "../components/Acivity/MeasurePerformance";
import { useSelector } from "react-redux";
import Timer from "../components/Timer";

const ActivityPage = () => {
  const [emptyFields, setEmptyFields] = useState([]);
  const [showTimer, setShowTimer] = useState(false);
  const userInfo = useSelector((state) => state.user);
  const { currentActivity, selectedActivity } = useSelector(
    (state) => state.activity
  );
  console.log(currentActivity);
  useEffect(() => {
    showEmptyFieldInfo();
    checkActivityInfo();
  }, [userInfo, currentActivity]);

  const showEmptyFieldInfo = () => {
    let userInfoKeys = Object.keys(userInfo);
    let res = userInfoKeys.filter((infoKey) => {
      if (!userInfo[infoKey]) {
        return infoKey;
      }
    });
    // console.log(res);
    setEmptyFields(res);
  };
  const checkActivityInfo = () => {
    for (let name in currentActivity) {
      const value = currentActivity[name];
      console.log(name, value);
      if (name !== "time" && !value) {
        return setShowTimer(false);
      }
    }
    setShowTimer(true);
  };
  console.log({ emptyFields });
  return (
    <Stack
      sx={{
        minHeight: "calc(100vh - 10vh)",
      }}
      padding={2}
      gap={2}
    >
      <Typography variant="h5" fontWeight="bold">
        Your Activity
      </Typography>
      <Typography color="grey">
        {emptyFields.length > 0
          ? ` Please Fill ${emptyFields.join(" , ")} fields !`
          : " Select Your Favorite Activity !   "}
      </Typography>
      {emptyFields.length > 0 ? (
        ""
      ) : (
        <>
          <List>
            <ListItem>
              <Favorites />
            </ListItem>
            <ListItem>
              <MeasurePerformance />
            </ListItem>
          </List>
          {showTimer && <Timer />}
        </>
      )}
    </Stack>
  );
};

export default ActivityPage;
