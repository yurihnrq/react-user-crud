import React from 'react';
import Layout from '../components/Layout';
import SignupForm from '../components/SignupForm';

const Signup: React.FC = () => {
  return (
    <Layout width={600}>
      <SignupForm />
    </Layout>
  );
};

export default Signup;
