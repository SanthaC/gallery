pipeline {
    agent any

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

        stage('Run application') {
            steps {
                echo "Starting the application..."
                sh 'node server.js'
            }
        }
    }
}
