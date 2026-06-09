import { useState } from 'react'
import { useEffect } from 'react'
import './App.css'

import SeedItem from './component/SeedItem.jsx'
import Header from './component/Header.jsx'
import Sidebar from './component/Sidebar.jsx'
import MainInfo from './component/MainInfo.jsx'
import Typography from '@mui/material/Typography'

function App() {

  const [trackedItems, setTrackedItems] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [snapshots, setSnapshots] = useState([]);


  //Gets initial tracked items for user 1. TODO: add user context and fetch based on logged in user.
  useEffect(() => {
    fetch('/api/tracked/user/1')
      .then(res => res.json())
      .then(data => {
        //console.log('tracked items:', data);
        setTrackedItems(data)
      })
      .catch((error) => { console.error('fetch error:', error) });
  }, []);

  //Find selected item for dependency array
  const selected = trackedItems.find(item => item.id === selectedId);

  const fetchSnapshots = (selected) => {
    fetch(`/api/market/snapshot/${selected.itemId}/${selected.world}`,
      { method: 'POST' }
    )
      .then(() => fetch(`/api/market/${selected.itemId}/${selected.world}/history`))
      .then(response => response.json())
      .then(data => {
        console.log('Snapshot data', data);
        setSnapshots(data);
      }).catch((error) => { console.error('fetch error:', error) });
  }

  //FETCH snapshots for selected item and update snapshots state.
  useEffect(() => {
    if (!selectedId) return;

    //Get selected item from tracked items state using selectedId. 
    //If no item is found, return early to avoid making an unnecessary API call.
    const selected = trackedItems.find(item => item.id === selectedId);

    if (!selected || !selectedId) return;
    fetchSnapshots(selected);
  }, [selectedId, selected]);


  //
  const handleToggle = (id) => {
    setTrackedItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, isTracking: !item.isTracking } : item));
    fetch(`/api/tracked/user/1/item/${id}`, { method: 'PATCH' });
  };

  const handleSeed = (newItem) => {
    setTrackedItems(prev => [...prev, newItem]);
    setSelectedId(newItem.id);
    fetchSnapshots(newItem);
  };

  const handleDelete = (id) => {
    //Removes selected from tracked items by id. Checks tracked items array, filters out 
    // by comparing the id of the item to be deleted with the ids in the tracked items array, 
    // and updates the state with the new array that excludes the deleted item.

    setTrackedItems(prev => prev.filter(item => item.id !== id));

    //Removes selected item from database by id and userId. TODO: change userId to logged in user.
    fetch(`/api/tracked/user/1/item/${id}`, { method: 'DELETE' })
      .catch((error) => { console.error('Error deleting element: ', error) });
    console.log('Deleting item with id:', id);
  }

  const handleRefresh = () => {
    setSelectedId(null);
    setTimeout(() => setSelectedId(selectedId), 0);
  }

  return (
    <div id="app">
      <Header />
      <div className='layout'>
        <div className='sidebar'>
          <SeedItem onSeed={handleSeed} />
          <Sidebar
            items={trackedItems}
            selectedId={selectedId}
            onSelect={(item) => setSelectedId(item.id)}
            onToggle={handleToggle}
            onDelete={handleDelete}
          />
        </div>
        <div className='main'>
          {selectedId &&
            (<MainInfo
              item={trackedItems.find(item => item.id === selectedId)}
              snapshots={snapshots}
              onRefresh={handleRefresh}
            />)
          }

          {!selectedId && <Typography variant='caption'> Select an item on the left after seeding to view information.</Typography>}
        </div>



      </div>
    </div>
  )
}

export default App
