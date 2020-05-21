import React, { useContext, useState } from "react";
import { OrderContext } from "../stores";
import Layout from "../containers/Layout";
import { Grid, Button, MenuItem, TextField, Select } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { mockLocations } from "../mock";

export default () => {
  const order = useContext(OrderContext);
  const history = useHistory();
  const [tableID, setTableID] = useState("");
  const [location, setLocation] = useState(mockLocations[0]);

  const handleEnterTischID = () => {
    order.dispatch({
      type: "setTableLocation",
      payload: { tableID, location },
    });
    history.replace("/drinks");
  };
  return (
    <>
      <Layout drawerItems={[[]]} onDrawerClick={() => {}}>
        <Grid container alignItems="center" direction="column" spacing={2}>
          <Grid item container justify="center" xs={6}>
            <InputField
              value={tableID}
              handleChange={(e: {
                target: { value: React.SetStateAction<string> };
              }) => setTableID(e.target.value)}
            />
          </Grid>
          <Grid item container justify="center" xs={6}>
            <SelectField
              items={mockLocations}
              value={location}
              handleChange={(e: {
                target: { value: React.SetStateAction<string> };
              }) => setLocation(e.target.value)}
            />
          </Grid>
          <Grid container direction="column" justify="center">
            <Button color="primary" onClick={handleEnterTischID}>
              Bestätigen
            </Button>
          </Grid>
        </Grid>
      </Layout>
      {order.state.tableID}
    </>
  );
};

const SelectField = ({
  items,
  value,
  handleChange,
}: {
  items: string[];
  value: string;
  handleChange: any;
}) => (
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    label="Filiale"
    fullWidth
    value={value}
    onChange={handleChange}
  >
    {items.map((item) => (
      <MenuItem key={item} value={item}>
        {item}
      </MenuItem>
    ))}
  </Select>
);

const InputField = ({
  value,
  handleChange,
}: {
  value: string;
  handleChange: any;
}) => (
  <TextField
    id="standard-basic"
    label="Tisch Nummer"
    fullWidth
    value={value}
    onChange={handleChange}
  />
);
