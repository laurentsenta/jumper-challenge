import { Box, Typography } from "@mui/material";

const DashboardContent: React.FC = () => {
  return (
    <Box sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Dashboard
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Welcome to your dashboard! Your content will appear here.
      </Typography>
    </Box>
  );
};

export default DashboardContent;
