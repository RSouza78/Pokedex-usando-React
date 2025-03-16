import { useState } from "react";
import styled from "styled-components";

const ErrorMessage = styled.p`
  text-transform: uppercase;
  color: red;
  font-size: 14px;
  font-weight: bold;
`;

function InputSearch({ onSearch }) {
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  function handleSearch() {
    if (search.trim() !== "") {
      onSearch(search, setError);
    }
  }

  function handleKeyPress(event) {
    if (event.key === "Enter") {
      handleSearch();
    }
  }

  return (
    <div>
      <Input
        type="text"
        placeholder="Digite o nome do Pokémon..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={handleKeyPress}
      />
      <Button onClick={handleSearch}>Procurar</Button>

      {error && <ErrorMessage>{error}</ErrorMessage>}
    </div>
  );
}

const Input = styled.input`
  padding: 10px;
  border: solid #FF4500 2px;
  border-radius: 8px;
  font-size: 16px;
  outline: none;
  transition: 0.3s;
  width: 200px;

  &:focus {
    border-color: #FF0000;
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 8px;
  }
`;

const Button = styled.button`
  padding: 10px 15px;
  background-color: #FF4500;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.3s;
  margin-left: 10px;

  &:hover {
    background-color: #FFDAB9;
    color: black;
  }

  @media (max-width: 768px) {
    margin-left: 0;
    width: 100%;
    margin-top: 10px;
  }
`;

export default InputSearch;
