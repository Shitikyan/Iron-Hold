"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

import styles from "./page.module.css";

enum FormTypes {
  login = "login",
  forgot_pass = "forgot_pass",
}

function Home() {
  const router = useRouter();
  const [checked, setChecked] = useState<boolean>(true);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [formName, setFormName] = useState<string>("Login");
  const [formType, setFormType] = useState<string>("login");
  const [animatedForm, setAnimatedForm] = useState<string>("");

  const animateForm = () => {
    setAnimatedForm(styles.animatedForm);

    setTimeout(() => {
      setAnimatedForm("");
    }, 1000);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(true);
    try {
      const payload = {
        username: email,
        password: password,
        rememberMe: checked,
      };

      if (formType === FormTypes.login) {
        const res = await axios.post("/api/auth/login", payload);
        console.log(res);

        router.push("/dashboard");
      } else if (formType === FormTypes.forgot_pass) {
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    setError(false);
  }, [password, email]);

  return (
    <div className={styles.container}>
      <form
        onSubmit={handleSubmit}
        className={`${styles.form} ${animatedForm}`}
      >
        <label htmlFor="login" className={styles.label}>
          {formName}
        </label>
        {formType === FormTypes.forgot_pass && (
          <p className={styles.password_text}>
            Please enter your username and client key. Instructions on how to
            reset your password will be sent on email.
          </p>
        )}
        {error && (
          <div className={styles.error}>
            <span className={styles.errorIcon} />
            {formType === FormTypes.login
              ? "Error occurred. -1:"
              : " Invalid username or client key"}
          </div>
        )}
        <div className={styles.inputContainer}>
          <input
            type="text"
            name="email"
            id="email"
            className={styles.input}
            required
            placeholder="email"
            value={email}
            onChange={(ev) => {
              setEmail(ev.target.value);
            }}
          />

          {formType === FormTypes.login && (
            <input
              type="password"
              name="password"
              id="password"
              className={styles.input}
              required
              placeholder="password"
              value={password}
              onChange={(ev) => {
                setPassword(ev.target.value);
              }}
            />
          )}

          <input
            type="text"
            name="demo"
            id="demo"
            className={styles.input}
            placeholder="DEMO"
            disabled
          />
        </div>
        <div className={styles.checkboxRow}>
          <div
            className={styles.checkbox}
            onClick={(e) => {
              e.preventDefault();
              setChecked((prev) => !prev);
            }}
          >
            {formType === FormTypes.login && (
              <label className={styles.checkboxText} htmlFor="rememberMe">
                <div className={styles.customCheck}>
                  <input
                    style={{ display: "none" }}
                    type="checkbox"
                    id="rememberMe"
                    name="rememberMe"
                    checked={checked}
                    onChange={() => {}}
                  />
                  <span
                    className={`${styles.customIcon} ${
                      checked ? styles.checkedCustom : ""
                    }`}
                  />
                </div>
                Remember Me
              </label>
            )}
          </div>
          <button type="submit" className={styles.button}>
            Submit
          </button>
        </div>

        <div className={styles.footer}>
          {formType === FormTypes.forgot_pass && (
            <button
              type="button"
              onClick={() => {
                animateForm();
                setFormName("Login");
                setFormType(FormTypes.login);
              }}
              className={styles.forgotPassword}
            >
              &lt; Back to login
            </button>
          )}
          {formType === FormTypes.login && (
            <>
              <span className={styles.forgotPassword}>© 2023 Reqo, Inc.</span>
              <button
                type="button"
                onClick={() => {
                  animateForm();
                  setFormName("Retrieve Password");
                  setFormType(FormTypes.forgot_pass);
                }}
                className={styles.forgotPassword}
              >
                Forgot password?
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
}

export default Home;
