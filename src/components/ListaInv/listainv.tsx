import { useEffect, useState } from "react";
import "./listainv.css";
import useDatos from "../../hooks/useDatos";
import { useNavigate } from "react-router-dom";

type Medicamento = {
  id: number;
  nombre: string;
  stock: number;
};

function ListaInvComponent() {
    const { obtenerMedList, loading } = useDatos();
    const [medicamentos, setMedicamentos] = useState<Medicamento[]>([]);
    const navigate = useNavigate();
    useEffect(() => {
        cargarMedicamentos();
    }, []);

    const cargarMedicamentos = async () => {
        const data = await obtenerMedList();
        setMedicamentos(data);
    };

    return (
        <div className="container-lista">
        <h2>Lista de Inventario</h2>

        {loading ? (
            <p>Cargando...</p>
        ) : (
            <ul className="lista-medicamentos">
            {medicamentos.map((med) => (
                <li key={med.id} className="medicamento-item">
                <span>{med.nombre}</span>
                <span>Stock: {med.stock}</span>
                </li>
            ))}
            </ul>
        )}
        <button className="btn btn-info" onClick={() => navigate("/inventario")}>Agregar más</button>
        </div>
    );
}

export default ListaInvComponent;