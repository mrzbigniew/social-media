(function () {
    angular.module('app')
        .service('WebSocketSvc', [
            '$rootScope', '$window',
            function ($rootScope, $window) {
                const protocolsMap = {
                    'https:': 'wss:',
                    'http:': 'ws:'
                };
                const connectionUrl = protocolsMap[$window.location.protocol] + '//' + $window.location.host;
                let connection;

                this.connect = function () {
                    connection = new WebSocket(connectionUrl);
                    connection.onmessage = function (e) {
                        const payload = JSON.parse(e.data);
                        $rootScope.$broadcast('ws:' + payload.topic, payload.data);
                    };
                };

                self.send = function (topic, data) {
                    var json = JSON.stringify({ topic, data });
                    connection.send(json);
                };
            }
        ])
        .run(['WebSocketSvc', function (WebSocketSvc) {
            WebSocketSvc.connect();
        }]);
}());
