
function Header({alerts, onDeleteAlert}){

    const [drawerOpen, setDrawerOpen] = useState(false);

    return(
        <div className='header'>
            <div className='header-image'>
                img
            </div>
            <div className="header-title">
                <p>Eorzea Market Watch</p>
                <div className="header-sub">
                    <p> Market Board Tracker</p>
                </div>
            </div>
            <div className="header-right">
                Crystal
            </div>
        </div>
    )
}

export default Header;