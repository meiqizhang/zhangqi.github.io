---
layout:     post
title:      leetcode-0212 单词搜索 II
category:   leetcode
tags:       ['字典树', 'DFS']
description:   给定一个二维网格 board 和一个字典中的单词列表 words，找出所有同时在二维网格和字典中出现的单词。
---

[https://leetcode-cn.com/problems/word-search-ii](https://leetcode-cn.com/problems/word-search-ii)

    给定一个二维网格 board 和一个字典中的单词列表 words，找出所有同时在二维网格和字典中出现的单词。
    
    单词必须按照字母顺序，通过相邻的单元格内的字母构成，其中“相邻”单元格是那些水平相邻或垂直相邻的单元格。    同一个单元格内的字母在一个单词中不允许被重复使用。
    
    示例:
    
    输入: 
    words = ["oath","pea","eat","rain"] and board =
    [
      ['o','a','a','n'],
      ['e','t','a','e'],
      ['i','h','k','r'],
      ['i','f','l','v']
    ]
    
    输出: ["eat","oath"]
    说明:
    你可以假设所有输入都由小写字母 a-z 组成。
    
    提示:
    
    你需要优化回溯算法以通过更大数据量的测试。你能否早点停止回溯？
    如果当前单词不存在于所有单词的前缀中，则可以立即停止回溯。什么样的数据结构可以有效地执行这样的操作？散 列表是否可行？为什么？ 前缀树如何？如果你想学习如何实现一个基本的前缀树，请先查看这个问题：   实现Trie（前缀树）。

========

    struct TrieNode
    {
        char ch;
        bool isWord;
        vector<TrieNode *>children;
    
        TrieNode(char ch = '#')
        {
            this->ch = ch;
            this->isWord = false;
            this->children.resize(127, nullptr);
        }
    };
    
    struct TrieTree
    {
        TrieNode root;
    
        void insert(string s)
        {
            TrieNode *p = &root;
            int index = 0;
    
            while (index < s.size() && p->children[s[index]] != nullptr)
            {
                p = p->children[s[index]];
                index++;
            }
    
            while (index < s.size())
            {
                p->children[s[index]] = new TrieNode(s[index]);
                p = p->children[s[index]];
                index++;
            }
            p->isWord = true;
        }
    };
    
    
    class Solution
    {
        vector<vector<int>> step{ { 0, -1 },{ 1, 0 },{ 0, 1 },{ -1, 0 } };
    
    public:
    
        void dfs(int r, int c, vector<vector<bool>> &visit, string pre, TrieNode *node,     vector<string> &result, vector<vector<char>>& board)
        {
            if (node->isWord)
            {
                result.push_back(pre);
                node->isWord = false;
            }
    
            int N = board.size();
            int M = board[0].size();
    
            visit[r][c] = true;
            for (int i = 0; i < 4; i++)
            {
                int x = r + step[i][0];
                int y = c + step[i][1];
    
                if (x >= 0 && y >= 0 && x < N && y < M && !visit[x][y])
                {
                    char ch = board[x][y];
    
                    if (node->children[ch] != nullptr)
                    {
                        dfs(x, y, visit, pre + ch, node->children[ch], result, board);
                    }
                }
            }
            visit[r][c] = false;
        }
    
        vector<string> searchTireTree(vector<vector<char>>& board, TrieTree *tree)
        {
            vector<string> result;
            vector<vector<bool>> visit(board.size(), vector<bool>(board[0].size(),    false));
    
            int N = board.size();
            int M = board[0].size();
    
            for (int r = 0; r < N; r++)
            {
                for (int c = 0; c < M; c++)
                {
                    char ch = board[r][c];
                    if (tree->root.children[ch] != nullptr)
                    {
                        dfs(r, c, visit, string("") + ch, tree->root.children[ch],    result, board);
                    }
                }
            }
            
            return result;           
        }
    
        vector<string> findWords(vector<vector<char>>& board, vector<string>& words)
        {
            TrieTree root;
            for (auto word : words)
            {
                root.insert(word);
            }
    
            return this->searchTireTree(board, &root);
        }
    };