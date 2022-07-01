import React from 'react'
import './App.css';
import Bottombar from './components/Bottombar';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';


export default function App() {
  return (
    <>
    <div id="body">
      <Topbar />
      <Sidebar />
      <Bottombar />
    </div>
    </>
  )
}
