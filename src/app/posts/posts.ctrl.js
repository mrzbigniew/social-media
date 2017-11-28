(function () {
    'use strict'

    angular.module('app')
        .controller(
        'PostsCtrl',
        [
            '$scope', 'PostsSvc', function ($scope, PostsSvc) {
                const self = this;
                $scope.posts = [];
                $scope.post = {};

                self.loadPosts = function () {
                    $scope.post = {};
                    PostsSvc.fetch()
                        .success(function (posts) {
                            $scope.posts = posts;
                        });
                }

                function successMessage(message) {
                    $scope.message = {
                        type: 'success',
                        text: message
                    }
                };

                function warningMessage(message) {
                    $scope.message = {
                        type: 'danger',
                        text: message
                    }
                };

                self.newPost = function () {
                    PostsSvc.create(
                        {
                            username: 'zbyszek',
                            body: $scope.post.body
                        }
                    ).success(function (post) {
                        $scope.posts.push(post);
                        successMessage('Post added successfully!');

                    }).error(function (res) {
                        warningMessage('Post not added');
                    });
                }

                self.updatePost = function () {
                    PostsSvc.update(
                        $scope.post._id,
                        $scope.post
                    ).success(
                        function (res) {
                            successMessage('Post updated successfully');
                        }
                        ).error(
                        function () {
                            warningMessage('Post was not updated');
                        }
                        );
                }

                self.savePost = function () {
                    if ($scope.post._id) {
                        self.updatePost();
                    } else if ($scope.post.body) {
                        self.newPost();
                    }
                };

                self.deletePost = function (post) {
                    PostsSvc.remove(
                        post._id
                    ).success(
                        function (res) {
                            const postIndex = $scope.posts.findIndex(function (currentPost) {
                                return currentPost._id === post._id;
                            });
                            $scope.posts.splice(postIndex, 1);

                            successMessage('Post deleted successfully');
                        }
                        ).error(
                        function error(res) {
                            warningMessage('Post wasn\'t deleted');
                        }
                        );
                };

                self.editPost = function (post) {
                    $scope.post = post;
                };

                self.abort = function () {
                    $scope.post = {};
                };

                self.hideMessage = function () {
                    $scope.message = {};
                };

                self.loadPosts();
            }
        ]
        );
}());
