import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="bg-blue-900 text-white shadow-md">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <Link to="/dashboard" className="text-xl font-bold hover:text-blue-200 transition">
                    Gestión de citas Médicas ⚕️
                </Link>

                {/* Desktop menu */}
                <div className="hidden md:flex space-x-6 items-center font-medium">
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
                        className="bg-red-500 hover:bg-red-600 px-4 py-1 rounded text-sm font-bold transition shadow-sm">
                        Salir💨    
                    </button>

                    {/* Mobile menu button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden focus:outline-none ml-2"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {isOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            {isOpen && (
                <div className="md:hidden bg-blue-800 px-6 py-4 space-y-2">
                    <Link to="/estudiantes" className="block hover:text-blue-200 transition">Estudiantes</Link>
                    <Link to="/materias" className="block hover:text-blue-200 transition">Materias</Link>
                    <Link to="/matriculas" className="block hover:text-blue-200 transition">Matrículas</Link>
                </div>
            )}
        </nav>
    );
};

export default Navbar;