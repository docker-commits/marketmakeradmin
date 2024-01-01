import { getListSubheaderUtilityClass, IconButton, Paper } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { db, firebaseAuth, storage } from '../../firebase';
import { Button, Form, Grid, Loader, Select } from "semantic-ui-react"
import './AddEdit.css';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { async } from '@firebase/util';
import { addDoc, collection, doc, getDoc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { onAuthStateChanged } from 'firebase/auth';
import { Copyright } from './Copyright';
const initialState = {
    name: "",
    email: "",
    info: "",
    contact: "",
    address: "",
    category: "",
    dob: "",
    city: "",
    gender: "",
    state: "",
    nationality: "",
    pincode: "",
    qualification: "",
    married: "",
    mole: "",
    adhar: "",
    pan: "",
    designation: "",
    nominee:"",
    empno:"",
    ifsc:"",
    account:"",
    mpp:"",
    ev:"",
    fd:"",
    fd2:"",
    fd3:""
}
const AddEdit = () => {
    const [data, setData] = useState(initialState);
    const { name, email, info, contact, address, category, dob, city, gender, state, nationality, pincode, qualification, married, mole, adhar, pan, designation, nominee,empno,ifsc,account,mpp,ev,fd,fd2,fd3 } = data;
    const [file, setFile] = useState(null);
    const [progress, setProgress] = useState(null);
    const [errors, setErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const navigate = useNavigate();
    const [log, setLog] = useState(undefined);

    // onAuthStateChanged(firebaseAuth,(currentUser)=>{
    //     if(currentUser) setLog(currentUser);
    //     else navigate("/login");
    // })
    const getSingleUser = async () => {
        const docRef = doc(db, "employes", id);
        const snapshot = await getDoc(docRef);
        if (snapshot.exists()) {
            setData({ ...snapshot.data() });
        }
    }
    const { id } = useParams();
    useEffect(() => {
        id && getSingleUser()
    }, [id])
    useEffect(() => {
        const uploadFile = () => {
            const name = new Date().getTime() + file.name;
            const storageRef = ref(storage, file.name);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on("state_changed", (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setProgress(progress);
                switch (snapshot.state) {
                    case "paused":
                        console.log("Uploading Passed");
                        break;
                    case "running":
                        console.log("Upload is Running");
                        break;
                    default:
                        break;
                }
            }, (error) => { console.log(error) },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setData((prev) => ({ ...prev, img: downloadURL }))
                    });
                })
        }
        file && uploadFile()
    }, [file])
    const handleChange = (e) => {
        e.persist();
        setData({ ...data, [e.target.name]: e.target.value });
        console.log(data)
    };



    const validate = () => {
        let errors = {};
        if (!name) {
            errors.name = "Name is Required"
        }
        if (!email) {
            errors.email = "Email is Required"
        }
        if (!info) {
            errors.info = "Info is Required"
        }
        if (!contact) {
            errors.contact = "Contact is Required"
        }
        if (!address) {
            errors.contact = "address is Required"
        }
        if (!city) {
            errors.city = "Ciry is Required"
        }
        if (!state) {
            errors.state = "State is Required"
        }
        if (!nationality) {
            errors.nationality = "Nationality is Required"
        }
        if (!pincode) {
            errors.pincode = "Pincode is Required"
        }
        if (!qualification) {
            errors.qualification = "Quaifiction is Required"
        }
        if (!mole) {
            errors.mole = "identification marks   is Required"
        }
        if (!adhar) {
            errors.adhar = "Adhaar Number   is Required"
        }
        if (!pan) {
            errors.pan = "PAN Number is Required"
        }
        if (!nominee) {
            errors.nominee = "Nominee is Required"
        }
        if (!empno) {
            errors.empno = "Employee Number  is Required"
        }
        return errors;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let errors = validate();
        if (Object.keys(errors).length) return setErrors(errors);
        setIsSubmit(true);
        if (!id) {
            try {
                await addDoc(collection(db, "employes"), {
                    ...data,
                    timestamp: serverTimestamp()
                })
            } catch (error) {
                console.log(error)
            }


        }
        else {
            try {
                await updateDoc(doc(db, "employes", id), {
                    ...data,
                    timestamp: serverTimestamp()
                })
            } catch (error) {
                console.log(error)
            }
        }

        navigate("/");
    };

    // const options = [
    //     { key: 'm', text: 'Male', value: 'male' },
    //     { key: 'f', text: 'Female', value: 'female' },
    //     { key: 'o', text: 'Other', value: 'other' },
    //   ]
    return (
        <div className='bg-align'>
            <div className='glass-bg'>
                <Grid centered verticalAlign="middle" columns="3" style={{ height: "80vh" }}>
                    <Grid.Row>
                        <Grid.Column textAlign='center'>
                            <div>
                                {isSubmit ? <Loader active inline="centered" size="huge" /> : (
                                    <>
                                        <h2>{id ? "Update Employe" : "Add Employee"}</h2>
                                        <Form onSubmit={handleSubmit}>
                                            <Form.Input error={errors.name ? { content: errors.name } : null} label="Name" name="name" placeholder="Enter New Employee" onChange={handleChange} value={name} autoFocus />
                                            <Form.Input error={errors.empno ? { content: errors.empno } : null} label="Employee Number" name="empno" placeholder="Enter New Employee number" onChange={handleChange} value={empno}  />

                                            <Form.Input error={errors.email ? { content: errors.email } : null} label="Email" name="email" placeholder="Enter  Employee Email" onChange={handleChange} value={email} />
                                            <Form.Input error={errors.contact ? { content: errors.contact } : null} label="Contact" name="contact" placeholder="Enter  Employee contact" onChange={handleChange} value={contact} />
                                            <Form.Input error={errors.designation ? { content: errors.designation } : null} label="Designation" name="designation" placeholder="Enter  Employee designation" onChange={handleChange} value={designation} />
                                            <Form.Input type="number" error={errors.adhar ? { content: errors.adhar } : null} label="Adhaar" name="adhar" placeholder="Enter  Adhar" onChange={handleChange} value={adhar} />
                                            <Form.Input type="text" error={errors.pan ? { content: errors.pan } : null} label="PAN" name="pan" placeholder="Enter  Pan" onChange={handleChange} value={pan} />
                                            <span className='field'>
                                                <label>Gender</label>
                                            </span>
                                            <select name="gender" placeholder='Gender' onChange={handleChange} value={gender} required>
                                                <option value="" disabled selected>Select Gender</option>
                                                <option value="male" >Male</option>
                                                <option value="female" >Female</option>
                                            </select>
                                            <span className='field'>
                                                <label>Date of Birth</label>
                                            </span>
                                            <span className="datepicker-toggle">
                                                <span class="datepicker-toggle-button"></span>
                                                <input type="date" name="dob" class="datepicker-input" onChange={handleChange} value={dob} required />
                                            </span>
                                            <Form.Input error={errors.address ? { content: errors.address } : null} label="Address" name="address" placeholder="Enter  Address" onChange={handleChange} value={address} />

                                            <Form.Input error={errors.city ? { content: errors.city } : null} label="City" name="city" placeholder="Enter  city" onChange={handleChange} value={city} />
                                            <Form.Input error={errors.state ? { content: errors.state } : null} label="State" name="state" placeholder="Enter  State" onChange={handleChange} value={state} />
                                            <Form.Input error={errors.nationality ? { content: errors.nationality } : null} label="Nationality" name="nationality" placeholder="Enter  nationality" onChange={handleChange} value={nationality} />
                                            <Form.Input error={errors.pincode ? { content: errors.pincode } : null} label="Pincode" name="pincode" placeholder="Enter  pincode" onChange={handleChange} value={pincode} />
                                            <Form.Input error={errors.qualification ? { content: errors.qualification } : null} label="Qualification" name="qualification" placeholder="Enter  qualification" onChange={handleChange} value={qualification} />
                                            <Form.Input error={errors.nominee ? { content: errors.nominee } : null} label="Nominee" name="nominee" placeholder="Enter  nominee details" onChange={handleChange} value={nominee} />
                                            <Form.Input error={errors.ifsc ? { content: errors.ifsc } : null} label="IFSC" name="ifsc" placeholder="Enter  IFSC Code" onChange={handleChange} value={ifsc} />
                                            <Form.Input error={errors.account ? { content: errors.account } : null} label="Bank Account Number" name="account" placeholder="Enter  Bank Account Number" onChange={handleChange} value={account} />
                                            <Form.Input error={errors.mpp ? { content: errors.mpp } : null} label="Total months per project" name="mpp" placeholder="Enter  Total Months per project" onChange={handleChange} value={mpp} />
                                            <Form.Input error={errors.ev ? { content: errors.ev } : null} label="Total Estimated Project Value" name="ev" placeholder="Enter  Total estimated project value" onChange={handleChange} value={ev} />
                                            <Form.Input error={errors.fd ? { content: errors.fd } : null} label="Family Details (1)" name="fd" placeholder="Enter  Family Details (1)" onChange={handleChange} value={fd} />
                                            <Form.Input error={errors.fd2 ? { content: errors.fd } : null} label="Family Details (2)" name="fd2" placeholder="Enter  Family Details (2)" onChange={handleChange} value={fd2} />
                                            <Form.Input error={errors.fd3 ? { content: errors.fd } : null} label="Family Details (3)" name="fd3" placeholder="Enter  Family Details (3)" onChange={handleChange} value={fd3} />

                                            <span className='field'>
                                                <label>Status</label>
                                            </span>
                                            <select name="married" placeholder='married' onChange={handleChange} value={married} required>
                                                <option value="" disabled selected>Select Status</option>
                                                <option value="married">Married</option>
                                                <option value="unmarried" >Unmarried</option>
                                            </select>
                                            <span className='field'>
                                                <label>Category</label>
                                            </span>
                                            <select name="category" onChange={handleChange} value={category} required>
                                                <option value="" disabled selected>Select Category</option>
                                                <option value="1">Normal</option>
                                                <option value="2" >Advance</option>
                                                <option value="3" >Ceo</option>
                                            </select>
                                            <Form.TextArea error={errors.mole ? { content: errors.mole } : null} label="Moles" name="mole" placeholder="Enter  identification marks" onChange={handleChange} value={mole} />
                                            <Form.TextArea error={errors.info ? { content: errors.info } : null} label="info" name="info" placeholder="Enter  Employee info" onChange={handleChange} value={info} />

                                            {/* <Form.Input className='upbtn' id="at_btn" label="upload" name="upload" type="file" onChange={(e) => setFile(e.target.files[0])} hidden /> */}
                                            <IconButton className="field" color="primary" aria-label="upload picture" component="label">
                                                <input hidden accept="image/*" type="file" onChange={(e) => setFile(e.target.files[0])} />
                                                <PhotoCamera fontSize="large" />
                                            </IconButton>
                                            <br />
                                            <button className="ui labeled icon button">
                                                <i className="left chevron icon"></i>
                                                Back
                                            </button>
                                            {/* <Button primary onClick={Navigate("/")}> Back</Button> */}
                                            <Button primary type="submit" disabled={progress != null && progress < 100}> Submit</Button>
                                        </Form>

                                    </>
                                )}
                            </div>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>

            </div>

        </div>
    )
}

export default AddEdit






{/* <Grid sx={{ flexGrow: 1 }} container spacing={2}>
<Grid item xs={12}>
<Grid container justifyContent="center" spacing={5}>
{[0, 1, 2,3,4,5,6,7,8,9,10].map((value) => (
    <Grid key={value} item>
      <Paper
        sx={{
          height: 140,
          width: 100,
          backgroundColor: (theme) =>
            theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        }}
      />
    </Grid>
  ))}
</Grid>
</Grid>
</Grid> */}