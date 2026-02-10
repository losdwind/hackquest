# 2 Redeem  burn

> Implementing redeemCollateralForDsc: burning debt before redeeming collateral, internal reuse pattern.

| Timestamp | Content |
| :--- | :--- |
| 00:00:00,000 | and I know Bitcoin USD also has eight |
| 00:00:02,279 | decimal places we could add some code in |
| 00:00:04,379 | here so that we make sure we're getting |
| 00:00:05,879 | the right decimals but I'm just going to |
| 00:00:07,618 | go with eight for now and now we can do |
| 00:00:09,899 | a little bit of math here |
| 00:00:11,460 | so we need to do the price times the |
| 00:00:14,578 | amount right what is this all we need to |
| 00:00:17,519 | do turn price times amount no because |
| 00:00:20,460 | the number is going to be way too big |
| 00:00:22,078 | right let's say the price is a thousand |
| 00:00:23,939 | times one E8 and now we're multiplying |
| 00:00:28,138 | that by let's say the the amount is a |
| 00:00:30,538 | thousand times one e 18 because it's |
| 00:00:34,379 | going to be in way this number is going |
| 00:00:36,299 | to be absolutely massive right so first |
| 00:00:39,000 | we need to multiply this a thousand by a |
| 00:00:41,879 | number to get this number to match this |
| 00:00:44,219 | one so these need to be the same units |
| 00:00:46,259 | of precision |
| 00:00:47,279 | so that's going to be we're gonna have |
| 00:00:49,199 | to multiply this first by one E10 and |
| 00:00:53,098 | because I don't like magic numbers we're |
| 00:00:54,839 | going to scroll the top |
| 00:00:56,219 | create a new state variable right in |
| 00:00:58,558 | here we're gonna do a u into 256 private |
| 00:01:02,759 | constant |
| 00:01:04,638 | additional feed Precision equals one E10 |
| 00:01:09,960 | like this and now it's not a magic |
| 00:01:12,118 | number |
| 00:01:12,960 | so instead of doing this now we're going |
| 00:01:15,299 | to say okay price and we're going to |
| 00:01:17,519 | wrap it as a unit 256 so that |
| 00:01:19,920 | everything's down 256 or say the price |
| 00:01:22,799 | first needs to be multiplied by the |
| 00:01:24,960 | additional feed Precision so that now |
| 00:01:27,179 | both of these are U and 256s and they |
| 00:01:29,699 | both have one E18 but then we're going |
| 00:01:33,000 | to have to divide all of these by 1e18 |
| 00:01:35,819 | as well so this number doesn't look |
| 00:01:37,859 | super wonky so we're gonna have to wrap |
| 00:01:39,538 | this whole thing by one E18 and as I |
| 00:01:43,859 | hate |
| 00:01:44,638 | floating magic numbers like this so |
| 00:01:46,799 | we're going to scroll back to the top |
| 00:01:48,239 | copy paste this this is now just going |
| 00:01:50,460 | to be called precision |
| 00:01:52,439 |  |
| 00:01:53,420 | grab precision |
| 00:01:55,379 | divide by Precision so you enter 56 |
| 00:01:58,199 | price times additional feed Precision |
| 00:02:00,420 | times amount divided by precision and we |
| 00:02:02,879 | should be good to go here this is where |
| 00:02:05,460 | my brain immediately goes okay |
| 00:02:07,159 | definitely need to write some tests for |
| 00:02:09,239 | this so once we've finished going |
| 00:02:10,920 | through this we're definitely going to |
| 00:02:12,420 | read we're definitely going to write |
| 00:02:13,618 | some tests at least for get USD value |
| 00:02:16,199 | here |
| 00:02:17,098 | so let's go back up through our massive |
| 00:02:20,879 | tree of functions that we just created |
| 00:02:22,500 | that are not complete so let's go back |
| 00:02:24,839 | to get account collateral value |
| 00:02:27,299 | and this is going to be the total us the |
| 00:02:29,638 | total collateral value news D is going |
| 00:02:31,439 | to be |
| 00:02:32,159 | get the USD value of the current token |
| 00:02:35,578 | we're on |
| 00:02:36,839 | times the amount that we're working with |
| 00:02:38,819 | total collateral value in USD actually |
| 00:02:41,460 | let's put that there boom and that's it |
| 00:02:44,879 | right so we just Loop through all the |
| 00:02:46,859 | tokens in the token array and we just |
| 00:02:49,739 | add up the value in USD of each one of |
| 00:02:51,899 | these tokens and I know we don't need a |
| 00:02:53,699 | return here but I'm going to add a |
| 00:02:54,899 | return here anyways return this so cool |
| 00:02:58,439 | so now we have a way to get the |
| 00:02:59,699 | collateral value in USD |
| 00:03:01,979 | we needed that way up here oops let's do |
| 00:03:04,920 | collateral value |
| 00:03:06,420 | in USD |
| 00:03:09,779 | get collateral value oops let's do this |
| 00:03:12,960 | and awesome so now our get account |
| 00:03:14,460 | information is going to return the total |
| 00:03:17,638 | USD minted the total DSC minted and then |
| 00:03:20,578 | the total value of all the collateral |
| 00:03:22,500 | here okay great |
| 00:03:27,538 | now we can scroll up again |
| 00:03:29,159 | we have this revert if Health factor is |
| 00:03:31,138 | broken which is still busted because |
| 00:03:33,359 | this function doesn't do anything but |
| 00:03:36,179 | now we can actually have it do something |
| 00:03:37,979 | because we have this health Factor here |
| 00:03:40,379 | we're going to update our health Factor |
| 00:03:42,239 | function |
| 00:03:43,319 | because now we have the two of these |
| 00:03:44,819 | what we can do is we can just |
| 00:03:48,118 | get the ratio of these two so we could |
| 00:03:50,879 | say |
| 00:03:52,078 | lateral value in USD |
| 00:03:54,179 | divided by total USD minted this is what |
| 00:03:57,299 | we're going to return for a health |
| 00:03:59,159 | Factor right well not quite so let's say |
| 00:04:03,118 | we minted we have 100 collateral divided |
| 00:04:06,299 | by 100 DSC right this is one to one if |
| 00:04:10,500 | we go down up if we go down a penny |
| 00:04:12,719 | we're going to be under collateralized |
| 00:04:14,339 | right and we don't want to go under |
| 00:04:16,799 | collateralized we always want to be over |
| 00:04:18,420 | collateralized |
| 00:04:20,098 | because if this ever goes below 100 our |
| 00:04:23,939 | system is is bunked up right so we want |
| 00:04:26,879 | to set the threshold to be like hey if |
| 00:04:28,439 | you go under 150 |
| 00:04:30,598 | lateral you can get liquidated right |
| 00:04:33,058 | because we go under 100 it's already too |
| 00:04:35,339 | late |
| 00:04:36,058 | so we want to say hey we want you to go |
| 00:04:37,859 | at least 150. so we're going to create a |
| 00:04:41,638 | liquidation threshold |
| 00:04:43,259 | and we're going to do this at the top |
| 00:04:45,538 | so we're going to say you went 256 |
| 00:04:48,659 | private |
| 00:04:50,038 | constant |
| 00:04:51,379 | liquidation threshold equals 50. and |
| 00:04:56,098 | this means you need to be 150 or no this |
| 00:04:58,920 | means you need to be 200 percent over |
| 00:05:02,239 | lateralized I think |
| 00:05:04,500 | might be 150 but we'll find out in the |
| 00:05:06,719 | test |
| 00:05:07,618 | so now if we go back down to where we |
| 00:05:09,179 | were |
| 00:05:09,839 | to get our health Factor we're not just |
| 00:05:11,578 | going to divide these two and even this |
| 00:05:13,859 | doesn't really work because if we have |
| 00:05:15,118 | 150 over 100 150 divided by 100 is equal |
| 00:05:18,598 | to 1.5 decimals don't work in solidity |
| 00:05:21,179 | so it would just be one |
| 00:05:22,739 | I guess that would work but we want we |
| 00:05:24,960 | want to know exactly what the health |
| 00:05:26,339 | factor is right with Precision so first |
| 00:05:28,979 | off |
| 00:05:29,699 | let's instead of just doing this let's |
| 00:05:32,339 | say you went to 256 collateral adjusted |
| 00:05:37,018 | or threshold equals the collateral value |
| 00:05:41,279 | in USD |
| 00:05:42,538 | times |
| 00:05:43,920 | liquidation threshold and then we should |
| 00:05:46,319 | divide by 100 right because the |
| 00:05:48,058 | liquidation threshold has is multiplying |
| 00:05:50,399 | it's making our number much bigger |
| 00:05:52,558 | so we should divide by 100 as I don't |
| 00:05:54,659 | like |
| 00:05:55,439 | floating numbers so we'll do unit 256 |
| 00:05:58,018 | private constant |
| 00:06:00,739 | liquidation |
| 00:06:02,659 | Precision equals 100 so we'll go back |
| 00:06:06,479 | down |
| 00:06:07,379 | divided by the liquidation precision |
| 00:06:09,538 | so now we have this collateral amount |
| 00:06:11,118 | adjusted for this this threshold right |
| 00:06:14,038 | so now you kind of think of it as |
| 00:06:16,078 | instead of say we have 150 of each |
| 00:06:19,558 | divided by 100 of DSC right this would |
| 00:06:23,638 | be 1.5 but now they need to multiply by |
| 00:06:27,779 | 50 as well |
| 00:06:29,518 | but now this collateral value is |
| 00:06:31,439 | multiplied by essentially one over five |
| 00:06:33,538 | right let's let's do the math here right |
| 00:06:36,118 | if we had |
| 00:06:37,439 | say a thousand dollars of eth we just |
| 00:06:40,618 | times that by 50 which gets us to 50 000 |
| 00:06:44,819 | but then we divided by that by about 100 |
| 00:06:46,979 | which equals 500. so if we had a |
| 00:06:50,219 | thousand dollars of eth times 50 equals |
| 00:06:53,339 | this divided by 100 is 500. same thing |
| 00:06:55,799 | with this example down here if we had |
| 00:06:57,899 | 150 worth of each eth we say 150 times |
| 00:07:01,979 | 50 equals |
| 00:07:04,159 | 7500 divided by 100 equals 75 and then |
| 00:07:09,420 | if we do 75 divided by 100 that is going |
| 00:07:12,299 | to be definitely less than one right so |
| 00:07:15,420 | we we're basically saying with this 50 |
| 00:07:17,518 | threshold 50 over 100 is essentially 1 |
| 00:07:20,879 | over 2. we're saying you need to have |
| 00:07:22,679 | double the collateral in here so yeah so |
| 00:07:25,199 | now that I'm talking it out loud this 50 |
| 00:07:28,018 | liquidation threshold means we need to |
| 00:07:30,179 | be 200 over clatterized right we need to |
| 00:07:32,939 | have double the collateral that we have |
| 00:07:34,679 | the minted DSC anyways so a whole bunch |
| 00:07:39,479 | of math hopefully this makes sense if |
| 00:07:42,118 | not definitely work with your AI to make |
| 00:07:44,460 | sure this makes sense or ask questions |
| 00:07:46,558 | in the discussion right I know some of |
| 00:07:48,479 | this math can get a little bit tricky |
| 00:07:49,679 | here |
| 00:07:50,279 | so collateral adjusted for threshold |
| 00:07:52,558 | and now we can return |
| 00:07:54,779 | the collateral adjusted oops this |
| 00:07:57,479 | collateral adjusted for threshold |
| 00:07:59,578 | times |
| 00:08:00,899 | precision |
| 00:08:02,219 | divided by that total DSE minted now |
| 00:08:05,939 | this will give us our true Health factor |
| 00:08:08,219 | and if this is less than one you can get |
| 00:08:10,618 | liquidated now |
| 00:08:12,479 | this is one example |
| 00:08:14,460 | right let's look at another example |
| 00:08:15,960 | let's say I guess this is two examples |
| 00:08:18,179 | so let's say they have a thousand |
| 00:08:20,279 | dollars worth of eth and 100 DSC right |
| 00:08:25,199 | so let's do the math here 1000 times 50 |
| 00:08:29,518 | equals fifty one two three divided by |
| 00:08:32,159 | 100 is equal to 500 |
| 00:08:35,879 | 500 divided by 100 |
| 00:08:38,098 | which is definitely greater than one |
| 00:08:39,779 | right 500 divided 100 is 5. so this |
| 00:08:42,779 | person with a thousand dollars of eth |
| 00:08:44,699 | deposited and 100 DSC minted would have |
| 00:08:47,098 | a health factor of 500. nice so now that |
| 00:08:51,179 | we have a health Factor we can actually |
| 00:08:53,038 | finally do this revert if Health factor |
| 00:08:55,199 | is broken function or we say we can even |
| 00:08:58,439 | put this |
| 00:08:59,939 | above this as kind of like a pseudo net |
| 00:09:01,739 | spec we could say |
| 00:09:03,538 | U into 256 Health Factor equals |
| 00:09:07,199 | underscore health |
| 00:09:08,638 | backdoor of the user and we say if the |
| 00:09:12,719 | user |
| 00:09:13,618 | excuse me actually let's do user Health |
| 00:09:16,199 | factor and if the user Health Factor |
| 00:09:19,379 | is less than the some Min Health factor |
| 00:09:22,799 | which is going to be one Health fact so |
| 00:09:24,899 | let's go ahead and create this let's go |
| 00:09:26,159 | to the top because we hate floating |
| 00:09:28,138 | numbers |
| 00:09:29,159 | unit 256 private constant Min Health |
| 00:09:32,819 | Factor equals one if the user Health |
| 00:09:35,219 | factor is less than the Min Health |
| 00:09:36,779 | Factor then we're going to go ahead and |
| 00:09:38,819 | revert I don't love this and do DSC |
| 00:09:42,118 | engine |
| 00:09:43,558 | underscore underscore |
| 00:09:45,239 | rakes |
| 00:09:46,500 | Health Factor I'm going to pass in this |
| 00:09:49,859 | health factor that we break with boom |
| 00:09:52,078 | new error scroll the top error engine |
| 00:09:55,859 | brakes Health Factor even 256. Health |
| 00:09:58,799 | Factor back door |
| 00:10:02,098 | it looks like we still have some red |
| 00:10:03,359 | here what did I forget okay revertive |
| 00:10:04,920 | Health factor is broken underscore like |
| 00:10:06,598 | this boom now it looks like nothing's |
| 00:10:08,939 | red let's just make sure Forge build |
| 00:10:12,899 | successful nice |
| 00:10:18,598 | okay where were we mint DSC okay |
| 00:10:22,138 | mint DSC so we added some more DC minted |
| 00:10:26,098 | and if adding this DSC breaks the health |
| 00:10:29,879 | Factor because |
| 00:10:31,500 | breaks the health Factor we should |
| 00:10:32,879 | revert we should not let anybody mint |
| 00:10:35,038 | DSC if they're going to cause themselves |
| 00:10:37,859 | to get liquidated I mean we could go |
| 00:10:40,199 | ahead and let them do it but like let's |
| 00:10:41,879 | not because that's not a very good user |
| 00:10:44,339 | experience now what we want to do is we |
| 00:10:47,279 | want to actually mint the DSC so this is |
| 00:10:50,399 | where |
| 00:10:51,239 | the DSC has this mint function that's |
| 00:10:54,179 | only owner and the owner of this is |
| 00:10:56,399 | going to be the DSC engine now we could |
| 00:10:58,859 | say and if we look at this mint function |
| 00:11:01,319 | it returns a Boolean so we'll say pool |
| 00:11:05,219 | minted equals I underscore DSC dot mint |
| 00:11:10,259 | and what does it take for parameters |
| 00:11:11,819 | address 2 and amount |
| 00:11:14,159 | so address 2 is going to be |
| 00:11:15,500 | message.cender amount is going to be |
| 00:11:18,118 | amount DSC to Mint and then we'll say if |
| 00:11:21,899 | not minted |
| 00:11:23,819 | well let's just say revert DSC engine |
| 00:11:27,118 | underscore underscore mint failed and |
| 00:11:30,118 | which is a new error scroll up to the |
| 00:11:32,518 | top error DSC mint failed |
| 00:11:36,538 | cool |
| 00:11:44,460 | so now we have a mid function and we |
| 00:11:47,399 | have a deposit function so we can |
| 00:11:49,018 | deposit collateral we can mint DSC but |
| 00:11:52,199 | additionally we can get account |
| 00:11:53,638 | information we can calculate someone's |
| 00:11:55,618 | Health Factor we can calculate the USD |
| 00:11:58,078 | value of these different tokens |
| 00:12:00,118 | so at this point I'm like oof I have no |
| 00:12:03,000 | idea if what I'm doing makes any sort of |
| 00:12:05,038 | sense I want to make sure I write some |
| 00:12:06,538 | tests here so this is where we could go |
| 00:12:09,779 | ahead and create a new folder unit tests |
| 00:12:12,479 | and if you wanted to you could skip |
| 00:12:14,939 | writing the scripts and just kind of |
| 00:12:17,038 | deploy in your unit tests and then do |
| 00:12:19,138 | some integration tests but I'm just |
| 00:12:20,460 | going to have my unit tests also be my |
| 00:12:22,138 | integration test for this one |
| 00:12:23,819 | so let's go ahead let's write a script |
| 00:12:25,979 | deploy |
| 00:12:27,179 | DSC |
| 00:12:28,739 | dot s dot Sol you already know the drill |
| 00:12:32,098 | for this |
| 00:12:33,719 | spdx |
| 00:12:35,460 | license I |
| 00:12:37,739 | can even zoom in a little bit identifier |
| 00:12:39,960 | MIT |
| 00:12:41,038 | contract deploy DSC is script |
| 00:12:45,899 | import script |
| 00:12:48,058 | from Forge STD |
| 00:12:51,859 | script.so like that pragma |
| 00:12:55,319 | solidity |
| 00:12:56,719 | 0.8.18 it's good in here we're going to |
| 00:13:00,420 | have our function run external we've |
| 00:13:03,598 | done this a hundred times extra |
| 00:13:06,118 | null and this is going to returns a |
| 00:13:09,058 | couple of things it's going to both |
| 00:13:10,799 | return the DS |
| 00:13:12,799 | decentralized stable coin and the DSC |
| 00:13:16,979 | engine and it's going to return |
| 00:13:18,659 | something else but I'm not going to put |
| 00:13:19,859 | it in quite yet so to do that we're |
| 00:13:21,839 | gonna have to import |
| 00:13:23,578 | centralized stablecoin |
| 00:13:26,219 | from dot slash SRC slash |
| 00:13:30,259 | decentralizedablecoin.sol we're going to |
| 00:13:32,339 | close and reopen my vs code it's being |
| 00:13:35,038 | really weird right now there we go all |
| 00:13:37,618 | fixed so the two of these what are we |
| 00:13:40,500 | going to do well we're going to do |
| 00:13:41,939 | vm.start |
| 00:13:43,618 | cast like this m.stop |
| 00:13:47,038 | broadcast |
| 00:13:48,479 | like this oh we need the DSC engine |
| 00:13:51,199 | import DSC engine from slash SRC slash |
| 00:13:56,819 | DSC engine.sol |
| 00:13:58,618 | and in here |
| 00:14:00,058 | we're going to deploy both of these so |
| 00:14:02,399 | we'll say |
| 00:14:03,479 | centralized stablecoin DSC equals new |
| 00:14:07,159 | decentralized stablecoin does our |
| 00:14:09,598 | decentralized stablecoin have any |
| 00:14:11,038 | parameters it does not we're also going |
| 00:14:14,460 | to deploy our dsce |
| 00:14:17,399 | or DSC engine |
| 00:14:19,699 | equals new |
| 00:14:21,659 | ESC engine this takes a whole bunch of |
| 00:14:25,078 | stuff right this is going to take go to |
| 00:14:28,799 | the Constructor token addresses price |
| 00:14:31,618 | feed addresses if we toggle oops toggle |
| 00:14:34,859 | the word wrap addresses price feed |
| 00:14:36,960 | addresses and the DSC address so we have |
| 00:14:39,479 | the DSC address boom it's going to be |
| 00:14:41,279 | this one |
| 00:14:42,118 | where do we get the price feed addresses |
| 00:14:43,859 | and you guessed it we're going to make a |
| 00:14:45,960 | helper config so what is this DSC engine |
| 00:14:48,420 | need |
| 00:14:49,558 | instructor an array of token addresses |
| 00:14:52,799 | an array of price feeds and then the DSC |
| 00:14:55,259 | address so |
| 00:14:57,179 | where are we going to get those |
| 00:14:58,259 | addresses from you guessed it a helper |
| 00:15:00,299 | config so new file |
| 00:15:03,659 | helper config.s dot Sol |
| 00:15:06,859 | spdx license |
| 00:15:09,960 | identifier MIT pragma solidity 0.8.18 |
| 00:15:14,759 | contract helper |
| 00:15:17,219 | config is script |
| 00:15:19,799 | import script |
| 00:15:22,500 | from |
| 00:15:25,339 | origin now let's do this on the sepolia |
| 00:15:29,038 | Chain so we'll do |
| 00:15:31,679 | construct |
| 00:15:33,000 | net work config what do we need in here |
| 00:15:36,299 | we need an well we're going to need weth |
| 00:15:40,379 | and Route Bitcoin those price feed |
| 00:15:43,259 | addresses and those DSC addresses |
| 00:15:44,939 | address |
| 00:15:46,319 | with USD price feed |
| 00:15:49,979 | address wrapped Bitcoin USD price feed |
| 00:15:54,078 | again weth is the erc20 version of |
| 00:15:58,439 | ethereum I've got a example web token |
| 00:16:01,979 | contract on sepolio and if you look at |
| 00:16:04,199 | it right in here we go to write contract |
| 00:16:06,359 | it's got this function deposit where you |
| 00:16:08,699 | deposit eth and it'll return to you an |
| 00:16:11,819 | erc20 version of eth to your metamask |
| 00:16:13,979 | called weth then whenever you're done |
| 00:16:16,739 | with it you just withdraw your eth and |
| 00:16:19,379 | burn your weft wrap Bitcoin is something |
| 00:16:21,899 | similar but with |
| 00:16:23,699 | Bitcoin the difference is since Bitcoin |
| 00:16:25,859 | doesn't originate on the blockchain |
| 00:16:27,299 | there is some risk in bridging it over |
| 00:16:30,359 | but I'm not going to go into that that's |
| 00:16:32,339 | something for you to look up so we're |
| 00:16:34,259 | also going to need the address of the |
| 00:16:35,819 | weft token itself we're gonna need the |
| 00:16:37,799 | address of the wrapped Bitcoin itself |
| 00:16:40,219 | and we're going to need a un256 deploy |
| 00:16:43,819 | deployer key kind of like what we did in |
| 00:16:46,739 | one of our previous lessons |
| 00:16:49,078 | we're gonna have Network config public |
| 00:16:52,679 | Active network config and then we're |
| 00:16:56,578 | going to have Constructor |
| 00:17:00,058 | like here |
| 00:17:01,319 | we're gonna have a function get sepolia |
| 00:17:04,979 | eth config |
| 00:17:07,078 | public view returns |
| 00:17:09,839 | Network config memory |
| 00:17:13,018 | this and then we're going to return |
| 00:17:16,138 | Network config we're gonna have |
| 00:17:20,479 | USD price feed B let's go to |
| 00:17:24,018 | docs.chain.link let's go to the polia so |
| 00:17:28,138 | polia where's eth BTC ethi excuse me |
| 00:17:32,279 | ethusd right here copy that paste demo |
| 00:17:35,879 | we're gonna need |
| 00:17:37,939 | Bitcoin USD price feed on sepulia |
| 00:17:40,500 | bitcoin USD right here |
| 00:17:42,839 | with that we need the Wes contract |
| 00:17:45,538 | address which I have here this is one |
| 00:17:48,659 | that I deployed with |
| 00:17:51,420 | here we're gonna need wrapped Bitcoin |
| 00:17:54,239 | and if you're looking for all these and |
| 00:17:56,159 | you want to just copy them out of the |
| 00:17:58,379 | GitHub repo associated with this you can |
| 00:18:00,118 | go to SRC |
| 00:18:01,739 | you can go to script upper config and |
| 00:18:04,739 | they're all in here if you want to just |
| 00:18:05,879 | copy paste by the way but |
| 00:18:08,098 | also wrap Bitcoin which I guess is this |
| 00:18:11,699 | address |
| 00:18:12,719 | but I had a different one well whatever |
| 00:18:14,279 | we're gonna use this one and if it |
| 00:18:15,779 | doesn't work that's fine we're gonna use |
| 00:18:17,879 | this one and of course player key |
| 00:18:21,078 | vm.emv unit |
| 00:18:23,399 | private key |
| 00:18:25,078 | like this okay and then we're gonna do |
| 00:18:28,379 | function get or create and Bill |
| 00:18:33,319 | config public returns Network config |
| 00:18:39,659 | memory |
| 00:18:41,339 | and we're going to do a little bit of |
| 00:18:43,038 | mock deployments here but we're going to |
| 00:18:45,960 | say if |
| 00:18:47,759 | Active network config dot with USD price |
| 00:18:51,659 | feed does not equal to the zero address |
| 00:18:53,759 | then we've already set it turn active |
| 00:18:57,479 | Network eth config we're going to do |
| 00:18:59,699 | some broadcasting so we're gonna need a |
| 00:19:02,098 | couple of a couple of mocks in here |
| 00:19:04,500 | we're gonna need some mock price feeds |
| 00:19:06,839 | and some mock erc20 tokens so |
| 00:19:10,920 | we're gonna need a mock V3 aggregator |
| 00:19:13,920 | which we're gonna go to test new folder |
| 00:19:17,518 | mocs and I'm going to copy paste a mock |
| 00:19:20,759 | from this repo if you want to copy paste |
| 00:19:22,920 | as well go for it |
| 00:19:24,538 | test |
| 00:19:25,979 | marks |
| 00:19:28,078 | Mark V3 aggregator |
| 00:19:30,899 | copy this |
| 00:19:35,219 | new file mock V3 Agra |
| 00:19:39,439 | .sol cool import that Imports mock B3 |
| 00:19:45,899 | aggregator |
| 00:19:48,299 | from dot dot slash |
| 00:19:50,819 | test slash MOX slash mock V3 |
| 00:19:53,879 | aggregator.sol so we have that we're |
| 00:19:56,279 | also gonna need some mock erc20s we can |
| 00:19:58,859 | get those actually directly from open |
| 00:20:00,839 | Zeppelin so if you do import your C20 |
| 00:20:04,399 | mock ROM at open Zeppelin slash contract |
| 00:20:09,239 | slash mocks slash erc20 mock that's all |
| 00:20:13,739 | if we command click into this or you |
| 00:20:16,199 | open this up you can see there's a whole |
| 00:20:18,000 | bunch of stuff in here like we can mint |
| 00:20:19,379 | as much as we want to burn as much as we |
| 00:20:21,000 | want do transfers and stuff we do pretty |
| 00:20:23,038 | much whatever we want and that's why |
| 00:20:24,779 | it's a mock token good for testing |
| 00:20:26,939 | so down here vm.start cast we're going |
| 00:20:31,319 | to create a mock V3 aggregator eth USD |
| 00:20:35,279 | price feed equals new mock V3 aggregator |
| 00:20:39,479 | and what does this take for the |
| 00:20:42,179 | Constructor takes decimals and then and |
| 00:20:45,299 | an initial answer |
| 00:20:46,979 | so we're going to scroll up here we're |
| 00:20:50,578 | going to say un250 or excuse me you went |
| 00:20:53,098 | eight |
| 00:20:54,359 | public constant |
| 00:20:56,719 | decimals |
| 00:20:58,578 | decimals equals eight and we'll say |
| 00:21:01,439 | units or not you and me int 256 public |
| 00:21:06,618 | constant eth USD price |
| 00:21:11,219 | equals |
| 00:21:12,479 | two thousand E8 and then we're gonna do |
| 00:21:16,319 | the same thing but instead of eth it's |
| 00:21:18,960 | going to be BTC and we'll make this 1000 |
| 00:21:22,739 | E8 eth USD scroll down all right new |
| 00:21:26,998 | mock what does it take control click you |
| 00:21:30,420 | into eight decimals initial answer |
| 00:21:32,460 | control minus to go back |
| 00:21:35,179 | decimals and then the initial answer |
| 00:21:38,118 | those okay oh and let's do VM dot stop |
| 00:21:41,819 | broadcast now we're gonna do erc20 Mach |
| 00:21:45,920 | West mock equals |
| 00:21:48,719 | new erc20 Mach what does this one take |
| 00:21:53,399 | name symbol initial account initial |
| 00:21:55,859 | balance okay say West West |
| 00:22:00,498 | message.cender |
| 00:22:02,899 | 1008 you probably want to do more than |
| 00:22:06,420 | we probably don't want to have these |
| 00:22:07,739 | floating numbers in here but yeah it's |
| 00:22:09,899 | just a Mark it's not a big deal I guess |
| 00:22:11,159 | now we're going to copy paste all this |
| 00:22:13,618 | for BTC |
| 00:22:16,679 | BTC |
| 00:22:18,719 | we're going to say BTC |
| 00:22:21,420 | it's going to be the |
| 00:22:23,159 | wrapped BTC |
| 00:22:25,439 | wrapped BTC routes BTC like that stop |
| 00:22:30,719 | the broadcast and then return |
| 00:22:33,659 | Network config with USD price feed is |
| 00:22:37,859 | going to be address oh thanks Copilot |
| 00:22:42,299 | thanks get a copilot thanks get up |
| 00:22:44,638 | copilot thanks get them copilot and this |
| 00:22:48,479 | is actually going to be the default |
| 00:22:49,739 | Anvil key which if you want you can just |
| 00:22:52,799 | go back to here again and copy paste it |
| 00:22:56,339 | out of here or you know what you just |
| 00:22:58,078 | run anvil |
| 00:22:59,219 | scroll up boom private key right here |
| 00:23:02,638 | cancel that we'll say you into two six |
| 00:23:05,339 | public excuse me int 256 public default |
| 00:23:10,819 | Anvil key equals |
| 00:23:13,739 | paste that in and we'll say we'll just |
| 00:23:17,638 | use the default ample key if you're |
| 00:23:19,679 | working with and Bill okay nice so now |
| 00:23:22,618 | we have get our crate Anvil yeah it's |
| 00:23:25,920 | apolia let's update our Constructor |
| 00:23:29,159 | so we'll say if |
| 00:23:31,159 | lock.chain ID equals equals one one one |
| 00:23:34,638 | five five one one one then |
| 00:23:38,399 | active Active network config equals get |
| 00:23:42,659 | sepolia eth config |
| 00:23:45,779 | else |
| 00:23:47,098 | to Active network config equals get or |
| 00:23:51,118 | create eat and build config nice so |
| 00:23:54,479 | we've got a little bit of a helper |
| 00:23:55,618 | config here a little semicolon down here |
| 00:23:58,859 | this looks pretty good what's wrong here |
| 00:24:00,420 | sorry this is a unit 256. Okay cool so |
| 00:24:05,518 | now that we have a helper config we can |
| 00:24:07,018 | go finally back to our deploy DSC let's |
| 00:24:09,598 | import that in here import upper config |
| 00:24:12,659 | from |
| 00:24:14,098 | upper config right at the top we'll say |
| 00:24:16,920 | helper config config equals new upper |
| 00:24:21,779 | config and out of this config we're |
| 00:24:24,420 | going to get |
| 00:24:25,859 | all this with a Bitcoin with rapid coin |
| 00:24:29,939 | to poke et cetera so I'm going to say |
| 00:24:32,339 | address with USD price feed oh I can |
| 00:24:35,879 | even just hit Tab and it looks like it |
| 00:24:38,279 | has most of it yep let's use D rep |
| 00:24:41,159 | Bitcoin West rip it coin deployer key |
| 00:24:43,679 | equals config.active Network config |
| 00:24:47,279 | cool looks good to me I'm gonna toggle |
| 00:24:49,498 | word wrap so that it wraps around okay |
| 00:24:52,018 | cool we have all of those |
| 00:24:53,879 | now our DSC engine takes an array of |
| 00:24:56,759 | token addresses an array of price feeds |
| 00:24:58,799 | so we can say |
| 00:25:00,479 | it's right at the top let's make those |
| 00:25:01,920 | arrays we'll say address |
| 00:25:03,779 | Ray |
| 00:25:04,979 | public token addresses |
| 00:25:08,518 | address array public price feed |
| 00:25:12,920 | addresses and we'll say token addresses |
| 00:25:16,859 | equals West and wrapped BTC |
| 00:25:20,819 | price |
| 00:25:22,319 | speed addresses equals weft USD price |
| 00:25:25,979 | feed address wrap Bitcoin USD price feed |
| 00:25:28,679 | okay cool I think that's everything |
| 00:25:30,960 | right yeah so now we can go back to this |
| 00:25:33,960 | line now |
| 00:25:34,979 | do you see engine engine new DC engine |
| 00:25:37,339 | and it takes the token addresses |
| 00:25:41,699 | price feed address says and DSC okay |
| 00:25:46,439 | cool and then finally something we |
