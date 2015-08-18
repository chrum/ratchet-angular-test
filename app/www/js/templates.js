(function(module) {
try {
  module = angular.module('templatesModule');
} catch (e) {
  module = angular.module('templatesModule', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('userModule/loginPage.html',
    '<div><md-content md-theme=docs-dark layout-padding layout=row layout-sm=column><md-input-container><label>Username</label> <input ng-model=user.username></md-input-container><md-input-container><label>Password</label> <input ng-model=user.password type=password></md-input-container></md-content><md-button class="md-raised md-primary" ng-click=login()>Primary</md-button></div>');
}]);
})();
