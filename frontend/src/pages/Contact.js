import React from 'react'
import Layout from '../components/Layout/Layout'
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import MailIcon from '@mui/icons-material/Mail';
import AddIcCallIcon from '@mui/icons-material/AddIcCall';


const Contact = () => {
  return (
    <Layout>
       <Box sx={{my:5, ml:10, "& h4" : {fontWeight:"bold", mb: 2} }}>
        <Typography variant="h4">
            contact us
        </Typography>
        <Typography> PLEASE GET IN TOUCH</Typography>
       </Box>
       <Box  sx={{m: 3, width: "600px", ml:10, "@media (max-width:600px)":{
             width:"300px",
       }}}>
        <TableContainer component={Paper}>
             <Table aria-label="contact table">
             <TableHead>
                <TableRow>
                  <TableCell sx={{bgcolor:"black", color: "white"}} align="center">Contact Details</TableCell>
                </TableRow>
             </TableHead>
             <TableBody>
                  <TableRow>
                    <TableCell>
                      <SupportAgentIcon sx={{color: "red",pt:1}}/> +94 (20)0 2234567 (tollfree)
                    </TableCell>
                    
                  </TableRow>
                  <TableRow>
                  <TableCell>
                      <MailIcon sx={{color: "skyblue",pt:1}}/> singherest@gmail.com
                    </TableCell>
                  </TableRow>
                  <TableRow>
                  <TableCell>
                      <AddIcCallIcon sx={{color: "green",pt:1}}/> 077 2245678 
                    </TableCell>
                  </TableRow>
             </TableBody>
             </Table>
        </TableContainer>
       </Box>
    </Layout>
  );
};

export default Contact