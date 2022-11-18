import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'
import Popup from 'reactjs-popup';
import axios from 'axios';

const AddUserButton = () => {
    const url = `https://localhost:7016/api/Users`;

    const [open, setOpen] = useState(false);
    const closePopup = () => setOpen(false);

    const [addStatus, setAddStatus] = useState(0)

    const [value, setValue] = useState({
        firstName: "",
        lastName: "",
        isAdmin: false,
        email: "",
        passw: ""
    })

    useEffect(() => {
		if(addStatus == 1){
            window.location.reload();
            console.log("reload")
        }
		
	  })

    const handleEvent = (event: any) => {
        setValue({...value, [event.target.name]: event.target.value})
    }

    const handleEventAdmin = (event: any) => {
        let admin = event.target.value == "true" ? true : false;
        setValue({...value, [event.target.name]: admin})
    }

    const addUser = async () =>{
        await axios
			.post(url, {
                "firstName": value.firstName,
                "lastName": value.lastName,
                "isAdmin": value.isAdmin,
                "email": value.email,
                "passw": value.passw 
            }, {
				headers: {
					'Access-Control-Allow-Origin': '*'
				},
			})
			.then(response => {		
                console.log(response.data)
                setAddStatus(1);
			})
			.catch(error => {
				console.log(error);
                setAddStatus(-1);
			});
    }

    const showForm = () => {
        return(
            <>
            <p><label> 
            Nombre:
            <input type="text" name="firstName" value={value.firstName} onChange={event => {handleEvent(event) }}/> 
            </label> </p>
            <p><label> 
                Apellido:
                <input type="text" name="lastName" value={value.lastName} onChange={event => {handleEvent(event) }}/> 
            </label></p>
            <p><label> 
                Email:
                <input type="text" name="email" value={value.email} onChange={event => {handleEvent(event) }}/> 
            </label></p>
            <p><label> 
                Contraseña:
                <input type="text" name="passw" value={value.passw} onChange={event => {handleEvent(event) }}/> 
            </label></p>
            Es admin?
            <div onChange={event => {handleEventAdmin(event) }}>
                <input type="radio" value="true" name="isAdmin" checked={value.isAdmin}/> Si
                <input type="radio" value="false" name="isAdmin" checked={!value.isAdmin} /> No
            </div> 
            </>
        )
    }


	return (
        <>
        <button className='addUserButton' onClick={() => { setOpen(true); }}> Añadir Usuario <FontAwesomeIcon icon={faUserPlus} ></FontAwesomeIcon> </button>
        <Popup 
            open = {open}
            onClose={closePopup}
            modal
            nested
            >
            <div className="modalDelete">
                <div className='content'>
                    <div className='header'>
                        <h3> Añadir Usuario </h3>
                    </div>
                    <div className='info'>
                        {addStatus == 0 ? showForm() : addStatus == 1 ? "Se ha añadido correctamente" : addStatus == -1 ? "error" : ""}
                        
                        
                    </div>
                    <div className="actions"> 
                        <button className='blue' onClick={addUser}>
                            Añadir Usuario
                        </button>
                        <button className='red' onClick={() => { setOpen(false); }}>
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        </Popup>
        </>
    );
};
    
export default AddUserButton;