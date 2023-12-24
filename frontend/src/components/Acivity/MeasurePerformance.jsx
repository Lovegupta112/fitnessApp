import React, { useState } from "react";
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
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import CustomDropdown from "../common/CustomDropdown";


const MeasurePerformance = ({ createItem, itemName, btnText }) => {
  const [expanded, setExpanded] = useState(false);
  const [name, setName] = useState("");

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  function handleClose() {
    setExpanded(false);
    setName("");
  }

  function handleCreate() {
    if (name) {
      createItem(name);
      setExpanded(false);
      setName("");
    }
  }

  return (
    <Box>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
        sx={{ boxShadow: "0px 0px 0px grey" }}
      >
        <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
          <Button
            startIcon={<LeaderboardIcon />}
            sx={{
              width: 'fit-content',
              height: "fit-content",
              wordBreak: "break-word",
              color: "#55efc4",
              fontSize: "1.2rem",
              border:'1px solid #55efc4'
            }}
          >
            {/* {expanded ? `Enter ${itemName} Name` : `Add  ${itemName}`} */}
            Measure Performance
          </Button>
        </AccordionSummary>
        <AccordionDetails sx={{paddingLeft:'2rem'}}>
        <Typography>Please Select Your Favorite Activity from Favorite Section ... </Typography>
        <Stack direction='row' gap={2}>
        <CustomDropdown name='Your Favorite Activity'/>
        <CustomDropdown name='Unit'/>
        <CustomDropdown name='Distance'/>
        </Stack>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default MeasurePerformance;
