import React, { useCallback, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useTheme } from '@material-ui/core/styles';
import TabPanel from 'components/routes/Landing/AuthForm/TabPanel';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import { ButtonContainer } from '../../styles';

const newOrg = 'Create new...';
const warningText = 'Warning: This demo version does not secure your data.'
  + ' Please do not put in sensitive information.';

const RegisterPanel = (props) => {
  const theme = useTheme();
  const {
    value, orgs, userApi, userId, orgId,
  } = props;
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [isNewOrg, setIsNewOrg] = useState(false);
  const [newOrgName, setNewOrgName] = useState('');
  const [isSupplier, setIsSupplier] = useState(false);
  const [selectedOrg, setSelectedOrg] = useState(undefined);
  const orgOptions = [{ orgName: newOrg }, ...orgs];

  const history = useHistory();
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === '/' && orgId && userId) {
      history.push('/inventory');
    }
  }, [history, pathname, orgId, userId]);

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

  const handleClick = useCallback(() => {
    if (!username || !email || (!selectedOrg && !newOrgName)) {
      return;
    }
    const org = isNewOrg ? { orgName: newOrgName, isSupplier } : selectedOrg;
    userApi.createUser(username, email, org);
  }, [
    isNewOrg,
    selectedOrg,
    newOrgName,
    isSupplier,
    username,
    email,
    userApi,
  ]);

  return (
    <TabPanel value={value} index={1} dir={theme.direction}>
      <TextField
        id="username"
        label="Username"
        variant="outlined"
        onChange={(e) => setUsername(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        id="email"
        label="Email"
        variant="outlined"
        fullWidth
        onChange={(e) => setEmail(e.target.value)}
        margin="normal"
      />
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
            control={(
              <Checkbox
                color="primary"
                checked={isSupplier}
                onChange={(e) => setIsSupplier(e.target.checked)}
              />
              )}
            label="Are you a supplier?"
          />
        </>
      )}
      <ButtonContainer>
        <Typography variant="body2" color="secondary">
          {warningText}
        </Typography>
      </ButtonContainer>
      <ButtonContainer>
        <Button variant="contained" color="primary" onClick={handleClick}>
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
