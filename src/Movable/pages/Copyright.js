import { Typography } from "@mui/material";

export const Copyright=(props)=> {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        
Global Software Solutions            
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }