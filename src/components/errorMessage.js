import React from 'react';

export default function errorMessage({ error }) {
  if (error) {
    switch (error.type) {
      case 'required':
        return <p>This is required</p>;
      case 'minLength':
        return <p>Your name need minmium 5 characters</p>;
      case 'min':
        return <p>Age must be over 17</p>;
      case 'validate':
        return <p>Name is already used</p>;
      default:
        return null;
    }
  }

  return null;
}
