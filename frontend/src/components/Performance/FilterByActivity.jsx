import { useState, useEffect } from "react";
import CustomDropdown from "../common/CustomDropdown";
import { useSelector, useDispatch } from "react-redux";
import {
  Stack,
  Typography,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { setFilterActivity } from "../../app/features/filterSlice";

const FilterByActivity = () => {
  const [selectedActivities, setSelectedActivities] = useState([]);
  const { userActivities } = useSelector((state) => state.activity);
  const [favoriteActivity, setFavoriteActivity] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    getActivities();
  }, [userActivities]);

  const getActivities = () => {
    setSelectedActivities(
      userActivities.map((activity) => activity.activityname)
    );
  };

  const handleChange = (event) => {
    console.log(event.target.value);
    setFavoriteActivity(event.target.value);
    dispatch(setFilterActivity(event.target.value));
  };

  return (
    <Stack>
        <FormControl
          variant="standard"
          sx={{ m: 1, minWidth: 120, width: "200px" }}
        >
          <InputLabel id="select-component">Filter By Activity</InputLabel>
          <Select
            labelId="select-component"
            id="demo-simple-select-standard"
            value={favoriteActivity}
            onChange={handleChange}
            label="Filter By Activity"
          >
            <MenuItem value="" sx={{ textTransform: "capitalize" }}>
              None
            </MenuItem>
            {selectedActivities?.map((activity, index) => (
              <MenuItem
                value={activity}
                sx={{ textTransform: "capitalize" }}
                key={index}
              >
                {activity}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
    </Stack>
  );
};

export default FilterByActivity;
