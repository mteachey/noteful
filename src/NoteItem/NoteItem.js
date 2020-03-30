import React from 'react';
import { format } from 'date-fns'
import './NoteItem.css';


export default function NoteItem(props) {
   
       const notesObj = props.notes.notes;
       
       const notesItem = notesObj.find(n =>
           n.id === props.noteIdMatch.noteId
         )

        let date="2018-07-12T23:00:00.000Z";
        let newDate=date.slice(0,7);
        console.log(newDate);

        return (
          <section className='NoteItem__note-item'>
            <div className="note-item">
                <div>
                    <h2>{notesItem.name}</h2>
                    <p>{format(new Date(notesItem.modified), 'Do MMM yyyy')}
                    </p>
                </div>
                <button className="delete_button">Delete Note</button>
            </div>
            <p>{notesItem.content}</p>
          </section>
        );

}



