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
      notes:{NOTES},
      folders:[],
    };
  }

updateFolderSelected(folder) {
  console.log(`uFS ran and this is the current value of the selected folder${folder}`);
    this.setState({
      folderSelected: folder
    })
}

updatefolderOfCurrentNote(folder) {
  console.log(`uFCN ran and this is the current value of the note's folder${folder}`);
    this.setState({
      folderOfCurrentNote: folder
    })
}

updateSidebarDisplay(display) {
  console.log(`uSD ran and this is he current value${display}`);
    this.setState({
      sideBarType:display
    })
}

  render(){
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
          <section className="main-sidebar">
              <Route
                  exact
                  path='/'
                  render={({history}) => {
                    return(
                  <Sidebar notes={this.state.notes}
                          folderSelected={this.state.folderSelected}
                          sideBarType={this.state.sideBarType}
                          folderOfCurrentNote={this.state.folderOfCurrentNote}
                          handleFolderSelected={folderId=>{
                            this.updateFolderSelected(folderId)
                            this.updatefolderOfCurrentNote(folderId)}}
                          handleSidebarDisplay={display=>
                            this.updateSidebarDisplay(display)}
                  />)}}
              /> 
              <Route
                exact
                path='/folder/:folderId'
                render={({history}) => {
                  return(
                <Sidebar notes={this.state.notes}
                        folderSelected={this.state.folderSelected}
                        folderOfCurrentNote={this.state.folderOfCurrentNote}
                        sideBarType={this.state.sideBarType}
                        handleFolderSelected={folderId=>
                            this.updateFolderSelected(folderId)}
                        handleSidebarDisplay={display=>
                            this.updateSidebarDisplay(display)}
                />)}}
              />    
              <Route
              exact
              path='/note/:noteId'
              render={({history}) => {
                return(
              <Sidebar notes={this.state.notes}
                      folderSelected={this.state.folderSelected}
                      folderOfCurrentNote={this.state.folderOfCurrentNote}
                      sideBarType={this.state.sideBarType}
                      handleGoBack={display=>{
                        this.updateSidebarDisplay(display);
                        history.goBack()}}
              />)}}
          />                  
          </section>
          <section className="main-main">
            <Route
                  exact
                  path='/'
                  render={() =>            
                  <NoteList notes={this.state.notes}
                            folderSelected={this.state.folderSelected}
                            folderOfCurrentNote={this.state.folderOfCurrentNote}
                            handleNoteSelected={(display,folderId)=>{
                                this.updateSidebarDisplay(display)
                                this.updatefolderOfCurrentNote(folderId)
                            }}
                  />}
              />   
              <Route
                  exact
                  path='/folder/:folderId'
                  render={() =>            
                  <NoteList notes={this.state.notes}
                            folderSelected={this.state.folderSelected}
                            handleNoteSelected={(display,folderId)=>{
                              this.updateSidebarDisplay(display)
                              this.updateFolderSelected(folderId)
                              this.updatefolderOfCurrentNote(folderId)
                            }}
                  />}
              />             
              <Route
                  path='/note/:noteId'
                  render={ routeProps =>{
                    return(
                    <NoteItem notes={this.state.notes}
                              noteIdMatch={routeProps.match.params} 
                              folderSelected={this.state.folderSelected}   
                                       
                    />)}
                  }       
                />  
            </section>
          </main>
      </div>
    );
  }
}

export default App;

