# Git 常用命令

# git 基本概念

> Git 是目前世界上最优秀最流行的分布式版本控制系统；对源代码进行版本管理

Git 项目有 3 个区域：工作区、暂存区和 Git 仓库（分成本地仓库和远程仓库）

## Git 常用命令

1. git add ：会将工作区的文件标记为已暂存，保存在暂存区
2. git commit： 会将标记为已暂存的文件保存都本地 Git 仓库，并生成一个快照
3. git diff：令查看本地修改
4. git log: 查看提交日志；

## Git 常用回退操作命令

1. git checkout -- . 一次性撤销所有本地修改
2. git reset . 一次性撤销暂存区的全部修改
3. git checkout a18c6fa 撤销了本次提交
4. git reset --hard HEAD~1 重置之前的提交
5. git commit --amend -m "add test container" 提交信息修改
6. git revert 711bb0b 撤销该次提交（将提交的内容“反操作”），并生成一个新的提交在最前面
7. git merge --abort 合并出现冲突时，撤销合并操作
8. git rm --cached src/test.pptx 暂存区的文件加多了，想移除，又不想删掉本地的文件
9. git br -m [old_br][new_br] 分支重命名
10. 撤销变基操作
11. git filter-branch --tree-filter 'rm -f passwords.txt' 该命令执行完会将提交历史中所有提交的 passwords.txt 文件彻底删除，永远没法通过 Git 找回
