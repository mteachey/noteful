import React, {Component} from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';
import { format } from 'date-fns'
import Sidebar from './Sidebar/Sidebar';
import NoteList from './NoteList/NoteList';
import NoteItem from './NoteItem/NoteItem';
import AddFolder from './AddFolder/AddFolder.js';
import AddNote from './AddNote/AddNote.js';
import NotefulContext from './NotefulContext.js';
import NoteListError from './ErrorBoundaries/NoteListError.js'
import SidebarError from './ErrorBoundaries/SidebarError.js'
import NOTES from './notes.js'


class App extends Component{
  constructor(props) {
    super(props);
    this.state = {
      folderSelected: 'All',
      sideBarType:'folders',
      folderOfCurrentNote:'None',
      notes:NOTES.notes,
      folders:NOTES.folders,
      error: null,
     
    };
  }

addFolder = folder => {
  console.log(`before update ${this.state.folders}`);
    this.setState({
      folders: [ ...this.state.folders, folder ],
    })
    console.log(`after update ${this.state.folders}`);
}

addNote = note => {
  let updatedNote = note = { ...note, 
    date_modified:(format (new Date((note.date_modified).slice(0,10)), 'MMM yyyy' ))}
   
   this.setState({
      notes: [ ...this.state.notes, updatedNote ],
    })
    console.log(`after update ${this.state.notes}`);
}

updateFolderSelected=folder=> {
    this.setState({
      folderSelected: folder
    })
}

updatefolderOfCurrentNote=folder=> {
    this.setState({
      folderOfCurrentNote: folder
    })
}

updateSidebarDisplay=display=> {
    this.setState({
      sideBarType:display
    })
}

handleNoteSelected=(display,folderId, folderToGoBackTo)=>{
  this.updateSidebarDisplay(display)
  this.updatefolderOfCurrentNote(folderId)
  if(folderToGoBackTo==='All')
  { this.updateFolderSelected('All')}
  else{ this.updateFolderSelected(folderId)}
}

deleteNote = (noteId,error) => {
  if (!error){
    this.updateSidebarDisplay('folders');
    const newNotes = this.state.notes.filter(n =>
    n.id !== noteId
    )
    
    this.setState({
      notes: newNotes
    })
  }
  else if(error){
    this.setState({
      error: true,
      });
  }
}

formatDate = (notes)=>{
  console.log(`formatdate ran`)
  let updatedNotes = notes.map(note=>note={
    ...note, 
    date_modified:(format (new Date((note.date_modified).slice(0,10)), 'MMM yyyy' ))
  })
  return updatedNotes
}

componentDidMount() {
  this.setState({ error: null })
  //getting the folders
  //fetch(`http://localhost:9090/folders`, {
    fetch(`http://localhost:8000/api/folders/`,{
    method: 'GET',
    headers: {
      'content-type': 'application/json'
    },
  })
    .then(res => {
      if(!res.ok) {
        throw new Error('Something went wrong, please try again later.');
      }
      return res;
    })
    .then(res => res.json())
    .then(data => {
      //console.log(data);
      this.setState({
        folders:data,
       });
    })
    .catch(err => {
      console.log(`there was an error`)
      this.setState({
       error: err.message
       });
    });

    //getting the notes
    fetch(`http://localhost:8000/api/notes/`,{
    //fetch(`http://localhost:9090/notes`, {
    method: 'GET',
    headers: {
      'content-type': 'application/json'
    },
  })
    .then(res => {
      if(!res.ok) {
        throw new Error('Something went wrong, please try again later.');
      }
      return res;
    })
    .then(res => res.json())
    .then(data => {
      const updatedNotes = this.formatDate(data);
      /*const updatedNotes = data.map(note=>note={
        ...note, 
        date_modified:(format (new Date((note.date_modified).slice(0,10)), 'MMM yyyy' ))
      })*/
      this.setState({
        //notes:data,
        notes:updatedNotes,
       });
    })
    .catch(err => {
      console.log(`there was an error`)
       this.setState({
        error: err.message
        });
    });
}


  render(){
   //const {folderSelected, sideBarType,folderOfCurrentNote} = this.state
   const contextValue ={
         notes:this.state.notes,
         folders:this.state.folders,
         folderSelected:this.state.folderSelected,
         sideBarType:this.state.sideBarType,
         folderOfCurrentNote:this.state.folderOfCurrentNote,
         updateFolderSelected:this.updateFolderSelected,
         updatefolderOfCurrentNote:this.updatefolderOfCurrentNote,
         updateSidebarDisplay:this.updateSidebarDisplay,
         handleNoteSelected:this.handleNoteSelected,
         deleteNote:this.deleteNote,
         addFolder:this.addFolder,
         addNote:this.addNote,
   }

    return (
      
      <div className="App">
        <header>
         <h1>
           <Link to='/'
             //reseting the sidebar and main area when returning to the home page
             onClick={() => {
               this.updateFolderSelected('All');
               this.updateSidebarDisplay('folders');
             }}> 
           Noteful</Link>
         </h1>
         <div className='Noteful__error' role='alert'>
            {this.state.error && <p>Something didn't work, please try again</p>}
          </div>
        </header>
        <main>
        <NotefulContext.Provider value={contextValue}>
          <section className="main-sidebar">
            <SidebarError>
              <Route
                  exact
                  path='/'
                  component={Sidebar}
              /> 
              <Route
                exact
                path='/folder/:folderId'
                component={Sidebar}
              />    
              <Route
              exact
              path='/note/:noteId'
              component={Sidebar}
              />    
              <Route
              exact
              path='/add-folder'
              component={Sidebar}
              />     
              <Route
              exact
              path='/add-note'
              component={Sidebar}
              />     
            </SidebarError>             
          </section>
          <section className="main-main">
            <NoteListError>
                <Route
                    exact
                    path='/'        
                    component={NoteList}
                />   
                <Route
                    exact
                    path='/folder/:folderId'         
                    component={NoteList}
                />   
                <Route
                    path='/note/:noteId'
                    component={NoteItem}
                  />   
                  <Route
                    path='/add-folder'
                    component={AddFolder}
                  />  
                  <Route
                    path='/add-note'
                    component={AddNote}
                  />     
            </NoteListError>                  
          </section>
            </NotefulContext.Provider>
          </main>
      </div>
    );
  }
}

export default App;


