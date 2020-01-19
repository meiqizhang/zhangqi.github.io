---
layout:     post
title:      leetcode-0001 两数之和
category:  leetcode
description:   给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。你可以假设每种输入只会对应一个答案。但是，你不能重复利用这个数组中同样的元素
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
