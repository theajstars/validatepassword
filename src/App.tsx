import { useEffect, useState } from "react";

import { motion } from "framer-motion";

import "./Assets/CSS/Default.css";

export default function App() {
  const [currentTime, setCurrentTime] = useState<string>("");
  const [passwordStrength, setPasswordStrength] = useState<number>(0);
  const [passwordParams, setPasswordParams] = useState<{
    width: number;
    color: string;
  }>({ width: 0, color: "#A8A8A8" });

  const [passwordFeedbackText, setPasswordFeedbackText] = useState<string>(
    "Enter a password..."
  );

  const getCurrentTime = () => {
    const d = new Date(Date.now());
    const hours = d.getHours();
    const minutes = d.getMinutes();
    return `${hours < 10 ? `0${hours}` : hours}:${
      minutes < 10 ? `0${minutes}` : minutes
    } ${hours <= 12 ? "AM" : "PM"}`;
  };
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(getCurrentTime());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const [passwordOne, setPasswordOne] = useState<string>("");
  const [passwordTwo, setPasswordTwo] = useState<string>("");

  const [IsPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  useEffect(() => {
    //Regexp to check if password contains at least 8 characters
    const hasEightCharacters = /.{8,}/;
    //Regexp to check if password contains at least one number
    const hasNumber = /\d/;
    //Regexp to check if password contains at least one special character
    const hasSpecialCharacter = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    //Regexp to check if password contains at least one uppercase letter
    const hasUppercaseLetter = /[A-Z]/;
    //Regexp to check if password contains at least one lowercase letter
    const hasLowercaseLetter = /[a-z]/;

    const doesPasswordContainAtLeastOneCharacter =
      hasEightCharacters.test(passwordOne);
    const doesPasswordContainAtLeastOneNumber = hasNumber.test(passwordOne);
    const doesPasswordContainAtLeastOneSpecialCharacter =
      hasSpecialCharacter.test(passwordOne);
    const doesPasswordContainAtLeastOneUppercaseLetter =
      hasUppercaseLetter.test(passwordOne);
    const doesPasswordContainAtLeastOneLowercaseLetter =
      hasLowercaseLetter.test(passwordOne);

    setPasswordStrength(0);
    doesPasswordContainAtLeastOneCharacter &&
      setPasswordStrength((prevStrength) => prevStrength + 20);
    doesPasswordContainAtLeastOneNumber &&
      setPasswordStrength((prevStrength) => prevStrength + 20);
    doesPasswordContainAtLeastOneSpecialCharacter &&
      setPasswordStrength((prevStrength) => prevStrength + 20);
    doesPasswordContainAtLeastOneUppercaseLetter &&
      setPasswordStrength((prevStrength) => prevStrength + 20);
    doesPasswordContainAtLeastOneLowercaseLetter &&
      setPasswordStrength((prevStrength) => prevStrength + 20);

    const isPasswordOneFullyValid =
      hasEightCharacters.test(passwordOne) && //At least 8 characters
      hasNumber.test(passwordOne) && //At least one number
      hasSpecialCharacter.test(passwordOne) && //At least one special character
      hasUppercaseLetter.test(passwordOne) && //At least one uppercase letter
      hasLowercaseLetter.test(passwordOne); //At least one lowercase letter

    const isPasswordTwoFullyValid =
      hasEightCharacters.test(passwordTwo) && //At least 8 characters
      hasNumber.test(passwordTwo) && //At least one number
      hasSpecialCharacter.test(passwordTwo) && //At least one special character
      hasUppercaseLetter.test(passwordTwo) && //At least one uppercase letter
      hasLowercaseLetter.test(passwordTwo); //At least one lowercase letter

    if (passwordOne.length === 0) {
      setPasswordFeedbackText("Enter a password...");
    } else {
      if (!isPasswordOneFullyValid) {
        if (!hasEightCharacters.test(passwordOne)) {
          setPasswordFeedbackText("At least 8 characters!");
        } else if (!hasNumber.test(passwordOne)) {
          setPasswordFeedbackText("At least one number!");
        } else if (!hasSpecialCharacter.test(passwordOne)) {
          setPasswordFeedbackText("At least one special character!");
        } else if (!hasUppercaseLetter.test(passwordOne)) {
          setPasswordFeedbackText("At least one uppercase letter!");
        }
      } else {
        if (passwordTwo.length === 0) {
          setPasswordFeedbackText("Please confirm password...");
        } else {
          if (passwordOne !== passwordTwo) {
            setPasswordFeedbackText("Passwords do not match!");
          } else {
            setPasswordFeedbackText("");
          }
        }
      }
    }
  }, [passwordOne, passwordTwo]);

  useEffect(() => {
    if (passwordOne.length > 0) {
      switch (passwordStrength) {
        case 20:
          setPasswordParams({ width: 20, color: "#A8A8A8" });
          break;
        case 40:
          setPasswordParams({ width: 40, color: "#E13B30" });
          break;
        case 60:
          setPasswordParams({ width: 60, color: "#E4800A" });
          break;
        case 80:
          setPasswordParams({ width: 80, color: "#528DE5" });
          break;
        case 100:
          setPasswordParams({ width: 100, color: "#2CE782" });
          break;
      }
    } else {
      setPasswordParams({ width: 10, color: "#A8A8A8" });
    }
  }, [passwordStrength]);

  const [completed, setCompleted] = useState<boolean>(false);
  const [isRedirecting, setIsRedirecting] = useState<boolean>(false);
  const [redirectCount, setRedirectCount] = useState<number>(5);
  const [redirectAnimationWidth, setRedirectAnimationWidth] =
    useState<number>(100);

  useEffect(() => {
    if (isRedirecting) {
      const RedirectOne = setInterval(() => {
        setRedirectAnimationWidth((prevCount) => prevCount - 0.5);
      }, 25);
      const RedirectTwo = setInterval(() => {
        setRedirectCount((prevCount) => prevCount - 1);
      }, 1000);
      //Set the intervals above to variables and clear then if isRedirecting is false
      return () => {
        clearInterval(RedirectOne);
        clearInterval(RedirectTwo);
      };
    } else {
      setRedirectAnimationWidth(100);
      setRedirectCount(5);
    }
  }, [isRedirecting]);
  useEffect(() => {
    if (redirectCount === 0) {
      window.location.href = "https://theajstars.com";
    }
  }, [redirectCount]);

  return (
    <div className="page-container flex-row">
      <motion.div
        initial={false}
        animate={{
          right: completed ? "10px" : "-500px",
        }}
        className="alert-container flex-column"
      >
        <div className="alert-header flex-row">
          <span className="alert-icon">
            <i className="far fa-check"></i>
          </span>
          Thank You!
        </div>
        <motion.div
          initial={false}
          animate={{ width: redirectAnimationWidth + "%" }}
          className="alert-progress"
        ></motion.div>
        <span className="alert-text">Redirecting in {redirectCount}s</span>
        <span
          className="cancel-redirect flex-row"
          onClick={() => {
            setIsRedirecting(false);
            setCompleted(false);
            setPasswordOne("");
            setPasswordTwo("");
          }}
        >
          <i className="far fa-times"></i>&nbsp; Cancel
        </span>
      </motion.div>
      <div className="mobile-container flex-row">
        <div className="mobile-device flex-column">
          <div className="mobile-device-header flex-row">
            <span className="time">{currentTime}</span>
            <span className="camera-container flex-row">
              <span className="camera-content"></span>
            </span>
          </div>

          <div className="mobile-device-content flex-column">
            <span className="form-header">
              <i className="far fa-fingerprint"></i>&nbsp; Password Validator
            </span>

            <div className="form-input-container flex-row">
              <input
                type={IsPasswordVisible ? "text" : "password"}
                placeholder="Password"
                className="form-input"
                value={passwordOne}
                onChange={(e) => {
                  setPasswordOne(e.target.value);
                }}
              />
              <span
                className="toggle-password-visibility"
                onClick={() => {
                  setIsPasswordVisible(!IsPasswordVisible);
                }}
              >
                {IsPasswordVisible ? (
                  <i className="far fa-eye"></i>
                ) : (
                  <i className="far fa-eye-slash"></i>
                )}
              </span>
            </div>
            <div className="form-input-container flex-row">
              <input
                type={IsPasswordVisible ? "text" : "password"}
                placeholder="Confirm Password"
                className="form-input"
                onChange={(e) => {
                  setPasswordTwo(e.target.value);
                }}
                value={passwordTwo}
              />
              <span
                className="toggle-password-visibility"
                onClick={() => {
                  setIsPasswordVisible(!IsPasswordVisible);
                }}
              >
                {IsPasswordVisible ? (
                  <i className="far fa-eye"></i>
                ) : (
                  <i className="far fa-eye-slash"></i>
                )}
              </span>
            </div>

            <motion.div
              initial={false}
              animate={{
                width: `${passwordParams.width}%`,
                backgroundColor: passwordParams.color,
              }}
              className="password-progress-bar"
            ></motion.div>

            <span
              className={`${
                passwordFeedbackText.length > 0
                  ? "password-warning-text"
                  : "password-success-text"
              }`}
            >
              {passwordFeedbackText.length > 0 ? (
                <span>{passwordFeedbackText}</span>
              ) : (
                <span>Your password is valid!</span>
              )}
            </span>
            <button
              className="form-button"
              disabled={passwordFeedbackText.length > 0}
              onClick={() => {
                setIsRedirecting(true);
                setCompleted(true);
              }}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
