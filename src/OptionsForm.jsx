import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useEffect, useState } from "react";

export default function OptionsForm({ handleChildData }) {
  const [selected, setSelected] = useState({
    length: 16,
    letter: true,
    number: false,
    symbol: false,
  });
  useEffect(() => {
    handleChildData(selected);
  }, [selected]);
  const handleChangeLetterSelected = () => {
    setSelected({
      ...selected,
      letter: !selected.letter,
    });
  };
  const handleChangeNumberSelected = () => {
    setSelected({
      ...selected,
      number: !selected.number,
    });
  };

  const handleChangeSymbolSelected = () => {
    setSelected({
      ...selected,
      symbol: !selected.symbol,
    });
  };
  const handleChangeLength = (e) => {
    setSelected({
      ...selected,
      length: e.target.value,
    });
  };

  return (
    <Form>
      <InputGroup className="mb-3">
        <InputGroup.Text id="length">Length</InputGroup.Text>
        <Form.Control
          placeholder="16"
          aria-label="PasswordLength"
          value={selected.length}
          onChange={handleChangeLength}
        />
      </InputGroup>
      <div key={`inline-checkbox`} className="mb-3">
        <Form.Check
          inline
          checked={selected.letter}
          onChange={handleChangeLetterSelected}
          type="checkbox"
          id={`inline-checkbox-letter`}
          label={`Letters (eg: Aa)`}
        />
        <Form.Check
          inline
          type="checkbox"
          checked={selected.number}
          onChange={handleChangeNumberSelected}
          id={`inline-checkbox-number`}
          label={`Numbers (eg: 12)`}
        />
        <Form.Check
          inline
          type="checkbox"
          checked={selected.symbol}
          onChange={handleChangeSymbolSelected}
          id={`inline-checkbox-symbol`}
          label={`Symbols (eg: #$)`}
        />
      </div>
    </Form>
  );
}
