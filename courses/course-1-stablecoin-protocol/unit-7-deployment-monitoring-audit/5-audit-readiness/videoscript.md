# 5 Audit readiness

| Timestamp | Content |
| :--- | :--- |
| 04:30:38 | or we could say this is a known bug if |
| 04:30:41 | the price fluctuates or explodes too |
| 04:30:43 | quickly or too slowly this protocol |
| 04:30:45 | becomes worthless and that's kind of not |
| 04:30:47 | a great solution right so these are |
| 04:30:49 | things we absolutely want to keep in |
| 04:30:50 | mind and these are things that we can |
| 04:30:52 | find with invariant tests and this is |
| 04:30:55 | why they're so important so for now in |
| 04:30:57 | our Handler I'm actually just going to |
| 04:30:59 | even comment this out because it does |
| 04:31:01 | break our test Suite but I'm going to |
| 04:31:03 | put a little comment here this breaks |
| 04:31:05 | our invariant test suite and this would |
| 04:31:08 | 100 be something that shows up in a |
| 04:31:11 | smart contract audit saying hey if the |
| 04:31:13 | price of an asset plummets too quickly |
| 04:31:16 | the system's breaking because it breaks |
| 04:31:18 | the invariant all right great now |
| 04:31:21 | there's a few more things I want to |
| 04:31:22 | teach only a few and then we're done |
| 04:31:24 | with this section |
| 04:31:25 | we're going to teach one some proper |
| 04:31:28 | Oracle use and then two we need to write |
| 04:31:32 | more tests |
| 04:31:33 | which we're not going to do I'm going to |
| 04:31:35 | leave that to you but we have a whole |
| 04:31:37 | bunch of other contracts in here like |
| 04:31:38 | the decentralized stablecoin |
| 04:31:40 | and then three some smart contract audit |
| 04:31:43 | preparedness |
| 04:31:45 | some smart contract audit preparation |
| 04:31:48 | so let's start with some Oracle proper |
| 04:31:50 | use |
| 04:31:55 | so in our DSC engine we're of course |
| 04:31:57 | using an oracle right we're using chain |
| 04:32:00 | link price feeds now this is kind of an |
| 04:32:02 | assumption that we have in our protocol |
| 04:32:04 | right now a price seeds are just going |
| 04:32:07 | to work but price leads are a system |
| 04:32:09 | just like anything else and we should |
| 04:32:11 | add some checks in our code here |
| 04:32:14 | just to make sure that if this breaks or |
| 04:32:18 | if something in here breaks our system |
| 04:32:20 | isn't broken |
| 04:32:21 | so what we're going to do is we're |
| 04:32:23 | actually use that Library methodology we |
| 04:32:25 | made years ago to write some checks on |
| 04:32:28 | this price feed so I'm going to make a |
| 04:32:32 | libraries folder and we're going to make |
| 04:32:34 | a new contract in here called |
| 04:32:37 | Oracle lib that's all |
| 04:32:39 | and we want to do is we want to check to |
| 04:32:42 | make sure that these prices aren't stale |
| 04:32:44 | if we click on any one of these prices |
| 04:32:46 | like eth USD let's scroll up to show |
| 04:32:50 | more details |
| 04:32:52 | just to show more details you can see |
| 04:32:54 | they have this heartbeat where a new |
| 04:32:57 | price should show up at least every 3 |
| 04:32:59 | 600 seconds I believe what this is right |
| 04:33:01 | yes on this pulley test net we want to |
| 04:33:04 | write some checks to make sure that this |
| 04:33:06 | is actually updating every 3600 seconds |
| 04:33:08 | and if it's not we should probably pause |
| 04:33:10 | the functionality of our contract so |
| 04:33:13 | we're going to make a spdx |
| 04:33:16 | license |
| 04:33:17 | identifier MIT fragment solidity like |
| 04:33:21 | this |
| 04:33:22 | we're going to do a library |
| 04:33:24 | Oracle lib and let's put a little |
| 04:33:26 | netspect to explain what this is going |
| 04:33:28 | to do say at title Patrick Collins oops |
| 04:33:32 | title Oracle lib at author Patrick |
| 04:33:37 | Collins |
| 04:33:39 | at notice |
| 04:33:41 | this library is used to check the chain |
| 04:33:46 | link |
| 04:33:47 | Oracle for stale |
| 04:33:50 | if a price is stale |
| 04:33:53 | function |
| 04:33:54 | will revert and render the dsce engine |
| 04:34:00 | on usable this is by Design so we're |
| 04:34:04 | going to say hey if a chain link price |
| 04:34:06 | feed is stale just stop don't let |
| 04:34:08 | anything happen because if a price is |
| 04:34:10 | wrong if a price is bad our whole |
| 04:34:12 | protocol is kind of bunked right so we |
| 04:34:14 | want to just freeze everything so we |
| 04:34:17 | want the DSC engine to freeze if price |
| 04:34:22 | has become stale |
| 04:34:25 | so if the chain link |
| 04:34:27 | Network explodes and you have a lot of |
| 04:34:32 | money locked in the protocol |
| 04:34:35 | too bad this is something that's going |
| 04:34:37 | to be a known issue right if the chain |
| 04:34:38 | link Network blows up and all the prices |
| 04:34:40 | become stale |
| 04:34:41 | yeah you're kind of screwed right and |
| 04:34:43 | maybe this is something we want to |
| 04:34:45 | account for but for now I'm just going |
| 04:34:47 | to say that's a known issue and we're |
| 04:34:48 | going to move on and this is where |
| 04:34:50 | you'll see me start to get more and more |
| 04:34:52 | particular about stuff this is where as |
| 04:34:55 | we get more and more advanced this is |
| 04:34:57 | where the details start to matter more |
| 04:34:59 | and more right all those little little |
| 04:35:01 | things that I kind of gloss over they |
| 04:35:02 | become they start to become more and |
| 04:35:04 | more important as this becomes closer |
| 04:35:06 | and closer to a real production product |
| 04:35:09 | that should go to audit right so let's |
| 04:35:12 | create a stale price check function so |
| 04:35:15 | create a function stale price |
| 04:35:18 | check and we'll have this still price |
| 04:35:21 | check be on an aggregator V3 |
| 04:35:24 | interface.sol so I'm actually going to |
| 04:35:26 | copy this |
| 04:35:27 | paste it in here toggle the word wrap |
| 04:35:30 | and so as an input parameter it's going |
| 04:35:32 | to take aggregated V3 interface |
| 04:35:34 | price feed this will be a public view |
| 04:35:37 | which will returns a uint80 it's 256. |
| 04:35:43 | you went to 256 you went to 256 and a |
| 04:35:47 | unit 80. the same |
| 04:35:50 | return value of the latest round data |
| 04:35:54 | function in an aggregated V3 interface |
| 04:35:55 | function like this okay cool and in here |
| 04:36:01 | what we're going to do is we're going to |
| 04:36:02 | call |
| 04:36:03 | price feed Dot latest |
| 04:36:07 | round data and I'm even just gonna cheat |
| 04:36:11 | a little bit we're gonna control click |
| 04:36:13 | into this we're going to copy this line |
| 04:36:16 | paste it here equals |
| 04:36:19 | boom just so I don't have to type as |
| 04:36:21 | much cool we have all those |
| 04:36:24 | and what we're going to say in here and |
| 04:36:26 | we're probably not going to use all |
| 04:36:27 | these |
| 04:36:28 | we're going to have some stale check |
| 04:36:30 | right so each one of these price feeds |
| 04:36:32 | has their own heartbeat so we probably |
| 04:36:33 | should ask them what their heartbeat is |
| 04:36:36 | but I'm just going to hard code it for |
| 04:36:37 | this one I'm going to say |
| 04:36:39 | you went 256 private constant |
| 04:36:43 | timeout equals three hours |
| 04:36:46 | and this is a constant in solidity it |
| 04:36:48 | stands for |
| 04:36:50 | 3 times 60 Minutes times 60 seconds |
| 04:36:54 | equals |
| 04:36:55 | uh this many seconds so looks like this |
| 04:36:58 | heartbeat is actually much longer than |
| 04:37:00 | the one the chain link should allow so |
| 04:37:02 | 360 seconds is 3600 seconds is just one |
| 04:37:06 | hour right we're going to give it three |
| 04:37:07 | hours so what we're going to say in here |
| 04:37:09 | is we're going to say first we're going |
| 04:37:10 | to do a unit 56 seconds since equals |
| 04:37:14 | block Dot timestamp |
| 04:37:16 | and then we'll have |
| 04:37:18 | excuse me minus |
| 04:37:20 | updated app |
| 04:37:22 | and then we'll say so this will get the |
| 04:37:25 | current block timestamp minus this |
| 04:37:27 | updated app so this should basically get |
| 04:37:30 | us the seconds since this price sheet |
| 04:37:32 | was updated then we'll say if seconds |
| 04:37:35 | since is greater than our timeout then |
| 04:37:39 | we're going to revert with a new error |
| 04:37:42 | error |
| 04:37:44 | or co-lib I'm just going to underscore |
| 04:37:47 | it's still price like this revert with |
| 04:37:50 | sale price and then we're just going to |
| 04:37:52 | return |
| 04:37:53 | all of this stuff so return round ID |
| 04:37:57 | answer started at updated that answered |
| 04:38:01 | around and I'm going to change this name |
| 04:38:02 | to |
| 04:38:03 | stale check |
| 04:38:05 | latest round data now |
| 04:38:09 | what we can do since this is a library |
| 04:38:11 | on |
| 04:38:13 | our price feed we can use this stale |
| 04:38:15 | check latest round data to automatically |
| 04:38:17 | check |
| 04:38:18 | to see if the price is stale so now |
| 04:38:22 | in our DSC engine anytime we call latest |
| 04:38:26 | round data |
| 04:38:28 | we just swap it out for stale check |
| 04:38:30 | latest round data so long as at the top |
| 04:38:32 | we go |
| 04:38:34 | after our errors we're going to put our |
| 04:38:36 | types |
| 04:38:37 | after the errors we're going to put |
| 04:38:39 | types |
| 04:38:40 | so this is where we would do using |
| 04:38:43 | Oracle lib or aggregator B3 interface we |
| 04:38:49 | need to import Oracle lib let's import |
| 04:38:52 | Oracle lib from |
| 04:38:55 | or excuse me dot slash libraries |
| 04:38:57 | libraries |
| 04:38:59 | slash Oracle lib that's all |
| 04:39:02 | like this and now yep any place we use |
| 04:39:05 | latest round data we can now use stale |
| 04:39:07 | check latest round data where we have |
| 04:39:09 | this stale check baked in and cool now |
| 04:39:12 | we did a ton of refactoring let's run |
| 04:39:14 | Forge test just to run this whole test |
| 04:39:16 | Suite including the invariant test Suite |
| 04:39:28 | okay and stuff's looking good here and |
| 04:39:30 | you can see that it even took a lot of |
| 04:39:32 | extra time to run this last bit |
| 04:39:34 | so cool so we've got a little check here |
| 04:39:38 | we're not going to write some more tests |
| 04:39:39 | this is something that you should 100 do |
| 04:39:42 | we pull up our terminal here we run |
| 04:39:45 | Forge coverage |
| 04:39:46 | what do you think we get |
| 04:39:55 | we get this which you can see there's a |
| 04:39:57 | whole bunch of contracts that we need to |
| 04:39:58 | test this Oracle lib could probably use |
| 04:40:01 | its own test Suite even though it's |
| 04:40:03 | looking like a lot of it's tested we |
| 04:40:05 | probably should definitely test this |
| 04:40:06 | ourselves we need to write tests for |
| 04:40:08 | this we probably want to test our our |
| 04:40:11 | DSC some more for sure |
| 04:40:14 | so we should definitely write some more |
| 04:40:15 | tests I'm going to leave that to you |
| 04:40:18 | this little little finger here |
| 04:40:27 | and then finally some smart contract |
| 04:40:29 | audit preparation so we talked a little |
| 04:40:31 | bit about what a smart contract audit is |
| 04:40:33 | and we haven't covered a whole lot of |
| 04:40:36 | security stuff yet we're going to do |
| 04:40:37 | that later in the course but a solid |
| 04:40:39 | place you can look is this audit |
| 04:40:40 | Readiness checklist from the nascent XYZ |
| 04:40:44 | GitHub repo which has a lot of different |
| 04:40:47 | things that you should and keep in mind |
| 04:40:49 | when running your tests for those of you |
| 04:40:52 | looking to be really serious about |
| 04:40:54 | actually launching a protocol and really |
| 04:40:56 | having the security mindset that you |
| 04:40:58 | need as well be sure |
| 04:41:00 | to get to this last |
| 04:41:02 | section in the course |
| 04:41:04 | about intro to security because this is |
| 04:41:07 | where we're going to give you a lot of |
| 04:41:08 | that lower level security stuff at least |
| 04:41:11 | from a smart contract developer |
| 04:41:13 | perspective we're going to give you all |
| 04:41:15 | the basics that you need to be aware of |
| 04:41:16 | in order to stay secure so we're not |
| 04:41:19 | going to talk about it too much in this |
| 04:41:21 | one but it is something that if we were |
| 04:41:23 | to actually launch this we would need to |
| 04:41:25 | keep in mind |
| 04:41:25 | so I'll put a little soon Emoji here for |
| 04:41:28 | coming very soon |
| 04:41:33 | all right so with that all being said |
| 04:41:36 | we've done an absolute ton here this is |
| 04:41:40 | one thousand percent a project you |
| 04:41:43 | should push up to your GitHub repo and |
| 04:41:45 | this is one thousand percent a project |
| 04:41:48 | that if you made it this far you should |
| 04:41:50 | be incredibly proud of yourself this is |
| 04:41:53 | the hardest most complicated most |
| 04:41:55 | advanced project |
| 04:41:58 | in this course and to be honest probably |
| 04:42:00 | the most advanced project you'll work on |
| 04:42:02 | in almost all of web3 there's so much |
| 04:42:04 | going on here we learned about defy we |
| 04:42:07 | learned about advanced state-of-the-art |
| 04:42:10 | modern fuzzing techniques we learned a |
| 04:42:14 | tiny tiny bit about security we used |
| 04:42:16 | Oracles in a safer way we wrote this |
| 04:42:18 | crazy amazing test Suite we wrote deploy |
| 04:42:22 | scripts for this we wrote We interacted |
| 04:42:24 | with a couple different libraries |
| 04:42:27 | we learned about this fail on revert |
| 04:42:29 | runs depth and variants the only thing |
| 04:42:32 | we didn't do was write a proper readme |
| 04:42:34 | which you 100 should write a proper |
| 04:42:36 | readme and if you want you can check out |
| 04:42:38 | The Foundry D5 stablecoin readme to see |
| 04:42:41 | how it actually works of course even for |
| 04:42:44 | me this was a long difficult project for |
| 04:42:47 | me to build because there's just so much |
| 04:42:49 | to think about like I said this is a |
| 04:42:52 | project that I am planning on getting |
| 04:42:53 | audited so what you're going to see in |
| 04:42:56 | this repo is you're going to see kind of |
| 04:42:58 | this main branch which is what you're |
| 04:42:59 | going to be working on but I'm |
| 04:43:01 | additionally going to make a new branch |
| 04:43:02 | called like audited or post audit or |
| 04:43:05 | something like that and if you want to |
| 04:43:06 | follow and watch this GitHub repo you |
| 04:43:09 | can see the progress and you can see the |
| 04:43:11 | audit reports that come out on here so |
| 04:43:13 | that you |
| 04:43:13 | can be intimately familiar with this |
| 04:43:16 | code base already because you wrote some |
| 04:43:18 | of the code |
| 04:43:19 | and then also see as it progresses |
| 04:43:21 | through its security journey and for |
| 04:43:24 | those of you who are looking to actually |
| 04:43:25 | release production code you definitely |
| 04:43:27 | need to be at least aware of how |
| 04:43:30 | security works and the security paths |
| 04:43:32 | that your code should take but all right |
| 04:43:35 | with all this being said |
| 04:43:37 | you know what time it is |
| 04:43:39 | it's time for you to get a break you |
| 04:43:42 | deserve it you should 100 go take a lap |
| 04:43:46 | push this code base up to GitHub and |
| 04:43:50 | actually clean it up a little bit I'm |
| 04:43:51 | going to be cleaning this up a little |
| 04:43:53 | bit before I push the rest of it to this |
| 04:43:55 | GitHub repo so you should clean it up a |
| 04:43:57 | little bit make it yours make it the way |
| 04:43:59 | that you want to make it maybe even |
| 04:44:01 | improve on it right we saw with the |
| 04:44:03 | invariant test that there is at least |
| 04:44:05 | one other claring issue with this |
| 04:44:07 | protocol |
| 04:44:08 | if the price of the assets |
| 04:44:11 | collapsed too quickly our protocol |
| 04:44:13 | becomes insolvent so maybe you come up |
| 04:44:16 | with a method to fix it and then maybe |
| 04:44:18 | you launch your own stable coin why not |
| 04:44:20 | right in any case good luck to you take |
| 04:44:23 | that break we only have we're getting so |
| 04:44:27 | close we only have one two three more |
| 04:44:31 | lessons and these ones are actually |
| 04:44:33 | easier than the one we just did we're |
| 04:44:36 | going to learn about upgrades and |
| 04:44:37 | proxies we're going to learn about |
| 04:44:39 | governance |
| 04:44:40 | and then we're going to do an |
| 04:44:41 | introduction to Smart contract security |
| 04:44:42 | these are much easier than everything |
| 04:44:45 | you've done so far so take the break |
| 04:44:48 | give yourself a pat on the back be |
| 04:44:50 | incredibly excited celebrate this win |
| 04:44:52 | this is a huge achievement getting this |
| 04:44:54 | far |
| 04:44:55 | and I'll see you very soon |
| 04:44:58 | three more left |
| 04:45:04 | and as a bonus piece of content here |
| 04:45:07 | another one of the reasons that I |
| 04:45:09 | absolutely love the Ave protocol and the |
| 04:45:11 | Ave team is that they're just shipping |
| 04:45:14 | protocols and shipping amazing products |
| 04:45:17 | and features and services for the web3 |
| 04:45:19 | community one of those |
| 04:45:21 | protocols is something called lens |
| 04:45:23 | protocol which is a decentralized social |
| 04:45:25 | layer or a decentralized social platform |
| 04:45:27 | for building social medias so to give us |
| 04:45:30 | some information about this we have the |
| 04:45:31 | head of devrel for lens protocol on the |
| 04:45:33 | Ave team natterdabit to talk a little |
| 04:45:35 | bit more about lens hi my name is natter |
| 04:45:38 | David I wanted to give you a quick |
| 04:45:40 | introduction to lens protocol and why it |
| 04:45:42 | might be interesting to you as a smart |
| 04:45:44 | contractor solidity engineer lens is the |
| 04:45:46 | social layer of web3 it allows |
| 04:45:48 | developers to build social applications |
| 04:45:50 | or to implement social features into |
| 04:45:52 | their existing applications there are |
| 04:45:55 | 4.9 billion people in the world today |
| 04:45:56 | already using social applications so |
| 04:45:59 | these types of apps provide a use case |
| 04:46:01 | that people already know understand and |
| 04:46:03 | value they also present a wide variety |
| 04:46:05 | of value propositions and opportunities |
| 04:46:07 | for developers to take advantage of and |
| 04:46:09 | build on and with web 3 features like |
| 04:46:12 | native payments ownership and |
| 04:46:13 | composibility also provide a lot of |
| 04:46:15 | Primitives to build on that were not |
| 04:46:17 | available with traditional social |
| 04:46:19 | applications or infrastructure lens |
| 04:46:21 | developers to extend the core smart |
| 04:46:23 | contracts by building out their own |
| 04:46:25 | custom modules this will be similar to |
| 04:46:27 | as if Twitter Instagram or other social |
| 04:46:29 | applications allow developers to send |
| 04:46:31 | pull requests into their backends and |
| 04:46:33 | apis this opens the door to a lot of |
| 04:46:36 | interesting and Powerful functionality |
| 04:46:38 | that we're seeing developers integrate |
| 04:46:40 | into their applications build out new |
| 04:46:42 | different ideas but also integrate into |
| 04:46:44 | other parts of web3 like defy in |
| 04:46:47 | addition to that you can call lensmart |
| 04:46:49 | contracts from other smart contracts so |
| 04:46:51 | if you'd like to build out something |
| 04:46:53 | that is composable with the web 3 social |
| 04:46:55 | graph lens is a great place to integrate |
| 04:46:57 | if you want to get started building on |
| 04:46:59 | lens check out the docs at docs.lens.xyz |
| 04:47:02 | and be sure to check out how to deploy |
| 04:47:04 | the protocol on your own so you can |
| 04:47:06 | check out the smart contract code and |
| 04:47:08 | play around with it and also look at how |
| 04:47:10 | to build out and create your own custom |
| 04:47:12 | modules thanks for checking this out |
