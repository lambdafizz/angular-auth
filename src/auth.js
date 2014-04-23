(function (angular) {


// lf.auth
// -------
//
// The purpose of this module is to provide an *all in one* bag of
// functionalities. Every module listed below as a dependency is
// fully functional on it's own and can be used separately, but if
// you want to bundle everything as a dependency of your app, then
// this is the thing you want.
//
// Modules include:
//
// - [lf.auth.requests](auth-requests.html) for authenticating your
//   HTTP requests in a way that is orthogonal to other application
//   logic
// - [lf.auth.routes](auth-routes.html) for easier way of defining
//   what conditions must be met for the user to be allowed navigating
//   to a particular route
// - [lf.auth.retry](auth-retry.html) for retrying failed requests.
//   This comes as a great tool if you must deal with expiring tokens
//   coming from OAuth sources etc.

angular.module('lf.auth', ['lf.auth.requests']);


})(window.angular);
