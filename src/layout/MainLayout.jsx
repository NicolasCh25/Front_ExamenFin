import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar'; // Asegúrate de tener tu Navbar aquí

const MainLayout = () => {
    return (
        <div className="min-h-screen bg-gray-100">
            {/*Navegación*/}
            <Navbar />

            {/* Contenido*/}
            <main className="container mx-auto p-4">
                <Outlet /> 
            </main>
        </div>
    );
};

export default MainLayout;