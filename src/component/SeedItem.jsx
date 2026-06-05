//import Toast from '@mui/material/Toast';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { useState } from 'react'

//TODO:Review component.
function SeedItem({ onSeed }) {

    const [seedId, setSeedId] = useState('');
    const [toast, setToast] = useState({ open: false, message: '', severity: 'info' });


    const handleClick = async () => {
        if (!seedId) return;

        try {
            // seed the item first
            const itemRes = await fetch(`/api/items/seed/${seedId}`, { method: 'POST' });
            const item = await itemRes.json();
            console.log('item seeded:', item);
            console.log('itemId: ', item.itemId);


            // then add it to tracked items
            const trackedRes = await fetch('/api/tracked', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: 1, itemId: item.itemId, world: 'Crystal' })
            });

            if(trackedRes.status === 200){
                setToast({open:true, message: 'Item is already being tracked!'});
                return;
            }
            const tracked = await trackedRes.json();
            console.log('tracked result:', tracked);

            // tell App to add it to the list
            console.log('calling onSeed with:', tracked);
            onSeed({...tracked, isTracking: tracked.tracking });
            setSeedId('');
            setToast({ open: true, message: 'Item added!', severity: 'success' });
        } catch (err) {
            console.error('seed error:', err);
            setToast({ open: true, message: 'Something went wrong.', severity: 'error' });
        }
    }

    const handleChange = (e) => {
        setSeedId(e.target.value);
    }

    return (
        <div className='sidebar-section'>
            <p className='sidebar-label'>Seed Item</p>
            <input 
                className='seed-input' 
                type="text" 
                placeholder="Item ID" 
                value={seedId} 
                onChange={handleChange}
            /> 
            <button className='btn-seed' onClick={handleClick}>+ Seed</button>

            <Snackbar
                open={toast.open}
                autoHideDuration={3000}
                onClose={ () => setToast(t => ({...t, open:false}))}
                anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
            >
                <Alert
                    onClose={() => setToast (t => ({...t, open:false}))}
                    severity={toast.severity}
                    variant='filled'
                >
                    {toast.message}
                </Alert>

            </Snackbar>

        </div>
    )
}

export default SeedItem;