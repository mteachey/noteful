import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import NotefulContext from '../NotefulContext.js'
import DeleteButton from '../DeleteButton/DeleteButton';
import './NoteList.css';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

class NoteList extends Component {
  static contextType = NotefulContext;
   
  render() {
    const notesObj = this.context.notes;
    const { folderSelected } = this.context;
    let selectedNotesObj={};
    let folderToGoBackTo = '';
    
     if (folderSelected==='All'){
        selectedNotesObj=notesObj;
        folderToGoBackTo = 'All';
     }
     else{
        selectedNotesObj = notesObj.filter(note=>note.folder_id===folderSelected);        
     }

    return (
      <section className='NoteList'>
        <h2>Notes</h2>
        <NavLink to={`/add-note`}><button className="NoteList__button add_note">Add Note</button></NavLink>   
        <ul>
        {selectedNotesObj.map(note =>
         
          <li key={note.id} className="NoteList__note-item note-item">    
            <div className="NoteList__note-item-info ">
                <h3>
                    <Link to={`/note/${note.id}`}
                        onClick={() => this.context.handleNoteSelected('note', note.folder_id, folderToGoBackTo)}> 
                        {note.note_name}

                    </Link>
                </h3>
                <p>Date modified {note.date_modified}</p>
            </div>
            <DeleteButton
                  noteId={note.id}
                  push={this.props.history.push}
                 />
          </li>
        )}
        </ul>
          
      </section>
    );
  }
}

NoteList.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    modified: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  })),
  folderSelected:PropTypes.string,
};


export default NoteList;
