import React from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { sendCode } from "../api/login";

const Redirect = () => {
  const navigate = useNavigate();

  const sendCodeMutation = useMutation(sendCode, {
    onError: (err) => {
      toast.error("Error logging in..");
      console.error(err);
      navigate("/");
    },
  });

  React.useEffect(() => {
    // Get 'code' query parameter from URL
    const code = new URLSearchParams(window.location.search).get("code");

    if (!code) return navigate("/");

    // Send request to backend to exchange code for access token

    sendCodeMutation.mutate(code);
  }, []);

  return <div>Loading...</div>;
};

export default Redirect;
