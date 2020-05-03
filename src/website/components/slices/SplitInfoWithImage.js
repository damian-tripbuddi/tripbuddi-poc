import React from 'react';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { RichTextField } from '../prismic-elements';
import clsx from 'clsx';

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

  textSection: {
    color: 'white',
    marginTop: 40,
    marginBottom: 40,
    width: '65%',
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
    '& li': {
      ...theme.typography.body1,
    },
    '&.textAsPrimaryColor': {
      color: theme.palette.primary.dark,
    },
    [theme.breakpoints.down('md')]: {
      '& h1': {
        fontSize: '2rem',
      },
      '& h2': {
        fontSize: '1.5rem',
      },
    },
    [theme.breakpoints.down('xs')]: {
      '& h1': {
        color: 'black',
      },
      '& h2': {
        color: 'black',
      },
      '& p': {
        color: 'black',
      },
      '& li': {
        color: 'black',
      },
    },
  },
  imageSection: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 40,
    width: '65%',
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
  },
  leftSection: {
    [theme.breakpoints.down('xs')]: {
      marginBottom: 0,
      marginTop: 40,
    },
  },
  rightSection: {
    [theme.breakpoints.down('xs')]: {
      marginTop: 0,
      marginBottom: 40,
    },
  },
}));

/**
 * Full width image slice component
 */
const SplitInfoWithImage = ({ slice }) => {
  const classes = useStyles();
  return (
    <Box component='section'>
      <Box height='100%' width='100%' position='relative' className={classes.content}>
        {slice.primary.background_id === 'Background1' && <Background1 className={classes.background} />}
        {slice.primary.background_id === 'Background2' && <Background2 className={classes.background} />}
        {slice.primary.background_id === 'Background3' && <Background3 className={classes.background} />}
        {slice.primary.background_id === 'Background4' && <Background4 className={classes.background} />}
        <Container maxWidth='xl'>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} className={classes.sectionHolder}>
              {!slice.primary.show_image_on && (
                <Box className={[classes.imageSection, classes.leftSection]}>
                  <img src={slice.primary.image.url} alt={slice.primary.image.alt} width='100%' />
                </Box>
              )}
              {slice.primary.show_image_on && (
                <Box className={clsx(classes.textSection, classes.leftSection, { textAsPrimaryColor: slice.primary.text_as_primary_color })}>
                  <RichTextField field={slice.primary.text} />
                </Box>
              )}
            </Grid>
            <Grid item xs={12} sm={6} className={classes.sectionHolder}>
              {slice.primary.show_image_on && (
                <Box className={[classes.imageSection, classes.rightSection]}>
                  <img src={slice.primary.image.url} alt={slice.primary.image.alt} width='100%' />
                </Box>
              )}
              {!slice.primary.show_image_on && (
                <Box className={clsx(classes.textSection, classes.rightSection, { textAsPrimaryColor: slice.primary.text_as_primary_color })}>
                  <RichTextField field={slice.primary.text} />
                </Box>
              )}
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default SplitInfoWithImage;
