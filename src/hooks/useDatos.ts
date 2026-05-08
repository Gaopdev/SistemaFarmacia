import { useState } from "react";
import {supabase} from "../utils/supabase"

type Usuario = {
    id?: number;
    nombre: string;
    contrasena: string;
};
type Medicamento = {
    id: number;
    nombre: string;
    stock: number;
    precio: number;
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

    const obtenerMedList = async () => {
    setLoading(true);
    setError(null);

    try {
        const { data, error } = await supabase
        .from("medicamento")
        .select("*")
        .limit(5);

        if (error) throw error;

        setLoading(false);
        return data || [];
    } catch (err: any) {
        setError(err.message);
        setLoading(false);
        return [];
    }
    };

    const obtenerResumenInventraio = async() => {
        setError(null);
        try{
            const { data, error} = await supabase.from("medicamento")
            .select("precio, stock");

            if(error) throw error;

            const medicamentos = data || [];

            const totalValor = medicamentos.reduce((acc,med) => {
                return acc + med.precio * med.stock;
            }, 0);
            const stockCritico = medicamentos.filter(
                (med) => med.stock < 10
            )
            return {
                totalValor,
                stockCritico};
        }catch(error:any){
            setError(error.message);
            return {
                valorTotal: 0,
                stockCritico: 0};
        }
    }

    return {
        registrarUsuario,
        loginUsuario,
        logout,
        loading,
        error,
        user,
        obtenerMedList,
        obtenerResumenInventraio
    };
}
export default useDatos