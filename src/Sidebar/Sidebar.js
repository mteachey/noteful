import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import './Sidebar.css'

class Sidebar extends Component {
    
   render(){
    const folderObj = this.props.notes.folders;
    if(this.props.sideBarType==='folders')
    {
    return ( 
      <div className='Sidebar'>
        <h2>Folders</h2>
        <ul className="FolderList__list">
        {folderObj.map(folder =>
            <NavLink to={`/folder/${folder.id}`} key={folder.id} >
                <li className="FolderList__folder-item"
                    onClick={() => this.props.handleFolderSelected(folder.id)}>           
                    {folder.name}                    
                </li>
            </NavLink>
        )}
        </ul>
        <button className="Sidebar__button add_button">Add Folder</button>
      </div>
    );}
    else{
       // let folderSelectedName = 
       console.log(`this is the folder id ${this.props.folderSelected}`)
       let folderSelectedName = folderObj[folderObj.map(folder => folder.id).findIndex((f,i)=> f===this.props.folderOfCurrentNote)].name;
       console.log(`this is the name ${folderSelectedName}`);
    
        return(
            <div className='Sidebar'>
                <button
                   onClick={() => {
                  // history.push('/')
                   console.log(`this was clicked ${this.props.sideBarType}`);    
                   this.props.handleGoBack('folders')
                   }}>    
                Go Back</button>
                <p>You are looking at a note in the {folderSelectedName} folder</p>
            </div>
        )
    }
  }
}

Sidebar.defaultProps = {
    handleFolderSelected: () => {},
    handleSidebarDisplay:()=>{},
  }

export default Sidebar;
