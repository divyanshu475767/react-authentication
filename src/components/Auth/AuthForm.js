import { useState, useRef,useContext } from "react";
import { useHistory } from "react-router-dom";

import classes from "./AuthForm.module.css";
import userEvent from "@testing-library/user-event";
import AuthContext from "../../store/auth-context";

const AuthForm = () => {
  const history = useHistory();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const authCtx = useContext(AuthContext);

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading , setIsLoading] = useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    setIsLoading(true);

    let url;
    if (isLogin) {


  url =  "https://identitytoolkit.googleleapis.com/v1/accounts:signup/key=abcdefghijklmnopqrstuvwxyz";



    } else {

      url =  "https://identitytoolkit.googleleapis.com/v1/accounts:signup/key=abcdefghijklmnopqrstuvwxyz";
     
    }

    fetch(
     url,
      {
        method: "POST",
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        }),
        headers: {
          "content-type": "application/json",
        },
      }
    ).then((res) => {
      setIsLoading(false)
      if (res.ok) {
        res.json();
        return;
      } else {
        return res.json().then((data) => {
        let errorMessage = ' authentication failed';

        if(dara && data.error && data.error.message){
        errorMessage = data.error.message;
          }

          throw new Error(errorMessage);

        });
      }
    })
    .then(data=>{
        authCtx.login(data.idtoken);
        history.replace('/');

    })
    .catch((err)=>{
      alert(errorMessage);

    })
  };
  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.actions}>
          {!isLoading && <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
          }
          {isLoading && <p>Sending request buddy</p>}
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
