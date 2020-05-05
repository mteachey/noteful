import React, {Component} from 'react';
//import { format } from 'date-fns';
import ValidationError from "../ValidationError/ValidationError.js";
import NotefulContext from '../NotefulContext.js'
import './AddNote.css'


class AddNote extends Component {
    constructor(props) {
      super(props);
      this.state = {
        name: {
          value: "",
          touched: false
        }, 
        content: {
            value: "",
            touched: false
        },  
        folderChoice:{
            value: "",
            touched:false  
        }    ,
        error:null,  
      };
    }

   static contextType = NotefulContext;

   updateName(name) {
      this.setState({ name: { value: name, touched: true } });
    }

   updateContent(content) {
      this.setState({ content: { value: content, touched: true } });
    }

    updateFolderSelected(folder) {
       this.setState({ folderChoice: { value: folder, touched: true } });
    }

   handleSubmit = e => {
        e.preventDefault();
        // get the form fields from the event
        const {name, content, folderChoice} = e.target;
        console.log(`this is the folderChoice value ${folderChoice.value}`)
        //const date=format(new Date(), 'MMM yyyy');

        const note = {
            note_name:name.value,
            content:content.value,
            folder_id:folderChoice.value,
            //modified:date,
          }
       
      this.setState({ error: null })

      fetch(`http://localhost:8000/api/notes/`,{
     // fetch(`http://localhost:9090/notes/`, {
            method: 'POST',
            body: JSON.stringify(note),
             headers: {
             'content-type': 'application/json'
            },
        })
          .then(res => {
            if (!res.ok) {
              // get the error message from the response,
              return res.json().then(error => {
                // then throw it
                throw error
              })
            }
            return res.json()
          })
          .then(data => {
            name.value = '';
            content.value='';
            folderChoice.value="";
            console.log('post worked');
            console.log(data);
            this.props.history.push('/')
            this.context.addNote(data);
            console.log(`just checking`)
          })
          .catch(error => {
              this.setState({ error })
          })
      }
   

    handleClickCancel = () => {
     this.props.history.push('/')
     };

    validateName() {
      const name = this.state.name.value.trim();
      if (name.length === 0) {
        return "Name is required";
      } else if (name.length < 3) {
        return "Name must be at least 3 characters long";
      }
    }

    validateContent() {
        const content = this.state.content.value.trim();
        if (content.length === 0) {
            return "Content is required";
        } 
      }

    validateFolderSelected() {
        const folderChoice = this.state.folderChoice.value;
        console.log(`this is the folderChoice ${folderChoice}`);
        if (!folderChoice) {
            return "Please choose a folder to put your new note in";
        } 
      }
  
    
    render() {
      const nameError = this.validateName();
      const contentError = this.validateContent();
      
      const folderObj = this.context.folders;

     
     const folderOptions = folderObj.map((folder,i)=>
            <option value={folder.id} key={i}>{folder.folder_name}</option>);
      
      return (
        <form className="add-note-form" onSubmit={e => this.handleSubmit(e)}>
          <h2>Add Note</h2>
          <div className='Noteful__error' role='alert'>
             {this.state.error && <p>Something didn't work, please try again</p>}
          </div>
          <div className="form-group">
            <label htmlFor="name">Name *</label>
            <input
              type="text"
              className="form__input"
              name="name"
              id="name"
              onChange={e => this.updateName(e.target.value)}
            />
            {this.state.name.touched && <ValidationError message={nameError} />}
          </div>
          <div className="form-group">
            <label htmlFor="content">Content *</label>
            <textarea
              type="textarea"
              className="form__input"
              name="content"
              id="content"
              onChange={e => this.updateContent(e.target.value)}
            />
           {this.state.content.touched && <ValidationError message={contentError} />}
          </div>
          <div className="form-group">
            <label htmlFor="folder-options">Folder for new note *</label>
            <select
                id="folderChoice"
                name="folderChoice"
                onChange={e => this.updateFolderSelected(e.target.value)}>
                <option value="">Select one...</option>
                {folderOptions}
            </select>
           
          </div>
         <div className="form__button__group">
            
            <button
              type="submit"
              className="form__button"
              disabled={
                this.validateName() ||
                this.validateContent() ||
                this.validateFolderSelected()        
              }
            >
              Create Note
            </button>
            <button type="reset" className="form__button"
              onClick={this.handleClickCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      );
    }
  }

export default AddNote;