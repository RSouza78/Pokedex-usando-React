import { useState, useEffect } from "react";
import ButtonLoadMore from "../load-more-btn/Load-More-Btn";
import styled from "styled-components";
import { Link } from "react-router-dom";
import InputSearch from "../inputSearch/InputSearch";

function ApiConsult() {
    const [pokemon, setPokemon] = useState([]);
    const [limit, setLimit] = useState(10);
    const [types, setTypes] = useState([]);
    const [selectedType, setSelectedType] = useState("");

    function loadPokemonTypes() {
        fetch("https://pokeapi.co/api/v2/type")
            .then((response) => response.json())
            .then((data) => setTypes(data.results))
            .catch((error) => console.error("Erro ao buscar tipos", error));
    }

    function loadApiPokemon(searchQuery = "", setError) {
        let url = `https://pokeapi.co/api/v2/pokemon?offset=0&limit=${limit}`;

        if (searchQuery) {
            url = `https://pokeapi.co/api/v2/pokemon/${searchQuery.toLowerCase()}`;
        } else if (selectedType) {
            url = `https://pokeapi.co/api/v2/type/${selectedType}`;
        }

        fetch(url)
            .then((response) => {
                if (!response.ok) throw new Error("Pokémon não encontrado!");
                return response.json();
            })
            .then((data) => {
                if (searchQuery) {
                    setPokemon([data]);
                    setError("");
                } else if (selectedType) {
                    const promises = data.pokemon.slice(0, limit).map((p) =>
                        fetch(p.pokemon.url).then((res) => res.json())
                    );

                    Promise.all(promises).then((details) => setPokemon(details));
                } else {
                    const promises = data.results.map((poke) =>
                        fetch(poke.url).then((res) => res.json())
                    );

                    Promise.all(promises).then((details) => setPokemon(details));
                }
            })
            .catch(() => {
                setError("Pokémon não encontrado!");
                setPokemon([]);
            });
    }

    useEffect(() => {
        loadApiPokemon();
    }, [limit, selectedType]);

    useEffect(() => {
        loadPokemonTypes();
    }, []);

    return (
        <>
            <H1>Bem-vindo à Pokédex!</H1>
            <Div>
                <InputSearch onSearch={loadApiPokemon} />
                <Select onChange={(e) => setSelectedType(e.target.value)}>
                    <option value="">Escolha por tipo</option>
                    {types
                        .filter((type) => type.name !== "unknown" && type.name !== "stellar")
                        .map((type) => (
                            <option key={type.name} value={type.name}>
                                {type.name}
                            </option>
                        ))}
                </Select>
            </Div>
            <PokemonList>
                <Ul>
                    {pokemon.map((poke) => (
                        <Li key={poke.id}>
                            <Link to={`/pokemon/${poke.name}`}>
                                <Img src={poke.sprites.front_default} alt={poke.name} />
                                <P>{poke.name}</P>
                            </Link>
                        </Li>
                    ))}
                </Ul>
            </PokemonList>
            <Section>
                <ButtonLoadMore onLoadMore={() => setLimit(limit + 10)} />
                <p>&copy; Codificado por <strong>Rodrigo Acacio</strong></p>
            </Section>
        </>
    );
}

const H1 = styled.h1`
    margin-top: 0;
    font-family: 'Press Start 2P', cursive;
    font-size: 40px;
    text-align: center;
    color: #FF4500;
    text-shadow: 3px 3px 0px #003a70, 6px 6px 0px #000;
`;

const Div = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    flex-wrap: wrap;
`;

const Select = styled.select`
    padding: 10px 5px;
    font-weight: bold;
    border: 2px solid #FF4500;
    border-radius: 20px;
    cursor: pointer;
    text-transform: capitalize;
    margin: 10px;
`;

const PokemonList = styled.div`
    margin: 20px 50px;
`;

const Ul = styled.ul`
    list-style: none;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 20px;
    justify-content: center;
    padding: 0;

    @media (max-width: 1200px) {
        grid-template-columns: repeat(4, 1fr);
    }

    @media (max-width: 900px) {
        grid-template-columns: repeat(3, 1fr);
    }

    @media (max-width: 600px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 400px) {
        grid-template-columns: 1fr;
    }
`;

const Li = styled.li`
    border: 2px solid #FF4500;
    border-radius: 10px;
    padding: 15px;
    text-align: center;
    transition: transform 0.5s ease-in-out;
    box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(3px);
    background-color: rgba(255, 218, 185, 0.3);

    &:hover {
        transform: scale(1.05);
        background-color: #FFDAB9;
    }

    a {
        text-decoration: none;
    }
`;

const Img = styled.img`
    transition: transform 0.5s ease-in-out;

    &:hover {
     transform: scale(1.4);
    }
`;

const P = styled.p`
    font-weight: bold;
    text-transform: uppercase;
    color: #FF4500;
    margin-top: 5px;

    &:hover {
        color: black;
    }
`;

const Section = styled.section`
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding: 0 39%;
    text-align: center;

    p {
        font-size: 14px;
        color: #FF4500;
        margin-top: 20px;
        font-weight: bold;
        text-transform: uppercase;
    }

    strong {
        color: #000000;
        background-color: #FF4500;
        padding: 2px 8px;
        border-radius: 5px;
        font-size: 16px;
        box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.9);
        transition: all 0.3s ease;
        display: block;
    }

    @media (max-width: 768px) {
        padding: 0 10%;
    }

    @media (max-width: 480px) {
        padding: 0 5%;
    }
`;

export default ApiConsult;