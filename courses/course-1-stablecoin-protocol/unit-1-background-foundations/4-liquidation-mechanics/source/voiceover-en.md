# Liquidation Mechanics Voiceover (EN)

## Segment 01
So many stablecoins exist. What are the incentives for people to mint them? The incentive structure reveals why these systems exist. Let us start with DAI.

## Segment 02
DAI is a pegged, algorithmic, exogenously collateralized stablecoin. It is one of the most influential DeFi projects ever created. DAI was a huge factor in supercharging the DeFi space.

## Segment 03
Roughly, the way it works is you deposit ETH or other crypto collateral into a smart contract containing the DAI algorithm. Based on the current collateral price, it mints you some amount of DAI. You can only mint less DAI than the total value of collateral you deposit. This way the system always has more collateral than minted DAI.

## Segment 04
Additionally, every year you get charged something called a stability fee, usually around two percent. Now you are free to do whatever you want with your DAI. If you want your ETH back, you must give your DAI back to the smart contract. The contract burns your DAI and returns your collateral. It uses the current ETH price to figure out how much to give back.

## Segment 05
Because of this stability fee and collateralized ETH, people call this a collateralized debt position. We technically owe DAI back to the protocol at some point. All the DAI in existence was minted from the Maker protocol. Someone needs to pay it back eventually.

## Segment 06
If you cannot pay your stability fees or ETH price tanks, your collateral value may drop. If collateral value is less than minted DAI value, people can liquidate you. This means they can take your collateral. The protocol always needs more collateral than minted DAI. Liquidation is punishment for not maintaining collateral and a way to save the system.

## Segment 07
There is also a Maker token used for voting on protocol parameters. I give this overview because I want you to ask a fundamental question: Why would I spend money to mint this stablecoin? Why would I be the one to do that? That is the fundamental question we will answer.

## Segment 08
USDC is a classic pegged, governed, exogenously collateralized stablecoin. It is backed by real world dollars in a bank account. Not much else to say here. Now let us discuss the classic UST and Luna, which we know collapsed. We can learn from what happened to prevent it in the future.

## Segment 09
UST was pegged to the dollar, algorithmic, and endogenous. It imploded on itself. Can you guess why? Since the system was endogenous, once UST lost its peg, Luna became less attractive. People were not holding Luna, so its price fell. This made it harder to keep the UST peg, which made Luna price fall more. You see the pattern. This is the death spiral.

## Segment 10
People still want to try endogenously collateralized stablecoins because they scale quickly. Protocols like Frax have come a long way to create hybrids. Frax uses a mix of endogenous and exogenous collateral. RAI is one of the few floating stablecoins, not pegged to any asset. It focuses on minimal governance and uses only Ethereum as collateral. RAI has a nearly purely algorithmic stability mechanism.

## Segment 11
Some argue that since RAI collateral is only ETH, its price is somewhat pegged to ETH. But that is a longer argument. RAI is floating, algorithmic, and exogenously collateralized. They use supply and demand mechanisms to maintain price stability. Refer to Reflexer documentation for RAI mechanism details. The PID controller design is documented in their technical specifications.

## Segment 12
Now we have gone over stablecoins and categories. Let us talk about what they really do. We can ask, which one of these is the best stablecoin? To answer, I need to ask, best for whom? Centralized, governed coins have the issue of centrality, which defeats Web3 purpose. Maybe we want algorithmic stablecoins. That is probably what we want for Web3.

## Segment 13
But these algorithmic coins might feel untested to non-crypto people. The fees might be scary for average users. RAI presents an interesting model. Stable buying power instead of being pegged. It is algorithmic and decentralized. This aligns with Web3 principles. But every coin has trade-offs. There is no best coin right now.

## Segment 14
The stablecoin best for average people matters less than what whales prefer. What stablecoins whales like might be more important. For most algorithmic stablecoins, you will see fees associated with minting. Protocols generate revenue from these stablecoin systems. They need money for maintenance, incentives, and improvements.

## Segment 15
We need stablecoins for the three functions of money: store of value, unit of account, medium of exchange. But are you going to pay fees to mint them and keep them in circulation? Someone has to pay to mint these coins and often keep paying. The market cap for some stablecoins is in the billions. With a one percent fee and one billion market cap, we are talking ten million dollars.

## Segment 16
Are average people going to collectively pay ten million dollars per year? No. So average people are not printing these for the three functions of money. Then who is minting these? Let us play a thought experiment. Say I have ETH as an investment. I have bought all the ETH I can. I sold my house and everything. But I want more exposure. What can I do?

## Segment 17
I can put my ETH into a stablecoin protocol, get minted stablecoin, then sell it for more ETH. You might have heard of leverage investing or margin trading. This is essentially the Web3 equivalent. Why are stablecoins good? Because we need the three functions of money. But why are stablecoins minted? Because investors want to make leveraged bets.

## Segment 18
Most stablecoin platforms list this as one of the biggest reasons to mint: To multiply exposure or maximize position on some crypto asset. This pattern is well-documented in quantitative finance literature. However, it feels weird that we need stablecoins for money functions, but that is not why they are minted. Even though I like RAI for the people, DAI has higher market cap. Investors like the leverage opportunity DAI offers more than what RAI offers.

## Segment 19
How much stablecoins are minted depends on how much investors think they can get exposure to assets they want. This analysis reveals the core incentive structure driving stablecoin minting. Curve Finance serves as a critical infrastructure for stablecoin liquidity. Stablecoin-to-stablecoin exchanges create value through utility differences. Even assets pegged to the same underlying can trade at different prices. This reflects specific utility needs in different contexts.

## Segment 20
Aave and Curve both have stablecoin initiatives in development. These will add new dynamics to the stablecoin landscape. The fundamental trade-offs between capital efficiency and stability remain. Each design choice carries specific risks and benefits. Understanding these mechanisms is essential for protocol design. The stablecoin space continues to evolve with new mechanisms and models. Critical evaluation of incentive structures remains essential.
