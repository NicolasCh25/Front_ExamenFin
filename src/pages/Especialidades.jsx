import { useEffect, useState } from 'react';
import api from '../config/api';
import Table from '../components/Table';
import ModalForm from '../components/ModalForm';

const MODULE_CONFIG = {
    endpoint: '/especialidades', 
    title: 'Gestión de especialidades',
    columns: [
        { header: 'id', accessor: 'id' },
        { header: 'Nombre', accessor: 'nombre' },
        { header: 'Descripción', accessor: 'descripcion' }
    ],
    formFields: [
        { name: 'id', label: 'ID', type: 'number', required: true },
        { name: 'nombre', label: 'Nombre de la Especialidad', required: true },
        { name: 'descripcion', label: 'Descripción de la Especialidad', required: true }
    ]
};


const Especialidades = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentEditItem, setCurrentEditItem] = useState(null);

    useEffect(() => { fetchData(); }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await api.get(MODULE_CONFIG.endpoint);
            setData(response.data);
        } catch (error) { console.error(error); } finally { setLoading(false); }
    };

    const handleModalSubmit = async (formData) => {
        try {
            if (currentEditItem) {
                await api.put(`${MODULE_CONFIG.endpoint}/${currentEditItem.id}`, formData);
                alert("Especialidad actualizada");
            } else {
                await api.post(MODULE_CONFIG.endpoint, formData);
                alert("Especialidad creada");
            }
            setIsModalOpen(false);
            fetchData();
        } catch (error) { alert("Error al guardar"); }
    };

    const handleDelete = async (id) => {
        if (!confirm("¿Eliminar esta Especialidad?")) return;
        try {
            await api.delete(`${MODULE_CONFIG.endpoint}/${id}`);
            fetchData();
        } catch (error) { alert("Error al eliminar"); }
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">{MODULE_CONFIG.title}</h1>
                <button onClick={() => { setCurrentEditItem(null); setIsModalOpen(true); }} 
                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded shadow">
                    + Nueva Especialidad
                </button>
            </div>
            <div className="bg-white rounded-lg shadow p-4">
                {loading ? <p>Cargando...</p> : (
                    <Table columns={MODULE_CONFIG.columns} data={data} onDelete={handleDelete} 
                        onEdit={(item) => { setCurrentEditItem(item); setIsModalOpen(true); }} />
                )}
            </div>
            <ModalForm isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleModalSubmit}
                title={currentEditItem ? "Editar Especialidad" : "Nueva Especialidad"}
                fields={MODULE_CONFIG.formFields} initialData={currentEditItem} />
        </div>
    );
};

export default Especialidades;