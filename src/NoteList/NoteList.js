import React, { Component } from 'react';
import { Link } from 'react-router-dom';
//import { format } from 'date-fns'
//import NoteItem from '../NoteItem/NoteItem';
import './NoteList.css'


//const moment = require('moment');

class NoteList extends Component {
   
  render() {
    const notesObj = this.props.notes.notes;
    const { folderSelected } = this.props;
    let selectedNotesObj={};
    //note.modified.toLocaleDateString()
     if (folderSelected==='All'){
        selectedNotesObj=notesObj;
     }
     else{
        selectedNotesObj = notesObj.filter(note=>note.folderId===folderSelected);
     }

    return (
      <section className='NoteList'>
        <h2>Notes</h2>
        <ul>
        {selectedNotesObj.map(note =>
          <li key={note.id} className="NoteList__note-item">      
            <h3>
                <Link to={`/note/${note.id}`}
                     onClick={() => this.props.handleNoteSelected('note', note.folderId)}> 
                     {note.name}

                 </Link>
            </h3>
            <p>Date modified {note.modified}
              </p>
          </li>
        )}
        </ul>
        <button className="add_note">Add Note</button>
      </section>
    );
  }
}

NoteList.defaultProps = {
    notes: []
  };

export default NoteList;
