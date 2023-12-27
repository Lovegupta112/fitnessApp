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
import LocalActivityIcon from "@mui/icons-material/LocalActivity";
import PoolIcon from "@mui/icons-material/Pool";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import { setSelectedActivity } from "../../app/features/activitySlice";
import { useSelector, useDispatch } from "react-redux";

const Favorites = () => {
  const [expanded, setExpanded] = useState(false);
  const [selectedActivities, setSelectedActivities] = useState({});

  const activity = useSelector((state) => state.activity);
  // console.log("activityslice: ", activity);
  const dispatch = useDispatch();

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  // function handleClose() {
  //   setExpanded(false);
  // }
  useEffect(() => {
    setSelectedActivities(activity.selectedActivity);
  }, [activity.selectedActivity]);

  // console.log(selectedActivities);

  function setActivity(event) {
    // console.log(event.target.value);
    // console.log(event.target.checked);
    const activity = { [event.target.value]: event.target.checked };
    // console.log("activity:", activity);
    setSelectedActivities({ ...selectedActivities, ...activity });
    dispatch(setSelectedActivity({ ...selectedActivities, ...activity }));
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
        sx={{ boxShadow: "0px 0px 0px grey", width: "100%" }}
      >
        <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
          <Button
            startIcon={<LocalActivityIcon />}
            sx={{
              width: 250,
              height: "fit-content",
              wordBreak: "break-word",
              color: "black",
              fontSize: "1.2rem",
              border: "1px solid #2e86de",
              backgroundColor: "#2e86de",
              "&:hover": {
                backgroundColor: "#2e86de",
              },
            }}
          >
            {/* {expanded ? `Enter ${itemName} Name` : `Add  ${itemName}`} */}
            Favorites
          </Button>
        </AccordionSummary>
        <AccordionDetails
          sx={{
            paddingLeft: "2rem",
            boxShadow: "1px 1px 4px grey",
            width: "100%",
          }}
          id="details"
        >
          <Stack>
            <FormControlLabel
              control={
                <Checkbox
                  icon={<PoolIcon />}
                  checked={selectedActivities["swimming"] || false}
                  onChange={setActivity}
                  value="swimming"
                />
              }
              label="Swimming"
            />
            <FormControlLabel
              control={
                <Checkbox
                  icon={<DirectionsRunIcon />}
                  checked={selectedActivities["running"] || false}
                  onChange={setActivity}
                  value="running"
                />
              }
              label="Running"
            />
            <FormControlLabel
              control={
                <Checkbox
                  icon={<DirectionsWalkIcon />}
                  checked={selectedActivities["walking"] || false}
                  onChange={setActivity}
                  value="walking"
                />
              }
              label="Walking"
            />
            <FormControlLabel
              control={
                <Checkbox
                  icon={<DirectionsBikeIcon />}
                  checked={selectedActivities["cycling"] || false}
                  onChange={setActivity}
                  value="cycling"
                />
              }
              label="Cycling"
            />
          </Stack>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default Favorites;
