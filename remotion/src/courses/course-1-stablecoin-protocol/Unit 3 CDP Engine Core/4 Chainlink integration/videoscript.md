# 4 Chainlink integration

> Integrating Chainlink price feeds with heartbeat checks and stale price protection.

| Timestamp | Content |
| :--- | :--- |
| 00:00:00,000 | here |
| 00:00:00,721 | although can external view functions |
| 00:00:02,820 | function get token amount from USD and |
| 00:00:06,601 | we're going to pass an address token or |
| 00:00:09,480 | collateral |
| 00:00:10,500 | units 256 USD amount in way this will be |
| 00:00:15,361 | a |
| 00:00:16,261 | public view returns un256. |
| 00:00:20,820 | and we're going to do some price feed |
| 00:00:23,400 | stuff so we're going to need what are we |
| 00:00:25,261 | going to need to do we're going to need |
| 00:00:26,161 | to get the price of eth or the token and |
| 00:00:29,820 | then we're going to have to say Okay so |
| 00:00:31,381 | if the pricing is |
| 00:00:33,181 | dollar per eth and we have eth |
| 00:00:36,420 | how do we get the dollar |
| 00:00:38,040 | well if we do some math here let's say |
| 00:00:40,500 | it's two thousand dollars of eth and we |
| 00:00:42,781 | have |
| 00:00:43,920 | a thousand dollars |
| 00:00:45,540 | right how much eth is that we're gonna |
| 00:00:47,761 | do the 1000 divided by 2000 which is |
| 00:00:50,820 | going to equal 0.5 eth right so we're |
| 00:00:53,820 | going to do this number divided by this |
| 00:00:56,460 | number the amount the USD amount in way |
| 00:00:58,920 | divided by the price and that's how |
| 00:01:01,861 | we're going to get this token or |
| 00:01:03,900 | collateral amount from the usdml so |
| 00:01:07,079 | we'll say aggregate tour V3 interface |
| 00:01:10,320 | price feed equals aggregator V3 |
| 00:01:13,441 | interface of S price feet of token oh |
| 00:01:16,980 | wow and even |
| 00:01:19,560 | build in a lot of this for me that's |
| 00:01:20,881 | great yes this looks right so we're |
| 00:01:22,681 | going to get the price feed of the token |
| 00:01:24,480 | and get called the latest round data |
| 00:01:26,579 | audit to get the price here and then |
| 00:01:29,281 | we're just going to do this right here |
| 00:01:32,521 | so we're going to say the amount USD in |
| 00:01:36,060 | way |
| 00:01:37,021 | divided by the price or unit 56 price is |
| 00:01:41,641 | this the full story no absolutely not |
| 00:01:43,740 | because we should always multiply first |
| 00:01:45,601 | so we're gonna do this times our |
| 00:01:47,601 | Precision then we can divide by the |
| 00:01:50,460 | price but is that the whole story no |
| 00:01:52,320 | because the price has eight decimal |
| 00:01:54,121 | places and we needed to have 18 so we're |
| 00:01:57,480 | gonna do additional feed Precision like |
| 00:02:00,301 | this |
| 00:02:02,161 | is Alec right so if we have let's say we |
| 00:02:05,579 | have 10 e 18 |
| 00:02:07,980 | for a mountain way we're timesing that |
| 00:02:10,079 | by one E18 like this we're saying divide |
| 00:02:14,761 | that by the price let's say the price is |
| 00:02:16,681 | two thousand dollars two thousand |
| 00:02:18,121 | dollars e eight |
| 00:02:20,521 | times the one E10 the additional piece |
| 00:02:24,841 | here this looks pretty correct anything |
| 00:02:27,301 | else let's even just pull up the |
| 00:02:28,500 | calculator right so 10 one two three |
| 00:02:31,381 | four five six seven eight one two three |
| 00:02:33,060 | four five six |
| 00:02:34,681 | seven eight nine ten times one one two |
| 00:02:38,701 | three four five six seven eight one two |
| 00:02:40,500 | three four five six seven eight nine ten |
| 00:02:42,420 | divided by two one two three two |
| 00:02:46,201 | thousand one two three four five six |
| 00:02:48,060 | seven eight nine ten one two three four |
| 00:02:49,560 | five six seven eight equals this number |
| 00:02:52,560 | which is probably a half right one two |
| 00:02:54,781 | one two three four five six seven eight |
| 00:02:57,361 | nine ten eleven twelve thirteen fourteen |
| 00:02:59,941 | fifteen all right one two three four |
| 00:03:02,701 | five six seven eight nine one two three |
| 00:03:05,521 | four five six seven |
| 00:03:07,980 | eight nine |
| 00:03:10,801 | eight nine |
| 00:03:12,480 | zero point is that right oh because it's |
| 00:03:15,540 | ten dollars duh yes this is right I was |
| 00:03:17,941 | like I thought we did a thousand dollars |
| 00:03:19,141 | but this is ten dollars yes okay cool |
| 00:03:21,480 | that looks good to me great and then |
| 00:03:23,460 | obviously we're gonna test this soon to |
| 00:03:24,900 | make sure that it is right so we have |
| 00:03:26,820 | this function where we get the token |
| 00:03:28,861 | amount from the USD so we're saying hey |
| 00:03:30,841 | we're going to cover 100 of your debt or |
| 00:03:33,601 | something like that how much eth is 100 |
| 00:03:35,820 | worth of your debt maybe it's |
| 00:03:38,101 | if the price is two thousand dollars we |
| 00:03:40,920 | obviously we would do |
| 00:03:42,361 | 100 divided by two thousand zero point |
| 00:03:44,641 | zero five right there right |
| 00:03:46,320 | this is gonna be something like 0.05 eth |
| 00:03:49,801 | or whatever it is right cool so we have |
| 00:03:52,980 | how much eth we need to take away from |
| 00:03:55,801 | their collateral |
| 00:03:56,941 | as a reward for paying back this DSC but |
| 00:04:00,540 | additionally we also want to |
| 00:04:02,521 | and give them a 10 bonus right because |
| 00:04:06,241 | we want to incentivize them if they're |
| 00:04:07,741 | just if it's just a one for one they're |
| 00:04:09,781 | not going to want to do this so let's |
| 00:04:10,920 | say we're going to give them a 10 bonus |
| 00:04:12,661 | so we are giving the liquid detour 110 |
| 00:04:18,560 | of weth for 100 DSC whatever 110 dollars |
| 00:04:23,400 | of weft is going to be we should |
| 00:04:25,621 | Implement a feature |
| 00:04:28,141 | to liquid date in the event the protocol |
| 00:04:32,960 | protocol is insolvent |
| 00:04:36,181 | we're not going to add that in yet |
| 00:04:37,500 | though but we should probably add |
| 00:04:39,060 | something like that and then and sweep |
| 00:04:42,000 | extra amounts into a treasury but we're |
| 00:04:46,500 | not going to add either one of those so |
| 00:04:47,941 | don't worry if that's confusing don't |
| 00:04:49,381 | worry about that we're not even going to |
| 00:04:50,341 | implement that anyways so we'll say you |
| 00:04:51,960 | in 256 bonus |
| 00:04:53,960 | collateral equals this token amount that |
| 00:04:57,841 | covered |
| 00:04:58,920 | times |
| 00:05:00,361 | some liquidation bonus that we haven't |
| 00:05:03,841 | defined yet although we're going to do |
| 00:05:05,101 | 10 divided by 100 but I hate these |
| 00:05:08,579 | floating numbers so we're going to do |
| 00:05:10,201 | something better than 100 we're going to |
| 00:05:12,301 | do Liquidator Precision which is 100 and |
| 00:05:15,361 | we'll do U into 256 private constant |
| 00:05:18,560 | liquid Ator bonus equals shun bonus |
| 00:05:25,141 | it's going to be 10 be like this means a |
| 00:05:28,560 | 10 bonus |
| 00:05:30,181 | since it's going to be 10 divided by 100 |
| 00:05:32,341 | that's going to be 10 let's go back down |
| 00:05:34,641 | liquidation bonus divided by liquid |
| 00:05:38,460 | ation Precision so the bonus collateral |
| 00:05:42,121 | is going to be 10 so let's say |
| 00:05:45,181 | it was 0.5 0.05 eth we're going to |
| 00:05:48,601 | multiply that by |
| 00:05:50,521 | 0.1 |
| 00:05:51,900 | right because we're going to multiply |
| 00:05:53,040 | first and then divide to get |
| 00:05:55,521 | 0.005 eth so as a total or that's not |
| 00:05:59,221 | quite right it's gonna be 0.005 |
| 00:06:01,941 | 0.05 times |
| 00:06:04,400 | 0.1 equals yes so that means they're |
| 00:06:07,801 | going to get 0.05 |
| 00:06:11,761 | . is that right I think that's right why |
| 00:06:15,000 | why am I being bad at math |
| 00:06:17,161 | I'm going to one yes okay cool great so |
| 00:06:20,761 | that's what they're going to get this |
| 00:06:21,661 | bonus collateral we got to add the bonus |
| 00:06:23,521 | collateral to |
| 00:06:24,900 | to the actual collateral so we're going |
| 00:06:27,121 | to say like you went to 256 |
| 00:06:28,920 | total collateral collat or all |
| 00:06:32,400 | to redeem equals |
| 00:06:35,579 | token amount from covered plus bonus |
| 00:06:38,641 | collateral like that and so and now we |
| 00:06:41,161 | need to redeem this amount of collateral |
| 00:06:43,741 | four whoever's calling the liquidate |
| 00:06:45,900 | function right we need to redeem that |
| 00:06:47,460 | collateral and then we also need to burn |
| 00:06:49,381 | the DSC from this user as well so we |
| 00:06:52,261 | need to give them the collateral and |
| 00:06:54,361 | burn the DSC that they're covering with |
| 00:06:56,221 | their debt to cover |
| 00:07:01,021 | now though if we look at our redeemed |
| 00:07:03,060 | collateral in collateral |
| 00:07:06,420 | function which is public right now we |
| 00:07:08,579 | can see as inputs it takes |
| 00:07:11,221 | so in collateral address and amount |
| 00:07:12,900 | collateral right and it is hard-coded to |
| 00:07:15,480 | message.sender our third party user |
| 00:07:18,181 | isn't the one with the bad debt right we |
| 00:07:20,641 | need to redeem a random person's |
| 00:07:22,500 | collateral so what we can do is we can |
| 00:07:25,079 | refactor this code |
| 00:07:26,941 | so that there's an internal redeemed |
| 00:07:28,801 | collateral function that can redeem |
| 00:07:30,900 | collateral from anybody right and only |
| 00:07:33,601 | very permissioned functions can call |
| 00:07:36,000 | Redeemed collateral so what we're going |
| 00:07:38,400 | to do is actually we're going to take |
| 00:07:39,661 | all of this code |
| 00:07:41,161 | and we're going to change it and we're |
| 00:07:42,781 | going to delete it and we're going to |
| 00:07:43,920 | put it into a different function |
| 00:07:45,960 | all the way down the in private internal |
| 00:07:48,661 | functions here we're going to make a |
| 00:07:50,460 | function underscore redeem collateral |
| 00:07:55,381 | and this is going to be an internal |
| 00:07:56,701 | function where we can actually redeem |
| 00:07:58,201 | collateral from anybody and as input |
| 00:08:00,781 | this is going to take address token |
| 00:08:03,480 | collateral address same as the regular |
| 00:08:06,060 | redeem collateral also the unit 56 |
| 00:08:07,801 | amount collateral but we're going to add |
| 00:08:10,441 | address from and address to |
| 00:08:14,161 | so this way and this is going to be |
| 00:08:15,601 | private so this way somebody can |
| 00:08:18,601 | liquidate |
| 00:08:19,801 | and address from and then get the |
| 00:08:21,601 | rewards to and this is where I'm going |
| 00:08:23,701 | to paste all that code we got from above |
| 00:08:26,281 | and I think this looks good we're just |
| 00:08:29,161 | going to paste the code exactly like |
| 00:08:30,420 | this instead of doing message.cender |
| 00:08:33,420 | this is just going to be from and emit |
| 00:08:36,301 | collateral redeemed we're going to |
| 00:08:38,221 | update our collateral redeemed |
| 00:08:42,560 | to redeemed from |
| 00:08:45,841 | we'll do address redeem from address |
| 00:08:48,621 | redeemed to |
| 00:08:51,241 | we'll do the token and then we'll have a |
| 00:08:53,941 | mount not be indexed so from to token |
| 00:08:58,261 | and amount |
| 00:08:59,460 | so now we got to refactor some of these |
| 00:09:01,079 | collaterals so from |
| 00:09:03,361 | when we do just the regular redeem |
| 00:09:05,040 | collateral we'll update this in a minute |
| 00:09:06,900 | actually yeah we'll update that in a |
| 00:09:08,341 | minute so in this internal function it's |
| 00:09:10,441 | going to be from from |
| 00:09:12,960 | to address collateral |
| 00:09:16,201 | and then we're going to transfer we're |
| 00:09:18,420 | going to transfer the tokens to over the |
| 00:09:21,361 | two is so this is going to be like the |
| 00:09:22,861 | Liquidator Mount collateral and do that |
| 00:09:25,980 | and now we're going to use this internal |
| 00:09:27,661 | function up in our regular redeem |
| 00:09:29,641 | lateral function that we just created |
| 00:09:31,920 | right up here oh nope |
| 00:09:34,920 | this one up here we're going to dump all |
| 00:09:37,801 | this and just use this underscore redeem |
| 00:09:39,781 | collateral and for here we're just going |
| 00:09:42,301 | to say message dot sender so from |
| 00:09:44,641 | message to Sender to Mrs dot sender |
| 00:09:48,661 | token collateral address amount |
| 00:09:50,161 | collateral and now that we have this |
| 00:09:51,601 | internal function we can use this redeem |
| 00:09:53,641 | collateral bit |
| 00:09:55,021 | down in our liquid date which is down |
| 00:09:57,060 | here we can now just say redeem |
| 00:09:59,941 | collateral |
| 00:10:01,201 | from the user that's being liquidated so |
| 00:10:04,861 | from user to whoever's calling liquidate |
| 00:10:08,820 | here |
| 00:10:09,781 | so it's gonna be message dot sender |
| 00:10:12,420 | the collateral token |
| 00:10:14,460 | that we're liquidating |
| 00:10:16,201 | and then finally the total collateral to |
| 00:10:18,661 | redeem so this is why I said we were |
| 00:10:20,761 | going to do a little bit of refactoring |
| 00:10:22,079 | soon right we generally only want to |
| 00:10:25,381 | redeem collateral from into the same |
| 00:10:26,941 | person however when we're doing a |
| 00:10:29,161 | liquidate we're going to redeem to |
| 00:10:30,661 | whoever's calling the liquidate so |
| 00:10:32,641 | they're going to get that reward the |
| 00:10:34,441 | total collateral to redeem is that total |
| 00:10:36,601 | amount debt to cover plus some bonus |
| 00:10:38,761 | here and now we actually need to yeah we |
| 00:10:41,281 | need to burn the DSC now so right now if |
| 00:10:43,381 | we look up burn DSC we have this public |
| 00:10:46,320 | function which just does the same thing |
| 00:10:48,841 | it just does it just burns from |
| 00:10:50,579 | message.sender we're gonna have to do |
| 00:10:52,621 | the same here we're going to want to |
| 00:10:53,881 | make an internal burn DSC function that |
| 00:10:56,341 | allows us to burn from anybody right so |
| 00:10:59,281 | if we scroll down to where we're doing |
| 00:11:01,040 | those private functions or scroll up so |
| 00:11:05,101 | we have this internal redeem collateral |
| 00:11:07,201 | we also are going to need an internal |
| 00:11:09,361 | burn DSC it's a function I'm just going |
| 00:11:11,941 | to burn DSC unit 256 amount DSC to burn |
| 00:11:17,781 | address on B half of like whose DSC are |
| 00:11:24,000 | we burning for whose debt are we paying |
| 00:11:26,101 | down and then address DSC from where are |
| 00:11:29,820 | we getting the DSC from we have private |
| 00:11:32,161 | and we can go back to the burn DSC let's |
| 00:11:35,460 | burn DSC function right and same thing |
| 00:11:38,341 | we can just copy all of this go back to |
| 00:11:40,980 | our internal burn DSC function paste |
| 00:11:43,261 | this in here we're going to want to |
| 00:11:45,121 | update this right instead of |
| 00:11:46,320 | message.cender |
| 00:11:47,820 | this is going to be on be half of we're |
| 00:11:51,601 | going to bur we're going to take away |
| 00:11:53,941 | their debt we're still going to do this |
| 00:11:56,281 | but instead of message.sender it's going |
| 00:11:58,560 | to be BSC from and it's going to be |
| 00:12:01,500 | amount DSC to burn |
| 00:12:03,781 | this is still fine this just needs to be |
| 00:12:05,941 | a mount DSC to burn and we don't need to |
| 00:12:08,221 | check |
| 00:12:09,060 | Health Factor yet because this is going |
| 00:12:10,741 | to be our internal function so we might |
| 00:12:12,361 | even say like in the comments here |
| 00:12:15,500 | low level internal function |
| 00:12:18,781 | at Dev low-level internal function |
| 00:12:21,480 | do not call unless |
| 00:12:24,241 | the function calling it |
| 00:12:27,301 | is |
| 00:12:28,621 | checking for health factors being broken |
| 00:12:33,480 | so now we have this burn DSC we can go |
| 00:12:35,521 | back up to our burn DSC function we can |
| 00:12:38,579 | just swap delete all this |
| 00:12:40,861 | call burn DSC and this can be message |
| 00:12:43,500 | dot sender message dot sender amount |
| 00:12:46,801 | right if somebody calls burn DC |
| 00:12:48,661 | themselves great we'll just have them |
| 00:12:50,460 | call this burn DC amount to burn on |
| 00:12:53,040 | behalf of themselves from themselves |
| 00:12:54,721 | looks like I got this backwards amount |
| 00:12:56,579 | should be the first one |
| 00:12:57,960 | okay and now we have this burn DSC |
| 00:13:00,480 | function we can go down to liquidate and |
| 00:13:02,341 | we can call burn DSC |
| 00:13:04,079 | what are the uh |
| 00:13:06,060 | amount on behalf of from so the amount |
| 00:13:10,320 | is going to be this debt to cover amount |
| 00:13:13,341 | on behalf of is going to be the user and |
| 00:13:17,341 | the one who's going to be paying this is |
| 00:13:18,781 | going to be message.sender right because |
| 00:13:21,181 | it's the whoever's the Liquidator |
| 00:13:22,920 | whoever's calling liquidate is going to |
| 00:13:24,601 | be the one who's paying down the debt to |
| 00:13:27,181 | cover right paying back that minted DSC |
| 00:13:29,341 | and now since we're doing these internal |
| 00:13:31,381 | calls that don't have checks we |
| 00:13:32,941 | absolutely need to make sure we're |
| 00:13:34,381 | checking this health factor is okay |
| 00:13:36,540 | right so we're going to do U into two |
| 00:13:38,221 | for six ending user Health Factor equals |
| 00:13:42,000 | underscore health |
| 00:13:43,380 | factor of the user and if the ending |
| 00:13:47,221 | Health factor is less than or equal to |
| 00:13:50,341 | the starting Health Factor right if we |
| 00:13:52,560 | didn't improve the health Factor we |
| 00:13:54,361 | should revert DSC engine |
| 00:13:57,301 | underscore Health fact or not improved |
| 00:14:02,060 | copy this go to the top we'll do error |
| 00:14:06,841 | DSC engine Health Factor not approved go |
| 00:14:08,820 | back down |
| 00:14:09,900 | so if we don't improve the health Factor |
| 00:14:12,540 | we should 100 revert and then also |
| 00:14:16,681 | if calling this liquidate function is |
| 00:14:19,261 | paying down some debt and doing all this |
| 00:14:20,941 | stuff actually hurts the Liquidators |
| 00:14:23,641 | Health Factor we should also revert |
| 00:14:25,380 | right so we should also call revert if |
| 00:14:27,540 | Health factor is broken for |
| 00:14:29,460 | the message I sender right if this |
| 00:14:31,261 | process ruined their health Factor we |
| 00:14:33,301 | shouldn't let them do this okay so we're |
| 00:14:36,361 | following checks effects interactions |
| 00:14:37,980 | here |
| 00:14:38,761 | the most part |
| 00:14:40,641 | these two |
| 00:14:42,841 | functions are making external calls to |
| 00:14:45,060 | external contracts right and then we're |
| 00:14:47,161 | doing kind of like a check afterwards |
| 00:14:48,900 | again this is a bit of a trade-off we |
| 00:14:50,701 | could calculate before and then run this |
| 00:14:52,980 | but that's kind of gas inefficient we're |
| 00:14:56,761 | just going to check after we do all this |
| 00:14:58,500 | hey just make sure that the health |
| 00:15:00,241 | factor is okay make sure that we didn't |
| 00:15:03,301 | break anyone's Health Factor so now we |
| 00:15:05,701 | have this liquidation function which is |
| 00:15:07,441 | incredibly powerful and kind of what |
| 00:15:09,301 | ties this whole thing together right |
| 00:15:10,920 | there's an incentive here for people to |
| 00:15:13,261 | call liquidate so that our protocol is |
| 00:15:16,560 | never insolvent right and I know I've |
| 00:15:18,121 | been kind of throwing around a lot of |
| 00:15:19,201 | these financial terms but our protocol |
| 00:15:21,420 | always has more collateral than it has |
| 00:15:24,900 | minted DSE the value of the collateral |
| 00:15:27,181 | should always be more than the minted |
| 00:15:29,880 | DSC always incredibly powerful function |
| 00:15:32,521 | we're obviously going to be testing the |
| 00:15:34,021 | living hell out of this right because we |
| 00:15:35,521 | want to make sure it actually works oh |
| 00:15:38,761 | what do we need now well it looks like |
| 00:15:41,161 | we broke some stuff oh this needs a |
| 00:15:43,621 | semicolon what else do we break there's |
| 00:15:45,661 | a little red thing down here let's go |
| 00:15:47,221 | fix it amount this should be a mount do |
| 00:15:49,920 | you see to burn got a couple more red |
| 00:15:52,201 | things |
| 00:15:53,221 | redeem collateral user message Ascender |
| 00:15:55,741 | redeem collateral uh oops we did these |
| 00:15:58,980 | backwards I'm going to copy these put |
| 00:16:02,101 | these at the front |
| 00:16:03,721 | okay oh looks like that fixed pretty |
| 00:16:06,480 | much most of this I don't see any more |
| 00:16:08,281 | red stuff on the side here so we're |
| 00:16:10,681 | going to go ahead and run Forge build |
| 00:16:12,480 | make sure everything's at least |
| 00:16:13,801 | compiling |
| 00:16:16,741 | awesome maybe we'll even run Forge test |
| 00:16:18,661 | I don't think this would have broken any |
| 00:16:20,221 | tests looks like those are working fine |
| 00:16:22,500 | but all right we're doing some fantastic |
| 00:16:24,361 | work and like I said |
| 00:16:29,281 | at this point I probably would be |
| 00:16:31,079 | running tests with this but we're almost |
| 00:16:32,880 | done with all of our code here so we're |
| 00:16:34,861 | just going to keep going right and this |
| 00:16:36,480 | code's starting to look pretty darn good |
| 00:16:37,681 | right we've got these amazing Nat spec |
| 00:16:40,320 | comments in here we've got comments all |
| 00:16:41,941 | over the place maybe these probably |
| 00:16:43,681 | should be cleaned up a little bit but |
| 00:16:44,941 | that's fine |
| 00:16:46,079 | we've got a little this little Dev thing |
| 00:16:48,060 | a shout out saying hey don't let anybody |
| 00:16:49,980 | call burn DSC without checking the |
| 00:16:52,500 | health Factor right this is really good |
| 00:16:54,241 | to tell Auditors and Security |
| 00:16:55,681 | Professionals about this right it's |
| 00:16:57,540 | really good to call this out we've now |
| 00:16:59,579 | have this internal redeemed collateral |
| 00:17:01,079 | function so it can be used for the |
| 00:17:02,221 | liquidate or the redeemed collateral |
| 00:17:03,721 | Health Factor it looks like pretty much |
| 00:17:06,181 | all the functions that we originally |
| 00:17:08,221 | wrote are working in here right and the |
| 00:17:11,579 | reason again that this all works is |
| 00:17:13,560 | because |
| 00:17:14,460 | we meant DSC we can only mint as much as |
| 00:17:18,241 | we have collateral in the system we're |
| 00:17:20,281 | setting this exchange rate essentially |
| 00:17:22,261 | for our protocol hey cool you have 100 |
| 00:17:24,781 | you have 150 worth of eth deposited |
| 00:17:27,661 | great you can mint 100 worth of DSC |
| 00:17:31,741 | so it's this exchange rate that we're |
| 00:17:33,361 | setting which is maintaining the price |
| 00:17:35,641 | let's just double check that we have |
| 00:17:37,201 | kind of most of the functions that we |
| 00:17:38,460 | want here and let's also check that |
| 00:17:40,500 | they're in the right place |
| 00:17:42,000 | so we go to the top here |
| 00:17:44,221 | got a whole bunch of Errors that's great |
| 00:17:46,621 | got a whole bunch of constants because |
| 00:17:48,000 | we hate magic numbers we have a mapping |
| 00:17:50,400 | of price feeds a mapping of collateral |
| 00:17:52,801 | deposited from user to token to the |
| 00:17:54,900 | amount they have deposited we have their |
| 00:17:57,181 | debt or their DSC minted collateral |
| 00:18:00,060 | Tokens The idsc Token we've got some |
| 00:18:03,181 | events in here |
| 00:18:04,861 | a couple modifiers some functions |
| 00:18:08,400 | we've got a way to deposit collateral |
| 00:18:10,861 | and mint DSC in one transaction we've |
| 00:18:14,221 | got a way to calculate health Factor I'm |
| 00:18:15,960 | going to tell you right now |
| 00:18:17,221 | there's actually a bug in here oh I'm |
| 00:18:19,920 | not going to tell you what that bug is |
| 00:18:21,000 | yet though |
| 00:18:22,321 | maybe you can figure it out we've got |
| 00:18:24,361 | some view functions down below we're |
| 00:18:26,161 | probably going to add more as we write |
| 00:18:27,601 | tests |
| 00:18:28,621 | but this is looking pretty darn good now |
| 00:18:32,521 | like I said there's at least one big bug |
| 00:18:34,560 | in there might even be and there's |
| 00:18:36,000 | likely more but there's at least one big |
| 00:18:37,621 | bug in here |
| 00:18:38,761 | so now would be a good time to take a |
| 00:18:40,801 | break because after this we're going to |
| 00:18:43,500 | go deep into writing tests or this |
| 00:18:46,621 | protocol we're going to write some new |
| 00:18:48,480 | tests and we're going to show you some |
| 00:18:49,920 | really Advanced testing methodologies |
| 00:18:52,621 | so take that break go for a walk |
| 00:18:55,500 | and I'll see you in a few |
| 00:19:11,101 | all right so let's pull up our terminal |
| 00:19:12,480 | here Forge |
| 00:19:15,601 | coverage |
| 00:19:24,181 | oh we got some work to do |
| 00:19:26,400 | all right well no time like the present |
| 00:19:28,681 | let's get into it so we have some price |
| 00:19:31,441 | feed tests over here we probably also |
| 00:19:34,021 | want to set up some constructed tests |
| 00:19:35,701 | right we want to make sure that stuff is |
| 00:19:37,441 | being initialized correctly so let's |
| 00:19:39,361 | copy that we'll do con |
| 00:19:41,761 | structure structure tests like that |
| 00:19:45,601 | we'll fix this or ADHD doesn't go crazy |
| 00:19:48,781 | and we'll do |
| 00:19:50,161 | function |
| 00:19:51,601 | test |
| 00:19:52,920 | something what are we testing let's go |
| 00:19:55,861 | down to the instructor here and what |
| 00:19:58,261 | should we be testing okay well we're |
| 00:19:59,761 | doing this revert here so we should make |
| 00:20:01,801 | sure we actually are reverting correctly |
| 00:20:03,661 | when the lengths aren't the same so |
| 00:20:06,121 | function test reverts if token length |
| 00:20:10,441 | doesn't match price feeds feeds |
| 00:20:16,201 | public zoom in zoom in we're going to be |
| 00:20:20,161 | in here a while so function like this |
| 00:20:23,161 | and we're going to do we're going to |
| 00:20:25,681 | create some address arrays address array |
| 00:20:29,460 | public token addresses |
| 00:20:32,101 | address array |
| 00:20:34,580 | public price price |
| 00:20:37,920 | feed |
| 00:20:39,181 | Andra says |
| 00:20:41,221 | we're gonna say token addresses dot push |
| 00:20:43,861 | we're going to push weft into here |
| 00:20:46,080 | feed |
| 00:20:47,181 | addresses add dot push FUSD |
| 00:20:52,380 | price feed and we're going to push 2 in |
| 00:20:54,361 | here oh cool BTC do we have I guess we |
| 00:20:58,500 | should pull BTC USD price feed let's get |
| 00:21:02,701 | this too so |
| 00:21:04,441 | FUSD BTC USD price feed okay |
| 00:21:08,761 | oops price feed addresses price feed |
| 00:21:10,920 | addresses so we'll push the two of those |
| 00:21:12,361 | in there now we'll do VM dot expect |
| 00:21:17,060 | revert DSC engine |
| 00:21:20,641 | dot what's the name of the error let me |
| 00:21:23,221 | copy this |
| 00:21:24,960 | boom dot select door selector like that |
| 00:21:28,621 | doing some toggle word wrap now expect |
| 00:21:31,021 | reverts now we call |
| 00:21:33,781 | a new DSC engine |
| 00:21:36,540 | with the token addresses and the price |
| 00:21:39,121 | feed addresses oh what else goes in the |
| 00:21:41,761 | DSE oh we also need the address DSC |
| 00:21:44,761 | right address DSC so this should revert |
| 00:21:48,060 | let's see orig test Dash m |
| 00:21:54,900 | M nice okay that's passing all right |
| 00:21:56,941 | cool price feed tests we're testing |
| 00:21:59,221 | getting the USD value |
| 00:22:01,980 | I think we had another one down here |
| 00:22:03,960 | right we had something like get |
| 00:22:06,540 | token amount from USD we sure did this |
| 00:22:09,841 | is a public view so let's test this one |
| 00:22:12,060 | as well |
| 00:22:13,201 | do function tests and I usually just |
| 00:22:16,261 | like to paste the function names |
| 00:22:17,521 | especially when they're like this |
| 00:22:19,801 | public |
| 00:22:22,141 | so we're going to do basically the |
| 00:22:23,641 | opposite of this this got the USD value |
| 00:22:25,980 | of some ether Mount we're going to do |
| 00:22:27,900 | un256 |
| 00:22:30,781 | USD amount right equals let's say 100 |
| 00:22:34,681 | eighth 100 ether and then unit 256. |
| 00:22:38,781 | expected |
| 00:22:40,380 | West do a little bit of math here if we |
| 00:22:42,960 | have if it's two thousand dollars per |
| 00:22:46,261 | eth and we have |
| 00:22:48,480 | 100 we're gonna do a hundred divided by |
| 00:22:51,241 | two thousand so 100 divided by 2 000 |
| 00:22:54,380 | 0.05 so we can say expected weft is 0.05 |
| 00:22:57,900 | ether now we'll do U into two for six |
| 00:23:00,540 | actual weft equals dsce dot this |
| 00:23:05,580 | function with the lowercase pass in West |
| 00:23:08,221 | and then the USD amount assert equal |
| 00:23:13,341 | expected X |
| 00:23:16,261 | expected width and the actual width the |
| 00:23:18,721 | two of them should be the same Let's |
| 00:23:20,341 | test it out Forge test Dash m |
| 00:23:26,880 | nice that pass all right let's keep |
| 00:23:29,040 | going posit collateral tests test revert |
| 00:23:32,400 | of collateral zero that's good |
| 00:23:34,681 | what else let's go to this deposit |
| 00:23:36,601 | collateral deposit collateral |
| 00:23:40,560 | function |
| 00:23:41,821 | okay we should also revert here we're |
| 00:23:44,161 | basically just going to go through this |
| 00:23:45,540 | whole function and kind of test each |
| 00:23:47,460 | line we just tested this one Let's test |
| 00:23:49,560 | this one so this will be something like |
| 00:23:51,601 | function |
| 00:23:53,221 | test reverts with unapproved |
| 00:23:57,301 | collateral |
| 00:24:00,021 | public we'll make an erc20 mock some |
| 00:24:04,021 | Rand token right we'll just make some |
| 00:24:06,241 | silly token new erc20 Mach ran will be |
| 00:24:10,980 | the name ran |
| 00:24:12,841 | will be the token we have a user in here |
| 00:24:16,380 | I think we do have a user right okay |
| 00:24:17,821 | yeah we do have a user |
| 00:24:19,681 | let's give this money to a user and then |
| 00:24:23,101 | we'll give them some starting amount |
| 00:24:25,201 | I think we have |
| 00:24:26,580 | starting erc20 balance or Mount |
| 00:24:29,701 | collateral yeah we'll do a mount |
| 00:24:30,900 | collateral give them the amount |
| 00:24:32,580 | collateral we'll do VM Dot |
| 00:24:35,400 | start prank this user who has this token |
| 00:24:38,960 | and they're going to try to deposit this |
| 00:24:41,641 | collateral and we're going to expect it |
| 00:24:43,321 | to revert so VM dot expect |
| 00:24:46,400 | revert and this error here is allowed |
| 00:24:51,480 | token right now doesn't |
| 00:24:54,060 | take any parameters |
| 00:24:56,161 | so that's easy enough for us let's just |
| 00:24:58,741 | copy this we'll do |
| 00:25:00,861 | DSC engine |
| 00:25:02,841 | dot this dot selector |
| 00:25:06,000 | and then we'll do we'll call the deposit |
| 00:25:08,641 | collateral so d s c e dot deposit |
| 00:25:11,821 | collateral address of that Rand token |
| 00:25:14,761 | right brand token or random token we'll |
| 00:25:17,161 | do a mount collateral as well so it'll |
| 00:25:19,021 | just be that whole amount |
| 00:25:20,880 | and then we can do vm.stop Rank and that |
| 00:25:23,880 | should |
| 00:25:24,781 | work Forge test Dash m |
| 00:25:29,161 | see if that's correct |
| 00:25:32,400 | yep looking good all right let's keep |
| 00:25:34,141 | going what else what's next deposit |
| 00:25:36,960 | collateral not that one okay did this |
| 00:25:38,941 | did this non-reentrant we could be go |
| 00:25:41,821 | ahead and test reentrant I'm going to |
| 00:25:43,321 | skip doing that for now but we probably |
| 00:25:44,941 | do want to do some re-entricity tests at |
| 00:25:46,861 | some point |
| 00:25:47,941 | but yeah I'm going to skip them for now |
| 00:25:49,560 | and all right cool so then we can start |
| 00:25:52,021 | testing some of this so if they deposit |
| 00:25:54,781 | collateral we should see that they |
| 00:25:57,241 | actually do this we should see that they |
| 00:25:59,341 | emit an event let's go ahead and do that |
| 00:26:01,861 | so let's do function |
| 00:26:04,261 | test |
| 00:26:05,400 | can |
| 00:26:06,900 | pause it collateral |
| 00:26:09,741 | lateral and get account info because |
| 00:26:15,060 | once they deposit we have this get |
| 00:26:17,880 | accounts info |
| 00:26:19,920 | oh it's private right now |
| 00:26:22,021 | so let's actually go to the bottom let's |
| 00:26:23,521 | create a public version of that so we'll |
| 00:26:25,681 | do function get account in for animation |
| 00:26:31,801 | this will be external |
| 00:26:34,080 | external View |
| 00:26:36,060 | turns |
| 00:26:37,500 | I'll return this account address user |
| 00:26:41,641 | returns these two I'm going to copy this |
| 00:26:43,380 | go back down |
| 00:26:45,480 | uh external view returns |
| 00:26:50,641 | these two things |
| 00:26:52,021 | and we're going to say |
| 00:26:53,941 | total DSC minted comma |
| 00:26:56,460 | bladder value in usdc equals this |
| 00:26:59,040 | internal function and that should be |
| 00:27:01,621 | good right oh we're going to do instead |
| 00:27:04,441 | of message.sender we'll do address |
| 00:27:06,661 | user this paste the user in here so now |
| 00:27:10,621 | we can get the total DSC minted and |
| 00:27:12,241 | their collateral value in USD from an |
| 00:27:14,101 | external view function |
| 00:27:15,781 | we should be able to get that |
| 00:27:16,980 | information |
| 00:27:17,941 | so |
| 00:27:19,080 | let's have them actually deposit |
| 00:27:20,761 | collateral in here |
| 00:27:22,261 | and since we're going to be doing a lot |
| 00:27:23,821 | of deposited collaterals we know we can |
| 00:27:25,621 | actually make a modifier called the |
| 00:27:28,161 | posited collateral |
| 00:27:31,681 | this |
| 00:27:32,761 | BMW start prank |
| 00:27:35,641 | user |
| 00:27:37,621 | you'll see 20 mock |
| 00:27:40,021 | Wes in order to deposit West we need to |
| 00:27:42,241 | approve |
| 00:27:43,201 | address the SCE comma amount collateral |
| 00:27:49,380 | we're going to do |
| 00:27:51,080 | dsce.deposit collateral width amount |
| 00:27:53,761 | collateral |
| 00:27:54,781 | beam does stop prank beam desktop prank |
| 00:27:58,560 | I'll just go like this mod if fire |
| 00:28:02,341 | right and we'll have this can deposit |
| 00:28:05,281 | collateral and get account info we'll |
| 00:28:06,781 | have them deposit collateral and we'll |
| 00:28:09,181 | now get that account information so |
| 00:28:11,221 | we'll say you want to 256 |
| 00:28:13,801 | total DSC minted un256 collateral |
| 00:28:19,580 | lateral value in USD equals dsce dot |
| 00:28:25,080 | gets account information in the user oh |
| 00:28:30,241 | from the user and now we're going to say |
| 00:28:33,540 | we're going to make sure these two |
| 00:28:35,580 | numbers are correct the total DSC minted |
| 00:28:38,040 | and the collateral value in USD they |
| 00:28:40,321 | should have minted no DSC so even 256 |
| 00:28:43,080 | expected expected |
| 00:28:46,021 | total BSC minted yep equals zero un256 |
| 00:28:50,941 | expected |
| 00:28:53,181 | colateral value in USD equals this is |
| 00:28:57,540 | going to be that dsce dot get token |
| 00:29:01,441 | amount from USD weft lateral value in |
| 00:29:07,201 | USD |
| 00:29:08,701 | so expect a collateral value should just |
| 00:29:11,040 | be this function then we can say assert |
| 00:29:13,500 | equal |
| 00:29:15,480 | DSC minted should be this expected total |
| 00:29:18,721 | due cemented and then we can do assert |
| 00:29:20,641 | equal |
| 00:29:21,960 | lateral value in USD it's going to be |
| 00:29:24,181 | this expected collateral value in USD |
| 00:29:26,460 | all right clear Orange |
| 00:29:29,761 | test Dash m |
| 00:29:35,460 | or we have a fail you know what to do |
| 00:29:37,021 | we're going to run it again Dash evv see |
| 00:29:40,021 | what we messed up here |
| 00:29:45,900 | says the assertion failed |
| 00:29:48,181 | left is this number and right is a much |
| 00:29:51,960 | smaller number this is why it's not cool |
| 00:29:54,121 | to do two types of asserts but I know |
| 00:29:56,101 | it's the second one so we're saying the |
| 00:29:57,420 | collateral value in USD is this with the |
| 00:29:59,880 | right side |
| 00:30:01,321 | is expected collateral value is going to |
| 00:30:03,721 | be this so let's see what's wrong here |
| 00:30:05,580 | one two three four five six seven eight |
| 00:30:07,621 | nine ten one two three four five six |
| 00:30:09,480 | seven eight so it's saying |
| 00:30:12,721 | collateral value in USD is 20 grand does |
| 00:30:15,301 | that make sense |
| 00:30:16,500 | well it's 10 ether |
| 00:30:18,900 | times two thousand dollars |
| 00:30:21,441 | equals 20 grand right so that is so the |
| 00:30:27,781 | collateral value USD is right it looks |
| 00:30:29,701 | like my right is wrong collateral |
| 00:30:32,821 | expect the collateral value news D do |
| 00:30:35,161 | you see that from token amount with oh |
| 00:30:37,861 | what the heck why am I doing that one |
| 00:30:39,960 | two three four five six seven eight nine |
| 00:30:41,400 | ten one two three four five six seven |
| 00:30:43,321 | eight so it's saying that twenty |
| 00:30:47,580 | thousand dollars is equal to ten eth so |
| 00:30:50,761 | I don't know why I'm calling this |
| 00:30:52,500 | oh this is actually expected |
| 00:30:55,141 | expected deposit amount and we shouldn't |
| 00:30:59,281 | be comparing these two |
| 00:31:01,080 | this should be compared to the amount |
| 00:31:03,841 | collateral right so 10 is how much |
| 00:31:06,420 | collateral we're putting in here |
| 00:31:08,101 | and then |
| 00:31:09,661 | lateral value in USD yeah that's correct |
| 00:31:12,601 | so we're getting we're using this |
| 00:31:14,040 | collateral value in USD to get the |
| 00:31:15,480 | expected positive amount that looks more |
| 00:31:18,301 | correct okay cool Forge test Dash m |
| 00:31:23,040 | and this is one of the kind of weird |
| 00:31:25,080 | Parts about writing tests right okay |
| 00:31:27,000 | cool we fixed it sometimes your test is |
| 00:31:29,341 | wrong |
| 00:31:30,121 | like what we just showed here I wrote my |
| 00:31:31,801 | test wrong but sometimes your code is |
| 00:31:34,500 | wrong and that's what these tests really |
| 00:31:36,420 | should be testing hey when is the code |
| 00:31:38,101 | actually wrong we're making some |
| 00:31:39,781 | progress Forge coverage |
| 00:31:48,000 | not a whole lot of great coverage here |
| 00:31:49,321 | let's keep going so instead of me just |
| 00:31:52,380 | kind of walking you through the rest of |
| 00:31:54,661 | these tests you know how to write these |
| 00:31:57,420 | tests in this file I'm not really going |
| 00:31:59,941 | to show you any more unique tests right |
| 00:32:02,761 | but like I said there is at least one |
| 00:32:04,980 | glaring issue in our DSC |
| 00:32:08,480 | engine.soul there's a big issue in here |
| 00:32:10,560 | right we definitely need some more |
| 00:32:12,060 | getter functions as well so write getter |
| 00:32:13,920 | functions as you test but there's at |
| 00:32:15,960 | least one giant issue so what I'm going |
| 00:32:18,420 | to do now is instead of me literally |
| 00:32:20,521 | walking you through the rest of these |
| 00:32:22,261 | tests I mean it's you can see all the |
| 00:32:24,960 | tests in here because I'm going to |
| 00:32:26,281 | challenge you to write these tests |
| 00:32:28,141 | yourself |
| 00:32:28,980 | to get this Forge coverage up remember |
| 00:32:32,341 | you can do Forge coverage to obviously |
| 00:32:35,101 | see what's going on we're focusing on |
| 00:32:37,560 | this one right now you can also do Forge |
| 00:32:40,500 | coverage dash dash report to see dash |
| 00:32:44,221 | dash report debug |
| 00:32:46,321 | to actually see the exact lines that are |
| 00:32:48,841 | missing right and all these things are |
| 00:32:50,880 | just kind of line items line items |
| 00:32:52,920 | whatever I see doesn't matter scroll |
| 00:32:55,021 | scroll scroll scroll okay these are the |
| 00:32:57,060 | ones that are actually issues right what |
| 00:32:59,941 | which one's this oh That's essential |
| 00:33:01,980 | that is the decentralized stable coin we |
| 00:33:03,721 | want to write tests for that as well but |
| 00:33:05,580 | let's just focus on this massive list up |
| 00:33:08,400 | here DSC engine focus on this list and |
| 00:33:11,281 | write some tests for this because yeah |
| 00:33:13,261 | the rest of these unit tests or staging |
| 00:33:15,721 | tests we're not going to learn anything |
| 00:33:17,701 | new this is just one of these things |
| 00:33:19,621 | that you got to do that you got to get |
| 00:33:21,721 | good at that you got to write now you |
| 00:33:23,460 | don't have to get it to 100 if you get |
| 00:33:25,741 | it to like 85 90 that's pretty good some |
| 00:33:29,161 | of these tests are actually very |
| 00:33:30,661 | difficult to write but you should |
| 00:33:33,601 | writing these tests should find a |
| 00:33:35,641 | glaring bug in at least one of these |
| 00:33:38,821 | functions and maybe if you find more |
| 00:33:41,040 | than one glaring bug that's great make a |
| 00:33:43,441 | PR make an issue to the repo but I want |
| 00:33:46,141 | you to pause the video and take some |
| 00:33:48,781 | time right it might be an hour it might |
| 00:33:50,521 | be two hours it might be 30 minutes |
| 00:33:51,781 | right it depends on how quick your AI |
| 00:33:53,400 | buddy is how quick you are and write |
| 00:33:55,980 | some more tests and sometimes actually |
| 00:33:58,321 | you can even come to your contracts and |
| 00:34:00,960 | you could do something like grab this |
| 00:34:02,761 | go over to your chat gttptpt and say hey |
| 00:34:05,661 | this is one of my solidity functions can |
| 00:34:10,021 | you write some tests for it or it in |
| 00:34:14,400 | Foundry and because it doesn't know what |
| 00:34:17,221 | Foundry is it's going to totally |
| 00:34:19,021 | Funk it up but you could use Chacha BT |
| 00:34:21,601 | to help you write some tests as well |
| 00:34:22,741 | help you get your coverage up but |
| 00:34:24,601 | there's definitely one major issue in |
| 00:34:26,641 | here you might even need to go back and |
| 00:34:28,560 | refactor some code right I'm going to |
| 00:34:30,900 | say keep that to a minimum though but |
| 00:34:32,580 | there are some spots where maybe you |
| 00:34:34,321 | need to refactor your code to make |
| 00:34:36,480 | writing tests easier maybe you need to |
| 00:34:38,341 | write some more helper functions right |
| 00:34:39,540 | take this time to experiment and tinker |
| 00:34:42,241 | and think what should I do how can I |
| 00:34:45,420 | make sure my code is safe and |
| 00:34:48,121 | importantly how can I write enough tests |
| 00:34:50,641 | to find this bug that Patrick is talking |
| 00:34:52,380 | about right |
| 00:34:53,701 | so maybe you do some refactoring now |
| 00:34:55,861 | don't write any fuzz tests yet we are |
| 00:34:57,661 | going to go over fuzz tests in a little |
| 00:34:58,981 | bit but yeah just try to write the rest |
| 00:35:00,661 | of these unit tests rest these pseudo |
| 00:35:02,460 | integration tests and I'll see you when |
| 00:35:04,500 | you come out the other side but when you |
| 00:35:06,060 | finish writing the tests take a break |
| 00:35:08,761 | take a minute I want this to sink in |
| 00:35:11,761 | this is one this is the most advanced |
| 00:35:14,540 | lesson that you're going to take in this |
| 00:35:17,221 | course and to be honest probably it's |
| 00:35:19,621 | going to be one of the most advanced |
| 00:35:20,641 | courses you'll ever take in solidity |
| 00:35:22,201 | okay so I want you to take your time |
| 00:35:24,361 | with this I want you to understand |
| 00:35:25,920 | what's going on sometimes it might even |
| 00:35:28,321 | make sense for you to go oh well what |
| 00:35:29,821 | does maker Dow do how can I learn more |
| 00:35:32,101 | about stable coins where else can I go |
| 00:35:34,201 | maybe I can ask chat gbt for questions |
| 00:35:36,901 | right those you who are going ah I |
| 00:35:39,661 | really don't want to do that you can 100 |
| 00:35:41,341 | just copy paste mine but I recommend you |
| 00:35:44,701 | go through this exercise |
| 00:35:47,460 | okay |
| 00:35:48,841 | block off some time and I'll see you |
| 00:35:51,121 | soon |
| 00:36:06,181 | all right welcome back did you find the |
| 00:36:08,580 | bug how are your tests looking if you |
| 00:36:11,101 | run Forge coverage it looks something at |
| 00:36:14,101 | least like this does it look better do |
| 00:36:16,681 | the worse |
| 00:36:17,761 | so I copy pasted a whole bunch of my |
| 00:36:19,681 | tests and we're looking pretty good here |
| 00:36:21,920 | we definitely should be increasing the |
| 00:36:24,241 | test coverage of our branches and we can |
| 00:36:26,221 | definitely get these a little bit higher |
| 00:36:27,901 | but for at least the DSC engine |
| 00:36:30,301 | we have a much better code coverage |
| 00:36:32,341 | going on here |
| 00:36:33,661 | and I hope your code coverage looks like |
| 00:36:35,101 | looks like this too now additionally I |
| 00:36:37,500 | did a little bit of refactoring writing |
| 00:36:39,241 | these codes |
| 00:36:40,201 | one of the main things that I added was |
| 00:36:42,181 | I added this calculate health Factor |
| 00:36:44,701 | function |
| 00:36:45,601 | reason I added this calculate health |
| 00:36:47,281 | Factor internal function was so that I |
| 00:36:50,221 | could have this public calculated Health |
| 00:36:52,261 | Factor function and then in my tests |
| 00:36:54,121 | what I could do is have an expected |
| 00:36:56,401 | Health Factor |
| 00:36:57,841 | in that way when |
| 00:36:59,761 | a function breaks Health factor and I |
| 00:37:02,460 | can pass it into the expected Health |
| 00:37:04,261 | Factor error revert here in one of my |
| 00:37:06,960 | tests right when we're testing to expect |
| 00:37:09,000 | an event I added this new function to do |
| 00:37:11,821 | that and having a public function like |
| 00:37:14,101 | calculate health Factor might make it |
| 00:37:16,021 | easier for people to |
| 00:37:17,641 | see what their health Factor might be if |
| 00:37:19,861 | they make some change right so that was |
| 00:37:21,601 | one of the big ones I made and the bug |
| 00:37:23,701 | was in the health Factor as well or at |
| 00:37:27,060 | least the bug that I planned to be in |
| 00:37:29,101 | there so in my calculated Health factor |
| 00:37:31,380 | which instead of |
| 00:37:33,901 | in our underscore health |
| 00:37:35,880 | Factor function I'm just calling this |
| 00:37:38,880 | calculate health Factor function right |
| 00:37:40,441 | I'm getting the account information and |
| 00:37:41,941 | then just passing it to this calculated |
| 00:37:43,261 | Health factor and in this we needed to |
| 00:37:46,021 | add a checker for if the total DSC |
| 00:37:48,841 | minted was zero and if it's zero then we |
| 00:37:52,141 | said okay cool your health factor is |
| 00:37:53,701 | going to be the max U into 56 or |
| 00:37:55,380 | something like that right and the reason |
| 00:37:57,060 | that we need this is |
| 00:37:59,040 | if someone deposits a ton of collateral |
| 00:38:01,080 | but has no DSC minted well their health |
| 00:38:04,801 | factor is going to divide by zero which |
| 00:38:07,741 | we can't have so calculating someone's |
| 00:38:09,721 | Health Factor after the deposit |
| 00:38:11,101 | collateral would result in an issue we'd |
| 00:38:13,380 | Break Stuff we don't want to break stuff |
| 00:38:15,481 | and then the final piece that I did was |
| 00:38:17,880 | I added a ton of external view functions |
| 00:38:21,241 | just to make it easier to read and |
| 00:38:22,920 | interact with this protocol so those are |
| 00:38:25,621 | some of the refactors that I did and |
| 00:38:27,241 | then obviously we added a ton of tests |
| 00:38:29,040 | there's nothing really new in here |
| 00:38:31,500 | it's just you gotta write the test right |
| 00:38:34,141 | everything in here you've learned you |
