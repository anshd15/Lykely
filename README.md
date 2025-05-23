![luk](https://github.com/user-attachments/assets/e8bd0102-c453-4163-94fe-6fc836efb054)

<a href="https://universaleverything.io/0x2FB1bF725c16D88fA3d124B09a72715069363DD3?network=testnet&assetGroup=grid">UP Project Link (Grid)</a> | 
<a href="https://lykely.vercel.app/">Deployed Project Link</a>

## 🚀 **About Lykely**  

*<b>Lykely</b> is a gamified prediction market for memes where users bet on whether memes will go viral within a week, earning rewards in Lukso Coin ($LYX). By integrating blockchain-powered betting with meme culture, Lykely transforms viral content into a decentralized economy that rewards creators*

## **🔍 Problem It Solves**  
The world of memes thrives on creativity and virality, yet it lacks a structured system to reward creators or sustain their impact. Memes often go viral, driving internet trends and engaging communities, but their creators are rarely recognized or compensated for their work. Once the initial wave of popularity fades, these memes—and their potential cultural and economic value—are lost. This disconnect between creativity, recognition, and monetization leaves meme creators underappreciated and limits opportunities for meaningful community engagement. The problem lies in the absence of a framework that captures and sustains the value generated by viral memes, ensuring creators and communities alike can benefit.

## **🎯 Key Features**  

1. **Empowering Meme Creators:** Lykely ensures that creators of viral memes are rewarded for their creativity by launching a dedicated meme coin for each viral meme. Creators receive a portion of these coins, giving them tangible recognition and monetary rewards for their influence.

2. **Gamified Engagement:** Users can predict which memes will go viral within a week, earning Lukso Coin rewards for accurate predictions. This gamified approach drives engagement and incentivizes users to actively participate in promoting and analyzing meme trends.

3. **Transforming Memes into Economies:** Once a meme goes viral, its dedicated meme coin creates a microeconomy. These coins not only reward the creator but also attract communities, building long-term value around the meme's popularity.

4. **Blockchain Transparency:** By leveraging the Lukso blockchain, Lykely ensures transparent, secure, and tamper-proof transactions, fostering trust among users and creators.

5. **Promoting Meme Culture:** Lykely creates a system where memes aren't just fleeting internet trends—they are nurtured, promoted, and transformed into sustainable, blockchain-backed ecosystems that empower both creators and communities.

## **🧱 Architectural Diagram** 
Link to view - https://app.eraser.io/workspace/qZs9mFIRRRvOVItELERO?origin=share


![{22588D34-4B43-4FB8-9256-C6B33B1DC7F3}](https://github.com/user-attachments/assets/d7d7ee8e-5063-4178-9730-321878f5174d)



## **⚙️ Technical Overview**

⚙ Technical Design & Implementation of Lykley
Lykely is a gamified prediction market where users bet on whether memes will go viral within a week, earning rewards in $LYX. It transforms viral content into a decentralized economy that rewards creators and engages community. It combines decentralized identity, tokenized incentives, and social interactions—all built on Universal Profiles and LSPs.

#### 🧑‍💻 Frontend (React + Tailwind + Radix + Framer Motion + Spline)
- Built using React for UI logic, styled with Tailwind CSS and Radix UI components.
- Animations and motion effects use Framer Motion, and a 3D immersive landing scene is powered by Spline.
- The dApp connects to Universal Profiles through the UP Browser Extension.


#### 🖥️  Backend (Node.js + Express + MongoDB + JWT + @lukso/lsp-smart-contracts)
- User authentication is handled via Universal Profile signatures, verified server-side using @lukso/lsp-smart-contracts.
- On successful login, a JWT token is issued to maintain session state securely.
- MongoDB stores prediction data, user interaction logs and other metadata off-chain.
- The LUKSO Transaction API is used for making in-app transactions such as betting, boosting, and reward distribution.


#### ⛓️ Blockchain Layer (LUKSO + LSPs)
- LSP3 is used to to fetch the onchain profile metadata linked to their UP.
- Universal Profile Wallet form the basis for user authentication and authorization.

#### 🧱 The Grid Integration
- Lykley is built to be modular and Grid-ready
- Predictors and creators can clone our mini-dapp to their Grid interfaces seamlessly.


## ▶️ Demo Video

[![Watch the demo](https://img.youtube.com/vi/bSleWv9Qw8o/0.jpg)](https://youtu.be/bSleWv9Qw8o?si=TjWgB2Kcluy6u2y6)
