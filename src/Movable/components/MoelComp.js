import React from 'react'
import { Button, Header, Image, Modal } from 'semantic-ui-react'
import "../pages/AddEdit.css"
import "./Model.css"
const MoelComp = ({ open, setOpen, img, name, info, email, contact, address, category, dob, city, gender, state,nationality,pincode,qualification,married,mole,adhar,pan,designation,nominee,empno,id, handleDelete,mpp,account,ifsc,ev,fd,fd2,fd3 }) => {
    return (
        <Modal onClose={() => setOpen(false)} onOpen={() => setOpen(true)} open={open}>
            <Modal.Header>Employe Details</Modal.Header>
            <Modal.Content image>
                <div>
                <Image size="medium" src={img} wrapped />
                <h1 style={{"marginLeft":"70px","fontSize":"16px","fontWeight":"600"}}>{info}</h1>
                </div>
                <Modal.Description >
                    <Header>{name}</Header>
                    {/* <p>Emp code no :{adhar}</p>
                    <div className='sapn_style'>
                    
                            <p><strong className='strong_style'>Number of team size:</strong><span>{email}</span></p>

                    <p><strong className='strong_style'>Email:</strong><span>{email}</span></p>
                    <p><strong className='strong_style'>Mobile:</strong><span>{contact}</span></p>
                    
                    <p><strong className='strong_style'>Designation:</strong><span>{designation}</span></p>
                    <p><strong className='strong_style'>Qualification:</strong><span>{qualification}</span></p>
                    <p><strong className='strong_style'>Date Of Birth:</strong><span>{dob}</span></p>
                    <p><strong className='strong_style'>Gender:</strong><span>{gender}</span></p>
                    
                    <Header>Address For Comunication:</Header>
                  
                    <p><strong className='strong_style'>City:</strong><span>{city}</span></p>
                    <p><strong className='strong_style'>State:</strong><span>{state}</span></p>
                    <p><strong className='strong_style'>Postal Code:</strong><span>{pincode}</span></p>
                    <p><strong className='strong_style'>Nationality:</strong><span>{nationality}</span></p>
                    <Header>Extra Information</Header>
                    <p><strong className='strong_style'>Adhaar Number:</strong><span>{adhar}</span></p>
                    <p><strong className='strong_style'>Pan Number:</strong><span>{pan}</span></p>
                    <p><strong className='strong_style'>Matrial Status:</strong><span>{married}</span></p>
                    <p><strong className='strong_style'>Identification Marks :</strong><span>{mole}</span></p>
                    <p><strong className='strong_style'>Nominee Adhaar With Name:</strong><span>{nominee}</span></p>
                    <p><strong className='strong_style'>Family Detilas One:</strong><span>{nominee}</span></p>
                    <p><strong className='strong_style'>Family Details Two:</strong><span>{nominee}</span></p>
                    <p><strong className='strong_style'>Family Details THree:</strong><span>{nominee}</span></p>

                    <p><strong className='strong_style'>Extra information:</strong><span>{info}</span></p>
                    </div> */}
                    <table>
                        <thead>
                            <tr>
                                <th>S.no</th>
                                <th>Employee information</th>
                                <th>Employee data</th>
                            </tr>
                        </thead>
                        <tr>
                            <td>1</td>
                            <td>Employe code No</td>
                            <td>{empno}</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Number of Team Size</td>
                            <td>{empno}</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>Email id</td>
                            <td>{email}</td>
                        </tr>
                        <tr>
                            <td>4</td>
                            <td>Contact Number</td>
                            <td>{contact}</td>
                        </tr>
                        <tr>
                            <td>5</td>
                            <td>Designation</td>
                            <td>{designation}</td>
                        </tr>
                        <tr>
                            <td>6</td>
                            <td>Quaification</td>
                            <td>{qualification}</td>
                        </tr>
                        <tr>
                            <td>7</td>
                            <td>Data of Birth</td>
                            <td>{dob}</td>
                        </tr>
                        <tr>
                            <td>8</td>
                            <td>Gender</td>
                            <td>{gender}</td>
                        </tr>
                        <tr>
                            <td>9</td>
                            <td>City</td>
                            <td>{city}</td>
                        </tr>
                        <tr>
                            <td>10</td>
                            <td>State</td>
                            <td>{state}</td>
                        </tr>
                        <tr>
                            <td>11</td>
                            <td>Postal Code</td>
                            <td>{pincode}</td>
                        </tr>
                        <tr>
                            <td>12</td>
                            <td>Nationality</td>
                            <td>{nationality}</td>
                        </tr>
                        <tr>
                            <td>13</td>
                            <td>Adhaar Number</td>
                            <td>{adhar}</td>
                        </tr>
                        <tr>
                            <td>14</td>
                            <td>PAN Number</td>
                            <td>{pan}</td>
                        </tr>
                        <tr>
                            <td>15</td>
                            <td>Matrial Status</td>
                            <td>{married}</td>
                        </tr>
                        <tr>
                            <td>16</td>
                            <td>Identification Marks</td>
                            <td>{mole}</td>
                        </tr>
                        <tr>
                            <td>17</td>
                            <td>Nominee Adhaar with name</td>
                            <td>{nominee}</td>
                        </tr>
                        <tr>
                            <td>18</td>
                            <td>Family Details (1)</td>
                            <td>{fd}</td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>(2)</td>
                            <td>{fd2}</td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>(3) </td>
                            <td>{fd3}</td>
                        </tr>
                        <tr>
                            <td>19</td>
                            <td>Total Estimated project value </td>
                            <td>{ev}</td>
                        </tr>
                        <tr>
                            <td>20</td>
                            <td>Total number of months per project </td>
                            <td>{mpp}</td>
                        </tr>
                        <tr>
                            <td>21</td>
                            <td>Information</td>
                            <td>{info}</td>
                        </tr>
                        <tr>
                            <td>22</td>
                            <td>Bank Account No</td>
                            <td>{account}</td>
                        </tr>
                        <tr>
                            <td>23</td>
                            <td>IFSC Code No
                            </td>
                            <td>{ifsc}</td>
                        </tr>
                    </table>
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
                <Button color='black' onClick={() => setOpen(false)}>
                    Cancel
                </Button>
                <Button icon="checkmark" color='red' content="Delete" labelPosition="right" onClick={() => handleDelete(id)} />

            </Modal.Actions>
        </Modal>
    )
}

export default MoelComp