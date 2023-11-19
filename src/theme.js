// themes.js

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'Roboto, sans-serif',
    h5: {
      fontSize: '14px',
      fontWeight: 600,
      color:"#475467"
    },
    h4: {
      fontSize: '30px',
      fontWeight: 600,
      color:"#101828",
      marginBottom:"10px"

    },
 
    
    // Add other typography styles here
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none', // Remove uppercase transformation
          backgroundColor: '#7244C8', // Custom button background color
          width:"360px",
          height:"44px",
          borderRadius:"8px",
          color:"white",
          '&:hover': {
            backgroundColor: '#7244C8',
            color:"white",
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          height: '44px', // Custom input height
          border: '1px solid #F9FAFB', // Custom input border
          // padding: '8px', // Custom input padding
          width:"360px",
          backgroundColor:"#F9FAFB",
          margin:"0",
          '&:foucs': {
            backgroundColor: '#4CAF50', // Custom color for completed step
            border: '1px solid #F9FAFB',
            outline: 'none',
          },
        },
      },
    },
  
  },

  // Add other global styles here
});

export default theme;
