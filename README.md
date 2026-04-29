# Far Morgan — Personal Blog

A minimal personal blog built with vanilla HTML and a Vercel Edge Function
for dynamic content delivery.

## Stack

- Static HTML/CSS — no framework
- Vercel Edge Functions — for fast dynamic routes
- Deployed on Vercel (fra1 region)

## Local Development

```bash
npm i -g vercel
vercel dev
```

## Deployment

```bash
vercel --prod
```

## Project Structure

```
.
├── api/
│   └── content.js     # Edge function for dynamic content
├── public/
│   ├── index.html
│   ├── about.html
│   ├── robots.txt
│   └── sitemap.xml
├── package.json
└── vercel.json
```

## License

MIT
