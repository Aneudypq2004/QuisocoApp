import AdminLayout from "../layout/AdminLayout";

import React from 'react'

export default function admin() {
    return (
        <AdminLayout pagina="admin">

            <h1 className='font-black text-4xl'>Panel de Administracion</h1>
            <p className='text-2xl my-10'>Administra la orden</p>


            <svg width="100" height="100" viewBox="0 0 165 164" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M127.811 121.235L162.823 156.246C164.597 158.02 164.597 160.896 162.823 162.67C161.049 164.443 158.173 164.443 156.4 162.67L121.388 127.658C108.576 138.968 91.7453 145.832 73.3117 145.832C33.1753 145.832 0.638275 113.295 0.638275 73.1583C0.638275 33.0219 33.1753 0.484892 73.3117 0.484892C113.448 0.484892 145.985 33.0219 145.985 73.1583C145.985 91.592 139.122 108.423 127.811 121.235V121.235ZM73.3117 136.747C108.431 136.747 136.901 108.278 136.901 73.1583C136.901 38.0389 108.431 9.56906 73.3117 9.56906C38.1923 9.56906 9.72245 38.0389 9.72245 73.1583C9.72245 108.278 38.1923 136.747 73.3117 136.747Z" fill="black" />
            </svg>




        </AdminLayout>
    )
}
