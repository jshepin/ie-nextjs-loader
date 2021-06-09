### ImageEngine Custom Loader for Next.js

This repository shows how to write a Next.js `Image` component custom loader to use with [ImageEngine CDN](http://imageengine.io)

You can check the [final running version](https://ie-custom-loader.vercel.app)

To run locally:

```bash
npm run dev
```

And visit [http://localhost:3000](http://localhost:3000).


### Deploy

Install the [vercel CLI](https://vercel.com/cli)

Then run:

```
vercel
```

To create a project. Followed by:
```
vercel --prod
```

To deploy on vercel. Once you have the IE distribution set up run:

```
vercel --build-env DISTRIBUTION=”https://your_ie_address.imgeng.in” --prod
```
