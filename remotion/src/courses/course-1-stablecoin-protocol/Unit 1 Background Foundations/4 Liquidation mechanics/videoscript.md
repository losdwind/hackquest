# 4 Liquidation mechanics

> How MakerDAO's DAI works: minting, burning, stability fees, and liquidation game theory.

| Timestamp | Content |
| :--- | :--- |
| 00:00:00,000 | so many stable coins what are the |
| 00:00:01,681 | incentives for people to Mint them and |
| 00:00:03,601 | it may just blow your mind so let's |
| 00:00:05,221 | start with die as we've mentioned before |
| 00:00:06,900 | dye is a pegged algorithmic and |
| 00:00:09,841 | exogenously collateralized stablecoin |
| 00:00:11,760 | it's one of the most influential D5 |
| 00:00:13,201 | projects ever created and was a huge |
| 00:00:15,481 | factor in supercharging the D5 space |
| 00:00:17,640 | roughly the way it works is you deposit |
| 00:00:20,341 | eth or some other crypto collateral into |
| 00:00:22,380 | the smart contract that has this die |
| 00:00:24,780 | algorithm code and based off the current |
| 00:00:26,941 | collateral to US dollar or each US |
| 00:00:29,341 | dollar price it'll mint you some amount |
| 00:00:32,400 | of dye you can only mint less dye than |
| 00:00:36,121 | the total value of collateral or eat |
| 00:00:38,160 | that you have this way the system always |
| 00:00:40,321 | has more collateral than they'd have |
| 00:00:42,301 | minted dye additionally every year or so |
| 00:00:45,481 | it'll get charged something called a |
| 00:00:47,400 | stability fee usually around like two |
| 00:00:49,921 | percent and now you're free to do |
| 00:00:51,660 | whatever you want with your die if you |
| 00:00:53,400 | want to get your eat back you have to |
| 00:00:54,961 | give your die back to the smart contract |
| 00:00:56,701 | which which will then burn your die |
| 00:00:58,741 | it'll use the current price of e to |
| 00:01:01,020 | figure out how much money it should give |
| 00:01:02,760 | back to you it's because of this |
| 00:01:04,441 | stability fee and collateralized eth |
| 00:01:06,841 | that people often refer to this system |
| 00:01:08,701 | as a collateralized debt position since |
| 00:01:11,941 | we technically owe die back to the |
| 00:01:15,181 | protocol at some point so yes all the |
| 00:01:17,760 | dye that's in existence somebody minted |
| 00:01:20,280 | from the maker protocol and needs to pay |
| 00:01:23,160 | it back at some point if you can't pay |
| 00:01:25,741 | your stability fees or the price of each |
| 00:01:27,601 | tanks and now the value of our |
| 00:01:29,280 | collateral is less than the value of the |
| 00:01:31,140 | die that we minted people can liquidate |
| 00:01:33,601 | us which means they can take our |
| 00:01:35,640 | collateral protocol always needs to have |
| 00:01:37,681 | more collateral than men to die so this |
| 00:01:39,660 | is sort of your punishment for not |
| 00:01:41,101 | keeping the collateral up and a way to |
| 00:01:42,780 | save the system from becoming under |
| 00:01:44,821 | collateralized and then there's also a |
| 00:01:46,681 | maker token that's used to vote for |
| 00:01:48,000 | stuff now the reason I give this |
| 00:01:49,561 | overview is I want your brain to be |
| 00:01:51,541 | asking the question hey I get charged to |
| 00:01:54,361 | Mint a stablecoin all the dye in the |
| 00:01:56,640 | world somebody's being charged to have |
| 00:01:59,280 | it out there someone could take my |
| 00:02:01,861 | collateral if I don't monitor the |
| 00:02:03,541 | balance and most importantly why would I |
| 00:02:05,941 | spend money to Mint this stable Point |
| 00:02:08,160 | why would I be the one to do that great |
| 00:02:09,841 | question that is the fundamental |
| 00:02:11,581 | question and we'll get to that usdc usdc |
| 00:02:14,701 | is a classic pegged governed exogenously |
| 00:02:17,101 | collateralized stablecoin it's backed by |
| 00:02:18,841 | real world dollars in a bank account not |
| 00:02:20,641 | much else to say here USD and Luna the |
| 00:02:22,980 | classic old UST and Luna we know it |
| 00:02:25,621 | collapsed but we can learn from what |
| 00:02:27,421 | happened to hopefully prevent it in the |
| 00:02:29,519 | future UST was a stable coin pegged to |
| 00:02:31,681 | the dollar algorithmic and endogenous |
| 00:02:34,320 | and it imploded on itself usually what |
| 00:02:37,081 | we know about stable coins can you guess |
| 00:02:38,940 | why well since the system was endogenous |
| 00:02:41,280 | once UST lost its Peg Luna became less |
| 00:02:43,861 | attractive to hold since people weren't |
| 00:02:45,541 | holding Luna the price fell and it made |
| 00:02:47,700 | it harder to keep the peg of UST which |
| 00:02:49,740 | made Luna's price fall which makes USC |
| 00:02:52,019 | harder to hold its bag which makes you |
| 00:02:53,581 | see the pattern people still want to try |
| 00:02:55,381 | using these endogenously collateralized |
| 00:02:56,940 | stable coins because they do scale so |
| 00:02:58,921 | quickly so protocols like fracks have |
| 00:03:01,141 | come a long way to do some type of |
| 00:03:02,940 | hybrid between endogenous and |
| 00:03:04,561 | exogenously collateralized stablecoin |
| 00:03:06,421 | Rye Rye is one of the few floating |
| 00:03:08,881 | stable coins where it's not pegged to |
| 00:03:10,981 | any other asset it's focused on minimal |
| 00:03:12,780 | governance being floating and using only |
| 00:03:15,720 | ethereum as a type of collateral with a |
| 00:03:18,361 | nearly purely algorithmic stability |
| 00:03:20,700 | mechanism in a way one could argue that |
| 00:03:23,700 | because their collateral is only e the |
| 00:03:26,460 | price of Rye will always be somewhat |
| 00:03:28,861 | pegged to the price of eth but that |
| 00:03:31,381 | might be a longer argument due to these |
| 00:03:33,121 | it's floating algorithmic and |
| 00:03:35,041 | exogenously collateralized now they use |
| 00:03:36,960 | some really cool supply and demand |
| 00:03:38,401 | mechanisms to keep the price stable and |
| 00:03:40,320 | non-volatile but it's not really |
| 00:03:42,481 | important how it works for the purpose |
| 00:03:44,041 | of this video so once again I'm going to |
| 00:03:46,021 | leave some links in the description if |
| 00:03:47,881 | you want to learn more about Rye the |
| 00:03:49,741 | video on screen right now I think is |
| 00:03:51,601 | particularly good at explaining exactly |
| 00:03:53,881 | how it works and explaining why it's |
| 00:03:56,340 | such a good good stablecoin for normal |
| 00:03:58,440 | average people to have so now we've gone |
| 00:04:00,481 | over some stable coins we've gone over |
| 00:04:01,981 | the categories why we care what is a |
| 00:04:03,840 | stable coin let's talk about what they |
| 00:04:06,361 | really do we can start by asking the |
| 00:04:08,280 | question okay which one of these is the |
| 00:04:11,101 | best stable coin into that I need to ask |
| 00:04:13,861 | the best stable coin for who centralized |
| 00:04:17,340 | governed coins obviously have the issue |
| 00:04:19,320 | of centrality which sort of defeats the |
| 00:04:21,421 | purpose of being in web3 so maybe we |
| 00:04:23,641 | want some flavors of algorithmic stable |
| 00:04:25,440 | coins maybe that's probably what we want |
| 00:04:27,061 | for web3 but these algorithmic coins |
| 00:04:29,521 | might feel untested to non-crypto people |
| 00:04:31,861 | and the fees associated with them might |
| 00:04:33,661 | be a little bit scary for me personally |
| 00:04:35,641 | like I said I really love the idea of |
| 00:04:38,401 | Rye the idea is to have stable buying |
| 00:04:40,680 | power as opposed to being pegged to some |
| 00:04:42,601 | other asset and it's algorithm that came |
| 00:04:44,340 | nature as opposed to being centralized |
| 00:04:46,141 | so it's a decentralized stable coin |
| 00:04:47,940 | that's what we want but every coin has |
| 00:04:49,501 | their trade-offs and I'd argue there is |
| 00:04:51,121 | definitely no best coin right now the |
| 00:04:53,161 | stable coin that's best for the average |
| 00:04:55,141 | person might matter much less it's a |
| 00:04:58,081 | stable coin that's best for Rich whales |
| 00:05:00,300 | might be what's more important here yes |
| 00:05:02,521 | the stable coins the whales like might |
| 00:05:05,521 | be what's more important now for most |
| 00:05:07,621 | algorithmic stable coins you'll see this |
| 00:05:09,601 | some sort of fee associated with minting |
| 00:05:12,001 | the coins protocols do make money off of |
| 00:05:14,820 | these stablecoin systems which I think |
| 00:05:17,101 | is good sometimes they need money for |
| 00:05:18,901 | maintenance incentives for the stability |
| 00:05:20,820 | of the coin or money for improvements so |
| 00:05:23,340 | I do think these fees are good and we |
| 00:05:25,440 | need stable coins for the three |
| 00:05:26,881 | functions of money storage of value unit |
| 00:05:29,581 | of account and medium of exchange but |
| 00:05:32,220 | are you going to be the one to pay these |
| 00:05:35,581 | fees to Mint them and keep them in |
| 00:05:38,581 | circulation someone has to pay to Mint |
| 00:05:42,361 | these coins and often keep paying the |
| 00:05:45,840 | market cap for some of these stable |
| 00:05:47,280 | coins is in the billions if there is a |
| 00:05:49,981 | one percent fee on these and the market |
| 00:05:51,840 | cap is 1 billion we're talking about 10 |
| 00:05:55,141 | million dollars our average people |
| 00:05:56,881 | people going to collectively pay 10 |
| 00:05:58,861 | million dollars a year to keep these in |
| 00:06:01,081 | circulation no so average people aren't |
| 00:06:03,481 | printing these for the three functions |
| 00:06:04,921 | of money well then who is minting these |
| 00:06:07,320 | so let's play a little thought |
| 00:06:09,001 | experiment let's say I have eth as an |
| 00:06:11,041 | investment and I've bought up all the E5 |
| 00:06:13,561 | sold my house I've sold everything I own |
| 00:06:15,901 | and I've used everything I have to buy |
| 00:06:18,180 | ethereum but I want more what can I do I |
| 00:06:21,361 | can put my eth into one of these |
| 00:06:23,220 | stablecoin protocols get the minted |
| 00:06:25,741 | stable coin and then sell the stable |
| 00:06:28,200 | coin for more eth you might have heard |
| 00:06:30,601 | Concepts like Leverage investing or |
| 00:06:32,760 | margin trading and this is essentially |
| 00:06:34,861 | the web 3 equivalent it's kind of funny |
| 00:06:36,780 | why are stable coins good well because |
| 00:06:38,820 | we need those three functions of money |
| 00:06:40,320 | but why are stable coins minted well |
| 00:06:42,661 | because investors want to make leveraged |
| 00:06:44,820 | bets in fact most stable corn platforms |
| 00:06:47,521 | have this as one of the biggest reasons |
| 00:06:49,501 | to Mint their stablecoin to multiply |
| 00:06:51,840 | exposure or to maximize your position on |
| 00:06:54,960 | some crypto asset now for sophisticated |
| 00:06:56,820 | investors this isn't new information at |
| 00:06:59,220 | all this is like investing 101. however |
| 00:07:02,101 | it does feel weird that we need stable |
| 00:07:04,141 | coins for the three functions money but |
| 00:07:06,601 | that's not why they're minted so even |
| 00:07:08,820 | though I said I really like rye as a |
| 00:07:10,800 | stable coin for the people a reason die |
| 00:07:12,840 | might be higher market cap is that |
| 00:07:14,521 | investors like The Leverage opportunity |
| 00:07:16,381 | much more than they like the leverage |
| 00:07:18,840 | opportunity that rye offers it could be |
| 00:07:21,121 | something else but that might be a big |
| 00:07:23,041 | reason how much stable coins are minted |
| 00:07:25,141 | are based off of how much investors |
| 00:07:28,081 | think they can use that stable coin to |
| 00:07:30,720 | get more exposure to assets that they |
| 00:07:32,940 | really want so I know we've gone over a |
| 00:07:35,460 | lot here and the rabbit hole really |
| 00:07:37,320 | doesn't end there curve.finance being |
| 00:07:39,300 | one of the most important protocols for |
| 00:07:40,921 | stable coins is a really interesting |
| 00:07:42,720 | story as well my friend Garrett who |
| 00:07:44,641 | teaches about technology and finance has |
| 00:07:46,680 | a fantastic example as to why a |
| 00:07:48,481 | stablecoin exchange might be so |
| 00:07:49,741 | important you might wonder how a stable |
| 00:07:52,141 | coin exchange ever got off the ground is |
| 00:07:54,421 | there really any demand out there to |
| 00:07:55,921 | trade one dollar for one dollar then I |
| 00:07:57,960 | think back to my university days one |
| 00:07:59,881 | week in my laundry pile grew so |
| 00:08:01,741 | disgusting I was desperate to use the |
| 00:08:03,840 | washing machine immediately but the |
| 00:08:05,521 | laundry machine took quarters and I only |
| 00:08:07,621 | had dollar bills quarters were in such |
| 00:08:09,421 | short supply around the dorm room that I |
| 00:08:11,041 | was willing to pay more than one dollar |
| 00:08:12,601 | for four quarters in this urgent moment |
| 00:08:15,001 | I had specific utility in mind and that |
| 00:08:17,521 | changed my personal equation for this |
| 00:08:19,381 | and Ave and curve both looking to launch |
| 00:08:21,720 | their own stable coins soon is going to |
| 00:08:23,521 | be really interesting as well so we'll |
| 00:08:25,621 | just have to see how these unfold I do |
| 00:08:27,361 | think though that we are going to get |
| 00:08:29,161 | better and better at creating these |
| 00:08:30,840 | stable coins because we do need them |
| 00:08:32,820 | they are important and for you |
| 00:08:34,561 | developers watching who want to build |
| 00:08:36,300 | one of these we have some minimal stable |
| 00:08:38,280 | coin contract examples in our D5 minimal |
| 00:08:40,680 | repo Link in the description so if |
| 00:08:42,720 | you're looking to tackle this problem |
| 00:08:43,921 | definitely be sure to get started there |
| 00:08:45,840 | I'm really excited for the future of D5 |
| 00:08:48,061 | and for the future of stable coins as I |
| 00:08:50,340 | think they are a wildly important |
| 00:08:51,601 | primitive for D5 and I know that this |
| 00:08:54,421 | was a long video but I hope you all |
| 00:08:56,340 | learn learned something and I hope this |
| 00:08:58,320 | gives you a better idea of what stable |
| 00:09:00,960 | coins really are and how they're created |
| 00:09:04,021 | if you learned something leave a comment |
| 00:09:05,940 | in the comment section if you didn't |
| 00:09:07,621 | learn something leave a comment in the |
| 00:09:09,121 | comment section or if I got something |
| 00:09:10,440 | wrong leave a comment there thank you |
| 00:09:12,421 | all for watching and I'll see you next |
