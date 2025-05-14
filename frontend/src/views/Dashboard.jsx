import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {
    Box,
    Container,
    Typography,
    InputBase,
    Button,
    Tooltip,
    TextField,
    useMediaQuery,
    useTheme,
    Modal,
    ImageList,
} from '@mui/material';

import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';

import Layout from './Layout/Layout';
import Navbar from './Layout/Navbar';
import QuestionMenu from './Components/QuestionMenu';
import Footer from './Layout/Footer';

const Dashboard = () => {
    const [file, setFile] = useState('');
    const [preview, setPreview] = useState('');
    const [open, setOpen] = useState(false);
    const { user } = useSelector((state) => state.auth);

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: isSmallScreen ? '90%' : 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: '#F6F1DE',
        width: '100%',
        maxWidth: '800px',
        [theme.breakpoints.up('sm')]: {
            width: '90ch',
        },
    }));

    const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }));

    const StyledInputBase = styled(InputBase)(({ theme }) => ({
        '& .MuiInputBase-input': {
            padding: theme.spacing(1, 1, 1, 0),
            paddingLeft: `calc(1em + ${theme.spacing(4)})`,
            transition: theme.transitions.create('width'),
            width: '100%',
            color: '#070F2B',
            fontFamily: 'Cal Sans',
            '&::placeholder': {
                color: '#070F2B',
                fontFamily: 'Cal Sans',
                opacity: 0.5,
            },
        },
    }));

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const loadImage = (e) => {
        const image = e.target.files[0];
        setFile(image);
        setPreview(URL.createObjectURL(image));
    };

    return (
        <Layout>
            <section
                style={{
                    background: 'linear-gradient(to bottom, #0C0950 0%, #2A5298 100%)',
                    minHeight: '80vh',
                }}
            >
                <Navbar />
                <Container maxWidth="lg">
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            minHeight: '80vh',
                            textAlign: 'center',
                            gap: 3,
                        }}
                    >
                        {user && (
                            <Typography
                                variant={isSmallScreen ? 'h5' : 'h3'}
                                color="#F6F1DE"
                                sx={{ fontFamily: 'Cal Sans', fontWeight: 400 }}
                            >
                                Selamat Datang {user.username} di Intelligentsia Guild
                            </Typography>
                        )}
                        {!user && (
                            <Typography
                                variant={isSmallScreen ? 'h5' : 'h3'}
                                color="#F6F1DE"
                                sx={{ fontFamily: 'Cal Sans', fontWeight: 400 }}
                            >
                                Selamat Datang di Intelligentsia Guild
                            </Typography>
                        )}
                        <Box
                            sx={{
                                width: '150px',
                                height: '4px',
                                backgroundColor: '#FFDB00',
                            }}
                        />
                        <Typography
                            variant="h6"
                            color="#F6F1DE"
                            sx={{ fontFamily: 'Cal Sans', fontWeight: 400 }}
                        >
                            Platform untuk belajar dan berbagi ilmu pengetahuan
                        </Typography>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: isSmallScreen ? 'column' : 'row',
                                gap: 2,
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '100%',
                            }}
                        >
                            <Search>
                                <SearchIconWrapper>
                                    <SearchIcon sx={{ color: '#070F2B' }} />
                                </SearchIconWrapper>
                                <StyledInputBase
                                    placeholder="Apa yang ingin anda ketahui? Cari disini..."
                                />
                            </Search>
                            <Tooltip title="Buat Pertanyaan" placement="bottom" arrow>
                                <Button
                                    onClick={handleOpen}
                                    sx={{
                                        backgroundColor: '#FFDB00',
                                        color: '#070F2B',
                                        fontFamily: 'Cal Sans',
                                        fontWeight: 400,
                                        borderRadius: '10px',
                                        padding: '10px 20px',
                                        '&:hover': {
                                            backgroundColor: '#FFDB00',
                                            opacity: 0.8,
                                        },
                                        whiteSpace: 'nowrap',
                                    }}
                                >
                                    <AddIcon sx={{ mr: 1 }} />
                                    Buat Pertanyaan
                                </Button>
                            </Tooltip>
                        </Box>
                        <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={style}>
                                <Typography id="modal-title" variant="h6" sx={{ fontFamily: 'Cal Sans', mb: 2 }}>
                                    Buat Pertanyaan
                                </Typography>
                                <form onSubmit={(e) => e.preventDefault()}>
                                    <TextField
                                        label="Judul Pertanyaan"
                                        name="title"
                                        fullWidth
                                        required
                                        variant="outlined"
                                        sx={{ mb: 2 }}
                                    />
                                    <TextField
                                        label="Deskripsi Pertanyaan"
                                        name="question"
                                        fullWidth
                                        required
                                        multiline
                                        rows={4}
                                        variant="outlined"
                                        sx={{ mb: 2 }}
                                    />
                                    {preview ? (
                                        <ImageList sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                                                <img src={preview} alt="preview" loading="lazy" style={{ width: '320px', height: '320px', marginTop: '1rem' }} />
                                            </Box>
                                            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                                                <img src={preview} alt="preview" loading="lazy" style={{ width: '150px', height: '150px', marginTop: '1rem' }} />
                                            </Box>
                                        </ImageList>
                                    ) : (
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignContent: 'center',
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    fontFamily: 'PT Sans',
                                                    border: '2px solid #000',
                                                    marginTop: '1rem',
                                                    padding: '5px',
                                                    borderRadius: '2%',
                                                    width: isSmallScreen ? '150px' : '320px',
                                                    height: isSmallScreen ? '150px' : '320px',
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                }}
                                            >
                                                Preview Image
                                            </Typography>
                                        </Box>
                                    )}
                                    <label
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            fontWeight: '400',
                                            background: '#FFDB00',
                                            color: '#070F2B',
                                            padding: '5px',
                                            marginTop: '.5rem',
                                            fontFamily: 'Cal Sans',
                                            borderRadius: '5px',
                                            marginBottom: '2rem',
                                        }}
                                        htmlFor="img-product"
                                    >
                                        Pilih Gambar
                                    </label>
                                    <input
                                        type="file"
                                        id="img-product"
                                        onChange={loadImage}
                                        style={{ display: 'none' }}
                                    />
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                        sx={{ fontWeight: 'bold' }}
                                    >
                                        Kirim Pertanyaan
                                    </Button>
                                </form>
                            </Box>
                        </Modal>
                    </Box>
                </Container>
            </section>
            <section className="QuestionMenu" style={{ minHeight: '80vh' }}>
                <QuestionMenu />
            </section>
            <section className="Footer">
                <Footer />
            </section>
        </Layout>
    );
};

export default Dashboard;