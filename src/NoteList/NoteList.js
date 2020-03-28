import React, { Component } from 'react';
import { Link } from 'react-router-dom'
//import NoteItem from '../NoteItem/NoteItem';
import './NoteList.css'


//const moment = require('moment');

class NoteList extends Component {
   
  render() {
    const notesObj = this.props.notes.notes;
    const { folderSelected } = this.props;
    //.map((file, key) => <ListItem {...file} key={key} />);
    console.log(this.props.notes.folders[1].id);
    let selectedNotesObj={};
     if (folderSelected==='All'){
        selectedNotesObj=notesObj;
     }
     else{
        selectedNotesObj = notesObj.filter(note=>note.folderId===folderSelected);
        console.log(selectedNotesObj);
     }
     

    return (
      <section className='NoteList'>
        <h2>Notes</h2>
        <ul>
        {selectedNotesObj.map(note =>
          <li key={note.id} className="NoteList__note-item">      
            <h3>
                <Link to={`/note/${note.id}`}>
                     {note.name}
                 </Link>
            </h3>
            <p>{note.modified}</p>
          </li>
        )}
        </ul>
      </section>
    );
  }
}

NoteList.defaultProps = {
    notes: []
  };

export default NoteList;
