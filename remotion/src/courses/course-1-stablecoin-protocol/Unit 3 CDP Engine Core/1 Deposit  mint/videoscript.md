# 1 Deposit  mint

> Implementing depositCollateralAndMintDsc: CEI pattern, moreThanZero and isAllowedToken modifiers.

| Timestamp | Content |
| :--- | :--- |
| 00:00:00,000 | value is greater than the DSC amount |
| 00:00:04,500 | and this is obviously going to involve a |
| 00:00:06,779 | number of things right it's going to |
| 00:00:07,918 | involve price feeds we're going to be |
| 00:00:10,438 | checking values |
| 00:00:12,000 | we'll be checking a whole lot of stuff |
| 00:00:13,380 | okay so this is actually going to be a |
| 00:00:15,239 | little bit more of an in-depth function |
| 00:00:17,099 | here |
| 00:00:17,880 | so let's create this mint DSC function |
| 00:00:19,800 | and we'll have this get passed in a |
| 00:00:22,260 | un256 amount DSC to Mint so people can |
| 00:00:27,059 | pick how much DSA they want to Mint so |
| 00:00:29,340 | let's say for example someone deposits |
| 00:00:31,559 | 200 worth of eth maybe they only want to |
| 00:00:34,319 | Mint 20 worth of DSC right so they can |
| 00:00:37,438 | pick how much they want to Mint here |
| 00:00:39,359 | so amount to Mint here and let's add |
| 00:00:42,300 | some checks here we should have them |
| 00:00:43,978 | mint more than zero Mount DSC to Mint |
| 00:00:47,639 | this |
| 00:00:49,139 | what else we probably want this to be |
| 00:00:51,000 | non-re-entrant even though we probably |
| 00:00:53,219 | don't need this to be not re-entrant |
| 00:00:54,840 | because it's our DSC token but let's put |
| 00:00:58,319 | it in here anyways |
| 00:00:59,579 | it's probably all we need for now we |
| 00:01:01,679 | probably want to do some |
| 00:01:04,978 | looks like GitHub copilot even gave me |
| 00:01:07,319 | some some follows CEI yes oh that's |
| 00:01:10,199 | wrong Mount DEC to Mint Mount D SC to |
| 00:01:14,519 | Mint the amount of decentralized |
| 00:01:18,659 | stable coin to Mint at notice |
| 00:01:22,619 | they |
| 00:01:24,119 | must have more collateral value than |
| 00:01:29,639 | the minimum threshold we're going to |
| 00:01:33,239 | figure out what that means in a second |
| 00:01:34,319 | so mint DSC will need to keep track of |
| 00:01:37,319 | how much everybody has minted right so |
| 00:01:39,779 | whenever they're minting DSC they're in |
| 00:01:41,279 | a way they're minting debt right so |
| 00:01:42,898 | we're gonna need to keep track of that |
| 00:01:44,519 | where can we do that well we can do that |
| 00:01:46,500 | as a state variable |
| 00:01:47,938 | so we'll do mapping of |
| 00:01:52,139 | an address |
| 00:01:54,319 | mapped to |
| 00:01:56,099 | they're you into 256 which is going to |
| 00:01:58,380 | be an address user mapped to the U into |
| 00:02:01,019 |  |
| 00:02:02,279 | Mount DSC minted it's going to be |
| 00:02:05,938 | private s underscore |
| 00:02:08,059 | DSC minted this now I can go back down |
| 00:02:12,418 | here with this new mapping SDC minted |
| 00:02:16,519 | message.c sender plus equals amount DSC |
| 00:02:20,938 | to Mint so we're going to keep track of |
| 00:02:23,340 | all that they minted again this is going |
| 00:02:25,199 | to follow CEI |
| 00:02:26,938 | so now we want to do a little check here |
| 00:02:28,500 | if they minted |
| 00:02:30,359 | too much for example like it minted 150 |
| 00:02:35,099 | or 150 worth of DSC but they only have |
| 00:02:38,219 | 100 worth of eth that's gonna be way too |
| 00:02:41,099 | much we should 100 revert if that |
| 00:02:44,340 | happened |
| 00:02:45,179 | so I'm actually going to make a function |
| 00:02:47,159 | I'm going to make an internal function |
| 00:02:48,659 | call revert if |
| 00:02:52,019 | Health factor is broken with the |
| 00:02:57,019 | message.c sender being sent so we're |
| 00:02:59,878 | going to create this new internal |
| 00:03:01,139 | function so up here we have external |
| 00:03:03,119 | functions we're going to scroll down |
| 00:03:04,978 | here we're gonna make this |
| 00:03:07,679 | private and internal functions |
| 00:03:10,918 | like this like this and we're only going |
| 00:03:14,519 | to be able to call this if we're only |
| 00:03:16,378 | going to be able to call this internally |
| 00:03:17,819 | right so we're going to create this |
| 00:03:19,559 | function function revert if Health |
| 00:03:21,300 | factor is broken |
| 00:03:22,739 | address user it's going to be an |
| 00:03:25,019 | internal View |
| 00:03:26,579 | function |
| 00:03:27,958 | and we're going to basically one check |
| 00:03:31,319 | health |
| 00:03:32,398 | factor which is basically |
| 00:03:34,739 | do they have enough collateral right and |
| 00:03:38,699 | then revert if they don't have a good |
| 00:03:41,699 | health Factor so this health factor is |
| 00:03:44,760 | actually a term that I borrowed from the |
| 00:03:46,438 | Ave documentation |
| 00:03:48,000 | reach wallet these risk parameters |
| 00:03:49,739 | enable the calculation of Health Factor |
| 00:03:51,840 | you can see a little bit of an image |
| 00:03:53,458 | here that shows it so additionally we're |
| 00:03:56,279 | going to need to make a function that |
| 00:03:57,958 | checks the health Factor actually these |
| 00:04:00,239 | are going to be private internal view |
| 00:04:02,279 | functions |
| 00:04:03,659 | so first we need to make a function that |
| 00:04:05,639 | can get the health Factor so we're going |
| 00:04:07,500 | to make another function here called |
| 00:04:09,119 | function |
| 00:04:10,139 | underscore Health Factor we're going to |
| 00:04:13,438 | take an address user and you see we have |
| 00:04:16,260 | this leading underscore to tell us as |
| 00:04:18,418 | developers that this is an internal |
| 00:04:20,279 | function so let's actually give this an |
| 00:04:22,978 | underscore as well |
| 00:04:24,478 | funk function oops Health Factor this |
| 00:04:28,559 | will be a private View |
| 00:04:30,958 | I'm going to return a u into 256. so |
| 00:04:34,139 | what this health Factor thing is going |
| 00:04:35,579 | to do |
| 00:04:36,300 | give it a little bit of nat spec now we |
| 00:04:39,359 | can say this is going to |
| 00:04:41,659 | returns how close to liquidation a user |
| 00:04:46,619 | is |
| 00:04:47,519 | say if a user goes below |
| 00:04:51,359 | one then |
| 00:04:53,760 | they can get liquidated so we're going |
| 00:04:56,819 | to figure out what the ratio of |
| 00:04:58,679 | collateral to DSC minted that users can |
| 00:05:01,500 | have with this health Factor function |
| 00:05:03,059 | we're gonna be building a lot of stuff |
| 00:05:04,739 | here so in order to figure this out what |
| 00:05:06,779 | do we need well we kind of need to get |
| 00:05:08,639 | both |
| 00:05:09,659 | their total DSC minted right and we're |
| 00:05:13,859 | going to need to get their total |
| 00:05:15,659 | collateral |
| 00:05:17,398 | value right not just the total |
| 00:05:19,619 | collateral we're going to need to get |
| 00:05:20,699 | the total collateral value make sure the |
| 00:05:23,039 | value is greater than the total DSC |
| 00:05:25,079 | minted |
| 00:05:26,219 | so we're gonna have to make another |
| 00:05:27,840 | function |
| 00:05:28,800 | we're gonna need to get the un256 total |
| 00:05:31,559 | DSC minted and the un256 collateral |
| 00:05:36,599 | value in USD we're going to create a new |
| 00:05:39,779 | function called get count information |
| 00:05:43,159 | from that user so we're gonna do another |
| 00:05:46,918 | one boom function underscore get account |
| 00:05:51,000 | information like this we'll take an |
| 00:05:54,359 | address user this will be a private View |
| 00:05:58,559 | and we're going to return |
| 00:06:01,378 | two things un256 |
| 00:06:03,539 | total DSC minted and U into 256 |
| 00:06:07,579 | collateral value in USD two functions |
| 00:06:11,819 | here to get the total USD that's easy |
| 00:06:14,039 | right we just do total DSC minted equals |
| 00:06:19,319 | this array this can be this mapping that |
| 00:06:22,139 | we just created right we're keeping |
| 00:06:23,519 | track of this exactly so all we got to |
| 00:06:25,079 | do is this to get the total collateral |
| 00:06:27,239 | value in USD we're going to need to do |
| 00:06:29,458 | some more math so I'm going to say |
| 00:06:31,378 | collateral value in USD equals |
| 00:06:35,639 | get account collateral |
| 00:06:38,519 | value |
| 00:06:39,779 | and we're going to pass some user so |
| 00:06:41,938 | this is going to be a different function |
| 00:06:44,398 | and we're going to make this a public |
| 00:06:46,079 | function so that anybody can call this |
| 00:06:48,059 | function themselves |
| 00:06:49,438 | so we're actually going to copy this |
| 00:06:51,840 | private and view internal functions |
| 00:06:54,059 | public internal View and then we're |
| 00:06:55,978 | going to do view in pure public and |
| 00:06:58,319 | external functions all the way at the |
| 00:06:59,579 | bottom so we'll say private |
| 00:07:01,978 | instead of we'll say public |
| 00:07:03,898 | and external view functions we'll do |
| 00:07:07,619 | function |
| 00:07:08,519 | get account |
| 00:07:10,319 | lateral value address of the user this |
| 00:07:14,819 | will be a public view so anybody can |
| 00:07:16,559 | call it returns a uint 256. stay with me |
| 00:07:21,359 | I know we're kind of going down this |
| 00:07:22,500 | tree stay with me here we're about to go |
| 00:07:24,719 | even further |
| 00:07:25,800 | now to get the actual value what do we |
| 00:07:27,719 | need to do well we need to Loop through |
| 00:07:29,760 | each |
| 00:07:31,500 | lateral token |
| 00:07:33,239 | get the amount they have deposited |
| 00:07:36,478 | and map it to |
| 00:07:38,699 | price to get the USD value |
| 00:07:43,378 | so we're going to Loop through all the |
| 00:07:45,300 | collateral tokens uh-oh we have a way we |
| 00:07:48,779 | can do that let's scroll the top we have |
| 00:07:51,539 | a mapping of the price feeds but we |
| 00:07:53,819 | don't have a way to Loop through them so |
| 00:07:56,039 | what we can do |
| 00:07:57,300 | is we could just have like you know |
| 00:07:59,458 | address weft and then address |
| 00:08:03,679 | wrapped BTC we could just have two |
| 00:08:06,599 | tokens like this we won't have to Loop |
| 00:08:08,039 | through anything we're going to make |
| 00:08:09,599 | this system a little bit agnostic so |
| 00:08:11,938 | that you can deploy this with any amount |
| 00:08:13,619 | of stable coins any amount of |
| 00:08:15,559 | collaterals so |
| 00:08:17,819 | we're going to make a new state variable |
| 00:08:19,739 | it's going to be an address array |
| 00:08:21,958 | private s underscore collateral tokens |
| 00:08:25,918 | and what we're going to do is write in |
| 00:08:27,719 | our Constructor when we update our price |
| 00:08:30,539 | feeds with the token and the price feed |
| 00:08:33,119 | we're also going to add the tokens |
| 00:08:35,699 | addresses |
| 00:08:36,958 | of I to this array now we have this |
| 00:08:40,378 | array of collateral tokens that we can |
| 00:08:41,878 | Loop through and that way we can |
| 00:08:43,378 | calculate how much value people have |
| 00:08:45,239 | based off of all of the tokens |
| 00:08:47,878 | so |
| 00:08:49,139 | get account collateral value we're going |
| 00:08:51,599 | to say four you win 256 I equals zero I |
| 00:08:56,099 | is less than |
| 00:08:57,540 | OS tokens dot length I plus plus address |
| 00:09:02,639 | token equals s collateral tokens of I |
| 00:09:07,800 | and we'll get the amount so this is the |
| 00:09:10,438 | token that we're working with we'll get |
| 00:09:12,000 | the amount by you and 256 amount that is |
| 00:09:15,958 | deposited by this user by S underscore |
| 00:09:18,239 | collateral deposited user |
| 00:09:22,438 | token like this |
| 00:09:24,478 | then total collateral |
| 00:09:27,059 | value in USD |
| 00:09:29,340 | plus equals uh oh now that we have the |
| 00:09:33,179 | amount we're going to need to get the |
| 00:09:34,319 | USD value of this and this is probably a |
| 00:09:37,139 | function that we're going to want to |
| 00:09:38,099 | have be public so that other people can |
| 00:09:40,800 | use this as well |
| 00:09:42,119 | so create a function |
| 00:09:44,579 | get USD value or some of the app passes |
| 00:09:48,059 | in an address token |
| 00:09:49,619 | U into physics amount |
| 00:09:51,898 | this will be a public view returns |
| 00:09:55,019 | you went to 256. and this is where we're |
| 00:09:58,918 | going to do some price feed stuff some |
| 00:10:00,779 | stuff that's very familiar |
| 00:10:02,639 | so we're going to need to get the price |
| 00:10:04,918 | sheet for the token |
| 00:10:06,599 | and then times the amount by the price |
| 00:10:09,059 | so we have to work with aggregator V3 |
| 00:10:11,398 | interface again that chain link data |
| 00:10:13,679 | feeds so import and I know we've worked |
| 00:10:15,719 | with this before |
| 00:10:17,059 | aggregate or V3 interface |
| 00:10:20,699 | from |
| 00:10:22,679 | it looks like GitHub copilot it's got my |
| 00:10:24,840 | back at chain link slash contracts blah |
| 00:10:26,760 | blah |
| 00:10:27,840 | this means we're gonna have to install |
| 00:10:29,340 | that remember we can install the smaller |
| 00:10:32,040 | one with Forge install |
| 00:10:35,040 | smart contract kit slash chain link |
| 00:10:38,179 | brownie contracts at |
| 00:10:41,659 | 0.6.1 dash dash no dash commit like this |
| 00:10:47,159 | chain link brownie contracts |
| 00:10:52,500 | awesome then we're gonna have to go to |
| 00:10:53,938 | our foundry.tamil |
| 00:10:55,918 | add some remappings in here |
| 00:10:58,019 | so we're going to put a little comma |
| 00:11:00,359 | we're gonna say that's chain link slash |
| 00:11:03,659 | contracts equals |
| 00:11:06,059 | lib slash chain link brownie contracts |
| 00:11:10,619 | slash contracts |
| 00:11:12,300 | like that so now we have the aggregator |
| 00:11:14,398 | V3 interface scroll down to the bottom |
| 00:11:16,978 | get USD value I know we've done this |
| 00:11:19,500 | before I know this is familiar to a lot |
| 00:11:22,019 | of you but we're going to say aggregator |
| 00:11:23,878 | V3 interface price feed equals |
| 00:11:27,000 | aggregator V3 interface of s underscore |
| 00:11:29,579 | price |
| 00:11:30,540 | feeds of the token so we're going to get |
| 00:11:33,059 | the price feed of the token we're |
| 00:11:34,978 | looking to get the value of now we have |
| 00:11:36,958 | the price feed here we're going to do |
| 00:11:39,000 | this wow it'll co-pilot spot on we're |
| 00:11:42,840 | gonna get the price by calling price |
| 00:11:44,219 | feed the latest round data and this is |
| 00:11:47,340 | where we're going to do a little bit of |
| 00:11:48,300 | math right let's say one eighth equals a |
| 00:11:50,398 | thousand dollars |
| 00:11:51,599 | The Returned value from CL will be 1000 |
| 00:11:57,239 | times |
| 00:11:58,760 | 1e8 how do I know this well if I go to |
| 00:12:02,119 | docs.chain.link go to data feeds |
| 00:12:05,159 | I can scroll down to |
| 00:12:07,378 | price feed addresses |
| 00:12:09,478 | and I can see if I do show more details |
| 00:12:13,079 | for ethusd |
| 00:12:15,619 | USD it has eight decimal places |
