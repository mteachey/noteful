import React from 'react';
//import { format } from 'date-fns'
import './DeleteButton.css';
import NotefulContext from '../NotefulContext.js';


function deleteNoteRequest(noteId, callback){
  fetch(`http://localhost:9090/notes/${noteId}`, {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json'
    },
  })
    .then(res => {
      if (!res.ok) {
        // get the error message from the response,
        return res.json().then(error => {
          // then throw it
          throw error
        })
      }
      return res.json()
    })
    .then(data => {
      // call the callback when the request is successful
      // this is where the App component can remove it from state      
      callback(noteId)
    })
    .catch(error => {
      console.error(error)
    })
}

export default function DeleteButton(props) {
    return (
    <NotefulContext.Consumer>
        {(context) => (
            <button className="delete_button"
                onClick={() => {
                deleteNoteRequest(
                props.noteId,
                context.deleteNote);
                props.push('/');
                
                }}>
                Delete Note 
            </button>
        )}
    </NotefulContext.Consumer>   
    )}