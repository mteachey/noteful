import React from 'react';
import './DeleteButton.css';
import NotefulContext from '../NotefulContext.js';
import config from '../config.js'


function deleteNoteRequest(noteId, callback){
    
    let error = null;
    fetch(`${config.API_ENDPOINT}api/notes/${noteId}`,{
    method: 'DELETE',
    headers: {
      'content-type': 'application/json',
      'Authorization': `Bearer ${config.API_KEY}`
    },
  })
    .then(res => {
      if (!res.ok) {
        // get the error message from the response,
        return res.json().then(error => {
          // then throw it
          throw error
        })
      }//end of if
      return (res=>{
        res.json()})
    })//end of them
    .then(() => {
      // call the callback when the request is successful
      // this is where the App component can remove it from state   
       callback(noteId, error)
    })
    .catch(error => {
       callback(noteId, error)
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