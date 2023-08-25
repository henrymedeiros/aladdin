import React from 'react'

function Button({label, onClick, value, className}) {
    return (
        <button onClick={onClick} value={value} className={className}>{label}</button>
      );
}

export default Button