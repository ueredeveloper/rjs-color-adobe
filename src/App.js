import * as React from 'react';
import { red, grey } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { AppBar, Badge, Box, Button, ButtonBase, IconButton, ImageList, ImageListItem, Slider, Toolbar, Typography } from '@mui/material';
import LensIcon from '@mui/icons-material/Lens';
import MenuIcon from '@mui/icons-material/Menu';
import MailIcon from '@mui/icons-material/Mail';

import { adobeColors } from './color-adobe';
import { Stack } from '@mui/system';

function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${size * rows
      }&fit=crop&auto=format&dpr=2 2x`,
  };
}

export const App = () => {

  const [thPalette, setThPalette] = React.useState({
    primary: {
      main: 'rgb(140, 3, 53)',
    },
  })
  const [mode, setMode] = React.useState('light');

  const darkMode = {
    // palette values for dark mode
    primary: { main: grey[500] },
    text: {
      primary: '#fff',
      secondary: 'rgba(255, 255, 255, 0.7)',
      disable: 'rgba(255, 255, 255, 0.5)',

    },
    tertiary: { main: '#fff' }
  }
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === 'light'
            ? thPalette
            : darkMode),
        },
      }),
    [mode, thPalette],
  );

  const onClickImage = (item) => {

    const _thPalette = {
      primary: {
        main: item[1],
      },
      secondary: {
        main: item[3],
      },
    };
    setThPalette(_thPalette)

  }

  function valuetext(value) {
    return `${value}°C`;
  }

  const ImageButton = styled(ButtonBase)(({ theme }) => ({
    position: 'relative',
    height: 200,
    width: 200,
    [theme.breakpoints.down('sm')]: {
      width: '100% !important', // Overrides inline-style
      height: 100,
    },
    '&:hover, &.Mui-focusVisible': {
      zIndex: 1,
      '& .MuiImageBackdrop-root': {
        opacity: 0.15,
      },
      '& .MuiImageMarked-root': {
        opacity: 0,
      },
      '& .MuiTypography-root': {
        border: '4px solid currentColor',
      },
    },
  }));
  const ImageSrc = styled('span')({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
  });
  const ImageBackdrop = styled('span')(({ theme }) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create('opacity'),
  }));
  const ImageMarked = styled('span')(({ theme }) => ({
    //height: 3,
    // width: 18,
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
  }));
  const Image = styled('span')(({ theme }) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
  }));



  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              News
            </Typography>
            <Stack spacing={4} direction="row" sx={{ color: 'action.active', mx: 10 }}>
              <Badge color="secondary" badgeContent={99}>
                <MailIcon />
              </Badge>
              <Badge color="secondary" badgeContent={100}>
                <MailIcon />
              </Badge>
              <Badge color="secondary" badgeContent={1000} max={999}>
                <MailIcon />
              </Badge>
            </Stack>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
      </Box>
      <ImageList
        sx={{height: 600}}
        variant="quilted"
        cols={4}
        rowHeight={130}
      >
        {adobeColors.map(item => (
          <ImageListItem key={item.img} cols={1} rows={Math.floor(Math.random() * 2) + 1} sx={{ position: 'relative' }}>
            <ImageButton
              value={'item'}
              focusRipple
              key={item.img}
              onClick={(e) => onClickImage(item.colors)}
            >
              <ImageSrc style={{ backgroundImage: `url(${item.img})` }} />
              <Image>
                {item.colors.map((rgb) => <LensIcon key={rgb} style={{ color: `${rgb}` }} sx={{ stroke: "#ffffff", strokeWidth: 1 }} />)}
              </Image>
            </ImageButton>
          </ImageListItem>
        )
        )}
      </ImageList>
      <Box sx={{  width: '300', alignContent: 'center'}}>
      <Slider
      color="secondary"
        aria-label="Small steps"
        defaultValue={0.00000005}
        getAriaValueText={valuetext}
        step={0.00000001}
        marks
        min={-0.00000005}
        max={0.0000001}
        valueLabelDisplay="auto"
      />
    </Box>

    </ThemeProvider>)
}
