import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [isRegister, setIsRegister] = useState(false);

    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const { login, register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (isRegister) {
            const result = await register({
                nombre,
                apellido,
                email,
                password
            });

            if (result.success) {
                navigate('/dashboard');
            } else {
                setError(result.message || 'Error al registrarse.');
            }

        } else {
            const result = await login(email, password);

            if (result.success) {
                navigate('/dashboard');
            } else {
                setError(result.message || 'Usuario o contraseña incorrectos.');
            }
        }
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center bg-gray-100 bg-cover bg-center"
            style={{ backgroundImage: "url('https://didoctorio.com/wp-content/uploads/2023/08/medico-paciente-sentados-frente-al-otro-escritorio-clinica-foco-manos-medica-que-apuntan-al-monitor-computadora-portatil-cerca-concepto-medicina-scaled.jpg')" }}
        >
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full backdrop-blur-sm bg-opacity-70">
                <h2 className="text-3xl font-extrabold text-center text-blue-900 mb-6">
                    Gestión de Citas Médicas
                </h2>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">

                    {isRegister && (
                        <>
                            <div>
                                <label className="block text-gray-1000 text-sm font-bold mb-2">Nombre</label>
                                <input
                                    type="text"
                                    value={nombre}
                                    onChange={(e) => setNombre(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-gray-1000 text-sm font-bold mb-2">Apellido</label>
                                <input
                                    type="text"
                                    value={apellido}
                                    onChange={(e) => setApellido(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded"
                                    required
                                />
                            </div>
                        </>
                    )}

                    <div>
                        <label className="block text-gray-1000 text-sm font-bold mb-2">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-1000 text-sm font-bold mb-2">Clave</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition">
                        {isRegister ? 'Crear Cuenta' : 'Ingresar ➡️'}
                    </button>
                </form>

                <div className="mt-4 text-center">
                    <button
                        onClick={() => setIsRegister(!isRegister)}
                        className="text-blue-600 hover:underline text-sm">
                        {isRegister
                            ? '¿Ya tienes cuenta? Inicia sesión'
                            : '¿No tienes cuenta? Regístrate'}
                    </button>
                </div>

            </div>
        </div>
    );
};

export default LoginPage;