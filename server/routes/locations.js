import express from 'express';

const router = express.Router();

// Mock locations data
const locations = [
  {
    id: 1,
    name: 'Delhi',
    region: 'north',
    state: 'Delhi',
    carCount: 150,
    pickupPoints: 5
  },
  {
    id: 2,
    name: 'Mumbai',
    region: 'west',
    state: 'Maharashtra',
    carCount: 200,
    pickupPoints: 6
  },
  {
    id: 3,
    name: 'Bangalore',
    region: 'south',
    state: 'Karnataka',
    carCount: 180,
    pickupPoints: 5
  },
  {
    id: 4,
    name: 'Hyderabad',
    region: 'south',
    state: 'Telangana',
    carCount: 120,
    pickupPoints: 4
  },
  {
    id: 5,
    name: 'Chennai',
    region: 'south',
    state: 'Tamil Nadu',
    carCount: 140,
    pickupPoints: 5
  },
  {
    id: 6,
    name: 'Kolkata',
    region: 'east',
    state: 'West Bengal',
    carCount: 100,
    pickupPoints: 4
  },
  {
    id: 7,
    name: 'Pune',
    region: 'west',
    state: 'Maharashtra',
    carCount: 90,
    pickupPoints: 3
  },
  {
    id: 8,
    name: 'Ahmedabad',
    region: 'west',
    state: 'Gujarat',
    carCount: 85,
    pickupPoints: 3
  }
];

// Get all locations
router.get('/', (req, res) => {
  try {
    const { region } = req.query;
    
    let filteredLocations = locations;
    
    if (region && region !== 'all') {
      filteredLocations = locations.filter(loc => loc.region === region);
    }
    
    res.json(filteredLocations);
  } catch (error) {
    console.error('Error fetching locations:', error);
    res.status(500).json({ message: 'Error fetching locations', error: error.message });
  }
});

// Get location by ID
router.get('/:id', (req, res) => {
  try {
    const location = locations.find(loc => loc.id === parseInt(req.params.id));
    
    if (!location) {
      return res.status(404).json({ message: 'Location not found' });
    }
    
    res.json(location);
  } catch (error) {
    console.error('Error fetching location:', error);
    res.status(500).json({ message: 'Error fetching location', error: error.message });
  }
});

export default router;