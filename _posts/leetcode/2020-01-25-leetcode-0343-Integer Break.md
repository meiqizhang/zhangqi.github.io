---
layout:     post
title:      leetcode-0343 整数拆分
category:   leetcode
tags:       ['数组', '动态规划']
description:   给定一个正整数 n，将其拆分为至少两个正整数的和，并使这些整数的乘积最大化。 返回你可以获得的最大乘积。
---
[https://leetcode-cn.com/problems/integer-break/](https://leetcode-cn.com/problems/integer-break "https://leetcode-cn.com/problems/integer-break")

<ul>
<div class="notranslate"><p>给定一个正整数&nbsp;<em>n</em>，将其拆分为<strong>至少</strong>两个正整数的和，并使这些整数的乘积最大化。 返回你可以获得的最大乘积。</p>

<p><strong>示例 1:</strong></p>

<pre><strong>输入: </strong>2
<strong>输出: </strong>1
<strong>解释: </strong>2 = 1 + 1, 1 × 1 = 1。</pre>

<p><strong>示例&nbsp;2:</strong></p>

<pre><strong>输入: </strong>10
<strong>输出: </strong>36
<strong>解释: </strong>10 = 3 + 3 + 4, 3 ×&nbsp;3 ×&nbsp;4 = 36。</pre>

<p><strong>说明: </strong>你可以假设&nbsp;<em>n&nbsp;</em>不小于 2 且不大于 58。</p>
</div>
</ul>


解析：动态规划，dp[i]表示和为i的拆分数字乘积的最大值。
如果只拆成两部分，则可表示j和i-j两部分，乘积为j * (i - j)
如果继续拆分，则可表示为j * dp[i-j]

	class Solution {
	public:
	    int integerBreak(int n)
	    {
	        if (n < 1) return 0;
	        
	        vector<int> dp(n + 1, 1);
	        
	        for (int i = 2; i <= n; i++)
	        {
	            for (int j = i -1; j > 0; j--)
	            {
	                dp[i] = max(dp[i], max(j * dp[i-j],  j * (i - j)));
	            }
	        }
	        
	        return dp[n];
	    }
	};
