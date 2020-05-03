import React from 'react';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { RichTextField } from '../prismic-elements';
import Paper from '@material-ui/core/Paper';

import { ReactComponent as Background1 } from '../../../common/svg/Background1.svg';
import { ReactComponent as Background2 } from '../../../common/svg/Background2.svg';
import { ReactComponent as Background3 } from '../../../common/svg/Background3.svg';
import { ReactComponent as Background4 } from '../../../common/svg/Background4.svg';

const useStyles = makeStyles((theme) => ({
  background: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    zIndex: -1,
    '& .Backdrop': {
      fill: '#d9d9d9',
    },
    '& .PrimaryColor': {
      fill: theme.palette.primary.light,
    },
    '& .Line': {
      fill: 'white',
    },
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionHolder: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 60,
  },
  cardsHolder: {
    marginLeft: 40,
    marginRight: 40,
    '& h2': {
      ...theme.typography.h3,
      marginBottom: 0,
      textAlign: 'center',
      color: theme.palette.primary.dark,
    },

    '& h3': {
      ...theme.typography.h6,
      marginTop: 10,
      marginBottom: 10,
    },
    '& h4': {
      ...theme.typography.body1,
      fontWeight: 800,
      marginTop: 0,
      marginBottom: 0,
    },
    '& p': {
      ...theme.typography.body1,
      marginTop: 0,
      marginBottom: 0,
      textAlign: 'center',
      color: theme.palette.primary.main,
    },
    '& li': {
      ...theme.typography.body1,
      marginTop: 0,
      marginBottom: 0,
      color: theme.palette.primary.main,
    },
    '&.textAsPrimaryColor': {
      color: theme.palette.primary.dark,
    },
    [theme.breakpoints.down('md')]: {
      '& h2': {
        fontSize: '2rem',
      },
      marginLeft: 20,
      marginRight: 20,
    },
    [theme.breakpoints.down('xs')]: {
      marginLeft: 10,
      marginRight: 10,
    },
  },
  imageOnCard: {
    width: '100%',
    [theme.breakpoints.down('md')]: {
      width: '65%',
    },
  },
}));

/**
 * Full width image slice component
 */
const CardsSection = ({ slice }) => {
  const classes = useStyles();
  return (
    <Box component='section'>
      <Box height='100%' width='100%' position='relative' className={classes.content}>
        {slice.primary.background_id === 'Background1' && <Background1 className={classes.background} />}
        {slice.primary.background_id === 'Background2' && <Background2 className={classes.background} />}
        {slice.primary.background_id === 'Background3' && <Background3 className={classes.background} />}
        {slice.primary.background_id === 'Background4' && <Background4 className={classes.background} />}
        <Container maxWidth='lg' className={classes.sectionHolder}>
          <Paper elevation={3} className={classes.cardsHolder}>
            <Grid container spacing={4} justify='center'>
              <Grid item xs={12} p={0} mt={3} mb={0}>
                <RichTextField field={slice.primary.heading} />
              </Grid>
              {slice.items.map((item, index) => (
                <Grid item xs={12} sm={6} md={3}>
                  <Box display='flex' m={4} mt={0} flexDirection='column' justifyContent='start' alignItems='center'>
                    <Box px={5} textAlign='center'>
                      <img src={item.image.url} alt={item.image.alt} className={classes.imageOnCard} />
                    </Box>
                    <RichTextField field={item.title} />
                    <RichTextField field={item.text} />
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Container>
      </Box>
    </Box>
  );
};

export default CardsSection;
