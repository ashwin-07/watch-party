import './App.css';
import { BrowserRouter } from "react-router-dom";
import MainRoutes from '../components/MainRoutes';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  overrides: {
    MuiCssBaseline: {
        '@global': {
          '*': {
            'scrollbar-width': 'thin',
          },
          '*::-webkit-scrollbar': {
            width: '4px',
            height: '4px',
          }
        }
      }
  },
  palette: {
    primary: {
      main: '#115293',
    },
    secondary: {
      light: '#0066ff',
      main: '#0044ff',
      contrastText: '#ffcc00',
    },
  }
});


function App() {
  return (
    <div className="App">
      <MuiThemeProvider theme={theme}>
        <BrowserRouter>
          <MainRoutes/>
        </BrowserRouter>
      </MuiThemeProvider>
    </div>
  );
}

export default App;
