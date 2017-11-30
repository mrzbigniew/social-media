(function () {
    'use strict'

    angular.module('app').controller('PostsCtrl', [
        '$scope', 'PostsSvc', 
        function ($scope, PostsSvc) {
            const self = this;
            $scope.posts = [];
            $scope.post = {};

            $scope.$on('ws:new_post', function(event,post){
                $scope.$apply(function(){
                    $scope.posts.push(post);
                });
            });

            self.loadPosts = function () {
                $scope.post = {};
                PostsSvc.fetch()
                    .success(function (posts) {
                        $scope.posts = posts;
                    });
            }

            self.removePostFromList = function (post) {
                const deletedPostIndex = $scope.posts.findIndex(function (currentPost) {
                    return currentPost._id === post._id;
                });
                $scope.posts.splice(deletedPostIndex, 1);
            };

            self.successMessage = function (message) {
                $scope.message = {
                    type: 'success',
                    text: message
                }
            };

            self.warningMessage = function (message) {
                $scope.message = {
                    type: 'danger',
                    text: message
                }
            };

            self.newPost = function () {
                PostsSvc.create(
                    {
                        body: $scope.post.body
                    }
                ).success(function (post) {
                    // $scope.posts.push(post);
                    self.abort();
                    self.successMessage('Post added successfully!');

                }).error(function (res) {
                    self.warningMessage('Post not added');
                });
            };

            self.updatePost = function () {
                PostsSvc.update(
                    $scope.post._id,
                    $scope.post
                ).success(function (res) {
                    self.successMessage('Post updated successfully');
                    self.abort();
                }).error(function () {
                    self.warningMessage('Post was not updated');
                });
            };

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
                ).success(function (res) {
                    self.removePostFromList(post);
                    self.successMessage('Post deleted successfully');
                }).error(function error(res) {
                    self.warningMessage('Post wasn\'t deleted');
                });
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
