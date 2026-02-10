# Stablecoin Taxonomy Voiceover (EN)

## Segment 01
Now we know what a stablecoin is and why we care. Let us examine the different categories of stablecoins. Here is where I strongly disagree with traditional media categorizations.

## Segment 02
If you search for types of stablecoins, you will see them categorized as fiat collateralized, crypto collateralized, commodity collateralized, and algorithmic. This is not a terrible categorization, and it does help newcomers understand. But I think it paints an inaccurate picture.

## Segment 03
Let me propose a better framework. The categorizations that actually matter are relative stability, stability method, and collateral type.

## Segment 04
Let us start with relative stability. When we talk about stability, something is stable only relative to something else. The most popular type is pegged or anchored stablecoins.

## Segment 05
These are stablecoins pegged to another asset, like the US dollar. Tether, DAI, and USDC are examples. They follow the narrative that one coin equals one dollar.

## Segment 06
That is how they stay stable. They track the price of another asset that we think is stable. Most of these stablecoins have mechanisms to make them almost interchangeable with their pegged asset.

## Segment 07
For example, USDC says that for every token minted, there is a dollar in a bank account somewhere. You should be able to swap your USDC for a dollar at any time. DAI, on the other hand, uses permissionless over-collateralization to maintain its peg. We will understand that mechanism later.

## Segment 08
However, a stablecoin does not have to be pegged to another asset. It can be floating. To be a stablecoin, its buying power just has to stay relatively the same over time. A floating stablecoin has constant buying power and is not tied to any other asset.

## Segment 09
With this mechanism, you could hypothetically have a stablecoin more stable than an anchored one. Here is an example. Let us say you can buy ten apples for ten dollars today. But in five years, you can only buy five apples with ten dollars. It would cost you twenty dollars to buy ten apples. This is inflation, and it is common.

## Segment 10
Now let us introduce a floating stablecoin whose buying power adjusts with the market. Let us call it Apple Coin. Today you buy ten apples with ten Apple Coins. In ten years, you can also buy ten apples with ten Apple Coins.

## Segment 11
Which asset is more stable? The Apple Coin. Its buying power stayed the same over five years, even though it is not pegged to a dollar. Stablecoins like this do exist, using clever algorithms. One example is the RAI stablecoin by Reflexer Labs.

## Segment 12
The RAI mechanism involves complex PID controller mathematics. Refer to Reflexer documentation for implementation details. This concept can be hard to grasp, so let us use an analogy.

## Segment 13
Look at the anchor and buoy in this image. Which is more stable? It depends on what you compare them to. Compared to sea level, the buoy is more stable. It always stays at sea level as water rises and falls. The distance between the anchor and sea level constantly changes.

## Segment 14
The buoy is an example of a floating stablecoin. If we compare to the ocean floor, the anchor is more stable. It always stays on the floor. This is analogous to a pegged or anchored stablecoin.

## Segment 15
To extend the analogy, what happens in a storm? The stablecoin needs mechanisms to handle turbulence. Most floating stablecoins have mechanisms to account for market volatility.

## Segment 16
To summarize, pegged stablecoins are tied to another asset, while floating stablecoins use mechanisms to keep buying power constant over time. Now, stability method. This is the mechanism that keeps the coin stable.

## Segment 17
For pegged coins, what is the pegging mechanism? For floating coins, what is the floating mechanism? It typically involves minting and burning stablecoins in specific ways. It usually refers to who or what is doing the minting and burning.

## Segment 18
These exist on a spectrum from governed to algorithmic. In a governed stablecoin, a governing or centralized body mints and burns the coins. The maximally governed coin would be a single entity minting coins and promising they are not volatile. It could also be an organization, a government, or a DAO choosing to mint and burn.

## Segment 19
Governed coins are typically considered centralized since a singular body controls minting and burning. You can make them more decentralized by introducing a DAO. Coins like USDC, USDT, and TUSD are examples of governed stablecoins.

## Segment 20
On the other hand, an algorithmic stablecoin maintains stability through a permissionless algorithm with no human intervention. This is the third place where I disagree with traditional media.

## Segment 21
A coin like DAI I would consider much more algorithmic than governed. It uses a permissionless algorithm to mint and burn tokens. Traditional media might say algorithmic stablecoins are always under-collateralized or follow seniorage shares.

## Segment 22
But an algorithmic stablecoin is simply when autonomous code dictates minting and burning, with zero meddling humans. Now we understand the taxonomy. We have pegged versus floating, and governed versus algorithmic.

## Segment 23
Next, we will examine the collateral types that back these stablecoins. This is where the real engineering begins.
