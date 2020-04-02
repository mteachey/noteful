import React, {Component} from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';
import Sidebar from './Sidebar/Sidebar';
import NoteList from './NoteList/NoteList';
import NoteItem from './NoteItem/NoteItem';
import NotefulContext from './NotefulContext.js'
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
     
    };
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

deleteNote = noteId => {
  this.updateSidebarDisplay('folders');
  const newNotes = this.state.notes.filter(n =>
  n.id !== noteId
  )
  
   this.setState({
     notes: newNotes
   })
  
  }

componentDidMount() {

  const endpoint = 'http://localhost:9090/folders';
  
  const url = endpoint;

  console.log(url);

  fetch(`http://localhost:9090/folders`, {
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
      console.log(`this worked`);
      console.log(data);
      this.setState({
        folders:data,
       });
    })
    .catch(err => {
      console.log(`there wa an error`)
     // this.setState({
     //   error: err.message
    //  });
    });

    fetch(`http://localhost:9090/notes`, {
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
      console.log(`this worked too with notes`);
      console.log(data);
      this.setState({
        notes:data,
       });
    })
    .catch(err => {
      console.log(`there wa an error`)
     // this.setState({
     //   error: err.message
    //  });
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
        </header>
        <main>
        <NotefulContext.Provider value={contextValue}>
          <section className="main-sidebar">
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
          </section>
          <section className="main-main">
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
              
            </section>
            </NotefulContext.Provider>
          </main>
      </div>
    );
  }
}

export default App;

/*<Route
                  path='/note/:noteId'
                  component={NoteItem}
                />at end of last section  */

