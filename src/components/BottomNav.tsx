import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import RestoreIcon from "@material-ui/icons/Restore";
import FavoriteIcon from "@material-ui/icons/Favorite";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import { Link } from "react-router-dom";
import { drawerWidth } from "./Sidebar";

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      // marginLeft: drawerWidth,
    },
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
    position: "fixed",
    bottom: 0,
  },
}));

export default function SimpleBottomNavigation(props: {
  items: {
    key: string;
    label: string;
    link: string;
    icon: any;
  }[];
}) {
  const { items } = props;
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.root}
    >
      {items.map(({ key, label, link, icon }) => (
        <Link key={key} to={link}>
          <BottomNavigationAction label={label} icon={icon} />
        </Link>
      ))}
    </BottomNavigation>
  );
}
