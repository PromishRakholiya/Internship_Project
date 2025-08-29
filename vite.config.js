import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    port: 5173,
    host: true
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: 'index.html',
        about: 'about.html',
        cars: 'cars.html',
        'car-details': 'car-details.html',
        booking: 'booking.html',
        'booking-confirmation': 'booking-confirmation.html',
        bookings: 'bookings.html',
        location: 'location.html',
        wishlist: 'wishlist.html'
      }
    }
  }
})