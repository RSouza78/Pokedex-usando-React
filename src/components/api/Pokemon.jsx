import React, { useState, useEffect } from 'react';

const Pokemon = ({ pokemonName }) => {
  const [pokemonData, setPokemonData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`;
    const fetchPokemonData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Pokémon não encontrado');
        }
        const data = await response.json();
        setPokemonData(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchPokemonData();
  }, [pokemonName]);
  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Erro: {error}</div>;

  return (
    <div>
      <h2>{pokemonData.name}</h2>
      <img
        src={pokemonData.sprites.front_default}
        alt={pokemonData.name}
        width="200"
      />
      <ul>
        <li>Altura: {pokemonData.height}</li>
        <li>Peso: {pokemonData.weight}</li>
        <li>Habilidades:</li>
        <ul>
          {pokemonData.abilities.map((ability, index) => (
            <li key={index}>{ability.ability.name}</li>
          ))}
        </ul>
      </ul>
    </div>
  );
};

export default Pokemon;
