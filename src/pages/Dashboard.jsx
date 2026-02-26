import { Link } from 'react-router-dom';

const Dashboard = () => {
    return (
        <div className="flex flex-col items-center justify-center h-[80vh]">
            <h1 className="text-4xl font-bold mb-8 text-blue-900">¡Bienvenido al Sistema!😷</h1>            <p className="mb-8 text-gray-600">Selecciona un módulo para comenzar a trabajar.</p>
            
            {/* Botones*/}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl px-6">
                
                {/*Botón para Pacientes */}
                <Link to="/pacientes" 
                   className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition flex flex-col items-center justify-center gap-4 border border-gray-200 hover:border-blue-500 text-blue-800 font-semibold text-lg h-40 text-center">
                   <span className="text-4xl">📋</span>
                   Gestión de Pacientes
                </Link>
                
                {/*Botón para Especalidades */}
                <Link to="/especialidades" 
                   className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition flex flex-col items-center justify-center gap-4 border border-gray-200 hover:border-green-500 text-green-800 font-semibold text-lg h-40 text-center">
                   <span className="text-4xl">📚</span>
                   Gestión de Especialidades
                </Link>

                {/*Botón para citas */}
                <Link to="/citas" 
                   className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition flex flex-col items-center justify-center gap-4 border border-gray-200 hover:border-purple-500 text-purple-800 font-semibold text-lg h-40 text-center">
                   <span className="text-4xl">📝</span>
                   Gestión de Citas
                </Link>

            </div>
        </div>
    );
};

export default Dashboard;