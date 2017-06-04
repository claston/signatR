(function () {
    var app = angular.module('messageBox', ['toaster']);
    app.value('$', $);

    app.factory('noteService', ['$', '$rootScope',
        function ($, $rootScope) {
            var proxy;
            var connection;
            return {
                connect: function () {
                    connection = $.hubConnection('/chat2/signalr', { useDefaultPath: false });
                    //connection = $.hubConnection('/signalr', { useDefaultPath: false });
                    //connection = $.hubConnection();
                    proxy = connection.createHubProxy('chatHub');
                    //proxy = connection.chatHub;
                    connection.start();
                    //$('#exibenome').val(prompt('Informe o seu nome :', ''));
                    proxy.on('broadcastMessage', function (nome, mensagem) {
                        $rootScope.$broadcast('broadcastMessage', nome, mensagem);
                    });
/*
                    proxy.on('toastMessage', function (nome, mensagem) {
                        $rootScope.$broadcast('toastMessage', nome, mensagem);
                    });
*/
                },
                isConnecting: function () {
                    return connection.state === 0;
                },
                isConnected: function () {
                    return connection.state === 1;
                },
                connectionState: function () {
                    return connection.state;
                },
                sendMessage: function (grupo, nome, messagem) {
                    proxy.invoke('SendMessage', grupo, nome, messagem);
                },
/*
                sendToaster: function (grupo, nome, messagem) {
                    proxy.invoke('SendToaster', grupo, nome, messagem);
                },
*/
            }
        }]);

    app.controller('messageController', function ($scope, noteService, $timeout, toaster) {
        
        noteService.connect();
        $scope.messages = [];
        $scope.grupo = '';
        $scope.nome = '';
        $scope.escolheuGrupo = false;  

       // $timeout(function () { $scope.nome = prompt('Informe o seu nome :', ''); }, 100);

        $scope.$on('broadcastMessage', function (event, nome, mensagem) {
            var mensagem = { nome: nome, mensagem: mensagem }
            toaster.pop('note', "mensagem de " + nome, mensagem.mensagem);
            $scope.messages.push(mensagem);
            $scope.$apply();
        });
/*
        $scope.$on('toastMessage', function (event, nome, mensagem) {
            var mensagem = { nome: nome, mensagem: mensagem }
            toaster.pop('note', "mensagem de " + nome, mensagem.mensagem);
        });
*/
        $scope.sendMessage = function () {
            noteService.sendMessage($scope.grupo, $scope.nome, $scope.mensagem);
            //noteService.sendToaster($scope.grupo, $scope.nome, $scope.mensagem);
            $scope.mensagem = '';
        };

        $scope.entrar = function () {
            $scope.escolheuGrupo = true;
           // alert('teste');
           
        };
    });
})()