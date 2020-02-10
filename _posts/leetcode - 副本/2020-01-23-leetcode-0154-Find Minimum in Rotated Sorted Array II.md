---
layout:     post
title:      leetcode-0153 数组中的第K个最大元素
category:   leetcode
tags:       ['数组', '二分法']
description:   假设按照升序排序的数组在预先未知的某个点上进行了旋转，请找出其中最小的元素。
---

[https://leetcode-cn.com/problems/find-minimum-in-rotated-sorted-array-ii](https://leetcode-cn.com/problems/find-minimum-in-rotated-sorted-array-ii)

    假设按照升序排序的数组在预先未知的某个点上进行了旋转。
    
    ( 例如，数组 [0,1,2,4,5,6,7] 可能变为 [4,5,6,7,0,1,2] )。
    
    请找出其中最小的元素。
    
    注意数组中可能存在重复的元素。
    
    示例 1：
    
    输入: [1,3,5]
    输出: 1
    示例 2：
    
    输入: [2,2,2,0,1]
    输出: 0
    说明：
    
    这道题是 寻找旋转排序数组中的最小值 的延伸题目。
    允许重复会影响算法的时间复杂度吗？会如何影响，为什么？

==

    class Solution {
    public:
        int findMin(vector<int>& nums)
        {
            int left = 0;
            int right = nums.size() - 1;
            
            while (left < right && nums[left] == nums[right] && nums[left] == nums[0])
            {
                left++;
                right--;
            }
            
            if (right != nums.size() - 1)
            {
                right++;
            }
            
            while (left < right)
            {
                int mid = (left + right) >> 1;
                
                if (nums[left] < nums[right])
                {
                    return nums[left];
                }
                
                if (nums[mid] >= nums[left]) // 左边有序
                {
                    left = mid + 1;
                }
                else
                {
                    right = mid;
                }
            }
            
            return nums[left];
        }
     }; 