---
layout:     post
title:      leetcode-0143 重排链表
category:   leetcode
tags:       ['链表']
description:   给定一个单链表 L：L0→L1→…→Ln-1→Ln ，将其重新排列后变为： L0→Ln→L1→Ln-1→L2→Ln-2→...

---
[https://leetcode-cn.com/problems/reorder-list](https://leetcode-cn.com/problems/reorder-list)

    给定一个单链表 L：L0→L1→…→Ln-1→Ln ，
    将其重新排列后变为： L0→Ln→L1→Ln-1→L2→Ln-2→…
    
    你不能只是单纯的改变节点内部的值，而是需要实际的进行节点交换。
    
    示例 1:
    
    给定链表 1->2->3->4, 重新排列为 1->4->2->3.
    示例 2:
    
    给定链表 1->2->3->4->5, 重新排列为 1->5->2->4->3.
  
  <ul>
  <br/>
  两种方法：
 	<li>1. 将链表一分为二，将后半部分压栈，然后和前半部分逐一合并。</li>
	<li>2. 将链表一分为二，将后半部分翻转，然后和前半部分逐一合并。</li>
  </ul>

    /**
     * Definition for singly-linked list.
     * struct ListNode {
     *     int val;
     *     ListNode *next;
     *     ListNode(int x) : val(x), next(NULL) {}
     * };
     */
    class Solution {
    public:
        int length(ListNode *head)
        {
            int len = 0;
            
            while (head != nullptr)
            {
                len++;
                head = head->next;
            }
            
            return len;
        }
        
        ListNode *reverse(ListNode *head)
        {
            if (head == nullptr || head->next == nullptr)
            {
                return head;
            }
            
            #if 0
            auto t = reverse(head->next);
            head->next->next = head;
            head->next = nullptr;
            
            return t;
            #else
            ListNode *p = head->next;
            ListNode *my_head = head;
            my_head->next = nullptr;
            
            while (p != nullptr)
            {
                ListNode *t = p->next;
                p->next = my_head;
                my_head = p;
                
                p = t;
            }
            
            return my_head;
            
            #endif
        }
        
        ListNode *getMid(ListNode *head)
        {
            if (head == nullptr || head->next == nullptr || head->next->next == nullptr)
            {
                return head;
            }
            
            ListNode *slow = head;
            ListNode *fast = head;
            
            while (fast != nullptr && fast->next != nullptr)
            {
                slow = slow->next;
                fast = fast->next->next;
            }
            
            return slow;
        }
        
        void reorderList(ListNode* head) 
        {
            if (head == nullptr || head->next == nullptr || head->next->next == nullptr)
            {
                return ;
            }
            
            #if 0
            stack<ListNode *> st;
            ListNode *p = getMid(head);
            while (p != nullptr)
            {
                st.push(p);
                p = p->next;
            }
            
            ListNode *left = head;
            while (!st.empty())
            {
                ListNode *t = left->next;
                ListNode *top = st.top();
                
                top->next = t;
                left->next = top;
                left = left->next->next;
                
                st.pop();
            }
            
            left->next = nullptr;
            #else
            ListNode *mid = getMid(head);
            ListNode *right = reverse(mid);
            ListNode *left = head;
            
            while (right != nullptr)
            {
                ListNode *r = right->next;
                
                right->next = left->next;
                left->next = right;
                left = right->next;
                
                right = r;
            }
            
            left->next = nullptr;
            
            #endif
        }
    };
