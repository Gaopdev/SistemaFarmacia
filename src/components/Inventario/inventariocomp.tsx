import { useState } from "react";
import "./inventariocomp.css"
import useDatos from "../../hooks/useDatos";

type MedicamentoUI = {
    id: number;
    titulo: string;
    precio: number;
    stock: number;
    categoria: string;
};

type Props = {
    products: MedicamentoUI[];
    recargar: () => Promise<void>;
};

function InventarioComponent({products, recargar}: Props) {
    const [modalOpen, setModalOpen] = useState(false);
    const [modalAgregar, setModalAgregar] = useState(false);
    const [editData, setEditData] = useState<MedicamentoUI | null>(null);
    const {actualizarMedicamento, eliminarMedicamento, agregarMedicamento} = useDatos();
    const [nuevoMed, setNuevoMed] = useState({
        titulo: "",
        precio: 0,
        stock: 0,
        categoria: ""
    });
    const guardarNuevo = async () => {
        await agregarMedicamento({
            nombre: nuevoMed.titulo,
            precio: nuevoMed.precio,
            stock: nuevoMed.stock,
            tipo: nuevoMed.categoria
        });
        await recargar();
        setModalAgregar(false);
    };
    const handleEditar = (item: MedicamentoUI) => {
        setEditData(item);
        setModalOpen(true);
    };
    const guardarCambios = async()=>{
        if (!editData) return;
        await actualizarMedicamento(editData.id, {
            nombre: editData.titulo,
            precio: editData.precio,
            stock: editData.stock,
            tipo: editData.categoria
        })
        await recargar();
        setModalOpen(false);
    }
    const handleEliminar = async (id: number) => {
        console.log("ELIMINANDO", id);
        await eliminarMedicamento(id);
        await recargar();
    };
    return (
        <div className="container-inventario">
            <div className="tabla-inv">
                {products.length === 0 ? (
                    <p>No hay medicamentos</p>
                ) : (
                    products.map((p) => (
                        <div className="card-medicamento" key={p.id}>

                            <div className="info">
                                <h3>{p.titulo}</h3>
                                <p>{p.categoria}</p>
                                <p>Precio: ${p.precio}</p>
                                <p className={p.stock < 10 ? "stock-rojo": "stock-normal"}>
                                    Stock: {p.stock}
                                </p>
                            </div>
                            <div className="acciones">
                                <button className="btn-editar" onClick={() => handleEditar(p)} >
                                    Editar
                                </button>

                                <button className="btn-eliminar" onClick={() => handleEliminar(p.id)}>
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    ))
                )}

            </div>
            {modalOpen && editData && (
                <div className="modal-overlay">
                    <div className="modal">

                        <h2>Editar medicamento</h2>

                        <input
                            value={editData.titulo}
                            onChange={(e) =>
                                setEditData({ ...editData, titulo: e.target.value })
                            }
                        />

                        <label htmlFor="">Precio</label>
                        <input
                            type="number"
                            value={editData.precio}
                            onChange={(e) =>
                                setEditData({ ...editData, precio: Number(e.target.value) })
                            }
                        />

                        <label htmlFor="">Stock</label>
                        <input
                            type="number"
                            value={editData.stock}
                            onChange={(e) =>
                                setEditData({ ...editData, stock: Number(e.target.value) })
                            }
                        />

                        <label htmlFor="">Categoria</label>
                        <input
                            value={editData.categoria}
                            onChange={(e) =>
                                setEditData({ ...editData, categoria: e.target.value })
                            }
                        />

                        <div className="modal-actions">
                            <button onClick={guardarCambios}>Guardar</button>
                            <button onClick={() => setModalOpen(false)}>Cancelar</button>
                        </div>

                    </div>
                </div>
            )}
            {modalAgregar && (
                <div className="modal-overlay">
                    <div className="modal">

                        <h2>Agregar medicamento</h2>

                        <input
                            placeholder="Nombre"
                            value={nuevoMed.titulo}
                            onChange={(e) =>
                                setNuevoMed({ ...nuevoMed, titulo: e.target.value })
                            }
                        />

                        <label htmlFor="">Precio</label>
                        <input
                            type="number"
                            placeholder="Precio"
                            value={nuevoMed.precio}
                            onChange={(e) =>
                                setNuevoMed({ ...nuevoMed, precio: Number(e.target.value) })
                            }
                        />

                        <label htmlFor="">Stock</label>
                        <input
                            type="number"
                            placeholder="Stock"
                            value={nuevoMed.stock}
                            onChange={(e) =>
                                setNuevoMed({ ...nuevoMed, stock: Number(e.target.value) })
                            }
                        />

                        <label htmlFor="">Categoria</label>
                        <input
                            placeholder="Categoría"
                            value={nuevoMed.categoria}
                            onChange={(e) =>
                                setNuevoMed({ ...nuevoMed, categoria: e.target.value })
                            }
                        />

                        <div className="modal-actions">
                            <button onClick={guardarNuevo}>Guardar</button>
                            <button onClick={() => setModalAgregar(false)}>Cancelar</button>
                        </div>

                    </div>
                </div>
            )}
            <button className="btn-agregar " onClick={() => setModalAgregar(true)}>
                Agregar medicamento
            </button>
        </div>
        
    );
}
export default InventarioComponent;