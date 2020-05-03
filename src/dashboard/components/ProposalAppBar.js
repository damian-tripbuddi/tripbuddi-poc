import React, { useEffect, useRef, useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MailIcon from '@material-ui/icons/Mail';
import { Link } from 'react-router-dom';
import UserProfileService from '../services/UserProfileService';
import Avatar from '@material-ui/core/Avatar';
import ProposalNavigationContext from '../pages/Proposal/ProposalNavigationContext';

const useStyles = makeStyles((theme) => ({
  root: {
    zIndex: theme.zIndex.drawer + 10,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  sectionDesktop: {
    display: 'flex',
  },
  menuLink: {
    textDecoration: 'unset',
    color: 'unset',
  },
  logoImage: {
    maxHeight: 56 - 4,
    [`${theme.breakpoints.up('xs')} and (orientation: landscape)`]: {
      maxHeight: 48 - 4,
    },
    [theme.breakpoints.up('sm')]: {
      maxHeight: 64 - 4,
    },
  },
}));

export default function ProposalAppBar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);

  const currentUserProfile = useRef(null);

  const [preferredName, setPreferredName] = useState('');
  const [avatar, setAvatar] = useState(null);

  const { navigationState, dispatchNavigation } = useContext(ProposalNavigationContext);

  useEffect(() => {
    const initialLoad = async () => {
      currentUserProfile.current = await UserProfileService.getCurrentUserProfile();
      if (currentUserProfile.current) {
        setPreferredName(currentUserProfile.current.preferredName);
        setAvatar(currentUserProfile.current.avatar);
      }
    };
    initialLoad();
  }, []);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu anchorEl={anchorEl} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} id={menuId} keepMounted transformOrigin={{ vertical: 'top', horizontal: 'right' }} open={isMenuOpen} onClose={handleMenuClose}>
      <MenuItem onClick={handleMenuClose}>
        <Link className={classes.menuLink} to='/profile'>
          Profile
        </Link>
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <Link className={classes.menuLink} to='/logout'>
          Sign out
        </Link>
      </MenuItem>
    </Menu>
  );

  return (
    <>
      <AppBar position='fixed' className={classes.root} color='default'>
        <Toolbar>
          <img className={classes.logoImage} src='/logo.png' alt='TripBuddi Logo' />
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton onClick={() => dispatchNavigation({ type: 'toggleMessageSection' })} aria-label='show 4 new mails' color='primary'>
              <Badge badgeContent={null} color='secondary'>
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton edge='end' aria-label='account of current user' aria-controls={menuId} aria-haspopup='true' onClick={handleProfileMenuOpen} color='inherit'>
              <Avatar src={avatar}>
                {!!preferredName &&
                  preferredName
                    .split(' ')
                    .map((nameSplit) => {
                      return nameSplit.charAt(0).toUpperCase();
                    })
                    .join('')}
              </Avatar>
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </>
  );
}
