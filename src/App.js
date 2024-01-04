import "./styles.css";
import { useState } from "react";
import ReloadIcon from "./regenerate.svg";
import OptionsForm from "./OptionsForm";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

export default function App() {
  const [password, setPassword] = useState("");
  const [pwdStr, setPwdStr] = useState("");
  const [parentState, setParentState] = useState("");
  const handleChildData = (dataFromChild) => {
    setParentState(dataFromChild);
  };
  const handlePasswordGeneration = () => {
    p = generatePassword(
      parentState.length,
      parentState.letter,
      parentState.number,
      parentState.symbol
    );
    let e = calculateEntropy(p);
    setPwdStr(printStrength(e));
    setPassword(p);
  };

  function generatePassword(
    strLen,
    includeLetters,
    includeNumbers,
    includeSymbols
  ) {
    strLen = parseInt(strLen);
    const stringLetters =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const stringNumbers = "0123456789";
    const stringSymbols = "!\"#$%&'()+-./:;<=>@[]^_`{}~";

    let characterSets = [];
    if (includeLetters) characterSets.push(stringLetters);
    if (includeNumbers) characterSets.push(stringNumbers);
    if (includeSymbols) characterSets.push(stringSymbols);

    let password = "";
    while (password.length < strLen) {
      const characterSet =
        characterSets[Math.floor(Math.random() * characterSets.length)];
      password += characterSet.charAt(
        Math.floor(Math.random() * characterSet.length)
      );
    }
    return password;
  }

  const stringLetters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const stringNumbers = "0123456789";
  const stringSymbols = "!\"#$%&'()*+,-./:;<=>?@[]^_`{|}~";

  // Calculate password entropy
  function calculateEntropy(password) {
    const length = password.length;
    let hasLowercase = false;
    let hasUppercase = false;
    let hasNumbers = false;
    let hasSymbols = false;

    for (const char of password) {
      if (stringLetters.toLowerCase().includes(char)) {
        hasLowercase = true;
      } else if (stringLetters.toUpperCase().includes(char)) {
        hasUppercase = true;
      } else if (stringNumbers.includes(char)) {
        hasNumbers = true;
      } else if (stringSymbols.includes(char)) {
        hasSymbols = true;
      }
    }

    let r = 1;
    if (hasNumbers) r += 10;
    if (hasLowercase || hasUppercase) r += 26;
    if (hasLowercase && hasUppercase) r += 26; // Add extra for mixed case
    if (hasSymbols) r += 32;

    return Math.log2(r ** length);
  }

  // Print password strength based on entropy
  function printStrength(entropy) {
    if (entropy < 28) {
      return "Password is very weak; might keep out family members";
    } else if (entropy < 35) {
      return "Password is Weak; should keep out most people, often good for desktop login passwords";
    } else if (entropy < 59) {
      return "Password is Reasonable; fairly secure passwords for network and company passwords";
    } else if (entropy < 127) {
      return "Password is Strong; can be good for guarding financial information";
    } else {
      return "Password is Very Strong; often overkill";
    }
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Password Generator</h2>
      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Password"
          aria-label="Password"
          value={password}
          // plaintext
          readOnly={true}
        />
        <Button
          variant="outline-secondary"
          id="regenerate-button"
          disabled={
            !parentState.letter && !parentState.number && !parentState.symbol
          }
          onClick={handlePasswordGeneration}
        >
          <img
            src={ReloadIcon}
            alt="regenerate password"
            onClick={handlePasswordGeneration}
          />
        </Button>{" "}
      </InputGroup>
      {!parentState.letter && !parentState.number && !parentState.symbol ? (
        <Form.Text
          id="passwordHelpBlock"
          muted
          className="mb-3"
          style={{ color: "red" }}
        >
          Select atleast one field to generate a password.
        </Form.Text>
      ) : (
        ""
      )}
      <Form.Text id="passwordHelpBlock" muted className="mb-3">
        {pwdStr}
      </Form.Text>

      {/* regenerate password on click and update in the input field */}
      <OptionsForm handleChildData={handleChildData} />
    </div>
  );
}
