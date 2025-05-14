import React, { useState, useEffect } from 'react'
// login app
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { LoginUser, Profile, reset } from "../features/authSlice"
// material ui
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import FormGroup from '@mui/material/FormGroup'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
// icons & img
import Person from '@mui/icons-material/Person'

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, isError, isSuccess, isLoading, pesan } = useSelector((state) => state.auth);

    useEffect(() => {
        if (user || isSuccess) {
            navigate("/");
        }
        dispatch(Profile());
        dispatch(reset());
    }, [user, isSuccess, dispatch, navigate]);

    const Auth = (e) => {
        e.preventDefault();
        dispatch(LoginUser({ email, password }));
    }
    return (
        <div style={{ background: 'linear-gradient(to left, #F9FBE7, #FFEA85)', minHeight: '100vh', backgroundRepeat: 'no-repeat' }}>
            <div style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/background.svg)`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
                <Container maxWidth="xl" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
                    <Box flexGrow={1}>
                        <Grid container spacing={2}>
                            <Grid md={6} sx={{ display: { xs: 'none', md: 'grid' }, justifyContent: 'center', alignItems: 'center' }}>
                                <img src='/furniture.png' style={{ width: '30rem' }} alt='furniture' />
                                <Typography variant='body1' sx={{ fontFamily: 'Poppins', textAlign: 'center' }}>Menjual berbagai macam furniture</Typography>
                                <Typography variant='overline' sx={{ fontFamily: 'Poppins', textAlign: 'center', pb: '6rem' }}>Membuat rumah menjadi mewah dengan iCraft</Typography>
                            </Grid>
                            <Grid xs={12} md={3} sx={{ ml: { xs: '0', md: '15rem' } }}>
                                {pesan ? (
                                    <Alert severity="warning" sx={{ mb: '.5rem' }}>
                                        <AlertTitle>Warning</AlertTitle>
                                        <strong>{pesan}</strong>
                                    </Alert>
                                ) : (
                                    ''
                                )
                                }
                                <Card sx={{ background: '#F7F5F2', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)' }}>
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" sx={{ textAlign: 'center', mb: '2rem', fontFamily: 'Poppins', fontWeight: '400', letterSpacing: '.2rem' }}>
                                            Login
                                        </Typography>
                                        <Typography sx={{ display: 'flex', justifyContent: 'center' }}>
                                            <Avatar sx={{ width: 100, height: 100 }}>
                                                <Person sx={{ width: 90, height: 90 }} />
                                            </Avatar>
                                        </Typography>
                                    </CardContent>
                                    <CardContent sx={{ mt: '1rem' }}>
                                        <form onSubmit={Auth}>
                                            <FormGroup sx={{ mb: '1rem' }}>
                                                <Typography variant="body1" sx={{ fontWeight: '400', fontFamily: 'Poppins' }}>Email :</Typography>
                                                <TextField id="outlined-basic" variant="outlined" type='text' size='small' sx={{ background: '#E9E4DA' }} value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' required />
                                            </FormGroup>
                                            <FormGroup sx={{ mb: '1rem' }}>
                                                <Typography variant="body1" sx={{ fontWeight: '400', fontFamily: 'Poppins' }}>Password :</Typography>
                                                <TextField id="outlined-basic" variant="outlined" type='password' size='small' sx={{ background: '#E9E4DA' }} value={password} onChange={(e) => setPassword(e.target.value)} placeholder='*****' required />
                                            </FormGroup>
                                            <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
                                                <FormGroup>
                                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                                        <Button type='submit' variant='contained' sx={{
                                                            background: '#d13f30',
                                                            color: '#E9E4DA',
                                                            fontWeight: 'bold',
                                                            width: '100px',
                                                            fontFamily: 'Poppins',
                                                            letterSpacing: '.1rem',
                                                            '&:hover': {
                                                                background: '#D71313'
                                                            }
                                                        }}>
                                                            {isLoading ? 'Loading...' : 'Login'}
                                                        </Button>
                                                    </div>
                                                </FormGroup>
                                            </CardActions>
                                        </form>
                                    </CardContent>
                                </Card>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: '.6rem' }}>
                                    <Typography variant="body1" component="a" href='/register' sx={{ fontFamily: 'Poppins', textDecoration: 'none', color: '#000' }}>
                                        Daftar
                                    </Typography>
                                    <Typography variant="body1" component="a" href='/forgetPassword' sx={{ fontFamily: 'Poppins', textDecoration: 'none', color: '#000' }}>
                                        Lupa password
                                    </Typography>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </Container>
            </div>
        </div >
    )
}

export default Login