import { useState } from 'react';
import { Sidebar } from '../Components/Sidebar/Sidebar';

const Layout = ({ children }) => {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <div className="layout">
            <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(prev => !prev)} />
            <main className="main-content" style={{ marginLeft: collapsed ? '90px' : '310px' }}>
                {children}
            </main>
        </div>
    );
};

export default Layout;