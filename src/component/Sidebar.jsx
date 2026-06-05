import ItemCard from './ItemCard.jsx';

function Sidebar({items, selectedId, onSelect, onToggle, onDelete}) {
    return(
        <div className="sidebar-section">
            {items.map( item => (
                <ItemCard 
                    key = {item.id} 
                    item = {item} 
                    isActive={item.id === selectedId} 
                    selected={item.id === selectedId}
                    onSelect={onSelect} 
                    onToggle ={onToggle}
                    onDelete={onDelete}
                />
            ))}
        </div>
    )
}

export default Sidebar;