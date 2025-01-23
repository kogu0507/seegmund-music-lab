#!/bin/bash

# Gitの現在の状態を表示
git status

# すべての変更をステージング
git add .

# コミットメッセージを入力
echo "Enter commit message: "
read msg

# コミットを実行
git commit -m "$msg"

# リモートにプッシュ
git push origin main
