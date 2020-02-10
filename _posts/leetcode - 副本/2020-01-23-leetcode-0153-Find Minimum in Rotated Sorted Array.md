---
layout:     post
title:      leetcode-0153 寻找旋转排序数组中的最小值
category:   leetcode
tags:       ['数组', '二分法']
description:   假设按照升序排序的数组在预先未知的某个点上进行了旋转，请找出其中最小的元素。
---

[https://leetcode-cn.com/problems/find-minimum-in-rotated-sorted-array](https://leetcode-cn.com/problems/find-minimum-in-rotated-sorted-array)

    假设按照升序排序的数组在预先未知的某个点上进行了旋转。
    
    ( 例如，数组 [0,1,2,4,5,6,7] 可能变为 [4,5,6,7,0,1,2] )。
    
    请找出其中最小的元素。
    
    你可以假设数组中不存在重复元素。
    
    示例 1:
    
    输入: [3,4,5,1,2]
    输出: 1
    示例 2:
    
    输入: [4,5,6,7,0,1,2]
    输出: 0

==
    
    class Solution
    {
    public:
        int findMin(vector<int>& nums)
        {
            if (nums.size() < 1) return -1;
            if (nums.size() == 1) return nums[0];
    
            int low = 0;
            int high = nums.size() - 1;
    
            while (low < high)
            {
                int mid = (low + high) / 2;
    
                if (nums[low] < nums[high])
                {
                    return nums[low];
                }
    
                if (nums[mid] >= nums[low])//左端有序，旋转点在右端
                {
                    low = mid + 1;
                }
                else
                {
                    high = mid;
                }
            }
    
            return nums[low];
        }
    };
