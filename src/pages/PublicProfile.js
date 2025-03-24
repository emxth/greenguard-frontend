import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";
import UpdateUserForm from "../UserManagement/AddUserForm";

function PublicProfile() {
    return (
        <Box>   
            <Box display="flex" alignItems="center">
                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Hello</Typography>
                <Typography variant="h5" sx={{ ml: 1, fontWeight: 'bold' }}>_username_</Typography>
            </Box>

            <Box sx={{ mt: 4 }}>
                <UpdateUserForm />
            </Box>

            <Box>
                <TableContainer component={Paper} elevation={0} sx={{ maxWidth: 450, mt: 4, }}>
                    <Table stickyHeader aria-label="sticky table" sx={{ border: "none" }}>
                        <TableBody>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 'bold', border: "none" }}>User ID :</TableCell>
                                <TableCell sx={{ border: "none" }}>No data</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 'bold', border: "none" }}>First Name :</TableCell>
                                <TableCell sx={{ border: "none" }}>No data</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 'bold', border: "none" }}>Last Name :</TableCell>
                                <TableCell sx={{ border: "none" }}>No data</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 'bold', border: "none" }}>Email :</TableCell>
                                <TableCell sx={{ border: "none" }}>No data</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 'bold', border: "none" }}>Contact Number :</TableCell>
                                <TableCell sx={{ border: "none" }}>No data</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 'bold', border: "none" }}>Address :</TableCell>
                                <TableCell sx={{ border: "none" }}>No data</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell sx={{ border: "none" }}>
                                    <Button size="small" color="success" variant="outlined">Edit Profile</Button>
                                </TableCell>
                            </TableRow>
                            
                            {/* {rows.length > 0 ? rows.map(row => (
                                <TableRow key={row._id} hover>
                                    <TableCell>{row.Status}</TableCell>
                                    <TableCell>
                                    </TableCell>
                                </TableRow>
                            )) : (
                                <TableRow>
                                    <TableCell colSpan={6}>No Data</TableCell>
                                </TableRow>
                            )} */}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    );
}

export default PublicProfile;