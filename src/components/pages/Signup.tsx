import React from "react";
import PageContent from "../Shared/PageContent";
import Signup from "../Login/Signup";

const SignupPage: React.FC = () => {
  return (
    <PageContent title="Sign Up">
      <Signup />
    </PageContent>
  );
};

export default SignupPage;