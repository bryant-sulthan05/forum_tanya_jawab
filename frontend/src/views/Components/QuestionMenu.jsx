import React from 'react'
import { Box, Container, Typography } from '@mui/material'
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

const QuestionMenu = () => {
    const colors = ['#FFDB00', '#F9A826', '#6BCB77', '#4D96FF', '#FF6B6B', '#A66DD4']; // kamu bisa tambahkan warna lain

    const questions = [
        { title: 'Apa itu React?', subtitle: 'Penjelasan tentang library frontend.' },
        { title: 'Apa bedanya var dan let?', subtitle: 'Perbedaan dalam JavaScript.' },
        { title: 'Apa itu machine learning?', subtitle: 'Dasar pembelajaran mesin.' }
    ];

    const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];
    return (
        <Container maxWidth="lg" sx={{ marginTop: '8rem' }}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                    gap: 3,
                }}
            >
                <Typography
                    variant="h4"
                    color="#070F2B"
                    sx={{ fontFamily: 'Cal Sans', fontWeight: 400 }}
                >
                    Pertanyaan Terbaru
                </Typography>
                <Box
                    sx={{
                        width: '150px',
                        height: '4px',
                        backgroundColor: '#FFDB00',
                    }}
                />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignContent: 'center', mt: 5 }}>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>
                        {questions.map((q, index) => {
                            const borderColor = getRandomColor();
                            return (
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <Card key={index} sx={{
                                        borderLeft: `4px solid ${borderColor}`,
                                        borderRadius: '10px',
                                        mb: 2
                                    }}>
                                        <CardContent>
                                            <Typography variant="h5" sx={{ fontFamily: 'Cal Sans', fontWeight: 400 }}>
                                                {q.title}
                                            </Typography>
                                            <Typography variant="subtitle2" sx={{ fontFamily: 'Cal Sans', fontWeight: 400 }}>
                                                Pertanyaan oleh <span style={{ color: borderColor }}>User</span>
                                            </Typography>
                                            <Typography variant="h6" color="text.secondary" sx={{ fontFamily: 'PT Sans', fontWeight: 400 }}>
                                                {q.subtitle}
                                            </Typography>
                                            <Box sx={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                            }}>
                                                <Typography variant='body2' sx={{
                                                    color: '#070F2B',
                                                    fontFamily: 'PT Sans',
                                                    fontWeight: 700,
                                                    marginTop: '1rem'
                                                }}>
                                                    Lihat Jawaban
                                                </Typography>
                                                <Typography variant='body2' sx={{
                                                    color: '#070F2B',
                                                    fontFamily: 'PT Sans',
                                                    fontWeight: 700,
                                                    marginTop: '1rem',
                                                    width: 'cover',
                                                    padding: '5px',
                                                    borderRadius: '100%',
                                                    background: '#FFDB00'
                                                }}>
                                                    20
                                                </Typography>
                                            </Box>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            );
                        })}
                    </Grid>
                </Box>
            </Box>
        </Container>
    )
}

export default QuestionMenu