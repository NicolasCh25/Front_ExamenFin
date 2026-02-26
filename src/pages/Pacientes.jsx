import { useEffect, useState } from 'react';
import api from '../config/api';
import Table from '../components/Table';
import ModalForm from '../components/ModalForm'; 

const MODULE_CONFIG = {
    endpoint: '/pacientes',
    title: 'Gestión de pacientes',
    // Columnas para la TABLA
    columns: [
        { header: 'Nombre', accessor: 'nombre' },
        { header: 'Apellido', accessor: 'apellido' },
        { header: 'Cédula', accessor: 'cedula' },
        { header: 'Email', accessor: 'email' }
    ],
    // Campos para el FORMULARIO (Modal)
    formFields: [
        { name: 'nombre', label: 'Nombre', required: true },
        { name: 'apellido', label: 'Apellido', required: true },
        { name: 'cedula', label: 'Cédula', required: true },
        { name: 'email', label: 'Email', type: 'email', required: true }
    ]
};

const Pacientes = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // Obtenemos el nombre del usuario (puedes ajustar de dónde viene el dato)
    const userName = localStorage.getItem('userName') || 'Usuario';

    // Estados para el Modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentEditItem, setCurrentEditItem] = useState(null); // Si es null = CREAR, Si tiene datos = EDITAR

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await api.get(MODULE_CONFIG.endpoint);
            setData(response.data);
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setLoading(false);
        }
    };

    // Se abre el modal para crear o editar
    const handleOpenModal = (item = null) => {
        setCurrentEditItem(item); 
        setIsModalOpen(true);
    };

    // Guardar
    const handleModalSubmit = async (formData) => {
        try {
            if (currentEditItem) {
                await api.put(`${MODULE_CONFIG.endpoint}/${currentEditItem.id}`, formData);
                alert("Registro actualizado correctamente");
            } else {
                await api.post(MODULE_CONFIG.endpoint, formData);
                alert("Nuevo registro creado");
            }
            setIsModalOpen(false); 
            fetchData(); 
        } catch (error) {
            console.error("Error al guardar:", error);
            alert("Error al guardar los datos.");
        }
    };

    // Eliminar
    const handleDelete = async (id) => {
        if (!confirm("¿Estás seguro de eliminar este registro?")) return;
        try {
            await api.delete(`${MODULE_CONFIG.endpoint}/${id}`);
            fetchData();
        } catch (error) {
            alert("Error al eliminar");
        }
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                {/* Título*/}
                <div>
                    <p className="text-gray-600 text-sm">Bienvenido, {userName}</p>
                    <h1 className="text-3xl font-bold text-gray-800">{MODULE_CONFIG.title}</h1>
                </div>
                
                <button 
                    onClick={() => handleOpenModal(null)} 
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow">
                    + Nuevo Paciente
                </button>
            </div>

            <div className="bg-white rounded-lg shadow p-4">
                {loading ? <p>Cargando...</p> : (
                    <Table 
                        columns={MODULE_CONFIG.columns} 
                        data={data} 
                        onDelete={handleDelete}
                        onEdit={(item) => handleOpenModal(item)} 
                    />
                )}
            </div>

            <ModalForm
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleModalSubmit}
                title={currentEditItem ? "Editar Paciente" : "Nuevo Paciente"}
                fields={MODULE_CONFIG.formFields}
                initialData={currentEditItem}
            />
        </div>
    );
};

export default Pacientes;