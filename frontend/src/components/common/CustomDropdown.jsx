import { useState, useEffect } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentActivity } from "../../app/features/activitySlice";

export default function CustomDropdown({ name, menuItems, id }) {
  const [favoriteActivity, setFavoriteActivity] = useState("");
  const currentActivity = useSelector(
    (state) => state.activity.currentActivity
  );
  const dispatch = useDispatch();
  console.log(currentActivity);

  useEffect(() => {
    if (id === "activityName") {
      setFavoriteActivity(currentActivity.activityName);
    } else if (id === "unit") {
      setFavoriteActivity(currentActivity.unit);
    } else if (id === "distance") {
      setFavoriteActivity(currentActivity.distance);
    }
  }, [currentActivity]);

  const handleChange = (event) => {
    console.log(event.target.value, event.target.name);
    const name = event.target.name;
    const value = event.target.value;
    setFavoriteActivity(value);
    if (name === "activityName") {
      dispatch(setCurrentActivity({ name: "activityName", value }));
    } else if (name === "unit") {
      dispatch(setCurrentActivity({ name: "unit", value }));
    } else if (name === "distance") {
      dispatch(setCurrentActivity({ name: "distance", value }));
    }
  };

  return (
    <div>
      <FormControl
        variant="standard"
        sx={{ m: 1, minWidth: 120, width: "200px" }}
      >
        <InputLabel id="select-component">{name}</InputLabel>
        <Select
          labelId="select-component"
          id="demo-simple-select-standard"
          value={favoriteActivity}
          onChange={handleChange}
          label={name}
          name={id}
        >
          {menuItems?.map((activity, index) => (
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
    </div>
  );
}
