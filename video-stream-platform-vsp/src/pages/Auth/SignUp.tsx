import { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import PageLayout from "../PageLayout/PageLayout";

import { userRegistration, UserRegistrationProps } from "../../API";

const SignUp = () => {
  const [userName, setUserName] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");

  //to show loading state

  const [loading, setLoading] = useState(false);

  const onSubmitUserRegistration = async (e: any) => {
    e.preventDefault();

    setLoading(true);

    try {
      const payload: UserRegistrationProps = {
        name: userName,
        email: userEmail,
        password: userPassword,
      };

      const res = await userRegistration(payload);

      if (res) {
        toast.success("Your account has created successfully", {
          position: toast.POSITION.TOP_RIGHT,
        });

        setUserName("");
        setUserEmail("");
        setUserPassword("");
        setLoading(false);
      }
    } catch (error: any) {
      toast.error(error.response && error.response.data.error, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setLoading(false);
    }
  };

  return (
    <PageLayout>
      <div className="container">
        <div className="row justify-content-center align-items-center">
          <div className="col-lg-4 col-md-12 col-sm-12">
            <div className="form-design card">
              <form>
                <div className="text-center">
                  <h5 className="text-center">Create Your Account</h5>
                </div>

                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Your Name..*"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Your E-mail..*"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password*"
                    value={userPassword}
                    onChange={(e) => setUserPassword(e.target.value)}
                  />
                </div>

                <div className="form-group justify-content-center align-items-center">
                  <button
                    type="submit"
                    name="btnSubmit"
                    className="btnContact"
                    onClick={(e) => onSubmitUserRegistration(e)}
                  >
                    {loading ? "Loading.." : "Sign Up"}
                  </button>
                </div>
                <div className="text-center form-bottom-title">
                  <Link to={"/signin"} style={{ textDecoration: "none" }}>
                    <p>Already have an account? Sign In</p>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
        <ToastContainer autoClose={8000} />
      </div>
    </PageLayout>
  );
};

export default SignUp;
