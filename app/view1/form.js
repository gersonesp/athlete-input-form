"use strict";

angular
  .module("myApp.form", ["ngRoute"])

  .config([
    "$routeProvider",
    function ($routeProvider) {
      $routeProvider.when("/form", {
        templateUrl: "view1/form.html",
        controller: "FormCtrl",
      });
    },
  ])

  .controller("FormCtrl", [
    "$scope",
    "$location",
    "$http",
    function ($scope, $location, $http) {
      $scope.newAthlete = {};
      $scope.formHidden = false;
      $scope.summaryHidden = true;
      $scope.formHeader = "New Athlete Form";
      $scope.required = true;

      $http.get("/api/sports").then(
        (response) => {
          $scope.sportsList = response.data;
        },
        (err) => {
          console.error(err);
        }
      );

      $scope.getSummary = function (event) {
        event.preventDefault();
        $scope.formHidden = true;
        $scope.summaryHidden = false;
        $scope.formHeader = "New Athlete Summary";
      };

      $scope.backToForm = function (event) {
        event.preventDefault();
        $scope.formHidden = false;
        $scope.summaryHidden = true;
        $scope.formHeader = "New Athlete Form";
      };

      $scope.submitData = function (event, route) {
        event.preventDefault();
        $http.post("/api/athletes", {
          ...$scope.newAthlete,
          sport: $scope.selected_sport,
        });
        $location.path(route);
      };
    },
  ]);
