import './App.css';

import StepForm from './components/StepForm';
import { ThemeProvider } from '@mui/material';
import theme from './theme';

function App() {
  return (
<ThemeProvider theme={theme}>
  <StepForm/>
    </ThemeProvider>
  );
}

export default App;
