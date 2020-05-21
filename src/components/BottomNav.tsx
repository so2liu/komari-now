import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
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
  const currentItem = items.filter(({ key }) =>
    window.location.href.includes(key)
  );
  return (
    <BottomNavigation
      value={currentItem.length > 0 ? currentItem[0].key : ""}
      className={classes.root}
    >
      {items.map(({ key, label, link, icon }) => (
        <BottomNavigationAction
          key={key}
          label={label}
          value={key}
          icon={icon}
          component={Link}
          to={link}
        />
      ))}
    </BottomNavigation>
  );
}
