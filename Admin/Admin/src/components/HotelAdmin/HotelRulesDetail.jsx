import React, { useEffect, useState } from 'react';
import {
    Box,
    Typography,
    List,
    ListItem,
    ListItemText,
    Divider,
    Button,
    TextField,
} from '@mui/material';
import axios from 'axios';

const HotelRulesDetail = () => {
    const [hotelRules, setHotelRules] = useState({
        checkIn: '',
        checkOut: '',
        cancellationPolicy: '',
        childPolicies: [''],
        cotAndExtraBedPolicies: [''],
        noAgeRestriction: true,
        petsAllowed: false,
        acceptedCards: [''],
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const fetchHotelRules = async () => {
            setLoading(true);
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    setError("Token is missing. Please log in.");
                    setLoading(false);
                    return;
                }

                const response = await axios.post(
                    'http://localhost:2000/api/hotel-rules',
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setHotelRules(response.data);
                setLoading(false);
            } catch (err) {
                console.error('API Error:', err);
                setError('Failed to load hotel rules. Please check console for errors.');
                setLoading(false);
            }
        };
        fetchHotelRules();
    }, []);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setHotelRules((prevRules) => ({
            ...prevRules,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleArrayInputChange = (e, arrayName, index) => {
        const { value } = e.target;
        setHotelRules((prevRules) => ({
            ...prevRules,
            [arrayName]: prevRules[arrayName].map((item, i) =>
                i === index ? value : item
            ),
        }));
    };

    const handleAddArrayItem = (arrayName) => {
        setHotelRules((prevRules) => ({
            ...prevRules,
            [arrayName]: [...prevRules[arrayName], ''],
        }));
    };

    const handleRemoveArrayItem = (arrayName, index) => {
        setHotelRules((prevRules) => ({
            ...prevRules,
            [arrayName]: prevRules[arrayName].filter((_, i) => i !== index),
        }));
    };

    const handleSaveRules = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setError("Token is missing. Please log in.");
                setLoading(false);
                return;
            }

            await axios.post(
                'http://localhost:2000/api/hotel-rules',
                hotelRules,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setIsEditing(false);
            setLoading(false);
        } catch (err) {
            console.error('API Error:', err);
            setError('Failed to save hotel rules. Please check console for errors.');
            setLoading(false);
        }
    };

    if (loading) {
        return <Typography>Loading...</Typography>;
    }

    if (error) {
        return <Typography color="error">{error}</Typography>;
    }

    return (
        <Box sx={{ padding: 3 }}>
            <Typography variant="h4" sx={{ color: '#00ADB5', fontWeight: 'bold', marginBottom: 3 }}>
                Hotel Rules
            </Typography>

            {isEditing ? (
                <>
                    {/* Input Fields */}
                    <TextField label="Check-in" name="checkIn" value={hotelRules.checkIn} onChange={handleInputChange} fullWidth margin="normal" />
                    <TextField label="Check-out" name="checkOut" value={hotelRules.checkOut} onChange={handleInputChange} fullWidth margin="normal" />
                    <TextField label="Cancellation Policy" name="cancellationPolicy" value={hotelRules.cancellationPolicy} onChange={handleInputChange} fullWidth margin="normal" />

                    {/* Array Inputs */}
                    <Typography variant="h6">Child Policies</Typography>
                    {hotelRules.childPolicies.map((policy, index) => (
                        <Box key={index} sx={{ display: 'flex', alignItems: 'center', marginBottom: 1 }}>
                            <TextField value={policy} onChange={(e) => handleArrayInputChange(e, 'childPolicies', index)} fullWidth />
                            <Button onClick={() => handleRemoveArrayItem('childPolicies', index)}>Remove</Button>
                        </Box>
                    ))}
                    <Button onClick={() => handleAddArrayItem('childPolicies')}>Add Child Policy</Button>

                    <Typography variant="h6">Cot and Extra Bed Policies</Typography>
                    {hotelRules.cotAndExtraBedPolicies.map((policy, index) => (
                        <Box key={index} sx={{ display: 'flex', alignItems: 'center', marginBottom: 1 }}>
                            <TextField value={policy} onChange={(e) => handleArrayInputChange(e, 'cotAndExtraBedPolicies', index)} fullWidth />
                            <Button onClick={() => handleRemoveArrayItem('cotAndExtraBedPolicies', index)}>Remove</Button>
                        </Box>
                    ))}
                    <Button onClick={() => handleAddArrayItem('cotAndExtraBedPolicies')}>Add Cot/Extra Bed Policy</Button>

                    <Typography variant="h6">Accepted Cards</Typography>
                    {hotelRules.acceptedCards.map((card, index) => (
                        <Box key={index} sx={{ display: 'flex', alignItems: 'center', marginBottom: 1 }}>
                            <TextField value={card} onChange={(e) => handleArrayInputChange(e, 'acceptedCards', index)} fullWidth />
                            <Button onClick={() => handleRemoveArrayItem('acceptedCards', index)}>Remove</Button>
                        </Box>
                    ))}
                    <Button onClick={() => handleAddArrayItem('acceptedCards')}>Add Accepted Card</Button>

                    {/* Checkboxes */}
                    <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 2 }}>
                        <input type="checkbox" id="noAgeRestriction" name="noAgeRestriction" checked={hotelRules.noAgeRestriction} onChange={handleInputChange} />
                        <label htmlFor="noAgeRestriction">No Age Restriction</label>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 1 }}>
                        <input type="checkbox" id="petsAllowed" name="petsAllowed" checked={hotelRules.petsAllowed} onChange={handleInputChange} />
                        <label htmlFor="petsAllowed">Pets Allowed</label>
                    </Box>

                    <Button variant="contained" onClick={handleSaveRules} sx={{ marginTop: 2 }}>Save</Button>
                    <Button onClick={() => setIsEditing(false)} sx={{ marginTop: 2, marginLeft: 1 }}>Cancel</Button>
                </>
            ) : (
                <>
                    {/* Display Rules */}
                    {/* ... (Your existing display logic) */}
                    <Box sx={{ marginBottom: 4 }}>
                        <Typography variant="h6" sx={{ color: '#00ADB5', marginBottom: 2 }}>
                            Check-in/Check-out
                        </Typography>
                        <Typography variant="body1" sx={{ color: '#EEEEEE' }}>
                            <strong>Check-in:</strong> {hotelRules?.checkIn}
                        </Typography>
                        <Typography variant="body1" sx={{ color: '#EEEEEE' }}>
                            <strong>Check-out:</strong> {hotelRules?.checkOut}
                        </Typography>
                    </Box>

                    <Divider sx={{ backgroundColor: '#393E46', marginBottom: 4 }} />

                    <Box sx={{ marginBottom: 4 }}>
                        <Typography variant="h6" sx={{ color: '#00ADB5', marginBottom: 2 }}>
                            Cancellation/Prepayment
                        </Typography>
                        <Typography variant="body1" sx={{ color: '#EEEEEE' }}>
                            {hotelRules?.cancellationPolicy}
                        </Typography>
                    </Box>

                    <Divider sx={{ backgroundColor: '#393E46', marginBottom: 4 }} />

                    {/* ... (Rest of your display logic) */}
                    <Button variant="contained" onClick={() => setIsEditing(true)}>Edit Rules</Button>
                </>
            )}
        </Box>
    );
};

export default HotelRulesDetail;