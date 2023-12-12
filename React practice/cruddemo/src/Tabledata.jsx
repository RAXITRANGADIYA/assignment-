import React, { useEffect, useState } from 'react';
import {
    MDBTable, MDBTableHead, MDBTableBody, MDBIcon, MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
    MDBInput,
} from 'mdb-react-ui-kit';
// import Custom from './hooks/CustomHooks';
import CutomHooks from './hooks/CustomHooks';
import "./cusom.css"

export default function App() {
    const [insertModel, setBasicModal] = useState(false);
    const [updateModel, setBasicupdateModal] = useState(false);
    const [apidata, setapiData] = useState()
    const [loading, setLoading] = useState(false)
    const [Update, setUpdate] = useState();
    const[updatestatus,setUpdatestatus]=useState(false)
    const { handleChange, inp, updatedData } = CutomHooks(Update)
    const edit = (Update)
    console.log(edit, "edit");
    useEffect(() => {
        getData()
        PatchUser()
    }, [])
    const toggleOpen = () => setBasicModal(!insertModel);
    const updatetoggle = () => setBasicupdateModal(!updateModel);
    const getData = async () => {
        const responce = await fetch("http://localhost:3005/users");
        const data = await responce.json();
        console.log("data", data);
        const userList = data.map((val, key) => {
            return <tr key={key}>
                <th scope='row'>{key}</th>
                <td>{val.name}</td>
                <td>{val.email}</td>
                <td>{val.mobile}</td>
                <td className='but'>
                    <MDBBtn data-id={val.id} onClick={() => { updatetoggle(val.id); PatchUser(val.id) }} rounded size='sm' className='me-1' color='primary'>
                        <MDBIcon fas icon="edit" />
                    </MDBBtn>
                    <MDBBtn onClick={() => { delUser(val.id) }} data-id={val.id} rounded size='sm' className='me-1' color='danger'>
                        <MDBIcon fas icon="trash" />
                    </MDBBtn>
                </td>
                <td className='but'>
                </td>
            </tr>
        })
        setapiData(userList)
    }
    // add users START
    const addUser = async () => {
        const add = { ...inp };
        await fetch("http://localhost:3005/users", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify(add)
        })
        getData()
    }
    // add users END
    // delete user START
    const delUser = async (userId) => {
        try {
            console.log(userId, "id is here for del");

            await fetch(`http://localhost:3005/users/${userId}`, {
                method: 'DELETE',
            });

            // Update the UI by fetching the updated data
            getData();
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };
    // delete user END
    // Patch START
    const PatchUser = async (val) => {
        const responce = await fetch(`http://localhost:3005/users/${val}`, {
            method: 'PATCH',
        });
        const data = await responce.json()
        // console.log("update data",data.name);
        updatedData(data)
        setUpdate(data)
        setLoading(true)
    }
    // Patch END
    // put START
    const PutIN = async () => {
        const responce = await fetch(`http://localhost:3005/users/${edit.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(inp)
        })
        const data=await responce.json()
        setLoading(true)
        console.log("save changes",data);
        setUpdatestatus(true)
        // getData()
    }
    // put END
    return (
        <div>
            <MDBTable hover>
                <MDBTableHead>
                    <tr className='text-light bg-secondary fs-5'>
                        <th scope='col'>sr.no</th>
                        <th scope='col'>Name</th>
                        <th scope='col'>E-mail</th>
                        <th scope='col'>Mobile</th>
                        <th scope='col'>Action</th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody>
                    {apidata}
                </MDBTableBody>
                <MDBBtn onClick={toggleOpen} className='me-1 m-2' color='success'>
                    <MDBIcon className='fs-4' fas icon="plus-circle" />
                </MDBBtn>
            </MDBTable>
            {/* model start */}
            <MDBModal open={insertModel} setOpen={setBasicModal} tabIndex='-1'>
                <MDBModalDialog size='lg'>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle>Insert user</MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={toggleOpen}></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody >
                            <MDBTable >
                                <tr>
                                    <td><MDBInput name='name' onChange={handleChange} type='text' label='Name'></MDBInput></td>
                                </tr>
                                <tr >
                                    <td><MDBInput name='mobile' onChange={handleChange} type='number' label='Mobile'></MDBInput></td>
                                </tr>
                                <tr>
                                    <td><MDBInput name='email' onChange={handleChange} type='email' label='Email'></MDBInput></td>
                                </tr>


                            </MDBTable>
                        </MDBModalBody>

                        <MDBModalFooter>
                            <MDBBtn color='secondary' onClick={toggleOpen}>
                                Close
                            </MDBBtn>
                            <MDBBtn onClick={addUser}>Save</MDBBtn>
                        </MDBModalFooter>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
            <MDBModal open={updateModel} setOpen={setBasicupdateModal} tabIndex='-1'>
                <MDBModalDialog size='lg'>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle>Insert user</MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={updatetoggle}></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody >
                            <MDBTable >
                                <tr>
                                    <td><MDBInput name='name' value={loading ? inp.name : "false"} onChange={handleChange} type='text' label='Name'></MDBInput></td>
                                </tr>
                                <tr >
                                    <td><MDBInput name='mobile' value={loading ? inp.mobile : "false"} onChange={handleChange} type='number' label='Mobile'></MDBInput></td>
                                </tr>
                                <tr>
                                    <td><MDBInput name='email' value={loading ? inp.email : "false"} onChange={handleChange} type='email' label='Email'></MDBInput></td>
                                </tr>


                            </MDBTable>
                        </MDBModalBody>

                        <MDBModalFooter>
                            <MDBBtn color='secondary' onClick={updatetoggle}>
                                Close
                            </MDBBtn>
                            <MDBBtn onClick={()=>{PutIN();getData()}}>Save changes</MDBBtn>
                        </MDBModalFooter>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
        </div>
    );
}