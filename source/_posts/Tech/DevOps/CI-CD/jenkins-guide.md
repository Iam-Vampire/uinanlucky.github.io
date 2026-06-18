---
title: Jenkins 持续集成
date: 2025-07-16 10:00:00
tags: [devops, ci-cd]
---

## Jenkins 持续集成

Jenkins 是老牌的 CI/CD 工具。

### Pipeline 语法

```groovy
pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                sh 'npm build'
            }
        }
        stage('Test') {
            steps {
                sh 'npm test'
            }
        }
    }
}
```
