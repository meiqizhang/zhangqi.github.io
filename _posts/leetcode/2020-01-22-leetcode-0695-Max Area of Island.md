---
layout:     post
title:      leetcode-0595 岛屿的最大面积
category:   leetcode
tags:       ['DFS', '图']
description:   给定一个包含了一些 0 和 1的非空二维数组 grid , 一个 岛屿 是由四个方向 (水平或垂直) 的 1 (代表土地)   构成的组合。你可以假设二维矩阵的四个边缘都被水包围着。

---

[https://leetcode-cn.com/problems/max-area-of-island
]()

    给定一个包含了一些 0 和 1的非空二维数组 grid , 一个 岛屿 是由四个方向 (水平或垂直) 的 1 (代表土地)   构成的组合。你可以假设二维矩阵的四个边缘都被水包围着。
    找到给定的二维数组中最大的岛屿面积。(如果没有岛屿，则返回面积为0。)
    
    示例 1:

    [[0,0,1,0,0,0,0,1,0,0,0,0,0],
     [0,0,0,0,0,0,0,1,1,1,0,0,0],
     [0,1,1,0,1,0,0,0,0,0,0,0,0],
     [0,1,0,0,1,1,0,0,1,0,1,0,0],
     [0,1,0,0,1,1,0,0,1,1,1,0,0],
     [0,0,0,0,0,0,0,0,0,0,1,0,0],
     [0,0,0,0,0,0,0,1,1,1,0,0,0],
     [0,0,0,0,0,0,0,1,1,0,0,0,0]]
     
    对于上面这个给定矩阵应返回 6。注意答案不应该是11，因为岛屿只能包含水平或垂直的四个方向的‘1’。
    
    示例 2:
    
    [[0,0,0,0,0,0,0,0]]
    对于上面这个给定的矩阵, 返回 0。
    
    注意: 给定的矩阵grid 的长度和宽度都不超过 50。
    
===============

	class Solution {
        vector<vector<int>> directions;
    public:
        Solution()
        {
            directions = vector<vector<int>>
            {
                {0, -1},
                {1, 0},
                {0, 1},
                {-1, 0}
            };
        }
        
        void dfs(int r, int c, int &ans, vector<vector<int>> &grid)
        {
            int M = grid.size();
            int N = grid[0].size();
            
            if (r < 0 || r >= M || c < 0 || c >= N || grid[r][c] == 0)
            {
                return;
            }
            
            grid[r][c] = 0;
            ans++;
            
            for (int i = 0; i < directions.size(); i++)
            {
                int x = r + directions[i][0];
                int y = c + directions[i][1];
                
                if (x >= 0 && x < M && y >= 0 && y < N && grid[x][y] != 0 )
                {
                    dfs(x, y, ans, grid);
                }
            }
        }
        
        int maxAreaOfIsland(vector<vector<int>> &grid) 
        {
            if (grid.size() < 1) return 0;
            
            int M = grid.size();
            int N = grid[0].size();
            
            int result = 0;
            for (int i = 0; i < M; i++)
            {
                for (int j = 0; j < N; j++)
                {
                    int ans = 0;
                    dfs(i, j, ans, grid);
                                  
                    if (ans > result)
                    {
                        result = ans;
                    }
                }
            }
            
            return result;
        }
    };