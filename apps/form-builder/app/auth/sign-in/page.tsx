import React from 'react';

import { BRAND_NAME } from '@/constants/branding';

import { SignInForm } from '@/modules/auth/sign-in-form';

export const metadata = {
  title: `Sign In | ${BRAND_NAME}`,
};

const LoginPage = () => {
  return <SignInForm />;
};

export default LoginPage;
