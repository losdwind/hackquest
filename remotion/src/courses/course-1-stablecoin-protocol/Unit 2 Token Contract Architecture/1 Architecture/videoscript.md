# 1 Architecture

> Setting up the project structure and defining the architecture: DSC token + DSCEngine separation.

| Timestamp | Content |
| :--- | :--- |
| 00:00:00,000 | time |
| 00:00:04,260 | all right we have now learned a ton |
| 00:00:06,660 | about defy and hopefully I piqued your |
| 00:00:09,120 | Curiosity on how much more there is |
| 00:00:11,340 | still to learn but now we're going to |
| 00:00:13,199 | move on to creating our own stable coin |
| 00:00:16,320 | here so again you can follow along with |
| 00:00:18,539 | all the code that we're we're going to |
| 00:00:20,459 | be going over in this Foundry D5 |
| 00:00:22,500 | stablecoin f23 section of this course |
| 00:00:24,600 | and like I said I'm planning on getting |
| 00:00:26,699 | this code actually audited so be sure if |
| 00:00:29,640 | you have your GitHub repo be sure to |
| 00:00:31,199 | watch this repo and look for updates |
| 00:00:33,000 | because I will be posting the audit |
| 00:00:34,620 | reports in this as well I've got a |
| 00:00:36,480 | couple videos on what smart contract |
| 00:00:37,919 | audits are and why they're so important |
| 00:00:39,720 | and I'll leave a couple links in the |
| 00:00:41,459 | GitHub repo associate with this course |
| 00:00:42,720 | for those of you looking to go down the |
| 00:00:44,760 | security track definitely be sure to |
| 00:00:46,320 | watch this video but all right we are |
| 00:00:48,780 | finally in our GitHub repo let's build |
| 00:00:52,559 | this stable coin mkdir boundary D5 |
| 00:00:57,179 | stablecoin f23 let's open this up with |
| 00:01:01,260 | code or you know the drill file open |
| 00:01:03,419 | folder we're going to be going a little |
| 00:01:05,519 | faster this lesson because a lot of what |
| 00:01:07,620 | we're doing |
| 00:01:08,579 | is just going to be drilling in |
| 00:01:10,019 | information that you already know we |
| 00:01:12,179 | have a couple of new things to go over |
| 00:01:13,620 | such as stateless fuzzing which we'll |
| 00:01:15,780 | talk about in a bit but a lot of the |
| 00:01:17,760 | coding aspect of this you already know |
| 00:01:20,459 | all right we're in our folder originate |
| 00:01:24,179 | clear |
| 00:01:25,500 | let's make a little readme over here |
| 00:01:28,199 | and talk about the design of our |
| 00:01:30,179 | protocol |
| 00:01:31,140 | so we're going to make a stable coin but |
| 00:01:34,140 | if you watch that stablecoin video we're |
| 00:01:35,939 | going to make a stable coin that is one |
| 00:01:38,220 | anchored so when we're talking about the |
| 00:01:41,160 | relative stability |
| 00:01:42,900 | to be anchored or pegged to the US |
| 00:01:46,380 | dollar |
| 00:01:47,340 | so this means we're going to have to put |
| 00:01:48,720 | some code in here to make sure that our |
| 00:01:51,840 | stablecoin is always worth one dollar |
| 00:01:54,659 | number two the stability |
| 00:01:57,360 | stability mechanism or the way we do |
| 00:02:00,000 | minting is going to be |
| 00:02:02,720 | algorithmic this means that this is |
| 00:02:05,159 | going to be a decentralized stable coin |
| 00:02:07,079 | there's not going to be any centralized |
| 00:02:08,640 | entity that's going to Mentor burn or |
| 00:02:11,939 | maintain the price this is going to be |
| 00:02:13,800 | 100 percent on chain in algorithmic |
| 00:02:16,980 | which is ideally what we have for the |
| 00:02:20,699 | future of stable coins there's no |
| 00:02:22,320 | controlling entity that controls our |
| 00:02:24,000 | stable coin so this is great A Better |
| 00:02:26,100 | stable coin for web 3 probably is an |
| 00:02:28,199 | anchored or pegged it's probably |
| 00:02:29,760 | floating |
| 00:02:31,079 | but that's a much harder mechanism to do |
| 00:02:33,419 | so we're going to go ahead with the |
| 00:02:34,860 | anchor to Peg for the moment and then |
| 00:02:36,959 | finally the collateral type is going to |
| 00:02:40,320 | be you guessed it exogenous |
| 00:02:43,140 | and it's going to be crypto collateral |
| 00:02:44,820 | we're going to use cryptocurrencies as |
| 00:02:46,620 | collateral for this currency we're going |
| 00:02:49,320 | to use |
| 00:02:50,280 | ethereum and Bitcoin as the collateral |
| 00:02:52,860 | for our system here so with this being |
| 00:02:56,159 | our architecture we're going to keep |
| 00:02:58,260 | this in mind okay how can we actually |
| 00:03:00,360 | make sure that this is always pegged to |
| 00:03:04,019 | a dollar and one way we can do this is |
| 00:03:05,699 | with a chain link price feed |
| 00:03:07,980 | so with a chain link price feed we get |
| 00:03:10,019 | the price feed |
| 00:03:11,340 | and we set a function to exchange eth |
| 00:03:15,959 | and Bitcoin or whatever their dollar |
| 00:03:19,320 | equivalent is and this way if right in |
| 00:03:22,439 | our contract we have this exchange set |
| 00:03:24,659 | up the price of this stable coin should |
| 00:03:27,419 | hypothetically always be around a dollar |
| 00:03:30,120 | to make the stability mechanism |
| 00:03:31,679 | algorithmic we're going to say people |
| 00:03:34,380 | can only mint the stablecoin with enough |
| 00:03:38,820 | collateral and that's going to be ODed |
| 00:03:42,419 | directly into our protocol and the |
| 00:03:44,519 | collateral type being exogenous of |
| 00:03:46,380 | course we're only going to allow these |
| 00:03:48,000 | two types of cryptocurrencies to be |
| 00:03:49,860 | deposited specifically we're going to |
| 00:03:51,900 | use raft eth and wrapped Bitcoin so the |
| 00:03:54,419 | erc20 version of eth and the erc20 |
| 00:03:56,579 | version of Bitcoin |
| 00:03:58,140 | some might argue that this wrapped |
| 00:04:00,720 | Bitcoin is a little bit centralized |
| 00:04:02,640 | depending on who is onboarding the |
| 00:04:04,679 | Bitcoin into ethereum but that's another |
| 00:04:06,720 | conversation |
| 00:04:07,919 | so over collateralized stablecoin with |
| 00:04:10,620 | weft and Bitcoin as the collateral for |
| 00:04:13,140 | this let's do this |
| 00:04:15,720 | so the first thing we're going to do is |
| 00:04:17,579 | we're going to well we're gonna get rid |
| 00:04:18,840 | of all these goodbye goodbye goodbye |
| 00:04:21,539 | delete |
| 00:04:23,039 | and now we're going to create our two |
| 00:04:24,720 | main contracts new file d e centralized |
| 00:04:30,260 | ablecoin do a capital c dot Sol and this |
| 00:04:34,980 | is just going to be the actual token so |
| 00:04:37,919 | I'm actually going to copy paste my |
| 00:04:40,320 | layout of functions because I like them |
| 00:04:42,600 | I like to have this |
| 00:04:44,400 | and at the top of course spdx |
| 00:04:47,520 | license |
| 00:04:48,620 | identifier and my team if you want you |
| 00:04:51,360 | can just copy this directly from GitHub |
| 00:04:53,760 | repo associated with this course SRC |
| 00:04:57,000 | in here copy this layout here I like to |
| 00:04:59,520 | have it as a reference then you already |
| 00:05:01,439 | know pragma solidity |
| 00:05:04,820 | 0.8.18 and we'll do contract |
| 00:05:07,679 | decentralized |
| 00:05:10,199 | stable |
| 00:05:11,760 | coin Boom Like This and now this is |
| 00:05:15,000 | going to be one of the main differences |
| 00:05:16,380 | between this code we're writing here and |
| 00:05:18,480 | all the other products that we've done |
| 00:05:19,740 | we're going to be very verbose with our |
| 00:05:22,919 | code documentation and the reason for |
| 00:05:25,439 | this is is when it comes to Security |
| 00:05:27,900 | Professionals who are going to review |
| 00:05:29,340 | this code we're going to make their |
| 00:05:31,320 | lives so much easier if we have a ton of |
| 00:05:34,320 | text explaining what our code is doing |
| 00:05:36,620 | additionally if you work with AIS AIS |
| 00:05:39,480 | are fantastic at reading and |
| 00:05:41,400 | understanding language so the more |
| 00:05:43,439 | language that we have to explain what |
| 00:05:45,300 | our code should do the better off |
| 00:05:47,760 | our code can be sent through some AI |
| 00:05:50,579 | model to make sure that it doesn't have |
| 00:05:52,860 | issues so we're going to go ahead |
| 00:05:55,800 | add a little bit of nats back here right |
| 00:05:58,199 | from the get-go at title decentra |
| 00:06:01,980 | like stablecoin all one word at author |
| 00:06:06,240 | Patrick Collins or put your name here |
| 00:06:08,340 | Yep this is open source MIT license you |
| 00:06:10,800 | could do whatever the heck you want with |
| 00:06:12,179 | it leaving a say collateral |
| 00:06:14,600 | exogenous eth and BTC minting or the |
| 00:06:19,020 | stability mechanism is going to be |
| 00:06:22,820 | algorithmic meaning it's decentralized |
| 00:06:25,559 | relative stability is going to be pegged |
| 00:06:29,039 | to USD then I'm going to say under here |
| 00:06:32,100 | this is the contract |
| 00:06:35,459 | meant to be governed by DSC engine |
| 00:06:41,220 | this contract |
| 00:06:42,780 | is just the I'm going to toggle word |
| 00:06:45,900 | wrap here erc20 implementation of our |
| 00:06:51,059 | stable |
| 00:06:52,199 | coin system so that's what this is going |
| 00:06:54,840 | to be this decentralized stablecoin is |
| 00:06:57,000 | purely going to be an erc20 with minting |
| 00:07:00,300 | and burning and stuff right it's not |
| 00:07:02,220 | going to be it's not going to have any |
| 00:07:04,320 | of the logic the logic is going to be in |
| 00:07:06,120 | a separate contract |
| 00:07:07,559 | so let's go ahead and let's make this |
| 00:07:09,959 | so first Constructor |
| 00:07:12,000 | boom and we're going to use open |
| 00:07:14,100 | Zeppelin to get this kick started so |
| 00:07:16,919 | right at the top import well actually |
| 00:07:19,559 | before we even do that Forge install |
| 00:07:22,100 | open Zeppelin slash open Zeppelin Dash |
| 00:07:26,459 | contracts dash dash no dash commit and |
| 00:07:30,360 | we go ahead we went ahead and installed |
| 00:07:31,679 | that now we're going to open up our |
| 00:07:33,740 | foundry.tamil we're going to add some |
| 00:07:36,120 | remappings in here so re mappings equals |
| 00:07:39,600 | at open Zeppelin |
| 00:07:42,240 | slash contracts equals lib slash open |
| 00:07:45,780 | Zeppelin |
| 00:07:47,220 | slash contracts slash contracts |
| 00:07:50,640 | that looks pretty good |
| 00:07:52,079 | right up at the top of this now |
| 00:07:54,480 | import named import erc20 we're going to |
| 00:07:58,740 | import this erc20 burnable contract I'll |
| 00:08:01,260 | explain this in a second and then also |
| 00:08:02,760 | erc20 from at open Zeppelin slash |
| 00:08:06,059 | contracts slash token slash erc20 |
| 00:08:09,000 | extensions |
| 00:08:11,280 | slash erc20 burnable.soul |
| 00:08:14,760 | did I spell this right |
| 00:08:16,620 | looks like that's right so what did I oh |
| 00:08:18,840 | oops looks like I spelled contracts |
| 00:08:20,459 | wrong let's spell it right okay cool |
| 00:08:22,140 | that looks good now what we're going to |
| 00:08:24,000 | say is that our decentralized stable |
| 00:08:26,520 | coin let me even zoom out a little bit |
| 00:08:28,079 | Yep this is going to be a big one so |
| 00:08:30,240 | we're going to zoom out a little bit |
| 00:08:31,199 | here hopefully you all could see this is |
| 00:08:33,740 | erc20 burnable okay and the reason that |
| 00:08:37,320 | we're going to use this contract if we |
| 00:08:38,760 | command click in it or just look it up |
| 00:08:40,559 | is it has this burn function and we want |
| 00:08:43,740 | this burn function because this is going |
| 00:08:45,240 | to help us maintain the peg price we're |
| 00:08:47,400 | going to be burning a lot of these |
| 00:08:48,840 | tokens you'll understand that in a bit |
| 00:08:50,579 | now same as an erc20 so the erc20 |
| 00:08:53,820 | burnable contract is in erc20 which is |
| 00:08:58,020 | why we can import the erc20 contract |
| 00:09:00,240 | from it as well and the erc20 burnable |
| 00:09:02,520 | Constructor is an erc20 which means we |
| 00:09:05,159 | have to use the erc20 Constructor as |
| 00:09:08,640 | well which takes a name where we're |
| 00:09:10,800 | going to call ours decentralized |
| 00:09:13,340 | stablecoin and DSC like this and that's |
| 00:09:17,640 | it this is going to be our whole |
| 00:09:18,780 | Constructor we're not going to touch it |
| 00:09:20,159 | that's all we're going to do let me zoom |
| 00:09:22,199 | in a little bit I'm going to keep |
| 00:09:23,459 | zooming in and out hopefully it's not |
