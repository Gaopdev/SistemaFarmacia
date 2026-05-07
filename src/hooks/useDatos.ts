import { useState } from "react";
import {supabase} from "../utils/supabase"

type Usuario = {
    id?: number;
    nombre: string;
    contrasena: string;
};

function useDatos(){
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [user, setUser] = useState<Usuario | null>(null);

    // REGISTRO
    const registrarUsuario = async (data: Usuario) => {
        setLoading(true);
        setError(null);

        try {
        const { data: result, error } = await supabase
            .from("usuario")
            .insert([
            {
                nombre: data.nombre,
                contrasena: data.contrasena,
            },
            ])
            .select()
            .single();

        if (error) throw error;

        setUser(result);
        return result;
        } catch (err: any) {
        setError(err.message);
        return null;
        } finally {
        setLoading(false);
        }
    };

    //LOGIN
    const loginUsuario = async (data: Usuario) => {
        setLoading(true);
        setError(null);

        try {
        const { data: result, error } = await supabase
            .from("usuario")
            .select("*")
            .eq("nombre", data.nombre)
            .eq("contrasena", data.contrasena)
            .single();

        if (error || !result) {
            throw new Error("Usuario o contraseña incorrectos");
        }

        setUser(result);
        return result;
        } catch (err: any) {
        setError(err.message);
        return null;
        } finally {
        setLoading(false);
        }
    };

    //LOGOUT
    const logout = () => {
        setUser(null);
    };

    return {
        registrarUsuario,
        loginUsuario,
        logout,
        loading,
        error,
        user,
    };
}
export default useDatos