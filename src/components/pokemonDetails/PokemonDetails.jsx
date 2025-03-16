import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";

function PokemonDetails() {
    const { name } = useParams();
    const [pokemon, setPokemon] = useState(null);
    const [abilities, setAbilities] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
            .then((res) => res.json())
            .then((data) => {
                setPokemon(data);

                const abilityPromises = data.abilities.map((a) =>
                    fetch(a.ability.url).then((res) => res.json())
                );

                Promise.all(abilityPromises).then((abilityDetails) => {
                    setAbilities(
                        abilityDetails.map((ability) => {
                            const ptDesc = ability.flavor_text_entries.find(
                                (entry) => entry.language.name === "pt"
                            );
                            const enDesc = ability.flavor_text_entries.find(
                                (entry) => entry.language.name === "en"
                            );

                            return {
                                name: ability.name,
                                description: ptDesc
                                    ? ptDesc.flavor_text
                                    : enDesc
                                        ? enDesc.flavor_text
                                        : "Descrição não encontrada.",
                            };
                        })
                    );
                });

                setLoading(false);
            })
            .catch((err) => console.error("Erro ao buscar detalhes do Pokémon", err));
    }, [name]);

    if (loading) return <PokedexContainer><h2>Carregando...</h2></PokedexContainer>;
    if (!pokemon) return <PokedexContainer><h2>Pokémon não encontrado.</h2></PokedexContainer>;

    return (
        <PokedexContainer>
            <PokedexScreen>
                <PokemonName>{pokemon.name.toUpperCase()}</PokemonName>

                <PokemonContent>
                    <LeftColumn>
                        <PokemonImage>
                            <div>
                                <p>Normal</p>
                                <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                            </div>
                            <div>
                                <p>Shiny</p>
                                <img src={pokemon.sprites.front_shiny} alt={`${pokemon.name} Shiny`} />
                            </div>
                        </PokemonImage>

                        <PokemonInfo>
                            <h2>📋 Informações</h2>
                            <p><strong>ID Pokédex:</strong> {pokemon.id}</p>
                            <p><strong>Altura:</strong> {pokemon.height / 10} m</p>
                            <p><strong>Peso:</strong> {pokemon.weight / 10} kg</p>
                        </PokemonInfo>
                    </LeftColumn>

                    <RightColumn>
                        <PokemonInfo>
                            <h2>🎨 Tipos</h2>
                            <Types>
                                {pokemon.types.map((t, index) => (
                                    <span key={index}>{t.type.name}</span>
                                ))}
                            </Types>
                        </PokemonInfo>

                        <PokemonInfo>
                            <h2>⚡ Habilidades</h2>
                            <Abilities>
                                {abilities.map((ability, index) => (
                                    <li key={index}>
                                        <strong>{ability.name}:</strong> {ability.description}
                                    </li>
                                ))}
                            </Abilities>
                        </PokemonInfo>

                        <PokemonInfo>
                            <h2>🌀 Movimentos</h2>
                            <Moves>
                                {pokemon.moves.slice(0, 10).map((move, index) => (
                                    <span key={index}>{move.move.name}</span>
                                ))}
                            </Moves>
                        </PokemonInfo>
                    </RightColumn>
                </PokemonContent>

                <BackButton to="/">VOLTAR A PAGINA PRINCIPAL</BackButton>
            </PokedexScreen>
        </PokedexContainer>
    );
}


const PokedexContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    flex-direction: column;
`;

const PokedexScreen = styled.div`
    padding: 20px;
    width: 60vw;
    border: 2px solid #FF4500; 
    border-radius: 10px;
    text-align: center;
    box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(5px);
    background-color: rgba(255, 218, 185, 0.3);

    @media (max-width: 768px) {
        width: 80vw;
    }

    @media (max-width: 600px) {
        width: 95vw;
    }
`;

const PokemonName = styled.h1`
    text-align: center;
    color: #FF4500;
    font-size: 30px;
    margin-bottom: 20px;

    @media (max-width: 600px) {
        font-size: 25px;
    }
`;

const PokemonContent = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 10px;
    flex-wrap: wrap;

    @media (max-width: 600px) {
        flex-direction: column;
        align-items: center;
    }
`;

const LeftColumn = styled.div`
    flex: 1;
    text-align: left;
    @media (max-width: 600px) {
        flex: none;
    }
`;

const RightColumn = styled.div`
    flex: 1;
    text-align: left;
    @media (max-width: 600px) {
        flex: none;
    }
`;

const PokemonImage = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    p {
        font-weight: bold;
        text-transform: uppercase;
        color: #FF4500;
        text-align: center;
    }

    img {
        height: 150px;
        transition: transform 0.5s ease-in-out;

        &:hover {
            transform: scale(1.6);
        }
    }
`;

const PokemonInfo = styled.div`
    background-color: #FFF5E1;
    border: 2px solid #FF4500;
    border-radius: 10px;
    padding: 10px;
    margin: 5px 0;
`;

const Types = styled.div`
    display: flex;
    gap: 10px;
    flex-wrap: wrap;

    span {
        background-color: #FF4500;
        color: white;
        padding: 5px 10px;
        border-radius: 10px;
        font-weight: bold;
        text-transform: uppercase;
    }
`;

const Abilities = styled.ul`
    list-style: none;
    padding: 0;

    li {
        background-color: #FFDAB9;
        border-radius: 10px;
        padding: 10px;
        margin: 5px 0;
        font-weight: bold;
    }
`;

const Moves = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 5px;

    span {
        background-color: #FF4500;
        color: white;
        padding: 5px 10px;
        border-radius: 10px;
        font-weight: bold;
        text-transform: uppercase;
    }
`;

const BackButton = styled(Link)`
    display: inline-block;
    background-color: #FF4500;
    color: white;
    padding: 10px 15px;
    border-radius: 10px;
    font-weight: bold;
    text-decoration: none;
    margin-top: 20px;
    transition: 0.3s;

    &:hover {
        color: #ffffff;
        transform: scale(1.05);
        background-color: #FFDAB9;
    }

    @media (max-width: 600px) {
        width: 100%;
        text-align: center;
        padding: 12px;
    }
`;

export default PokemonDetails;
