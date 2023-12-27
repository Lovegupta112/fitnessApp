import { Stack, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import PerformanceTable from "../components/Performance/PerformanceTable";
import FilterByActivity from "../components/Performance/FilterByActivity";

const PerformancePage = () => {
  return (
    <Stack
      sx={{
        minHeight: "calc(100vh - 10vh)",
      }}
      padding={2}
      gap={2}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        padding={2}
      >
        <Typography
          sx={{
            fontSize: "2rem",
            fontWeight: "bold",
          }}
        >
          User Performance Table
        </Typography>
        <FilterByActivity />
      </Stack>
      <PerformanceTable />
    </Stack>
  );
};

export default PerformancePage;
