import { useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import  useDatos  from "../../hooks/useDatos";

function LoginComponent() {
    const [nombre, setNombre] = useState("");
    const [contrasena, setContrasena] = useState("");

    const navigate = useNavigate();
    const { loginUsuario, loading, error } = useDatos();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const res = await loginUsuario({
        nombre,
        contrasena,
        });

        if (res) {
        navigate("/dashboard"); 
        }
    };

    return (
        <div className="login-container">
        <div className="login-card">
            <h2>Iniciar Sesión</h2>

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
                Entrar
            </button>
            </form>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <p className="extra-text">
            ¿No tienes cuenta?{" "}
            <span onClick={() => navigate("/registro")}>
                Regístrate
            </span>
            </p>
        </div>
        </div>
    );
}

export default LoginComponent;