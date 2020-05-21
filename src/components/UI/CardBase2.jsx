import React from "react";
import cx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import { Box } from "@material-ui/core";
import TextInfoContent from "@mui-treasury/components/content/textInfo";
import { useN04TextInfoContentStyles } from "@mui-treasury/styles/textInfoContent/n04";
import { useOverShadowStyles } from "@mui-treasury/styles/shadow/over";

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 360,
    margin: "auto",
    borderRadius: 12,
    padding: 12,
  },
  media: {
    borderRadius: 6,
    height: 200,
  },
}));

const CardBase = ({ imgSrc, header, heading, body, children }) => {
  const styles = useStyles();
  const textCardContentStyles = useN04TextInfoContentStyles();
  const shadowStyles = useOverShadowStyles({ inactive: true });
  return (
    <Card className={cx(styles.root, shadowStyles.root)}>
      <CardMedia className={cx(styles.media)} image={imgSrc} />
      <CardContent className={styles.content}>
        {header}
        <TextInfoContent
          classes={textCardContentStyles}
          heading={heading}
          body={body}
        />
        <Box mt={3}>{children}</Box>
      </CardContent>
    </Card>
  );
};

export default CardBase;
