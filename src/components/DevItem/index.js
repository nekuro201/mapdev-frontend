import React, {useState} from 'react';

import './styles.css';

import dropx from '../../images/dropx.png';

function DevItem({onSubmit, dev}){

  const [github_username] = useState(`${dev.github_username}`);

  async function dropDev(){
    await onSubmit({
      github_username,
    });
  }

  return(
    <li className="dev-item">
      <header>
        <img className="perfil-img" src={dev.avatar_url} alt={dev.name}/>
        <div className="user-info">
          <strong>{dev.name}</strong>
          <span>{dev.techs.join(', ')}</span>
        </div>
        <div className="absolute-drop">
          <button onClick={() => dropDev()}> <img className="imageDrop" src={dropx} alt="delete"/> </button>
        </div>
      </header>
      <p>{dev.bio}</p>
      <a href={`https://github.com/${dev.github_username}`}>Acessar perfil no Github</a>
    </li>
  );
}

export default DevItem;