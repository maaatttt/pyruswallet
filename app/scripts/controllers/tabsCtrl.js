'use strict';
var tabsCtrl = function($scope, globalService, $translate) {
  $scope.tabNames = globalService.tabs;
  $scope.curLang = 'English';

  $scope.node = {
      'eth_mew' : {
        'name'        : 'ETH',
        'eip155'      : true,
        'chainID'     : '1',
        'tokenList'   : 'tokens-eth.js',
        'estimateGas' : true,
        'service'     : 'MyEtherWallet',
        'url'         : '',
        'port'        : ''
      },
      'etc_mew' : {
        'name'        : 'ETC',
        'eip155'      : false,
        'chainID'     : false,
        'tokenList'   : 'tokens-etc.js',
        'estimateGas' : true,
        'service'     : 'MyEtherWallet',
        'url'         : '',
        'port'        : ''
      },
      'tst_mew' : {
        'name'        : 'Ropsten',
        'eip155'      : true,
        'chainID'     : '3',
        'tokenList'   : 'tokens-rop.js',
        'estimateGas' : true,
        'service'     : 'MyEtherWallet',
        'url'         : '',
        'port'        : ''
      },
      'eth_ethscan' : {
        'name'        : 'ETH',
        'eip155'      : true,
        'chainID'     : '1',
        'tokenList'   : 'tokens-eth.js',
        'estimateGas' : false,
        'service'     : 'Etherscan.io',
        'url'         : '',
        'port'        : ''
      },
      'custom' : {
        'name'        : 'Custom',
        'eip155'      : '',
        'chainID'     : '',
        'tokenList'   : '',
        'estimateGas' : false,
        'service'     : 'Custom',
        'url'         : '',
        'port'        : ''
      }
  };
  $scope.curNodeKey = 'eth_mew';
  $scope.curNode = $scope.node.eth_mew;

  var hval = window.location.hash;

  $scope.setArrowVisibility = function() {
    setTimeout(function() {
      $scope.showLeftArrow = false;
      $scope.showRightArrow = !(document.querySelectorAll('.nav-inner')[0].clientWidth <= document.querySelectorAll('.nav-scroll')[0].clientWidth);
      $scope.$apply();
    }, 200);
  }
  $scope.setArrowVisibility();

  $scope.changeNode = function(key) {
    $scope.curNodeKey = key;
    $scope.curNode = $scope.node[key];
    $scope.dropdownNode = false;
    localStorage.setItem('curNode', JSON.stringify({
      key: key
    }));
  }
  $scope.setNodeFromStorage = function() {
    var node = localStorage.getItem('curNode');
    if (node == null) {
      $scope.changeNode($scope.curNodeKey);
    } else {
      node = JSON.parse(node);
      var key = globalFuncs.stripTags(node.key);
      $scope.changeNode(key);
    }
  }
  $scope.setNodeFromStorage();


  $scope.setTab = function(hval) {
    if (hval != '') {
      hval = hval.replace('#', '');
      for (var key in $scope.tabNames) {
        if ($scope.tabNames[key].url == hval) {
          $scope.activeTab = globalService.currentTab = $scope.tabNames[key].id;
          break;
        }
        $scope.activeTab = globalService.currentTab;
      }
    } else {
      $scope.activeTab = globalService.currentTab;
    }
  }
  $scope.setTab(hval);

  $scope.tabClick = function(id) {
    $scope.activeTab = globalService.currentTab = id;
    for (var key in $scope.tabNames) {
      if ($scope.tabNames[key].id == id) location.hash = $scope.tabNames[key].url;
    }
  }

  $scope.setLanguageVal = function(id, varName, pos) {
    $translate(id).then(function(paragraph) {
      globalFuncs[varName][pos] = paragraph;
    }, function(translationId) {
      globalFuncs[varName][pos] = translationId;
    });
  }

  $scope.setErrorMsgLanguage = function() {
    for (var i = 0; i < globalFuncs.errorMsgs.length; i++) $scope.setLanguageVal('ERROR_' + (i + 1), 'errorMsgs', i);
    for (var i = 0; i < globalFuncs.successMsgs.length; i++) $scope.setLanguageVal('SUCCESS_' + (i + 1), 'successMsgs', i);
  }

  $scope.setGethErrMsgLanguage = function() {
    globalFuncs.gethErrorMsgs = {};
    for (var s in globalFuncs.gethErrors) {
      var key = globalFuncs.gethErrors[s];
      if (key.indexOf('GETH_') === 0) {
        $scope.setLanguageVal(key, 'gethErrorMsgs', key);
      }
    }
  }

  $scope.setParityErrMsgLanguage = function() {
    globalFuncs.parityErrorMsgs = {};
    for (var s in globalFuncs.parityErrors) {
      var key = globalFuncs.parityErrors[s];
      if (key.indexOf('PARITY_') === 0) {
        $scope.setLanguageVal(key, 'parityErrorMsgs', key);
      }
    }
  }

  $scope.changeLanguage = function(key, value) {
    $translate.use(key);
    $scope.setErrorMsgLanguage();
    if (globalFuncs.getEthNodeName() == 'geth')
      $scope.setGethErrMsgLanguage();
    else
      $scope.setParityErrMsgLanguage();
    $scope.curLang = value;
    $scope.setArrowVisibility();
    $scope.dropdown = false;
    localStorage.setItem('language', JSON.stringify({
      key: key,
      value: value
    }));
  }
  $scope.setLanguageFromStorage = function() {
    var lang = localStorage.getItem('language');
    if (lang == null) return;
    lang = JSON.parse(lang);
    var key = globalFuncs.stripTags(lang.key);
    var value = globalFuncs.stripTags(lang.value);
    $scope.changeLanguage(key, value);
  }
  $scope.setLanguageFromStorage();



  $scope.setHash = function(hash) {
    location.hash = hash;
    $scope.setTab(hash);
    $scope.$apply();
  }

  $scope.scrollHoverIn = function(isLeft, val) {
    clearInterval($scope.sHoverTimer);
    $scope.sHoverTimer = setInterval(function() {
      if (isLeft) $scope.scrollLeft(val);
      else $scope.scrollRight(val);
    }, 20);
  }

  $scope.scrollHoverOut = function() {
    clearInterval($scope.sHoverTimer);
  }

  $scope.setOnScrollArrows = function() {
    var ele = document.querySelectorAll('.nav-scroll')[0];
    $scope.showLeftArrow = ele.scrollLeft > 0;
    $scope.showRightArrow = document.querySelectorAll('.nav-inner')[0].clientWidth > (ele.clientWidth + ele.scrollLeft);
    $scope.$apply();
  }

  $scope.scrollLeft = function(val) {
    var ele = document.querySelectorAll('.nav-scroll')[0];
    ele.scrollLeft -= val;
  }

  $scope.scrollRight = function(val) {
    var ele = document.querySelectorAll('.nav-scroll')[0];
    ele.scrollLeft += val;
  }

  angular.element(document.querySelectorAll('.nav-scroll')[0]).bind('scroll', $scope.setOnScrollArrows);
  globalFuncs.changeHash = $scope.setHash;

};
module.exports = tabsCtrl;
