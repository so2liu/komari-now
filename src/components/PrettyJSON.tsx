import React from "react";
import PropTypes from "prop-types";

const placeHolderObj = {
  placeholder: {
    key: "placeholder",
  },
};

const PrettyJSON = ({
  jsonObj = placeHolderObj as object,
  keyLabel = "",
  maxWidth = 300,
  isLimitWidth = true,
}) => {
  const limitWidthStyle = { overflow: "hidden", maxWidth: maxWidth };

  return (
    <div style={isLimitWidth ? limitWidthStyle : {}}>
      {Object.entries(jsonObj ?? placeHolderObj).map(([key, json]) => (
        <div key={`pre-json-${keyLabel}-${key}`}>
          <h3 style={{ color: "#aa0000" }}>{key}</h3>
          <pre>{JSON.stringify(json, null, 2)}</pre>
        </div>
      ))}
    </div>
  );
};

PrettyJSON.propTypes = {
  jsonObj: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.object, PropTypes.array])
  ).isRequired,
  keyLabel: PropTypes.string.isRequired,
  isLimitWidth: PropTypes.bool,
  maxWidth: PropTypes.number,
};

export default PrettyJSON;
