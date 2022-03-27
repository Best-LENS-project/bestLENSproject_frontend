This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

# About Hackerverse

# Hackerverse Tech

please also look at the smart contract repo here: https://github.com/Best-LENS-project/lens-protocol

Our design principles are to use the protocol as the back-end to avoid the need for any centralization or error-prone paths. Furthermore we try to focus on the use-ability and use the paradigm of always clearly previewing anything that would be commited to the chain.
Towards that end the smart-contracts were written in solidity, deployed on hardhat local network for testing and then uploaded to Mumbai Polygon test-net.

<!-- [chris may add somehting here #happypath] -->

The front-end is based on NextJS to comply with the defacto-DApp standard and uses tailwindCSS to achieve smooth and intuitive design.
It allows you to connect your wallet through Blocknative Onboard to be inclusive to all wallets and then to create a profile on our Mumbai deployed LENS version as well as connect an existing handle if you have one.
Images that you want to use e.g. Profile Images are uploaded to an IPFS server and will automatically be linked through profile creation
Furthermore, you can explore the hackathons and posts that are available, which are (at the moment partially) queried from the chain.
We use a flask server that only provides an Insight API to generate graphs which are easy to read and represent interesting facts. Those gaphs are then shown in the frontend (deployment still outstanding). This way we can process the data into the right formats quickly and efficiently without the rather clunky and limited graph APIs that JS offers.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
