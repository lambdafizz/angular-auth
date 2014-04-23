(function (angular) {
'use strict';

// lf.auth.requests
// ================
//
// The purpose of this module is to provide utilities for accessing
// resources that require authentication/authorization in a manner
// that is orthogonal to other parts of application logic

angular.module('lf.auth.requests', [])

    // lfAuthSrc
    // ---------
    //
    // This directive comes as a replacement for angular's `ngSrc`. Instead
    // of just blindly replacing the `src` tag of DOM element it fetches
    // the desired resource using the `$http` service, so these requests
    // can be easily authenticated using standard angular tools such as
    // request/response interceptors.

    .directive('lfAuthSrc', ['$http', '$window', function ($http, $window) {

        return {

            // ### priority
            // Priority is the same as `ngSrc`.

            priority: 99,

            // ### link function

            link: function(scope, element, attr) {

                // The default behavior of `lfAuthSrc` is to observe
                // it's value.

                attr.$observe('lfAuthSrc', function(value) {

                    // If it changes to something falsy do nothing...

                    if (!value)
                        return;

                    // But if it changes to something truthy, query the server
                    // for the resource.

                    $http.get(value, {responseType: 'blob'}).then(function (res) {

                        // On 200 class response stash the returned binary data
                        // into a blob, and set proper *data URL* of the element's
                        // `src` property

                        var b = new $window.Blob([res.data]);
                        var dataUrl = $window.URL.createObjectURL(b);
                        element.prop('src', dataUrl);
                    }, function (res) {

                        // On error responses unset element's `src` property

                        element.prop('src', undefined);
                    });
                });
            }
        };
    }]);

})(window.angular);