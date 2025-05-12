import { Box, Typography } from "@mui/material";
import User from "../UserManagement/User";

function Admin() {
    return(
        <Box>
            <Typography variant="h4" gutterBottom sx={{ textAlign: 'center' }}>User List</Typography>
            <User />
        </Box>
    );
}
export default Admin;