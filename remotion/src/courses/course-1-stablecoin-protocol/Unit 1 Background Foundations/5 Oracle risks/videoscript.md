# 5 Oracle risks

> **🎬 待录制 (Coming Soon)**

## 课程大纲

本节将深入讲解预言机安全风险及防护措施：

### 核心内容

1. **Chainlink 基础**
   - 去中心化预言机网络架构
   - AggregatorV3Interface 接口使用
   - Price feeds 数据来源与更新机制

2. **预言机攻击向量**
   - Stale price attacks (过期价格攻击)
   - Flash loan price manipulation (闪电贷操纵)
   - Front-running 与 MEV 风险

3. **防护策略**
   - Heartbeat 检查机制
   - 价格偏差阈值设置
   - Circuit breaker 熔断器设计

### 代码实现

- `OracleLib.sol` 安全检查库
- `staleCheckLatestRoundData()` 实现
- 极端市场条件下的协议保护

### 实战案例

- 历史预言机攻击事件分析
- 如何选择合适的 Chainlink feed
- 测试预言机失败场景

---

*本章节内容将基于代码库中的 `OracleLib.sol` 和 `OracleManager.sol` 进行录制*

867
00:31:54,120 --> 00:31:55,799
start with die as we've mentioned before

868
00:31:55,799 --> 00:31:58,740
dye is a pegged algorithmic and

869
00:31:58,740 --> 00:32:00,659
exogenously collateralized stablecoin

870
00:32:00,659 --> 00:32:02,100
it's one of the most influential D5

871
00:32:02,100 --> 00:32:04,380
projects ever created and was a huge

872
00:32:04,380 --> 00:32:06,539
factor in supercharging the D5 space

873
00:32:06,539 --> 00:32:09,240
roughly the way it works is you deposit

874
00:32:09,240 --> 00:32:11,279
eth or some other crypto collateral into

875
00:32:11,279 --> 00:32:13,679
the smart contract that has this die

876
00:32:13,679 --> 00:32:15,840
algorithm code and based off the current

877
00:32:15,840 --> 00:32:18,240
collateral to US dollar or each US

878
00:32:18,240 --> 00:32:21,299
dollar price it'll mint you some amount

879
00:32:21,299 --> 00:32:25,020
of dye you can only mint less dye than

880
00:32:25,020 --> 00:32:27,059
the total value of collateral or eat

881
00:32:27,059 --> 00:32:29,220
that you have this way the system always

882
00:32:29,220 --> 00:32:31,200
has more collateral than they'd have

883
00:32:31,200 --> 00:32:34,380
minted dye additionally every year or so

884
00:32:34,380 --> 00:32:36,299
it'll get charged something called a

885
00:32:36,299 --> 00:32:38,820
stability fee usually around like two

886
00:32:38,820 --> 00:32:40,559
percent and now you're free to do

887
00:32:40,559 --> 00:32:42,299
whatever you want with your die if you

888
00:32:42,299 --> 00:32:43,860
want to get your eat back you have to

889
00:32:43,860 --> 00:32:45,600
give your die back to the smart contract

890
00:32:45,600 --> 00:32:47,640
which which will then burn your die

891
00:32:47,640 --> 00:32:49,919
it'll use the current price of e to

892
00:32:49,919 --> 00:32:51,659
figure out how much money it should give

893
00:32:51,659 --> 00:32:53,340
back to you it's because of this

894
00:32:53,340 --> 00:32:55,740
stability fee and collateralized eth

895
00:32:55,740 --> 00:32:57,600
that people often refer to this system

896
00:32:57,600 --> 00:33:00,840
as a collateralized debt position since

897
00:33:00,840 --> 00:33:04,080
we technically owe die back to the

898
00:33:04,080 --> 00:33:06,659
protocol at some point so yes all the

899
00:33:06,659 --> 00:33:09,179
dye that's in existence somebody minted

900
00:33:09,179 --> 00:33:12,059
from the maker protocol and needs to pay

901
00:33:12,059 --> 00:33:14,640
it back at some point if you can't pay

902
00:33:14,640 --> 00:33:16,500
your stability fees or the price of each

903
00:33:16,500 --> 00:33:18,179
tanks and now the value of our

904
00:33:18,179 --> 00:33:20,039
collateral is less than the value of the

905
00:33:20,039 --> 00:33:22,500
die that we minted people can liquidate

906
00:33:22,500 --> 00:33:24,539
us which means they can take our

907
00:33:24,539 --> 00:33:26,580
collateral protocol always needs to have

908
00:33:26,580 --> 00:33:28,559
more collateral than men to die so this

909
00:33:28,559 --> 00:33:30,000
is sort of your punishment for not

910
00:33:30,000 --> 00:33:31,679
keeping the collateral up and a way to

911
00:33:31,679 --> 00:33:33,720
save the system from becoming under

912
00:33:33,720 --> 00:33:35,580
collateralized and then there's also a

913
00:33:35,580 --> 00:33:36,899
maker token that's used to vote for

914
00:33:36,899 --> 00:33:38,460
stuff now the reason I give this

915
00:33:38,460 --> 00:33:40,440
overview is I want your brain to be

916
00:33:40,440 --> 00:33:43,260
asking the question hey I get charged to

917
00:33:43,260 --> 00:33:45,539
Mint a stablecoin all the dye in the

918
00:33:45,539 --> 00:33:48,179
world somebody's being charged to have

919
00:33:48,179 --> 00:33:50,760
it out there someone could take my

920
00:33:50,760 --> 00:33:52,440
collateral if I don't monitor the

921
00:33:52,440 --> 00:33:54,840
balance and most importantly why would I

922
00:33:54,840 --> 00:33:57,059
spend money to Mint this stable Point

923
00:33:57,059 --> 00:33:58,740
why would I be the one to do that great

924
00:33:58,740 --> 00:34:00,480
question that is the fundamental

925
00:34:00,480 --> 00:34:03,600
question and we'll get to that usdc usdc

926
00:34:03,600 --> 00:34:06,000
is a classic pegged governed exogenously

927
00:34:06,000 --> 00:34:07,740
collateralized stablecoin it's backed by

928
00:34:07,740 --> 00:34:09,540
real world dollars in a bank account not

929
00:34:09,540 --> 00:34:11,879