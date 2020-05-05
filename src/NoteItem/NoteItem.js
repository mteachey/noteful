import React, {Component} from 'react';
import './NoteItem.css';
import DeleteButton from '../DeleteButton/DeleteButton';
import NotefulContext from '../NotefulContext.js';
import PropTypes from 'prop-types';


class NoteItem extends Component{

  static contextType = NotefulContext;
  static defaultProps = {
    history: {
      goBack: () => { }
    },
    match: {
      params: {}
    }
  }

  
  render(){
       const { noteId } = this.props.match.params
       const notesObj = this.context.notes;
            
       const notesItem = notesObj.find(n =>
        n.id === Number(noteId)
      ) || {}
    
        return (
          <section className='NoteItem__note-item'>
            <div className="note-item">
                <div>
                    <h2>{notesItem.note_name}</h2>
                    <p>{notesItem.date_modified}
                    </p>
                </div>
                <DeleteButton
                  noteId={noteId}
                  push={this.props.history.push}
                 />
            </div>
            <p>{notesItem.content}</p>
          </section>
        );

}
}

NoteItem.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    note_name: PropTypes.string.isRequired,
    modified: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  })),
 // match:{params:PropTypes.string},
};

export default NoteItem;



