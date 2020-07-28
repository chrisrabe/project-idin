import React, { useState } from 'react';
import { useTheme } from '@material-ui/core/styles';
import TabPanel from 'components/routes/Landing/AuthForm/TabPanel';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { ButtonContainer } from '../../styles';

const sampleOrgs = [
  { orgName: 'Create new...' },
  { orgName: 'Accenture' },
  { orgName: 'Rabe Studios' },
  { orgName: 'Bunn Creative' },
  { orgName: 'Google' },
];

const RegisterPanel = (props) => {
  const theme = useTheme();
  const { value } = props;
  const [isNewOrg, setIsNewOrg] = useState(false);

  const handleOrgChange = (e, org) => {
    if (org) {
      const { orgName } = org;
      setIsNewOrg(orgName === 'Create new...');
    }
  };

  const onRadioSelect = (checked) => {
    console.log(checked);
  };

  return (
    <TabPanel value={value} index={1} dir={theme.direction}>
      <TextField id="username" label="Username" variant="outlined" fullWidth margin="normal" />
      <TextField id="email" label="Email" variant="outlined" fullWidth margin="normal" />
      <Autocomplete
        getOptionLabel={(option) => option.orgName}
        onChange={handleOrgChange}
        renderInput={(params) => <TextField {...params} label="Organisation" variant="outlined" margin="normal" />}
        options={sampleOrgs}
      />
      { isNewOrg && (
        <>
          <TextField id="orgName" label="Company Name" variant="outlined" fullWidth margin="normal" />
          <FormControlLabel
            onChange={(event) => onRadioSelect(event.target.checked)}
            control={<Radio color="primary" />}
            label="Are you a supplier?"
          />
        </>
      )}
      <ButtonContainer>
        <Button variant="contained" color="primary">
          Register
        </Button>
      </ButtonContainer>
    </TabPanel>
  );
};

RegisterPanel.propTypes = {
  value: PropTypes.number.isRequired,
};

export default RegisterPanel;
