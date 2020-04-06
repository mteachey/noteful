import React, {Component} from 'react';
import { format } from 'date-fns'
import './NoteItem.css';
import DeleteButton from '../DeleteButton/DeleteButton';
import NotefulContext from '../NotefulContext.js';
import PropTypes from 'prop-types';


class NoteItem extends Component{
  static defaultProps = {
    history: {
      goBack: () => { }
    },
    match: {
      params: {}
    }
  }

  static contextType = NotefulContext;
  render(){
       const { noteId } = this.props.match.params
       const notesObj = this.context.notes;
       
       const notesItem = notesObj.find(n =>
           n.id === noteId
         )

        return (
          <section className='NoteItem__note-item'>
            <div className="note-item">
                <div>
                    <h2>{notesItem.name}</h2>
                    <p>{format(new Date(notesItem.modified), 'MMM yyyy')}
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
    name: PropTypes.string.isRequired,
    modified: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  })),
  match:{params:PropTypes.string},
};

export default NoteItem;



