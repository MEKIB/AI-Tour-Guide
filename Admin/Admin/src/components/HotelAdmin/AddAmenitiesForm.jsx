import React, { useState, useMemo } from 'react';
import {
    Box,
    Typography,
    TextField,
    Button,
    Grid,
    InputAdornment,
    IconButton,
} from '@mui/material';
import { Search as SearchIcon, Close as CloseIcon } from '@mui/icons-material';
import * as MuiIcons from '@mui/icons-material';
import { FixedSizeList } from 'react-window';
import { debounce } from 'lodash';
import axios from 'axios'; // Import axios

const AddAmenitiesForm = () => {
    const [amenityName, setAmenityName] = useState('');
    const [amenityDescription, setAmenityDescription] = useState('');
    const [amenityIcon, setAmenityIcon] = useState('');
    const [iconSearchQuery, setIconSearchQuery] = useState('');

    const muiIcons = useMemo(() => {
        return Object.keys(MuiIcons).map((iconName) => ({
            name: iconName,
            component: MuiIcons[iconName],
        }));
    }, []);

    const handleSearch = debounce((query) => {
        setIconSearchQuery(query);
    }, 300);

    const filteredIcons = useMemo(() => {
        return muiIcons.filter((icon) =>
            icon.name.toLowerCase().includes(iconSearchQuery.toLowerCase())
        );
    }, [iconSearchQuery, muiIcons]);

    const handleSubmit = async (e) => { // Make handleSubmit async
        e.preventDefault();
        try {
            await axios.post('http://localhost:2000/api/amenities', { // Use your backend URL
                name: amenityName,
                description: amenityDescription,
                icon: amenityIcon,
            });
            setAmenityName('');
            setAmenityDescription('');
            setAmenityIcon('');
            setIconSearchQuery('');
         alert(" the data is added ")
            
        } catch (error) {
            console.error('Error adding amenity:', error);
        }
    };

    const clearIcon = () => {
        setAmenityIcon('');
    };

    const IconItem = ({ index, style }) => {
        const icon = filteredIcons[index];
        const IconComponent = icon.component;
        return (
            <Button
                style={style}
                variant={amenityIcon === icon.name ? 'contained' : 'outlined'}
                onClick={() => setAmenityIcon(icon.name)}
                sx={{
                    minWidth: 'auto',
                    padding: 1,
                    borderRadius: 1,
                    color: amenityIcon === icon.name ? '#EEEEEE' : '#00ADB5',
                    backgroundColor: amenityIcon === icon.name ? '#00ADB5' : 'transparent',
                    '&:hover': {
                        backgroundColor: '#008B8B',
                        color: '#EEEEEE',
                    },
                }}
            >
                <IconComponent />
            </Button>
        );
    };

    const SelectedIconComponent = amenityIcon ? MuiIcons[amenityIcon] : null;

    return (
        <Box sx={{ padding: 3 }}>
            <Typography variant="h4" sx={{ color: '#00ADB5', fontWeight: 'bold', marginBottom: 3 }}>
                Add New Amenity
            </Typography>

            <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="Amenity Name"
                            variant="outlined"
                            value={amenityName}
                            onChange={(e) => setAmenityName(e.target.value)}
                            required
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="Amenity Description"
                            variant="outlined"
                            value={amenityDescription}
                            onChange={(e) => setAmenityDescription(e.target.value)}
                            required
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Search Icon"
                            variant="outlined"
                            value={iconSearchQuery}
                            onChange={(e) => handleSearch(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        {SelectedIconComponent ? (
                                            <IconButton onClick={clearIcon} sx={{ padding: 0 }}>
                                                <SelectedIconComponent />
                                            </IconButton>
                                        ) : (
                                            <SearchIcon />
                                        )}
                                    </InputAdornment>
                                ),
                                endAdornment: SelectedIconComponent && (
                                    <InputAdornment position="end">
                                        <IconButton onClick={clearIcon}>
                                            <CloseIcon />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <Box
                            sx={{
                                marginTop: 2,
                                height: 200,
                                border: '1px solid #393E46',
                                borderRadius: 1,
                                padding: 2,
                            }}
                        >
                            <FixedSizeList
                                height={180}
                                width="100%"
                                itemSize={50}
                                itemCount={filteredIcons.length}
                            >
                                {IconItem}
                            </FixedSizeList>
                        </Box>
                    </Grid>

                    <Grid item xs={12}>
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{
                                backgroundColor: '#00ADB5',
                                '&:hover': { backgroundColor: '#008B8B' },
                            }}
                        >
                            Add Amenity
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
};

export default AddAmenitiesForm;