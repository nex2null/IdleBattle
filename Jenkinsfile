pipeline {
    agent any
    stages {
        stage('Build image') {
            steps {
                echo 'Starting to build docker image'

                script {
                    def image = docker.build("idle-battle:${env.BUILD_ID}")
                }
            }
        }
    }
}
