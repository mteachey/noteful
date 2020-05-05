import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import './Sidebar.css'
import NotefulContext from '../NotefulContext.js';
import PropTypes from 'prop-types';

class Sidebar extends Component {
  static contextType = NotefulContext;
    
   render(){
    const folderObj = this.context.folders;
    const { folderOfCurrentNote } = this.context;
   
    if(this.context.sideBarType==='folders')
    {
    return ( 
      <div className='Sidebar'>
        <h2>Folders</h2>
        <ul className="FolderList__list">
        {folderObj.map(folder =>
         <li key={folder.id} className="FolderList__folder-item"
         onClick={() => this.context.updateFolderSelected(folder.id)}>   
            <NavLink to={`/folder/${folder.id}`} key={folder.id} >
                       
                    {folder.folder_name}                    
              
            </NavLink>
            </li>
        )}
        </ul>
        <NavLink to={`/add-folder`}><button className="Sidebar__button add_button">Add Folder</button></NavLink>
      </div>
    );}
    else{
      //the folder_name was just name
      let folderSelectedName = folderObj[folderObj.map(folder => folder.id).findIndex((f,i)=> f===folderOfCurrentNote)].folder_name;
 
        return(
            <div className='Sidebar'>
                <button
                   onClick={() => {
                    this.context.updateSidebarDisplay('folders');
                    this.props.history.goBack()
                   }}>    
                Go Back</button>
                <p>You are looking at a note in the {folderSelectedName} folder</p>
            </div>
        )
    }
  }
}

Sidebar.propTypes = {
  folders: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })),
  folderOfCurrentNote:PropTypes.string,
};



export default Sidebar;
