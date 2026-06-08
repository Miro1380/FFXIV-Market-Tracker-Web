import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'dark',
        background: {
            default: '#0d0f14',
            paper: '#13161e',
            xivGoldDim: '#a08040',
            xivUp: '#000000',
        },
        primary: {
            main: '#c8a96e',
            xivGoldDim: { main: '#a08040' },
            xivGold: { main: '#c8a96e' },
        },
        secondary: {
            main: '#5b9bd5',
        },
        success: {
            main: '#4caf7d',
        },
        error: {
            main: '#e05a5a',
        },
        text: {
            primary: '#e8e0d0',
            secondary: '#8a8070',
            xivGoldDim: '#a08040',
            xivGold: '#c8a96e',
        },
        divider: 'rgba(200, 169, 110, 0.25)',
        border: {
            xivGoldDim: '#a08040',
            xivGold: '#c8a96e',
        },
    },
    typography: {
        fontFamily: 'Lato, sans-serif',
        h1: { fontFamily: 'Cinzel, serif' },
        h2: { fontFamily: 'Cinzel, serif' },
        h3: { fontFamily: 'Cinzel, serif' },
    },
    shape: {
        borderRadius: 6,
    },
    components: {
        MuiListItem: {
            styleOverrides: {
                root: {
                    '&.Mui-selected': {
                        backgroundColor: 'rgba(200, 169, 110, 0.1)',
                        borderLeft: '2px solid #c8a96e',
                    },
                    '&.Mui-selected:hover': {
                        backgroundColor: 'rgba(200, 169, 110, 0.15)',
                    },
                }
            }
        },
        MuiSwitch: {
            styleOverrides: {
                switchBase: {
                    '&.Mui-checked': {
                        color: '#4caf7d',
                    },
                    '&.Mui-checked + .MuiSwitch-track': {
                        backgroundColor: '#4caf7d',
                    }
                }
            }
        }
    }
});

export default theme;