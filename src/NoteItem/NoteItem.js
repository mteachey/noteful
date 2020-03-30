import React from 'react';
import { format } from 'date-fns'
import './NoteItem.css';


export default function NoteItem(props) {
   
       const notesObj = props.notes.notes;
       
       const notesItem = notesObj.find(n =>
           n.id === props.noteIdMatch.noteId
         )

        return (
          <section className='NoteItem__note-item'>
            <div className="note-item">
                <div>
                    <h2>{notesItem.name}</h2>
                    <p>{format(new Date(notesItem.modified), 'MMM yyyy')}
                    </p>
                </div>
                <button className="delete_button">Delete Note</button>
            </div>
            <p>{notesItem.content}</p>
          </section>
        );

}



