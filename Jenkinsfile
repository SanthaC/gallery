pipeline {
    agent any

    tools {
        nodejs "node"   // matches your NodeJS installation in Jenkins
    }

    environment {
        RENDER_URL = 'https://gallery-sgx2.onrender.com'  // your actual Render site URL
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
                // If you had Render CLI or Git auto-deploy, it would run here
            }
        }
    }

    post {
        success {
            echo "✅ Build succeeded!"
            slackSend(
                channel: '#all-yourfirstnameip1',
                message: "✅ *Build #${env.BUILD_NUMBER}* for *${env.JOB_NAME}* succeeded 🚀\n🔗 <${env.RENDER_URL}|View deployed site>"
            )
        }
        failure {
            echo "❌ Build failed!"
            slackSend(
                channel: '#all-yourfirstnameip1',
                message: "❌ *Build #${env.BUILD_NUMBER}* for *${env.JOB_NAME}* failed.\n🔍 <${env.BUILD_URL}|Check Jenkins logs>"
            )
            mail to: 'santhachepkemoi@gmail.com',
                 subject: "Jenkins Build Failed: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                 body: "The Jenkins build has failed. Please check the console output: ${env.BUILD_URL}"
        }
    }
}
