# DeFi Landscape Voiceover (EN)

## Segment 01
This is a short excerpt from my upcoming Foundry course.

## Segment 02
In this video and in the full course, you will learn how to build your own stablecoin using advanced smart contract techniques.

## Segment 03
So buckle up. We are going to touch advanced fuzzing and testing, and I will give you a real feel for how these systems work.

## Segment 04
Also, yes, I have not shaved or slept. That is why I look a little rough today.

## Segment 05
Alright, welcome back, and welcome to the DeFi section of this course.

## Segment 06
If we scroll down to the Foundry DeFi section, you will see the code we are going to use throughout the course.

## Segment 07
Now, I have to say this up front. DeFi is a massive topic.

## Segment 08
It deserves its own full video, so here we are just doing a quick, practical overview.

## Segment 09
We will cover what DeFi is, what you can do with it, and a few of the most popular apps.

## Segment 10
A great place to get a snapshot of the ecosystem is DeFi Llama.

## Segment 11
There you can see the total value locked, the dominant apps, and the leading protocols.

## Segment 12
Let us look at the current top five. Lido is a liquid staking platform.

## Segment 13
MakerDAO is a CDP protocol that creates stablecoins. That is exactly what we will build.

## Segment 14
Aave is a lending and borrowing protocol, like an open source decentralized bank.

## Segment 15
Curve is a decentralized exchange that specializes in stablecoin swaps.

## Segment 16
Uniswap is the general purpose exchange for swapping tokens and all kinds of assets.

## Segment 17
If you understand a handful of these top protocols, the rest of the list becomes easier to navigate.

## Segment 18
You start to see more specialized categories and more advanced designs as you go deeper.

## Segment 19
The beauty of DeFi is that it gives you access to sophisticated financial tools in a decentralized setting.

## Segment 20
If financial terms are new to you, some of this may feel dense at first.

## Segment 21
But it is a fascinating rabbit hole, and honestly, it is a lot of fun.

## Segment 22
DeFi is, in my view, one of the most important areas that smart contracts enable.

## Segment 23
Some great places to learn are Bankless, and MetaMask Learn for wallet basics and safety.

## Segment 24
And a lot of concepts from Web2 finance transfer really well into DeFi.

## Segment 25
One of my favorite suggestions is to try Aave and Uniswap directly.

## Segment 26
Let us scroll down and open the Aave app.

## Segment 27
We can connect a wallet. I am on the Sepolia testnet right now.

## Segment 28
Notice the small IPFS indicator in Brave. That means this site is also hosted on IPFS.

## Segment 29
Web3 is all about decentralization, and this is a great example of it in practice.

## Segment 30
If we scroll down, we can supply assets and earn interest on them.

## Segment 31
For example, if we supply USDC, a dollar pegged stablecoin, we might earn a few percent.

## Segment 32
That is similar to how a bank account works.

## Segment 33
The interest comes from people borrowing those assets.

## Segment 34
So if you supply assets, you earn interest. If you borrow assets, you pay interest.

## Segment 35
That is why this is so cool. It is permissionless banking, open to anyone.

## Segment 36
Now, Uniswap is another great app.

## Segment 37
It lets you swap tokens easily. For example, you could swap ETH for the Aave governance token.

## Segment 38
Uniswap is a permissionless decentralized exchange that opens access to markets in a more transparent and fair way.

## Segment 39
For beginners, I strongly recommend trying these apps on testnets first.

## Segment 40
Not everything is available on testnets, but it is a safe place to learn.

## Segment 41
I also have videos on advanced strategies, like leverage, quant-style trades, and flash loans on Aave.

## Segment 42
Those are powerful tools, but they are definitely advanced.

## Segment 43
Also, do not do heavy DeFi activity on Ethereum mainnet unless you have to. Fees can be high.

## Segment 44
Instead, use cheaper networks like Polygon, Optimism, or Arbitrum.

## Segment 45
That is why Layer 2s exist. They make transactions far more affordable.

## Segment 46
Another important topic in DeFi is MEV, or maximal extractable value.

## Segment 47
The idea is that validators can reorder transactions inside a block to extract profit.

## Segment 48
There are many approaches to make MEV fairer, and protocols like Flashbots are leading that research.

## Segment 49
If you want to go deeper, check out the Flashbots "New to MEV" resources. They are excellent.

## Segment 50
Now, the big project we will build in this course is a stablecoin.

## Segment 51
Stablecoins are a bit advanced, so we will watch a separate video on what they really are.

## Segment 52
That will help us clear up a lot of misconceptions you might have seen in the media.

## Segment 53
Our project is loosely based on MakerDAO and DAI, the most famous decentralized stablecoin system.

## Segment 54
I plan to audit this project after the course is released.

## Segment 55
It is the most advanced project in the course. Even after we cover upgrades, governance, and security.

## Segment 56
If you finish it and truly understand it, you should feel proud. It is not easy.

## Segment 57
Go slow, take your time, and do not overload yourself.

## Segment 58
If DeFi is totally new to you, pause this video and spend 15 to 20 minutes researching.

## Segment 59
Search for "learn DeFi" and you will see good starting points like Cointelegraph, Medium articles, Udemy, and Coinbase Learn.

## Segment 60
DeFi is permissionless, open source finance. It is, in my opinion, the best thing smart contracts have enabled.

## Segment 61
It gives us an alternative to opaque centralized institutions and products that do not serve users well.

## Segment 62
That history is a big part of why DeFi matters. It is worth digging into.

## Segment 63
Alright, let us take a quick tour of the code, then jump into the stablecoin video.

## Segment 64
In the repo, inside src, you will find two main contracts.

## Segment 65
The first is DecentralizedStableCoin.sol, a minimal ERC20 with burn and mint features.

## Segment 66
The main logic lives in DSCEngine.sol. It controls how the stablecoin works.

## Segment 67
You deposit collateral, mint DSC, redeem collateral, burn DSC, and handle liquidations.

## Segment 68
If you see lots of comments and NatSpec, that is intentional. They explain the system.

## Segment 69
There is a test folder with unit tests, oracle utilities, mocks, and fuzz tests.

## Segment 70
We also have invariant tests. Those separate average Solidity devs from truly advanced ones.

## Segment 71
The scripts are simple and mostly handle deployment.

## Segment 72
We use Chainlink price feeds to value the collateral.

## Segment 73
That is the high level overview. Everything you need is in the repo, and you should ask lots of questions.

## Segment 74
One reason I care about stablecoins is that they are a core DeFi primitive.

## Segment 75
Web3 needs a better, more reliable money layer. The current solutions are not good enough yet.

## Segment 76
I hope this motivates some of you to build something better.

## Segment 77
Now, let us jump into the stablecoin explainer and take it slow.

## Segment 78
When you research stablecoins, you will see a lot of misleading information. We are here to clear that up.

## Segment 79
We will cover what stablecoins are, why they matter, the main categories, and how the top designs work.

## Segment 80
This video is for everyone, technical or not. Do not get discouraged if something is confusing on the first pass.

## Segment 81
Buckle up. We are going on a ride through the world of stability.

## Segment 82
At the highest level, a stablecoin is a crypto asset with relatively stable purchasing power.

## Segment 83
That is the key idea. Purchasing power does not swing wildly from day to day.

## Segment 84
You will often hear that stablecoins are pegged to a currency, a commodity, or a financial instrument.

## Segment 85
That description is a decent starting point, but it is not the full story.

## Segment 86
Here is a simple example. If you bought apples with Bitcoin six months ago, you would get a very different amount than today.

## Segment 87
That is changing purchasing power. It makes Bitcoin a poor unit for everyday pricing.

## Segment 88
If you bought apples with dollars, you would likely get a similar amount over time.

## Segment 89
That is what we mean by stable purchasing power.

## Segment 90
Assets with wild price swings are bad examples of stable purchasing power.

## Segment 91
Stablecoins aim to keep purchasing power relatively steady.

## Segment 92
If that is the only thing you remember, you are already ahead.

## Segment 93
Now, why do we care about stablecoins? Because money matters.

## Segment 94
Not in a greedy way, but in the practical way that everyday life depends on it.

## Segment 95
In society, we need low volatility money to do three things well.

## Segment 96
In web3, we need a crypto version of the same thing.

## Segment 97
The three functions of money are store of value, unit of account, and medium of exchange.

## Segment 98
Store of value means you can keep wealth over time. A bank account, stocks, and crypto are all examples.

## Segment 99
Apples are a bad store of value because they rot.

## Segment 100
Unit of account means we price things in a consistent way.

## Segment 101
We price groceries in dollars. Pricing in Bitcoin would be chaotic because it fluctuates so much.

## Segment 102
Medium of exchange means we use money to trade with each other.

## Segment 103
Buying groceries with dollars is easy. Buying groceries with car tires is not.

## Segment 104
For everyday life to work, money needs to serve all three roles.

## Segment 105
In web3, we need a decentralized money that can do the same.

## Segment 106
We need to price things without wild swings, store wealth safely, and trade smoothly.

## Segment 107
Ethereum is a strong store of value and a great medium of exchange.

## Segment 108
But it is not a great unit of account yet, because its purchasing power still moves around too much.

## Segment 109
Maybe in the future, as Ethereum adoption grows, it becomes stable enough on its own.

## Segment 110
If that happens, we might not need stablecoins.

## Segment 111
But today, it is still too volatile for everyday pricing.

## Segment 112
I still call Ethereum ultrasound money because I think it is a fantastic store of value.

## Segment 113
That is a conversation for another time.

## Segment 114
Thanks for watching. If you are enjoying the content, please like and subscribe.

## Segment 115
We are just getting started.
