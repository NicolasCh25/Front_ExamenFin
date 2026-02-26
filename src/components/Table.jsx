const Table = ({ columns, data, onEdit, onDelete }) => {
    return (
        <div className="overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        {columns.map((col, index) => (
                            <th key={index} className="px-6 py-3">{col.header}</th>
                        ))}
                        <th className="px-6 py-3">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {data.length > 0 ? (
                        data.map((item, rowIndex) => (
                            <tr key={item.id || rowIndex} className="bg-white border-b hover:bg-gray-50">
                                {columns.map((col, colIndex) => (
                                    <td key={colIndex} className="px-6 py-4">
                                        {/* Accedemos a los Datos*/}
                                        {item[col.accessor]} 
                                    </td>
                                ))}
                                <td className="px-6 py-4 flex gap-2">
                                    <button 
                                        onClick={() => onEdit(item)}
                                        className="font-medium text-blue-600 hover:underline">
                                        Editar
                                    </button>
                                    <button 
                                        onClick={() => onDelete(item.id)}
                                        className="font-medium text-red-600 hover:underline">
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={columns.length + 1} className="text-center py-4">
                                No hay datos registrados.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Table;