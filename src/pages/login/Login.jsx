import './Login.css';
import { useNavigate } from 'react-router-dom';

function Login(){

    let navigate = useNavigate()

     const validarCredenciales = () => {
        let regexp = new RegExp("^[a-zA-Z0-9_-ñ-Ñ]*$")
        let flag = true

        const usuario = document.getElementById("login-usuario").value
        const contra = document.getElementById("login-contra").value
        const errorUsuario = document.getElementById("error-usuario")
        const errorContra = document.getElementById("error-contra")

        if(usuario.length < 3 || usuario.length > 20){
            errorUsuario.innerText = "El usuario debe tener entre 3 a 20 caracteres"
            flag = false
        }
        else{
            if(!regexp.test(usuario)){
                errorUsuario.innerText = "No se permiten caracteres especiales"
                flag = false
            }
            else{
                errorUsuario.innerText = ""
            }
        }
        if(contra.length < 3 || contra.length > 20){
            errorContra.innerText = "La contraseña debe tener entre 3 a 20 caracteres"
            flag = false
        }
        else{
            if(!regexp.test(contra)){
                errorContra.innerText = "No se permiten caracteres especiales"
                flag = false
            }
            else{
                errorContra.innerText = ""
            }
        }
        
        return flag;
    }

    const loguearse = () => {
        if(validarCredenciales()){
            navigate('/')
        }
    } 

    return(
        <div className="login">
            <div className="login-container">
                <div className='login-container-data'>
                    <div className="keeipit-logo">KeepIt</div>
                    <div className="login-user">
                        <div className="login-input-placeholder">Usuario</div>
                        <input  type="text" className="login-input" id='login-usuario'></input>
                        <p className='error-formulario-input' id='error-usuario'></p>
                    </div>
                    <div className="login-password">
                        <div className="login-input-placeholder">Contraseña</div>
                        <input  type="password" className="login-input" id='login-contra'></input>
                        <p className='error-formulario-input' id='error-contra'></p>
                    </div>
                    <a href='#' className="login-button" onClick={loguearse}>Acceder</a>
                    <div className="login-signup">
                        <div className="login-signup-text">No tienes usuario?</div>
                        <a href="#" className="login-signup-link">Crear Usuario</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;