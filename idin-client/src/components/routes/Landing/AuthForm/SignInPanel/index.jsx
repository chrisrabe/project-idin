import React, { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useTheme } from '@material-ui/core/styles';
import TabPanel from 'components/routes/Landing/AuthForm/TabPanel';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { ButtonContainer } from '../../styles';

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
    </TabPanel>
  );
};

SignInPanel.propTypes = {
  value: PropTypes.number.isRequired,
};

export default SignInPanel;
