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
      notes:NOTES,
     
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

  render(){
    //const {folderSelected, sideBarType,folderOfCurrentNote} = this.state
   const contextValue ={
         notes:this.state.notes,
         folderSelected:this.state.folderSelected,
         sideBarType:this.state.sideBarType,
         folderOfCurrentNote:this.state.folderSelected,
         updateFolderSelected:this.updateFolderSelected,
         updatefolderOfCurrentNote:this.updatefolderOfCurrentNote,
         updateSidebarDisplay:this.updateSidebarDisplay,
         handleNoteSelected:this.handleNoteSelected,


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

