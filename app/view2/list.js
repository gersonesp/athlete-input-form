"use strict";

angular
  .module("myApp.list", ["ngRoute"])

  .config([
    "$routeProvider",
    function ($routeProvider) {
      $routeProvider.when("/list", {
        templateUrl: "view2/list.html",
        controller: "ListCtrl",
      });
    },
  ])

  .controller("ListCtrl", [
    "$scope",
    "$http",
    "$location",
    function ($scope, $http, $location) {
      $scope.editMode = { mode: false, index: null };
      $scope.updatedAthlete = {};

      $http.get("/api/athletes").then(
        (response) => {
          $scope.athleteList = response.data;
          response.data.map(
            (athlete, index) => ($scope.updatedAthlete[index] = athlete)
          );
        },
        (err) => {
          console.error(err);
        }
      );

      $scope.getForm = function (event, route) {
        event.preventDefault();
        $location.path(route);
      };

      $scope.editAthlete = function (event, index) {
        event.preventDefault();
        $scope.editMode.mode = !$scope.editMode.mode;
        $scope.editMode.mode === true
          ? ($scope.editMode.index = index)
          : ($scope.editMode.index = null);
      };

      $scope.submitChange = function (event, index) {
        event.preventDefault();
        $scope.editMode.mode = !$scope.editMode.mode;
        $scope.editMode.index = null;

        const updatedAthlete = {
          ...$scope.athleteList[index],
          ...$scope.updatedAthlete[index],
        };

        $http.put("/api/athletes", updatedAthlete);
      };
    },
  ]);
