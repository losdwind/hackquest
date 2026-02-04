# 2 Token implementation

> Implementing the DecentralizedStableCoin contract with ERC20Burnable and Ownable, mint/burn access control.

| Timestamp | Content |
| :--- | :--- |
| 00:00:00,000 | too crazy now we want this |
| 00:00:03,059 | coin to be 100 governed by our engine |
| 00:00:07,080 | and our engine is going to have all this |
| 00:00:09,780 | stuff about what collaterals to use how |
| 00:00:13,620 | to use it what to pega2 Etc this is |
| 00:00:16,260 | purely just going to be the token so |
| 00:00:18,539 | since we want this token to be 100 |
| 00:00:21,179 | controlled by our logic we're going to |
| 00:00:23,399 | make this ownable as well which means |
| 00:00:26,220 | we're going to have only owner modifiers |
| 00:00:28,139 | where the owner is going to be that |
| 00:00:29,760 | immutable logic we're going to create |
| 00:00:31,740 | so open Zeppelin has a package for that |
| 00:00:33,539 | too so we're going to do import ownable |
| 00:00:35,820 | from at open Zeppelin slash contracts |
| 00:00:39,000 | slash access |
| 00:00:41,240 | ownable.soul I'm going to copy this |
| 00:00:44,039 | so our contract is going to be erc20 |
| 00:00:45,899 | burnable and it's going to be ownable |
| 00:00:48,480 | and there's going to be two major |
| 00:00:50,820 | functions that we want our engine to own |
| 00:00:54,480 | those functions are going to be function |
| 00:00:56,700 | burn |
| 00:00:57,840 | where it takes in a un256 |
| 00:01:00,780 | underscore amount |
| 00:01:02,519 | public we're going to override the burn |
| 00:01:05,159 | function of burnable and this is going |
| 00:01:07,139 | to be only owner so that only the engine |
| 00:01:09,919 | only the logic that we give it can mint |
| 00:01:12,780 | and burn and we're going to say u in 256 |
| 00:01:15,200 | balance equals |
| 00:01:17,700 | bounce of message.sender |
| 00:01:21,240 | and we're going to make sure that |
| 00:01:23,460 | somebody when somebody tries to burn |
| 00:01:25,260 | some token they at least have that much |
| 00:01:26,760 | token so we're first of all going to say |
| 00:01:29,159 | if the amount is less than or equal to |
| 00:01:32,519 | zero then they can't burn right we don't |
| 00:01:35,460 | want people to try burning zero that's |
| 00:01:37,080 | silly so we're going to revert with an |
| 00:01:39,840 | error I'm going to put all of our errors |
| 00:01:41,939 | right up at the top here error |
| 00:01:44,159 | essentially stablecoin underscore |
| 00:01:46,320 | underscore must be more than zero like |
| 00:01:51,659 | this so we're going to revert with this |
| 00:01:53,519 | error and then we're also going to say |
| 00:01:55,320 | if |
| 00:01:56,340 | the user's balance is less than the |
| 00:01:58,800 | amount that they're trying to burn |
| 00:02:00,720 | then we're going to revert |
| 00:02:02,519 | with another custom error I'm just going |
| 00:02:04,439 | to copy paste |
| 00:02:05,760 | and I'm just going to say burn amount |
| 00:02:08,720 | exceeds balance |
| 00:02:11,399 | boom paste it in like this and then |
| 00:02:14,580 | finally we're going to do this thing |
| 00:02:15,419 | called super dot burn which we haven't |
| 00:02:17,280 | talked about yet so this super keyword |
| 00:02:19,919 | basically says hey |
| 00:02:22,200 | use the burn function from the parent |
| 00:02:25,320 | class which in this case is the erc20 |
| 00:02:27,840 | burnable so all this code is going to |
| 00:02:29,879 | run it's going to hit this line it's |
| 00:02:32,519 | going to say hey go to the Super class |
| 00:02:33,899 | and use the burn function there so our |
| 00:02:36,720 | code is going to go oh okay well erc20 |
| 00:02:38,460 | burnable that's the super class or the |
| 00:02:40,260 | parent class ah just use the burn |
| 00:02:42,240 | function in here which calls the burn |
| 00:02:44,340 | function here in the year see 20. sole |
| 00:02:47,039 | which does all this stuff in here so |
| 00:02:49,620 | that's what the super keyword does only |
| 00:02:51,899 | owner only engine is going to add this |
| 00:02:53,639 | now we're going to do this function mint |
| 00:02:56,280 | this is going to be an address too and a |
| 00:02:59,580 | uint 256 underscore amount |
| 00:03:03,000 | this is going to be public |
| 00:03:05,039 | excuse me this is actually going to be |
| 00:03:06,120 | external |
| 00:03:07,200 | also only owner this one probably could |
| 00:03:09,840 | be external as well |
| 00:03:11,519 | but that'll come out in the audit |
| 00:03:14,100 | external only owner |
| 00:03:16,080 | and this is actually going to return the |
| 00:03:18,539 | Boolean when you do mint you want to |
| 00:03:20,879 | have a return of Boolean here when you |
| 00:03:23,039 | do a mint we're going to return true if |
| 00:03:24,720 | it actually works |
| 00:03:25,980 | but we're going to say if |
| 00:03:27,659 | 2 equals equals address zero we're gonna |
| 00:03:30,720 | do a little sanitization of the inputs |
| 00:03:34,439 | here then we're going to revert revert |
| 00:03:37,439 | with a new error error |
| 00:03:40,139 | to Central stablecoin not zero address |
| 00:03:43,439 | we're not going to let people |
| 00:03:44,939 | accidentally mint to the zero address |
| 00:03:46,800 | because that happens kind of a lot and |
| 00:03:49,559 | we're going to say if the amount is less |
| 00:03:52,559 | than or equal to zero then we're also |
| 00:03:54,480 | going to revert with this more than zero |
| 00:03:58,860 | error here boom and then finally we're |
| 00:04:02,039 | going to return true oh and then |
| 00:04:04,080 | obviously we should run mint underscore |
| 00:04:07,439 | two comedy score amount so we're not |
| 00:04:10,320 | overriding any functions in here right |
| 00:04:12,539 | we're just calling the Min function over |
| 00:04:14,820 | here we had to do super because we're |
| 00:04:17,100 | overriding the burn function we're |
| 00:04:18,960 | saying hey do all this stuff and then do |
| 00:04:20,939 | the regular burn there is no mint |
| 00:04:22,980 | function there's an underscore mint |
| 00:04:24,600 | function that we're going to be calling |
| 00:04:25,919 | and guess what |
| 00:04:27,600 | that's it this contract's done we're not |
| 00:04:30,539 | doing any more here Forge build cool and |
| 00:04:34,439 | then we probably want to write some |
| 00:04:35,520 | tests for this write a deploy script but |
| 00:04:37,260 | we're going to do all that in a little |
| 00:04:38,340 | bit |
| 00:04:42,539 | now what we're going to do is we're |
| 00:04:45,059 | going to build the engine the engine to |
| 00:04:46,919 | the car the main components of this |
| 00:04:49,379 | contract you want to take a break and be |
| 00:04:51,600 | proud of yourself right here go for it |
| 00:04:53,639 | if you want to even pause the video |
| 00:04:55,200 | start writing some of your own tests |
| 00:04:56,520 | write your own deploy Scripts |
| 00:04:58,139 | go for it but let's go ahead and start |
| 00:05:01,740 | building this engine |
| 00:05:04,020 | and we're going to be building this a |
| 00:05:05,340 | little bit different than some of the |
| 00:05:06,419 | other projects we might even be testing |
| 00:05:08,639 | some of this along the way to make sure |
| 00:05:10,500 | we get things right so I'm going to go |
| 00:05:12,840 | ahead create a new file |
| 00:05:18,200 | centralized stablecoin engine and let's |
| 00:05:21,240 | build this engine to this car all right |
| 00:05:24,899 | let's go back to |
| 00:05:26,760 | let me grab I'm just going to copy paste |
| 00:05:29,100 | this beginning part let's come to the |
| 00:05:31,679 | engine paste that in we have spdx layout |
| 00:05:35,220 | of contracts pragma solidity contract |
| 00:05:38,899 | DSC engine |
| 00:05:41,760 | this |
| 00:05:42,780 | let's give this a lot of nat spec |
| 00:05:46,080 | all right title DSC engine I don't want |
| 00:05:48,960 | that at author ah or |
| 00:05:53,340 | Patrick Collins the system is designed |
| 00:05:57,539 | to be as minimal as possible |
| 00:06:01,200 | and have the tokens maintain a one |
| 00:06:06,059 | dollar |
| 00:06:07,020 | contain a one token equals equals one |
| 00:06:11,639 | dollar Peg let's toggle the word wrap |
| 00:06:14,159 | this stable coin has the properties |
| 00:06:22,740 | algorithmic stable it is similar to die |
| 00:06:26,760 | if die |
| 00:06:28,260 | had no governance no fees and was only |
| 00:06:32,399 | backed by wrapped eth and wrapped |
| 00:06:36,600 | Bitcoin at notice this contract is the |
| 00:06:40,320 | core of the DSC system it handles all |
| 00:06:46,620 | the logic or minting and redeeming ESC |
| 00:06:51,500 | as well as the positing |
| 00:06:55,020 | and drawing collateral notice this |
| 00:06:59,939 | contract is very Loosely based on die on |
| 00:07:06,480 | the maker Dow DSS die system you might |
| 00:07:11,939 | be asking Patrick that's a lot of text |
| 00:07:13,980 | here yes we want a lot of text when |
| 00:07:17,399 | people read our code our code should be |
| 00:07:19,679 | readable remember |
| 00:07:21,840 | your code is going to be written once |
| 00:07:24,240 | read hundreds of thousands of times I |
| 00:07:28,260 | have read the Ave and maker code so many |
| 00:07:32,039 | times and so many other people have as |
| 00:07:34,500 | well you want your code to be very |
| 00:07:36,659 | verbose so that other people can come |
| 00:07:38,580 | and understand what's going on so let's |
| 00:07:42,240 | begin |
| 00:07:43,439 | so let's think about what are the main |
| 00:07:45,419 | functions that our project should have |
| 00:07:48,059 | one of the main things that we should do |
| 00:07:49,800 | right before we start even start coding |
| 00:07:51,720 | anything and oftentimes a lot of people |
| 00:07:54,000 | will take this step and will actually |
| 00:07:55,800 | create an interface |
| 00:07:57,659 | or their code they'll create an |
| 00:07:59,700 | interface and say hey here's all the |
| 00:08:01,020 | functions that I want this to do and |
| 00:08:03,000 | then they'll say hey our contract is |
| 00:08:04,679 | that interface so that they don't forget |
| 00:08:06,419 | any of those functions for us I'm just |
| 00:08:09,000 | going to go ahead and write them out |
| 00:08:10,139 | here so I want one function to be |
| 00:08:12,300 | function |
| 00:08:13,220 | deposit lateral and mint DSC I want |
| 00:08:18,720 | people to be able to deposit their die |
| 00:08:20,520 | or their Bitcoin and mint our DSC token |
| 00:08:23,760 | I want people to redeem |
| 00:08:26,220 | they're collateral or DSC |
| 00:08:29,100 | right when people are done with doing |
| 00:08:31,559 | whatever they want with the stable coin |
| 00:08:33,119 | they can turn the stable coin to the D |
| 00:08:35,220 | the DSC decentralized stable coin back |
| 00:08:37,439 | in for whatever collateral they |
| 00:08:39,419 | originally used |
| 00:08:40,800 | I want people to be able to function |
| 00:08:43,439 | burn their DSC and the reason for this |
| 00:08:46,860 | is if they're nervous that they have too |
| 00:08:49,320 | much stablecoin and not enough |
| 00:08:50,520 | collateral and they want just a quick |
| 00:08:51,840 | way to have more collateral than DSC |
| 00:08:54,300 | they can quickly burn stuff which is |
| 00:08:57,240 | another part of the system |
| 00:08:58,980 | we should even put a point in here our |
| 00:09:01,560 | DSC should |
| 00:09:04,020 | or DSC system should always be over |
| 00:09:08,879 | collateralized |
| 00:09:10,980 | at no point should the value |
| 00:09:14,280 | of all collateral be less than or equal |
| 00:09:18,240 | to the value of all the DSC or the |
| 00:09:22,980 | dollar backed value of all the DSC we |
| 00:09:26,820 | should always have more collateral than |
| 00:09:29,340 | DSC in the system at all times and we |
| 00:09:31,500 | need to code in such a way so burn DSC |
| 00:09:34,679 | is a function that will make more sense |
| 00:09:37,080 | in a little bit we should have a |
| 00:09:39,060 | function |
| 00:09:40,080 | called liquidate and this is going to be |
| 00:09:42,659 | a really important function the reason |
| 00:09:45,179 | that we're always going to have more |
| 00:09:47,280 | collateral if the value of their |
| 00:09:49,200 | collateral drops too much let's say |
| 00:09:51,540 | let's say I put in 100 worth of eth and |
| 00:09:55,020 | I minted fifty dollars worth of DSC I |
| 00:09:59,040 | have more collateral than DSC that's |
| 00:10:01,080 | good what if the eth price tanks to |
| 00:10:05,760 | forty dollars forty eth now we are under |
| 00:10:09,540 | collateralized right now we have less |
| 00:10:11,520 | eth than we have DSC and keep and this |
| 00:10:15,840 | user should get what's called liquidated |
| 00:10:17,939 | they shouldn't be allowed to hold a |
| 00:10:19,560 | position |
| 00:10:20,520 | in our system anymore |
| 00:10:22,500 | so ideally we set some threshold that's |
| 00:10:25,200 | too low maybe it's maybe it's 20 percent |
| 00:10:28,379 | and if you hold 60 worth of eth at fifty |
| 00:10:31,560 | dollars worth of DSC you should get |
| 00:10:33,360 | kicked out of the system because you're |
| 00:10:34,800 | way too close to being under |
| 00:10:36,240 | collateralized this liquidate function |
| 00:10:38,820 | is going to be the function that other |
| 00:10:40,919 | users can call to remove people's |
| 00:10:43,020 | positions to save the protocol and we'll |
| 00:10:45,480 | talk about that a little bit more very |
| 00:10:46,980 | soon and we're going to want to function |
| 00:10:48,600 | Health Factor |
| 00:10:50,580 | this should be an external view function |
| 00:10:52,500 | or excuse me get health Factor and this |
| 00:10:55,980 | will allow to see how healthy people are |
| 00:10:57,899 | so let's go back up to this example here |
| 00:11:01,560 | so if if the price of V dumps to forty |
| 00:11:04,500 | dollars we're now ten dollars under |
| 00:11:06,840 | collateralized right and that's not good |
| 00:11:09,419 | that's really bad we never want this to |
| 00:11:11,639 | happen |
| 00:11:12,360 | so what we can do is we can set a |
| 00:11:14,820 | threshold to let's say for this example |
| 00:11:19,740 | fifty percent or a hundred and fifty |
| 00:11:22,860 | percent so if you have fifty dollars in |
| 00:11:25,379 | the system |
| 00:11:26,399 | you need to have at least 75 eth at all |
| 00:11:29,159 | times |
| 00:11:29,939 | this way there's a little bit of a |
| 00:11:31,379 | buffer that way we can never be under |
| 00:11:33,179 | collateralized if the price tanks here |
| 00:11:34,980 | if you go to seventy four dollars now |
| 00:11:37,800 | what we can do is we can liquidate and |
| 00:11:40,320 | we can say hey if someone liquid if |
| 00:11:44,280 | someone pays back your borrow your |
| 00:11:47,820 | minted DSC they can have all your |
| 00:11:52,379 | collateral or a discount |
| 00:11:55,139 | so maybe we say hey somebody pay back |
| 00:11:57,720 | this 50 DSC and you can have this 74 |
| 00:12:02,820 | dollars worth of eth somebody's going to |
| 00:12:04,980 | be very incentivized to do this because |
| 00:12:06,240 | they're going to make twenty twenty four |
| 00:12:07,740 | dollars |
| 00:12:08,580 | so we'll set some threshold maybe 150 |
| 00:12:11,460 | percent and we'll we'll say hey anybody |
| 00:12:13,919 | who liquidates your position if you're |
| 00:12:16,139 | under the threshold they can have as a |
| 00:12:18,840 | reward some of your extra collateral and |
| 00:12:21,360 | this will incentivize people to always |
| 00:12:22,919 | have extra collateral otherwise they're |
| 00:12:24,899 | going to lose way more money than they |
| 00:12:26,460 | borrowed that didn't make sense so one |
| 00:12:28,919 | more time let's do that example so if I |
| 00:12:31,740 | mint so if I put down 100 worth of |
| 00:12:34,679 | ether's collateral and I mint |
| 00:12:37,320 | fifty dollars worth of DSC now I'm going |
| 00:12:40,020 | to go off and do whatever I want with DC |
| 00:12:42,060 | price of my eth tanks to |
| 00:12:45,960 | 75 dollars |
| 00:12:47,820 | or better yet let's say seventy four |
| 00:12:49,439 | dollars some other user is going to see |
| 00:12:51,600 | oh my God under collateralize |
| 00:12:54,600 | and we're going to let people liquidate |
| 00:12:56,399 | their positions if they become under |
| 00:12:57,960 | collateralized based off the threshold |
| 00:13:00,119 | some other users are going to see that |
| 00:13:01,560 | and they're going to say okay I'll |
| 00:13:04,080 | pay back the 50 of DSC I'll pay back the |
| 00:13:08,100 | fifty dollars of DC so now this person |
| 00:13:09,480 | has zero debt and in return get all your |
| 00:13:13,439 | collateral |
| 00:13:14,580 | so now this person has zero dollars |
| 00:13:16,320 | worth of eth and this user got the 74 |
| 00:13:19,740 | dollars and all they had to do was pay |
| 00:13:22,679 | fifty dollars of DSC to get seventy four |
| 00:13:25,679 | dollars of eth so this person is now up |
| 00:13:28,320 | just made twenty five dollars or twenty |
| 00:13:30,540 | four dollars |
| 00:13:31,500 | why liquidating you they're incentivized |
| 00:13:34,860 | to make money |
| 00:13:35,879 | and this is your punishment for letting |
| 00:13:37,560 | your collateral get too low |
| 00:13:39,960 | so hopefully that makes sense if this |
| 00:13:42,000 | system of liquidations doesn't make |
| 00:13:43,800 | sense to you you know where to go come |
| 00:13:46,139 | to the GitHub reposis with this course |
| 00:13:47,820 | and start joining the discussion all |
| 00:13:50,340 | right so hopefully this made sense if it |
| 00:13:51,840 | doesn't use the discussions tab of |
| 00:13:53,340 | course now these are kind of this |
| 00:13:55,159 | combination function we're probably |
| 00:13:57,240 | going to want a function just called |
| 00:13:58,679 | deposit this deposit collateral external |
| 00:14:02,879 | I'm probably going to want to function |
| 00:14:05,280 | redeem |
| 00:14:07,020 | collateral external and then we're |
| 00:14:10,020 | probably going to want |
| 00:14:11,340 | along with a burn DC we're probably |
| 00:14:13,260 | going to want to function mint DSC |
| 00:14:16,020 | external and these look like these are |
| 00:14:18,480 | probably going to be the majority of |
| 00:14:20,159 | what a protocol does and what a lot of |
| 00:14:21,960 | people even do is sometimes they'll even |
| 00:14:23,460 | write tests right now describing what |
| 00:14:26,100 | each one of these should actually do to |
| 00:14:27,960 | the system right we're not going to do |
| 00:14:29,760 | that but we may actually write some |
| 00:14:31,260 | tests as we go along here |
| 00:14:33,780 | and I like to write my deploy script |
| 00:14:36,419 | kind of early and you'll see me do that |
| 00:14:38,100 | here that way I can write tests using my |
| 00:14:40,980 | deploy script so let's go ahead though |
| 00:14:47,220 | where is the best place to start |
| 00:14:49,020 | tackling this well to me the easiest |
| 00:14:51,480 | place to start is actually with the |
| 00:14:52,619 | depositing right because that's the |
| 00:14:54,600 | first thing people are realistically |
| 00:14:55,919 | going to do with this protocol is |
| 00:14:57,060 | actually deposit the collateral so I'm |
| 00:14:59,460 | going to start there so for this deposit |
| 00:15:01,980 | collateral function |
| 00:15:03,480 | what are they going to want to do here |
| 00:15:04,800 | well |
| 00:15:05,700 | we're gonna need to let them pick what |
| 00:15:07,320 | collateral they want to deposit so we'll |
| 00:15:08,820 | say address token collateral address |
| 00:15:12,659 | and then also the unit 56 amount |
| 00:15:15,659 | collateral and we're going to do a |
| 00:15:17,639 | little toggle word wrap all right cool |
| 00:15:19,919 | so to pause the collateral the token |
| 00:15:21,899 | collateral address and then the amounts |
| 00:15:23,460 | that they're going to want to do so |
| 00:15:25,139 | already we can see that there's going to |
| 00:15:26,760 | be a whole bunch of stuff that we're |
| 00:15:27,960 | going to want to do here so |
| 00:15:30,179 | let's even do a little bit in that spec |
| 00:15:32,460 | a bit of that specific here we'll say |
| 00:15:34,619 | app Ram we'll just explain what the |
| 00:15:36,240 | params are and this is where |
| 00:15:39,119 | GitHub co-pilot is really helpful |
| 00:15:41,159 | because oftentimes it's really good with |
| 00:15:44,159 | docs so we're going to say a param r m |
| 00:15:48,780 | so both of those are good total |
| 00:15:50,280 | collateral address the amount of token |
| 00:15:51,899 | to deposit as collateral not collateral |
| 00:15:53,939 | the amount of collateral to deposit |
| 00:15:55,260 | right real simple so we're going to want |
| 00:15:57,780 | a couple of things here we're going to |
| 00:15:59,340 | want to sanitize this a little bit so |
| 00:16:00,960 | the amount collateral we're definitely |
| 00:16:02,399 | going to want this to be more than zero |
| 00:16:04,560 | so we're probably going to want to |
| 00:16:05,639 | modifier called more than zero that we |
| 00:16:07,679 | can use throughout these functions |
| 00:16:09,359 | sometimes people might accidentally send |
| 00:16:11,280 | a zero transaction we want to |
| 00:16:12,659 | automatically revert those so |
| 00:16:15,179 | we scroll to the top here we see our |
| 00:16:18,000 | modifiers come before our functions |
| 00:16:20,939 | so we're going to create our modifiers |
| 00:16:22,919 | here and we're even going to add like a |
| 00:16:24,780 | little little section with a whole bunch |
| 00:16:27,419 | of these here modifiers |
| 00:16:32,100 | like this |
| 00:16:33,359 | cool and we'll say modifier |
| 00:16:36,200 | more than zero and this modifier will |
| 00:16:39,659 | take a u and typically six amount and |
| 00:16:43,800 | we'll just say if mount |
| 00:16:46,379 | equals equals zero then we're going to |
| 00:16:48,899 | go ahead and revert with a new error |
| 00:16:51,960 | where do errors go let's go to the top |
| 00:16:54,560 | errors go |
| 00:16:57,119 | right underneath Imports actually |
| 00:16:59,760 | it's not quite right they're going to go |
| 00:17:01,260 | right underneath the contract |
| 00:17:03,419 | so we're going to do we're going to copy |
| 00:17:05,760 | this whole section |
| 00:17:08,639 | we're going to say errors |
| 00:17:10,439 | we're gonna go here |
| 00:17:11,760 | so we're going to say error |
| 00:17:13,500 | DSC engine underscore underscore |
| 00:17:16,500 | what we want to call that |
| 00:17:18,000 | I just needs more than zero needs more |
| 00:17:21,000 | than zero like this and then we're gonna |
| 00:17:24,179 | revert with needs more than zero and of |
| 00:17:26,939 | course add the little underscore here |
| 00:17:28,439 | cool so now we have a more than zero |
| 00:17:30,480 | modifier so we can make this |
| 00:17:32,760 | external more than zero and we'll pass |
| 00:17:35,399 | the amount collateral and boom okay cool |
| 00:17:38,220 | we're doing a little standardization |
| 00:17:39,600 | here what else should we do |
| 00:17:41,520 | you know let's even |
| 00:17:43,500 | copy this |
| 00:17:44,939 | and we'll paste this here we'll say |
| 00:17:47,539 | functions and we're going to have a |
| 00:17:50,579 | Constructor |
| 00:17:51,659 | so I'm just going to put this here for |
| 00:17:52,980 | now instructor spell Constructor right |
| 00:17:56,039 | and then |
| 00:17:57,840 | we're gonna have a section after |
| 00:17:59,960 | functions like a subsection we're going |
| 00:18:02,280 | to call it |
| 00:18:03,360 | external |
| 00:18:04,440 | functions |
| 00:18:05,940 | this external functions cool because we |
| 00:18:09,058 | want to go |
| 00:18:10,320 | receive and fall back we're not going to |
| 00:18:12,119 | have those but then external and public |
| 00:18:14,400 | so external function first |
| 00:18:16,920 | anyways okay |
| 00:18:18,240 | okay more than zero got that and we |
| 00:18:20,820 | probably don't want people to use any |
| 00:18:23,340 | collateral right we probably only want |
| 00:18:25,018 | them to use |
| 00:18:26,159 | certain collateral that we allow so |
| 00:18:28,440 | we're going to create a new modifier |
| 00:18:29,759 | called is allowed token so we're going |
| 00:18:34,499 | to do modifier is allowed token this is |
| 00:18:39,058 | going to take a |
| 00:18:40,619 | address token |
| 00:18:42,360 | basically we're going to say |
| 00:18:44,219 | if the token not allowed |
| 00:18:46,380 | the token isn't allowed then revert |
| 00:18:48,900 | right however at the moment we don't |
| 00:18:51,179 | have like a token allow list so let's |
| 00:18:53,039 | create that this is probably going to be |
| 00:18:55,639 | a state mapping so let's scroll to the |
| 00:18:58,619 | top or do state variables go so errors |
| 00:19:02,340 | type Declaration state variables okay |
| 00:19:04,920 | errors great let's put it here State |
| 00:19:08,460 | variables |
| 00:19:10,200 | okay and let's do our |
| 00:19:12,420 | let's create |
| 00:19:13,980 | an allowed list of mapping so we'll do |
| 00:19:16,320 | mapping |
| 00:19:18,058 | address to Bool you know private |
| 00:19:22,018 | s underscore token to allowed |
| 00:19:25,920 | and we could do this however I already |
| 00:19:28,200 | know |
| 00:19:29,280 | that we're going to need price feeds so |
| 00:19:31,799 | instead what I'm going to do is I'm not |
| 00:19:34,380 | going to do an address to Bool I'm going |
| 00:19:36,420 | to do an address to address and this is |
| 00:19:39,539 | going to be our price feed mapping so |
| 00:19:41,100 | it's going to be S underscore price |
| 00:19:42,480 | feeds |
| 00:19:43,499 | and normally I do the syntax |
| 00:19:46,558 | token to price feed right but for this |
| 00:19:50,820 | one we're just going to call this price |
| 00:19:51,840 | feeds and we're going to use the newer |
| 00:19:53,518 | solidity named mappings to make this a |
| 00:19:56,700 | little bit clearer so I'm going to say |
| 00:19:57,719 | address token |
| 00:19:59,700 | maps to address price feed |
| 00:20:03,420 | so now this is S price feed and anybody |
| 00:20:05,280 | can look up and go ah okay so this is |
| 00:20:06,840 | token to price feed cool so we're going |
| 00:20:09,539 | to have this list of price feeds and |
| 00:20:12,120 | where should we probably set this well |
| 00:20:13,999 | we're probably going to want to set this |
| 00:20:16,679 | up right in the Constructor right right |
| 00:20:18,660 | when we deploy this contract that's when |
| 00:20:20,340 | we're going to say okay these are going |
| 00:20:21,420 | to be the allowed tokens these the price |
| 00:20:23,160 | feeds and that way it's going to be like |
| 00:20:24,600 | that forever right we're never going to |
| 00:20:26,400 | be able to change this so what we'll do |
| 00:20:28,740 | is in our Constructor now |
| 00:20:30,600 | we'll take in |
| 00:20:32,340 | the the allowed tokens and their price |
| 00:20:34,799 | feeds right because in order for this |
| 00:20:37,620 | system to work we're going to like |
| 00:20:39,978 | data.chain.link in order for this entire |
| 00:20:42,600 | system to work if we want to know how |
| 00:20:45,660 | much value our ethereum that people |
| 00:20:47,940 | deposit in here is worth we need to have |
| 00:20:49,860 | the pricing right the only way for us to |
| 00:20:51,840 | know if we're over collateralized if we |
| 00:20:54,058 | know the value of our eth and our |
| 00:20:55,860 | Bitcoin so we're going to use these two |
| 00:20:57,840 | price feeds to |
| 00:20:59,400 | to maintain that because these price |
| 00:21:01,259 | feeds are going to be on different |
| 00:21:02,219 | addresses on different chains you |
| 00:21:04,200 | already know that we got to parametize |
| 00:21:06,058 | it so we'll do an address array |
| 00:21:09,240 | memory |
| 00:21:11,219 | token addresses |
| 00:21:12,780 | on my address array |
| 00:21:14,880 | memory |
| 00:21:16,320 | price |
| 00:21:17,460 | feed addresses |
| 00:21:19,679 | as input parameters |
| 00:21:21,360 | and we're going to say |
| 00:21:22,799 | token address 0 maps to price read zero |
| 00:21:25,018 | token orders one Maps the price feed one |
| 00:21:27,058 | Etc |
| 00:21:27,780 | and while we're in here I already know |
| 00:21:30,420 | that our DSC engine is going to need to |
| 00:21:32,999 | know about our decentralized stablecoin |
| 00:21:35,340 | why because our DSC engine is going to |
| 00:21:37,620 | need to know to call burn and mint so in |
| 00:21:40,499 | here in the Constructor this is also |
| 00:21:42,719 | where we're going to pass the address |
| 00:21:44,299 | DSC address decentralized stablecoin |
| 00:21:46,978 | address |
| 00:21:47,759 | and so in here |
| 00:21:49,380 | let's do some sanity checks on this |
| 00:21:51,840 | we'll say if the token addresses the |
| 00:21:55,499 | length does not equal the price feed |
| 00:21:58,259 | addresses |
| 00:21:59,460 | price feed address is |
| 00:22:01,978 | feed addresses length we have an issue |
| 00:22:05,280 | right because if there's more tokens or |
| 00:22:06,900 | more price feeds that means we mess |
| 00:22:08,880 | something up so we're going to go ahead |
| 00:22:10,440 | and revert with a new error go to our |
| 00:22:13,558 | errors here we'll say error |
| 00:22:15,600 | ESC engine underscore underscore token |
| 00:22:19,039 | address is |
| 00:22:21,719 | and price feed addresses must be same |
| 00:22:26,940 | length it's a massive error I know but I |
| 00:22:29,999 | like being verbose like I've told you |
| 00:22:31,320 | before |
| 00:22:32,100 | so if those don't match we're going to |
| 00:22:34,320 | go ahead and revert |
| 00:22:35,700 | then we're going to Loop through the |
| 00:22:36,840 | token addresses and update our mapping |
| 00:22:39,960 | that we just created up here |
| 00:22:42,240 | to say okay the token address is mapped |
| 00:22:45,058 | to the price feed address |
| 00:22:46,558 | now in order for us to get a pricing |
| 00:22:48,179 | we're gonna have to use |
| 00:22:49,740 | the USD price feeds and everything every |
| 00:22:53,940 | price view that we're going to have to |
| 00:22:55,139 | use is going to be the USD backed price |
| 00:22:56,880 | feed so for example |
| 00:22:59,100 | it's going to be eth USD BTC USD mkr USD |
| 00:23:05,820 | Etc |
| 00:23:06,478 | okay so we're going to Loop through |
| 00:23:08,160 | we're gonna say four U and 256 I equals |
| 00:23:11,639 | zero I is less than Oaken address says |
| 00:23:15,960 | dot length I plus plus |
| 00:23:18,660 | so we're going to Loop through this |
| 00:23:19,679 | token addresses array and we're going to |
| 00:23:21,719 | say s underscore price feeds |
| 00:23:25,320 | of token addresses |
| 00:23:27,780 | I is going to equal to price feed |
| 00:23:31,100 | addresses of I so we're going to set up |
| 00:23:34,499 | this price feed so whatever the token |
| 00:23:37,018 | so the token of I is going to equal the |
| 00:23:39,240 | price feed of I and that's how we're |
| 00:23:40,860 | going to set up what tokens are |
| 00:23:43,860 | allowed on our platform if they have a |
| 00:23:45,900 | price feed they're allowed if they don't |
| 00:23:48,058 | they're not allowed and then I know |
| 00:23:50,400 | we're going to do a lot of stuff with |
| 00:23:51,478 | our DSC so this is where this is |
| 00:23:54,600 | definitely going to be an immutable |
| 00:23:55,799 | variable so we can scroll up make a |
| 00:23:58,320 | mutable variable we'll say |
| 00:24:00,240 | so we'll say decentralized stablecoin |
| 00:24:03,740 | private I underscore DSC because we're |
| 00:24:07,080 | going to make this a mutable |
| 00:24:08,700 | and since we're using decentralized |
| 00:24:10,018 | stable corn we're gonna have to go ahead |
| 00:24:11,280 | and import this |
| 00:24:13,380 | so let's go to the top here |
| 00:24:15,539 | do import Central stablecoin from dot |
| 00:24:19,320 | slash |
| 00:24:20,058 | decentralizedablecoin.soll so now the |
| 00:24:22,920 | central stablecoin private idsc we can |
| 00:24:26,160 | now do oh excuse me this is going to be |
| 00:24:27,840 | private mutable |
| 00:24:31,799 | a little bit down in the Constructor |
| 00:24:33,120 | we're just going to say idsc equals |
| 00:24:35,280 | decentralized stablecoin DSC address |
| 00:24:37,978 | like that again using GitHub copilot if |
| 00:24:40,860 | you don't have GitHub copilot that's |
| 00:24:42,840 | okay there's a lot of other free AIS |
| 00:24:44,400 | that you can use as well |
| 00:24:46,499 | cool so we set up our Constructor we're |
| 00:24:49,920 | going back down to deposit collateral |
| 00:24:52,259 | whole reason we were doing this is we're |
| 00:24:53,880 | saying okay we should only allow certain |
| 00:24:55,679 | kinds of collateral on our platform so |
| 00:24:58,320 | now we can create a new modifier called |
| 00:25:00,780 | is allowed token where we can just say |
| 00:25:03,840 | if |
| 00:25:05,160 | s underscore price feeds |
| 00:25:07,380 | of token equals equals address zero then |
| 00:25:11,700 | we can go ahead and revert |
| 00:25:13,440 | with a new oh that looks like a good one |
| 00:25:15,780 | DSC engine token not allowed I'm just |
| 00:25:17,820 | going to copy that go to the top and |
| 00:25:20,400 | thanks copilot just Auto filled it in |
| 00:25:22,558 | for me okay great and then of course we |
| 00:25:24,840 | need to do this down here cool so is |
| 00:25:27,719 | token allowed more than zero is allowed |
| 00:25:31,440 | excuse me is allowed token |
| 00:25:33,478 | token |
| 00:25:35,219 | collateral |
| 00:25:37,200 | address like this |
| 00:25:39,299 | all right cool and then additionally I'm |
| 00:25:41,999 | going to add a |
| 00:25:43,999 | non-reentrant modifier here as well |
| 00:25:46,740 | we're going to grab this from open |
| 00:25:48,660 | Zeppelin whenever we're working with |
| 00:25:50,700 | external contracts it might be a good |
| 00:25:53,639 | idea consider making your function |
| 00:25:55,280 | non-reentrant reentrencies are one of |
| 00:25:57,960 | the most common attacks in all of web 3 |
| 00:26:00,620 | and to be honest sometimes I'll just rip |
| 00:26:04,080 | a non-re-entry modifier even if I'm |
| 00:26:06,179 | pretty certain it's not vulnerable to a |
| 00:26:08,039 | re-entrancy attack |
| 00:26:09,360 | I feel like to be honest most functions |
| 00:26:11,580 | should be non-reential by default but |
| 00:26:13,820 | especially when working with external |
| 00:26:16,200 | contracts it's a good idea to maybe put |
| 00:26:18,240 | this modifier here now this might go to |
| 00:26:20,460 | audit and we might say hey well we don't |
| 00:26:22,920 | need this non-reentrant modifier and |
| 00:26:24,600 | maybe we get rid of it but maybe we |
| 00:26:26,460 | don't the trade-off is it's a little bit |
| 00:26:28,860 | more gas intensive to have this here but |
| 00:26:31,080 | it's also safer so I'm just going to |
| 00:26:33,719 | stick it in here even if I'm pretty |
| 00:26:35,880 | certain I don't need it we're going to |
| 00:26:37,679 | get this from open Zeppelin has a |
| 00:26:40,380 | non-re-entrance a non-re-entrant |
| 00:26:42,920 | modifier from their re-entracy guard so |
| 00:26:45,660 | we'll import |
| 00:26:46,860 | actually my Gib co-pilot automatically |
| 00:26:50,039 | had it ran to see Guard from open |
| 00:26:51,660 | Zeppelin contracts |
| 00:26:54,058 | security re-entracy guarded Soul yep |
| 00:26:56,340 | that's actually exactly correct |
| 00:26:58,440 | and then what we can do is scroll down |
| 00:27:01,080 | and we see our DSC engine is re-entracy |
| 00:27:04,018 | guard and by doing this we now have |
| 00:27:06,120 | access to this |
| 00:27:07,759 | non-re-entrant modifier and now this |
| 00:27:11,039 | function is non-reunable which is what |
| 00:27:13,620 | we want okay cool now we can finally |
| 00:27:15,900 | start doing some collateral stuff so |
| 00:27:17,940 | we're going to go ahead and deposit this |
| 00:27:19,139 | collateral first thing we're going to |
| 00:27:20,940 | need to do is a way to track how much |
| 00:27:22,920 | collateral somebody has actually |
| 00:27:24,179 | deposited so what's that look like well |
| 00:27:27,058 | that probably looks like a mapping to me |
| 00:27:28,620 | so let's go to the top we'll create a |
| 00:27:31,440 | mapping |
| 00:27:33,058 | of |
| 00:27:34,320 | address user to |
| 00:27:38,039 | mapping of an address |
| 00:27:40,679 | token to you and 256 amount |
| 00:27:44,700 | private s underscore cool cool lap to |
| 00:27:49,080 | roll the posited |
| 00:27:52,259 | so this is a mapping to a mapping crazy |
| 00:27:54,600 | right so we're going to map the user's |
| 00:27:56,940 | balances to a mapping of tokens which is |
| 00:27:59,999 | going to get mapped to the amount of |
| 00:28:02,460 | each token that they have all right so |
| 00:28:04,620 | let's scroll back down |
| 00:28:06,240 | to our deposit collateral function so |
| 00:28:08,880 | now we have a collateral deposited |
| 00:28:11,160 | mapping so we can do s collateral |
| 00:28:13,380 | deposited of message.sender of this |
| 00:28:17,219 | token collateral address now that we |
| 00:28:19,080 | know it is an allowed collateral address |
| 00:28:21,840 | it's going to be plus equal to the |
| 00:28:24,299 | amount collateral right and and I'm |
| 00:28:27,900 | actually running to an issue here where |
| 00:28:29,759 | when I do Forge format formats the code |
| 00:28:33,179 | look like this but right now when I'm |
| 00:28:35,580 | saving it's reformatting in a different |
| 00:28:37,740 | way so what I'm going to do is it looks |
| 00:28:40,080 | like it's using a different formatter |
| 00:28:41,639 | that I don't like so I'm going to go to |
| 00:28:42,900 | the extensions solidity hard hat hit the |
| 00:28:46,080 | settings here extension settings and |
| 00:28:48,900 | we're going to change this from prettier |
| 00:28:50,219 | to forge because I want to use the forge |
| 00:28:52,139 | format settings now if I hit save okay |
| 00:28:54,960 | great it saves in formats the way I |
| 00:28:57,539 | wanted to okay great so as you can see |
| 00:28:59,639 | here we're updating State and what |
| 00:29:01,499 | should we do when we update State we |
| 00:29:03,539 | should omit |
| 00:29:04,920 | an event so we're going to emit |
| 00:29:06,660 | collateral |
| 00:29:08,420 | deposited we're going to have it be the |
| 00:29:10,978 | mess it does sender who is depositing |
| 00:29:13,018 | the token collateral address and the |
| 00:29:16,679 | amount collateral as well |
| 00:29:19,139 | which means that we have our first event |
| 00:29:21,440 | all right |
| 00:29:23,100 | so let's go on up here Zoom back out |
| 00:29:26,400 | scroll all the way up to the layout |
| 00:29:27,719 | where do events go events go after the |
| 00:29:30,120 | state variables okay so I'm going to |
| 00:29:31,679 | copy this |
| 00:29:32,880 | go right after the state variables |
| 00:29:34,440 | before the modifier so we're going to |
| 00:29:36,179 | say events you're going to go here |
| 00:29:39,478 | we're going to say event |
| 00:29:42,539 | and get a copilot automatically filled |
| 00:29:44,940 | it in for me awesome address indexed |
| 00:29:46,740 | user address index token un256 amount we |
| 00:29:50,580 | don't really need to index that maybe we |
| 00:29:52,499 | do why not let's just index it all right |
| 00:29:55,200 | cool and just to know a keyboard |
| 00:29:57,660 | shortcut that I use a lot is control |
| 00:29:59,280 | back or control minus which allows you |
| 00:30:02,039 | to go back to the last spot you were in |
| 00:30:04,320 | your code if you do Ctrl shift minus |
| 00:30:06,900 | it'll go forward and I use this all the |
| 00:30:08,639 | time so for example if I'm way down here |
| 00:30:11,039 | in my code and I hit control back I'll |
| 00:30:14,280 | just go right back to the last place my |
| 00:30:16,080 | cruiser was and I use this all the time |
| 00:30:18,539 | I'm not sure what the keyboard shortcut |
| 00:30:20,400 | on |
| 00:30:21,420 | windows or linuxes but on a Mac it is |
| 00:30:23,820 | control back and control shift back and |
| 00:30:25,799 | I use it all the time anyways so we are |
| 00:30:28,920 | in |
| 00:30:29,700 | deposit collateral we have this emit |
| 00:30:31,920 | here we finally have the event and Okay |
| 00:30:34,139 | cool so we're updating the collateral |
| 00:30:37,200 | internal record keeping we're emitting |
| 00:30:40,139 | event now of course we should actually |
| 00:30:42,058 | get the tokens right and you can see |
| 00:30:44,160 | here we're following CEI right so we do |
| 00:30:48,179 | a little |
| 00:30:49,018 | notice follows CEI checks effects |
| 00:30:53,039 | interactions |
| 00:30:54,840 | so all the checks are happening in our |
| 00:30:56,639 | modifiers here these are all the checks |
| 00:30:58,440 | our effects are right here and then |
| 00:31:01,380 | finally our external interactions so |
| 00:31:04,139 | this is where we're going to do that |
| 00:31:04,920 | transfer from |
| 00:31:06,660 | and we're going to wrap our collateral |
| 00:31:08,880 | as an erc20 |
| 00:31:10,920 | so we're going to need to call transfer |
| 00:31:12,719 | from on it so I'm going to go ahead and |
| 00:31:14,039 | import IE orc20 from at open Zeppelin |
| 00:31:18,240 | contracts |
| 00:31:19,679 | slash |
| 00:31:21,299 | token slash erc20 |
| 00:31:24,259 | ierc20. soul Ctrl minus to go right back |
| 00:31:28,080 | down to here isn't that nice and we can |
| 00:31:30,360 | finally do irc20 of the token collateral |
| 00:31:33,840 | address |
| 00:31:34,978 | dot transfer from message dot sender |
| 00:31:39,240 | to address this |
| 00:31:42,240 | amount collateral |
| 00:31:45,058 | like this and we'll say so this function |
| 00:31:48,360 | actually returns a Boolean full success |
| 00:31:51,179 | and we want to make sure that this is |
| 00:31:53,219 | actually being true |
| 00:31:54,478 | so we want to say if not success |
| 00:31:57,719 | we'll just revert DSC engine |
| 00:32:01,679 | I'm just going to score transfer failed |
| 00:32:04,440 | like this what's this an error you bet |
| 00:32:08,400 | it is so we'll put this at the top Air |
| 00:32:10,920 | DSC engine transfer failed |
| 00:32:13,259 | and I'm going to hit Ctrl minus to go |
| 00:32:15,120 | right back down to the code that I was |
| 00:32:16,558 | working with |
| 00:32:17,820 | cool so this function looks pretty good |
| 00:32:20,820 | to me I'm able to deposit collateral in |
| 00:32:23,039 | here and update our mappings now might |
| 00:32:26,039 | be a good time for us to start writing |
| 00:32:28,139 | some tests for this right and we could |
| 00:32:30,478 | do something similar to what we did |
| 00:32:31,740 | before where we just kind of threw |
| 00:32:33,840 | together a real quick setup in our unit |
| 00:32:36,240 | test and then I had our integration test |
| 00:32:37,978 | be what our deploy script actually uses |
| 00:32:41,400 | well let's write a couple more functions |
| 00:32:43,259 | first and then we can go ahead and do |
| 00:32:44,880 | all that work |
| 00:32:49,380 | so we have a way to deposit the |
| 00:32:51,299 | collateral okay awesome what should we |
| 00:32:54,478 | do next well the next thing that we |
| 00:32:55,799 | should do is have a way to mint our DSC |
| 00:32:59,219 | token right once they deposit the |
| 00:33:00,600 | collateral they should be able to Mint |
| 00:33:01,679 | the DSC token and then the combination |
| 00:33:04,320 | of those two will be this function |
| 00:33:06,120 | deposit collateral and mint DSC so let's |
| 00:33:08,940 | go ahead and actually create this mint |
| 00:33:10,320 | DSC function because now that they have |
| 00:33:12,600 | some collateral we should be able to |
| 00:33:13,920 | Mint some DSE and now this is actually |
| 00:33:15,719 | going to be a surprisingly involved |
| 00:33:17,639 | method right because in order to Mint |
| 00:33:19,679 | DSC we need to check if the collateral |
