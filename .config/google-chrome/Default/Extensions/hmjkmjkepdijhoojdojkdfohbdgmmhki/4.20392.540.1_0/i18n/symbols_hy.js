/*

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/
var a=this||self,b=function(f,k){f=f.split(".");var e=a;f[0]in e||"undefined"==typeof e.execScript||e.execScript("var "+f[0]);for(var g;f.length&&(g=f.shift());)f.length||void 0===k?e=e[g]&&e[g]!==Object.prototype[g]?e[g]:e[g]={}:e[g]=k};var c={c:{1E3:{other:"0K"},1E4:{other:"00K"},1E5:{other:"000K"},1E6:{other:"0M"},1E7:{other:"00M"},1E8:{other:"000M"},1E9:{other:"0B"},1E10:{other:"00B"},1E11:{other:"000B"},1E12:{other:"0T"},1E13:{other:"00T"},1E14:{other:"000T"}},b:{1E3:{other:"0 thousand"},1E4:{other:"00 thousand"},1E5:{other:"000 thousand"},1E6:{other:"0 million"},1E7:{other:"00 million"},1E8:{other:"000 million"},1E9:{other:"0 billion"},1E10:{other:"00 billion"},1E11:{other:"000 billion"},1E12:{other:"0 trillion"},1E13:{other:"00 trillion"},
1E14:{other:"000 trillion"}}};
c={c:{1E3:{other:"0\u00a0\u0570\u0566\u0580"},1E4:{other:"00\u00a0\u0570\u0566\u0580"},1E5:{other:"000\u00a0\u0570\u0566\u0580"},1E6:{other:"0\u00a0\u0574\u056c\u0576"},1E7:{other:"00\u00a0\u0574\u056c\u0576"},1E8:{other:"000\u00a0\u0574\u056c\u0576"},1E9:{other:"0\u00a0\u0574\u056c\u0580\u0564"},1E10:{other:"00\u00a0\u0574\u056c\u0580\u0564"},1E11:{other:"000\u00a0\u0574\u056c\u0580\u0564"},1E12:{other:"0\u00a0\u057f\u0580\u056c\u0576"},1E13:{other:"00\u00a0\u057f\u0580\u056c\u0576"},1E14:{other:"000\u00a0\u057f\u0580\u056c\u0576"}},
b:{1E3:{other:"0 \u0570\u0561\u0566\u0561\u0580"},1E4:{other:"00 \u0570\u0561\u0566\u0561\u0580"},1E5:{other:"000 \u0570\u0561\u0566\u0561\u0580"},1E6:{other:"0 \u0574\u056b\u056c\u056b\u0578\u0576"},1E7:{other:"00 \u0574\u056b\u056c\u056b\u0578\u0576"},1E8:{other:"000 \u0574\u056b\u056c\u056b\u0578\u0576"},1E9:{other:"0 \u0574\u056b\u056c\u056b\u0561\u0580\u0564"},1E10:{other:"00 \u0574\u056b\u056c\u056b\u0561\u0580\u0564"},1E11:{other:"000 \u0574\u056b\u056c\u056b\u0561\u0580\u0564"},1E12:{other:"0 \u057f\u0580\u056b\u056c\u056b\u0578\u0576"},
1E13:{other:"00 \u057f\u0580\u056b\u056c\u056b\u0578\u0576"},1E14:{other:"000 \u057f\u0580\u056b\u056c\u056b\u0578\u0576"}}};var d={ga:"y",na:"y G",ha:"MMM y",ia:"MMMM y",oa:"MM/y",G:"MMM d",H:"MMMM dd",J:"M/d",I:"MMMM d",la:"MMM d, y",ea:"EEE, MMM d",ma:"EEE, MMM d, y",i:"d",ka:"MMM d, h:mm a zzzz"};d={ga:"y",na:"G y \u0569.",ha:"y \u0569. LLL",ia:"y \u0569\u2024 LLLL",oa:"MM.y",G:"d MMM",H:"MMMM dd",J:"dd.MM",I:"MMMM d",la:"d MMM, y \u0569.",ea:"d MMM, EEE",ma:"y \u0569. MMM d, EEE",i:"d",ka:"d MMM, HH:mm zzzz"};var h={s:["BC","AD"],o:["Before Christ","Anno Domini"],L:"JFMAMJJASOND".split(""),Y:"JFMAMJJASOND".split(""),F:"January February March April May June July August September October November December".split(" "),X:"January February March April May June July August September October November December".split(" "),U:"Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),$:"Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),da:"Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),
ba:"Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),W:"Sun Mon Tue Wed Thu Fri Sat".split(" "),aa:"Sun Mon Tue Wed Thu Fri Sat".split(" "),M:"SMTWTFS".split(""),Z:"SMTWTFS".split(""),V:["Q1","Q2","Q3","Q4"],S:["1st quarter","2nd quarter","3rd quarter","4th quarter"],a:["AM","PM"],g:["EEEE, MMMM d, y","MMMM d, y","MMM d, y","M/d/yy"],ca:["h:mm:ss a zzzz","h:mm:ss a z","h:mm:ss a","h:mm a"],h:["{1} 'at' {0}","{1} 'at' {0}","{1}, {0}","{1}, {0}"],v:6,fa:[5,6],A:5};
h={s:["\u0574.\u0569.\u0561.","\u0574.\u0569."],o:["\u0554\u0580\u056b\u057d\u057f\u0578\u057d\u056b\u0581 \u0561\u057c\u0561\u057b","\u0554\u0580\u056b\u057d\u057f\u0578\u057d\u056b\u0581 \u0570\u0565\u057f\u0578"],L:"\u0540\u0553\u0544\u0531\u0544\u0540\u0540\u0555\u054d\u0540\u0546\u0534".split(""),Y:"\u0540\u0553\u0544\u0531\u0544\u0540\u0540\u0555\u054d\u0540\u0546\u0534".split(""),F:"\u0570\u0578\u0582\u0576\u057e\u0561\u0580\u056b \u0583\u0565\u057f\u0580\u057e\u0561\u0580\u056b \u0574\u0561\u0580\u057f\u056b \u0561\u057a\u0580\u056b\u056c\u056b \u0574\u0561\u0575\u056b\u057d\u056b \u0570\u0578\u0582\u0576\u056b\u057d\u056b \u0570\u0578\u0582\u056c\u056b\u057d\u056b \u0585\u0563\u0578\u057d\u057f\u0578\u057d\u056b \u057d\u0565\u057a\u057f\u0565\u0574\u0562\u0565\u0580\u056b \u0570\u0578\u056f\u057f\u0565\u0574\u0562\u0565\u0580\u056b \u0576\u0578\u0575\u0565\u0574\u0562\u0565\u0580\u056b \u0564\u0565\u056f\u057f\u0565\u0574\u0562\u0565\u0580\u056b".split(" "),
X:"\u0570\u0578\u0582\u0576\u057e\u0561\u0580 \u0583\u0565\u057f\u0580\u057e\u0561\u0580 \u0574\u0561\u0580\u057f \u0561\u057a\u0580\u056b\u056c \u0574\u0561\u0575\u056b\u057d \u0570\u0578\u0582\u0576\u056b\u057d \u0570\u0578\u0582\u056c\u056b\u057d \u0585\u0563\u0578\u057d\u057f\u0578\u057d \u057d\u0565\u057a\u057f\u0565\u0574\u0562\u0565\u0580 \u0570\u0578\u056f\u057f\u0565\u0574\u0562\u0565\u0580 \u0576\u0578\u0575\u0565\u0574\u0562\u0565\u0580 \u0564\u0565\u056f\u057f\u0565\u0574\u0562\u0565\u0580".split(" "),
U:"\u0570\u0576\u057e \u0583\u057f\u057e \u0574\u0580\u057f \u0561\u057a\u0580 \u0574\u0575\u057d \u0570\u0576\u057d \u0570\u056c\u057d \u0585\u0563\u057d \u057d\u0565\u057a \u0570\u0578\u056f \u0576\u0578\u0575 \u0564\u0565\u056f".split(" "),$:"\u0570\u0576\u057e \u0583\u057f\u057e \u0574\u0580\u057f \u0561\u057a\u0580 \u0574\u0575\u057d \u0570\u0576\u057d \u0570\u056c\u057d \u0585\u0563\u057d \u057d\u0565\u057a \u0570\u0578\u056f \u0576\u0578\u0575 \u0564\u0565\u056f".split(" "),da:"\u056f\u056b\u0580\u0561\u056f\u056b \u0565\u0580\u056f\u0578\u0582\u0577\u0561\u0562\u0569\u056b \u0565\u0580\u0565\u0584\u0577\u0561\u0562\u0569\u056b \u0579\u0578\u0580\u0565\u0584\u0577\u0561\u0562\u0569\u056b \u0570\u056b\u0576\u0563\u0577\u0561\u0562\u0569\u056b \u0578\u0582\u0580\u0562\u0561\u0569 \u0577\u0561\u0562\u0561\u0569".split(" "),
ba:"\u056f\u056b\u0580\u0561\u056f\u056b \u0565\u0580\u056f\u0578\u0582\u0577\u0561\u0562\u0569\u056b \u0565\u0580\u0565\u0584\u0577\u0561\u0562\u0569\u056b \u0579\u0578\u0580\u0565\u0584\u0577\u0561\u0562\u0569\u056b \u0570\u056b\u0576\u0563\u0577\u0561\u0562\u0569\u056b \u0578\u0582\u0580\u0562\u0561\u0569 \u0577\u0561\u0562\u0561\u0569".split(" "),W:"\u056f\u056b\u0580 \u0565\u0580\u056f \u0565\u0580\u0584 \u0579\u0580\u0584 \u0570\u0576\u0563 \u0578\u0582\u0580 \u0577\u0562\u0569".split(" "),
aa:"\u056f\u056b\u0580 \u0565\u0580\u056f \u0565\u0580\u0584 \u0579\u0580\u0584 \u0570\u0576\u0563 \u0578\u0582\u0580 \u0577\u0562\u0569".split(" "),M:"\u053f\u0535\u0535\u0549\u0540\u0548\u0547".split(""),Z:"\u053f\u0535\u0535\u0549\u0540\u0548\u0547".split(""),V:["1-\u056b\u0576 \u0565\u057c\u0574\u057d.","2-\u0580\u0564 \u0565\u057c\u0574\u057d.","3-\u0580\u0564 \u0565\u057c\u0574\u057d.","4-\u0580\u0564 \u0565\u057c\u0574\u057d."],S:["1-\u056b\u0576 \u0565\u057c\u0561\u0574\u057d\u0575\u0561\u056f",
"2-\u0580\u0564 \u0565\u057c\u0561\u0574\u057d\u0575\u0561\u056f","3-\u0580\u0564 \u0565\u057c\u0561\u0574\u057d\u0575\u0561\u056f","4-\u0580\u0564 \u0565\u057c\u0561\u0574\u057d\u0575\u0561\u056f"],a:["AM","PM"],g:["y \u0569. MMMM d, EEEE","dd MMMM, y \u0569.","dd MMM, y \u0569.","dd.MM.yy"],ca:["HH:mm:ss zzzz","HH:mm:ss z","HH:mm:ss","HH:mm"],h:["{1}, {0}","{1}, {0}","{1}, {0}","{1}, {0}"],v:0,fa:[5,6],A:6};var l={l:".",B:",",N:"%",ja:"0",R:"+",D:"-",u:"E",P:"\u2030",C:"\u221e",K:"NaN",j:"#,##0.###",T:"#E0",O:"#,##0%",f:"\u00a4#,##0.00",m:"USD"};l={l:",",B:"\u00a0",N:"%",ja:"0",R:"+",D:"-",u:"E",P:"\u2030",C:"\u221e",K:"\u0548\u0579\u0539",j:"#,##0.###",T:"#E0",O:"#,##0%",f:"#,##0.00\u00a0\u00a4",m:"AMD"};b("I18N_DATETIMESYMBOLS_ERAS",h.s);b("I18N_DATETIMESYMBOLS_ERANAMES",h.o);b("I18N_DATETIMESYMBOLS_NARROWMONTHS",h.L);b("I18N_DATETIMESYMBOLS_STANDALONENARROWMONTHS",h.Y);b("I18N_DATETIMESYMBOLS_MONTHS",h.F);b("I18N_DATETIMESYMBOLS_STANDALONEMONTHS",h.X);b("I18N_DATETIMESYMBOLS_SHORTMONTHS",h.U);b("I18N_DATETIMESYMBOLS_STANDALONESHORTMONTHS",h.$);b("I18N_DATETIMESYMBOLS_WEEKDAYS",h.da);b("I18N_DATETIMESYMBOLS_STANDALONEWEEKDAYS",h.ba);b("I18N_DATETIMESYMBOLS_SHORTWEEKDAYS",h.W);
b("I18N_DATETIMESYMBOLS_STANDALONESHORTWEEKDAYS",h.aa);b("I18N_DATETIMESYMBOLS_NARROWWEEKDAYS",h.M);b("I18N_DATETIMESYMBOLS_STANDALONENARROWWEEKDAYS",h.Z);b("I18N_DATETIMESYMBOLS_SHORTQUARTERS",h.V);b("I18N_DATETIMESYMBOLS_QUARTERS",h.S);b("I18N_DATETIMESYMBOLS_AMPMS",h.a);b("I18N_DATETIMESYMBOLS_DATEFORMATS",h.g);b("I18N_DATETIMESYMBOLS_TIMEFORMATS",h.ca);b("I18N_DATETIMESYMBOLS_DATETIMEFORMATS",h.h);b("I18N_DATETIMESYMBOLS_FIRSTDAYOFWEEK",h.v);b("I18N_DATETIMESYMBOLS_WEEKENDRANGE",h.fa);
b("I18N_DATETIMESYMBOLS_FIRSTWEEKCUTOFFDAY",h.A);b("I18N_DATETIMEPATTERNS_YEAR_FULL",d.ga);b("I18N_DATETIMEPATTERNS_YEAR_MONTH_ABBR",d.ha);b("I18N_DATETIMEPATTERNS_YEAR_MONTH_FULL",d.ia);b("I18N_DATETIMEPATTERNS_MONTH_DAY_ABBR",d.G);b("I18N_DATETIMEPATTERNS_MONTH_DAY_FULL",d.H);b("I18N_DATETIMEPATTERNS_MONTH_DAY_SHORT",d.J);b("I18N_DATETIMEPATTERNS_MONTH_DAY_MEDIUM",d.I);b("I18N_DATETIMEPATTERNS_WEEKDAY_MONTH_DAY_MEDIUM",d.ea);b("I18N_DATETIMEPATTERNS_DAY_ABBR",d.i);
void 0!==h.pa&&b("I18N_DATETIMESYMBOLS_ZERODIGIT",h.pa);b("I18N_NUMBERFORMATSYMBOLS_DECIMAL_SEP",l.l);b("I18N_NUMBERFORMATSYMBOLS_GROUP_SEP",l.B);b("I18N_NUMBERFORMATSYMBOLS_PERCENT",l.N);b("I18N_NUMBERFORMATSYMBOLS_ZERO_DIGIT",l.ja);b("I18N_NUMBERFORMATSYMBOLS_PLUS_SIGN",l.R);b("I18N_NUMBERFORMATSYMBOLS_MINUS_SIGN",l.D);b("I18N_NUMBERFORMATSYMBOLS_EXP_SYMBOL",l.u);b("I18N_NUMBERFORMATSYMBOLS_PERMILL",l.P);b("I18N_NUMBERFORMATSYMBOLS_INFINITY",l.C);b("I18N_NUMBERFORMATSYMBOLS_NAN",l.K);
b("I18N_NUMBERFORMATSYMBOLS_DECIMAL_PATTERN",l.j);b("I18N_NUMBERFORMATSYMBOLS_SCIENTIFIC_PATTERN",l.T);b("I18N_NUMBERFORMATSYMBOLS_PERCENT_PATTERN",l.O);b("I18N_NUMBERFORMATSYMBOLS_CURRENCY_PATTERN",l.f);b("I18N_NUMBERFORMATSYMBOLS_DEF_CURRENCY_CODE",l.m);b("I18N_COMPACT_DECIMAL_SHORT_PATTERN",c.c);b("I18N_COMPACT_DECIMAL_LONG_PATTERN",c.b);
