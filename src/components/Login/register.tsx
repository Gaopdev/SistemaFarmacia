import { useState } from "react";
import "./login.css";
import  useDatos  from "../../hooks/useDatos";
import { useNavigate } from "react-router-dom";

function RegisterComponent() {
    const navigate = useNavigate();
    const { registrarUsuario, loading, error } = useDatos();

    const [nombre, setNombre] = useState("");
    const [contrasena, setContrasena] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const res = await registrarUsuario({
        nombre,
        contrasena,
        });

        if (res) {
        console.log("Usuario registrado");
        setNombre("");
        setContrasena("");
        }
    };

    return (
        <div className="login-container">
        <div className="login-card">
            <h2>Crear Cuenta</h2>

            <form onSubmit={handleSubmit}>
            <div className="input-group">
                <label>Nombre</label>
                <input
                type="text"
                placeholder="Tu nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
                />
            </div>

            <div className="input-group">
                <label>Contraseña</label>
                <input
                type="password"
                placeholder="********"
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
                required
                />
            </div>

            <button type="submit" className="btn-login" disabled={loading}>
                {loading ? "Registrando..." : "Registrarse"}
            </button>
            </form>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <p className="extra-text">
            ¿Ya tienes cuenta? <span onClick={() => navigate("/inicio")}>Inicia sesión</span>
            </p>
        </div>
        </div>
    );
}

export default RegisterComponent;