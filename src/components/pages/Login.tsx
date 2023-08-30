import React from "react";
import PageContent from "../Shared/PageContent";
import Login from "../Login/Login";

const LoginPage: React.FC = () => {
  return (
    <PageContent title="Login">
      <Login />
    </PageContent>
  );
};

export default LoginPage;