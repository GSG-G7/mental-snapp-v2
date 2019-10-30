import React from 'react';
import { Button, Input } from 'antd';
import MainHeading from '../../components/MainHeading';

const SignIn = () => {
  return (
    <div>
      <MainHeading text="Sign In" />
      <form>
        <Input type="email" className="sign-in__email-input" placeholder="" />
        <Input type="password" className="sign-in__password-input" />
        <Button>Sign In</Button>
      </form>
    </div>
  );
};

export default SignIn;
