# NeiroTunes

This repository contains the source for **NeiroTunes**, a single page website for a personal music production service. The page is built with plain HTML, CSS and JavaScript.

## Packages

NeiroTunes offers three levels of service:

- **Basic – $50** – A 2-3 minute personalized song with AI-enhanced vocals and professional mixing. Includes one revision, 48‑hour delivery and distribution to Spotify/Apple Music. Royalties remain with the producer.
- **Premium – $150** – Adds a professional vocalist, studio-quality production, behind-the-scenes video, acoustic version and personal video message. Three revisions included. Royalties remain with the producer.
- **Rights Transfer – +$500** – Purchase full copyright ownership, master recordings and all future royalties.

Unless you buy the Rights Transfer, you receive personal use rights while the producer keeps streaming royalties.

### Add-ons

- **Wedding Package** – Ceremony usage rights, wedding version, instrumental for the first dance and a keepsake vinyl record.
- **Business Anthem** – Corporate theme song with internal use rights, 30‑second spot, instrumental and branded artwork.
- **Sync License** – Allows the song in a single commercial project such as ads, videos or films. Price varies from $200 to $1000.

## Customization

Before deploying the site you should update several placeholders in `index.html`:

- **Google Analytics** – replace `G-XXXXXXXXXX` with your tracking ID.
- **Facebook Pixel** – uncomment the snippet and set `YOUR_PIXEL_ID` if you use Facebook advertising.
- **Hotjar** – uncomment the code and provide your Hotjar ID if desired.
- **Social links** – update the Instagram, Facebook and TikTok URLs in the footer.
- **Payment integration** – update the `LEMON_CHECKOUT_URL` constant in `scripts.js` with your Lemon Squeezy checkout link. Include `<script src="https://assets.lemonsqueezy.com/lemon.js" defer></script>` in `index.html` if you want to use the popup widget. Configure webhooks in your Lemon Squeezy dashboard to `https://yourdomain.com/webhooks/lemon` (or your chosen URL) so you can confirm orders after payment.
- **Fondy redirect** – if you use Fondy for payments, set its success URL to `/success.html`. This page reads the `pendingOrder` saved in `sessionStorage` and shows a brief summary after checkout.
- **Images and favicons** – provide an `og-preview.jpg` image (1200×630) for social sharing and create favicon files (`favicon-32x32.png`, `favicon-16x16.png`, `apple-touch-icon.png`).

The main styles are located in `styles.css` and behaviour scripts in `scripts.js`.

## Development

Open `index.html` in a browser to test the site. No build steps are required, but you can minify the CSS and JavaScript if you wish.

## License

This project is released under the MIT License. See [LICENSE](LICENSE) for details.
