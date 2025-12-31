import { Link, Outlet } from 'react-router';

function Layout() {
    return (
    <div>
        <nav className='flex gap-4'>
            <Link to="/">Inventory</Link>
            <Link to="/scanner">Scanner</Link>
            <Link to="/shopping-list">Shopping List</Link>
        </nav>
        <hr />
        <main>
            <Outlet />
        </main>
        </div>
    );
}

export default Layout;