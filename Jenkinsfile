pipeline {
    agent any

    tools {
        nodejs "node"   // 👈 matches the name you set in Jenkins Tools
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build/Run') {
            steps {
                echo "Starting the application..."
                sh 'node server.js &'
            }
        }

        stage('Deploy to Render') {
            steps {
                echo "🚀 Deploying to Render..."
            }
        }
    }

    post {
        success {
            echo "✅ Build succeeded!"
        }
        failure {
            echo "❌ Build failed!"
        }
    }
}
