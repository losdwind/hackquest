# 1 Stability fee mechanism

> **🎬 待录制 (Coming Soon)**

## 课程大纲

本节将实现协议收入模型 - Stability Fee：

### 核心内容

1. **Accumulator Pattern**
   - 全局债务指数 (globalDebtIndex)
   - 用户标准化债务 (normalizedDebt)
   - 利率累积计算

2. **Ray Math Precision (1e27)**
   - 为什么需要 27 位小数精度
   - `rayMul` 和 `rayDiv` 实现
   - 复利计算中的精度损失问题

3. **_accrueInterest 设计**
   - 时间加权利率累积
   - Gas 优化策略
   - 利率更新触发时机

### 数学原理

```
实际债务 = normalizedDebt * globalDebtIndex
globalDebtIndex = globalDebtIndex * (1 + rate * timeElapsed)

例如:
年化利率 2% = 2e25 (Ray precision)
每秒利率 = 2e25 / 31536000 ≈ 634e18
```

### 代码实现

```solidity
import {RayMath} from "./libraries/RayMath.sol";

using RayMath for uint256;

uint256 private s_globalDebtIndex = RayMath.RAY; // 初始为 1e27
mapping(address => uint256) private s_normalizedDebt;
uint256 private s_lastAccrualTimestamp;
uint256 public constant STABILITY_FEE = 634195839675291; // 2% APR in ray/sec

function _accrueInterest() internal {
    uint256 timeElapsed = block.timestamp - s_lastAccrualTimestamp;
    if (timeElapsed == 0) return;
    
    uint256 rateAccumulated = STABILITY_FEE * timeElapsed;
    s_globalDebtIndex = s_globalDebtIndex.rayMul(RayMath.RAY + rateAccumulated);
    s_lastAccrualTimestamp = block.timestamp;
}

function getUserDebt(address user) public view returns (uint256) {
    return s_normalizedDebt[user].rayMul(s_globalDebtIndex);
}
```

### 实战要点

- 利率参数的治理调整
- 协议收入的分配策略
- 与 MakerDAO DSR 的对比

---

*本章节将基于 Aave V2 的利率模型和 `src/libraries/RayMath.sol` 实现*
create a stale price check function so

6867
04:35:15,480 --> 04:35:18,840
create a function stale price

6868
04:35:18,840 --> 04:35:21,840
check and we'll have this still price

6869
04:35:21,840 --> 04:35:24,900
check be on an aggregator V3

6870
04:35:24,900 --> 04:35:26,760
interface.sol so I'm actually going to

6871
04:35:26,760 --> 04:35:27,779
copy this

6872
04:35:27,779 --> 04:35:30,299
paste it in here toggle the word wrap

6873
04:35:30,299 --> 04:35:32,520
and so as an input parameter it's going

6874
04:35:32,520 --> 04:35:34,799
to take aggregated V3 interface

6875
04:35:34,799 --> 04:35:37,920
price feed this will be a public view

6876
04:35:37,920 --> 04:35:43,680
which will returns a uint80 it's 256.

6877
04:35:43,680 --> 04:35:47,520
you went to 256 you went to 256 and a

6878
04:35:47,520 --> 04:35:50,580
unit 80. the same

6879
04:35:50,580 --> 04:35:54,000
return value of the latest round data

6880
04:35:54,000 --> 04:35:55,920
function in an aggregated V3 interface

6881
04:35:55,920 --> 04:36:01,020
function like this okay cool and in here

6882
04:36:01,020 --> 04:36:02,699
what we're going to do is we're going to

6883
04:36:02,699 --> 04:36:03,660
call

6884
04:36:03,660 --> 04:36:07,580
price feed Dot latest

6885
04:36:07,580 --> 04:36:11,400
round data and I'm even just gonna cheat

6886
04:36:11,400 --> 04:36:13,740
a little bit we're gonna control click

6887
04:36:13,740 --> 04:36:16,740
into this we're going to copy this line

6888
04:36:16,740 --> 04:36:19,980
paste it here equals

6889
04:36:19,980 --> 04:36:21,719
boom just so I don't have to type as

6890
04:36:21,719 --> 04:36:24,359
much cool we have all those

6891
04:36:24,359 --> 04:36:26,641
and what we're going to say in here and

6892
04:36:26,641 --> 04:36:27,660
we're probably not going to use all

6893
04:36:27,660 --> 04:36:28,439
these

6894
04:36:28,439 --> 04:36:30,180
we're going to have some stale check

6895
04:36:30,180 --> 04:36:32,039
right so each one of these price feeds

6896
04:36:32,039 --> 04:36:33,600
has their own heartbeat so we probably

6897
04:36:33,600 --> 04:36:36,061
should ask them what their heartbeat is

6898
04:36:36,061 --> 04:36:37,379
but I'm just going to hard code it for

6899
04:36:37,379 --> 04:36:39,240
this one I'm going to say

6900
04:36:39,240 --> 04:36:43,439
you went 256 private constant

6901
04:36:43,439 --> 04:36:46,379
timeout equals three hours

6902
04:36:46,379 --> 04:36:48,959
and this is a constant in solidity it

6903
04:36:48,959 --> 04:36:50,160
stands for

6904
04:36:50,160 --> 04:36:54,119
3 times 60 Minutes times 60 seconds

6905
04:36:54,119 --> 04:36:55,799
equals

6906
04:36:55,799 --> 04:36:58,859
uh this many seconds so looks like this

6907
04:36:58,859 --> 04:37:00,600
heartbeat is actually much longer than

6908
04:37:00,600 --> 04:37:02,340
the one the chain link should allow so

6909
04:37:02,340 --> 04:37:06,480
360 seconds is 3600 seconds is just one

6910
04:37:06,480 --> 04:37:07,740
hour right we're going to give it three

6911
04:37:07,740 --> 04:37:09,480
hours so what we're going to say in here

6912
04:37:09,480 --> 04:37:10,920
is we're going to say first we're going

6913
04:37:10,920 --> 04:37:14,039
to do a unit 56 seconds since equals

6914
04:37:14,039 --> 04:37:16,260
block Dot timestamp

6915
04:37:16,260 --> 04:37:18,061
and then we'll have

6916
04:37:18,061 --> 04:37:20,760
excuse me minus

6917
04:37:20,760 --> 04:37:22,920
updated app

6918
04:37:22,920 --> 04:37:25,680
and then we'll say so this will get the

6919
04:37:25,680 --> 04:37:27,959
current block timestamp minus this

6920
04:37:27,959 --> 04:37:30,180
updated app so this should basically get

6921
04:37:30,180 --> 04:37:32,820
us the seconds since this price sheet

6922
04:37:32,820 --> 04:37:35,699
was updated then we'll say if seconds

6923
04:37:35,699 --> 04:37:39,480
since is greater than our timeout then

6924
04:37:39,480 --> 04:37:42,959
we're going to revert with a new error

6925
04:37:42,959 --> 04:37:44,879
error

6926
04:37:44,879 --> 04:37:47,160
or co-lib I'm just going to underscore

6927
04:37:47,160 --> 04:37:50,459
it's still price like this revert with

6928
04:37:50,459 --> 04:37:52,260
sale price and then we're just going to

6929
04:37:52,260 --> 04:37:53,160
return

6930
04:37:53,160 --> 04:37:57,199
all of this stuff so return round ID

6931
04:37:57,199 --> 04:38:01,561
answer started at updated that answered

6932
04:38:01,561 --> 04:38:02,879
around and I'm going to change this name

6933
04:38:02,879 --> 04:38:03,900
to

6934
04:38:03,900 --> 04:38:05,641
stale check

6935
04:38:05,641 --> 04:38:09,240
latest round data now

6936
04:38:09,240 --> 04:38:11,699
what we can do since this is a library

6937
04:38:11,699 --> 04:38:13,320
on

6938
04:38:13,320 --> 04:38:15,299
our price feed we can use this stale

6939
04:38:15,299 --> 04:38:17,400
check latest round data to automatically

6940
04:38:17,400 --> 04:38:18,299
check

6941
04:38:18,299 --> 04:38:22,980
to see if the price is stale so now

6942
04:38:22,980 --> 04:38:26,219
in our DSC engine anytime we call latest

6943
04:38:26,219 --> 04:38:28,199
round data

6944
04:38:28,199 --> 04:38:30,359
we just swap it out for stale check

6945
04:38:30,359 --> 04:38:32,820
latest round data so long as at the top

6946
04:38:32,820 --> 04:38:34,320
we go

6947
04:38:34,320 --> 04:38:36,359
after our errors we're going to put our

6948
04:38:36,359 --> 04:38:37,561
types

6949
04:38:37,561 --> 04:38:39,779
after the errors we're going to put

6950
04:38:39,779 --> 04:38:40,920
types

6951
04:38:40,920 --> 04:38:43,100
so this is where we would do using

6952
04:38:43,100 --> 04:38:49,680
Oracle lib or aggregator B3 interface we

6953
04:38:49,680 --> 04:38:52,340
need to import Oracle lib let's import

6954
04:38:52,340 --> 04:38:55,199
Oracle lib from

6955
04:38:55,199 --> 04:38:57,180
or excuse me dot slash libraries

6956
04:38:57,180 --> 04:38:59,699
libraries

6957
04:38:59,699 --> 04:39:02,641
slash Oracle lib that's all

6958
04:39:02,641 --> 04:39:05,279
like this and now yep any place we use

6959
04:39:05,279 --> 04:39:07,500
latest round data we can now use stale

6960
04:39:07,500 --> 04:39:09,061
check latest round data where we have

6961
04:39:09,061 --> 04:39:12,660
this stale check baked in and cool now

6962
04:39:12,660 --> 04:39:14,279
we did a ton of refactoring let's run

6963
04:39:14,279 --> 04:39:16,561
Forge test just to run this whole test

6964
04:39:16,561 --> 04:39:20,420
Suite including the invariant test Suite

6965
04:39:28,141 --> 04:39:30,299
okay and stuff's looking good here and

6966
04:39:30,299 --> 04:39:32,100
you can see that it even took a lot of

6967
04:39:32,100 --> 04:39:34,619
extra time to run this last bit

6968
04:39:34,619 --> 04:39:38,340
so cool so we've got a little check here

6969
04:39:38,340 --> 04:39:39,840
we're not going to write some more tests

6970
04:39:39,840 --> 04:39:42,240
this is something that you should 100 do

6971
04:39:42,240 --> 04:39:45,000
we pull up our terminal here we run

6972
04:39:45,000 --> 04:39:46,798
Forge coverage

6973
04:39:46,798 --> 04:39:49,820
what do you think we get

6974
04:39:55,020 --> 04:39:57,298
we get this which you can see there's a

6975
04:39:57,298 --> 04:39:58,560
whole bunch of contracts that we need to

6976
04:39:58,560 --> 04:40:01,378
test this Oracle lib could probably use

6977
04:40:01,378 --> 04:40:03,360
its own test Suite even though it's

6978
04:40:03,360 --> 04:40:05,160
looking like a lot of it's tested we

6979
04:40:05,160 --> 04:40:06,298
probably should definitely test this

6980
04:40:06,298 --> 04:40:08,400
ourselves we need to write tests for

6981
04:40:08,400 --> 04:40:11,820
this we probably want to test our our

6982
04:40:11,820 --> 04:40:14,458
DSC some more for sure

6983
04:40:14,458 --> 04:40:15,900
so we should definitely write some more

6984
04:40:15,900 --> 04:40:18,298
tests I'm going to leave that to you

6985
04:40:18,298 --> 04:40:21,860
this little little finger here

6986
04:40:27,480 --> 04:40:29,218
and then finally some smart contract

6987
04:40:29,218 --> 04:40:31,260
audit preparation so we talked a little

6988
04:40:31,260 --> 04:40:33,378
bit about what a smart contract audit is

6989
04:40:33,378 --> 04:40:36,060
and we haven't covered a whole lot of

6990
04:40:36,060 --> 04:40:37,320
security stuff yet we're going to do

6991
04:40:37,320 --> 04:40:39,600
that later in the course but a solid

6992
04:40:39,600 --> 04:40:40,920
place you can look is this audit

6993
04:40:40,920 --> 04:40:44,040
Readiness checklist from the nascent XYZ

6994
04:40:44,040 --> 04:40:47,100
GitHub repo which has a lot of different

6995
04:40:47,100 --> 04:40:49,440
things that you should and keep in mind

6996
04:40:49,440 --> 04:40:52,020
when running your tests for those of you

6997
04:40:52,020 --> 04:40:54,060
looking to be really serious about

6998
04:40:54,060 --> 04:40:56,280
actually launching a protocol and really

6999
04:40:56,280 --> 04:40:58,080
having the security mindset that you

7000
04:40:58,080 --> 04:41:00,120
need as well be sure

7001
04:41:00,120 --> 04:41:02,458
to get to this last

7002
04:41:02,458 --> 04:41:04,320
section in the course

7003
04:41:04,320 --> 04:41:07,020
about intro to security because this is

7004
04:41:07,020 --> 04:41:08,400
where we're going to give you a lot of

7005
04:41:08,400 --> 04:41:11,340
that lower level security stuff at least

7006
04:41:11,340 --> 04:41:13,260
from a smart contract developer

7007
04:41:13,260 --> 04:41:15,000
perspective we're going to give you all

7008
04:41:15,000 --> 04:41:16,500
the basics that you need to be aware of

7009
04:41:16,500 --> 04:41:19,320
in order to stay secure so we're not

7010
04:41:19,320 --> 04:41:21,060
going to talk about it too much in this

7011
04:41:21,060 --> 04:41:23,100
one but it is something that if we were

7012
04:41:23,100 --> 04:41:25,020
to actually launch this we would need to

7013
04:41:25,020 --> 04:41:25,980
keep in mind

7014
04:41:25,980 --> 04:41:28,500
so I'll put a little soon Emoji here for

7015
04:41:28,500 --> 04:41:31,580
coming very soon

7016
04:41:33,540 --> 04:41:36,500
all right so with that all being said

7017
04:41:36,500 --> 04:41:40,500
we've done an absolute ton here this is

7018
04:41:40,500 --> 04:41:43,080
one thousand percent a project you

7019
04:41:43,080 --> 04:41:45,958
should push up to your GitHub repo and

7020
04:41:45,958 --> 04:41:48,000
this is one thousand percent a project

7021
04:41:48,000 --> 04:41:50,160
that if you made it this far you should

7022
04:41:50,160 --> 04:41:53,100
be incredibly proud of yourself this is

7023
04:41:53,100 --> 04:41:55,740
the hardest most complicated most

7024
04:41:55,740 --> 04:41:58,080
advanced project

7025
04:41:58,080 --> 04:42:00,540
in this course and to be honest probably

7026
04:42:00,540 --> 04:42:02,040
the most advanced project you'll work on

7027
04:42:02,040 --> 04:42:04,560
in almost all of web3 there's so much

7028
04:42:04,560 --> 04:42:07,740
going on here we learned about defy we

7029
04:42:07,740 --> 04:42:10,100
learned about advanced state-of-the-art

7030
04:42:10,100 --> 04:42:14,100
modern fuzzing techniques we learned a

7031
04:42:14,100 --> 04:42:16,440
tiny tiny bit about security we used

7032
04:42:16,440 --> 04:42:18,780
Oracles in a safer way we wrote this

7033
04:42:18,780 --> 04:42:22,200
crazy amazing test Suite we wrote deploy

7034
04:42:22,200 --> 04:42:24,780
scripts for this we wrote We interacted

7035
04:42:24,780 --> 04:42:27,240
with a couple different libraries

7036
04:42:27,240 --> 04:42:29,700
we learned about this fail on revert

7037
04:42:29,700 --> 04:42:32,458
runs depth and variants the only thing

7038
04:42:32,458 --> 04:42:34,200
we didn't do was write a proper readme

7039
04:42:34,200 --> 04:42:36,480
which you 100 should write a proper

7040
04:42:36,480 --> 04:42:38,878
readme and if you want you can check out

7041
04:42:38,878 --> 04:42:41,100
The Foundry D5 stablecoin readme to see

7042
04:42:41,100 --> 04:42:44,280
how it actually works of course even for

7043
04:42:44,280 --> 04:42:47,760
me this was a long difficult project for

7044
04:42:47,760 --> 04:42:49,620
me to build because there's just so much

7045
04:42:49,620 --> 04:42:52,020
to think about like I said this is a

7046
04:42:52,020 --> 04:42:53,280
project that I am planning on getting

7047
04:42:53,280 --> 04:42:56,160
audited so what you're going to see in

7048
04:42:56,160 --> 04:42:58,200
this repo is you're going to see kind of

7049
04:42:58,200 --> 04:42:59,458
this main branch which is what you're

7050
04:42:59,458 --> 04:43:01,080
going to be working on but I'm

7051
04:43:01,080 --> 04:43:02,580
additionally going to make a new branch

7052
04:43:02,580 --> 04:43:05,280
called like audited or post audit or

7053
04:43:05,280 --> 04:43:06,900
something like that and if you want to

7054
04:43:06,900 --> 04:43:09,240
follow and watch this GitHub repo you

7055
04:43:09,240 --> 04:43:11,218
can see the progress and you can see the

7056
04:43:11,218 --> 04:43:13,020
audit reports that come out on here so

7057
04:43:13,020 --> 04:43:13,980
that you

7058
04:43:13,980 --> 04:43:16,020
can be intimately familiar with this

7059
04:43:16,020 --> 04:43:18,060
code base already because you wrote some

7060
04:43:18,060 --> 04:43:19,440
of the code

7061
04:43:19,440 --> 04:43:21,360
and then also see as it progresses

7062
04:43:21,360 --> 04:43:24,420
through its security journey and for

7063
04:43:24,420 --> 04:43:25,680
those of you who are looking to actually

7064
04:43:25,680 --> 04:43:27,600
release production code you definitely

7065
04:43:27,600 --> 04:43:30,298
need to be at least aware of how

7066
04:43:30,298 --> 04:43:32,400
security works and the security paths

7067
04:43:32,400 --> 04:43:35,400
that your code should take but all right

7068
04:43:35,400 --> 04:43:37,440
with all this being said

7069
04:43:37,440 --> 04:43:39,180
you know what time it is

7070
04:43:39,180 --> 04:43:42,900
it's time for you to get a break you

7071
04:43:42,900 --> 04:43:46,500
deserve it you should 100 go take a lap

7072
04:43:46,500 --> 04:43:50,040
push this code base up to GitHub and

7073
04:43:50,040 --> 04:43:51,840
actually clean it up a little bit I'm

7074
04:43:51,840 --> 04:43:53,040
going to be cleaning this up a little

7075
04:43:53,040 --> 04:43:55,200
bit before I push the rest of it to this

7076
04:43:55,200 --> 04:43:57,240
GitHub repo so you should clean it up a

7077
04:43:57,240 --> 04:43:59,218
little bit make it yours make it the way

7078
04:43:59,218 --> 04:44:01,560
that you want to make it maybe even

7079
04:44:01,560 --> 04:44:03,298
improve on it right we saw with the

7080
04:44:03,298 --> 04:44:05,400
invariant test that there is at least

7081
04:44:05,400 --> 04:44:07,560
one other claring issue with this

7082
04:44:07,560 --> 04:44:08,400
protocol

7083
04:44:08,400 --> 04:44:11,280
if the price of the assets

7084
04:44:11,280 --> 04:44:13,560
collapsed too quickly our protocol

7085
04:44:13,560 --> 04:44:16,260
becomes insolvent so maybe you come up

7086
04:44:16,260 --> 04:44:18,298
with a method to fix it and then maybe

7087
04:44:18,298 --> 04:44:20,218
you launch your own stable coin why not

7088
04:44:20,218 --> 04:44:23,400
right in any case good luck to you take

7089
04:44:23,400 --> 04:44:27,060
that break we only have we're getting so

7090
04:44:27,060 --> 04:44:31,080
close we only have one two three more

7091
04:44:31,080 --> 04:44:33,660
lessons and these ones are actually

7092
04:44:33,660 --> 04:44:36,240
easier than the one we just did we're

7093
04:44:36,240 --> 04:44:37,740
going to learn about upgrades and

7094
04:44:37,740 --> 04:44:39,000
proxies we're going to learn about

7095
04:44:39,000 --> 04:44:40,260
governance

7096
04:44:40,260 --> 04:44:41,400
and then we're going to do an

7097
04:44:41,400 --> 04:44:42,980
introduction to Smart contract security

7098
04:44:42,980 --> 04:44:45,540
these are much easier than everything

7099
04:44:45,540 --> 04:44:48,360
you've done so far so take the break

7100
04:44:48,360 --> 04:44:50,878
give yourself a pat on the back be

7101
04:44:50,878 --> 04:44:52,740
incredibly excited celebrate this win

7102
04:44:52,740 --> 04:44:54,780
this is a huge achievement getting this

7103
04:44:54,780 --> 04:44:55,620
far

7104
04:44:55,620 --> 04:44:58,138
and I'll see you very soon

7105
04:44:58,138 --> 04:45:02,878
three more left

7106
04:45:04,980 --> 04:45:07,560
and as a bonus piece of content here

7107
04:45:07,560 --> 04:45:09,298
another one of the reasons that I

7108
04:45:09,298 --> 04:45:11,580
absolutely love the Ave protocol and the

7109
04:45:11,580 --> 04:45:14,160
Ave team is that they're just shipping

7110
04:45:14,160 --> 04:45:17,100
protocols and shipping amazing products

7111
04:45:17,100 --> 04:45:19,260
and features and services for the web3

7112
04:45:19,260 --> 04:45:21,600
community one of those

7113
04:45:21,600 --> 04:45:23,820
protocols is something called lens

7114
04:45:23,820 --> 04:45:25,980
protocol which is a decentralized social

7115
04:45:25,980 --> 04:45:27,900
layer or a decentralized social platform

7116
04:45:27,900 --> 04:45:30,480
for building social medias so to give us

7117
04:45:30,480 --> 04:45:31,860
some information about this we have the

7118
04:45:31,860 --> 04:45:33,660
head of devrel for lens protocol on the

7119
04:45:33,660 --> 04:45:35,940
Ave team natterdabit to talk a little

7120
04:45:35,940 --> 04:45:38,340
bit more about lens hi my name is natter

7121
04:45:38,340 --> 04:45:40,080
David I wanted to give you a quick

7122
04:45:40,080 --> 04:45:42,480
introduction to lens protocol and why it

7123
04:45:42,480 --> 04:45:44,218
might be interesting to you as a smart

7124
04:45:44,218 --> 04:45:46,920
contractor solidity engineer lens is the

7125
04:45:46,920 --> 04:45:48,718
social layer of web3 it allows

7126
04:45:48,718 --> 04:45:50,638
developers to build social applications

7127
04:45:50,638 --> 04:45:52,980
or to implement social features into

7128
04:45:52,980 --> 04:45:55,020
their existing applications there are

7129
04:45:55,020 --> 04:45:56,820
4.9 billion people in the world today

7130
04:45:56,820 --> 04:45:59,340
already using social applications so

7131
04:45:59,340 --> 04:46:01,138
these types of apps provide a use case

7132
04:46:01,138 --> 04:46:03,240
that people already know understand and

7133
04:46:03,240 --> 04:46:05,580
value they also present a wide variety

7134
04:46:05,580 --> 04:46:07,680
of value propositions and opportunities

7135
04:46:07,680 --> 04:46:09,718
for developers to take advantage of and

7136
04:46:09,718 --> 04:46:12,120
build on and with web 3 features like

7137
04:46:12,120 --> 04:46:13,740
native payments ownership and

7138
04:46:13,740 --> 04:46:15,900
composibility also provide a lot of

7139
04:46:15,900 --> 04:46:17,520
Primitives to build on that were not

7140
04:46:17,520 --> 04:46:19,020
available with traditional social

7141
04:46:19,020 --> 04:46:21,600
applications or infrastructure lens

7142
04:46:21,600 --> 04:46:23,580
developers to extend the core smart

7143
04:46:23,580 --> 04:46:25,620
contracts by building out their own

7144
04:46:25,620 --> 04:46:27,660
custom modules this will be similar to

7145
04:46:27,660 --> 04:46:29,520
as if Twitter Instagram or other social

7146
04:46:29,520 --> 04:46:31,680
applications allow developers to send

7147
04:46:31,680 --> 04:46:33,900
pull requests into their backends and

7148
04:46:33,900 --> 04:46:36,420
apis this opens the door to a lot of

7149
04:46:36,420 --> 04:46:38,218
interesting and Powerful functionality

7150
04:46:38,218 --> 04:46:40,080
that we're seeing developers integrate

7151
04:46:40,080 --> 04:46:42,600
into their applications build out new

7152
04:46:42,600 --> 04:46:44,820
different ideas but also integrate into

7153
04:46:44,820 --> 04:46:47,638
other parts of web3 like defy in

7154
04:46:47,638 --> 04:46:49,620
addition to that you can call lensmart

7155
04:46:49,620 --> 04:46:51,900
contracts from other smart contracts so

7156
04:46:51,900 --> 04:46:53,160
if you'd like to build out something

7157
04:46:53,160 --> 04:46:55,138
that is composable with the web 3 social

7158
04:46:55,138 --> 04:46:57,480
graph lens is a great place to integrate

7159
04:46:57,480 --> 04:46:59,400
if you want to get started building on

7160
04:46:59,400 --> 04:47:02,160
lens check out the docs at docs.lens.xyz

7161
04:47:02,160 --> 04:47:04,680
and be sure to check out how to deploy

7162
04:47:04,680 --> 04:47:06,600
the protocol on your own so you can

7163
04:47:06,600 --> 04:47:08,280
check out the smart contract code and

7164
04:47:08,280 --> 04:47:10,500
play around with it and also look at how

7165
04:47:10,500 --> 04:47:12,780
to build out and create your own custom

7166
04:47:12,780 --> 04:47:16,638
modules thanks for checking this out