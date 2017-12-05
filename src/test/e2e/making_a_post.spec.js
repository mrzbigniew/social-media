'use strict'

const chai = require('chai');
chai.use(require('chai-as-promised'))

const expect = chai.expect;

describe('Create post', function () {
    it('Log in and create new post', function () {
        // Open page
        browser.get('http://localhost:3000/');

        // Open log in page
        element(by.css('nav .login')).click();

        // Put login and password and send form
        element(by.model('username')).sendKeys('zbyszek');
        element(by.model('password')).sendKeys('zbyszek');
        element(by.css('input[type="submit"]')).click();


        const post = "New post";
        const postsList = element.all(by.css('ul.list-group li'));
        const postsCount = postsList.count();

        // Add new post
        element(by.model('post.body')).sendKeys(post);
        element(by.css('form .btn-default')).click();
        const postsAfterAdd = element.all(by.css('ul.list-group li'));
        const postsCountAfterAdd = postsAfterAdd.count();
        expect(postsCountAfterAdd).to.not.eventually.equal(postsCount);

        // User should see his new post
        element.all(by.css('ul.list-group li span')).first().getText().then(function (text) {
            expect(text).to.contain(post);
        });

    });
});