import React, { Component } from 'react';
import './Sidebar.css'

class Sidebar extends Component {
    
   render(){
    const folderObj = this.props.notes.folders;
    return (
      <div className='Sidebar'>
        <h2>Folders</h2>
        <ul className="FolderList__list">
        {folderObj.map(folder =>
          <li className="FolderList__folder-item"
              key={folder.id} 
              onClick={() => this.props.handleFolderSelected(folder.id)}>           
              {folder.name}
              
          </li>
        )}
        </ul>
      </div>
    );
  }
}

Sidebar.defaultProps = {
    handleFolderSelected: () => {},
  }

export default Sidebar;
