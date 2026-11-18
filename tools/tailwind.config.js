// Build: npx tailwindcss@3 -c tools/tailwind.config.js -i tools/tailwind.input.css -o css/tailwind.css --minify
module.exports = {
  content: [__dirname + '/../*.html', __dirname + '/../js/*.js'],
  theme: {
    extend: {
      colors: {
        'deep-green': '#1B2B23',
        'forest-accent': '#2D4336',
        'earth-brown': '#4A3728',
        'soft-cream': '#F9F7F2',
        'warm-sand': '#F0EBE3',
        'muted-gold': '#C5A059',
        'gold-accent': '#D4AF37',
      },
    },
  },
};
