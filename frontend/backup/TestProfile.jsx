import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import {
    Box,
    Typography,
    Avatar,
    Card,
    CardContent,
    Tabs,
    Tab,
    Divider,
    Container,
    Modal,
    TextField,
    Button,
    IconButton,
    useMediaQuery,
    useTheme
} from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Layout from './Layout/Layout';
import Navbar from './Layout/Navbar';

const Profile = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [answerCounts, setAnswerCounts] = useState({});
    const { user } = useSelector(state => state.auth);
    const [dataUser, setdataUser] = useState([]);
    const [tab, setTab] = useState(0);
    const [openModal, setOpenModal] = useState(false);
    const [editData, setEditData] = useState(null);
    const [form, setForm] = useState({
        title: '',
        body: '',
        image: null,
        previewImage: null
    });

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        getdataUser();
    }, []);

    const getdataUser = async () => {
        const response = await axios.get('http://localhost:5000/me');
        setdataUser(response.data);
    };

    const fetchData = async () => {
        try {
            const [questionsRes, answersRes, countsRes] = await Promise.all([
                axios.get('http://localhost:5000/'),
                axios.get('http://localhost:5000/my-answers'),
                axios.get('http://localhost:5000/count-answer')
            ]);

            setQuestions(questionsRes.data);
            setAnswers(answersRes.data);
            setAnswerCounts(countsRes.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handleTabChange = (event, newValue) => {
        setTab(newValue);
    };

    const openEditModal = (item) => {
        setEditData(item);
        setForm({
            title: item.title || '',
            body: item.question || item.answer || '',
            previewImage: item.url || null,
            image: null
        });
        setOpenModal(true);
    };

    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setForm({
                ...form,
                image: e.target.files[0],
                previewImage: URL.createObjectURL(e.target.files[0])
            });
        }
    };

    const handleEditSave = async () => {
        const formData = new FormData();
        formData.append('title', form.title);
        formData.append(tab === 0 ? 'question' : 'answer', form.body);
        if (form.image) {
            formData.append('file', form.image);
        }

        try {
            const endpoint = tab === 0 ? 'edit-question' : 'update-answer';
            await axios.patch(`http://localhost:5000/${endpoint}/${editData.id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setOpenModal(false);
            fetchData();
        } catch (error) {
            console.error("Error saving changes:", error);
        }
    };

    const handleDelete = async (id, type) => {
        if (window.confirm("Apakah kamu yakin ingin menghapus?")) {
            const endpoint = type === 'question' ? 'delete-question' : 'delete-answer';
            await axios.delete(`http://localhost:5000/${endpoint}/${id}`);
            fetchData();
        }
    };

    const borderColors = ['#FF6B6B', '#A66DD4', '#F9A826', '#6BCB77', '#4D96FF'];

    return (
        <Layout>
            <Navbar />
            <Container maxWidth="xl" sx={{ mt: '3rem', px: isMobile ? 1 : 4 }}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: isMobile ? 'column' : 'row',
                    p: isMobile ? 1 : 4,
                    minHeight: '100vh',
                    gap: isMobile ? 2 : 4
                }}>
                    {/* Profile Card */}
                    <Box sx={{
                        width: isMobile ? '100%' : 300,
                        height: isMobile ? 'auto' : 400,
                        backgroundColor: '#00E3A5',
                        borderRadius: '2rem',
                        p: isMobile ? 2 : 4,
                        textAlign: 'center',
                        order: isMobile ? 1 : 0
                    }}>
                        {user.url ? (
                            <Avatar
                                alt={dataUser.name}
                                src={dataUser.url}
                                sx={{
                                    width: isMobile ? 80 : 120,
                                    height: isMobile ? 80 : 120,
                                    margin: '0 auto',
                                    mb: 2
                                }}
                            />
                        ) : (
                            <Avatar sx={{
                                width: isMobile ? 80 : 120,
                                height: isMobile ? 80 : 120,
                                margin: '0 auto',
                                mb: 2,
                                bgcolor: '#FFDB00',
                                fontSize: isMobile ? 24 : 32
                            }}>
                                {dataUser?.username?.[0]?.toUpperCase() || 'A'}
                            </Avatar>
                        )}
                        <Typography variant={isMobile ? 'h6' : 'h5'} sx={{ fontFamily: 'Cal Sans', fontWeight: 'bold' }}>
                            {dataUser.name}
                        </Typography>
                        <Typography sx={{ fontFamily: 'PT Sans', mb: 2, fontSize: isMobile ? 14 : 16 }}>
                            {dataUser.username}
                        </Typography>
                        <Divider sx={{ my: 2 }} />
                        <Typography sx={{ fontWeight: 'bold', fontFamily: 'Cal Sans', fontSize: isMobile ? 14 : 16 }}>
                            Kontak
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 1 }}>
                            <PhoneIcon sx={{ mr: 1, fontSize: isMobile ? 18 : 24 }} />
                            <Typography sx={{ fontFamily: 'PT Sans', fontSize: isMobile ? 14 : 16 }}>
                                {dataUser.tlp}
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 1 }}>
                            <EmailIcon sx={{ mr: 1, fontSize: isMobile ? 18 : 24 }} />
                            <Typography sx={{ fontFamily: 'PT Sans', fontSize: isMobile ? 14 : 16 }}>
                                {dataUser.email}
                            </Typography>
                        </Box>
                    </Box>

                    {/* Content Section */}
                    <Box sx={{
                        flex: 1,
                        ml: isMobile ? 0 : 4,
                        order: isMobile ? 0 : 1
                    }}>
                        <Tabs
                            value={tab}
                            onChange={handleTabChange}
                            textColor="inherit"
                            indicatorColor="primary"
                            variant={isMobile ? 'scrollable' : 'standard'}
                            scrollButtons="auto"
                        >
                            <Tab label="Pertanyaan" />
                            <Tab label="Jawaban" />
                        </Tabs>

                        {tab === 0 && (
                            <Box sx={{ mt: 2 }}>
                                {questions.filter(q => q.userId === user.id).map((item, index) => (
                                    <Card
                                        key={item.id}
                                        sx={{
                                            mb: 2,
                                            borderLeft: `6px solid ${borderColors[index % borderColors.length]}`,
                                            backgroundColor: '#f5f5f5',
                                            borderRadius: 2
                                        }}
                                    >
                                        <CardContent>
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <Typography
                                                    variant={isMobile ? 'subtitle1' : 'h6'}
                                                    sx={{ fontFamily: 'Cal Sans', fontWeight: 'bold' }}
                                                >
                                                    {item.title}
                                                </Typography>
                                                <Box>
                                                    <IconButton
                                                        size={isMobile ? 'small' : 'medium'}
                                                        onClick={() => handleDelete(item.id, 'question')}
                                                    >
                                                        <DeleteIcon sx={{ color: 'red' }} />
                                                    </IconButton>
                                                    <IconButton
                                                        size={isMobile ? 'small' : 'medium'}
                                                        onClick={() => openEditModal(item)}
                                                    >
                                                        <EditIcon sx={{ color: 'blue' }} />
                                                    </IconButton>
                                                </Box>
                                            </Box>
                                            <Typography sx={{ fontFamily: 'PT Sans', fontSize: isMobile ? 14 : 16 }}>
                                                {item.question}
                                            </Typography>
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                                                <Typography variant="caption" sx={{ color: 'gray', fontSize: isMobile ? 12 : 14 }}>
                                                    {new Date(item.createdAt).toLocaleDateString()}
                                                </Typography>
                                                <Typography variant="caption" sx={{ color: 'gray', fontSize: isMobile ? 12 : 14 }}>
                                                    Terjawab: {answerCounts[item.id] || 0}
                                                </Typography>
                                            </Box>
                                        </CardContent>
                                    </Card>
                                ))}
                            </Box>
                        )}
                        {tab === 1 && (
                            <Box sx={{ mt: 2 }}>
                                {answers.filter(a => a.userId === user.id).map((item, index) => (
                                    <Card
                                        key={item.id}
                                        sx={{
                                            mb: 2,
                                            borderLeft: `6px solid ${borderColors[index % borderColors.length]}`,
                                            backgroundColor: '#f5f5f5',
                                            borderRadius: 2
                                        }}
                                    >
                                        <CardContent>
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <Typography
                                                    variant={isMobile ? 'subtitle1' : 'h6'}
                                                    sx={{ fontFamily: 'Cal Sans', fontWeight: 'bold' }}
                                                >
                                                    {item.question?.title || 'Pertanyaan'}
                                                </Typography>
                                                <Box>
                                                    <IconButton
                                                        size={isMobile ? 'small' : 'medium'}
                                                        onClick={() => handleDelete(item.id, 'answer')}
                                                    >
                                                        <DeleteIcon sx={{ color: 'red' }} />
                                                    </IconButton>
                                                    <IconButton
                                                        size={isMobile ? 'small' : 'medium'}
                                                        onClick={() => openEditModal(item)}
                                                    >
                                                        <EditIcon sx={{ color: 'blue' }} />
                                                    </IconButton>
                                                </Box>
                                            </Box>
                                            <Typography sx={{ fontFamily: 'PT Sans', fontSize: isMobile ? 14 : 16 }}>
                                                {item.answer}
                                            </Typography>
                                            <Typography
                                                variant="caption"
                                                sx={{
                                                    color: 'gray',
                                                    mt: 1,
                                                    display: 'block',
                                                    fontSize: isMobile ? 12 : 14
                                                }}
                                            >
                                                {new Date(item.createdAt).toLocaleDateString()}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                ))}
                            </Box>
                        )}
                    </Box>
                </Box>
            </Container>

            {/* Edit Modal */}
            <Modal open={openModal} onClose={() => setOpenModal(false)}>
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: isMobile ? '90%' : 400,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: isMobile ? 2 : 4,
                    borderRadius: 2
                }}>
                    <Typography variant="h6" sx={{ mb: 2, fontFamily: 'Cal Sans' }}>
                        Edit {tab === 0 ? 'Pertanyaan' : 'Jawaban'}
                    </Typography>

                    {tab === 0 && (
                        <TextField
                            label="Judul"
                            fullWidth
                            sx={{ mb: 2 }}
                            value={form.title}
                            onChange={(e) => setForm({ ...form, title: e.target.value })}
                            size={isMobile ? 'small' : 'medium'}
                        />
                    )}

                    <TextField
                        label={tab === 0 ? "Isi Pertanyaan" : "Jawaban"}
                        fullWidth
                        multiline
                        rows={isMobile ? 3 : 4}
                        value={form.body}
                        onChange={(e) => setForm({ ...form, body: e.target.value })}
                        sx={{ mb: 2 }}
                        size={isMobile ? 'small' : 'medium'}
                    />

                    {form.previewImage && (
                        <Box sx={{ mb: 2 }}>
                            <Typography variant="body2" sx={{ mb: 1 }}>Gambar saat ini:</Typography>
                            <img
                                src={form.previewImage}
                                alt="Preview"
                                style={{
                                    maxWidth: '100%',
                                    maxHeight: isMobile ? '100px' : '150px',
                                    borderRadius: '8px'
                                }}
                            />
                        </Box>
                    )}

                    <Button
                        variant="contained"
                        component="label"
                        sx={{ mb: 2 }}
                        size={isMobile ? 'small' : 'medium'}
                    >
                        {form.previewImage ? 'Ganti Gambar' : 'Tambah Gambar'}
                        <input
                            type="file"
                            hidden
                            onChange={handleImageChange}
                            accept="image/*"
                        />
                    </Button>

                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                        <Button
                            variant="contained"
                            onClick={handleEditSave}
                            sx={{ backgroundColor: '#00E3A5', color: 'white' }}
                            size={isMobile ? 'small' : 'medium'}
                        >
                            Simpan
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </Layout>
    );
};

export default Profile;