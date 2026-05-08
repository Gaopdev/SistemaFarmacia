import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'

import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"
import Inventario from "./pages/Inventario"

function App() {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/inicio" />} />
                <Route path='/inicio' element={<Login/>}/>
                <Route path='/registro' element={<Register/>}/>
                <Route path='/dashboard' element={<Dashboard/>}/>
                <Route path='/inventario' element={<Inventario/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App
