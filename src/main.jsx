import ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import App from './App';
import { UserProvider } from './component/UserContext';
import {useUser} from './component/UserContext'
import UserLogin from './component/UserLogin';

ReactDOM.createRoot(document.getElementById('root')).render(
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <UserProvider>
            <Root />
        </UserProvider>
    </ThemeProvider>
);

function Root(){
    const {user} = useUser();
    return user ? <App/> : <UserLogin/>;
}