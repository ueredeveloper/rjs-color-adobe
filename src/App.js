import * as React from 'react';
import { red } from '@mui/material/colors';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Box, ImageList, ImageListItem } from '@mui/material';
import { adobeColors } from './color-adobe';
import LensIcon from '@mui/icons-material/Lens';

const theme = createTheme({
  palette: {
    primary: {
      main: red[500],
    },
  },
});

function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${size * rows
      }&fit=crop&auto=format&dpr=2 2x`,
  };
}

export const App = () => {

  const [_col, _setCol] = React.useState(1)
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ backgroundColor: "primary.main" }}> Hello Box</Box>
      <ImageList
        sx={{ width: 500, height: 450 }}
        variant="quilted"
        cols={4}
        rowHeight={121}
      >
        {adobeColors.map((item, i) => (

          <ImageListItem key={item.img} cols={1} rows={Math.floor(Math.random() * 2) + 1} sx={{ position: 'relative' }}>
            <img
              {...srcset(item.img, 200, item.rows, item.cols)}
              loading="lazy"
              sx={{ display: 'block' }}
            />
            <Box sx={{ position: 'absolute', bottom: 0, left: 0 }}>
              {item.colors.map((rgb) => <LensIcon key={rgb} style={{ color: `${rgb}` }} />)}
            </Box>
          </ImageListItem>

        ))}
      </ImageList>
    </ThemeProvider>)
}
