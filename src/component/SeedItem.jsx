//import Toast from '@mui/material/Toast';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from 'react'
import { useUser } from './UserContext';

//TODO:Review component.
function SeedItem({ onSeed }) {

    const [seedId, setSeedId] = useState('');
    const [toast, setToast] = useState({ open: false, message: '', severity: 'info' });
    const {user} = useUser();

    const handleClick = async () => {
        if (!seedId) return;

        try {
            // seed the item first
            const itemRes = await fetch(`/api/items/seed/${seedId}`, { method: 'POST' });
            const item = await itemRes.json();
            //console.log('item seeded:', item);
            //console.log('itemId: ', item.itemId);


            // then add it to tracked items
            const trackedRes = await fetch('/api/tracked', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: user.id, itemId: item.itemId, world: user.homeWorld})
            });

            if (trackedRes.status === 200) {
                setToast({ open: true, message: 'Item is already being tracked!' });
                return;
            }
            const tracked = await trackedRes.json();
            //console.log('tracked result:', tracked);

            // tell App to add it to the list
            //console.log('calling onSeed with:', tracked);
            onSeed({ ...tracked, isTracking: tracked.tracking });
            setSeedId('');
            setToast({ open: true, message: 'Item added!', severity: 'success' });
        } catch (err) {
            //console.error('seed error:', err);
            setToast({ open: true, message: 'Something went wrong.', severity: 'error' });
        }
    }

    const handleChange = (e) => {
        setSeedId(e.target.value);
    }

    return (
        <Box sx={{ px: 2 }} >
            <Typography variant="caption" sx={{ letterSpacing: '0.12em', textTransform: 'uppercase', color: 'text.secondary', display: 'block', mb: 1 }}>
                Seed Item
            </Typography>
            <Stack direction="row" spacing={1}>
                <TextField
                    size="small"
                    placeholder="Item ID"
                    value={seedId}
                    onChange={handleChange}
                    fullWidth
                />
                <Button
                    variant="outlined"
                    size="small"
                    onClick={handleClick}
                >
                    + Seed
                </Button>
            </Stack>

            <Snackbar
                open={toast.open}
                autoHideDuration={3000}
                onClose={() => setToast(t => ({ ...t, open: false }))}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert
                    onClose={() => setToast(t => ({ ...t, open: false }))}
                    severity={toast.severity}
                    variant="filled"
                >
                    {toast.message}
                </Alert>
            </Snackbar>
        </Box>
    )
}

export default SeedItem;