import React from 'react';
import { RxDashboard } from 'react-icons/rx'; // Import your icon from the react-icons library
import { BsBoxSeam } from "react-icons/bs";
import { TbShoppingCartCheck } from "react-icons/tb";
import { LiaWarehouseSolid } from "react-icons/lia";
import { LiaFileInvoiceSolid } from "react-icons/lia";
import { BsGraphUp } from "react-icons/bs";
import { BiSupport } from "react-icons/bi";
import { CiBoxes } from "react-icons/ci";

function SideBar() {
    const [activeMenu, setActiveMenu] = React.useState('Orders');
    const menu = [
        { name: 'Dashboard', icon: <RxDashboard /> },
        { name: 'Catalog', icon: <BsBoxSeam /> },
        { name: 'Orders', icon: <TbShoppingCartCheck />},
        { name: 'Inventory', icon: <CiBoxes />},
        { name: 'Units', icon: <LiaWarehouseSolid /> },
        { name: 'Invoices', icon: <LiaFileInvoiceSolid /> },
        { name: 'Analytics & Reports', icon: <BsGraphUp /> },
        { name: 'Campaigns & Promotions', icon: <TbShoppingCartCheck /> },
        { name: 'Support', icon: <BiSupport /> }
    ];

    return (
        <div className="w-[20%] bg-gray-300">
            <div className="p-4">
                <h1 className="text-2xl font-semibold mb-6">YAPAAR</h1>
            </div>
            <nav className="flex flex-col">
                {menu.map((item, index) => (
                    <a 
                        key={index} 
                        onClick={() => setActiveMenu(item.name)}
                        className={`flex items-center p-4 font-semibold transition-colors ${
                            activeMenu === item.name ? 'bg-gray-400 rounded-lg m-2' : 'hover:bg-gray-400'
                        }`}
                    >
                        <span className="mr-3">{item.icon}</span> {item.name}
                    </a>
                ))}
            </nav>
        </div>
    );
}

export default SideBar;
