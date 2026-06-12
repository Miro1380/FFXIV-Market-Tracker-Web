import { useState } from 'react'
import { useEffect } from 'react'
import './App.css'

import SeedItem from './component/SeedItem.jsx'
import Header from './component/Header.jsx'
import Sidebar from './component/Sidebar.jsx'
import MainInfo from './component/MainInfo.jsx'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

function App() {

  const [trackedItems, setTrackedItems] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [snapshots, setSnapshots] = useState([]);
  const [alerts, setAlerts] = useState([]);


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

  //Fetch Alerts for items
  const fetchAlerts = () => {
    fetch(`/api/alerts/user/1`)
      .then(response => response.json())
      .then(data => setAlerts(data))
      .catch((error) => console.log('fetch error in alerts', error))
  }

  useEffect(() => {
    fetchAlerts();
  }, [])

  //Delete alerts and update Alert state
  const handleDeleteAlert = (alertId) => {
    fetch(`/api/alerts/${alertId}`, { method: 'DELETE' })
      .then(() => fetchAlerts());
  }

  //FETCH snapshots for selected item and update snapshots state.
  useEffect(() => {
    if (!selectedId) return;

    //Get selected item from tracked items state using selectedId. 
    //If no item is found, return early to avoid making an unnecessary API call.
    const selected = trackedItems.find(item => item.id === selectedId);

    if (!selected) return;
    fetchSnapshots(selected);
  }, [selectedId]);


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
    <Stack direction={"column"} sx={{ height: "100vh", overflow: "hidden" }}>
      <Header alerts={alerts} onDeleteAlert={handleDeleteAlert} />
      <Stack direction={"row"} sx={{ flex: 1, overflow: "hidden", minHeight: 0 }}>
        <Stack sx={{ width: 250, borderRight: "1px solid rgba(200, 169, 110, 0.25)", overflow: 'auto', flexShrink: 0 }}>
          <SeedItem onSeed={handleSeed} />
          <Sidebar
            items={trackedItems}
            selectedId={selectedId}
            onSelect={(item) => setSelectedId(item.id)}
            onToggle={handleToggle}
            onDelete={handleDelete}
          />
        </Stack>
        <Box sx={{
          display: "flex",
          flex: 1,
          alignItems: "flex-start",
          justifyContent: "center",
          overflow: "auto",
          p: 2
        }}>
          {selectedId &&
            (<MainInfo
              item={trackedItems.find(item => item.id === selectedId)}
              snapshots={snapshots}
              onRefresh={handleRefresh}
              onAlertCreated={fetchAlerts}
            />)
          }

          {!selectedId &&
            <Typography variant='h4'> Select an item on the left after seeding to view information.
            </Typography>}
        </Box>



      </Stack>
    </Stack>
  )
}

export default App
