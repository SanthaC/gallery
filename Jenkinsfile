pipeline {
    agent any

    tools {
        nodejs "node"   // matches your NodeJS installation in Jenkins
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

        stage('Run Tests') {
            steps {
                echo "🔹 Running tests..."
                sh 'npm test'
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
                // Add Render CLI commands here if needed
            }
        }
    }

    post {
        success {
            echo "✅ Build succeeded!"
        }
        failure {
            echo "❌ Build failed!"
            // Send email notification if build fails
            mail to: 'santhachepkemoi@gmail.com',
                 subject: "Jenkins Build Failed: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                 body: "The Jenkins build has failed. Please check the console output: ${env.BUILD_URL}"
        }
    }
}
