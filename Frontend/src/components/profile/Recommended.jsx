import React from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  CardMedia, 
  Button, 
  Chip,
  Grid,
  Stack
} from '@mui/material';
import { Star, AccessTime, Cancel, FavoriteBorder } from '@mui/icons-material';

const Recommended = () => {
  // Sample recommended hotels based on user preferences
  const recommendedHotels = [
    {
      id: 1,
      title: 'Luxury Hotel with Colosseum View',
      description: 'Based on your Rome bookings',
      price: '45,200',
      duration: 'per night',
      cancellation: 'Free Cancellation',
      priceRange: 'from $120',
      note: 'Breakfast included',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      location: 'Rome, Italy',
      rating: '4.8 (1.2K)',
      reason: 'Popular with history lovers'
    },
    {
      id: 2,
      title: 'Boutique Canal View Hotel',
      description: 'Similar to your Venice stay',
      price: '38,700',
      duration: 'per night',
      cancellation: 'Free Cancellation',
      priceRange: 'from $105',
      note: 'Private balcony',
      image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      location: 'Venice, Italy',
      rating: '4.9 (850)',
      reason: 'Romantic setting'
    },
    {
      id: 3,
      title: 'Vineyard Resort in Tuscany',
      description: 'Perfect for wine lovers',
      price: '52,400',
      duration: 'per night',
      cancellation: 'Free Cancellation',
      priceRange: 'from $140',
      note: 'Wine tasting included',
      image: 'https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      location: 'Tuscany, Italy',
      rating: '4.7 (920)',
      reason: 'Matches your food preferences'
    },
    {
      id: 4,
      title: 'Historic Center Apartment',
      description: 'Great value in Florence',
      price: '31,500',
      duration: 'per night',
      cancellation: 'Free Cancellation',
      priceRange: 'from $85',
      note: 'Full kitchen',
      image: 'https://images.unsplash.com/photo-1522798514-97ceb8c4f1c8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      location: 'Florence, Italy',
      rating: '4.6 (780)',
      reason: 'Central location'
    },
    {
      id: 5,
      title: 'Lakeside Luxury Resort',
      description: 'New in your preferred region',
      price: '48,900',
      duration: 'per night',
      cancellation: 'Free Cancellation',
      priceRange: 'from $130',
      note: 'Spa access included',
      image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      location: 'Lake Como, Italy',
      rating: '4.9 (1.1K)',
      reason: 'Trending this season'
    },
    {
      id: 6,
      title: 'Mountain View Chalet',
      description: 'Winter getaway option',
      price: '41,300',
      duration: 'per night',
      cancellation: 'Free Cancellation',
      priceRange: 'from $110',
      note: 'Ski-in/ski-out',
      image: 'https://images.unsplash.com/photo-1582719471384-8e63e246f7f8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      location: 'Dolomites, Italy',
      rating: '4.8 (950)',
      reason: 'Based on your activity preferences'
    }
  ];

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 3, color: '#00ADB5' }}>
        Recommended based on your travel preferences and history
      </Typography>
      
      <Grid container spacing={3}>
        {recommendedHotels.map((hotel) => (
          <Grid item xs={12} md={6} lg={4} key={hotel.id}>
            <Card sx={{ 
              backgroundColor: '#393E46',
              borderRadius: 2,
              transition: 'transform 0.3s',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 10px 20px rgba(0, 0, 0, 0.3)'
              }
            }}>
              <CardMedia
                component="img"
                height="200"
                image={hotel.image}
                alt={hotel.title}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Chip 
                  label={hotel.description} 
                  size="small" 
                  sx={{ 
                    backgroundColor: '#00ADB5', 
                    color: '#EEEEEE',
                    mb: 1
                  }} 
                />
                
                <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold' }}>
                  {hotel.title}
                </Typography>
                
                <Typography variant="body2" sx={{ color: '#00ADB5', mb: 1 }}>
                  {hotel.location} • {hotel.reason}
                </Typography>
                
                <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                  <Chip 
                    icon={<Star sx={{ color: '#FFD700', fontSize: '16px' }} />} 
                    label={hotel.rating} 
                    size="small" 
                    sx={{ backgroundColor: 'transparent', color: '#EEEEEE' }} 
                  />
                  <Chip 
                    icon={<AccessTime sx={{ fontSize: '16px' }} />} 
                    label={hotel.duration} 
                    size="small" 
                    sx={{ backgroundColor: 'transparent', color: '#EEEEEE' }} 
                  />
                  <Chip 
                    icon={<Cancel sx={{ fontSize: '16px' }} />} 
                    label={hotel.cancellation} 
                    size="small" 
                    sx={{ backgroundColor: 'transparent', color: '#EEEEEE' }} 
                  />
                </Stack>
                
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  mt: 'auto'
                }}>
                  <Box>
                    <Typography variant="h5" sx={{ color: '#00ADB5', fontWeight: 'bold' }}>
                      ${hotel.price}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#EEEEEE' }}>
                      {hotel.priceRange} • {hotel.note}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button 
                      variant="outlined"
                      sx={{ 
                        color: '#00ADB5',
                        borderColor: '#00ADB5',
                        '&:hover': {
                          backgroundColor: '#00ADB522',
                          borderColor: '#00ADB5'
                        }
                      }}
                      startIcon={<FavoriteBorder />}
                    >
                      Save
                    </Button>
                    <Button 
                      variant="contained" 
                      sx={{ 
                        backgroundColor: '#00ADB5',
                        color: '#EEEEEE',
                        '&:hover': {
                          backgroundColor: '#008B8B'
                        }
                      }}
                    >
                      Book Now
                    </Button>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Recommended;