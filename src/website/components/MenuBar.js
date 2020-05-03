import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

import { ReactComponent as TripBuddiLogo } from '../../common/svg/TripBuddiLogo.svg';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  logo: {
    height: 60,
    width: 'auto',
    marginTop: 10,
    marginBottom: 10,
    '& .Man': {
      fill: theme.palette.text.primary,
    },
    '& .TripBuddiText': {
      fill: theme.palette.primary.main,
    },
    '& .Plane': {
      fill: theme.palette.text.primary,
    },
    '& .Hotel': {
      fill: theme.palette.text.primary,
    },
    '& .Backpack': {
      fill: theme.palette.primary.light,
    },
    [theme.breakpoints.down('md')]: {
      height: 40,
      width: 'auto',
      marginTop: 5,
      marginBottom: 5,
    },
  },

  menuBuffer: {
    height: 80,
    [theme.breakpoints.down('md')]: {
      height: 50,
    },
  },

  menuBar: {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.primary.main,
    position: 'fixed',
    top: 0,
  },
}));

export default function MenuBar(props) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <AppBar className={classes.menuBar}>
        <Toolbar>
          <Box display='flex' className={classes.title}>
            <TripBuddiLogo className={classes.logo} />
          </Box>
          <Button className={classes.menuButton} variant='outlined' color='inherit'>
            Sign in
          </Button>
          <Button className={classes.menuButton} variant='outlined' color='inherit'>
            Sign up
          </Button>
        </Toolbar>
      </AppBar>
      <Box className={classes.menuBuffer} />
    </React.Fragment>
  );
}
