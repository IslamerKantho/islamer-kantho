const { createTheme } = require("@mui/material");

module.exports = createTheme({
    primary: {
        main: '#044f4f',
    },
    secondary: {
        main: '#D1BB9E',
    },
    error: {
        main: '#E72929',
    },
    warning: {
        main: '#ff9800',
    },
    success: {
        main: '#41B06E',
    },
    typography: {
        fontFamily: `"HNT","Inter","Roboto","Arial",sans-serif`,
        fontSize: 13,
        fontWeightLight: 400,
    },
})