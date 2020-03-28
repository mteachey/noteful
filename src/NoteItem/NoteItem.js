import React from 'react';
import './NoteItem.css';


export default function NoteItem(props) {
   
        const notesObj = props.notes.notes;
       
       const notesItem = notesObj.find(n =>
           n.id === props.noteIdMatch.noteId
         )

        return (
          <section className='NoteItem'>
            <h2>{notesItem.name}</h2>
            <p>{notesItem.content}</p>
          </section>
        );

}



