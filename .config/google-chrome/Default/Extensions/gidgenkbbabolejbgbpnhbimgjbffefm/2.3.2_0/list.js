;
(function() {
function selectDevices() {
  chrome.usb.getUserSelectedDevices({
    multiple: true,
    filters: [
      {
      interfaceClass: 0xff,
      interfaceSubclass: 0x42,
      interfaceProtocol: 0x1,
      }
    ]
  }, function(devices) {
    $.each(devices, function(key, device) {
      var vidpid = device.vendorId.toString(16) + ':' + device.productId.toString(16);
      tracker.sendEvent('select-device', vidpid);

      adbServer.refreshDevice(device, function(adb) {
        if (adb) {
          tracker.sendEvent('connect-device', adb.properties['ro.product.name'], device.vendorId.toString(16) + ':' + device.productId.toString(16), vidpid);
        }
        else {

          var appName = chrome.runtime.getManifest().name;
          chrome.notifications.create("reload", {
            type: "basic",
            iconUrl: "/icon.png",
            title: appName,
            message: "An error occurred while connecting to the Android device. Restarting the Vysor app, or disconnecting and reconnecting the Android may resolve this issue.",
            buttons: [
              {
                title: "Reload"
              }
            ]
          });
        }
      });
    })
  });
}

function refreshLoginState() {
  getAuthToken(false, function(token) {
    if (token) {
      $('#login-container').hide();
      chrome.identity.getProfileUserInfo(function(data) {
        if (!data)
          return;
        $('#login-info').show();
        $('#login-email').text(data.email)
        $('#account-management').unbind('click');
        if (!_lm._md || !_lm._md.managementUrl) {
          $('#account-management').text('Retrieve License.');
          $('#account-management-info').text('Unlicensed. Already purchased?');
          $('#account-management').click(function() {
            _lm.refresh(function(result) {
              if (!result) {
                showModal({
                  hideCancel: true,
                  body: 'No license found for account ' + data.email + '. If this message was in error, please click Support for more help.<br/><br/>Wrong account? <a href="https://support.vysor.io/support/licensing/multiple/" target="_blank">Read this</a>.'
                })
              }
            }, true);
          })
          return;
        }
        $('#account-management-info').text('');
        $('#account-management').show();
        $('#account-management').text(_lm._md.managementText);
        $('#account-management').attr('href', _lm._md.managementUrl);
      });
    }
    else {
      $('#login-container').show();
    }
  })
}

chrome.identity.onSignInChanged.addListener(function() {
  refreshLoginState();
});

function refreshListWithLicense() {
  refreshLoginState();
  if (!_lm._il)
    return;
  $('#purchase').hide();
  $('#vysor-version').text('Vysor Pro Version ' + chrome.runtime.getManifest().version)
  $('.navbar-brand').text('Vysor Pro')
}
sharedGlobals._rl = refreshListWithLicense;

$(document).ready(function() {
  if (navigator.platform.toLowerCase().indexOf('win') == -1) {
    $('#windows').hide();
  }

  $("#vysor-keyboard-check").change(function() {
    chrome.storage.local.set({
      keyboard: this.checked
    })
    updateKeyboard(this.checked);
  });

  chrome.storage.local.get('keyboard', function(d) {
    $('#vysor-keyboard-check').prop('checked', d.keyboard);
  });


  $('#customize-vysor').click(libind('Customize Vysor', function() {
    chrome.app.window.create('customize.html', {
      id: 'customize',
      innerBounds: {
        width: 768,
        height: 512,
        minWidth: 768,
        minHeight: 512
      }
    }, function(w) {
      w.onClosed.addListener(function() {
      })
    });
  }));

  $('#bugreport').click(function() {
    var cancel;
    showModal({
      title: 'Bug Report',
      body: 'Creating bug report. Please wait...',
      okButton: 'Cancel',
      hideCancel: true,
      ok: function() {
        cancel = true;
      }
    })

    gistConsoleLog({
      'adb-devices.json': {
        content: JSON.stringify(lastAdbDevices, null, 2)
      }
    },
      function(url) {
      function me() {
        showModal({
          cancelButton: 'OK',
          okButton: 'Copy Bug Report',
          ok: function() {
            $('#notificationModal').modal('hide');
            copyTextToClipboard(url);
            setTimeout(me, 500);
          },
          title: 'Bug Report',
          body: 'Here is the <a href="' + url + '" target="_blank">link to your bug report</a>.<br/>Please copy the bug report link and email <a href="mailto:support@clockworkmod.com" target="_blank">support@clockworkmod.com</a> with a description of your issue.',
        })
      }
      me();
    })
  })

  $('#logging-in').hide();
  $('#login-info').hide();
  $('#login-container').hide();
  $('#connect-android').click(selectDevices);
  $('#vysor-version').text('Vysor Version ' + chrome.runtime.getManifest().version)
  $('#reload-vysor').click(function() {
    chrome.runtime.reload();
  })
  if (isElectron()) {
    $('#desktop-app').hide();

    $('#reset-vysor').click(function() {
      showModal({
        title: 'Reset Vysor',
        body: 'Resetting Vysor will log out the current user and clear all Vysor settings.',
        okButton: 'Reset',
        ok: function() {
          chrome.runtime.reset();
        }
      })
    });
  }
  else {
    $('#reset-vysor').hide();
  }

  $("#share-all-check").change(function() {
    chrome.storage.local.remove('lastDeviceFarmRegistrationId');
    chrome.storage.local.set({
      'share-all-devices': this.checked
    })

    if (this.checked) {
      startDeviceFarm(true, function(vysorShareServerUrl, err) {
        if (err) {
          shortModal("Vysor Share Server", err);
          $("#share-all-check").prop('checked', false);
          return;
        }

        updateVysorShareServer(vysorShareServerUrl);
        var appName = chrome.runtime.getManifest().name;
        shortModal("Copied " + appName + " Share Server URL to clipboard.", vysorShareServerUrl)
        copyTextToClipboard(vysorShareServerUrl);
      });
    }
    else {
      stopDeviceFarm();
    }
  });

  chrome.storage.local.get('connect-automatically', function(vals) {
    var connectAuto;
    if (vals['connect-automatically'] === false)
      connectAuto = 2;
    else if (vals['connect-automatically'] === true)
      connectAuto = 0;
    else
      connectAuto = vals['connect-automatically'] || 1;
    $("#connect-automatically-select").prop('selectedIndex', connectAuto);
  });

  $("#connect-automatically-select").change(function() {
    chrome.storage.local.set({
      'connect-automatically': this.selectedIndex
    })
  });

  $('#connect-android').hide();

  $('.purchase').click(function() {
    _lm.startPurchase();
  });

  chrome.storage.local.get('lastConnectAddress', function(d) {
    if (d.lastConnectAddress)
      $('#connect-address')[0].value = d.lastConnectAddress;
  })

  $('#connect-ok').click(function() {
    $('#connectModal').modal('hide');
    var address = $('#connect-address')[0].value;
    chrome.storage.local.set({
      'lastConnectAddress': address
    });
    Adb.sendHostCommand('host:disconnect:' + address, function(socket, data) {
      if (socket)
        socket.destroy();

      Adb.sendHostCommand('host:connect:' + address, function(socket, data) {
        if (!socket)
          return;
        console.log('adb connect result', ab2str(data));
      });
    });
  })

  chrome.storage.local.get('survey0', function(data) {
    if (data.survey0)
      $('#survey').hide();
  });

  $('#survey').click(function() {
    chrome.storage.local.set({ survey0: true });
    $('#survey').hide();
  })

  $('#connect-cancel').click(function() {
    $('#connectModal').modal('hide');
  })

  $('#connect-network').click(function() {
    $('#connectModal').modal();
  })

  $('#login').click(function() {
    $('#login-line').hide();
    $('#logging-in').show();

    getAuthToken(true, function(token) {
      if (!token) {
        shortModal(null, 'Error retrieving auth token: ' + chrome.runtime.lastError);
        $('#login-line').show();
        $('#logging-in').hide();
        return;
      }
      $('#logging-in').hide();

      refreshLoginState();
    })
  });

  populateDisplaySettings();

  function checkUsage() {
    chrome.storage.local.get(['vysorUsage'], function(d) {
      var vysorUsage = d.vysorUsage;
      if (!vysorUsage)
        vysorUsage = 0;
      var hoursUsed = vysorUsage / (60 * 60 * 1000);
      // half hour
      hoursUsed = Math.round(hoursUsed * 2) / 2;
      console.log('hours used', hoursUsed);
      $('#used').html("You've used Vysor for " + hoursUsed + " hours.<br/>An advertisement will be shown every 15 minutes while viewing an Android.<br/><br/>Purchase Vysor Pro to remove ads and unlock all features.")
    });

    setTimeout(checkUsage, 60 * 60 * 1000)
  }

  refreshListWithLicense();
  checkUsage();

  if (window.tracker)
    tracker.sendAppView('list');
});


function libind(feature, f, fb) {
  return function() {
    if (!_lm._il) {
      showModal({
        title: 'Vysor Pro',
        body: 'The ' + feature + ' feature is only avaiable to Vysor Pro users.',
        okButton: 'Upgrade',
        ok: function() {
          _lm.startPurchase();
        }
      })
      if (fb)
        fb.apply(this, arguments);
      return;
    }
    f.apply(this, arguments);
  };
}

function openDeviceSettings(serialno, deviceName) {
  var existing = chrome.app.window.get(serialno);
  if (existing && existing.contentWindow.showSettings) {
    existing.contentWindow.showSettings();
    existing.show();
    return;
  }

  loadDeviceSettings(serialno, function(deviceSettings) {
    var ok = $('#settings-ok');
    var cancel = $('#settings-cancel');
    var defaults = $('#settings-defaults');
    var edit = $('#new-display-name');
    edit.prop('value', deviceSettings.friendlyName);
    edit.prop('placeholder', deviceName);

    defaults.unbind('click');
    ok.unbind('click');
    cancel.unbind('click');
    $(edit).unbind('focus');
    $(edit).unbind('keypress');
    $(edit).bind("keypress", function(e) {
      var key = e.which;
      if(key == 13) {
        commit();
        return false;
      }
    });

    function commit() {
      $('#settings-modal').modal('hide');
      var newName = $(edit).prop('value');
      deviceSettings.friendlyName = newName;
      updateDeviceName(serialno, deviceSettings.friendlyName || deviceName);
      saveDeviceSettings(serialno, deviceSettings);
    }

    ok.click(commit);
    defaults.click(function() {
      deviceSettings = getDefaultDeviceSettings();
      applyDeviceSettings(deviceSettings);
    });

    var name = deviceName || friendlyName;

    $('#settings-title').text(name + ' Settings');

    $('#softkeys-check').unbind('change');
    $('#pin-title-check').unbind('change');
    $('#always-on-top-check').unbind('change');
    $('#bitrate').unbind('change');
    $('#resolution').unbind('change');

    applyDeviceSettings(deviceSettings);

    $("#softkeys-check").change(function() {
      deviceSettings.showSoftKeys = this.checked;
    });

    $('#pin-title-check').change(function() {
      deviceSettings.pinTitleBar = this.checked;
    })

    $('#always-on-top-check').change(libind('Always On Top', function() {
      deviceSettings.alwaysOnTop = this.checked;
    }, function() {
      this.checked = false;
    }));

    $('#bitrate').change(libind('Image Quality', function() {
      deviceSettings.bitrate = this.selectedIndex;
    }, function() {
      this.selectedIndex = 0;
    }));

    $('#resolution').change(libind('Image Quality', function() {
      deviceSettings.resolution = this.selectedIndex;
    }, function() {
      this.selectedIndex = 0;
    }));

    $('#decoder').change(libind('Image Quality', function() {
      deviceSettings.decoder = this.selectedIndex;
    }, function() {
      this.selectedIndex = 0;
    }));

    $('#display-settings').change(libind('Display Settings', function() {
      var displaySettings = commonDisplaySettings[this.selectedIndex];
      deviceSettings.displaySettings = displaySettings;
    }, function() {
      this.selectedIndex = 0;
    }));

    $('#dim-display').change(libind('Dim Dislay', function() {
      deviceSettings.dimDisplay = this.checked;
    }, function() {
      this.checked = false;
    }));

    $('#settings-modal').modal();
  });
}

var lastAdbDevices = {};
var lastVysorSharedDevices = {};
var lastVysorDeviceFarms = {};
function refreshList(adbDevices, vysorVirtualDevices, myUserInfo, vysorDeviceFarms, vysorSharedDevices, tcpSerialMappings, serialTcpMappings, vysorShareServer, hadAdbServer, adbServerIsRunning, adbPort) {
  lastAdbDevices = adbDevices;
  lastVysorSharedDevices = vysorSharedDevices;
  lastVysorDeviceFarms = vysorDeviceFarms;

  $("#share-all-check").prop('checked', vysorShareServer)

  if (Object.keys(adbDevices).length || !adbServerIsRunning)
    $('#not-found').hide();
  else
    $('#not-found').show();

  if (!isElectron() && (!hadAdbServer || adbServerIsRunning)) {
    $('#connect-android').show();
    $('#no-devices').hide();
  }
  else {
    $('#connect-android').hide();
    $('#no-devices').show();
  }

  if (!hadAdbServer) {
    // no adb server on windows 10 is fatal!
    if (navigator.userAgent.indexOf('Windows NT 10') != -1 && adbPort == null) {
      $('#adb-server-status').show();
      $('#adb-server-status').html("Windows 10 users MUST download the latest <a href='https://adb.clockworkmod.com' target='_blank'> Universal ADB Drivers</a>");
    }
    else {
      $('#adb-server-status').show();
      $('#adb-server-status').text('ADB not running. Click Find Devices to get started.');
    }
  }
  else {
    $('#adb-server-status').show();
    if (adbServerIsRunning) {
      $('#adb-server-status').text('Using built-in Vysor ADB.');
    }
    else {
      $('#adb-server-status').text('Using Android SDK ADB binary.');
    }
  }

  var keys = Object.keys(adbDevices);
  var farms = Object.keys(lastVysorDeviceFarms);

  $.each($('.vysor-device'), function(index, ele) {
    if (adbDevices[ele.name])
      return;
    var found;
    $.each(farms, function(index, id) {
      var farm = lastVysorDeviceFarms[id];
      if (farm.devices && farm.devices[ele.name])
        found = true;
    })
    if (!found)
      $(ele).remove();
  });


  if (!keys.length) {
    var ele = $('#devices').find('#no-vysor-devices');
    if (!ele.length) {
      ele = $('<a id="no-vysor-devices" href="https://support.vysor.io/support/technical/notfound/" target="_blank"><div class="alert alert-danger">No devices found. Make sure Android USB Debugging is enabled.</div></a>');
      $('#devices').append(ele);
    }
    if (!hadAdbServer || adbServerIsRunning) {
      $('#choose-header').hide();
      ele.hide();
    }
  }
  else {
    $('#no-vysor-devices').remove();
    $('#choose-header').show();

    $(keys).each(function(index, serialno) {
      // skip this, it is later in the list
      if (vysorVirtualDevices[serialno] && vysorVirtualDevices[serialno].farm)
        return;
      var d = adbDevices[serialno];
      var deviceName = d.name;

      var ele = $('#devices').find('.vysor-device[name="' + serialno + '"]');
      if (!ele.length) {
        ele = $('<a class="list-group-item vysor-device"><button type="button" class="btn btn-sm device-settings btn-default"><i class="fa fa-gear" title="Device Settings"></i></button><button type="button" class="btn btn-sm wireless btn-default"><i class="fa fa-wifi" title="Go Wireless"></i></button><button type="button" class="btn btn-sm share btn-default">Share</button><button type="button" class="btn btn-sm btn-success">View</button><img class="avatar img-rounded"></img><h5 class="list-group-item-heading friendly-name"></h5><p class="list-group-item-text serialno"></p></a>');
        ele[0].name = serialno;

        var share = ele.find('.share');
        var img = ele.find('img');

        img.click(function(e) {
          e.stopPropagation();
          var userInfo = lastVysorSharedDevices[serialno].userInfo;
          blobFromUrl(userInfo.picture, function(blob) {
            shortModal('Vysor Share', 'Device in use by ' + userInfo.name);
          })
        })

        ele.find('.wireless').click(libind('Go Wireless', function(e) {
          e.stopPropagation();
          startWireless(serialno);
        }, function(e) {
          e.stopPropagation();
        }));

        if (vysorVirtualDevices[serialno]) {
          $(share).removeClass('btn-default').addClass('btn-danger')
          share.text('Disconnect')
          share.click(function(e) {
            e.stopPropagation();
            disconnectSharedDevice(serialno);
          })
        }
        else {
          $(share).removeClass('btn-danger').addClass('btn-default')
          share.click(libind('Vysor Share', function(e) {
            e.stopPropagation();
            toggleShare(serialno, function(url, err) {
              if (err) {
                shortModal("Vysor Share", err);
                return;
              }
              copyTextToClipboard(url);
              var appName = chrome.runtime.getManifest().name;
              shortModal('Vysor Share', 'Copied Vysor Share URL to clipboard');
              var wirelessSerial = serialTcpMappings[serialno];
              if (wirelessSerial)
                closeWindow(wirelessSerial);
              closeWindow(serialno);
            });
          }, function(e) {
            e.stopPropagation();
          }));
        }

        $(ele).find('.device-settings').click(function(e) {
          e.stopPropagation();
          openDeviceSettings(serialno, deviceName);
        })

        ele.click(function() {
          var d = lastAdbDevices[serialno];
          if (d.status == 'unauthorized') {
            shortModal(null, 'Check your Android device and accept the "Allow USB Debugging" prompt. You may need to disconnect and reconnect your Android for the dialog to show.');
          }
          else if (d.status == 'offline') {
            shortModal(null, 'Your Android USB connection is offline. Please try rebooting your Android.');
          }
          else {
            function view() {
              tracker.sendEvent('click-device', deviceName);
              var wirelessSerial = serialTcpMappings[serialno];
              if (wirelessSerial)
                closeWindow(wirelessSerial);
              openWindow(serialno);
            }

            if (lastVysorSharedDevices[serialno]) {
              showModal({
                title: 'Android In Use',
                body: 'This Android is currently shared. Do you want to end the share session?',
                okButton: 'Unshare and View',
                ok: function() {
                  var wirelessSerial = serialTcpMappings[serialno];
                  if (wirelessSerial)
                    unshareDevice(wirelessSerial);
                  unshareDevice(serialno);
                  view();
                }
              })
              return;
            }

            view();
          }
        })

        // the shitty way to check to see if this is a tcp connect
        if (serialno.indexOf(':') != -1)
          ele.find('.wireless').hide();
        else
          ele.find('.wireless').show();

        ele.find('.serialno').text('Serial: ' + serialno);

        $('#devices').append(ele);
      }

      loadDeviceSettings(serialno, function(deviceSettings) {
        var display = deviceSettings.friendlyName || deviceName;
        if (d.status == 'unauthorized')
          display = 'Unauthorized';
        if (d.status == 'offline')
          display = 'Offline';
        updateDeviceName(serialno, display);
      })

      var usb = tcpSerialMappings[serialno];
      if (usb && adbDevices[usb])
        ele.hide();
      else
        ele.show();

      var share = ele.find('.share');
      var img = ele.find('img');

      if (lastVysorSharedDevices[serialno] && lastVysorSharedDevices[serialno].userInfo && lastVysorSharedDevices[serialno].userInfo.picture) {
        var userInfo = lastVysorSharedDevices[serialno].userInfo;
        img.attr('alt', 'Device in use by ' + userInfo.name)
        blobFromUrl(userInfo.picture, function(blob) {
          img.attr('src', blob);
        })
        img.show();
      }
      else {
        img.hide();
      }

      if (!vysorVirtualDevices[serialno]) {
        if (lastVysorSharedDevices[serialno])
          share.text('Unshare')
        else
          share.text('Share');
      }

      // if (!gcmSocketManager)
      //   share.hide();
      // else
      //   share.show();
    });
  }

  $.each($('.vysor-farm'), function(index, ele) {
    if (!lastVysorDeviceFarms[ele.name])
      $(ele).remove();
  });

  $(farms).each(function(index, id) {
    var llibind = libind;
    if (id == '117634581230601031713') {
      llibind = function(s, f) {
        return f;
      }
    }
    var farm = lastVysorDeviceFarms[id];
    if (!farm.devices)
      return;
    var keys = Object.keys(farm.devices);
    if (!keys.length)
      return;
    var farmList = $('#farms-list').find('#farm-list-'+ id);
    if (!farmList.length) {
      var farmEle = $("<h5 class='list-header vysor-farm'>" + farm.info.name +"'s Shared Devices <button class='btn btn-danger btn-xs' style='float: right;' type='button'>Disconnect</button></h5>");
      farmEle[0].name = id;
      $('#farms-list').append(farmEle);
      farmEle.find('button').click(function() {
        destroyDeviceFarmConnection(id);
      })
      farmList = $("<div class='vysor-farm list-group'></div>")
      farmList[0].name = id;
      farmList.attr('id', 'farm-list-' + id);
      $('#farms-list').append(farmList);
    }

    $(keys).each(function(index, serialno) {
      var d = farm.devices[serialno];
      var deviceName = d.name;
      var display = deviceName;
      var displaySerial;
      if (farm.gcmConn.gcmConns[serialno])
        displaySerial = 'Serial: ' + farm.gcmConn.gcmConns[serialno].serialno;
      else
        displaySerial = 'Remote Serial: ' + serialno;

      var ele = $('#farms-list').find('.vysor-device[name="' + serialno + '"]');
      if (!ele.length) {
        ele = $('<a class="list-group-item vysor-device"><button type="button" class="btn btn-sm device-settings btn-default"><i class="fa fa-gear" title="Device Settings"></i></button><button type="button" class="btn btn-sm connect"></button><button type="button" class="btn btn-sm btn-success">View</button><img class="avatar img-rounded"></img><h5 class="list-group-item-heading friendly-name"></h5><p class="list-group-item-text serialno"></p></a>');
        ele[0].name = serialno;

        function promptKick(cb) {
          var farm = lastVysorDeviceFarms[id];
          if (farm.sharedDevices && farm.sharedDevices[serialno] && farm.sharedDevices[serialno].userInfo) {
            if (farm.sharedDevices[serialno].userInfo.id == myUserInfo.id) {
              cb();
              return;
            }
            showModal({
              title: 'Android In Use',
              body: 'This Android is currently in use by ' + farm.sharedDevices[serialno].userInfo.name + ' (' + farm.sharedDevices[serialno].userInfo.email + '). Do you want to boot them off?',
              okButton: 'Connect Anyways',
              ok: cb
            })
          }
          else {
            cb();
          }
        }

        ele.find('.device-settings').click(function(e) {
          e.stopPropagation();
          openDeviceSettings(serialno, deviceName);
        })

        ele.find('.connect').click(llibind("Vysor Share", function(e) {
          var farm = lastVysorDeviceFarms[id];
          e.stopPropagation();
          var gcmConn = farm.gcmConn.gcmConns[serialno];
          if (gcmConn) {
            closeWindow(gcmConn.serialno);
            gcmConn.destroy();
            ele.find('.connect').text('Connect');
          }
          else {
            promptKick(function() {
              ele.find('.connect').text('Disconnect');
              createDeviceFarmConnection(id, serialno, function(serialno) {
                quietSerial(serialno)
              });
            })
          }
        }, function(e) {
          e.stopPropagation();
        }))

        ele.click(llibind("Vysor Share", function(e) {
          var farm = lastVysorDeviceFarms[id];
          promptKick(function() {
            var gcmConn = farm.gcmConn.gcmConns[serialno];
            if (gcmConn) {
              openWindow(gcmConn.serialno);
            }
            else {
              ele.find('.connect').text('Connect');
              openWindow(serialno);
              createDeviceFarmConnection(id, serialno, function(serialno) {
                openWindow(serialno);
              });
            }
          });
        }, function(e) {
          e.stopPropagation();
        }))

        var img = ele.find('img');
        img.click(function(e) {
          e.stopPropagation();
          var farm = lastVysorDeviceFarms[id];
          var userInfo = farm.sharedDevices[serialno].userInfo;
          shortModal('Vysor Share', 'Device in use by ' + userInfo.name);
        });

        loadDeviceSettings(serialno, function(deviceSettings) {
          var display = deviceSettings.friendlyName || deviceName;
          updateDeviceName(serialno, deviceSettings.friendlyName || deviceName);
        })
        ele.find('.serialno').text(displaySerial);

        farmList.append(ele);
      }


      var img = ele.find('img');
      if (farm.sharedDevices && farm.sharedDevices[serialno] && farm.sharedDevices[serialno].userInfo) {
        var userInfo = farm.sharedDevices[serialno].userInfo;
        img.attr('alt', 'Device in use by ' + userInfo.name)
        blobFromUrl(userInfo.picture, function(blob) {
          img.attr('src', blob);
        })
        img.show();
      }
      else {
        img.hide();
      }

      if (farm.gcmConn.gcmConns[serialno])
        ele.find('.connect').text('Disconnect').removeClass('btn-default').addClass('btn-danger');
      else
        ele.find('.connect').text('Connect').removeClass('btn-danger').addClass('btn-default');
    })
  });
}

chrome.notifications.onButtonClicked.addListener(function(nid, bid) {
  if (nid == 'never-start-automatically') {
    $("#connect-automatically-select").prop('selectedIndex', 2);
  }
  else if (nid.startsWith('never-start-automatically-') && bid == 1) {
    $("#connect-automatically-select").prop('selectedIndex', 2);
  }
});

sharedGlobals.refreshList = refreshList;

})();


function updateVysorShareServer(vysorShareServerUrl) {
  if (!vysorShareServerUrl) {
    $('#vysor-share-server-status').hide();
    $('#whitelist-count').hide();
  }
  else {
    $('#whitelist-count').show();
    getVysorWhitelistStatus(function(status) {
      $('#whitelist-count a').text(status)
      .click(function(e) {
        chrome.app.window.create('whitelist.html', {
          id: 'whitelist',
          innerBounds: {
            width: 768,
            height: 512,
            minWidth: 768,
            minHeight: 512
          }
        }, function(w) {
          w.onClosed.addListener(function() {
            updateVysorShareServer(vysorShareServerUrl);
          })
        });
      })
    })
    $('#vysor-share-server-status').show();
    $('#vysor-share-server-status').html('Vysor is sharing your devices: ' + '<a href="#">' + vysorShareServerUrl + '</a>');
    var ele = $('#vysor-share-server-status a');
    ele.click(function() {
      copyTextToClipboard(vysorShareServerUrl);
      var appName = chrome.runtime.getManifest().name;
      shortModal("Copied " + appName + " Share Server URL to clipboard.", vysorShareServerUrl)
    })
  }
}

function findDeviceElement(serialno) {
  return $('.vysor-device[name="' + serialno + '"]');
}

function updateDeviceName(serialno, deviceName) {
  var ele = findDeviceElement(serialno);
  if (ele)
    ele.find('.friendly-name').text(deviceName);
}

sharedGlobals.showModal = showModal;
sharedGlobals.shortModal = shortModal;
sharedGlobals.updateVysorShareServer = updateVysorShareServer;
sharedGlobals.findDeviceElement = findDeviceElement;
sharedGlobals.updateDeviceName = updateDeviceName;
