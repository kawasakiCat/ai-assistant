import React from "react";
import Navigation from "../components/Navigation/Navigation";
import SignupForm from "../features/auth/components/SignupForm";

const SignupPage = () => {
  return (
    <div>
      <Navigation />
      <h1>新規登録</h1>
      <SignupForm />
    </div>
  );
};

export default SignupPage;
