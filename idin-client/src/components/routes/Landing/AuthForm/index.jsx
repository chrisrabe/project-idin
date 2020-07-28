import React from 'react';
import styled from 'styled-components';
import SwipeableViews from 'react-swipeable-views';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { useTheme } from '@material-ui/core/styles';
import RegisterPanel from 'components/routes/Landing/AuthForm/RegisterPanel/container';
import SignInPanel from './SignInPanel/container';

const MainForm = styled.div`
  background-color: white;
  width: 500px;
  height: 600px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
`;

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const SignInForm = () => {
  const [value, setValue] = React.useState(0);
  const theme = useTheme();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <MainForm>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        variant="fullWidth"
      >
        <Tab label="Sign in" {...a11yProps(0)} />
        <Tab label="Register" {...a11yProps(1)} />
      </Tabs>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <SignInPanel value={value} />
        <RegisterPanel value={value} />
      </SwipeableViews>
    </MainForm>
  );
};

export default SignInForm;
