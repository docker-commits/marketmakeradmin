import { onAuthStateChanged } from 'firebase/auth';
import { collection, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Button, Card, Container, Grid, Image, Item, ItemDescription } from 'semantic-ui-react';
import { db, firebaseAuth } from '../../firebase';
import MoelComp from '../components/MoelComp';
import '../../App.css'
import { PacmanLoader } from 'react-spinners';
import { Copyright } from './Copyright';
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { SpeedDialAction } from 'devextreme-react/speed-dial-action';
const Home = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [user, setUser] = useState({});

    const [log, setLog] = useState(undefined);

    // onAuthStateChanged(firebaseAuth,(currentUser)=>{
    //     if(currentUser) setLog(currentUser);
    //     else navigate("/login");
    // })

    useEffect(() => {
        setLoading(true);
        // console.log(db)
        const unsub = onSnapshot(collection(db, "employes"), (snapshot) => {
            let list = [];
            snapshot.docs.forEach((doc) => {
                list.push({ id: doc.id, ...doc.data() })
            });
            setUsers(list);
            // console.log(users)
            setLoading(false);
        }, (errors) => {
            console.log(errors);
        })
        return () => {
            unsub();
        }
    }, [])
    if (loading) {
        return <div style={{ "display": "-webkit-inline-box" }}><PacmanLoader color={'#41579a'} /></div>;
    }
    const handleModal = (item) => {
        setOpen(true);
        setUser(item);
    }
    const handleDelete = async (id) => {
        if (window.confirm("Are you sur delete the Employe?")) {
            try {
                setOpen(false);
                await deleteDoc(doc(db, "employes", id));
                setUsers(users.filter((user) => user.id !== id));

            } catch (error) {
                console.log(error);
            }
        }
    }
    return (
        <Container style={{
            top: "50px",
            position: "relative"
        }}>

            <Grid columns={5} stackable>
                {
                    users && users.map((item) => (
                        
                        <Grid.Column key={item.id}>
                            {/* {item.name==="Bunny" ? <h1>dfdff</h1>:""} */}
                            <Card >
                                <Card.Content>
                                 
                                    <Image src={item.img} size="medium" style={{ height: "150px", width: "150px", borderRadius: "50%" }} />
                                    <Card.Header style={{ marginTop: "10px" }}>{item.name}</Card.Header>
                                    <Card.Description>{item.info}</Card.Description>
                                </Card.Content>
                                <Card.Content extra>
                                    <div>
                                        
                                        <Button color='green' onClick={() => navigate(`/update/${item.id}`)}>
                                            update
                                        </Button>
                                        <Button color='purple' onClick={() => handleModal(item)} >
                                            View
                                        </Button>
                                        {open && (
                                            <MoelComp
                                                open={open}
                                                setOpen={setOpen}
                                                handleDelete={handleDelete}
                                                {...user}
                                            />
                                        )}
                                    </div>
                                </Card.Content>
                            </Card>

                        </Grid.Column>
                    ))
                }

            </Grid>
            
        </Container>
    )
}

export default Home