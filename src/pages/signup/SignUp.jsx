import './SignUp.css';
import hero from '../../img/signup-photo.png';


function SignUp(){
    return(
        <div className="signup">
            <div className="signup-container">
                <div className='signup-container-data'>
                    <div className="keeipit-logo">KeepIt</div>
                    <div className='signup-titulo'>Registro de usuario</div>
                    <div className='signup-subtitulo'>Registrate para empezar a cargar y gestionar tus documentos y comprobantes</div>
                    <div className="login-user">
                        <div className="login-input-placeholder">Email</div>
                        <input  type="text" className="signup-input"></input>
                    </div>
                    <div className="login-user">
                        <div className="login-input-placeholder">Telefono</div>
                        <input  type="text" className="signup-input"></input>
                    </div>
                    <div className="login-password">
                        <div className="login-input-placeholder">Contraseña</div>
                        <input  type="password" className="signup-input"></input>
                    </div>
                    <a href='/home' className="signup-button">Registrarse</a>
                </div>
                <div className='signup-hero-img-cont'>
                    <img className='signup-hero-img' src={hero} alt="" />
                    <div className='signup-hero-text'>Organiza y ten seguimiento de tus comprobantes y documentos</div>
                </div>
            </div>
        </div>
    );
}

export default SignUp;