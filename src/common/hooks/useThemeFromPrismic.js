import { useEffect, useState } from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import { client } from '../../website/utils/prismicHelpers';
const initialTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#1876d2',
      //main: '#5cb6e8',
    },
    secondary: red,
  },
  status: {
    danger: 'orange',
  },
});

function useThemeFromPrismic(callback) {
  const [theme, setTheme] = useState(initialTheme);
  useEffect(() => {
    const fetchPrismicData = async () => {
      try {
        const themeDoc = await client.getSingle('theme');

        const newTheme = createMuiTheme({
          palette: {
            primary: theme.palette.augmentColor({ '500': themeDoc.data.primary_color }),
            //main: '#5cb6e8',
            secondary: red,
          },
          status: {
            danger: 'orange',
          },
        });

        console.log({ newTheme });

        setTheme(newTheme);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPrismicData();
  }, [theme.pallete]);
  return theme;
}

export default useThemeFromPrismic;
