import React from 'react'

const NotefulContext = React.createContext({
  folderSelected: 'All',
  sideBarType:'folders',
  folderOfCurrentNote:'None',
  notes: {},
  folders:[],
  updateFolderSelected:() => {},
  updatefolderOfCurrentNote:() => {},
  updateSidebarDisplay:() => {},
  addNote: () => {},
  addFolder: () => {},
  deleteNote: () => {},
  deleteFolder: () => {},
  handleNoteSelected:()=>{},
})

export default NotefulContext