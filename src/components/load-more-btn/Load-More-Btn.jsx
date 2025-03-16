import styled from "styled-components";

const ButtonLoadMore = ({ onLoadMore }) => {
    return (
        <Button onClick={onLoadMore}>Mostrar mais</Button>
    );
};

const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  color: white;
  border: none;
  cursor: pointer;
  background-color: #FF4500;
  transition: background-color 0.3s ease-in-out;

    &:hover {
        transform: scale(1.02);
        background-color: #FFDAB9;
        color: black;
    }
`

export default ButtonLoadMore;