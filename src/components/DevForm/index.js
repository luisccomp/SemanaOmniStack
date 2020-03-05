import React, { useState, useEffect } from 'react';

import api from '../../services/api';

import './style.css';


function DevForm(props) {
    const [ github_username, setGithub_username] = useState('');
    const [ techs, setTechs ] = useState('');

    const [ latitude, setLatitude ] = useState('');
    const [ longitude, setLongitude ] = useState('');

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
          // console.log(position);
          const { latitude, longitude } = position.coords;
    
          setLatitude(latitude);
          setLongitude(longitude);
        },
        (err) => {
          console.log(err);
        },
        {
          timeout: 30000
        });
    }, []);

    async function handleAddDev(e) {
        const onSubmit = props.onSubmit;

        e.preventDefault();        

        await onSubmit({
            github_username,
            techs,
            latitude,
            longitude
        });

        // Limpando os campos após preenchê-los.
        setGithub_username('');
        setTechs('');
    }

    return (
        <form onSubmit={handleAddDev}>
          <div className="input-block">
            <label htmlFor="github_username">Usuário do github</label>
            <input id="github_username" name="github_username" required value={github_username} onChange={e => setGithub_username(e.target.value)}/>
          </div>

          <div className="input-block">
            <label htmlFor="techs">Tecnologias</label>
            <input id="techs" name="techs" required value={techs} onChange={e => setTechs(e.target.value)}/>
          </div>

          <div className="input-group">
            <div className="input-block">
              <label htmlFor="latitude">latitude</label>
              <input type="number" name="latitude" id="latitude" required value={latitude} onChange={e => setLatitude(e.target.value)}/>
            </div>

            <div className="input-block">
              <label htmlFor="longitude">Longitude</label>
              <input type="number" name="longitude" id="longitude" required value={longitude} onChange={e => setLongitude(e.target.value)}/>
            </div>
          </div>

          <button type="submit">Salvar</button>
        </form>
    );
}

export default DevForm;
