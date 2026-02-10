# 2 Liquidation edge cases

> **🎬 待录制 (Coming Soon)**

## 课程大纲

本节将深入探讨清算系统的边界情况处理：

### 核心内容

1. **Partial vs Full Liquidation**
   - 部分清算的触发条件
   - 最大可清算债务计算
   - 清算完成后的健康因子验证

2. **Liquidator Protection**
   - 清算者的健康因子保护
   - 防止恶意清算的机制
   - 清算失败的回退策略

3. **Under-collateralization Backstop**
   - 协议坏账的识别
   - Stability Pool 接入逻辑
   - 紧急情况下的协议暂停

### 代码实现

```solidity
// 部分清算检查
uint256 maxDebtToCover = (collateralValue * LIQUIDATION_BONUS) / LIQUIDATION_PRECISION;
if (debtToCover > maxDebtToCover) {
    debtToCover = maxDebtToCover;
}

// 清算后验证
require(_healthFactor(user) >= MIN_HEALTH_FACTOR, "Still unhealthy");
require(_healthFactor(msg.sender) >= MIN_HEALTH_FACTOR, "Liquidator broke");
```

### 测试场景

- 清算超过允许额度的情况
- 多个清算者竞争同一目标
- 价格剧烈波动时的清算行为
- Gas 不足导致的清算失败

---

*本章节将扩展 Unit 4.1 基础清算流程，添加生产环境必需的边界检查*

3811
02:32:09,300 --> 02:32:11,160
as you improve their health Factor

3812
02:32:11,160 --> 02:32:13,380
that's all we care about at notice

3813
02:32:13,380 --> 02:32:15,359
you will get

3814
02:32:15,359 --> 02:32:17,760
a liquidation bonus

3815
02:32:17,760 --> 02:32:21,420
we're taking the user's funds right we

3816
02:32:21,420 --> 02:32:24,000
want to incentivize them to to actually

3817
02:32:24,000 --> 02:32:26,520
do this right if we say okay cool you'll

3818
02:32:26,520 --> 02:32:28,680
get the fifty dollars back for

3819
02:32:28,680 --> 02:32:30,899
paying off the fifty dollars debt it's

3820
02:32:30,899 --> 02:32:32,340
gonna be hard to incentivize people to

3821
02:32:32,340 --> 02:32:34,859
do that but if we say you get all 75

3822
02:32:34,859 --> 02:32:36,359
dollars and all you have to do is pay

3823
02:32:36,359 --> 02:32:38,819
back 50 then that's going to be a bonus

3824
02:32:38,819 --> 02:32:40,319
that they should be able to take to

3825
02:32:40,319 --> 02:32:43,020
incentivize them to do this and notice

3826
02:32:43,020 --> 02:32:46,100
this function working

3827
02:32:46,100 --> 02:32:48,600
assumes the protocol

3828
02:32:48,600 --> 02:32:53,960
so call will be roughly 200 percent over

3829
02:32:53,960 --> 02:32:57,479
collateralized in order for this to work

3830
02:32:57,479 --> 02:33:01,020
why well because in this scenario if

3831
02:33:01,020 --> 02:33:02,280
this drops down to twenty dollars

3832
02:33:02,280 --> 02:33:04,439
backing fifty dollars of DSC

3833
02:33:04,439 --> 02:33:07,439
and if I pay back the 50 DSC and I get

3834
02:33:07,439 --> 02:33:09,840
20 well then I I'm not going to do that

3835
02:33:09,840 --> 02:33:13,260
I'm not going to pay 50 to get back 20.

3836
02:33:13,260 --> 02:33:16,080
so this whole system only works if

3837
02:33:16,080 --> 02:33:18,540
the system is always over collateralized

3838
02:33:18,540 --> 02:33:20,340
the only way we can give liquidation

3839
02:33:20,340 --> 02:33:22,859
bonuses is if we're over collateralized

3840
02:33:22,859 --> 02:33:24,859
so the only way we incentivize people to

3841
02:33:24,859 --> 02:33:27,420
liquidate poor users is if we are over

3842
02:33:27,420 --> 02:33:31,080
collateralized so we could say at notice

3843
02:33:31,080 --> 02:33:33,240
a known bug

3844
02:33:33,240 --> 02:33:36,120
would be if the protocol

3845
02:33:36,120 --> 02:33:38,460
were a hundred percent

3846
02:33:38,460 --> 02:33:39,740
or less

3847
02:33:39,740 --> 02:33:44,640
collateralized then we wouldn't be able

3848
02:33:44,640 --> 02:33:49,439
to incentivize the Liquidators

3849
02:33:49,439 --> 02:33:50,640
and then we would just say like for

3850
02:33:50,640 --> 02:33:51,780
example

3851
02:33:51,780 --> 02:33:55,560
if the price of the collateral

3852
02:33:55,560 --> 02:33:58,319
plummeted before

3853
02:33:58,319 --> 02:34:02,640
anyone could be liquidated so hopefully

3854
02:34:02,640 --> 02:34:03,840
this makes a lot of sense if this

3855
02:34:03,840 --> 02:34:06,240
doesn't make sense you know what to do

3856
02:34:06,240 --> 02:34:09,060
ask chat to be T ask in the discussions

3857
02:34:09,060 --> 02:34:12,240
Forum Google it use the resources that

3858
02:34:12,240 --> 02:34:15,660
you have to your advantage yes yes okay

3859
02:34:15,660 --> 02:34:18,780
good so debt to cover we probably want

3860
02:34:18,780 --> 02:34:21,420
to do more than zero very lame if they

3861
02:34:21,420 --> 02:34:24,180
did just zero so we're going to do more

3862
02:34:24,180 --> 02:34:26,700
than zero here we're going to be moving

3863
02:34:26,700 --> 02:34:28,280
tokens around so we're gonna do

3864
02:34:28,280 --> 02:34:30,840
non-reentrant as well maybe we'll do

3865
02:34:30,840 --> 02:34:32,040
some more modifiers but that's pretty

3866
02:34:32,040 --> 02:34:33,300
good to me right now

3867
02:34:33,300 --> 02:34:35,399
so now what do we need to do well we

3868
02:34:35,399 --> 02:34:37,380
need to do a bunch of stuff here well we

3869
02:34:37,380 --> 02:34:40,920
first need to check Health factor of the

3870
02:34:40,920 --> 02:34:43,319
user right is this user even

3871
02:34:43,319 --> 02:34:46,140
liquidatable right remember we want to

3872
02:34:46,140 --> 02:34:49,319
do follows CEI

3873
02:34:49,319 --> 02:34:50,700
checks

3874
02:34:50,700 --> 02:34:52,580
effects

3875
02:34:52,580 --> 02:34:54,660
interactions right we always want to

3876
02:34:54,660 --> 02:34:55,859
follow CEI so we should do some more

3877
02:34:55,859 --> 02:34:57,600
checks here because we should only

3878
02:34:57,600 --> 02:35:00,180
liquidate people who are liquidatable so

3879
02:35:00,180 --> 02:35:02,520
first thing we should do you want to 256

3880
02:35:02,520 --> 02:35:04,920
starting user

3881
02:35:04,920 --> 02:35:08,580
Health Factor equals underscore Health

3882
02:35:08,580 --> 02:35:11,160
factor of the user right because we have

3883
02:35:11,160 --> 02:35:13,319
this health Factor function which gets

3884
02:35:13,319 --> 02:35:15,540
that Health factor and what we can say

3885
02:35:15,540 --> 02:35:17,939
and let's put this

3886
02:35:17,939 --> 02:35:19,319
above

3887
02:35:19,319 --> 02:35:21,660
now we'll say if the starting user

3888
02:35:21,660 --> 02:35:23,819
Health Factor

3889
02:35:23,819 --> 02:35:27,060
is greater than or equal to the Min

3890
02:35:27,060 --> 02:35:28,620
Health factor which what's our Min

3891
02:35:28,620 --> 02:35:31,020
Health Factor again one

3892
02:35:31,020 --> 02:35:34,859
actually it should be one E18 and we're

3893
02:35:34,859 --> 02:35:36,180
definitely going to write some tests to

3894
02:35:36,180 --> 02:35:37,740
make sure this is correct

3895
02:35:37,740 --> 02:35:40,680
so one E18 because we're using our

3896
02:35:40,680 --> 02:35:42,420
Precision here what else are we doing

3897
02:35:42,420 --> 02:35:43,979
Health Factor why don't we write tests

3898
02:35:43,979 --> 02:35:46,260
elsewhere revert if Health factor is

3899
02:35:46,260 --> 02:35:47,939
broken August we haven't tested this yet

3900
02:35:47,939 --> 02:35:49,680
well I guess we're going to be testing

3901
02:35:49,680 --> 02:35:51,240
it very soon make sure that that Health

3902
02:35:51,240 --> 02:35:53,520
Factor bit is right so the starting user

3903
02:35:53,520 --> 02:35:55,140
Health factor is greater than or equal

3904
02:35:55,140 --> 02:35:57,540
to the health Factor then we revert

3905
02:35:57,540 --> 02:36:01,560
right revert DSC engine underscore

3906
02:36:01,560 --> 02:36:05,100
underscore Health Factor okay right

3907
02:36:05,100 --> 02:36:06,899
Health Factor's fine

3908
02:36:06,899 --> 02:36:09,600
got a new error let's go to the top

3909
02:36:09,600 --> 02:36:11,100
scroll down

3910
02:36:11,100 --> 02:36:13,920
error Health Factor okay

3911
02:36:13,920 --> 02:36:17,100
back back go back down here remember I'm

3912
02:36:17,100 --> 02:36:19,200
doing control minus to go back might be

3913
02:36:19,200 --> 02:36:21,660
something else depending on your setup

3914
02:36:21,660 --> 02:36:24,660
so let's do some thinking so now we have

3915
02:36:24,660 --> 02:36:26,100
their starting Health Factor what do we

3916
02:36:26,100 --> 02:36:29,580
want to do we want to

3917
02:36:29,580 --> 02:36:34,260
burn their DSC debt right we want to

3918
02:36:34,260 --> 02:36:36,359
reduce the amount of DSC they have

3919
02:36:36,359 --> 02:36:39,479
and take their collateral we want to

3920
02:36:39,479 --> 02:36:40,680
remove them from the system basically

3921
02:36:40,680 --> 02:36:42,479
right so how do we do that let's say

3922
02:36:42,479 --> 02:36:45,899
they have 140

3923
02:36:46,140 --> 02:36:51,420
140 of eth deposited and 100 of DSC with

3924
02:36:51,420 --> 02:36:52,800
a setup like this their health Factor

3925
02:36:52,800 --> 02:36:55,439
should be below what it currently is

3926
02:36:55,439 --> 02:36:57,479
what we could do is we can say okay

3927
02:36:57,479 --> 02:37:00,540
we're going to cover so this is what bad

3928
02:37:00,540 --> 02:37:04,319
user this disk that user has that means

3929
02:37:04,319 --> 02:37:05,939
we could cover we could say okay we're

3930
02:37:05,939 --> 02:37:09,359
going to cover debt to cover it's going

3931
02:37:09,359 --> 02:37:11,819
to equal that 100 and we need to pay

3932
02:37:11,819 --> 02:37:13,319
back a hundred dollars so we're gonna

3933
02:37:13,319 --> 02:37:16,020
have to get a u into 256.

3934
02:37:16,020 --> 02:37:19,620
collateral or token amount from debt

3935
02:37:19,620 --> 02:37:23,160
covered covered of covered so we need to

3936
02:37:23,160 --> 02:37:24,720
figure out okay if we're covering 100 of

3937
02:37:24,720 --> 02:37:30,120
debt 100 of DSC equals how much eth so

3938
02:37:30,120 --> 02:37:31,080
we're going to pay back a hundred

3939
02:37:31,080 --> 02:37:33,180
dollars of debt and how much eth is that

3940
02:37:33,180 --> 02:37:36,240
okay how much eat is that

3941
02:37:36,240 --> 02:37:37,680
so we're gonna get the token amount of

3942
02:37:37,680 --> 02:37:41,040
death color the eth basically equals

3943
02:37:41,040 --> 02:37:42,780
and we're gonna have to do some pricing

3944
02:37:42,780 --> 02:37:44,040
stuff

3945
02:37:44,040 --> 02:37:47,640
we're going to say it equals get token

3946
02:37:47,640 --> 02:37:50,700
amount from USD so we're going to add

3947
02:37:50,700 --> 02:37:51,899
the collateral

3948
02:37:51,899 --> 02:37:54,720
and the debt to cover so we're going to

3949
02:37:54,720 --> 02:37:56,520
figure out okay how much of this token

3950
02:37:56,520 --> 02:37:58,439
are we gonna get right we're going to

3951
02:37:58,439 --> 02:38:01,319
cover 100 worth of debt how much in eth

3952
02:38:01,319 --> 02:38:03,540
or whatever collateral token is 100

3953
02:38:03,540 --> 02:38:05,040
worth of debt so we're going to create a

3954
02:38:05,040 --> 02:38:07,680
new function get token amount from USD

3955
02:38:07,680 --> 02:38:10,260
is going to be a public view function so

3956
02:38:10,260 --> 02:38:11,399
we're going to scroll all the way down

3957
02:38:11,399 --> 02:38:12,120
here

3958
02:38:12,120 --> 02:38:14,220
although can external view functions

3959
02:38:14,220 --> 02:38:18,000
function get token amount from USD and

3960
02:38:18,000 --> 02:38:20,880
we're going to pass an address token or

3961
02:38:20,880 --> 02:38:21,899
collateral

3962
02:38:21,899 --> 02:38:26,760
units 256 USD amount in way this will be

3963
02:38:26,760 --> 02:38:27,660
a

3964
02:38:27,660 --> 02:38:32,220
public view returns un256.

3965
02:38:32,220 --> 02:38:34,800
and we're going to do some price feed

3966
02:38:34,800 --> 02:38:36,660
stuff so we're going to need what are we

3967
02:38:36,660 --> 02:38:37,560
going to need to do we're going to need

3968
02:38:37,560 --> 02:38:41,220
to get the price of eth or the token and

3969
02:38:41,220 --> 02:38:42,780
then we're going to have to say Okay so

3970
02:38:42,780 --> 02:38:44,580
if the pricing is

3971
02:38:44,580 --> 02:38:47,819
dollar per eth and we have eth

3972
02:38:47,819 --> 02:38:49,439
how do we get the dollar

3973
02:38:49,439 --> 02:38:51,899
well if we do some math here let's say

3974
02:38:51,899 --> 02:38:54,180
it's two thousand dollars of eth and we

3975
02:38:54,180 --> 02:38:55,319
have

3976
02:38:55,319 --> 02:38:56,939
a thousand dollars

3977
02:38:56,939 --> 02:38:59,160
right how much eth is that we're gonna

3978
02:38:59,160 --> 02:39:02,220
do the 1000 divided by 2000 which is

3979
02:39:02,220 --> 02:39:05,220
going to equal 0.5 eth right so we're

3980
02:39:05,220 --> 02:39:07,859
going to do this number divided by this

3981
02:39:07,859 --> 02:39:10,319
number the amount the USD amount in way

3982
02:39:10,319 --> 02:39:13,260
divided by the price and that's how

3983
02:39:13,260 --> 02:39:15,300
we're going to get this token or

3984
02:39:15,300 --> 02:39:18,479
collateral amount from the usdml so

3985
02:39:18,479 --> 02:39:21,720
we'll say aggregate tour V3 interface

3986
02:39:21,720 --> 02:39:24,840
price feed equals aggregator V3

3987
02:39:24,840 --> 02:39:28,380
interface of S price feet of token oh

3988
02:39:28,380 --> 02:39:30,960
wow and even

3989
02:39:30,960 --> 02:39:32,280
build in a lot of this for me that's

3990
02:39:32,280 --> 02:39:34,080
great yes this looks right so we're

3991
02:39:34,080 --> 02:39:35,880
going to get the price feed of the token

3992
02:39:35,880 --> 02:39:37,979
and get called the latest round data

3993
02:39:37,979 --> 02:39:40,680
audit to get the price here and then

3994
02:39:40,680 --> 02:39:43,920
we're just going to do this right here

3995
02:39:43,920 --> 02:39:47,460
so we're going to say the amount USD in

3996
02:39:47,460 --> 02:39:48,420
way

3997
02:39:48,420 --> 02:39:53,040
divided by the price or unit 56 price is

3998
02:39:53,040 --> 02:39:55,140
this the full story no absolutely not

3999
02:39:55,140 --> 02:39:57,000
because we should always multiply first

4000
02:39:57,000 --> 02:39:59,000
so we're gonna do this times our

4001
02:39:59,000 --> 02:40:01,859
Precision then we can divide by the

4002
02:40:01,859 --> 02:40:03,720
price but is that the whole story no

4003
02:40:03,720 --> 02:40:05,520
because the price has eight decimal

4004
02:40:05,520 --> 02:40:08,880
places and we needed to have 18 so we're

4005
02:40:08,880 --> 02:40:11,700
gonna do additional feed Precision like

4006
02:40:11,700 --> 02:40:13,560
this

4007
02:40:13,560 --> 02:40:16,979
is Alec right so if we have let's say we

4008
02:40:16,979 --> 02:40:19,380
have 10 e 18

4009
02:40:19,380 --> 02:40:21,479
for a mountain way we're timesing that

4010
02:40:21,479 --> 02:40:26,160
by one E18 like this we're saying divide

4011
02:40:26,160 --> 02:40:28,080
that by the price let's say the price is

4012
02:40:28,080 --> 02:40:29,520
two thousand dollars two thousand

4013
02:40:29,520 --> 02:40:31,920
dollars e eight

4014
02:40:31,920 --> 02:40:36,240
times the one E10 the additional piece

4015
02:40:36,240 --> 02:40:38,700
here this looks pretty correct anything

4016
02:40:38,700 --> 02:40:39,899
else let's even just pull up the

4017
02:40:39,899 --> 02:40:42,780
calculator right so 10 one two three

4018
02:40:42,780 --> 02:40:44,460
four five six seven eight one two three

4019
02:40:44,460 --> 02:40:46,080
four five six

4020
02:40:46,080 --> 02:40:50,100
seven eight nine ten times one one two

4021
02:40:50,100 --> 02:40:51,899
three four five six seven eight one two

4022
02:40:51,899 --> 02:40:53,819
three four five six seven eight nine ten

4023
02:40:53,819 --> 02:40:57,600
divided by two one two three two

4024
02:40:57,600 --> 02:40:59,460
thousand one two three four five six

4025
02:40:59,460 --> 02:41:00,960
seven eight nine ten one two three four

4026
02:41:00,960 --> 02:41:03,960
five six seven eight equals this number

4027
02:41:03,960 --> 02:41:06,180
which is probably a half right one two

4028
02:41:06,180 --> 02:41:08,760
one two three four five six seven eight

4029
02:41:08,760 --> 02:41:11,340
nine ten eleven twelve thirteen fourteen

4030
02:41:11,340 --> 02:41:14,100
fifteen all right one two three four

4031
02:41:14,100 --> 02:41:16,920
five six seven eight nine one two three

4032
02:41:16,920 --> 02:41:19,380
four five six seven

4033
02:41:19,380 --> 02:41:22,200
eight nine

4034
02:41:22,200 --> 02:41:23,880
eight nine

4035
02:41:23,880 --> 02:41:26,939
zero point is that right oh because it's

4036
02:41:26,939 --> 02:41:29,340
ten dollars duh yes this is right I was

4037
02:41:29,340 --> 02:41:30,540
like I thought we did a thousand dollars

4038
02:41:30,540 --> 02:41:32,880
but this is ten dollars yes okay cool

4039
02:41:32,880 --> 02:41:34,859
that looks good to me great and then

4040
02:41:34,859 --> 02:41:36,300
obviously we're gonna test this soon to

4041
02:41:36,300 --> 02:41:38,220
make sure that it is right so we have

4042
02:41:38,220 --> 02:41:40,260
this function where we get the token

4043
02:41:40,260 --> 02:41:42,240
amount from the USD so we're saying hey

4044
02:41:42,240 --> 02:41:45,000
we're going to cover 100 of your debt or

4045
02:41:45,000 --> 02:41:47,220
something like that how much eth is 100

4046
02:41:47,220 --> 02:41:49,500
worth of your debt maybe it's

4047
02:41:49,500 --> 02:41:52,319
if the price is two thousand dollars we

4048
02:41:52,319 --> 02:41:53,760
obviously we would do

4049
02:41:53,760 --> 02:41:56,040
100 divided by two thousand zero point

4050
02:41:56,040 --> 02:41:57,720
zero five right there right

4051
02:41:57,720 --> 02:42:01,200
this is gonna be something like 0.05 eth

4052
02:42:01,200 --> 02:42:04,380
or whatever it is right cool so we have

4053
02:42:04,380 --> 02:42:07,200
how much eth we need to take away from

4054
02:42:07,200 --> 02:42:08,340
their collateral

4055
02:42:08,340 --> 02:42:11,939
as a reward for paying back this DSC but

4056
02:42:11,939 --> 02:42:13,920
additionally we also want to

4057
02:42:13,920 --> 02:42:17,640
and give them a 10 bonus right because

4058
02:42:17,640 --> 02:42:19,140
we want to incentivize them if they're

4059
02:42:19,140 --> 02:42:21,180
just if it's just a one for one they're

4060
02:42:21,180 --> 02:42:22,319
not going to want to do this so let's

4061
02:42:22,319 --> 02:42:24,060
say we're going to give them a 10 bonus

4062
02:42:24,060 --> 02:42:29,960
so we are giving the liquid detour 110

4063
02:42:29,960 --> 02:42:34,800
of weth for 100 DSC whatever 110 dollars

4064
02:42:34,800 --> 02:42:37,020
of weft is going to be we should

4065
02:42:37,020 --> 02:42:39,540
Implement a feature

4066
02:42:39,540 --> 02:42:44,359
to liquid date in the event the protocol

4067
02:42:44,359 --> 02:42:47,580
protocol is insolvent

4068
02:42:47,580 --> 02:42:48,899
we're not going to add that in yet

4069
02:42:48,899 --> 02:42:50,460
though but we should probably add

4070
02:42:50,460 --> 02:42:53,399
something like that and then and sweep

4071
02:42:53,399 --> 02:42:57,899
extra amounts into a treasury but we're

4072
02:42:57,899 --> 02:42:59,340
not going to add either one of those so

4073
02:42:59,340 --> 02:43:00,780
don't worry if that's confusing don't

4074
02:43:00,780 --> 02:43:01,740
worry about that we're not even going to

4075
02:43:01,740 --> 02:43:03,359
implement that anyways so we'll say you

4076
02:43:03,359 --> 02:43:05,359
in 256 bonus

4077
02:43:05,359 --> 02:43:09,240
collateral equals this token amount that

4078
02:43:09,240 --> 02:43:10,319
covered

4079
02:43:10,319 --> 02:43:11,760
times

4080
02:43:11,760 --> 02:43:15,240
some liquidation bonus that we haven't

4081
02:43:15,240 --> 02:43:16,500
defined yet although we're going to do

4082
02:43:16,500 --> 02:43:19,979
10 divided by 100 but I hate these

4083
02:43:19,979 --> 02:43:21,600
floating numbers so we're going to do

4084
02:43:21,600 --> 02:43:23,700
something better than 100 we're going to

4085
02:43:23,700 --> 02:43:26,760
do Liquidator Precision which is 100 and

4086
02:43:26,760 --> 02:43:29,960
we'll do U into 256 private constant

4087
02:43:29,960 --> 02:43:36,540
liquid Ator bonus equals shun bonus

4088
02:43:36,540 --> 02:43:39,960
it's going to be 10 be like this means a

4089
02:43:39,960 --> 02:43:41,580
10 bonus

4090
02:43:41,580 --> 02:43:43,740
since it's going to be 10 divided by 100

4091
02:43:43,740 --> 02:43:46,040
that's going to be 10 let's go back down

4092
02:43:46,040 --> 02:43:49,859
liquidation bonus divided by liquid

4093
02:43:49,859 --> 02:43:53,520
ation Precision so the bonus collateral

4094
02:43:53,520 --> 02:43:56,580
is going to be 10 so let's say

4095
02:43:56,580 --> 02:44:00,000
it was 0.5 0.05 eth we're going to

4096
02:44:00,000 --> 02:44:01,920
multiply that by

4097
02:44:01,920 --> 02:44:03,300
0.1

4098
02:44:03,300 --> 02:44:04,439
right because we're going to multiply

4099
02:44:04,439 --> 02:44:06,920
first and then divide to get

4100
02:44:06,920 --> 02:44:10,620
0.005 eth so as a total or that's not

4101
02:44:10,620 --> 02:44:13,340
quite right it's gonna be 0.005

4102
02:44:13,340 --> 02:44:15,800
0.05 times

4103
02:44:15,800 --> 02:44:19,200
0.1 equals yes so that means they're

4104
02:44:19,200 --> 02:44:22,740
going to get 0.05

4105
02:44:23,160 --> 02:44:26,399
. is that right I think that's right why

4106
02:44:26,399 --> 02:44:28,560
why am I being bad at math

4107
02:44:28,560 --> 02:44:32,160
I'm going to one yes okay cool great so

4108
02:44:32,160 --> 02:44:33,060
that's what they're going to get this

4109
02:44:33,060 --> 02:44:34,920
bonus collateral we got to add the bonus

4110
02:44:34,920 --> 02:44:36,300
collateral to

4111
02:44:36,300 --> 02:44:38,520
to the actual collateral so we're going

4112
02:44:38,520 --> 02:44:40,319
to say like you went to 256

4113
02:44:40,319 --> 02:44:43,800
total collateral collat or all

4114
02:44:43,800 --> 02:44:46,979
to redeem equals

4115
02:44:46,979 --> 02:44:50,040
token amount from covered plus bonus

4116
02:44:50,040 --> 02:44:52,560
collateral like that and so and now we

4117
02:44:52,560 --> 02:44:55,140
need to redeem this amount of collateral

4118
02:44:55,140 --> 02:44:57,300
four whoever's calling the liquidate

4119
02:44:57,300 --> 02:44:58,859
function right we need to redeem that

4120
02:44:58,859 --> 02:45:00,780
collateral and then we also need to burn

4121
02:45:00,780 --> 02:45:03,660
the DSC from this user as well so we

4122
02:45:03,660 --> 02:45:05,760
need to give them the collateral and

4123
02:45:05,760 --> 02:45:07,620
burn the DSC that they're covering with

4124
02:45:07,620 --> 02:45:10,340
their debt to cover

4125
02:45:12,420 --> 02:45:14,460
now though if we look at our redeemed

4126
02:45:14,460 --> 02:45:17,819
collateral in collateral

4127
02:45:17,819 --> 02:45:19,979
function which is public right now we

4128
02:45:19,979 --> 02:45:22,620
can see as inputs it takes

4129
02:45:22,620 --> 02:45:24,300
so in collateral address and amount

4130
02:45:24,300 --> 02:45:26,880
collateral right and it is hard-coded to

4131
02:45:26,880 --> 02:45:29,580
message.sender our third party user

4132
02:45:29,580 --> 02:45:32,040
isn't the one with the bad debt right we

4133
02:45:32,040 --> 02:45:33,899
need to redeem a random person's

4134
02:45:33,899 --> 02:45:36,479
collateral so what we can do is we can

4135
02:45:36,479 --> 02:45:38,340
refactor this code

4136
02:45:38,340 --> 02:45:40,200
so that there's an internal redeemed

4137
02:45:40,200 --> 02:45:42,300
collateral function that can redeem

4138
02:45:42,300 --> 02:45:45,000
collateral from anybody right and only

4139
02:45:45,000 --> 02:45:47,399
very permissioned functions can call

4140
02:45:47,399 --> 02:45:49,800
Redeemed collateral so what we're going

4141
02:45:49,800 --> 02:45:51,060
to do is actually we're going to take

4142
02:45:51,060 --> 02:45:52,560
all of this code

4143
02:45:52,560 --> 02:45:54,180
and we're going to change it and we're

4144
02:45:54,180 --> 02:45:55,319
going to delete it and we're going to

4145
02:45:55,319 --> 02:45:57,359
put it into a different function

4146
02:45:57,359 --> 02:46:00,060
all the way down the in private internal

4147
02:46:00,060 --> 02:46:01,859
functions here we're going to make a

4148
02:46:01,859 --> 02:46:06,780
function underscore redeem collateral

4149
02:46:06,780 --> 02:46:08,100
and this is going to be an internal

4150
02:46:08,100 --> 02:46:09,600
function where we can actually redeem

4151
02:46:09,600 --> 02:46:12,180
collateral from anybody and as input

4152
02:46:12,180 --> 02:46:14,880
this is going to take address token

4153
02:46:14,880 --> 02:46:17,460
collateral address same as the regular

4154
02:46:17,460 --> 02:46:19,200
redeem collateral also the unit 56

4155
02:46:19,200 --> 02:46:21,840
amount collateral but we're going to add

4156
02:46:21,840 --> 02:46:25,560
address from and address to

4157
02:46:25,560 --> 02:46:27,000
so this way and this is going to be

4158
02:46:27,000 --> 02:46:30,000
private so this way somebody can

4159
02:46:30,000 --> 02:46:31,200
liquidate

4160
02:46:31,200 --> 02:46:33,000
and address from and then get the

4161
02:46:33,000 --> 02:46:35,100
rewards to and this is where I'm going

4162
02:46:35,100 --> 02:46:37,680
to paste all that code we got from above

4163
02:46:37,680 --> 02:46:40,560
and I think this looks good we're just

4164
02:46:40,560 --> 02:46:41,819
going to paste the code exactly like

4165
02:46:41,819 --> 02:46:44,819
this instead of doing message.cender

4166
02:46:44,819 --> 02:46:47,700
this is just going to be from and emit

4167
02:46:47,700 --> 02:46:49,620
collateral redeemed we're going to

4168
02:46:49,620 --> 02:46:53,120
update our collateral redeemed

4169
02:46:53,960 --> 02:46:57,240
to redeemed from

4170
02:46:57,240 --> 02:47:00,020
we'll do address redeem from address

4171
02:47:00,020 --> 02:47:02,640
redeemed to

4172
02:47:02,640 --> 02:47:05,340
we'll do the token and then we'll have a

4173
02:47:05,340 --> 02:47:09,660
mount not be indexed so from to token

4174
02:47:09,660 --> 02:47:10,859
and amount

4175
02:47:10,859 --> 02:47:12,479
so now we got to refactor some of these

4176
02:47:12,479 --> 02:47:14,760
collaterals so from

4177
02:47:14,760 --> 02:47:16,439
when we do just the regular redeem

4178
02:47:16,439 --> 02:47:18,300
collateral we'll update this in a minute

4179
02:47:18,300 --> 02:47:19,740
actually yeah we'll update that in a

4180
02:47:19,740 --> 02:47:21,840
minute so in this internal function it's

4181
02:47:21,840 --> 02:47:24,359
going to be from from

4182
02:47:24,359 --> 02:47:27,600
to address collateral

4183
02:47:27,600 --> 02:47:29,819
and then we're going to transfer we're

4184
02:47:29,819 --> 02:47:32,760
going to transfer the tokens to over the

4185
02:47:32,760 --> 02:47:34,260
two is so this is going to be like the

4186
02:47:34,260 --> 02:47:37,380
Liquidator Mount collateral and do that

4187
02:47:37,380 --> 02:47:39,060
and now we're going to use this internal

4188
02:47:39,060 --> 02:47:41,040
function up in our regular redeem

4189
02:47:41,040 --> 02:47:43,319
lateral function that we just created

4190
02:47:43,319 --> 02:47:46,319
right up here oh nope

4191
02:47:46,319 --> 02:47:49,200
this one up here we're going to dump all

4192
02:47:49,200 --> 02:47:51,180
this and just use this underscore redeem

4193
02:47:51,180 --> 02:47:53,700
collateral and for here we're just going

4194
02:47:53,700 --> 02:47:56,040
to say message dot sender so from

4195
02:47:56,040 --> 02:48:00,060
message to Sender to Mrs dot sender

4196
02:48:00,060 --> 02:48:01,560
token collateral address amount

4197
02:48:01,560 --> 02:48:03,000
collateral and now that we have this

4198
02:48:03,000 --> 02:48:05,040
internal function we can use this redeem

4199
02:48:05,040 --> 02:48:06,420
collateral bit

4200
02:48:06,420 --> 02:48:08,460
down in our liquid date which is down

4201
02:48:08,460 --> 02:48:11,340
here we can now just say redeem

4202
02:48:11,340 --> 02:48:12,600
collateral

4203
02:48:12,600 --> 02:48:16,260
from the user that's being liquidated so

4204
02:48:16,260 --> 02:48:20,220
from user to whoever's calling liquidate

4205
02:48:20,220 --> 02:48:21,180
here

4206
02:48:21,180 --> 02:48:23,819
so it's gonna be message dot sender

4207
02:48:23,819 --> 02:48:25,859
the collateral token

4208
02:48:25,859 --> 02:48:27,600
that we're liquidating

4209
02:48:27,600 --> 02:48:30,060
and then finally the total collateral to

4210
02:48:30,060 --> 02:48:32,160
redeem so this is why I said we were

4211
02:48:32,160 --> 02:48:33,479
going to do a little bit of refactoring

4212
02:48:33,479 --> 02:48:36,780
soon right we generally only want to

4213
02:48:36,780 --> 02:48:38,340
redeem collateral from into the same

4214
02:48:38,340 --> 02:48:40,560
person however when we're doing a

4215
02:48:40,560 --> 02:48:42,060
liquidate we're going to redeem to

4216
02:48:42,060 --> 02:48:44,040
whoever's calling the liquidate so

4217
02:48:44,040 --> 02:48:45,840
they're going to get that reward the

4218
02:48:45,840 --> 02:48:48,000
total collateral to redeem is that total

4219
02:48:48,000 --> 02:48:50,160
amount debt to cover plus some bonus

4220
02:48:50,160 --> 02:48:52,680
here and now we actually need to yeah we

4221
02:48:52,680 --> 02:48:54,780
need to burn the DSC now so right now if

4222
02:48:54,780 --> 02:48:57,720
we look up burn DSC we have this public

4223
02:48:57,720 --> 02:49:00,240
function which just does the same thing

4224
02:49:00,240 --> 02:49:01,979
it just does it just burns from

4225
02:49:01,979 --> 02:49:04,020
message.sender we're gonna have to do

4226
02:49:04,020 --> 02:49:05,280
the same here we're going to want to

4227
02:49:05,280 --> 02:49:07,740
make an internal burn DSC function that

4228
02:49:07,740 --> 02:49:10,680
allows us to burn from anybody right so

4229
02:49:10,680 --> 02:49:12,439
if we scroll down to where we're doing

4230
02:49:12,439 --> 02:49:16,500
those private functions or scroll up so

4231
02:49:16,500 --> 02:49:18,600
we have this internal redeem collateral

4232
02:49:18,600 --> 02:49:20,760
we also are going to need an internal

4233
02:49:20,760 --> 02:49:23,340
burn DSC it's a function I'm just going

4234
02:49:23,340 --> 02:49:29,180
to burn DSC unit 256 amount DSC to burn

4235
02:49:29,180 --> 02:49:35,399
address on B half of like whose DSC are

4236
02:49:35,399 --> 02:49:37,500
we burning for whose debt are we paying

4237
02:49:37,500 --> 02:49:41,220
down and then address DSC from where are

4238
02:49:41,220 --> 02:49:43,560
we getting the DSC from we have private

4239
02:49:43,560 --> 02:49:46,859
and we can go back to the burn DSC let's

4240
02:49:46,859 --> 02:49:49,740
burn DSC function right and same thing

4241
02:49:49,740 --> 02:49:52,380
we can just copy all of this go back to

4242
02:49:52,380 --> 02:49:54,660
our internal burn DSC function paste

4243
02:49:54,660 --> 02:49:56,520
this in here we're going to want to

4244
02:49:56,520 --> 02:49:57,720
update this right instead of

4245
02:49:57,720 --> 02:49:59,220
message.cender

4246
02:49:59,220 --> 02:50:03,000
this is going to be on be half of we're

4247
02:50:03,000 --> 02:50:05,340
going to bur we're going to take away

4248
02:50:05,340 --> 02:50:07,680
their debt we're still going to do this

4249
02:50:07,680 --> 02:50:09,960
but instead of message.sender it's going

4250
02:50:09,960 --> 02:50:12,899
to be BSC from and it's going to be

4251
02:50:12,899 --> 02:50:15,180
amount DSC to burn

4252
02:50:15,180 --> 02:50:17,340
this is still fine this just needs to be

4253
02:50:17,340 --> 02:50:19,620
a mount DSC to burn and we don't need to

4254
02:50:19,620 --> 02:50:20,460
check

4255
02:50:20,460 --> 02:50:22,140
Health Factor yet because this is going

4256
02:50:22,140 --> 02:50:23,760
to be our internal function so we might

4257
02:50:23,760 --> 02:50:26,899
even say like in the comments here

4258
02:50:26,899 --> 02:50:30,180
low level internal function

4259
02:50:30,180 --> 02:50:32,880
at Dev low-level internal function

4260
02:50:32,880 --> 02:50:35,640
do not call unless

4261
02:50:35,640 --> 02:50:38,700
the function calling it

4262
02:50:38,700 --> 02:50:40,020
is

4263
02:50:40,020 --> 02:50:44,880
checking for health factors being broken

4264
02:50:44,880 --> 02:50:46,920
so now we have this burn DSC we can go

4265
02:50:46,920 --> 02:50:49,979
back up to our burn DSC function we can

4266
02:50:49,979 --> 02:50:52,260
just swap delete all this

4267
02:50:52,260 --> 02:50:54,899
call burn DSC and this can be message

4268
02:50:54,899 --> 02:50:58,200
dot sender message dot sender amount

4269
02:50:58,200 --> 02:51:00,060
right if somebody calls burn DC

4270
02:51:00,060 --> 02:51:01,859
themselves great we'll just have them

4271
02:51:01,859 --> 02:51:04,439
call this burn DC amount to burn on

4272
02:51:04,439 --> 02:51:06,120
behalf of themselves from themselves

4273
02:51:06,120 --> 02:51:07,979
looks like I got this backwards amount

4274
02:51:07,979 --> 02:51:09,359
should be the first one

4275
02:51:09,359 --> 02:51:11,880
okay and now we have this burn DSC

4276
02:51:11,880 --> 02:51:13,740
function we can go down to liquidate and

4277
02:51:13,740 --> 02:51:15,479
we can call burn DSC

4278
02:51:15,479 --> 02:51:17,460
what are the uh

4279
02:51:17,460 --> 02:51:21,720
amount on behalf of from so the amount

4280
02:51:21,720 --> 02:51:24,740
is going to be this debt to cover amount

4281
02:51:24,740 --> 02:51:28,740
on behalf of is going to be the user and

4282
02:51:28,740 --> 02:51:30,180
the one who's going to be paying this is

4283
02:51:30,180 --> 02:51:32,580
going to be message.sender right because

4284
02:51:32,580 --> 02:51:34,319
it's the whoever's the Liquidator

4285
02:51:34,319 --> 02:51:36,000
whoever's calling liquidate is going to

4286
02:51:36,000 --> 02:51:38,580
be the one who's paying down the debt to

4287
02:51:38,580 --> 02:51:40,740
cover right paying back that minted DSC

4288
02:51:40,740 --> 02:51:42,780
and now since we're doing these internal

4289
02:51:42,780 --> 02:51:44,340
calls that don't have checks we

4290
02:51:44,340 --> 02:51:45,780
absolutely need to make sure we're

4291
02:51:45,780 --> 02:51:47,939
checking this health factor is okay

4292
02:51:47,939 --> 02:51:49,620
right so we're going to do U into two

4293
02:51:49,620 --> 02:51:53,399
for six ending user Health Factor equals

4294
02:51:53,399 --> 02:51:54,779
underscore health

4295
02:51:54,779 --> 02:51:58,620
factor of the user and if the ending

4296
02:51:58,620 --> 02:52:01,740
Health factor is less than or equal to

4297
02:52:01,740 --> 02:52:03,960
the starting Health Factor right if we

4298
02:52:03,960 --> 02:52:05,760
didn't improve the health Factor we

4299
02:52:05,760 --> 02:52:08,700
should revert DSC engine

4300
02:52:08,700 --> 02:52:13,460
underscore Health fact or not improved

4301
02:52:13,460 --> 02:52:18,240
copy this go to the top we'll do error

4302
02:52:18,240 --> 02:52:20,220
DSC engine Health Factor not approved go

4303
02:52:20,220 --> 02:52:21,300
back down

4304
02:52:21,300 --> 02:52:23,939
so if we don't improve the health Factor

4305
02:52:23,939 --> 02:52:28,080
we should 100 revert and then also

4306
02:52:28,080 --> 02:52:30,660
if calling this liquidate function is

4307
02:52:30,660 --> 02:52:32,340
paying down some debt and doing all this

4308
02:52:32,340 --> 02:52:35,040
stuff actually hurts the Liquidators

4309
02:52:35,040 --> 02:52:36,779
Health Factor we should also revert

4310
02:52:36,779 --> 02:52:38,939
right so we should also call revert if

4311
02:52:38,939 --> 02:52:40,859
Health factor is broken for

4312
02:52:40,859 --> 02:52:42,660
the message I sender right if this

4313
02:52:42,660 --> 02:52:44,700
process ruined their health Factor we

4314
02:52:44,700 --> 02:52:47,760
shouldn't let them do this okay so we're

4315
02:52:47,760 --> 02:52:49,380
following checks effects interactions

4316
02:52:49,380 --> 02:52:50,160
here

4317
02:52:50,160 --> 02:52:52,040
the most part

4318
02:52:52,040 --> 02:52:54,240
these two

4319
02:52:54,240 --> 02:52:56,460
functions are making external calls to

4320
02:52:56,460 --> 02:52:58,560
external contracts right and then we're

4321
02:52:58,560 --> 02:53:00,300
doing kind of like a check afterwards

4322
02:53:00,300 --> 02:53:02,100
again this is a bit of a trade-off we

4323
02:53:02,100 --> 02:53:04,380
could calculate before and then run this

4324
02:53:04,380 --> 02:53:08,160
but that's kind of gas inefficient we're

4325
02:53:08,160 --> 02:53:09,899
just going to check after we do all this

4326
02:53:09,899 --> 02:53:11,640
hey just make sure that the health

4327
02:53:11,640 --> 02:53:14,700
factor is okay make sure that we didn't

4328
02:53:14,700 --> 02:53:17,100
break anyone's Health Factor so now we

4329
02:53:17,100 --> 02:53:18,840
have this liquidation function which is

4330
02:53:18,840 --> 02:53:20,700
incredibly powerful and kind of what

4331
02:53:20,700 --> 02:53:22,319
ties this whole thing together right

4332
02:53:22,319 --> 02:53:24,660
there's an incentive here for people to

4333
02:53:24,660 --> 02:53:27,960
call liquidate so that our protocol is

4334
02:53:27,960 --> 02:53:29,520
never insolvent right and I know I've

4335
02:53:29,520 --> 02:53:30,600
been kind of throwing around a lot of

4336
02:53:30,600 --> 02:53:32,819
these financial terms but our protocol

4337
02:53:32,819 --> 02:53:36,300
always has more collateral than it has

4338
02:53:36,300 --> 02:53:38,580
minted DSE the value of the collateral

4339
02:53:38,580 --> 02:53:41,279
should always be more than the minted

4340
02:53:41,279 --> 02:53:43,920
DSC always incredibly powerful function

4341
02:53:43,920 --> 02:53:45,420
we're obviously going to be testing the

4342
02:53:45,420 --> 02:53:46,920
living hell out of this right because we

4343
02:53:46,920 --> 02:53:50,160
want to make sure it actually works oh

4344
02:53:50,160 --> 02:53:52,560
what do we need now well it looks like

4345
02:53:52,560 --> 02:53:55,020
we broke some stuff oh this needs a

4346
02:53:55,020 --> 02:53:57,060
semicolon what else do we break there's

4347
02:53:57,060 --> 02:53:58,620
a little red thing down here let's go

4348
02:53:58,620 --> 02:54:01,319
fix it amount this should be a mount do

4349
02:54:01,319 --> 02:54:03,600
you see to burn got a couple more red

4350
02:54:03,600 --> 02:54:04,620
things

4351
02:54:04,620 --> 02:54:07,140
redeem collateral user message Ascender

4352
02:54:07,140 --> 02:54:10,380
redeem collateral uh oops we did these

4353
02:54:10,380 --> 02:54:13,500
backwards I'm going to copy these put

4354
02:54:13,500 --> 02:54:15,120
these at the front

4355
02:54:15,120 --> 02:54:17,880
okay oh looks like that fixed pretty

4356
02:54:17,880 --> 02:54:19,680
much most of this I don't see any more

4357
02:54:19,680 --> 02:54:22,080
red stuff on the side here so we're

4358
02:54:22,080 --> 02:54:23,880
going to go ahead and run Forge build

4359
02:54:23,880 --> 02:54:25,200
make sure everything's at least

4360
02:54:25,200 --> 02:54:27,680
compiling

4361
02:54:28,140 --> 02:54:30,060
awesome maybe we'll even run Forge test

4362
02:54:30,060 --> 02:54:31,620
I don't think this would have broken any

4363
02:54:31,620 --> 02:54:33,899
tests looks like those are working fine

4364
02:54:33,899 --> 02:54:35,760
but all right we're doing some fantastic

4365
02:54:35,760 --> 02:54:38,840
work and like I said

4366
02:54:40,680 --> 02:54:42,479
at this point I probably would be

4367
02:54:42,479 --> 02:54:44,279
running tests with this but we're almost

4368
02:54:44,279 --> 02:54:46,260
done with all of our code here so we're

4369
02:54:46,260 --> 02:54:47,880
just going to keep going right and this

4370
02:54:47,880 --> 02:54:49,080
code's starting to look pretty darn good

4371
02:54:49,080 --> 02:54:51,720
right we've got these amazing Nat spec

4372
02:54:51,720 --> 02:54:53,340
comments in here we've got comments all

4373
02:54:53,340 --> 02:54:55,080
over the place maybe these probably

4374
02:54:55,080 --> 02:54:56,340
should be cleaned up a little bit but

4375
02:54:56,340 --> 02:54:57,479
that's fine

4376
02:54:57,479 --> 02:54:59,460
we've got a little this little Dev thing

4377
02:54:59,460 --> 02:55:01,380
a shout out saying hey don't let anybody

4378
02:55:01,380 --> 02:55:03,899
call burn DSC without checking the

4379
02:55:03,899 --> 02:55:05,640
health Factor right this is really good

4380
02:55:05,640 --> 02:55:07,080
to tell Auditors and Security

4381
02:55:07,080 --> 02:55:08,939
Professionals about this right it's

4382
02:55:08,939 --> 02:55:10,979
really good to call this out we've now

4383
02:55:10,979 --> 02:55:12,479
have this internal redeemed collateral

4384
02:55:12,479 --> 02:55:13,620
function so it can be used for the

4385
02:55:13,620 --> 02:55:15,120
liquidate or the redeemed collateral

4386
02:55:15,120 --> 02:55:17,580
Health Factor it looks like pretty much

4387
02:55:17,580 --> 02:55:19,620
all the functions that we originally

4388
02:55:19,620 --> 02:55:22,979
wrote are working in here right and the

4389
02:55:22,979 --> 02:55:24,960
reason again that this all works is

4390
02:55:24,960 --> 02:55:25,859
because

4391
02:55:25,859 --> 02:55:29,640
we meant DSC we can only mint as much as

4392
02:55:29,640 --> 02:55:31,680
we have collateral in the system we're

4393
02:55:31,680 --> 02:55:33,660
setting this exchange rate essentially

4394
02:55:33,660 --> 02:55:36,180
for our protocol hey cool you have 100

4395
02:55:36,180 --> 02:55:39,060
you have 150 worth of eth deposited

4396
02:55:39,060 --> 02:55:43,140
great you can mint 100 worth of DSC

4397
02:55:43,140 --> 02:55:44,760
so it's this exchange rate that we're

4398
02:55:44,760 --> 02:55:47,040
setting which is maintaining the price

4399
02:55:47,040 --> 02:55:48,600
let's just double check that we have

4400
02:55:48,600 --> 02:55:49,859
kind of most of the functions that we

4401
02:55:49,859 --> 02:55:51,899
want here and let's also check that

4402
02:55:51,899 --> 02:55:53,399
they're in the right place

4403
02:55:53,399 --> 02:55:55,620
so we go to the top here

4404
02:55:55,620 --> 02:55:58,020
got a whole bunch of Errors that's great

4405
02:55:58,020 --> 02:55:59,399
got a whole bunch of constants because

4406
02:55:59,399 --> 02:56:01,800
we hate magic numbers we have a mapping

4407
02:56:01,800 --> 02:56:04,200
of price feeds a mapping of collateral

4408
02:56:04,200 --> 02:56:06,300
deposited from user to token to the

4409
02:56:06,300 --> 02:56:08,580
amount they have deposited we have their

4410
02:56:08,580 --> 02:56:11,460
debt or their DSC minted collateral

4411
02:56:11,460 --> 02:56:14,580
Tokens The idsc Token we've got some

4412
02:56:14,580 --> 02:56:16,260
events in here

4413
02:56:16,260 --> 02:56:19,800
a couple modifiers some functions

4414
02:56:19,800 --> 02:56:22,260
we've got a way to deposit collateral

4415
02:56:22,260 --> 02:56:25,620
and mint DSC in one transaction we've

4416
02:56:25,620 --> 02:56:27,359
got a way to calculate health Factor I'm

4417
02:56:27,359 --> 02:56:28,620
going to tell you right now

4418
02:56:28,620 --> 02:56:31,319
there's actually a bug in here oh I'm

4419
02:56:31,319 --> 02:56:32,399
not going to tell you what that bug is

4420
02:56:32,399 --> 02:56:33,720
yet though

4421
02:56:33,720 --> 02:56:35,760
maybe you can figure it out we've got

4422
02:56:35,760 --> 02:56:37,560
some view functions down below we're

4423
02:56:37,560 --> 02:56:39,000
probably going to add more as we write

4424
02:56:39,000 --> 02:56:40,020
tests

4425
02:56:40,020 --> 02:56:43,920
but this is looking pretty darn good now

4426
02:56:43,920 --> 02:56:45,960
like I said there's at least one big bug

4427
02:56:45,960 --> 02:56:47,399
in there might even be and there's

4428
02:56:47,399 --> 02:56:49,020
likely more but there's at least one big

4429
02:56:49,020 --> 02:56:50,160
bug in here

4430
02:56:50,160 --> 02:56:52,200
so now would be a good time to take a

4431
02:56:52,200 --> 02:56:54,899
break because after this we're going to

4432
02:56:54,899 --> 02:56:58,020
go deep into writing tests or this

4433
02:56:58,020 --> 02:56:59,880
protocol we're going to write some new

4434
02:56:59,880 --> 02:57:01,319
tests and we're going to show you some

4435
02:57:01,319 --> 02:57:04,020
really Advanced testing methodologies

4436
02:57:04,020 --> 02:57:06,899
so take that break go for a walk

4437
02:57:06,899 --> 02:57:09,859
and I'll see you in a few

4438
02:57:22,500 --> 02:57:23,880
all right so let's pull up our terminal

4439
02:57:23,880 --> 02:57:27,000
here Forge

4440
02:57:27,000 --> 02:57:29,660
coverage

4441
02:57:35,580 --> 02:57:37,800
oh we got some work to do

4442
02:57:37,800 --> 02:57:40,080
all right well no time like the present

4443
02:57:40,080 --> 02:57:42,840
let's get into it so we have some price

4444
02:57:42,840 --> 02:57:45,420
feed tests over here we probably also

4445
02:57:45,420 --> 02:57:47,100
want to set up some constructed tests

4446
02:57:47,100 --> 02:57:48,840
right we want to make sure that stuff is

4447
02:57:48,840 --> 02:57:50,760
being initialized correctly so let's

4448
02:57:50,760 --> 02:57:53,160
copy that we'll do con

4449
02:57:53,160 --> 02:57:57,000
structure structure tests like that

4450
02:57:57,000 --> 02:58:00,180
we'll fix this or ADHD doesn't go crazy

4451
02:58:00,180 --> 02:58:01,560
and we'll do

4452
02:58:01,560 --> 02:58:03,000
function

4453
02:58:03,000 --> 02:58:04,319
test

4454
02:58:04,319 --> 02:58:07,260
something what are we testing let's go

4455
02:58:07,260 --> 02:58:09,660
down to the instructor here and what

4456
02:58:09,660 --> 02:58:11,160
should we be testing okay well we're

4457
02:58:11,160 --> 02:58:13,200
doing this revert here so we should make

4458
02:58:13,200 --> 02:58:15,060
sure we actually are reverting correctly

4459
02:58:15,060 --> 02:58:17,520
when the lengths aren't the same so

4460
02:58:17,520 --> 02:58:21,840
function test reverts if token length

4461
02:58:21,840 --> 02:58:27,600
doesn't match price feeds feeds

4462
02:58:27,600 --> 02:58:31,560
public zoom in zoom in we're going to be

4463
02:58:31,560 --> 02:58:34,560
in here a while so function like this

4464
02:58:34,560 --> 02:58:37,080
and we're going to do we're going to

4465
02:58:37,080 --> 02:58:40,859
create some address arrays address array

4466
02:58:40,859 --> 02:58:43,500
public token addresses

4467
02:58:43,500 --> 02:58:45,979
address array

4468
02:58:45,979 --> 02:58:49,319
public price price

4469
02:58:49,319 --> 02:58:50,580
feed

4470
02:58:50,580 --> 02:58:52,620
Andra says

4471
02:58:52,620 --> 02:58:55,260
we're gonna say token addresses dot push

4472
02:58:55,260 --> 02:58:57,479
we're going to push weft into here

4473
02:58:57,479 --> 02:58:58,580
feed

4474
02:58:58,580 --> 02:59:03,779
addresses add dot push FUSD

4475
02:59:03,779 --> 02:59:05,760
price feed and we're going to push 2 in

4476
02:59:05,760 --> 02:59:09,899
here oh cool BTC do we have I guess we

4477
02:59:09,899 --> 02:59:14,100
should pull BTC USD price feed let's get

4478
02:59:14,100 --> 02:59:15,840
this too so

4479
02:59:15,840 --> 02:59:20,160
FUSD BTC USD price feed okay

4480
02:59:20,160 --> 02:59:22,319
oops price feed addresses price feed

4481
02:59:22,319 --> 02:59:23,760
addresses so we'll push the two of those

4482
02:59:23,760 --> 02:59:28,460
in there now we'll do VM dot expect

4483
02:59:28,460 --> 02:59:32,040
revert DSC engine

4484
02:59:32,040 --> 02:59:34,620
dot what's the name of the error let me

4485
02:59:34,620 --> 02:59:36,359
copy this

4486
02:59:36,359 --> 02:59:40,020
boom dot select door selector like that

4487
02:59:40,020 --> 02:59:42,420
doing some toggle word wrap now expect

4488
02:59:42,420 --> 02:59:45,180
reverts now we call

4489
02:59:45,180 --> 02:59:47,939
a new DSC engine

4490
02:59:47,939 --> 02:59:50,520
with the token addresses and the price

4491
02:59:50,520 --> 02:59:53,160
feed addresses oh what else goes in the

4492
02:59:53,160 --> 02:59:56,160
DSE oh we also need the address DSC

4493
02:59:56,160 --> 02:59:59,460
right address DSC so this should revert

4494
02:59:59,460 --> 03:00:04,399
let's see orig test Dash m

4495
03:00:06,300 --> 03:00:08,340
M nice okay that's passing all right

4496
03:00:08,340 --> 03:00:10,620
cool price feed tests we're testing

4497
03:00:10,620 --> 03:00:13,380
getting the USD value

4498
03:00:13,380 --> 03:00:15,359
I think we had another one down here

4499
03:00:15,359 --> 03:00:17,939
right we had something like get

4500
03:00:17,939 --> 03:00:21,240
token amount from USD we sure did this

4501
03:00:21,240 --> 03:00:23,460
is a public view so let's test this one

4502
03:00:23,460 --> 03:00:24,600
as well

4503
03:00:24,600 --> 03:00:27,660
do function tests and I usually just

4504
03:00:27,660 --> 03:00:28,920
like to paste the function names

4505
03:00:28,920 --> 03:00:31,200
especially when they're like this

4506
03:00:31,200 --> 03:00:33,540
public

4507
03:00:33,540 --> 03:00:35,040
so we're going to do basically the

4508
03:00:35,040 --> 03:00:37,380
opposite of this this got the USD value

4509
03:00:37,380 --> 03:00:39,300
of some ether Mount we're going to do

4510
03:00:39,300 --> 03:00:42,180
un256

4511
03:00:42,180 --> 03:00:46,080
USD amount right equals let's say 100

4512
03:00:46,080 --> 03:00:50,180
eighth 100 ether and then unit 256.

4513
03:00:50,180 --> 03:00:51,779
expected

4514
03:00:51,779 --> 03:00:54,359
West do a little bit of math here if we

4515
03:00:54,359 --> 03:00:57,660
have if it's two thousand dollars per

4516
03:00:57,660 --> 03:00:59,880
eth and we have

4517
03:00:59,880 --> 03:01:02,640
100 we're gonna do a hundred divided by

4518
03:01:02,640 --> 03:01:05,779
two thousand so 100 divided by 2 000

4519
03:01:05,779 --> 03:01:09,300
0.05 so we can say expected weft is 0.05

4520
03:01:09,300 --> 03:01:11,939
ether now we'll do U into two for six

4521
03:01:11,939 --> 03:01:16,979
actual weft equals dsce dot this

4522
03:01:16,979 --> 03:01:19,620
function with the lowercase pass in West

4523
03:01:19,620 --> 03:01:24,740
and then the USD amount assert equal

4524
03:01:24,740 --> 03:01:27,660
expected X

4525
03:01:27,660 --> 03:01:30,120
expected width and the actual width the

4526
03:01:30,120 --> 03:01:31,740
two of them should be the same Let's

4527
03:01:31,740 --> 03:01:35,840
test it out Forge test Dash m

4528
03:01:38,279 --> 03:01:40,439
nice that pass all right let's keep

4529
03:01:40,439 --> 03:01:43,800
going posit collateral tests test revert

4530
03:01:43,800 --> 03:01:46,080
of collateral zero that's good

4531
03:01:46,080 --> 03:01:48,000
what else let's go to this deposit

4532
03:01:48,000 --> 03:01:51,960
collateral deposit collateral

4533
03:01:51,960 --> 03:01:53,220
function

4534
03:01:53,220 --> 03:01:55,560
okay we should also revert here we're

4535
03:01:55,560 --> 03:01:56,939
basically just going to go through this

4536
03:01:56,939 --> 03:01:58,859
whole function and kind of test each

4537
03:01:58,859 --> 03:02:00,960
line we just tested this one Let's test

4538
03:02:00,960 --> 03:02:03,000
this one so this will be something like

4539
03:02:03,000 --> 03:02:04,620
function

4540
03:02:04,620 --> 03:02:08,700
test reverts with unapproved

4541
03:02:08,700 --> 03:02:11,420
collateral

4542
03:02:11,420 --> 03:02:15,420
public we'll make an erc20 mock some

4543
03:02:15,420 --> 03:02:17,640
Rand token right we'll just make some

4544
03:02:17,640 --> 03:02:22,380
silly token new erc20 Mach ran will be

4545
03:02:22,380 --> 03:02:24,240
the name ran

4546
03:02:24,240 --> 03:02:27,779
will be the token we have a user in here

4547
03:02:27,779 --> 03:02:29,220
I think we do have a user right okay

4548
03:02:29,220 --> 03:02:31,080
yeah we do have a user

4549
03:02:31,080 --> 03:02:34,500
let's give this money to a user and then

4550
03:02:34,500 --> 03:02:36,600
we'll give them some starting amount

4551
03:02:36,600 --> 03:02:37,979
I think we have

4552
03:02:37,979 --> 03:02:41,100
starting erc20 balance or Mount

4553
03:02:41,100 --> 03:02:42,300
collateral yeah we'll do a mount

4554
03:02:42,300 --> 03:02:43,979
collateral give them the amount

4555
03:02:43,979 --> 03:02:46,800
collateral we'll do VM Dot

4556
03:02:46,800 --> 03:02:50,359
start prank this user who has this token

4557
03:02:50,359 --> 03:02:53,040
and they're going to try to deposit this

4558
03:02:53,040 --> 03:02:54,720
collateral and we're going to expect it

4559
03:02:54,720 --> 03:02:57,800
to revert so VM dot expect

4560
03:02:57,800 --> 03:03:02,880
revert and this error here is allowed

4561
03:03:02,880 --> 03:03:05,460
token right now doesn't

4562
03:03:05,460 --> 03:03:07,560
take any parameters

4563
03:03:07,560 --> 03:03:10,140
so that's easy enough for us let's just

4564
03:03:10,140 --> 03:03:12,260
copy this we'll do

4565
03:03:12,260 --> 03:03:14,240
DSC engine

4566
03:03:14,240 --> 03:03:17,399
dot this dot selector

4567
03:03:17,399 --> 03:03:20,040
and then we'll do we'll call the deposit

4568
03:03:20,040 --> 03:03:23,220
collateral so d s c e dot deposit

4569
03:03:23,220 --> 03:03:26,160
collateral address of that Rand token

4570
03:03:26,160 --> 03:03:28,560
right brand token or random token we'll

4571
03:03:28,560 --> 03:03:30,420
do a mount collateral as well so it'll

4572
03:03:30,420 --> 03:03:32,279
just be that whole amount

4573
03:03:32,279 --> 03:03:35,279
and then we can do vm.stop Rank and that

4574
03:03:35,279 --> 03:03:36,180
should

4575
03:03:36,180 --> 03:03:40,560
work Forge test Dash m

4576
03:03:40,560 --> 03:03:43,800
see if that's correct

4577
03:03:43,800 --> 03:03:45,540
yep looking good all right let's keep

4578
03:03:45,540 --> 03:03:48,359
going what else what's next deposit

4579
03:03:48,359 --> 03:03:50,340
collateral not that one okay did this

4580
03:03:50,340 --> 03:03:53,220
did this non-reentrant we could be go

4581
03:03:53,220 --> 03:03:54,720
ahead and test reentrant I'm going to

4582
03:03:54,720 --> 03:03:56,340
skip doing that for now but we probably

4583
03:03:56,340 --> 03:03:58,260
do want to do some re-entricity tests at

4584
03:03:58,260 --> 03:03:59,340
some point

4585
03:03:59,340 --> 03:04:00,960
but yeah I'm going to skip them for now

4586
03:04:00,960 --> 03:04:03,420
and all right cool so then we can start

4587
03:04:03,420 --> 03:04:06,180
testing some of this so if they deposit

4588
03:04:06,180 --> 03:04:08,640
collateral we should see that they

4589
03:04:08,640 --> 03:04:10,740
actually do this we should see that they

4590
03:04:10,740 --> 03:04:13,260
emit an event let's go ahead and do that

4591
03:04:13,260 --> 03:04:15,660
so let's do function

4592
03:04:15,660 --> 03:04:16,800
test

4593
03:04:16,800 --> 03:04:18,300
can

4594
03:04:18,300 --> 03:04:21,140
pause it collateral

4595
03:04:21,140 --> 03:04:26,460
lateral and get account info because

4596
03:04:26,460 --> 03:04:29,279
once they deposit we have this get

4597
03:04:29,279 --> 03:04:31,319
accounts info

4598
03:04:31,319 --> 03:04:33,420
oh it's private right now

4599
03:04:33,420 --> 03:04:34,920
so let's actually go to the bottom let's

4600
03:04:34,920 --> 03:04:37,080
create a public version of that so we'll

4601
03:04:37,080 --> 03:04:43,200
do function get account in for animation

4602
03:04:43,200 --> 03:04:45,479
this will be external

4603
03:04:45,479 --> 03:04:47,460
external View

4604
03:04:47,460 --> 03:04:48,899
turns

4605
03:04:48,899 --> 03:04:53,040
I'll return this account address user

4606
03:04:53,040 --> 03:04:54,779
returns these two I'm going to copy this

4607
03:04:54,779 --> 03:04:56,880
go back down

4608
03:04:56,880 --> 03:05:01,279
uh external view returns

4609
03:05:02,040 --> 03:05:03,420
these two things

4610
03:05:03,420 --> 03:05:05,340
and we're going to say

4611
03:05:05,340 --> 03:05:07,859
total DSC minted comma

4612
03:05:07,859 --> 03:05:10,439
bladder value in usdc equals this

4613
03:05:10,439 --> 03:05:13,020
internal function and that should be

4614
03:05:13,020 --> 03:05:15,840
good right oh we're going to do instead

4615
03:05:15,840 --> 03:05:18,060
of message.sender we'll do address

4616
03:05:18,060 --> 03:05:22,020
user this paste the user in here so now

4617
03:05:22,020 --> 03:05:23,640
we can get the total DSC minted and

4618
03:05:23,640 --> 03:05:25,500
their collateral value in USD from an

4619
03:05:25,500 --> 03:05:27,180
external view function

4620
03:05:27,180 --> 03:05:28,380
we should be able to get that

4621
03:05:28,380 --> 03:05:29,340
information

4622
03:05:29,340 --> 03:05:30,479
so

4623
03:05:30,479 --> 03:05:32,160
let's have them actually deposit

4624
03:05:32,160 --> 03:05:33,660
collateral in here

4625
03:05:33,660 --> 03:05:35,220
and since we're going to be doing a lot

4626
03:05:35,220 --> 03:05:37,020
of deposited collaterals we know we can

4627
03:05:37,020 --> 03:05:39,560
actually make a modifier called the

4628
03:05:39,560 --> 03:05:43,080
posited collateral

4629
03:05:43,080 --> 03:05:44,160
this

4630
03:05:44,160 --> 03:05:47,040
BMW start prank

4631
03:05:47,040 --> 03:05:49,020
user

4632
03:05:49,020 --> 03:05:51,420
you'll see 20 mock

4633
03:05:51,420 --> 03:05:53,640
Wes in order to deposit West we need to

4634
03:05:53,640 --> 03:05:54,600
approve

4635
03:05:54,600 --> 03:06:00,779
address the SCE comma amount collateral

4636
03:06:00,779 --> 03:06:02,479
we're going to do

4637
03:06:02,479 --> 03:06:05,160
dsce.deposit collateral width amount

4638
03:06:05,160 --> 03:06:06,180
collateral

4639
03:06:06,180 --> 03:06:09,960
beam does stop prank beam desktop prank

4640
03:06:09,960 --> 03:06:13,740
I'll just go like this mod if fire

4641
03:06:13,740 --> 03:06:16,680
right and we'll have this can deposit

4642
03:06:16,680 --> 03:06:18,180
collateral and get account info we'll

4643
03:06:18,180 --> 03:06:20,580
have them deposit collateral and we'll

4644
03:06:20,580 --> 03:06:22,620
now get that account information so

4645
03:06:22,620 --> 03:06:25,200
we'll say you want to 256

4646
03:06:25,200 --> 03:06:30,979
total DSC minted un256 collateral

4647
03:06:30,979 --> 03:06:36,479
lateral value in USD equals dsce dot

4648
03:06:36,479 --> 03:06:41,640
gets account information in the user oh

4649
03:06:41,640 --> 03:06:44,939
from the user and now we're going to say

4650
03:06:44,939 --> 03:06:46,979
we're going to make sure these two

4651
03:06:46,979 --> 03:06:49,439
numbers are correct the total DSC minted

4652
03:06:49,439 --> 03:06:51,720
and the collateral value in USD they

4653
03:06:51,720 --> 03:06:54,479
should have minted no DSC so even 256

4654
03:06:54,479 --> 03:06:57,420
expected expected

4655
03:06:57,420 --> 03:07:02,340
total BSC minted yep equals zero un256

4656
03:07:02,340 --> 03:07:04,580
expected

4657
03:07:04,580 --> 03:07:08,939
colateral value in USD equals this is

4658
03:07:08,939 --> 03:07:12,840
going to be that dsce dot get token

4659
03:07:12,840 --> 03:07:18,600
amount from USD weft lateral value in

4660
03:07:18,600 --> 03:07:20,100
USD

4661
03:07:20,100 --> 03:07:22,439
so expect a collateral value should just

4662
03:07:22,439 --> 03:07:24,899
be this function then we can say assert

4663
03:07:24,899 --> 03:07:26,880
equal

4664
03:07:26,880 --> 03:07:30,120
DSC minted should be this expected total

4665
03:07:30,120 --> 03:07:32,040
due cemented and then we can do assert

4666
03:07:32,040 --> 03:07:33,359
equal

4667
03:07:33,359 --> 03:07:35,580
lateral value in USD it's going to be

4668
03:07:35,580 --> 03:07:37,859
this expected collateral value in USD

4669
03:07:37,859 --> 03:07:41,160
all right clear Orange

4670
03:07:41,160 --> 03:07:44,180
test Dash m

4671
03:07:46,859 --> 03:07:48,420
or we have a fail you know what to do

4672
03:07:48,420 --> 03:07:51,420
we're going to run it again Dash evv see

4673
03:07:51,420 --> 03:07:54,380
what we messed up here

4674
03:07:57,300 --> 03:07:59,580
says the assertion failed

4675
03:07:59,580 --> 03:08:03,359
left is this number and right is a much

4676
03:08:03,359 --> 03:08:05,520
smaller number this is why it's not cool

4677
03:08:05,520 --> 03:08:07,500
to do two types of asserts but I know

4678
03:08:07,500 --> 03:08:08,819
it's the second one so we're saying the

4679
03:08:08,819 --> 03:08:11,279
collateral value in USD is this with the

4680
03:08:11,279 --> 03:08:12,720
right side

4681
03:08:12,720 --> 03:08:15,120
is expected collateral value is going to

4682
03:08:15,120 --> 03:08:16,979
be this so let's see what's wrong here

4683
03:08:16,979 --> 03:08:19,020
one two three four five six seven eight

4684
03:08:19,020 --> 03:08:20,880
nine ten one two three four five six

4685
03:08:20,880 --> 03:08:24,120
seven eight so it's saying

4686
03:08:24,120 --> 03:08:26,700
collateral value in USD is 20 grand does

4687
03:08:26,700 --> 03:08:27,899
that make sense

4688
03:08:27,899 --> 03:08:30,300
well it's 10 ether

4689
03:08:30,300 --> 03:08:32,840
times two thousand dollars

4690
03:08:32,840 --> 03:08:39,180
equals 20 grand right so that is so the

4691
03:08:39,180 --> 03:08:41,100
collateral value USD is right it looks

4692
03:08:41,100 --> 03:08:44,220
like my right is wrong collateral

4693
03:08:44,220 --> 03:08:46,560
expect the collateral value news D do

4694
03:08:46,560 --> 03:08:49,260
you see that from token amount with oh

4695
03:08:49,260 --> 03:08:51,359
what the heck why am I doing that one

4696
03:08:51,359 --> 03:08:52,800
two three four five six seven eight nine

4697
03:08:52,800 --> 03:08:54,720
ten one two three four five six seven

4698
03:08:54,720 --> 03:08:58,979
eight so it's saying that twenty

4699
03:08:58,979 --> 03:09:02,160
thousand dollars is equal to ten eth so

4700
03:09:02,160 --> 03:09:03,899
I don't know why I'm calling this

4701
03:09:03,899 --> 03:09:06,540
oh this is actually expected

4702
03:09:06,540 --> 03:09:10,680
expected deposit amount and we shouldn't

4703
03:09:10,680 --> 03:09:12,479
be comparing these two

4704
03:09:12,479 --> 03:09:15,240
this should be compared to the amount

4705
03:09:15,240 --> 03:09:17,819
collateral right so 10 is how much

4706
03:09:17,819 --> 03:09:19,500
collateral we're putting in here

4707
03:09:19,500 --> 03:09:21,060
and then

4708
03:09:21,060 --> 03:09:24,000
lateral value in USD yeah that's correct

4709
03:09:24,000 --> 03:09:25,439
so we're getting we're using this

4710
03:09:25,439 --> 03:09:26,880
collateral value in USD to get the

4711
03:09:26,880 --> 03:09:29,700
expected positive amount that looks more

4712
03:09:29,700 --> 03:09:34,439
correct okay cool Forge test Dash m

4713
03:09:34,439 --> 03:09:36,479
and this is one of the kind of weird

4714
03:09:36,479 --> 03:09:38,399
Parts about writing tests right okay

4715
03:09:38,399 --> 03:09:40,740
cool we fixed it sometimes your test is

4716
03:09:40,740 --> 03:09:41,520
wrong

4717
03:09:41,520 --> 03:09:43,200
like what we just showed here I wrote my

4718
03:09:43,200 --> 03:09:45,899
test wrong but sometimes your code is

4719
03:09:45,899 --> 03:09:47,819
wrong and that's what these tests really

4720
03:09:47,819 --> 03:09:49,500
should be testing hey when is the code

4721
03:09:49,500 --> 03:09:51,180
actually wrong we're making some

4722
03:09:51,180 --> 03:09:55,040
progress Forge coverage

4723
03:09:59,399 --> 03:10:00,720
not a whole lot of great coverage here

4724
03:10:00,720 --> 03:10:03,779
let's keep going so instead of me just

4725
03:10:03,779 --> 03:10:06,060
kind of walking you through the rest of

4726
03:10:06,060 --> 03:10:08,819
these tests you know how to write these

4727
03:10:08,819 --> 03:10:11,340
tests in this file I'm not really going

4728
03:10:11,340 --> 03:10:14,160
to show you any more unique tests right

4729
03:10:14,160 --> 03:10:16,380
but like I said there is at least one

4730
03:10:16,380 --> 03:10:19,880
glaring issue in our DSC

4731
03:10:19,880 --> 03:10:21,960
engine.soul there's a big issue in here

4732
03:10:21,960 --> 03:10:23,460
right we definitely need some more

4733
03:10:23,460 --> 03:10:25,319
getter functions as well so write getter

4734
03:10:25,319 --> 03:10:27,359
functions as you test but there's at

4735
03:10:27,359 --> 03:10:29,819
least one giant issue so what I'm going

4736
03:10:29,819 --> 03:10:31,920
to do now is instead of me literally

4737
03:10:31,920 --> 03:10:33,660
walking you through the rest of these

4738
03:10:33,660 --> 03:10:36,359
tests I mean it's you can see all the

4739
03:10:36,359 --> 03:10:37,680
tests in here because I'm going to

4740
03:10:37,680 --> 03:10:39,540
challenge you to write these tests

4741
03:10:39,540 --> 03:10:40,380
yourself

4742
03:10:40,380 --> 03:10:43,740
to get this Forge coverage up remember

4743
03:10:43,740 --> 03:10:46,500
you can do Forge coverage to obviously

4744
03:10:46,500 --> 03:10:48,960
see what's going on we're focusing on

4745
03:10:48,960 --> 03:10:51,899
this one right now you can also do Forge

4746
03:10:51,899 --> 03:10:55,620
coverage dash dash report to see dash

4747
03:10:55,620 --> 03:10:57,720
dash report debug

4748
03:10:57,720 --> 03:11:00,240
to actually see the exact lines that are

4749
03:11:00,240 --> 03:11:02,279
missing right and all these things are

4750
03:11:02,279 --> 03:11:04,319
just kind of line items line items

4751
03:11:04,319 --> 03:11:06,420
whatever I see doesn't matter scroll

4752
03:11:06,420 --> 03:11:08,460
scroll scroll scroll okay these are the

4753
03:11:08,460 --> 03:11:11,340
ones that are actually issues right what

4754
03:11:11,340 --> 03:11:13,380
which one's this oh That's essential

4755
03:11:13,380 --> 03:11:15,120
that is the decentralized stable coin we

4756
03:11:15,120 --> 03:11:16,979
want to write tests for that as well but

4757
03:11:16,979 --> 03:11:19,800
let's just focus on this massive list up

4758
03:11:19,800 --> 03:11:22,680
here DSC engine focus on this list and

4759
03:11:22,680 --> 03:11:24,660
write some tests for this because yeah

4760
03:11:24,660 --> 03:11:27,120
the rest of these unit tests or staging

4761
03:11:27,120 --> 03:11:29,100
tests we're not going to learn anything

4762
03:11:29,100 --> 03:11:31,020
new this is just one of these things

4763
03:11:31,020 --> 03:11:33,120
that you got to do that you got to get

4764
03:11:33,120 --> 03:11:34,859
good at that you got to write now you

4765
03:11:34,859 --> 03:11:37,140
don't have to get it to 100 if you get

4766
03:11:37,140 --> 03:11:40,560
it to like 85 90 that's pretty good some

4767
03:11:40,560 --> 03:11:42,060
of these tests are actually very

4768
03:11:42,060 --> 03:11:45,000
difficult to write but you should

4769
03:11:45,000 --> 03:11:47,040
writing these tests should find a

4770
03:11:47,040 --> 03:11:50,220
glaring bug in at least one of these

4771
03:11:50,220 --> 03:11:52,439
functions and maybe if you find more

4772
03:11:52,439 --> 03:11:54,840
than one glaring bug that's great make a

4773
03:11:54,840 --> 03:11:57,540
PR make an issue to the repo but I want

4774
03:11:57,540 --> 03:12:00,180
you to pause the video and take some

4775
03:12:00,180 --> 03:12:01,920
time right it might be an hour it might

4776
03:12:01,920 --> 03:12:03,180
be two hours it might be 30 minutes

4777
03:12:03,180 --> 03:12:04,800
right it depends on how quick your AI

4778
03:12:04,800 --> 03:12:07,380
buddy is how quick you are and write

4779
03:12:07,380 --> 03:12:09,720
some more tests and sometimes actually

4780
03:12:09,720 --> 03:12:12,359
you can even come to your contracts and

4781
03:12:12,359 --> 03:12:14,160
you could do something like grab this

4782
03:12:14,160 --> 03:12:17,060
go over to your chat gttptpt and say hey

4783
03:12:17,060 --> 03:12:21,420
this is one of my solidity functions can

4784
03:12:21,420 --> 03:12:25,800
you write some tests for it or it in

4785
03:12:25,800 --> 03:12:28,620
Foundry and because it doesn't know what

4786
03:12:28,620 --> 03:12:30,420
Foundry is it's going to totally

4787
03:12:30,420 --> 03:12:33,000
Funk it up but you could use Chacha BT

4788
03:12:33,000 --> 03:12:34,140
to help you write some tests as well

4789
03:12:34,140 --> 03:12:36,000
help you get your coverage up but

4790
03:12:36,000 --> 03:12:38,040
there's definitely one major issue in

4791
03:12:38,040 --> 03:12:39,960
here you might even need to go back and

4792
03:12:39,960 --> 03:12:42,300
refactor some code right I'm going to

4793
03:12:42,300 --> 03:12:43,979
say keep that to a minimum though but

4794
03:12:43,979 --> 03:12:45,720
there are some spots where maybe you

4795
03:12:45,720 --> 03:12:47,880
need to refactor your code to make

4796
03:12:47,880 --> 03:12:49,740
writing tests easier maybe you need to

4797
03:12:49,740 --> 03:12:50,939
write some more helper functions right

4798
03:12:50,939 --> 03:12:53,640
take this time to experiment and tinker

4799
03:12:53,640 --> 03:12:56,819
and think what should I do how can I

4800
03:12:56,819 --> 03:12:59,520
make sure my code is safe and

4801
03:12:59,520 --> 03:13:02,040
importantly how can I write enough tests

4802
03:13:02,040 --> 03:13:03,779
to find this bug that Patrick is talking

4803
03:13:03,779 --> 03:13:05,100
about right

4804
03:13:05,100 --> 03:13:07,260
so maybe you do some refactoring now

4805
03:13:07,260 --> 03:13:09,060
don't write any fuzz tests yet we are

4806
03:13:09,060 --> 03:13:10,380
going to go over fuzz tests in a little

4807
03:13:10,380 --> 03:13:12,060
bit but yeah just try to write the rest

4808
03:13:12,060 --> 03:13:13,859
of these unit tests rest these pseudo

4809
03:13:13,859 --> 03:13:15,899
integration tests and I'll see you when

4810
03:13:15,899 --> 03:13:17,460
you come out the other side but when you

4811
03:13:17,460 --> 03:13:20,160
finish writing the tests take a break

4812
03:13:20,160 --> 03:13:23,160
take a minute I want this to sink in

4813
03:13:23,160 --> 03:13:25,939
this is one this is the most advanced

4814
03:13:25,939 --> 03:13:28,620
lesson that you're going to take in this

4815
03:13:28,620 --> 03:13:31,020
course and to be honest probably it's

4816
03:13:31,020 --> 03:13:32,040
going to be one of the most advanced

4817
03:13:32,040 --> 03:13:33,600
courses you'll ever take in solidity

4818
03:13:33,600 --> 03:13:35,760
okay so I want you to take your time

4819
03:13:35,760 --> 03:13:37,319
with this I want you to understand

4820
03:13:37,319 --> 03:13:39,720
what's going on sometimes it might even

4821
03:13:39,720 --> 03:13:41,220
make sense for you to go oh well what

4822
03:13:41,220 --> 03:13:43,500
does maker Dow do how can I learn more

4823
03:13:43,500 --> 03:13:45,600
about stable coins where else can I go

4824
03:13:45,600 --> 03:13:48,300
maybe I can ask chat gbt for questions

4825
03:13:48,300 --> 03:13:51,060
right those you who are going ah I

4826
03:13:51,060 --> 03:13:52,740
really don't want to do that you can 100

4827
03:13:52,740 --> 03:13:56,100
just copy paste mine but I recommend you

4828
03:13:56,100 --> 03:13:58,859
go through this exercise

4829
03:13:58,859 --> 03:14:00,240
okay

4830
03:14:00,240 --> 03:14:02,520
block off some time and I'll see you

4831
03:14:02,520 --> 03:14:04,700
soon

4832
03:14:17,580 --> 03:14:19,979
all right welcome back did you find the

4833
03:14:19,979 --> 03:14:22,500
bug how are your tests looking if you

4834
03:14:22,500 --> 03:14:25,500
run Forge coverage it looks something at

4835
03:14:25,500 --> 03:14:28,080
least like this does it look better do

4836
03:14:28,080 --> 03:14:29,160
the worse

4837
03:14:29,160 --> 03:14:31,080
so I copy pasted a whole bunch of my

4838
03:14:31,080 --> 03:14:33,319
tests and we're looking pretty good here

4839
03:14:33,319 --> 03:14:35,640
we definitely should be increasing the

4840
03:14:35,640 --> 03:14:37,620
test coverage of our branches and we can

4841
03:14:37,620 --> 03:14:39,300
definitely get these a little bit higher

4842
03:14:39,300 --> 03:14:41,700
but for at least the DSC engine

4843
03:14:41,700 --> 03:14:43,740
we have a much better code coverage

4844
03:14:43,740 --> 03:14:45,060
going on here

4845
03:14:45,060 --> 03:14:46,500
and I hope your code coverage looks like

4846
03:14:46,500 --> 03:14:48,899
looks like this too now additionally I

4847
03:14:48,899 --> 03:14:50,640
did a little bit of refactoring writing

4848
03:14:50,640 --> 03:14:51,600
these codes

4849
03:14:51,600 --> 03:14:53,580
one of the main things that I added was

4850
03:14:53,580 --> 03:14:56,100
I added this calculate health Factor

4851
03:14:56,100 --> 03:14:57,000
function

4852
03:14:57,000 --> 03:14:58,680
reason I added this calculate health

4853
03:14:58,680 --> 03:15:01,620
Factor internal function was so that I

4854
03:15:01,620 --> 03:15:03,660
could have this public calculated Health

4855
03:15:03,660 --> 03:15:05,520
Factor function and then in my tests

4856
03:15:05,520 --> 03:15:07,800
what I could do is have an expected

4857
03:15:07,800 --> 03:15:09,240
Health Factor

4858
03:15:09,240 --> 03:15:11,160
in that way when

4859
03:15:11,160 --> 03:15:13,859
a function breaks Health factor and I

4860
03:15:13,859 --> 03:15:15,660
can pass it into the expected Health

4861
03:15:15,660 --> 03:15:18,359
Factor error revert here in one of my

4862
03:15:18,359 --> 03:15:20,399
tests right when we're testing to expect

4863
03:15:20,399 --> 03:15:23,220
an event I added this new function to do

4864
03:15:23,220 --> 03:15:25,500
that and having a public function like

4865
03:15:25,500 --> 03:15:27,420
calculate health Factor might make it

4866
03:15:27,420 --> 03:15:29,040
easier for people to

4867
03:15:29,040 --> 03:15:31,260
see what their health Factor might be if

4868
03:15:31,260 --> 03:15:33,000
they make some change right so that was

4869
03:15:33,000 --> 03:15:35,100
one of the big ones I made and the bug

4870
03:15:35,100 --> 03:15:38,460
was in the health Factor as well or at

4871
03:15:38,460 --> 03:15:40,500
least the bug that I planned to be in

4872
03:15:40,500 --> 03:15:42,779
there so in my calculated Health factor

4873
03:15:42,779 --> 03:15:45,300
which instead of

4874
03:15:45,300 --> 03:15:47,279
in our underscore health

4875
03:15:47,279 --> 03:15:50,279
Factor function I'm just calling this

4876
03:15:50,279 --> 03:15:51,840
calculate health Factor function right

4877
03:15:51,840 --> 03:15:53,340
I'm getting the account information and

4878
03:15:53,340 --> 03:15:54,660
then just passing it to this calculated

4879
03:15:54,660 --> 03:15:57,420
Health factor and in this we needed to

4880
03:15:57,420 --> 03:16:00,240
add a checker for if the total DSC

4881
03:16:00,240 --> 03:16:03,540
minted was zero and if it's zero then we

4882
03:16:03,540 --> 03:16:05,100
said okay cool your health factor is

4883
03:16:05,100 --> 03:16:06,779
going to be the max U into 56 or

4884
03:16:06,779 --> 03:16:08,460
something like that right and the reason

4885
03:16:08,460 --> 03:16:10,439
that we need this is

4886
03:16:10,439 --> 03:16:12,479
if someone deposits a ton of collateral

4887
03:16:12,479 --> 03:16:16,200
but has no DSC minted well their health

4888
03:16:16,200 --> 03:16:19,140
factor is going to divide by zero which

4889
03:16:19,140 --> 03:16:21,120
we can't have so calculating someone's

4890
03:16:21,120 --> 03:16:22,500
Health Factor after the deposit

4891
03:16:22,500 --> 03:16:24,779
collateral would result in an issue we'd

4892
03:16:24,779 --> 03:16:26,880
Break Stuff we don't want to break stuff

4893
03:16:26,880 --> 03:16:29,279
and then the final piece that I did was

4894
03:16:29,279 --> 03:16:32,640
I added a ton of external view functions

4895
03:16:32,640 --> 03:16:34,319
just to make it easier to read and

4896
03:16:34,319 --> 03:16:37,020
interact with this protocol so those are

4897
03:16:37,020 --> 03:16:38,640
some of the refactors that I did and

4898
03:16:38,640 --> 03:16:40,439
then obviously we added a ton of tests

4899
03:16:40,439 --> 03:16:42,899
there's nothing really new in here

4900
03:16:42,899 --> 03:16:45,540
it's just you gotta write the test right

4901
03:16:45,540 --> 03:16:47,819
everything in here you've learned you

4902
03:16:47,819 --> 03:16:50,160
can do and if you wrote some tests and

4903
03:16:50,160 --> 03:16:53,760
you got this to a high level of coverage

4904
03:16:53,760 --> 03:16:56,520
around 90 you should be incredibly proud

4905
03:16:56,520 --> 03:16:57,840
of yourself

4906
03:16:57,840 --> 03:16:59,760
this is hard to write tests for it's a

4907
03:16:59,760 --> 03:17:01,920
very difficult project so you should be

4908
03:17:01,920 --> 03:17:04,140
incredibly proud of yourself for just

4909
03:17:04,140 --> 03:17:07,260
getting this far but guess what we're

4910
03:17:07,260 --> 03:17:10,380
not even done because we want to make

4911
03:17:10,380 --> 03:17:13,439
this code so freaking amazing

4912
03:17:13,439 --> 03:17:15,060
we need to think a little bit about

4913
03:17:15,060 --> 03:17:17,340
security and we're not going to go too

4914
03:17:17,340 --> 03:17:19,260
deep into security

4915
03:17:19,260 --> 03:17:20,580
however

4916
03:17:20,580 --> 03:17:22,500
we should ask ourselves some questions

4917
03:17:22,500 --> 03:17:24,120
right when we're working with a code

4918
03:17:24,120 --> 03:17:27,000
base we want to say hmm we should always

4919
03:17:27,000 --> 03:17:30,960
always ask what are our invariance slash

4920
03:17:30,960 --> 03:17:32,160
properties

4921
03:17:32,160 --> 03:17:34,020
what are the invariants

4922
03:17:34,020 --> 03:17:36,840
slash properties of the system and that

4923
03:17:36,840 --> 03:17:39,240
way we can write some stateful and

4924
03:17:39,240 --> 03:17:42,120
stateless fuzz tests now I know we

4925
03:17:42,120 --> 03:17:44,640
briefly went over one form of fuss

4926
03:17:44,640 --> 03:17:46,439
testing but now we're going to go a

4927
03:17:46,439 --> 03:17:48,720
little bit deeper and I made a video on

4928
03:17:48,720 --> 03:17:50,640
stateless and stateful fuzz testing

4929
03:17:50,640 --> 03:17:52,560
recently and we're going to go ahead and

4930
03:17:52,560 --> 03:17:53,700
watch that so you can have a better

4931
03:17:53,700 --> 03:17:55,920
understanding of what stateless and

4932
03:17:55,920 --> 03:17:58,680
stateful fuzz testing is and why it's so

4933
03:17:58,680 --> 03:18:00,660
important especially for a project like

4934
03:18:00,660 --> 03:18:03,899
this that has potentially a lot of money

4935
03:18:03,899 --> 03:18:06,720
moving around so let's understand what

4936
03:18:06,720 --> 03:18:11,060
fuzz testing is let's watch this video

4937
03:18:13,340 --> 03:18:15,540
all right contracts are written and

4938
03:18:15,540 --> 03:18:17,340
tested can I ship my code no I can

4939
03:18:17,340 --> 03:18:18,660
easily break this with a flash loan

4940
03:18:18,660 --> 03:18:19,979
attack oh crap I didn't think about that

4941
03:18:19,979 --> 03:18:21,979
let me fix all right how about now

4942
03:18:21,979 --> 03:18:24,660
it's not like a flash on an Ave I can

4943
03:18:24,660 --> 03:18:26,520
use that loan it's like I'm a cdb I'm

4944
03:18:26,520 --> 03:18:28,439
Faker Dow and I can exploit the Oracle

4945
03:18:28,439 --> 03:18:30,180
by re-entering your dinner reservation

4946
03:18:30,180 --> 03:18:32,160
at Chili's causing a bridge malfunction

4947
03:18:32,160 --> 03:18:34,260
on the flux capacitor bypassing the

4948
03:18:34,260 --> 03:18:36,840
possibility media can explode your

4949
03:18:36,840 --> 03:18:40,979
contract I exploit your contract

4950
03:18:40,979 --> 03:18:42,960
most of the time hacks will come from a

4951
03:18:42,960 --> 03:18:44,460
scenario that you didn't think about or

4952
03:18:44,460 --> 03:18:46,260
write a test for but what if I told you

4953
03:18:46,260 --> 03:18:47,939
that you could write a test that cannot

4954
03:18:47,939 --> 03:18:50,340
check for just one scenario but every

4955
03:18:50,340 --> 03:18:52,680
scenario let's get froggy Plus testing

4956
03:18:52,680 --> 03:18:54,359
or fuzzing is when you supply random

4957
03:18:54,359 --> 03:18:56,100
data to your system in an attempt to

4958
03:18:56,100 --> 03:18:57,720
break it so if this balloon is our

4959
03:18:57,720 --> 03:18:59,700
system slash code it's us doing random

4960
03:18:59,700 --> 03:19:02,340
stuff in an attempt to break it this is

4961
03:19:02,340 --> 03:19:04,819
chain link

4962
03:19:05,779 --> 03:19:07,800
now why would we want to do all that

4963
03:19:07,800 --> 03:19:09,000
let's say we have this function called

4964
03:19:09,000 --> 03:19:10,979
do stuff it takes an integer as an input

4965
03:19:10,979 --> 03:19:12,479
parameter and we know that no matter

4966
03:19:12,479 --> 03:19:14,399
what we give it as an input our variable

4967
03:19:14,399 --> 03:19:16,319
should always be zero should always be

4968
03:19:16,319 --> 03:19:18,120
zero the fact that this variable should

4969
03:19:18,120 --> 03:19:20,160
always be zero is known as our invariant

4970
03:19:20,160 --> 03:19:21,960
or our property of the system that

4971
03:19:21,960 --> 03:19:23,520
should always hold in our balloon

4972
03:19:23,520 --> 03:19:25,200
example if we Market our balloon as

4973
03:19:25,200 --> 03:19:27,060
indestructible or unbreakable or

4974
03:19:27,060 --> 03:19:28,680
unpoppable the invariant that would hold

4975
03:19:28,680 --> 03:19:31,080
wood this balloon cannot be broken and

4976
03:19:31,080 --> 03:19:33,120
unlike this balloon in real life we can

4977
03:19:33,120 --> 03:19:34,920
write a test that will call the do stuff

4978
03:19:34,920 --> 03:19:37,740
function many times with random data and

4979
03:19:37,740 --> 03:19:39,359
check to see that our should always be

4980
03:19:39,359 --> 03:19:41,700
zero variable is always zero now a

4981
03:19:41,700 --> 03:19:43,439
normal unit test for our code might look

4982
03:19:43,439 --> 03:19:45,720
like this we pass a single data point we

4983
03:19:45,720 --> 03:19:47,220
call the function and then we do our

4984
03:19:47,220 --> 03:19:49,080
assertion to make sure that should

4985
03:19:49,080 --> 03:19:51,359
always be zero is in fact zero and with

4986
03:19:51,359 --> 03:19:52,680
this we might think our code is covered

4987
03:19:52,680 --> 03:19:54,240
but if we look back at our do stuff

4988
03:19:54,240 --> 03:19:56,160
function a little bit closer we can

4989
03:19:56,160 --> 03:19:58,859
clearly see that if our data input is 2

4990
03:19:58,859 --> 03:20:00,960
should always be zero we'll end up being

4991
03:20:00,960 --> 03:20:03,120
one this would break our invariant

4992
03:20:03,120 --> 03:20:05,520
should always be zero will not be zero

4993
03:20:05,520 --> 03:20:06,840
now this may seem obvious for this

4994
03:20:06,840 --> 03:20:07,979
function but sometimes you'll have a

4995
03:20:07,979 --> 03:20:11,120
function that looks like this

4996
03:20:11,580 --> 03:20:14,580
okay

4997
03:20:15,420 --> 03:20:16,979
it would be insane to write a test case

4998
03:20:16,979 --> 03:20:18,479
for every single possible integer or

4999
03:20:18,479 --> 03:20:20,279
scenario so we need a programmatic way

5000
03:20:20,279 --> 03:20:22,140
to find this scenario now in our code we

5001
03:20:22,140 --> 03:20:23,939
also see a second exploit but we'll get

5002
03:20:23,939 --> 03:20:25,200
to that in a minute now there are two

5003
03:20:25,200 --> 03:20:26,700
popular methodologies to find these edge

5004
03:20:26,700 --> 03:20:28,979
cases fuzz tests slash invariant tests

5005
03:20:28,979 --> 03:20:30,899
and symbolic execution slash form of

5006
03:20:30,899 --> 03:20:32,580
verification we'll save the latter for

5007
03:20:32,580 --> 03:20:34,080
another video if we were writing our

5008
03:20:34,080 --> 03:20:35,640
code in Foundry this would be our unit

5009
03:20:35,640 --> 03:20:37,740
test writing a fuzz test in Foundry

5010
03:20:37,740 --> 03:20:39,479
where we do all this random inputting is

5011
03:20:39,479 --> 03:20:41,220
going to be really similar instead of us

5012
03:20:41,220 --> 03:20:43,200
manually selecting our data right in our

5013
03:20:43,200 --> 03:20:44,580
test parameter We'll add our variable

5014
03:20:44,580 --> 03:20:46,800
common out this line and that's it now

5015
03:20:46,800 --> 03:20:48,660
when we run a Foundry test here Foundry

5016
03:20:48,660 --> 03:20:50,819
will automatically randomize data run

5017
03:20:50,819 --> 03:20:52,319
through a code with a ton of different

5018
03:20:52,319 --> 03:20:54,359
examples this is as if they run with

5019
03:20:54,359 --> 03:20:56,700
data equals zero data equals one date

5020
03:20:56,700 --> 03:20:58,500
equals this number that's a t but

5021
03:20:58,500 --> 03:20:59,939
whatever you get the picture now if I

5022
03:20:59,939 --> 03:21:01,979
run my unit test you'll see that the

5023
03:21:01,979 --> 03:21:03,960
unit test actually passes however if we

5024
03:21:03,960 --> 03:21:05,640
run this fuzz test you'll see it

5025
03:21:05,640 --> 03:21:07,140
actually gives us an output where it

5026
03:21:07,140 --> 03:21:09,479
says assertion violated counter example

5027
03:21:09,479 --> 03:21:11,760
gives us the call data and the arguments

5028
03:21:11,760 --> 03:21:13,979
it was able to find out by randomly

5029
03:21:13,979 --> 03:21:16,020
throwing data at our function call that

5030
03:21:16,020 --> 03:21:18,960
two breaks our invariant AKA it makes it

5031
03:21:18,960 --> 03:21:20,939
such that should always be zero is not

5032
03:21:20,939 --> 03:21:22,979
zero now it's really doing semi-random

5033
03:21:22,979 --> 03:21:24,540
data instead of purely random data and

5034
03:21:24,540 --> 03:21:26,040
the way your fuzzer picks the random

5035
03:21:26,040 --> 03:21:28,319
data matters it won't be able to go over

5036
03:21:28,319 --> 03:21:30,899
every single possible unit 256 so

5037
03:21:30,899 --> 03:21:32,580
understanding how your fuzzers pick the

5038
03:21:32,580 --> 03:21:34,020
random data is an advanced thing that

5039
03:21:34,020 --> 03:21:35,460
you should learn later on at the moment

5040
03:21:35,460 --> 03:21:37,260
I think the trailer bits Echidna slash

5041
03:21:37,260 --> 03:21:38,760
optic integration is probably the best

5042
03:21:38,760 --> 03:21:40,620
fuzzer out there and it easily has the

5043
03:21:40,620 --> 03:21:42,540
best logo of all time but ripped Jesus

5044
03:21:42,540 --> 03:21:44,340
is a solid second so now that we have

5045
03:21:44,340 --> 03:21:46,260
our counter example here we can use this

5046
03:21:46,260 --> 03:21:48,479
to go back to our contract find out ah

5047
03:21:48,479 --> 03:21:50,220
okay so we are doing this wrong delete

5048
03:21:50,220 --> 03:21:52,319
this line and then run our test again

5049
03:21:52,319 --> 03:21:54,479
and see that it does indeed pass what's

5050
03:21:54,479 --> 03:21:56,279
important is this number down here the

5051
03:21:56,279 --> 03:21:59,220
number of runs so this did 256 different

5052
03:21:59,220 --> 03:22:01,500
random inputs to make our test run in

5053
03:22:01,500 --> 03:22:02,880
Foundry you can change the number of

5054
03:22:02,880 --> 03:22:05,520
runs in your foundry.tamil file by just

5055
03:22:05,520 --> 03:22:07,800
adding a section like this re-running

5056
03:22:07,800 --> 03:22:09,479
your tests and now you'll see it did a

5057
03:22:09,479 --> 03:22:10,800
thousand different examples the number

5058
03:22:10,800 --> 03:22:12,120
of runs is really important obviously

5059
03:22:12,120 --> 03:22:13,979
because more runs is more random inputs

5060
03:22:13,979 --> 03:22:15,660
more use cases more to answer that

5061
03:22:15,660 --> 03:22:17,279
you'll actually catch the issue and now

5062
03:22:17,279 --> 03:22:19,319
congrats that's the basic of fuss

5063
03:22:19,319 --> 03:22:20,700
testing let's just do a little recap

5064
03:22:20,700 --> 03:22:22,200
here before going further the first

5065
03:22:22,200 --> 03:22:24,060
thing you need to do is understand our

5066
03:22:24,060 --> 03:22:26,340
invariant or property of the system that

5067
03:22:26,340 --> 03:22:28,500
must always hold in our example should

5068
03:22:28,500 --> 03:22:30,060
always be zero was our invariant

5069
03:22:30,060 --> 03:22:31,800
understand your invariant and then write

5070
03:22:31,800 --> 03:22:34,020
a test that would input random data to

5071
03:22:34,020 --> 03:22:36,000
try to break that invariant now if we go

5072
03:22:36,000 --> 03:22:37,380
back to our example contract though

5073
03:22:37,380 --> 03:22:39,120
you'll see with our fuzz test we were

5074
03:22:39,120 --> 03:22:41,220
able to find this first use case however

5075
03:22:41,220 --> 03:22:43,500
it didn't find this second scenario

5076
03:22:43,500 --> 03:22:44,880
where it should always be zero was set

5077
03:22:44,880 --> 03:22:47,160
to 1 if hidden value was 7. in order for

5078
03:22:47,160 --> 03:22:48,960
this to revert hidden value would need

5079
03:22:48,960 --> 03:22:50,580
to be seven and the only way to set

5080
03:22:50,580 --> 03:22:53,460
hidden value to 7 would be to First Call

5081
03:22:53,460 --> 03:22:55,800
do stuff with 7 which would set hidden

5082
03:22:55,800 --> 03:22:57,359
value down here and then call do stuff

5083
03:22:57,359 --> 03:22:59,520
again with anything our fuzz test as

5084
03:22:59,520 --> 03:23:00,960
written would never be able to find this

5085
03:23:00,960 --> 03:23:02,760
that's because this fuzz test is known

5086
03:23:02,760 --> 03:23:05,220
as a stateless fuzz test which is where

5087
03:23:05,220 --> 03:23:07,020
the state of the previous run is

5088
03:23:07,020 --> 03:23:08,880
discarded for the next run we go back to

5089
03:23:08,880 --> 03:23:10,439
our balloon example stateless fuzzy

5090
03:23:10,439 --> 03:23:11,640
would be doing something to the balloon

5091
03:23:11,640 --> 03:23:13,680
for one fuzz run then discarding that

5092
03:23:13,680 --> 03:23:15,239
balloon and blowing up a new balloon for

5093
03:23:15,239 --> 03:23:17,760
each fuzz run however instead of doing

5094
03:23:17,760 --> 03:23:19,739
State less fuzzing we could do state

5095
03:23:19,739 --> 03:23:21,660
full fuzzing stateful fuzzing is where

5096
03:23:21,660 --> 03:23:23,520
the ending state of our previous fuzz

5097
03:23:23,520 --> 03:23:25,680
run is the starting state of the next

5098
03:23:25,680 --> 03:23:27,660
fuzz run for example instead of blowing

5099
03:23:27,660 --> 03:23:29,399
up a new balloon for each one of these

5100
03:23:29,399 --> 03:23:31,380
runs we just use the same balloon to do

5101
03:23:31,380 --> 03:23:33,600
multiple random things to it combined is

5102
03:23:33,600 --> 03:23:36,120
considered one fuzz run so a single fuzz

5103
03:23:36,120 --> 03:23:38,040
run on a stateless fuzz run would be

5104
03:23:38,040 --> 03:23:40,380
having data B7 calling do stuff just

5105
03:23:40,380 --> 03:23:42,180
using the same contract that we just

5106
03:23:42,180 --> 03:23:44,460
called do stuff on and then call another

5107
03:23:44,460 --> 03:23:46,080
function on it if this was a unit test

5108
03:23:46,080 --> 03:23:47,700
we had we would of course see this get

5109
03:23:47,700 --> 03:23:49,859
violated but as you can see with

5110
03:23:49,859 --> 03:23:51,840
sufficiently complicated code calling it

5111
03:23:51,840 --> 03:23:53,340
these very specific scenarios are going

5112
03:23:53,340 --> 03:23:55,080
to be missed to write a stateful fuzz

5113
03:23:55,080 --> 03:23:56,760
test and Foundry you need to use the

5114
03:23:56,760 --> 03:23:58,739
invariant keyword and it requires a

5115
03:23:58,739 --> 03:24:00,060
little bit of setup and don't get too

5116
03:24:00,060 --> 03:24:01,560
confused by the invariant keyword here

5117
03:24:01,560 --> 03:24:03,660
yes it's being a little overloaded right

5118
03:24:03,660 --> 03:24:05,460
in a very intestine Foundry we first

5119
03:24:05,460 --> 03:24:07,680
need to import this STD invariant

5120
03:24:07,680 --> 03:24:09,660
contract and inherit it in our test

5121
03:24:09,660 --> 03:24:12,359
contract then we need to tell Foundry

5122
03:24:12,359 --> 03:24:14,580
which contract to call random functions

5123
03:24:14,580 --> 03:24:16,380
on since we we have one contract with

5124
03:24:16,380 --> 03:24:18,060
one function we're going to tell Foundry

5125
03:24:18,060 --> 03:24:19,920
that my contract should be called and

5126
03:24:19,920 --> 03:24:21,120
it's allowed to call any of the

5127
03:24:21,120 --> 03:24:23,160
functions in my contract so we'd say hey

5128
03:24:23,160 --> 03:24:25,140
the Target contract for you is going to

5129
03:24:25,140 --> 03:24:27,060
be the address of example contract

5130
03:24:27,060 --> 03:24:28,620
Foundry is smart enough to know okay

5131
03:24:28,620 --> 03:24:30,600
it's going to grab any and all of the

5132
03:24:30,600 --> 03:24:32,399
functions from my contract and call them

5133
03:24:32,399 --> 03:24:34,140
in random orders with random data so

5134
03:24:34,140 --> 03:24:35,580
it's going to call do stuff with random

5135
03:24:35,580 --> 03:24:36,720
data and then it's going to call do

5136
03:24:36,720 --> 03:24:38,100
stuff with random data and then it's

5137
03:24:38,100 --> 03:24:39,420
going to call do stuff with random data

5138
03:24:39,420 --> 03:24:40,979
since do stuff is the only function now

5139
03:24:40,979 --> 03:24:42,720
we can write our invariant by saying

5140
03:24:42,720 --> 03:24:45,899
function invariant test always is zero

5141
03:24:45,899 --> 03:24:48,120
oblique and we can just add our assert

5142
03:24:48,120 --> 03:24:49,920
assert our example contract that should

5143
03:24:49,920 --> 03:24:52,200
always be zero is zero so it'll run do

5144
03:24:52,200 --> 03:24:54,000
stuff with some random data if it

5145
03:24:54,000 --> 03:24:56,279
happens across seven it'll set hidden

5146
03:24:56,279 --> 03:24:58,500
value to 7 and then it'll call do stuff

5147
03:24:58,500 --> 03:25:01,920
again with hidden values starting at 7

5148
03:25:01,920 --> 03:25:04,260
which will trigger this conditional so

5149
03:25:04,260 --> 03:25:06,359
now if we run this test we can see it

5150
03:25:06,359 --> 03:25:08,340
does indeed find a sequence where r

5151
03:25:08,340 --> 03:25:10,439
invariant or our assertion or our

5152
03:25:10,439 --> 03:25:12,660
property is broken we can see first on

5153
03:25:12,660 --> 03:25:14,880
my contract it's going to call do stuff

5154
03:25:14,880 --> 03:25:16,979
Within an argument of seven and then

5155
03:25:16,979 --> 03:25:19,140
it's going to call my contract with an

5156
03:25:19,140 --> 03:25:21,060
argument of some random number because

5157
03:25:21,060 --> 03:25:22,380
it doesn't matter what the input is

5158
03:25:22,380 --> 03:25:24,660
after it sets it to seven so now that we

5159
03:25:24,660 --> 03:25:27,000
have that we can go back to our code

5160
03:25:27,000 --> 03:25:30,779
remove this come back to our test rerun

5161
03:25:30,779 --> 03:25:33,540
our test and we'll find that our code is

5162
03:25:33,540 --> 03:25:35,100
now safe and sound because our

5163
03:25:35,100 --> 03:25:37,979
invariance hold up now an important

5164
03:25:37,979 --> 03:25:39,960
aside on the term invariant Foundry uses

5165
03:25:39,960 --> 03:25:41,760
the term invariant to describe this

5166
03:25:41,760 --> 03:25:43,800
stateful fuzzing state less fuzzing is

5167
03:25:43,800 --> 03:25:45,779
when you give random data to an input to

5168
03:25:45,779 --> 03:25:46,979
a function to see if it breaks them

5169
03:25:46,979 --> 03:25:49,260
invariant State full fuzzing is when you

5170
03:25:49,260 --> 03:25:51,120
give random data and random function

5171
03:25:51,120 --> 03:25:52,859
calls to a system to see if it breaks

5172
03:25:52,859 --> 03:25:54,660
them invariant in Foundry fuzzing is

5173
03:25:54,660 --> 03:25:56,700
stateless fuzzing and invariants are

5174
03:25:56,700 --> 03:25:58,020
stateful fuzzing so when people are

5175
03:25:58,020 --> 03:25:59,460
talking about invariance and Foundry

5176
03:25:59,460 --> 03:26:00,899
they're usually talking about stateful

5177
03:26:00,899 --> 03:26:03,300
fuzzing if they talk about fuzzing and

5178
03:26:03,300 --> 03:26:04,680
Foundry they're talking about State less

5179
03:26:04,680 --> 03:26:05,880
fuzzing even though they're both

5180
03:26:05,880 --> 03:26:07,500
technically fuzzing there's an issue on

5181
03:26:07,500 --> 03:26:08,880
the repo to potentially change the name

5182
03:26:08,880 --> 03:26:10,380
but I digress so in a real smart

5183
03:26:10,380 --> 03:26:12,180
contract your invariant won't be that a

5184
03:26:12,180 --> 03:26:13,739
balloon shouldn't pop or some function

5185
03:26:13,739 --> 03:26:15,060
should always be zero it might be

5186
03:26:15,060 --> 03:26:17,700
something like new tokens minted is less

5187
03:26:17,700 --> 03:26:19,200
than the inflation rate there should

5188
03:26:19,200 --> 03:26:20,640
only be one winner in a random Lottery

5189
03:26:20,640 --> 03:26:22,439
someone shouldn't be able to take more

5190
03:26:22,439 --> 03:26:23,819
money out of the protocol than they put

5191
03:26:23,819 --> 03:26:25,140
in and let me tell you what at this

5192
03:26:25,140 --> 03:26:27,060
point congratulations you've learned the

5193
03:26:27,060 --> 03:26:29,040
basics of fuzzing this is something that

5194
03:26:29,040 --> 03:26:30,600
even some of the top protocols in this

5195
03:26:30,600 --> 03:26:32,100
space don't use and this is something

5196
03:26:32,100 --> 03:26:33,779
that we and siphon use to find High

5197
03:26:33,779 --> 03:26:35,460
severity vulnerabilities in smart

5198
03:26:35,460 --> 03:26:38,160
contracts hey I'm Alex Rohn co-founder

5199
03:26:38,160 --> 03:26:40,319
at cyphron we use invariant tests during

5200
03:26:40,319 --> 03:26:42,660
our audits to identify vulnerabilities

5201
03:26:42,660 --> 03:26:46,380
that are often difficult to catch purely

5202
03:26:46,380 --> 03:26:48,239
with manual reviews that's not to say

5203
03:26:48,239 --> 03:26:50,520
they're a silver bullet they are in no

5204
03:26:50,520 --> 03:26:53,220
way a replacement for experts manual

5205
03:26:53,220 --> 03:26:56,340
review but they certainly can Aid in the

5206
03:26:56,340 --> 03:26:58,920
audit process this needs to be the new

5207
03:26:58,920 --> 03:27:01,140
floor for security in web3 if you're

5208
03:27:01,140 --> 03:27:03,000
working with a protocol that isn't doing

5209
03:27:03,000 --> 03:27:05,279
stateful fuzzing or invariants or fuzz

5210
03:27:05,279 --> 03:27:07,920
test red flag get them to use it make a

5211
03:27:07,920 --> 03:27:10,500
PR number one understand what the

5212
03:27:10,500 --> 03:27:12,960
invariants are number two write

5213
03:27:12,960 --> 03:27:16,020
functions that can execute them do not

5214
03:27:16,020 --> 03:27:18,420
go to audit without these don't let your

5215
03:27:18,420 --> 03:27:20,040
Auditors let you get away with not

5216
03:27:20,040 --> 03:27:21,960
having them so this video was just to

5217
03:27:21,960 --> 03:27:23,460
give you the basics and if you want to

5218
03:27:23,460 --> 03:27:25,080
learn the advanced fuzzing strategies on

5219
03:27:25,080 --> 03:27:26,700
how to fuzz like Pro be sure to watch

5220
03:27:26,700 --> 03:27:28,680
our next video on the topic as that'll

5221
03:27:28,680 --> 03:27:29,880
give you the keys to write professional

5222
03:27:29,880 --> 03:27:31,920
fuzz and professional invariant tests

5223
03:27:31,920 --> 03:27:34,500
come on gang let's make web3 better and

5224
03:27:34,500 --> 03:27:37,120
I'll see you next time

5225
03:27:37,120 --> 03:27:40,680
[Music]

5226
03:27:40,680 --> 03:27:43,460
foreign

5227
03:27:45,260 --> 03:27:47,700
so now we've learned a little bit about

5228
03:27:47,700 --> 03:27:50,399
invariant tests or fuzzing tests and why

5229
03:27:50,399 --> 03:27:52,439
they are so absolutely crucial

5230
03:27:52,439 --> 03:27:55,319
especially for a project like this so

5231
03:27:55,319 --> 03:27:56,880
we're going to write some stateful fuzz

5232
03:27:56,880 --> 03:27:59,939
tests or invariant tests and Foundry so

5233
03:27:59,939 --> 03:28:01,260
we can have some more confidence that

5234
03:28:01,260 --> 03:28:03,060
our code actually does what we want it

5235
03:28:03,060 --> 03:28:06,660
to do and the method that we saw in that

5236
03:28:06,660 --> 03:28:08,100
video that we just watched is kind of

5237
03:28:08,100 --> 03:28:09,600
the most basic

5238
03:28:09,600 --> 03:28:11,700
methodology out there if we go to The

5239
03:28:11,700 --> 03:28:13,979
Foundry docs we can go on the left side

5240
03:28:13,979 --> 03:28:16,859
go all the way down to buzz testing or

5241
03:28:16,859 --> 03:28:18,960
excuse me all the way down to this

5242
03:28:18,960 --> 03:28:20,640
invariant testing which invariant

5243
03:28:20,640 --> 03:28:22,140
testing like I said is stateful fuzz

5244
03:28:22,140 --> 03:28:24,300
testing we can read more about some of

5245
03:28:24,300 --> 03:28:26,399
the more advanced ways to do these fuzz

5246
03:28:26,399 --> 03:28:28,800
tests or these invariant tests we're

5247
03:28:28,800 --> 03:28:30,180
still going to do the target contracts

5248
03:28:30,180 --> 03:28:33,000
but what we saw in the video was a type

5249
03:28:33,000 --> 03:28:35,520
of open testing right where we just have

5250
03:28:35,520 --> 03:28:37,560
function in variant a and then the

5251
03:28:37,560 --> 03:28:40,140
assert and what this does is it just

5252
03:28:40,140 --> 03:28:42,420
calls all the functions on this contract

5253
03:28:42,420 --> 03:28:45,060
to try to break that invariant now this

5254
03:28:45,060 --> 03:28:48,000
is good this is great for an initial run

5255
03:28:48,000 --> 03:28:50,760
of the code however we want to do for

5256
03:28:50,760 --> 03:28:53,279
more advanced systems like ours Handler

5257
03:28:53,279 --> 03:28:55,319
based testing sufficiently complex

5258
03:28:55,319 --> 03:28:57,239
Protocols are going to have so many

5259
03:28:57,239 --> 03:28:59,399
different random intricacies that we

5260
03:28:59,399 --> 03:29:02,460
want to narrow down the random call so

5261
03:29:02,460 --> 03:29:04,080
that we can have a higher likelihood of

5262
03:29:04,080 --> 03:29:06,420
getting and catching actual errors so

5263
03:29:06,420 --> 03:29:07,859
we're going to do this handler-based

5264
03:29:07,859 --> 03:29:10,319
type of testing in this example here in

5265
03:29:10,319 --> 03:29:12,120
this open testing it just calls any of

5266
03:29:12,120 --> 03:29:13,560
the functions in the contract in any

5267
03:29:13,560 --> 03:29:16,140
order and Handler based testing if we

5268
03:29:16,140 --> 03:29:17,460
scroll down we can kind of see this

5269
03:29:17,460 --> 03:29:19,800
example here where we create a contract

5270
03:29:19,800 --> 03:29:22,020
called Handler where we only call

5271
03:29:22,020 --> 03:29:24,779
functions in specific ways for example

5272
03:29:24,779 --> 03:29:27,479
when depositing tokens we need to make

5273
03:29:27,479 --> 03:29:29,819
sure and a proof happens beforehand if

5274
03:29:29,819 --> 03:29:31,500
you just call deposit without approving

5275
03:29:31,500 --> 03:29:33,239
that token that's kind of a wasted fuzz

5276
03:29:33,239 --> 03:29:35,640
run and if we only have 200 fuzz runs

5277
03:29:35,640 --> 03:29:37,380
and we're wasting them on failed fuzz

5278
03:29:37,380 --> 03:29:39,660
runs well we're the chance of us

5279
03:29:39,660 --> 03:29:41,760
actually finding a bug becomes smaller

5280
03:29:41,760 --> 03:29:43,920
so if you think of

5281
03:29:43,920 --> 03:29:46,260
the open fuzz testing like this where

5282
03:29:46,260 --> 03:29:48,120
you have Foundry you call a whole bunch

5283
03:29:48,120 --> 03:29:49,800
of functions on the protocol with the

5284
03:29:49,800 --> 03:29:52,319
asserts Handler is going to call

5285
03:29:52,319 --> 03:29:54,779
functions in specific ways to the

5286
03:29:54,779 --> 03:29:56,819
function so that we have a higher

5287
03:29:56,819 --> 03:29:58,739
likelihood of calling functions and

5288
03:29:58,739 --> 03:30:00,239
orders that we want

5289
03:30:00,239 --> 03:30:01,680
so we're going to learn about this

5290
03:30:01,680 --> 03:30:03,899
handler-based methodology and we're

5291
03:30:03,899 --> 03:30:06,560
going to build an incredibly verbose

5292
03:30:06,560 --> 03:30:10,680
testing or invariant testing setup now

5293
03:30:10,680 --> 03:30:13,260
and our foundry.tamil to work with these

5294
03:30:13,260 --> 03:30:14,819
fuzz with these invariant tests we can

5295
03:30:14,819 --> 03:30:17,640
do this in variant section here we can

5296
03:30:17,640 --> 03:30:20,100
say the number of runs we'll say is 128.

5297
03:30:20,100 --> 03:30:22,739
we can also say the depth which is the

5298
03:30:22,739 --> 03:30:25,319
number of calls in a single run which we

5299
03:30:25,319 --> 03:30:27,540
might do 128 and then one of the most

5300
03:30:27,540 --> 03:30:28,859
important keywords you're going to run

5301
03:30:28,859 --> 03:30:32,640
into is this fail on revert so let's

5302
03:30:32,640 --> 03:30:34,319
talk about this fail on revert keyword

5303
03:30:34,319 --> 03:30:36,660
and setting so to create some invariant

5304
03:30:36,660 --> 03:30:39,479
tests let's create a new folder or Buzz

5305
03:30:39,479 --> 03:30:41,100
test called fuzz or invariant or

5306
03:30:41,100 --> 03:30:42,960
whatever you want to call it and in here

5307
03:30:42,960 --> 03:30:44,100
we're going to need to actually create

5308
03:30:44,100 --> 03:30:46,739
two different files we're going to do

5309
03:30:46,739 --> 03:30:50,000
invariance invariance

5310
03:30:50,000 --> 03:30:54,020
test.t.sol and then

5311
03:30:54,020 --> 03:30:56,819
handler.t.soul this invariance file is

5312
03:30:56,819 --> 03:30:59,819
going to have have our invariance

5313
03:30:59,819 --> 03:31:02,220
AKA are properties of the system that

5314
03:31:02,220 --> 03:31:03,960
should always hold right that we just

5315
03:31:03,960 --> 03:31:06,120
learned from that video and this Handler

5316
03:31:06,120 --> 03:31:08,520
this Handler is going to narrow down the

5317
03:31:08,520 --> 03:31:11,100
way that we call functions this way we

5318
03:31:11,100 --> 03:31:13,319
don't waste runs like I was saying again

5319
03:31:13,319 --> 03:31:15,479
if we call the positive collateral in

5320
03:31:15,479 --> 03:31:17,640
our stable coin without approving that

5321
03:31:17,640 --> 03:31:19,680
stable coin that's kind of a wasted run

5322
03:31:19,680 --> 03:31:22,680
and we don't want to waste runs so this

5323
03:31:22,680 --> 03:31:24,660
Handler is going to set our code up or

5324
03:31:24,660 --> 03:31:27,060
set our contracts up so that we don't

5325
03:31:27,060 --> 03:31:29,220
waste these runs and we're going to come

5326
03:31:29,220 --> 03:31:30,540
back to this fail and revert in a second

5327
03:31:30,540 --> 03:31:32,580
for now let's actually set this to false

5328
03:31:32,580 --> 03:31:35,880
and we'll set it to True soon but so the

5329
03:31:35,880 --> 03:31:37,560
first thing we always want to do when

5330
03:31:37,560 --> 03:31:38,939
writing and varying tests when working

5331
03:31:38,939 --> 03:31:41,100
with this is you want to ask the

5332
03:31:41,100 --> 03:31:45,840
question what are our invariance what

5333
03:31:45,840 --> 03:31:47,880
are the properties of the system that

5334
03:31:47,880 --> 03:31:50,460
should always hold well we can think of

5335
03:31:50,460 --> 03:31:53,880
something right well one the total

5336
03:31:53,880 --> 03:31:56,580
supply of DSC

5337
03:31:56,580 --> 03:32:01,040
should be less than the total value of

5338
03:32:01,040 --> 03:32:04,140
collateral follow the word wrap which

5339
03:32:04,140 --> 03:32:06,000
the total supply of DSC which is

5340
03:32:06,000 --> 03:32:07,500
essentially the debt should always be

5341
03:32:07,500 --> 03:32:09,120
less than the total value of collateral

5342
03:32:09,120 --> 03:32:10,979
great we have an invariant that we can

5343
03:32:10,979 --> 03:32:14,220
test and we should throw a ton of random

5344
03:32:14,220 --> 03:32:15,779
function calls to try to break this one

5345
03:32:15,779 --> 03:32:18,000
okay what else what other invariants

5346
03:32:18,000 --> 03:32:20,460
should we have maybe our getter

5347
03:32:20,460 --> 03:32:23,160
functions our getter view functions

5348
03:32:23,160 --> 03:32:24,660
should never

5349
03:32:24,660 --> 03:32:27,479
revert and this is actually sort of an

5350
03:32:27,479 --> 03:32:28,800
evergreen

5351
03:32:28,800 --> 03:32:32,340
invariance most protocols can and should

5352
03:32:32,340 --> 03:32:33,720
probably just have in a variant that

5353
03:32:33,720 --> 03:32:35,340
looks like this getter view function

5354
03:32:35,340 --> 03:32:38,279
should never revert now we can probably

5355
03:32:38,279 --> 03:32:40,920
think of more but because doing these

5356
03:32:40,920 --> 03:32:42,479
invariant tests can be a little bit time

5357
03:32:42,479 --> 03:32:44,160
intensive we're just going to focus on

5358
03:32:44,160 --> 03:32:45,479
these two for now these are going to be

5359
03:32:45,479 --> 03:32:47,640
the two invariants that we focus on we

5360
03:32:47,640 --> 03:32:51,779
try to work with so let's begin working

5361
03:32:51,779 --> 03:32:54,000
and writing our invariant tests and then

5362
03:32:54,000 --> 03:32:55,920
we're also going to write our Handler

5363
03:32:55,920 --> 03:32:57,899
to help make sure all the function calls

5364
03:32:57,899 --> 03:32:59,580
that we're working with actually do what

5365
03:32:59,580 --> 03:33:03,060
we want them to do okay let's do it so

5366
03:33:03,060 --> 03:33:05,040
this is going to be another test file so

5367
03:33:05,040 --> 03:33:08,160
spdx license

5368
03:33:08,160 --> 03:33:09,899
identifier MIT

5369
03:33:09,899 --> 03:33:11,220
pragma

5370
03:33:11,220 --> 03:33:13,859
so that's nice that kind of just

5371
03:33:13,859 --> 03:33:16,020
automatically added it for me let's put

5372
03:33:16,020 --> 03:33:17,220
this to the top

5373
03:33:17,220 --> 03:33:19,340
zero point

5374
03:33:19,340 --> 03:33:22,380
8.18 a little carrot here

5375
03:33:22,380 --> 03:33:23,640
contract

5376
03:33:23,640 --> 03:33:27,899
and variance test like this and to do

5377
03:33:27,899 --> 03:33:30,060
this we're going to say we have to

5378
03:33:30,060 --> 03:33:31,080
import some stuff we're going to import

5379
03:33:31,080 --> 03:33:32,279
test

5380
03:33:32,279 --> 03:33:36,600
from Forge TD slash test that's all

5381
03:33:36,600 --> 03:33:38,000
and import

5382
03:33:38,000 --> 03:33:40,080
STD in

5383
03:33:40,080 --> 03:33:46,859
variant from Forge STD STD invariant

5384
03:33:46,859 --> 03:33:49,620
dot Sol that's contract invarian test

5385
03:33:49,620 --> 03:33:52,319
and then we're going to say this is STD

5386
03:33:52,319 --> 03:33:55,200
invariant and its test

5387
03:33:55,200 --> 03:33:57,479
so the STD invariant contract if we

5388
03:33:57,479 --> 03:34:00,060
click into it it has all this stuff that

5389
03:34:00,060 --> 03:34:01,680
we're going to need to work with the

5390
03:34:01,680 --> 03:34:03,300
invariance one of the most important

5391
03:34:03,300 --> 03:34:05,040
functions that it gives us is this

5392
03:34:05,040 --> 03:34:08,160
Target contract where it says hey this

5393
03:34:08,160 --> 03:34:10,380
is the contract I want you to call all

5394
03:34:10,380 --> 03:34:13,739
these random functions on okay right now

5395
03:34:13,739 --> 03:34:15,540
just like our normal tests we're going

5396
03:34:15,540 --> 03:34:19,260
to have a function setup external like

5397
03:34:19,260 --> 03:34:21,239
this and we're going to set up some

5398
03:34:21,239 --> 03:34:23,100
stuff right a lot of this is going to

5399
03:34:23,100 --> 03:34:25,200
look similar to our unit tests so we're

5400
03:34:25,200 --> 03:34:29,899
going to have to import deploy DSC from

5401
03:34:29,899 --> 03:34:33,540
dot dot slash dot dot slash script slash

5402
03:34:33,540 --> 03:34:35,120
deploy

5403
03:34:35,120 --> 03:34:43,700
DSC dot s dot Sol import d s c e engine

5404
03:34:44,300 --> 03:34:47,120
SRC slash

5405
03:34:47,120 --> 03:34:51,479
DSC engine dotsoul like this

5406
03:34:51,479 --> 03:34:52,979
and we'll say

5407
03:34:52,979 --> 03:34:58,500
the deploy DSC deployer deployer

5408
03:34:58,500 --> 03:35:00,540
lawyer equals new

5409
03:35:00,540 --> 03:35:03,479
deploy DSC and then of course

5410
03:35:03,479 --> 03:35:08,359
BC engine dsce dsce equals

5411
03:35:08,359 --> 03:35:11,399
deployer dot run and this actually

5412
03:35:11,399 --> 03:35:13,680
returns a whole bunch of stuff

5413
03:35:13,680 --> 03:35:16,859
Central stablecoin DSE and helper config

5414
03:35:16,859 --> 03:35:19,140
so this is going to be we also need a

5415
03:35:19,140 --> 03:35:22,040
DSC so we're going to import that import

5416
03:35:22,040 --> 03:35:25,200
the centralized stablecoin from dot dot

5417
03:35:25,200 --> 03:35:27,779
slash dot slash SRC slash

5418
03:35:27,779 --> 03:35:29,819
centralizedible coin that's sole so

5419
03:35:29,819 --> 03:35:32,120
we're going to do central stablecoin DSC

5420
03:35:32,120 --> 03:35:34,880
and let's get the helper config as well

5421
03:35:34,880 --> 03:35:40,859
import helper config config from

5422
03:35:40,859 --> 03:35:44,040
dot dot slash dot slash script

5423
03:35:44,040 --> 03:35:47,939
slash helperconfig dot s dot sole upper

5424
03:35:47,939 --> 03:35:51,180
config config right and so this turns

5425
03:35:51,180 --> 03:35:55,260
the DSC dsce and config equals

5426
03:35:55,260 --> 03:35:58,739
deployer.run right and now if we were

5427
03:35:58,739 --> 03:36:00,540
doing this open testing methodology

5428
03:36:00,540 --> 03:36:02,279
right if we go back to the docs here

5429
03:36:02,279 --> 03:36:04,080
we're doing this open testing

5430
03:36:04,080 --> 03:36:06,960
methodology we could kind of finish this

5431
03:36:06,960 --> 03:36:08,220
right now

5432
03:36:08,220 --> 03:36:10,979
what we would do is we would say Target

5433
03:36:10,979 --> 03:36:12,720
contract

5434
03:36:12,720 --> 03:36:14,160
address

5435
03:36:14,160 --> 03:36:18,359
dsce like this paste this in here and

5436
03:36:18,359 --> 03:36:20,580
then just by adding this we're telling

5437
03:36:20,580 --> 03:36:23,100
Foundry hey go ahead go wild on this

5438
03:36:23,100 --> 03:36:25,260
right go absolutely wild in this and

5439
03:36:25,260 --> 03:36:27,180
actually let's even rename this call

5440
03:36:27,180 --> 03:36:27,960
this

5441
03:36:27,960 --> 03:36:29,960
open

5442
03:36:29,960 --> 03:36:32,660
invariantest.t.sol open

5443
03:36:32,660 --> 03:36:34,620
invariantest.tt.sol so we'll say

5444
03:36:34,620 --> 03:36:36,840
absolutely Go Buck Wild on this and now

5445
03:36:36,840 --> 03:36:38,760
we can add our invariant right we'll say

5446
03:36:38,760 --> 03:36:39,739
function

5447
03:36:39,739 --> 03:36:44,359
invariant variant underscore protocol

5448
03:36:44,359 --> 03:36:48,660
must must have more value

5449
03:36:48,660 --> 03:36:52,200
than total Supply this will be a view

5450
03:36:52,200 --> 03:36:55,859
function and what we can just say is we

5451
03:36:55,859 --> 03:37:01,080
want to get the value of the of all the

5452
03:37:01,080 --> 03:37:03,300
lateral in the protocol

5453
03:37:03,300 --> 03:37:04,739
compare it

5454
03:37:04,739 --> 03:37:08,160
to all the debt or the DSC

5455
03:37:08,160 --> 03:37:10,140
so we can do that pretty easily by using

5456
03:37:10,140 --> 03:37:12,540
the collaterals itself right using our

5457
03:37:12,540 --> 03:37:15,800
helper config we'll say helper

5458
03:37:15,800 --> 03:37:20,399
config.active Network config we can get

5459
03:37:20,399 --> 03:37:22,859
the what does this one do again let's

5460
03:37:22,859 --> 03:37:25,020
open up the helper config we can get

5461
03:37:25,020 --> 03:37:26,819
these two tokens and just say okay well

5462
03:37:26,819 --> 03:37:28,620
what's the balance of these two tokens

5463
03:37:28,620 --> 03:37:31,140
in our DSC engine and then what's their

5464
03:37:31,140 --> 03:37:33,300
value right so we'll just get those two

5465
03:37:33,300 --> 03:37:34,800
tokens we're going to do nothing nothing

5466
03:37:34,800 --> 03:37:38,160
with Bitcoin nothing so we'll do blank

5467
03:37:38,160 --> 03:37:42,600
blank weft BTC nothing and then those

5468
03:37:42,600 --> 03:37:46,979
are erc20s so we'll import import

5469
03:37:46,979 --> 03:37:51,000
I erc20 from

5470
03:37:51,000 --> 03:37:53,760
all right cool that looks good

5471
03:37:53,760 --> 03:37:58,680
it's also erc20 West irc20 BTC this is

5472
03:37:58,680 --> 03:38:02,460
raft BTC ramped BTC oops sorry this is

5473
03:38:02,460 --> 03:38:05,939
config that Active network config we

5474
03:38:05,939 --> 03:38:09,140
need to wrap this our erc20

5475
03:38:09,140 --> 03:38:13,560
irc20 like this what am I messing up oh

5476
03:38:13,560 --> 03:38:16,260
let's do do address weft then address

5477
03:38:16,260 --> 03:38:18,600
BTC

5478
03:38:18,600 --> 03:38:21,060
like this all right cool so we're

5479
03:38:21,060 --> 03:38:23,279
getting weth in Bitcoin it's gonna be

5480
03:38:23,279 --> 03:38:25,260
wrapped eth and wrapped Bitcoin and now

5481
03:38:25,260 --> 03:38:26,399
what we can do

5482
03:38:26,399 --> 03:38:29,520
is first we'll say you went to 256 total

5483
03:38:29,520 --> 03:38:34,739
Supply equals DSC dot total Supply so

5484
03:38:34,739 --> 03:38:37,260
this is the total supply of all DSC in

5485
03:38:37,260 --> 03:38:39,120
the entire world right and we know the

5486
03:38:39,120 --> 03:38:41,279
only way to Mint DSC is through the DSC

5487
03:38:41,279 --> 03:38:43,620
engine so through people depositing and

5488
03:38:43,620 --> 03:38:45,540
withdrawing collateral now what we can

5489
03:38:45,540 --> 03:38:47,399
do is we can say okay let's get the U

5490
03:38:47,399 --> 03:38:49,080
into 256

5491
03:38:49,080 --> 03:38:52,560
total total width deposited

5492
03:38:52,560 --> 03:38:54,000
equals

5493
03:38:54,000 --> 03:38:57,420
and this is where we can do ier C20 West

5494
03:38:57,420 --> 03:39:02,100
dot balance of address DSC so this is

5495
03:39:02,100 --> 03:39:04,220
going to be the total amount of weft

5496
03:39:04,220 --> 03:39:07,800
deposited into that contract or just the

5497
03:39:07,800 --> 03:39:09,540
total amount of weth sent to that

5498
03:39:09,540 --> 03:39:10,620
contract

5499
03:39:10,620 --> 03:39:14,460
and we're going to say un256 total BTC D

5500
03:39:14,460 --> 03:39:16,939
posited equals

5501
03:39:16,939 --> 03:39:20,880
irc20 wrapped BTC Dot

5502
03:39:20,880 --> 03:39:24,660
balance of address DSC so we have the

5503
03:39:24,660 --> 03:39:26,760
total Wes total Bitcoin

5504
03:39:26,760 --> 03:39:28,680
now we can get those values we can say

5505
03:39:28,680 --> 03:39:33,600
unit 256 weth value equals we have a

5506
03:39:33,600 --> 03:39:35,880
function here called get USD value or we

5507
03:39:35,880 --> 03:39:37,859
can get the USD value of any token of

5508
03:39:37,859 --> 03:39:39,300
any amount so we're just going to use

5509
03:39:39,300 --> 03:39:40,319
that

5510
03:39:40,319 --> 03:39:42,680
with value is going to be

5511
03:39:42,680 --> 03:39:47,040
dsce.getusd value weth and the total

5512
03:39:47,040 --> 03:39:51,239
width deposited un256 wrapped BTC value

5513
03:39:51,239 --> 03:39:54,600
same thing get USD value rap b2c total

5514
03:39:54,600 --> 03:39:58,560
BTC deposited and now what we can do is

5515
03:39:58,560 --> 03:40:00,660
we can do

5516
03:40:00,660 --> 03:40:05,580
assert the width Value Plus the wrapped

5517
03:40:05,580 --> 03:40:07,859
Bitcoin value is greater than the total

5518
03:40:07,859 --> 03:40:11,100
Supply and this is all we would need to

5519
03:40:11,100 --> 03:40:11,819
do

5520
03:40:11,819 --> 03:40:14,640
for this open testing this open

5521
03:40:14,640 --> 03:40:18,420
invariance that's it we're done boom and

5522
03:40:18,420 --> 03:40:20,040
this is why this is the easiest type of

5523
03:40:20,040 --> 03:40:22,380
invariant test but you'll see

5524
03:40:22,380 --> 03:40:24,540
running this we won't get great results

5525
03:40:24,540 --> 03:40:26,760
so let's do Forge test.m

5526
03:40:26,760 --> 03:40:28,739
and now what this is going to do is it's

5527
03:40:28,739 --> 03:40:31,380
going to call all types of functions

5528
03:40:31,380 --> 03:40:35,160
on our DSE and try to break this

5529
03:40:35,160 --> 03:40:37,920
invariant so it looks like

5530
03:40:37,920 --> 03:40:40,739
it was able to break this really easily

5531
03:40:40,739 --> 03:40:42,720
so let's clear this and we'll add our

5532
03:40:42,720 --> 03:40:45,660
Dash VV VV

5533
03:40:45,660 --> 03:40:49,760
we'll see what's up

5534
03:40:52,020 --> 03:40:54,840
yep yep assertion violated we're having

5535
03:40:54,840 --> 03:40:57,120
a hard time actually seeing the numbers

5536
03:40:57,120 --> 03:40:59,880
so we're going to import console in here

5537
03:40:59,880 --> 03:41:02,100
test console

5538
03:41:02,100 --> 03:41:04,560
and we're just going to say

5539
03:41:04,560 --> 03:41:07,140
console DOT log

5540
03:41:07,140 --> 03:41:08,760
width value

5541
03:41:08,760 --> 03:41:10,380
semicolon

5542
03:41:10,380 --> 03:41:12,060
with value

5543
03:41:12,060 --> 03:41:16,319
or that's rapid BTC Wes Wes graph BTC

5544
03:41:16,319 --> 03:41:17,540
value

5545
03:41:17,540 --> 03:41:19,140
console.log

5546
03:41:19,140 --> 03:41:21,180
total Supply total Supply

5547
03:41:21,180 --> 03:41:25,399
let's run this again now what do we get

5548
03:41:25,560 --> 03:41:27,840
well we got our first issue is that

5549
03:41:27,840 --> 03:41:30,660
these are all zeros right and if they're

5550
03:41:30,660 --> 03:41:32,160
all zeros then

5551
03:41:32,160 --> 03:41:34,739
this doesn't hold so we can do greater

5552
03:41:34,739 --> 03:41:37,140
than or equal to this is kind of a bit

5553
03:41:37,140 --> 03:41:39,060
of a cop-out right because if they're

5554
03:41:39,060 --> 03:41:41,580
equal that makes us nervous but it's

5555
03:41:41,580 --> 03:41:43,080
fine right we should always at least

5556
03:41:43,080 --> 03:41:44,939
have more collateral in the system than

5557
03:41:44,939 --> 03:41:47,279
total Supply so now let's try again run

5558
03:41:47,279 --> 03:41:48,420
this test again

5559
03:41:48,420 --> 03:41:50,160
file it runs successful

5560
03:41:50,160 --> 03:41:53,640
and we get hey you pass there's no way

5561
03:41:53,640 --> 03:41:55,680
for us to make it such that the total

5562
03:41:55,680 --> 03:41:59,340
Supply is lower so this is awesome right

5563
03:41:59,340 --> 03:42:00,960
well

5564
03:42:00,960 --> 03:42:02,399
it's not that awesome

5565
03:42:02,399 --> 03:42:04,260
we didn't find any issues and we're

5566
03:42:04,260 --> 03:42:06,420
looking to find issues so maybe we need

5567
03:42:06,420 --> 03:42:08,760
to bump up the number of runs and we

5568
03:42:08,760 --> 03:42:10,920
need to bump it up to a thousand

5569
03:42:10,920 --> 03:42:13,500
and let's run this again now you're

5570
03:42:13,500 --> 03:42:15,420
going to see this is going to take a lot

5571
03:42:15,420 --> 03:42:17,460
longer because before I was doing 100

5572
03:42:17,460 --> 03:42:20,279
runs at 128 depth now let's do a

5573
03:42:20,279 --> 03:42:22,500
thousand runs in each one of these runs

5574
03:42:22,500 --> 03:42:25,859
has 128 so it took a lot longer and you

5575
03:42:25,859 --> 03:42:26,819
can see

5576
03:42:26,819 --> 03:42:29,420
that it took 14 seconds as opposed to

5577
03:42:29,420 --> 03:42:32,760
what did it do before with 128 we run

5578
03:42:32,760 --> 03:42:34,939
that

5579
03:42:36,300 --> 03:42:38,700
it did it in one half seconds

5580
03:42:38,700 --> 03:42:40,979
but if we look up here on this line this

5581
03:42:40,979 --> 03:42:42,779
line is incredibly important we have

5582
03:42:42,779 --> 03:42:45,840
calls and we have reverts so this made

5583
03:42:45,840 --> 03:42:49,800
16 384 calls and reverted sixteen

5584
03:42:49,800 --> 03:42:51,779
thousand three hundred eighty four times

5585
03:42:51,779 --> 03:42:54,120
so basically it wasn't even able to do

5586
03:42:54,120 --> 03:42:57,000
anything right so what if we bump this

5587
03:42:57,000 --> 03:42:59,040
up to a thousand clear

5588
03:42:59,040 --> 03:43:00,180
run this

5589
03:43:00,180 --> 03:43:01,739
we're gonna have to wait a few more

5590
03:43:01,739 --> 03:43:04,160
seconds again

5591
03:43:06,540 --> 03:43:08,520
oh

5592
03:43:08,520 --> 03:43:10,800
so it did this many calls and it also

5593
03:43:10,800 --> 03:43:12,720
reverted this many times

5594
03:43:12,720 --> 03:43:15,239
and the reason that this is still saying

5595
03:43:15,239 --> 03:43:16,979
pass though is because we have this

5596
03:43:16,979 --> 03:43:19,560
fail-on revert equals false

5597
03:43:19,560 --> 03:43:21,960
and this failover equals false has some

5598
03:43:21,960 --> 03:43:24,960
pros and it has some cons

5599
03:43:24,960 --> 03:43:27,840
Pro of fail in Reverse equals false is

5600
03:43:27,840 --> 03:43:30,779
that we can very quickly write open

5601
03:43:30,779 --> 03:43:33,300
testing functions like this and we can

5602
03:43:33,300 --> 03:43:35,040
very quickly write

5603
03:43:35,040 --> 03:43:36,899
minimal Handler functions that aren't

5604
03:43:36,899 --> 03:43:39,180
perfect but the downside is it's hard

5605
03:43:39,180 --> 03:43:41,460
for us to make sure that all the calls

5606
03:43:41,460 --> 03:43:43,560
we're making actually make sense right

5607
03:43:43,560 --> 03:43:46,739
because this could be calling on our on

5608
03:43:46,739 --> 03:43:48,960
our engine maybe it's just trying to to

5609
03:43:48,960 --> 03:43:51,120
deposit collateral but it keeps using

5610
03:43:51,120 --> 03:43:52,920
random collateral out addresses that

5611
03:43:52,920 --> 03:43:54,180
don't make any sense so maybe it's

5612
03:43:54,180 --> 03:43:57,060
calling this 128

5613
03:43:57,060 --> 03:43:59,399
000 times with 128 different collateral

5614
03:43:59,399 --> 03:44:02,939
addresses but only two work right so

5615
03:44:02,939 --> 03:44:05,939
doing like this is cool for kind of some

5616
03:44:05,939 --> 03:44:07,319
Sandy check and maybe it'll catch

5617
03:44:07,319 --> 03:44:08,880
something but it seems like it's not

5618
03:44:08,880 --> 03:44:10,979
actually catching anything right and

5619
03:44:10,979 --> 03:44:13,260
that's not a very good use of this so

5620
03:44:13,260 --> 03:44:16,200
revert on false is fantastic for quick

5621
03:44:16,200 --> 03:44:18,600
tests and often if I'm doing a

5622
03:44:18,600 --> 03:44:20,760
competitive audit which you can learn

5623
03:44:20,760 --> 03:44:23,460
more about in the security course coming

5624
03:44:23,460 --> 03:44:25,439
out soon hopefully

5625
03:44:25,439 --> 03:44:27,239
if I'm doing competitive audit a lot of

5626
03:44:27,239 --> 03:44:29,160
times I will have revert on false be

5627
03:44:29,160 --> 03:44:32,160
false just so I can write up and very

5628
03:44:32,160 --> 03:44:34,859
tests quickly I will also write handlers

5629
03:44:34,859 --> 03:44:37,680
as well like mini handlers just so I

5630
03:44:37,680 --> 03:44:39,000
don't have to get every nook and cranny

5631
03:44:39,000 --> 03:44:40,920
but I still will write a Handler so I

5632
03:44:40,920 --> 03:44:43,560
can narrow down some of the functions

5633
03:44:43,560 --> 03:44:46,620
but this open invariant seems to have

5634
03:44:46,620 --> 03:44:48,120
this major flaw where it's probably

5635
03:44:48,120 --> 03:44:52,140
making a bunch of silly calls so this is

5636
03:44:52,140 --> 03:44:54,660
great for very small contracts but the

5637
03:44:54,660 --> 03:44:56,100
more complex you get like our system

5638
03:44:56,100 --> 03:44:59,460
here this open invariant system it

5639
03:44:59,460 --> 03:45:00,660
probably doesn't make sense for us to do

5640
03:45:00,660 --> 03:45:01,680
because it's not going to catch anything

5641
03:45:01,680 --> 03:45:03,720
it's just going to keep breaking now if

5642
03:45:03,720 --> 03:45:06,239
we set this to true we open this back up

5643
03:45:06,239 --> 03:45:09,600
we run this again you'll see

5644
03:45:09,600 --> 03:45:12,060
exactly one of the calls it makes that

5645
03:45:12,060 --> 03:45:14,580
breaks so it looks like it called redeem

5646
03:45:14,580 --> 03:45:17,460
collateral for you for DSC this is the

5647
03:45:17,460 --> 03:45:18,840
first function call it made which

5648
03:45:18,840 --> 03:45:20,279
obviously doesn't make any sense because

5649
03:45:20,279 --> 03:45:21,840
you can't redeem any collateral unless

5650
03:45:21,840 --> 03:45:23,880
you have deposited collateral you can

5651
03:45:23,880 --> 03:45:25,560
just and you can see the args it put in

5652
03:45:25,560 --> 03:45:27,840
it put in some random address some

5653
03:45:27,840 --> 03:45:30,920
random amount a random amount and then

5654
03:45:30,920 --> 03:45:34,680
another random number right and you'll

5655
03:45:34,680 --> 03:45:37,380
see we can call this many times and

5656
03:45:37,380 --> 03:45:39,239
it'll keep giving us different places

5657
03:45:39,239 --> 03:45:41,399
that it ran into issues when we say

5658
03:45:41,399 --> 03:45:44,100
revert on false is true this can give us

5659
03:45:44,100 --> 03:45:47,460
some peace of mind knowing that if this

5660
03:45:47,460 --> 03:45:49,500
test passes that means all of the

5661
03:45:49,500 --> 03:45:51,060
transactions that went through actually

5662
03:45:51,060 --> 03:45:53,100
went through and it didn't make a bunch

5663
03:45:53,100 --> 03:45:54,899
of really dumb calls here right so here

5664
03:45:54,899 --> 03:45:57,359
fail on revert was false we called

5665
03:45:57,359 --> 03:45:59,819
liquidate first which obviously doesn't

5666
03:45:59,819 --> 03:46:02,700
make any sense with this with some

5667
03:46:02,700 --> 03:46:04,680
horrible random address some horrible

5668
03:46:04,680 --> 03:46:06,540
random address some random amount right

5669
03:46:06,540 --> 03:46:08,700
none of these make any sense we call it

5670
03:46:08,700 --> 03:46:11,100
again we we failed again it called

5671
03:46:11,100 --> 03:46:13,020
deposit collateral mint DSE which is

5672
03:46:13,020 --> 03:46:14,160
good all right so we're trying to

5673
03:46:14,160 --> 03:46:15,779
deposit collateral but it used some

5674
03:46:15,779 --> 03:46:18,359
random address that isn't approved some

5675
03:46:18,359 --> 03:46:20,880
horrible amounts here and it just keeps

5676
03:46:20,880 --> 03:46:23,340
failing right so we want to try to

5677
03:46:23,340 --> 03:46:24,899
prevent and you can see here in the call

5678
03:46:24,899 --> 03:46:27,840
summary it made one run one call and

5679
03:46:27,840 --> 03:46:31,020
that call reverted right so we want to

5680
03:46:31,020 --> 03:46:33,660
narrow this down to say to try to point

5681
03:46:33,660 --> 03:46:36,420
our fuzz our random runs in a direction

5682
03:46:36,420 --> 03:46:38,399
that makes a lot more sense

5683
03:46:38,399 --> 03:46:40,620
right so this is cool

5684
03:46:40,620 --> 03:46:43,380
not great opening variance I'm just now

5685
03:46:43,380 --> 03:46:45,120
going to comment out this whole page

5686
03:46:45,120 --> 03:46:46,140
because

5687
03:46:46,140 --> 03:46:47,760
we're not going to use this anymore okay

5688
03:46:47,760 --> 03:46:49,380
we're going to leave the file in here

5689
03:46:49,380 --> 03:46:50,700
though we're gonna create a new file

5690
03:46:50,700 --> 03:46:51,899
though we're going to call this

5691
03:46:51,899 --> 03:46:53,640
invariance

5692
03:46:53,640 --> 03:46:56,160
T dot Sol I am going to copy this whole

5693
03:46:56,160 --> 03:46:57,420
invariance thing

5694
03:46:57,420 --> 03:46:59,340
based in here and uncommon it and we're

5695
03:46:59,340 --> 03:47:01,260
going to level this up so that this

5696
03:47:01,260 --> 03:47:03,060
invariance file actually let's just call

5697
03:47:03,060 --> 03:47:05,279
this invariance

5698
03:47:05,279 --> 03:47:07,500
so that this new one is using this

5699
03:47:07,500 --> 03:47:09,660
Handler method it's using this Handler

5700
03:47:09,660 --> 03:47:12,420
method to narrow down the function calls

5701
03:47:12,420 --> 03:47:14,760
and we'll do a mix of setting this to

5702
03:47:14,760 --> 03:47:16,739
true and false and you'll see where some

5703
03:47:16,739 --> 03:47:20,479
of the advantages and disadvantages are

5704
03:47:22,500 --> 03:47:24,600
so we have our invariance file we have

5705
03:47:24,600 --> 03:47:26,939
our Target contract here but we want to

5706
03:47:26,939 --> 03:47:29,819
make sure we call this in a sensical

5707
03:47:29,819 --> 03:47:34,260
order for example hey don't call redeem

5708
03:47:34,260 --> 03:47:38,460
collateral unless there is collateral to

5709
03:47:38,460 --> 03:47:41,340
redeem right maybe we want to set this

5710
03:47:41,340 --> 03:47:43,160
up so we're going to create a Handler

5711
03:47:43,160 --> 03:47:45,840
which is going to handle the way we

5712
03:47:45,840 --> 03:47:47,939
actually make calls to the dsce

5713
03:47:47,939 --> 03:47:49,680
so it's basically going to instead of us

5714
03:47:49,680 --> 03:47:51,239
just randomly calling redeem collateral

5715
03:47:51,239 --> 03:47:52,620
we're only going to be able to call

5716
03:47:52,620 --> 03:47:54,479
redeem collateral if there is collateral

5717
03:47:54,479 --> 03:47:55,920
to redeem right because otherwise the

5718
03:47:55,920 --> 03:47:57,239
transaction is just going to revert and

5719
03:47:57,239 --> 03:47:59,580
that's a waste of function call so now

5720
03:47:59,580 --> 03:48:01,620
we're going to create this Handler and

5721
03:48:01,620 --> 03:48:04,200
instead of our Target contract being the

5722
03:48:04,200 --> 03:48:06,420
dsce our Target contract is going to be

5723
03:48:06,420 --> 03:48:09,060
this Handler which handles the way we

5724
03:48:09,060 --> 03:48:11,580
make those calls okay so we're going to

5725
03:48:11,580 --> 03:48:15,060
do spdx license identifier MIT as you

5726
03:48:15,060 --> 03:48:19,580
already know fragma zero solidity

5727
03:48:19,580 --> 03:48:23,640
0.818 a little carrot contract

5728
03:48:23,640 --> 03:48:26,700
Handler like this and then we're going

5729
03:48:26,700 --> 03:48:29,040
to say this contract Handler is going to

5730
03:48:29,040 --> 03:48:31,620
be test as well and this is definitely

5731
03:48:31,620 --> 03:48:34,620
some Advanced code here so don't get too

5732
03:48:34,620 --> 03:48:36,300
discouraged if it doesn't make sense or

5733
03:48:36,300 --> 03:48:38,399
if it's hard the first time okay so

5734
03:48:38,399 --> 03:48:39,720
we're going to import

5735
03:48:39,720 --> 03:48:40,800
test

5736
03:48:40,800 --> 03:48:45,180
from Forge STD slash test.soul

5737
03:48:45,180 --> 03:48:46,979
remember to ask questions and use the

5738
03:48:46,979 --> 03:48:49,620
forms so what's one of the first things

5739
03:48:49,620 --> 03:48:51,359
you want to do hey don't call redeem

5740
03:48:51,359 --> 03:48:52,739
collateral unless there is even

5741
03:48:52,739 --> 03:48:54,420
collateral to redeem right we want to

5742
03:48:54,420 --> 03:48:55,920
make sure that that's this is a valid

5743
03:48:55,920 --> 03:48:58,439
run hey only call redeem collateral when

5744
03:48:58,439 --> 03:49:01,920
there is collateral in there so this

5745
03:49:01,920 --> 03:49:04,200
function this contract is going to do

5746
03:49:04,200 --> 03:49:06,420
that for us we do need to make a

5747
03:49:06,420 --> 03:49:07,620
Constructor though

5748
03:49:07,620 --> 03:49:11,939
so that this Handler contract knows what

5749
03:49:11,939 --> 03:49:14,819
the DSC engine even is right because

5750
03:49:14,819 --> 03:49:16,080
it's going to be the one making the

5751
03:49:16,080 --> 03:49:18,000
calls to it so we do need to import the

5752
03:49:18,000 --> 03:49:22,620
DSC engine from dot dot slash dot slash

5753
03:49:22,620 --> 03:49:26,520
SRC dscng.sol we also need to import the

5754
03:49:26,520 --> 03:49:28,859
decentralized stablecoin from the

5755
03:49:28,859 --> 03:49:31,140
decentralized stablecoin.sol construct

5756
03:49:31,140 --> 03:49:33,239
door and these are going to be the main

5757
03:49:33,239 --> 03:49:35,279
functions these are going to be the main

5758
03:49:35,279 --> 03:49:36,720
contracts that our Handler is going to

5759
03:49:36,720 --> 03:49:39,660
call so we're going to say dscn.dsce and

5760
03:49:39,660 --> 03:49:40,920
then we're going to say decentral and

5761
03:49:40,920 --> 03:49:43,739
stablecoin DSC and in the Constructor

5762
03:49:43,739 --> 03:49:46,380
here we're going to say DSC engine

5763
03:49:46,380 --> 03:49:49,560
underscore DSC engine

5764
03:49:49,560 --> 03:49:51,660
and essentially stablecoin

5765
03:49:51,660 --> 03:49:54,300
underscore DSC and then we're just going

5766
03:49:54,300 --> 03:49:58,140
to say oh cool it already added dsce DSC

5767
03:49:58,140 --> 03:50:01,020
engine DSC it's underscore DSC

5768
03:50:01,020 --> 03:50:02,520
so because these are the contracts that

5769
03:50:02,520 --> 03:50:04,859
we want the Handler to handle making the

5770
03:50:04,859 --> 03:50:09,060
calls to Great makes sense so let's talk

5771
03:50:09,060 --> 03:50:11,819
about this redeem collateral right let's

5772
03:50:11,819 --> 03:50:14,220
just focus on on making this not revert

5773
03:50:14,220 --> 03:50:16,560
so we're going to say okay call this

5774
03:50:16,560 --> 03:50:18,300
when you have collateral so the first

5775
03:50:18,300 --> 03:50:20,880
thing we probably need to do is what if

5776
03:50:20,880 --> 03:50:23,279
I deposit collateral right so we'll

5777
03:50:23,279 --> 03:50:24,420
create a function

5778
03:50:24,420 --> 03:50:26,399
called deposit

5779
03:50:26,399 --> 03:50:28,140
the lateral

5780
03:50:28,140 --> 03:50:29,640
and this function is going to look a

5781
03:50:29,640 --> 03:50:32,520
little different than the deposit

5782
03:50:32,520 --> 03:50:34,200
collateral in the DSC engine right if

5783
03:50:34,200 --> 03:50:36,180
we're looking here this is what it does

5784
03:50:36,180 --> 03:50:38,460
but we're going to set this deposit

5785
03:50:38,460 --> 03:50:40,680
collateral function up in our Handler so

5786
03:50:40,680 --> 03:50:42,720
that this transaction always goes

5787
03:50:42,720 --> 03:50:44,760
through right it doesn't revert but we

5788
03:50:44,760 --> 03:50:46,680
do want to keep the randomization right

5789
03:50:46,680 --> 03:50:49,500
we want to deposit random collaterals

5790
03:50:49,500 --> 03:50:51,899
that are valid collaterals so what we

5791
03:50:51,899 --> 03:50:53,840
can do is we can create a unit 256

5792
03:50:53,840 --> 03:50:58,200
collateral seed and a unit 256 amount

5793
03:50:58,200 --> 03:50:59,460
collateral

5794
03:50:59,460 --> 03:51:01,859
collat or all and this is actually

5795
03:51:01,859 --> 03:51:04,500
really similar to the fuzz tests so in

5796
03:51:04,500 --> 03:51:07,140
your handlers whatever parameters you

5797
03:51:07,140 --> 03:51:09,420
have are going to be randomized so we're

5798
03:51:09,420 --> 03:51:11,580
going to pick a random one of the valid

5799
03:51:11,580 --> 03:51:13,380
collaterals to deposit and we're going

5800
03:51:13,380 --> 03:51:15,300
to pick a random amount of collateral

5801
03:51:15,300 --> 03:51:17,520
now I'm going to write this function

5802
03:51:17,520 --> 03:51:20,580
without any guard rails and it's going

5803
03:51:20,580 --> 03:51:22,020
to break and that's okay we're going to

5804
03:51:22,020 --> 03:51:24,479
fix it as we go along but if we were to

5805
03:51:24,479 --> 03:51:27,359
just not have any guardrails on this at

5806
03:51:27,359 --> 03:51:30,000
all we would just say DSC e dot the

5807
03:51:30,000 --> 03:51:33,660
posit collateral

5808
03:51:34,439 --> 03:51:38,160
and we would do you know collateral and

5809
03:51:38,160 --> 03:51:40,080
an amount collateral we could actually

5810
03:51:40,080 --> 03:51:42,300
just have this be address

5811
03:51:42,300 --> 03:51:43,739
collateral

5812
03:51:43,739 --> 03:51:45,779
an amount collateral we'd say deposit

5813
03:51:45,779 --> 03:51:49,380
this collateral and amount collateral

5814
03:51:49,380 --> 03:51:51,540
and this of course is probably going to

5815
03:51:51,540 --> 03:51:53,399
break a lot right because the collateral

5816
03:51:53,399 --> 03:51:54,660
we're going to pass is going to be wrong

5817
03:51:54,660 --> 03:51:56,279
this is a random address there are so

5818
03:51:56,279 --> 03:51:58,020
many addresses and the amount of

5819
03:51:58,020 --> 03:51:59,279
collateral could also break because

5820
03:51:59,279 --> 03:52:01,500
deposit collateral reverts on zero right

5821
03:52:01,500 --> 03:52:04,200
but I do want to show you what we're

5822
03:52:04,200 --> 03:52:05,939
actually going to do in our

5823
03:52:05,939 --> 03:52:08,939
actual contract here instead of having

5824
03:52:08,939 --> 03:52:12,779
our Target contract be the dsce what

5825
03:52:12,779 --> 03:52:13,979
we're going to do is we're going to say

5826
03:52:13,979 --> 03:52:15,840
Handler because we're going to import

5827
03:52:15,840 --> 03:52:17,540
this Handler so we're going to import

5828
03:52:17,540 --> 03:52:21,680
Handler from dot slash

5829
03:52:21,680 --> 03:52:25,140
handler.t.sol Handler Handler we're

5830
03:52:25,140 --> 03:52:29,040
going to say Handler equals new Handler

5831
03:52:29,040 --> 03:52:32,279
the SCE and DSC and now we're going to

5832
03:52:32,279 --> 03:52:34,920
say our targets contract is just the

5833
03:52:34,920 --> 03:52:37,859
Handler okay that's gonna be the address

5834
03:52:37,859 --> 03:52:40,979
Handler now with this the Handler only

5835
03:52:40,979 --> 03:52:42,840
has this one function

5836
03:52:42,840 --> 03:52:44,700
so we're going to call deposit

5837
03:52:44,700 --> 03:52:46,560
collateral through the Handler which is

5838
03:52:46,560 --> 03:52:48,720
going to call our engine and since this

5839
03:52:48,720 --> 03:52:50,819
is the only function for it to call

5840
03:52:50,819 --> 03:52:52,739
this is all we're going to see if we see

5841
03:52:52,739 --> 03:52:54,840
our invariance break so if I do Forge

5842
03:52:54,840 --> 03:52:57,420
test Dash M paste this in we're gonna

5843
03:52:57,420 --> 03:53:00,500
see it break almost instantly

5844
03:53:00,960 --> 03:53:02,760
with an issue but it's only going to be

5845
03:53:02,760 --> 03:53:04,200
deposit collateral because it's the only

5846
03:53:04,200 --> 03:53:06,420
function that we have right we run it

5847
03:53:06,420 --> 03:53:08,040
again it's still going to be deposit

5848
03:53:08,040 --> 03:53:09,060
collateral because that's the only

5849
03:53:09,060 --> 03:53:12,840
function the Handler has yes makes sense

5850
03:53:12,840 --> 03:53:15,840
okay cool hopefully it makes sense in

5851
03:53:15,840 --> 03:53:18,060
our foundry.tamil we could say fail on

5852
03:53:18,060 --> 03:53:20,819
revert is false we could run this again

5853
03:53:20,819 --> 03:53:22,979
let's make this a little bit lower 128

5854
03:53:22,979 --> 03:53:25,500
and let's see if we get any valid runs

5855
03:53:25,500 --> 03:53:28,319
right let's see if we pick miraculously

5856
03:53:28,319 --> 03:53:32,340
a valid address and we get success but

5857
03:53:32,340 --> 03:53:34,200
oh it looks like we did do some valid

5858
03:53:34,200 --> 03:53:36,600
ones but we've got a ton of reverts here

5859
03:53:36,600 --> 03:53:38,340
we've got so many reverts here that

5860
03:53:38,340 --> 03:53:40,500
almost half of these runs almost half of

5861
03:53:40,500 --> 03:53:42,779
these calls were bad that's not a great

5862
03:53:42,779 --> 03:53:45,540
use of our and this isn't really super

5863
03:53:45,540 --> 03:53:47,700
helpful because of course

5864
03:53:47,700 --> 03:53:49,200
of course our invariant here is going to

5865
03:53:49,200 --> 03:53:50,520
hold because the only thing we've

5866
03:53:50,520 --> 03:53:52,140
allowed our system to do is deposit

5867
03:53:52,140 --> 03:53:55,560
collateral right ridiculous so if we

5868
03:53:55,560 --> 03:53:57,180
turn this back to true

5869
03:53:57,180 --> 03:54:00,060
we run this again we're of course going

5870
03:54:00,060 --> 03:54:01,319
to break now because some of these

5871
03:54:01,319 --> 03:54:03,899
deposits are going to fail right so

5872
03:54:03,899 --> 03:54:07,260
looks like if we call deposit collateral

5873
03:54:07,260 --> 03:54:09,840
with some horrible address it fails

5874
03:54:09,840 --> 03:54:11,700
right so that's one of the first things

5875
03:54:11,700 --> 03:54:14,640
we want to to have our handler do we

5876
03:54:14,640 --> 03:54:16,080
want to say hey you're only allowed to

5877
03:54:16,080 --> 03:54:18,899
deposit valid collateral so what we can

5878
03:54:18,899 --> 03:54:21,180
do in our Handler is we can set that up

5879
03:54:21,180 --> 03:54:23,699
hey you're only allowed to deposit valid

5880
03:54:23,699 --> 03:54:26,040
collateral instead of passing any

5881
03:54:26,040 --> 03:54:28,439
address as collateral we'll say you and

5882
03:54:28,439 --> 03:54:31,140
256 collateral

5883
03:54:31,140 --> 03:54:33,300
seed okay

5884
03:54:33,300 --> 03:54:34,739
and what we're going to do with this

5885
03:54:34,739 --> 03:54:37,920
seed is we're going to have it pick from

5886
03:54:37,920 --> 03:54:39,540
our two collaterals we're going to have

5887
03:54:39,540 --> 03:54:43,260
it randomly pick either weft or BTC so

5888
03:54:43,260 --> 03:54:44,220
we're actually going to create a

5889
03:54:44,220 --> 03:54:45,000
function

5890
03:54:45,000 --> 03:54:46,680
helper functions

5891
03:54:46,680 --> 03:54:48,540
we're going to say function

5892
03:54:48,540 --> 03:54:51,840
underscore get collateral collateral

5893
03:54:51,840 --> 03:54:56,460
from seed unit 256 collateral seed

5894
03:54:56,460 --> 03:54:58,199
and we're going to make this a private

5895
03:54:58,199 --> 03:55:01,620
view function it's going to return an

5896
03:55:01,620 --> 03:55:04,199
Erse in iear C20 actually we're going to

5897
03:55:04,199 --> 03:55:07,380
do an erc20 Mock and I'll explain why in

5898
03:55:07,380 --> 03:55:08,640
a bit

5899
03:55:08,640 --> 03:55:11,520
we got to import that import here C20

5900
03:55:11,520 --> 03:55:15,439
mock from add open Zeppelin contracts

5901
03:55:15,439 --> 03:55:20,640
mocks slash what is it mock ERC no erc20

5902
03:55:20,640 --> 03:55:23,699
mock that's all cool and so what we're

5903
03:55:23,699 --> 03:55:25,560
going to do instead of this line is

5904
03:55:25,560 --> 03:55:27,899
we're going to use this line

5905
03:55:27,899 --> 03:55:29,939
this function to do it we're going to

5906
03:55:29,939 --> 03:55:31,500
say if

5907
03:55:31,500 --> 03:55:35,340
collateral collat or all

5908
03:55:35,340 --> 03:55:39,180
seed modulo 2 because we're only we only

5909
03:55:39,180 --> 03:55:41,640
have two collaterals equals equals zero

5910
03:55:41,640 --> 03:55:46,500
then return with we can get with

5911
03:55:46,500 --> 03:55:49,140
by sticking at the top we'll say erc20

5912
03:55:49,140 --> 03:55:51,180
Mach West

5913
03:55:51,180 --> 03:55:56,160
your C 20 mock wrapped Bitcoin

5914
03:55:56,160 --> 03:55:59,160
and right in our Constructor we can get

5915
03:55:59,160 --> 03:56:02,580
all of our collateral tokens the as I

5916
03:56:02,580 --> 03:56:04,020
made a function way down at the bottom

5917
03:56:04,020 --> 03:56:05,880
here called

5918
03:56:05,880 --> 03:56:08,819
yeah collateral tokens which Returns the

5919
03:56:08,819 --> 03:56:10,500
full array of collateral tokens if you

5920
03:56:10,500 --> 03:56:11,819
don't have this feel free to pause and

5921
03:56:11,819 --> 03:56:12,899
implement this

5922
03:56:12,899 --> 03:56:16,620
what we can do we can say address array

5923
03:56:16,620 --> 03:56:20,460
memory collateral collateral tokens

5924
03:56:20,460 --> 03:56:24,779
equals dsce dot get collateral tokens

5925
03:56:24,779 --> 03:56:28,620
like this and we can say wef is zero and

5926
03:56:28,620 --> 03:56:31,199
rat BTC is one so that's how we can get

5927
03:56:31,199 --> 03:56:33,899
those collateral tokens so Wes we're at

5928
03:56:33,899 --> 03:56:36,660
BTC if collateral C divided by 2 is 0

5929
03:56:36,660 --> 03:56:39,359
and return West otherwise return wrapped

5930
03:56:39,359 --> 03:56:42,420
BTC so now we have a function where we

5931
03:56:42,420 --> 03:56:45,479
can only get a valid

5932
03:56:45,479 --> 03:56:46,859
collateral type

5933
03:56:46,859 --> 03:56:48,420
so instead of just depositing any

5934
03:56:48,420 --> 03:56:50,899
collateral type we can say

5935
03:56:50,899 --> 03:56:53,120
erc20 Mach

5936
03:56:53,120 --> 03:56:56,279
colateral equals get collateral from

5937
03:56:56,279 --> 03:56:59,939
seed collateral seed and now we're still

5938
03:56:59,939 --> 03:57:02,460
depositing a random collateral but this

5939
03:57:02,460 --> 03:57:04,859
is oh it's going to be address

5940
03:57:04,859 --> 03:57:07,500
but this is a valid collateral address

5941
03:57:07,500 --> 03:57:09,540
so we're probably more likely to

5942
03:57:09,540 --> 03:57:11,340
actually pass a transaction that will

5943
03:57:11,340 --> 03:57:14,100
actually go through making us have more

5944
03:57:14,100 --> 03:57:16,380
solid more good random calls let's try

5945
03:57:16,380 --> 03:57:19,340
to run this function now

5946
03:57:20,699 --> 03:57:23,040
great successful but we ran into an

5947
03:57:23,040 --> 03:57:24,359
error right let's see what the error is

5948
03:57:24,359 --> 03:57:28,500
so a deposited collateral unit 56 U into

5949
03:57:28,500 --> 03:57:32,819
56 with this huge collateral seed

5950
03:57:32,819 --> 03:57:34,979
and nothing

5951
03:57:34,979 --> 03:57:37,560
it looks like we failed here

5952
03:57:37,560 --> 03:57:40,739
it's clear let's rerun it with Dash vvvv

5953
03:57:40,739 --> 03:57:42,540
so we can see a little bit output of why

5954
03:57:42,540 --> 03:57:45,720
we actually failed okay we ran we still

5955
03:57:45,720 --> 03:57:46,920
the only function we're calling is the

5956
03:57:46,920 --> 03:57:48,660
positive collateral looks like this

5957
03:57:48,660 --> 03:57:50,640
failed again we call deposit collateral

5958
03:57:50,640 --> 03:57:52,739
with some weird args we could scroll up

5959
03:57:52,739 --> 03:57:55,739
and see exactly why we failed oh we ran

5960
03:57:55,739 --> 03:57:58,920
to this DSC engine needs more than zero

5961
03:57:58,920 --> 03:58:00,779
so it looks like we tried to deposit

5962
03:58:00,779 --> 03:58:04,020
zero collateral Mount collateral was

5963
03:58:04,020 --> 03:58:06,960
Zero yep okay so we tried to call with

5964
03:58:06,960 --> 03:58:09,779
zero so amount collateral was zero so we

5965
03:58:09,779 --> 03:58:11,100
know that this is going to fail so how

5966
03:58:11,100 --> 03:58:13,080
can we make it so that this doesn't fail

5967
03:58:13,080 --> 03:58:16,080
or maybe you're like hey like sometimes

5968
03:58:16,080 --> 03:58:18,479
it will be zero like whatever I I just

5969
03:58:18,479 --> 03:58:19,920
want a Sandy check you can make failing

5970
03:58:19,920 --> 03:58:22,020
revert false right and we can run this

5971
03:58:22,020 --> 03:58:24,120
again and now we'll see how often this

5972
03:58:24,120 --> 03:58:26,640
actually fails hopefully we cut down on

5973
03:58:26,640 --> 03:58:28,739
the amount of times it failed oops let's

5974
03:58:28,739 --> 03:58:31,699
remove those V's

5975
03:58:35,040 --> 03:58:36,899
great it actually it does look like we

5976
03:58:36,899 --> 03:58:38,580
cut down on the amount of reverts we got

5977
03:58:38,580 --> 03:58:41,279
not a lot but we we did cut down the

5978
03:58:41,279 --> 03:58:43,800
amount of reverts at least by adding

5979
03:58:43,800 --> 03:58:46,260
this bounding of the collateral types

5980
03:58:46,260 --> 03:58:48,000
but let's keep cutting down on these

5981
03:58:48,000 --> 03:58:50,580
reverts and potentially even have revert

5982
03:58:50,580 --> 03:58:52,560
and false be true right you're not

5983
03:58:52,560 --> 03:58:54,239
always going to have revert on false be

5984
03:58:54,239 --> 03:58:55,739
able to be true

5985
03:58:55,739 --> 03:58:57,779
and sometimes it's quicker just to have

5986
03:58:57,779 --> 03:58:59,100
it false and write all your invariants

5987
03:58:59,100 --> 03:59:01,199
and stuff but if you want kind of what

5988
03:59:01,199 --> 03:59:04,020
is good to aim for this now the downside

5989
03:59:04,020 --> 03:59:07,020
of always aiming for this is that if you

5990
03:59:07,020 --> 03:59:09,899
make your Handler too specific maybe

5991
03:59:09,899 --> 03:59:12,600
you'll actually narrow it down and

5992
03:59:12,600 --> 03:59:14,460
remove edge cases that would break the

5993
03:59:14,460 --> 03:59:16,560
system that are valid right so it's kind

5994
03:59:16,560 --> 03:59:17,880
of this balancing game you have to play

5995
03:59:17,880 --> 03:59:19,620
with these fuzzing tests and whether

5996
03:59:19,620 --> 03:59:21,420
failing over to be true or false there's

5997
03:59:21,420 --> 03:59:22,800
definitely a little bit of an arc to

5998
03:59:22,800 --> 03:59:25,020
this so the more you do it the better

5999
03:59:25,020 --> 03:59:26,520
you'll get

6000
03:59:26,520 --> 03:59:29,580
but in any case collateral seed amount

6001
03:59:29,580 --> 03:59:31,500
collateral we need to now change it so

6002
03:59:31,500 --> 03:59:34,100
that this amount collateral is bounded

6003
03:59:34,100 --> 03:59:37,500
between one and some Max number right so

6004
03:59:37,500 --> 03:59:40,020
we don't want this to be able to be zero

6005
03:59:40,020 --> 03:59:42,720
so what we can do then instead is we can

6006
03:59:42,720 --> 03:59:44,760
actually we actually can bound this so

6007
03:59:44,760 --> 03:59:46,920
that in the same way we got a valid

6008
03:59:46,920 --> 03:59:48,840
collateral let's get a valid amount

6009
03:59:48,840 --> 03:59:51,840
collateral so we can say amount

6010
03:59:51,840 --> 03:59:55,020
collateral equals bound

6011
03:59:55,020 --> 03:59:56,520
this is a function that actually comes

6012
03:59:56,520 --> 03:59:59,100
with STD utils and it bounds the result

6013
03:59:59,100 --> 04:00:02,100
to an amount so we want to say okay this

6014
04:00:02,100 --> 04:00:04,380
amount collateral we're going to bound

6015
04:00:04,380 --> 04:00:08,580
our amount collateral to being between

6016
04:00:08,580 --> 04:00:10,800
one we don't want to be zero and then

6017
04:00:10,800 --> 04:00:13,380
some like really really big number what

6018
04:00:13,380 --> 04:00:15,300
I like to do is up here in the state

6019
04:00:15,300 --> 04:00:17,580
variables I'll do U in two bit six

6020
04:00:17,580 --> 04:00:22,020
Max deposit size equals

6021
04:00:22,020 --> 04:00:24,080
and I'll do type

6022
04:00:24,080 --> 04:00:28,020
uint96 Dot Max

6023
04:00:28,020 --> 04:00:31,319
and this allows us to get the max uint

6024
04:00:31,319 --> 04:00:35,100
96 value why are we not doing the max U

6025
04:00:35,100 --> 04:00:37,319
into 256 well if we do the max we went

6026
04:00:37,319 --> 04:00:39,720
to 56 and we try to deposit more

6027
04:00:39,720 --> 04:00:41,819
collateral later if you do the maximum

6028
04:00:41,819 --> 04:00:44,699
six plus one you'll get a revert so this

6029
04:00:44,699 --> 04:00:45,479
is going to give us a really really

6030
04:00:45,479 --> 04:00:48,420
really big number but we're at least not

6031
04:00:48,420 --> 04:00:51,779
going to hit the absolute top of amount

6032
04:00:51,779 --> 04:00:54,060
of deposits we can deposit so we're

6033
04:00:54,060 --> 04:00:55,260
gonna say we're going to bound this

6034
04:00:55,260 --> 04:00:58,680
amount collateral between 1 and Max

6035
04:00:58,680 --> 04:01:01,380
deposit size Okay cool so let's put this

6036
04:01:01,380 --> 04:01:03,600
back to false let's run this test again

6037
04:01:03,600 --> 04:01:05,699
and let's see if we cut down on the

6038
04:01:05,699 --> 04:01:08,540
reverts some more

6039
04:01:10,199 --> 04:01:12,899
aha a couple more right only a few

6040
04:01:12,899 --> 04:01:14,580
hundred but we did cut down on the

6041
04:01:14,580 --> 04:01:16,680
amount of reverts why because we're

6042
04:01:16,680 --> 04:01:19,439
passing valid well okay that one didn't

6043
04:01:19,439 --> 04:01:21,960
go so well but we are cutting down on

6044
04:01:21,960 --> 04:01:23,819
the amount of reverts piece by piece

6045
04:01:23,819 --> 04:01:26,640
we're able to bound the collateral but

6046
04:01:26,640 --> 04:01:30,720
there's more if we do fail on reverts

6047
04:01:30,720 --> 04:01:33,779
back to true we can see exactly why it's

6048
04:01:33,779 --> 04:01:37,680
failing right we'll do Dash VV VV we can

6049
04:01:37,680 --> 04:01:39,540
see an example that is indeed failing

6050
04:01:39,540 --> 04:01:41,399
and whoa these are getting more

6051
04:01:41,399 --> 04:01:43,500
intricate right before it was just a

6052
04:01:43,500 --> 04:01:45,479
single call was breaking it okay so

6053
04:01:45,479 --> 04:01:47,100
single call still is breaking it but

6054
04:01:47,100 --> 04:01:47,939
they are getting a little bit more

6055
04:01:47,939 --> 04:01:49,680
intricate so it looks like this one

6056
04:01:49,680 --> 04:01:52,920
failed because what we call deposit

6057
04:01:52,920 --> 04:01:54,720
collateral we scroll up we're getting

6058
04:01:54,720 --> 04:01:56,460
this insufficient allowance okay so

6059
04:01:56,460 --> 04:01:57,779
that's why we actually weren't cutting

6060
04:01:57,779 --> 04:01:59,460
down on the reverts at all because we're

6061
04:01:59,460 --> 04:02:00,840
gonna be insufficient allowance of

6062
04:02:00,840 --> 04:02:02,580
course we need to approve the protocol

6063
04:02:02,580 --> 04:02:05,279
to deposit this collateral so of course

6064
04:02:05,279 --> 04:02:07,380
this is breaking this is always going to

6065
04:02:07,380 --> 04:02:08,100
break

6066
04:02:08,100 --> 04:02:10,560
so let's do a little prankage so we'll

6067
04:02:10,560 --> 04:02:13,800
do vm.start prank we'll just do

6068
04:02:13,800 --> 04:02:17,279
message.c sender and we'll have we'll

6069
04:02:17,279 --> 04:02:19,920
allow this message sender to Mint some

6070
04:02:19,920 --> 04:02:21,899
of this collateral so that they can

6071
04:02:21,899 --> 04:02:24,600
actually deposit it right so we can set

6072
04:02:24,600 --> 04:02:26,040
this up so that whoever's calling to

6073
04:02:26,040 --> 04:02:27,960
posit collateral actually has the

6074
04:02:27,960 --> 04:02:30,660
collateral and actually will approve to

6075
04:02:30,660 --> 04:02:32,760
deposit the collateral so and this is

6076
04:02:32,760 --> 04:02:34,620
why I'm using this erc20 mock so that we

6077
04:02:34,620 --> 04:02:35,939
can actually mint some of this

6078
04:02:35,939 --> 04:02:38,520
collateral so we'll do

6079
04:02:38,520 --> 04:02:40,859
collateral dot mint

6080
04:02:40,859 --> 04:02:43,560
message dot sender amount collateral

6081
04:02:43,560 --> 04:02:46,640
we'll do collateral

6082
04:02:46,640 --> 04:02:50,760
collateral.approve address dsce

6083
04:02:50,760 --> 04:02:52,680
or the amount collateral

6084
04:02:52,680 --> 04:02:54,899
then we can deposit it and then we'll do

6085
04:02:54,899 --> 04:02:56,760
vm.stopcrank

6086
04:02:56,760 --> 04:02:59,479
okay now let's clear this let's have

6087
04:02:59,479 --> 04:03:02,460
revert on false to be false and let's

6088
04:03:02,460 --> 04:03:05,160
see now if we cut down on the amount of

6089
04:03:05,160 --> 04:03:08,359
reverts that we get

6090
04:03:11,580 --> 04:03:13,620
oh and I added too many V's let's get

6091
04:03:13,620 --> 04:03:16,199
rid of those let's run this again

6092
04:03:16,199 --> 04:03:18,000
and yep there will be some brief delays

6093
04:03:18,000 --> 04:03:20,760
in here of course whoa we cut the amount

6094
04:03:20,760 --> 04:03:23,460
of reverts down to zero now all of our

6095
04:03:23,460 --> 04:03:25,380
function calls are passing which means

6096
04:03:25,380 --> 04:03:29,699
every single run was a valid run meaning

6097
04:03:29,699 --> 04:03:32,220
we're using our runs much more wisely

6098
04:03:32,220 --> 04:03:35,040
we're not wasting runs on failed reverts

6099
04:03:35,040 --> 04:03:38,399
so now I can even set this to True run

6100
04:03:38,399 --> 04:03:39,600
this again

6101
04:03:39,600 --> 04:03:43,520
and we'll see this passes and none of R

6102
04:03:43,520 --> 04:03:47,460
runs failed right so this means what

6103
04:03:47,460 --> 04:03:49,020
does this mean from a security

6104
04:03:49,020 --> 04:03:52,020
standpoint it means that no matter how

6105
04:03:52,020 --> 04:03:54,840
often we call deposit collateral no

6106
04:03:54,840 --> 04:03:57,600
matter how much we deposit our

6107
04:03:57,600 --> 04:04:00,720
collateral we will never make this

6108
04:04:00,720 --> 04:04:04,140
invariant false which isn't saying too

6109
04:04:04,140 --> 04:04:06,300
much because of course we're not even

6110
04:04:06,300 --> 04:04:07,800
the total Supply is always zero of

6111
04:04:07,800 --> 04:04:10,620
course this holds so this makes a lot of

6112
04:04:10,620 --> 04:04:13,020
sense so let's actually keep writing

6113
04:04:13,020 --> 04:04:14,279
more functions

6114
04:04:14,279 --> 04:04:16,080
to do more with the system but set them

6115
04:04:16,080 --> 04:04:18,239
up so that whenever we call them they're

6116
04:04:18,239 --> 04:04:22,100
always going to be valid calls okay

6117
04:04:23,939 --> 04:04:25,439
so now we're talking about redeem

6118
04:04:25,439 --> 04:04:27,180
collateral right okay cool so now

6119
04:04:27,180 --> 04:04:29,399
there's actually now we actually have a

6120
04:04:29,399 --> 04:04:31,500
function a valid function to deposit

6121
04:04:31,500 --> 04:04:33,720
collateral now let's actually have a

6122
04:04:33,720 --> 04:04:35,760
valid function to redeem collateral so

6123
04:04:35,760 --> 04:04:37,080
we're going to do the same thing

6124
04:04:37,080 --> 04:04:38,340
function

6125
04:04:38,340 --> 04:04:41,399
redeem collateral

6126
04:04:41,399 --> 04:04:44,040
Colette or all we're gonna do the same

6127
04:04:44,040 --> 04:04:45,300
thing it's going to take a un56

6128
04:04:45,300 --> 04:04:47,760
collateral seed for which collateral to

6129
04:04:47,760 --> 04:04:52,380
redeem U and 256 amount collateral

6130
04:04:52,380 --> 04:04:54,420
so we have public and we're going to do

6131
04:04:54,420 --> 04:04:56,160
something very similar here we're going

6132
04:04:56,160 --> 04:04:57,060
to say

6133
04:04:57,060 --> 04:04:58,920
we're only going to choose a valid

6134
04:04:58,920 --> 04:05:01,699
collateral by saying erc20 mock

6135
04:05:01,699 --> 04:05:04,819
collateral equals underscore get

6136
04:05:04,819 --> 04:05:08,340
collateral from seed collateral seed and

6137
04:05:08,340 --> 04:05:10,500
now we should only allow people to

6138
04:05:10,500 --> 04:05:13,500
redeem the maximum amount they have in

6139
04:05:13,500 --> 04:05:15,000
the system right

6140
04:05:15,000 --> 04:05:18,180
so we're going to say you want 256 Max

6141
04:05:18,180 --> 04:05:22,439
collateral collateral to redeem

6142
04:05:22,439 --> 04:05:25,760
equals DSC engine

6143
04:05:25,760 --> 04:05:31,739
n gin Dot get total

6144
04:05:31,739 --> 04:05:35,160
get collateral

6145
04:05:35,160 --> 04:05:40,399
balance of user do we have this function

6146
04:05:40,739 --> 04:05:43,500
DSC engine

6147
04:05:43,500 --> 04:05:45,660
so this is one that I added in it's

6148
04:05:45,660 --> 04:05:47,340
going to get the collateral balance of a

6149
04:05:47,340 --> 04:05:48,840
user if you pass in the user in the

6150
04:05:48,840 --> 04:05:50,399
token so if you want to pause and add

6151
04:05:50,399 --> 04:05:52,140
this in feel free to do so

6152
04:05:52,140 --> 04:05:54,420
get collateral balance of user where we

6153
04:05:54,420 --> 04:05:57,720
add the address of the collateral

6154
04:05:57,720 --> 04:06:00,540
and the message.cender so it's going to

6155
04:06:00,540 --> 04:06:02,939
get the total balance of a user oh and

6156
04:06:02,939 --> 04:06:05,960
this should be dsce

6157
04:06:06,120 --> 04:06:08,399
and then we're going to bound the amount

6158
04:06:08,399 --> 04:06:10,500
collateral to this max amount they have

6159
04:06:10,500 --> 04:06:12,479
to make these always valid they should

6160
04:06:12,479 --> 04:06:14,520
only be redeeming as much as they put in

6161
04:06:14,520 --> 04:06:18,239
the system amount collateral equals

6162
04:06:18,239 --> 04:06:19,699
bound

6163
04:06:19,699 --> 04:06:23,359
amounts collateral

6164
04:06:23,880 --> 04:06:28,040
uh we're going to say redeem between

6165
04:06:29,760 --> 04:06:32,640
one and the max collateral to redeem

6166
04:06:32,640 --> 04:06:34,199
because we don't want them to redeem

6167
04:06:34,199 --> 04:06:35,699
zero of course

6168
04:06:35,699 --> 04:06:38,040
and then we're going to say oh it's

6169
04:06:38,040 --> 04:06:39,420
going to be public

6170
04:06:39,420 --> 04:06:42,120
then we're going to say dsce dot redeem

6171
04:06:42,120 --> 04:06:43,680
collateral

6172
04:06:43,680 --> 04:06:46,439
address collateral and amount collateral

6173
04:06:46,439 --> 04:06:49,800
right so now we have two functions to

6174
04:06:49,800 --> 04:06:51,120
randomly call so we're going to be

6175
04:06:51,120 --> 04:06:52,620
depositing collateral and redeeming

6176
04:06:52,620 --> 04:06:54,420
collateral let's run this

6177
04:06:54,420 --> 04:06:56,640
invariant it only has two functions it

6178
04:06:56,640 --> 04:06:57,840
could call

6179
04:06:57,840 --> 04:07:00,060
go to the foundry.tamil fail and revert

6180
04:07:00,060 --> 04:07:01,620
is true oh and it looks like we found an

6181
04:07:01,620 --> 04:07:02,580
edge case

6182
04:07:02,580 --> 04:07:04,140
so now we can read this and see what

6183
04:07:04,140 --> 04:07:05,939
it's doing so it's depositing some

6184
04:07:05,939 --> 04:07:10,020
collateral 1381 and 82 and then it's

6185
04:07:10,020 --> 04:07:11,699
Redeeming the collateral

6186
04:07:11,699 --> 04:07:14,340
hmm I'm actually sure what's going on so

6187
04:07:14,340 --> 04:07:16,380
let's add this

6188
04:07:16,380 --> 04:07:20,819
Dash vvvv to see more into the actual

6189
04:07:20,819 --> 04:07:22,739
transaction that's failing oh my

6190
04:07:22,739 --> 04:07:25,020
goodness we got an even bigger one here

6191
04:07:25,020 --> 04:07:27,420
so what do we saying oh Max is less than

6192
04:07:27,420 --> 04:07:29,460
the min oh looks like I'm messing up

6193
04:07:29,460 --> 04:07:31,800
with my bounding so let's dive in really

6194
04:07:31,800 --> 04:07:33,120
an issue

6195
04:07:33,120 --> 04:07:35,520
so if we go back to the Handler bound to

6196
04:07:35,520 --> 04:07:38,160
Mac collateral One Max collateral to

6197
04:07:38,160 --> 04:07:40,140
redeem ah okay

6198
04:07:40,140 --> 04:07:43,979
so if Max collateral to redeem is zero

6199
04:07:43,979 --> 04:07:45,420
this will break

6200
04:07:45,420 --> 04:07:47,160
so we actually do need to keep zero in

6201
04:07:47,160 --> 04:07:49,800
here and then we can just say if

6202
04:07:49,800 --> 04:07:52,020
you know amount collateral equals equals

6203
04:07:52,020 --> 04:07:55,439
zero we could say if it's zero return or

6204
04:07:55,439 --> 04:07:57,060
what we could do is we could use this

6205
04:07:57,060 --> 04:08:00,180
keyword called assume like vm.assume

6206
04:08:00,180 --> 04:08:01,620
which will say

6207
04:08:01,620 --> 04:08:03,420
if the Boolean expression value is to

6208
04:08:03,420 --> 04:08:05,279
false the fuzzler will discard the

6209
04:08:05,279 --> 04:08:07,020
current fuzz inputs and start a new fuzz

6210
04:08:07,020 --> 04:08:08,760
run so we're going to do if the amount

6211
04:08:08,760 --> 04:08:11,340
collateral zero just return don't call

6212
04:08:11,340 --> 04:08:13,319
this function right because this is

6213
04:08:13,319 --> 04:08:15,300
going to fail so let's go ahead and run

6214
04:08:15,300 --> 04:08:16,680
this again now

6215
04:08:16,680 --> 04:08:19,939
power and successful

6216
04:08:21,300 --> 04:08:23,960
well would you look at that we are now

6217
04:08:23,960 --> 04:08:27,359
passing again so people can if we go

6218
04:08:27,359 --> 04:08:30,120
back to the Handler people can now

6219
04:08:30,120 --> 04:08:31,979
redeem collateral and all of these

6220
04:08:31,979 --> 04:08:34,680
redeemings are going to be valid and all

6221
04:08:34,680 --> 04:08:36,060
these deposits are going to be valid

6222
04:08:36,060 --> 04:08:38,520
right they can only redeem valid

6223
04:08:38,520 --> 04:08:41,520
Redemption amounts now here's where this

6224
04:08:41,520 --> 04:08:44,279
fail in revert equals true is can be a

6225
04:08:44,279 --> 04:08:48,060
little bit deceptive let's say right now

6226
04:08:48,060 --> 04:08:50,580
we're only letting you redeem the max

6227
04:08:50,580 --> 04:08:52,199
collateral to redeem

6228
04:08:52,199 --> 04:08:54,239
let's say there was a bug

6229
04:08:54,239 --> 04:08:57,120
where a user can redeem more than they

6230
04:08:57,120 --> 04:08:57,840
have

6231
04:08:57,840 --> 04:09:00,600
this fuzz test wouldn't catch this it's

6232
04:09:00,600 --> 04:09:02,040
because we have this fail in Reverse

6233
04:09:02,040 --> 04:09:04,979
true if this fail on revert was false

6234
04:09:04,979 --> 04:09:07,500
and we didn't have this line

6235
04:09:07,500 --> 04:09:09,899
right and we just said this is the max

6236
04:09:09,899 --> 04:09:12,120
deposit size

6237
04:09:12,120 --> 04:09:13,920
this is a test where we might actually

6238
04:09:13,920 --> 04:09:16,319
catch that bug right and if we run this

6239
04:09:16,319 --> 04:09:17,880
now

6240
04:09:17,880 --> 04:09:20,100
oh and with fail inverse false we are

6241
04:09:20,100 --> 04:09:21,420
going to get a whole bunch of reverts we

6242
04:09:21,420 --> 04:09:22,859
are going to get bad transactions

6243
04:09:22,859 --> 04:09:24,359
however

6244
04:09:24,359 --> 04:09:25,859
and you can see we can see the number of

6245
04:09:25,859 --> 04:09:27,899
verts over here and it actually is way

6246
04:09:27,899 --> 04:09:29,699
less than it was before which is awesome

6247
04:09:29,699 --> 04:09:32,819
and if we run it again still way less

6248
04:09:32,819 --> 04:09:34,760
than 8 000 which is what it was before

6249
04:09:34,760 --> 04:09:37,800
but if we have fail and revert false we

6250
04:09:37,800 --> 04:09:39,180
can actually catch this

6251
04:09:39,180 --> 04:09:41,040
so The Foundry team is actually working

6252
04:09:41,040 --> 04:09:43,680
on allowing some tests to be fail and

6253
04:09:43,680 --> 04:09:45,960
revert and some tests to be not feeling

6254
04:09:45,960 --> 04:09:49,199
revert so you can kind of pick which one

6255
04:09:49,199 --> 04:09:50,640
for which functions instead of kind of

6256
04:09:50,640 --> 04:09:53,760
having to blanket everything so just

6257
04:09:53,760 --> 04:09:56,399
keep in mind the dangers here okay of

6258
04:09:56,399 --> 04:09:58,260
always defaulting to fail on revert

6259
04:09:58,260 --> 04:10:00,359
equals true okay they have their

6260
04:10:00,359 --> 04:10:02,279
trade-offs and if you do failover equals

6261
04:10:02,279 --> 04:10:04,560
false you can sometimes write these

6262
04:10:04,560 --> 04:10:07,640
handlers a lot quicker

6263
04:10:09,660 --> 04:10:11,460
okay so we have

6264
04:10:11,460 --> 04:10:13,080
some stuff here we can deposit

6265
04:10:13,080 --> 04:10:15,479
collateral we can redeem collateral what

6266
04:10:15,479 --> 04:10:16,140
else

6267
04:10:16,140 --> 04:10:17,460
so we probably should figure out a way

6268
04:10:17,460 --> 04:10:19,620
to get some total Supply right so what

6269
04:10:19,620 --> 04:10:20,760
we're going to do is now we're going to

6270
04:10:20,760 --> 04:10:23,220
finally make our mint function it's a

6271
04:10:23,220 --> 04:10:24,180
function

6272
04:10:24,180 --> 04:10:26,520
mint DSC

6273
04:10:26,520 --> 04:10:29,819
public like like this and what do we

6274
04:10:29,819 --> 04:10:31,439
want to put in here well if we go to the

6275
04:10:31,439 --> 04:10:35,279
DSC engine go to mince DSC go to this

6276
04:10:35,279 --> 04:10:37,739
mint DSC function it takes an amount of

6277
04:10:37,739 --> 04:10:40,140
DSC to Mint so we'll do the same thing

6278
04:10:40,140 --> 04:10:44,100
we'll say U into 256 amount and that's

6279
04:10:44,100 --> 04:10:46,620
it we'll mint a random amount

6280
04:10:46,620 --> 04:10:47,939
so in here

6281
04:10:47,939 --> 04:10:51,120
of course we can't have amount be a

6282
04:10:51,120 --> 04:10:52,380
number of things right we can't have it

6283
04:10:52,380 --> 04:10:56,100
be zero and they would need to not have

6284
04:10:56,100 --> 04:10:58,319
their health Factor be broken so we're

6285
04:10:58,319 --> 04:11:02,479
going to say amount equals bound amount

6286
04:11:02,479 --> 04:11:05,939
1 and let's say Max deposit size

6287
04:11:05,939 --> 04:11:08,640
and then additionally this amount better

6288
04:11:08,640 --> 04:11:12,060
be more than the value of the system

6289
04:11:12,060 --> 04:11:13,680
right because we have this revert if

6290
04:11:13,680 --> 04:11:16,739
Health factor is broken but maybe I

6291
04:11:16,739 --> 04:11:18,779
don't even want to do that narrowing

6292
04:11:18,779 --> 04:11:20,160
down maybe I'd say screw it I'm going to

6293
04:11:20,160 --> 04:11:22,920
make Roberto false revert on fail and

6294
04:11:22,920 --> 04:11:24,180
revert false and I'm just going to leave

6295
04:11:24,180 --> 04:11:26,699
it like that because I'm nervous then

6296
04:11:26,699 --> 04:11:28,859
I'm going to narrow it down too much so

6297
04:11:28,859 --> 04:11:30,840
then maybe I just go screw it BMW start

6298
04:11:30,840 --> 04:11:32,040
prank

6299
04:11:32,040 --> 04:11:33,660
message.c sender

6300
04:11:33,660 --> 04:11:36,920
and we call and the DSC engine mint DSC

6301
04:11:36,920 --> 04:11:41,580
dsce dot mint DSC and the amount

6302
04:11:41,580 --> 04:11:45,239
and then bm.stop rank and this is where

6303
04:11:45,239 --> 04:11:47,460
actually you'll see sometimes some

6304
04:11:47,460 --> 04:11:48,660
people will have

6305
04:11:48,660 --> 04:11:49,939
continue

6306
04:11:49,939 --> 04:11:54,840
on revert and a fail on revert fail on

6307
04:11:54,840 --> 04:11:56,699
revert

6308
04:11:56,699 --> 04:11:58,319
see people some people can have two

6309
04:11:58,319 --> 04:12:00,899
types of folders continue on revert is

6310
04:12:00,899 --> 04:12:01,800
going to be

6311
04:12:01,800 --> 04:12:04,920
the quicker looser tests where it might

6312
04:12:04,920 --> 04:12:06,120
look like this

6313
04:12:06,120 --> 04:12:07,800
the fail on revert is going to make sure

6314
04:12:07,800 --> 04:12:09,479
that every single transaction that you

6315
04:12:09,479 --> 04:12:10,979
run your invariant test Suite on is

6316
04:12:10,979 --> 04:12:12,120
going to pass

6317
04:12:12,120 --> 04:12:13,500
I personally think it's good to have

6318
04:12:13,500 --> 04:12:14,279
both

6319
04:12:14,279 --> 04:12:16,020
when I'm writing in varying tests I

6320
04:12:16,020 --> 04:12:17,580
actually start with the continue on

6321
04:12:17,580 --> 04:12:19,500
revert because they're faster oftentimes

6322
04:12:19,500 --> 04:12:21,840
you can find bugs as long as you narrow

6323
04:12:21,840 --> 04:12:24,479
down them enough so for now let's go

6324
04:12:24,479 --> 04:12:26,580
ahead let's have this be false see if we

6325
04:12:26,580 --> 04:12:28,020
can find any issues like this so we'll

6326
04:12:28,020 --> 04:12:32,160
go up up so we'll run Forge test Dash m

6327
04:12:32,160 --> 04:12:34,260
just going to run this invariant test

6328
04:12:34,260 --> 04:12:38,880
boom let's see if we get any issues here

6329
04:12:38,880 --> 04:12:40,680
we'll see how many reverts we get as

6330
04:12:40,680 --> 04:12:42,540
well so we got a similar amount of

6331
04:12:42,540 --> 04:12:44,580
reverts which is good similar amount of

6332
04:12:44,580 --> 04:12:45,479
calls

6333
04:12:45,479 --> 04:12:47,460
which is all right and then actually if

6334
04:12:47,460 --> 04:12:49,979
we do Dash VV we can even see the

6335
04:12:49,979 --> 04:12:52,739
console.logs at the end it looks like it

6336
04:12:52,739 --> 04:12:54,960
hasn't found a way to Mint more tokens

6337
04:12:54,960 --> 04:12:56,580
than collateral in the system oh and

6338
04:12:56,580 --> 04:12:58,920
even it looks like the last run it ended

6339
04:12:58,920 --> 04:13:01,560
with a total supply of zero right but

6340
04:13:01,560 --> 04:13:04,260
maybe I'm paranoid let's actually go

6341
04:13:04,260 --> 04:13:06,060
back to true and let's just stay true

6342
04:13:06,060 --> 04:13:08,460
for the rest of the rest of this but

6343
04:13:08,460 --> 04:13:10,080
like I said I think it's good to have

6344
04:13:10,080 --> 04:13:14,279
both types of tests anyways Handler so

6345
04:13:14,279 --> 04:13:17,100
this mint DSC we should only be able to

6346
04:13:17,100 --> 04:13:19,739
Mint DSC if the amount is less than the

6347
04:13:19,739 --> 04:13:22,260
collateral so what we can do

6348
04:13:22,260 --> 04:13:23,580
is we can call this get account

6349
04:13:23,580 --> 04:13:25,319
information which gets the total

6350
04:13:25,319 --> 04:13:27,899
collateral value in USD and total DSC

6351
04:13:27,899 --> 04:13:30,899
minted and make sure that we're always

6352
04:13:30,899 --> 04:13:32,160
going to Mint

6353
04:13:32,160 --> 04:13:34,140
less than the collateral value that we

6354
04:13:34,140 --> 04:13:34,859
have

6355
04:13:34,859 --> 04:13:36,359
so we can say

6356
04:13:36,359 --> 04:13:38,760
we can actually just copy these two

6357
04:13:38,760 --> 04:13:42,899
paste it in here equals dsce dot copy

6358
04:13:42,899 --> 04:13:45,680
this function paste

6359
04:13:45,680 --> 04:13:47,460
message.sender

6360
04:13:47,460 --> 04:13:49,260
so we're gonna get the total DSC minted

6361
04:13:49,260 --> 04:13:52,080
plot our value in USD and what we can do

6362
04:13:52,080 --> 04:13:54,420
is we can say we'll just have them

6363
04:13:54,420 --> 04:13:56,399
always mint the max

6364
04:13:56,399 --> 04:13:59,699
DSC they can mint so we'll say unit 256.

6365
04:13:59,699 --> 04:14:04,380
Max DSC to Mint equals

6366
04:14:04,380 --> 04:14:07,680
collateral value in USD we could say the

6367
04:14:07,680 --> 04:14:10,439
collateral value in USD divided by 2

6368
04:14:10,439 --> 04:14:13,439
minus the total DSC minted better be

6369
04:14:13,439 --> 04:14:15,960
greater than zero right better not be a

6370
04:14:15,960 --> 04:14:18,300
negative number so we can even do like

6371
04:14:18,300 --> 04:14:23,340
an INT 256 and then if this is negative

6372
04:14:23,340 --> 04:14:25,439
then we're just going to return

6373
04:14:25,439 --> 04:14:27,840
otherwise we're going to say amount

6374
04:14:27,840 --> 04:14:31,319
we're going to equals bound this again

6375
04:14:31,319 --> 04:14:32,939
say amount

6376
04:14:32,939 --> 04:14:37,020
0 comma Max TC to Mint and we're also

6377
04:14:37,020 --> 04:14:39,180
going to say if amount

6378
04:14:39,180 --> 04:14:41,399
equals zero we're going to return

6379
04:14:41,399 --> 04:14:44,160
oops and then actually we need to grab

6380
04:14:44,160 --> 04:14:47,040
this start prank put this down here

6381
04:14:47,040 --> 04:14:49,260
that's all we need to do and we should

6382
04:14:49,260 --> 04:14:50,160
probably

6383
04:14:50,160 --> 04:14:53,460
just grab these put them down here

6384
04:14:53,460 --> 04:14:55,979
we don't need both of these so we just

6385
04:14:55,979 --> 04:14:57,840
need this I think

6386
04:14:57,840 --> 04:14:59,460
and we don't need both of these we only

6387
04:14:59,460 --> 04:15:01,920
need one of these so we'll do

6388
04:15:01,920 --> 04:15:04,260
YouTube we'll convert this pack to a

6389
04:15:04,260 --> 04:15:06,060
un256

6390
04:15:06,060 --> 04:15:09,180
and if I'm out of zero return this looks

6391
04:15:09,180 --> 04:15:11,819
pretty good to me let's see if we made

6392
04:15:11,819 --> 04:15:14,040
this actually work let's run this and

6393
04:15:14,040 --> 04:15:16,500
now we can mint DSC

6394
04:15:16,500 --> 04:15:17,939
essible

6395
04:15:17,939 --> 04:15:21,420
and bada boom so we have some calls we

6396
04:15:21,420 --> 04:15:22,920
have no reverts

6397
04:15:22,920 --> 04:15:25,580
this is great

6398
04:15:27,720 --> 04:15:30,239
but I keep getting total Supply is zero

6399
04:15:30,239 --> 04:15:32,279
down here so we have plenty of width

6400
04:15:32,279 --> 04:15:34,140
plenty wrap Bitcoin

6401
04:15:34,140 --> 04:15:39,180
are we ever calling this function hmm we

6402
04:15:39,180 --> 04:15:41,399
keep getting a total supply of zero down

6403
04:15:41,399 --> 04:15:44,100
here why is that how can we figure out

6404
04:15:44,100 --> 04:15:47,220
if our mint DSC is actually getting

6405
04:15:47,220 --> 04:15:49,859
called let's first off see if this mint

6406
04:15:49,859 --> 04:15:52,199
DSC is even being called

6407
04:15:52,199 --> 04:15:54,239
we can use something called a ghost

6408
04:15:54,239 --> 04:15:57,239
variable to track this so in here up at

6409
04:15:57,239 --> 04:16:00,020
the top we'll make a function called

6410
04:16:00,020 --> 04:16:04,800
un256 times mint is called

6411
04:16:04,800 --> 04:16:06,899
make this a public

6412
04:16:06,899 --> 04:16:10,739
variable and at the bottom of mint DSC

6413
04:16:10,739 --> 04:16:14,340
we'll do timesment is called Plus

6414
04:16:14,340 --> 04:16:17,460
now back in our invariance we do a

6415
04:16:17,460 --> 04:16:19,380
console.log

6416
04:16:19,380 --> 04:16:23,160
times mint called comma

6417
04:16:23,160 --> 04:16:25,680
Handler dot times been called and then

6418
04:16:25,680 --> 04:16:27,840
we'll run our test again

6419
04:16:27,840 --> 04:16:31,460
oops with Dash VV

6420
04:16:34,500 --> 04:16:37,500
and we can see oh mint is actually never

6421
04:16:37,500 --> 04:16:40,560
called how is that possible well it must

6422
04:16:40,560 --> 04:16:42,359
be because one of these returns is

6423
04:16:42,359 --> 04:16:44,580
hitting and it's not finishing this call

6424
04:16:44,580 --> 04:16:46,439
so we can keep moving this up to figure

6425
04:16:46,439 --> 04:16:49,439
out where it's actually being called and

6426
04:16:49,439 --> 04:16:51,600
to continue to debug this but I already

6427
04:16:51,600 --> 04:16:53,520
know how to debug this of course because

6428
04:16:53,520 --> 04:16:56,399
I've done this a while if you want take

6429
04:16:56,399 --> 04:16:58,260
this as a challenge for you

6430
04:16:58,260 --> 04:17:00,899
to answer the question why

6431
04:17:00,899 --> 04:17:04,080
is this never being called Y is times

6432
04:17:04,080 --> 04:17:05,819
event being called Never being called

6433
04:17:05,819 --> 04:17:08,160
why is it never finishing so feel free

6434
04:17:08,160 --> 04:17:10,020
to pause the video try to debug this

6435
04:17:10,020 --> 04:17:12,479
yourself and find out and then I'll tell

6436
04:17:12,479 --> 04:17:14,279
you the technique that I used to debug

6437
04:17:14,279 --> 04:17:16,560
this and figure out why this mint DSC

6438
04:17:16,560 --> 04:17:19,220
was never being finished

6439
04:17:21,359 --> 04:17:23,399
all right welcome back the direction

6440
04:17:23,399 --> 04:17:25,199
pause the video did you actually try to

6441
04:17:25,199 --> 04:17:27,239
figure it out if you didn't I'm giving

6442
04:17:27,239 --> 04:17:29,460
you a second chance pause the video go

6443
04:17:29,460 --> 04:17:31,199
find out pause the video and take this

6444
04:17:31,199 --> 04:17:34,020
as your opportunity to try to debug okay

6445
04:17:34,020 --> 04:17:37,680
why is this not getting hit why is this

6446
04:17:37,680 --> 04:17:40,580
line not hitting

6447
04:17:46,140 --> 04:17:48,660
all right welcome back now there's a

6448
04:17:48,660 --> 04:17:49,800
couple different ways that I used to

6449
04:17:49,800 --> 04:17:51,899
actually debug this one of them was

6450
04:17:51,899 --> 04:17:54,720
having this times been called plus

6451
04:17:54,720 --> 04:17:56,340
equals one and then moving it up so I

6452
04:17:56,340 --> 04:17:58,560
found the line that it was breaking on

6453
04:17:58,560 --> 04:18:00,060
once I found the line that it was

6454
04:18:00,060 --> 04:18:02,399
breaking on I console.logged all the

6455
04:18:02,399 --> 04:18:04,260
values of the different variables around

6456
04:18:04,260 --> 04:18:05,880
one of the most important variables that

6457
04:18:05,880 --> 04:18:09,600
I dumped was going to be the message dot

6458
04:18:09,600 --> 04:18:11,699
sender so when you're working with

6459
04:18:11,699 --> 04:18:13,859
invariance remember it's going to call

6460
04:18:13,859 --> 04:18:15,000
this

6461
04:18:15,000 --> 04:18:16,920
contract with a ton of different

6462
04:18:16,920 --> 04:18:19,859
functions and a ton of different calls

6463
04:18:19,859 --> 04:18:22,739
however it's also going to call them

6464
04:18:22,739 --> 04:18:24,560
with random

6465
04:18:24,560 --> 04:18:26,819
addresses as well

6466
04:18:26,819 --> 04:18:30,779
so in order for us to Mint DSC we need

6467
04:18:30,779 --> 04:18:34,680
to only mint DSC with an address that

6468
04:18:34,680 --> 04:18:37,500
has actually deposited collateral

6469
04:18:37,500 --> 04:18:39,180
because it's impossible for someone to

6470
04:18:39,180 --> 04:18:40,560
Mint DSC

6471
04:18:40,560 --> 04:18:43,199
without them depositing collateral now

6472
04:18:43,199 --> 04:18:45,960
again if we restrict this function like

6473
04:18:45,960 --> 04:18:48,420
this maybe there is a case where you can

6474
04:18:48,420 --> 04:18:50,279
mint DSC without depositing any

6475
04:18:50,279 --> 04:18:52,319
collateral that we don't know about this

6476
04:18:52,319 --> 04:18:54,840
is again why it's important to have some

6477
04:18:54,840 --> 04:18:56,460
open invariant tests

6478
04:18:56,460 --> 04:18:58,260
some continue on revert and some fail

6479
04:18:58,260 --> 04:19:00,660
and revert as well so if we want to have

6480
04:19:00,660 --> 04:19:03,120
this be fail on reverb we would need to

6481
04:19:03,120 --> 04:19:05,279
only pick a message that's sender

6482
04:19:05,279 --> 04:19:08,399
that has some deposited collateral so

6483
04:19:08,399 --> 04:19:09,840
what we can do is actually keep track of

6484
04:19:09,840 --> 04:19:12,239
people who have deposited collateral and

6485
04:19:12,239 --> 04:19:14,040
then when we go to Mint we just choose

6486
04:19:14,040 --> 04:19:16,500
an address from somebody who already has

6487
04:19:16,500 --> 04:19:19,620
deposited so how can we do that well we

6488
04:19:19,620 --> 04:19:21,420
can just keep track of

6489
04:19:21,420 --> 04:19:24,840
an array of addresses that have

6490
04:19:24,840 --> 04:19:27,060
lateral deposited let's open the top

6491
04:19:27,060 --> 04:19:29,279
well let's actually keep this times mint

6492
04:19:29,279 --> 04:19:31,319
is called and we'll put it at the bottom

6493
04:19:31,319 --> 04:19:33,359
times what it's called plus plus

6494
04:19:33,359 --> 04:19:36,180
and this way we know how to test this

6495
04:19:36,180 --> 04:19:38,580
right if times width is called increases

6496
04:19:38,580 --> 04:19:41,220
we've known we will know that we fixed

6497
04:19:41,220 --> 04:19:43,140
the actual issue so times which is

6498
04:19:43,140 --> 04:19:45,779
called plus plus but the top we'll do a

6499
04:19:45,779 --> 04:19:48,300
address array

6500
04:19:48,300 --> 04:19:51,060
public users with

6501
04:19:51,060 --> 04:19:52,460
collateral

6502
04:19:52,460 --> 04:19:55,920
deposited and we'll copy this address

6503
04:19:55,920 --> 04:19:59,420
and now in deposit collateral

6504
04:19:59,580 --> 04:20:01,680
use it with collateral deposited dot

6505
04:20:01,680 --> 04:20:04,560
push message.sender now there's some

6506
04:20:04,560 --> 04:20:05,819
caveats here

6507
04:20:05,819 --> 04:20:07,979
this will double push obviously some

6508
04:20:07,979 --> 04:20:10,800
people so this will double push if the

6509
04:20:10,800 --> 04:20:13,800
same addresses push twice but for now

6510
04:20:13,800 --> 04:20:16,380
let's just keep it simple and let's go

6511
04:20:16,380 --> 04:20:17,939
ahead and just leave it like this

6512
04:20:17,939 --> 04:20:19,920
we probably should check to see if

6513
04:20:19,920 --> 04:20:21,779
someone has already deposited collateral

6514
04:20:21,779 --> 04:20:23,699
but whatever we're going to go with this

6515
04:20:23,699 --> 04:20:25,140
for now because simple

6516
04:20:25,140 --> 04:20:28,319
and then now in our mint DSC we can do

6517
04:20:28,319 --> 04:20:29,880
something similar to what we did with

6518
04:20:29,880 --> 04:20:33,540
collateral so we'll do a underscore you

6519
04:20:33,540 --> 04:20:38,040
into 256. address seed and instead of

6520
04:20:38,040 --> 04:20:40,620
bounding to message.sender what we can

6521
04:20:40,620 --> 04:20:42,479
do is we can say

6522
04:20:42,479 --> 04:20:47,160
address sender equals users with

6523
04:20:47,160 --> 04:20:48,899
collateral deposited

6524
04:20:48,899 --> 04:20:51,239
it's going to be the index of the users

6525
04:20:51,239 --> 04:20:55,080
with collateral deposited Anderson mod

6526
04:20:55,080 --> 04:20:57,000
uses with collateral

6527
04:20:57,000 --> 04:20:58,439
posited

6528
04:20:58,439 --> 04:21:01,739
dot length and now now instead of

6529
04:21:01,739 --> 04:21:03,779
message.sender we're going to use sender

6530
04:21:03,779 --> 04:21:05,760
in here same thing with down here we're

6531
04:21:05,760 --> 04:21:08,399
going to use sender now let's run this

6532
04:21:08,399 --> 04:21:12,680
and see if mint is ever actually called

6533
04:21:16,279 --> 04:21:19,439
so this was very helpful

6534
04:21:19,439 --> 04:21:23,000
let's do Dash vbv

6535
04:21:25,439 --> 04:21:27,300
ah okay so at least we're getting

6536
04:21:27,300 --> 04:21:28,439
something different here right we're

6537
04:21:28,439 --> 04:21:30,960
getting an error division or module by

6538
04:21:30,960 --> 04:21:33,540
zero okay of course we're getting module

6539
04:21:33,540 --> 04:21:34,739
by zero

6540
04:21:34,739 --> 04:21:36,420
because if the collateral length is zero

6541
04:21:36,420 --> 04:21:37,800
then obviously sender is going to be

6542
04:21:37,800 --> 04:21:40,979
zero so we can do if use of the

6543
04:21:40,979 --> 04:21:43,020
collateral dot length equals equals zero

6544
04:21:43,020 --> 04:21:44,880
then we're going to return we're going

6545
04:21:44,880 --> 04:21:45,960
to skip this one

6546
04:21:45,960 --> 04:21:49,040
so let's run this again

6547
04:21:51,779 --> 04:21:53,340
okay

6548
04:21:53,340 --> 04:21:55,020
so we're getting some stuff passing

6549
04:21:55,020 --> 04:21:56,279
let's actually

6550
04:21:56,279 --> 04:21:58,800
just do it two v's so that it's easier

6551
04:21:58,800 --> 04:22:02,660
to read than all those events

6552
04:22:06,739 --> 04:22:09,840
aha total times mint was called is now

6553
04:22:09,840 --> 04:22:12,720
31 and we're getting a total Supply so

6554
04:22:12,720 --> 04:22:15,239
our mint DSC function in our Handler is

6555
04:22:15,239 --> 04:22:16,739
now actually working we're now

6556
04:22:16,739 --> 04:22:19,800
successfully calling mint DSC and it

6557
04:22:19,800 --> 04:22:22,260
looks like our protocol is holding up

6558
04:22:22,260 --> 04:22:25,620
all right this is fantastic so we're

6559
04:22:25,620 --> 04:22:28,020
getting closer to building this Handler

6560
04:22:28,020 --> 04:22:31,439
to actually have a solid Recreation of

6561
04:22:31,439 --> 04:22:32,939
all the possible functions we can

6562
04:22:32,939 --> 04:22:34,739
actually do in this system something I

6563
04:22:34,739 --> 04:22:36,660
didn't show you was we should pretty

6564
04:22:36,660 --> 04:22:39,239
much always use a given invariant called

6565
04:22:39,239 --> 04:22:43,920
function invariant Getters should not

6566
04:22:43,920 --> 04:22:45,180
revert

6567
04:22:45,180 --> 04:22:47,399
like this and then we just put in here

6568
04:22:47,399 --> 04:22:50,699
all of our variants like dsce dot get

6569
04:22:50,699 --> 04:22:52,680
liquidation bonus

6570
04:22:52,680 --> 04:22:56,399
d e c e dot get Precision

6571
04:22:56,399 --> 04:22:59,279
Etc put all of our Getters in here and

6572
04:22:59,279 --> 04:23:01,800
oh and this could be public View and if

6573
04:23:01,800 --> 04:23:03,660
any of these revert then this will fail

6574
04:23:03,660 --> 04:23:07,140
this invariant test will call a ton of

6575
04:23:07,140 --> 04:23:09,660
different functions on the Handler and

6576
04:23:09,660 --> 04:23:11,819
if any of the function combinations

6577
04:23:11,819 --> 04:23:13,800
break any of our Getters we know we've

6578
04:23:13,800 --> 04:23:15,779
broken invariant this is a layup and

6579
04:23:15,779 --> 04:23:17,520
variant that everyone should always 100

6580
04:23:17,520 --> 04:23:20,819
include a way to make sure that you're

6581
04:23:20,819 --> 04:23:22,140
including everything is you can run

6582
04:23:22,140 --> 04:23:25,080
something called Forge inspect

6583
04:23:25,080 --> 04:23:27,300
the SC engine

6584
04:23:27,300 --> 04:23:30,540
methods and it'll print out all the

6585
04:23:30,540 --> 04:23:33,899
different methods that this function has

6586
04:23:33,899 --> 04:23:36,300
in addition to its function

6587
04:23:36,300 --> 04:23:37,560
selectors

6588
04:23:37,560 --> 04:23:39,060
so you can kind of use this as your

6589
04:23:39,060 --> 04:23:40,439
checklist of all the different functions

6590
04:23:40,439 --> 04:23:43,680
you can call on a contract and you can

6591
04:23:43,680 --> 04:23:45,600
look for all the view functions in here

6592
04:23:45,600 --> 04:23:47,939
this is additionally why it's great to

6593
04:23:47,939 --> 04:23:49,920
have get in front of these words because

6594
04:23:49,920 --> 04:23:52,140
it becomes very easy to figure out which

6595
04:23:52,140 --> 04:23:55,040
ones are getters

6596
04:23:57,300 --> 04:23:59,040
but it doesn't reflect the whole world

6597
04:23:59,040 --> 04:24:02,040
right one of the other really fantastic

6598
04:24:02,040 --> 04:24:03,779
things we can do with the Handler is we

6599
04:24:03,779 --> 04:24:06,960
can both handle our DSC engine but any

6600
04:24:06,960 --> 04:24:09,479
other contract that we want to simulate

6601
04:24:09,479 --> 04:24:12,479
for as well and there's a lot of things

6602
04:24:12,479 --> 04:24:14,399
we want to take in mind when writing

6603
04:24:14,399 --> 04:24:16,739
these especially the other contracts

6604
04:24:16,739 --> 04:24:18,779
that we interact with what are some of

6605
04:24:18,779 --> 04:24:20,040
the other contracts that we interact

6606
04:24:20,040 --> 04:24:22,020
with well one of them is going to be the

6607
04:24:22,020 --> 04:24:23,760
price feed one of them is going to be

6608
04:24:23,760 --> 04:24:27,600
the weft token the wrapped Bitcoin token

6609
04:24:27,600 --> 04:24:30,359
so our Handler should probably also show

6610
04:24:30,359 --> 04:24:32,040
people doing random weird things with

6611
04:24:32,040 --> 04:24:33,840
weft and rep Bitcoin right because

6612
04:24:33,840 --> 04:24:35,220
people are going to do random weird

6613
04:24:35,220 --> 04:24:36,899
things with both these tokens and we

6614
04:24:36,899 --> 04:24:38,880
want to make sure our system can work

6615
04:24:38,880 --> 04:24:40,739
with them appropriately now I'm actually

6616
04:24:40,739 --> 04:24:42,899
going to skip them for now but I am 100

6617
04:24:42,899 --> 04:24:45,300
going to do one with price feeds because

6618
04:24:45,300 --> 04:24:48,840
price feeds are definitely a system that

6619
04:24:48,840 --> 04:24:50,760
can change and definitely a system that

6620
04:24:50,760 --> 04:24:53,040
greatly affects our protocol

6621
04:24:53,040 --> 04:24:54,960
so we're going to include price feed

6622
04:24:54,960 --> 04:24:57,180
updates in our Handler

6623
04:24:57,180 --> 04:24:58,380
so we're going to do is we're going to

6624
04:24:58,380 --> 04:25:01,500
go ahead and do import the mock V3

6625
04:25:01,500 --> 04:25:02,699
aggregator

6626
04:25:02,699 --> 04:25:05,660
from slash

6627
04:25:05,660 --> 04:25:08,819
MOX slash mock

6628
04:25:08,819 --> 04:25:12,359
V3 aggregator.soul or where is this

6629
04:25:12,359 --> 04:25:16,680
located oh just one do this okay and

6630
04:25:16,680 --> 04:25:19,380
this mock V3 aggregator has some

6631
04:25:19,380 --> 04:25:20,819
functions that allow us to just easily

6632
04:25:20,819 --> 04:25:23,340
update and answer right which is

6633
04:25:23,340 --> 04:25:25,140
something that we want to do we want our

6634
04:25:25,140 --> 04:25:27,300
protocol to be able to easily update

6635
04:25:27,300 --> 04:25:29,939
answers so we'll take this monk V3

6636
04:25:29,939 --> 04:25:32,399
aggregator and let's at least get the

6637
04:25:32,399 --> 04:25:33,540
weft price

6638
04:25:33,540 --> 04:25:37,439
from our system so I have a view

6639
04:25:37,439 --> 04:25:41,340
function dsce dot get collateral token

6640
04:25:41,340 --> 04:25:45,500
price feed and I'll pass the address

6641
04:25:45,540 --> 04:25:48,020
oops

6642
04:25:50,220 --> 04:25:52,920
and I'll say eth and I'll make

6643
04:25:52,920 --> 04:25:55,620
another variable mock V3 alligator

6644
04:25:55,620 --> 04:26:00,120
public eth USD price feed

6645
04:26:00,120 --> 04:26:03,899
I'll say ethusd price feed equals

6646
04:26:03,899 --> 04:26:05,819
this and we're just going to wrap this

6647
04:26:05,819 --> 04:26:08,460
up as a mock V3 aggregator

6648
04:26:08,460 --> 04:26:10,859
this and great now we have an ethusd

6649
04:26:10,859 --> 04:26:13,439
price feed and now we can add a new

6650
04:26:13,439 --> 04:26:15,779
function in here so we have mint DSC

6651
04:26:15,779 --> 04:26:19,319
deposit collateral redeem collateral we

6652
04:26:19,319 --> 04:26:23,120
can add a new one called function update

6653
04:26:23,120 --> 04:26:25,739
collateral price

6654
04:26:25,739 --> 04:26:28,739
we'll do a unit 96 just so that the

6655
04:26:28,739 --> 04:26:30,720
number isn't too big new price

6656
04:26:30,720 --> 04:26:32,580
and then we could also randomize the

6657
04:26:32,580 --> 04:26:34,620
collateral but for now we'll just have

6658
04:26:34,620 --> 04:26:38,040
it be the ethusd so we need to convert

6659
04:26:38,040 --> 04:26:41,060
unit 96 to an INT

6660
04:26:41,060 --> 04:26:43,920
256 new price

6661
04:26:43,920 --> 04:26:47,040
int equals into 256 new price because

6662
04:26:47,040 --> 04:26:50,880
price feeds take into 256's oops sorry

6663
04:26:50,880 --> 04:26:54,060
this should be in and to convert

6664
04:26:54,060 --> 04:26:57,060
a u inch 96 to an into 256 we actually

6665
04:26:57,060 --> 04:27:00,779
have to wrap it as U into 256 first and

6666
04:27:00,779 --> 04:27:04,040
then to an end 96.

6667
04:27:05,880 --> 04:27:09,420
dot update answer or set price or

6668
04:27:09,420 --> 04:27:12,300
whatever we want to do to this new price

6669
04:27:12,300 --> 04:27:15,779
like this boom and now simple as that we

6670
04:27:15,779 --> 04:27:18,000
have an update collateral price well an

6671
04:27:18,000 --> 04:27:20,640
update each price anyways so now we can

6672
04:27:20,640 --> 04:27:22,560
do three things in our system we can

6673
04:27:22,560 --> 04:27:23,819
update the price

6674
04:27:23,819 --> 04:27:26,699
redeem collateral deposit collateral

6675
04:27:26,699 --> 04:27:30,180
and mint DSC so before we actually run

6676
04:27:30,180 --> 04:27:32,040
this what do you think

6677
04:27:32,040 --> 04:27:34,140
do you think we'll get an error what do

6678
04:27:34,140 --> 04:27:37,220
you think we'll go on let's run this

6679
04:27:43,560 --> 04:27:46,500
well looks like it found a sequence it

6680
04:27:46,500 --> 04:27:48,779
found an issue the reason assertion

6681
04:27:48,779 --> 04:27:50,939
violated which means that our invariant

6682
04:27:50,939 --> 04:27:54,180
here was broken the weft Value Plus

6683
04:27:54,180 --> 04:27:56,640
Bitcoin value now is no longer the total

6684
04:27:56,640 --> 04:27:58,859
Supply so let's scroll up let's see what

6685
04:27:58,859 --> 04:28:01,080
the issue is here all the way past

6686
04:28:01,080 --> 04:28:03,540
everything and if we read the sequence

6687
04:28:03,540 --> 04:28:06,359
we can figure out why this broke we see

6688
04:28:06,359 --> 04:28:07,859
exactly what happened okay so first

6689
04:28:07,859 --> 04:28:10,380
they're called deposit collateral okay

6690
04:28:10,380 --> 04:28:13,260
cool so it deposited some collateral

6691
04:28:13,260 --> 04:28:17,159
and then we minted some DSC okay cool we

6692
04:28:17,159 --> 04:28:19,439
minted some DSC with some

6693
04:28:19,439 --> 04:28:22,080
stuff here and then we updated the

6694
04:28:22,080 --> 04:28:26,340
collateral price to 471. so as we know

6695
04:28:26,340 --> 04:28:28,920
our Handler update collateral price if

6696
04:28:28,920 --> 04:28:29,880
we scroll all the way to the bottom

6697
04:28:29,880 --> 04:28:33,000
update collateral price

6698
04:28:33,000 --> 04:28:37,560
471 updates the eth collateral from

6699
04:28:37,560 --> 04:28:41,340
two thousand dollars which is 2000 E8

6700
04:28:41,340 --> 04:28:43,739
2

6701
04:28:43,739 --> 04:28:46,979
or 71. so this remembers two thousand

6702
04:28:46,979 --> 04:28:48,540
one two three four five six seven eight

6703
04:28:48,540 --> 04:28:50,580
it went from this

6704
04:28:50,580 --> 04:28:53,819
to 471. so of course it reverted right

6705
04:28:53,819 --> 04:28:56,159
because people minted a ton of

6706
04:28:56,159 --> 04:28:57,899
collateral they deposited collateral

6707
04:28:57,899 --> 04:29:01,140
they minted a ton of DSC right look at

6708
04:29:01,140 --> 04:29:03,479
this input it's massive and the system

6709
04:29:03,479 --> 04:29:04,680
broke

6710
04:29:04,680 --> 04:29:07,439
and if we run this again with fewer V's

6711
04:29:07,439 --> 04:29:10,560
right VV we'll be able to see that total

6712
04:29:10,560 --> 04:29:12,659
Supply if we scroll up we'll be able to

6713
04:29:12,659 --> 04:29:14,880
see the weft value wrap Bitcoin value

6714
04:29:14,880 --> 04:29:17,640
and the total Supply here so actually it

6715
04:29:17,640 --> 04:29:19,680
looks like in this one it's set the new

6716
04:29:19,680 --> 04:29:21,359
price to three

6717
04:29:21,359 --> 04:29:23,399
so obviously the wet value is probably

6718
04:29:23,399 --> 04:29:26,159
zero or just about zero it let the mint

6719
04:29:26,159 --> 04:29:28,140
DSC because originally the collaterals

6720
04:29:28,140 --> 04:29:30,000
were was worth something and now it's

6721
04:29:30,000 --> 04:29:31,439
worth almost nothing

6722
04:29:31,439 --> 04:29:32,939
right

6723
04:29:32,939 --> 04:29:35,399
so this is an important thing for us to

6724
04:29:35,399 --> 04:29:38,159
take in mind in our system hey if the

6725
04:29:38,159 --> 04:29:42,120
price drops or spikes quickly our system

6726
04:29:42,120 --> 04:29:45,600
is screwed our system is busted and this

6727
04:29:45,600 --> 04:29:46,979
is something we would want to know about

6728
04:29:46,979 --> 04:29:48,720
and potentially go back in our code and

6729
04:29:48,720 --> 04:29:51,960
fix hey what do we do when the price

6730
04:29:51,960 --> 04:29:54,180
plummets in a single block

6731
04:29:54,180 --> 04:29:56,159
right now we have kind of this

6732
04:29:56,159 --> 04:29:58,979
assumption in here where we have

6733
04:29:58,979 --> 04:30:02,399
this liquidation 10 bonus and the

6734
04:30:02,399 --> 04:30:04,080
collateral always needs to be 200

6735
04:30:04,080 --> 04:30:05,640
overcollaterized

6736
04:30:05,640 --> 04:30:08,580
with this we're saying okay

6737
04:30:08,580 --> 04:30:11,580
between 200 over collateralization and

6738
04:30:11,580 --> 04:30:13,640
one ten percent over collateralization

6739
04:30:13,640 --> 04:30:16,080
as long as our system is within this

6740
04:30:16,080 --> 04:30:18,060
it's still safe I mean obviously it's

6741
04:30:18,060 --> 04:30:19,800
better if it's above this but as long as

6742
04:30:19,800 --> 04:30:21,300
our system is within this it's still

6743
04:30:21,300 --> 04:30:22,080
safe

6744
04:30:22,080 --> 04:30:24,120
but if the price plummets of some

6745
04:30:24,120 --> 04:30:25,439
collateral and let's say that's the only

6746
04:30:25,439 --> 04:30:26,960
collateral maybe we get to 50

6747
04:30:26,960 --> 04:30:29,220
collateralization rate and that would

6748
04:30:29,220 --> 04:30:31,080
break our entire system right that would

6749
04:30:31,080 --> 04:30:34,020
break our invariant our system will be

6750
04:30:34,020 --> 04:30:35,880
screwed so we can go back to the drawing

6751
04:30:35,880 --> 04:30:38,100
board figure out how to smooth this out

6752
04:30:38,100 --> 04:30:41,220
or we could say this is a known bug if

6753
04:30:41,220 --> 04:30:43,199
the price fluctuates or explodes too

6754
04:30:43,199 --> 04:30:45,479
quickly or too slowly this protocol

6755
04:30:45,479 --> 04:30:47,460
becomes worthless and that's kind of not

6756
04:30:47,460 --> 04:30:49,260
a great solution right so these are

6757
04:30:49,260 --> 04:30:50,460
things we absolutely want to keep in

6758
04:30:50,460 --> 04:30:52,020
mind and these are things that we can

6759
04:30:52,020 --> 04:30:55,319
find with invariant tests and this is

6760
04:30:55,319 --> 04:30:57,659
why they're so important so for now in

6761
04:30:57,659 --> 04:30:59,399
our Handler I'm actually just going to

6762
04:30:59,399 --> 04:31:01,439
even comment this out because it does

6763
04:31:01,439 --> 04:31:03,300
break our test Suite but I'm going to

6764
04:31:03,300 --> 04:31:05,279
put a little comment here this breaks

6765
04:31:05,279 --> 04:31:08,939
our invariant test suite and this would

6766
04:31:08,939 --> 04:31:11,640
100 be something that shows up in a

6767
04:31:11,640 --> 04:31:13,800
smart contract audit saying hey if the

6768
04:31:13,800 --> 04:31:16,080
price of an asset plummets too quickly

6769
04:31:16,080 --> 04:31:18,600
the system's breaking because it breaks

6770
04:31:18,600 --> 04:31:21,120
the invariant all right great now

6771
04:31:21,120 --> 04:31:22,620
there's a few more things I want to

6772
04:31:22,620 --> 04:31:24,659
teach only a few and then we're done

6773
04:31:24,659 --> 04:31:25,859
with this section

6774
04:31:25,859 --> 04:31:28,800
we're going to teach one some proper

6775
04:31:28,800 --> 04:31:32,340
Oracle use and then two we need to write

6776
04:31:32,340 --> 04:31:33,659
more tests

6777
04:31:33,659 --> 04:31:35,340
which we're not going to do I'm going to

6778
04:31:35,340 --> 04:31:37,140
leave that to you but we have a whole

6779
04:31:37,140 --> 04:31:38,640
bunch of other contracts in here like

6780
04:31:38,640 --> 04:31:40,620
the decentralized stablecoin

6781
04:31:40,620 --> 04:31:43,800
and then three some smart contract audit

6782
04:31:43,800 --> 04:31:45,659
preparedness

6783
04:31:45,659 --> 04:31:48,000
some smart contract audit preparation

6784
04:31:48,000 --> 04:31:50,460
so let's start with some Oracle proper

6785
04:31:50,460 --> 04:31:53,180
use

6786
04:31:55,319 --> 04:31:57,479
so in our DSC engine we're of course

6787
04:31:57,479 --> 04:32:00,060
using an oracle right we're using chain

6788
04:32:00,060 --> 04:32:02,819
link price feeds now this is kind of an

6789
04:32:02,819 --> 04:32:04,340
assumption that we have in our protocol

6790
04:32:04,340 --> 04:32:07,620
right now a price seeds are just going

6791
04:32:07,620 --> 04:32:09,359
to work but price leads are a system

6792
04:32:09,359 --> 04:32:11,640
just like anything else and we should

6793
04:32:11,640 --> 04:32:14,640
add some checks in our code here

6794
04:32:14,640 --> 04:32:18,120
just to make sure that if this breaks or

6795
04:32:18,120 --> 04:32:20,220
if something in here breaks our system

6796
04:32:20,220 --> 04:32:21,899
isn't broken

6797
04:32:21,899 --> 04:32:23,159
so what we're going to do is we're

6798
04:32:23,159 --> 04:32:25,380
actually use that Library methodology we

6799
04:32:25,380 --> 04:32:28,140
made years ago to write some checks on

6800
04:32:28,140 --> 04:32:31,819
this price feed so I'm going to make a

6801
04:32:32,220 --> 04:32:34,199
libraries folder and we're going to make

6802
04:32:34,199 --> 04:32:37,199
a new contract in here called

6803
04:32:37,199 --> 04:32:39,840
Oracle lib that's all

6804
04:32:39,840 --> 04:32:42,120
and we want to do is we want to check to

6805
04:32:42,120 --> 04:32:44,640
make sure that these prices aren't stale

6806
04:32:44,640 --> 04:32:46,080
if we click on any one of these prices

6807
04:32:46,080 --> 04:32:50,399
like eth USD let's scroll up to show

6808
04:32:50,399 --> 04:32:52,199
more details

6809
04:32:52,199 --> 04:32:54,420
just to show more details you can see

6810
04:32:54,420 --> 04:32:57,060
they have this heartbeat where a new

6811
04:32:57,060 --> 04:32:59,100
price should show up at least every 3

6812
04:32:59,100 --> 04:33:01,500
600 seconds I believe what this is right

6813
04:33:01,500 --> 04:33:04,439
yes on this pulley test net we want to

6814
04:33:04,439 --> 04:33:06,600
write some checks to make sure that this

6815
04:33:06,600 --> 04:33:08,641
is actually updating every 3600 seconds

6816
04:33:08,641 --> 04:33:10,500
and if it's not we should probably pause

6817
04:33:10,500 --> 04:33:13,020
the functionality of our contract so

6818
04:33:13,020 --> 04:33:16,260
we're going to make a spdx

6819
04:33:16,260 --> 04:33:17,660
license

6820
04:33:17,660 --> 04:33:21,359
identifier MIT fragment solidity like

6821
04:33:21,359 --> 04:33:22,141
this

6822
04:33:22,141 --> 04:33:24,240
we're going to do a library

6823
04:33:24,240 --> 04:33:26,520
Oracle lib and let's put a little

6824
04:33:26,520 --> 04:33:28,141
netspect to explain what this is going

6825
04:33:28,141 --> 04:33:32,279
to do say at title Patrick Collins oops

6826
04:33:32,279 --> 04:33:37,799
title Oracle lib at author Patrick

6827
04:33:37,799 --> 04:33:39,779
Collins

6828
04:33:39,779 --> 04:33:41,459
at notice

6829
04:33:41,459 --> 04:33:46,080
this library is used to check the chain

6830
04:33:46,080 --> 04:33:47,939
link

6831
04:33:47,939 --> 04:33:50,879
Oracle for stale

6832
04:33:50,879 --> 04:33:53,340
if a price is stale

6833
04:33:53,340 --> 04:33:54,660
function

6834
04:33:54,660 --> 04:34:00,240
will revert and render the dsce engine

6835
04:34:00,240 --> 04:34:04,561
on usable this is by Design so we're

6836
04:34:04,561 --> 04:34:06,240
going to say hey if a chain link price

6837
04:34:06,240 --> 04:34:08,641
feed is stale just stop don't let

6838
04:34:08,641 --> 04:34:10,799
anything happen because if a price is

6839
04:34:10,799 --> 04:34:12,779
wrong if a price is bad our whole

6840
04:34:12,779 --> 04:34:14,820
protocol is kind of bunked right so we

6841
04:34:14,820 --> 04:34:17,760
want to just freeze everything so we

6842
04:34:17,760 --> 04:34:22,799
want the DSC engine to freeze if price

6843
04:34:22,799 --> 04:34:25,020
has become stale

6844
04:34:25,020 --> 04:34:27,900
so if the chain link

6845
04:34:27,900 --> 04:34:32,219
Network explodes and you have a lot of

6846
04:34:32,219 --> 04:34:35,100
money locked in the protocol

6847
04:34:35,100 --> 04:34:37,080
too bad this is something that's going

6848
04:34:37,080 --> 04:34:38,400
to be a known issue right if the chain

6849
04:34:38,400 --> 04:34:40,141
link Network blows up and all the prices

6850
04:34:40,141 --> 04:34:41,400
become stale

6851
04:34:41,400 --> 04:34:43,260
yeah you're kind of screwed right and

6852
04:34:43,260 --> 04:34:45,180
maybe this is something we want to

6853
04:34:45,180 --> 04:34:47,520
account for but for now I'm just going

6854
04:34:47,520 --> 04:34:48,959
to say that's a known issue and we're

6855
04:34:48,959 --> 04:34:50,520
going to move on and this is where

6856
04:34:50,520 --> 04:34:52,400
you'll see me start to get more and more

6857
04:34:52,400 --> 04:34:55,799
particular about stuff this is where as

6858
04:34:55,799 --> 04:34:57,299
we get more and more advanced this is

6859
04:34:57,299 --> 04:34:59,279
where the details start to matter more

6860
04:34:59,279 --> 04:35:01,020
and more right all those little little

6861
04:35:01,020 --> 04:35:02,459
things that I kind of gloss over they

6862
04:35:02,459 --> 04:35:04,141
become they start to become more and

6863
04:35:04,141 --> 04:35:06,660
more important as this becomes closer

6864
04:35:06,660 --> 04:35:09,080
and closer to a real production product

6865
04:35:09,080 --> 04:35:12,959
that should go to audit right so let's

6866
04:35:12,959 --> 04:35:15,480