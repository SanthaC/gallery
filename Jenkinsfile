pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                // Pull the latest code from your repo
                checkout scm
            }
        }

        stage('Install dependencies') {
            steps {
                // Install project dependencies
                sh 'npm install'
            }
        }

        stage('Build/Run') {
            steps {
                echo "Starting the application..."
                // Start server (Render will handle real deploy)
                sh 'node server.js &'
            }
        }

        stage('Deploy to Render') {
            steps {
                echo "🚀 Deploying to Render..."
                echo "If GitHub auto-deploy is enabled on Render, this step is just informative."
            }
        }
    }

    post {
        failure {
            echo "❌ Build failed! Check Jenkins logs for details."
        }
        success {
            echo "✅ Build succeeded! Your site should update on Render."
        }
    }
}
