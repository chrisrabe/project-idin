import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import TabPanel from 'components/routes/Landing/AuthForm/TabPanel';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { ButtonContainer } from '../../styles';

const SignInPanel = (props) => {
  const { value } = props;
  const theme = useTheme();
  return (
    <TabPanel value={value} index={0} dir={theme.direction}>
      <Grid container alignItems="center" justify="center">
        <TextField id="username" label="Username" variant="outlined" fullWidth />
        <ButtonContainer>
          <Button variant="contained" color="primary">
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
