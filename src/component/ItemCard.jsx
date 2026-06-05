
import Tooltip from '@mui/material/Tooltip';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';

function ItemCard({ item, isActive, onSelect, onToggle, onDelete }) {
    return (
        <Tooltip title={item.itemName} placement="right" arrow>
            <ListItem
                selected={isActive}
                onClick={() => onSelect(item)}
                sx={{ pr: 14, py: 0.5, overflow: 'hidden' }}
                divider="true"
                secondaryAction={
                    <>
                        <Switch
                            edge="end"
                            checked={item.isTracking}
                            onChange={(e) => { e.stopPropagation(); onToggle(item.id); }}
                        />
                        <IconButton 
                            fontSize="small" 
                            edge="end" 
                            onClick={(e) => { 
                                    e.stopPropagation(); 
                                    onDelete(item.id); 
                                }}>
                            <DeleteIcon fontSize="small" />
                        </IconButton>
                    </>
                }
            >
                <ListItemAvatar sx={{ minWidth: 40 }}>
                    <Avatar src={`https://xivapi.com/${item.iconUrl}`} variant="rounded" sx={{ width: 28, height: 28 }} />
                </ListItemAvatar>
                <ListItemText
                    primary={
                        <span style={{
                            fontSize: 11,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            display: 'block',
                            maxWidth: '140px'
                        }}>
                            {item.itemName}
                        </span>
                    }
                    secondary={
                        <span style={{ fontSize: 10 }}>
                            {item.world}
                        </span>
                    }
                    sx={{ my: 0 }}
                />
            </ListItem>
        </Tooltip>
    )
}
export default ItemCard;