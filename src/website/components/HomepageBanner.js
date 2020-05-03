import React from 'react';
import { RichTextField } from './prismic-elements';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';

import EnquiryForm from './EnquiryForm';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  homePageBanner: {
    marginBottom: 20,
  },
  leftSection: {
    marginTop: 40,
    marginBottom: 40,
    color: 'white',
    '& h1': {
      ...theme.typography.h3,
      fontWeight: 500,
      marginTop: 0,
      marginBottom: 0,
    },
    '& h2': {
      ...theme.typography.h4,
      marginTop: 0,
      marginBottom: 0,
    },
    '& p': {
      ...theme.typography.body1,
    },
    [theme.breakpoints.down('md')]: {
      '& h1': {
        fontSize: '2rem',
      },
      '& h2': {
        fontSize: '1.5rem',
      },
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: 40,
      marginBottom: 20,
    },
  },
  flexCenter: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightSection: {
    color: 'white',
    marginTop: 40,
    marginBottom: 40,
    [theme.breakpoints.down('sm')]: {
      marginTop: 20,
      marginBottom: 40,
    },
  },
  enquiryContainer: {
    maxWidth: 400,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
}));

/**
 * Homepage banner component
 */
const HomepageBanner = ({ banner }) => {
  const classes = useStyles();

  return (
    <section className={classes.homePageBanner} style={{ backgroundSize: 'cover', backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url(${banner.image.url})` }}>
      <Container maxWidth='xl'>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} className={classes.flexCenter}>
            <Box className={classes.leftSection}>
              <RichTextField field={banner.tagline1} />
              <RichTextField field={banner.tagline2} />
            </Box>
          </Grid>
          <Grid item xs={12} md={6} className={classes.flexCenter}>
            <Box className={classes.rightSection}>
              <Paper className={classes.enquiryContainer}>
                <EnquiryForm />
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </section>
  );
};

export default HomepageBanner;
