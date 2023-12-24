import { useState, useEffect } from "react";
import { Typography, Stack, Box, IconButton } from "@mui/material";
import ProfileForm from "../components/Profile/ProfileForm";
import { useSelector } from "react-redux";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const ProfilePage = () => {
  const [username, setUsername] = useState("");
  const userInfo = useSelector((state) => state.user);
  useEffect(() => {
    setUsername(userInfo.username);
  }, [userInfo]);

  return (
    <Stack
      gap={2}
      sx={{
        // border:'1px solid black',
        minHeight: "calc(100vh - 10vh)",
      }}
      padding={2}
    >
      <Typography variant="h5">ProfilePage</Typography>
      <Stack
        direction="row"
        sx={{
          height: "calc(100vh - 20vh)",
        }}
      >
        <Stack
          flexBasis={"20%"}
          sx={{
            // border:'1px solid black',
            paddingTop: "2rem",
          }}
          alignItems="center"
          gap={2}
        >
          <IconButton
            sx={{
              // border:'1px solid red',
              boxShadow: "1px 1px 10px grey",
              borderRadius: "100px",
              height: "20%",
              width: "45%",
              backgroundColor: "purple",
              color: "white",
              "&:hover": {
                backgroundColor: "purple",
              },
            }}
          >
            <AccountCircleIcon sx={{ fontSize: "6rem" }} />
          </IconButton>
          {username && <Typography variant="h3" sx={{textTransform:'capitalize'}}>{username}</Typography>}
        </Stack>
        <Stack
          flexGrow={1}
          sx={{
            borderLeft: "1px solid black",
          }}
          padding={2}
        >
          <ProfileForm />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default ProfilePage;
