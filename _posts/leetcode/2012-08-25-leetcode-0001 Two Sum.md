---
layout:     post
title:      我为什么写博客？
category: blog
description: 写博客这个这么古老的行为，还有必要拿出来说吗，我看有。
---

![avatar](images/0001.png)

	func twoSum(nums []int, target int) []int
	{
		var dict = make(map[int]int)
	
		for i := 0; i < len(nums); i++ {
			dict[nums[i]] = i
		}
	
		var result = []int{}
	
		for i := 0; i < len(nums); i++ {
			var x = target - nums[i]
			index, ok := dict[x]
			if ok && index != i {
				result = append(result, i)
				result = append(result, index)
				return result
			}
		}
	
		return result
	}
