import React, {Component} from 'react';
import { format } from 'date-fns'
import './NoteItem.css';
import NotefulContext from '../NotefulContext.js'


//export default function NoteItem(props) {
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
       const notesObj = this.context.notes.notes;
       
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
                <button className="delete_button">Delete Note</button>
            </div>
            <p>{notesItem.content}</p>
          </section>
        );

}
}

export default NoteItem;



