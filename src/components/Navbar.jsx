import {Link, useNavigate} from 'react-router-dom';
import {useAuth} from '../context/AuthContext';

const Navbar =()=> {
    const {user,logout}=useAuth();
    const navigate =useNavigate();

    const handleLogout =()=>{
        logout();
        navigate ('/login');
    };
    
    return(
        <nav className="bg-blue-900 text-white shadow-md">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <Link to="/dashboard" className="text-xl font-bold hover:text-blue-200 transition">
                    Gestión de citas Médicas ⚕️
                </Link>

                <div className="flex space-x-6 items-center font-medium">
                    <Link to="/estudiantes" className="hover:text-blue-300 transition">Estudiantes</Link>
                    <Link to="/materias" className="hover:text-blue-300 transition">Materias</Link>
                    <Link to="/matriculas" className="hover:text-blue-300 transition">Matrículas</Link>
                </div>

                <div className="flex items-center space-x-4">
                    <span className="text-sm bg-blue-800 px-3 py-1 rounded-full text-blue-100">
                        {user?.nombre || 'Usuario'}
                    </span>

                    <button
                        onClick={handleLogout}
                        className ="bg-red-500 hover:bg-red-600 px-4 py-1 rounded text-sm font-bold transition shadow-sm">
                        Salir💨    
                    </button>

                </div>
            </div>
        </nav>
    );
};
export default Navbar;