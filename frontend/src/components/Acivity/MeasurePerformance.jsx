import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  TextField,
  Stack,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import CustomDropdown from "../common/CustomDropdown";
import { setCurrentActivity } from "../../app/features/activitySlice";

const MeasurePerformance = () => {
  const [expanded, setExpanded] = useState(false);
  const [selectedActivities, setSelectedActivities] = useState([]);
  const activity = useSelector((state) => state.activity);
  const dispatch = useDispatch();

  useEffect(() => {
    // setSelectedActivities(activity.selectedActivity);
    setActivity(activity.selectedActivity);
  }, [activity.selectedActivity]);

  const setActivity = (activities) => {
    let activityArr = [];
    for (let activity in activities) {
      const isSelected = activities[activity];
      if (isSelected) {
        activityArr.push(activity);
      }
    }
    setSelectedActivities(activityArr);
    if (
      activityArr.length <= 0 ||
      !activityArr.includes(activity.currentActivity.activityName)
    ) {
      console.log("empty arr: ", activityArr);
      dispatch(setCurrentActivity({}));
    }
  };

  console.log(selectedActivities);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
        sx={{ boxShadow: "0px 0px 0px grey" }}
      >
        <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
          <Button
            startIcon={<LeaderboardIcon />}
            sx={{
              width: "fit-content",
              height: "fit-content",
              wordBreak: "break-word",
              color: "black",
              fontSize: "1.2rem",
              border: "1px solid #1dd1a1",
              backgroundColor: "#1dd1a1",
              "&:hover": {
                backgroundColor: "#1dd1a1",
              },
            }}
          >
            {/* {expanded ? `Enter ${itemName} Name` : `Add  ${itemName}`} */}
            Measure Performance
          </Button>
        </AccordionSummary>
        <AccordionDetails
          sx={{ padding: "2rem", boxShadow: "1px 1px 4px grey", width: "100%" }}
        >
          {selectedActivities.length <= 0 ? (
            <Typography>
              Please Select Your Favorite Activity from Favorite Section ...{" "}
            </Typography>
          ) : (
            <Stack direction="row" gap={2}>
              <CustomDropdown
                name="Your Favorite Activity"
                menuItems={selectedActivities}
                id="activityName"
              />
              <CustomDropdown
                name="Unit"
                menuItems={["mts", "kms"]}
                id="unit"
              />
              <CustomDropdown
                name="Distance"
                menuItems={[0.5, 1, 2, 3, 4, 5, 10, 15, 20]}
                id="distance"
              />
            </Stack>
          )}
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default MeasurePerformance;
