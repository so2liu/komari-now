import React from "react";
import PropTypes from "prop-types";
import cx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import TextInfoContent from "./TextInfoContent";
import { useN01TextInfoContentStyles as useTextInfoContentStyles } from "@mui-treasury/styles/textInfoContent/n01";
// import { useBlogTextInfoContentStyles as useTextInfoContentStyles  } from "@mui-treasury/styles/textInfoContent/blog";
import { useOverShadowStyles } from "@mui-treasury/styles/shadow/over";
import { Container } from "@material-ui/core";

const useStyles = makeStyles(({ breakpoints, spacing }) => ({
  root: {
    margin: "auto",
    borderRadius: spacing(2), // 16px
    transition: "0.3s",
    boxShadow: "0px 0px 80px rgba(34, 35, 58, 0.2)",
    position: "relative",
    width: "100%",
    maxWidth: 500,
    marginLeft: "auto",
    overflow: "initial",
    background: "#ffffff",
    display: "flex",
    flexDirection: "column",
    // alignItems: "center",
    paddingBottom: spacing(2),
    marginBottom: spacing(4),
    [breakpoints.up("md")]: {
      flexDirection: "row",
      paddingTop: spacing(2),
    },
  },
  media: {
    width: "88%",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: spacing(-3),
    height: 0,
    paddingBottom: "48%",
    borderRadius: spacing(2),
    backgroundColor: "#fff",
    position: "relative",
    [breakpoints.up("md")]: {
      width: "100%",
      marginLeft: spacing(-3),
      marginTop: 0,
      transform: "translateX(-8px)",
    },
    "&:after": {
      content: '" "',
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundImage: "linear-gradient(147deg, #fe8a39 0%, #fd3838 74%)",
      borderRadius: spacing(2), // 16
      opacity: 0.5,
    },
  },
  content: {
    padding: 24,
  },
  cta: {
    marginTop: 24,
    textTransform: "initial",
  },
}));

const CardBase = ({ imgSrc, overline, heading, body, button, children }) => {
  const styles = useStyles();
  const shadowStyles = useOverShadowStyles();
  return (
    <Card className={cx(styles.root, shadowStyles.root)}>
      <CardMedia className={styles.media} image={imgSrc} />
      <CardContent>
        <Container>
          <TextInfoContent overline={overline} heading={heading} body={body} />
          {button && <Button>{button}</Button>}
          {children}
        </Container>
      </CardContent>
    </Card>
  );
};

CardBase.propTypes = {
  imgSrc: PropTypes.string,
  overline: PropTypes.any,
  heading: PropTypes.string,
  body: PropTypes.string,
  button: PropTypes.string,
  children: PropTypes.element,
};

export default CardBase;
