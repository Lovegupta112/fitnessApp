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
import LocalActivityIcon from "@mui/icons-material/LocalActivity";
import PoolIcon from "@mui/icons-material/Pool";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";

const Favorites = ({ createItem, itemName, btnText }) => {
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
            startIcon={<LocalActivityIcon />}
            sx={{
              width: 250,
              height: "fit-content",
              wordBreak: "break-word",
              color: "#e84393",
              fontSize: "1.2rem",
              border:'1px solid #e84393'
            }}
          >
            {/* {expanded ? `Enter ${itemName} Name` : `Add  ${itemName}`} */}
            Favorites
          </Button>
        </AccordionSummary>
        <AccordionDetails sx={{paddingLeft:'2rem'}}>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox icon={<PoolIcon />} />}
              label="Swimming"
            />
            <FormControlLabel
              control={<Checkbox icon={<DirectionsRunIcon />} />}
              label="Running"
            />
            <FormControlLabel
              control={<Checkbox icon={<DirectionsWalkIcon />} />}
              label="Walking"
            />
            <FormControlLabel
              control={<Checkbox icon={<DirectionsBikeIcon />} />}
              label="Cycling"
            />
          </FormGroup>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default Favorites;
