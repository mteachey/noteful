import React, {Component} from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';
import Sidebar from './Sidebar/Sidebar';
import NoteList from './NoteList/NoteList';
import NoteItem from './NoteItem/NoteItem';
import NOTES from './notes.js'


class App extends Component{
  constructor(props) {
    super(props);
    this.state = {
      folderSelected: 'All',
      sideBarType:'folderShown'
    };
  }

updateFolderSelected(folder) {
    this.setState({
      folderSelected: folder
    })
}

/*updateSideBarType(display) {
    this.setState({
      sideBarType:display
    })
}*/

  render(){
    return (
      <div className="App">
        <header>
         <h1>
           <Link to='/'>Noteful</Link>
         </h1>
        </header>
        <main>
        <Route
            exact
            path='/'
            render={() =>
            <Sidebar notes={NOTES}
                    folderSelected={this.state.folderSelected}
                    sideBarType={this.state.sideBarType}
                    handleFolderSelected={folderId=>this.updateFolderSelected(folderId)}
            />}
        />    
        <Route
            exact
            path='/'
            render={() =>
            
            <NoteList notes={NOTES}
                      folderSelected={this.state.folderSelected}
            />}
        />   
        <Route
            exact
            path='/note/:noteId'
            render={() =>
            <Sidebar notes={NOTES}
                    folderSelected={this.state.folderSelected}
                    sideBarType={this.state.sideBarType}
            />}
        />     
        <Route
            path='/note/:noteId'
            render={ routeProps =>{
              return(
              <NoteItem notes={NOTES}
                        noteIdMatch={routeProps.match.params} 
                        folderSelected={this.state.folderSelected}              
              />)}
            }       
          />  

        </main>
      </div>
    );
  }
}

export default App;

