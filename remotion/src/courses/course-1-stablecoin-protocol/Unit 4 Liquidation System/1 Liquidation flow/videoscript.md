# 1 Liquidation flow

> Implementing the liquidate function: checking health factor < 1, computing debt with 10% bonus.

| Timestamp | Content |
| :--- | :--- |
| 00:00:00,000 | haven't really talked about too much but |
| 00:00:01,620 | this decentralized stablecoin |
| 00:00:03,719 | like I said it's ownable but it needs to |
| 00:00:06,120 | be owned by the engine so this ownable |
| 00:00:08,460 | actually has a transfer ownership |
| 00:00:11,520 | function and we're going to call that to |
| 00:00:13,920 | transfer ownership to the engine so |
| 00:00:16,560 | we'll go back to our deploy here oh |
| 00:00:18,298 | sorry this isn't DSC |
| 00:00:20,298 | address DSC so then we're going to call |
| 00:00:24,560 | DSC dot transfer ownership to the |
| 00:00:29,699 | address DSC engine now only the engine |
| 00:00:33,840 | oops engine excuse me only the engine |
| 00:00:37,320 | can do anything with it |
| 00:00:38,940 | and then we're going to return all these |
| 00:00:40,380 | return |
| 00:00:41,940 | DSC and engine nice oh and the deployer |
| 00:00:46,140 | key is going to go here |
| 00:00:51,120 | Okay cool so the reason we did all this |
| 00:00:53,219 | was because I wanted to write my unit |
| 00:00:55,320 | tests using actual deploy scripts |
| 00:00:57,239 | because I prefer to do that but like I |
| 00:00:59,460 | said it might be a good idea for you to |
| 00:01:01,080 | write unit tests before you write your |
| 00:01:02,340 | deploy Scripts |
| 00:01:03,840 | and then integration tests with your |
| 00:01:05,460 | deploy scripts but in any case let's go |
| 00:01:08,159 | ahead and finally create a test in here |
| 00:01:10,520 | DSC engine test.t.sol |
| 00:01:14,699 | and remember the whole reason we're |
| 00:01:15,779 | doing all this I know we've been coding |
| 00:01:17,580 | a lot is in the DSC engine we added a |
| 00:01:21,239 | ton of functions in here some of them |
| 00:01:23,039 | like get USD value which we definitely |
| 00:01:24,840 | want to check get collateral account |
| 00:01:26,699 | value we want to make sure minting Works |
| 00:01:28,980 | our Constructor Works depositing Works |
| 00:01:31,320 | Etc so we're just kind of testing as we |
| 00:01:33,600 | go along which like I said when I'm |
| 00:01:35,699 | actually coding this I did write tests |
| 00:01:37,920 | and I did write deploy scripts because I |
| 00:01:40,980 | did want to test as I was going right I |
| 00:01:43,140 | didn't want to have to go back and |
| 00:01:45,179 | refactor and rewrite my code if I made |
| 00:01:47,880 | some glaring mistake right it's really |
| 00:01:49,560 | good to test while you're building as |
| 00:01:51,600 | well and to be honest I feel like it |
| 00:01:53,520 | makes me go faster because I have more |
| 00:01:55,020 | confidence that what I did was correct |
| 00:01:57,360 | while I'm coding so spdx |
| 00:02:00,659 | license |
| 00:02:02,539 | identifier MIT pragma solidity |
| 00:02:07,880 | 0.8.18 a little carrot here contract |
| 00:02:12,440 | DSC engine test is test |
| 00:02:16,920 | import test from Forge STD slash test |
| 00:02:22,080 | that's all like this all right cool |
| 00:02:25,679 | function |
| 00:02:27,480 | setup |
| 00:02:28,980 | public or external we need to deploy to |
| 00:02:33,060 | deploy our contracts or we're going to |
| 00:02:35,940 | import |
| 00:02:36,960 | deploy DSC from dot slash dot slash |
| 00:02:41,520 | scripts slash deploy dsc.s that's all |
| 00:02:45,539 | deploy DSC deployer we're going to say |
| 00:02:49,798 | player equals new |
| 00:02:51,719 | deploy DSC like that again I'm using a |
| 00:02:54,298 | lot of tabs here |
| 00:02:55,739 | and we're going to say |
| 00:02:57,360 | we're going to need the import |
| 00:03:00,259 | decentralized stablecoin from dot dot |
| 00:03:03,779 | slash dot slash SRC slash |
| 00:03:07,340 | decentralizedablecoin.soul we're also |
| 00:03:08,940 | going to need to import the engine the |
| 00:03:11,039 | SCE from |
| 00:03:13,560 | again this is where GitHub copilot can |
| 00:03:15,600 | really make your life a lot easier just |
| 00:03:17,219 | being able to hit tab here or just |
| 00:03:19,679 | whatever AI that you're working with now |
| 00:03:22,080 | we're going to say BSC let's actually |
| 00:03:24,900 | make these we'll say decentralized |
| 00:03:27,239 | stablecoin DSC |
| 00:03:29,400 | and DSC engine |
| 00:03:31,620 | we'll call dsce |
| 00:03:34,620 | that's confusing you call this like |
| 00:03:36,360 | engine or something I'm going to call my |
| 00:03:38,159 | DSE so now our deploy returns DSC and |
| 00:03:43,679 | the engine |
| 00:03:44,640 | so I'm going to say return DSC dsce |
| 00:03:48,659 | equals deployer.run okay that looks |
| 00:03:51,659 | pretty good |
| 00:03:52,500 | there's a bunch of stuff more for us to |
| 00:03:54,420 | do but at least we have our tests set up |
| 00:03:56,279 | here it's one of the first tests that we |
| 00:03:58,620 | want to do is this price feed test right |
| 00:04:01,560 | we want to make sure this get USD value |
| 00:04:04,380 | this math that we're doing here because |
| 00:04:06,298 | we're doing some weird math stuff we |
| 00:04:07,860 | want to make sure this is actually |
| 00:04:09,000 | working correctly so I'm going to do I'm |
| 00:04:11,940 | going to set up a little price feeds |
| 00:04:13,259 | Test Section price tests like this we're |
| 00:04:17,759 | going to say function test get USD value |
| 00:04:24,960 | and here we're going to test our get USD |
| 00:04:27,840 | value function so it gets past the token |
| 00:04:29,699 | address and an amount so we're going to |
| 00:04:31,860 | need to get those tokens that we use to |
| 00:04:34,739 | deploy this |
| 00:04:35,940 | we can get that pretty easily from our |
| 00:04:38,039 | helper config so what we can do actually |
| 00:04:39,600 | back in our deploy we can also have this |
| 00:04:42,420 | return the config |
| 00:04:47,219 | and just at the bottom will also have a |
| 00:04:49,080 | return config |
| 00:04:51,900 | comma config |
| 00:04:53,699 | and config will be the helper config |
| 00:04:55,679 | helper config config import that |
| 00:05:00,239 | import helper config from dot dot script |
| 00:05:03,299 | double config.s dot so |
| 00:05:06,600 | okay cool and now we can get |
| 00:05:10,799 | the weft |
| 00:05:12,719 | address and we can also get the eqsd |
| 00:05:17,100 | so we'll put those up at the top two |
| 00:05:19,320 | we'll say |
| 00:05:20,759 | address eth USD price feed |
| 00:05:24,299 | and we'll say address |
| 00:05:26,460 | weft we'll get this from the health |
| 00:05:28,380 | helper config so those are the first two |
| 00:05:30,360 | so it's eth USD price feed bitcoin price |
| 00:05:34,380 | feed goes here so comma West comma this |
| 00:05:37,259 | is the Bitcoin token comma this deployer |
| 00:05:39,480 | key equals config Dot |
| 00:05:43,159 | Active network config cool we have the |
| 00:05:46,980 | price feed and we have West so now we |
| 00:05:49,020 | can finally go down here and set this |
| 00:05:51,000 | function up so we'll say you and 256 eth |
| 00:05:53,520 | amount equals let's say there's 15 eth |
| 00:05:57,060 | right 15 eighth if we have 15 eth |
| 00:06:01,980 | times up by two thousand dollars |
| 00:06:04,620 | or eth equals what thirty thousand |
| 00:06:08,400 | maybe thirty thousand e |
| 00:06:10,620 | 18 right real simple simple math so |
| 00:06:14,400 | let's do that un256 expected USD equals |
| 00:06:18,900 | three Thirty One Two Three thirty |
| 00:06:21,659 | thousand dollars |
| 00:06:22,980 | and we'll say you went to 256 actual USD |
| 00:06:26,580 | equals dsce dot get USD value weft and |
| 00:06:33,060 | eth mount and the reason this should |
| 00:06:35,759 | work is because in our engine we pass |
| 00:06:37,620 | the token and the amount and internally |
| 00:06:40,440 | it uses the price feed associated with |
| 00:06:42,960 | that token |
| 00:06:44,159 | calls the price to get the amount and |
| 00:06:47,100 | now we should be able to just do a |
| 00:06:48,480 | search |
| 00:06:49,199 | equals expected USD |
| 00:06:52,259 | and actual USD all right I know there's |
| 00:06:55,799 | a lot of setup just to write this one |
| 00:06:57,120 | test but like I said I like making sure |
| 00:06:58,920 | my deploy scripts are part of my test |
| 00:07:01,080 | Suite right from the beginning |
| 00:07:02,520 | but it might be a good idea to just do |
| 00:07:04,440 | them as integration tests so orange test |
| 00:07:07,440 | Dash m test get USD value |
| 00:07:11,940 | and it works now I will point out the |
| 00:07:14,759 | first couple of times that I ran this |
| 00:07:16,380 | test I actually failed miserably I got a |
| 00:07:19,739 | number of things wrong and that's okay |
| 00:07:21,179 | because you will and that's why you |
| 00:07:22,620 | write tests so I also while I'm here |
| 00:07:24,840 | let's also write at least one deposit |
| 00:07:27,480 | collateral test so let me copy this |
| 00:07:30,299 | paste it here because we're going to |
| 00:07:31,920 | write a lot of deposit collateral the |
| 00:07:34,679 | deposit equilateral |
| 00:07:37,320 | tests make it look a little bit pretty |
| 00:07:40,020 | at least that |
| 00:07:42,900 | we do some more simple tests like |
| 00:07:45,179 | function test revert reverts if |
| 00:07:48,659 | collateral |
| 00:07:50,520 | zero |
| 00:07:52,080 | public |
| 00:07:53,460 | uh we'll prank a user so up at the top |
| 00:07:56,580 | we'll do an address public user equals |
| 00:07:59,940 | make ADR user |
| 00:08:03,659 | like this like user capital |
| 00:08:08,000 | user |
| 00:08:09,840 | let's say VM dot start prank or user now |
| 00:08:15,539 | will at least approve the token can go |
| 00:08:19,080 | to the protocol so we'll do erc20 mock |
| 00:08:22,620 | Wes |
| 00:08:24,179 | do we have that imported nope we're |
| 00:08:26,279 | going to import that import erc20 mock |
| 00:08:29,400 | from |
| 00:08:31,020 | at open Zeppelin slash contracts |
| 00:08:34,440 | slash |
| 00:08:35,520 | what is it MOX slash or contracts mocks |
| 00:08:39,179 | erc20 mock okay here C20 mock.soul well |
| 00:08:43,679 | your C20 mock weft dot approve |
| 00:08:48,840 | address d s c e some amount let's do at |
| 00:08:54,540 | the top let's make another unit 56 |
| 00:08:57,779 | public constant amount |
| 00:09:01,699 | collateral equals |
| 00:09:04,980 | say 10 ether worth of collateral |
| 00:09:08,580 | down here we'll approve that 10 |
| 00:09:11,040 | collateral and then we'll do |
| 00:09:14,179 | vm.expect |
| 00:09:15,900 | revert |
| 00:09:17,340 | with DSC engine |
| 00:09:19,400 | dot we're going to need to use that |
| 00:09:21,840 | needs more than zero in here needs more |
| 00:09:24,540 | than zero |
| 00:09:26,159 | dot selector and now you guys know what |
| 00:09:28,380 | the selector bit means |
| 00:09:29,960 | dsce dot deposit colat collateral |
| 00:09:35,640 | say wet zero like this and then vm.stop |
| 00:09:40,440 | Rank and actually this might fail for a |
| 00:09:43,199 | different reason but let's go ahead and |
| 00:09:44,759 | try a Forge test Dash m |
| 00:09:50,279 | M okay cool and this actually did pass |
| 00:09:52,259 | now if we want to make this a little bit |
| 00:09:54,120 | better of a test we should also mint our |
| 00:09:57,120 | user some weth and we probably should do |
| 00:10:00,540 | that right in the setup so we don't have |
| 00:10:01,860 | to do that for every single test |
| 00:10:04,020 | what I'm going to do |
| 00:10:05,880 | is I'm going to do erc20 mock with dot |
| 00:10:10,259 | mint user we're going to do a 2 into 256 |
| 00:10:14,820 | we'll let constant |
| 00:10:17,040 | starting here see 20. |
| 00:10:20,520 | balance |
| 00:10:22,140 | balance |
| 00:10:23,580 | equals |
| 00:10:25,500 | and let's say this is 10 ether as well |
| 00:10:27,299 | and ether starting here 620 balance |
| 00:10:30,900 | boom all right cool so now Forge test |
| 00:10:34,739 | all of our tests are passing cool and |
| 00:10:37,500 | like I said I'll do this kind of as a |
| 00:10:39,000 | sanity check to make sure that my |
| 00:10:40,980 | architecture is even making sense right |
| 00:10:43,259 | so we what we probably also want to do |
| 00:10:45,779 | next then is have a test for collateral |
| 00:10:49,020 | is being deposited in these data |
| 00:10:50,759 | structures but for now I'm content with |
| 00:10:53,219 | these tests so I'm just going to go back |
| 00:10:55,080 | to writing my contracts like I said |
| 00:10:58,139 | there's no one single process and I |
| 00:11:00,480 | don't think I've ever written a smart |
| 00:11:03,299 | contract completely in one go I'm pretty |
| 00:11:05,699 | much always writing tests as I'm writing |
| 00:11:08,040 | the code so it is a really good idea to |
| 00:11:10,440 | to do this yes you do not have to write |
| 00:11:12,840 | the deploy script as you're writing a |
| 00:11:15,060 | code but it's something that I like to |
| 00:11:16,199 | do and then you know what while we're |
| 00:11:18,060 | writing these tests let's also do dash |
| 00:11:20,699 | dash Fork URL so polia RPC URL let's |
| 00:11:26,100 | also do this |
| 00:11:27,360 | because this probably will fail actually |
| 00:11:30,299 | because we can't just mint weth at a |
| 00:11:33,840 | thin air and we do indeed fail test get |
| 00:11:36,239 | USD value oh interesting that's the one |
| 00:11:38,040 | that fails test kit USD value ah this |
| 00:11:40,860 | one fails because we're hard coding the |
| 00:11:43,799 | expected USD right here |
| 00:11:46,139 | and of course the price on sepolia is |
| 00:11:48,600 | the actual price as opposed to kind of |
| 00:11:50,400 | this fake price that we're making up so |
| 00:11:52,440 | we should probably update this test to |
| 00:11:54,600 | make it more agnostic right we probably |
| 00:11:57,659 | should update this test so that instead |
| 00:11:58,980 | of just hard coding 3000 in here |
| 00:12:01,139 | update this test to use the price of the |
| 00:12:03,060 | actual price feed for now I'm going to |
| 00:12:04,980 | leave it as is and then I can fix it |
| 00:12:06,600 | later for running those Fork tests |
| 00:12:11,940 | so where are we now okay so we have a |
| 00:12:14,520 | way to deposit collateral we have a way |
| 00:12:16,920 | to Mint we don't really have too many |
| 00:12:19,020 | tests here we're just assuming that this |
| 00:12:21,060 | kind of works for now which is okay but |
| 00:12:23,460 | this is good right we're getting |
| 00:12:24,900 | somewhere |
| 00:12:25,980 | so we can mint our debt or our DSC |
| 00:12:30,000 | we can actually now we can get a whole |
| 00:12:32,100 | lot of information as well which is |
| 00:12:33,719 | awesome let's now combine these two into |
| 00:12:37,199 | kind of this main function that we're |
| 00:12:38,699 | thinking a lot of people are going to |
| 00:12:39,900 | call this deposit collateral in mint USD |
| 00:12:44,040 | right the purpose of this protocol is to |
| 00:12:46,500 | Mint this stable corn right deposit |
| 00:12:49,020 | collateral and mint DSC which is just |
| 00:12:51,060 | going to be the combination of deposit |
| 00:12:53,040 | collateral and DSC so in here what this |
| 00:12:56,639 | this is going to take it's going to take |
| 00:12:58,080 | similar stuff to |
| 00:13:00,000 | deposit collateral and address |
| 00:13:02,520 | token collateral address |
| 00:13:06,540 | a u into 256 amount collateral and then |
| 00:13:10,380 | also a unit 56 amount DSC to Mint |
| 00:13:15,659 | right that and here we're just going to |
| 00:13:18,060 | call so deposit collateral is external |
| 00:13:20,639 | right now we'll make this a public |
| 00:13:22,620 | function |
| 00:13:23,880 | so we'll change this to deposit |
| 00:13:26,759 | collateral |
| 00:13:28,860 | or we give it the token collateral |
| 00:13:31,500 | address and the amount collateral |
| 00:13:34,139 | and then we'll call Mint DSC amount |
| 00:13:37,679 | dsedament boom so that's all this |
| 00:13:40,139 | function does is just combines the two |
| 00:13:41,759 | of them emit DSC mints DSC is not |
| 00:13:46,080 | defined because it's external we'll make |
| 00:13:48,480 | this public as well so that our contract |
| 00:13:51,480 | can also call it toggle word wrap put |
| 00:13:53,340 | that back on okay and cool so this is |
| 00:13:55,320 | going to be one of our main functions |
| 00:13:56,699 | we're thinking so let's add some net |
| 00:13:58,739 | spec to it we'll say at param this is |
| 00:14:02,639 | where your copilot is really helpful |
| 00:14:05,100 | token collateral address the address of |
| 00:14:06,900 | the token to deposit as collateral at |
| 00:14:09,179 | param amount collateral yep at param |
| 00:14:12,239 | that looks good too and then we'll add |
| 00:14:14,639 | notice this function will deposit your |
| 00:14:19,139 | collateral |
| 00:14:20,520 | and mint DSC in one trends |
| 00:14:24,960 | action |
| 00:14:26,340 | right because otherwise we're gonna have |
| 00:14:27,840 | to have people call the positive |
| 00:14:29,279 | collateral and then mint but some people |
| 00:14:31,320 | they're probably just going to want to |
| 00:14:32,278 | do both at the same time because that's |
| 00:14:34,380 | kind of the purpose of this protocol |
| 00:14:39,359 | okay great so we have a way for people |
| 00:14:41,340 | to get money in how do they get their |
| 00:14:43,800 | money out so we're gonna need to write |
| 00:14:45,720 | this redeem collateral right so in order |
| 00:14:48,720 | for them to redeem collateral let's talk |
| 00:14:50,698 | about this in order to redeem collateral |
| 00:14:55,380 | they need what one |
| 00:14:57,480 | their health Factor |
| 00:15:00,060 | must be over one after |
| 00:15:03,320 | collateral pulled so we're going to want |
| 00:15:05,999 | to put some checks in here to make sure |
| 00:15:07,380 | that they have enough money in here and |
| 00:15:09,480 | that's kind of the main thing right |
| 00:15:11,159 | that's all we really need to worry about |
| 00:15:12,600 | so let's go ahead and start writing this |
| 00:15:15,958 | so first we should let them choose which |
| 00:15:18,300 | collateral they want so address |
| 00:15:20,519 | token collateral address |
| 00:15:23,760 | and then obviously the amount amount |
| 00:15:26,458 | collateral |
| 00:15:27,778 | and we're going to want to add this more |
| 00:15:29,820 | than zero modifier in here for the |
| 00:15:32,340 | amount collateral we don't want them to |
| 00:15:33,840 | be sending accidental zero transactions |
| 00:15:36,198 | and because we're going to be moving |
| 00:15:39,118 | tokens around we'll just do |
| 00:15:40,560 | non-reentrant better safe than sorry we |
| 00:15:43,019 | can figure out later in kind of like a |
| 00:15:44,579 | gas audit if this is even needed now I'm |
| 00:15:47,038 | going to write this function as if |
| 00:15:48,778 | somebody redeeming collateral is the |
| 00:15:50,880 | only time they actually redeem |
| 00:15:52,079 | collateral however we're going to |
| 00:15:53,880 | refactor this in the future to make our |
| 00:15:56,278 | code much more modular there's this |
| 00:15:59,159 | concept in computer science called dry |
| 00:16:01,140 | don't repeat yourself if you find |
| 00:16:04,800 | yourself coding the same thing that |
| 00:16:06,300 | should send off a light bulb in your |
| 00:16:07,560 | head going oh maybe what I'm doing isn't |
| 00:16:09,778 | the best practice |
| 00:16:11,038 | so we're going to code this one way and |
| 00:16:13,560 | then |
| 00:16:14,340 | I'm telling you right now we're going to |
| 00:16:15,720 | go back and we're going to refactor this |
| 00:16:17,159 | in the future but I want to code it this |
| 00:16:19,320 | one way first just to show you the |
| 00:16:22,260 | process that you'll probably go through |
| 00:16:23,519 | and how you'll probably refactor it when |
| 00:16:25,560 | you come across this yourself |
| 00:16:27,359 | so we're going to code this one way now |
| 00:16:28,499 | let's do it we need to pull the |
| 00:16:30,480 | collateral out and we're going to update |
| 00:16:31,980 | our internal accounting so we have this |
| 00:16:33,659 | s underscore |
| 00:16:35,278 | collateral deposited of message.sender |
| 00:16:37,800 | of the token collateral address right |
| 00:16:41,340 | this is the our internal accounting how |
| 00:16:43,618 | much collateral they've added we're |
| 00:16:45,180 | going to do minus equals amount |
| 00:16:47,760 | collateral so this is assuming we're |
| 00:16:49,380 | going to pull it out if they try to pull |
| 00:16:51,480 | out more than what they have we're |
| 00:16:53,820 | relying on the solidity compiler a |
| 00:16:55,680 | little bit to throw an error right if in |
| 00:16:58,320 | their bounce they have a hundred and |
| 00:16:59,579 | they subtract try to pull out one |
| 00:17:01,439 | thousand right it'll revert because |
| 00:17:04,380 | as of newer versions of solidity they |
| 00:17:07,198 | don't let you do this unsafe math stuff |
| 00:17:09,239 | which is awesome that saved us a lot of |
| 00:17:11,640 | hassle so and then since we're updating |
| 00:17:14,100 | State we're going to Omit an event let's |
| 00:17:17,100 | call it collateral redeemed |
| 00:17:20,640 | we'll say it's message.sender so from |
| 00:17:24,840 | this does sender the amount collateral |
| 00:17:28,698 | the token collateral address |
| 00:17:33,118 | like this |
| 00:17:34,499 | so we're going to go to the top |
| 00:17:36,480 | we're also going to refactor this event |
| 00:17:38,159 | but you'll understand why litter a Ben |
| 00:17:40,618 | collateral redeemed address indexed user |
| 00:17:44,340 | address indexed token |
| 00:17:48,239 | you went to 256 indexed amount like this |
| 00:17:52,740 | okay control minus go right back down to |
| 00:17:55,560 | where we were okay amount collateral oh |
| 00:17:58,199 | what's wrong with this oh these are |
| 00:18:00,120 | backwards |
| 00:18:05,038 | Okay cool so now |
| 00:18:07,499 | all we have to do is return the money |
| 00:18:10,740 | well how do we do this |
| 00:18:13,260 | so we want to follow CEI right checks |
| 00:18:17,038 | effects interactions checks affects |
| 00:18:19,560 | interactions but we also want to make |
| 00:18:22,800 | sure the health factor is good after |
| 00:18:24,359 | collateral collateral is pulled and this |
