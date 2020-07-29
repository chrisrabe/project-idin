import React, { useCallback, useState } from 'react';
import { useTheme } from '@material-ui/core/styles';
import TabPanel from 'components/routes/Landing/AuthForm/TabPanel';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { ButtonContainer } from '../../styles';

const newOrg = 'Create new...';

const RegisterPanel = (props) => {
  const theme = useTheme();
  const { value, orgs } = props;
  const [isNewOrg, setIsNewOrg] = useState(false);
  const [newOrgName, setNewOrgName] = useState('');
  const [isSupplier, setIsSupplier] = useState(false);
  const [selectedOrg, setSelectedOrg] = useState(undefined);
  const orgOptions = [{ orgName: newOrg }, ...orgs];

  const handleOrgChange = useCallback((e, org) => {
    if (org) {
      const { orgName } = org;
      setIsNewOrg(orgName === newOrg);
      if (orgName !== newOrg) {
        setSelectedOrg(org);
      }
    }
  }, [setIsNewOrg, setSelectedOrg]);

  const handleOrgNameChange = useCallback((e) => {
    setNewOrgName(e.target.value);
  }, [setNewOrgName]);

  const onRadioSelect = (checked) => {
    setIsSupplier(checked);
  };

  // TODO do this last
  const handleClick = () => {
    if (isNewOrg) {
      // create new user
      // create new org
    } else {
      // extract id from selected org
      // create new user linked to that org
    }
  };

  return (
    <TabPanel value={value} index={1} dir={theme.direction}>
      <TextField id="username" label="Username" variant="outlined" fullWidth margin="normal" />
      <TextField id="email" label="Email" variant="outlined" fullWidth margin="normal" />
      <Autocomplete
        getOptionLabel={(option) => option.orgName}
        onChange={handleOrgChange}
        renderInput={(params) => <TextField {...params} label="Organisation" variant="outlined" margin="normal" />}
        options={orgOptions}
      />
      { isNewOrg && (
        <>
          <TextField id="orgName" label="Company Name" variant="outlined" fullWidth margin="normal" onChange={handleOrgNameChange} />
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
