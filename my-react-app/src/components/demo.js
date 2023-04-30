
// import React, { useState } from 'react';
// import { Sidebar } from 'primereact/sidebar';
// import { Button } from 'primereact/button';

// //theme
// //import "primereact/resources/themes/lara-light-indigo/theme.css";     
    
// //core
// // import "primereact/resources/primereact.min.css";                                       
        
// export default function FullScreenDemo() {
//     const [visible, setVisible] = useState(false);

//     return (
//         <div className='container m-5'>
//             <div className='row m-5'>
//         <div className="card flex justify-content-center">
//             <Sidebar visible={visible} onHide={() => setVisible(false)} fullScreen>
//                 <h2>Sidebar</h2>
//                 <p>
//                     Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
//                     Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
//                 </p>
//             </Sidebar>
//             <Button icon="pi pi-th-large" onClick={() => setVisible(true)} />
//         </div>
//         </div>
//         </div>
//     )
// }

import { createContext } from "react"
// export const bookContext = createContext()