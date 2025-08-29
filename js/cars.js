import { showNotification } from './app.js';
import { endpoints, useMockData, paginationDefaults } from './config.js';
import { addToWishlist, removeFromWishlist, isInWishlist } from './wishlist.js';

// Mock cars data for development
 export const mockCars = [
  {
    id: '1',
    name: 'Maruti Swift',
    category: 'hatchback',
    price: 1200,
    priceUnit: 'day',
    image: 'https://www.autovista.in/assets/img/new_cars_colour_variants/swift-colour-pearl-metallic-midnight-blue.jpg',
    transmission: 'Manual',
    fuel: 'Petrol',
    seats: 5,
    mileage: '21 km/l',
    airConditioned: true,
    location: 'Delhi',
    available: true,
    features: ['Air Conditioning', 'Power Steering', 'Central Locking'],
    description: 'Perfect for city driving with excellent fuel efficiency.',
    rating: 4.2,
    reviewCount: 156
  },
  {
    id: '2',
    name: 'Hyundai Creta',
    category: 'suv',
    price: 2000,
    priceUnit: 'day',
    image: 'https://stimg.cardekho.com/images/carexteriorimages/630x420/Hyundai/Creta/8667/1744607863052/front-left-side-47.jpg?tr=w-664',
    transmission: 'Automatic',
    fuel: 'Diesel',
    seats: 5,
    mileage: '18 km/l',
    airConditioned: true,
    location: 'Mumbai',
    available: true,
    features: ['Air Conditioning', 'Power Steering', 'ABS', 'Airbags'],
    description: 'Spacious SUV perfect for family trips and long drives.',
    rating: 4.5,
    reviewCount: 203
  },
  {
    id: '3',
    name: 'Toyota Innova',
    category: 'muv',
    price: 2500,
    priceUnit: 'day',
    image: 'https://stimg.cardekho.com/images/carexteriorimages/630x420/Toyota/Innova-Crysta/9612/1697698611076/front-left-side-47.jpg?tr=w-664',
    transmission: 'Manual',
    fuel: 'Diesel',
    seats: 8,
    mileage: '15 km/l',
    airConditioned: true,
    location: 'Bangalore',
    available: true,
    features: ['Air Conditioning', 'Power Steering', 'ABS', 'Airbags', 'GPS'],
    description: 'Reliable and spacious vehicle for group travel.',
    rating: 4.7,
    reviewCount: 189
  },
  {
    id: '4',
    name: 'Honda City',
    category: 'sedan',
    price: 1800,
    priceUnit: 'day',
    image: 'https://stimg.cardekho.com/images/carexteriorimages/630x420/Honda/City/9421/1739862184352/front-left-side-47.jpg?tr=w-664',
    transmission: 'Automatic',
    fuel: 'Petrol',
    seats: 5,
    mileage: '17 km/l',
    airConditioned: true,
    location: 'Hyderabad',
    available: true,
    features: ['Air Conditioning', 'Power Steering', 'ABS', 'Airbags', 'Sunroof'],
    description: 'Premium sedan with comfort and style.',
    rating: 4.3,
    reviewCount: 142
  },
  {
    id: '5',
    name: 'Mahindra Thar',
    category: 'suv',
    price: 2200,
    priceUnit: 'day',
    image: 'https://stimg.cardekho.com/images/carexteriorimages/930x620/Mahindra/Thar/10746/1744358681783/front-left-side-47.jpg',
    transmission: 'Manual',
    fuel: 'Diesel',
    seats: 4,
    mileage: '16 km/l',
    airConditioned: true,
    location: 'Chennai',
    available: true,
    features: ['Air Conditioning', '4WD', 'Power Steering', 'ABS'],
    description: 'Adventure-ready SUV for off-road experiences.',
    rating: 4.6,
    reviewCount: 98
  },
  {
    id: '6',
    name: 'Tata Nexon',
    category: 'suv',
    price: 1600,
    priceUnit: 'day',
    image: 'https://stimg.cardekho.com/images/carexteriorimages/930x620/Tata/Nexon/9675/1743060431849/front-left-side-47.jpg',
    transmission: 'Automatic',
    fuel: 'Petrol',
    seats: 5,
    mileage: '17 km/l',
    airConditioned: true,
    location: 'Kolkata',
    available: true,
    features: ['Air Conditioning', 'Power Steering', 'ABS', 'Airbags', 'Touchscreen'],
    description: 'Compact SUV with modern features and safety.',
    rating: 4.1,
    reviewCount: 167
  },
  {
    id: '7',
    name: 'BMW 3 Series',
    category: 'luxury',
    price: 5000,
    priceUnit: 'day',
    image: 'https://stimg.cardekho.com/images/carexteriorimages/930x620/BMW/3-Series/10574/1689667781970/front-left-side-47.jpg',
    transmission: 'Automatic',
    fuel: 'Petrol',
    seats: 5,
    mileage: '14 km/l',
    airConditioned: true,
    location: 'Delhi',
    available: true,
    features: ['Air Conditioning', 'Leather Seats', 'Sunroof', 'GPS', 'Premium Audio'],
    description: 'Luxury sedan with premium comfort and performance.',
    rating: 4.8,
    reviewCount: 76
  },
  {
    id: '8',
    name: 'Tesla Model 3',
    category: 'electric',
    price: 4500,
    priceUnit: 'day',
    image: 'https://stimg.cardekho.com/images/carexteriorimages/630x420/Tesla/Model-3/5251/1693556345148/front-left-side-47.jpg?tr=w-664',
    transmission: 'Automatic',
    fuel: 'Electric',
    seats: 5,
    mileage: '400 km range',
    airConditioned: true,
    location: 'Mumbai',
    available: true,
    features: ['Air Conditioning', 'Autopilot', 'Touchscreen', 'Premium Audio', 'Fast Charging'],
    description: 'Electric luxury sedan with cutting-edge technology.',
    rating: 4.9,
    reviewCount: 45
  },
  {
    id: '9',
    name: 'Maruti Alto',
    category: 'hatchback',
    price: 1000,
    priceUnit: 'day',
    image: 'https://stimg.cardekho.com/images/carexteriorimages/930x620/Maruti/Alto-K10/10331/1687349000534/front-left-side-47.jpg',
    transmission: 'Manual',
    fuel: 'Petrol',
    seats: 4,
    mileage: '24 km/l',
    airConditioned: true,
    location: 'Pune',
    available: true,
    features: ['Air Conditioning', 'Power Steering', 'Central Locking'],
    description: 'Economical and fuel-efficient car for city use.',
    rating: 3.9,
    reviewCount: 234
  },
  {
    id: '10',
    name: 'Hyundai Verna',
    category: 'sedan',
    price: 1900,
    priceUnit: 'day',
    image: 'https://stimg.cardekho.com/images/carexteriorimages/930x620/Hyundai/Verna/8703/1736412929424/front-left-side-47.jpg',
    transmission: 'Automatic',
    fuel: 'Diesel',
    seats: 5,
    mileage: '19 km/l',
    airConditioned: true,
    location: 'Ahmedabad',
    available: true,
    features: ['Air Conditioning', 'Power Steering', 'ABS', 'Airbags', 'Sunroof'],
    description: 'Stylish sedan with premium features and comfort.',
    rating: 4.4,
    reviewCount: 178
  },
  // Add more cars to reach 100+
  {
    id: '11',
    name: 'Kia Seltos',
    category: 'suv',
    price: 2100,
    priceUnit: 'day',
    image: 'https://stimg.cardekho.com/images/carexteriorimages/930x620/Kia/Seltos-2023/8709/1688465684023/front-left-side-47.jpg',
    transmission: 'Automatic',
    fuel: 'Petrol',
    seats: 5,
    mileage: '16 km/l',
    airConditioned: true,
    location: 'Jaipur',
    available: true,
    features: ['Air Conditioning', 'Power Steering', 'ABS', 'Airbags', 'Touchscreen'],
    description: 'Feature-rich SUV with modern design.',
    rating: 4.5,
    reviewCount: 156
  },
  {
    id: '12',
    name: 'Maruti Baleno',
    category: 'hatchback',
    price: 1300,
    priceUnit: 'day',
    image: 'https://stimg.cardekho.com/images/carexteriorimages/930x620/Maruti/Baleno/10497/1697697558001/front-left-side-47.jpg',
    transmission: 'Manual',
    fuel: 'Petrol',
    seats: 5,
    mileage: '21 km/l',
    airConditioned: true,
    location: 'Lucknow',
    available: true,
    features: ['Air Conditioning', 'Power Steering', 'ABS', 'Touchscreen'],
    description: 'Premium hatchback with spacious interior.',
    rating: 4.2,
    reviewCount: 189
  },
  {
    id: '13',
    name: 'Volvo XC40',
    category: 'luxury',
    price: 7500,
    priceUnit: 'day',
    image: 'https://stimg.cardekho.com/images/carexteriorimages/930x620/Volvo/XC40-Recharge/11561/1709877320574/front-left-side-47.jpg',
    transmission: 'Automatic',
    fuel: 'Petrol',
    seats: 5,
    mileage: '10 km/l',
    airConditioned: true,
    location: 'Kochi',
    available: true,
    features: ['Air Conditioning', 'Power Steering', 'ABS', 'Airbags'],
    description: 'The Volvo XC40 offers Scandinavian luxury with advanced safety features.',
    rating: 4.6,
    reviewCount: 759
  },
  {
    id: '14',
    name: 'Volkswagen Polo',
    category: 'hatchback',
    price: 1400,
    priceUnit: 'day',
    image: 'https://stimg.cardekho.com/images/carexteriorimages/930x620/Volkswagen/Golf-GTI/12276/1748332139801/front-left-side-47.jpg',
    transmission: 'Manual',
    fuel: 'Petrol',
    seats: 5,
    mileage: '18 km/l',
    airConditioned: true,
    location: 'Chandigarh',
    available: true,
    features: ['Air Conditioning', 'Power Steering', 'ABS', 'Airbags'],
    description: 'European build quality with excellent safety features.',
    rating: 4.3,
    reviewCount: 112
  },
  {
    id: '15',
    name: 'Audi A4',
    category: 'luxury',
    price: 5500,
    priceUnit: 'day',
    image: 'https://stimg.cardekho.com/images/carexteriorimages/930x620/Audi/A4/10548/1732257078935/front-left-side-47.jpg',
    transmission: 'Automatic',
    fuel: 'Petrol',
    seats: 5,
    mileage: '13 km/l',
    airConditioned: true,
    location: 'Delhi',
    available: true,
    features: ['Air Conditioning', 'Leather Seats', 'Sunroof', 'GPS', 'Premium Audio', 'Heated Seats'],
    description: 'Premium luxury sedan with advanced technology.',
    rating: 4.7,
    reviewCount: 67
  },
    {
    id: '16',
    name: 'Mahindra XUV300',
    category: 'suv',
    price: 1900,
    priceUnit: 'day',
    image: 'https://stimg.cardekho.com/images/carexteriorimages/630x420/Mahindra/XUV300/6794/1701855582193/front-left-side-47.jpg?tr=w-664',
    transmission: 'Manual',
    fuel: 'Diesel',
    seats: 5,
    mileage: '20 km/l',
    airConditioned: true,
    location: 'Ahmedabad',
    available: true,
    features: ['Air Conditioning', 'Power Steering', 'ABS', 'Airbags', 'Sunroof'],
    description: 'The Mahindra XUV300 offers SUV capabilities in a compact package.',
    rating: 4.5,
    reviewCount: 178
  },
    {
    id: '17',
    name: 'Mahindra XUV700',
    category: 'suv',
    price: 2800,
    priceUnit: 'day',
    image: 'https://stimg.cardekho.com/images/carexteriorimages/930x620/Mahindra/XUV700/11736/1749631327264/front-left-side-47.jpg',
    transmission: 'Automatic',
    fuel: 'Diesel',
    seats: 7,
    mileage: '16 km/l',
    airConditioned: true,
    location: 'Hyderabad',
    available: true,
    features: ['Air Conditioning', 'Power Steering', 'ABS', 'Airbags', 'Sunroof'],
    description: 'The Mahindra XUV700 is a premium 7-seater SUV with advanced features.',
    rating: 4.9,
    reviewCount: 170
  },
    {
    id: '18',
    name: 'Mahindra Marazzo',
    category: 'muv',
    price: 2200,
    priceUnit: 'day',
    image: 'https://stimg.cardekho.com/images/carexteriorimages/630x420/Mahindra/Marazzo/7948/1632224129922/front-left-side-47.jpg?tr=w-664',
    transmission: 'Manual',
    fuel: 'Diesel',
    seats: 8,
    mileage: '17 km/l',
    airConditioned: true,
    location: 'Mumbai',
    available: true,
    features: ['Air Conditioning', 'Power Steering', 'ABS', 'Airbags', 'Sunroof'],
    description: 'The Mahindra Marazzo offers spacious interiors and comfortable seating for 8.',
    rating: 4.4,
    reviewCount: 178
  },
    {
    id: '19',
    name: 'Maruti Ertiga',
    category: 'muv',
    price: 2000,
    priceUnit: 'day',
    image: 'https://stimg.cardekho.com/images/carexteriorimages/630x420/Maruti/Ertiga/10293/1697697779799/front-left-side-47.jpg?tr=w-664',
    transmission: 'Manual',
    fuel: 'Petrol',
    seats: 7,
    mileage: '19 km/l',
    airConditioned: true,
    location: 'Bangalore',
    available: true,
    features: ['Air Conditioning', 'Power Steering', 'ABS', 'Airbags', 'Sunroof'],
    description: 'The Maruti Ertiga is a fuel-efficient 7-seater perfect for families.',
    rating: 4.4,
    reviewCount: 178
  },
    {
    id: '20',
    name: 'Mahindra Bolero',
    category: 'muv',
    price: 1800,
    priceUnit: 'day',
    image: 'https://stimg.cardekho.com/images/carexteriorimages/630x420/Mahindra/Bolero/10754/1749621185227/front-left-side-47.jpg?tr=w-664',
    transmission: 'Manual',
    fuel: 'Diesel',
    seats: 7,
    mileage: '16 km/l',
    airConditioned: true,
    location: 'Pune',
    available: true,
    features: ['Air Conditioning', 'Power Steering', 'ABS', 'Airbags', 'Sunroof'],
    description: 'The Mahindra Bolero is a rugged and reliable MUV for all terrains.',
    rating: 4.4,
    reviewCount: 178
  },
  // Electric Car
    {
    id: '21',
    name: 'Tata Nexon EV',
    category: 'electric',
    price: 2200,
    priceUnit: 'day',
    image: 'https://stimg.cardekho.com/images/carexteriorimages/630x420/Tata/Nexon-EV-2023/11024/1694146347051/front-left-side-47.jpg?tr=w-664',
    transmission: 'Automatic',
    fuel: 'Electric',
    seats: 5,
    mileage: '312 km/charge',
    airConditioned: true,
    location: 'Ahmedabad',
    available: true,
    features: ['Air Conditioning', 'Power Steering', 'ABS', 'Airbags', 'Sunroof'],
    description: 'The Tata Nexon EV is India\'s best-selling electric SUV with impressive range.',
    rating: 5.0,
    reviewCount: 180
  },
    {
    id: '22',
    name: 'MG ZS EV',
    category: 'electric',
    price: 2500,
    priceUnit: 'day',
    image: 'https://stimg.cardekho.com/images/carexteriorimages/630x420/MG/ZS-EV/11503/1742472801642/front-left-side-47.jpg?tr=w-664',
    transmission: 'Automatic',
    fuel: 'Electric',
    seats: 5,
    mileage: '419 km/charge',
    airConditioned: true,
    location: 'Delhi',
    available: true,
    features: ['Air Conditioning', 'Power Steering', 'ABS', 'Airbags', 'Sunroof'],
    description: 'The MG ZS EV offers premium electric mobility with advanced features.',
    rating: 4.5,
    reviewCount: 170
  },
    {
    id: '23',
    name: 'Hyundai Kona Electric',
    category: 'electric',
    price: 3200,
    priceUnit: 'day',
    image: 'https://stimg.cardekho.com/images/carexteriorimages/930x620/Hyundai/Kona-Electric-2021/8178/1678255820090/front-left-side-47.jpg',
    transmission: 'Automatic',
    fuel: 'Electric',
    seats: 5,
    mileage: '452 km/charge',
    airConditioned: true,
    location: 'Bangalore',
    available: true,
    features: ['Air Conditioning', 'Power Steering', 'ABS', 'Airbags', 'Sunroof'],
    description: 'The Hyundai Kona Electric offers long-range electric driving with premium comfort.',
    rating: 4.8,
    reviewCount: 180
  },
    {
    id: '24',
    name: 'Tata Tigor EV',
    category: 'electric',
    price: 2000,
    priceUnit: 'day',
    image: 'https://stimg.cardekho.com/images/carexteriorimages/630x420/Tata/Tigor-EV/9458/1675751484779/front-left-side-47.jpg?tr=w-664',
    transmission: 'Automatic',
    fuel: 'Electric',
    seats: 5,
    mileage: '306 km/charge',
    airConditioned: true,
    location: 'Mumbai',
    available: true,
    features: ['Air Conditioning', 'Power Steering', 'ABS', 'Airbags', 'Sunroof'],
    description: 'The Tata Tigor EV is an affordable electric sedan with good range.',
    rating: 4.5,
    reviewCount: 80
  },
    {
    id: '25',
    name: 'Mahindra eXUV300',
    category: 'electric',
    price: 2500,
    priceUnit: 'day',
    image: 'https://stimg.cardekho.com/images/carexteriorimages/630x420/Mahindra/XUV300/6794/1701855582193/front-left-side-47.jpg?tr=w-664',
    transmission: 'Automatic',
    fuel: 'Electric',
    seats: 5,
    mileage: '452 km/charge',
    airConditioned: true,
    location: 'Chennai',
    available: true,
    features: ['Air Conditioning', 'Power Steering', 'ABS', 'Airbags', 'Sunroof'],
    description: 'The Mahindra eXUV300 combines SUV capabilities with electric efficiency.',
    rating: 4.6,
    reviewCount: 150
  },
    // Luxury Cars
    {
    id: '26',
    name: 'Mercedes-Benz E-Class',
    category: 'luxury',
    price: 6000,
    priceUnit: 'day',
    image: 'https://stimg.cardekho.com/images/carexteriorimages/630x420/Mercedes-Benz/E-Class/9790/1728652931654/front-left-side-47.jpg?tr=w-664',
    transmission: 'Automatic',
    fuel: 'Petrol',
    seats: 5,
    mileage: '15 km/l',
    airConditioned: true,
    location: 'Ahmedabad',
    available: true,
    features: ['Air Conditioning', 'Power Steering', 'ABS', 'Airbags', 'Sunroof'],
    description: 'The Mercedes-Benz E-Class offers ultimate luxury and comfort.',
    rating: 4.9,
    reviewCount: 175
  },
    {
    id: '27',
    name: 'BMW 3 Series',
    category: 'luxury',
    price: 5500,
    priceUnit: 'day',
    image: 'https://stimg.cardekho.com/images/carexteriorimages/630x420/BMW/3-Series/10574/1689667781970/front-left-side-47.jpg?tr=w-664',
    transmission: 'Automatic',
    fuel: 'Petrol',
    seats: 5,
    mileage: '15 km/l',
    airConditioned: true,
    location: 'Delhi',
    available: true,
    features: ['Air Conditioning', 'Power Steering', 'ABS', 'Airbags', 'Sunroof'],
    description: 'The BMW 3 Series delivers the ultimate driving experience with luxury.',
    rating: 4.8,
    reviewCount: 200
  },
    {
    id: '28',
    name: 'Audi A4',
    category: 'luxury',
    price: 5800,
    priceUnit: 'day',
    image: 'https://stimg.cardekho.com/images/carexteriorimages/630x420/Audi/A4/10548/1732257078935/front-left-side-47.jpg?tr=w-664',
    transmission: 'Automatic',
    fuel: 'Petrol',
    seats: 5,
    mileage: '12 km/l',
    airConditioned: true,
    location: 'Delhi',
    available: true,
    features: ['Air Conditioning', 'Power Steering', 'ABS', 'Airbags', 'Sunroof'],
    description: 'The Audi A4 combines progressive design with advanced technology.',
    rating: 5.0,
    reviewCount: 450
  },
    {
    id: '29',
    name: 'Jaguar XE',
    category: 'luxury',
    price: 6500,
    priceUnit: 'day',
    image: 'https://stimg.cardekho.com/car-images/carexteriorimages/large/Jaguar/Jaguar-C-X75/front-left-side-047.jpg?tr=w-664',
    transmission: 'Automatic',
    fuel: 'Petrol',
    seats: 5,
    mileage: '11 km/l',
    airConditioned: true,
    location: 'Kolkata',
    available: true,
    features: ['Air Conditioning', 'Power Steering', 'ABS', 'Airbags', 'Sunroof'],
    description: 'The Jaguar XE offers British luxury with sporty performance.',
    rating: 4.9,
    reviewCount: 280
  },
    {
    id: '30',
    name: 'Volvo S60',
    category: 'luxury',
    price: 6200,
    priceUnit: 'day',
    image: 'https://stimg.cardekho.com/images/carexteriorimages/630x420/Volvo/XC90/11977/1741167021745/front-left-side-47.jpg?tr=w-664',
    transmission: 'Automatic',
    fuel: 'Petrol',
    seats: 5,
    mileage: '13 km/l',
    airConditioned: true,
    location: 'Pune',
    available: true,
    features: ['Air Conditioning', 'Power Steering', 'ABS', 'Airbags', 'Sunroof'],
    description: 'The Volvo S60 prioritizes safety without compromising on luxury.',
    rating: 4.5,
    reviewCount: 178
  },
    // Additional Sedans
    {
    id: '31',
    name: 'Skoda Rapid',
    category: 'sedan',
    price: 1900,
    priceUnit: 'day',
    image: 'https://stimg.cardekho.com/images/carexteriorimages/630x420/Skoda/Rapid/8633/1648729171661/front-left-side-47.jpg?tr=w-664',
    transmission: 'Automatic',
    fuel: 'Petrol',
    seats: 5,
    mileage: '19 km/l',
    airConditioned: true,
    location: 'Pune',
    available: true,
    features: ['Air Conditioning', 'Power Steering', 'ABS', 'Airbags', 'Sunroof'],
    description: 'The Skoda Rapid offers European styling with practical features.',
    rating: 4.7,
    reviewCount: 308
  },
    {
    id: '32',
    name: 'Nissan Sunny',
    category: 'sedan',
    price: 1500,
    priceUnit: 'day',
    image: 'https://images10.gaadi.com/usedcar_image/4555911/original/processed_9ab0a61c7c954df75fb655dc5375c968.jpg?imwidth=420',
    transmission: 'Automatic',
    fuel: 'Petrol',
    seats: 5,
    mileage: '17 km/l',
    airConditioned: true,
    location: 'Hyderabad',
    available: true,
    features: ['Air Conditioning', 'Power Steering', 'ABS', 'Airbags', 'Sunroof'],
    description: 'The Nissan Sunny offers spacious interiors and comfortable ride.',
    rating: 4.5,
    reviewCount: 190
  },
    {
    id: '33',
    name: 'Toyota Yaris',
    category: 'sedan',
    price: 2100,
    priceUnit: 'day',
    image: 'https://stimg.cardekho.com/images/carexteriorimages/630x420/Toyota/Yaris/7283/1579858168291/front-left-side-47.jpg?tr=w-664',
    transmission: 'Automatic',
    fuel: 'Petrol',
    seats: 5,
    mileage: '15 km/l',
    airConditioned: true,
    location: 'Kolkata',
    available: true,
    features: ['Air Conditioning', 'Power Steering', 'ABS', 'Airbags', 'Sunroof'],
    description: 'The Toyota Yaris offers premium features and reliable performance.',
    rating: 4.4,
    reviewCount: 178
  },
    {
    id: '34',
    name: 'Maruti Ciaz',
    category: 'sedan',
    price: 1400,
    priceUnit: 'day',
    image: 'https://stimg.cardekho.com/images/carexteriorimages/630x420/Maruti/Ciaz/10346/1738211238794/front-left-side-47.jpg?tr=w-664',
    transmission: 'Manual',
    fuel: 'Petrol',
    seats: 5,
    mileage: '21 km/l',
    airConditioned: true,
    location: 'Ahmedabad',
    available: true,
    features: ['Air Conditioning', 'Power Steering', 'ABS', 'Airbags', 'Sunroof'],
    description: 'The Maruti Ciaz offers premium sedan experience with excellent fuel efficiency.',
    rating: 4.1,
    reviewCount: 100
  },
    {
    id: '35',
    name: 'Honda Amaze',
    category: 'sedan',
    price: 1600,
    priceUnit: 'day',
    image: 'https://stimg.cardekho.com/images/carexteriorimages/630x420/Honda/Amaze/12185/1733724733157/front-left-side-47.jpg?tr=w-664',
    transmission: 'Automatic',
    fuel: 'Diesel',
    seats: 5,
    mileage: '18 km/l',
    airConditioned: true,
    location: 'Jaipur',
    available: true,
    features: ['Air Conditioning', 'Power Steering', 'ABS', 'Airbags', 'Sunroof'],
    description: 'The Honda Amaze offers reliability and comfort in a compact sedan.',
    rating: 4.9,
    reviewCount: 108
  },
    {
    id: '36',
    name: 'Ford Aspire',
    category: 'sedan',
    price: 1700,
    priceUnit: 'day',
    image: 'https://stimg.cardekho.com/images/carexteriorimages/630x420/Ford/Figo-Aspire/7608/1613548799141/front-left-side-47.jpg?tr=w-664',
    transmission: 'Automatic',
    fuel: 'Petrol',
    seats: 5,
    mileage: '18 km/l',
    airConditioned: true,
    location: 'Mumbai',
    available: true,
    features: ['Air Conditioning', 'Power Steering', 'ABS', 'Airbags', 'Sunroof'],
    description: 'The Ford Aspire offers global design with local engineering.',
    rating: 4.7,
    reviewCount: 201
  },
  // SUV
    {
    id: '37',
    name: 'Maruti Vitara Brezza',
    category: 'suv',
    price: 1900,
    priceUnit: 'day',
    image: 'https://stimg.cardekho.com/images/carexteriorimages/630x420/Maruti/Vitara-Brezza/7295/1638268460167/front-left-side-47.jpg?tr=w-664',
    transmission: 'Automatic',
    fuel: 'Diesel',
    seats: 5,
    mileage: '19 km/l',
    airConditioned: true,
    location: 'Ahmedabad',
    available: true,
    features: ['Air Conditioning', 'Power Steering', 'ABS', 'Airbags', 'Sunroof'],
    description: 'The Maruti Vitara Brezza is India\'s most popular compact SUV.',
    rating: 4.9,
    reviewCount: 378
  },
    {
    id: '38',
    name: 'Renault Duster',
    category: 'suv',
    price: 1850,
    priceUnit: 'day',
    image: 'https://stimg.cardekho.com/images/carexteriorimages/630x420/Renault/Duster-2025/9674/1707741472655/front-left-side-47.jpg?tr=w-664',
    transmission: 'Manual',
    fuel: 'Diesel',
    seats: 5,
    mileage: '19 km/l',
    airConditioned: true,
    location: 'Chennai',
    available: true,
    features: ['Air Conditioning', 'Power Steering', 'ABS', 'Airbags', 'Sunroof'],
    description: 'The Renault Duster offers rugged SUV capabilities at an affordable price.',
    rating: 4.3,
    reviewCount: 458
  },
    {
    id: '39',
    name: 'Mahindra Scorpio',
    category: 'suv',
    price: 2450,
    priceUnit: 'day',
    image: 'https://stimg.cardekho.com/images/carexteriorimages/630x420/Mahindra/Scorpio/10764/1749625690756/front-left-side-47.jpg?tr=w-664',
    transmission: 'Manual',
    fuel: 'Diesel',
    seats: 5,
    mileage: '19 km/l',
    airConditioned: true,
    location: 'Kolkata',
    available: true,
    features: ['Air Conditioning', 'Power Steering', 'ABS', 'Airbags', 'Sunroof'],
    description: 'The Mahindra Scorpio is a rugged 7-seater SUV built for Indian roads.',
    rating: 4.1,
    reviewCount: 320
  },
    {
    id: '40',
    name: 'Tata Harrier',
    category: 'suv',
    price: 2200,
    priceUnit: 'day',
    image: 'https://stimg.cardekho.com/images/carexteriorimages/630x420/Tata/Harrier-EV/9564/1749033646022/front-left-side-47.jpg?tr=w-664',
    transmission: 'Manual',
    fuel: 'Diesel',
    seats: 5,
    mileage: '16 km/l',
    airConditioned: true,
    location: 'Delhi',
    available: true,
    features: ['Air Conditioning', 'Power Steering', 'ABS', 'Airbags', 'Sunroof'],
    description: 'The Tata Harrier offers premium SUV experience with bold design.',
    rating: 4.7,
    reviewCount: 250
  },
    {
    id: '41',
    name: 'Hyundai Venue',
    category: 'suv',
    price: 1300,
    priceUnit: 'day',
    image: 'https://stimg.cardekho.com/images/carexteriorimages/630x420/Hyundai/Venue/10141/1738045593759/front-left-side-47.jpg?tr=w-664',
    transmission: 'Manual',
    fuel: 'Petrol',
    seats: 5,
    mileage: '17 km/l',
    airConditioned: true,
    location: 'Pune',
    available: true,
    features: ['Air Conditioning', 'Power Steering', 'ABS', 'Airbags', 'Sunroof'],
    description: 'The Hyundai Venue is a feature-rich compact SUV with connected technology.',
    rating: 4.1,
    reviewCount: 133
  },
  // MORE CARS
    {
    id: '42',
    name: 'Toyota Fortuner',
    category: 'suv',
    price: 4500,
    priceUnit: 'day',
    image: 'https://stimg.cardekho.com/images/carexteriorimages/630x420/Toyota/Fortuner/10904/1749010426292/front-left-side-47.jpg?tr=w-664',
    transmission: 'Automatic',
    fuel: 'Diesel',
    seats: 7,
    mileage: '12 km/l',
    airConditioned: true,
    location: 'Delhi',
    available: true,
    features: ['Air Conditioning', 'Power Steering', 'ABS', 'Airbags', 'Sunroof'],
    description: 'The Toyota Fortuner is the most popular premium SUV in India.',
    rating: 5.0,
    reviewCount: 433
  },
      {
    id: '43',
    name: 'Land Rover Discovery Sport',
    category: 'luxury',
    price: 8500,
    priceUnit: 'day',
    image: 'https://stimg.cardekho.com/images/carexteriorimages/630x420/Land-Rover/Discovery-Sport/7575/1705470002125/front-left-side-47.jpg?tr=w-664',
    transmission: 'Automatic',
    fuel: 'Petrol',
    seats: 7,
    mileage: '9 km/l',
    airConditioned: true,
    location: 'Bangalore',
    available: true,
    features: ['Air Conditioning', 'Power Steering', 'ABS', 'Airbags', 'Sunroof'],
    description: 'The Land Rover Discovery Sport offers British luxury with off-road capability.',
    rating: 4.9,
    reviewCount: 741
  },
      {
    id: '44',
    name: 'Range Rover Evoque',
    category: 'luxury',
    price: 9000,
    priceUnit: 'day',
    image: 'https://stimg.cardekho.com/images/carexteriorimages/630x420/Land-Rover/Range-Rover-Evoque/12549/1745923709605/front-left-side-47.jpg?tr=w-664',
    transmission: 'Automatic',
    fuel: 'Petrol',
    seats: 5,
    mileage: '8 km/l',
    airConditioned: true,
    location: 'Chennai',
    available: true,
    features: ['Air Conditioning', 'Power Steering', 'ABS', 'Airbags', 'Sunroof'],
    description: 'The Range Rover Evoque offers iconic luxury SUV design with premium features..',
    rating: 4.5,
    reviewCount: 251
  },
      {
    id: '45',
    name: 'Porsche Macan',
    category: 'luxury',
    price: 12000,
    priceUnit: 'day',
    image: 'https://stimg.cardekho.com/images/carexteriorimages/630x420/Porsche/Macan/10974/1690871596474/front-left-side-47.jpg?tr=w-664',
    transmission: 'Automatic',
    fuel: 'Petrol',
    seats: 5,
    mileage: '7 km/l',
    airConditioned: true,
    location: 'Hyderabad',
    available: true,
    features: ['Air Conditioning', 'Power Steering', 'ABS', 'Airbags', 'Sunroof'],
    description: 'The Porsche Macan offers sports car performance in an SUV package.',
    rating: 4.8,
    reviewCount: 951
  },
      {
    id: '46',
    name: 'Audi Q3',
    category: 'luxury',
    price: 10000,
    priceUnit: 'day',
    image: 'https://stimg.cardekho.com/images/carexteriorimages/630x420/Audi/Q3/11363/1708935637129/front-left-side-47.jpg?tr=w-664',
    transmission: 'Manual',
    fuel: 'Petrol',
    seats: 5,
    mileage: '11 km/l',
    airConditioned: true,
    location: 'Ahmedabad',
    available: true,
    features: ['Air Conditioning', 'Power Steering', 'ABS', 'Airbags', 'Sunroof'],
    description: 'The Audi Q3 offers premium compact SUV experience with Quattro technology.',
    rating: 4.9,
    reviewCount: 458
  },
   
];


// Load featured cars for home page
export async function loadFeaturedCars() {
  const featuredCarsGrid = document.getElementById('featured-cars-grid');
  
  if (!featuredCarsGrid) return;
  
  try {
    // Show loading state
    featuredCarsGrid.innerHTML = '<div class="loading">Loading featured cars...</div>';
    
    // In a real app, we would fetch data from the server
    let cars;
    
    if (useMockData) {
      // Use mock data for development
      cars = mockCars.slice(0, 8); // Show first 6 cars as featured
    } else {
      // Fetch from API
      const response = await fetch(endpoints.cars.featured);
      if (!response.ok) throw new Error('Failed to fetch featured cars');
      cars = await response.json();
    }
    
    // Render cars
    renderCars(cars, featuredCarsGrid);
    
  } catch (error) {
    console.error('Error loading featured cars:', error);
    featuredCarsGrid.innerHTML = '<div class="error">Failed to load featured cars. Please try again later.</div>';
  }
}

// Load all cars for cars page
export async function loadAllCars(filters = {}) {
  const carsGrid = document.getElementById('cars-grid');
  
  if (!carsGrid) return;
  
  try {
    // Show loading state
    carsGrid.innerHTML = '<div class="loading">Loading cars...</div>';
    
    // In a real app, we would fetch data from the server
    let cars;
    
    if (useMockData) {
      // Use mock data for development
      cars = [...mockCars];
      
      // Apply filters
      cars = applyFilters(cars, filters);
      
      // Apply sorting
      cars = applySorting(cars, filters.sort || 'price-asc');
      
      // Apply pagination
      const page = parseInt(filters.page) || 1;
      const limit = paginationDefaults.limit;
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedCars = cars.slice(startIndex, endIndex);
      
      // Render cars
      renderCars(paginatedCars, carsGrid);
      
      // Render pagination
      renderPagination(cars.length, page, limit);
      
      // Update active filters display
      updateActiveFilters(filters);
      
    } else {
      // Fetch from API
      const queryParams = new URLSearchParams(filters);
      const response = await fetch(`${endpoints.cars.all}?${queryParams}`);
      if (!response.ok) throw new Error('Failed to fetch cars');
      const data = await response.json();
      
      renderCars(data.cars, carsGrid);
      renderPagination(data.total, data.page, data.limit);
      updateActiveFilters(filters);
    }
    
  } catch (error) {
    console.error('Error loading cars:', error);
    carsGrid.innerHTML = '<div class="error">Failed to load cars. Please try again later.</div>';
  }
}

// Apply filters to cars array
function applyFilters(cars, filters) {
  let filteredCars = [...cars];
  
  // Category filter
  if (filters.category && filters.category !== 'all') {
    filteredCars = filteredCars.filter(car => car.category === filters.category);
  }
  
  // Price range filter
  if (filters.minPrice) {
    filteredCars = filteredCars.filter(car => car.price >= parseInt(filters.minPrice));
  }
  
  if (filters.maxPrice) {
    filteredCars = filteredCars.filter(car => car.price <= parseInt(filters.maxPrice));
  }
  
  // Location filter
  if (filters.location) {
    filteredCars = filteredCars.filter(car => car.location === filters.location);
  }
  
  // Transmission filter
  if (filters.transmission && filters.transmission !== 'all') {
    filteredCars = filteredCars.filter(car => car.transmission === filters.transmission);
  }
  
  // Fuel filter
  if (filters.fuel && filters.fuel !== 'all') {
    filteredCars = filteredCars.filter(car => car.fuel === filters.fuel);
  }
  
  // Seats filter
  if (filters.seats && filters.seats !== 'all') {
    const minSeats = parseInt(filters.seats);
    filteredCars = filteredCars.filter(car => car.seats >= minSeats);
  }
  
  return filteredCars;
}

// Apply sorting to cars array
function applySorting(cars, sortBy) {
  const sortedCars = [...cars];
  
  switch (sortBy) {
    case 'price-asc':
      return sortedCars.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return sortedCars.sort((a, b) => b.price - a.price);
    case 'popularity':
      return sortedCars.sort((a, b) => (b.rating * b.reviewCount) - (a.rating * a.reviewCount));
    case 'newest':
      return sortedCars.sort((a, b) => parseInt(b.id) - parseInt(a.id));
    default:
      return sortedCars;
  }
}

// Render cars in grid
function renderCars(cars, container) {
  if (!cars || cars.length === 0) {
    container.innerHTML = '<div class="no-results">No cars found matching your criteria.</div>';
    return;
  }
  
  let carsHTML = '';
  
  cars.forEach(car => {
    const isWishlisted = isInWishlist(car.id);
    
    carsHTML += `
      <div class="car-card" data-category="${car.category}">
        <div class="car-image-container">
          <img src="${car.image}" alt="${car.name}" class="car-image" loading="lazy">
          <button class="wishlist-btn-card ${isWishlisted ? 'active' : ''}" 
                  data-car-id="${car.id}" 
                  aria-label="${isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}">
            <i class="${isWishlisted ? 'fas' : 'far'} fa-heart"></i>
          </button>
        </div>
        <div class="car-details">
          <div class="car-title">
            <h3 class="car-name">${car.name}</h3>
            <span class="car-price">₹${car.price}/${car.priceUnit}</span>
          </div>
          <div class="car-features">
            <span class="car-feature">
              <i class="fas fa-cog"></i>
              ${car.transmission}
            </span>
            <span class="car-feature">
              <i class="fas fa-gas-pump"></i>
              ${car.fuel}
            </span>
            <span class="car-feature">
              <i class="fas fa-users"></i>
              ${car.seats} Seats
            </span>
            <span class="car-feature">
              <i class="fas fa-map-marker-alt"></i>
              ${car.location}
            </span>
          </div>
          ${car.rating ? `
            <div class="car-rating">
              <div class="stars">
                ${generateStars(car.rating)}
              </div>
              <span class="rating-text">${car.rating} (${car.reviewCount} reviews)</span>
            </div>
          ` : ''}
          <div class="car-actions">
            <a href="/car-details.html?id=${car.id}" class="btn btn-outline btn-sm">View Details</a>
            <a href="/booking.html?car=${car.id}" class="btn btn-primary btn-sm">Book Now</a>
          </div>
        </div>
      </div>
    `;
  });
  
  container.innerHTML = carsHTML;
}

// Generate star rating HTML
function generateStars(rating) {
  let starsHTML = '';
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  
  for (let i = 0; i < fullStars; i++) {
    starsHTML += '<i class="fas fa-star"></i>';
  }
  
  if (hasHalfStar) {
    starsHTML += '<i class="fas fa-star-half-alt"></i>';
  }
  
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  for (let i = 0; i < emptyStars; i++) {
    starsHTML += '<i class="far fa-star"></i>';
  }
  
  return starsHTML;
}

// Render pagination
function renderPagination(totalItems, currentPage, itemsPerPage) {
  const paginationContainer = document.getElementById('pagination');
  
  if (!paginationContainer) return;
  
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  if (totalPages <= 1) {
    paginationContainer.innerHTML = '';
    return;
  }
  
  let paginationHTML = '<div class="pagination-container">';
  
  // Previous button
  if (currentPage > 1) {
    paginationHTML += `
      <button class="pagination-btn" data-page="${currentPage - 1}">
        <i class="fas fa-chevron-left"></i> Previous
      </button>
    `;
  } else {
    paginationHTML += `
      <button class="pagination-btn disabled">
        <i class="fas fa-chevron-left"></i> Previous
      </button>
    `;
  }
  
  // Page numbers
  paginationHTML += '<div class="pagination-pages">';
  
  const startPage = Math.max(1, currentPage - 2);
  const endPage = Math.min(totalPages, currentPage + 2);
  
  if (startPage > 1) {
    paginationHTML += '<button class="pagination-btn" data-page="1">1</button>';
    if (startPage > 2) {
      paginationHTML += '<span class="pagination-ellipsis">...</span>';
    }
  }
  
  for (let i = startPage; i <= endPage; i++) {
    paginationHTML += `
      <button class="pagination-btn ${i === currentPage ? 'active' : ''}" data-page="${i}">
        ${i}
      </button>
    `;
  }
  
  if (endPage < totalPages) {
    if (endPage < totalPages - 1) {
      paginationHTML += '<span class="pagination-ellipsis">...</span>';
    }
    paginationHTML += `<button class="pagination-btn" data-page="${totalPages}">${totalPages}</button>`;
  }
  
  paginationHTML += '</div>';
  
  // Next button
  if (currentPage < totalPages) {
    paginationHTML += `
      <button class="pagination-btn" data-page="${currentPage + 1}">
        Next <i class="fas fa-chevron-right"></i>
      </button>
    `;
  } else {
    paginationHTML += `
      <button class="pagination-btn disabled">
        Next <i class="fas fa-chevron-right"></i>
      </button>
    `;
  }
  
  paginationHTML += '</div>';
  
  paginationContainer.innerHTML = paginationHTML;
  
  // Add event listeners to pagination buttons
  const paginationButtons = paginationContainer.querySelectorAll('.pagination-btn:not(.disabled)');
  paginationButtons.forEach(button => {
    button.addEventListener('click', () => {
      const page = button.dataset.page;
      if (page) {
        const url = new URL(window.location.href);
        url.searchParams.set('page', page);
        window.location.href = url.toString();
      }
    });
  });
}

// Update active filters display
function updateActiveFilters(filters) {
  const activeFiltersContainer = document.getElementById('active-filters');
  
  if (!activeFiltersContainer) return;
  
  const activeFilters = [];
  
  if (filters.category && filters.category !== 'all') {
    activeFilters.push({ key: 'category', value: filters.category, label: `Category: ${filters.category}` });
  }
  
  if (filters.location) {
    activeFilters.push({ key: 'location', value: filters.location, label: `Location: ${filters.location}` });
  }
  
  if (filters.transmission && filters.transmission !== 'all') {
    activeFilters.push({ key: 'transmission', value: filters.transmission, label: `Transmission: ${filters.transmission}` });
  }
  
  if (filters.fuel && filters.fuel !== 'all') {
    activeFilters.push({ key: 'fuel', value: filters.fuel, label: `Fuel: ${filters.fuel}` });
  }
  
  if (filters.seats && filters.seats !== 'all') {
    activeFilters.push({ key: 'seats', value: filters.seats, label: `${filters.seats}+ Seats` });
  }
  
  if (filters.minPrice || filters.maxPrice) {
    let priceLabel = 'Price: ';
    if (filters.minPrice && filters.maxPrice) {
      priceLabel += `₹${filters.minPrice} - ₹${filters.maxPrice}`;
    } else if (filters.minPrice) {
      priceLabel += `₹${filters.minPrice}+`;
    } else {
      priceLabel += `Up to ₹${filters.maxPrice}`;
    }
    activeFilters.push({ key: 'price', value: '', label: priceLabel });
  }
  
  if (activeFilters.length === 0) {
    activeFiltersContainer.innerHTML = '';
    return;
  }
  
  let filtersHTML = `
    <div class="active-filters-container">
      <h4>Active Filters:</h4>
      <div class="filter-tags">
  `;
  
  activeFilters.forEach(filter => {
    filtersHTML += `
      <span class="filter-tag">
        ${filter.label}
        <button class="remove-filter" data-filter-key="${filter.key}" data-filter-value="${filter.value}">
          ×
        </button>
      </span>
    `;
  });
  
  filtersHTML += `
      </div>
    </div>
  `;
  
  activeFiltersContainer.innerHTML = filtersHTML;
  
  // Add event listeners to remove filter buttons
  const removeFilterButtons = activeFiltersContainer.querySelectorAll('.remove-filter');
  removeFilterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const filterKey = button.dataset.filterKey;
      const url = new URL(window.location.href);
      
      if (filterKey === 'price') {
        url.searchParams.delete('min_price');
        url.searchParams.delete('max_price');
      } else {
        url.searchParams.delete(filterKey);
      }
      
      window.location.href = url.toString();
    });
  });
}

// Load car details for car details page
export async function loadCarDetails(carId) {
  const carDetailsContainer = document.getElementById('car-details');
  
  if (!carDetailsContainer) return;
  
  try {
    // Show loading state
    carDetailsContainer.innerHTML = '<div class="loading">Loading car details...</div>';
    
    // In a real app, we would fetch data from the server
    let car;
    
    if (useMockData) {
      // Find car in mock data
      car = mockCars.find(c => c.id === carId);
      
      if (!car) {
        throw new Error('Car not found');
      }
    } else {
      // Fetch from API
      const response = await fetch(endpoints.cars.byId(carId));
      if (!response.ok) throw new Error('Failed to fetch car details');
      car = await response.json();
    }
    
    // Render car details
    renderCarDetails(car, carDetailsContainer);
    
    // Load similar cars
    loadSimilarCars(car.category, carId);
    
  } catch (error) {
    console.error('Error loading car details:', error);
    carDetailsContainer.innerHTML = '<div class="error">Car not found or failed to load details.</div>';
  }
}

// Render car details
function renderCarDetails(car, container) {
  const isWishlisted = isInWishlist(car.id);
  
  container.innerHTML = `
    <div class="car-detail-header">
      <h1>${car.name}</h1>
      <p class="car-category">${car.category.charAt(0).toUpperCase() + car.category.slice(1)}</p>
    </div>
    
    <div class="car-detail-content">
      <div class="car-detail-gallery">
        <img src="${car.image}" alt="${car.name}" class="car-detail-image">
      </div>
      
      <div class="car-detail-info">
        <div class="car-detail-price">
          <h2>₹${car.price}/${car.priceUnit}</h2>
          <p class="${car.available ? 'available' : 'unavailable'}">
            ${car.available ? 'Available' : 'Not Available'}
          </p>
        </div>
        
        <div class="car-specifications">
          <h3>Specifications</h3>
          <ul class="specs-list">
            <li><i class="fas fa-cog"></i> <strong>Transmission:</strong> ${car.transmission}</li>
            <li><i class="fas fa-gas-pump"></i> <strong>Fuel Type:</strong> ${car.fuel}</li>
            <li><i class="fas fa-users"></i> <strong>Seating:</strong> ${car.seats} Passengers</li>
            <li><i class="fas fa-tachometer-alt"></i> <strong>Mileage:</strong> ${car.mileage}</li>
            <li><i class="fas fa-snowflake"></i> <strong>AC:</strong> ${car.airConditioned ? 'Yes' : 'No'}</li>
            <li><i class="fas fa-map-marker-alt"></i> <strong>Location:</strong> ${car.location}</li>
          </ul>
        </div>
        
        ${car.features && car.features.length > 0 ? `
          <div class="car-features-detail">
            <h3>Features</h3>
            <ul class="features-list">
              ${car.features.map(feature => `<li><i class="fas fa-check"></i> ${feature}</li>`).join('')}
            </ul>
          </div>
        ` : ''}
        
        ${car.rating ? `
          <div class="car-rating-detail">
            <h3>Rating</h3>
            <div class="rating-display">
              <div class="stars">
                ${generateStars(car.rating)}
              </div>
              <span class="rating-text">${car.rating} out of 5 (${car.reviewCount} reviews)</span>
            </div>
          </div>
        ` : ''}
        
        <div class="car-detail-actions">
          <button class="wishlist-btn-card ${isWishlisted ? 'active' : ''}" 
                  data-car-id="${car.id}" 
                  aria-label="${isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}">
            <i class="${isWishlisted ? 'fas' : 'far'} fa-heart"></i>
            ${isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
          </button>
          <a href="/booking.html?car=${car.id}" class="btn btn-primary btn-lg">Book Now</a>
        </div>
      </div>
    </div>
    
    ${car.description ? `
      <div class="car-detail-description">
        <h3>About this car</h3>
        <p>${car.description}</p>
      </div>
    ` : ''}
  `;
}

// Load similar cars
async function loadSimilarCars(category, excludeCarId) {
  const similarCarsGrid = document.getElementById('similar-cars-grid');
  
  if (!similarCarsGrid) return;
  
  try {
    // Filter cars by category and exclude current car
    const similarCars = mockCars
      .filter(car => car.category === category && car.id !== excludeCarId)
      .slice(0, 4); // Show only 4 similar cars
    
    if (similarCars.length === 0) {
      similarCarsGrid.innerHTML = '<div class="no-results">No similar cars found.</div>';
      return;
    }
    
    renderCars(similarCars, similarCarsGrid);
    
  } catch (error) {
    console.error('Error loading similar cars:', error);
    similarCarsGrid.innerHTML = '<div class="error">Failed to load similar cars.</div>';
  }
}