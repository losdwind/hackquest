# 3 Collateral management

> **🎬 待录制 (Coming Soon)**

## 课程大纲

本节将讲解如何管理多种抵押品类型：

### 核心内容

1. **多抵押品架构**
   - wETH 和 wBTC 支持
   - Collateral allowlist 白名单机制
   - 每种抵押品的独立价格 feed

2. **数据结构设计**
   - `mapping(address => address)` 价格映射
   - `address[] s_collateralTokens` 列表管理
   - 用户抵押品余额追踪

3. **安全检查**
   - `isAllowedToken` modifier 实现
   - 添加新抵押品的治理流程
   - 抵押品价格更新策略

### 代码实现

```solidity
mapping(address token => address priceFeed) private s_priceFeeds;
address[] private s_collateralTokens;

modifier isAllowedToken(address token) {
    if (s_priceFeeds[token] == address(0)) {
        revert DSCEngine__TokenNotAllowed(token);
    }
    _;
}
```

### 实战要点

- 如何安全添加新的抵押品类型
- 不同抵押品的风险权重设计
- 测试多抵押品场景

---

*本章节将扩展 Unit 2.2 Token implementation 中的抵押品管理逻辑*

1366
00:50:56,819 --> 00:50:58,440
where the owner is going to be that

1367
00:50:58,440 --> 00:51:00,420
immutable logic we're going to create

1368
00:51:00,420 --> 00:51:02,220
so open Zeppelin has a package for that

1369
00:51:02,220 --> 00:51:04,500
too so we're going to do import ownable

1370
00:51:04,500 --> 00:51:07,680
from at open Zeppelin slash contracts

1371
00:51:07,680 --> 00:51:09,920
slash access

1372
00:51:09,920 --> 00:51:12,720
ownable.soul I'm going to copy this

1373
00:51:12,720 --> 00:51:14,579
so our contract is going to be erc20

1374
00:51:14,579 --> 00:51:17,160
burnable and it's going to be ownable

1375
00:51:17,160 --> 00:51:19,500
and there's going to be two major

1376
00:51:19,500 --> 00:51:23,160
functions that we want our engine to own

1377
00:51:23,160 --> 00:51:25,380
those functions are going to be function

1378
00:51:25,380 --> 00:51:26,520
burn

1379
00:51:26,520 --> 00:51:29,460
where it takes in a un256

1380
00:51:29,460 --> 00:51:31,200
underscore amount

1381
00:51:31,200 --> 00:51:33,839
public we're going to override the burn

1382
00:51:33,839 --> 00:51:35,819
function of burnable and this is going

1383
00:51:35,819 --> 00:51:38,599
to be only owner so that only the engine

1384
00:51:38,599 --> 00:51:41,460
only the logic that we give it can mint

1385
00:51:41,460 --> 00:51:43,880
and burn and we're going to say u in 256

1386
00:51:43,880 --> 00:51:46,380
balance equals

1387
00:51:46,380 --> 00:51:49,920
bounce of message.sender

1388
00:51:49,920 --> 00:51:52,140
and we're going to make sure that

1389
00:51:52,140 --> 00:51:53,940
somebody when somebody tries to burn

1390
00:51:53,940 --> 00:51:55,440
some token they at least have that much

1391
00:51:55,440 --> 00:51:57,839
token so we're first of all going to say

1392
00:51:57,839 --> 00:52:01,200
if the amount is less than or equal to

1393
00:52:01,200 --> 00:52:04,140
zero then they can't burn right we don't

1394
00:52:04,140 --> 00:52:05,760
want people to try burning zero that's

1395
00:52:05,760 --> 00:52:08,520
silly so we're going to revert with an

1396
00:52:08,520 --> 00:52:10,619
error I'm going to put all of our errors

1397
00:52:10,619 --> 00:52:12,839
right up at the top here error

1398
00:52:12,839 --> 00:52:15,000
essentially stablecoin underscore

1399
00:52:15,000 --> 00:52:20,339
underscore must be more than zero like

1400
00:52:20,339 --> 00:52:22,200
this so we're going to revert with this

1401
00:52:22,200 --> 00:52:24,000
error and then we're also going to say

1402
00:52:24,000 --> 00:52:25,020
if

1403
00:52:25,020 --> 00:52:27,480
the user's balance is less than the

1404
00:52:27,480 --> 00:52:29,400
amount that they're trying to burn

1405
00:52:29,400 --> 00:52:31,200
then we're going to revert

1406
00:52:31,200 --> 00:52:33,119
with another custom error I'm just going

1407
00:52:33,119 --> 00:52:34,440
to copy paste

1408
00:52:34,440 --> 00:52:37,400
and I'm just going to say burn amount

1409
00:52:37,400 --> 00:52:40,079
exceeds balance

1410
00:52:40,079 --> 00:52:43,260
boom paste it in like this and then

1411
00:52:43,260 --> 00:52:44,099
finally we're going to do this thing

1412
00:52:44,099 --> 00:52:45,960
called super dot burn which we haven't

1413
00:52:45,960 --> 00:52:48,599
talked about yet so this super keyword

1414
00:52:48,599 --> 00:52:50,880
basically says hey

1415
00:52:50,880 --> 00:52:54,000
use the burn function from the parent

1416
00:52:54,000 --> 00:52:56,520
class which in this case is the erc20

1417
00:52:56,520 --> 00:52:58,559
burnable so all this code is going to

1418
00:52:58,559 --> 00:53:01,200
run it's going to hit this line it's

1419
00:53:01,200 --> 00:53:02,579
going to say hey go to the Super class

1420
00:53:02,579 --> 00:53:05,400
and use the burn function there so our

1421
00:53:05,400 --> 00:53:07,140
code is going to go oh okay well erc20

1422
00:53:07,140 --> 00:53:08,940
burnable that's the super class or the

1423
00:53:08,940 --> 00:53:10,920
parent class ah just use the burn

1424
00:53:10,920 --> 00:53:13,020
function in here which calls the burn

1425
00:53:13,020 --> 00:53:15,720
function here in the year see 20. sole

1426
00:53:15,720 --> 00:53:18,300
which does all this stuff in here so

1427
00:53:18,300 --> 00:53:20,579
that's what the super keyword does only

1428
00:53:20,579 --> 00:53:22,319
owner only engine is going to add this

1429
00:53:22,319 --> 00:53:24,960
now we're going to do this function mint

1430
00:53:24,960 --> 00:53:28,260
this is going to be an address too and a

1431
00:53:28,260 --> 00:53:31,680
uint 256 underscore amount

1432
00:53:31,680 --> 00:53:33,720
this is going to be public

1433
00:53:33,720 --> 00:53:34,800
excuse me this is actually going to be

1434
00:53:34,800 --> 00:53:35,880
external

1435
00:53:35,880 --> 00:53:38,520
also only owner this one probably could

1436
00:53:38,520 --> 00:53:40,200
be external as well

1437
00:53:40,200 --> 00:53:42,780
but that'll come out in the audit

1438
00:53:42,780 --> 00:53:44,760
external only owner

1439
00:53:44,760 --> 00:53:47,220
and this is actually going to return the

1440
00:53:47,220 --> 00:53:49,559
Boolean when you do mint you want to

1441
00:53:49,559 --> 00:53:51,720
have a return of Boolean here when you

1442
00:53:51,720 --> 00:53:53,400
do a mint we're going to return true if

1443
00:53:53,400 --> 00:53:54,660
it actually works

1444
00:53:54,660 --> 00:53:56,339
but we're going to say if

1445
00:53:56,339 --> 00:53:59,400
2 equals equals address zero we're gonna

1446
00:53:59,400 --> 00:54:03,119
do a little sanitization of the inputs

1447
00:54:03,119 --> 00:54:06,119
here then we're going to revert revert

1448
00:54:06,119 --> 00:54:08,819
with a new error error

1449
00:54:08,819 --> 00:54:12,119
to Central stablecoin not zero address

1450
00:54:12,119 --> 00:54:13,619
we're not going to let people

1451
00:54:13,619 --> 00:54:15,480
accidentally mint to the zero address

1452
00:54:15,480 --> 00:54:18,240
because that happens kind of a lot and

1453
00:54:18,240 --> 00:54:21,240
we're going to say if the amount is less

1454
00:54:21,240 --> 00:54:23,160
than or equal to zero then we're also

1455
00:54:23,160 --> 00:54:27,540
going to revert with this more than zero

1456
00:54:27,540 --> 00:54:30,720
error here boom and then finally we're

1457
00:54:30,720 --> 00:54:32,760
going to return true oh and then

1458
00:54:32,760 --> 00:54:36,119
obviously we should run mint underscore

1459
00:54:36,119 --> 00:54:39,000
two comedy score amount so we're not

1460
00:54:39,000 --> 00:54:41,220
overriding any functions in here right

1461
00:54:41,220 --> 00:54:43,500
we're just calling the Min function over

1462
00:54:43,500 --> 00:54:45,780
here we had to do super because we're

1463
00:54:45,780 --> 00:54:47,640
overriding the burn function we're

1464
00:54:47,640 --> 00:54:49,619
saying hey do all this stuff and then do

1465
00:54:49,619 --> 00:54:51,660
the regular burn there is no mint

1466
00:54:51,660 --> 00:54:53,280
function there's an underscore mint

1467
00:54:53,280 --> 00:54:54,599
function that we're going to be calling

1468
00:54:54,599 --> 00:54:56,280
and guess what

1469
00:54:56,280 --> 00:54:59,220
that's it this contract's done we're not

1470
00:54:59,220 --> 00:55:03,119
doing any more here Forge build cool and

1471
00:55:03,119 --> 00:55:04,200
then we probably want to write some

1472
00:55:04,200 --> 00:55:05,940
tests for this write a deploy script but

1473
00:55:05,940 --> 00:55:07,020
we're going to do all that in a little

1474
00:55:07,020 --> 00:55:09,200
bit

1475
00:55:11,220 --> 00:55:13,740
now what we're going to do is we're

1476
00:55:13,740 --> 00:55:15,599
going to build the engine the engine to

1477
00:55:15,599 --> 00:55:18,059
the car the main components of this

1478
00:55:18,059 --> 00:55:20,280
contract you want to take a break and be

1479
00:55:20,280 --> 00:55:22,319
proud of yourself right here go for it

1480
00:55:22,319 --> 00:55:23,880
if you want to even pause the video

1481
00:55:23,880 --> 00:55:25,200
start writing some of your own tests

1482
00:55:25,200 --> 00:55:26,819
write your own deploy Scripts

1483
00:55:26,819 --> 00:55:30,420
go for it but let's go ahead and start

1484
00:55:30,420 --> 00:55:32,700
building this engine

1485
00:55:32,700 --> 00:55:34,020
and we're going to be building this a

1486
00:55:34,020 --> 00:55:35,099
little bit different than some of the

1487
00:55:35,099 --> 00:55:37,319
other projects we might even be testing

1488
00:55:37,319 --> 00:55:39,180
some of this along the way to make sure

1489
00:55:39,180 --> 00:55:41,520
we get things right so I'm going to go

1490
00:55:41,520 --> 00:55:44,300
ahead create a new file

1491
00:55:46,880 --> 00:55:49,920
centralized stablecoin engine and let's

1492
00:55:49,920 --> 00:55:53,579
build this engine to this car all right

1493
00:55:53,579 --> 00:55:55,440
let's go back to

1494
00:55:55,440 --> 00:55:57,780
let me grab I'm just going to copy paste

1495
00:55:57,780 --> 00:56:00,359
this beginning part let's come to the

1496
00:56:00,359 --> 00:56:03,900
engine paste that in we have spdx layout

1497
00:56:03,900 --> 00:56:07,579
of contracts pragma solidity contract

1498
00:56:07,579 --> 00:56:10,440
DSC engine

1499
00:56:10,440 --> 00:56:11,460
this

1500
00:56:11,460 --> 00:56:14,760
let's give this a lot of nat spec

1501
00:56:14,760 --> 00:56:17,640
all right title DSC engine I don't want

1502
00:56:17,640 --> 00:56:22,020
that at author ah or

1503
00:56:22,020 --> 00:56:26,220
Patrick Collins the system is designed

1504
00:56:26,220 --> 00:56:29,880
to be as minimal as possible

1505
00:56:29,880 --> 00:56:34,740
and have the tokens maintain a one

1506
00:56:34,740 --> 00:56:35,700
dollar

1507
00:56:35,700 --> 00:56:40,319
contain a one token equals equals one

1508
00:56:40,319 --> 00:56:42,839
dollar Peg let's toggle the word wrap

1509
00:56:42,839 --> 00:56:47,780
this stable coin has the properties

1510
00:56:51,420 --> 00:56:55,440
algorithmic stable it is similar to die

1511
00:56:55,440 --> 00:56:56,940
if die

1512
00:56:56,940 --> 00:57:01,079
had no governance no fees and was only

1513
00:57:01,079 --> 00:57:05,280
backed by wrapped eth and wrapped

1514
00:57:05,280 --> 00:57:09,000
Bitcoin at notice this contract is the

1515
00:57:09,000 --> 00:57:15,300
core of the DSC system it handles all

1516
00:57:15,300 --> 00:57:20,180
the logic or minting and redeeming ESC

1517
00:57:20,180 --> 00:57:23,700
as well as the positing

1518
00:57:23,700 --> 00:57:28,619
and drawing collateral notice this

1519
00:57:28,619 --> 00:57:35,160
contract is very Loosely based on die on

1520
00:57:35,160 --> 00:57:40,619
the maker Dow DSS die system you might

1521
00:57:40,619 --> 00:57:42,660
be asking Patrick that's a lot of text

1522
00:57:42,660 --> 00:57:46,079
here yes we want a lot of text when

1523
00:57:46,079 --> 00:57:48,359
people read our code our code should be

1524
00:57:48,359 --> 00:57:50,520
readable remember

1525
00:57:50,520 --> 00:57:52,920
your code is going to be written once

1526
00:57:52,920 --> 00:57:56,940
read hundreds of thousands of times I

1527
00:57:56,940 --> 00:58:00,720
have read the Ave and maker code so many

1528
00:58:00,720 --> 00:58:03,180
times and so many other people have as

1529
00:58:03,180 --> 00:58:05,339
well you want your code to be very

1530
00:58:05,339 --> 00:58:07,260
verbose so that other people can come

1531
00:58:07,260 --> 00:58:10,920
and understand what's going on so let's

1532
00:58:10,920 --> 00:58:12,119
begin

1533
00:58:12,119 --> 00:58:14,099
so let's think about what are the main

1534
00:58:14,099 --> 00:58:16,740
functions that our project should have

1535
00:58:16,740 --> 00:58:18,480
one of the main things that we should do

1536
00:58:18,480 --> 00:58:20,400
right before we start even start coding

1537
00:58:20,400 --> 00:58:22,680
anything and oftentimes a lot of people

1538
00:58:22,680 --> 00:58:24,480
will take this step and will actually

1539
00:58:24,480 --> 00:58:26,339
create an interface

1540
00:58:26,339 --> 00:58:28,380
or their code they'll create an

1541
00:58:28,380 --> 00:58:29,700
interface and say hey here's all the

1542
00:58:29,700 --> 00:58:31,680
functions that I want this to do and

1543
00:58:31,680 --> 00:58:33,359
then they'll say hey our contract is

1544
00:58:33,359 --> 00:58:35,099
that interface so that they don't forget

1545
00:58:35,099 --> 00:58:37,680
any of those functions for us I'm just

1546
00:58:37,680 --> 00:58:38,819
going to go ahead and write them out

1547
00:58:38,819 --> 00:58:40,980
here so I want one function to be

1548
00:58:40,980 --> 00:58:41,900
function

1549
00:58:41,900 --> 00:58:47,400
deposit lateral and mint DSC I want

1550
00:58:47,400 --> 00:58:49,200
people to be able to deposit their die

1551
00:58:49,200 --> 00:58:52,440
or their Bitcoin and mint our DSC token

1552
00:58:52,440 --> 00:58:54,900
I want people to redeem

1553
00:58:54,900 --> 00:58:57,780
they're collateral or DSC

1554
00:58:57,780 --> 00:59:00,240
right when people are done with doing

1555
00:59:00,240 --> 00:59:01,799
whatever they want with the stable coin

1556
00:59:01,799 --> 00:59:03,900
they can turn the stable coin to the D

1557
00:59:03,900 --> 00:59:06,119
the DSC decentralized stable coin back

1558
00:59:06,119 --> 00:59:08,099
in for whatever collateral they

1559
00:59:08,099 --> 00:59:09,480
originally used

1560
00:59:09,480 --> 00:59:12,119
I want people to be able to function

1561
00:59:12,119 --> 00:59:15,540
burn their DSC and the reason for this

1562
00:59:15,540 --> 00:59:18,000
is if they're nervous that they have too

1563
00:59:18,000 --> 00:59:19,200
much stablecoin and not enough

1564
00:59:19,200 --> 00:59:20,520
collateral and they want just a quick

1565
00:59:20,520 --> 00:59:22,980
way to have more collateral than DSC

1566
00:59:22,980 --> 00:59:25,920
they can quickly burn stuff which is

1567
00:59:25,920 --> 00:59:27,660
another part of the system

1568
00:59:27,660 --> 00:59:30,240
we should even put a point in here our

1569
00:59:30,240 --> 00:59:32,700
DSC should

1570
00:59:32,700 --> 00:59:37,559
or DSC system should always be over

1571
00:59:37,559 --> 00:59:39,660
collateralized

1572
00:59:39,660 --> 00:59:42,960
at no point should the value

1573
00:59:42,960 --> 00:59:46,920
of all collateral be less than or equal

1574
00:59:46,920 --> 00:59:51,660
to the value of all the DSC or the

1575
00:59:51,660 --> 00:59:55,500
dollar backed value of all the DSC we

1576
00:59:55,500 --> 00:59:58,020
should always have more collateral than

1577
00:59:58,020 --> 01:00:00,180
DSC in the system at all times and we

1578
01:00:00,180 --> 01:00:03,359
need to code in such a way so burn DSC

1579
01:00:03,359 --> 01:00:05,760
is a function that will make more sense

1580
01:00:05,760 --> 01:00:07,740
in a little bit we should have a

1581
01:00:07,740 --> 01:00:08,760
function

1582
01:00:08,760 --> 01:00:11,339
called liquidate and this is going to be

1583
01:00:11,339 --> 01:00:13,859
a really important function the reason

1584
01:00:13,859 --> 01:00:15,960
that we're always going to have more

1585
01:00:15,960 --> 01:00:17,880
collateral if the value of their

1586
01:00:17,880 --> 01:00:20,220
collateral drops too much let's say

1587
01:00:20,220 --> 01:00:23,700
let's say I put in 100 worth of eth and

1588
01:00:23,700 --> 01:00:27,720
I minted fifty dollars worth of DSC I

1589
01:00:27,720 --> 01:00:29,760
have more collateral than DSC that's

1590
01:00:29,760 --> 01:00:34,440
good what if the eth price tanks to

1591
01:00:34,440 --> 01:00:38,220
forty dollars forty eth now we are under

1592
01:00:38,220 --> 01:00:40,200
collateralized right now we have less

1593
01:00:40,200 --> 01:00:44,520
eth than we have DSC and keep and this

1594
01:00:44,520 --> 01:00:46,619
user should get what's called liquidated

1595
01:00:46,619 --> 01:00:48,240
they shouldn't be allowed to hold a

1596
01:00:48,240 --> 01:00:49,200
position

1597
01:00:49,200 --> 01:00:51,180
in our system anymore

1598
01:00:51,180 --> 01:00:53,880
so ideally we set some threshold that's

1599
01:00:53,880 --> 01:00:57,059
too low maybe it's maybe it's 20 percent

1600
01:00:57,059 --> 01:01:00,240
and if you hold 60 worth of eth at fifty

1601
01:01:00,240 --> 01:01:02,040
dollars worth of DSC you should get

1602
01:01:02,040 --> 01:01:03,480
kicked out of the system because you're

1603
01:01:03,480 --> 01:01:04,920
way too close to being under

1604
01:01:04,920 --> 01:01:07,500
collateralized this liquidate function

1605
01:01:07,500 --> 01:01:09,599
is going to be the function that other

1606
01:01:09,599 --> 01:01:11,700
users can call to remove people's

1607
01:01:11,700 --> 01:01:14,160
positions to save the protocol and we'll

1608
01:01:14,160 --> 01:01:15,660
talk about that a little bit more very

1609
01:01:15,660 --> 01:01:17,280
soon and we're going to want to function

1610
01:01:17,280 --> 01:01:19,260
Health Factor

1611
01:01:19,260 --> 01:01:21,180
this should be an external view function

1612
01:01:21,180 --> 01:01:24,660
or excuse me get health Factor and this

1613
01:01:24,660 --> 01:01:26,579
will allow to see how healthy people are

1614
01:01:26,579 --> 01:01:30,240
so let's go back up to this example here

1615
01:01:30,240 --> 01:01:33,180
so if if the price of V dumps to forty

1616
01:01:33,180 --> 01:01:35,520
dollars we're now ten dollars under

1617
01:01:35,520 --> 01:01:38,099
collateralized right and that's not good

1618
01:01:38,099 --> 01:01:40,319
that's really bad we never want this to

1619
01:01:40,319 --> 01:01:41,040
happen

1620
01:01:41,040 --> 01:01:43,500
so what we can do is we can set a

1621
01:01:43,500 --> 01:01:48,420
threshold to let's say for this example

1622
01:01:48,420 --> 01:01:51,540
fifty percent or a hundred and fifty

1623
01:01:51,540 --> 01:01:54,059
percent so if you have fifty dollars in

1624
01:01:54,059 --> 01:01:55,079
the system

1625
01:01:55,079 --> 01:01:57,839
you need to have at least 75 eth at all

1626
01:01:57,839 --> 01:01:58,619
times

1627
01:01:58,619 --> 01:02:00,059
this way there's a little bit of a

1628
01:02:00,059 --> 01:02:01,859
buffer that way we can never be under

1629
01:02:01,859 --> 01:02:03,660
collateralized if the price tanks here

1630
01:02:03,660 --> 01:02:06,480
if you go to seventy four dollars now

1631
01:02:06,480 --> 01:02:09,000
what we can do is we can liquidate and

1632
01:02:09,000 --> 01:02:12,960
we can say hey if someone liquid if

1633
01:02:12,960 --> 01:02:16,500
someone pays back your borrow your

1634
01:02:16,500 --> 01:02:21,059
minted DSC they can have all your

1635
01:02:21,059 --> 01:02:23,819
collateral or a discount

1636
01:02:23,819 --> 01:02:26,400
so maybe we say hey somebody pay back

1637
01:02:26,400 --> 01:02:31,500
this 50 DSC and you can have this 74

1638
01:02:31,500 --> 01:02:33,660
dollars worth of eth somebody's going to

1639
01:02:33,660 --> 01:02:34,920
be very incentivized to do this because

1640
01:02:34,920 --> 01:02:36,420
they're going to make twenty twenty four

1641
01:02:36,420 --> 01:02:37,260
dollars

1642
01:02:37,260 --> 01:02:40,140
so we'll set some threshold maybe 150

1643
01:02:40,140 --> 01:02:42,599
percent and we'll we'll say hey anybody

1644
01:02:42,599 --> 01:02:44,819
who liquidates your position if you're

1645
01:02:44,819 --> 01:02:47,520
under the threshold they can have as a

1646
01:02:47,520 --> 01:02:50,040
reward some of your extra collateral and

1647
01:02:50,040 --> 01:02:51,599
this will incentivize people to always

1648
01:02:51,599 --> 01:02:53,579
have extra collateral otherwise they're

1649
01:02:53,579 --> 01:02:55,140
going to lose way more money than they

1650
01:02:55,140 --> 01:02:57,599
borrowed that didn't make sense so one

1651
01:02:57,599 --> 01:03:00,420
more time let's do that example so if I

1652
01:03:00,420 --> 01:03:03,359
mint so if I put down 100 worth of

1653
01:03:03,359 --> 01:03:06,000
ether's collateral and I mint

1654
01:03:06,000 --> 01:03:08,700
fifty dollars worth of DSC now I'm going

1655
01:03:08,700 --> 01:03:10,740
to go off and do whatever I want with DC

1656
01:03:10,740 --> 01:03:14,640
price of my eth tanks to

1657
01:03:14,640 --> 01:03:16,500
75 dollars

1658
01:03:16,500 --> 01:03:18,119
or better yet let's say seventy four

1659
01:03:18,119 --> 01:03:20,280
dollars some other user is going to see

1660
01:03:20,280 --> 01:03:23,280
oh my God under collateralize

1661
01:03:23,280 --> 01:03:25,079
and we're going to let people liquidate

1662
01:03:25,079 --> 01:03:26,640
their positions if they become under

1663
01:03:26,640 --> 01:03:28,799
collateralized based off the threshold

1664
01:03:28,799 --> 01:03:30,240
some other users are going to see that

1665
01:03:30,240 --> 01:03:32,760
and they're going to say okay I'll

1666
01:03:32,760 --> 01:03:36,780
pay back the 50 of DSC I'll pay back the

1667
01:03:36,780 --> 01:03:38,160
fifty dollars of DC so now this person

1668
01:03:38,160 --> 01:03:42,119
has zero debt and in return get all your

1669
01:03:42,119 --> 01:03:43,260
collateral

1670
01:03:43,260 --> 01:03:45,000
so now this person has zero dollars

1671
01:03:45,000 --> 01:03:48,420
worth of eth and this user got the 74

1672
01:03:48,420 --> 01:03:51,359
dollars and all they had to do was pay

1673
01:03:51,359 --> 01:03:54,359
fifty dollars of DSC to get seventy four

1674
01:03:54,359 --> 01:03:57,000
dollars of eth so this person is now up

1675
01:03:57,000 --> 01:03:59,220
just made twenty five dollars or twenty

1676
01:03:59,220 --> 01:04:00,180
four dollars

1677
01:04:00,180 --> 01:04:03,540
why liquidating you they're incentivized

1678
01:04:03,540 --> 01:04:04,559
to make money

1679
01:04:04,559 --> 01:04:06,240
and this is your punishment for letting

1680
01:04:06,240 --> 01:04:08,640
your collateral get too low

1681
01:04:08,640 --> 01:04:10,680
so hopefully that makes sense if this

1682
01:04:10,680 --> 01:04:12,480
system of liquidations doesn't make

1683
01:04:12,480 --> 01:04:14,819
sense to you you know where to go come

1684
01:04:14,819 --> 01:04:16,500
to the GitHub reposis with this course

1685
01:04:16,500 --> 01:04:19,020
and start joining the discussion all

1686
01:04:19,020 --> 01:04:20,520
right so hopefully this made sense if it

1687
01:04:20,520 --> 01:04:22,020
doesn't use the discussions tab of

1688
01:04:22,020 --> 01:04:23,839
course now these are kind of this

1689
01:04:23,839 --> 01:04:25,920
combination function we're probably

1690
01:04:25,920 --> 01:04:27,359
going to want a function just called

1691
01:04:27,359 --> 01:04:31,559
deposit this deposit collateral external

1692
01:04:31,559 --> 01:04:33,960
I'm probably going to want to function

1693
01:04:33,960 --> 01:04:35,700
redeem

1694
01:04:35,700 --> 01:04:38,700
collateral external and then we're

1695
01:04:38,700 --> 01:04:40,020
probably going to want

1696
01:04:40,020 --> 01:04:41,940
along with a burn DC we're probably

1697
01:04:41,940 --> 01:04:44,700
going to want to function mint DSC

1698
01:04:44,700 --> 01:04:47,160
external and these look like these are

1699
01:04:47,160 --> 01:04:48,839
probably going to be the majority of

1700
01:04:48,839 --> 01:04:50,640
what a protocol does and what a lot of

1701
01:04:50,640 --> 01:04:52,140
people even do is sometimes they'll even

1702
01:04:52,140 --> 01:04:54,780
write tests right now describing what

1703
01:04:54,780 --> 01:04:56,640
each one of these should actually do to

1704
01:04:56,640 --> 01:04:58,440
the system right we're not going to do

1705
01:04:58,440 --> 01:04:59,940
that but we may actually write some

1706
01:04:59,940 --> 01:05:02,460
tests as we go along here

1707
01:05:02,460 --> 01:05:05,099
and I like to write my deploy script

1708
01:05:05,099 --> 01:05:06,780
kind of early and you'll see me do that

1709
01:05:06,780 --> 01:05:09,660
here that way I can write tests using my

1710
01:05:09,660 --> 01:05:13,880
deploy script so let's go ahead though

1711
01:05:15,900 --> 01:05:17,700
where is the best place to start

1712
01:05:17,700 --> 01:05:20,160
tackling this well to me the easiest

1713
01:05:20,160 --> 01:05:21,299
place to start is actually with the

1714
01:05:21,299 --> 01:05:23,280
depositing right because that's the

1715
01:05:23,280 --> 01:05:24,599
first thing people are realistically

1716
01:05:24,599 --> 01:05:25,740
going to do with this protocol is

1717
01:05:25,740 --> 01:05:28,140
actually deposit the collateral so I'm

1718
01:05:28,140 --> 01:05:30,660
going to start there so for this deposit

1719
01:05:30,660 --> 01:05:32,160
collateral function

1720
01:05:32,160 --> 01:05:33,480
what are they going to want to do here

1721
01:05:33,480 --> 01:05:34,380
well

1722
01:05:34,380 --> 01:05:36,000
we're gonna need to let them pick what

1723
01:05:36,000 --> 01:05:37,500
collateral they want to deposit so we'll

1724
01:05:37,500 --> 01:05:41,339
say address token collateral address

1725
01:05:41,339 --> 01:05:44,339
and then also the unit 56 amount

1726
01:05:44,339 --> 01:05:46,319
collateral and we're going to do a

1727
01:05:46,319 --> 01:05:48,599
little toggle word wrap all right cool

1728
01:05:48,599 --> 01:05:50,579
so to pause the collateral the token

1729
01:05:50,579 --> 01:05:52,140
collateral address and then the amounts

1730
01:05:52,140 --> 01:05:53,819
that they're going to want to do so

1731
01:05:53,819 --> 01:05:55,440
already we can see that there's going to

1732
01:05:55,440 --> 01:05:56,640
be a whole bunch of stuff that we're

1733
01:05:56,640 --> 01:05:58,859
going to want to do here so

1734
01:05:58,859 --> 01:06:01,140
let's even do a little bit in that spec

1735
01:06:01,140 --> 01:06:03,299
a bit of that specific here we'll say

1736
01:06:03,299 --> 01:06:04,920
app Ram we'll just explain what the

1737
01:06:04,920 --> 01:06:07,799
params are and this is where

1738
01:06:07,799 --> 01:06:09,839
GitHub co-pilot is really helpful

1739
01:06:09,839 --> 01:06:12,839
because oftentimes it's really good with

1740
01:06:12,839 --> 01:06:17,460
docs so we're going to say a param r m

1741
01:06:17,460 --> 01:06:18,960
so both of those are good total

1742
01:06:18,960 --> 01:06:20,579
collateral address the amount of token

1743
01:06:20,579 --> 01:06:22,619
to deposit as collateral not collateral

1744
01:06:22,619 --> 01:06:23,940
the amount of collateral to deposit

1745
01:06:23,940 --> 01:06:26,460
right real simple so we're going to want

1746
01:06:26,460 --> 01:06:28,020
a couple of things here we're going to

1747
01:06:28,020 --> 01:06:29,640
want to sanitize this a little bit so

1748
01:06:29,640 --> 01:06:31,079
the amount collateral we're definitely

1749
01:06:31,079 --> 01:06:33,240
going to want this to be more than zero

1750
01:06:33,240 --> 01:06:34,319
so we're probably going to want to

1751
01:06:34,319 --> 01:06:36,359
modifier called more than zero that we

1752
01:06:36,359 --> 01:06:38,039
can use throughout these functions

1753
01:06:38,039 --> 01:06:39,960
sometimes people might accidentally send

1754
01:06:39,960 --> 01:06:41,339
a zero transaction we want to

1755
01:06:41,339 --> 01:06:43,859
automatically revert those so

1756
01:06:43,859 --> 01:06:46,680
we scroll to the top here we see our

1757
01:06:46,680 --> 01:06:49,619
modifiers come before our functions

1758
01:06:49,619 --> 01:06:51,599
so we're going to create our modifiers

1759
01:06:51,599 --> 01:06:53,460
here and we're even going to add like a

1760
01:06:53,460 --> 01:06:56,099
little little section with a whole bunch

1761
01:06:56,099 --> 01:06:59,579
of these here modifiers

1762
01:07:00,780 --> 01:07:02,039
like this

1763
01:07:02,039 --> 01:07:04,880
cool and we'll say modifier

1764
01:07:04,880 --> 01:07:08,339
more than zero and this modifier will

1765
01:07:08,339 --> 01:07:12,480
take a u and typically six amount and

1766
01:07:12,480 --> 01:07:15,059
we'll just say if mount

1767
01:07:15,059 --> 01:07:17,579
equals equals zero then we're going to

1768
01:07:17,579 --> 01:07:20,640
go ahead and revert with a new error

1769
01:07:20,640 --> 01:07:23,240
where do errors go let's go to the top

1770
01:07:23,240 --> 01:07:25,799
errors go

1771
01:07:25,799 --> 01:07:28,440
right underneath Imports actually

1772
01:07:28,440 --> 01:07:29,940
it's not quite right they're going to go

1773
01:07:29,940 --> 01:07:32,099
right underneath the contract

1774
01:07:32,099 --> 01:07:34,440
so we're going to do we're going to copy

1775
01:07:34,440 --> 01:07:37,039
this whole section

1776
01:07:37,319 --> 01:07:39,119
we're going to say errors

1777
01:07:39,119 --> 01:07:40,440
we're gonna go here

1778
01:07:40,440 --> 01:07:42,180
so we're going to say error

1779
01:07:42,180 --> 01:07:45,180
DSC engine underscore underscore

1780
01:07:45,180 --> 01:07:46,680
what we want to call that

1781
01:07:46,680 --> 01:07:49,680
I just needs more than zero needs more

1782
01:07:49,680 --> 01:07:52,859
than zero like this and then we're gonna

1783
01:07:52,859 --> 01:07:55,619
revert with needs more than zero and of

1784
01:07:55,619 --> 01:07:57,119
course add the little underscore here

1785
01:07:57,119 --> 01:07:59,160
cool so now we have a more than zero

1786
01:07:59,160 --> 01:08:01,440
modifier so we can make this

1787
01:08:01,440 --> 01:08:04,079
external more than zero and we'll pass

1788
01:08:04,079 --> 01:08:06,900
the amount collateral and boom okay cool

1789
01:08:06,900 --> 01:08:08,280
we're doing a little standardization

1790
01:08:08,280 --> 01:08:10,200
here what else should we do

1791
01:08:10,200 --> 01:08:12,180
you know let's even

1792
01:08:12,180 --> 01:08:13,619
copy this

1793
01:08:13,619 --> 01:08:16,219
and we'll paste this here we'll say

1794
01:08:16,219 --> 01:08:19,259
functions and we're going to have a

1795
01:08:19,259 --> 01:08:20,339
Constructor

1796
01:08:20,339 --> 01:08:21,660
so I'm just going to put this here for

1797
01:08:21,660 --> 01:08:24,719
now instructor spell Constructor right

1798
01:08:24,719 --> 01:08:26,520
and then

1799
01:08:26,520 --> 01:08:28,640
we're gonna have a section after

1800
01:08:28,640 --> 01:08:30,960
functions like a subsection we're going

1801
01:08:30,960 --> 01:08:32,040
to call it

1802
01:08:32,040 --> 01:08:33,120
external

1803
01:08:33,120 --> 01:08:34,620
functions

1804
01:08:34,620 --> 01:08:37,739
this external functions cool because we

1805
01:08:37,739 --> 01:08:39,000
want to go

1806
01:08:39,000 --> 01:08:40,799
receive and fall back we're not going to

1807
01:08:40,799 --> 01:08:43,080
have those but then external and public

1808
01:08:43,080 --> 01:08:45,600
so external function first

1809
01:08:45,600 --> 01:08:46,920
anyways okay

1810
01:08:46,920 --> 01:08:49,500
okay more than zero got that and we

1811
01:08:49,500 --> 01:08:52,020
probably don't want people to use any

1812
01:08:52,020 --> 01:08:53,699
collateral right we probably only want

1813
01:08:53,699 --> 01:08:54,839
them to use

1814
01:08:54,839 --> 01:08:57,120
certain collateral that we allow so

1815
01:08:57,120 --> 01:08:58,440
we're going to create a new modifier

1816
01:08:58,440 --> 01:09:03,179
called is allowed token so we're going

1817
01:09:03,179 --> 01:09:07,739
to do modifier is allowed token this is

1818
01:09:07,739 --> 01:09:09,299
going to take a

1819
01:09:09,299 --> 01:09:11,040
address token

1820
01:09:11,040 --> 01:09:12,900
basically we're going to say

1821
01:09:12,900 --> 01:09:15,060
if the token not allowed

1822
01:09:15,060 --> 01:09:17,580
the token isn't allowed then revert

1823
01:09:17,580 --> 01:09:19,859
right however at the moment we don't

1824
01:09:19,859 --> 01:09:21,719
have like a token allow list so let's

1825
01:09:21,719 --> 01:09:24,319
create that this is probably going to be

1826
01:09:24,319 --> 01:09:27,299
a state mapping so let's scroll to the

1827
01:09:27,299 --> 01:09:31,020
top or do state variables go so errors

1828
01:09:31,020 --> 01:09:33,600
type Declaration state variables okay

1829
01:09:33,600 --> 01:09:37,140
errors great let's put it here State

1830
01:09:37,140 --> 01:09:38,880
variables

1831
01:09:38,880 --> 01:09:41,100
okay and let's do our

1832
01:09:41,100 --> 01:09:42,660
let's create

1833
01:09:42,660 --> 01:09:45,000
an allowed list of mapping so we'll do

1834
01:09:45,000 --> 01:09:46,739
mapping

1835
01:09:46,739 --> 01:09:50,699
address to Bool you know private

1836
01:09:50,699 --> 01:09:54,600
s underscore token to allowed

1837
01:09:54,600 --> 01:09:56,880
and we could do this however I already

1838
01:09:56,880 --> 01:09:57,960
know

1839
01:09:57,960 --> 01:10:00,480
that we're going to need price feeds so

1840
01:10:00,480 --> 01:10:03,060
instead what I'm going to do is I'm not

1841
01:10:03,060 --> 01:10:05,100
going to do an address to Bool I'm going

1842
01:10:05,100 --> 01:10:08,219
to do an address to address and this is

1843
01:10:08,219 --> 01:10:09,780
going to be our price feed mapping so

1844
01:10:09,780 --> 01:10:11,160
it's going to be S underscore price

1845
01:10:11,160 --> 01:10:12,179
feeds

1846
01:10:12,179 --> 01:10:15,239
and normally I do the syntax

1847
01:10:15,239 --> 01:10:19,500
token to price feed right but for this

1848
01:10:19,500 --> 01:10:20,520
one we're just going to call this price

1849
01:10:20,520 --> 01:10:22,199
feeds and we're going to use the newer

1850
01:10:22,199 --> 01:10:25,380
solidity named mappings to make this a

1851
01:10:25,380 --> 01:10:26,400
little bit clearer so I'm going to say

1852
01:10:26,400 --> 01:10:28,380
address token

1853
01:10:28,380 --> 01:10:32,100
maps to address price feed

1854
01:10:32,100 --> 01:10:33,960
so now this is S price feed and anybody

1855
01:10:33,960 --> 01:10:35,520
can look up and go ah okay so this is

1856
01:10:35,520 --> 01:10:38,219
token to price feed cool so we're going

1857
01:10:38,219 --> 01:10:40,800
to have this list of price feeds and

1858
01:10:40,800 --> 01:10:42,679
where should we probably set this well

1859
01:10:42,679 --> 01:10:45,360
we're probably going to want to set this

1860
01:10:45,360 --> 01:10:47,340
up right in the Constructor right right

1861
01:10:47,340 --> 01:10:49,020
when we deploy this contract that's when

1862
01:10:49,020 --> 01:10:50,100
we're going to say okay these are going

1863
01:10:50,100 --> 01:10:51,840
to be the allowed tokens these the price

1864
01:10:51,840 --> 01:10:53,280
feeds and that way it's going to be like

1865
01:10:53,280 --> 01:10:55,080
that forever right we're never going to

1866
01:10:55,080 --> 01:10:57,420
be able to change this so what we'll do

1867
01:10:57,420 --> 01:10:59,280
is in our Constructor now

1868
01:10:59,280 --> 01:11:01,020
we'll take in

1869
01:11:01,020 --> 01:11:03,480
the the allowed tokens and their price

1870
01:11:03,480 --> 01:11:06,300
feeds right because in order for this

1871
01:11:06,300 --> 01:11:08,659
system to work we're going to like

1872
01:11:08,659 --> 01:11:11,280
data.chain.link in order for this entire

1873
01:11:11,280 --> 01:11:14,340
system to work if we want to know how

1874
01:11:14,340 --> 01:11:16,620
much value our ethereum that people

1875
01:11:16,620 --> 01:11:18,540
deposit in here is worth we need to have

1876
01:11:18,540 --> 01:11:20,520
the pricing right the only way for us to

1877
01:11:20,520 --> 01:11:22,739
know if we're over collateralized if we

1878
01:11:22,739 --> 01:11:24,540
know the value of our eth and our

1879
01:11:24,540 --> 01:11:26,520
Bitcoin so we're going to use these two

1880
01:11:26,520 --> 01:11:28,080
price feeds to

1881
01:11:28,080 --> 01:11:29,940
to maintain that because these price

1882
01:11:29,940 --> 01:11:30,900
feeds are going to be on different

1883
01:11:30,900 --> 01:11:32,880
addresses on different chains you

1884
01:11:32,880 --> 01:11:34,739
already know that we got to parametize

1885
01:11:34,739 --> 01:11:37,920
it so we'll do an address array

1886
01:11:37,920 --> 01:11:39,900
memory

1887
01:11:39,900 --> 01:11:41,460
token addresses

1888
01:11:41,460 --> 01:11:43,560
on my address array

1889
01:11:43,560 --> 01:11:45,000
memory

1890
01:11:45,000 --> 01:11:46,140
price

1891
01:11:46,140 --> 01:11:48,360
feed addresses

1892
01:11:48,360 --> 01:11:50,040
as input parameters

1893
01:11:50,040 --> 01:11:51,480
and we're going to say

1894
01:11:51,480 --> 01:11:53,699
token address 0 maps to price read zero

1895
01:11:53,699 --> 01:11:55,739
token orders one Maps the price feed one

1896
01:11:55,739 --> 01:11:56,460
Etc

1897
01:11:56,460 --> 01:11:59,100
and while we're in here I already know

1898
01:11:59,100 --> 01:12:01,679
that our DSC engine is going to need to

1899
01:12:01,679 --> 01:12:04,020
know about our decentralized stablecoin

1900
01:12:04,020 --> 01:12:06,300
why because our DSC engine is going to

1901
01:12:06,300 --> 01:12:09,179
need to know to call burn and mint so in

1902
01:12:09,179 --> 01:12:11,400
here in the Constructor this is also

1903
01:12:11,400 --> 01:12:12,980
where we're going to pass the address

1904
01:12:12,980 --> 01:12:15,659
DSC address decentralized stablecoin

1905
01:12:15,659 --> 01:12:16,440
address

1906
01:12:16,440 --> 01:12:18,060
and so in here

1907
01:12:18,060 --> 01:12:20,520
let's do some sanity checks on this

1908
01:12:20,520 --> 01:12:24,179
we'll say if the token addresses the

1909
01:12:24,179 --> 01:12:26,940
length does not equal the price feed

1910
01:12:26,940 --> 01:12:28,140
addresses

1911
01:12:28,140 --> 01:12:30,659
price feed address is

1912
01:12:30,659 --> 01:12:33,960
feed addresses length we have an issue

1913
01:12:33,960 --> 01:12:35,580
right because if there's more tokens or

1914
01:12:35,580 --> 01:12:37,560
more price feeds that means we mess

1915
01:12:37,560 --> 01:12:39,120
something up so we're going to go ahead

1916
01:12:39,120 --> 01:12:42,239
and revert with a new error go to our

1917
01:12:42,239 --> 01:12:44,280
errors here we'll say error

1918
01:12:44,280 --> 01:12:47,719
ESC engine underscore underscore token

1919
01:12:47,719 --> 01:12:50,400
address is

1920
01:12:50,400 --> 01:12:55,620
and price feed addresses must be same

1921
01:12:55,620 --> 01:12:58,679
length it's a massive error I know but I

1922
01:12:58,679 --> 01:13:00,000
like being verbose like I've told you

1923
01:13:00,000 --> 01:13:00,780
before

1924
01:13:00,780 --> 01:13:03,000
so if those don't match we're going to

1925
01:13:03,000 --> 01:13:04,380
go ahead and revert

1926
01:13:04,380 --> 01:13:05,520
then we're going to Loop through the

1927
01:13:05,520 --> 01:13:08,640
token addresses and update our mapping

1928
01:13:08,640 --> 01:13:10,920
that we just created up here

1929
01:13:10,920 --> 01:13:13,739
to say okay the token address is mapped

1930
01:13:13,739 --> 01:13:15,239
to the price feed address

1931
01:13:15,239 --> 01:13:16,860
now in order for us to get a pricing

1932
01:13:16,860 --> 01:13:18,420
we're gonna have to use

1933
01:13:18,420 --> 01:13:22,620
the USD price feeds and everything every

1934
01:13:22,620 --> 01:13:23,820
price view that we're going to have to

1935
01:13:23,820 --> 01:13:25,560
use is going to be the USD backed price

1936
01:13:25,560 --> 01:13:27,780
feed so for example

1937
01:13:27,780 --> 01:13:34,500
it's going to be eth USD BTC USD mkr USD

1938
01:13:34,500 --> 01:13:35,159
Etc

1939
01:13:35,159 --> 01:13:36,840
okay so we're going to Loop through

1940
01:13:36,840 --> 01:13:40,320
we're gonna say four U and 256 I equals

1941
01:13:40,320 --> 01:13:44,640
zero I is less than Oaken address says

1942
01:13:44,640 --> 01:13:47,340
dot length I plus plus

1943
01:13:47,340 --> 01:13:48,360
so we're going to Loop through this

1944
01:13:48,360 --> 01:13:50,400
token addresses array and we're going to

1945
01:13:50,400 --> 01:13:54,000
say s underscore price feeds

1946
01:13:54,000 --> 01:13:56,460
of token addresses

1947
01:13:56,460 --> 01:13:59,780
I is going to equal to price feed

1948
01:13:59,780 --> 01:14:03,179
addresses of I so we're going to set up

1949
01:14:03,179 --> 01:14:05,699
this price feed so whatever the token

1950
01:14:05,699 --> 01:14:07,920
so the token of I is going to equal the

1951
01:14:07,920 --> 01:14:09,540
price feed of I and that's how we're

1952
01:14:09,540 --> 01:14:12,540
going to set up what tokens are

1953
01:14:12,540 --> 01:14:14,580
allowed on our platform if they have a

1954
01:14:14,580 --> 01:14:16,739
price feed they're allowed if they don't

1955
01:14:16,739 --> 01:14:19,080
they're not allowed and then I know

1956
01:14:19,080 --> 01:14:20,159
we're going to do a lot of stuff with

1957
01:14:20,159 --> 01:14:23,280
our DSC so this is where this is

1958
01:14:23,280 --> 01:14:24,480
definitely going to be an immutable

1959
01:14:24,480 --> 01:14:27,000
variable so we can scroll up make a

1960
01:14:27,000 --> 01:14:28,920
mutable variable we'll say

1961
01:14:28,920 --> 01:14:32,420
so we'll say decentralized stablecoin

1962
01:14:32,420 --> 01:14:35,760
private I underscore DSC because we're

1963
01:14:35,760 --> 01:14:37,380
going to make this a mutable

1964
01:14:37,380 --> 01:14:38,699
and since we're using decentralized

1965
01:14:38,699 --> 01:14:39,960
stable corn we're gonna have to go ahead

1966
01:14:39,960 --> 01:14:42,060
and import this

1967
01:14:42,060 --> 01:14:44,219
so let's go to the top here

1968
01:14:44,219 --> 01:14:48,000
do import Central stablecoin from dot

1969
01:14:48,000 --> 01:14:48,739
slash

1970
01:14:48,739 --> 01:14:51,600
decentralizedablecoin.soll so now the

1971
01:14:51,600 --> 01:14:54,840
central stablecoin private idsc we can

1972
01:14:54,840 --> 01:14:56,520
now do oh excuse me this is going to be

1973
01:14:56,520 --> 01:14:59,719
private mutable

1974
01:15:00,480 --> 01:15:01,800
a little bit down in the Constructor

1975
01:15:01,800 --> 01:15:03,960
we're just going to say idsc equals

1976
01:15:03,960 --> 01:15:06,659
decentralized stablecoin DSC address

1977
01:15:06,659 --> 01:15:09,540
like that again using GitHub copilot if

1978
01:15:09,540 --> 01:15:11,520
you don't have GitHub copilot that's

1979
01:15:11,520 --> 01:15:13,080
okay there's a lot of other free AIS

1980
01:15:13,080 --> 01:15:15,179
that you can use as well

1981
01:15:15,179 --> 01:15:18,600
cool so we set up our Constructor we're

1982
01:15:18,600 --> 01:15:20,940
going back down to deposit collateral

1983
01:15:20,940 --> 01:15:22,560
whole reason we were doing this is we're

1984
01:15:22,560 --> 01:15:24,360
saying okay we should only allow certain

1985
01:15:24,360 --> 01:15:27,000
kinds of collateral on our platform so

1986
01:15:27,000 --> 01:15:29,460
now we can create a new modifier called

1987
01:15:29,460 --> 01:15:32,520
is allowed token where we can just say

1988
01:15:32,520 --> 01:15:33,840
if

1989
01:15:33,840 --> 01:15:36,060
s underscore price feeds

1990
01:15:36,060 --> 01:15:40,380
of token equals equals address zero then

1991
01:15:40,380 --> 01:15:42,120
we can go ahead and revert

1992
01:15:42,120 --> 01:15:44,460
with a new oh that looks like a good one

1993
01:15:44,460 --> 01:15:46,500
DSC engine token not allowed I'm just

1994
01:15:46,500 --> 01:15:49,080
going to copy that go to the top and

1995
01:15:49,080 --> 01:15:51,239
thanks copilot just Auto filled it in

1996
01:15:51,239 --> 01:15:53,520
for me okay great and then of course we

1997
01:15:53,520 --> 01:15:56,400
need to do this down here cool so is

1998
01:15:56,400 --> 01:16:00,120
token allowed more than zero is allowed

1999
01:16:00,120 --> 01:16:02,159
excuse me is allowed token

2000
01:16:02,159 --> 01:16:03,900
token

2001
01:16:03,900 --> 01:16:05,880
collateral

2002
01:16:05,880 --> 01:16:07,980
address like this

2003
01:16:07,980 --> 01:16:10,679
all right cool and then additionally I'm

2004
01:16:10,679 --> 01:16:12,679
going to add a

2005
01:16:12,679 --> 01:16:15,420
non-reentrant modifier here as well

2006
01:16:15,420 --> 01:16:17,340
we're going to grab this from open

2007
01:16:17,340 --> 01:16:19,380
Zeppelin whenever we're working with

2008
01:16:19,380 --> 01:16:22,320
external contracts it might be a good

2009
01:16:22,320 --> 01:16:23,960
idea consider making your function

2010
01:16:23,960 --> 01:16:26,640
non-reentrant reentrencies are one of

2011
01:16:26,640 --> 01:16:29,300
the most common attacks in all of web 3

2012
01:16:29,300 --> 01:16:32,760
and to be honest sometimes I'll just rip

2013
01:16:32,760 --> 01:16:34,860
a non-re-entry modifier even if I'm

2014
01:16:34,860 --> 01:16:36,719
pretty certain it's not vulnerable to a

2015
01:16:36,719 --> 01:16:38,040
re-entrancy attack

2016
01:16:38,040 --> 01:16:40,260
I feel like to be honest most functions

2017
01:16:40,260 --> 01:16:42,500
should be non-reential by default but

2018
01:16:42,500 --> 01:16:44,880
especially when working with external

2019
01:16:44,880 --> 01:16:46,920
contracts it's a good idea to maybe put

2020
01:16:46,920 --> 01:16:49,140
this modifier here now this might go to

2021
01:16:49,140 --> 01:16:51,600
audit and we might say hey well we don't

2022
01:16:51,600 --> 01:16:53,280
need this non-reentrant modifier and

2023
01:16:53,280 --> 01:16:55,140
maybe we get rid of it but maybe we

2024
01:16:55,140 --> 01:16:57,540
don't the trade-off is it's a little bit

2025
01:16:57,540 --> 01:16:59,760
more gas intensive to have this here but

2026
01:16:59,760 --> 01:17:02,400
it's also safer so I'm just going to

2027
01:17:02,400 --> 01:17:04,560
stick it in here even if I'm pretty

2028
01:17:04,560 --> 01:17:06,360
certain I don't need it we're going to

2029
01:17:06,360 --> 01:17:09,060
get this from open Zeppelin has a

2030
01:17:09,060 --> 01:17:11,600
non-re-entrance a non-re-entrant

2031
01:17:11,600 --> 01:17:14,340
modifier from their re-entracy guard so

2032
01:17:14,340 --> 01:17:15,540
we'll import

2033
01:17:15,540 --> 01:17:18,719
actually my Gib co-pilot automatically

2034
01:17:18,719 --> 01:17:20,340
had it ran to see Guard from open

2035
01:17:20,340 --> 01:17:22,739
Zeppelin contracts

2036
01:17:22,739 --> 01:17:25,020
security re-entracy guarded Soul yep

2037
01:17:25,020 --> 01:17:27,120
that's actually exactly correct

2038
01:17:27,120 --> 01:17:29,760
and then what we can do is scroll down

2039
01:17:29,760 --> 01:17:32,699
and we see our DSC engine is re-entracy

2040
01:17:32,699 --> 01:17:34,800
guard and by doing this we now have

2041
01:17:34,800 --> 01:17:36,440
access to this

2042
01:17:36,440 --> 01:17:39,719
non-re-entrant modifier and now this

2043
01:17:39,719 --> 01:17:42,300
function is non-reunable which is what

2044
01:17:42,300 --> 01:17:44,580
we want okay cool now we can finally

2045
01:17:44,580 --> 01:17:46,620
start doing some collateral stuff so

2046
01:17:46,620 --> 01:17:47,820
we're going to go ahead and deposit this

2047
01:17:47,820 --> 01:17:49,620
collateral first thing we're going to

2048
01:17:49,620 --> 01:17:51,600
need to do is a way to track how much

2049
01:17:51,600 --> 01:17:52,860
collateral somebody has actually

2050
01:17:52,860 --> 01:17:55,739
deposited so what's that look like well

2051
01:17:55,739 --> 01:17:57,300
that probably looks like a mapping to me

2052
01:17:57,300 --> 01:18:00,120
so let's go to the top we'll create a

2053
01:18:00,120 --> 01:18:01,739
mapping

2054
01:18:01,739 --> 01:18:03,000
of

2055
01:18:03,000 --> 01:18:06,719
address user to

2056
01:18:06,719 --> 01:18:09,360
mapping of an address

2057
01:18:09,360 --> 01:18:13,380
token to you and 256 amount

2058
01:18:13,380 --> 01:18:17,760
private s underscore cool cool lap to

2059
01:18:17,760 --> 01:18:20,940
roll the posited

2060
01:18:20,940 --> 01:18:23,280
so this is a mapping to a mapping crazy

2061
01:18:23,280 --> 01:18:25,620
right so we're going to map the user's

2062
01:18:25,620 --> 01:18:28,679
balances to a mapping of tokens which is

2063
01:18:28,679 --> 01:18:31,140
going to get mapped to the amount of

2064
01:18:31,140 --> 01:18:33,300
each token that they have all right so

2065
01:18:33,300 --> 01:18:34,920
let's scroll back down

2066
01:18:34,920 --> 01:18:37,560
to our deposit collateral function so

2067
01:18:37,560 --> 01:18:39,840
now we have a collateral deposited

2068
01:18:39,840 --> 01:18:42,060
mapping so we can do s collateral

2069
01:18:42,060 --> 01:18:45,900
deposited of message.sender of this

2070
01:18:45,900 --> 01:18:47,760
token collateral address now that we

2071
01:18:47,760 --> 01:18:50,520
know it is an allowed collateral address

2072
01:18:50,520 --> 01:18:52,980
it's going to be plus equal to the

2073
01:18:52,980 --> 01:18:56,580
amount collateral right and and I'm

2074
01:18:56,580 --> 01:18:58,440
actually running to an issue here where

2075
01:18:58,440 --> 01:19:01,860
when I do Forge format formats the code

2076
01:19:01,860 --> 01:19:04,260
look like this but right now when I'm

2077
01:19:04,260 --> 01:19:06,420
saving it's reformatting in a different

2078
01:19:06,420 --> 01:19:08,760
way so what I'm going to do is it looks

2079
01:19:08,760 --> 01:19:10,320
like it's using a different formatter

2080
01:19:10,320 --> 01:19:11,580
that I don't like so I'm going to go to

2081
01:19:11,580 --> 01:19:14,760
the extensions solidity hard hat hit the

2082
01:19:14,760 --> 01:19:17,580
settings here extension settings and

2083
01:19:17,580 --> 01:19:18,900
we're going to change this from prettier

2084
01:19:18,900 --> 01:19:20,820
to forge because I want to use the forge

2085
01:19:20,820 --> 01:19:23,640
format settings now if I hit save okay

2086
01:19:23,640 --> 01:19:26,219
great it saves in formats the way I

2087
01:19:26,219 --> 01:19:28,320
wanted to okay great so as you can see

2088
01:19:28,320 --> 01:19:30,179
here we're updating State and what

2089
01:19:30,179 --> 01:19:32,219
should we do when we update State we

2090
01:19:32,219 --> 01:19:33,600
should omit

2091
01:19:33,600 --> 01:19:35,340
an event so we're going to emit

2092
01:19:35,340 --> 01:19:37,100
collateral

2093
01:19:37,100 --> 01:19:39,659
deposited we're going to have it be the

2094
01:19:39,659 --> 01:19:41,699
mess it does sender who is depositing

2095
01:19:41,699 --> 01:19:45,360
the token collateral address and the

2096
01:19:45,360 --> 01:19:47,820
amount collateral as well

2097
01:19:47,820 --> 01:19:50,120
which means that we have our first event

2098
01:19:50,120 --> 01:19:51,780
all right

2099
01:19:51,780 --> 01:19:55,080
so let's go on up here Zoom back out

2100
01:19:55,080 --> 01:19:56,400
scroll all the way up to the layout

2101
01:19:56,400 --> 01:19:58,800
where do events go events go after the

2102
01:19:58,800 --> 01:20:00,360
state variables okay so I'm going to

2103
01:20:00,360 --> 01:20:01,560
copy this

2104
01:20:01,560 --> 01:20:03,120
go right after the state variables

2105
01:20:03,120 --> 01:20:04,860
before the modifier so we're going to

2106
01:20:04,860 --> 01:20:08,159
say events you're going to go here

2107
01:20:08,159 --> 01:20:10,940
we're going to say event

2108
01:20:11,219 --> 01:20:13,620
and get a copilot automatically filled

2109
01:20:13,620 --> 01:20:15,420
it in for me awesome address indexed

2110
01:20:15,420 --> 01:20:19,260
user address index token un256 amount we

2111
01:20:19,260 --> 01:20:21,179
don't really need to index that maybe we

2112
01:20:21,179 --> 01:20:23,880
do why not let's just index it all right

2113
01:20:23,880 --> 01:20:26,340
cool and just to know a keyboard

2114
01:20:26,340 --> 01:20:27,960
shortcut that I use a lot is control

2115
01:20:27,960 --> 01:20:30,719
back or control minus which allows you

2116
01:20:30,719 --> 01:20:33,000
to go back to the last spot you were in

2117
01:20:33,000 --> 01:20:35,580
your code if you do Ctrl shift minus

2118
01:20:35,580 --> 01:20:37,320
it'll go forward and I use this all the

2119
01:20:37,320 --> 01:20:39,719
time so for example if I'm way down here

2120
01:20:39,719 --> 01:20:42,960
in my code and I hit control back I'll

2121
01:20:42,960 --> 01:20:44,760
just go right back to the last place my

2122
01:20:44,760 --> 01:20:47,219
cruiser was and I use this all the time

2123
01:20:47,219 --> 01:20:49,080
I'm not sure what the keyboard shortcut

2124
01:20:49,080 --> 01:20:50,100
on

2125
01:20:50,100 --> 01:20:52,500
windows or linuxes but on a Mac it is

2126
01:20:52,500 --> 01:20:54,480
control back and control shift back and

2127
01:20:54,480 --> 01:20:57,600
I use it all the time anyways so we are

2128
01:20:57,600 --> 01:20:58,380
in

2129
01:20:58,380 --> 01:21:00,600
deposit collateral we have this emit

2130
01:21:00,600 --> 01:21:02,820
here we finally have the event and Okay

2131
01:21:02,820 --> 01:21:05,880
cool so we're updating the collateral

2132
01:21:05,880 --> 01:21:08,820
internal record keeping we're emitting

2133
01:21:08,820 --> 01:21:10,739
event now of course we should actually

2134
01:21:10,739 --> 01:21:12,840
get the tokens right and you can see

2135
01:21:12,840 --> 01:21:16,860
here we're following CEI right so we do

2136
01:21:16,860 --> 01:21:17,699
a little

2137
01:21:17,699 --> 01:21:21,719
notice follows CEI checks effects

2138
01:21:21,719 --> 01:21:23,520
interactions

2139
01:21:23,520 --> 01:21:25,320
so all the checks are happening in our

2140
01:21:25,320 --> 01:21:27,120
modifiers here these are all the checks

2141
01:21:27,120 --> 01:21:30,060
our effects are right here and then

2142
01:21:30,060 --> 01:21:32,820
finally our external interactions so

2143
01:21:32,820 --> 01:21:33,600
this is where we're going to do that

2144
01:21:33,600 --> 01:21:35,340
transfer from

2145
01:21:35,340 --> 01:21:37,560
and we're going to wrap our collateral

2146
01:21:37,560 --> 01:21:39,600
as an erc20

2147
01:21:39,600 --> 01:21:41,400
so we're going to need to call transfer

2148
01:21:41,400 --> 01:21:42,719
from on it so I'm going to go ahead and

2149
01:21:42,719 --> 01:21:46,920
import IE orc20 from at open Zeppelin

2150
01:21:46,920 --> 01:21:48,360
contracts

2151
01:21:48,360 --> 01:21:49,980
slash

2152
01:21:49,980 --> 01:21:52,940
token slash erc20

2153
01:21:52,940 --> 01:21:56,760
ierc20. soul Ctrl minus to go right back

2154
01:21:56,760 --> 01:21:59,040
down to here isn't that nice and we can

2155
01:21:59,040 --> 01:22:02,520
finally do irc20 of the token collateral

2156
01:22:02,520 --> 01:22:03,659
address

2157
01:22:03,659 --> 01:22:07,920
dot transfer from message dot sender

2158
01:22:07,920 --> 01:22:10,920
to address this

2159
01:22:10,920 --> 01:22:13,739
amount collateral

2160
01:22:13,739 --> 01:22:17,040
like this and we'll say so this function

2161
01:22:17,040 --> 01:22:19,860
actually returns a Boolean full success

2162
01:22:19,860 --> 01:22:21,900
and we want to make sure that this is

2163
01:22:21,900 --> 01:22:23,159
actually being true

2164
01:22:23,159 --> 01:22:26,400
so we want to say if not success

2165
01:22:26,400 --> 01:22:30,360
we'll just revert DSC engine

2166
01:22:30,360 --> 01:22:33,120
I'm just going to score transfer failed

2167
01:22:33,120 --> 01:22:37,080
like this what's this an error you bet

2168
01:22:37,080 --> 01:22:39,600
it is so we'll put this at the top Air

2169
01:22:39,600 --> 01:22:41,940
DSC engine transfer failed

2170
01:22:41,940 --> 01:22:43,800
and I'm going to hit Ctrl minus to go

2171
01:22:43,800 --> 01:22:45,239
right back down to the code that I was

2172
01:22:45,239 --> 01:22:46,500
working with

2173
01:22:46,500 --> 01:22:49,500
cool so this function looks pretty good

2174
01:22:49,500 --> 01:22:51,719
to me I'm able to deposit collateral in

2175
01:22:51,719 --> 01:22:54,719
here and update our mappings now might

2176
01:22:54,719 --> 01:22:56,820
be a good time for us to start writing

2177
01:22:56,820 --> 01:22:59,159
some tests for this right and we could

2178
01:22:59,159 --> 01:23:00,420
do something similar to what we did

2179
01:23:00,420 --> 01:23:02,520
before where we just kind of threw

2180
01:23:02,520 --> 01:23:04,920
together a real quick setup in our unit

2181
01:23:04,920 --> 01:23:06,659
test and then I had our integration test

2182
01:23:06,659 --> 01:23:10,080
be what our deploy script actually uses

2183
01:23:10,080 --> 01:23:11,940
well let's write a couple more functions

2184
01:23:11,940 --> 01:23:13,560
first and then we can go ahead and do

2185
01:23:13,560 --> 01:23:16,100
all that work

2186
01:23:18,060 --> 01:23:19,980
so we have a way to deposit the

2187
01:23:19,980 --> 01:23:23,159
collateral okay awesome what should we

2188
01:23:23,159 --> 01:23:24,480
do next well the next thing that we

2189
01:23:24,480 --> 01:23:27,900
should do is have a way to mint our DSC

2190
01:23:27,900 --> 01:23:29,280
token right once they deposit the

2191
01:23:29,280 --> 01:23:30,360
collateral they should be able to Mint

2192
01:23:30,360 --> 01:23:33,000
the DSC token and then the combination

2193
01:23:33,000 --> 01:23:34,800
of those two will be this function

2194
01:23:34,800 --> 01:23:37,620
deposit collateral and mint DSC so let's

2195
01:23:37,620 --> 01:23:39,000
go ahead and actually create this mint

2196
01:23:39,000 --> 01:23:41,280
DSC function because now that they have

2197
01:23:41,280 --> 01:23:42,600
some collateral we should be able to

2198
01:23:42,600 --> 01:23:44,400
Mint some DSE and now this is actually

2199
01:23:44,400 --> 01:23:46,320
going to be a surprisingly involved

2200
01:23:46,320 --> 01:23:48,360
method right because in order to Mint

2201
01:23:48,360 --> 01:23:52,260
DSC we need to check if the collateral

2202
01:23:52,260 --> 01:23:56,760
value is greater than the DSC amount

2203
01:23:56,760 --> 01:23:59,040
and this is obviously going to involve a

2204
01:23:59,040 --> 01:24:00,179
number of things right it's going to

2205
01:24:00,179 --> 01:24:02,699
involve price feeds we're going to be

2206
01:24:02,699 --> 01:24:04,260
checking values

2207
01:24:04,260 --> 01:24:05,640
we'll be checking a whole lot of stuff

2208
01:24:05,640 --> 01:24:07,500
okay so this is actually going to be a

2209
01:24:07,500 --> 01:24:09,360
little bit more of an in-depth function

2210
01:24:09,360 --> 01:24:10,140
here

2211
01:24:10,140 --> 01:24:12,060
so let's create this mint DSC function

2212
01:24:12,060 --> 01:24:14,520
and we'll have this get passed in a

2213
01:24:14,520 --> 01:24:19,320
un256 amount DSC to Mint so people can

2214
01:24:19,320 --> 01:24:21,600
pick how much DSA they want to Mint so

2215
01:24:21,600 --> 01:24:23,820
let's say for example someone deposits

2216
01:24:23,820 --> 01:24:26,580
200 worth of eth maybe they only want to

2217
01:24:26,580 --> 01:24:29,699
Mint 20 worth of DSC right so they can

2218
01:24:29,699 --> 01:24:31,620
pick how much they want to Mint here

2219
01:24:31,620 --> 01:24:34,560
so amount to Mint here and let's add

2220
01:24:34,560 --> 01:24:36,239
some checks here we should have them

2221
01:24:36,239 --> 01:24:39,900
mint more than zero Mount DSC to Mint

2222
01:24:39,900 --> 01:24:41,400
this

2223
01:24:41,400 --> 01:24:43,260
what else we probably want this to be

2224
01:24:43,260 --> 01:24:45,480
non-re-entrant even though we probably

2225
01:24:45,480 --> 01:24:47,100
don't need this to be not re-entrant

2226
01:24:47,100 --> 01:24:50,580
because it's our DSC token but let's put

2227
01:24:50,580 --> 01:24:51,840
it in here anyways

2228
01:24:51,840 --> 01:24:53,940
it's probably all we need for now we

2229
01:24:53,940 --> 01:24:57,239
probably want to do some

2230
01:24:57,239 --> 01:24:59,580
looks like GitHub copilot even gave me

2231
01:24:59,580 --> 01:25:02,460
some some follows CEI yes oh that's

2232
01:25:02,460 --> 01:25:06,780
wrong Mount DEC to Mint Mount D SC to

2233
01:25:06,780 --> 01:25:10,920
Mint the amount of decentralized

2234
01:25:10,920 --> 01:25:14,880
stable coin to Mint at notice

2235
01:25:14,880 --> 01:25:16,380
they

2236
01:25:16,380 --> 01:25:21,900
must have more collateral value than

2237
01:25:21,900 --> 01:25:25,500
the minimum threshold we're going to

2238
01:25:25,500 --> 01:25:26,580
figure out what that means in a second

2239
01:25:26,580 --> 01:25:29,580
so mint DSC will need to keep track of

2240
01:25:29,580 --> 01:25:32,040
how much everybody has minted right so

2241
01:25:32,040 --> 01:25:33,540
whenever they're minting DSC they're in

2242
01:25:33,540 --> 01:25:35,159
a way they're minting debt right so

2243
01:25:35,159 --> 01:25:36,780
we're gonna need to keep track of that

2244
01:25:36,780 --> 01:25:38,760
where can we do that well we can do that

2245
01:25:38,760 --> 01:25:40,199
as a state variable

2246
01:25:40,199 --> 01:25:44,400
so we'll do mapping of

2247
01:25:44,400 --> 01:25:46,580
an address

2248
01:25:46,580 --> 01:25:48,360
mapped to

2249
01:25:48,360 --> 01:25:50,640
they're you into 256 which is going to

2250
01:25:50,640 --> 01:25:53,280
be an address user mapped to the U into

2251
01:25:53,280 --> 01:25:54,540
256

2252
01:25:54,540 --> 01:25:58,199
Mount DSC minted it's going to be

2253
01:25:58,199 --> 01:26:00,320
private s underscore

2254
01:26:00,320 --> 01:26:04,679
DSC minted this now I can go back down

2255
01:26:04,679 --> 01:26:08,780
here with this new mapping SDC minted

2256
01:26:08,780 --> 01:26:13,199
message.c sender plus equals amount DSC

2257
01:26:13,199 --> 01:26:15,600
to Mint so we're going to keep track of

2258
01:26:15,600 --> 01:26:17,460
all that they minted again this is going

2259
01:26:17,460 --> 01:26:19,199
to follow CEI

2260
01:26:19,199 --> 01:26:20,760
so now we want to do a little check here

2261
01:26:20,760 --> 01:26:22,620
if they minted

2262
01:26:22,620 --> 01:26:27,360
too much for example like it minted 150

2263
01:26:27,360 --> 01:26:30,480
or 150 worth of DSC but they only have

2264
01:26:30,480 --> 01:26:33,360
100 worth of eth that's gonna be way too

2265
01:26:33,360 --> 01:26:36,600
much we should 100 revert if that

2266
01:26:36,600 --> 01:26:37,440
happened

2267
01:26:37,440 --> 01:26:39,420
so I'm actually going to make a function

2268
01:26:39,420 --> 01:26:40,920
I'm going to make an internal function

2269
01:26:40,920 --> 01:26:44,280
call revert if

2270
01:26:44,280 --> 01:26:49,280
Health factor is broken with the

2271
01:26:49,280 --> 01:26:52,139
message.c sender being sent so we're

2272
01:26:52,139 --> 01:26:53,400
going to create this new internal

2273
01:26:53,400 --> 01:26:55,380
function so up here we have external

2274
01:26:55,380 --> 01:26:57,239
functions we're going to scroll down

2275
01:26:57,239 --> 01:26:59,940
here we're gonna make this

2276
01:26:59,940 --> 01:27:03,179
private and internal functions

2277
01:27:03,179 --> 01:27:06,780
like this like this and we're only going

2278
01:27:06,780 --> 01:27:08,639
to be able to call this if we're only

2279
01:27:08,639 --> 01:27:10,080
going to be able to call this internally

2280
01:27:10,080 --> 01:27:11,820
right so we're going to create this

2281
01:27:11,820 --> 01:27:13,560
function function revert if Health

2282
01:27:13,560 --> 01:27:15,000
factor is broken

2283
01:27:15,000 --> 01:27:17,280
address user it's going to be an

2284
01:27:17,280 --> 01:27:18,840
internal View

2285
01:27:18,840 --> 01:27:20,219
function

2286
01:27:20,219 --> 01:27:23,580
and we're going to basically one check

2287
01:27:23,580 --> 01:27:24,659
health

2288
01:27:24,659 --> 01:27:27,000
factor which is basically

2289
01:27:27,000 --> 01:27:30,960
do they have enough collateral right and

2290
01:27:30,960 --> 01:27:33,960
then revert if they don't have a good

2291
01:27:33,960 --> 01:27:37,020
health Factor so this health factor is

2292
01:27:37,020 --> 01:27:38,699
actually a term that I borrowed from the

2293
01:27:38,699 --> 01:27:40,260
Ave documentation

2294
01:27:40,260 --> 01:27:42,000
reach wallet these risk parameters

2295
01:27:42,000 --> 01:27:44,100
enable the calculation of Health Factor

2296
01:27:44,100 --> 01:27:45,719
you can see a little bit of an image

2297
01:27:45,719 --> 01:27:48,540
here that shows it so additionally we're

2298
01:27:48,540 --> 01:27:50,219
going to need to make a function that

2299
01:27:50,219 --> 01:27:52,500
checks the health Factor actually these

2300
01:27:52,500 --> 01:27:54,540
are going to be private internal view

2301
01:27:54,540 --> 01:27:55,920
functions

2302
01:27:55,920 --> 01:27:57,900
so first we need to make a function that

2303
01:27:57,900 --> 01:27:59,760
can get the health Factor so we're going

2304
01:27:59,760 --> 01:28:01,380
to make another function here called

2305
01:28:01,380 --> 01:28:02,400
function

2306
01:28:02,400 --> 01:28:05,699
underscore Health Factor we're going to

2307
01:28:05,699 --> 01:28:08,520
take an address user and you see we have

2308
01:28:08,520 --> 01:28:10,679
this leading underscore to tell us as

2309
01:28:10,679 --> 01:28:12,540
developers that this is an internal

2310
01:28:12,540 --> 01:28:15,239
function so let's actually give this an

2311
01:28:15,239 --> 01:28:16,739
underscore as well

2312
01:28:16,739 --> 01:28:20,820
funk function oops Health Factor this

2313
01:28:20,820 --> 01:28:23,219
will be a private View

2314
01:28:23,219 --> 01:28:26,400
I'm going to return a u into 256. so

2315
01:28:26,400 --> 01:28:27,840
what this health Factor thing is going

2316
01:28:27,840 --> 01:28:28,560
to do

2317
01:28:28,560 --> 01:28:31,620
give it a little bit of nat spec now we

2318
01:28:31,620 --> 01:28:33,920
can say this is going to

2319
01:28:33,920 --> 01:28:38,880
returns how close to liquidation a user

2320
01:28:38,880 --> 01:28:39,780
is

2321
01:28:39,780 --> 01:28:43,620
say if a user goes below

2322
01:28:43,620 --> 01:28:46,020
one then

2323
01:28:46,020 --> 01:28:49,080
they can get liquidated so we're going

2324
01:28:49,080 --> 01:28:50,940
to figure out what the ratio of

2325
01:28:50,940 --> 01:28:53,760
collateral to DSC minted that users can

2326
01:28:53,760 --> 01:28:55,320
have with this health Factor function

2327
01:28:55,320 --> 01:28:57,000
we're gonna be building a lot of stuff

2328
01:28:57,000 --> 01:28:59,040
here so in order to figure this out what

2329
01:28:59,040 --> 01:29:00,900
do we need well we kind of need to get

2330
01:29:00,900 --> 01:29:01,920
both

2331
01:29:01,920 --> 01:29:06,120
their total DSC minted right and we're

2332
01:29:06,120 --> 01:29:07,920
going to need to get their total

2333
01:29:07,920 --> 01:29:09,659
collateral

2334
01:29:09,659 --> 01:29:11,880
value right not just the total

2335
01:29:11,880 --> 01:29:12,960
collateral we're going to need to get

2336
01:29:12,960 --> 01:29:15,300
the total collateral value make sure the

2337
01:29:15,300 --> 01:29:17,340
value is greater than the total DSC

2338
01:29:17,340 --> 01:29:18,480
minted

2339
01:29:18,480 --> 01:29:20,100
so we're gonna have to make another

2340
01:29:20,100 --> 01:29:21,060
function

2341
01:29:21,060 --> 01:29:23,820
we're gonna need to get the un256 total

2342
01:29:23,820 --> 01:29:28,860
DSC minted and the un256 collateral

2343
01:29:28,860 --> 01:29:32,040
value in USD we're going to create a new

2344
01:29:32,040 --> 01:29:35,420
function called get count information

2345
01:29:35,420 --> 01:29:39,179
from that user so we're gonna do another

2346
01:29:39,179 --> 01:29:43,260
one boom function underscore get account

2347
01:29:43,260 --> 01:29:46,620
information like this we'll take an

2348
01:29:46,620 --> 01:29:50,820
address user this will be a private View

2349
01:29:50,820 --> 01:29:53,639
and we're going to return

2350
01:29:53,639 --> 01:29:55,800
two things un256

2351
01:29:55,800 --> 01:29:59,840
total DSC minted and U into 256

2352
01:29:59,840 --> 01:30:04,080
collateral value in USD two functions

2353
01:30:04,080 --> 01:30:06,300
here to get the total USD that's easy

2354
01:30:06,300 --> 01:30:11,580
right we just do total DSC minted equals

2355
01:30:11,580 --> 01:30:14,400
this array this can be this mapping that

2356
01:30:14,400 --> 01:30:15,780
we just created right we're keeping

2357
01:30:15,780 --> 01:30:17,340
track of this exactly so all we got to

2358
01:30:17,340 --> 01:30:19,500
do is this to get the total collateral

2359
01:30:19,500 --> 01:30:21,719
value in USD we're going to need to do

2360
01:30:21,719 --> 01:30:23,639
some more math so I'm going to say

2361
01:30:23,639 --> 01:30:27,900
collateral value in USD equals

2362
01:30:27,900 --> 01:30:30,780
get account collateral

2363
01:30:30,780 --> 01:30:32,040
value

2364
01:30:32,040 --> 01:30:34,199
and we're going to pass some user so

2365
01:30:34,199 --> 01:30:36,659
this is going to be a different function

2366
01:30:36,659 --> 01:30:38,340
and we're going to make this a public

2367
01:30:38,340 --> 01:30:40,320
function so that anybody can call this

2368
01:30:40,320 --> 01:30:41,699
function themselves

2369
01:30:41,699 --> 01:30:44,100
so we're actually going to copy this

2370
01:30:44,100 --> 01:30:46,320
private and view internal functions

2371
01:30:46,320 --> 01:30:48,239
public internal View and then we're

2372
01:30:48,239 --> 01:30:50,580
going to do view in pure public and

2373
01:30:50,580 --> 01:30:51,840
external functions all the way at the

2374
01:30:51,840 --> 01:30:54,239
bottom so we'll say private

2375
01:30:54,239 --> 01:30:56,159
instead of we'll say public

2376
01:30:56,159 --> 01:30:59,880
and external view functions we'll do

2377
01:30:59,880 --> 01:31:00,780
function

2378
01:31:00,780 --> 01:31:02,580
get account

2379
01:31:02,580 --> 01:31:07,080
lateral value address of the user this

2380
01:31:07,080 --> 01:31:08,820
will be a public view so anybody can

2381
01:31:08,820 --> 01:31:13,620
call it returns a uint 256. stay with me

2382
01:31:13,620 --> 01:31:14,760
I know we're kind of going down this

2383
01:31:14,760 --> 01:31:16,980
tree stay with me here we're about to go

2384
01:31:16,980 --> 01:31:18,060
even further

2385
01:31:18,060 --> 01:31:19,980
now to get the actual value what do we

2386
01:31:19,980 --> 01:31:22,020
need to do well we need to Loop through

2387
01:31:22,020 --> 01:31:23,760
each

2388
01:31:23,760 --> 01:31:25,500
lateral token

2389
01:31:25,500 --> 01:31:28,739
get the amount they have deposited

2390
01:31:28,739 --> 01:31:30,960
and map it to

2391
01:31:30,960 --> 01:31:35,639
price to get the USD value

2392
01:31:35,639 --> 01:31:37,560
so we're going to Loop through all the

2393
01:31:37,560 --> 01:31:41,040
collateral tokens uh-oh we have a way we

2394
01:31:41,040 --> 01:31:43,800
can do that let's scroll the top we have

2395
01:31:43,800 --> 01:31:46,080
a mapping of the price feeds but we

2396
01:31:46,080 --> 01:31:48,300
don't have a way to Loop through them so

2397
01:31:48,300 --> 01:31:49,560
what we can do

2398
01:31:49,560 --> 01:31:51,719
is we could just have like you know

2399
01:31:51,719 --> 01:31:55,940
address weft and then address

2400
01:31:55,940 --> 01:31:58,860
wrapped BTC we could just have two

2401
01:31:58,860 --> 01:32:00,300
tokens like this we won't have to Loop

2402
01:32:00,300 --> 01:32:01,860
through anything we're going to make

2403
01:32:01,860 --> 01:32:04,199
this system a little bit agnostic so

2404
01:32:04,199 --> 01:32:05,880
that you can deploy this with any amount

2405
01:32:05,880 --> 01:32:07,820
of stable coins any amount of

2406
01:32:07,820 --> 01:32:10,080
collaterals so

2407
01:32:10,080 --> 01:32:12,000
we're going to make a new state variable

2408
01:32:12,000 --> 01:32:14,219
it's going to be an address array

2409
01:32:14,219 --> 01:32:18,179
private s underscore collateral tokens

2410
01:32:18,179 --> 01:32:19,980
and what we're going to do is write in

2411
01:32:19,980 --> 01:32:22,800
our Constructor when we update our price

2412
01:32:22,800 --> 01:32:25,380
feeds with the token and the price feed

2413
01:32:25,380 --> 01:32:27,960
we're also going to add the tokens

2414
01:32:27,960 --> 01:32:29,219
addresses

2415
01:32:29,219 --> 01:32:32,639
of I to this array now we have this

2416
01:32:32,639 --> 01:32:34,139
array of collateral tokens that we can

2417
01:32:34,139 --> 01:32:35,639
Loop through and that way we can

2418
01:32:35,639 --> 01:32:37,500
calculate how much value people have

2419
01:32:37,500 --> 01:32:40,139
based off of all of the tokens

2420
01:32:40,139 --> 01:32:41,400
so

2421
01:32:41,400 --> 01:32:43,860
get account collateral value we're going

2422
01:32:43,860 --> 01:32:48,360
to say four you win 256 I equals zero I

2423
01:32:48,360 --> 01:32:49,800
is less than

2424
01:32:49,800 --> 01:32:54,900
OS tokens dot length I plus plus address

2425
01:32:54,900 --> 01:33:00,060
token equals s collateral tokens of I

2426
01:33:00,060 --> 01:33:02,699
and we'll get the amount so this is the

2427
01:33:02,699 --> 01:33:04,260
token that we're working with we'll get

2428
01:33:04,260 --> 01:33:08,219
the amount by you and 256 amount that is

2429
01:33:08,219 --> 01:33:10,500
deposited by this user by S underscore

2430
01:33:10,500 --> 01:33:14,699
collateral deposited user

2431
01:33:14,699 --> 01:33:16,739
token like this

2432
01:33:16,739 --> 01:33:19,320
then total collateral

2433
01:33:19,320 --> 01:33:21,600
value in USD

2434
01:33:21,600 --> 01:33:25,440
plus equals uh oh now that we have the

2435
01:33:25,440 --> 01:33:26,580
amount we're going to need to get the

2436
01:33:26,580 --> 01:33:29,400
USD value of this and this is probably a

2437
01:33:29,400 --> 01:33:30,360
function that we're going to want to

2438
01:33:30,360 --> 01:33:33,060
have be public so that other people can

2439
01:33:33,060 --> 01:33:34,380
use this as well

2440
01:33:34,380 --> 01:33:36,840
so create a function

2441
01:33:36,840 --> 01:33:40,320
get USD value or some of the app passes

2442
01:33:40,320 --> 01:33:41,880
in an address token

2443
01:33:41,880 --> 01:33:44,159
U into physics amount

2444
01:33:44,159 --> 01:33:47,280
this will be a public view returns

2445
01:33:47,280 --> 01:33:51,179
you went to 256. and this is where we're

2446
01:33:51,179 --> 01:33:53,040
going to do some price feed stuff some

2447
01:33:53,040 --> 01:33:54,900
stuff that's very familiar

2448
01:33:54,900 --> 01:33:57,179
so we're going to need to get the price

2449
01:33:57,179 --> 01:33:58,860
sheet for the token

2450
01:33:58,860 --> 01:34:01,320
and then times the amount by the price

2451
01:34:01,320 --> 01:34:03,659
so we have to work with aggregator V3

2452
01:34:03,659 --> 01:34:05,940
interface again that chain link data

2453
01:34:05,940 --> 01:34:07,980
feeds so import and I know we've worked

2454
01:34:07,980 --> 01:34:09,320
with this before

2455
01:34:09,320 --> 01:34:12,960
aggregate or V3 interface

2456
01:34:12,960 --> 01:34:14,940
from

2457
01:34:14,940 --> 01:34:17,100
it looks like GitHub copilot it's got my

2458
01:34:17,100 --> 01:34:19,020
back at chain link slash contracts blah

2459
01:34:19,020 --> 01:34:20,100
blah

2460
01:34:20,100 --> 01:34:21,600
this means we're gonna have to install

2461
01:34:21,600 --> 01:34:24,300
that remember we can install the smaller

2462
01:34:24,300 --> 01:34:27,300
one with Forge install

2463
01:34:27,300 --> 01:34:30,440
smart contract kit slash chain link

2464
01:34:30,440 --> 01:34:33,920
brownie contracts at

2465
01:34:33,920 --> 01:34:39,420
0.6.1 dash dash no dash commit like this

2466
01:34:39,420 --> 01:34:43,400
chain link brownie contracts

2467
01:34:44,760 --> 01:34:46,199
awesome then we're gonna have to go to

2468
01:34:46,199 --> 01:34:48,179
our foundry.tamil

2469
01:34:48,179 --> 01:34:50,280
add some remappings in here

2470
01:34:50,280 --> 01:34:52,620
so we're going to put a little comma

2471
01:34:52,620 --> 01:34:55,920
we're gonna say that's chain link slash

2472
01:34:55,920 --> 01:34:58,320
contracts equals

2473
01:34:58,320 --> 01:35:02,880
lib slash chain link brownie contracts

2474
01:35:02,880 --> 01:35:04,560
slash contracts

2475
01:35:04,560 --> 01:35:06,659
like that so now we have the aggregator

2476
01:35:06,659 --> 01:35:09,239
V3 interface scroll down to the bottom

2477
01:35:09,239 --> 01:35:11,760
get USD value I know we've done this

2478
01:35:11,760 --> 01:35:14,280
before I know this is familiar to a lot

2479
01:35:14,280 --> 01:35:16,139
of you but we're going to say aggregator

2480
01:35:16,139 --> 01:35:19,260
V3 interface price feed equals

2481
01:35:19,260 --> 01:35:21,840
aggregator V3 interface of s underscore

2482
01:35:21,840 --> 01:35:22,800
price

2483
01:35:22,800 --> 01:35:25,320
feeds of the token so we're going to get

2484
01:35:25,320 --> 01:35:27,239
the price feed of the token we're

2485
01:35:27,239 --> 01:35:29,219
looking to get the value of now we have

2486
01:35:29,219 --> 01:35:31,260
the price feed here we're going to do

2487
01:35:31,260 --> 01:35:35,100
this wow it'll co-pilot spot on we're

2488
01:35:35,100 --> 01:35:36,480
gonna get the price by calling price

2489
01:35:36,480 --> 01:35:39,600
feed the latest round data and this is

2490
01:35:39,600 --> 01:35:40,560
where we're going to do a little bit of

2491
01:35:40,560 --> 01:35:42,659
math right let's say one eighth equals a

2492
01:35:42,659 --> 01:35:43,860
thousand dollars

2493
01:35:43,860 --> 01:35:49,500
The Returned value from CL will be 1000

2494
01:35:49,500 --> 01:35:51,020
times

2495
01:35:51,020 --> 01:35:54,380
1e8 how do I know this well if I go to

2496
01:35:54,380 --> 01:35:57,420
docs.chain.link go to data feeds

2497
01:35:57,420 --> 01:35:59,639
I can scroll down to

2498
01:35:59,639 --> 01:36:01,739
price feed addresses

2499
01:36:01,739 --> 01:36:05,340
and I can see if I do show more details

2500
01:36:05,340 --> 01:36:07,880
for ethusd

2501
01:36:07,880 --> 01:36:11,100
USD it has eight decimal places

2502
01:36:11,100 --> 01:36:13,380
and I know Bitcoin USD also has eight

2503
01:36:13,380 --> 01:36:15,480
decimal places we could add some code in

2504
01:36:15,480 --> 01:36:16,980
here so that we make sure we're getting

2505
01:36:16,980 --> 01:36:18,719
the right decimals but I'm just going to

2506
01:36:18,719 --> 01:36:21,000
go with eight for now and now we can do

2507
01:36:21,000 --> 01:36:22,560
a little bit of math here

2508
01:36:22,560 --> 01:36:25,679
so we need to do the price times the

2509
01:36:25,679 --> 01:36:28,620
amount right what is this all we need to

2510
01:36:28,620 --> 01:36:31,560
do turn price times amount no because

2511
01:36:31,560 --> 01:36:33,179
the number is going to be way too big

2512
01:36:33,179 --> 01:36:35,040
right let's say the price is a thousand

2513
01:36:35,040 --> 01:36:39,239
times one E8 and now we're multiplying

2514
01:36:39,239 --> 01:36:41,639
that by let's say the the amount is a

2515
01:36:41,639 --> 01:36:45,480
thousand times one e 18 because it's

2516
01:36:45,480 --> 01:36:47,400
going to be in way this number is going

2517
01:36:47,400 --> 01:36:50,100
to be absolutely massive right so first

2518
01:36:50,100 --> 01:36:52,980
we need to multiply this a thousand by a

2519
01:36:52,980 --> 01:36:55,320
number to get this number to match this

2520
01:36:55,320 --> 01:36:57,360
one so these need to be the same units

2521
01:36:57,360 --> 01:36:58,380
of precision

2522
01:36:58,380 --> 01:37:00,300
so that's going to be we're gonna have

2523
01:37:00,300 --> 01:37:04,199
to multiply this first by one E10 and

2524
01:37:04,199 --> 01:37:05,940
because I don't like magic numbers we're

2525
01:37:05,940 --> 01:37:07,320
going to scroll the top

2526
01:37:07,320 --> 01:37:09,659
create a new state variable right in

2527
01:37:09,659 --> 01:37:13,860
here we're gonna do a u into 256 private

2528
01:37:13,860 --> 01:37:15,739
constant

2529
01:37:15,739 --> 01:37:21,060
additional feed Precision equals one E10

2530
01:37:21,060 --> 01:37:23,219
like this and now it's not a magic

2531
01:37:23,219 --> 01:37:24,060
number

2532
01:37:24,060 --> 01:37:26,400
so instead of doing this now we're going

2533
01:37:26,400 --> 01:37:28,620
to say okay price and we're going to

2534
01:37:28,620 --> 01:37:31,020
wrap it as a unit 256 so that

2535
01:37:31,020 --> 01:37:33,900
everything's down 256 or say the price

2536
01:37:33,900 --> 01:37:36,060
first needs to be multiplied by the

2537
01:37:36,060 --> 01:37:38,280
additional feed Precision so that now

2538
01:37:38,280 --> 01:37:40,800
both of these are U and 256s and they

2539
01:37:40,800 --> 01:37:44,100
both have one E18 but then we're going

2540
01:37:44,100 --> 01:37:46,920
to have to divide all of these by 1e18

2541
01:37:46,920 --> 01:37:48,960
as well so this number doesn't look

2542
01:37:48,960 --> 01:37:50,639
super wonky so we're gonna have to wrap

2543
01:37:50,639 --> 01:37:54,960
this whole thing by one E18 and as I

2544
01:37:54,960 --> 01:37:55,739
hate

2545
01:37:55,739 --> 01:37:57,900
floating magic numbers like this so

2546
01:37:57,900 --> 01:37:59,340
we're going to scroll back to the top

2547
01:37:59,340 --> 01:38:01,560
copy paste this this is now just going

2548
01:38:01,560 --> 01:38:03,540
to be called precision

2549
01:38:03,540 --> 01:38:04,520
2018

2550
01:38:04,520 --> 01:38:06,480
grab precision

2551
01:38:06,480 --> 01:38:09,300
divide by Precision so you enter 56

2552
01:38:09,300 --> 01:38:11,520
price times additional feed Precision

2553
01:38:11,520 --> 01:38:13,980
times amount divided by precision and we

2554
01:38:13,980 --> 01:38:16,560
should be good to go here this is where

2555
01:38:16,560 --> 01:38:18,260
my brain immediately goes okay

2556
01:38:18,260 --> 01:38:20,340
definitely need to write some tests for

2557
01:38:20,340 --> 01:38:22,020
this so once we've finished going

2558
01:38:22,020 --> 01:38:23,520
through this we're definitely going to

2559
01:38:23,520 --> 01:38:24,719
read we're definitely going to write

2560
01:38:24,719 --> 01:38:27,300
some tests at least for get USD value

2561
01:38:27,300 --> 01:38:28,199
here

2562
01:38:28,199 --> 01:38:31,980
so let's go back up through our massive

2563
01:38:31,980 --> 01:38:33,600
tree of functions that we just created

2564
01:38:33,600 --> 01:38:35,940
that are not complete so let's go back

2565
01:38:35,940 --> 01:38:38,400
to get account collateral value

2566
01:38:38,400 --> 01:38:40,739
and this is going to be the total us the

2567
01:38:40,739 --> 01:38:42,540
total collateral value news D is going

2568
01:38:42,540 --> 01:38:43,260
to be

2569
01:38:43,260 --> 01:38:46,679
get the USD value of the current token

2570
01:38:46,679 --> 01:38:47,940
we're on

2571
01:38:47,940 --> 01:38:49,920
times the amount that we're working with

2572
01:38:49,920 --> 01:38:52,560
total collateral value in USD actually

2573
01:38:52,560 --> 01:38:55,980
let's put that there boom and that's it

2574
01:38:55,980 --> 01:38:57,960
right so we just Loop through all the

2575
01:38:57,960 --> 01:39:00,840
tokens in the token array and we just

2576
01:39:00,840 --> 01:39:03,000
add up the value in USD of each one of

2577
01:39:03,000 --> 01:39:04,800
these tokens and I know we don't need a

2578
01:39:04,800 --> 01:39:06,000
return here but I'm going to add a

2579
01:39:06,000 --> 01:39:09,540
return here anyways return this so cool

2580
01:39:09,540 --> 01:39:10,800
so now we have a way to get the

2581
01:39:10,800 --> 01:39:13,080
collateral value in USD

2582
01:39:13,080 --> 01:39:16,020
we needed that way up here oops let's do

2583
01:39:16,020 --> 01:39:17,520
collateral value

2584
01:39:17,520 --> 01:39:20,600
in USD

2585
01:39:20,880 --> 01:39:24,060
get collateral value oops let's do this

2586
01:39:24,060 --> 01:39:25,560
and awesome so now our get account

2587
01:39:25,560 --> 01:39:28,739
information is going to return the total

2588
01:39:28,739 --> 01:39:31,679
USD minted the total DSC minted and then

2589
01:39:31,679 --> 01:39:33,600
the total value of all the collateral

2590
01:39:33,600 --> 01:39:36,560
here okay great

2591
01:39:38,639 --> 01:39:40,260
now we can scroll up again

2592
01:39:40,260 --> 01:39:42,239
we have this revert if Health factor is

2593
01:39:42,239 --> 01:39:44,460
broken which is still busted because

2594
01:39:44,460 --> 01:39:47,280
this function doesn't do anything but

2595
01:39:47,280 --> 01:39:49,080
now we can actually have it do something

2596
01:39:49,080 --> 01:39:51,480
because we have this health Factor here

2597
01:39:51,480 --> 01:39:53,340
we're going to update our health Factor

2598
01:39:53,340 --> 01:39:54,420
function

2599
01:39:54,420 --> 01:39:55,920
because now we have the two of these

2600
01:39:55,920 --> 01:39:59,219
what we can do is we can just

2601
01:39:59,219 --> 01:40:01,980
get the ratio of these two so we could

2602
01:40:01,980 --> 01:40:03,179
say

2603
01:40:03,179 --> 01:40:05,280
lateral value in USD

2604
01:40:05,280 --> 01:40:08,400
divided by total USD minted this is what

2605
01:40:08,400 --> 01:40:10,260
we're going to return for a health

2606
01:40:10,260 --> 01:40:14,219
Factor right well not quite so let's say

2607
01:40:14,219 --> 01:40:17,400
we minted we have 100 collateral divided

2608
01:40:17,400 --> 01:40:21,600
by 100 DSC right this is one to one if

2609
01:40:21,600 --> 01:40:23,820
we go down up if we go down a penny

2610
01:40:23,820 --> 01:40:25,440
we're going to be under collateralized

2611
01:40:25,440 --> 01:40:27,900
right and we don't want to go under

2612
01:40:27,900 --> 01:40:29,520
collateralized we always want to be over

2613
01:40:29,520 --> 01:40:31,199
collateralized

2614
01:40:31,199 --> 01:40:35,040
because if this ever goes below 100 our

2615
01:40:35,040 --> 01:40:37,980
system is is bunked up right so we want

2616
01:40:37,980 --> 01:40:39,540
to set the threshold to be like hey if

2617
01:40:39,540 --> 01:40:41,699
you go under 150

2618
01:40:41,699 --> 01:40:44,159
lateral you can get liquidated right

2619
01:40:44,159 --> 01:40:46,440
because we go under 100 it's already too

2620
01:40:46,440 --> 01:40:47,159
late

2621
01:40:47,159 --> 01:40:48,960
so we want to say hey we want you to go

2622
01:40:48,960 --> 01:40:52,739
at least 150. so we're going to create a

2623
01:40:52,739 --> 01:40:54,360
liquidation threshold

2624
01:40:54,360 --> 01:40:56,639
and we're going to do this at the top

2625
01:40:56,639 --> 01:40:59,760
so we're going to say you went 256

2626
01:40:59,760 --> 01:41:01,139
private

2627
01:41:01,139 --> 01:41:02,480
constant

2628
01:41:02,480 --> 01:41:07,199
liquidation threshold equals 50. and

2629
01:41:07,199 --> 01:41:10,020
this means you need to be 150 or no this

2630
01:41:10,020 --> 01:41:13,340
means you need to be 200 percent over

2631
01:41:13,340 --> 01:41:15,600
lateralized I think

2632
01:41:15,600 --> 01:41:17,820
might be 150 but we'll find out in the

2633
01:41:17,820 --> 01:41:18,719
test

2634
01:41:18,719 --> 01:41:20,280
so now if we go back down to where we

2635
01:41:20,280 --> 01:41:20,940
were

2636
01:41:20,940 --> 01:41:22,679
to get our health Factor we're not just

2637
01:41:22,679 --> 01:41:24,960
going to divide these two and even this

2638
01:41:24,960 --> 01:41:26,219
doesn't really work because if we have

2639
01:41:26,219 --> 01:41:29,699
150 over 100 150 divided by 100 is equal

2640
01:41:29,699 --> 01:41:32,280
to 1.5 decimals don't work in solidity

2641
01:41:32,280 --> 01:41:33,840
so it would just be one

2642
01:41:33,840 --> 01:41:36,060
I guess that would work but we want we

2643
01:41:36,060 --> 01:41:37,440
want to know exactly what the health

2644
01:41:37,440 --> 01:41:40,080
factor is right with Precision so first

2645
01:41:40,080 --> 01:41:40,800
off

2646
01:41:40,800 --> 01:41:43,440
let's instead of just doing this let's

2647
01:41:43,440 --> 01:41:48,119
say you went to 256 collateral adjusted

2648
01:41:48,119 --> 01:41:52,380
or threshold equals the collateral value

2649
01:41:52,380 --> 01:41:53,639
in USD

2650
01:41:53,639 --> 01:41:55,020
times

2651
01:41:55,020 --> 01:41:57,420
liquidation threshold and then we should

2652
01:41:57,420 --> 01:41:59,159
divide by 100 right because the

2653
01:41:59,159 --> 01:42:01,500
liquidation threshold has is multiplying

2654
01:42:01,500 --> 01:42:03,659
it's making our number much bigger

2655
01:42:03,659 --> 01:42:05,760
so we should divide by 100 as I don't

2656
01:42:05,760 --> 01:42:06,540
like

2657
01:42:06,540 --> 01:42:09,119
floating numbers so we'll do unit 256

2658
01:42:09,119 --> 01:42:11,840
private constant

2659
01:42:11,840 --> 01:42:13,760
liquidation

2660
01:42:13,760 --> 01:42:17,580
Precision equals 100 so we'll go back

2661
01:42:17,580 --> 01:42:18,480
down

2662
01:42:18,480 --> 01:42:20,639
divided by the liquidation precision

2663
01:42:20,639 --> 01:42:22,219
so now we have this collateral amount

2664
01:42:22,219 --> 01:42:25,139
adjusted for this this threshold right

2665
01:42:25,139 --> 01:42:27,179
so now you kind of think of it as

2666
01:42:27,179 --> 01:42:30,659
instead of say we have 150 of each

2667
01:42:30,659 --> 01:42:34,739
divided by 100 of DSC right this would

2668
01:42:34,739 --> 01:42:38,880
be 1.5 but now they need to multiply by

2669
01:42:38,880 --> 01:42:40,619
50 as well

2670
01:42:40,619 --> 01:42:42,540
but now this collateral value is

2671
01:42:42,540 --> 01:42:44,639
multiplied by essentially one over five

2672
01:42:44,639 --> 01:42:47,219
right let's let's do the math here right

2673
01:42:47,219 --> 01:42:48,540
if we had

2674
01:42:48,540 --> 01:42:51,719
say a thousand dollars of eth we just

2675
01:42:51,719 --> 01:42:55,920
times that by 50 which gets us to 50 000

2676
01:42:55,920 --> 01:42:58,080
but then we divided by that by about 100

2677
01:42:58,080 --> 01:43:01,320
which equals 500. so if we had a

2678
01:43:01,320 --> 01:43:04,440
thousand dollars of eth times 50 equals

2679
01:43:04,440 --> 01:43:06,900
this divided by 100 is 500. same thing

2680
01:43:06,900 --> 01:43:09,000
with this example down here if we had

2681
01:43:09,000 --> 01:43:13,080
150 worth of each eth we say 150 times

2682
01:43:13,080 --> 01:43:15,260
50 equals

2683
01:43:15,260 --> 01:43:20,520
7500 divided by 100 equals 75 and then

2684
01:43:20,520 --> 01:43:23,400
if we do 75 divided by 100 that is going

2685
01:43:23,400 --> 01:43:26,520
to be definitely less than one right so

2686
01:43:26,520 --> 01:43:28,619
we we're basically saying with this 50

2687
01:43:28,619 --> 01:43:31,980
threshold 50 over 100 is essentially 1

2688
01:43:31,980 --> 01:43:33,780
over 2. we're saying you need to have

2689
01:43:33,780 --> 01:43:36,300
double the collateral in here so yeah so

2690
01:43:36,300 --> 01:43:39,119
now that I'm talking it out loud this 50

2691
01:43:39,119 --> 01:43:41,280
liquidation threshold means we need to

2692
01:43:41,280 --> 01:43:44,040
be 200 over clatterized right we need to

2693
01:43:44,040 --> 01:43:45,780
have double the collateral that we have

2694
01:43:45,780 --> 01:43:50,580
the minted DSC anyways so a whole bunch

2695
01:43:50,580 --> 01:43:53,219
of math hopefully this makes sense if

2696
01:43:53,219 --> 01:43:55,560
not definitely work with your AI to make

2697
01:43:55,560 --> 01:43:57,659
sure this makes sense or ask questions

2698
01:43:57,659 --> 01:43:59,580
in the discussion right I know some of

2699
01:43:59,580 --> 01:44:00,780
this math can get a little bit tricky

2700
01:44:00,780 --> 01:44:01,380
here

2701
01:44:01,380 --> 01:44:03,659
so collateral adjusted for threshold

2702
01:44:03,659 --> 01:44:05,880
and now we can return

2703
01:44:05,880 --> 01:44:08,580
the collateral adjusted oops this

2704
01:44:08,580 --> 01:44:10,679
collateral adjusted for threshold

2705
01:44:10,679 --> 01:44:12,000
times

2706
01:44:12,000 --> 01:44:13,320
precision

2707
01:44:13,320 --> 01:44:17,040
divided by that total DSE minted now

2708
01:44:17,040 --> 01:44:19,320
this will give us our true Health factor

2709
01:44:19,320 --> 01:44:21,719
and if this is less than one you can get

2710
01:44:21,719 --> 01:44:23,580
liquidated now

2711
01:44:23,580 --> 01:44:25,560
this is one example

2712
01:44:25,560 --> 01:44:27,060
right let's look at another example

2713
01:44:27,060 --> 01:44:29,280
let's say I guess this is two examples

2714
01:44:29,280 --> 01:44:31,380
so let's say they have a thousand

2715
01:44:31,380 --> 01:44:36,300
dollars worth of eth and 100 DSC right

2716
01:44:36,300 --> 01:44:40,619
so let's do the math here 1000 times 50

2717
01:44:40,619 --> 01:44:43,260
equals fifty one two three divided by

2718
01:44:43,260 --> 01:44:46,980
100 is equal to 500

2719
01:44:46,980 --> 01:44:49,199
500 divided by 100

2720
01:44:49,199 --> 01:44:50,880
which is definitely greater than one

2721
01:44:50,880 --> 01:44:53,880
right 500 divided 100 is 5. so this

2722
01:44:53,880 --> 01:44:55,800
person with a thousand dollars of eth

2723
01:44:55,800 --> 01:44:58,199
deposited and 100 DSC minted would have

2724
01:44:58,199 --> 01:45:02,280
a health factor of 500. nice so now that

2725
01:45:02,280 --> 01:45:04,139
we have a health Factor we can actually

2726
01:45:04,139 --> 01:45:06,300
finally do this revert if Health factor

2727
01:45:06,300 --> 01:45:09,540
is broken function or we say we can even

2728
01:45:09,540 --> 01:45:11,040
put this

2729
01:45:11,040 --> 01:45:12,840
above this as kind of like a pseudo net

2730
01:45:12,840 --> 01:45:14,639
spec we could say

2731
01:45:14,639 --> 01:45:18,300
U into 256 Health Factor equals

2732
01:45:18,300 --> 01:45:19,739
underscore health

2733
01:45:19,739 --> 01:45:23,820
backdoor of the user and we say if the

2734
01:45:23,820 --> 01:45:24,719
user

2735
01:45:24,719 --> 01:45:27,300
excuse me actually let's do user Health

2736
01:45:27,300 --> 01:45:30,480
factor and if the user Health Factor

2737
01:45:30,480 --> 01:45:33,900
is less than the some Min Health factor

2738
01:45:33,900 --> 01:45:36,000
which is going to be one Health fact so

2739
01:45:36,000 --> 01:45:37,260
let's go ahead and create this let's go

2740
01:45:37,260 --> 01:45:39,239
to the top because we hate floating

2741
01:45:39,239 --> 01:45:40,260
numbers

2742
01:45:40,260 --> 01:45:43,920
unit 256 private constant Min Health

2743
01:45:43,920 --> 01:45:46,320
Factor equals one if the user Health

2744
01:45:46,320 --> 01:45:47,880
factor is less than the Min Health

2745
01:45:47,880 --> 01:45:49,920
Factor then we're going to go ahead and

2746
01:45:49,920 --> 01:45:53,219
revert I don't love this and do DSC

2747
01:45:53,219 --> 01:45:54,659
engine

2748
01:45:54,659 --> 01:45:56,340
underscore underscore

2749
01:45:56,340 --> 01:45:57,600
rakes

2750
01:45:57,600 --> 01:46:00,960
Health Factor I'm going to pass in this

2751
01:46:00,960 --> 01:46:03,179
health factor that we break with boom

2752
01:46:03,179 --> 01:46:06,960
new error scroll the top error engine

2753
01:46:06,960 --> 01:46:09,900
brakes Health Factor even 256. Health

2754
01:46:09,900 --> 01:46:13,199
Factor back door

2755
01:46:13,199 --> 01:46:14,460
it looks like we still have some red

2756
01:46:14,460 --> 01:46:16,020
here what did I forget okay revertive

2757
01:46:16,020 --> 01:46:17,699
Health factor is broken underscore like

2758
01:46:17,699 --> 01:46:20,040
this boom now it looks like nothing's

2759
01:46:20,040 --> 01:46:24,000
red let's just make sure Forge build

2760
01:46:24,000 --> 01:46:27,619
successful nice

2761
01:46:29,699 --> 01:46:33,239
okay where were we mint DSC okay

2762
01:46:33,239 --> 01:46:37,199
mint DSC so we added some more DC minted

2763
01:46:37,199 --> 01:46:40,980
and if adding this DSC breaks the health

2764
01:46:40,980 --> 01:46:42,600
Factor because

2765
01:46:42,600 --> 01:46:43,980
breaks the health Factor we should

2766
01:46:43,980 --> 01:46:46,139
revert we should not let anybody mint

2767
01:46:46,139 --> 01:46:48,960
DSC if they're going to cause themselves

2768
01:46:48,960 --> 01:46:51,300
to get liquidated I mean we could go

2769
01:46:51,300 --> 01:46:52,980
ahead and let them do it but like let's

2770
01:46:52,980 --> 01:46:55,440
not because that's not a very good user

2771
01:46:55,440 --> 01:46:58,380
experience now what we want to do is we

2772
01:46:58,380 --> 01:47:01,500
want to actually mint the DSC so this is

2773
01:47:01,500 --> 01:47:02,340
where

2774
01:47:02,340 --> 01:47:05,280
the DSC has this mint function that's

2775
01:47:05,280 --> 01:47:07,500
only owner and the owner of this is

2776
01:47:07,500 --> 01:47:09,960
going to be the DSC engine now we could

2777
01:47:09,960 --> 01:47:12,420
say and if we look at this mint function

2778
01:47:12,420 --> 01:47:16,320
it returns a Boolean so we'll say pool

2779
01:47:16,320 --> 01:47:21,360
minted equals I underscore DSC dot mint

2780
01:47:21,360 --> 01:47:22,920
and what does it take for parameters

2781
01:47:22,920 --> 01:47:25,260
address 2 and amount

2782
01:47:25,260 --> 01:47:26,600
so address 2 is going to be

2783
01:47:26,600 --> 01:47:29,219
message.cender amount is going to be

2784
01:47:29,219 --> 01:47:33,000
amount DSC to Mint and then we'll say if

2785
01:47:33,000 --> 01:47:34,920
not minted

2786
01:47:34,920 --> 01:47:38,219
well let's just say revert DSC engine

2787
01:47:38,219 --> 01:47:41,219
underscore underscore mint failed and

2788
01:47:41,219 --> 01:47:43,619
which is a new error scroll up to the

2789
01:47:43,619 --> 01:47:47,639
top error DSC mint failed

2790
01:47:47,639 --> 01:47:50,000
cool

2791
01:47:55,560 --> 01:47:58,500
so now we have a mid function and we

2792
01:47:58,500 --> 01:48:00,119
have a deposit function so we can

2793
01:48:00,119 --> 01:48:03,300
deposit collateral we can mint DSC but

2794
01:48:03,300 --> 01:48:04,739
additionally we can get account

2795
01:48:04,739 --> 01:48:06,719
information we can calculate someone's

2796
01:48:06,719 --> 01:48:09,179
Health Factor we can calculate the USD

2797
01:48:09,179 --> 01:48:11,219
value of these different tokens

2798
01:48:11,219 --> 01:48:14,100
so at this point I'm like oof I have no

2799
01:48:14,100 --> 01:48:16,139
idea if what I'm doing makes any sort of

2800
01:48:16,139 --> 01:48:17,639
sense I want to make sure I write some

2801
01:48:17,639 --> 01:48:20,880
tests here so this is where we could go

2802
01:48:20,880 --> 01:48:23,580
ahead and create a new folder unit tests

2803
01:48:23,580 --> 01:48:26,040
and if you wanted to you could skip

2804
01:48:26,040 --> 01:48:28,139
writing the scripts and just kind of

2805
01:48:28,139 --> 01:48:30,239
deploy in your unit tests and then do

2806
01:48:30,239 --> 01:48:31,560
some integration tests but I'm just

2807
01:48:31,560 --> 01:48:33,239
going to have my unit tests also be my

2808
01:48:33,239 --> 01:48:34,920
integration test for this one

2809
01:48:34,920 --> 01:48:37,080
so let's go ahead let's write a script

2810
01:48:37,080 --> 01:48:38,280
deploy

2811
01:48:38,280 --> 01:48:39,840
DSC

2812
01:48:39,840 --> 01:48:43,199
dot s dot Sol you already know the drill

2813
01:48:43,199 --> 01:48:44,820
for this

2814
01:48:44,820 --> 01:48:46,560
spdx

2815
01:48:46,560 --> 01:48:48,840
license I

2816
01:48:48,840 --> 01:48:51,060
can even zoom in a little bit identifier

2817
01:48:51,060 --> 01:48:52,139
MIT

2818
01:48:52,139 --> 01:48:57,000
contract deploy DSC is script

2819
01:48:57,000 --> 01:48:59,159
import script

2820
01:48:59,159 --> 01:49:02,960
from Forge STD

2821
01:49:02,960 --> 01:49:06,420
script.so like that pragma

2822
01:49:06,420 --> 01:49:07,820
solidity

2823
01:49:07,820 --> 01:49:11,520
0.8.18 it's good in here we're going to

2824
01:49:11,520 --> 01:49:14,699
have our function run external we've

2825
01:49:14,699 --> 01:49:17,219
done this a hundred times extra

2826
01:49:17,219 --> 01:49:20,159
null and this is going to returns a

2827
01:49:20,159 --> 01:49:21,900
couple of things it's going to both

2828
01:49:21,900 --> 01:49:23,900
return the DS

2829
01:49:23,900 --> 01:49:28,080
decentralized stable coin and the DSC

2830
01:49:28,080 --> 01:49:29,760
engine and it's going to return

2831
01:49:29,760 --> 01:49:30,960
something else but I'm not going to put

2832
01:49:30,960 --> 01:49:32,940
it in quite yet so to do that we're

2833
01:49:32,940 --> 01:49:34,679
gonna have to import

2834
01:49:34,679 --> 01:49:37,320
centralized stablecoin

2835
01:49:37,320 --> 01:49:41,360
from dot slash SRC slash

2836
01:49:41,360 --> 01:49:43,440
decentralizedablecoin.sol we're going to

2837
01:49:43,440 --> 01:49:46,139
close and reopen my vs code it's being

2838
01:49:46,139 --> 01:49:48,719
really weird right now there we go all

2839
01:49:48,719 --> 01:49:51,600
fixed so the two of these what are we

2840
01:49:51,600 --> 01:49:53,040
going to do well we're going to do

2841
01:49:53,040 --> 01:49:54,719
vm.start

2842
01:49:54,719 --> 01:49:58,139
cast like this m.stop

2843
01:49:58,139 --> 01:49:59,580
broadcast

2844
01:49:59,580 --> 01:50:02,300
like this oh we need the DSC engine

2845
01:50:02,300 --> 01:50:07,920
import DSC engine from slash SRC slash

2846
01:50:07,920 --> 01:50:09,719
DSC engine.sol

2847
01:50:09,719 --> 01:50:11,159
and in here

2848
01:50:11,159 --> 01:50:13,500
we're going to deploy both of these so

2849
01:50:13,500 --> 01:50:14,580
we'll say

2850
01:50:14,580 --> 01:50:18,260
centralized stablecoin DSC equals new

2851
01:50:18,260 --> 01:50:20,699
decentralized stablecoin does our

2852
01:50:20,699 --> 01:50:22,139
decentralized stablecoin have any

2853
01:50:22,139 --> 01:50:25,560
parameters it does not we're also going

2854
01:50:25,560 --> 01:50:28,500
to deploy our dsce

2855
01:50:28,500 --> 01:50:30,800
or DSC engine

2856
01:50:30,800 --> 01:50:32,760
equals new

2857
01:50:32,760 --> 01:50:36,179
ESC engine this takes a whole bunch of

2858
01:50:36,179 --> 01:50:39,900
stuff right this is going to take go to

2859
01:50:39,900 --> 01:50:42,719
the Constructor token addresses price

2860
01:50:42,719 --> 01:50:45,960
feed addresses if we toggle oops toggle

2861
01:50:45,960 --> 01:50:48,060
the word wrap addresses price feed

2862
01:50:48,060 --> 01:50:50,580
addresses and the DSC address so we have

2863
01:50:50,580 --> 01:50:52,380
the DSC address boom it's going to be

2864
01:50:52,380 --> 01:50:53,219
this one

2865
01:50:53,219 --> 01:50:54,960
where do we get the price feed addresses

2866
01:50:54,960 --> 01:50:57,060
and you guessed it we're going to make a

2867
01:50:57,060 --> 01:50:59,520
helper config so what is this DSC engine

2868
01:50:59,520 --> 01:51:00,659
need

2869
01:51:00,659 --> 01:51:03,900
instructor an array of token addresses

2870
01:51:03,900 --> 01:51:06,360
an array of price feeds and then the DSC

2871
01:51:06,360 --> 01:51:08,280
address so

2872
01:51:08,280 --> 01:51:09,360
where are we going to get those

2873
01:51:09,360 --> 01:51:11,400
addresses from you guessed it a helper

2874
01:51:11,400 --> 01:51:14,760
config so new file

2875
01:51:14,760 --> 01:51:17,960
helper config.s dot Sol

2876
01:51:17,960 --> 01:51:21,060
spdx license

2877
01:51:21,060 --> 01:51:25,860
identifier MIT pragma solidity 0.8.18

2878
01:51:25,860 --> 01:51:28,320
contract helper

2879
01:51:28,320 --> 01:51:30,900
config is script

2880
01:51:30,900 --> 01:51:33,600
import script

2881
01:51:33,600 --> 01:51:36,199
from

2882
01:51:36,440 --> 01:51:40,139
origin now let's do this on the sepolia

2883
01:51:40,139 --> 01:51:42,780
Chain so we'll do

2884
01:51:42,780 --> 01:51:44,100
construct

2885
01:51:44,100 --> 01:51:47,400
net work config what do we need in here

2886
01:51:47,400 --> 01:51:51,480
we need an well we're going to need weth

2887
01:51:51,480 --> 01:51:54,360
and Route Bitcoin those price feed

2888
01:51:54,360 --> 01:51:56,040
addresses and those DSC addresses

2889
01:51:56,040 --> 01:51:57,420
address

2890
01:51:57,420 --> 01:52:01,080
with USD price feed

2891
01:52:01,080 --> 01:52:05,179
address wrapped Bitcoin USD price feed

2892
01:52:05,179 --> 01:52:09,540
again weth is the erc20 version of

2893
01:52:09,540 --> 01:52:13,080
ethereum I've got a example web token

2894
01:52:13,080 --> 01:52:15,300
contract on sepolio and if you look at

2895
01:52:15,300 --> 01:52:17,460
it right in here we go to write contract

2896
01:52:17,460 --> 01:52:19,800
it's got this function deposit where you

2897
01:52:19,800 --> 01:52:22,920
deposit eth and it'll return to you an

2898
01:52:22,920 --> 01:52:25,080
erc20 version of eth to your metamask

2899
01:52:25,080 --> 01:52:27,840
called weth then whenever you're done

2900
01:52:27,840 --> 01:52:30,480
with it you just withdraw your eth and

2901
01:52:30,480 --> 01:52:33,000
burn your weft wrap Bitcoin is something

2902
01:52:33,000 --> 01:52:34,800
similar but with

2903
01:52:34,800 --> 01:52:36,960
Bitcoin the difference is since Bitcoin

2904
01:52:36,960 --> 01:52:38,400
doesn't originate on the blockchain

2905
01:52:38,400 --> 01:52:41,460
there is some risk in bridging it over

2906
01:52:41,460 --> 01:52:43,440
but I'm not going to go into that that's

2907
01:52:43,440 --> 01:52:45,360
something for you to look up so we're

2908
01:52:45,360 --> 01:52:46,920
also going to need the address of the

2909
01:52:46,920 --> 01:52:48,900
weft token itself we're gonna need the

2910
01:52:48,900 --> 01:52:51,320
address of the wrapped Bitcoin itself

2911
01:52:51,320 --> 01:52:54,920
and we're going to need a un256 deploy

2912
01:52:54,920 --> 01:52:57,840
deployer key kind of like what we did in

2913
01:52:57,840 --> 01:53:00,179
one of our previous lessons

2914
01:53:00,179 --> 01:53:03,780
we're gonna have Network config public

2915
01:53:03,780 --> 01:53:07,679
Active network config and then we're

2916
01:53:07,679 --> 01:53:11,159
going to have Constructor

2917
01:53:11,159 --> 01:53:12,420
like here

2918
01:53:12,420 --> 01:53:16,080
we're gonna have a function get sepolia

2919
01:53:16,080 --> 01:53:18,179
eth config

2920
01:53:18,179 --> 01:53:20,940
public view returns

2921
01:53:20,940 --> 01:53:24,119
Network config memory

2922
01:53:24,119 --> 01:53:27,239
this and then we're going to return

2923
01:53:27,239 --> 01:53:31,580
Network config we're gonna have

2924
01:53:31,580 --> 01:53:35,119
USD price feed B let's go to

2925
01:53:35,119 --> 01:53:39,239
docs.chain.link let's go to the polia so

2926
01:53:39,239 --> 01:53:43,380
polia where's eth BTC ethi excuse me

2927
01:53:43,380 --> 01:53:46,980
ethusd right here copy that paste demo

2928
01:53:46,980 --> 01:53:49,040
we're gonna need

2929
01:53:49,040 --> 01:53:51,600
Bitcoin USD price feed on sepulia

2930
01:53:51,600 --> 01:53:53,940
bitcoin USD right here

2931
01:53:53,940 --> 01:53:56,639
with that we need the Wes contract

2932
01:53:56,639 --> 01:53:59,760
address which I have here this is one

2933
01:53:59,760 --> 01:54:02,520
that I deployed with

2934
01:54:02,520 --> 01:54:05,340
here we're gonna need wrapped Bitcoin

2935
01:54:05,340 --> 01:54:07,260
and if you're looking for all these and

2936
01:54:07,260 --> 01:54:09,480
you want to just copy them out of the

2937
01:54:09,480 --> 01:54:11,219
GitHub repo associated with this you can

2938
01:54:11,219 --> 01:54:12,840
go to SRC

2939
01:54:12,840 --> 01:54:15,840
you can go to script upper config and

2940
01:54:15,840 --> 01:54:16,980
they're all in here if you want to just

2941
01:54:16,980 --> 01:54:19,199
copy paste by the way but

2942
01:54:19,199 --> 01:54:22,800
also wrap Bitcoin which I guess is this

2943
01:54:22,800 --> 01:54:23,820
address

2944
01:54:23,820 --> 01:54:25,380
but I had a different one well whatever

2945
01:54:25,380 --> 01:54:26,880
we're gonna use this one and if it

2946
01:54:26,880 --> 01:54:28,980
doesn't work that's fine we're gonna use

2947
01:54:28,980 --> 01:54:32,179
this one and of course player key

2948
01:54:32,179 --> 01:54:34,500
vm.emv unit

2949
01:54:34,500 --> 01:54:36,179
private key

2950
01:54:36,179 --> 01:54:39,480
like this okay and then we're gonna do

2951
01:54:39,480 --> 01:54:44,420
function get or create and Bill

2952
01:54:44,420 --> 01:54:50,760
config public returns Network config

2953
01:54:50,760 --> 01:54:52,440
memory

2954
01:54:52,440 --> 01:54:54,139
and we're going to do a little bit of

2955
01:54:54,139 --> 01:54:57,060
mock deployments here but we're going to

2956
01:54:57,060 --> 01:54:58,860
say if

2957
01:54:58,860 --> 01:55:02,760
Active network config dot with USD price

2958
01:55:02,760 --> 01:55:04,860
feed does not equal to the zero address

2959
01:55:04,860 --> 01:55:08,580
then we've already set it turn active

2960
01:55:08,580 --> 01:55:10,800
Network eth config we're going to do

2961
01:55:10,800 --> 01:55:13,199
some broadcasting so we're gonna need a

2962
01:55:13,199 --> 01:55:15,600
couple of a couple of mocks in here

2963
01:55:15,600 --> 01:55:17,940
we're gonna need some mock price feeds

2964
01:55:17,940 --> 01:55:22,020
and some mock erc20 tokens so

2965
01:55:22,020 --> 01:55:25,020
we're gonna need a mock V3 aggregator

2966
01:55:25,020 --> 01:55:28,619
which we're gonna go to test new folder

2967
01:55:28,619 --> 01:55:31,860
mocs and I'm going to copy paste a mock

2968
01:55:31,860 --> 01:55:34,020
from this repo if you want to copy paste

2969
01:55:34,020 --> 01:55:35,639
as well go for it

2970
01:55:35,639 --> 01:55:37,080
test

2971
01:55:37,080 --> 01:55:39,179
marks

2972
01:55:39,179 --> 01:55:42,000
Mark V3 aggregator

2973
01:55:42,000 --> 01:55:44,659
copy this

2974
01:55:46,320 --> 01:55:50,540
new file mock V3 Agra

2975
01:55:50,540 --> 01:55:57,000
.sol cool import that Imports mock B3

2976
01:55:57,000 --> 01:55:59,400
aggregator

2977
01:55:59,400 --> 01:56:01,920
from dot dot slash

2978
01:56:01,920 --> 01:56:04,980
test slash MOX slash mock V3

2979
01:56:04,980 --> 01:56:07,380
aggregator.sol so we have that we're

2980
01:56:07,380 --> 01:56:09,960
also gonna need some mock erc20s we can

2981
01:56:09,960 --> 01:56:11,940
get those actually directly from open

2982
01:56:11,940 --> 01:56:15,500
Zeppelin so if you do import your C20

2983
01:56:15,500 --> 01:56:20,340
mock ROM at open Zeppelin slash contract

2984
01:56:20,340 --> 01:56:24,840
slash mocks slash erc20 mock that's all

2985
01:56:24,840 --> 01:56:27,300
if we command click into this or you

2986
01:56:27,300 --> 01:56:29,100
open this up you can see there's a whole

2987
01:56:29,100 --> 01:56:30,480
bunch of stuff in here like we can mint

2988
01:56:30,480 --> 01:56:32,100
as much as we want to burn as much as we

2989
01:56:32,100 --> 01:56:34,139
want do transfers and stuff we do pretty

2990
01:56:34,139 --> 01:56:35,880
much whatever we want and that's why

2991
01:56:35,880 --> 01:56:38,040
it's a mock token good for testing

2992
01:56:38,040 --> 01:56:42,420
so down here vm.start cast we're going

2993
01:56:42,420 --> 01:56:46,380
to create a mock V3 aggregator eth USD

2994
01:56:46,380 --> 01:56:50,580
price feed equals new mock V3 aggregator

2995
01:56:50,580 --> 01:56:53,280
and what does this take for the

2996
01:56:53,280 --> 01:56:56,400
Constructor takes decimals and then and

2997
01:56:56,400 --> 01:56:58,080
an initial answer

2998
01:56:58,080 --> 01:57:01,679
so we're going to scroll up here we're

2999
01:57:01,679 --> 01:57:04,199
going to say un250 or excuse me you went

3000
01:57:04,199 --> 01:57:05,460
eight

3001
01:57:05,460 --> 01:57:07,820
public constant

3002
01:57:07,820 --> 01:57:09,679
decimals

3003
01:57:09,679 --> 01:57:12,540
decimals equals eight and we'll say

3004
01:57:12,540 --> 01:57:17,719
units or not you and me int 256 public

3005
01:57:17,719 --> 01:57:22,320
constant eth USD price

3006
01:57:22,320 --> 01:57:23,580
equals

3007
01:57:23,580 --> 01:57:27,420
two thousand E8 and then we're gonna do

3008
01:57:27,420 --> 01:57:30,060
the same thing but instead of eth it's

3009
01:57:30,060 --> 01:57:33,840
going to be BTC and we'll make this 1000

3010
01:57:33,840 --> 01:57:38,099
E8 eth USD scroll down all right new

3011
01:57:38,099 --> 01:57:41,520
mock what does it take control click you

3012
01:57:41,520 --> 01:57:43,560
into eight decimals initial answer

3013
01:57:43,560 --> 01:57:46,280
control minus to go back

3014
01:57:46,280 --> 01:57:49,219
decimals and then the initial answer

3015
01:57:49,219 --> 01:57:52,920
those okay oh and let's do VM dot stop

3016
01:57:52,920 --> 01:57:57,020
broadcast now we're gonna do erc20 Mach

3017
01:57:57,020 --> 01:57:59,820
West mock equals

3018
01:57:59,820 --> 01:58:04,500
new erc20 Mach what does this one take

3019
01:58:04,500 --> 01:58:06,960
name symbol initial account initial

3020
01:58:06,960 --> 01:58:11,599
balance okay say West West

3021
01:58:11,599 --> 01:58:14,000
message.cender

3022
01:58:14,000 --> 01:58:17,520
1008 you probably want to do more than

3023
01:58:17,520 --> 01:58:18,840
we probably don't want to have these

3024
01:58:18,840 --> 01:58:21,000
floating numbers in here but yeah it's

3025
01:58:21,000 --> 01:58:22,260
just a Mark it's not a big deal I guess

3026
01:58:22,260 --> 01:58:24,719
now we're going to copy paste all this

3027
01:58:24,719 --> 01:58:27,780
for BTC

3028
01:58:27,780 --> 01:58:29,820
BTC

3029
01:58:29,820 --> 01:58:32,520
we're going to say BTC

3030
01:58:32,520 --> 01:58:34,260
it's going to be the

3031
01:58:34,260 --> 01:58:36,540
wrapped BTC

3032
01:58:36,540 --> 01:58:41,820
wrapped BTC routes BTC like that stop

3033
01:58:41,820 --> 01:58:44,760
the broadcast and then return

3034
01:58:44,760 --> 01:58:48,960
Network config with USD price feed is

3035
01:58:48,960 --> 01:58:53,400
going to be address oh thanks Copilot

3036
01:58:53,400 --> 01:58:55,739
thanks get a copilot thanks get up

3037
01:58:55,739 --> 01:58:59,580
copilot thanks get them copilot and this

3038
01:58:59,580 --> 01:59:00,840
is actually going to be the default

3039
01:59:00,840 --> 01:59:03,900
Anvil key which if you want you can just

3040
01:59:03,900 --> 01:59:07,440
go back to here again and copy paste it

3041
01:59:07,440 --> 01:59:09,179
out of here or you know what you just

3042
01:59:09,179 --> 01:59:10,320
run anvil

3043
01:59:10,320 --> 01:59:13,739
scroll up boom private key right here

3044
01:59:13,739 --> 01:59:16,440
cancel that we'll say you into two six

3045
01:59:16,440 --> 01:59:21,920
public excuse me int 256 public default

3046
01:59:21,920 --> 01:59:24,840
Anvil key equals

3047
01:59:24,840 --> 01:59:28,739
paste that in and we'll say we'll just

3048
01:59:28,739 --> 01:59:30,780
use the default ample key if you're

3049
01:59:30,780 --> 01:59:33,719
working with and Bill okay nice so now

3050
01:59:33,719 --> 01:59:37,020
we have get our crate Anvil yeah it's

3051
01:59:37,020 --> 01:59:40,260
apolia let's update our Constructor

3052
01:59:40,260 --> 01:59:42,260
so we'll say if

3053
01:59:42,260 --> 01:59:45,739
lock.chain ID equals equals one one one

3054
01:59:45,739 --> 01:59:49,500
five five one one one then

3055
01:59:49,500 --> 01:59:53,760
active Active network config equals get

3056
01:59:53,760 --> 01:59:56,880
sepolia eth config

3057
01:59:56,880 --> 01:59:58,199
else

3058
01:59:58,199 --> 02:00:02,219
to Active network config equals get or

3059
02:00:02,219 --> 02:00:05,580
create eat and build config nice so

3060
02:00:05,580 --> 02:00:06,719
we've got a little bit of a helper

3061
02:00:06,719 --> 02:00:09,960
config here a little semicolon down here

3062
02:00:09,960 --> 02:00:11,520
this looks pretty good what's wrong here

3063
02:00:11,520 --> 02:00:16,619
sorry this is a unit 256. Okay cool so

3064
02:00:16,619 --> 02:00:18,119
now that we have a helper config we can

3065
02:00:18,119 --> 02:00:20,699
go finally back to our deploy DSC let's

3066
02:00:20,699 --> 02:00:23,760
import that in here import upper config

3067
02:00:23,760 --> 02:00:25,199
from

3068
02:00:25,199 --> 02:00:28,020
upper config right at the top we'll say

3069
02:00:28,020 --> 02:00:32,880
helper config config equals new upper

3070
02:00:32,880 --> 02:00:35,520
config and out of this config we're

3071
02:00:35,520 --> 02:00:36,960
going to get

3072
02:00:36,960 --> 02:00:41,040
all this with a Bitcoin with rapid coin

3073
02:00:41,040 --> 02:00:43,440
to poke et cetera so I'm going to say

3074
02:00:43,440 --> 02:00:46,980
address with USD price feed oh I can

3075
02:00:46,980 --> 02:00:49,380
even just hit Tab and it looks like it

3076
02:00:49,380 --> 02:00:52,260
has most of it yep let's use D rep

3077
02:00:52,260 --> 02:00:54,780
Bitcoin West rip it coin deployer key

3078
02:00:54,780 --> 02:00:58,380
equals config.active Network config

3079
02:00:58,380 --> 02:01:00,599
cool looks good to me I'm gonna toggle

3080
02:01:00,599 --> 02:01:03,119
word wrap so that it wraps around okay

3081
02:01:03,119 --> 02:01:04,980
cool we have all of those

3082
02:01:04,980 --> 02:01:07,860
now our DSC engine takes an array of

3083
02:01:07,860 --> 02:01:09,900
token addresses an array of price feeds

3084
02:01:09,900 --> 02:01:11,580
so we can say

3085
02:01:11,580 --> 02:01:13,020
it's right at the top let's make those

3086
02:01:13,020 --> 02:01:14,880
arrays we'll say address

3087
02:01:14,880 --> 02:01:16,080
Ray

3088
02:01:16,080 --> 02:01:19,619
public token addresses

3089
02:01:19,619 --> 02:01:24,020
address array public price feed

3090
02:01:24,020 --> 02:01:27,960
addresses and we'll say token addresses

3091
02:01:27,960 --> 02:01:31,920
equals West and wrapped BTC

3092
02:01:31,920 --> 02:01:33,420
price

3093
02:01:33,420 --> 02:01:37,080
speed addresses equals weft USD price

3094
02:01:37,080 --> 02:01:39,780
feed address wrap Bitcoin USD price feed

3095
02:01:39,780 --> 02:01:42,060
okay cool I think that's everything

3096
02:01:42,060 --> 02:01:45,060
right yeah so now we can go back to this

3097
02:01:45,060 --> 02:01:46,080
line now

3098
02:01:46,080 --> 02:01:48,440
do you see engine engine new DC engine

3099
02:01:48,440 --> 02:01:52,800
and it takes the token addresses

3100
02:01:52,800 --> 02:01:57,540
price feed address says and DSC okay

3101
02:01:57,540 --> 02:01:59,940
cool and then finally something we

3102
02:01:59,940 --> 02:02:01,560
haven't really talked about too much but

3103
02:02:01,560 --> 02:02:03,659
this decentralized stablecoin

3104
02:02:03,659 --> 02:02:06,060
like I said it's ownable but it needs to

3105
02:02:06,060 --> 02:02:08,400
be owned by the engine so this ownable

3106
02:02:08,400 --> 02:02:11,460
actually has a transfer ownership

3107
02:02:11,460 --> 02:02:13,860
function and we're going to call that to

3108
02:02:13,860 --> 02:02:16,500
transfer ownership to the engine so

3109
02:02:16,500 --> 02:02:18,239
we'll go back to our deploy here oh

3110
02:02:18,239 --> 02:02:20,239
sorry this isn't DSC

3111
02:02:20,239 --> 02:02:24,500
address DSC so then we're going to call

3112
02:02:24,500 --> 02:02:29,639
DSC dot transfer ownership to the

3113
02:02:29,639 --> 02:02:33,780
address DSC engine now only the engine

3114
02:02:33,780 --> 02:02:37,260
oops engine excuse me only the engine

3115
02:02:37,260 --> 02:02:38,880
can do anything with it

3116
02:02:38,880 --> 02:02:40,320
and then we're going to return all these

3117
02:02:40,320 --> 02:02:41,880
return

3118
02:02:41,880 --> 02:02:46,080
DSC and engine nice oh and the deployer

3119
02:02:46,080 --> 02:02:48,980
key is going to go here

3120
02:02:51,060 --> 02:02:53,159
Okay cool so the reason we did all this

3121
02:02:53,159 --> 02:02:55,260
was because I wanted to write my unit

3122
02:02:55,260 --> 02:02:57,179
tests using actual deploy scripts

3123
02:02:57,179 --> 02:02:59,400
because I prefer to do that but like I

3124
02:02:59,400 --> 02:03:01,020
said it might be a good idea for you to

3125
02:03:01,020 --> 02:03:02,280
write unit tests before you write your

3126
02:03:02,280 --> 02:03:03,780
deploy Scripts

3127
02:03:03,780 --> 02:03:05,400
and then integration tests with your

3128
02:03:05,400 --> 02:03:08,099
deploy scripts but in any case let's go

3129
02:03:08,099 --> 02:03:10,460
ahead and finally create a test in here

3130
02:03:10,460 --> 02:03:14,639
DSC engine test.t.sol

3131
02:03:14,639 --> 02:03:15,719
and remember the whole reason we're

3132
02:03:15,719 --> 02:03:17,520
doing all this I know we've been coding

3133
02:03:17,520 --> 02:03:21,179
a lot is in the DSC engine we added a

3134
02:03:21,179 --> 02:03:22,980
ton of functions in here some of them

3135
02:03:22,980 --> 02:03:24,780
like get USD value which we definitely

3136
02:03:24,780 --> 02:03:26,639
want to check get collateral account

3137
02:03:26,639 --> 02:03:28,920
value we want to make sure minting Works

3138
02:03:28,920 --> 02:03:31,260
our Constructor Works depositing Works

3139
02:03:31,260 --> 02:03:33,540
Etc so we're just kind of testing as we

3140
02:03:33,540 --> 02:03:35,639
go along which like I said when I'm

3141
02:03:35,639 --> 02:03:37,860
actually coding this I did write tests

3142
02:03:37,860 --> 02:03:40,920
and I did write deploy scripts because I

3143
02:03:40,920 --> 02:03:43,080
did want to test as I was going right I

3144
02:03:43,080 --> 02:03:45,119
didn't want to have to go back and

3145
02:03:45,119 --> 02:03:47,820
refactor and rewrite my code if I made

3146
02:03:47,820 --> 02:03:49,500
some glaring mistake right it's really

3147
02:03:49,500 --> 02:03:51,540
good to test while you're building as

3148
02:03:51,540 --> 02:03:53,460
well and to be honest I feel like it

3149
02:03:53,460 --> 02:03:54,960
makes me go faster because I have more

3150
02:03:54,960 --> 02:03:57,300
confidence that what I did was correct

3151
02:03:57,300 --> 02:04:00,599
while I'm coding so spdx

3152
02:04:00,599 --> 02:04:02,480
license

3153
02:04:02,480 --> 02:04:07,820
identifier MIT pragma solidity

3154
02:04:07,820 --> 02:04:12,380
0.8.18 a little carrot here contract

3155
02:04:12,380 --> 02:04:16,860
DSC engine test is test

3156
02:04:16,860 --> 02:04:22,020
import test from Forge STD slash test

3157
02:04:22,020 --> 02:04:25,619
that's all like this all right cool

3158
02:04:25,619 --> 02:04:27,420
function

3159
02:04:27,420 --> 02:04:28,920
setup

3160
02:04:28,920 --> 02:04:33,000
public or external we need to deploy to

3161
02:04:33,000 --> 02:04:35,880
deploy our contracts or we're going to

3162
02:04:35,880 --> 02:04:36,900
import

3163
02:04:36,900 --> 02:04:41,460
deploy DSC from dot slash dot slash

3164
02:04:41,460 --> 02:04:45,480
scripts slash deploy dsc.s that's all

3165
02:04:45,480 --> 02:04:49,739
deploy DSC deployer we're going to say

3166
02:04:49,739 --> 02:04:51,659
player equals new

3167
02:04:51,659 --> 02:04:54,239
deploy DSC like that again I'm using a

3168
02:04:54,239 --> 02:04:55,679
lot of tabs here

3169
02:04:55,679 --> 02:04:57,300
and we're going to say

3170
02:04:57,300 --> 02:05:00,199
we're going to need the import

3171
02:05:00,199 --> 02:05:03,719
decentralized stablecoin from dot dot

3172
02:05:03,719 --> 02:05:07,280
slash dot slash SRC slash

3173
02:05:07,280 --> 02:05:08,880
decentralizedablecoin.soul we're also

3174
02:05:08,880 --> 02:05:10,980
going to need to import the engine the

3175
02:05:10,980 --> 02:05:13,500
SCE from

3176
02:05:13,500 --> 02:05:15,540
again this is where GitHub copilot can

3177
02:05:15,540 --> 02:05:17,159
really make your life a lot easier just

3178
02:05:17,159 --> 02:05:19,619
being able to hit tab here or just

3179
02:05:19,619 --> 02:05:22,020
whatever AI that you're working with now

3180
02:05:22,020 --> 02:05:24,840
we're going to say BSC let's actually

3181
02:05:24,840 --> 02:05:27,179
make these we'll say decentralized

3182
02:05:27,179 --> 02:05:29,340
stablecoin DSC

3183
02:05:29,340 --> 02:05:31,560
and DSC engine

3184
02:05:31,560 --> 02:05:34,560
we'll call dsce

3185
02:05:34,560 --> 02:05:36,300
that's confusing you call this like

3186
02:05:36,300 --> 02:05:38,099
engine or something I'm going to call my

3187
02:05:38,099 --> 02:05:43,619
DSE so now our deploy returns DSC and

3188
02:05:43,619 --> 02:05:44,580
the engine

3189
02:05:44,580 --> 02:05:48,599
so I'm going to say return DSC dsce

3190
02:05:48,599 --> 02:05:51,599
equals deployer.run okay that looks

3191
02:05:51,599 --> 02:05:52,440
pretty good

3192
02:05:52,440 --> 02:05:54,360
there's a bunch of stuff more for us to

3193
02:05:54,360 --> 02:05:56,219
do but at least we have our tests set up

3194
02:05:56,219 --> 02:05:58,560
here it's one of the first tests that we

3195
02:05:58,560 --> 02:06:01,500
want to do is this price feed test right

3196
02:06:01,500 --> 02:06:04,320
we want to make sure this get USD value

3197
02:06:04,320 --> 02:06:06,239
this math that we're doing here because

3198
02:06:06,239 --> 02:06:07,800
we're doing some weird math stuff we

3199
02:06:07,800 --> 02:06:08,940
want to make sure this is actually

3200
02:06:08,940 --> 02:06:11,880
working correctly so I'm going to do I'm

3201
02:06:11,880 --> 02:06:13,199
going to set up a little price feeds

3202
02:06:13,199 --> 02:06:17,699
Test Section price tests like this we're

3203
02:06:17,699 --> 02:06:24,840
going to say function test get USD value

3204
02:06:24,900 --> 02:06:27,780
and here we're going to test our get USD

3205
02:06:27,780 --> 02:06:29,639
value function so it gets past the token

3206
02:06:29,639 --> 02:06:31,800
address and an amount so we're going to

3207
02:06:31,800 --> 02:06:34,679
need to get those tokens that we use to

3208
02:06:34,679 --> 02:06:35,880
deploy this

3209
02:06:35,880 --> 02:06:37,980
we can get that pretty easily from our

3210
02:06:37,980 --> 02:06:39,540
helper config so what we can do actually

3211
02:06:39,540 --> 02:06:42,360
back in our deploy we can also have this

3212
02:06:42,360 --> 02:06:45,800
return the config

3213
02:06:47,159 --> 02:06:49,020
and just at the bottom will also have a

3214
02:06:49,020 --> 02:06:51,739
return config

3215
02:06:51,840 --> 02:06:53,639
comma config

3216
02:06:53,639 --> 02:06:55,619
and config will be the helper config

3217
02:06:55,619 --> 02:07:00,179
helper config config import that

3218
02:07:00,179 --> 02:07:03,239
import helper config from dot dot script

3219
02:07:03,239 --> 02:07:06,540
double config.s dot so

3220
02:07:06,540 --> 02:07:10,739
okay cool and now we can get

3221
02:07:10,739 --> 02:07:12,659
the weft

3222
02:07:12,659 --> 02:07:17,040
address and we can also get the eqsd

3223
02:07:17,040 --> 02:07:19,260
so we'll put those up at the top two

3224
02:07:19,260 --> 02:07:20,699
we'll say

3225
02:07:20,699 --> 02:07:24,239
address eth USD price feed

3226
02:07:24,239 --> 02:07:26,400
and we'll say address

3227
02:07:26,400 --> 02:07:28,320
weft we'll get this from the health

3228
02:07:28,320 --> 02:07:30,300
helper config so those are the first two

3229
02:07:30,300 --> 02:07:34,320
so it's eth USD price feed bitcoin price

3230
02:07:34,320 --> 02:07:37,199
feed goes here so comma West comma this

3231
02:07:37,199 --> 02:07:39,420
is the Bitcoin token comma this deployer

3232
02:07:39,420 --> 02:07:43,099
key equals config Dot

3233
02:07:43,099 --> 02:07:46,920
Active network config cool we have the

3234
02:07:46,920 --> 02:07:48,960
price feed and we have West so now we

3235
02:07:48,960 --> 02:07:50,940
can finally go down here and set this

3236
02:07:50,940 --> 02:07:53,460
function up so we'll say you and 256 eth

3237
02:07:53,460 --> 02:07:57,000
amount equals let's say there's 15 eth

3238
02:07:57,000 --> 02:08:01,920
right 15 eighth if we have 15 eth

3239
02:08:01,920 --> 02:08:04,560
times up by two thousand dollars

3240
02:08:04,560 --> 02:08:08,340
or eth equals what thirty thousand

3241
02:08:08,340 --> 02:08:10,560
maybe thirty thousand e

3242
02:08:10,560 --> 02:08:14,340
18 right real simple simple math so

3243
02:08:14,340 --> 02:08:18,840
let's do that un256 expected USD equals

3244
02:08:18,840 --> 02:08:21,599
three Thirty One Two Three thirty

3245
02:08:21,599 --> 02:08:22,920
thousand dollars

3246
02:08:22,920 --> 02:08:26,520
and we'll say you went to 256 actual USD

3247
02:08:26,520 --> 02:08:33,000
equals dsce dot get USD value weft and

3248
02:08:33,000 --> 02:08:35,699
eth mount and the reason this should

3249
02:08:35,699 --> 02:08:37,560
work is because in our engine we pass

3250
02:08:37,560 --> 02:08:40,380
the token and the amount and internally

3251
02:08:40,380 --> 02:08:42,900
it uses the price feed associated with

3252
02:08:42,900 --> 02:08:44,099
that token

3253
02:08:44,099 --> 02:08:47,040
calls the price to get the amount and

3254
02:08:47,040 --> 02:08:48,420
now we should be able to just do a

3255
02:08:48,420 --> 02:08:49,139
search

3256
02:08:49,139 --> 02:08:52,199
equals expected USD

3257
02:08:52,199 --> 02:08:55,739
and actual USD all right I know there's

3258
02:08:55,739 --> 02:08:57,060
a lot of setup just to write this one

3259
02:08:57,060 --> 02:08:58,860
test but like I said I like making sure

3260
02:08:58,860 --> 02:09:01,020
my deploy scripts are part of my test

3261
02:09:01,020 --> 02:09:02,460
Suite right from the beginning

3262
02:09:02,460 --> 02:09:04,380
but it might be a good idea to just do

3263
02:09:04,380 --> 02:09:07,380
them as integration tests so orange test

3264
02:09:07,380 --> 02:09:11,540
Dash m test get USD value

3265
02:09:11,880 --> 02:09:14,699
and it works now I will point out the

3266
02:09:14,699 --> 02:09:16,320
first couple of times that I ran this

3267
02:09:16,320 --> 02:09:19,679
test I actually failed miserably I got a

3268
02:09:19,679 --> 02:09:21,119
number of things wrong and that's okay

3269
02:09:21,119 --> 02:09:22,560
because you will and that's why you

3270
02:09:22,560 --> 02:09:24,780
write tests so I also while I'm here

3271
02:09:24,780 --> 02:09:27,420
let's also write at least one deposit

3272
02:09:27,420 --> 02:09:30,239
collateral test so let me copy this

3273
02:09:30,239 --> 02:09:31,860
paste it here because we're going to

3274
02:09:31,860 --> 02:09:34,619
write a lot of deposit collateral the

3275
02:09:34,619 --> 02:09:37,260
deposit equilateral

3276
02:09:37,260 --> 02:09:39,960
tests make it look a little bit pretty

3277
02:09:39,960 --> 02:09:42,840
at least that

3278
02:09:42,840 --> 02:09:45,119
we do some more simple tests like

3279
02:09:45,119 --> 02:09:48,599
function test revert reverts if

3280
02:09:48,599 --> 02:09:50,460
collateral

3281
02:09:50,460 --> 02:09:52,020
zero

3282
02:09:52,020 --> 02:09:53,400
public

3283
02:09:53,400 --> 02:09:56,520
uh we'll prank a user so up at the top

3284
02:09:56,520 --> 02:09:59,880
we'll do an address public user equals

3285
02:09:59,880 --> 02:10:03,599
make ADR user

3286
02:10:03,599 --> 02:10:07,940
like this like user capital

3287
02:10:07,940 --> 02:10:09,780
user

3288
02:10:09,780 --> 02:10:15,480
let's say VM dot start prank or user now

3289
02:10:15,480 --> 02:10:19,020
will at least approve the token can go

3290
02:10:19,020 --> 02:10:22,560
to the protocol so we'll do erc20 mock

3291
02:10:22,560 --> 02:10:24,119
Wes

3292
02:10:24,119 --> 02:10:26,219
do we have that imported nope we're

3293
02:10:26,219 --> 02:10:29,340
going to import that import erc20 mock

3294
02:10:29,340 --> 02:10:30,960
from

3295
02:10:30,960 --> 02:10:34,380
at open Zeppelin slash contracts

3296
02:10:34,380 --> 02:10:35,460
slash

3297
02:10:35,460 --> 02:10:39,119
what is it MOX slash or contracts mocks

3298
02:10:39,119 --> 02:10:43,619
erc20 mock okay here C20 mock.soul well

3299
02:10:43,619 --> 02:10:48,780
your C20 mock weft dot approve

3300
02:10:48,780 --> 02:10:54,480
address d s c e some amount let's do at

3301
02:10:54,480 --> 02:10:57,719
the top let's make another unit 56

3302
02:10:57,719 --> 02:11:01,639
public constant amount

3303
02:11:01,639 --> 02:11:04,920
collateral equals

3304
02:11:04,920 --> 02:11:08,520
say 10 ether worth of collateral

3305
02:11:08,520 --> 02:11:10,980
down here we'll approve that 10

3306
02:11:10,980 --> 02:11:14,119
collateral and then we'll do

3307
02:11:14,119 --> 02:11:15,840
vm.expect

3308
02:11:15,840 --> 02:11:17,280
revert

3309
02:11:17,280 --> 02:11:19,340
with DSC engine

3310
02:11:19,340 --> 02:11:21,780
dot we're going to need to use that

3311
02:11:21,780 --> 02:11:24,480
needs more than zero in here needs more

3312
02:11:24,480 --> 02:11:26,099
than zero

3313
02:11:26,099 --> 02:11:28,320
dot selector and now you guys know what

3314
02:11:28,320 --> 02:11:29,900
the selector bit means

3315
02:11:29,900 --> 02:11:35,580
dsce dot deposit colat collateral

3316
02:11:35,580 --> 02:11:40,380
say wet zero like this and then vm.stop

3317
02:11:40,380 --> 02:11:43,139
Rank and actually this might fail for a

3318
02:11:43,139 --> 02:11:44,699
different reason but let's go ahead and

3319
02:11:44,699 --> 02:11:48,260
try a Forge test Dash m

3320
02:11:50,219 --> 02:11:52,199
M okay cool and this actually did pass

3321
02:11:52,199 --> 02:11:54,060
now if we want to make this a little bit

3322
02:11:54,060 --> 02:11:57,060
better of a test we should also mint our

3323
02:11:57,060 --> 02:12:00,480
user some weth and we probably should do

3324
02:12:00,480 --> 02:12:01,800
that right in the setup so we don't have

3325
02:12:01,800 --> 02:12:03,960
to do that for every single test

3326
02:12:03,960 --> 02:12:05,820
what I'm going to do

3327
02:12:05,820 --> 02:12:10,199
is I'm going to do erc20 mock with dot

3328
02:12:10,199 --> 02:12:14,760
mint user we're going to do a 2 into 256

3329
02:12:14,760 --> 02:12:16,980
we'll let constant

3330
02:12:16,980 --> 02:12:20,460
starting here see 20.

3331
02:12:20,460 --> 02:12:22,080
balance

3332
02:12:22,080 --> 02:12:23,520
balance

3333
02:12:23,520 --> 02:12:25,440
equals

3334
02:12:25,440 --> 02:12:27,239
and let's say this is 10 ether as well

3335
02:12:27,239 --> 02:12:30,840
and ether starting here 620 balance

3336
02:12:30,840 --> 02:12:34,679
boom all right cool so now Forge test

3337
02:12:34,679 --> 02:12:37,440
all of our tests are passing cool and

3338
02:12:37,440 --> 02:12:38,940
like I said I'll do this kind of as a

3339
02:12:38,940 --> 02:12:40,920
sanity check to make sure that my

3340
02:12:40,920 --> 02:12:43,199
architecture is even making sense right

3341
02:12:43,199 --> 02:12:45,719
so we what we probably also want to do

3342
02:12:45,719 --> 02:12:48,960
next then is have a test for collateral

3343
02:12:48,960 --> 02:12:50,699
is being deposited in these data

3344
02:12:50,699 --> 02:12:53,159
structures but for now I'm content with

3345
02:12:53,159 --> 02:12:55,020
these tests so I'm just going to go back

3346
02:12:55,020 --> 02:12:58,079
to writing my contracts like I said

3347
02:12:58,079 --> 02:13:00,420
there's no one single process and I

3348
02:13:00,420 --> 02:13:03,239
don't think I've ever written a smart

3349
02:13:03,239 --> 02:13:05,639
contract completely in one go I'm pretty

3350
02:13:05,639 --> 02:13:07,980
much always writing tests as I'm writing

3351
02:13:07,980 --> 02:13:10,380
the code so it is a really good idea to

3352
02:13:10,380 --> 02:13:12,780
to do this yes you do not have to write

3353
02:13:12,780 --> 02:13:15,000
the deploy script as you're writing a

3354
02:13:15,000 --> 02:13:16,139
code but it's something that I like to

3355
02:13:16,139 --> 02:13:18,000
do and then you know what while we're

3356
02:13:18,000 --> 02:13:20,639
writing these tests let's also do dash

3357
02:13:20,639 --> 02:13:26,040
dash Fork URL so polia RPC URL let's

3358
02:13:26,040 --> 02:13:27,300
also do this

3359
02:13:27,300 --> 02:13:30,239
because this probably will fail actually

3360
02:13:30,239 --> 02:13:33,780
because we can't just mint weth at a

3361
02:13:33,780 --> 02:13:36,179
thin air and we do indeed fail test get

3362
02:13:36,179 --> 02:13:37,980
USD value oh interesting that's the one

3363
02:13:37,980 --> 02:13:40,800
that fails test kit USD value ah this

3364
02:13:40,800 --> 02:13:43,739
one fails because we're hard coding the

3365
02:13:43,739 --> 02:13:46,079
expected USD right here

3366
02:13:46,079 --> 02:13:48,540
and of course the price on sepolia is

3367
02:13:48,540 --> 02:13:50,340
the actual price as opposed to kind of

3368
02:13:50,340 --> 02:13:52,380
this fake price that we're making up so

3369
02:13:52,380 --> 02:13:54,540
we should probably update this test to

3370
02:13:54,540 --> 02:13:57,599
make it more agnostic right we probably

3371
02:13:57,599 --> 02:13:58,920
should update this test so that instead

3372
02:13:58,920 --> 02:14:01,079
of just hard coding 3000 in here

3373
02:14:01,079 --> 02:14:03,000
update this test to use the price of the

3374
02:14:03,000 --> 02:14:04,920
actual price feed for now I'm going to

3375
02:14:04,920 --> 02:14:06,540
leave it as is and then I can fix it

3376
02:14:06,540 --> 02:14:10,219
later for running those Fork tests

3377
02:14:11,880 --> 02:14:14,460
so where are we now okay so we have a

3378
02:14:14,460 --> 02:14:16,860
way to deposit collateral we have a way

3379
02:14:16,860 --> 02:14:18,960
to Mint we don't really have too many

3380
02:14:18,960 --> 02:14:21,000
tests here we're just assuming that this

3381
02:14:21,000 --> 02:14:23,400
kind of works for now which is okay but

3382
02:14:23,400 --> 02:14:24,840
this is good right we're getting

3383
02:14:24,840 --> 02:14:25,920
somewhere

3384
02:14:25,920 --> 02:14:29,940
so we can mint our debt or our DSC

3385
02:14:29,940 --> 02:14:32,040
we can actually now we can get a whole

3386
02:14:32,040 --> 02:14:33,659
lot of information as well which is

3387
02:14:33,659 --> 02:14:37,139
awesome let's now combine these two into

3388
02:14:37,139 --> 02:14:38,639
kind of this main function that we're

3389
02:14:38,639 --> 02:14:39,840
thinking a lot of people are going to

3390
02:14:39,840 --> 02:14:43,980
call this deposit collateral in mint USD

3391
02:14:43,980 --> 02:14:46,440
right the purpose of this protocol is to

3392
02:14:46,440 --> 02:14:48,960
Mint this stable corn right deposit

3393
02:14:48,960 --> 02:14:51,000
collateral and mint DSC which is just

3394
02:14:51,000 --> 02:14:52,980
going to be the combination of deposit

3395
02:14:52,980 --> 02:14:56,579
collateral and DSC so in here what this

3396
02:14:56,579 --> 02:14:58,020
this is going to take it's going to take

3397
02:14:58,020 --> 02:14:59,940
similar stuff to

3398
02:14:59,940 --> 02:15:02,460
deposit collateral and address

3399
02:15:02,460 --> 02:15:06,480
token collateral address

3400
02:15:06,480 --> 02:15:10,320
a u into 256 amount collateral and then

3401
02:15:10,320 --> 02:15:15,599
also a unit 56 amount DSC to Mint

3402
02:15:15,599 --> 02:15:18,000
right that and here we're just going to

3403
02:15:18,000 --> 02:15:20,579
call so deposit collateral is external

3404
02:15:20,579 --> 02:15:22,560
right now we'll make this a public

3405
02:15:22,560 --> 02:15:23,820
function

3406
02:15:23,820 --> 02:15:26,699
so we'll change this to deposit

3407
02:15:26,699 --> 02:15:28,800
collateral

3408
02:15:28,800 --> 02:15:31,440
or we give it the token collateral

3409
02:15:31,440 --> 02:15:34,079
address and the amount collateral

3410
02:15:34,079 --> 02:15:37,619
and then we'll call Mint DSC amount

3411
02:15:37,619 --> 02:15:40,079
dsedament boom so that's all this

3412
02:15:40,079 --> 02:15:41,699
function does is just combines the two

3413
02:15:41,699 --> 02:15:46,020
of them emit DSC mints DSC is not

3414
02:15:46,020 --> 02:15:48,420
defined because it's external we'll make

3415
02:15:48,420 --> 02:15:51,420
this public as well so that our contract

3416
02:15:51,420 --> 02:15:53,280
can also call it toggle word wrap put

3417
02:15:53,280 --> 02:15:55,260
that back on okay and cool so this is

3418
02:15:55,260 --> 02:15:56,639
going to be one of our main functions

3419
02:15:56,639 --> 02:15:58,679
we're thinking so let's add some net

3420
02:15:58,679 --> 02:16:02,579
spec to it we'll say at param this is

3421
02:16:02,579 --> 02:16:05,040
where your copilot is really helpful

3422
02:16:05,040 --> 02:16:06,840
token collateral address the address of

3423
02:16:06,840 --> 02:16:09,119
the token to deposit as collateral at

3424
02:16:09,119 --> 02:16:12,179
param amount collateral yep at param

3425
02:16:12,179 --> 02:16:14,579
that looks good too and then we'll add

3426
02:16:14,579 --> 02:16:19,079
notice this function will deposit your

3427
02:16:19,079 --> 02:16:20,460
collateral

3428
02:16:20,460 --> 02:16:24,900
and mint DSC in one trends

3429
02:16:24,900 --> 02:16:26,280
action

3430
02:16:26,280 --> 02:16:27,780
right because otherwise we're gonna have

3431
02:16:27,780 --> 02:16:29,219
to have people call the positive

3432
02:16:29,219 --> 02:16:31,260
collateral and then mint but some people

3433
02:16:31,260 --> 02:16:32,219
they're probably just going to want to

3434
02:16:32,219 --> 02:16:34,320
do both at the same time because that's

3435
02:16:34,320 --> 02:16:37,580
kind of the purpose of this protocol

3436
02:16:39,300 --> 02:16:41,280
okay great so we have a way for people

3437
02:16:41,280 --> 02:16:43,740
to get money in how do they get their

3438
02:16:43,740 --> 02:16:45,660
money out so we're gonna need to write

3439
02:16:45,660 --> 02:16:48,660
this redeem collateral right so in order

3440
02:16:48,660 --> 02:16:50,639
for them to redeem collateral let's talk

3441
02:16:50,639 --> 02:16:55,320
about this in order to redeem collateral

3442
02:16:55,320 --> 02:16:57,420
they need what one

3443
02:16:57,420 --> 02:17:00,000
their health Factor

3444
02:17:00,000 --> 02:17:03,260
must be over one after

3445
02:17:03,260 --> 02:17:05,939
collateral pulled so we're going to want

3446
02:17:05,939 --> 02:17:07,320
to put some checks in here to make sure

3447
02:17:07,320 --> 02:17:09,420
that they have enough money in here and

3448
02:17:09,420 --> 02:17:11,099
that's kind of the main thing right

3449
02:17:11,099 --> 02:17:12,540
that's all we really need to worry about

3450
02:17:12,540 --> 02:17:15,899
so let's go ahead and start writing this

3451
02:17:15,899 --> 02:17:18,240
so first we should let them choose which

3452
02:17:18,240 --> 02:17:20,460
collateral they want so address

3453
02:17:20,460 --> 02:17:23,700
token collateral address

3454
02:17:23,700 --> 02:17:26,399
and then obviously the amount amount

3455
02:17:26,399 --> 02:17:27,719
collateral

3456
02:17:27,719 --> 02:17:29,760
and we're going to want to add this more

3457
02:17:29,760 --> 02:17:32,280
than zero modifier in here for the

3458
02:17:32,280 --> 02:17:33,780
amount collateral we don't want them to

3459
02:17:33,780 --> 02:17:36,139
be sending accidental zero transactions

3460
02:17:36,139 --> 02:17:39,059
and because we're going to be moving

3461
02:17:39,059 --> 02:17:40,500
tokens around we'll just do

3462
02:17:40,500 --> 02:17:42,960
non-reentrant better safe than sorry we

3463
02:17:42,960 --> 02:17:44,519
can figure out later in kind of like a

3464
02:17:44,519 --> 02:17:46,979
gas audit if this is even needed now I'm

3465
02:17:46,979 --> 02:17:48,719
going to write this function as if

3466
02:17:48,719 --> 02:17:50,820
somebody redeeming collateral is the

3467
02:17:50,820 --> 02:17:52,019
only time they actually redeem

3468
02:17:52,019 --> 02:17:53,820
collateral however we're going to

3469
02:17:53,820 --> 02:17:56,219
refactor this in the future to make our

3470
02:17:56,219 --> 02:17:59,099
code much more modular there's this

3471
02:17:59,099 --> 02:18:01,080
concept in computer science called dry

3472
02:18:01,080 --> 02:18:04,740
don't repeat yourself if you find

3473
02:18:04,740 --> 02:18:06,240
yourself coding the same thing that

3474
02:18:06,240 --> 02:18:07,500
should send off a light bulb in your

3475
02:18:07,500 --> 02:18:09,719
head going oh maybe what I'm doing isn't

3476
02:18:09,719 --> 02:18:10,979
the best practice

3477
02:18:10,979 --> 02:18:13,500
so we're going to code this one way and

3478
02:18:13,500 --> 02:18:14,280
then

3479
02:18:14,280 --> 02:18:15,660
I'm telling you right now we're going to

3480
02:18:15,660 --> 02:18:17,099
go back and we're going to refactor this

3481
02:18:17,099 --> 02:18:19,260
in the future but I want to code it this

3482
02:18:19,260 --> 02:18:22,200
one way first just to show you the

3483
02:18:22,200 --> 02:18:23,460
process that you'll probably go through

3484
02:18:23,460 --> 02:18:25,500
and how you'll probably refactor it when

3485
02:18:25,500 --> 02:18:27,300
you come across this yourself

3486
02:18:27,300 --> 02:18:28,439
so we're going to code this one way now

3487
02:18:28,439 --> 02:18:30,420
let's do it we need to pull the

3488
02:18:30,420 --> 02:18:31,920
collateral out and we're going to update

3489
02:18:31,920 --> 02:18:33,599
our internal accounting so we have this

3490
02:18:33,599 --> 02:18:35,219
s underscore

3491
02:18:35,219 --> 02:18:37,740
collateral deposited of message.sender

3492
02:18:37,740 --> 02:18:41,280
of the token collateral address right

3493
02:18:41,280 --> 02:18:43,559
this is the our internal accounting how

3494
02:18:43,559 --> 02:18:45,120
much collateral they've added we're

3495
02:18:45,120 --> 02:18:47,700
going to do minus equals amount

3496
02:18:47,700 --> 02:18:49,320
collateral so this is assuming we're

3497
02:18:49,320 --> 02:18:51,420
going to pull it out if they try to pull

3498
02:18:51,420 --> 02:18:53,760
out more than what they have we're

3499
02:18:53,760 --> 02:18:55,620
relying on the solidity compiler a

3500
02:18:55,620 --> 02:18:58,260
little bit to throw an error right if in

3501
02:18:58,260 --> 02:18:59,519
their bounce they have a hundred and

3502
02:18:59,519 --> 02:19:01,380
they subtract try to pull out one

3503
02:19:01,380 --> 02:19:04,320
thousand right it'll revert because

3504
02:19:04,320 --> 02:19:07,139
as of newer versions of solidity they

3505
02:19:07,139 --> 02:19:09,179
don't let you do this unsafe math stuff

3506
02:19:09,179 --> 02:19:11,580
which is awesome that saved us a lot of

3507
02:19:11,580 --> 02:19:14,040
hassle so and then since we're updating

3508
02:19:14,040 --> 02:19:17,040
State we're going to Omit an event let's

3509
02:19:17,040 --> 02:19:20,580
call it collateral redeemed

3510
02:19:20,580 --> 02:19:24,780
we'll say it's message.sender so from

3511
02:19:24,780 --> 02:19:28,639
this does sender the amount collateral

3512
02:19:28,639 --> 02:19:33,059
the token collateral address

3513
02:19:33,059 --> 02:19:34,439
like this

3514
02:19:34,439 --> 02:19:36,420
so we're going to go to the top

3515
02:19:36,420 --> 02:19:38,099
we're also going to refactor this event

3516
02:19:38,099 --> 02:19:40,559
but you'll understand why litter a Ben

3517
02:19:40,559 --> 02:19:44,280
collateral redeemed address indexed user

3518
02:19:44,280 --> 02:19:48,179
address indexed token

3519
02:19:48,179 --> 02:19:52,680
you went to 256 indexed amount like this

3520
02:19:52,680 --> 02:19:55,500
okay control minus go right back down to

3521
02:19:55,500 --> 02:19:58,140
where we were okay amount collateral oh

3522
02:19:58,140 --> 02:20:00,060
what's wrong with this oh these are

3523
02:20:00,060 --> 02:20:02,479
backwards

3524
02:20:04,979 --> 02:20:07,439
Okay cool so now

3525
02:20:07,439 --> 02:20:10,680
all we have to do is return the money

3526
02:20:10,680 --> 02:20:13,200
well how do we do this

3527
02:20:13,200 --> 02:20:16,979
so we want to follow CEI right checks

3528
02:20:16,979 --> 02:20:19,500
effects interactions checks affects

3529
02:20:19,500 --> 02:20:22,740
interactions but we also want to make

3530
02:20:22,740 --> 02:20:24,300
sure the health factor is good after

3531
02:20:24,300 --> 02:20:28,260
collateral collateral is pulled and this

3532
02:20:28,260 --> 02:20:30,600
is where sometimes you'll see CEI be

3533
02:20:30,600 --> 02:20:32,460
violated when I need to check something

3534
02:20:32,460 --> 02:20:35,460
after a token transfers happen sometimes

3535
02:20:35,460 --> 02:20:37,920
you'll see this CEI be violated a little

3536
02:20:37,920 --> 02:20:40,920
bit and what you could do is you could

3537
02:20:40,920 --> 02:20:45,120
do like calculate health Factor after

3538
02:20:45,120 --> 02:20:48,120
and then like simulate it but a lot of

3539
02:20:48,120 --> 02:20:49,319
people choose to not do this because

3540
02:20:49,319 --> 02:20:51,780
this is really gas inefficient so what a

3541
02:20:51,780 --> 02:20:53,460
lot of people do is they just go ahead

3542
02:20:53,460 --> 02:20:56,100
with the doing the token transfer first

3543
02:20:56,100 --> 02:20:59,819
and then checking this and reverting if

3544
02:20:59,819 --> 02:21:02,399
this happens and that's usually fine

3545
02:21:02,399 --> 02:21:05,040
though because we're going to revert the

3546
02:21:05,040 --> 02:21:07,500
transaction if it's bad right so what

3547
02:21:07,500 --> 02:21:09,540
we'll do is we'll do this token transfer

3548
02:21:09,540 --> 02:21:10,740
and then we'll make sure the health

3549
02:21:10,740 --> 02:21:13,020
factor is okay so you know how to move

3550
02:21:13,020 --> 02:21:14,580
to tokens around so we'll say bull

3551
02:21:14,580 --> 02:21:15,540
success

3552
02:21:15,540 --> 02:21:18,000
equals irsr20

3553
02:21:18,000 --> 02:21:20,000
looking collateral

3554
02:21:20,000 --> 02:21:23,040
address dot we can just do transfer

3555
02:21:23,040 --> 02:21:25,260
instead of transfer from since

3556
02:21:25,260 --> 02:21:27,300
transfer is when you transfer from

3557
02:21:27,300 --> 02:21:29,100
yourself transfer from is when you

3558
02:21:29,100 --> 02:21:30,840
transfer from somebody else

3559
02:21:30,840 --> 02:21:33,420
so dot transfer and we're going to be

3560
02:21:33,420 --> 02:21:36,359
sending it to message.cender and we're

3561
02:21:36,359 --> 02:21:38,640
going to send amount collateral and then

3562
02:21:38,640 --> 02:21:42,300
if not success if if not success we're

3563
02:21:42,300 --> 02:21:44,760
just going to go ahead and revert DSC

3564
02:21:44,760 --> 02:21:47,060
engine we'll just do

3565
02:21:47,060 --> 02:21:51,180
transfer failed like this and then we

3566
02:21:51,180 --> 02:21:53,460
want to make sure that the health Factor

3567
02:21:53,460 --> 02:21:55,620
isn't broken and we have written a

3568
02:21:55,620 --> 02:21:57,840
function that does that already

3569
02:21:57,840 --> 02:22:00,120
called revert if Health factor is broken

3570
02:22:00,120 --> 02:22:03,240
so we can just grab this go back up to

3571
02:22:03,240 --> 02:22:05,160
our redeem and just do revertive Health

3572
02:22:05,160 --> 02:22:07,260
factors broken for the message dot

3573
02:22:07,260 --> 02:22:08,520
sender

3574
02:22:08,520 --> 02:22:10,319
okay cool like I said we're going to

3575
02:22:10,319 --> 02:22:13,140
refactor this very soon okay but it

3576
02:22:13,140 --> 02:22:15,000
looks like this is actually pretty good

3577
02:22:15,000 --> 02:22:18,240
for redeeming collateral now this

3578
02:22:18,240 --> 02:22:20,220
revertive health factor is broken is a

3579
02:22:20,220 --> 02:22:22,319
little bit Troublesome with just this

3580
02:22:22,319 --> 02:22:24,060
raw redeemed collateral let's say I put

3581
02:22:24,060 --> 02:22:27,479
100 in and then I mint let's say 20

3582
02:22:27,479 --> 02:22:30,479
worth of DSC about 100 worth of Ethan

3583
02:22:30,479 --> 02:22:33,660
and I mint 20 worth of DSC let's say I'm

3584
02:22:33,660 --> 02:22:36,359
done like I want to burn all my DSC and

3585
02:22:36,359 --> 02:22:39,479
I want to withdraw all of my eth well

3586
02:22:39,479 --> 02:22:41,640
if I try to redeem all my eth it'll

3587
02:22:41,640 --> 02:22:43,620
break right it'll break my health Factor

3588
02:22:43,620 --> 02:22:46,680
well what I need to do first is I need

3589
02:22:46,680 --> 02:22:50,939
to First burn back my DSC and then I

3590
02:22:50,939 --> 02:22:53,580
need to redeem Eve so it's a kind of

3591
02:22:53,580 --> 02:22:55,979
this two transaction process here

3592
02:22:55,979 --> 02:22:58,020
just kind of stinks so let's turn it

3593
02:22:58,020 --> 02:23:00,000
into a one transaction process so we're

3594
02:23:00,000 --> 02:23:02,340
going to combine redeeming or collateral

3595
02:23:02,340 --> 02:23:05,760
with also burning your DSC which means

3596
02:23:05,760 --> 02:23:07,560
we're going to need to create a burn DSC

3597
02:23:07,560 --> 02:23:09,120
function and we're also going to

3598
02:23:09,120 --> 02:23:11,640
refactor this in a little bit but

3599
02:23:11,640 --> 02:23:13,380
I'm just going to write it as if this is

3600
02:23:13,380 --> 02:23:16,560
the only burn DSC function for now so

3601
02:23:16,560 --> 02:23:19,260
let's have people burn their DSC right

3602
02:23:19,260 --> 02:23:20,520
this is when they

3603
02:23:20,520 --> 02:23:23,100
they say hey I'm done with these tokens

3604
02:23:23,100 --> 02:23:26,040
and this will reduce that if we scroll

3605
02:23:26,040 --> 02:23:28,880
up to the top we have this mapping here

3606
02:23:28,880 --> 02:23:32,040
SDC minted it'll reduce this s DSC

3607
02:23:32,040 --> 02:23:34,620
minted so essentially it'll reduce their

3608
02:23:34,620 --> 02:23:38,939
debt in the system so burn DSC we're

3609
02:23:38,939 --> 02:23:40,680
going to add some modifiers here there

3610
02:23:40,680 --> 02:23:44,340
should be more than zero

3611
02:23:44,340 --> 02:23:48,600
Mount so we want to do a u256 amount so

3612
02:23:48,600 --> 02:23:50,520
they can burn as much as they want

3613
02:23:50,520 --> 02:23:52,740
and then what we're going to want to do

3614
02:23:52,740 --> 02:23:55,560
is we're going to say s underscore DSC

3615
02:23:55,560 --> 02:23:59,040
minted of the message.sender

3616
02:23:59,040 --> 02:24:01,500
it's going to minus equal amount

3617
02:24:01,500 --> 02:24:03,240
so we're going to remove that debt

3618
02:24:03,240 --> 02:24:06,359
remove that DSC minted then we're going

3619
02:24:06,359 --> 02:24:08,640
to do a little pool

3620
02:24:08,640 --> 02:24:10,020
success

3621
02:24:10,020 --> 02:24:13,620
equals I underscore DSC dot transfer

3622
02:24:13,620 --> 02:24:16,319
from DS

3623
02:24:16,319 --> 02:24:20,520
message dot sender to address this Mount

3624
02:24:20,520 --> 02:24:23,040
and we could also send this to the zero

3625
02:24:23,040 --> 02:24:24,479
address but we're going to just send it

3626
02:24:24,479 --> 02:24:27,899
to our address for now because the

3627
02:24:27,899 --> 02:24:31,500
decentralized stable coin erc20 burnable

3628
02:24:31,500 --> 02:24:34,140
has its own burn function and we're just

3629
02:24:34,140 --> 02:24:35,580
going to call the burn function directly

3630
02:24:35,580 --> 02:24:37,800
on the token itself but first we're

3631
02:24:37,800 --> 02:24:39,359
going to take it from them

3632
02:24:39,359 --> 02:24:40,859
bring it into our contract and then

3633
02:24:40,859 --> 02:24:44,640
we're going to burn it so if not success

3634
02:24:44,640 --> 02:24:49,080
then we'll revert dsce

3635
02:24:49,080 --> 02:24:52,319
transfer failed like this and this

3636
02:24:52,319 --> 02:24:53,819
conditional is kind of hypothetically

3637
02:24:53,819 --> 02:24:54,960
unreachable

3638
02:24:54,960 --> 02:24:57,600
because if the transfer fails up here

3639
02:24:57,600 --> 02:24:59,040
we're going to throw the transfer from

3640
02:24:59,040 --> 02:25:02,100
fail error but let's say this DSC token

3641
02:25:02,100 --> 02:25:03,840
is implemented wrong great we kind of

3642
02:25:03,840 --> 02:25:06,060
have this backup but so they're going to

3643
02:25:06,060 --> 02:25:08,340
send their DSC token here they're going

3644
02:25:08,340 --> 02:25:12,420
to call idsc Dot burn amount now since

3645
02:25:12,420 --> 02:25:15,479
we're burning DSC question is do we need

3646
02:25:15,479 --> 02:25:19,140
to check if this breaks

3647
02:25:19,140 --> 02:25:22,439
Health Factor well probably not right

3648
02:25:22,439 --> 02:25:24,180
because we're burning DSC we're burning

3649
02:25:24,180 --> 02:25:26,700
debt it's highly unlikely that burning

3650
02:25:26,700 --> 02:25:28,740
your debt removing your debt is going to

3651
02:25:28,740 --> 02:25:31,200
break the health Factor right we

3652
02:25:31,200 --> 02:25:33,780
probably don't ever need this but I'm

3653
02:25:33,780 --> 02:25:36,720
just going to add this in here for now

3654
02:25:36,720 --> 02:25:40,500
just has a backup in a gas audit we can

3655
02:25:40,500 --> 02:25:42,479
figure out if we actually need it I

3656
02:25:42,479 --> 02:25:43,800
don't think

3657
02:25:43,800 --> 02:25:48,240
this would ever hit this is where when I

3658
02:25:48,240 --> 02:25:50,880
do go to an audit when I do go to a

3659
02:25:50,880 --> 02:25:52,260
security professional

3660
02:25:52,260 --> 02:25:54,060
I can make sure to point this line out

3661
02:25:54,060 --> 02:25:55,439
say hey I don't think this line will

3662
02:25:55,439 --> 02:25:57,420
ever hit and I'm thinking of pulling it

3663
02:25:57,420 --> 02:26:00,120
out what do you think right it's good to

3664
02:26:00,120 --> 02:26:01,319
call these out in your comments that

3665
02:26:01,319 --> 02:26:03,420
when you do go to professional who knows

3666
02:26:03,420 --> 02:26:06,180
they can help you out figure this out so

3667
02:26:06,180 --> 02:26:07,080
for now we're going to put it in here

3668
02:26:07,080 --> 02:26:08,760
although it's highly likely we don't

3669
02:26:08,760 --> 02:26:10,020
even need this

3670
02:26:10,020 --> 02:26:11,399
and we're going to refactor this

3671
02:26:11,399 --> 02:26:13,680
function pretty soon anyways so we have

3672
02:26:13,680 --> 02:26:15,540
this burn DSC function

3673
02:26:15,540 --> 02:26:17,220
we're going to make it public because

3674
02:26:17,220 --> 02:26:19,800
we're going to be burning DSC and

3675
02:26:19,800 --> 02:26:21,720
redeeming collateral at the same time

3676
02:26:21,720 --> 02:26:23,580
so now we've redeemed collateral

3677
02:26:23,580 --> 02:26:26,160
we have earn DSC now we can write this

3678
02:26:26,160 --> 02:26:28,680
redeemed collateral for DSC where we

3679
02:26:28,680 --> 02:26:31,439
send DSC and redeem collateral at the

3680
02:26:31,439 --> 02:26:32,399
same time

3681
02:26:32,399 --> 02:26:33,600
and so in here we're going to say

3682
02:26:33,600 --> 02:26:38,880
address token Co lateral address

3683
02:26:38,880 --> 02:26:40,859
you went to 256

3684
02:26:40,859 --> 02:26:43,740
amounts collateral

3685
02:26:43,740 --> 02:26:48,000
you into 256 amount DSC to burn

3686
02:26:48,000 --> 02:26:49,979
we'll have this be external

3687
02:26:49,979 --> 02:26:51,899
so then we're going to call burn DSC

3688
02:26:51,899 --> 02:26:54,359
with the amount of DSC to burn

3689
02:26:54,359 --> 02:26:56,580
we're also going to call redeem

3690
02:26:56,580 --> 02:26:58,439
collateral so we're going to burn the

3691
02:26:58,439 --> 02:27:00,479
DSC first and then we're going to redeem

3692
02:27:00,479 --> 02:27:02,939
their collateral with the token

3693
02:27:02,939 --> 02:27:06,540
collateral address the amount lateral

3694
02:27:06,540 --> 02:27:09,479
collateral

3695
02:27:09,479 --> 02:27:11,460
oh this is external let's make this

3696
02:27:11,460 --> 02:27:12,420
public

3697
02:27:12,420 --> 02:27:13,620
let's go back

3698
02:27:13,620 --> 02:27:16,080
and then of course we should revert

3699
02:27:16,080 --> 02:27:17,939
if Health factor is broken but if we

3700
02:27:17,939 --> 02:27:20,220
look our redeemed collateral function

3701
02:27:20,220 --> 02:27:22,140
currently does this already so we don't

3702
02:27:22,140 --> 02:27:24,060
need to do that here so I'm just going

3703
02:27:24,060 --> 02:27:27,960
to put this comment redeem collateral

3704
02:27:27,960 --> 02:27:31,979
already checks Health Factor right here

3705
02:27:31,979 --> 02:27:33,660
then we'll add a little bit of nats

3706
02:27:33,660 --> 02:27:36,060
effect here so at param

3707
02:27:36,060 --> 02:27:38,340
boom that's not even the right param

3708
02:27:38,340 --> 02:27:42,720
from collateral address the collateral

3709
02:27:42,720 --> 02:27:46,740
address to redeem param non collateral

3710
02:27:46,740 --> 02:27:49,200
the amount collateral to redeem RAM

3711
02:27:49,200 --> 02:27:51,240
amount DSC to burn the amount of DSC to

3712
02:27:51,240 --> 02:27:53,180
burn this function

3713
02:27:53,180 --> 02:27:58,500
Burns DSC and redeems underlying

3714
02:27:58,500 --> 02:28:00,240
collateral

3715
02:28:00,240 --> 02:28:02,819
in one transaction

3716
02:28:02,819 --> 02:28:05,399
okay cool are we going to refactor these

3717
02:28:05,399 --> 02:28:08,340
two functions soon yes absolutely but I

3718
02:28:08,340 --> 02:28:09,479
want you to understand why we're going

3719
02:28:09,479 --> 02:28:11,160
to RE Factor them so we're going to

3720
02:28:11,160 --> 02:28:15,020
leave them in as they are for now

3721
02:28:16,740 --> 02:28:20,460
Okay cool so this is looking pretty good

3722
02:28:20,460 --> 02:28:23,700
so we have a lot of stuff in here we

3723
02:28:23,700 --> 02:28:26,280
have deposit collateral and mint DSC

3724
02:28:26,280 --> 02:28:28,439
so people can mint our stable coin by

3725
02:28:28,439 --> 02:28:30,420
depositing collateral people can just

3726
02:28:30,420 --> 02:28:32,460
straight up deposit collateral people

3727
02:28:32,460 --> 02:28:34,260
can then redeem their collateral for the

3728
02:28:34,260 --> 02:28:37,020
U.S for the DSC that they minted they

3729
02:28:37,020 --> 02:28:38,280
can just straight up redeem collateral

3730
02:28:38,280 --> 02:28:40,319
they can just straight up mint DSE so

3731
02:28:40,319 --> 02:28:42,060
long as they didn't break the health

3732
02:28:42,060 --> 02:28:44,640
Factor they can burn DSE to go help

3733
02:28:44,640 --> 02:28:46,380
their health factor I don't think this

3734
02:28:46,380 --> 02:28:48,540
line will ever hit we've got to do a

3735
02:28:48,540 --> 02:28:50,160
couple of more things here most

3736
02:28:50,160 --> 02:28:52,620
importantly we got to do this liquidate

3737
02:28:52,620 --> 02:28:54,780
function so this liquidate function is

3738
02:28:54,780 --> 02:28:57,240
kind of the the key thing that holds

3739
02:28:57,240 --> 02:28:59,640
this whole system together if we do

3740
02:28:59,640 --> 02:29:01,620
start nearing under collateralization

3741
02:29:01,620 --> 02:29:03,359
we need someone to start liquidating

3742
02:29:03,359 --> 02:29:05,100
positions removing those positions we

3743
02:29:05,100 --> 02:29:07,020
need somebody to basically call

3744
02:29:07,020 --> 02:29:10,439
redeem and burn for you if your health

3745
02:29:10,439 --> 02:29:12,479
Factor becomes too poor right because

3746
02:29:12,479 --> 02:29:14,580
the worst thing that would happen is

3747
02:29:14,580 --> 02:29:16,620
let's say there's a hundred dollars

3748
02:29:16,620 --> 02:29:17,580
worth

3749
02:29:17,580 --> 02:29:20,700
of eth backing fifty dollars worth of

3750
02:29:20,700 --> 02:29:23,580
DSC and then the price of eth Tanks to

3751
02:29:23,580 --> 02:29:26,460
twenty dollars right twenty dollars of

3752
02:29:26,460 --> 02:29:28,140
eth backing

3753
02:29:28,140 --> 02:29:31,280
fifty dollars to DSC well now the DSC

3754
02:29:31,280 --> 02:29:35,460
isn't worth one dollar right the DSC

3755
02:29:35,460 --> 02:29:36,660
then is going to be worth you know

3756
02:29:36,660 --> 02:29:39,780
whatever 20 over 50 is so we can't let

3757
02:29:39,780 --> 02:29:41,520
this happen right we need to make sure

3758
02:29:41,520 --> 02:29:43,979
we liquidate people's positions we

3759
02:29:43,979 --> 02:29:45,920
remove people's positions in the system

3760
02:29:45,920 --> 02:29:49,260
if the price of the collateral tanks

3761
02:29:49,260 --> 02:29:52,080
okay and this is where liquidation comes

3762
02:29:52,080 --> 02:29:54,180
in so we say if

3763
02:29:54,180 --> 02:29:58,140
someone is almost under collateralized

3764
02:29:58,140 --> 02:30:00,359
we will pay you

3765
02:30:00,359 --> 02:30:02,880
to liquidate them we have kind of this

3766
02:30:02,880 --> 02:30:04,859
gamified incentive system here where

3767
02:30:04,859 --> 02:30:06,899
people can get basically free money for

3768
02:30:06,899 --> 02:30:08,640
removing other people's positions in the

3769
02:30:08,640 --> 02:30:09,479
protocol

3770
02:30:09,479 --> 02:30:12,180
so in this situation up here as the

3771
02:30:12,180 --> 02:30:13,920
price is going down let's say the price

3772
02:30:13,920 --> 02:30:16,740
goes down to 75 dollars backing

3773
02:30:16,740 --> 02:30:20,220
fifty dollars of DSC this is way lower

3774
02:30:20,220 --> 02:30:22,740
than our 50 threshold so what we're

3775
02:30:22,740 --> 02:30:25,080
going to do is we're going to let

3776
02:30:25,080 --> 02:30:26,520
liquidator

3777
02:30:26,520 --> 02:30:31,260
Liquidator fake this 75 backing takes a

3778
02:30:31,260 --> 02:30:35,520
75 backing and pays off the fifty

3779
02:30:35,520 --> 02:30:39,600
dollars DSC and burns earns off the 50

3780
02:30:39,600 --> 02:30:42,300
DSC so we're gonna have somebody able to

3781
02:30:42,300 --> 02:30:45,140
take their money in exchange for them

3782
02:30:45,140 --> 02:30:48,359
making sure our protocol stays

3783
02:30:48,359 --> 02:30:50,340
collateralized so that's what this

3784
02:30:50,340 --> 02:30:52,319
liquid a function is going to do so

3785
02:30:52,319 --> 02:30:54,180
first off they're going to be able to

3786
02:30:54,180 --> 02:30:57,300
choose the collateral

3787
02:30:57,300 --> 02:31:00,000
the user that they want to liquidate and

3788
02:31:00,000 --> 02:31:03,660
the un256 debt to cover and they'll be

3789
02:31:03,660 --> 02:31:05,460
able to track the users and their

3790
02:31:05,460 --> 02:31:08,100
positions by listening to these events

3791
02:31:08,100 --> 02:31:09,660
that we've been emitting which is

3792
02:31:09,660 --> 02:31:11,580
exciting we're going to definitely want

3793
02:31:11,580 --> 02:31:14,700
a lot of nat spec for this so app param

3794
02:31:14,700 --> 02:31:16,380
collateral is going to be the collateral

3795
02:31:16,380 --> 02:31:20,760
to liquidate or better yet the your C20

3796
02:31:20,760 --> 02:31:22,620
address

3797
02:31:22,620 --> 02:31:24,840
collateral address

3798
02:31:24,840 --> 02:31:28,920
liquidate from the user apparam

3799
02:31:28,920 --> 02:31:33,359
user the user who has broken the health

3800
02:31:33,359 --> 02:31:35,580
Factor there

3801
02:31:35,580 --> 02:31:40,080
Health Factor should be below min

3802
02:31:40,080 --> 02:31:41,399
health

3803
02:31:41,399 --> 02:31:44,280
backdoor at param

3804
02:31:44,280 --> 02:31:48,000
debt to cover it's going to be the

3805
02:31:48,000 --> 02:31:54,000
amount of DSC you want to burn

3806
02:31:54,000 --> 02:31:58,800
to improve the user's Health Factor yeah

3807
02:31:58,800 --> 02:32:00,120
we're going to add a lot of at notices

3808
02:32:00,120 --> 02:32:01,979
here at notice

3809
02:32:01,979 --> 02:32:04,920
you can partially

3810
02:32:04,920 --> 02:32:09,300
are liquidate a user just so as so long

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