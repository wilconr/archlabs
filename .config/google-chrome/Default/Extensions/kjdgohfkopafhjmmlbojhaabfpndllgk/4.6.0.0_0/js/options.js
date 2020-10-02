	var  messager= vAPI.messaging.channel('options.js');
	vAPI.messager=messager

	
var autoLoginOptions = {    
    autologinXMLList: null,
	changedDomains:new Array(),
	hasPassword:true,
	validated:false,


	

	validateViewOptions:function(event){
	 
	 document.querySelector("#validatepwdstatus").innerHTML=""
	 var curpwd=document.getElementById("txtaskpassword").value;

	
	
	 
	 
	 	messager.send({action: "validateCredential",info:curpwd}, function(response) {
				
				if(response.valid){
				
					//Click menu
					autoLoginOptions.validated=true
					autoLoginOptions.menuSitesClicked("");
					
					
				
				}else{
				
						document.querySelector("#validatepwdstatus").innerHTML="* Invalid Credentials"
				
					
				
				}
				
				});
				
		
		
		
	
	},
	escapeSelector:function(domname){
		
				if(domname.indexOf(":") > 0)		  
				domname=domname.replace(":","\\:")
		
				return domname
			},
	infoChanged:function(event){
	
	
	////console.log(event.target)
	
		document.querySelector("#sitechangedstatus").innerHTML="";
	
	document.querySelector("#btnUpdate").setAttribute("class","button") ;
	
	var domname=autoLoginOptions.escapeSelector(event.target.getAttribute("data-domname"))

		var selectedoption= document.querySelector("#select"+domname).options[document.querySelector("#select"+domname).selectedIndex]
		  
		  document.querySelector("#select"+domname).setAttribute("data-changed","true")
		  

	if(document.querySelector("#select"+domname).className.indexOf("inputChanged")  == -1)
				document.querySelector("#select"+domname).className += ' inputChanged'
	
	if(event.target.getAttribute("type")=="text"){
	
		selectedoption.setAttribute("data-changed-username",event.target.value)
	
	}else if(event.target.getAttribute("type")=="password"){
		
		selectedoption.setAttribute("data-changed-password",event.target.value)
	
	
	
	}else if(event.target.getAttribute("type")=="checkbox"){
	
	if(event.target.checked)
		document.querySelector("#select"+domname).setAttribute("data-enabled","true")	  
	 else
		document.querySelector("#select"+domname).setAttribute("data-enabled","false")
	
	
	
	}
	
	},
	menuSitesClicked:function(event){
	
	//On Sites clicked
	
	document.querySelector("#navigation").style.visibility="visible"
	document.querySelector("#mnusitesparent").setAttribute("class", "current");
	document.querySelector("#mnuautologinsettingsparent").removeAttribute("class");
	document.querySelector("#mnusupportparent").removeAttribute("class");
	
	document.querySelector("#divSites").style.display="";
	document.querySelector("#divpasswordask").style.display="none";
	document.querySelector("#divpasswordchange").style.display="none";
	document.querySelector("#divsupport").style.display="none";
	
	autoLoginOptions.loadOptions();
	
	},
	changePassword:function(pwd){
	
		messager.send({module:"options",action: "addCredential",info:document.querySelector("#txtnewpassword").value}, function(response) {
					
					if(response.valid){
						
							autoLoginOptions.flashsuccess("Successfully changed Password");
								
								autoLoginOptions.viewSettings();
								
						
					}else{
						//show sites
							
								autoLoginOptions.flasherror("Error in Updating Password Password");
								document.querySelector("#txtnewpassword").focus(); 
								return;
					}
						
					
					
					});
					
	
	},
flashsuccess:function(txt){
									
									
	document.querySelector("#statusSuccess").style.visibility="visible"
	document.querySelector("#statusSuccess").innerHTML=txt;
	
	setTimeout(function() {	
	
	document.querySelector("#statusSuccess").style.visibility="hidden"
	
	}, 5000);


	},
	flasherror:function(txt){
									
									
	document.querySelector("#statusError").style.visibility="visible"
	document.querySelector("#statusError").innerHTML=txt;
	
	setTimeout(function() {	
	
	document.querySelector("#statusError").style.visibility="hidden"
	
	}, 5000);


	},
	onBtnCancelChangePasswordClicked:function(event){
	autoLoginOptions.viewSettings();
	},
	onBtnChangePasswordClicked:function(event){
	
	
	if(document.querySelector("#txtnewpassword").value != document.querySelector("#txtrepeatnewpassword").value){
	
			autoLoginOptions.flasherror("Both Passwords should be same");
			document.querySelector("#txtnewpassword").focus(); 
			return;
	
	}
	
	if(autoLoginOptions.hasPassword==true){
	
		messager.send({action: "validateCredential",info:document.querySelector("#txtoldpassword").value}, function(response) {
					
					if(response.valid){
						
						autoLoginOptions.changePassword(document.querySelector("#txtnewpassword").value)
						
					}else{
						//show sites
					autoLoginOptions.flasherror("Invalid Old Password");
								
								document.querySelector("#txtoldpassword").focus(); 
								return;
					}
						
					
					
					});
	
	
	}else{
		
		autoLoginOptions.changePassword(document.querySelector("#txtnewpassword").value)
	
	}
	// if old password is visible
	
	
	},
	menuAutologinSettingsClicked:function(event){
	
	//On Sites clicked
	

	
	
	
	document.querySelector("#navigation").style.visibility="visible"
	document.querySelector("#mnuautologinsettingsparent").setAttribute("class", "current");
	document.querySelector("#mnusitesparent").removeAttribute("class");
	document.querySelector("#mnusupportparent").removeAttribute("class");
	
	
	document.querySelector("#divSites").style.display="none";
	document.querySelector("#divpasswordask").style.display="none";
	document.querySelector("#divsupport").style.display="none";
	
	document.querySelector("#divpasswordchange").style.display="";
	autoLoginOptions.loadSettings();
	
	
	},
	showSupport:function(){
	
	//On Support clicked
	
	
	
		document.querySelector("#navigation").style.visibility="visible"
	
	document.querySelector("#mnusitesparent").removeAttribute("class");
	document.querySelector("#mnuautologinsettingsparent").removeAttribute("class");
	
	document.querySelector("#mnusupportparent").setAttribute("class", "current");
	
	
	
	document.querySelector("#divSites").style.display="none";
	document.querySelector("#divsupport").style.display="";
	document.querySelector("#divpasswordask").style.display="none";
	document.querySelector("#divpasswordchange").style.display="none";
	
	
		 
	},
	showPasswordPane:function(){
	
	//On Sites clicked
	
	
	document.querySelector("#navigation").style.visibility="hidden"
	
	
	document.querySelector("#divSites").style.display="none";
	document.querySelector("#divsupport").style.display="none";
	document.querySelector("#divpasswordask").style.display="";
	document.querySelector("#divpasswordchange").style.display="none";
	
	 document.querySelector("input#txtaskpassword").addEventListener('keypress', function(event){
		 if (event.which == 13 || event.keyCode == 13) {
            autoLoginOptions.validateViewOptions();
            return false;
        }
        return true;
		 }, false);
		 
		 
	var buttonaskPassword = document.querySelector('#btnaskpassword');
		 buttonaskPassword.addEventListener('click', autoLoginOptions.validateViewOptions, false);
		  document.querySelector("input#txtaskpassword").focus();
		 
	},
	init:function(){
		
		
		if(vAPI.supportsbasicAuth)		  
			document.querySelector("#tblbasicauth").style.visibility="visible"
		else
			document.querySelector("#tblbasicauth").style.visibility="hidden"
		
		
		autoLoginOptions.initdata();
		
	},
	initdata:function(){
	
	
				messager.send({module:"options",action: "hasCredential"}, function(response) {
				
				////console.log("option hasCredential ",response)
				if(response.valid){
				
					//Show Password panel
					autoLoginOptions.hasPassword=true;
					autoLoginOptions.validated=false;
					autoLoginOptions.showPasswordPane();
				}else{
					//show sites
					autoLoginOptions.hasPassword=false;
					autoLoginOptions.menuSitesClicked("");
				}
					
				
				
				});
				
	
	
	document.querySelector('a#mnusites').addEventListener('click', autoLoginOptions.menuSitesClicked, false);
	document.querySelector('a#mnuautologinsettings').addEventListener('click', autoLoginOptions.menuAutologinSettingsClicked, false);
	document.querySelector('a#mnusupport').addEventListener('click', autoLoginOptions.showSupport, false);
	
		
		 
	},
	 loadChangePassword: function () {
	
		
			
			
			document.querySelector("#tblchangepwd").style.display="";
			document.querySelector("#tblsettings").style.display="none";
			 
			 	document.querySelector('#btnchangepassword').addEventListener('click', autoLoginOptions.onBtnChangePasswordClicked, false);
			document.querySelector('#btncancelchangepassword').addEventListener('click', autoLoginOptions.onBtnCancelChangePasswordClicked, false);
			
			var inputtxtElements = document.querySelectorAll('#tblchangepwd .inptxt');
        for (var i = 0, inputtxtElement; inputtxtElement = inputtxtElements[i]; i++) {
            //work with element
			
            inputtxtElement.addEventListener('keypress',  function(event){
		 
		 
				  if (event.which == 13 || event.keyCode == 13) {
					autoLoginOptions.onBtnChangePasswordClicked(event)
					return false;
				}
				return true;
		 }, false);
			 
		
        }
		
		 
			 if(autoLoginOptions.hasPassword == false ){
				 
				 document.querySelector("#btnchangepassword").innerHTML="Save"
					document.querySelector("#rowoldpassword").style.display="none";
					document.querySelector("#txtnewpassword").focus(); 
					
				}else{
				
				document.querySelector("#btnchangepassword").innerHTML="Update"
				document.querySelector("#rowoldpassword").style.display="";
				document.querySelector("#txtoldpassword").focus(); 
				
				
				}
	
	 },
	 viewSettings: function () {
	  
			document.querySelector("#tblchangepwd").style.display="none";
			document.querySelector("#tblsettings").style.display="";
			
			},
	  loadSettings: function () {
	  
			document.querySelector("#tblchangepwd").style.display="none";
			document.querySelector("#tblsettings").style.display="";
			
			//on change check box
			
			document.querySelector('#btnshowchangepwd').addEventListener('click', function(){
					autoLoginOptions.loadChangePassword();
			}, false);
			
			
			
			messager.send({action: "getPromptAtStartup"}, function(response) {
				
						if(response.promptrequired == true || response.promptrequired == "true")
							document.querySelector('#chkpromptAutologin').checked=true
						else	
							document.querySelector('#chkpromptAutologin').checked=false
				
						});
						
						
		messager.send({module:"options",action: "getUseBasicAuth"}, function(response) {
				
						if(response.usebasicauth == true || response.usebasicauth == "true")
							document.querySelector('#chkpromptBasicAuth').checked=true
						else	
							document.querySelector('#chkpromptBasicAuth').checked=false
				
						});
						
			
							
			

			
							
			document.querySelector('#chkpromptBasicAuth').addEventListener('click', function(event){
					
					
					
					messager.send({module:"options",action: "updateBasicAuthHandlers",usebasicAuth:event.target.checked}, function(response) {
				
				
				
						});
					
			}, false);
			
			
			
		messager.send({module:"options",action: "getCaptureOnlyOnFocus"}, function(response) {
				
						if(response.getCaptureOnlyOnFocus == true || response.getCaptureOnlyOnFocus == "true")
							document.querySelector('#chkshowcaptureonlyonfocus').checked=true
						else	
							document.querySelector('#chkshowcaptureonlyonfocus').checked=false
				
						});
						
			
							
			

		
			
							
			document.querySelector('#chkshowcaptureonlyonfocus').addEventListener('click', function(event){
					
					
					
					messager.send({module:"options",action: "updatecaptureonlyonfocus",usecaptureonlyonfocus:event.target.checked}, function(response) {
				
				
				
						});
					
			}, false);
			
			
		
			document.querySelector('#chkpromptAutologin').addEventListener('click', function(event){
					
					
						messager.send({module:"options",action: "getCredential"}, function(response) {
							
						if(undefined == response.credential || null == response.credential ){
							if(event.target.checked == true){
								
								event.target.checked=false;
								alert("Error: Master Password is empty,Set Master Password and select again")
								
								return false;
								}
						
							}
					console.log("updatePromptAtStartup",event.target.checked)
					
								messager.send({module:"options",action: "updatePromptAtStartup",promptrequired:event.target.checked}, function(responsenew) {
									
									
								});
						
						
				
						});
						
						
					
					
					
					
					
			}, false);
			
			
			document.querySelector('#btnExport').addEventListener('click', function(){
					
					//Download from localStorage
					
					
					messager.send({module:"options",action: "getExportData"}, function(response) {
							
						
							var expdata=response.expdata
						
							var a = document.createElement('a');
							var blob = new Blob([ expdata ], {type : "text/plain;charset=UTF-8"});
							a.href = window.URL.createObjectURL(blob);
							a.download = "autologindata.bin";
							a.style.display = 'none';
							document.body.appendChild(a);
							a.click(); //this is probably the key - simulating a click on a download link
							delete a;// we don't need this anymore	
						
					
						
				
						});
						
					
					
					
			}, false);
			
			
			
						function errorHandler(domError) {
                                console.error(domError);
                                autoLoginOptions.flasherror("Invalid autologindata file ");
                            }
							
							var inprogress=false;
						var readFileUpdateUI = function(file /*, element, nameElement*/ ) {
                                var reader = new FileReader();
                                reader.onerror = errorHandler;
                                reader.onload = function(writeEvent) {
									
									if(file.name.indexOf(".bin") <0){
										
										autoLoginOptions.flasherror("Invalid autologindata file ");
										return;
									}
                                    
									
                                    var result = writeEvent.target.result;
									
									
									 var r = confirm("All the existing data will be Overridden , Press Ok to Confirm!");
									    inprogress=false;
									if (r == true) {
										txt = "You pressed OK!";
										
									} else {
										
										return;
									}
									
									
										messager.send({module:"options",action: "importdata","result":result}, function(response) {
							
											if(response.flgvalid == true ){
												autoLoginOptions.reloadStorage()	
												autoLoginOptions.flashsuccess("Successfully Imported Autologin data");

											}else{
													autoLoginOptions.flasherror("Invalid autologindata contents in file");
											
											}
									
										
								
										});
						
									
										
									
									
                                    
                                    //                                //console.log(result);
                                };
                                
                                reader.readAsText(file);
                            };
							
							
			
							var importElement = document.querySelector('#btnImport');
                            var importFileElement = document.querySelector('#fileimport');
							
                            importFileElement.addEventListener('change', function(event) {
                               // //console.log(event.target.files);
							   
                                if (event.target.files.length === 1) {
                                    readFileUpdateUI(event.target.files[0] /*, mod, modFileName*/ );
                                }
                            }, false);
                            importElement.addEventListener('click', function(event) {
								if(inprogress==false){
									inprogress=true;
									importFileElement.click();
								}
                            }, false);
							
			
			
		
			
			//remove password
			
	
	  },
	 onSelectboxchanged:function(domname){
		  
		  //get queryselector targetId
		  //set textbox values from targetids
		  //
		//  	var curattr=this.escapeSelector(inputElement.getAttribute("data-domname"))
//	console.log(domname,document.querySelector("#select"+domname))
		  var option =document.querySelector("#select"+domname).options[document.querySelector("#select"+domname).selectedIndex]
		  
		  
		  //check if its favourite ,
		  var isdefault=(option.getAttribute("data-defaultsite") == "true")
		  
		  if(isdefault)
		  {
			  //new true identified
			  
			  document.querySelector("#lnkdefault"+domname).querySelector("img").setAttribute("src","images/default-true.png")
			  
		  }else{
			    document.querySelector("#lnkdefault"+domname).querySelector("img").setAttribute("src","images/default-false.png")
			  
		  }
		  
		  var changeduser=option.getAttribute("data-changed-username")
		  var changedpwd=option.getAttribute("data-changed-password")
		  
		  if(changeduser == "")
			document.querySelector("#user"+domname).value=option.getAttribute("data-username")
		else
				document.querySelector("#user"+domname).value=changeduser
			
			if(changedpwd == "")
				document.querySelector("#pwd"+domname).value=option.getAttribute("data-password")
			else
				document.querySelector("#pwd"+domname).value=changedpwd
		  
	  },
	  
    loadOptions: function () {


	

	
	messager.send({module:"options",action: "getautologinsites"}, function(response) {
							
						autoLoginOptions.loadSiteData(response.autologinsites )
					
						
				
						});
						
						
	},
	loadSiteData: function (appsites) {
	

							
	document.querySelector('#tblOptions').style.display="";
			document.querySelector('#btnUpdate').style.display="";
				document.querySelector('#sitechangedstatus').innerHTML="";
        
		
		document.querySelector("#btnUpdate").setAttribute("class", "buttondisable");
       var tblCreated= autoLoginOptions.loadDocumentAndCreateTable(appsites);
        //tblOptions
		//Add
		if(tblCreated){
		
		//Add event listeners to remove
        var removeElements = document.querySelectorAll('a.remove');
        for (var i = 0, removeElement; removeElement = removeElements[i]; i++) {
            //work with element
            removeElement.addEventListener('click', autoLoginOptions.removeAutologin, false);

        }
		
		
		  removeElements = document.querySelectorAll('a.setdefault');
        for ( i = 0, removeElement; removeElement = removeElements[i]; i++) {
            //work with element
            removeElement.addEventListener('click', autoLoginOptions.setdefaultuser, false);

        }
		
		  removeElements = document.querySelectorAll('a.removecredential');
        for ( i = 0, removeElement; removeElement = removeElements[i]; i++) {
            //work with element
            removeElement.addEventListener('click', autoLoginOptions.removeCredential, false);

        }
		
		
		var inputElements = document.querySelectorAll('input.inp');
        for (var i = 0, inputElement; inputElement = inputElements[i]; i++) {
            //work with element
			
            inputElement.addEventListener('change', autoLoginOptions.infoChanged, false);
			//Handle keypress
			inputElement.addEventListener('keypress', function(event){
		
			 
					 var domname=autoLoginOptions.escapeSelector(this.getAttribute("data-domname"))
					
					if(document.querySelector("#select"+domname).className.indexOf("inputChanged")  == -1){
							document.querySelector("#select"+domname).className += ' inputChanged'
										
						document.querySelector("#btnUpdate").setAttribute("class","button") ;
						
						}
			
			
				 if (event.which == 13 || event.keyCode == 13) {
					 autoLoginOptions.infoChanged(event)
				   autoLoginOptions.updateAutologin()
					return false;
				}
				return true;
				 }, false);	 
		
		
        }
		
		//todo update
			var inputElements = document.querySelectorAll('select.selectbox');
        for (var i = 0, inputElement; inputElement = inputElements[i]; i++) {
            //work with element
			
		
			autoLoginOptions.onSelectboxchanged(autoLoginOptions.escapeSelector(inputElement.getAttribute("data-domname")))
			
            inputElement.addEventListener('change', function(evt){
			
			//autoLoginOptions.infoChanged

			autoLoginOptions.onSelectboxchanged(autoLoginOptions.escapeSelector(evt.target.getAttribute("data-domname")))
			
				////console.log("changed event " + evt.target.getAttribute("data-domname"))
			}, false);
			 
		
        }
		
		
		
		removeElements = document.querySelectorAll('input.modifysiteenabled');
        for (var i = 0, removeElement; removeElement = removeElements[i]; i++) {
            //work with element
            removeElement.addEventListener('click', autoLoginOptions.modifysiteenabled, false);

        }
		
		 
		 
		 
		 
		 
		 //document.querySelector("input.inp")
		
		
		 var buttonUpdate = document.querySelector('#btnUpdate');
		 buttonUpdate.addEventListener('click', autoLoginOptions.updateAutologin, false);
		
		}else{
		//remove table and buttons
		
			document.querySelector('#sitechangedstatus').innerHTML="<h3>No Sites Available for Auto Login</h3>"
			document.querySelector('#tblOptions').style.display="none";
			document.querySelector('#btnUpdate').style.display="none";
			
		}
		

    },
	
 
searchdomain:function(domainname,authtype){
		

		var docxml=autoLoginOptions.autologinXMLList;
			
		


		var sites = docxml.getElementsByTagName("site"), i=sites.length;
		  
		 if(i <=0)
		 return null;

		while (i--) {
					
				
				iurl=autoLoginOptions.getXMLElementval(sites[i],"url");
				if(vAPI.getdomainName(iurl)  == domainname &&  authtype == sites[i].getAttribute("authtype")  ){
							
							return sites[i];
							
								 
				}
								  

				}
				
				return null;

				

	},
	
setdefaultuser:function(event){


	var domname = autoLoginOptions.escapeSelector(event.target.getAttribute("data-domname"))
	
	var inputElement= document.querySelector("#select"+domname)
	 
	 var selectedoption= document.querySelector("#select"+domname).options[document.querySelector("#select"+domname).selectedIndex]
	 
	 var site={}
			
			site.authtype=inputElement.getAttribute("data-authtype")
			site.url=inputElement.getAttribute("data-url")
			site.user=selectedoption.getAttribute("data-username")
			
			
								
								
			if(selectedoption.getAttribute("data-defaultsite") == "true")
				site.defaultsite=false
			else
				site.defaultsite=true
				
			messager.send({module:"options",action: "updatedefaultcredential","site"	:site}, function(response) {
				
				autoLoginOptions.flashsuccess("Successfully Updated default  Credential");
				autoLoginOptions.loadOptions();
				
			});	
				
			
			//autoLoginOptions.reloadStorage()		
			
	 
	 return false;
},
reloadStorage:function(){
	messager.send({module:"options",action: "reloadStorage"}, function(response) {
				
				
				
						});
},
removeCredential:function(event){

	var domname = autoLoginOptions.escapeSelector(event.target.getAttribute("data-domname"))
	
	var inputElement= document.querySelector("#select"+domname)
	 
	 var selectedoption= document.querySelector("#select"+domname).options[document.querySelector("#select"+domname).selectedIndex]
	 
	 var site={}
			
			site.authtype=inputElement.getAttribute("data-authtype")
			site.url=inputElement.getAttribute("data-url")
			
			site.user=selectedoption.getAttribute("data-username")
			
			
			
			messager.send({module:"options",action: "removeCredential","site"	:site}, function(response) {
				
				autoLoginOptions.flashsuccess("Successfully removed Credential");
				autoLoginOptions.loadOptions();
			
				
			});	
			
	
			
			
			return false;
			

},

modifysiteenabled: function (event) {

	
	var domname = autoLoginOptions.escapeSelector( event.target.getAttribute("data-domname"))
	
	var inputElement= document.querySelector("#select"+domname)
	 
	 var site={}
			
			site.authtype=inputElement.getAttribute("data-authtype")
			site.url=inputElement.getAttribute("data-url")
			 site.enabled=event.target.checked
			
			
				
			messager.send({module:"options",action: "modifysiteenabled","site"	:site}, function(response) {
				
				autoLoginOptions.flashsuccess("Successfully Changed site status");
				//autoLoginOptions.loadOptions();
			
			
				
			});
			
			
			
	 
        return false;
		
		
    },

removeAutologin: function (event) {

	
	var domname = autoLoginOptions.escapeSelector(event.target.getAttribute("data-domname"))
	
	var inputElement= document.querySelector("#select"+domname)
	 
	 var site={}
			
			site.authtype=inputElement.getAttribute("data-authtype")
			site.url=inputElement.getAttribute("data-url")
			
			
				
			messager.send({module:"options",action: "removeSite","site"	:site}, function(response) {
				
				autoLoginOptions.flashsuccess("Successfully removed Site");
				autoLoginOptions.loadOptions();
			
			
				
			});
			
			
			
	 
        return false;
		
		
    },
	
	updateinputBoxStyle:function(){
	
	var inputElements = document.querySelectorAll('select.selectbox');
        for (var i = 0, inputElement; inputElement = inputElements[i]; i++) {
            //work with element
			inputElement.className=inputElement.className.replace("inputChanged" ,"")
        }
		
	
	},
	updateAutologin:function(event){
	
		if(document.querySelector("#btnUpdate").getAttribute("class") == "buttondisable" )
			return;
	
				
			var inputElements = document.querySelectorAll('select.selectbox');
			var siteenabledupdates=[]
			var sitecredentialupdates=[]
			
			for (var i = 0, inputElement; inputElement = inputElements[i]; i++) {

				if (inputElement.getAttribute("data-changed") == "true") {
					//console.log("Data changed" , inputElement)
					var site = {}

						site.authtype = inputElement.getAttribute("data-authtype")
						site.url = inputElement.getAttribute("data-url")
						site.enabled = (inputElement.getAttribute("data-enabled") == "true")
						//storage.updatesiteenabled(site)
						siteenabledupdates.push({"authtype":site.authtype,"url":site.url,"enabled":site.enabled})
						
						site.credentials = []
						
						var hasUpdated=false

						for (k = 0; k < inputElement.querySelectorAll('option').length; k++) {

							var optionElement = inputElement.querySelectorAll('option')[k]

						
								
								site.user = optionElement.getAttribute("data-username")
								site.userxpath = optionElement.getAttribute("data-userxpath")
								
								site.pwdxpath = optionElement.getAttribute("data-pwdxpath")
								site.password = optionElement.getAttribute("data-password")
								
								site.changeduser = optionElement.getAttribute("data-changed-username")
								site.changedpassword = optionElement.getAttribute("data-changed-password")
								
								 
								 
								if(site.changeduser != "" || site.changedpassword != "" ){
								
								if(site.changeduser == "")
									site.changeduser=site.user
								
								if(site.changedpassword == "")
										site.changedpassword=site.password
										
							
										//storage.updatecredential(site)
										sitecredentialupdates.push({"authtype":site.authtype,"url":site.url,"userxpath":site.userxpath,"pwdxpath":site.pwdxpath,"user":site.user,"password":site.password,"changeduser":site.changeduser,"changedpassword":site.changedpassword})
										hasUpdated=true
								}
										
								

						}
						
						
						
				}

			}


			
		//	if(1 == 1)
		//		return
		
	
	
			//autoLoginOptions.updateinputBoxStyle();
			
			//Update table
			
			
				messager.send({module:"options",action: "siteupdates","sitecredentialupdates":sitecredentialupdates,"siteenabledupdates"	:siteenabledupdates}, function(response) {
					
					
						autoLoginOptions.flashsuccess("Successfully Updated Information");
						autoLoginOptions.loadOptions();
			
					
				});
				
				
			
			
				
						
				//document.querySelector("#btnUpdate").setAttribute("class", "buttondisable");
			
			
				
		

	  return false;
	},
    getXMLElementval: function (node, elemName) {

        try {
            val = node.getElementsByTagName(elemName)[0].firstChild.nodeValue;
            return val
        } catch (exception) {
            return "";
        }
    },
    loadDocumentAndCreateTable: function (sites) {

		flgTblCreated=false;
	

	
        var dummyresp = '';


        var jsonresp = new Array();
		var urls=[];
		autoLoginOptions.cleanTable();


                i = sites.length;
           
            if (i == 0)
                return flgTblCreated;


            while (i--) {
					
	
					var cursite=sites[i]
					/*if(urls.indexOf(cursite.url) >=0){
						continue
					} */
					//urls.push(cursite.url)
                var autoLoginInfo = {};
                autoLoginInfo.url = cursite.url;
				autoLoginInfo.authtype=cursite.authtype
                autoLoginInfo.loginurl =  cursite.loginurl; 
				//var samesites=storage.get(cursite.authtype,cursite.url)
				//autoLoginInfo.sites=samesites
                autoLoginInfo.enabled = cursite.enabled;				
					autoLoginInfo.domain=vAPI.getdomainName(cursite.url);
					
					var actdomain=autoLoginInfo.domain.replace(/\./g,"_") +"_" + autoLoginInfo.authtype
					var mod_domain= actdomain
					var selectbox="<select data-authtype='"+autoLoginInfo.authtype+"' data-url='"+autoLoginInfo.url+"' data-changed='' data-enabled='"+autoLoginInfo.enabled+"' data-actualdomain='"+ mod_domain +"' data-domname='"+ mod_domain +"' style='width:180px' class='selectbox' id='select"+ mod_domain +"'>"
					
					autoLoginInfo.credentialcount=cursite.credentials.length;
					for(k=0;k<cursite.credentials.length;k++){
						
						
						
						var datainfo={}
						
						
						var elems = cursite.credentials[k].elements
					datainfo.username=cursite.credentials[k].user
					autoLoginInfo.domname=actdomain
					
					var selectedstr=""
					if(cursite.credentials[k].defaultsite)
						selectedstr="selected='selected'"
					
					
				  for( l=0;l< elems.length ;l++){
					  
					  var field=elems[l]
					 
					  if(field.type === "password"){
					  
						 datainfo.password= field.value
						  datainfo.pwdxpath= field.xpath
					 }
					 
				
					  if(field.type === "text" && datainfo.username ==   field.value)
						datainfo.userxpath= field.xpath
				  
						
					}
				

				selectbox += "<option  data-defaultsite='"+cursite.credentials[k].defaultsite+"'  data-userxpath='"+datainfo.userxpath+"' data-changed-username='' data-changed-password='' data-username='"+datainfo.username+"' data-pwdxpath='"+datainfo.pwdxpath+"' data-password='"+datainfo.password+"'  "+ selectedstr +">"+datainfo.username+"</option>"
				
				
			
					
					}
					
					selectbox +="</select>"
					autoLoginInfo.selectbox=selectbox
					
					autoLoginOptions.createRow(autoLoginInfo)				
					flgTblCreated=true;
					jsonresp.push(autoLoginInfo);
				
            }
			
			
		
		
			
			
			
			//}, false);
           

	return flgTblCreated;
    },

   

	cleanTable:function(){
	
	
			//remove all event listeners
				var el = document.querySelector("#tblOptions"),	elClone = el.cloneNode(true);
				
				el.parentNode.replaceChild(elClone, el);
			
           
 
            for (var i = document.querySelector("#tblOptions").rows.length; i > 1; i--) {
						document.querySelector("#tblOptions").deleteRow(i - 1);
					} 
            
			
			
	
	},
	createRow:function(autoLoginInfo){
	
	
			var autologinChecked=""
			if(autoLoginInfo.enabled == true){
				autologinChecked="CHECKED"
			}
			
			 var row = document.querySelector("#tblOptions").insertRow(-1);
			row.setAttribute("domainname",autoLoginInfo.domain)
			row.setAttribute("authtype",autoLoginInfo.authtype)

			var authtype="WebPage Authentication"
			var imagename="lock.png"
			if(autoLoginInfo.authtype == "basic"){
				authtype="Basic Authentication"
				imagename="shield.png"
			}
	
	var credentialcss=""
	if(autoLoginInfo.credentialcount == 1)
		credentialcss="visibility:hidden"
	
			
			var txthtml=	 "<td style='text-align:left;max-width:150px;overflow:hidden' title='"+autoLoginInfo.domain+"'>"+ autoLoginInfo.domain+"</td>"+
				"<td style='text-align:center'><img src='images/"+ imagename+"' title='"+authtype+"' class='btnDelete'/> </td>"+	
					"<td style='text-align:left'><table><tr><td>"+
					
					autoLoginInfo.selectbox +" </td><td>"+
					
					"<a  style='"+credentialcss+"' id='lnkdefault"+autoLoginInfo.domname+"'   data-domname='"+autoLoginInfo.domname+"' data-enabled='false' class='setdefault' href='#'><img  data-domname='"+autoLoginInfo.domname+"' src='images/default-false.png' title='Remove from default' class='btnDelete'/></a>" +" </td><td>"+ "<a    style='"+credentialcss+"' id='lnkremoveuser"+autoLoginInfo.domname+"' data-domname='"+autoLoginInfo.domname+"' class='removecredential' href='#'><img  data-domname='"+autoLoginInfo.domname+"' title='Remove user' src='images/remove-user.png' class='btnDelete'/></a>" +" </td></tr></table></td>"+
					"<td><input class='inp' data-domname='"+autoLoginInfo.domname+"' id='user"+autoLoginInfo.domname+"' type='text'  value=''/></td>"+
					"<td><input class='inp' data-domname='"+autoLoginInfo.domname+"' id='pwd"+autoLoginInfo.domname+"' type='password'   value=''/></td>"+	
					"<td>"+
					"<div class='smallonoffswitch'>"+
					"<input type='checkbox' data-domname='"+autoLoginInfo.domname+"'  name='chk"+autoLoginInfo.domname+"' class='modifysiteenabled smallonoffswitch-checkbox' id='chk"+autoLoginInfo.domname+"' "+autologinChecked +"> "+
					"<label class='smallonoffswitch-label' for='chk"+autoLoginInfo.domname+"'>"+
					"	<span class='smallonoffswitch-inner'></span>"+
					"	<span class='smallonoffswitch-switch'></span>"+
					"</label>"+
					"</div>"+
					//"<input class='inp' data-domname='"+autoLoginInfo.domname+"' type='checkbox' value='1' "+autologinChecked +"  />"+
					"</td>"+
					"<td> <a  data-domname='"+autoLoginInfo.domname+"' class='remove' href='#'><img  data-domname='"+autoLoginInfo.domname+"' src='images/delete.png' class='btnDelete'/></a> </td>";
					
					row.innerHTML =txthtml
	
	}

};


 
 
 





window.addEventListener('load', autoLoginOptions.init);



/*


var myString = '<div style="position:fixed;border:2px solid;border-radius:25px;background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#7abcff), color-stop(44%,#60abf8), color-stop(100%,#4096ee)); ;color:-webkit-gradient(linear, left top, left bottom, color-stop(0%,#4c4c4c), color-stop(12%,#595959), color-stop(25%,#666666), color-stop(39%,#474747), color-stop(50%,#2c2c2c), color-stop(51%,#000000), color-stop(60%,#111111), color-stop(76%,#2b2b2b), color-stop(91%,#1c1c1c), color-stop(100%,#131313));right:202px;top:0px;height:200px;width:200px">   <table id="" style="width:100%" > <tbody> <tr> <th>Enter Master Password to activate AutoLogin:</th></tr><tr> <th> <input type="password" id="txtaskpassword" /> </th> </tr><tr>   <th> <input type="button" id="btnaskpassword" value="Activate" /> </th>   </tr> </tbody> </table> </div>'

var container=document.createElement("div");
container.innerHTML=myString
document.body.appendChild(container)

*/


function dummy(){	var inputElements = document.querySelectorAll('select.selectbox');
        for (var i = 0, inputElement; inputElement = inputElements[i]; i++) {
		
			if(inputElement.getAttribute("data-changed") == "true"){
			
			var site={}
			
			site.authtype=inputElement.getAttribute("data-authtype")
			site.url=inputElement.getAttribute("data-url")
			site.enabled= (inputElement.getAttribute("data-enabled") == "true")
			site.credentials=[]
			
			for(k=0;k<inputElement.querySelectorAll('option').length;k++){
			
				var optionElement=inputElement.querySelectorAll('option')[k]
				
				var credential={}
				credential.user=optionElement.getAttribute("")
				/*
				
				"<option data-userxpath='"+datainfo.userxpath+"' data-changed-username='' data-changed-password='' data-username='"+datainfo.username+"' data-pwdxpath='"+datainfo.pwdxpath+"' data-password='"+datainfo.password+"'  "+ selectedstr +">"+datainfo.username+"</option>"
				
				*/
			
			}
			
		
		}
		}
		}
		