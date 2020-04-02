import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns'
import NotefulContext from '../NotefulContext.js'
//import NoteItem from '../NoteItem/NoteItem';
import './NoteList.css'


//const moment = require('moment');

class NoteList extends Component {
  static contextType = NotefulContext;
   
  render() {
    const notesObj = this.context.notes.notes;
    const { folderSelected } = this.context;
    let selectedNotesObj={};
    let folderToGoBackTo = '';
    //note.modified.toLocaleDateString()
     if (folderSelected==='All'){
        selectedNotesObj=notesObj;
        folderToGoBackTo = 'All';
     }
     else{
        selectedNotesObj = notesObj.filter(note=>note.folderId===folderSelected);
        
     }

    return (
      <section className='NoteList'>
        <h2>Notes</h2>
        <ul>
        {selectedNotesObj.map(note =>
          <li key={note.id} className="NoteList__note-item note-item">    
            <div className="NoteList__note-item-info ">
                <h3>
                    <Link to={`/note/${note.id}`}
                        onClick={() => this.context.handleNoteSelected('note', note.folderId, folderToGoBackTo)}> 
                        {note.name}

                    </Link>
                </h3>
                <p>Date modified {format(new Date(note.modified), 'MMM yyyy')}</p>
            </div>
            <button className="NoteList__button delete_button">Delete</button>
          </li>
        )}
        </ul>
        <button className="NoteList__button add_note">Add Note</button>
      </section>
    );
  }
}

NoteList.defaultProps = {
    notes: []
  };

export default NoteList;
