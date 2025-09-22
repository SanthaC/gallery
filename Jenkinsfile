pipeline {
    agent any

    tools {
        nodejs "node"   // Make sure your NodeJS installation in Jenkins is named "node"
    }

    environment {
        // Render deployment
        RENDER_DEPLOY_HOOK = 'https://api.render.com/deploy/srv-d37hb3mr433s73ep0e9g?key=MoCN_eK8aX8'
        RENDER_URL = 'https://gallery-sgx2.onrender.com'

        // Slack & Email
        SLACK_CHANNEL = '#Santha_IP1'  // Corrected to match assignment
        EMAIL_RECIPIENT = 'santhachepkemoi@gmail.com'
    }

    triggers {
        githubPush() // Automatically trigger pipeline on GitHub push
    }

    stages {
        stage('Checkout') {
            steps {
                echo "📥 Checking out source code..."
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                echo "📦 Installing dependencies..."
                sh 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                echo "🔹 Running tests..."
                sh 'npm test' // Fail build if tests fail
            }
        }

        stage('Deploy to Render') {
            steps {
                echo "🚀 Triggering deployment to Render..."
                sh "curl -X POST ${RENDER_DEPLOY_HOOK}"
            }
        }
    }

    post {
        success {
            echo "✅ Build & deploy succeeded!"
            slackSend(
                channel: "${SLACK_CHANNEL}",
                color: 'good',
                message: "✅ *Build #${env.BUILD_NUMBER}* for *${env.JOB_NAME}* succeeded 🚀\n🔗 <${env.RENDER_URL}|View deployed site>"
            )
        }

        failure {
            echo "❌ Build failed!"
            slackSend(
                channel: "${SLACK_CHANNEL}",
                color: 'danger',
                message: "❌ *Build #${env.BUILD_NUMBER}* for *${env.JOB_NAME}* failed.\n🔍 <${env.BUILD_URL}|Check Jenkins logs>"
            )
            mail to: "${EMAIL_RECIPIENT}",
                 subject: "Jenkins Build Failed: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                 body: "The Jenkins build has failed. Please check the console output: ${env.BUILD_URL}"
        }
    }
}

