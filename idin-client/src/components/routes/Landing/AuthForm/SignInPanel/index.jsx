import React, { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useTheme } from '@material-ui/core/styles';
import TabPanel from 'components/routes/Landing/AuthForm/TabPanel';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import styled from 'styled-components';
import { ButtonContainer } from '../../styles';

const DemoTextContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SignInPanel = (props) => {
  const { value, users, homeActions } = props;
  const [username, setUsername] = useState();
  const theme = useTheme();
  const history = useHistory();

  const onSignIn = useCallback(() => {
    const validUsers = users.filter((user) => user.username === username);
    if (validUsers.length > 0) {
      const user = validUsers[0];
      homeActions.signIn(user.id, user.organisationId);
      history.push('/inventory');
    }
  }, [username, users, homeActions, history]);

  const demoMessage = 'Log in as "chris" or "jacq" to view demo account';

  return (
    <TabPanel value={value} index={0} dir={theme.direction}>
      <Grid container alignItems="center" justify="center">
        <TextField
          id="username"
          label="Username"
          variant="outlined"
          fullWidth
          onChange={(e) => setUsername(e.target.value)}
        />
        <ButtonContainer>
          <Button variant="contained" color="primary" onClick={onSignIn}>
            Sign in
          </Button>
        </ButtonContainer>
      </Grid>
      <DemoTextContainer>
        <Typography variant="body2">{demoMessage}</Typography>
      </DemoTextContainer>
    </TabPanel>
  );
};

SignInPanel.propTypes = {
  value: PropTypes.number.isRequired,
};

export default SignInPanel;
