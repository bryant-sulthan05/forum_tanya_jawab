// Final: Profile Page with fix for update bug and preview profile photo
import React, { useState, useEffect, useCallback } from 'react';
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
    TextField,
    Button,
    useMediaQuery,
    useTheme
} from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import Layout from './Layout/Layout';
import Navbar from './Layout/Navbar';

const Profile = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [setAnswerCounts] = useState({});
    const { user } = useSelector(state => state.auth);
    const [dataUser, setdataUser] = useState({});
    const [tab, setTab] = useState(0);
    const [editProfile, setEditProfile] = useState({
        name: '',
        username: '',
        password: '',
        confPassword: '',
        mail: '',
        phone: '',
        file: null,
        previewUrl: ''
    });

    const fetchData = useCallback(async () => {
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
    }, [setQuestions, setAnswers, setAnswerCounts]);

    useEffect(() => {
        fetchData();
        getdataUser();
    }, [fetchData]);

    const getdataUser = async () => {
        const response = await axios.get('http://localhost:5000/me');
        setdataUser(response.data);
        setEditProfile({
            name: response.data.name || '',
            username: response.data.username || '',
            password: '',
            confPassword: '',
            mail: response.data.email || '',
            phone: response.data.tlp || '',
            file: null,
            previewUrl: response.data.url || ''
        });
    };

    const handleTabChange = (event, newValue) => {
        setTab(newValue);
    };

    const handleEditProfileChange = (e) => {
        const { name, value, files } = e.target;
        if (files) {
            setEditProfile(prev => ({
                ...prev,
                file: files[0],
                previewUrl: URL.createObjectURL(files[0])
            }));
        } else {
            setEditProfile(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSaveProfile = async () => {
        const formData = new FormData();
        formData.append('name', editProfile.name);
        formData.append('username', editProfile.username);
        formData.append('password', editProfile.password);
        formData.append('confPassword', editProfile.confPassword);
        formData.append('email', editProfile.mail);
        formData.append('tlp', editProfile.phone);
        if (editProfile.file) {
            formData.append('file', editProfile.file);
        }
        try {
            await axios.patch('http://localhost:5000/edit-profile', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            alert('Profil berhasil diperbarui');
            getdataUser();
        } catch (err) {
            alert('Gagal memperbarui profil');
            console.error(err);
        }
    };

    const borderColors = ['#FF6B6B', '#A66DD4', '#F9A826', '#6BCB77', '#4D96FF'];

    return (
        <Layout>
            <Navbar />
            <Container maxWidth="xl" sx={{ mt: '3rem', px: isMobile ? 1 : 4 }}>
                <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: 4 }}>
                    <Box sx={{ width: isMobile ? '100%' : 300, bgcolor: '#0C0950', color: 'white', p: 3, borderRadius: 3, textAlign: 'center' }}>
                        <Avatar
                            src={editProfile.previewUrl}
                            alt={editProfile.name}
                            sx={{ width: 100, height: 100, mx: 'auto', mb: 2 }}
                        >
                            {!editProfile.previewUrl && (editProfile.username || 'A')[0]?.toUpperCase()}
                        </Avatar>
                        <Typography variant="h6">{dataUser.name}</Typography>
                        <Typography>{dataUser.username}</Typography>
                        <Divider sx={{ my: 2 }} />
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <PhoneIcon sx={{ mr: 1 }} />
                            <Typography>{dataUser.tlp}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <EmailIcon sx={{ mr: 1 }} />
                            <Typography>{dataUser.email}</Typography>
                        </Box>
                    </Box>

                    <Box sx={{ flex: 1 }}>
                        <Tabs value={tab} onChange={handleTabChange}>
                            <Tab label="Pertanyaan" />
                            <Tab label="Jawaban" />
                            <Tab label="Edit Profil" />
                        </Tabs>

                        {tab === 0 ? (
                            <Box sx={{ mt: 2 }}>
                                {questions.filter(q => q.userId === user.id).map((item, index) => (
                                    <Card key={item.id} sx={{ mb: 2, borderLeft: `6px solid ${borderColors[index % borderColors.length]}`, backgroundColor: '#f5f5f5' }}>
                                        <CardContent>
                                            <Typography variant="h6" fontWeight={600}>{item.title}</Typography>
                                            <Typography>{item.question}</Typography>
                                        </CardContent>
                                    </Card>
                                ))}
                            </Box>
                        ) : (
                            <Typography variant="h6" fontWeight={600} sx={{ display: tab === 1 ? 'flex' : 'none' }}>Belum pernah menjawab pertanyaan</Typography>
                        )}
                        {tab === 1 ? (
                            <Box sx={{ mt: 2 }}>
                                {answers.filter(a => a.userId === user.id).map((item, index) => (
                                    <Card key={item.id} sx={{ mb: 2, borderLeft: `6px solid ${borderColors[index % borderColors.length]}`, backgroundColor: '#f5f5f5' }}>
                                        <CardContent>
                                            <Typography variant="h6" fontWeight={600}>{item.question?.title}</Typography>
                                            <Typography>{item.answer}</Typography>
                                        </CardContent>
                                    </Card>
                                ))}
                            </Box>
                        ) : (
                            <Typography variant="h6" fontWeight={600} sx={{ display: tab === 0 ? 'flex' : 'none' }}>Belum pernah bertanya? Ayo tanyakan apa yang ingin anda ketahui</Typography>
                        )}

                        {tab === 2 && (
                            <Box sx={{ mt: 3, maxWidth: 600 }}>
                                <TextField name="name" label="Nama" fullWidth sx={{ mb: 2 }} value={editProfile.name} onChange={handleEditProfileChange} />
                                <TextField name="username" label="Username" fullWidth sx={{ mb: 2 }} value={editProfile.username} onChange={handleEditProfileChange} />
                                <TextField name="password" label="Password" type="password" fullWidth sx={{ mb: 2 }} value={editProfile.password} onChange={handleEditProfileChange} />
                                <TextField name="confPassword" label="Konfirmasi Password" type="password" fullWidth sx={{ mb: 2 }} value={editProfile.confPassword} onChange={handleEditProfileChange} />
                                <TextField name="mail" label="Email" fullWidth sx={{ mb: 2 }} value={editProfile.mail} onChange={handleEditProfileChange} />
                                <TextField name="phone" label="No. HP" fullWidth sx={{ mb: 2 }} value={editProfile.phone} onChange={handleEditProfileChange} />
                                <Button variant="contained" component="label" sx={{ mb: 2 }}>
                                    Upload Foto
                                    <input type="file" hidden name="file" onChange={handleEditProfileChange} accept="image/*" />
                                </Button>
                                <Box>
                                    <Button variant="contained" onClick={handleSaveProfile} sx={{ bgcolor: '#2A5298' }}>Simpan Perubahan</Button>
                                </Box>
                            </Box>
                        )}
                    </Box>
                </Box>
            </Container>
        </Layout>
    );
};

export default Profile;
