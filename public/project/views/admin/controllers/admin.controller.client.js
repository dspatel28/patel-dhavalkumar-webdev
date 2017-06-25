(function () {
    angular
        .module('OFM')
        .controller('adminController', adminController);

    function adminController(userService,
                                  currentUser) {

        var model = this;
        model.userId = currentUser._id;

        function init() {
            renderUser(currentUser);
        }

        init();

        model.updateUser = updateUser;
        model.logout = logout;

        function updateUser(user) {
            userService
                .updateUser(user._id, user)
                .then(function () {
                    model.message = 'User profile updated successfully.';
                })
        }

        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url('/login');
                });
        }

        function renderUser (user) {
            user.dob = new Date(user.dob);
            model.user = user;
        }

        function userError(error) {
            model.error = "User not found.";
        }
    }
})();