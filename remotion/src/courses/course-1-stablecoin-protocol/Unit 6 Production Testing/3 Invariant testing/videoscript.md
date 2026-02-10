# 3 Invariant testing

> Proving system safety with invariants: total collateral value > DSC supply, handler-based testing.

| Timestamp | Content |
| :--- | :--- |
| 00:00:00,000 | briefly went over one form of fuss |
| 00:00:02,519 | testing but now we're going to go a |
| 00:00:04,318 | little bit deeper and I made a video on |
| 00:00:06,599 | stateless and stateful fuzz testing |
| 00:00:08,519 | recently and we're going to go ahead and |
| 00:00:10,439 | watch that so you can have a better |
| 00:00:11,579 | understanding of what stateless and |
| 00:00:13,799 | stateful fuzz testing is and why it's so |
| 00:00:16,559 | important especially for a project like |
| 00:00:18,539 | this that has potentially a lot of money |
| 00:00:21,778 | moving around so let's understand what |
| 00:00:24,599 | fuzz testing is let's watch this video |
| 00:00:31,219 | all right contracts are written and |
| 00:00:33,420 | tested can I ship my code no I can |
| 00:00:35,219 | easily break this with a flash loan |
| 00:00:36,539 | attack oh crap I didn't think about that |
| 00:00:37,858 | let me fix all right how about now |
| 00:00:39,858 | it's not like a flash on an Ave I can |
| 00:00:42,539 | use that loan it's like I'm a cdb I'm |
| 00:00:44,399 | Faker Dow and I can exploit the Oracle |
| 00:00:46,318 | by re-entering your dinner reservation |
| 00:00:48,059 | at Chili's causing a bridge malfunction |
| 00:00:50,039 | on the flux capacitor bypassing the |
| 00:00:52,139 | possibility media can explode your |
| 00:00:54,719 | contract I exploit your contract |
| 00:00:58,858 | most of the time hacks will come from a |
| 00:01:00,839 | scenario that you didn't think about or |
| 00:01:02,339 | write a test for but what if I told you |
| 00:01:04,139 | that you could write a test that cannot |
| 00:01:05,818 | check for just one scenario but every |
| 00:01:08,219 | scenario let's get froggy Plus testing |
| 00:01:10,559 | or fuzzing is when you supply random |
| 00:01:12,238 | data to your system in an attempt to |
| 00:01:13,979 | break it so if this balloon is our |
| 00:01:15,599 | system slash code it's us doing random |
| 00:01:17,579 | stuff in an attempt to break it this is |
| 00:01:20,219 | chain link |
| 00:01:23,658 | now why would we want to do all that |
| 00:01:25,679 | let's say we have this function called |
| 00:01:26,879 | do stuff it takes an integer as an input |
| 00:01:28,858 | parameter and we know that no matter |
| 00:01:30,358 | what we give it as an input our variable |
| 00:01:32,278 | should always be zero should always be |
| 00:01:34,198 | zero the fact that this variable should |
| 00:01:36,000 | always be zero is known as our invariant |
| 00:01:38,039 | or our property of the system that |
| 00:01:39,839 | should always hold in our balloon |
| 00:01:41,399 | example if we Market our balloon as |
| 00:01:43,079 | indestructible or unbreakable or |
| 00:01:44,939 | unpoppable the invariant that would hold |
| 00:01:46,559 | wood this balloon cannot be broken and |
| 00:01:48,959 | unlike this balloon in real life we can |
| 00:01:51,000 | write a test that will call the do stuff |
| 00:01:52,799 | function many times with random data and |
| 00:01:55,619 | check to see that our should always be |
| 00:01:57,238 | zero variable is always zero now a |
| 00:01:59,579 | normal unit test for our code might look |
| 00:02:01,318 | like this we pass a single data point we |
| 00:02:03,599 | call the function and then we do our |
| 00:02:05,099 | assertion to make sure that should |
| 00:02:06,959 | always be zero is in fact zero and with |
| 00:02:09,238 | this we might think our code is covered |
| 00:02:10,559 | but if we look back at our do stuff |
| 00:02:12,119 | function a little bit closer we can |
| 00:02:14,039 | clearly see that if our data input is 2 |
| 00:02:16,738 | should always be zero we'll end up being |
| 00:02:18,839 | one this would break our invariant |
| 00:02:21,000 | should always be zero will not be zero |
| 00:02:23,399 | now this may seem obvious for this |
| 00:02:24,719 | function but sometimes you'll have a |
| 00:02:25,858 | function that looks like this |
| 00:02:29,459 | okay |
| 00:02:33,299 | it would be insane to write a test case |
| 00:02:34,858 | for every single possible integer or |
| 00:02:36,358 | scenario so we need a programmatic way |
| 00:02:38,158 | to find this scenario now in our code we |
| 00:02:40,019 | also see a second exploit but we'll get |
| 00:02:41,818 | to that in a minute now there are two |
| 00:02:43,079 | popular methodologies to find these edge |
| 00:02:44,579 | cases fuzz tests slash invariant tests |
| 00:02:46,858 | and symbolic execution slash form of |
| 00:02:48,778 | verification we'll save the latter for |
| 00:02:50,459 | another video if we were writing our |
| 00:02:51,959 | code in Foundry this would be our unit |
| 00:02:53,519 | test writing a fuzz test in Foundry |
| 00:02:55,619 | where we do all this random inputting is |
| 00:02:57,358 | going to be really similar instead of us |
| 00:02:59,099 | manually selecting our data right in our |
| 00:03:01,079 | test parameter We'll add our variable |
| 00:03:02,459 | common out this line and that's it now |
| 00:03:04,679 | when we run a Foundry test here Foundry |
| 00:03:06,539 | will automatically randomize data run |
| 00:03:08,698 | through a code with a ton of different |
| 00:03:10,198 | examples this is as if they run with |
| 00:03:12,238 | data equals zero data equals one date |
| 00:03:14,579 | equals this number that's a t but |
| 00:03:16,379 | whatever you get the picture now if I |
| 00:03:17,818 | run my unit test you'll see that the |
| 00:03:19,858 | unit test actually passes however if we |
| 00:03:21,839 | run this fuzz test you'll see it |
| 00:03:23,519 | actually gives us an output where it |
| 00:03:25,019 | says assertion violated counter example |
| 00:03:27,358 | gives us the call data and the arguments |
| 00:03:29,639 | it was able to find out by randomly |
| 00:03:31,858 | throwing data at our function call that |
| 00:03:33,899 | two breaks our invariant AKA it makes it |
| 00:03:36,839 | such that should always be zero is not |
| 00:03:38,818 | zero now it's really doing semi-random |
| 00:03:40,858 | data instead of purely random data and |
| 00:03:42,420 | the way your fuzzer picks the random |
| 00:03:43,920 | data matters it won't be able to go over |
| 00:03:46,198 | every single possible unit 256 so |
| 00:03:48,778 | understanding how your fuzzers pick the |
| 00:03:50,459 | random data is an advanced thing that |
| 00:03:51,899 | you should learn later on at the moment |
| 00:03:53,339 | I think the trailer bits Echidna slash |
| 00:03:55,139 | optic integration is probably the best |
| 00:03:56,639 | fuzzer out there and it easily has the |
| 00:03:58,500 | best logo of all time but ripped Jesus |
| 00:04:00,420 | is a solid second so now that we have |
| 00:04:02,219 | our counter example here we can use this |
| 00:04:04,139 | to go back to our contract find out ah |
| 00:04:06,358 | okay so we are doing this wrong delete |
| 00:04:08,099 | this line and then run our test again |
| 00:04:10,198 | and see that it does indeed pass what's |
| 00:04:12,358 | important is this number down here the |
| 00:04:14,158 | number of runs so this did 256 different |
| 00:04:17,099 | random inputs to make our test run in |
| 00:04:19,379 | Foundry you can change the number of |
| 00:04:20,759 | runs in your foundry.tamil file by just |
| 00:04:23,399 | adding a section like this re-running |
| 00:04:25,679 | your tests and now you'll see it did a |
| 00:04:27,358 | thousand different examples the number |
| 00:04:28,679 | of runs is really important obviously |
| 00:04:30,000 | because more runs is more random inputs |
| 00:04:31,858 | more use cases more to answer that |
| 00:04:33,539 | you'll actually catch the issue and now |
| 00:04:35,158 | congrats that's the basic of fuss |
| 00:04:37,198 | testing let's just do a little recap |
| 00:04:38,579 | here before going further the first |
| 00:04:40,079 | thing you need to do is understand our |
| 00:04:41,939 | invariant or property of the system that |
| 00:04:44,219 | must always hold in our example should |
| 00:04:46,379 | always be zero was our invariant |
| 00:04:47,939 | understand your invariant and then write |
| 00:04:49,679 | a test that would input random data to |
| 00:04:51,899 | try to break that invariant now if we go |
| 00:04:53,879 | back to our example contract though |
| 00:04:55,259 | you'll see with our fuzz test we were |
| 00:04:57,000 | able to find this first use case however |
| 00:04:59,099 | it didn't find this second scenario |
| 00:05:01,379 | where it should always be zero was set |
| 00:05:02,759 | to 1 if hidden value was 7. in order for |
| 00:05:05,039 | this to revert hidden value would need |
| 00:05:06,839 | to be seven and the only way to set |
| 00:05:08,459 | hidden value to 7 would be to First Call |
| 00:05:11,339 | do stuff with 7 which would set hidden |
| 00:05:13,679 | value down here and then call do stuff |
| 00:05:15,238 | again with anything our fuzz test as |
| 00:05:17,399 | written would never be able to find this |
| 00:05:18,839 | that's because this fuzz test is known |
| 00:05:20,639 | as a stateless fuzz test which is where |
| 00:05:23,099 | the state of the previous run is |
| 00:05:24,899 | discarded for the next run we go back to |
| 00:05:26,759 | our balloon example stateless fuzzy |
| 00:05:28,318 | would be doing something to the balloon |
| 00:05:29,519 | for one fuzz run then discarding that |
| 00:05:31,559 | balloon and blowing up a new balloon for |
| 00:05:33,118 | each fuzz run however instead of doing |
| 00:05:35,639 | State less fuzzing we could do state |
| 00:05:37,618 | full fuzzing stateful fuzzing is where |
| 00:05:39,539 | the ending state of our previous fuzz |
| 00:05:41,399 | run is the starting state of the next |
| 00:05:43,559 | fuzz run for example instead of blowing |
| 00:05:45,539 | up a new balloon for each one of these |
| 00:05:47,278 | runs we just use the same balloon to do |
| 00:05:49,259 | multiple random things to it combined is |
| 00:05:51,479 | considered one fuzz run so a single fuzz |
| 00:05:54,000 | run on a stateless fuzz run would be |
| 00:05:55,920 | having data B7 calling do stuff just |
| 00:05:58,259 | using the same contract that we just |
| 00:06:00,059 | called do stuff on and then call another |
| 00:06:02,339 | function on it if this was a unit test |
| 00:06:03,959 | we had we would of course see this get |
| 00:06:05,579 | violated but as you can see with |
| 00:06:07,738 | sufficiently complicated code calling it |
| 00:06:09,719 | these very specific scenarios are going |
| 00:06:11,219 | to be missed to write a stateful fuzz |
| 00:06:12,959 | test and Foundry you need to use the |
| 00:06:14,639 | invariant keyword and it requires a |
| 00:06:16,618 | little bit of setup and don't get too |
| 00:06:17,939 | confused by the invariant keyword here |
| 00:06:19,439 | yes it's being a little overloaded right |
| 00:06:21,539 | in a very intestine Foundry we first |
| 00:06:23,339 | need to import this STD invariant |
| 00:06:25,559 | contract and inherit it in our test |
| 00:06:27,539 | contract then we need to tell Foundry |
| 00:06:30,238 | which contract to call random functions |
| 00:06:32,459 | on since we we have one contract with |
| 00:06:34,259 | one function we're going to tell Foundry |
| 00:06:35,939 | that my contract should be called and |
| 00:06:37,799 | it's allowed to call any of the |
| 00:06:39,000 | functions in my contract so we'd say hey |
| 00:06:41,039 | the Target contract for you is going to |
| 00:06:43,019 | be the address of example contract |
| 00:06:44,939 | Foundry is smart enough to know okay |
| 00:06:46,500 | it's going to grab any and all of the |
| 00:06:48,479 | functions from my contract and call them |
| 00:06:50,278 | in random orders with random data so |
| 00:06:52,019 | it's going to call do stuff with random |
| 00:06:53,459 | data and then it's going to call do |
| 00:06:54,599 | stuff with random data and then it's |
| 00:06:55,979 | going to call do stuff with random data |
| 00:06:57,299 | since do stuff is the only function now |
| 00:06:58,858 | we can write our invariant by saying |
| 00:07:00,599 | function invariant test always is zero |
| 00:07:03,778 | oblique and we can just add our assert |
| 00:07:06,000 | assert our example contract that should |
| 00:07:07,799 | always be zero is zero so it'll run do |
| 00:07:10,079 | stuff with some random data if it |
| 00:07:11,879 | happens across seven it'll set hidden |
| 00:07:14,158 | value to 7 and then it'll call do stuff |
| 00:07:16,379 | again with hidden values starting at 7 |
| 00:07:19,799 | which will trigger this conditional so |
| 00:07:22,139 | now if we run this test we can see it |
| 00:07:24,238 | does indeed find a sequence where r |
| 00:07:26,219 | invariant or our assertion or our |
| 00:07:28,318 | property is broken we can see first on |
| 00:07:30,539 | my contract it's going to call do stuff |
| 00:07:32,759 | Within an argument of seven and then |
| 00:07:34,858 | it's going to call my contract with an |
| 00:07:37,019 | argument of some random number because |
| 00:07:38,939 | it doesn't matter what the input is |
| 00:07:40,259 | after it sets it to seven so now that we |
| 00:07:42,539 | have that we can go back to our code |
| 00:07:44,879 | remove this come back to our test rerun |
| 00:07:48,658 | our test and we'll find that our code is |
| 00:07:51,420 | now safe and sound because our |
| 00:07:52,979 | invariance hold up now an important |
| 00:07:55,858 | aside on the term invariant Foundry uses |
| 00:07:57,839 | the term invariant to describe this |
| 00:07:59,639 | stateful fuzzing state less fuzzing is |
| 00:08:01,679 | when you give random data to an input to |
| 00:08:03,658 | a function to see if it breaks them |
| 00:08:04,858 | invariant State full fuzzing is when you |
| 00:08:07,139 | give random data and random function |
| 00:08:09,000 | calls to a system to see if it breaks |
| 00:08:10,738 | them invariant in Foundry fuzzing is |
| 00:08:12,539 | stateless fuzzing and invariants are |
| 00:08:14,579 | stateful fuzzing so when people are |
| 00:08:15,899 | talking about invariance and Foundry |
| 00:08:17,339 | they're usually talking about stateful |
| 00:08:18,778 | fuzzing if they talk about fuzzing and |
| 00:08:21,179 | Foundry they're talking about State less |
| 00:08:22,559 | fuzzing even though they're both |
| 00:08:23,759 | technically fuzzing there's an issue on |
| 00:08:25,379 | the repo to potentially change the name |
| 00:08:26,759 | but I digress so in a real smart |
| 00:08:28,259 | contract your invariant won't be that a |
| 00:08:30,059 | balloon shouldn't pop or some function |
| 00:08:31,618 | should always be zero it might be |
| 00:08:32,939 | something like new tokens minted is less |
| 00:08:35,579 | than the inflation rate there should |
| 00:08:37,079 | only be one winner in a random Lottery |
| 00:08:38,519 | someone shouldn't be able to take more |
| 00:08:40,318 | money out of the protocol than they put |
| 00:08:41,698 | in and let me tell you what at this |
| 00:08:43,019 | point congratulations you've learned the |
| 00:08:44,939 | basics of fuzzing this is something that |
| 00:08:46,920 | even some of the top protocols in this |
| 00:08:48,479 | space don't use and this is something |
| 00:08:49,979 | that we and siphon use to find High |
| 00:08:51,658 | severity vulnerabilities in smart |
| 00:08:53,339 | contracts hey I'm Alex Rohn co-founder |
| 00:08:56,039 | at cyphron we use invariant tests during |
| 00:08:58,198 | our audits to identify vulnerabilities |
| 00:09:00,539 | that are often difficult to catch purely |
| 00:09:04,259 | with manual reviews that's not to say |
| 00:09:06,118 | they're a silver bullet they are in no |
| 00:09:08,399 | way a replacement for experts manual |
| 00:09:11,099 | review but they certainly can Aid in the |
| 00:09:14,219 | audit process this needs to be the new |
| 00:09:16,799 | floor for security in web3 if you're |
| 00:09:19,019 | working with a protocol that isn't doing |
| 00:09:20,879 | stateful fuzzing or invariants or fuzz |
| 00:09:23,158 | test red flag get them to use it make a |
| 00:09:25,799 | PR number one understand what the |
| 00:09:28,379 | invariants are number two write |
| 00:09:30,839 | functions that can execute them do not |
| 00:09:33,899 | go to audit without these don't let your |
| 00:09:36,299 | Auditors let you get away with not |
| 00:09:37,920 | having them so this video was just to |
| 00:09:39,839 | give you the basics and if you want to |
| 00:09:41,339 | learn the advanced fuzzing strategies on |
| 00:09:42,959 | how to fuzz like Pro be sure to watch |
| 00:09:44,579 | our next video on the topic as that'll |
| 00:09:46,559 | give you the keys to write professional |
| 00:09:47,759 | fuzz and professional invariant tests |
| 00:09:49,799 | come on gang let's make web3 better and |
| 00:09:52,379 | I'll see you next time |
| 00:09:55,000 | [Music] |
| 00:09:58,559 | foreign |
| 00:10:03,139 | so now we've learned a little bit about |
| 00:10:05,579 | invariant tests or fuzzing tests and why |
| 00:10:08,278 | they are so absolutely crucial |
| 00:10:10,318 | especially for a project like this so |
| 00:10:13,198 | we're going to write some stateful fuzz |
| 00:10:14,759 | tests or invariant tests and Foundry so |
| 00:10:17,818 | we can have some more confidence that |
| 00:10:19,139 | our code actually does what we want it |
| 00:10:20,939 | to do and the method that we saw in that |
| 00:10:24,539 | video that we just watched is kind of |
| 00:10:25,979 | the most basic |
| 00:10:27,479 | methodology out there if we go to The |
| 00:10:29,579 | Foundry docs we can go on the left side |
| 00:10:31,858 | go all the way down to buzz testing or |
| 00:10:34,738 | excuse me all the way down to this |
| 00:10:36,839 | invariant testing which invariant |
| 00:10:38,519 | testing like I said is stateful fuzz |
| 00:10:40,019 | testing we can read more about some of |
| 00:10:42,179 | the more advanced ways to do these fuzz |
| 00:10:44,278 | tests or these invariant tests we're |
| 00:10:46,679 | still going to do the target contracts |
| 00:10:48,059 | but what we saw in the video was a type |
| 00:10:50,879 | of open testing right where we just have |
| 00:10:53,399 | function in variant a and then the |
| 00:10:55,439 | assert and what this does is it just |
| 00:10:58,019 | calls all the functions on this contract |
| 00:11:00,299 | to try to break that invariant now this |
| 00:11:02,939 | is good this is great for an initial run |
| 00:11:05,879 | of the code however we want to do for |
| 00:11:08,639 | more advanced systems like ours Handler |
| 00:11:11,158 | based testing sufficiently complex |
| 00:11:13,198 | Protocols are going to have so many |
| 00:11:15,118 | different random intricacies that we |
| 00:11:17,278 | want to narrow down the random call so |
| 00:11:20,339 | that we can have a higher likelihood of |
| 00:11:21,959 | getting and catching actual errors so |
| 00:11:24,299 | we're going to do this handler-based |
| 00:11:25,738 | type of testing in this example here in |
| 00:11:28,198 | this open testing it just calls any of |
| 00:11:30,000 | the functions in the contract in any |
| 00:11:31,439 | order and Handler based testing if we |
| 00:11:34,019 | scroll down we can kind of see this |
| 00:11:35,339 | example here where we create a contract |
| 00:11:37,679 | called Handler where we only call |
| 00:11:39,899 | functions in specific ways for example |
| 00:11:42,658 | when depositing tokens we need to make |
| 00:11:45,358 | sure and a proof happens beforehand if |
| 00:11:47,698 | you just call deposit without approving |
| 00:11:49,379 | that token that's kind of a wasted fuzz |
| 00:11:51,118 | run and if we only have 200 fuzz runs |
| 00:11:53,519 | and we're wasting them on failed fuzz |
| 00:11:55,259 | runs well we're the chance of us |
| 00:11:57,539 | actually finding a bug becomes smaller |
| 00:11:59,639 | so if you think of |
| 00:12:01,799 | the open fuzz testing like this where |
| 00:12:04,139 | you have Foundry you call a whole bunch |
| 00:12:06,000 | of functions on the protocol with the |
| 00:12:07,679 | asserts Handler is going to call |
| 00:12:10,198 | functions in specific ways to the |
| 00:12:12,658 | function so that we have a higher |
| 00:12:14,698 | likelihood of calling functions and |
| 00:12:16,618 | orders that we want |
| 00:12:18,118 | so we're going to learn about this |
| 00:12:19,559 | handler-based methodology and we're |
| 00:12:21,778 | going to build an incredibly verbose |
| 00:12:24,439 | testing or invariant testing setup now |
| 00:12:28,559 | and our foundry.tamil to work with these |
| 00:12:31,139 | fuzz with these invariant tests we can |
| 00:12:32,698 | do this in variant section here we can |
| 00:12:35,519 | say the number of runs we'll say is 128. |
| 00:12:37,979 | we can also say the depth which is the |
| 00:12:40,618 | number of calls in a single run which we |
| 00:12:43,198 | might do 128 and then one of the most |
| 00:12:45,420 | important keywords you're going to run |
| 00:12:46,738 | into is this fail on revert so let's |
| 00:12:50,519 | talk about this fail on revert keyword |
| 00:12:52,198 | and setting so to create some invariant |
| 00:12:54,539 | tests let's create a new folder or Buzz |
| 00:12:57,358 | test called fuzz or invariant or |
| 00:12:58,979 | whatever you want to call it and in here |
| 00:13:00,839 | we're going to need to actually create |
| 00:13:01,979 | two different files we're going to do |
| 00:13:04,618 | invariance invariance |
| 00:13:07,879 | test.t.sol and then |
| 00:13:11,899 | handler.t.soul this invariance file is |
| 00:13:14,698 | going to have have our invariance |
| 00:13:17,698 | AKA are properties of the system that |
| 00:13:20,099 | should always hold right that we just |
| 00:13:21,839 | learned from that video and this Handler |
| 00:13:24,000 | this Handler is going to narrow down the |
| 00:13:26,399 | way that we call functions this way we |
| 00:13:28,979 | don't waste runs like I was saying again |
| 00:13:31,198 | if we call the positive collateral in |
| 00:13:33,358 | our stable coin without approving that |
| 00:13:35,519 | stable coin that's kind of a wasted run |
| 00:13:37,559 | and we don't want to waste runs so this |
| 00:13:40,559 | Handler is going to set our code up or |
| 00:13:42,539 | set our contracts up so that we don't |
| 00:13:44,939 | waste these runs and we're going to come |
| 00:13:47,099 | back to this fail and revert in a second |
| 00:13:48,420 | for now let's actually set this to false |
| 00:13:50,459 | and we'll set it to True soon but so the |
| 00:13:53,759 | first thing we always want to do when |
| 00:13:55,439 | writing and varying tests when working |
| 00:13:56,818 | with this is you want to ask the |
| 00:13:58,979 | question what are our invariance what |
| 00:14:03,719 | are the properties of the system that |
| 00:14:05,759 | should always hold well we can think of |
| 00:14:08,339 | something right well one the total |
| 00:14:11,759 | supply of DSC |
| 00:14:14,459 | should be less than the total value of |
| 00:14:18,920 | collateral follow the word wrap which |
| 00:14:22,019 | the total supply of DSC which is |
| 00:14:23,879 | essentially the debt should always be |
| 00:14:25,379 | less than the total value of collateral |
| 00:14:27,000 | great we have an invariant that we can |
| 00:14:28,858 | test and we should throw a ton of random |
| 00:14:32,099 | function calls to try to break this one |
| 00:14:33,658 | okay what else what other invariants |
| 00:14:35,879 | should we have maybe our getter |
| 00:14:38,339 | functions our getter view functions |
| 00:14:41,039 | should never |
| 00:14:42,539 | revert and this is actually sort of an |
| 00:14:45,358 | evergreen |
| 00:14:46,679 | invariance most protocols can and should |
| 00:14:50,219 | probably just have in a variant that |
| 00:14:51,599 | looks like this getter view function |
| 00:14:53,219 | should never revert now we can probably |
| 00:14:56,158 | think of more but because doing these |
| 00:14:58,799 | invariant tests can be a little bit time |
| 00:15:00,358 | intensive we're just going to focus on |
| 00:15:02,039 | these two for now these are going to be |
| 00:15:03,358 | the two invariants that we focus on we |
| 00:15:05,519 | try to work with so let's begin working |
| 00:15:09,658 | and writing our invariant tests and then |
| 00:15:11,879 | we're also going to write our Handler |
| 00:15:13,799 | to help make sure all the function calls |
| 00:15:15,778 | that we're working with actually do what |
| 00:15:17,459 | we want them to do okay let's do it so |
| 00:15:20,939 | this is going to be another test file so |
| 00:15:22,920 | spdx license |
| 00:15:26,039 | identifier MIT |
| 00:15:27,778 | pragma |
| 00:15:29,099 | so that's nice that kind of just |
| 00:15:31,738 | automatically added it for me let's put |
| 00:15:33,899 | this to the top |
| 00:15:35,099 | zero point |
| 00:15:37,219 | 8.18 a little carrot here |
| 00:15:40,259 | contract |
| 00:15:41,519 | and variance test like this and to do |
| 00:15:45,778 | this we're going to say we have to |
| 00:15:47,939 | import some stuff we're going to import |
| 00:15:48,959 | test |
| 00:15:50,158 | from Forge TD slash test that's all |
| 00:15:54,479 | and import |
| 00:15:55,879 | STD in |
| 00:15:57,959 | variant from Forge STD STD invariant |
| 00:16:04,738 | dot Sol that's contract invarian test |
| 00:16:07,500 | and then we're going to say this is STD |
| 00:16:10,198 | invariant and its test |
| 00:16:13,079 | so the STD invariant contract if we |
| 00:16:15,358 | click into it it has all this stuff that |
| 00:16:17,939 | we're going to need to work with the |
| 00:16:19,559 | invariance one of the most important |
| 00:16:21,179 | functions that it gives us is this |
| 00:16:22,920 | Target contract where it says hey this |
| 00:16:26,039 | is the contract I want you to call all |
| 00:16:28,259 | these random functions on okay right now |
| 00:16:31,618 | just like our normal tests we're going |
| 00:16:33,420 | to have a function setup external like |
| 00:16:37,139 | this and we're going to set up some |
| 00:16:39,118 | stuff right a lot of this is going to |
| 00:16:40,979 | look similar to our unit tests so we're |
| 00:16:43,079 | going to have to import deploy DSC from |
| 00:16:47,778 | dot dot slash dot dot slash script slash |
| 00:16:51,420 | deploy |
| 00:16:53,000 | DSC dot s dot Sol import d s c e engine |
| 00:17:02,179 | SRC slash |
| 00:17:05,000 | DSC engine dotsoul like this |
| 00:17:09,358 | and we'll say |
| 00:17:10,858 | the deploy DSC deployer deployer |
| 00:17:16,379 | lawyer equals new |
| 00:17:18,420 | deploy DSC and then of course |
| 00:17:21,358 | BC engine dsce dsce equals |
| 00:17:26,238 | deployer dot run and this actually |
| 00:17:29,278 | returns a whole bunch of stuff |
| 00:17:31,559 | Central stablecoin DSE and helper config |
| 00:17:34,738 | so this is going to be we also need a |
| 00:17:37,019 | DSC so we're going to import that import |
| 00:17:39,920 | the centralized stablecoin from dot dot |
| 00:17:43,080 | slash dot slash SRC slash |
| 00:17:45,658 | centralizedible coin that's sole so |
| 00:17:47,698 | we're going to do central stablecoin DSC |
| 00:17:50,000 | and let's get the helper config as well |
| 00:17:52,759 | import helper config config from |
| 00:17:58,738 | dot dot slash dot slash script |
| 00:18:01,920 | slash helperconfig dot s dot sole upper |
| 00:18:05,818 | config config right and so this turns |
| 00:18:09,059 | the DSC dsce and config equals |
| 00:18:13,139 | deployer.run right and now if we were |
| 00:18:16,618 | doing this open testing methodology |
| 00:18:18,420 | right if we go back to the docs here |
| 00:18:20,158 | we're doing this open testing |
| 00:18:21,959 | methodology we could kind of finish this |
| 00:18:24,839 | right now |
| 00:18:26,099 | what we would do is we would say Target |
| 00:18:28,858 | contract |
| 00:18:30,599 | address |
| 00:18:32,039 | dsce like this paste this in here and |
| 00:18:36,238 | then just by adding this we're telling |
| 00:18:38,459 | Foundry hey go ahead go wild on this |
| 00:18:40,979 | right go absolutely wild in this and |
| 00:18:43,139 | actually let's even rename this call |
| 00:18:45,059 | this |
| 00:18:45,839 | open |
| 00:18:47,839 | invariantest.t.sol open |
| 00:18:50,539 | invariantest.tt.sol so we'll say |
| 00:18:52,500 | absolutely Go Buck Wild on this and now |
| 00:18:54,719 | we can add our invariant right we'll say |
| 00:18:56,639 | function |
| 00:18:57,618 | invariant variant underscore protocol |
| 00:19:02,238 | must must have more value |
| 00:19:06,539 | than total Supply this will be a view |
| 00:19:10,080 | function and what we can just say is we |
| 00:19:13,738 | want to get the value of the of all the |
| 00:19:18,959 | lateral in the protocol |
| 00:19:21,179 | compare it |
| 00:19:22,618 | to all the debt or the DSC |
| 00:19:26,039 | so we can do that pretty easily by using |
| 00:19:28,019 | the collaterals itself right using our |
| 00:19:30,420 | helper config we'll say helper |
| 00:19:33,679 | config.active Network config we can get |
| 00:19:38,278 | the what does this one do again let's |
| 00:19:40,738 | open up the helper config we can get |
| 00:19:42,899 | these two tokens and just say okay well |
| 00:19:44,698 | what's the balance of these two tokens |
| 00:19:46,500 | in our DSC engine and then what's their |
| 00:19:49,019 | value right so we'll just get those two |
| 00:19:51,179 | tokens we're going to do nothing nothing |
| 00:19:52,679 | with Bitcoin nothing so we'll do blank |
| 00:19:56,039 | blank weft BTC nothing and then those |
| 00:20:00,479 | are erc20s so we'll import import |
| 00:20:04,858 | I erc20 from |
| 00:20:08,879 | all right cool that looks good |
| 00:20:11,639 | it's also erc20 West irc20 BTC this is |
| 00:20:16,559 | raft BTC ramped BTC oops sorry this is |
| 00:20:20,339 | config that Active network config we |
| 00:20:23,818 | need to wrap this our erc20 |
| 00:20:27,019 | irc20 like this what am I messing up oh |
| 00:20:31,439 | let's do do address weft then address |
| 00:20:34,139 | BTC |
| 00:20:36,479 | like this all right cool so we're |
| 00:20:38,939 | getting weth in Bitcoin it's gonna be |
| 00:20:41,158 | wrapped eth and wrapped Bitcoin and now |
| 00:20:43,139 | what we can do |
| 00:20:44,278 | is first we'll say you went to 256 total |
| 00:20:47,399 | Supply equals DSC dot total Supply so |
| 00:20:52,618 | this is the total supply of all DSC in |
| 00:20:55,139 | the entire world right and we know the |
| 00:20:57,000 | only way to Mint DSC is through the DSC |
| 00:20:59,158 | engine so through people depositing and |
| 00:21:01,500 | withdrawing collateral now what we can |
| 00:21:03,420 | do is we can say okay let's get the U |
| 00:21:05,278 | into 256 |
| 00:21:06,959 | total total width deposited |
| 00:21:10,439 | equals |
| 00:21:11,879 | and this is where we can do ier C20 West |
| 00:21:15,299 | dot balance of address DSC so this is |
| 00:21:19,979 | going to be the total amount of weft |
| 00:21:22,099 | deposited into that contract or just the |
| 00:21:25,679 | total amount of weth sent to that |
| 00:21:27,420 | contract |
| 00:21:28,500 | and we're going to say un256 total BTC D |
| 00:21:32,339 | posited equals |
| 00:21:34,818 | irc20 wrapped BTC Dot |
| 00:21:38,759 | balance of address DSC so we have the |
| 00:21:42,539 | total Wes total Bitcoin |
| 00:21:44,639 | now we can get those values we can say |
| 00:21:46,559 | unit 256 weth value equals we have a |
| 00:21:51,479 | function here called get USD value or we |
| 00:21:53,759 | can get the USD value of any token of |
| 00:21:55,738 | any amount so we're just going to use |
| 00:21:57,179 | that |
| 00:21:58,198 | with value is going to be |
| 00:22:00,559 | dsce.getusd value weth and the total |
| 00:22:04,920 | width deposited un256 wrapped BTC value |
| 00:22:09,118 | same thing get USD value rap b2c total |
| 00:22:12,479 | BTC deposited and now what we can do is |
| 00:22:16,439 | we can do |
| 00:22:18,539 | assert the width Value Plus the wrapped |
| 00:22:23,459 | Bitcoin value is greater than the total |
| 00:22:25,738 | Supply and this is all we would need to |
| 00:22:28,979 | do |
| 00:22:29,698 | for this open testing this open |
| 00:22:32,519 | invariance that's it we're done boom and |
| 00:22:36,299 | this is why this is the easiest type of |
| 00:22:37,920 | invariant test but you'll see |
| 00:22:40,259 | running this we won't get great results |
| 00:22:42,420 | so let's do Forge test.m |
| 00:22:44,639 | and now what this is going to do is it's |
| 00:22:46,618 | going to call all types of functions |
| 00:22:49,259 | on our DSE and try to break this |
| 00:22:53,039 | invariant so it looks like |
| 00:22:55,799 | it was able to break this really easily |
| 00:22:58,618 | so let's clear this and we'll add our |
| 00:23:00,599 | Dash VV VV |
| 00:23:03,539 | we'll see what's up |
| 00:23:09,899 | yep yep assertion violated we're having |
| 00:23:12,719 | a hard time actually seeing the numbers |
| 00:23:15,000 | so we're going to import console in here |
| 00:23:17,759 | test console |
| 00:23:19,979 | and we're just going to say |
| 00:23:22,439 | console DOT log |
| 00:23:25,019 | width value |
| 00:23:26,639 | semicolon |
| 00:23:28,259 | with value |
| 00:23:29,939 | or that's rapid BTC Wes Wes graph BTC |
| 00:23:34,198 | value |
| 00:23:35,420 | console.log |
| 00:23:37,019 | total Supply total Supply |
| 00:23:39,059 | let's run this again now what do we get |
| 00:23:43,439 | well we got our first issue is that |
| 00:23:45,719 | these are all zeros right and if they're |
| 00:23:48,539 | all zeros then |
| 00:23:50,039 | this doesn't hold so we can do greater |
| 00:23:52,618 | than or equal to this is kind of a bit |
| 00:23:55,019 | of a cop-out right because if they're |
| 00:23:56,939 | equal that makes us nervous but it's |
| 00:23:59,459 | fine right we should always at least |
| 00:24:00,959 | have more collateral in the system than |
| 00:24:02,818 | total Supply so now let's try again run |
| 00:24:05,158 | this test again |
| 00:24:06,299 | file it runs successful |
| 00:24:08,039 | and we get hey you pass there's no way |
| 00:24:11,519 | for us to make it such that the total |
| 00:24:13,559 | Supply is lower so this is awesome right |
| 00:24:17,219 | well |
| 00:24:18,839 | it's not that awesome |
| 00:24:20,278 | we didn't find any issues and we're |
| 00:24:22,139 | looking to find issues so maybe we need |
| 00:24:24,299 | to bump up the number of runs and we |
| 00:24:26,639 | need to bump it up to a thousand |
| 00:24:28,799 | and let's run this again now you're |
| 00:24:31,379 | going to see this is going to take a lot |
| 00:24:33,299 | longer because before I was doing 100 |
| 00:24:35,339 | runs at 128 depth now let's do a |
| 00:24:38,158 | thousand runs in each one of these runs |
| 00:24:40,379 | has 128 so it took a lot longer and you |
| 00:24:43,738 | can see |
| 00:24:44,698 | that it took 14 seconds as opposed to |
| 00:24:47,299 | what did it do before with 128 we run |
| 00:24:50,639 | that |
| 00:24:54,179 | it did it in one half seconds |
| 00:24:56,580 | but if we look up here on this line this |
| 00:24:58,858 | line is incredibly important we have |
| 00:25:00,658 | calls and we have reverts so this made |
| 00:25:03,719 | 16 384 calls and reverted sixteen |
| 00:25:07,679 | thousand three hundred eighty four times |
| 00:25:09,658 | so basically it wasn't even able to do |
| 00:25:12,000 | anything right so what if we bump this |
| 00:25:14,879 | up to a thousand clear |
| 00:25:16,920 | run this |
| 00:25:18,059 | we're gonna have to wait a few more |
| 00:25:19,618 | seconds again |
| 00:25:24,420 | oh |
| 00:25:26,399 | so it did this many calls and it also |
| 00:25:28,679 | reverted this many times |
| 00:25:30,599 | and the reason that this is still saying |
| 00:25:33,118 | pass though is because we have this |
| 00:25:34,858 | fail-on revert equals false |
| 00:25:37,439 | and this failover equals false has some |
| 00:25:39,839 | pros and it has some cons |
| 00:25:42,839 | Pro of fail in Reverse equals false is |
| 00:25:45,719 | that we can very quickly write open |
| 00:25:48,658 | testing functions like this and we can |
| 00:25:51,179 | very quickly write |
| 00:25:52,920 | minimal Handler functions that aren't |
| 00:25:54,778 | perfect but the downside is it's hard |
| 00:25:57,059 | for us to make sure that all the calls |
| 00:25:59,339 | we're making actually make sense right |
| 00:26:01,439 | because this could be calling on our on |
| 00:26:04,618 | our engine maybe it's just trying to to |
| 00:26:06,839 | deposit collateral but it keeps using |
| 00:26:09,000 | random collateral out addresses that |
| 00:26:10,799 | don't make any sense so maybe it's |
| 00:26:12,059 | calling this 128 |
| 00:26:14,939 | 000 times with 128 different collateral |
| 00:26:17,278 | addresses but only two work right so |
| 00:26:20,818 | doing like this is cool for kind of some |
| 00:26:23,818 | Sandy check and maybe it'll catch |
| 00:26:25,198 | something but it seems like it's not |
| 00:26:26,759 | actually catching anything right and |
| 00:26:28,858 | that's not a very good use of this so |
| 00:26:31,139 | revert on false is fantastic for quick |
| 00:26:34,080 | tests and often if I'm doing a |
| 00:26:36,479 | competitive audit which you can learn |
| 00:26:38,639 | more about in the security course coming |
| 00:26:41,339 | out soon hopefully |
| 00:26:43,318 | if I'm doing competitive audit a lot of |
| 00:26:45,118 | times I will have revert on false be |
| 00:26:47,039 | false just so I can write up and very |
| 00:26:50,039 | tests quickly I will also write handlers |
| 00:26:52,738 | as well like mini handlers just so I |
| 00:26:55,559 | don't have to get every nook and cranny |
| 00:26:56,879 | but I still will write a Handler so I |
| 00:26:58,799 | can narrow down some of the functions |
| 00:27:01,439 | but this open invariant seems to have |
| 00:27:04,500 | this major flaw where it's probably |
| 00:27:06,000 | making a bunch of silly calls so this is |
| 00:27:10,019 | great for very small contracts but the |
| 00:27:12,539 | more complex you get like our system |
| 00:27:13,979 | here this open invariant system it |
| 00:27:17,339 | probably doesn't make sense for us to do |
| 00:27:18,539 | because it's not going to catch anything |
| 00:27:19,559 | it's just going to keep breaking now if |
| 00:27:21,599 | we set this to true we open this back up |
| 00:27:24,118 | we run this again you'll see |
| 00:27:27,479 | exactly one of the calls it makes that |
| 00:27:29,939 | breaks so it looks like it called redeem |
| 00:27:32,459 | collateral for you for DSC this is the |
| 00:27:35,339 | first function call it made which |
| 00:27:36,719 | obviously doesn't make any sense because |
| 00:27:38,158 | you can't redeem any collateral unless |
| 00:27:39,719 | you have deposited collateral you can |
| 00:27:41,759 | just and you can see the args it put in |
| 00:27:43,439 | it put in some random address some |
| 00:27:45,719 | random amount a random amount and then |
| 00:27:48,799 | another random number right and you'll |
| 00:27:52,559 | see we can call this many times and |
| 00:27:55,259 | it'll keep giving us different places |
| 00:27:57,118 | that it ran into issues when we say |
| 00:27:59,278 | revert on false is true this can give us |
| 00:28:01,979 | some peace of mind knowing that if this |
| 00:28:05,339 | test passes that means all of the |
| 00:28:07,379 | transactions that went through actually |
| 00:28:08,939 | went through and it didn't make a bunch |
| 00:28:10,979 | of really dumb calls here right so here |
| 00:28:12,778 | fail on revert was false we called |
| 00:28:15,238 | liquidate first which obviously doesn't |
| 00:28:17,698 | make any sense with this with some |
| 00:28:20,580 | horrible random address some horrible |
| 00:28:22,559 | random address some random amount right |
| 00:28:24,420 | none of these make any sense we call it |
| 00:28:26,580 | again we we failed again it called |
| 00:28:28,979 | deposit collateral mint DSE which is |
| 00:28:30,899 | good all right so we're trying to |
| 00:28:32,039 | deposit collateral but it used some |
| 00:28:33,658 | random address that isn't approved some |
| 00:28:36,238 | horrible amounts here and it just keeps |
| 00:28:38,759 | failing right so we want to try to |
| 00:28:41,219 | prevent and you can see here in the call |
| 00:28:42,778 | summary it made one run one call and |
| 00:28:45,719 | that call reverted right so we want to |
| 00:28:48,899 | narrow this down to say to try to point |
| 00:28:51,539 | our fuzz our random runs in a direction |
| 00:28:54,299 | that makes a lot more sense |
| 00:28:56,278 | right so this is cool |
| 00:28:58,500 | not great opening variance I'm just now |
| 00:29:01,259 | going to comment out this whole page |
| 00:29:03,000 | because |
| 00:29:04,019 | we're not going to use this anymore okay |
| 00:29:05,639 | we're going to leave the file in here |
| 00:29:07,259 | though we're gonna create a new file |
| 00:29:08,580 | though we're going to call this |
| 00:29:09,778 | invariance |
| 00:29:11,519 | T dot Sol I am going to copy this whole |
| 00:29:14,039 | invariance thing |
| 00:29:15,299 | based in here and uncommon it and we're |
| 00:29:17,219 | going to level this up so that this |
| 00:29:19,139 | invariance file actually let's just call |
| 00:29:20,939 | this invariance |
| 00:29:23,158 | so that this new one is using this |
| 00:29:25,379 | Handler method it's using this Handler |
| 00:29:27,539 | method to narrow down the function calls |
| 00:29:30,299 | and we'll do a mix of setting this to |
| 00:29:32,639 | true and false and you'll see where some |
| 00:29:34,618 | of the advantages and disadvantages are |
| 00:29:40,379 | so we have our invariance file we have |
| 00:29:42,479 | our Target contract here but we want to |
| 00:29:44,818 | make sure we call this in a sensical |
| 00:29:47,698 | order for example hey don't call redeem |
| 00:29:52,139 | collateral unless there is collateral to |
| 00:29:56,339 | redeem right maybe we want to set this |
| 00:29:59,219 | up so we're going to create a Handler |
| 00:30:01,039 | which is going to handle the way we |
| 00:30:03,719 | actually make calls to the dsce |
| 00:30:05,818 | so it's basically going to instead of us |
| 00:30:07,559 | just randomly calling redeem collateral |
| 00:30:09,118 | we're only going to be able to call |
| 00:30:10,500 | redeem collateral if there is collateral |
| 00:30:12,358 | to redeem right because otherwise the |
| 00:30:13,799 | transaction is just going to revert and |
| 00:30:15,118 | that's a waste of function call so now |
| 00:30:17,459 | we're going to create this Handler and |
| 00:30:19,500 | instead of our Target contract being the |
| 00:30:22,080 | dsce our Target contract is going to be |
| 00:30:24,299 | this Handler which handles the way we |
| 00:30:26,939 | make those calls okay so we're going to |
| 00:30:29,459 | do spdx license identifier MIT as you |
| 00:30:32,939 | already know fragma zero solidity |
| 00:30:37,459 | 0.818 a little carrot contract |
| 00:30:41,519 | Handler like this and then we're going |
| 00:30:44,580 | to say this contract Handler is going to |
| 00:30:46,920 | be test as well and this is definitely |
| 00:30:49,500 | some Advanced code here so don't get too |
| 00:30:52,500 | discouraged if it doesn't make sense or |
| 00:30:54,179 | if it's hard the first time okay so |
| 00:30:56,278 | we're going to import |
| 00:30:57,599 | test |
| 00:30:58,679 | from Forge STD slash test.soul |
| 00:31:03,059 | remember to ask questions and use the |
| 00:31:04,858 | forms so what's one of the first things |
| 00:31:07,500 | you want to do hey don't call redeem |
| 00:31:09,238 | collateral unless there is even |
| 00:31:10,618 | collateral to redeem right we want to |
| 00:31:12,299 | make sure that that's this is a valid |
| 00:31:13,799 | run hey only call redeem collateral when |
| 00:31:16,318 | there is collateral in there so this |
| 00:31:19,799 | function this contract is going to do |
| 00:31:22,080 | that for us we do need to make a |
| 00:31:24,299 | Constructor though |
| 00:31:25,500 | so that this Handler contract knows what |
| 00:31:29,818 | the DSC engine even is right because |
| 00:31:32,698 | it's going to be the one making the |
| 00:31:33,959 | calls to it so we do need to import the |
| 00:31:35,879 | DSC engine from dot dot slash dot slash |
| 00:31:40,500 | SRC dscng.sol we also need to import the |
| 00:31:44,399 | decentralized stablecoin from the |
| 00:31:46,738 | decentralized stablecoin.sol construct |
| 00:31:49,019 | door and these are going to be the main |
| 00:31:51,118 | functions these are going to be the main |
| 00:31:53,158 | contracts that our Handler is going to |
| 00:31:54,599 | call so we're going to say dscn.dsce and |
| 00:31:57,539 | then we're going to say decentral and |
| 00:31:58,799 | stablecoin DSC and in the Constructor |
| 00:32:01,618 | here we're going to say DSC engine |
| 00:32:04,259 | underscore DSC engine |
| 00:32:07,439 | and essentially stablecoin |
| 00:32:09,539 | underscore DSC and then we're just going |
| 00:32:12,179 | to say oh cool it already added dsce DSC |
| 00:32:16,019 | engine DSC it's underscore DSC |
| 00:32:18,899 | so because these are the contracts that |
| 00:32:20,399 | we want the Handler to handle making the |
| 00:32:22,738 | calls to Great makes sense so let's talk |
| 00:32:26,939 | about this redeem collateral right let's |
| 00:32:29,698 | just focus on on making this not revert |
| 00:32:32,099 | so we're going to say okay call this |
| 00:32:34,439 | when you have collateral so the first |
| 00:32:36,179 | thing we probably need to do is what if |
| 00:32:38,759 | I deposit collateral right so we'll |
| 00:32:41,158 | create a function |
| 00:32:42,299 | called deposit |
| 00:32:44,278 | the lateral |
| 00:32:46,019 | and this function is going to look a |
| 00:32:47,519 | little different than the deposit |
| 00:32:50,399 | collateral in the DSC engine right if |
| 00:32:52,080 | we're looking here this is what it does |
| 00:32:54,059 | but we're going to set this deposit |
| 00:32:56,339 | collateral function up in our Handler so |
| 00:32:58,559 | that this transaction always goes |
| 00:33:00,599 | through right it doesn't revert but we |
| 00:33:02,639 | do want to keep the randomization right |
| 00:33:04,559 | we want to deposit random collaterals |
| 00:33:07,379 | that are valid collaterals so what we |
| 00:33:09,778 | can do is we can create a unit 256 |
| 00:33:11,719 | collateral seed and a unit 256 amount |
| 00:33:16,080 | collateral |
| 00:33:17,339 | collat or all and this is actually |
| 00:33:19,738 | really similar to the fuzz tests so in |
| 00:33:22,379 | your handlers whatever parameters you |
| 00:33:25,019 | have are going to be randomized so we're |
| 00:33:27,299 | going to pick a random one of the valid |
| 00:33:29,459 | collaterals to deposit and we're going |
| 00:33:31,259 | to pick a random amount of collateral |
| 00:33:33,179 | now I'm going to write this function |
| 00:33:35,399 | without any guard rails and it's going |
| 00:33:38,459 | to break and that's okay we're going to |
| 00:33:39,899 | fix it as we go along but if we were to |
| 00:33:42,358 | just not have any guardrails on this at |
| 00:33:45,238 | all we would just say DSC e dot the |
| 00:33:47,879 | posit collateral |
| 00:33:52,318 | and we would do you know collateral and |
| 00:33:56,039 | an amount collateral we could actually |
| 00:33:57,959 | just have this be address |
| 00:34:00,179 | collateral |
| 00:34:01,618 | an amount collateral we'd say deposit |
| 00:34:03,658 | this collateral and amount collateral |
| 00:34:07,259 | and this of course is probably going to |
| 00:34:09,420 | break a lot right because the collateral |
| 00:34:11,278 | we're going to pass is going to be wrong |
| 00:34:12,539 | this is a random address there are so |
| 00:34:14,158 | many addresses and the amount of |
| 00:34:15,899 | collateral could also break because |
| 00:34:17,158 | deposit collateral reverts on zero right |
| 00:34:19,379 | but I do want to show you what we're |
| 00:34:22,080 | actually going to do in our |
| 00:34:23,818 | actual contract here instead of having |
| 00:34:26,818 | our Target contract be the dsce what |
| 00:34:30,658 | we're going to do is we're going to say |
| 00:34:31,858 | Handler because we're going to import |
| 00:34:33,719 | this Handler so we're going to import |
| 00:34:35,420 | Handler from dot slash |
| 00:34:39,559 | handler.t.sol Handler Handler we're |
| 00:34:43,019 | going to say Handler equals new Handler |
| 00:34:46,920 | the SCE and DSC and now we're going to |
| 00:34:50,158 | say our targets contract is just the |
| 00:34:52,799 | Handler okay that's gonna be the address |
| 00:34:55,738 | Handler now with this the Handler only |
| 00:34:58,858 | has this one function |
| 00:35:00,719 | so we're going to call deposit |
| 00:35:02,580 | collateral through the Handler which is |
| 00:35:04,439 | going to call our engine and since this |
| 00:35:06,599 | is the only function for it to call |
| 00:35:08,698 | this is all we're going to see if we see |
| 00:35:10,618 | our invariance break so if I do Forge |
| 00:35:12,719 | test Dash M paste this in we're gonna |
| 00:35:15,299 | see it break almost instantly |
| 00:35:18,839 | with an issue but it's only going to be |
| 00:35:20,639 | deposit collateral because it's the only |
| 00:35:22,080 | function that we have right we run it |
| 00:35:24,299 | again it's still going to be deposit |
| 00:35:25,920 | collateral because that's the only |
| 00:35:26,939 | function the Handler has yes makes sense |
| 00:35:30,719 | okay cool hopefully it makes sense in |
| 00:35:33,719 | our foundry.tamil we could say fail on |
| 00:35:35,939 | revert is false we could run this again |
| 00:35:38,698 | let's make this a little bit lower 128 |
| 00:35:40,858 | and let's see if we get any valid runs |
| 00:35:43,379 | right let's see if we pick miraculously |
| 00:35:46,198 | a valid address and we get success but |
| 00:35:50,219 | oh it looks like we did do some valid |
| 00:35:52,080 | ones but we've got a ton of reverts here |
| 00:35:54,479 | we've got so many reverts here that |
| 00:35:56,219 | almost half of these runs almost half of |
| 00:35:58,379 | these calls were bad that's not a great |
| 00:36:00,658 | use of our and this isn't really super |
| 00:36:03,420 | helpful because of course |
| 00:36:05,580 | of course our invariant here is going to |
| 00:36:07,080 | hold because the only thing we've |
| 00:36:08,399 | allowed our system to do is deposit |
| 00:36:10,019 | collateral right ridiculous so if we |
| 00:36:13,439 | turn this back to true |
| 00:36:15,059 | we run this again we're of course going |
| 00:36:17,939 | to break now because some of these |
| 00:36:19,198 | deposits are going to fail right so |
| 00:36:21,778 | looks like if we call deposit collateral |
| 00:36:25,139 | with some horrible address it fails |
| 00:36:27,719 | right so that's one of the first things |
| 00:36:29,580 | we want to to have our handler do we |
| 00:36:32,519 | want to say hey you're only allowed to |
| 00:36:33,959 | deposit valid collateral so what we can |
| 00:36:36,778 | do in our Handler is we can set that up |
| 00:36:39,059 | hey you're only allowed to deposit valid |
| 00:36:41,578 | collateral instead of passing any |
| 00:36:43,920 | address as collateral we'll say you and |
| 00:36:46,318 | 256 collateral |
| 00:36:49,019 | seed okay |
| 00:36:51,179 | and what we're going to do with this |
| 00:36:52,618 | seed is we're going to have it pick from |
| 00:36:55,799 | our two collaterals we're going to have |
| 00:36:57,420 | it randomly pick either weft or BTC so |
| 00:37:01,139 | we're actually going to create a |
| 00:37:02,099 | function |
| 00:37:02,879 | helper functions |
| 00:37:04,559 | we're going to say function |
| 00:37:06,420 | underscore get collateral collateral |
| 00:37:09,719 | from seed unit 256 collateral seed |
| 00:37:14,339 | and we're going to make this a private |
| 00:37:16,078 | view function it's going to return an |
| 00:37:19,500 | Erse in iear C20 actually we're going to |
| 00:37:22,078 | do an erc20 Mock and I'll explain why in |
| 00:37:25,259 | a bit |
| 00:37:26,519 | we got to import that import here C20 |
| 00:37:29,399 | mock from add open Zeppelin contracts |
| 00:37:33,318 | mocks slash what is it mock ERC no erc20 |
| 00:37:38,519 | mock that's all cool and so what we're |
| 00:37:41,578 | going to do instead of this line is |
| 00:37:43,439 | we're going to use this line |
| 00:37:45,778 | this function to do it we're going to |
| 00:37:47,818 | say if |
| 00:37:49,379 | collateral collat or all |
| 00:37:53,219 | seed modulo 2 because we're only we only |
| 00:37:57,059 | have two collaterals equals equals zero |
| 00:37:59,519 | then return with we can get with |
| 00:38:04,379 | by sticking at the top we'll say erc20 |
| 00:38:07,019 | Mach West |
| 00:38:09,059 | your C 20 mock wrapped Bitcoin |
| 00:38:14,039 | and right in our Constructor we can get |
| 00:38:17,039 | all of our collateral tokens the as I |
| 00:38:20,459 | made a function way down at the bottom |
| 00:38:21,899 | here called |
| 00:38:23,759 | yeah collateral tokens which Returns the |
| 00:38:26,698 | full array of collateral tokens if you |
| 00:38:28,379 | don't have this feel free to pause and |
| 00:38:29,698 | implement this |
| 00:38:30,778 | what we can do we can say address array |
| 00:38:34,500 | memory collateral collateral tokens |
| 00:38:38,339 | equals dsce dot get collateral tokens |
| 00:38:42,658 | like this and we can say wef is zero and |
| 00:38:46,500 | rat BTC is one so that's how we can get |
| 00:38:49,078 | those collateral tokens so Wes we're at |
| 00:38:51,778 | BTC if collateral C divided by 2 is 0 |
| 00:38:54,539 | and return West otherwise return wrapped |
| 00:38:57,238 | BTC so now we have a function where we |
| 00:39:00,299 | can only get a valid |
| 00:39:03,358 | collateral type |
| 00:39:04,738 | so instead of just depositing any |
| 00:39:06,299 | collateral type we can say |
| 00:39:08,778 | erc20 Mach |
| 00:39:11,000 | colateral equals get collateral from |
| 00:39:14,158 | seed collateral seed and now we're still |
| 00:39:17,818 | depositing a random collateral but this |
| 00:39:20,339 | is oh it's going to be address |
| 00:39:22,738 | but this is a valid collateral address |
| 00:39:25,379 | so we're probably more likely to |
| 00:39:27,420 | actually pass a transaction that will |
| 00:39:29,219 | actually go through making us have more |
| 00:39:31,979 | solid more good random calls let's try |
| 00:39:34,259 | to run this function now |
| 00:39:38,578 | great successful but we ran into an |
| 00:39:40,920 | error right let's see what the error is |
| 00:39:42,238 | so a deposited collateral unit 56 U into |
| 00:39:46,379 | 56 with this huge collateral seed |
| 00:39:50,698 | and nothing |
| 00:39:52,858 | it looks like we failed here |
| 00:39:55,439 | it's clear let's rerun it with Dash vvvv |
| 00:39:58,618 | so we can see a little bit output of why |
| 00:40:00,420 | we actually failed okay we ran we still |
| 00:40:03,599 | the only function we're calling is the |
| 00:40:04,799 | positive collateral looks like this |
| 00:40:06,539 | failed again we call deposit collateral |
| 00:40:08,519 | with some weird args we could scroll up |
| 00:40:10,618 | and see exactly why we failed oh we ran |
| 00:40:13,618 | to this DSC engine needs more than zero |
| 00:40:16,799 | so it looks like we tried to deposit |
| 00:40:18,658 | zero collateral Mount collateral was |
| 00:40:21,899 | Zero yep okay so we tried to call with |
| 00:40:24,839 | zero so amount collateral was zero so we |
| 00:40:27,658 | know that this is going to fail so how |
| 00:40:28,979 | can we make it so that this doesn't fail |
| 00:40:30,959 | or maybe you're like hey like sometimes |
| 00:40:33,959 | it will be zero like whatever I I just |
| 00:40:36,358 | want a Sandy check you can make failing |
| 00:40:37,799 | revert false right and we can run this |
| 00:40:39,899 | again and now we'll see how often this |
| 00:40:42,000 | actually fails hopefully we cut down on |
| 00:40:44,519 | the amount of times it failed oops let's |
| 00:40:46,618 | remove those V's |
| 00:40:52,920 | great it actually it does look like we |
| 00:40:54,778 | cut down on the amount of reverts we got |
| 00:40:56,459 | not a lot but we we did cut down the |
| 00:40:59,158 | amount of reverts at least by adding |
| 00:41:01,679 | this bounding of the collateral types |
| 00:41:04,139 | but let's keep cutting down on these |
| 00:41:05,879 | reverts and potentially even have revert |
| 00:41:08,459 | and false be true right you're not |
| 00:41:10,439 | always going to have revert on false be |
| 00:41:12,118 | able to be true |
| 00:41:13,618 | and sometimes it's quicker just to have |
| 00:41:15,658 | it false and write all your invariants |
| 00:41:16,979 | and stuff but if you want kind of what |
| 00:41:19,078 | is good to aim for this now the downside |
| 00:41:21,899 | of always aiming for this is that if you |
| 00:41:24,899 | make your Handler too specific maybe |
| 00:41:27,778 | you'll actually narrow it down and |
| 00:41:30,479 | remove edge cases that would break the |
| 00:41:32,339 | system that are valid right so it's kind |
| 00:41:34,439 | of this balancing game you have to play |
| 00:41:35,759 | with these fuzzing tests and whether |
| 00:41:37,500 | failing over to be true or false there's |
| 00:41:39,299 | definitely a little bit of an arc to |
| 00:41:40,679 | this so the more you do it the better |
| 00:41:42,899 | you'll get |
| 00:41:44,399 | but in any case collateral seed amount |
| 00:41:47,459 | collateral we need to now change it so |
| 00:41:49,379 | that this amount collateral is bounded |
| 00:41:51,979 | between one and some Max number right so |
| 00:41:55,379 | we don't want this to be able to be zero |
| 00:41:57,899 | so what we can do then instead is we can |
| 00:42:00,599 | actually we actually can bound this so |
| 00:42:02,639 | that in the same way we got a valid |
| 00:42:04,799 | collateral let's get a valid amount |
| 00:42:06,719 | collateral so we can say amount |
| 00:42:09,719 | collateral equals bound |
| 00:42:12,899 | this is a function that actually comes |
| 00:42:14,399 | with STD utils and it bounds the result |
| 00:42:16,979 | to an amount so we want to say okay this |
| 00:42:19,979 | amount collateral we're going to bound |
| 00:42:22,259 | our amount collateral to being between |
| 00:42:26,459 | one we don't want to be zero and then |
| 00:42:28,679 | some like really really big number what |
| 00:42:31,259 | I like to do is up here in the state |
| 00:42:33,179 | variables I'll do U in two bit six |
| 00:42:35,459 | Max deposit size equals |
| 00:42:39,899 | and I'll do type |
| 00:42:41,959 | uint96 Dot Max |
| 00:42:45,899 | and this allows us to get the max uint |
| 00:42:49,198 | 96 value why are we not doing the max U |
| 00:42:52,979 | into 256 well if we do the max we went |
| 00:42:55,198 | to 56 and we try to deposit more |
| 00:42:57,599 | collateral later if you do the maximum |
| 00:42:59,698 | six plus one you'll get a revert so this |
| 00:43:02,578 | is going to give us a really really |
| 00:43:03,358 | really big number but we're at least not |
| 00:43:06,299 | going to hit the absolute top of amount |
| 00:43:09,658 | of deposits we can deposit so we're |
| 00:43:11,939 | gonna say we're going to bound this |
| 00:43:13,139 | amount collateral between 1 and Max |
| 00:43:16,559 | deposit size Okay cool so let's put this |
| 00:43:19,259 | back to false let's run this test again |
| 00:43:21,479 | and let's see if we cut down on the |
| 00:43:23,578 | reverts some more |
| 00:43:28,078 | aha a couple more right only a few |
| 00:43:30,778 | hundred but we did cut down on the |
| 00:43:32,459 | amount of reverts why because we're |
| 00:43:34,559 | passing valid well okay that one didn't |
| 00:43:37,318 | go so well but we are cutting down on |
| 00:43:39,839 | the amount of reverts piece by piece |
| 00:43:41,698 | we're able to bound the collateral but |
| 00:43:44,519 | there's more if we do fail on reverts |
| 00:43:48,599 | back to true we can see exactly why it's |
| 00:43:51,658 | failing right we'll do Dash VV VV we can |
| 00:43:55,559 | see an example that is indeed failing |
| 00:43:57,420 | and whoa these are getting more |
| 00:43:59,278 | intricate right before it was just a |
| 00:44:01,379 | single call was breaking it okay so |
| 00:44:03,358 | single call still is breaking it but |
| 00:44:04,979 | they are getting a little bit more |
| 00:44:05,818 | intricate so it looks like this one |
| 00:44:07,559 | failed because what we call deposit |
| 00:44:10,799 | collateral we scroll up we're getting |
| 00:44:12,599 | this insufficient allowance okay so |
| 00:44:14,339 | that's why we actually weren't cutting |
| 00:44:15,658 | down on the reverts at all because we're |
| 00:44:17,339 | gonna be insufficient allowance of |
| 00:44:18,719 | course we need to approve the protocol |
| 00:44:20,459 | to deposit this collateral so of course |
| 00:44:23,158 | this is breaking this is always going to |
| 00:44:25,259 | break |
| 00:44:25,979 | so let's do a little prankage so we'll |
| 00:44:28,439 | do vm.start prank we'll just do |
| 00:44:31,679 | message.c sender and we'll have we'll |
| 00:44:35,158 | allow this message sender to Mint some |
| 00:44:37,799 | of this collateral so that they can |
| 00:44:39,778 | actually deposit it right so we can set |
| 00:44:42,479 | this up so that whoever's calling to |
| 00:44:43,920 | posit collateral actually has the |
| 00:44:45,839 | collateral and actually will approve to |
| 00:44:48,539 | deposit the collateral so and this is |
| 00:44:50,639 | why I'm using this erc20 mock so that we |
| 00:44:52,500 | can actually mint some of this |
| 00:44:53,818 | collateral so we'll do |
| 00:44:56,399 | collateral dot mint |
| 00:44:58,738 | message dot sender amount collateral |
| 00:45:01,439 | we'll do collateral |
| 00:45:04,519 | collateral.approve address dsce |
| 00:45:08,639 | or the amount collateral |
| 00:45:10,559 | then we can deposit it and then we'll do |
| 00:45:12,778 | vm.stopcrank |
| 00:45:14,639 | okay now let's clear this let's have |
| 00:45:17,358 | revert on false to be false and let's |
| 00:45:20,339 | see now if we cut down on the amount of |
| 00:45:23,039 | reverts that we get |
| 00:45:29,459 | oh and I added too many V's let's get |
| 00:45:31,500 | rid of those let's run this again |
| 00:45:34,078 | and yep there will be some brief delays |
| 00:45:35,879 | in here of course whoa we cut the amount |
| 00:45:38,639 | of reverts down to zero now all of our |
| 00:45:41,339 | function calls are passing which means |
| 00:45:43,259 | every single run was a valid run meaning |
| 00:45:47,578 | we're using our runs much more wisely |
| 00:45:50,099 | we're not wasting runs on failed reverts |
| 00:45:52,920 | so now I can even set this to True run |
| 00:45:56,278 | this again |
| 00:45:57,479 | and we'll see this passes and none of R |
| 00:46:01,399 | runs failed right so this means what |
| 00:46:05,339 | does this mean from a security |
| 00:46:06,899 | standpoint it means that no matter how |
| 00:46:09,899 | often we call deposit collateral no |
| 00:46:12,719 | matter how much we deposit our |
| 00:46:15,479 | collateral we will never make this |
| 00:46:18,599 | invariant false which isn't saying too |
| 00:46:22,019 | much because of course we're not even |
| 00:46:24,179 | the total Supply is always zero of |
| 00:46:25,679 | course this holds so this makes a lot of |
| 00:46:28,500 | sense so let's actually keep writing |
| 00:46:30,899 | more functions |
| 00:46:32,158 | to do more with the system but set them |
| 00:46:33,959 | up so that whenever we call them they're |
| 00:46:36,118 | always going to be valid calls okay |
| 00:46:41,818 | so now we're talking about redeem |
| 00:46:43,318 | collateral right okay cool so now |
| 00:46:45,059 | there's actually now we actually have a |
| 00:46:47,278 | function a valid function to deposit |
| 00:46:49,379 | collateral now let's actually have a |
| 00:46:51,599 | valid function to redeem collateral so |
| 00:46:53,639 | we're going to do the same thing |
| 00:46:54,959 | function |
| 00:46:56,219 | redeem collateral |
| 00:46:59,278 | Colette or all we're gonna do the same |
| 00:47:01,920 | thing it's going to take a un56 |
| 00:47:03,179 | collateral seed for which collateral to |
| 00:47:05,639 | redeem U and 256 amount collateral |
| 00:47:10,259 | so we have public and we're going to do |
| 00:47:12,299 | something very similar here we're going |
| 00:47:14,039 | to say |
| 00:47:14,939 | we're only going to choose a valid |
| 00:47:16,799 | collateral by saying erc20 mock |
| 00:47:19,578 | collateral equals underscore get |
| 00:47:22,698 | collateral from seed collateral seed and |
| 00:47:26,219 | now we should only allow people to |
| 00:47:28,379 | redeem the maximum amount they have in |
| 00:47:31,379 | the system right |
| 00:47:32,879 | so we're going to say you want 256 Max |
| 00:47:36,059 | collateral collateral to redeem |
| 00:47:40,318 | equals DSC engine |
| 00:47:43,639 | n gin Dot get total |
| 00:47:49,618 | get collateral |
| 00:47:53,039 | balance of user do we have this function |
| 00:47:58,618 | DSC engine |
| 00:48:01,379 | so this is one that I added in it's |
| 00:48:03,539 | going to get the collateral balance of a |
| 00:48:05,219 | user if you pass in the user in the |
| 00:48:06,719 | token so if you want to pause and add |
| 00:48:08,278 | this in feel free to do so |
| 00:48:10,019 | get collateral balance of user where we |
| 00:48:12,299 | add the address of the collateral |
| 00:48:15,599 | and the message.cender so it's going to |
| 00:48:18,420 | get the total balance of a user oh and |
| 00:48:20,818 | this should be dsce |
| 00:48:24,000 | and then we're going to bound the amount |
| 00:48:26,278 | collateral to this max amount they have |
| 00:48:28,379 | to make these always valid they should |
| 00:48:30,358 | only be redeeming as much as they put in |
| 00:48:32,399 | the system amount collateral equals |
| 00:48:36,118 | bound |
| 00:48:37,578 | amounts collateral |
| 00:48:41,759 | uh we're going to say redeem between |
| 00:48:47,639 | one and the max collateral to redeem |
| 00:48:50,519 | because we don't want them to redeem |
| 00:48:52,078 | zero of course |
| 00:48:53,578 | and then we're going to say oh it's |
| 00:48:55,920 | going to be public |
| 00:48:57,299 | then we're going to say dsce dot redeem |
| 00:49:00,000 | collateral |
| 00:49:01,559 | address collateral and amount collateral |
| 00:49:04,318 | right so now we have two functions to |
| 00:49:07,679 | randomly call so we're going to be |
| 00:49:09,000 | depositing collateral and redeeming |
| 00:49:10,500 | collateral let's run this |
| 00:49:12,299 | invariant it only has two functions it |
| 00:49:14,519 | could call |
| 00:49:15,719 | go to the foundry.tamil fail and revert |
| 00:49:17,939 | is true oh and it looks like we found an |
| 00:49:19,500 | edge case |
| 00:49:20,459 | so now we can read this and see what |
| 00:49:22,019 | it's doing so it's depositing some |
| 00:49:23,818 | collateral 1381 and 82 and then it's |
| 00:49:27,899 | Redeeming the collateral |
| 00:49:29,578 | hmm I'm actually sure what's going on so |
| 00:49:32,219 | let's add this |
| 00:49:34,259 | Dash vvvv to see more into the actual |
| 00:49:38,698 | transaction that's failing oh my |
| 00:49:40,618 | goodness we got an even bigger one here |
| 00:49:42,899 | so what do we saying oh Max is less than |
| 00:49:45,299 | the min oh looks like I'm messing up |
| 00:49:47,339 | with my bounding so let's dive in really |
| 00:49:49,679 | an issue |
| 00:49:51,000 | so if we go back to the Handler bound to |
| 00:49:53,399 | Mac collateral One Max collateral to |
| 00:49:56,039 | redeem ah okay |
| 00:49:58,019 | so if Max collateral to redeem is zero |
| 00:50:01,858 | this will break |
| 00:50:03,299 | so we actually do need to keep zero in |
| 00:50:05,039 | here and then we can just say if |
| 00:50:07,679 | you know amount collateral equals equals |
| 00:50:09,899 | zero we could say if it's zero return or |
| 00:50:13,318 | what we could do is we could use this |
| 00:50:14,939 | keyword called assume like vm.assume |
| 00:50:18,059 | which will say |
| 00:50:19,500 | if the Boolean expression value is to |
| 00:50:21,299 | false the fuzzler will discard the |
| 00:50:23,158 | current fuzz inputs and start a new fuzz |
| 00:50:24,899 | run so we're going to do if the amount |
| 00:50:26,639 | collateral zero just return don't call |
| 00:50:29,219 | this function right because this is |
| 00:50:31,198 | going to fail so let's go ahead and run |
| 00:50:33,179 | this again now |
| 00:50:34,559 | power and successful |
| 00:50:39,179 | well would you look at that we are now |
| 00:50:41,839 | passing again so people can if we go |
| 00:50:45,238 | back to the Handler people can now |
| 00:50:48,000 | redeem collateral and all of these |
| 00:50:49,858 | redeemings are going to be valid and all |
| 00:50:52,559 | these deposits are going to be valid |
| 00:50:53,939 | right they can only redeem valid |
| 00:50:56,399 | Redemption amounts now here's where this |
| 00:50:59,399 | fail in revert equals true is can be a |
| 00:51:02,158 | little bit deceptive let's say right now |
| 00:51:05,939 | we're only letting you redeem the max |
| 00:51:08,459 | collateral to redeem |
| 00:51:10,078 | let's say there was a bug |
| 00:51:12,118 | where a user can redeem more than they |
| 00:51:15,000 | have |
| 00:51:15,719 | this fuzz test wouldn't catch this it's |
| 00:51:18,479 | because we have this fail in Reverse |
| 00:51:19,920 | true if this fail on revert was false |
| 00:51:22,858 | and we didn't have this line |
| 00:51:25,379 | right and we just said this is the max |
| 00:51:27,778 | deposit size |
| 00:51:30,000 | this is a test where we might actually |
| 00:51:31,799 | catch that bug right and if we run this |
| 00:51:34,198 | now |
| 00:51:35,759 | oh and with fail inverse false we are |
| 00:51:37,979 | going to get a whole bunch of reverts we |
| 00:51:39,299 | are going to get bad transactions |
| 00:51:40,738 | however |
| 00:51:42,238 | and you can see we can see the number of |
| 00:51:43,738 | verts over here and it actually is way |
| 00:51:45,778 | less than it was before which is awesome |
| 00:51:47,578 | and if we run it again still way less |
| 00:51:50,698 | than 8 000 which is what it was before |
| 00:51:52,639 | but if we have fail and revert false we |
| 00:51:55,679 | can actually catch this |
| 00:51:57,059 | so The Foundry team is actually working |
| 00:51:58,920 | on allowing some tests to be fail and |
| 00:52:01,559 | revert and some tests to be not feeling |
| 00:52:03,839 | revert so you can kind of pick which one |
| 00:52:07,078 | for which functions instead of kind of |
| 00:52:08,519 | having to blanket everything so just |
| 00:52:11,639 | keep in mind the dangers here okay of |
| 00:52:14,278 | always defaulting to fail on revert |
| 00:52:16,139 | equals true okay they have their |
| 00:52:18,238 | trade-offs and if you do failover equals |
| 00:52:20,158 | false you can sometimes write these |
| 00:52:22,439 | handlers a lot quicker |
| 00:52:27,539 | okay so we have |
| 00:52:29,339 | some stuff here we can deposit |
| 00:52:30,959 | collateral we can redeem collateral what |
| 00:52:33,358 | else |
| 00:52:34,019 | so we probably should figure out a way |
| 00:52:35,339 | to get some total Supply right so what |
| 00:52:37,500 | we're going to do is now we're going to |
| 00:52:38,639 | finally make our mint function it's a |
| 00:52:41,099 | function |
| 00:52:42,059 | mint DSC |
| 00:52:44,399 | public like like this and what do we |
| 00:52:47,698 | want to put in here well if we go to the |
| 00:52:49,318 | DSC engine go to mince DSC go to this |
| 00:52:53,158 | mint DSC function it takes an amount of |
| 00:52:55,618 | DSC to Mint so we'll do the same thing |
| 00:52:58,019 | we'll say U into 256 amount and that's |
| 00:53:01,979 | it we'll mint a random amount |
| 00:53:04,500 | so in here |
| 00:53:05,818 | of course we can't have amount be a |
| 00:53:09,000 | number of things right we can't have it |
| 00:53:10,259 | be zero and they would need to not have |
| 00:53:13,979 | their health Factor be broken so we're |
| 00:53:16,198 | going to say amount equals bound amount |
| 00:53:20,358 | 1 and let's say Max deposit size |
| 00:53:23,818 | and then additionally this amount better |
| 00:53:26,519 | be more than the value of the system |
| 00:53:29,939 | right because we have this revert if |
| 00:53:31,559 | Health factor is broken but maybe I |
| 00:53:34,618 | don't even want to do that narrowing |
| 00:53:36,658 | down maybe I'd say screw it I'm going to |
| 00:53:38,039 | make Roberto false revert on fail and |
| 00:53:40,799 | revert false and I'm just going to leave |
| 00:53:42,059 | it like that because I'm nervous then |
| 00:53:44,578 | I'm going to narrow it down too much so |
| 00:53:46,738 | then maybe I just go screw it BMW start |
| 00:53:48,719 | prank |
| 00:53:49,920 | message.c sender |
| 00:53:51,539 | and we call and the DSC engine mint DSC |
| 00:53:54,799 | dsce dot mint DSC and the amount |
| 00:53:59,459 | and then bm.stop rank and this is where |
| 00:54:03,118 | actually you'll see sometimes some |
| 00:54:05,339 | people will have |
| 00:54:06,539 | continue |
| 00:54:07,818 | on revert and a fail on revert fail on |
| 00:54:12,719 | revert |
| 00:54:14,578 | see people some people can have two |
| 00:54:16,198 | types of folders continue on revert is |
| 00:54:18,778 | going to be |
| 00:54:19,679 | the quicker looser tests where it might |
| 00:54:22,799 | look like this |
| 00:54:24,000 | the fail on revert is going to make sure |
| 00:54:25,679 | that every single transaction that you |
| 00:54:27,358 | run your invariant test Suite on is |
| 00:54:28,858 | going to pass |
| 00:54:30,000 | I personally think it's good to have |
| 00:54:31,379 | both |
| 00:54:32,158 | when I'm writing in varying tests I |
| 00:54:33,899 | actually start with the continue on |
| 00:54:35,459 | revert because they're faster oftentimes |
| 00:54:37,379 | you can find bugs as long as you narrow |
| 00:54:39,719 | down them enough so for now let's go |
| 00:54:42,358 | ahead let's have this be false see if we |
| 00:54:44,459 | can find any issues like this so we'll |
| 00:54:45,899 | go up up so we'll run Forge test Dash m |
| 00:54:50,039 | just going to run this invariant test |
| 00:54:52,139 | boom let's see if we get any issues here |
| 00:54:56,759 | we'll see how many reverts we get as |
| 00:54:58,559 | well so we got a similar amount of |
| 00:55:00,420 | reverts which is good similar amount of |
| 00:55:02,459 | calls |
| 00:55:03,358 | which is all right and then actually if |
| 00:55:05,339 | we do Dash VV we can even see the |
| 00:55:07,858 | console.logs at the end it looks like it |
| 00:55:10,618 | hasn't found a way to Mint more tokens |
| 00:55:12,839 | than collateral in the system oh and |
| 00:55:14,459 | even it looks like the last run it ended |
| 00:55:16,799 | with a total supply of zero right but |
| 00:55:19,439 | maybe I'm paranoid let's actually go |
| 00:55:22,139 | back to true and let's just stay true |
| 00:55:23,939 | for the rest of the rest of this but |
| 00:55:26,339 | like I said I think it's good to have |
| 00:55:27,959 | both types of tests anyways Handler so |
| 00:55:32,158 | this mint DSC we should only be able to |
| 00:55:34,979 | Mint DSC if the amount is less than the |
| 00:55:37,618 | collateral so what we can do |
| 00:55:40,139 | is we can call this get account |
| 00:55:41,459 | information which gets the total |
| 00:55:43,198 | collateral value in USD and total DSC |
| 00:55:45,778 | minted and make sure that we're always |
| 00:55:48,778 | going to Mint |
| 00:55:50,039 | less than the collateral value that we |
| 00:55:52,019 | have |
| 00:55:52,738 | so we can say |
| 00:55:54,238 | we can actually just copy these two |
| 00:55:56,639 | paste it in here equals dsce dot copy |
| 00:56:00,778 | this function paste |
| 00:56:03,559 | message.sender |
| 00:56:05,339 | so we're gonna get the total DSC minted |
| 00:56:07,139 | plot our value in USD and what we can do |
| 00:56:09,959 | is we can say we'll just have them |
| 00:56:12,299 | always mint the max |
| 00:56:14,278 | DSC they can mint so we'll say unit 256. |
| 00:56:17,578 | Max DSC to Mint equals |
| 00:56:22,259 | collateral value in USD we could say the |
| 00:56:25,559 | collateral value in USD divided by 2 |
| 00:56:28,318 | minus the total DSC minted better be |
| 00:56:31,318 | greater than zero right better not be a |
| 00:56:33,839 | negative number so we can even do like |
| 00:56:36,179 | an INT 256 and then if this is negative |
| 00:56:41,219 | then we're just going to return |
| 00:56:43,318 | otherwise we're going to say amount |
| 00:56:45,719 | we're going to equals bound this again |
| 00:56:49,198 | say amount |
| 00:56:50,818 | 0 comma Max TC to Mint and we're also |
| 00:56:54,899 | going to say if amount |
| 00:56:57,059 | equals zero we're going to return |
| 00:56:59,278 | oops and then actually we need to grab |
| 00:57:02,039 | this start prank put this down here |
| 00:57:04,920 | that's all we need to do and we should |
| 00:57:07,139 | probably |
| 00:57:08,039 | just grab these put them down here |
| 00:57:11,339 | we don't need both of these so we just |
| 00:57:13,858 | need this I think |
| 00:57:15,719 | and we don't need both of these we only |
| 00:57:17,339 | need one of these so we'll do |
| 00:57:19,799 | YouTube we'll convert this pack to a |
| 00:57:22,139 | un256 |
| 00:57:23,939 | and if I'm out of zero return this looks |
| 00:57:27,059 | pretty good to me let's see if we made |
| 00:57:29,698 | this actually work let's run this and |
| 00:57:31,920 | now we can mint DSC |
| 00:57:34,379 | essible |
| 00:57:35,818 | and bada boom so we have some calls we |
| 00:57:39,299 | have no reverts |
| 00:57:40,799 | this is great |
| 00:57:45,599 | but I keep getting total Supply is zero |
| 00:57:48,118 | down here so we have plenty of width |
| 00:57:50,158 | plenty wrap Bitcoin |
| 00:57:52,019 | are we ever calling this function hmm we |
| 00:57:57,059 | keep getting a total supply of zero down |
| 00:57:59,278 | here why is that how can we figure out |
| 00:58:01,979 | if our mint DSC is actually getting |
| 00:58:05,099 | called let's first off see if this mint |
| 00:58:07,738 | DSC is even being called |
| 00:58:10,078 | we can use something called a ghost |
| 00:58:12,118 | variable to track this so in here up at |
| 00:58:15,118 | the top we'll make a function called |
| 00:58:17,899 | un256 times mint is called |
| 00:58:22,679 | make this a public |
| 00:58:24,778 | variable and at the bottom of mint DSC |
| 00:58:28,618 | we'll do timesment is called Plus |
| 00:58:32,219 | now back in our invariance we do a |
| 00:58:35,339 | console.log |
| 00:58:37,259 | times mint called comma |
| 00:58:41,039 | Handler dot times been called and then |
| 00:58:43,559 | we'll run our test again |
| 00:58:45,719 | oops with Dash VV |
| 00:58:52,379 | and we can see oh mint is actually never |
| 00:58:55,379 | called how is that possible well it must |
| 00:58:58,439 | be because one of these returns is |
| 00:59:00,238 | hitting and it's not finishing this call |
| 00:59:02,459 | so we can keep moving this up to figure |
| 00:59:04,318 | out where it's actually being called and |
| 00:59:07,318 | to continue to debug this but I already |
| 00:59:09,479 | know how to debug this of course because |
| 00:59:11,399 | I've done this a while if you want take |
| 00:59:14,278 | this as a challenge for you |
| 00:59:16,139 | to answer the question why |
| 00:59:18,778 | is this never being called Y is times |
| 00:59:21,959 | event being called Never being called |
| 00:59:23,698 | why is it never finishing so feel free |
| 00:59:26,039 | to pause the video try to debug this |
| 00:59:27,899 | yourself and find out and then I'll tell |
| 00:59:30,358 | you the technique that I used to debug |
| 00:59:32,158 | this and figure out why this mint DSC |
| 00:59:34,439 | was never being finished |
| 00:59:39,238 | all right welcome back the direction |
| 00:59:41,278 | pause the video did you actually try to |
| 00:59:43,078 | figure it out if you didn't I'm giving |
| 00:59:45,118 | you a second chance pause the video go |
| 00:59:47,339 | find out pause the video and take this |
| 00:59:49,078 | as your opportunity to try to debug okay |
| 00:59:51,899 | why is this not getting hit why is this |
| 00:59:55,559 | line not hitting |
| 01:00:04,019 | all right welcome back now there's a |
| 01:00:06,539 | couple different ways that I used to |
| 01:00:07,679 | actually debug this one of them was |
| 01:00:09,778 | having this times been called plus |
| 01:00:12,599 | equals one and then moving it up so I |
| 01:00:14,219 | found the line that it was breaking on |
| 01:00:16,439 | once I found the line that it was |
| 01:00:17,939 | breaking on I console.logged all the |
| 01:00:20,278 | values of the different variables around |
| 01:00:22,139 | one of the most important variables that |
| 01:00:23,759 | I dumped was going to be the message dot |
| 01:00:27,479 | sender so when you're working with |
| 01:00:29,578 | invariance remember it's going to call |
| 01:00:31,738 | this |
| 01:00:32,879 | contract with a ton of different |
| 01:00:34,799 | functions and a ton of different calls |
| 01:00:37,738 | however it's also going to call them |
| 01:00:40,618 | with random |
| 01:00:42,439 | addresses as well |
| 01:00:44,698 | so in order for us to Mint DSC we need |
| 01:00:48,658 | to only mint DSC with an address that |
| 01:00:52,559 | has actually deposited collateral |
| 01:00:55,379 | because it's impossible for someone to |
| 01:00:57,059 | Mint DSC |
| 01:00:58,439 | without them depositing collateral now |
| 01:01:01,078 | again if we restrict this function like |
| 01:01:03,839 | this maybe there is a case where you can |
| 01:01:06,299 | mint DSC without depositing any |
| 01:01:08,158 | collateral that we don't know about this |
| 01:01:10,198 | is again why it's important to have some |
| 01:01:12,719 | open invariant tests |
| 01:01:14,339 | some continue on revert and some fail |
| 01:01:16,139 | and revert as well so if we want to have |
| 01:01:18,539 | this be fail on reverb we would need to |
| 01:01:21,000 | only pick a message that's sender |
| 01:01:23,158 | that has some deposited collateral so |
| 01:01:26,278 | what we can do is actually keep track of |
| 01:01:27,719 | people who have deposited collateral and |
| 01:01:30,118 | then when we go to Mint we just choose |
| 01:01:31,920 | an address from somebody who already has |
| 01:01:34,379 | deposited so how can we do that well we |
| 01:01:37,500 | can just keep track of |
| 01:01:39,299 | an array of addresses that have |
| 01:01:42,719 | lateral deposited let's open the top |
| 01:01:44,939 | well let's actually keep this times mint |
| 01:01:47,158 | is called and we'll put it at the bottom |
| 01:01:49,198 | times what it's called plus plus |
| 01:01:51,238 | and this way we know how to test this |
| 01:01:54,059 | right if times width is called increases |
| 01:01:56,459 | we've known we will know that we fixed |
| 01:01:59,099 | the actual issue so times which is |
| 01:02:01,019 | called plus plus but the top we'll do a |
| 01:02:03,658 | address array |
| 01:02:06,179 | public users with |
| 01:02:08,939 | collateral |
| 01:02:10,339 | deposited and we'll copy this address |
| 01:02:13,799 | and now in deposit collateral |
| 01:02:17,459 | use it with collateral deposited dot |
| 01:02:19,559 | push message.sender now there's some |
| 01:02:22,439 | caveats here |
| 01:02:23,698 | this will double push obviously some |
| 01:02:25,858 | people so this will double push if the |
| 01:02:28,679 | same addresses push twice but for now |
| 01:02:31,679 | let's just keep it simple and let's go |
| 01:02:34,259 | ahead and just leave it like this |
| 01:02:35,818 | we probably should check to see if |
| 01:02:37,799 | someone has already deposited collateral |
| 01:02:39,658 | but whatever we're going to go with this |
| 01:02:41,578 | for now because simple |
| 01:02:43,019 | and then now in our mint DSC we can do |
| 01:02:46,198 | something similar to what we did with |
| 01:02:47,759 | collateral so we'll do a underscore you |
| 01:02:51,420 | into 256. address seed and instead of |
| 01:02:55,920 | bounding to message.sender what we can |
| 01:02:58,500 | do is we can say |
| 01:03:00,358 | address sender equals users with |
| 01:03:05,039 | collateral deposited |
| 01:03:06,778 | it's going to be the index of the users |
| 01:03:09,118 | with collateral deposited Anderson mod |
| 01:03:12,959 | uses with collateral |
| 01:03:14,879 | posited |
| 01:03:16,318 | dot length and now now instead of |
| 01:03:19,618 | message.sender we're going to use sender |
| 01:03:21,658 | in here same thing with down here we're |
| 01:03:23,639 | going to use sender now let's run this |
| 01:03:26,278 | and see if mint is ever actually called |
| 01:03:34,158 | so this was very helpful |
| 01:03:37,318 | let's do Dash vbv |
| 01:03:43,318 | ah okay so at least we're getting |
| 01:03:45,179 | something different here right we're |
| 01:03:46,318 | getting an error division or module by |
| 01:03:48,839 | zero okay of course we're getting module |
| 01:03:51,420 | by zero |
| 01:03:52,618 | because if the collateral length is zero |
| 01:03:54,299 | then obviously sender is going to be |
| 01:03:55,679 | zero so we can do if use of the |
| 01:03:58,858 | collateral dot length equals equals zero |
| 01:04:00,899 | then we're going to return we're going |
| 01:04:02,759 | to skip this one |
| 01:04:03,839 | so let's run this again |
| 01:04:09,658 | okay |
| 01:04:11,219 | so we're getting some stuff passing |
| 01:04:12,899 | let's actually |
| 01:04:14,158 | just do it two v's so that it's easier |
| 01:04:16,679 | to read than all those events |
| 01:04:24,618 | aha total times mint was called is now |
| 01:04:27,719 | 31 and we're getting a total Supply so |
| 01:04:30,599 | our mint DSC function in our Handler is |
| 01:04:33,118 | now actually working we're now |
| 01:04:34,618 | successfully calling mint DSC and it |
| 01:04:37,679 | looks like our protocol is holding up |
| 01:04:40,139 | all right this is fantastic so we're |
| 01:04:43,500 | getting closer to building this Handler |
| 01:04:45,899 | to actually have a solid Recreation of |
| 01:04:49,318 | all the possible functions we can |
| 01:04:50,818 | actually do in this system something I |
| 01:04:52,618 | didn't show you was we should pretty |
| 01:04:54,539 | much always use a given invariant called |
| 01:04:57,118 | function invariant Getters should not |
| 01:05:01,799 | revert |
| 01:05:03,059 | like this and then we just put in here |
| 01:05:05,278 | all of our variants like dsce dot get |
| 01:05:08,578 | liquidation bonus |
| 01:05:10,559 | d e c e dot get Precision |
| 01:05:14,278 | Etc put all of our Getters in here and |
| 01:05:17,158 | oh and this could be public View and if |
| 01:05:19,679 | any of these revert then this will fail |
| 01:05:21,539 | this invariant test will call a ton of |
| 01:05:25,019 | different functions on the Handler and |
| 01:05:27,539 | if any of the function combinations |
| 01:05:29,698 | break any of our Getters we know we've |
| 01:05:31,679 | broken invariant this is a layup and |
| 01:05:33,658 | variant that everyone should always 100 |
| 01:05:35,399 | include a way to make sure that you're |
| 01:05:38,698 | including everything is you can run |
| 01:05:40,019 | something called Forge inspect |
| 01:05:42,959 | the SC engine |
| 01:05:45,179 | methods and it'll print out all the |
| 01:05:48,420 | different methods that this function has |
| 01:05:51,778 | in addition to its function |
| 01:05:54,179 | selectors |
| 01:05:55,439 | so you can kind of use this as your |
| 01:05:56,939 | checklist of all the different functions |
| 01:05:58,318 | you can call on a contract and you can |
| 01:06:01,559 | look for all the view functions in here |
| 01:06:03,479 | this is additionally why it's great to |
| 01:06:05,818 | have get in front of these words because |
| 01:06:07,799 | it becomes very easy to figure out which |
| 01:06:10,019 | ones are getters |
| 01:06:15,179 | but it doesn't reflect the whole world |
| 01:06:16,920 | right one of the other really fantastic |
| 01:06:19,920 | things we can do with the Handler is we |
| 01:06:21,658 | can both handle our DSC engine but any |
| 01:06:24,839 | other contract that we want to simulate |
| 01:06:27,358 | for as well and there's a lot of things |
| 01:06:30,358 | we want to take in mind when writing |
| 01:06:32,278 | these especially the other contracts |
| 01:06:34,618 | that we interact with what are some of |
| 01:06:36,658 | the other contracts that we interact |
| 01:06:37,920 | with well one of them is going to be the |
| 01:06:39,899 | price feed one of them is going to be |
| 01:06:41,639 | the weft token the wrapped Bitcoin token |
| 01:06:45,479 | so our Handler should probably also show |
| 01:06:48,238 | people doing random weird things with |
| 01:06:49,920 | weft and rep Bitcoin right because |
| 01:06:51,719 | people are going to do random weird |
| 01:06:53,099 | things with both these tokens and we |
| 01:06:54,778 | want to make sure our system can work |
| 01:06:56,759 | with them appropriately now I'm actually |
| 01:06:58,618 | going to skip them for now but I am 100 |
| 01:07:00,778 | going to do one with price feeds because |
| 01:07:03,179 | price feeds are definitely a system that |
| 01:07:06,719 | can change and definitely a system that |
| 01:07:08,639 | greatly affects our protocol |
| 01:07:10,920 | so we're going to include price feed |
| 01:07:12,839 | updates in our Handler |
| 01:07:15,059 | so we're going to do is we're going to |
| 01:07:16,259 | go ahead and do import the mock V3 |
| 01:07:19,379 | aggregator |
| 01:07:20,578 | from slash |
| 01:07:23,539 | MOX slash mock |
| 01:07:26,698 | V3 aggregator.soul or where is this |
| 01:07:30,238 | located oh just one do this okay and |
| 01:07:34,559 | this mock V3 aggregator has some |
| 01:07:37,259 | functions that allow us to just easily |
| 01:07:38,698 | update and answer right which is |
| 01:07:41,219 | something that we want to do we want our |
| 01:07:43,019 | protocol to be able to easily update |
| 01:07:45,179 | answers so we'll take this monk V3 |
| 01:07:47,818 | aggregator and let's at least get the |
| 01:07:50,278 | weft price |
| 01:07:51,420 | from our system so I have a view |
| 01:07:55,318 | function dsce dot get collateral token |
| 01:07:59,219 | price feed and I'll pass the address |
| 01:08:03,420 | oops |
| 01:08:08,099 | and I'll say eth and I'll make |
| 01:08:10,799 | another variable mock V3 alligator |
| 01:08:13,500 | public eth USD price feed |
| 01:08:18,000 | I'll say ethusd price feed equals |
| 01:08:21,778 | this and we're just going to wrap this |
| 01:08:23,698 | up as a mock V3 aggregator |
| 01:08:26,339 | this and great now we have an ethusd |
| 01:08:28,738 | price feed and now we can add a new |
| 01:08:31,318 | function in here so we have mint DSC |
| 01:08:33,658 | deposit collateral redeem collateral we |
| 01:08:37,198 | can add a new one called function update |
| 01:08:41,000 | collateral price |
| 01:08:43,618 | we'll do a unit 96 just so that the |
| 01:08:46,618 | number isn't too big new price |
| 01:08:48,599 | and then we could also randomize the |
| 01:08:50,459 | collateral but for now we'll just have |
| 01:08:52,500 | it be the ethusd so we need to convert |
| 01:08:55,920 | unit 96 to an INT |
| 01:08:58,939 | 256 new price |
| 01:09:01,799 | int equals into 256 new price because |
| 01:09:04,920 | price feeds take into 256's oops sorry |
| 01:09:08,759 | this should be in and to convert |
| 01:09:11,939 | a u inch 96 to an into 256 we actually |
| 01:09:14,939 | have to wrap it as U into 256 first and |
| 01:09:18,658 | then to an end 96. |
| 01:09:23,759 | dot update answer or set price or |
| 01:09:27,299 | whatever we want to do to this new price |
| 01:09:30,179 | like this boom and now simple as that we |
| 01:09:33,658 | have an update collateral price well an |
| 01:09:35,879 | update each price anyways so now we can |
| 01:09:38,519 | do three things in our system we can |
| 01:09:40,439 | update the price |
| 01:09:41,698 | redeem collateral deposit collateral |
| 01:09:44,578 | and mint DSC so before we actually run |
| 01:09:48,059 | this what do you think |
| 01:09:49,920 | do you think we'll get an error what do |
| 01:09:52,019 | you think we'll go on let's run this |
| 01:10:01,439 | well looks like it found a sequence it |
| 01:10:04,379 | found an issue the reason assertion |
| 01:10:06,659 | violated which means that our invariant |
| 01:10:08,818 | here was broken the weft Value Plus |
| 01:10:12,059 | Bitcoin value now is no longer the total |
| 01:10:14,519 | Supply so let's scroll up let's see what |
| 01:10:16,739 | the issue is here all the way past |
| 01:10:18,959 | everything and if we read the sequence |
| 01:10:21,420 | we can figure out why this broke we see |
| 01:10:24,239 | exactly what happened okay so first |
| 01:10:25,739 | they're called deposit collateral okay |
| 01:10:28,259 | cool so it deposited some collateral |
| 01:10:31,139 | and then we minted some DSC okay cool we |
| 01:10:35,038 | minted some DSC with some |
| 01:10:37,318 | stuff here and then we updated the |
| 01:10:39,959 | collateral price to 471. so as we know |
| 01:10:44,219 | our Handler update collateral price if |
| 01:10:46,799 | we scroll all the way to the bottom |
| 01:10:47,759 | update collateral price |
| 01:10:50,879 | 471 updates the eth collateral from |
| 01:10:55,439 | two thousand dollars which is 2000 E8 |
| 01:10:59,219 |  |
| 01:11:01,618 | or 71. so this remembers two thousand |
| 01:11:04,858 | one two three four five six seven eight |
| 01:11:06,420 | it went from this |
| 01:11:08,459 | to 471. so of course it reverted right |
| 01:11:11,698 | because people minted a ton of |
| 01:11:14,038 | collateral they deposited collateral |
| 01:11:15,778 | they minted a ton of DSC right look at |
| 01:11:19,019 | this input it's massive and the system |
| 01:11:21,358 | broke |
| 01:11:22,559 | and if we run this again with fewer V's |
| 01:11:25,318 | right VV we'll be able to see that total |
| 01:11:28,439 | Supply if we scroll up we'll be able to |
| 01:11:30,538 | see the weft value wrap Bitcoin value |
| 01:11:32,759 | and the total Supply here so actually it |
| 01:11:35,519 | looks like in this one it's set the new |
| 01:11:37,559 | price to three |
| 01:11:39,239 | so obviously the wet value is probably |
| 01:11:41,278 | zero or just about zero it let the mint |
| 01:11:44,038 | DSC because originally the collaterals |
| 01:11:46,019 | were was worth something and now it's |
| 01:11:47,879 | worth almost nothing |
| 01:11:49,318 | right |
| 01:11:50,818 | so this is an important thing for us to |
| 01:11:53,278 | take in mind in our system hey if the |
| 01:11:56,038 | price drops or spikes quickly our system |
| 01:12:00,000 | is screwed our system is busted and this |
| 01:12:03,480 | is something we would want to know about |
| 01:12:04,858 | and potentially go back in our code and |
| 01:12:06,599 | fix hey what do we do when the price |
| 01:12:09,839 | plummets in a single block |
| 01:12:12,059 | right now we have kind of this |
| 01:12:14,038 | assumption in here where we have |
| 01:12:16,858 | this liquidation 10 bonus and the |
| 01:12:20,278 | collateral always needs to be 200 |
| 01:12:21,959 | overcollaterized |
| 01:12:23,519 | with this we're saying okay |
| 01:12:26,459 | between 200 over collateralization and |
| 01:12:29,459 | one ten percent over collateralization |
| 01:12:31,519 | as long as our system is within this |
| 01:12:33,959 | it's still safe I mean obviously it's |
| 01:12:35,939 | better if it's above this but as long as |
| 01:12:37,679 | our system is within this it's still |
| 01:12:39,179 | safe |
| 01:12:39,959 | but if the price plummets of some |
| 01:12:42,000 | collateral and let's say that's the only |
| 01:12:43,318 | collateral maybe we get to 50 |
| 01:12:44,839 | collateralization rate and that would |
| 01:12:47,099 | break our entire system right that would |
| 01:12:48,959 | break our invariant our system will be |
| 01:12:51,900 | screwed so we can go back to the drawing |
| 01:12:53,759 | board figure out how to smooth this out |
| 01:12:55,980 | or we could say this is a known bug if |
| 01:12:59,099 | the price fluctuates or explodes too |
| 01:13:01,079 | quickly or too slowly this protocol |
| 01:13:03,358 | becomes worthless and that's kind of not |
| 01:13:05,339 | a great solution right so these are |
| 01:13:07,139 | things we absolutely want to keep in |
| 01:13:08,339 | mind and these are things that we can |
| 01:13:09,900 | find with invariant tests and this is |
| 01:13:13,198 | why they're so important so for now in |
| 01:13:15,538 | our Handler I'm actually just going to |
| 01:13:17,278 | even comment this out because it does |
| 01:13:19,318 | break our test Suite but I'm going to |
| 01:13:21,179 | put a little comment here this breaks |
| 01:13:23,159 | our invariant test suite and this would |
| 01:13:26,818 | 100 be something that shows up in a |
| 01:13:29,519 | smart contract audit saying hey if the |
| 01:13:31,679 | price of an asset plummets too quickly |
| 01:13:33,959 | the system's breaking because it breaks |
| 01:13:36,480 | the invariant all right great now |
| 01:13:39,000 | there's a few more things I want to |
| 01:13:40,500 | teach only a few and then we're done |
| 01:13:42,538 | with this section |
| 01:13:43,739 | we're going to teach one some proper |
| 01:13:46,679 | Oracle use and then two we need to write |
| 01:13:50,219 | more tests |
| 01:13:51,538 | which we're not going to do I'm going to |
| 01:13:53,219 | leave that to you but we have a whole |
| 01:13:55,019 | bunch of other contracts in here like |
| 01:13:56,519 | the decentralized stablecoin |
| 01:13:58,500 | and then three some smart contract audit |
| 01:14:01,679 | preparedness |
| 01:14:03,538 | some smart contract audit preparation |
| 01:14:05,879 | so let's start with some Oracle proper |
| 01:14:08,339 | use |
| 01:14:13,198 | so in our DSC engine we're of course |
| 01:14:15,358 | using an oracle right we're using chain |
| 01:14:17,939 | link price feeds now this is kind of an |
| 01:14:20,698 | assumption that we have in our protocol |
| 01:14:22,219 | right now a price seeds are just going |
| 01:14:25,500 | to work but price leads are a system |
| 01:14:27,239 | just like anything else and we should |
| 01:14:29,519 | add some checks in our code here |
| 01:14:32,519 | just to make sure that if this breaks or |
| 01:14:36,000 | if something in here breaks our system |
| 01:14:38,099 | isn't broken |
| 01:14:39,778 | so what we're going to do is we're |
| 01:14:41,038 | actually use that Library methodology we |
| 01:14:43,259 | made years ago to write some checks on |
| 01:14:46,019 | this price feed so I'm going to make a |
| 01:14:50,099 | libraries folder and we're going to make |
| 01:14:52,079 | a new contract in here called |
| 01:14:55,079 | Oracle lib that's all |
| 01:14:57,719 | and we want to do is we want to check to |
| 01:15:00,000 | make sure that these prices aren't stale |
| 01:15:02,519 | if we click on any one of these prices |
| 01:15:03,959 | like eth USD let's scroll up to show |
| 01:15:08,278 | more details |
| 01:15:10,079 | just to show more details you can see |
| 01:15:12,299 | they have this heartbeat where a new |
| 01:15:14,939 | price should show up at least every 3 |
| 01:15:16,980 | 600 seconds I believe what this is right |
| 01:15:19,379 | yes on this pulley test net we want to |
| 01:15:22,318 | write some checks to make sure that this |
| 01:15:24,479 | is actually updating every 3600 seconds |
| 01:15:26,520 | and if it's not we should probably pause |
| 01:15:28,379 | the functionality of our contract so |
| 01:15:30,900 | we're going to make a spdx |
| 01:15:34,139 | license |
| 01:15:35,539 | identifier MIT fragment solidity like |
| 01:15:39,239 | this |
| 01:15:40,020 | we're going to do a library |
| 01:15:42,120 | Oracle lib and let's put a little |
| 01:15:44,400 | netspect to explain what this is going |
| 01:15:46,020 | to do say at title Patrick Collins oops |
| 01:15:50,158 | title Oracle lib at author Patrick |
| 01:15:55,678 | Collins |
| 01:15:57,658 | at notice |
| 01:15:59,338 | this library is used to check the chain |
| 01:16:03,960 | link |
| 01:16:05,818 | Oracle for stale |
| 01:16:08,759 | if a price is stale |
| 01:16:11,219 | function |
| 01:16:12,539 | will revert and render the dsce engine |
| 01:16:18,120 | on usable this is by Design so we're |
| 01:16:22,441 | going to say hey if a chain link price |
| 01:16:24,120 | feed is stale just stop don't let |
| 01:16:26,520 | anything happen because if a price is |
| 01:16:28,678 | wrong if a price is bad our whole |
| 01:16:30,658 | protocol is kind of bunked right so we |
| 01:16:32,699 | want to just freeze everything so we |
| 01:16:35,639 | want the DSC engine to freeze if price |
| 01:16:40,678 | has become stale |
| 01:16:42,900 | so if the chain link |
| 01:16:45,780 | Network explodes and you have a lot of |
| 01:16:50,099 | money locked in the protocol |
| 01:16:52,979 | too bad this is something that's going |
| 01:16:54,960 | to be a known issue right if the chain |
| 01:16:56,280 | link Network blows up and all the prices |
| 01:16:58,020 | become stale |
| 01:16:59,280 | yeah you're kind of screwed right and |
| 01:17:01,139 | maybe this is something we want to |
| 01:17:03,059 | account for but for now I'm just going |
| 01:17:05,400 | to say that's a known issue and we're |
| 01:17:06,838 | going to move on and this is where |
| 01:17:08,400 | you'll see me start to get more and more |
| 01:17:10,280 | particular about stuff this is where as |
| 01:17:13,678 | we get more and more advanced this is |
| 01:17:15,178 | where the details start to matter more |
| 01:17:17,158 | and more right all those little little |
| 01:17:18,900 | things that I kind of gloss over they |
| 01:17:20,338 | become they start to become more and |
| 01:17:22,020 | more important as this becomes closer |
| 01:17:24,539 | and closer to a real production product |
| 01:17:26,960 | that should go to audit right so let's |
| 01:17:30,838 | create a stale price check function so |
| 01:17:33,359 | create a function stale price |
| 01:17:36,719 | check and we'll have this still price |
| 01:17:39,719 | check be on an aggregator V3 |
| 01:17:42,780 | interface.sol so I'm actually going to |
| 01:17:44,639 | copy this |
| 01:17:45,658 | paste it in here toggle the word wrap |
| 01:17:48,178 | and so as an input parameter it's going |
| 01:17:50,400 | to take aggregated V3 interface |
| 01:17:52,678 | price feed this will be a public view |
| 01:17:55,799 | which will returns a uint80 it's 256. |
| 01:18:01,559 | you went to 256 you went to 256 and a |
| 01:18:05,400 | unit 80. the same |
| 01:18:08,460 | return value of the latest round data |
| 01:18:11,879 | function in an aggregated V3 interface |
| 01:18:13,799 | function like this okay cool and in here |
| 01:18:18,900 | what we're going to do is we're going to |
| 01:18:20,579 | call |
| 01:18:21,539 | price feed Dot latest |
| 01:18:25,460 | round data and I'm even just gonna cheat |
| 01:18:29,280 | a little bit we're gonna control click |
| 01:18:31,620 | into this we're going to copy this line |
| 01:18:34,620 | paste it here equals |
| 01:18:37,859 | boom just so I don't have to type as |
| 01:18:39,599 | much cool we have all those |
| 01:18:42,239 | and what we're going to say in here and |
| 01:18:44,520 | we're probably not going to use all |
| 01:18:45,539 | these |
| 01:18:46,318 | we're going to have some stale check |
| 01:18:48,059 | right so each one of these price feeds |
| 01:18:49,919 | has their own heartbeat so we probably |
| 01:18:51,479 | should ask them what their heartbeat is |
| 01:18:53,941 | but I'm just going to hard code it for |
| 01:18:55,259 | this one I'm going to say |
| 01:18:57,120 | you went 256 private constant |
| 01:19:01,318 | timeout equals three hours |
| 01:19:04,259 | and this is a constant in solidity it |
| 01:19:06,838 | stands for |
| 01:19:08,039 | 3 times 60 Minutes times 60 seconds |
| 01:19:11,998 | equals |
| 01:19:13,678 | uh this many seconds so looks like this |
| 01:19:16,739 | heartbeat is actually much longer than |
| 01:19:18,479 | the one the chain link should allow so |
| 01:19:20,219 | 360 seconds is 3600 seconds is just one |
| 01:19:24,359 | hour right we're going to give it three |
| 01:19:25,620 | hours so what we're going to say in here |
| 01:19:27,359 | is we're going to say first we're going |
| 01:19:28,799 | to do a unit 56 seconds since equals |
| 01:19:31,919 | block Dot timestamp |
| 01:19:34,139 | and then we'll have |
| 01:19:35,941 | excuse me minus |
| 01:19:38,639 | updated app |
| 01:19:40,799 | and then we'll say so this will get the |
| 01:19:43,559 | current block timestamp minus this |
| 01:19:45,838 | updated app so this should basically get |
| 01:19:48,059 | us the seconds since this price sheet |
| 01:19:50,699 | was updated then we'll say if seconds |
| 01:19:53,579 | since is greater than our timeout then |
| 01:19:57,359 | we're going to revert with a new error |
| 01:20:00,838 | error |
| 01:20:02,759 | or co-lib I'm just going to underscore |
| 01:20:05,039 | it's still price like this revert with |
| 01:20:08,338 | sale price and then we're just going to |
| 01:20:10,139 | return |
| 01:20:11,039 | all of this stuff so return round ID |
| 01:20:15,079 | answer started at updated that answered |
| 01:20:19,441 | around and I'm going to change this name |
| 01:20:20,759 | to |
| 01:20:21,780 | stale check |
| 01:20:23,520 | latest round data now |
| 01:20:27,120 | what we can do since this is a library |
| 01:20:29,579 | on |
| 01:20:31,199 | our price feed we can use this stale |
| 01:20:33,178 | check latest round data to automatically |
| 01:20:35,280 | check |
| 01:20:36,178 | to see if the price is stale so now |
| 01:20:40,859 | in our DSC engine anytime we call latest |
| 01:20:44,099 | round data |
| 01:20:46,079 | we just swap it out for stale check |
| 01:20:48,239 | latest round data so long as at the top |
| 01:20:50,699 | we go |
| 01:20:52,199 | after our errors we're going to put our |
| 01:20:54,239 | types |
| 01:20:55,441 | after the errors we're going to put |
| 01:20:57,658 | types |
| 01:20:58,799 | so this is where we would do using |
| 01:21:00,979 | Oracle lib or aggregator B3 interface we |
| 01:21:07,559 | need to import Oracle lib let's import |
| 01:21:10,219 | Oracle lib from |
| 01:21:13,079 | or excuse me dot slash libraries |
| 01:21:15,059 | libraries |
| 01:21:17,579 | slash Oracle lib that's all |
| 01:21:20,520 | like this and now yep any place we use |
| 01:21:23,158 | latest round data we can now use stale |
| 01:21:25,379 | check latest round data where we have |
| 01:21:26,941 | this stale check baked in and cool now |
| 01:21:30,539 | we did a ton of refactoring let's run |
| 01:21:32,158 | Forge test just to run this whole test |
| 01:21:34,441 | Suite including the invariant test Suite |
| 01:21:46,020 | okay and stuff's looking good here and |
| 01:21:48,178 | you can see that it even took a lot of |
| 01:21:49,979 | extra time to run this last bit |
| 01:21:52,498 | so cool so we've got a little check here |
| 01:21:56,219 | we're not going to write some more tests |
| 01:21:57,719 | this is something that you should 100 do |
| 01:22:00,120 | we pull up our terminal here we run |
| 01:22:02,879 | Forge coverage |
| 01:22:04,677 | what do you think we get |
| 01:22:12,900 | we get this which you can see there's a |
| 01:22:15,177 | whole bunch of contracts that we need to |
| 01:22:16,440 | test this Oracle lib could probably use |
| 01:22:19,258 | its own test Suite even though it's |
| 01:22:21,240 | looking like a lot of it's tested we |
| 01:22:23,039 | probably should definitely test this |
| 01:22:24,177 | ourselves we need to write tests for |
| 01:22:26,280 | this we probably want to test our our |
| 01:22:29,699 | DSC some more for sure |
| 01:22:32,337 | so we should definitely write some more |
| 01:22:33,780 | tests I'm going to leave that to you |
| 01:22:36,177 | this little little finger here |
| 01:22:45,359 | and then finally some smart contract |
| 01:22:47,098 | audit preparation so we talked a little |
| 01:22:49,139 | bit about what a smart contract audit is |
| 01:22:51,258 | and we haven't covered a whole lot of |
| 01:22:53,940 | security stuff yet we're going to do |
| 01:22:55,199 | that later in the course but a solid |
| 01:22:57,479 | place you can look is this audit |
| 01:22:58,799 | Readiness checklist from the nascent XYZ |
| 01:23:01,920 | GitHub repo which has a lot of different |
| 01:23:04,979 | things that you should and keep in mind |
| 01:23:07,319 | when running your tests for those of you |
| 01:23:09,900 | looking to be really serious about |
| 01:23:11,940 | actually launching a protocol and really |
| 01:23:14,159 | having the security mindset that you |
| 01:23:15,960 | need as well be sure |
| 01:23:17,999 | to get to this last |
| 01:23:20,337 | section in the course |
| 01:23:22,199 | about intro to security because this is |
| 01:23:24,900 | where we're going to give you a lot of |
| 01:23:26,280 | that lower level security stuff at least |
| 01:23:29,219 | from a smart contract developer |
| 01:23:31,139 | perspective we're going to give you all |
| 01:23:32,879 | the basics that you need to be aware of |
| 01:23:34,379 | in order to stay secure so we're not |
| 01:23:37,199 | going to talk about it too much in this |
| 01:23:38,940 | one but it is something that if we were |
| 01:23:40,979 | to actually launch this we would need to |
| 01:23:42,900 | keep in mind |
| 01:23:43,859 | so I'll put a little soon Emoji here for |
| 01:23:46,379 | coming very soon |
| 01:23:51,420 | all right so with that all being said |
| 01:23:54,379 | we've done an absolute ton here this is |
| 01:23:58,379 | one thousand percent a project you |
| 01:24:00,960 | should push up to your GitHub repo and |
| 01:24:03,837 | this is one thousand percent a project |
| 01:24:05,879 | that if you made it this far you should |
| 01:24:08,039 | be incredibly proud of yourself this is |
| 01:24:10,979 | the hardest most complicated most |
| 01:24:13,620 | advanced project |
| 01:24:15,960 | in this course and to be honest probably |
| 01:24:18,420 | the most advanced project you'll work on |
| 01:24:19,920 | in almost all of web3 there's so much |
| 01:24:22,440 | going on here we learned about defy we |
| 01:24:25,620 | learned about advanced state-of-the-art |
| 01:24:27,979 | modern fuzzing techniques we learned a |
| 01:24:31,979 | tiny tiny bit about security we used |
| 01:24:34,319 | Oracles in a safer way we wrote this |
| 01:24:36,659 | crazy amazing test Suite we wrote deploy |
| 01:24:40,080 | scripts for this we wrote We interacted |
| 01:24:42,659 | with a couple different libraries |
| 01:24:45,120 | we learned about this fail on revert |
| 01:24:47,580 | runs depth and variants the only thing |
| 01:24:50,337 | we didn't do was write a proper readme |
| 01:24:52,080 | which you 100 should write a proper |
| 01:24:54,359 | readme and if you want you can check out |
| 01:24:56,758 | The Foundry D5 stablecoin readme to see |
| 01:24:58,979 | how it actually works of course even for |
| 01:25:02,159 | me this was a long difficult project for |
| 01:25:05,639 | me to build because there's just so much |
| 01:25:07,499 | to think about like I said this is a |
| 01:25:09,900 | project that I am planning on getting |
| 01:25:11,159 | audited so what you're going to see in |
| 01:25:14,039 | this repo is you're going to see kind of |
| 01:25:16,080 | this main branch which is what you're |
| 01:25:17,337 | going to be working on but I'm |
| 01:25:18,960 | additionally going to make a new branch |
| 01:25:20,460 | called like audited or post audit or |
| 01:25:23,159 | something like that and if you want to |
| 01:25:24,780 | follow and watch this GitHub repo you |
| 01:25:27,120 | can see the progress and you can see the |
| 01:25:29,098 | audit reports that come out on here so |
| 01:25:30,900 | that you |
| 01:25:31,859 | can be intimately familiar with this |
| 01:25:33,900 | code base already because you wrote some |
| 01:25:35,940 | of the code |
| 01:25:37,319 | and then also see as it progresses |
| 01:25:39,240 | through its security journey and for |
| 01:25:42,299 | those of you who are looking to actually |
| 01:25:43,559 | release production code you definitely |
| 01:25:45,479 | need to be at least aware of how |
| 01:25:48,177 | security works and the security paths |
| 01:25:50,280 | that your code should take but all right |
| 01:25:53,280 | with all this being said |
| 01:25:55,319 | you know what time it is |
| 01:25:57,059 | it's time for you to get a break you |
| 01:26:00,780 | deserve it you should 100 go take a lap |
| 01:26:04,379 | push this code base up to GitHub and |
| 01:26:07,920 | actually clean it up a little bit I'm |
| 01:26:09,719 | going to be cleaning this up a little |
| 01:26:10,920 | bit before I push the rest of it to this |
| 01:26:13,080 | GitHub repo so you should clean it up a |
| 01:26:15,120 | little bit make it yours make it the way |
| 01:26:17,098 | that you want to make it maybe even |
| 01:26:19,440 | improve on it right we saw with the |
| 01:26:21,177 | invariant test that there is at least |
| 01:26:23,280 | one other claring issue with this |
| 01:26:25,440 | protocol |
| 01:26:26,280 | if the price of the assets |
| 01:26:29,159 | collapsed too quickly our protocol |
| 01:26:31,440 | becomes insolvent so maybe you come up |
| 01:26:34,139 | with a method to fix it and then maybe |
| 01:26:36,177 | you launch your own stable coin why not |
| 01:26:38,098 | right in any case good luck to you take |
| 01:26:41,280 | that break we only have we're getting so |
| 01:26:44,940 | close we only have one two three more |
| 01:26:48,960 | lessons and these ones are actually |
| 01:26:51,539 | easier than the one we just did we're |
| 01:26:54,120 | going to learn about upgrades and |
| 01:26:55,620 | proxies we're going to learn about |
| 01:26:56,879 | governance |
| 01:26:58,139 | and then we're going to do an |
| 01:26:59,280 | introduction to Smart contract security |
| 01:27:00,859 | these are much easier than everything |
| 01:27:03,420 | you've done so far so take the break |
| 01:27:06,240 | give yourself a pat on the back be |
| 01:27:08,758 | incredibly excited celebrate this win |
| 01:27:10,620 | this is a huge achievement getting this |
| 01:27:12,659 | far |
| 01:27:13,499 | and I'll see you very soon |
| 01:27:16,017 | three more left |
| 01:27:22,859 | and as a bonus piece of content here |
| 01:27:25,440 | another one of the reasons that I |
| 01:27:27,177 | absolutely love the Ave protocol and the |
| 01:27:29,460 | Ave team is that they're just shipping |
| 01:27:32,039 | protocols and shipping amazing products |
| 01:27:34,979 | and features and services for the web3 |
| 01:27:37,139 | community one of those |
| 01:27:39,479 | protocols is something called lens |
| 01:27:41,699 | protocol which is a decentralized social |
| 01:27:43,859 | layer or a decentralized social platform |
| 01:27:45,780 | for building social medias so to give us |
| 01:27:48,359 | some information about this we have the |
| 01:27:49,740 | head of devrel for lens protocol on the |
| 01:27:51,539 | Ave team natterdabit to talk a little |
| 01:27:53,819 | bit more about lens hi my name is natter |
| 01:27:56,219 | David I wanted to give you a quick |
| 01:27:57,960 | introduction to lens protocol and why it |
| 01:28:00,359 | might be interesting to you as a smart |
| 01:28:02,098 | contractor solidity engineer lens is the |
| 01:28:04,799 | social layer of web3 it allows |
| 01:28:06,598 | developers to build social applications |
| 01:28:08,517 | or to implement social features into |
| 01:28:10,859 | their existing applications there are |
| 01:28:12,900 | 4.9 billion people in the world today |
| 01:28:14,699 | already using social applications so |
| 01:28:17,219 | these types of apps provide a use case |
| 01:28:19,017 | that people already know understand and |
| 01:28:21,120 | value they also present a wide variety |
| 01:28:23,460 | of value propositions and opportunities |
| 01:28:25,559 | for developers to take advantage of and |
| 01:28:27,598 | build on and with web 3 features like |
| 01:28:29,999 | native payments ownership and |
| 01:28:31,620 | composibility also provide a lot of |
| 01:28:33,780 | Primitives to build on that were not |
| 01:28:35,400 | available with traditional social |
| 01:28:36,900 | applications or infrastructure lens |
| 01:28:39,479 | developers to extend the core smart |
| 01:28:41,460 | contracts by building out their own |
| 01:28:43,499 | custom modules this will be similar to |
| 01:28:45,539 | as if Twitter Instagram or other social |
| 01:28:47,400 | applications allow developers to send |
| 01:28:49,559 | pull requests into their backends and |
| 01:28:51,780 | apis this opens the door to a lot of |
| 01:28:54,299 | interesting and Powerful functionality |
| 01:28:56,098 | that we're seeing developers integrate |
| 01:28:57,960 | into their applications build out new |
| 01:29:00,479 | different ideas but also integrate into |
| 01:29:02,699 | other parts of web3 like defy in |
| 01:29:05,517 | addition to that you can call lensmart |
| 01:29:07,499 | contracts from other smart contracts so |
| 01:29:09,780 | if you'd like to build out something |
| 01:29:11,039 | that is composable with the web 3 social |
| 01:29:13,017 | graph lens is a great place to integrate |
| 01:29:15,359 | if you want to get started building on |
| 01:29:17,280 | lens check out the docs at docs.lens.xyz |
| 01:29:20,039 | and be sure to check out how to deploy |
| 01:29:22,559 | the protocol on your own so you can |
| 01:29:24,479 | check out the smart contract code and |
| 01:29:26,159 | play around with it and also look at how |
| 01:29:28,379 | to build out and create your own custom |
| 01:29:30,659 | modules thanks for checking this out |
