import { useEffect, useState } from 'react';
import api from '../config/api';
import Table from '../components/Table';
import ModalForm from '../components/ModalForm';

const MODULE_CONFIG = {
    endpoint: '/citas', 
    title: 'Gestión de Citas',
    columns: [
        { header: 'id', accessor: 'id' },
        { header: 'Código', accessor: 'codigo' },
        { header: 'Descripción', accessor: 'descripcion' },
        { header: 'ID paciente', accessor: 'id_paciente' },
        { header: 'ID especialidad', accessor: 'id_especialidad' },
    ],
    formFields: [
        { name: 'id', label: 'id', type: 'number', required: true },
        { name: 'codigo', label: 'Código de la cita', type: 'text', required: true },
        { name: 'descripcion', label: 'Descripción de la cita', type: 'text', required: true },
        { name: 'id_paciente', label: 'ID del paciente', type: 'number', required: true },
        { name: 'id_especialidad', label: 'ID de la especialidad', type: 'number', required: true },
    ]
};

const Citas = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentEditItem, setCurrentEditItem] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await api.get(MODULE_CONFIG.endpoint);
            setData(response.data);
        } catch (error) {
            console.error("Error cargando Citas:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleModalSubmit = async (formData) => {
        try {
            if (currentEditItem) {
                await api.put(`${MODULE_CONFIG.endpoint}/${currentEditItem.id}`, formData);
                alert("Cita actualizada correctamente");
            } else {
                await api.post(MODULE_CONFIG.endpoint, formData);
                alert("Cita creada correctamente");
            }
            setIsModalOpen(false);
            fetchData(); 
        } catch (error) {
            console.error("Error al guardar:", error);
            alert("Error al guardar la Cita.");
        }
    };

    const handleDelete = async (id) => {
        if (!confirm("¿Estás seguro de eliminar esta cita?")) return;
        try {
            await api.delete(`${MODULE_CONFIG.endpoint}/${id}`);
            fetchData();
        } catch (error) {
            console.error("Error al eliminar:", error);
            alert("Error al eliminar el registro.");
        }
    };

    const handleOpenModal = (item = null) => {
        setCurrentEditItem(item);
        setIsModalOpen(true);
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">{MODULE_CONFIG.title}</h1>
                <button 
                    onClick={() => handleOpenModal(null)} 
                    className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded shadow transition">
                    + Nueva Cita
                </button>
            </div>

            <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
                {loading ? (
                    <div className="text-center py-10">
                        <p className="text-gray-500">Cargando datos...</p>
                    </div>
                ) : (
                    <Table 
                        columns={MODULE_CONFIG.columns} 
                        data={data} 
                        onDelete={handleDelete}
                        onEdit={handleOpenModal}
                    />
                )}
            </div>

            <ModalForm
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleModalSubmit}
                title={currentEditItem ? "Editar Cita" : "Nueva Cita"}
                fields={MODULE_CONFIG.formFields}
                initialData={currentEditItem}
            />
        </div>
    );
};

export default Citas;