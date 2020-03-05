// Sempre importar o REACT se o arquivo for utilizar HTML dentro de um código
// javascript.
import React from 'react';


function Header(props) {
    return (
      <h1>{props.title}</h1>
    );
}

export default Header;
