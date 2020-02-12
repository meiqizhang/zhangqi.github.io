---
layout:     post
title:      Raft 日志复制 Log replication
category:   Distributed-OS
tags:       ['分布式理论']
description:Raft 是分布式一致性算法，保证的实际上是多台机器上数据的一致性，前面说的 leader 选举是为了保证日志复制的一致性。

---
         
<article class="_2rhmJa"><h2>背景</h2>
<p>Raft 是分布式一致性算法，保证的实际上是多台机器上数据的一致性，前面说的 leader 选举是为了保证日志复制的一致性。</p>
<p>简单来说，保证复制日志相同，才是分布式一致性算法的最终任务。</p>
<p>Leader 选举只是为了保证日志复制相同的辅助工作。实际上，在更为学术的 Paxos 里面，是没有 leader 的概念的（大部分 Paxos 的实现通常会加入 leader 机制提高性能）。</p>
<p><strong>所以，保证复制日志相同，就是分布式一致性算法的终极任务</strong>。</p>
<h2>日志复制</h2>
<p>在 Raft 中，leader 会接收客户端的所有需求（follower 会将写请求转发给 leader），leader 会将数据以日志的方式通过 RPC 的方式同步给所有 followers，只要超过半数以上的 follower 反馈成功，这条日志就成功提交了。如果 RPC 请求超时，leader 就不停的进行 RPC 重试。</p>
<p>下面再从几个方面说说日志复制：</p>
<ol>
<li>复制过程</li>
<li>日志的组成</li>
<li>主从日志的一致性</li>
<li>日志特性</li>
<li>日志的不正常情况</li>
</ol>
<h5>复制过程</h5>
<ol>
<li>客户端的每一个请求都包含被复制状态机执行的指令。</li>
<li>leader 把这个指令作为一条新的日志条目添加到日志中，然后并行发起 RPC 给其他的服务器，让他们复制这条信息。</li>
<li>假如这条日志被安全的复制，领导人就应用这条日志到自己的状态机中，并返回给客户端。</li>
<li>如果 follower 宕机或者运行缓慢或者丢包，领导人会不断的重试，知道所有的 follower 最终都存储了所有的日志条目。</li>
</ol>
<p>大概的流程如下图：</p>
<div class="image-package">
<div class="image-container" style="max-width: 700px; max-height: 437px; background-color: transparent;">
<div class="image-container-fill" style="padding-bottom: 62.56%;"></div>
<div class="image-view" data-width="1154" data-height="722"><img data-original-src="//upload-images.jianshu.io/upload_images/4236553-c9ad172e3f41ea02.png" data-original-width="1154" data-original-height="722" data-original-format="image/png" data-original-filesize="87188" data-image-index="0" style="cursor: zoom-in;" class="" src="//upload-images.jianshu.io/upload_images/4236553-c9ad172e3f41ea02.png?imageMogr2/auto-orient/strip|imageView2/2/w/1154/format/webp"></div>
</div>
<div class="image-caption">图 1</div>
</div>
<h5>日志的组成</h5>
<p>日志的数据结构：</p>
<ol>
<li>创建日志时的任期号（用来检查节点日志是否出现不一致的情况）</li>
<li>状态机需要执行的指令（真正的内容）</li>
<li>索引：整数索引表示日志条目在日志中位置</li>
</ol>
<p>日志结构如下图：</p>
<div class="image-package">
<div class="image-container" style="max-width: 700px; max-height: 408px; background-color: transparent;">
<div class="image-container-fill" style="padding-bottom: 58.41%;"></div>
<div class="image-view" data-width="1308" data-height="764"><img data-original-src="//upload-images.jianshu.io/upload_images/4236553-466b0d0790cd1e8e.png" data-original-width="1308" data-original-height="764" data-original-format="image/png" data-original-filesize="100707" data-image-index="1" style="cursor: zoom-in;" class="" src="//upload-images.jianshu.io/upload_images/4236553-466b0d0790cd1e8e.png?imageMogr2/auto-orient/strip|imageView2/2/w/1200/format/webp"></div>
</div>
<div class="image-caption">图 2</div>
</div>
<p>上图显示，共有 8 条日志，提交了  7 条。提交的日志都将通过状态机持久化到磁盘中，防止宕机。</p>
<h5>主从日志的一致性</h5>
<p>然后谈谈主从日志的一致性问题，这个是分布式一致性算法要解决的根本问题。</p>
<p>Raft 为了保证主从日志的一致性，做了以下规则/限制（补丁）。</p>
<ol>
<li>Raft 保证所有已提交的日志条目都是持久化的并且最终会被所有可用的状态机执行</li>
<li>领导人把指令作为一条新的日志条目添加到日志中后，将并行的发送 RPC 给 follower，让他们复制这条信息。</li>
<li>leader 将会跟踪最大的且即将被提交的日志条目的索引，并且这个索引会被包含在未来的所有附加日志 RPC 请求中，这样就能保证其他的服务器知道 leader 的索引提交位置。</li>
<li>一旦 follower 知道一条日志条目已经被提交，那么他也会将这条日志应用到自己的状态机中（按照日志的顺序）。</li>
</ol>
<h5>日志特性</h5>
<ol>
<li><p>如果在不同的日志中的两个日志条目的<code>索引</code> 和 <code>索引下标</code> 相同，那么他们的指令就是相同的。（<code>原因：leader 最多在一个任期里的一个日志索引位置创建一条日志条目，日志条目在日志的位置从来不会改变</code>）</p></li>
<li><p>如果在不同的日志里的 2 个日志条目拥有相同的任期号和索引，那么他们之前的日志项都是相同的。（<code>原因：每次 RPC 发送附加日志时，leader 会把这条日志条目的前面的日志的下标和任期号一起发送给 follower，如果 follower 发现和自己的日志不匹配，那么就拒绝接受这条日志，这个称之为一致性检查</code>）。<br>
2.1 这里需要提一下 Raft 的日志匹配规则：<code>如果 2 个日志的相同的索引位置的日志条目的任期号相同，那么 Raft 就认为这个日志从头到这个索引之间全部相同</code> ，这个非常重要。</p></li>
</ol>
<h5>日志的不正常情况</h5>
<p>上面说的都是日志在正常情况下的表现，没有考虑到一些异常情况，例如 leader 崩溃。</p>
<p>即，正常情况下， leader 和 follower 的日志保持一致性，所以附加日志 RPC 的一致性检查从来不会失败（查询上次已提交的日志条目的任期和下标）</p>
<p>然而，让我们考虑一下 leader 的崩溃：假设老的 leader 还没有完全复制完所有的日志条目，就崩溃了，这将导致 follower 的日志有可能比 leader 的日志多，也可能少，也可能多多少少。。。。</p>
<p>下图将展示 leader 和 follower 的日志的冲突情况：</p>
<div class="image-package">
<div class="image-container" style="max-width: 700px; max-height: 476px;">
<div class="image-container-fill" style="padding-bottom: 68.08999999999999%;"></div>
<div class="image-view" data-width="1354" data-height="922"><img data-original-src="//upload-images.jianshu.io/upload_images/4236553-8a3893a9355685c2.png" data-original-width="1354" data-original-height="922" data-original-format="image/png" data-original-filesize="87731" data-image-index="2" style="cursor: zoom-in;" class="image-loading"></div>
</div>
<div class="image-caption">图 3</div>
</div>
<p>从上图可以看出，所有的 follower 都和 leader 的日志冲突了，leader 的最后一条日志的任期是 6， 下标是 10 ，而其他 follower 的日志都与 leader 不匹配。</p>
<p>如何处理？</p>
<p>Raft 给出了一个方案（补丁）:通过强制 follower 直接复制 leader 的日志解决（意味着 follower 中的和 leader 冲突的日志将被覆盖）。</p>
<p>如何操作？</p>
<p>要使得 follower 的日志和 leader 进入一致状态，leader 必须找到 follower 最后一条和 leader 匹配的日志，然后把那条日志后面的日志全部删除。</p>
<p>依据这个限制，上图中的 a follower 不需要删除任何条目，b 也不需要删除，c follower 需要删除最后一个条目，d follower 需要删除最后 2 个任期为 7 的条目，e 需要删除最后 2 个任期为 4 的条目，f 则比较厉害，需要删除 下标为 3 之后的所有条目。</p>
<p>Raft 如何实现？</p>
<p>leader 为每一个 follower 维护一个下标，称之为 nextIndex，表示下一个需要发送给 follower 的日志条目的索引。</p>
<p>当一个新 leader 刚获得权力的时候，他将自己的最后一条日志的 index + 1，也就是上面提的 nextIndex 值，如果一个 follower 的日志和 leader 不一致，那么在下一次  RPC 附加日志请求中，一致性检查就会失败（不会插入数据）。</p>
<p>当这种情况发生，leader 就会把 nextIndex 递减进行重试，直到遇到匹配到正确的日志。</p>
<p>当匹配成功之后，follower 就会把冲突的日志全部删除，此时，follower 和 leader 的日志就达成一致。</p>
<h2>日志复制 Summary</h2>
<p>日志复制是分布式一致性算法的核心，所谓的一致性，就是集群多节点的数据一致性。</p>
<p>Raft 把每条日志都附加了 任期号和下标 来保证日志的唯一性。</p>
<p>依据这个限制，Raft 对日志有以下保证：如果 2 个日志的相同的索引位置的日志条目的任期号相同，那么 Raft 就认为这个日志从头到这个索引之间全部相同。</p>
<p>依据这个保证，当 leader 和 follower 日志冲突的时候，leader 将校验 follower 最后一条日志是否和 leader 匹配，如果不匹配，将递减查询，直到匹配，匹配后，删除冲突的日志。这样就实现了主从日志的一致性。</p>
<h2>参考</h2>
<p><a href="https://ramcloud.atlassian.net/wiki/download/attachments/6586375/raft.pdf" target="_blank" rel="nofollow">英文 paper  pdf 地址</a></p>
<p><a href="https://github.com/maemual/raft-zh_cn/blob/master/raft-zh_cn.md" target="_blank" rel="nofollow">Raft paper 中文翻译 —— 寻找一种易于理解的一致性算法（扩展版）</a></p>
<p><a href="https://www.youtube.com/watch?v=YbZ3zDzDnrw&amp;feature=youtu.be" target="_blank" rel="nofollow">Raft 作者讲解视频</a></p>
<p><a href="http://www2.cs.uh.edu/~paris/6360/PowerPoint/Raft.ppt" target="_blank" rel="nofollow">Raft 作者讲解视频对应的 PPT</a></p>
<p><a href="http://thesecretlivesofdata.com/raft/" target="_blank" rel="nofollow">一个简单的讲解 Raft 协议的动画</a></p>
</article>
