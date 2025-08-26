import axios from 'axios';

export async function getDistancesFromGoogle(userLocation, drivers) {
    if (!process.env.GOOGLE_MAPS_API_KEY) {
        throw new Error('GOOGLE_MAPS_API_KEY is not set in environment variables');
    }

    if (!drivers.length) return [];

    const origins = encodeURIComponent(`${userLocation.lat},${userLocation.lng}`);
    const destinations = drivers.map(d => `${d.currentLat},${d.currentLng}`).join('|');
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;

    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origins}&destinations=${encodeURIComponent(destinations)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        console.log('Google Maps API response:', response.data);
        
        // Check if API returned an error
        if (response.data.status !== 'OK') {
            throw new Error(`Google Maps API error: ${response.data.status} - ${response.data.error_message || 'Unknown error'}`);
        }

        // Validate response structure
        if (!response.data.rows || !response.data.rows[0] || !response.data.rows[0].elements) {
            throw new Error('Invalid response structure from Google Maps API');
        }

        return response.data.rows[0].elements;
    } catch (error) {
        if (error.response) {
            console.error('Google Maps API error:', error.response.data);
            throw new Error(`Failed to fetch distances: ${error.response.data.error_message || error.response.status}`);
        } else if (error.message.startsWith('Google Maps API error')) {
            throw error; // Re-throw API errors
        } else {
            console.error('Network error:', error.message);
            throw new Error('Network error while fetching distances from Google Maps');
        }
    }
}