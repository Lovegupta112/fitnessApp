import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import cycling from "../../../public/cycling.jpg";
import { IconButton, Stack } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function ActvityCard() {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia sx={{ height: 140 }} image={cycling} title="cycling" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          ActivityName
        </Typography>
        <Typography variant="body2" color="text.secondary"></Typography>
      </CardContent>
      <CardActions>
       <Stack sx={{border:'1px solid black',width:'100%'}}>
       <Stack direction='row' sx={{}} gap={3}> <Typography>Activity: </Typography><Typography>Cycling</Typography></Stack>
       <Stack direction='row' sx={{}} gap={3}> <Typography>Distance: </Typography><Typography>6Km</Typography></Stack>
       <Stack direction='row' sx={{}} gap={3}> <Typography>Time: </Typography><Typography>30min</Typography></Stack>
       
       <IconButton
          size="large"
          sx={{ color: "crimson",width:'fit-content',alignSelf:'flex-end' }}
        >
          <DeleteIcon />
        </IconButton>
       </Stack>
      </CardActions>
    </Card>
  );
}
