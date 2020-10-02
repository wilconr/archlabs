/*
 FireShot - Webpage Screenshots and Annotations
 Copyright (C) 2007-2020 Evgeny Suslikov (evgeny@suslikov.ru)
*/
function detectBrowser(){var a=chrome.runtime.id;if("legfpnnmhhnhjgekmmbkilmijnjoehne"===a)return null!==navigator.appVersion.match(/OPR\/\d+\./i)?"opera":"chrome";var b=["fireshot@getfireshot.com","fireshot-pro@getfireshot.com","fireshot-beta@getfireshot.com","{0b457cAA-602d-484a-8fe7-c1d894a011ba}","{5e11ab1e-083c-11e5-a6c0-1697f925ec7b}"];return-1<["pbjmgmedeliohhbaefhlplndokcbmjio"].indexOf(a)?"opera":-1<b.indexOf(a)?"firefox":"chrome"}
var extensionBrowser=detectBrowser(),crossBrowserVars={contractId:{chrome:"com.getfireshot.api",opera:"com.getfireshot.api",firefox:"com.getfireshot.api.firefox"},nativeFilePath:{chrome:"fireshot-chrome-plugin.dat",opera:"fireshot-chrome-plugin.dat",firefox:"fireshot-chrome-plugin.dat"}},key;for(key in crossBrowserVars)crossBrowserVars[key]=crossBrowserVars[key][extensionBrowser];
