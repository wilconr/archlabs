let payload =
  document.getElementById('ws_ext_auth') &&
  document.getElementById('ws_ext_auth').value

if (payload) {
  browser.runtime.sendMessage({
    type: 'autologin',
    payload,
  })
}
