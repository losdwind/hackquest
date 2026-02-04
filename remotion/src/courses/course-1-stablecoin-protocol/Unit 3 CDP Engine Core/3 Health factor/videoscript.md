# 3 Health factor

> Calculating health factor and minimum collateral ratio using LIQUIDATION_THRESHOLD and handling precision.

| Timestamp | Content |
| :--- | :--- |
| 00:00:00,000 | is where sometimes you'll see CEI be |
| 00:00:02,340 | violated when I need to check something |
| 00:00:04,199 | after a token transfers happen sometimes |
| 00:00:07,199 | you'll see this CEI be violated a little |
| 00:00:09,659 | bit and what you could do is you could |
| 00:00:12,659 | do like calculate health Factor after |
| 00:00:16,860 | and then like simulate it but a lot of |
| 00:00:19,860 | people choose to not do this because |
| 00:00:21,058 | this is really gas inefficient so what a |
| 00:00:23,520 | lot of people do is they just go ahead |
| 00:00:25,199 | with the doing the token transfer first |
| 00:00:27,840 | and then checking this and reverting if |
| 00:00:31,558 | this happens and that's usually fine |
| 00:00:34,138 | though because we're going to revert the |
| 00:00:36,780 | transaction if it's bad right so what |
| 00:00:39,239 | we'll do is we'll do this token transfer |
| 00:00:41,280 | and then we'll make sure the health |
| 00:00:42,479 | factor is okay so you know how to move |
| 00:00:44,760 | to tokens around so we'll say bull |
| 00:00:46,319 | success |
| 00:00:47,280 | equals irsr20 |
| 00:00:49,739 | looking collateral |
| 00:00:51,739 | address dot we can just do transfer |
| 00:00:54,780 | instead of transfer from since |
| 00:00:57,000 | transfer is when you transfer from |
| 00:00:59,039 | yourself transfer from is when you |
| 00:01:00,840 | transfer from somebody else |
| 00:01:02,579 | so dot transfer and we're going to be |
| 00:01:05,159 | sending it to message.cender and we're |
| 00:01:08,099 | going to send amount collateral and then |
| 00:01:10,379 | if not success if if not success we're |
| 00:01:14,039 | just going to go ahead and revert DSC |
| 00:01:16,500 | engine we'll just do |
| 00:01:18,799 | transfer failed like this and then we |
| 00:01:22,920 | want to make sure that the health Factor |
| 00:01:25,199 | isn't broken and we have written a |
| 00:01:27,360 | function that does that already |
| 00:01:29,579 | called revert if Health factor is broken |
| 00:01:31,860 | so we can just grab this go back up to |
| 00:01:34,979 | our redeem and just do revertive Health |
| 00:01:36,899 | factors broken for the message dot |
| 00:01:39,000 | sender |
| 00:01:40,260 | okay cool like I said we're going to |
| 00:01:42,058 | refactor this very soon okay but it |
| 00:01:44,879 | looks like this is actually pretty good |
| 00:01:46,739 | for redeeming collateral now this |
| 00:01:49,979 | revertive health factor is broken is a |
| 00:01:51,959 | little bit Troublesome with just this |
| 00:01:54,058 | raw redeemed collateral let's say I put |
| 00:01:55,799 | 100 in and then I mint let's say 20 |
| 00:01:59,218 | worth of DSC about 100 worth of Ethan |
| 00:02:02,218 | and I mint 20 worth of DSC let's say I'm |
| 00:02:05,399 | done like I want to burn all my DSC and |
| 00:02:08,099 | I want to withdraw all of my eth well |
| 00:02:11,218 | if I try to redeem all my eth it'll |
| 00:02:13,379 | break right it'll break my health Factor |
| 00:02:15,360 | well what I need to do first is I need |
| 00:02:18,420 | to First burn back my DSC and then I |
| 00:02:22,679 | need to redeem Eve so it's a kind of |
| 00:02:25,319 | this two transaction process here |
| 00:02:27,718 | just kind of stinks so let's turn it |
| 00:02:29,760 | into a one transaction process so we're |
| 00:02:31,739 | going to combine redeeming or collateral |
| 00:02:34,079 | with also burning your DSC which means |
| 00:02:37,500 | we're going to need to create a burn DSC |
| 00:02:39,299 | function and we're also going to |
| 00:02:40,860 | refactor this in a little bit but |
| 00:02:43,379 | I'm just going to write it as if this is |
| 00:02:45,119 | the only burn DSC function for now so |
| 00:02:48,299 | let's have people burn their DSC right |
| 00:02:51,000 | this is when they |
| 00:02:52,260 | they say hey I'm done with these tokens |
| 00:02:54,840 | and this will reduce that if we scroll |
| 00:02:57,780 | up to the top we have this mapping here |
| 00:03:00,619 | SDC minted it'll reduce this s DSC |
| 00:03:03,780 | minted so essentially it'll reduce their |
| 00:03:06,360 | debt in the system so burn DSC we're |
| 00:03:10,679 | going to add some modifiers here there |
| 00:03:12,420 | should be more than zero |
| 00:03:16,079 | Mount so we want to do a u256 amount so |
| 00:03:20,340 | they can burn as much as they want |
| 00:03:22,260 | and then what we're going to want to do |
| 00:03:24,479 | is we're going to say s underscore DSC |
| 00:03:27,299 | minted of the message.sender |
| 00:03:30,780 | it's going to minus equal amount |
| 00:03:33,239 | so we're going to remove that debt |
| 00:03:34,979 | remove that DSC minted then we're going |
| 00:03:38,099 | to do a little pool |
| 00:03:40,379 | success |
| 00:03:41,760 | equals I underscore DSC dot transfer |
| 00:03:45,360 | from DS |
| 00:03:48,058 | message dot sender to address this Mount |
| 00:03:52,260 | and we could also send this to the zero |
| 00:03:54,780 | address but we're going to just send it |
| 00:03:56,218 | to our address for now because the |
| 00:03:59,638 | decentralized stable coin erc20 burnable |
| 00:04:03,239 | has its own burn function and we're just |
| 00:04:05,879 | going to call the burn function directly |
| 00:04:07,319 | on the token itself but first we're |
| 00:04:09,539 | going to take it from them |
| 00:04:11,099 | bring it into our contract and then |
| 00:04:12,599 | we're going to burn it so if not success |
| 00:04:16,379 | then we'll revert dsce |
| 00:04:20,819 | transfer failed like this and this |
| 00:04:24,058 | conditional is kind of hypothetically |
| 00:04:25,558 | unreachable |
| 00:04:26,699 | because if the transfer fails up here |
| 00:04:29,340 | we're going to throw the transfer from |
| 00:04:30,780 | fail error but let's say this DSC token |
| 00:04:33,840 | is implemented wrong great we kind of |
| 00:04:35,579 | have this backup but so they're going to |
| 00:04:37,799 | send their DSC token here they're going |
| 00:04:40,079 | to call idsc Dot burn amount now since |
| 00:04:44,159 | we're burning DSC question is do we need |
| 00:04:47,218 | to check if this breaks |
| 00:04:50,879 | Health Factor well probably not right |
| 00:04:54,179 | because we're burning DSC we're burning |
| 00:04:55,920 | debt it's highly unlikely that burning |
| 00:04:58,440 | your debt removing your debt is going to |
| 00:05:00,479 | break the health Factor right we |
| 00:05:02,940 | probably don't ever need this but I'm |
| 00:05:05,520 | just going to add this in here for now |
| 00:05:08,459 | just has a backup in a gas audit we can |
| 00:05:12,239 | figure out if we actually need it I |
| 00:05:14,218 | don't think |
| 00:05:15,539 | this would ever hit this is where when I |
| 00:05:19,979 | do go to an audit when I do go to a |
| 00:05:22,619 | security professional |
| 00:05:24,000 | I can make sure to point this line out |
| 00:05:25,799 | say hey I don't think this line will |
| 00:05:27,179 | ever hit and I'm thinking of pulling it |
| 00:05:29,159 | out what do you think right it's good to |
| 00:05:31,860 | call these out in your comments that |
| 00:05:33,058 | when you do go to professional who knows |
| 00:05:35,159 | they can help you out figure this out so |
| 00:05:37,920 | for now we're going to put it in here |
| 00:05:38,819 | although it's highly likely we don't |
| 00:05:40,500 | even need this |
| 00:05:41,760 | and we're going to refactor this |
| 00:05:43,138 | function pretty soon anyways so we have |
| 00:05:45,420 | this burn DSC function |
| 00:05:47,280 | we're going to make it public because |
| 00:05:48,959 | we're going to be burning DSC and |
| 00:05:51,539 | redeeming collateral at the same time |
| 00:05:53,459 | so now we've redeemed collateral |
| 00:05:55,319 | we have earn DSC now we can write this |
| 00:05:57,899 | redeemed collateral for DSC where we |
| 00:06:00,420 | send DSC and redeem collateral at the |
| 00:06:03,179 | same time |
| 00:06:04,138 | and so in here we're going to say |
| 00:06:05,340 | address token Co lateral address |
| 00:06:10,619 | you went to 256 |
| 00:06:12,599 | amounts collateral |
| 00:06:15,479 | you into 256 amount DSC to burn |
| 00:06:19,739 | we'll have this be external |
| 00:06:21,718 | so then we're going to call burn DSC |
| 00:06:23,638 | with the amount of DSC to burn |
| 00:06:26,099 | we're also going to call redeem |
| 00:06:28,319 | collateral so we're going to burn the |
| 00:06:30,179 | DSC first and then we're going to redeem |
| 00:06:32,218 | their collateral with the token |
| 00:06:34,679 | collateral address the amount lateral |
| 00:06:38,280 | collateral |
| 00:06:41,218 | oh this is external let's make this |
| 00:06:43,199 | public |
| 00:06:44,159 | let's go back |
| 00:06:45,360 | and then of course we should revert |
| 00:06:47,819 | if Health factor is broken but if we |
| 00:06:49,679 | look our redeemed collateral function |
| 00:06:51,959 | currently does this already so we don't |
| 00:06:53,879 | need to do that here so I'm just going |
| 00:06:55,799 | to put this comment redeem collateral |
| 00:06:59,699 | already checks Health Factor right here |
| 00:07:03,718 | then we'll add a little bit of nats |
| 00:07:05,399 | effect here so at param |
| 00:07:07,799 | boom that's not even the right param |
| 00:07:10,079 | from collateral address the collateral |
| 00:07:14,459 | address to redeem param non collateral |
| 00:07:18,479 | the amount collateral to redeem RAM |
| 00:07:20,940 | amount DSC to burn the amount of DSC to |
| 00:07:22,979 | burn this function |
| 00:07:24,920 | Burns DSC and redeems underlying |
| 00:07:30,239 | collateral |
| 00:07:31,979 | in one transaction |
| 00:07:34,558 | okay cool are we going to refactor these |
| 00:07:37,138 | two functions soon yes absolutely but I |
| 00:07:40,079 | want you to understand why we're going |
| 00:07:41,218 | to RE Factor them so we're going to |
| 00:07:42,899 | leave them in as they are for now |
| 00:07:48,479 | Okay cool so this is looking pretty good |
| 00:07:52,199 | so we have a lot of stuff in here we |
| 00:07:55,440 | have deposit collateral and mint DSC |
| 00:07:58,020 | so people can mint our stable coin by |
| 00:08:00,179 | depositing collateral people can just |
| 00:08:02,159 | straight up deposit collateral people |
| 00:08:04,199 | can then redeem their collateral for the |
| 00:08:06,000 | U.S for the DSC that they minted they |
| 00:08:08,760 | can just straight up redeem collateral |
| 00:08:10,020 | they can just straight up mint DSE so |
| 00:08:12,058 | long as they didn't break the health |
| 00:08:13,799 | Factor they can burn DSE to go help |
| 00:08:16,379 | their health factor I don't think this |
| 00:08:18,119 | line will ever hit we've got to do a |
| 00:08:20,280 | couple of more things here most |
| 00:08:21,899 | importantly we got to do this liquidate |
| 00:08:24,360 | function so this liquidate function is |
| 00:08:26,520 | kind of the the key thing that holds |
| 00:08:28,979 | this whole system together if we do |
| 00:08:31,379 | start nearing under collateralization |
| 00:08:33,360 | we need someone to start liquidating |
| 00:08:35,099 | positions removing those positions we |
| 00:08:36,840 | need somebody to basically call |
| 00:08:38,760 | redeem and burn for you if your health |
| 00:08:42,179 | Factor becomes too poor right because |
| 00:08:44,218 | the worst thing that would happen is |
| 00:08:46,319 | let's say there's a hundred dollars |
| 00:08:48,360 | worth |
| 00:08:49,319 | of eth backing fifty dollars worth of |
| 00:08:52,440 | DSC and then the price of eth Tanks to |
| 00:08:55,319 | twenty dollars right twenty dollars of |
| 00:08:58,199 | eth backing |
| 00:08:59,879 | fifty dollars to DSC well now the DSC |
| 00:09:03,020 | isn't worth one dollar right the DSC |
| 00:09:07,199 | then is going to be worth you know |
| 00:09:08,399 | whatever 20 over 50 is so we can't let |
| 00:09:11,520 | this happen right we need to make sure |
| 00:09:13,260 | we liquidate people's positions we |
| 00:09:15,718 | remove people's positions in the system |
| 00:09:17,659 | if the price of the collateral tanks |
| 00:09:21,000 | okay and this is where liquidation comes |
| 00:09:23,819 | in so we say if |
| 00:09:25,920 | someone is almost under collateralized |
| 00:09:29,879 | we will pay you |
| 00:09:32,099 | to liquidate them we have kind of this |
| 00:09:34,619 | gamified incentive system here where |
| 00:09:36,599 | people can get basically free money for |
| 00:09:38,638 | removing other people's positions in the |
| 00:09:40,379 | protocol |
| 00:09:41,218 | so in this situation up here as the |
| 00:09:43,920 | price is going down let's say the price |
| 00:09:45,659 | goes down to 75 dollars backing |
| 00:09:48,479 | fifty dollars of DSC this is way lower |
| 00:09:51,959 | than our 50 threshold so what we're |
| 00:09:54,479 | going to do is we're going to let |
| 00:09:56,819 | liquidator |
| 00:09:58,260 | Liquidator fake this 75 backing takes a |
| 00:10:03,000 | 75 backing and pays off the fifty |
| 00:10:07,260 | dollars DSC and burns earns off the 50 |
| 00:10:11,340 | DSC so we're gonna have somebody able to |
| 00:10:14,039 | take their money in exchange for them |
| 00:10:16,879 | making sure our protocol stays |
| 00:10:20,099 | collateralized so that's what this |
| 00:10:22,079 | liquid a function is going to do so |
| 00:10:24,058 | first off they're going to be able to |
| 00:10:25,920 | choose the collateral |
| 00:10:29,039 | the user that they want to liquidate and |
| 00:10:31,739 | the un256 debt to cover and they'll be |
| 00:10:35,399 | able to track the users and their |
| 00:10:37,199 | positions by listening to these events |
| 00:10:39,840 | that we've been emitting which is |
| 00:10:41,399 | exciting we're going to definitely want |
| 00:10:43,319 | a lot of nat spec for this so app param |
| 00:10:46,440 | collateral is going to be the collateral |
| 00:10:48,119 | to liquidate or better yet the your C20 |
| 00:10:52,500 | address |
| 00:10:54,360 | collateral address |
| 00:10:56,579 | liquidate from the user apparam |
| 00:11:00,659 | user the user who has broken the health |
| 00:11:05,099 | Factor there |
| 00:11:07,319 | Health Factor should be below min |
| 00:11:11,819 | health |
| 00:11:13,138 | backdoor at param |
| 00:11:16,020 | debt to cover it's going to be the |
| 00:11:19,739 | amount of DSC you want to burn |
| 00:11:25,739 | to improve the user's Health Factor yeah |
| 00:11:30,539 | we're going to add a lot of at notices |
| 00:11:31,860 | here at notice |
| 00:11:33,718 | you can partially |
| 00:11:36,659 | are liquidate a user just so as so long |
| 00:11:41,039 | as you improve their health Factor |
| 00:11:42,899 | that's all we care about at notice |
| 00:11:45,119 | you will get |
| 00:11:47,099 | a liquidation bonus |
| 00:11:49,500 | we're taking the user's funds right we |
| 00:11:53,159 | want to incentivize them to to actually |
| 00:11:55,739 | do this right if we say okay cool you'll |
| 00:11:58,260 | get the fifty dollars back for |
| 00:12:00,420 | paying off the fifty dollars debt it's |
| 00:12:02,638 | gonna be hard to incentivize people to |
| 00:12:04,079 | do that but if we say you get all 75 |
| 00:12:06,599 | dollars and all you have to do is pay |
| 00:12:08,099 | back 50 then that's going to be a bonus |
| 00:12:10,558 | that they should be able to take to |
| 00:12:12,058 | incentivize them to do this and notice |
| 00:12:14,760 | this function working |
| 00:12:17,840 | assumes the protocol |
| 00:12:20,340 | so call will be roughly 200 percent over |
| 00:12:25,699 | collateralized in order for this to work |
| 00:12:29,218 | why well because in this scenario if |
| 00:12:32,760 | this drops down to twenty dollars |
| 00:12:34,020 | backing fifty dollars of DSC |
| 00:12:36,179 | and if I pay back the 50 DSC and I get |
| 00:12:39,179 | 20 well then I I'm not going to do that |
| 00:12:41,579 | I'm not going to pay 50 to get back 20. |
| 00:12:45,000 | so this whole system only works if |
| 00:12:47,819 | the system is always over collateralized |
| 00:12:50,280 | the only way we can give liquidation |
| 00:12:52,079 | bonuses is if we're over collateralized |
| 00:12:54,599 | so the only way we incentivize people to |
| 00:12:56,599 | liquidate poor users is if we are over |
| 00:12:59,159 | collateralized so we could say at notice |
| 00:13:02,819 | a known bug |
| 00:13:04,979 | would be if the protocol |
| 00:13:07,860 | were a hundred percent |
| 00:13:10,199 | or less |
| 00:13:11,479 | collateralized then we wouldn't be able |
| 00:13:16,379 | to incentivize the Liquidators |
| 00:13:21,179 | and then we would just say like for |
| 00:13:22,379 | example |
| 00:13:23,520 | if the price of the collateral |
| 00:13:27,299 | plummeted before |
| 00:13:30,058 | anyone could be liquidated so hopefully |
| 00:13:34,379 | this makes a lot of sense if this |
| 00:13:35,579 | doesn't make sense you know what to do |
| 00:13:37,979 | ask chat to be T ask in the discussions |
| 00:13:40,799 | Forum Google it use the resources that |
| 00:13:43,979 | you have to your advantage yes yes okay |
| 00:13:47,399 | good so debt to cover we probably want |
| 00:13:50,520 | to do more than zero very lame if they |
| 00:13:53,159 | did just zero so we're going to do more |
| 00:13:55,920 | than zero here we're going to be moving |
| 00:13:58,440 | tokens around so we're gonna do |
| 00:14:00,020 | non-reentrant as well maybe we'll do |
| 00:14:02,579 | some more modifiers but that's pretty |
| 00:14:03,780 | good to me right now |
| 00:14:05,039 | so now what do we need to do well we |
| 00:14:07,138 | need to do a bunch of stuff here well we |
| 00:14:09,119 | first need to check Health factor of the |
| 00:14:12,659 | user right is this user even |
| 00:14:15,058 | liquidatable right remember we want to |
| 00:14:17,879 | do follows CEI |
| 00:14:21,058 | checks |
| 00:14:22,440 | effects |
| 00:14:24,319 | interactions right we always want to |
| 00:14:26,399 | follow CEI so we should do some more |
| 00:14:27,599 | checks here because we should only |
| 00:14:29,340 | liquidate people who are liquidatable so |
| 00:14:31,920 | first thing we should do you want to 256 |
| 00:14:34,260 | starting user |
| 00:14:36,659 | Health Factor equals underscore Health |
| 00:14:40,319 | factor of the user right because we have |
| 00:14:42,899 | this health Factor function which gets |
| 00:14:45,058 | that Health factor and what we can say |
| 00:14:47,280 | and let's put this |
| 00:14:49,679 | above |
| 00:14:51,058 | now we'll say if the starting user |
| 00:14:53,399 | Health Factor |
| 00:14:55,558 | is greater than or equal to the Min |
| 00:14:58,799 | Health factor which what's our Min |
| 00:15:00,360 | Health Factor again one |
| 00:15:02,760 | actually it should be one E18 and we're |
| 00:15:06,599 | definitely going to write some tests to |
| 00:15:07,920 | make sure this is correct |
| 00:15:09,479 | so one E18 because we're using our |
| 00:15:12,420 | Precision here what else are we doing |
| 00:15:14,159 | Health Factor why don't we write tests |
| 00:15:15,718 | elsewhere revert if Health factor is |
| 00:15:18,000 | broken August we haven't tested this yet |
| 00:15:19,679 | well I guess we're going to be testing |
| 00:15:21,420 | it very soon make sure that that Health |
| 00:15:22,979 | Factor bit is right so the starting user |
| 00:15:25,260 | Health factor is greater than or equal |
| 00:15:26,879 | to the health Factor then we revert |
| 00:15:29,280 | right revert DSC engine underscore |
| 00:15:33,299 | underscore Health Factor okay right |
| 00:15:36,840 | Health Factor's fine |
| 00:15:38,638 | got a new error let's go to the top |
| 00:15:41,340 | scroll down |
| 00:15:42,840 | error Health Factor okay |
| 00:15:45,659 | back back go back down here remember I'm |
| 00:15:48,840 | doing control minus to go back might be |
| 00:15:50,940 | something else depending on your setup |
| 00:15:53,399 | so let's do some thinking so now we have |
| 00:15:56,399 | their starting Health Factor what do we |
| 00:15:57,840 | want to do we want to |
| 00:16:01,319 | burn their DSC debt right we want to |
| 00:16:06,000 | reduce the amount of DSC they have |
| 00:16:08,099 | and take their collateral we want to |
| 00:16:11,218 | remove them from the system basically |
| 00:16:12,420 | right so how do we do that let's say |
| 00:16:14,218 | they have 140 |
| 00:16:17,879 | 140 of eth deposited and 100 of DSC with |
| 00:16:23,159 | a setup like this their health Factor |
| 00:16:24,539 | should be below what it currently is |
| 00:16:27,179 | what we could do is we can say okay |
| 00:16:29,218 | we're going to cover so this is what bad |
| 00:16:32,280 | user this disk that user has that means |
| 00:16:36,058 | we could cover we could say okay we're |
| 00:16:37,679 | going to cover debt to cover it's going |
| 00:16:41,099 | to equal that 100 and we need to pay |
| 00:16:43,558 | back a hundred dollars so we're gonna |
| 00:16:45,058 | have to get a u into 256. |
| 00:16:47,760 | collateral or token amount from debt |
| 00:16:51,360 | covered covered of covered so we need to |
| 00:16:54,899 | figure out okay if we're covering 100 of |
| 00:16:56,459 | debt 100 of DSC equals how much eth so |
| 00:17:01,860 | we're going to pay back a hundred |
| 00:17:02,819 | dollars of debt and how much eth is that |
| 00:17:04,920 | okay how much eat is that |
| 00:17:07,979 | so we're gonna get the token amount of |
| 00:17:09,420 | death color the eth basically equals |
| 00:17:12,780 | and we're gonna have to do some pricing |
| 00:17:14,520 | stuff |
| 00:17:15,780 | we're going to say it equals get token |
| 00:17:19,379 | amount from USD so we're going to add |
| 00:17:22,440 | the collateral |
| 00:17:23,638 | and the debt to cover so we're going to |
| 00:17:26,459 | figure out okay how much of this token |
| 00:17:28,260 | are we gonna get right we're going to |
| 00:17:30,179 | cover 100 worth of debt how much in eth |
| 00:17:33,058 | or whatever collateral token is 100 |
| 00:17:35,280 | worth of debt so we're going to create a |
| 00:17:36,780 | new function get token amount from USD |
| 00:17:39,420 | is going to be a public view function so |
| 00:17:42,000 | we're going to scroll all the way down |
