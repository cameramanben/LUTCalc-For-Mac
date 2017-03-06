/* lutinfobox.js
* LUTCalc / Gamma / Gamut information UI objects for the LUTCalc Web App.
* 7th October 2014
*
* LUTCalc generates 1D and 3D Lookup Tables (LUTs) for video cameras that shoot log gammas, 
* principally the Sony CineAlta line.
*
* By Ben Turley, http://turley.tv
* First License: GPLv2
* Github: https://github.com/cameramanben/LUTCalc
*/
function LUTInfoBox(fieldset,inputs,messages) {
	this.box = document.createElement('fieldset');
	this.inputs = inputs;
	this.messages = messages;
	this.p = 6;
	this.messages.addUI(this.p,this);
	this.build();
	fieldset.appendChild(this.box);
	lutcalcReady(this.p);
}
LUTInfoBox.prototype.build = function() {
 this.io();
 this.ui();
};
LUTInfoBox.prototype.io = function() {
	this.instructionsBut = document.createElement('input');
	this.instructionsBut.setAttribute('type','button');
	this.instructionsBut.value = 'Instructions';
	this.gammaInfoBut = document.createElement('input');
	this.gammaInfoBut.setAttribute('type','button');
	this.gammaInfoBut.value = 'Tables';
	this.gammaChartBut = document.createElement('input');
	this.gammaChartBut.setAttribute('type','button');
	this.gammaChartBut.value = 'Charts';
	this.gammaPrintBut = document.createElement('input');
	this.gammaPrintBut.setAttribute('type','button');
	this.gammaPrintBut.value = 'Print Chart';
	this.printBox = document.getElementById('printable');
	this.printTitle = document.createElement('h1');
	this.printBox.appendChild(this.printTitle);
	this.printDetails = document.createElement('p');
	this.printBox.appendChild(this.printDetails);
};
LUTInfoBox.prototype.ui = function() {
	this.instructionsBox = document.createElement('div');
	this.instructions();
	this.instructionsBox.style.display = 'none';
	this.gammaInfoBox = document.createElement('div');
	this.gammaInfo();
	this.gammaInfoBox.style.display = 'none';
	this.gammaChartBox = document.createElement('div');
	this.gammaChart();
	this.gammaChartBox.style.display = 'block';
	this.box.appendChild(this.instructionsBut);
	this.box.appendChild(this.gammaInfoBut);
	this.box.appendChild(this.gammaChartBut);
	this.box.appendChild(this.gammaPrintBut);
	this.box.appendChild(this.instructionsBox);
	this.box.appendChild(this.gammaInfoBox);
	this.box.appendChild(this.gammaChartBox);
	this.printChartBox = document.createElement('div');
	this.printBox.appendChild(this.printChartBox);
};
LUTInfoBox.prototype.events = function() {
	this.insMainCam.onclick = function(here){ return function(){ here.showCamInfo(); };}(this);
	this.insCamBack.onclick = function(here){ return function(){ here.showMainscreen(); };}(this);
	this.insMainGam.onclick = function(here){ return function(){ here.showGamInfo(); };}(this);
	this.insGamBack.onclick = function(here){ return function(){ here.showMainscreen(); };}(this);
	this.insMainTwk.onclick = function(here){ return function(){ here.showCustscreen(); };}(this);
	this.insCustBack.onclick = function(here){ return function(){ here.showMainscreen(); };}(this);
	this.insMainLut.onclick = function(here){ return function(){ here.showLutInfo(); };}(this);
	this.insLutBack.onclick = function(here){ return function(){ here.showMainscreen(); };}(this);
	this.insMainPre.onclick = function(here){ return function(){ here.showPreInfo(); };}(this);
	this.insPreBack.onclick = function(here){ return function(){ here.showMainscreen(); };}(this);
	this.insMainGen.onclick = function(here){ return function(){ here.showGenInfo(); };}(this);
	this.insGenBack.onclick = function(here){ return function(){ here.showMainscreen(); };}(this);
	this.insMainGst.onclick = function(here){ return function(){ here.showGstInfo(); };}(this);
	this.insGstBack.onclick = function(here){ return function(){ here.showMainscreen(); };}(this);
	this.insMainSet.onclick = function(here){ return function(){ here.showSetInfo(); };}(this);
	this.insSetBack.onclick = function(here){ return function(){ here.showMainscreen(); };}(this);
	this.insMainInf.onclick = function(here){ return function(){ here.showInfInfo(); };}(this);
	this.insInfBack.onclick = function(here){ return function(){ here.showMainscreen(); };}(this);
	this.insCustHG.onclick = function(here){ return function(){ here.showCustHGInfo(); };}(this);
	this.insCustWht.onclick = function(here){ return function(){ here.showCustWhtInfo(); };}(this);
	this.custColourBack.onclick = function(here){ return function(){ here.showCustscreen(); };}(this);
	this.insCustColour.onclick = function(here){ return function(){ here.showCustColourInfo(); };}(this);
	this.custWhtBack.onclick = function(here){ return function(){ here.showCustscreen(); };}(this);
	this.custHGBack.onclick = function(here){ return function(){ here.showCustscreen(); };}(this);
	this.insCustKnee.onclick = function(here){ return function(){ here.showCustKneeInfo(); };}(this);
	this.custKneeBack.onclick = function(here){ return function(){ here.showCustscreen(); };}(this);
	this.insCustBhi.onclick = function(here){ return function(){ here.showCustBhiInfo(); };}(this);
	this.custBhiBack.onclick = function(here){ return function(){ here.showCustscreen(); };}(this);
	this.insCustBgm.onclick = function(here){ return function(){ here.showCustBgmInfo(); };}(this);
	this.custGlimBack.onclick = function(here){ return function(){ here.showCustscreen(); };}(this);
	this.insCustGlim.onclick = function(here){ return function(){ here.showCustGlimInfo(); };}(this);
	this.custBgmBack.onclick = function(here){ return function(){ here.showCustscreen(); };}(this);
	this.insCustPsst.onclick = function(here){ return function(){ here.showCustPsstInfo(); };}(this);
	this.custPsstBack.onclick = function(here){ return function(){ here.showCustscreen(); };}(this);
	this.insCustASC.onclick = function(here){ return function(){ here.showCustASCInfo(); };}(this);
	this.custASCBack.onclick = function(here){ return function(){ here.showCustscreen(); };}(this);
	this.insCustMulti.onclick = function(here){ return function(){ here.showCustMultiInfo(); };}(this);
	this.custMultiBack.onclick = function(here){ return function(){ here.showCustscreen(); };}(this);
	this.insCustFC.onclick = function(here){ return function(){ here.showCustFCInfo(); };}(this);
	this.custFCBack.onclick = function(here){ return function(){ here.showCustscreen(); };}(this);
	this.insCustSamp.onclick = function(here){ return function(){ here.showCustSampInfo(); };}(this);
	this.custSampBack.onclick = function(here){ return function(){ here.showCustscreen(); };}(this);
	this.insCustLA.onclick = function(here){ return function(){ here.showCustLAInfo(); };}(this);
	this.custLABack.onclick = function(here){ return function(){ here.showCustscreen(); };}(this);
	this.instructionsBut.onclick = function(here){ return function(){
		here.instructionsOpt();
	};}(this);
	this.chartType[0].onchange = function(here){ return function(){
		here.changeChart();
	};}(this);
	this.chartType[1].onchange = function(here){ return function(){
		here.changeChart();
	};}(this);
	this.chartType[2].onchange = function(here){ return function(){
		here.changeChart();
	};}(this);
	this.gammaInfoBut.onclick = function(here){ return function(){
		here.gammaInfoOpt();
	};}(this);
	this.gammaChartBut.onclick = function(here){ return function(){
		here.gammaChartOpt();
	};}(this);
	this.gammaPrintBut.onclick = function(here){ return function(){
		here.gammaPrint();
	};}(this);
};
// Construct the UI Box
LUTInfoBox.prototype.instructions = function() {
	this.instructionsBox.setAttribute('class','graybox infobox');
	this.createMainscreen();
	this.instructionsBox.appendChild(this.mainscreen);
	this.createCamInfo();
	this.instructionsBox.appendChild(this.insCam);
	this.createGamInfo();
	this.instructionsBox.appendChild(this.insGam);
	this.createTwkInfo();
	this.instructionsBox.appendChild(this.insTwk);
	this.createLutInfo();
	this.instructionsBox.appendChild(this.insLut);
	this.createPreInfo();
	this.instructionsBox.appendChild(this.insPre);
	this.createGenInfo();
	this.instructionsBox.appendChild(this.insGen);
	this.createGstInfo();
	this.instructionsBox.appendChild(this.insGst);
	this.createSetInfo();
	this.instructionsBox.appendChild(this.insSet);
	this.createInfInfo();
	this.instructionsBox.appendChild(this.insInf);
	this.createCustColour();
	this.instructionsBox.appendChild(this.custColour);
	this.createCustWht();
	this.instructionsBox.appendChild(this.custWht);
	this.createCustPsst();
	this.instructionsBox.appendChild(this.custPsst);
	this.createCustASC();
	this.instructionsBox.appendChild(this.custASC);
	this.createCustMulti();
	this.instructionsBox.appendChild(this.custMulti);
	this.createCustHG();
	this.instructionsBox.appendChild(this.custHG);
	this.createCustKnee();
	this.instructionsBox.appendChild(this.custKnee);
	this.createCustBhi();
	this.instructionsBox.appendChild(this.custBhi);
	this.createCustBgm();
	this.instructionsBox.appendChild(this.custBgm);
	this.createCustGlim();
	this.instructionsBox.appendChild(this.custGlim);
	this.createCustFC();
	this.instructionsBox.appendChild(this.custFC);
	this.createCustSamp();
	this.instructionsBox.appendChild(this.custSamp);
	this.createCustLA();
	this.instructionsBox.appendChild(this.custLA);
};
LUTInfoBox.prototype.showMainscreen = function() {
	this.hideAll();
	this.mainscreen.style.display = 'block';
};
LUTInfoBox.prototype.showCamInfo = function() {
	this.hideAll();
	this.insCam.style.display = 'block';
};
LUTInfoBox.prototype.showGamInfo = function() {
	this.hideAll();
	this.insGam.style.display = 'block';
};
LUTInfoBox.prototype.showCustscreen = function() {
	this.hideAll();
	this.insTwk.style.display = 'block';
};
LUTInfoBox.prototype.showLutInfo = function() {
	this.hideAll();
	this.insLut.style.display = 'block';
};
LUTInfoBox.prototype.showPreInfo = function() {
	this.hideAll();
	this.insPre.style.display = 'block';
};
LUTInfoBox.prototype.showGenInfo = function() {
	this.hideAll();
	this.insGen.style.display = 'block';
};
LUTInfoBox.prototype.showGstInfo = function() {
	this.hideAll();
	this.insGst.style.display = 'block';
};
LUTInfoBox.prototype.showSetInfo = function() {
	this.hideAll();
	this.insSet.style.display = 'block';
};
LUTInfoBox.prototype.showInfInfo = function() {
	this.hideAll();
	this.insInf.style.display = 'block';
};
LUTInfoBox.prototype.showCustColourInfo = function() {
	this.hideAll();
	this.custColour.style.display = 'block';
};
LUTInfoBox.prototype.showCustWhtInfo = function() {
	this.hideAll();
	this.custWht.style.display = 'block';
};
LUTInfoBox.prototype.showCustPsstInfo = function() {
	this.hideAll();
	this.custPsst.style.display = 'block';
};
LUTInfoBox.prototype.showCustASCInfo = function() {
	this.hideAll();
	this.custASC.style.display = 'block';
};
LUTInfoBox.prototype.showCustMultiInfo = function() {
	this.hideAll();
	this.custMulti.style.display = 'block';
};
LUTInfoBox.prototype.showCustHGInfo = function() {
	this.hideAll();
	this.custHG.style.display = 'block';
};
LUTInfoBox.prototype.showCustKneeInfo = function() {
	this.hideAll();
	this.custKnee.style.display = 'block';
};
LUTInfoBox.prototype.showCustBhiInfo = function() {
	this.hideAll();
	this.custBhi.style.display = 'block';
};
LUTInfoBox.prototype.showCustBgmInfo = function() {
	this.hideAll();
	this.custBgm.style.display = 'block';
};
LUTInfoBox.prototype.showCustGlimInfo = function() {
	this.hideAll();
	this.custGlim.style.display = 'block';
};
LUTInfoBox.prototype.showCustFCInfo = function() {
	this.hideAll();
	this.custFC.style.display = 'block';
};
LUTInfoBox.prototype.showCustSampInfo = function() {
	this.hideAll();
	this.custSamp.style.display = 'block';
};
LUTInfoBox.prototype.showCustLAInfo = function() {
	this.hideAll();
	this.custLA.style.display = 'block';
};
LUTInfoBox.prototype.hideAll = function() {
	this.mainscreen.style.display = 'none';
	this.insCam.style.display = 'none';
	this.insGam.style.display = 'none';
	this.insTwk.style.display = 'none';
	this.insLut.style.display = 'none';
	this.insPre.style.display = 'none';
	this.insGen.style.display = 'none';
	this.insGst.style.display = 'none';
	this.insSet.style.display = 'none';
	this.insInf.style.display = 'none';
	this.custColour.style.display = 'none';
	this.custWht.style.display = 'none';
	this.custPsst.style.display = 'none';
	this.custASC.style.display = 'none';
	this.custMulti.style.display = 'none';
	this.custHG.style.display = 'none';
	this.custKnee.style.display = 'none';
	this.custBhi.style.display = 'none';
	this.custBgm.style.display = 'none';
	this.custGlim.style.display = 'none';
	this.custFC.style.display = 'none';
	this.custSamp.style.display = 'none';
	this.custLA.style.display = 'none';
};
LUTInfoBox.prototype.createMainscreen = function() {
	this.mainscreen = document.createElement('div');
	this.mainscreen.setAttribute('class','imagemap');
	this.mainscreen.setAttribute('id','ins-mainscreen');
	var click = document.createElement('p');
	click.appendChild(document.createTextNode('Click an area for information:'));
	this.mainscreen.appendChild(click);
	var header = document.createElement('div');
	header.setAttribute('class','imagemapimg');	
	header.setAttribute('id','ins-main-header');	
	this.mainscreen.appendChild(header);
	var left = document.createElement('div');
	left.setAttribute('id','ins-main-left');
	this.insMainCam = document.createElement('div');
	this.insMainCam.setAttribute('class','ins-main');
	this.insMainCam.setAttribute('id','ins-main-cam');
	left.appendChild(this.insMainCam);
	this.insMainGam = document.createElement('div');
	this.insMainGam.setAttribute('class','ins-main');
	this.insMainGam.setAttribute('id','ins-main-gam');
	left.appendChild(this.insMainGam);
	this.insMainTwk = document.createElement('div');
	this.insMainTwk.setAttribute('class','ins-main');
	this.insMainTwk.setAttribute('id','ins-main-twk');
	left.appendChild(this.insMainTwk);
	var spacer = document.createElement('div');
	spacer.setAttribute('class','imagemapimg');
	spacer.setAttribute('id','ins-main-spacer');	
	left.appendChild(spacer);
	this.mainscreen.appendChild(left);
	var right = document.createElement('div');
	right.setAttribute('id','ins-main-right');
	this.insMainLut = document.createElement('div');
	this.insMainLut.setAttribute('class','ins-main');
	this.insMainLut.setAttribute('id','ins-main-lut');
	right.appendChild(this.insMainLut);
	var buttons = document.createElement('div');
	buttons.setAttribute('id','ins-main-buttons');
	this.insMainPre = document.createElement('div');
	this.insMainPre.setAttribute('class','ins-main-but');
	this.insMainPre.setAttribute('id','ins-main-pre');
	buttons.appendChild(this.insMainPre);
	this.insMainGen = document.createElement('div');
	this.insMainGen.setAttribute('class','ins-main-but');
	this.insMainGen.setAttribute('id','ins-main-gen');
	buttons.appendChild(this.insMainGen);
	this.insMainGst = document.createElement('div');
	this.insMainGst.setAttribute('class','ins-main-but');
	this.insMainGst.setAttribute('id','ins-main-gst');
	buttons.appendChild(this.insMainGst);
	this.insMainSet = document.createElement('div');
	this.insMainSet.setAttribute('class','ins-main-but');
	this.insMainSet.setAttribute('id','ins-main-set');
	buttons.appendChild(this.insMainSet);
	right.appendChild(buttons);
	this.insMainInf = document.createElement('div');
	this.insMainInf.setAttribute('class','ins-main');
	this.insMainInf.setAttribute('id','ins-main-inf');
	right.appendChild(this.insMainInf);
	this.mainscreen.appendChild(right);
	var footer = document.createElement('div');
	footer.setAttribute('class','imagemapimg');	
	footer.setAttribute('id','ins-main-footer');	
	this.mainscreen.appendChild(footer);
};
LUTInfoBox.prototype.createCamInfo = function() {
	this.insCam = document.createElement('div');
	this.insCam.setAttribute('class','instructions');
	this.insCam.setAttribute('id','ins-cam');
	this.insCamBack = document.createElement('input');
	this.insCamBack.setAttribute('type','button');
	this.insCamBack.value = 'Back';
	this.insCam.appendChild(this.insCamBack);
	this.insCamInfo = document.createElement('div');
	this.insCamInfo.setAttribute('class','infotext');
	var fig1 = document.createElement('div');
	fig1.setAttribute('class','ins-fig');
	fig1.setAttribute('id','ins-cam-1');
	this.insCamInfo.appendChild(fig1);
	this.addInfo(this.insCamInfo,false,null,'This box defines which camera model the LUT generated is to be used with.');
	this.addInfo(this.insCamInfo,false,null,'Camera manufacturers take differing approaches to recording log, which primarily effect how exposure corrections are handled.');
	this.addInfo(this.insCamInfo,true,'The Sony Approach','Sony have arguably the most pure approach to log. The entire dynamic range of the camera is captured, with changes in ISO being stored purely as metadata in the clip file.');
	this.addInfo(this.insCamInfo,true,null,'Post production software is then expected to read the metadata and automatically do the exposure adjustment.');
	this.addInfo(this.insCamInfo,true,null,'In practice this does not currently always work, so LUTCalc can be used to create exposure corrected LUTs, eg LC709A with a 1-stop push.');
	this.addInfo(this.insCamInfo,true,null,"Exposure can be entered either as the CineEI ISO value used, or as a stop correction from the base ISO, which is shown as 'Native ISO' next to the camera model.");
	this.addInfo(this.insCamInfo,true,'The Canon Approach','The C300 has popularised log recording with CP Lock, but only records in 8-bit. Log is normally recorded in at least 10-bit, to ensure a broad spread of picture data even after the contrast is increased in post.');
	this.addInfo(this.insCamInfo,true,null,'In order to have a reasonable result in the midtones and highlights, C-Log spreads information very thinly in the shadows. Storing exposure shifts as metadata and performing the adjustment in post would work very badly when pushing to increase the ISO, so Canon bakes in the exposure shift.');
	this.addInfo(this.insCamInfo,true,null,'Consequently, the full dynamic range of the camera is only captured at the base ISO.');
	this.addInfo(this.insCamInfo,true,null,"LUTCalc allows you to generate exposure shifts, but as the ISO is arbitrary, it only shows the 'exposure correction' option for the Cine EOS cameras. LUTs for the C300 will also be appropriate for the C100 and C500");
	this.addInfo(this.insCamInfo,true,'The Arri Approach','Somewhere between the other two, in LogC Arri adjusts the log parameters with ISO, incorporating a slight knee at high ISOs. Combined with higher bit depths than in the C300, this means that the full dynamic range is always captured.');
	this.insCam.style.display = 'none';
	this.insCam.appendChild(this.insCamInfo);
};
LUTInfoBox.prototype.createGamInfo = function() {
	this.insGam = document.createElement('div');
	this.insGam.setAttribute('class','instructions');
	this.insGam.setAttribute('id','ins-gam');
	this.insGamBack = document.createElement('input');
	this.insGamBack.setAttribute('type','button');
	this.insGamBack.value = 'Back';
	this.insGam.appendChild(this.insGamBack);
	this.insGamInfo = document.createElement('div');
	this.insGamInfo.setAttribute('class','infotext');
	var fig1 = document.createElement('div');
	fig1.setAttribute('class','ins-fig');
	fig1.setAttribute('id','ins-gam-1');
	this.insGamInfo.appendChild(fig1);
	this.addInfo(this.insGamInfo,false,null,'This box is used to set the transfer function and colour space that the camera records to and the basic combination that the LUT is intended to output.');
	this.addInfo(this.insGamInfo,false,null,"The menus refer to 'Gamma' and 'Gamut' as these terms are in common use and generally understood in the context, though the accurate terms should be 'Transfer Function' and 'Colour Space'.");
	this.addInfo(this.insGamInfo,false,null,'There are four types of transfer function offered:');
	this.addInfo(this.insGamInfo,true,'Log Curves','These are designed to spread picture information evenly between stops and are how cameras are able to capture high dynamic range within limited bit depth whilst allowing extensive manipulation in post.');
	this.addInfo(this.insGamInfo,true,null,'They are not intended to be used uncorrected, appearing very flat and dull. For this reason they are also not very suitable for setting exposures to. Examples are S-Log, S-Log2 and S-Log3 on Sony cameras, C-Log on Canon cameras and LogC on Arris.');
	this.addInfo(this.insGamInfo,true,'Linear And Gamma Curves',"These are offered when 'Linear/Rec709' is selected in the gamma boxes. Pure linear is effectively the sensor response of the camera; the value is proportional to the number of photons hitting the sensor.");
	this.addInfo(this.insGamInfo,true,null,'Displays generally expect the linear signal to be adjusted with a power function, raising the linear value in relation to a power known as the gamma. sRGB is common in computing and photography, Rec709 is the standard for HDTV and Rec2020 is a slight refinement of Rec709 for UHDTV and deeper bit depths.');
	this.addInfo(this.insGamInfo,true,'Creative Curves','These are curves which are not defined by standards, though generally relate to them. An example is Rec709(800%) which is a Sony interpretation of Rec709 with a smooth knee to extend the dynamic range captured to 800% IRE at a recording level of 109%. These are the main choices for useful camera gammas.');
	this.addInfo(this.insGamInfo,true,'Hybrid Gamma Curves',"These are proposed replacements for the current Rec709/Rec2020 curves as displays become able to produces very wide dynamic ranges. Two, listed as 'ITU Proposal' and 'BBC WHP283' are very similar to Rec709 in the shadows and midtones, but transitioning to a flat log region in the highlights.");
	this.addInfo(this.insGamInfo,true,null,"'Dolby PQ' breaks with backwards compatibility and distributes picture information in a way calculated to hold the maximum possible dynamic range for a given bit depth before effects such as banding become apparent. It appears extraordinarily flat on a Rec709 or sRGB screen.");
	this.addInfo(this.insGamInfo,false,null,'There are two main types of colour space:');
	this.addInfo(this.insGamInfo,true,'Matrix','These are gamuts where a picture can be changed from one to another via a 3x3 matrix performed on linear data. There are capture ones such as the S-Gamuts, Arri Wide Gamut and Canon Cinema Gamut, photometric and intermediate ones such as XYZ and ACES and output gamuts such as Rec709 and Rec2020 (the last two have very similar transfer functions, but the Rec2020 colour space is much wider than the Rec709 one).');
	this.addInfo(this.insGamInfo,true,'LUT','These are ones where the conversion from another colour space is complex and may be irreversible, so LUTCalc stores them as LUTs internally. The advantage is that they can have more complex responses than basic matrices, changing saturation with colour and exposure or tuning the look to favour skin tones or natural greens. Examples include LC709 and LC709A, based on the look profiles produced by Sony.');
	this.addInfo(this.insGamInfo,true,null,'LC709 as a colour space gives a similar though arguably subtler colour response than the basic Rec709 matrix');
	this.insGam.style.display = 'none';
	this.insGam.appendChild(this.insGamInfo);
};
LUTInfoBox.prototype.createTwkInfo = function() {
	this.insTwk = document.createElement('div');
	this.insTwk.setAttribute('class','instructions');
	this.insTwk.setAttribute('id','ins-twk');
	this.insCustBack = document.createElement('input');
	this.insCustBack.setAttribute('type','button');
	this.insCustBack.value = 'Back';
	this.insTwk.appendChild(this.insCustBack);
	var click = document.createElement('p');
	click.appendChild(document.createTextNode('Click an area for information:'));
	this.insTwk.appendChild(click);
	this.custscreen = document.createElement('div');
	this.custscreen.setAttribute('class','imagemap');
	this.custscreen.setAttribute('id','ins-custscreen');
	this.custbox = document.createElement('div');
	this.custbox.setAttribute('class','imagemap');
	this.custbox.setAttribute('id','ins-cust-box');
	var header = document.createElement('div');
	header.setAttribute('class','imagemapimg');	
	header.setAttribute('id','ins-cust-header');	
	this.custbox.appendChild(header);
	this.insCustColour = document.createElement('div');
	this.insCustColour.setAttribute('class','ins-cust');	
	this.insCustColour.setAttribute('id','ins-cust-colour');	
	this.custbox.appendChild(this.insCustColour);
	this.insCustWht = document.createElement('div');
	this.insCustWht.setAttribute('class','ins-cust');	
	this.insCustWht.setAttribute('id','ins-cust-wht');	
	this.custbox.appendChild(this.insCustWht);
	this.insCustPsst = document.createElement('div');
	this.insCustPsst.setAttribute('class','ins-cust');	
	this.insCustPsst.setAttribute('id','ins-cust-psst');	
	this.custbox.appendChild(this.insCustPsst);
	this.insCustASC = document.createElement('div');
	this.insCustASC.setAttribute('class','ins-cust');	
	this.insCustASC.setAttribute('id','ins-cust-asc');	
	this.custbox.appendChild(this.insCustASC);
	this.insCustMulti = document.createElement('div');
	this.insCustMulti.setAttribute('class','ins-cust');	
	this.insCustMulti.setAttribute('id','ins-cust-multi');	
	this.custbox.appendChild(this.insCustMulti);
	this.insCustHG = document.createElement('div');
	this.insCustHG.setAttribute('class','ins-cust');	
	this.insCustHG.setAttribute('id','ins-cust-hg');	
	this.custbox.appendChild(this.insCustHG);
	this.insCustKnee = document.createElement('div');
	this.insCustKnee.setAttribute('class','ins-cust');	
	this.insCustKnee.setAttribute('id','ins-cust-knee');	
	this.custbox.appendChild(this.insCustKnee);
	this.insCustBhi = document.createElement('div');
	this.insCustBhi.setAttribute('class','ins-cust');	
	this.insCustBhi.setAttribute('id','ins-cust-bhi');	
	this.custbox.appendChild(this.insCustBhi);
	this.insCustBgm = document.createElement('div');
	this.insCustBgm.setAttribute('class','ins-cust');	
	this.insCustBgm.setAttribute('id','ins-cust-bgm');	
	this.custbox.appendChild(this.insCustBgm);
	this.insCustGlim = document.createElement('div');
	this.insCustGlim.setAttribute('class','ins-cust');	
	this.insCustGlim.setAttribute('id','ins-cust-glim');	
	this.custbox.appendChild(this.insCustGlim);
	this.insCustFC = document.createElement('div');
	this.insCustFC.setAttribute('class','ins-cust');	
	this.insCustFC.setAttribute('id','ins-cust-fc');	
	this.custbox.appendChild(this.insCustFC);
	this.insCustSamp = document.createElement('div');
	this.insCustSamp.setAttribute('class','ins-cust');	
	this.insCustSamp.setAttribute('id','ins-cust-samp');	
	this.custbox.appendChild(this.insCustSamp);
	this.insCustLA = document.createElement('div');
	this.insCustLA.setAttribute('class','ins-cust');
	this.insCustLA.setAttribute('id','ins-cust-la');
	this.custbox.appendChild(this.insCustLA);
	this.custscreen.appendChild(this.custbox);
	var footer = document.createElement('div');
	footer.setAttribute('class','imagemapimg');	
	footer.setAttribute('id','ins-cust-footer');	
	this.custscreen.appendChild(footer);
	this.insTwk.style.display = 'none';
	this.insTwk.appendChild(this.custscreen);
};
LUTInfoBox.prototype.createLutInfo = function() {
	this.insLut = document.createElement('div');
	this.insLut.setAttribute('class','instructions');
	this.insLut.setAttribute('id','ins-lut');
	this.insLutBack = document.createElement('input');
	this.insLutBack.setAttribute('type','button');
	this.insLutBack.value = 'Back';
	this.insLut.appendChild(this.insLutBack);
	this.insLutInfo = document.createElement('div');
	this.insLutInfo.setAttribute('class','infotext');
	var fig1 = document.createElement('div');
	fig1.setAttribute('class','ins-fig');
	fig1.setAttribute('id','ins-lut-1');
	this.insLutInfo.appendChild(fig1);
	this.addInfo(this.insLutInfo,false,null,'This is the box where the format of the LUT to be generated is decided.');
	this.addInfo(this.insLutInfo,false,null,"The first option is 'LUT Title / Filename'. As well as being used as the filename for saving the LUT, this appears within the file as the title. This may help keep track of LUTs in case filenames change. LUTCalc will make sure that it is appropriately formatted.");
	this.addInfo(this.insLutInfo,false,null,"Next to the title box is the 'Auto Title' button. Clicking this will generate a title based upon the current input and output choices, plus any black level and colour saturation customisation.");
	this.addInfo(this.insLutInfo,false,null,'LUTCalc produces 1D and 3D LUTs:');
	this.addInfo(this.insLutInfo,true,'1D','these are used for contrast control, with each colour channel changed independently.');
	this.addInfo(this.insLutInfo,true,null,'With a 1D LUT it is practical to store every possible 8-bit, 10-bit or 16-bit value. As such the adjustment can be arbitrarily complex, which may well be useful for storing an extensive grade, but with smooth curves such as those built in to LUTCalc and the use of cubic interpolation, considerably fewer control point are needed for an effective result.');
	this.addInfo(this.insLutInfo,true,'3D','3D LUTs input combinations of red, green and blue values to reference output values. This allows for sophisticated adjustment of colours across the gamut and exposure range. Where a 1024-point 1D LUT covers every possible 10-bit input value for one channel, a 3D LUT would need to be 1024x1024x1024-point to consider every possible RGB combination.');
	this.addInfo(this.insLutInfo,true,null,'This would be impractically large and complex, so 3D LUTs are generally of a much smaller dimension and use interpolation to obtain intermediate values. LUTCalc can produce the most common 3D sizes for a chosen LUT format.');
	this.addInfo(this.insLutInfo,true,null,'Sony F cameras accept 33x33x33 cubes and this size does a very good job of reproducing the kinds of effects possible in LUTCalc. 65x65x65 is much larger, but gives greater precision for post software where the size is less of an issue.');
	this.addInfo(this.insLutInfo,false,null,'After the dimension settings come the range options. Cube LUTs contain floating point values rather than integers, and generally map 0 to be black and 1 to be white. Values can actually be greater or less than these, but 0 and 1 are the reference points. What 0 and 1 actually represent depends on the video range used.');
	this.addInfo(this.insLutInfo,true,'100%',"10-bit binary can store 1024 different values, in the decimal range 0-1023. In analogue video picture information was stored within a voltage range defined as a percentage 0%-100%. Values just outside were that classed 'super black' and 'super white'.");
	this.addInfo(this.insLutInfo,true,null,"In digital video, 0% IRE has been defined as 10-bit 64 in decimal, with 100% IRE at 10-bit 940. With 'legal range' set 0 in the LUT equates to 0% IRE and 1 equates to 100% IRE. On this scale, 10-bit 0 would be -0.073 and 10-bit 1023 1.095.");
	this.addInfo(this.insLutInfo,true,null,"This is a commonly expected output range in software such as DaVinci Resolve and is the output range of Sony monitor LUTs (MLUTS).");
	this.addInfo(this.insLutInfo,true,'109%','this treats the full range of 10-bit values as mapping to the 0-1 LUT range. Technically, the top and bottom couple of values are generally reserved, but for the sake of simplicity that can be ignored here. LUTs can output values outside of the 0-1 range, but can only consider input values within it. If a log recording goes outside of legal range (generally only above 1), then the LUT input needs to be data range to make sure that no data is lost.');
	this.addInfo(this.insLutInfo,true,null,'S-Log2 and Canon C-Log both go above legal range, and for consistency Sony recommends working with S-Log3 set to data range in software such as Resolve. Sony MLUTs are data in, legal out.');
	this.addInfo(this.insLutInfo,false,null,'LUTCalc will generally default to data in, legal out, though if both the input and output gammas are log curves then it will set data in data out, on the assumption that further LUTs or corrections will be applied.');
	this.addInfo(this.insLutInfo,false,null,'It has also been suggested that the Lumetri plugin in Adobe Premiere CC expects data in, data out in order to give the correct look. The best suggestion is to test and compare in the software to be used in post.');
	this.addInfo(this.insLutInfo,false,null,'The final set of options sets the levels and output format correctly for a particular task or camera.');
	this.addInfo(this.insLutInfo,true,'Grading LUT','This brings up a set of options for generating LUTs suitable for postproduction software. The default option is a generic .cube file, but a number of alternate formats and specific pieces of software are also available.');
	this.addInfo(this.insLutInfo,true,'Camera LUT (MLUT)','This option is for generating LUT suitable for loading into a camera for use as a monitor LUT, or MLUT.');
	this.addInfo(this.insLutInfo,false,null,'Some LUT formats allow for scaling of the inputs, to allow for inputs which needs to lie outside of 0-1.0. An example would be a linear to log LUT, where the linear range between 0 and 1.0 is only a small portion of a log curve. Scaling means that the input range in this case could be between 0 and 12.0.');
	this.addInfo(this.insLutInfo,false,null,'Where a LUT format supports scaling, LUTCalc will display minimum and maximum boxes. These default to 0 and 1.0 respectively, and generally do not need to be changed.');
	var fig2 = document.createElement('div');
	fig2.setAttribute('class','ins-fig');
	fig2.setAttribute('id','ins-lut-2');
	this.insLutInfo.appendChild(fig1);
	this.addInfo(this.insLutInfo,true,'Hard Clip','Many LUT formats permit output values beyond 0-1. This allows limited dynamic range conversions such as linear or Rec709 to be performed non-destructively, ie the overexposed data can still be pulled back into range.');
	this.addInfo(this.insLutInfo,true,null,'Some software does not handle out of range values correctly, so this drop down allows for clipping of black (0), white (1) or both black and white.');
	this.addInfo(this.insLutInfo,true,null,"If clipping is applied and the output range for LUTs is set to 'Data', an additional checkbox will appear, '0%-100%'. Check this and the clipping will be held to legal range, ie for 10-bit data range black is 64 and white 959 out of 1023.");
	this.addInfo(this.insLutInfo,true,null,'Use of hard clipping does mean that data outside of the clipped range is lost.');
	this.insLut.style.display = 'none';
	this.insLut.appendChild(this.insLutInfo);
};
LUTInfoBox.prototype.createPreInfo = function() {
	this.insPre = document.createElement('div');
	this.insPre.setAttribute('class','instructions');
	this.insPre.setAttribute('id','ins-gen');
	this.insPreBack = document.createElement('input');
	this.insPreBack.setAttribute('type','button');
	this.insPreBack.value = 'Back';
	this.insPre.appendChild(this.insPreBack);
	this.insPreInfo = document.createElement('div');
	this.insPreInfo.setAttribute('class','infotext');
	var fig1 = document.createElement('div');
	fig1.setAttribute('class','ins-fig');
	fig1.setAttribute('id','ins-pre-1');
	this.insPreInfo.appendChild(fig1);
	this.addInfo(this.insPreInfo,false,null,"Clicking 'Preview' brings up a test image below the row of buttons. By default it is displayed legal range and reflects any adjustments made.");
	this.addInfo(this.insPreInfo,false,null,'LUTCalc includes five test images built in, with the option to load an additional image.');
	this.addInfo(this.insPreInfo,true,'High Contrast','This image covers around eleven or twelve stops and with the brightest highlights around 5 1/2 stops above 18% gray.');
	this.addInfo(this.insPreInfo,true,'Low Contrast','This image is against greenscreen and stays within the dynamic range of Rec709, with highlights about 2 1/3 stops above 18% gray.');
	this.addInfo(this.insPreInfo,true,'Rec709 Gamut','This visualises colours across the entire Rec709 colour gamut. The layout matches the positions of the colours on a Rec709 vectorscope.');
	this.addInfo(this.insPreInfo,true,'xy / uv Chromacity','Here the entire gamut of human vision (CIE 1931 standard observer, XYZ) is displayed in standard chromacity charts. CIE1931 xy is the conventional representation of the XYZ gamut, where CIE1960 uv is a more linear representation used in colour temperature calculations. The Planck Locus (colour temperature line) is shown as a white curve.');
	var fig2 = document.createElement('div');
	fig2.setAttribute('class','ins-fig');
	fig2.setAttribute('id','ins-pre-2');
	this.insPreInfo.appendChild(fig2);
	this.addInfo(this.insPreInfo,true,null,'On top of this are overlaid triangles representing the primaries of the current selected recording gamut and the net output gamut after adjustment, plus dot markers of the white points. Highly nonlinear adjustments (ie PSST-CDL) are not factored in to the triangle calculation, though White Balance and ASC-CDL are. Complex colour spaces (eg LC709 and LC709A assume the Rec709 primaries as their base).');
	this.addInfo(this.insPreInfo,true,null,'the region where the two triangles overlap is a guide to the range of colours available in the finished image.');
	this.addInfo(this.insPreInfo,true,'Grayscale','A 16-stop grayscale. The upper portion smoothly shifts from 8 stops below mid gray to 7 stops above, with the lower portion going in one-stop steps. The vertical line marks 18% gray. On the waveform, this image will match up with the Stop/IRE chart.');
	this.addInfo(this.insPreInfo,false,null,'The high and low contrast images include a set of Rec709 75% and 100% primary and secondary boxes, a 16-stop grayscale and a colour chart on the right.');
	this.addInfo(this.insPreInfo,false,null,'The high contrast image also includes colour charts four stops above and below base and the low contrast chart two stops above and below.');
	this.addInfo(this.insPreInfo,false,null,'As the cursor moves over the preview window, the output 10-bit code values at that point are displayed above the image.');
	this.addInfo(this.insPreInfo,false,null,"An image recorded in a known colour space can also be loaded in place of the defaults by clicking 'Load Preview...'. The webapp version of LUTCalc accepts 8-bit formats, such as JPEG, PNG and BMP. LUTCalc For Mac can additionally read 16-bit TIFF and PNG images.");
	this.addInfo(this.insPreInfo,false,null,'Once loaded, the new image becomes available with the default selections.');
	this.addInfo(this.insPreInfo,false,null,"By default the preview image is displayed legal range (0%-100%), but by clicking '109%' the image is darkened a little to give a representation of extended range details (0%-109%).");
	this.addInfo(this.insPreInfo,false,null,"'Large Image' / 'Small Image' toggles between the default small preview image and a larger version which requires scrolling to view the scopes.");
	this.addInfo(this.insPreInfo,false,null,'Above the preview window are the scope options:');
	var fig3 = document.createElement('div');
	fig3.setAttribute('class','ins-fig');
	fig3.setAttribute('id','ins-pre-3');
	this.insPreInfo.appendChild(fig3);
	this.addInfo(this.insPreInfo,true,'Waveform','The horizontal axis is the same as the test image, whilst the vertical axis is luma values of all the pixels in that column. The scale lines are blocks of 10% IRE and the full range runs from -7% to +109%.');
	this.addInfo(this.insPreInfo,true,'Vectorscope','This is a polar plot of the image chroma. LUTCalc includes standard 75% and 100% Rec709 boxes (the two rows of green circles). In pure Rec709 75% colourspace (gamma and gamut) colour bars should fall dead centre of the inner green circles.');
	this.addInfo(this.insPreInfo,true,null,'In addition there is a set of 75% Rec709 boxes that have been mapped to the current chosen colour space. These are the colour of their associated primary or secondary and will lie inside the green ones.');
	this.addInfo(this.insPreInfo,true,null,'These give a guide to the size and nature of the chosen colour space, and also where a test chart should lie for correcting colour casts without changing colour space.');
	this.addInfo(this.insPreInfo,true,'RGB Parade','Similar to the waveform, but the red, green and blue components are separated horizontally.');
	this.insPre.style.display = 'none';
	this.insPre.appendChild(this.insPreInfo);
};
LUTInfoBox.prototype.createGenInfo = function() {
	this.insGen = document.createElement('div');
	this.insGen.setAttribute('class','instructions');
	this.insGen.setAttribute('id','ins-gen');
	this.insGenBack = document.createElement('input');
	this.insGenBack.setAttribute('type','button');
	this.insGenBack.value = 'Back';
	this.insGen.appendChild(this.insGenBack);
	this.insGenInfo = document.createElement('div');
	this.insGenInfo.setAttribute('class','infotext');
	this.addInfo(this.insGenInfo,false,'Generate','The GO button!');
	this.addInfo(this.insGenInfo,false,null,'In most browsers you will either be given a choice of where to save your LUT, or it will automatically go to the Downloads folder.');
	this.addInfo(this.insGenInfo,false,null,'In some versions of Safari it may just appear in a new browser tab. In that case you will need to save it manually.');
	this.addInfo(this.insGenInfo,false,null,'LUTCalc For Mac allows you to choose the destination for saving.');
	this.insGen.style.display = 'none';
	this.insGen.appendChild(this.insGenInfo);
};
LUTInfoBox.prototype.createGstInfo = function() {
	this.insGst = document.createElement('div');
	this.insGst.setAttribute('class','instructions');
	this.insGst.setAttribute('id','ins-gst');
	this.insGstBack = document.createElement('input');
	this.insGstBack.setAttribute('type','button');
	this.insGstBack.value = 'Back';
	this.insGst.appendChild(this.insGstBack);
	this.insGstInfo = document.createElement('div');
	this.insGstInfo.setAttribute('class','infotext');
	this.addInfo(this.insGstInfo,false,'Generate Set','allows you to batch generate multiple versions of your LUT across a range of exposure compensations.');
	this.addInfo(this.insGstInfo,false,null,'The options available are to set the lower and upper bounds of the exposure range you wish to generate, then the step size in fractions of a stop.');
	this.addInfo(this.insGstInfo,false,null,'The default is to produce a set from two stops below native to two stops above, in steps of 1/3 of a stop.');
	this.insGst.style.display = 'none';
	this.insGst.appendChild(this.insGstInfo);
};
LUTInfoBox.prototype.createSetInfo = function() {
	this.insSet = document.createElement('div');
	this.insSet.setAttribute('class','instructions');
	this.insSet.setAttribute('id','ins-set');
	this.insSetBack = document.createElement('input');
	this.insSetBack.setAttribute('type','button');
	this.insSetBack.value = 'Back';
	this.insSet.appendChild(this.insSetBack);
	this.insSetInfo = document.createElement('div');
	this.insSetInfo.setAttribute('class','infotext');
	this.addInfo(this.insSetInfo,false,'Settings','Here you have the option to save the current state of all the options and customisations in LUTCalc, or to reload preferred settings previously saved.');
	this.addInfo(this.insSetInfo,false,null,"The settings are saved in files ending '.lutcalc'.");
	this.insSet.style.display = 'none';
	this.insSet.appendChild(this.insSetInfo);
};
LUTInfoBox.prototype.createInfInfo = function() {
	this.insInf = document.createElement('div');
	this.insInf.setAttribute('class','instructions');
	this.insInf.setAttribute('id','ins-inf');
	this.insInfBack = document.createElement('input');
	this.insInfBack.setAttribute('type','button');
	this.insInfBack.value = 'Back';
	this.insInf.appendChild(this.insInfBack);
	this.insInfPic = document.createElement('div');
	this.insInfPic.setAttribute('class','imagemap');
	this.insInfPic.setAttribute('id','ins-inf-pic');
	this.insInf.appendChild(this.insInfPic);
	this.insInfInfo = document.createElement('div');
	this.insInfInfo.setAttribute('class','infotext');
	var fig1 = document.createElement('div');
	fig1.setAttribute('class','ins-fig');
	fig1.setAttribute('id','ins-inf-1');
	this.insInfInfo.appendChild(fig1);
	this.addInfo(this.insInfInfo,false,null,'This box contains provides information about the current LUT under construction including suggested exposure values and transfer curves, plus instructions for LUTCalc.');
	this.addInfo(this.insInfInfo,false,'Instructions','Hopefully fairly obvious, after all here you are!');
	this.addInfo(this.insInfInfo,false,'Tables','This shows tables of % IRE and 10-bit values for the current output curve, both for common reflectances and for stops above and below 18% gray. The Stop to stop values are given first for with the LUT applied, and then the pre-LUT equivalents. Useful if applying LUTs in a monitor with a pre-LUT waveform.');
	this.addInfo(this.insInfInfo,false,'Charts','This provides three different ways of comparing input and output levels:');
	this.addInfo(this.insInfInfo,true,'Reflected/IRE','Reflectance levels of the scene (eg 18% gray, 90% white) against % IRE. The simplest chart, but as the x-axis is linear it is hard to read anything meaningful from it.');
	this.addInfo(this.insInfInfo,true,'Stop/IRE','Shows the output level against input stops. Clearly shows the difference between linear/gamma (keep increasing in slope), log curves (tend towards a straight line slope in the highlights and curves with knee (tend towards a horizontal line in the highlights). Also gives a good idea of dynamic range in stops.');
	this.addInfo(this.insInfInfo,true,null,'Areas beyond the range of the chosen camera are shaded. When the CineEI ISO is changed or Stop Correction is applied the level of 18% gray in the underlying recording is shown with a pink vertical line.');
	this.addInfo(this.insInfInfo,true,'LUT In/LUT Out','similar to Stop/IRE, but better shows true black (black is technically minus infinity stops, so Stop/IRE never quite shows it).');
	this.addInfo(this.insInfInfo,false,null,'The charts tab also includes a table of % IRE and 10-bit values for the current curve.');
	this.insInf.style.display = 'none';
	this.insInf.appendChild(this.insInfInfo);
};
LUTInfoBox.prototype.createCustColour = function() {
	this.custColour = document.createElement('div');
	this.custColour.setAttribute('class','instructions');
	this.custColour.setAttribute('id','cust-colour');
	this.custColourBack = document.createElement('input');
	this.custColourBack.setAttribute('type','button');
	this.custColourBack.value = 'Back';
	this.custColour.appendChild(this.custColourBack);
	this.custColourInfo = document.createElement('div');
	this.custColourInfo.setAttribute('class','infotext');
	this.addInfo(this.custColourInfo,false,'Custom Colour Space',"This panel appears for 3D LUTs when 'Custom' is selected as either the recorded or output gamut.");
	this.addInfo(this.custColourInfo,false,null,'It is a technical option for creating additional colour space / gamut options from either xy white point and primaries or via matrix values to one of the built-in options.');
	this.addInfo(this.custColourInfo,false,null,'As such it is a tool intended for a specific, specialist use.');
	this.addInfo(this.custColourInfo,false,null,'Put another way, as a cameraman it is not something I expect to find myself using!');
	var colour1 = document.createElement('div');
	colour1.setAttribute('class','ins-cust-fig');
	colour1.setAttribute('id','ins-cust-colour-1');
	this.custColourInfo.appendChild(colour1);
	this.addInfo(this.custColourInfo,false,'White Point & Primaries',"With this you define a colourspace by defining the white point either with xy values or from a drop-down list of standard illuminants. The primaries are then set by entering further xy values.");
	this.addInfo(this.custColourInfo,false,null,"LUTCalc's processing colourspace uses D65 as its white point, so if the custom colourspace uses a different white point, a chromatic adaptation transform, or CAT, is used. By default LUTCalc uses CIECAT02, though other options such as Bradford can be selected from the CAT model list.");
	var colour2 = document.createElement('div');
	colour2.setAttribute('class','ins-cust-fig');
	colour2.setAttribute('id','ins-cust-colour-2');
	this.custColourInfo.appendChild(colour2);
	this.addInfo(this.custColourInfo,false,'Matrix','with this panel you can enter matrix values directly. You can toggle between input and output matrix and LUTCalc will automatically generate the inverse. By default the working colourspace is set to Rec709, but this can be changed to whatever is appropriate for the matrix values.');
	this.addInfo(this.custColourInfo,false,'Set Primaries',"When an appropriately formed matrix is entered and differs from the matrices generated from the Primaries and White Point panel, a 'Set Primaries' button becomes available. Pressing this calculates the primaries from the matrix entered plus the white point and CAT chosen, and displays them in the 'Primaries and White Point' panel.");
	this.addInfo(this.custColourInfo,false,'Update With Colourspace','This option recalculates the matrix values whenever the colourspace is changed.');
	this.addInfo(this.custColourInfo,false,null,"As with the 'White Point & Primaries' panel, the CAT can be changed. With the 'Matrix' panel it is used to go between the selected working colourspace and LUTCalc's internal processing space.");
	this.addInfo(this.custColourInfo,false,null,'The matrices are applied to linear image data.');
	this.addInfo(this.custColourInfo,false,null,"Initially the 'Matrix' panel is completely independent of the 'White Point & Primaries' panel. If you change anything under 'White Point & Primaries', the matrix panel will lock to it and calculate from the white point and primary options.");
	this.addInfo(this.custColourInfo,false,'New / Remove',"You can create multiple custom colour spaces and save them with the main 'Save Settings' button.");
	this.addInfo(this.custColourInfo,false,'Input Choice / Output Choice',"Use these options to set which colourspaces will be used when the recorded and output gamuts are set to 'Custom'.");
	this.custColour.style.display = 'none';
	this.custColour.appendChild(this.custColourInfo);
};
LUTInfoBox.prototype.createCustWht = function() {
	this.custWht = document.createElement('div');
	this.custWht.setAttribute('class','instructions');
	this.custWht.setAttribute('id','cust-cts');
	this.custWhtBack = document.createElement('input');
	this.custWhtBack.setAttribute('type','button');
	this.custWhtBack.value = 'Back';
	this.custWht.appendChild(this.custWhtBack);
	this.custWhtInfo = document.createElement('div');
	this.custWhtInfo.setAttribute('class','infotext');
	var wht1 = document.createElement('div');
	wht1.setAttribute('class','ins-cust-fig');
	wht1.setAttribute('id','ins-cust-wht-1');
	this.custWhtInfo.appendChild(wht1);
	this.addInfo(this.custWhtInfo,false,null,"'White Balance' warms or cools the picture to fine tune white balances, or to provide intermediate temperatures unavailable in camera (eg CineEI on the Sony F cameras) through a LUT.");
	this.addInfo(this.custWhtInfo,false,null,'It also includes the complementary green / magenta shift to correct for lightsources away from the nominal colour temperature.');
	this.addInfo(this.custWhtInfo,false,null,'Temperature adjustments can be made using a slider which approximates the values of CTO and CTB lighting gel, or for more photometrically precise adjustment the recorded and desired colour temperatures can be entered.');
	this.addInfo(this.custWhtInfo,false,null,'Green / magenta adjustments for correcting lighting such as fluorescents are made with a similar plus green / minus green slider.');
	this.addInfo(this.custWhtInfo,false,null,"the nature of the green / magenta shift is dependent upon the lightsource's nominal temperature relative to the reference white balance. By default this is locked to the colour temperature shift, but by clicking 'Unlock Lightsource From New White' you can set the lamp's nominal temperature separately from the CTO / CTB shift.");
	var wht2 = document.createElement('div');
	wht2.setAttribute('class','ins-fig');
	wht2.setAttribute('id','ins-cust-wht-2');
	this.custWhtInfo.appendChild(wht2);
	this.addInfo(this.custWhtInfo,false,null,"When the preview window is active, a button marked 'Preview Click For White' becomes available. Once activated, clicking on the preview window will cause LUTCalc to attempt to white balance to the chosen area.");
	this.addInfo(this.custWhtInfo,false,null,'Activating the advanced options brings up a selection of nominal temperatures for fluorescent lamps, rather than entering a colour temperature directly.');
	this.addInfo(this.custWhtInfo,false,null,'The adjustments are done using a Von Kries-style chromatic transform - by default the relatively standard CIECAT02 - but with the advanced option the choice of CAT matrix becomes user selectable.');
	this.custWht.style.display = 'none';
	this.custWht.appendChild(this.custWhtInfo);
};
LUTInfoBox.prototype.createCustPsst = function() {
	this.custPsst = document.createElement('div');
	this.custPsst.setAttribute('class','instructions');
	this.custPsst.setAttribute('id','cust-psst');
	this.custPsstBack = document.createElement('input');
	this.custPsstBack.setAttribute('type','button');
	this.custPsstBack.value = 'Back';
	this.custPsst.appendChild(this.custPsstBack);
	this.custPsstInfo = document.createElement('div');
	this.custPsstInfo.setAttribute('class','infotext');
	var fig1 = document.createElement('div');
	fig1.setAttribute('class','ins-cust-fig');
	fig1.setAttribute('id','ins-cust-psst-1');
	this.custPsstInfo.appendChild(fig1);
	this.addInfo(this.custPsstInfo,false,null,'PSST-CDL is intended to take the controls provided by ASC-CDL and apply them selectively to specific ranges of colours on the vectorscope.');
	this.addInfo(this.custPsstInfo,false,null,"PSST stands for (P)rimary, (S)econdary and (S)kin (T)one. The default window allows adjustment to reds, greens and blues (primaries), magentas, yellows and cyans (secondaries) and skin tone (based on a combination of a Vectorscope 'I'-line and colour chart 'Light Skin' and 'Dark Skin' values). Adjustments are interpolated between these base colours.");
	this.addInfo(this.custPsstInfo,true,'Colour',"Similar to the 'Hue' in HSV and HSL, Colour here is the offset from the chosen base colour. PSST separates each base colour by a value of 1, so red to skin tone is 1, red to green is 3 and magenta to cyan in 5.");
	this.addInfo(this.custPsstInfo,true,null,'7 equates to a complete circuit (blue -> blue) and negative values are allowed (blue to green is 6 or -1).');
	this.addInfo(this.custPsstInfo,true,'Saturation','Adjusts the colour intensity within the chosen colour range. 1 is the default, 0 is a Rec709 grayscale.');
	this.addInfo(this.custPsstInfo,true,'Slope','Analogous to gain, an input value is multiplied by this. Defined as any value from 0 (a flat line) up, the default value is 1.0.');
	this.addInfo(this.custPsstInfo,true,null,'LUTCalc applies the PSST-CDL on linear data, so slope behaves like an exposure adjustment. 0.5 = one stop down, 0.25 = two stops. 2 = one stop up, 4 = two stops.');
	this.addInfo(this.custPsstInfo,true,'Offset',"a value simply added or subtracted from an input value, carried out after the slope");
	this.addInfo(this.custPsstInfo,true,'Power',"Analogous to 'gamma', once an input value has had the slope and offset applied, it is raised to the power of the power parameter. The range is any value from zero up.");
	this.addInfo(this.custPsstInfo,false,null,"The seven base colours allow for some interesting effects, but for greater control PSST-CDL can specify adjustments for intermediate colours. This is done by clicking 'Refinements'");
	var fig2 = document.createElement('div');
	fig2.setAttribute('class','ins-cust-fig');
	fig2.setAttribute('id','ins-cust-psst-2');
	this.custPsstInfo.appendChild(fig2);
	this.addInfo(this.custPsstInfo,false,null,'The Refinements window shows a set of vertical sliders which can be used to make adjustments to both the seven base colours and intermediate colours. Rather like a graphic equalizer.');
	this.addInfo(this.custPsstInfo,false,null,"The initial intermediate values are interpolated from any adjustments made in the 'Base Adjustments' window.");
	this.addInfo(this.custPsstInfo,false,null,'Refinements defaults to adjusting Saturation, but this can be changed to Colour, Slope, Offset or Power.');
	this.addInfo(this.custPsstInfo,false,null,'To fix an intermediate value, click on the checkbox beneath the slider. A ticked checkbox will not be interpolated by Base Adjustment changes.');
	this.addInfo(this.custPsstInfo,false,null,'The spectrum background displays the effect of PSST adjustments in the current colour space (top and bottom before, centre after).');
	var fig3 = document.createElement('div');
	fig3.setAttribute('class','ins-fig');
	fig3.setAttribute('id','ins-cust-psst-3');
	this.custPsstInfo.appendChild(fig3);
	this.addInfo(this.custPsstInfo,false,null,'The primaries and secondaries on a Rec709 vectorscope take the shape of a squashed hexagon, ie the distance from the centre (grayscale) to the edges (100% saturation) varies with colour. Equally, the luma (Y) value of a full saturation varies with colour, reflecting the sensitivity of human vision.');
	this.addInfo(this.custPsstInfo,false,null,'By default, when a PSST colour shift is applied, PSST-CDL will attempt to scale the magnitude on the vectorscope to match the difference between the values for the initial and final colours. For a full match, the Y value would also need to be scaled. However this tends to produce extreme results on real images, so is off by default.');
	this.addInfo(this.custPsstInfo,false,null,'The advanced settings in PSST-CDL allow these two scalings to be turned on or off.');
	this.custPsst.style.display = 'none';
	this.custPsst.appendChild(this.custPsstInfo);
};
LUTInfoBox.prototype.createCustASC = function() {
	this.custASC = document.createElement('div');
	this.custASC.setAttribute('class','instructions');
	this.custASC.setAttribute('id','cust-cdl');
	this.custASCBack = document.createElement('input');
	this.custASCBack.setAttribute('type','button');
	this.custASCBack.value = 'Back';
	this.custASC.appendChild(this.custASCBack);
	this.custASCInfo = document.createElement('div');
	this.custASCInfo.setAttribute('class','infotext');
	var fig1 = document.createElement('div');
	fig1.setAttribute('class','ins-cust-fig');
	fig1.setAttribute('id','ins-cust-asc-1');
	this.custASCInfo.appendChild(fig1);
	this.addInfo(this.custASCInfo,false,null,'The ASC-CDL is a set of transforms developed by the American Society of Cinematographers intended to provide consistent adjustments across software and cameras.');
	this.addInfo(this.custASCInfo,false,null,'It is also a system of XML code for conveying those adjustments between systems and from frame to frame.');
	this.addInfo(this.custASCInfo,false,null,'LUTCalc provides the controls as a simple and clear way of adjusting the picture, but does not implement the full ASC-CDL system.');
	this.addInfo(this.custASCInfo,false,null,'The ASC-CDL is based around three basic parameters applied to each of the red, green and blue channels, plus a saturation parameter which couples all three:');
	this.addInfo(this.custASCInfo,true,'Slope','Analogous to gain, an input value is multiplied by this. Defined as any value from 0 (a flat line) up, the default value is 1.0.');
	this.addInfo(this.custASCInfo,true,null,'LUTCalc applies the ASC-CDL on linear data, so slope behaves like an exposure adjustment. 0.5 = one stop down, 0.25 = two stops. 2 = one stop up, 4 = two stops.');
	this.addInfo(this.custASCInfo,true,'Offset',"The definition and implementation of 'lift' can change between pieces of software, so the ASC uses the term 'offset' and defines it as a value simply added or subtracted from an input value. In the ASC-CDL this is carried out after the slope");
	this.addInfo(this.custASCInfo,true,'Power',"Analogous to 'gamma', once an input value has had the slope and offset applied, it is raised to the power of the power parameter. The range is any value from zero up.");
	this.addInfo(this.custASCInfo,true,'Saturation','All other ASC-CDL controls are applied on a colour channel by colour channel basis. Saturation takes the luma value of the RGB colour and scales the components such that a value of 0 gives a Rec709 grayscale, 1.0 leaves the image unaffected and anything above 1.0 increases the colour saturation.');
	this.addInfo(this.custASCInfo,false,null,'For simplicity, LUTCalc includes a luma channel alongside the red, green and blue and locking the individual channel adjustments together.');
	this.custASC.style.display = 'none';
	this.custASC.appendChild(this.custASCInfo);
};
LUTInfoBox.prototype.createCustMulti = function() {
	this.custMulti = document.createElement('div');
	this.custMulti.setAttribute('class','instructions');
	this.custMulti.setAttribute('id','cust-multi');
	this.custMultiBack = document.createElement('input');
	this.custMultiBack.setAttribute('type','button');
	this.custMultiBack.value = 'Back';
	this.custMulti.appendChild(this.custMultiBack);
	this.custMultiInfo = document.createElement('div');
	this.custMultiInfo.setAttribute('class','infotext');
	var multi1 = document.createElement('div');
	multi1.setAttribute('class','ins-cust-fig');
	multi1.setAttribute('id','ins-cust-multi-1');
	this.custMultiInfo.appendChild(multi1);
	this.addInfo(this.custMultiInfo,false,null,'Multitone combines two adjustments to quickly produce sophisticated colour effects tuned from stop to stop - saturation control and duotone.');
	this.addInfo(this.custMultiInfo,false,'Saturation Control','Within the limited data range of conventional digital recordings (8 or 10-bit integers) there is also a limit to the range of colours that can be represented for a given colourspace at a given luminence. This is the gamut.');
	this.addInfo(this.custMultiInfo,false,null,'Outside of this range colours will tend to clip. For pure primaries the result is solid blocks of colour, but for mixtures of the colour channels it can result in colours shifting away from expectation.');
	this.addInfo(this.custMultiInfo,false,null,"For example, Rec709 blue has a much lower luminence than green or red; as luminance increases past blue's limit, the other colour channels can take over.");
	this.addInfo(this.custMultiInfo,false,null,'The the row of saturation sliders in Multitone can be used to adjust saturation on a stop-by-stop basis, for example reducing the saturation as the level approaches 90% white (around 2 1/3 stops above 18% gray).');
	this.addInfo(this.custMultiInfo,false,null,"'Reset Saturation' will bring the colours back to their original intensity.");
	this.addInfo(this.custMultiInfo,false,'Duotone','A popular effect in traditional black and white printing is Duotone. This overlays a colour tint in the midtones and highlights with another in the shadows (generally black). The second control in Multitone extends this effect.');
	this.addInfo(this.custMultiInfo,false,null,"Clicking the 'Monochrome' button under the saturation sliders sets every stop to zero saturation. By default this means black and white.");
	this.addInfo(this.custMultiInfo,false,null,"At the most basic level this can be changed to a colour wash either by adjusting the 'Hue' and 'Saturation' sliders in the lower box, or by clicking on the gray square to bring up a colour picker.");
	var multi2 = document.createElement('div');
	multi2.setAttribute('class','ins-fig');
	multi2.setAttribute('id','ins-cust-multi-2');
	this.custMultiInfo.appendChild(multi2);
	this.addInfo(this.custMultiInfo,false,null,'The picker shows the hue and saturation options of the Rec709 gamut mapped into the current colourspace. Most of the gamut options are wide enough to avoid clipping using any of these colours, though care should be taken when the output gamut is Rec709 that highly saturated choices - particularly blues - can lead to colour clipping in the highlights.');
	this.addInfo(this.custMultiInfo,false,null,"From the basic colour wash a duotone effect can be created by clicking the '+' button and selecting a second colour. The 'Stop' slider sets the luminance level where the colour choice is defined. Multitone interpolates between multiple colours.");
	this.addInfo(this.custMultiInfo,false,null,'Further colours can be added for tritone, quadtone, quintone etc.');
	this.addInfo(this.custMultiInfo,false,'Multitone','Combining the two effects can produce interesting results quickly. For example, saturation could be feathered downwards from 18% gray to 90% white, but towards a slightly warm wash, which then shifts towards pure grayscale in high highlights.');
	this.addInfo(this.custMultiInfo,false,null,"Coupled with the 'Knee' tool it is possible to produce very useful looks from the basic Rec709 gamma and gamut options which could hold up more robustly to further adjustment than LUT-derived colourspaces (such as LC709A).");
	this.custMulti.style.display = 'none';
	this.custMulti.appendChild(this.custMultiInfo);
};
LUTInfoBox.prototype.createCustHG = function() {
	this.custHG = document.createElement('div');
	this.custHG.setAttribute('class','instructions');
	this.custHG.setAttribute('id','cust-gam');
	this.custHGBack = document.createElement('input');
	this.custHGBack.setAttribute('type','button');
	this.custHGBack.value = 'Back';
	this.custHG.appendChild(this.custHGBack);
	this.custHGInfo = document.createElement('div');
	this.custHGInfo.setAttribute('class','infotext');
	var fig1 = document.createElement('div');
	fig1.setAttribute('class','ins-cust-fig');
	fig1.setAttribute('id','ins-cust-hg-1');
	this.custHGInfo.appendChild(fig1);
	this.addInfo(this.custHGInfo,false,null,"With 'Highlight Gamut' a second colour space or gamut can be applied above a user-selectable exposure range.");
	this.addInfo(this.custHGInfo,false,null,'The transition can be calculated linearly, over a range of reflectance percentages (eg between 18% gray and 90% white) or logarithmically, set in stops above or below 18% gray.');
	this.addInfo(this.custHGInfo,false,null,'With this effects such as muted or black and white highlights with saturated midtones can be achieved in a LUT.');
	this.custHG.style.display = 'none';
	this.custHG.appendChild(this.custHGInfo);
};
LUTInfoBox.prototype.createCustKnee = function() {
	this.custKnee = document.createElement('div');
	this.custKnee.setAttribute('class','instructions');
	this.custKnee.setAttribute('id','cust-knee');
	this.custKneeBack = document.createElement('input');
	this.custKneeBack.setAttribute('type','button');
	this.custKneeBack.value = 'Back';
	this.custKnee.appendChild(this.custKneeBack);
	this.custKneeInfo = document.createElement('div');
	this.custKneeInfo.setAttribute('class','infotext');
	var fig1 = document.createElement('div');
	fig1.setAttribute('class','ins-cust-fig');
	fig1.setAttribute('id','ins-cust-knee-1');
	this.custKneeInfo.appendChild(fig1);
	this.addInfo(this.custKneeInfo,false,null,"The 'Knee' tool provides a means to capture a wide dynamic range whilst maintaining contrast in the midtones.");
	this.addInfo(this.custKneeInfo,false,'Legal Range / Extended Range','Sets the output IRE level at the defined white clip level. Legal range clips at 99% IRE (to allow for differences between colour channels). Extended range clips to 1% below 10-bit 1019.');
	this.addInfo(this.custKneeInfo,false,'Knee Start Level','The exposure level - in stops above 18% gray - at which the knee takes over from the base gamma.');
	this.addInfo(this.custKneeInfo,false,'Clip Level',"The exposure level - in stops above 18% gray - at which the knee reaches the clip level set with 'Legal Range / Extended Range'. For very wide dynamic ranges (Sony and Arri cameras can handle six or seven stops of headroom) keeping the knee start level low will help ensure a smooth rolloff.");
	this.addInfo(this.custKneeInfo,false,null,'Setting Knee Start Level too high with a high value of Clip Level can lead to ugly overshoots. These can be seen in and remedied with the charts normally visible where these instructions are.');
	this.addInfo(this.custKneeInfo,false,'Slope At Clip','The knee angle at the clip level. It is in % IRE per stop. A value of zero tends to lead to extremely compressed highlights and means that any values above white clip (such as in a grading LUT with exposure adjustment) will be indistinguishable, so a slight slope is generally advisable.');
	this.addInfo(this.custKneeInfo,false,'Smoothness','By default the LUTCalc creates a smooth, cubic knee rolloff. This is the prevailing approach in modern cameras. Adjusting the smoothness down will tend towards a hard, linear transition more akin to conventional video cameras such as Beta-SP and Digibeta.');
	this.addInfo(this.custKneeInfo,false,null,'With the current algorithm the cubic transition can overshoot where an extremely wide dynamic range is compressed into a very narrow range (high Knee Start Level). If that is required then setting smoothness to zero will avoid the overshoot.');
	this.custKnee.style.display = 'none';
	this.custKnee.appendChild(this.custKneeInfo);
};
LUTInfoBox.prototype.createCustBhi = function() {
	this.custBhi = document.createElement('div');
	this.custBhi.setAttribute('class','instructions');
	this.custBhi.setAttribute('id','cust-bhi');
	this.custBhiBack = document.createElement('input');
	this.custBhiBack.setAttribute('type','button');
	this.custBhiBack.value = 'Back';
	this.custBhi.appendChild(this.custBhiBack);
	this.custBhiInfo = document.createElement('div');
	this.custBhiInfo.setAttribute('class','infotext');
	var fig1 = document.createElement('div');
	fig1.setAttribute('class','ins-cust-fig');
	fig1.setAttribute('id','ins-cust-bhi-1');
	this.custBhiInfo.appendChild(fig1);
	this.addInfo(this.custBhiInfo,false,null,'Black Level and Highlight Level apply an offset and scaling after all other adjustments and conversions have been applied.');
	var fig2 = document.createElement('div');
	fig2.setAttribute('class','ins-cust-fig');
	fig2.setAttribute('id','ins-cust-bhi-2');
	this.custBhiInfo.appendChild(fig2);
	this.addInfo(this.custBhiInfo,false,'Black Level','initially gives the % IRE level of 0% black in the output transfer function or gamma. This can then be fixed against highlight adjustments or reset, for example to thicken the black level by a measured amount.');
	this.addInfo(this.custBhiInfo,false,null,'Black Level and Highlight Level include ASC-CDL adjustments in their calculations, so any ASC-CDL adjustments should be made before Black Level and Highlight Level adjustments.');
	this.addInfo(this.custBhiInfo,false,null,"By default LUTCalc resets the Black and highlight levels when the underlying base level changes (eg when the output gamma is changed). 'Lock Value' prevents LUTCalc from changing the customised level.");
	var fig3 = document.createElement('div');
	fig3.setAttribute('class','ins-cust-fig');
	fig3.setAttribute('id','ins-cust-bhi-3');
	this.custBhiInfo.appendChild(fig3);
	this.addInfo(this.custBhiInfo,false,'Highlight Level','this will give the % IRE level of a selectable reflectance percentage (initially 90% white) for the output curve. Also shown is the equivalent % IRE in the Rec709 display gamma.');
	this.addInfo(this.custBhiInfo,false,null,'The output level can then be altered and LUTCalc will scale the output curve.');
	this.addInfo(this.custBhiInfo,false,null,'As with Black Level, Highlight Level incorporates ASC-CDL adjustments, so any ASC-CDL adjustments should be made before Black Level and Highlight Level adjustments.');
	this.addInfo(this.custBhiInfo,false,null,'Black and Highlight Level adjustments work together, for example to adjust the LC709 and LC709A curves from being legal range - peaking just below 100% - to extended range (Reflected 1350% maps to 108.9%) without changing the black level.');
	this.custBhi.style.display = 'none';
	this.custBhi.appendChild(this.custBhiInfo);
};
LUTInfoBox.prototype.createCustBgm = function() {
	this.custBgm = document.createElement('div');
	this.custBgm.setAttribute('class','instructions');
	this.custBgm.setAttribute('id','cust-bgm');
	this.custBgmBack = document.createElement('input');
	this.custBgmBack.setAttribute('type','button');
	this.custBgmBack.value = 'Back';
	this.custBgm.appendChild(this.custBgmBack);
	this.custBgmInfo = document.createElement('div');
	this.custBgmInfo.setAttribute('class','infotext');
	var fig1 = document.createElement('div');
	fig1.setAttribute('class','ins-cust-fig');
	fig1.setAttribute('id','ins-cust-bgm-1');
	this.custBgmInfo.appendChild(fig1);
	this.addInfo(this.custBgmInfo,false,null,'Black Gamma is a tool for adjusting contrast in the shadows without altering the level of black itself.');
	this.addInfo(this.custBgmInfo,false,'Stop Limit','This sets the maximum level at which black gamma has an effect. As with the other tools in LUTCalc, it is set based upon the real-world levels being recorded. The value is in stops, with zero being the level of an 18% gray target.');
	this.addInfo(this.custBgmInfo,false,'Feather','This attempts to smooth the transition between the black gamma and the underlying tone curve. It sets the number of stops below the stop limit in which to transition between the two.');
	this.addInfo(this.custBgmInfo,false,'Power','Sets the gamma or power value for the black gamma region. Values below 1 lead to reduced contrast, whilst values above 1 lead to increased contrast, emphasising shadows. A value of 1 has no effect.');
	this.custBgm.style.display = 'none';
	this.custBgm.appendChild(this.custBgmInfo);
};
LUTInfoBox.prototype.createCustGlim = function() {
	this.custGlim = document.createElement('div');
	this.custGlim.setAttribute('class','instructions');
	this.custGlim.setAttribute('id','cust-glim');
	this.custGlimBack = document.createElement('input');
	this.custGlimBack.setAttribute('type','button');
	this.custGlimBack.value = 'Back';
	this.custGlim.appendChild(this.custGlimBack);
	this.custGlimInfo = document.createElement('div');
	this.custGlimInfo.setAttribute('class','infotext');
	this.addInfo(this.custGlimInfo,false,null,'When going from a wide gamut, such as ACES or Arri Wide Gamut to a narrower one, such as Rec709 or sRGB, the range of colours outside of the destination gamut will generally result in RGB values beyond what is legal or even recordable within a limited codec range.');
	this.addInfo(this.custGlimInfo,false,null,'Tone maps and gamma corrections reduce this issue, and hard clipping can prevent it, but at the risk of unexpected colours and harsh transitions.');
	this.addInfo(this.custGlimInfo,false,null,'The Gamut Limiter tool aims to protect against out-of-bounds colours by desaturating anything too vibrant back within limits.');
	this.addInfo(this.custGlimInfo,false,null,'It can either be applied in linear space or more usually after all other tonemaps, gamma corrections and other contrast adjustments have been made.');
	var fig1 = document.createElement('div');
	fig1.setAttribute('class','ins-cust-fig');
	fig1.setAttribute('id','ins-cust-glim-1');
	this.custGlimInfo.appendChild(fig1);
	this.addInfo(this.custGlimInfo,false,'Post Gamma','Applied after all other contrast adjustments, the Gamut Limiter will ensure that colour values do not go out of range on the final image.');
	this.addInfo(this.custGlimInfo,false,null,'By default, any pixel which has a difference of greater than 100% IRE between the brightest and darkest colour channel will be adjusted such that the difference is limited to 100% whilst maintaining the luma value.');
	this.addInfo(this.custGlimInfo,false,null,"The tolerance can be reduced, by adjusting the 'Level' value down, resulting in increasingly desaturated highlights, then midtones then shadows and can also be increased to 109%.");
	var fig2 = document.createElement('div');
	fig2.setAttribute('class','ins-cust-fig');
	fig2.setAttribute('id','ins-cust-glim-2');
	this.custGlimInfo.appendChild(fig2);
	this.addInfo(this.custGlimInfo,false,'Linear Space','This option applies the limiting to the pure, linear signal which is used for colour transform operations. It is rather less straightforward to use, with the level set according to the stops above 18% Mid Gray or 90% reflectance white.');
	this.addInfo(this.custGlimInfo,false,null,'As such, the effectiveness is determined by the white clip of the output gamma / tonemap used. The default fits to an un-kneed linear or basic gamma (Rec709, DCI). Log recordings potentially have considerably more highlight latitude available than this. The level should therefore be set with regard to white clip of the IRE vs Stop charts.');
	this.addInfo(this.custGlimInfo,false,null,"The potential usefulness of the linear space option is that it is mathematically simpler and arguably 'truer', with desaturation calculated against luminance.");
	var fig3 = document.createElement('div');
	fig3.setAttribute('class','ins-cust-fig');
	fig3.setAttribute('id','ins-cust-glim-3');
	this.custGlimInfo.appendChild(fig3);
	this.addInfo(this.custGlimInfo,false,'Gamut To Limit To','In addition to the output gamut, it is possible to limit chroma to within a second gamut. This might be useful where a finished clip may then be gamma and gamut corrected for a secondary use, such as Rec709 and P3 DCI versions.');
	this.addInfo(this.custGlimInfo,false,null,'Whilst limiting could be done separately for each version, applying to both offers the potential of consistency between different output applications.');
	this.addInfo(this.custGlimInfo,false,null,"By default when a second gamut is selected from the drop down box, both options will be limited to, and a tick box will show 'Protect Both'");
	this.addInfo(this.custGlimInfo,false,null,'Unticking this wil result in only the secondary gamut being considered in the limiting process.');
	this.custGlim.style.display = 'none';
	this.custGlim.appendChild(this.custGlimInfo);
};
LUTInfoBox.prototype.createCustFC = function() {
	this.custFC = document.createElement('div');
	this.custFC.setAttribute('class','instructions');
	this.custFC.setAttribute('id','cust-fls');
	this.custFCBack = document.createElement('input');
	this.custFCBack.setAttribute('type','button');
	this.custFCBack.value = 'Back';
	this.custFC.appendChild(this.custFCBack);
	this.custFCInfo = document.createElement('div');
	this.custFCInfo.setAttribute('class','infotext');
	var fig1 = document.createElement('div');
	fig1.setAttribute('class','ins-cust-fig');
	fig1.setAttribute('id','ins-cust-fc-1');
	this.custFCInfo.appendChild(fig1);
	this.addInfo(this.custFCInfo,false,null,"'False Colour' changes luminance ranges to fixed colours as an exposure aid for wide dynamic range log recording.");
	this.addInfo(this.custFCInfo,false,null,'The colours and ranges LUTCalc uses are based on those used by Sony. They are:');
	this.addInfo(this.custFCInfo,true,'Purple','Black clip (actually 10 stops below 18% gray).');
	this.addInfo(this.custFCInfo,true,'Blue','Just above black clip. Default is 6.1 stops below 18% gray, but this can be changed to taste.');
	this.addInfo(this.custFCInfo,true,'Green','18% gray +/- 0.2 stops. Exposure datum.');
	this.addInfo(this.custFCInfo,true,'Pink','One stop over 18% gray +/- 0.175 stops. Common reference for caucasian skin.');
	this.addInfo(this.custFCInfo,true,'Orange','90% white +/- 0.175 stops. Off by default as not included by Sony, 90% white is a common datum in broadcast video.');
	this.addInfo(this.custFCInfo,true,'Yellow','Just below white clip. The default is 0.26 stops below clip, but this can also be changed.');
	this.addInfo(this.custFCInfo,true,'Red','White clip (5.95 stops above 18% gray).');
	this.addInfo(this.custFCInfo,false,null,'False colours map to the original real world exposure levels, regardless of the chosen input and output colour spaces.');
	this.addInfo(this.custFCInfo,false,null,'False colour LUTs should be 33x33x33 or larger.');
	this.custFC.style.display = 'none';
	this.custFC.appendChild(this.custFCInfo);
};
LUTInfoBox.prototype.createCustSamp = function() {
	this.custSamp = document.createElement('div');
	this.custSamp.setAttribute('class','instructions');
	this.custSamp.setAttribute('id','cust-samp');
	this.custSampBack = document.createElement('input');
	this.custSampBack.setAttribute('type','button');
	this.custSampBack.value = 'Back';
	this.custSamp.appendChild(this.custSampBack);
	this.custSampInfo = document.createElement('div');
	this.custSampInfo.setAttribute('class','infotext');
	var fig1 = document.createElement('div');
	fig1.setAttribute('class','ins-cust-fig');
	fig1.setAttribute('id','ins-cust-samp-1');
	this.custSampInfo.appendChild(fig1);
	this.addInfo(this.custSampInfo,false,null,"RGB Sampler is a tool for capturing sets of pixel RGB code values from the preview window. It becomes available when the preview window is visible.");
	this.addInfo(this.custSampInfo,false,null,'A grid of sample point can be constructed, and then used to compare preview images.');
	this.addInfo(this.custSampInfo,false,'Set Sample Grid',"Pressing this initially reveals two further buttons - 'Start Click To Add Sample Point' and 'Reset Grid'.");
	this.addInfo(this.custSampInfo,true,'Start Click To Add Sample Point',"Pressing this allows you to define points on the preview window you wish to sample. Take the cursor over to the preview, click and a circle should appear containing a number - initially '1'. Move and click again and a circle containing '2' will appear. In this way you can build up a set of points to sample. When you have all the points required, you can click 'Stop Click To Add Sample Point' to avoid accidentally adding more. The grid overlay can be hidden by clicking 'Hide Sample Grid'.");
	this.addInfo(this.custSampInfo,false,null,'The actual area sampled is a weighted average of nine pixels at the centre of the circle - much smaller than the circle itself.');
	this.addInfo(this.custSampInfo,true,'Reset Grid','Grayed out until you have created at least one a sample point, this will remove all sample points so that you can start again.');
	this.addInfo(this.custSampInfo,false,'File Name','This is filename under which the samples should be saved.');
	this.addInfo(this.custSampInfo,false,'Component Separator','The separator character to be used between the red, green and blue component values. Defaults to a tab.');
	this.addInfo(this.custSampInfo,false,'Sample Separator','The separator character to be used between each RGB sample. Defaults to a new line.');
	this.addInfo(this.custSampInfo,false,'Sample Precision','The scaling used on the sample values. 8, 10 or 12-bit integers covering full range, or floating point values from -0.07 to 1.09. The online version of LUTCalc is restricted to reading in user images at 8-bit depth, but the Mac App version can read 16-bit tiffs and pngs.');
	this.addInfo(this.custSampInfo,false,'Include Grid Coordinates',"When a set of samples is taken, it automatically includes the filename of the preview image followed by a list of the red, green and blue values. If 'Include Grid Coordinates' is selected, the file will also contain the coordinates on the image (between 0-1.0 of the width and height) of each sample point next to the relevent values. This may be useful if the grid is changed between samples.");
	this.addInfo(this.custSampInfo,false,'Take Samples','Click this to read a set of samples from the image.');
	this.addInfo(this.custSampInfo,false,'Save Samples','Save all currently collected samples to a file.');
	this.addInfo(this.custSampInfo,false,'Clear Sample Data','Clear all currently collected samples from memory. Once you have saved your sample file, you can either continue to build up more data or press this button to start afresh.');
	this.custSamp.style.display = 'none';
	this.custSamp.appendChild(this.custSampInfo);
};
LUTInfoBox.prototype.createCustLA = function() {
	this.custLA = document.createElement('div');
	this.custLA.setAttribute('class','instructions');
	this.custLA.setAttribute('id','cust-lut');
	this.custLABack = document.createElement('input');
	this.custLABack.setAttribute('type','button');
	this.custLABack.value = 'Back';
	this.custLA.appendChild(this.custLABack);
	this.custLAInfo = document.createElement('div');
	this.custLAInfo.setAttribute('class','infotext');
	var fig1 = document.createElement('div');
	fig1.setAttribute('class','ins-cust-fig');
	fig1.setAttribute('id','ins-cust-la-1');
	this.custLAInfo.appendChild(fig1);
	this.addInfo(this.custLAInfo,false,null,'LUTAnalyst is a tool for reading LUT files and converting them for use on S-Log3/S-Gamut3.cine material.');
	this.addInfo(this.custLAInfo,false,null,'It currently understands the following formats: .cube, .3dl, .ilut, .olut, .lut (Assimilate format), .spi1D, .spi3D and .vlt.');
	this.addInfo(this.custLAInfo,false,null,'Once a file is loaded LUTCalc can create a generalised 1D LUT of the transfer function or gamma and a generally close approximation of the colour space.');
	this.addInfo(this.custLAInfo,false,null,"There are several potential uses for the 'LALUTs' produced:");
	this.addInfo(this.custLAInfo,true,'Information',"Visualise the response curves and exposure characteristics of customised or 'hand rolled' LUTs generated by grading software.");
	this.addInfo(this.custLAInfo,true,'Exposure Adjustment','Ideally software should read video file metadata to automatically apply exposure adjustment. Frequently this does not currently happen, so combining exposure adjustment and colour correction into one LUT can help whilst preventing data loss to clipped values.');
	this.addInfo(this.custLAInfo,true,'Camera Matching','If different camera models are used together, versions of a LUT tuned to each camera can be produced, hopefully simplifying the process of matching in post.');
	this.addInfo(this.custLAInfo,false,null,"By selecting 'Load Existing Analysed LA LUT' LUTAnalyst can load a precalculated LALUT file and add the gamma and gamut to the list of available options. LALUT files end in either .lalut or .labin.");
	this.addInfo(this.custLAInfo,false,null,"Selecting a functional cube LUT file under the 'Import New LUT' option starts a two-stage process.");
	var fig2 = document.createElement('div');
	fig2.setAttribute('class','ins-cust-fig');
	fig2.setAttribute('id','ins-cust-la-2');
	this.custLAInfo.appendChild(fig2);
	this.addInfo(this.custLAInfo,false,null,"If the LUT contains a title line, then this should appear under 'LUT Title'. If not, the filename is used which can then be changed.");
	this.addInfo(this.custLAInfo,false,null,'The input gamma and gamut that the LUT is designed for should then be specified.');
	this.addInfo(this.custLAInfo,false,null,'LUTAnalyst breaks up a LUT into a 1D transfer function and a 3D colour space. The dimension of the colour space LALUT can be 33x33x33 or 65x65x65. The way that LUTAnalyst now works, matching the analysis dimension to the LUT being analysed, but larger can sometimes be helpful, so 65x65x65 is the default.');
	this.addInfo(this.custLAInfo,false,null,'Analysis Method relates to the 3D interpolation technique used. Tricubic is smooth and complex, but prone to overshoots, tetrahedral is the most computationally simple and is becoming the standard approach in postproduction LUT use and trilinear is a 3D extension on linear interpolation. Tetrahedral is the default.');
	this.addInfo(this.custLAInfo,false,null,'The final main options are the input and output ranges of the LUT to be analysed. LUTCalc defaults to 109%->100% as this is a common setup, but diferences between range settings can be surprisingly subtle, so testing may well be required.');
	this.addInfo(this.custLAInfo,false,null,"Clicking the 'Advanced Settings' box brings up the option to specify the interpolation techniques used to apply the analysed LUT to the preview window and for final LUT generation.");
	this.addInfo(this.custLAInfo,false,null,"'Advanced Settings' also includes a 'Declip' button which becomes available when a LUT to be analysed has been clipped to within a range of 0-1.0. If this does not apply, the button is marked 'Unclipped' and grayed out. Otherwise 'Declip' attempts to extrapolate back the lost clipped data. It is not always an improvement, but can sometimes be helpful.");
	this.addInfo(this.custLAInfo,false,null,"Pressing 'New LUT' at any time restarts the whole process, but clicking 'Analyse' should start a process which takes a few seconds. When complete, the analysed LUT should appear as an option at the end of the gamma and gamut lists, and one or two new buttons should appear in the LUTAnalyst box.");
	var fig3 = document.createElement('div');
	fig3.setAttribute('class','ins-cust-fig');
	fig3.setAttribute('id','ins-cust-la-3');
	this.custLAInfo.appendChild(fig3);
	this.addInfo(this.custLAInfo,false,null,"'Save Cube' stores the 1D and 3D LUTAnalyst LUTs as a single file combining two cube files. 'Save Binary' stores them in a smaller, simpler binary format. LUTCalc For Mac cannot currently save the binary versions, though it can read them.");
	this.addInfo(this.custLAInfo,false,null,"'Re-Analyse' reperforms the analysis, for example if the LUT Range was incorrectly set.");
	this.custLA.style.display = 'none';
	this.custLA.appendChild(this.custLAInfo);
};
LUTInfoBox.prototype.addInfo = function(infoBox,indent,title,text) {
	var para = document.createElement('p');
	if (indent) {
		para.setAttribute('class','indentpara');
	}
	if (typeof title === 'string') {
		var titleText = document.createElement('strong');
		titleText.appendChild(document.createTextNode(title));
		para.appendChild(titleText);
		para.appendChild(document.createTextNode(' - '));
	}
	para.appendChild(document.createTextNode(text));
	infoBox.appendChild(para);
};
LUTInfoBox.prototype.gammaInfo = function() {
	this.tableRefVals = new Float64Array([0,0.18,0.38,0.44,0.9,7.2,Math.pow(2,parseFloat(this.inputs.wclip))*0.18]);
	this.tableIREVals = new Float64Array(7);
	this.gammaInfoBox.setAttribute('class','graybox infobox');
	this.addText(this.gammaInfoBox,'Output gamma including any customisations:');
	var curires = document.createElement('table');
	curires.setAttribute('class','ref-table');
	var curiresHead = document.createElement('thead');
	curiresHead.appendChild(this.addRow(['Reflected %','0','18','38','44','90','720','Clip'], 'th'));
	curires.appendChild(curiresHead);
	var curiresBody = document.createElement('tbody');
	var curvarsRow = this.addRow(['10-bit Values','-','-','-','-','-','-','-'],'td');
	this.lutOutVals = [];
	[].push.apply(this.lutOutVals,curvarsRow.getElementsByTagName('td'));
	var curiresRow = this.addRow(['LUTted %IRE','-','-','-','-','-','-','-'],'td');
	this.lutOutIREs = [];
	[].push.apply(this.lutOutIREs,curiresRow.getElementsByTagName('td'));
	curiresBody.appendChild(curiresRow);
	curiresBody.appendChild(curvarsRow);
	curires.appendChild(curiresBody);
	this.gammaInfoBox.appendChild(curires);

	this.addText(this.gammaInfoBox,'Post LUT:');
	var tableStopsNeg = document.createElement('table');
	tableStopsNeg.setAttribute('class','ire-table');
	var tableStopsNegHead = document.createElement('thead');
	tableStopsNegHead.appendChild(this.addRow(['Stop','-8','-7','-6','-5','-4','-3','-2','-1','0'], 'th'));
	tableStopsNeg.appendChild(tableStopsNegHead);
	var tableStopsNegBody = document.createElement('tbody');
	var tableVarsNegRow = this.addRow(['10-bit','-','-','-','-','-','-','-','-','-'],'td');
	this.tableStopsNegVals = [];
	[].push.apply(this.tableStopsNegVals,tableVarsNegRow.getElementsByTagName('td'));
	var tableIREsNegRow = this.addRow(['%IRE','-','-','-','-','-','-','-','-','-'],'td');
	this.tableStopsNegIREs = [];
	[].push.apply(this.tableStopsNegIREs,tableIREsNegRow.getElementsByTagName('td'));
	tableStopsNegBody.appendChild(tableIREsNegRow);
	tableStopsNegBody.appendChild(tableVarsNegRow);
	tableStopsNeg.appendChild(tableStopsNegBody);
	this.gammaInfoBox.appendChild(tableStopsNeg);
	var tableStopsPos = document.createElement('table');
	tableStopsPos.setAttribute('class','ire-table');
	var tableStopsPosHead = document.createElement('thead');
	tableStopsPosHead.appendChild(this.addRow(['Stop','0','1','2','3','4','5','6','7','8'], 'th'));
	tableStopsPos.appendChild(tableStopsPosHead);
	var tableStopsPosBody = document.createElement('tbody');
	var tableVarsPosRow = this.addRow(['10-bit','-','-','-','-','-','-','-','-','-'],'td');
	this.tableStopsPosVals = [];
	[].push.apply(this.tableStopsPosVals,tableVarsPosRow.getElementsByTagName('td'));
	var tableIREsPosRow = this.addRow(['%IRE','-','-','-','-','-','-','-','-','-'],'td');
	this.tableStopsPosIREs = [];
	[].push.apply(this.tableStopsPosIREs,tableIREsPosRow.getElementsByTagName('td'));
	tableStopsPosBody.appendChild(tableIREsPosRow);
	tableStopsPosBody.appendChild(tableVarsPosRow);
	tableStopsPos.appendChild(tableStopsPosBody);
	this.gammaInfoBox.appendChild(tableStopsPos);

	this.preLUTLabel = document.createElement('p');
	this.preLUTLabel.innerHTML = 'Pre LUT - ' + this.gammaInName + ':';
	this.gammaInfoBox.appendChild(this.preLUTLabel);
	var tableStopsPreNeg = document.createElement('table');
	tableStopsPreNeg.setAttribute('class','ire-table');
	var tableStopsPreNegHead = document.createElement('thead');
	tableStopsPreNegHead.appendChild(this.addRow(['Stop','-8','-7','-6','-5','-4','-3','-2','-1','0'], 'th'));
	tableStopsPreNeg.appendChild(tableStopsPreNegHead);
	var tableStopsPreNegBody = document.createElement('tbody');
	var tableVarsPreNegRow = this.addRow(['10-bit','-','-','-','-','-','-','-','-','-'],'td');
	this.tableStopsPreNegVals = [];
	[].push.apply(this.tableStopsPreNegVals,tableVarsPreNegRow.getElementsByTagName('td'));
	var tableIREsPreNegRow = this.addRow(['%IRE','-','-','-','-','-','-','-','-','-'],'td');
	this.tableStopsPreNegIREs = [];
	[].push.apply(this.tableStopsPreNegIREs,tableIREsPreNegRow.getElementsByTagName('td'));
	tableStopsPreNegBody.appendChild(tableIREsPreNegRow);
	tableStopsPreNegBody.appendChild(tableVarsPreNegRow);
	tableStopsPreNeg.appendChild(tableStopsPreNegBody);
	this.gammaInfoBox.appendChild(tableStopsPreNeg);
	var tableStopsPrePos = document.createElement('table');
	tableStopsPrePos.setAttribute('class','ire-table');
	var tableStopsPrePosHead = document.createElement('thead');
	tableStopsPrePosHead.appendChild(this.addRow(['Stop','0','1','2','3','4','5','6','7','8'], 'th'));
	tableStopsPrePos.appendChild(tableStopsPrePosHead);
	var tableStopsPrePosBody = document.createElement('tbody');
	var tableVarsPrePosRow = this.addRow(['10-bit','-','-','-','-','-','-','-','-','-'],'td');
	this.tableStopsPrePosVals = [];
	[].push.apply(this.tableStopsPrePosVals,tableVarsPrePosRow.getElementsByTagName('td'));
	var tableIREsPrePosRow = this.addRow(['%IRE','-','-','-','-','-','-','-','-','-'],'td');
	this.tableStopsPrePosIREs = [];
	[].push.apply(this.tableStopsPrePosIREs,tableIREsPrePosRow.getElementsByTagName('td'));
	tableStopsPrePosBody.appendChild(tableIREsPrePosRow);
	tableStopsPrePosBody.appendChild(tableVarsPrePosRow);
	tableStopsPrePos.appendChild(tableStopsPrePosBody);
	this.gammaInfoBox.appendChild(tableStopsPrePos);
};
LUTInfoBox.prototype.gammaChart = function() {
	var m = 129;
	var d = m - 1;
	var k;
	this.gammaInName = '';
	this.gammaOutName = '';
	this.refX = new Float64Array(m);
	this.stopX = new Float64Array(m);
	this.lutIn = new Float64Array(m);
	for (var j=0; j<m; j++) {
		k = j/d;
		this.refX[j] = 14*k;
		this.stopX[j] = (16*k)-8;
		this.lutIn[j] = k;
	}
	this.refIn = new Float64Array(m);
	this.refOut = new Float64Array(m);
	this.stopIn = new Float64Array(m);
	this.stopOut = new Float64Array(m);
	this.lutOut = new Float64Array(m);

	this.gammaChartBox.setAttribute('class','graybox infobox');
	this.chartType = [];
	this.chartType[0] = this.createRadioElement('charttype', false);
	this.gammaChartBox.appendChild(this.chartType[0]);
	this.gammaChartBox.appendChild(document.createElement('label').appendChild(document.createTextNode('Reflected/IRE')));
	this.chartType[1] = this.createRadioElement('charttype', true);
	this.gammaChartBox.appendChild(this.chartType[1]);
	this.gammaChartBox.appendChild(document.createElement('label').appendChild(document.createTextNode('Stop/IRE')));
	this.chartType[2] = this.createRadioElement('charttype', false);
	this.gammaChartBox.appendChild(this.chartType[2]);
	this.gammaChartBox.appendChild(document.createElement('label').appendChild(document.createTextNode('LUT In/LUT Out')));
	this.gammaChartBox.appendChild(document.createElement('br'));
	this.buildChart();
	// Tables for chart display
	this.gammaChartBox.appendChild(document.createTextNode('Output gamma including any customisations:'));
	var curires = document.createElement('table');
	var curiresHead = document.createElement('thead');
	curiresHead.appendChild(this.addRow(['Reflected %','0','18','38','44','90','720','Clip'], 'th'));
	curires.appendChild(curiresHead);
	var curiresBody = document.createElement('tbody');
	var curvarsRow = this.addRow(['10-bit Values','-','-','-','-','-','-','-'],'td');
	this.lutOutValsChart = [];
	[].push.apply(this.lutOutValsChart,curvarsRow.getElementsByTagName('td'));
	var curiresRow = this.addRow(['LUTted %IRE','-','-','-','-','-','-','-'],'td');
	this.lutOutIREsChart = [];
	[].push.apply(this.lutOutIREsChart,curiresRow.getElementsByTagName('td'));
	curiresBody.appendChild(curiresRow);
	curiresBody.appendChild(curvarsRow);
	curires.appendChild(curiresBody);
	this.gammaChartBox.appendChild(curires);
};
LUTInfoBox.prototype.printTables = function() {
	var printLabel = document.createElement('p');
	printLabel.innerHTML = 'Output gamma including any customisations:';
	this.printBox.appendChild(printLabel);
	var printires = document.createElement('table');
	var printiresHead = document.createElement('thead');
	printiresHead.appendChild(this.addRow(['Reflected %','0','18','38','44','90','720','Clip'], 'th'));
	printires.appendChild(printiresHead);
	var printiresBody = document.createElement('tbody');
	var printvarsRow = this.addRow(['10-bit Values','-','-','-','-','-','-','-'],'td');
	this.printOutVals = [];
	[].push.apply(this.printOutVals,printvarsRow.getElementsByTagName('td'));
	var printiresRow = this.addRow(['%IRE','-','-','-','-','-','-','-'],'td');
	this.printOutIREs = [];
	[].push.apply(this.printOutIREs,printiresRow.getElementsByTagName('td'));
	printiresBody.appendChild(printiresRow);
	printiresBody.appendChild(printvarsRow);
	printires.appendChild(printiresBody);
	this.printBox.appendChild(printires);
	this.printBox.appendChild(document.createElement('br'));
	var printstopsNeg = document.createElement('table');
	var printstopsNegHead = document.createElement('thead');
	printstopsNegHead.appendChild(this.addRow(['Stop','-8','-7','-6','-5','-4','-3','-2','-1','0'], 'th'));
	printstopsNeg.appendChild(printstopsNegHead);
	var printstopsNegBody = document.createElement('tbody');
	var printvarsNegRow = this.addRow(['10-bit','-','-','-','-','-','-','-','-','-'],'td');
	this.printstopsNegVals = [];
	[].push.apply(this.printstopsNegVals,printvarsNegRow.getElementsByTagName('td'));
	var printiresNegRow = this.addRow(['%IRE','-','-','-','-','-','-','-','-','-'],'td');
	this.printstopsNegIREs = [];
	[].push.apply(this.printstopsNegIREs,printiresNegRow.getElementsByTagName('td'));
	printstopsNegBody.appendChild(printiresNegRow);
	printstopsNegBody.appendChild(printvarsNegRow);
	printstopsNeg.appendChild(printstopsNegBody);
	this.printBox.appendChild(printstopsNeg);
	var printstopsPos = document.createElement('table');
	var printstopsPosHead = document.createElement('thead');
	printstopsPosHead.appendChild(this.addRow(['Stop','0','1','2','3','4','5','6','7','8'], 'th'));
	printstopsPos.appendChild(printstopsPosHead);
	var printstopsPosBody = document.createElement('tbody');
	var printvarsPosRow = this.addRow(['10-bit','-','-','-','-','-','-','-','-','-'],'td');
	this.printstopsPosVals = [];
	[].push.apply(this.printstopsPosVals,printvarsPosRow.getElementsByTagName('td'));
	var printiresPosRow = this.addRow(['%IRE','-','-','-','-','-','-','-','-','-'],'td');
	this.printstopsPosIREs = [];
	[].push.apply(this.printstopsPosIREs,printiresPosRow.getElementsByTagName('td'));
	printstopsPosBody.appendChild(printiresPosRow);
	printstopsPosBody.appendChild(printvarsPosRow);
	printstopsPos.appendChild(printstopsPosBody);
	this.printBox.appendChild(printstopsPos);
	this.printBox.appendChild(document.createElement('br'));
	var lutLabel = document.createElement('p');
	lutLabel.innerHTML = 'LUT In vs LUT out:';
	this.printBox.appendChild(lutLabel);
};
LUTInfoBox.prototype.buildChart = function() {
	var point = '18';
	var cwidth = 1120;
	var cheight = 600;
	var w = cwidth * 0.98;
	var h = cheight;
	var yMin = h / 15;
	var yMax = yMin*0.5;
	var dY = (h - (1.5*yMin))/1023;
	var yA = dY * 876;
	var yB = dY * 64;
	var y0 = h - yMin - yB;
	var x0 = w / 10;
	var dX = (w - x0)/16;
	// Reflected Against IRE
	var canvas1 = document.createElement('canvas');
	canvas1.id = 'chartcanvas1';
	var ctx1 = canvas1.getContext('2d');
	canvas1.width = cwidth;
	canvas1.height = cheight;
	dX = (w - x0)/14;
	ctx1.fillStyle = 'black';
	ctx1.font = point + 'pt "Avant Garde", Avantgarde, "Century Gothic", CenturyGothic, "AppleGothic", sans-serif';
	ctx1.textBaseline = 'middle';
	ctx1.textAlign = 'right';
	ctx1.strokeStyle='black';
	ctx1.beginPath();
	ctx1.lineWidth = 2;
	ctx1.fillText('109.5%', x0 * 0.9,yMax);
	ctx1.fillText('100%', x0 * 0.9,y0 - yA);
	ctx1.fillText('0%', x0 * 0.9,h - yB - yMin);
	ctx1.fillText('-7.3%', x0 * 0.9,h - yMin);
	ctx1.moveTo(x0,y0);
	ctx1.lineTo(w,y0);
	ctx1.moveTo(x0,yMax);
	ctx1.lineTo(x0,h - yMin);
	ctx1.stroke();
	ctx1.beginPath();
	ctx1.strokeStyle='rgba(240, 176, 176, 0.5)';
	ctx1.moveTo(x0,h - yMin);
	ctx1.lineTo(w,h - yMin);
	ctx1.moveTo(x0,y0 - yA);
	ctx1.lineTo(w,y0 - yA);
	ctx1.moveTo(x0,yMax);
	ctx1.lineTo(w,yMax);
	ctx1.stroke();
	ctx1.beginPath();
	ctx1.strokeStyle='rgba(176, 176, 240, 0.5)';
	for (var i=1; i<10; i++){
		ctx1.fillText(parseInt(i*10).toString() + '%', x0 * 0.9,y0 - (yA*i/10));
		ctx1.moveTo(x0,y0 - (yA*i/10));
		ctx1.lineTo(w,y0 - (yA*i/10));
	}
	for (var i=0; i<15; i++){
		ctx1.translate(x0 + (i*dX) + (w/150) + 10,y0 + (1.75*yB) + 10);
		ctx1.rotate(1);
		ctx1.fillText(parseInt(i*100).toString() + '%', 0, 0);
		ctx1.rotate(-1);
		ctx1.translate(-x0 - (i*dX) - (w/150) - 10,-y0 - (1.75*yB) - 10);
		ctx1.moveTo(x0 + (dX*i),yMax);
		ctx1.lineTo(x0 + (dX*i),h - yMin);
	}
	ctx1.stroke();
	var recCanvas1 = document.createElement('canvas');
	recCanvas1.id = 'reccanvas1';
	recCanvas1.width = canvas1.width;
	recCanvas1.height = canvas1.height;
	var outCanvas1 = document.createElement('canvas');
	outCanvas1.id = 'outcanvas1';
	outCanvas1.width = canvas1.width;
	outCanvas1.height = canvas1.height;
	var clipCanvas1 = document.createElement('canvas');
	clipCanvas1.id = 'clipcanvas1';
	clipCanvas1.width = canvas1.width;
	clipCanvas1.height = canvas1.height;
	this.refChart = {};
	this.refChart.rec = recCanvas1.getContext('2d');
	this.refChart.out = outCanvas1.getContext('2d');
	this.refChart.clip = clipCanvas1.getContext('2d');
	this.refChart.width = canvas1.width;
	this.refChart.w = w;
	this.refChart.x0 = x0;
	this.refChart.dX = dX;
	this.refChart.height = canvas1.height;
	this.refChart.h = h;
	this.refChart.y0 = y0;
	this.refChart.yMax = yMax;
	this.refChart.dY = yA;
	this.gammaChartBox.appendChild(canvas1);
	this.gammaChartBox.appendChild(clipCanvas1);
	this.gammaChartBox.appendChild(recCanvas1);
	this.gammaChartBox.appendChild(outCanvas1);
	canvas1.style.display = 'none';
	recCanvas1.style.display = 'none';
	outCanvas1.style.display = 'none';
	clipCanvas1.style.display = 'none';
	// Stop Against IRE
	var canvas2 = document.createElement('canvas');
	canvas2.id = 'chartcanvas2';
	var ctx2 = canvas2.getContext('2d');
	canvas2.width = cwidth;
	canvas2.height = cheight;
	dX = (w - x0)/18;
	ctx2.fillStyle = 'black';
	ctx2.font = point + 'pt "Avant Garde", Avantgarde, "Century Gothic", CenturyGothic, "AppleGothic", sans-serif';
	ctx2.textBaseline = 'middle';
	ctx2.textAlign = 'right';
	ctx2.strokeStyle='black';
	ctx2.beginPath();
	ctx2.lineWidth = 2;
	ctx2.fillText('109.5%', x0 * 0.9,yMax);
	ctx2.fillText('100%', x0 * 0.9,y0 - yA);
	ctx2.fillText('0%', x0 * 0.9,h - yB - yMin);
	ctx2.fillText('-7.3%', x0 * 0.9,h - yMin);
	ctx2.moveTo(x0,y0);
	ctx2.lineTo(w,y0);
	ctx2.moveTo(x0 + (dX*9),yMax);
	ctx2.lineTo(x0 + (dX*9),h - yMin);
	ctx2.stroke();
	ctx2.beginPath();
	ctx2.strokeStyle='rgba(240, 176, 176, 0.5)';
	ctx2.moveTo(x0,h - yMin);
	ctx2.lineTo(w,h - yMin);
	ctx2.moveTo(x0,y0 - yA);
	ctx2.lineTo(w,y0 - yA);
	ctx2.moveTo(x0,yMax);
	ctx2.lineTo(w,yMax);
	ctx2.stroke();
	ctx2.beginPath();
	ctx2.strokeStyle='rgba(176, 176, 240, 0.5)';
	for (var i=1; i<10; i++){
		ctx2.fillText(parseInt(i*10).toString() + '%', x0 * 0.9,y0 - (yA*i/10));
		ctx2.moveTo(x0,y0 - (yA*i/10));
		ctx2.lineTo(w,y0 - (yA*i/10));
	}
	for (var i=0; i<19; i++){
		ctx2.fillText(parseInt(i-9).toString(), x0 + (i*dX) + (w/150),y0 + (1.75*yB));
		ctx2.moveTo(x0 + (dX*i),yMax);
		ctx2.lineTo(x0 + (dX*i),h - yMin);
	}
	ctx2.stroke();
	var recCanvas2 = document.createElement('canvas');
	recCanvas2.id = 'reccanvas2';
	recCanvas2.width = canvas2.width;
	recCanvas2.height = canvas2.height;
	var outCanvas2 = document.createElement('canvas');
	outCanvas2.id = 'outcanvas2';
	outCanvas2.width = canvas2.width;
	outCanvas2.height = canvas2.height;
	var clipCanvas2 = document.createElement('canvas');
	clipCanvas2.id = 'clipcanvas2';
	clipCanvas2.width = canvas2.width;
	clipCanvas2.height = canvas2.height;
	this.stopChart = {};
	this.stopChart.rec = recCanvas2.getContext('2d');
	this.stopChart.out = outCanvas2.getContext('2d');
	this.stopChart.clip = clipCanvas2.getContext('2d');
	this.stopChart.width = canvas2.width;
	this.stopChart.w = w;
	this.stopChart.x0 = x0;
	this.stopChart.dX = dX;
	this.stopChart.height = canvas2.height;
	this.stopChart.h = h;
	this.stopChart.y0 = y0;
	this.stopChart.yMax = yMax;
	this.stopChart.dY = yA;
	this.gammaChartBox.appendChild(canvas2);
	this.gammaChartBox.appendChild(clipCanvas2);
	this.gammaChartBox.appendChild(recCanvas2);
	this.gammaChartBox.appendChild(outCanvas2);
	canvas2.style.display = 'block';
	recCanvas2.style.display = 'block';
	outCanvas2.style.display = 'block';
	clipCanvas2.style.display = 'block';
	// LUT In Against LUT Out
	var canvas3 = document.createElement('canvas');
	canvas3.id = 'chartcanvas3';
	var ctx3 = canvas3.getContext('2d');
	canvas3.width = cwidth;
	canvas3.height = cheight;
	dX = (w - x0)*876/1023;
//	var xMin = x0 + (64*876/1023);
	var xMin = x0 + (dX*64/876);
	ctx3.fillStyle = 'black';
	ctx3.font = point + 'pt "Avant Garde", Avantgarde, "Century Gothic", CenturyGothic, "AppleGothic", sans-serif';
	ctx3.textBaseline = 'middle';
	ctx3.textAlign = 'right';
	ctx3.strokeStyle='black';
	ctx3.beginPath();
	ctx3.lineWidth = 2;
	ctx3.fillText('109.5%', x0 * 0.9,yMax);
	ctx3.fillText('100%', x0 * 0.9,y0 - yA);
	ctx3.fillText('0%', x0 * 0.9,h - yB - yMin);
	ctx3.fillText('-7.3%', x0 * 0.9,h - yMin);
	ctx3.fillText('-7.3%', x0+ (w/50),y0 + (1.75*yB));
	ctx3.fillText('0%', xMin + (w/50),y0 + (1.75*yB));
	ctx3.fillText('100%', xMin + dX + (w/50),y0 + (1.75*yB));
	ctx3.fillText('109.5%', w + (w/50),y0 + (1.75*yB));
	ctx3.moveTo(x0,y0);
	ctx3.lineTo(w,y0);
	ctx3.moveTo(xMin,yMax);
	ctx3.lineTo(xMin,h - yMin);
	ctx3.stroke();
	ctx3.beginPath();
	ctx3.strokeStyle='rgba(240, 176, 176, 1)';
	ctx3.moveTo(x0,yMax);
	ctx3.lineTo(x0,h - yMin);
	ctx3.moveTo(w,yMax);
	ctx3.lineTo(w,h - yMin);
	ctx3.moveTo(xMin + dX,yMax);
	ctx3.lineTo(xMin + dX,h - yMin);
	ctx3.moveTo(x0,h - yMin);
	ctx3.lineTo(w,h - yMin);
	ctx3.moveTo(x0,y0 - yA);
	ctx3.lineTo(w,y0 - yA);
	ctx3.moveTo(x0,yMax);
	ctx3.lineTo(w,yMax);
	ctx3.stroke();
	ctx3.beginPath();
	ctx3.strokeStyle='rgba(176, 176, 240, 0.5)';
	for (var i=1; i<10; i++){
		ctx3.fillText(parseInt(i*10).toString() + '%', x0 * 0.9,y0 - (yA*i/10));
		ctx3.moveTo(x0,y0 - (yA*i/10));
		ctx3.lineTo(w,y0 - (yA*i/10));
	}
	for (var i=1; i<10; i++){
		ctx3.fillText(parseInt(i*10).toString()+'%', xMin + (i*dX/10) + (w/50),y0 + (1.75*yB));
		ctx3.moveTo(xMin + (dX*i/10),yMax);
		ctx3.lineTo(xMin + (dX*i/10),h - yMin);
	}
	ctx3.stroke();
	var outCanvas3 = document.createElement('canvas');
	outCanvas3.id = 'outcanvas3';
	outCanvas3.width = canvas3.width;
	outCanvas3.height = canvas3.height;
	var rgbCanvas3 = document.createElement('canvas');
	rgbCanvas3.id = 'rgbcanvas3';
	rgbCanvas3.width = canvas3.width;
	rgbCanvas3.height = canvas3.height;
	this.lutChart = {};
	this.lutChart.out = outCanvas3.getContext('2d');
	this.lutChart.rgb = rgbCanvas3.getContext('2d');
	this.lutChart.width = canvas3.width;
	this.lutChart.w = w;
	this.lutChart.x0 = x0;
	this.lutChart.dX = dX;
	this.lutChart.height = canvas3.height;
	this.lutChart.h = h;
	this.lutChart.y0 = y0;
	this.lutChart.yMax = yMax;
	this.lutChart.dY = yA;
	this.gammaChartBox.appendChild(canvas3);
	this.gammaChartBox.appendChild(outCanvas3);
	this.gammaChartBox.appendChild(rgbCanvas3);
	canvas3.style.display = 'none';
	outCanvas3.style.display = 'none';
	rgbCanvas3.style.display = 'none';
	// Set up printing canvas
	this.printElements = {};
	var printCan2 = document.createElement('canvas');
	printCan2.id = 'printcanvas2';
	printCan2.width = canvas2.width;
	printCan2.height = canvas2.height;
	printCan2.getContext('2d').drawImage(canvas2, 0, 0);
	this.printBox.appendChild(printCan2);
	var printRec2 = document.createElement('canvas');
	printRec2.id = 'printrec2';
	this.printElements.rec2 = printRec2.getContext('2d');
	printRec2.width = canvas2.width;
	printRec2.height = canvas2.height;
	this.printBox.appendChild(printRec2);
	var printOut2 = document.createElement('canvas');
	printOut2.id = 'printout2';
	this.printElements.out2 = printOut2.getContext('2d');
	printOut2.width = canvas2.width;
	printOut2.height = canvas2.height;
	this.printBox.appendChild(printOut2);
	var printClip2 = document.createElement('canvas');
	printClip2.id = 'printclip2';
	this.printElements.clip2 = printClip2.getContext('2d');
	printClip2.width = canvas2.width;
	printClip2.height = canvas2.height;
	this.printBox.appendChild(printClip2);	
	this.printTables();
	var printCan3 = document.createElement('canvas');
	printCan3.id = 'printcanvas3';
	printCan3.width = canvas3.width;
	printCan3.height = canvas3.height;
	printCan3.getContext('2d').drawImage(canvas3, 0, 0);
	this.printBox.appendChild(printCan3);
	var printOut3 = document.createElement('canvas');
	printOut3.id = 'printout3';
	this.printElements.out3 = printOut3.getContext('2d');
	printOut3.width = canvas3.width;
	printOut3.height = canvas3.height;
	this.printBox.appendChild(printOut3);
	// Draw The Lines
//	this.updateGamma();
};
LUTInfoBox.prototype.addText = function(infoBox,text,bold) {
	var para = document.createElement('p');
	if (bold) {
		para.setAttribute('class','bold');
	}
	para.appendChild(document.createTextNode(text));
	infoBox.appendChild(para);
};
LUTInfoBox.prototype.addRow = function(data,section) {
	var max = data.length;
	var row = document.createElement('tr');
	for (var i=0; i < max; i++) {
		var col = document.createElement(section);
		col.appendChild(document.createTextNode(data[i]));
		row.appendChild(col);
	}
	return row;
};
LUTInfoBox.prototype.createRadioElement = function(name, checked) {
    var radioInput;
    try {
        var radioHtml = '<input type="radio" name="' + name + '"';
        if ( checked ) {
            radioHtml += ' checked="checked"';
        }
        radioHtml += '/>';
        radioInput = document.createElement(radioHtml);
    } catch( err ) {
        radioInput = document.createElement('input');
        radioInput.setAttribute('type', 'radio');
        radioInput.setAttribute('name', name);
        if ( checked ) {
            radioInput.setAttribute('checked', 'checked');
        }
    }
    return radioInput;
};
// Event Responses
LUTInfoBox.prototype.instructionsOpt = function() {
	this.showMainscreen();
	this.instructionsBox.style.display = 'block';
	this.gammaInfoBox.style.display = 'none';
	this.gammaChartBox.style.display = 'none';
	this.gammaPrintBut.style.display = 'none';
};
LUTInfoBox.prototype.gammaInfoOpt = function() {
	this.instructionsBox.style.display = 'none';
	this.gammaInfoBox.style.display = 'block';
	this.gammaChartBox.style.display = 'none';
	this.gammaPrintBut.style.display = 'inline';
};
LUTInfoBox.prototype.gammaChartOpt = function() {
	this.instructionsBox.style.display = 'none';
	this.gammaInfoBox.style.display = 'none';
	this.gammaChartBox.style.display = 'block';
	if (this.chartType[1].checked || this.chartType[2].checked) {
		this.gammaPrintBut.style.display = 'inline';
	} else {
		this.gammaPrintBut.style.display = 'none';
	}
};
LUTInfoBox.prototype.gammaPrint = function() {
	var custom = this.messages.isCustomGamma();
	var title = this.inputs.name.value;
	var gamma;
	if (this.inputs.outGamma.options[this.inputs.outGamma.selectedIndex].value !== '9999') {
		gamma = this.inputs.outGamma.options[this.inputs.outGamma.selectedIndex].lastChild.nodeValue;
	} else {
		gamma = this.inputs.outLinGamma.options[this.inputs.outLinGamma.selectedIndex].lastChild.nodeValue;
	}
	if (title === 'Custom LUT') {
		if (custom) {
			title = 'Customised ' + gamma;
		} else {
			title = gamma;
		}
	} else if (custom) {
		title += ' based on ' + gamma;
	}
	this.printTitle.innerHTML = title;
	this.printDetails.innerHTML = 'Made with LUTCalc ' + this.inputs.version;
	this.printElements.rec2.clearRect(0, 0, this.stopChart.width, this.stopChart.height);
	this.printElements.out2.clearRect(0, 0, this.stopChart.width, this.stopChart.height);
	this.printElements.clip2.clearRect(0, 0, this.stopChart.width, this.stopChart.height);
	this.printElements.rec2.drawImage(document.getElementById('reccanvas2'), 0, 0);
	this.printElements.out2.drawImage(document.getElementById('outcanvas2'), 0, 0);
	this.printElements.clip2.drawImage(document.getElementById('clipcanvas2'), 0, 0);
	this.printElements.out3.clearRect(0, 0, this.lutChart.width, this.lutChart.height);
	this.printElements.out3.drawImage(document.getElementById('outcanvas3'), 0, 0);
	if (this.inputs.isApp) {
		window.lutCalcApp.printCharts();
	} else {
		window.print();
	}
};
LUTInfoBox.prototype.updatePrintTables = function() {
	for (var j=0; j<7; j++) {
		if (this.tableIREVals[j] < -0.07305936073059) {
			this.tableIREVals[j] = -0.07305936073059;
		}
		this.printOutIREs[j+1].innerHTML = Math.round(this.tableIREVals[j]*100).toString();
		this.printOutVals[j+1].innerHTML = Math.round((this.tableIREVals[j]*876)+64).toString();
		if (parseInt(this.printOutVals[j+1].innerHTML) > 1023) {
			this.printOutVals[j+1].innerHTML = '-';
			this.printOutIREs[j+1].innerHTML = '-';
		}
	}
	for (var j=0; j<9; j++) {
		if (this.stopVals[j] < -0.07305936073059) {
			this.stopVals[j] = -0.07305936073059;
		}
		this.printstopsNegIREs[j+1].innerHTML = Math.round(this.stopVals[j]*100).toString();
		this.printstopsNegVals[j+1].innerHTML = Math.round((this.stopVals[j]*876)+64).toString();
		this.printstopsPosIREs[j+1].innerHTML = Math.round(this.stopVals[j+8]*100).toString();
		this.printstopsPosVals[j+1].innerHTML = Math.round((this.stopVals[j+8]*876)+64).toString();
		if (parseInt(this.printstopsNegVals[j+1].innerHTML) > 1023) {
			this.printstopsNegVals[j+1].innerHTML = '-';
			this.printstopsNegIREs[j+1].innerHTML = '-';
		}
		if (parseInt(this.printstopsPosVals[j+1].innerHTML) > 1023) {
			this.printstopsPosVals[j+1].innerHTML = '-';
			this.printstopsPosIREs[j+1].innerHTML = '-';
		}
	}
};
LUTInfoBox.prototype.updateTables = function() {
	for (var j=0; j<7; j++) {
		if (this.tableIREVals[j] < -0.07305936073059) {
			this.tableIREVals[j] = -0.07305936073059;
		}
		this.lutOutIREs[j+1].innerHTML = Math.round(this.tableIREVals[j]*100).toString();
		this.lutOutVals[j+1].innerHTML = Math.round((this.tableIREVals[j]*876)+64).toString();
		this.lutOutIREsChart[j+1].innerHTML = Math.round(this.tableIREVals[j]*100).toString();
		this.lutOutValsChart[j+1].innerHTML = Math.round((this.tableIREVals[j]*876)+64).toString();
		if (parseInt(this.lutOutVals[j+1].innerHTML) > 1019) {
			if (j<6) {
				this.lutOutVals[j+1].innerHTML = '-';
				this.lutOutIREs[j+1].innerHTML = '-';
				this.lutOutValsChart[j+1].innerHTML = '-';
				this.lutOutIREsChart[j+1].innerHTML = '-';
			} else {
				this.lutOutVals[j+1].innerHTML = '>1019';
				this.lutOutIREs[j+1].innerHTML = '>109';
				this.lutOutValsChart[j+1].innerHTML = '>1019';
				this.lutOutIREsChart[j+1].innerHTML = '>109';
			}
		}
	}
	this.preLUTLabel.innerHTML = 'Pre LUT - ' + this.gammaInName + ':';
	for (var j=0; j<9; j++) {
		if (this.stopVals[j] < -0.07305936073059) {
			this.stopVals[j] = -0.07305936073059;
		}
		this.tableStopsNegIREs[j+1].innerHTML = Math.round(this.stopVals[j]*100).toString();
		this.tableStopsNegVals[j+1].innerHTML = Math.round((this.stopVals[j]*876)+64).toString();
		this.tableStopsPosIREs[j+1].innerHTML = Math.round(this.stopVals[j+8]*100).toString();
		this.tableStopsPosVals[j+1].innerHTML = Math.round((this.stopVals[j+8]*876)+64).toString();
		if (parseInt(this.tableStopsNegVals[j+1].innerHTML) > 1019) {
			this.tableStopsNegVals[j+1].innerHTML = '-';
			this.tableStopsNegIREs[j+1].innerHTML = '-';
		}
		if (parseInt(this.tableStopsPosVals[j+1].innerHTML) > 1019) {
			this.tableStopsPosVals[j+1].innerHTML = '-';
			this.tableStopsPosIREs[j+1].innerHTML = '-';
		}
		if (this.stopPreVals[j] < -0.07305936073059) {
			this.stopPreVals[j] = -0.07305936073059;
		}
		this.tableStopsPreNegIREs[j+1].innerHTML = Math.round(this.stopPreVals[j]*100).toString();
		this.tableStopsPreNegVals[j+1].innerHTML = Math.round((this.stopPreVals[j]*876)+64).toString();
		this.tableStopsPrePosIREs[j+1].innerHTML = Math.round(this.stopPreVals[j+8]*100).toString();
		this.tableStopsPrePosVals[j+1].innerHTML = Math.round((this.stopPreVals[j+8]*876)+64).toString();
		if (parseInt(this.tableStopsPreNegVals[j+1].innerHTML) > 1019) {
			this.tableStopsPreNegVals[j+1].innerHTML = '-';
			this.tableStopsPreNegIREs[j+1].innerHTML = '-';
		}
		if (parseInt(this.tableStopsPrePosVals[j+1].innerHTML) > 1019) {
			this.tableStopsPrePosVals[j+1].innerHTML = '-';
			this.tableStopsPrePosIREs[j+1].innerHTML = '-';
		}
	}
};
LUTInfoBox.prototype.changeChart = function() {
	if (this.chartType[0].checked) {
		document.getElementById('chartcanvas1').style.display = 'block';
		document.getElementById('reccanvas1').style.display = 'block';
		document.getElementById('outcanvas1').style.display = 'block';
		document.getElementById('clipcanvas1').style.display = 'block';
		document.getElementById('chartcanvas2').style.display = 'none';
		document.getElementById('reccanvas2').style.display = 'none';
		document.getElementById('outcanvas2').style.display = 'none';
		document.getElementById('clipcanvas2').style.display = 'none';
		document.getElementById('chartcanvas3').style.display = 'none';
		document.getElementById('outcanvas3').style.display = 'none';
		document.getElementById('rgbcanvas3').style.display = 'none';
		this.gammaPrintBut.style.display = 'none';
	} else if (this.chartType[1].checked) {
		document.getElementById('chartcanvas1').style.display = 'none';
		document.getElementById('reccanvas1').style.display = 'none';
		document.getElementById('outcanvas1').style.display = 'none';
		document.getElementById('clipcanvas1').style.display = 'none';
		document.getElementById('chartcanvas2').style.display = 'block';
		document.getElementById('reccanvas2').style.display = 'block';
		document.getElementById('outcanvas2').style.display = 'block';
		document.getElementById('clipcanvas2').style.display = 'block';
		document.getElementById('chartcanvas3').style.display = 'none';
		document.getElementById('outcanvas3').style.display = 'none';
		document.getElementById('rgbcanvas3').style.display = 'none';
		this.gammaPrintBut.style.display = 'inline';
	} else{
		document.getElementById('chartcanvas1').style.display = 'none';
		document.getElementById('reccanvas1').style.display = 'none';
		document.getElementById('outcanvas1').style.display = 'none';
		document.getElementById('clipcanvas1').style.display = 'none';
		document.getElementById('chartcanvas2').style.display = 'none';
		document.getElementById('reccanvas2').style.display = 'none';
		document.getElementById('outcanvas2').style.display = 'none';
		document.getElementById('clipcanvas2').style.display = 'none';
		document.getElementById('chartcanvas3').style.display = 'block';
		document.getElementById('outcanvas3').style.display = 'block';
		document.getElementById('rgbcanvas3').style.display = 'block';
		this.gammaPrintBut.style.display = 'inline';
	}
};
LUTInfoBox.prototype.gotIOGammaNames = function(d) {
	this.gammaInName = d.inName;
	if (typeof d.inG !== 'undefined' && d.inG !== '') {
		this.gammaInName += ' - ' + d.inG;
	}
	this.gammaOutName = d.outName;
	if (typeof d.outG !== 'undefined' && d.outG !== '') {
		this.gammaOutName += ' - ' + d.outG;
	}
	if (d.outName === 'LA' ) {
		this.gammaOutName += ' - ' + this.inputs.laTitle.value;
	}
	this.updateRefChart();
	this.updateStopChart();
	this.updateLutChart();
};
LUTInfoBox.prototype.updateRefChart = function() { // Ref Against IRE
	this.refChart.rec.clearRect(0, 0, this.refChart.width, this.refChart.height);
	this.refChart.out.clearRect(0, 0, this.refChart.width, this.refChart.height);
	this.refChart.clip.clearRect(0, 0, this.refChart.width, this.refChart.height);
	this.refChart.rec.font = '28pt "Avant Garde", Avantgarde, "Century Gothic", CenturyGothic, "AppleGothic", sans-serif';
	this.refChart.rec.textBaseline = 'middle';
	this.refChart.rec.textAlign = 'left';
	this.refChart.rec.beginPath();
	this.refChart.rec.strokeStyle='rgba(240, 0, 0, 0.75)';	
	this.refChart.rec.fillStyle = 'rgba(240, 0, 0, 0.75)';
	this.refChart.rec.fillText('In: ' + this.gammaInName, 200,365);
	this.refChart.rec.lineWidth = 4;
	this.refChart.rec.moveTo(this.refChart.x0,this.refChart.y0 - (this.refIn[0] * this.stopChart.dY));
	var max = this.refX.length;
	for (var i=1; i<max; i++) {
		this.refChart.rec.lineTo(this.refChart.x0 + (this.refX[i] * this.refChart.dX),this.refChart.y0 - (this.refIn[i] * this.refChart.dY));
	}
	this.refChart.rec.stroke();
	this.refChart.out.font = '28pt "Avant Garde", Avantgarde, "Century Gothic", CenturyGothic, "AppleGothic", sans-serif';
	this.refChart.out.textBaseline = 'middle';
	this.refChart.out.textAlign = 'left';
	this.refChart.out.beginPath();
	this.refChart.out.strokeStyle='rgba(0, 0, 240, 0.75)';	
	this.refChart.out.fillStyle = 'rgba(0, 0, 240, 0.75)';
	this.refChart.out.fillText('Out: ' + this.gammaOutName, 200,415);
	this.refChart.out.lineWidth = 4;
	this.refChart.out.moveTo(this.refChart.x0,this.refChart.y0 - (this.refOut[0] * this.stopChart.dY));
	for (var i=1; i<max; i++) {
		this.refChart.out.lineTo(this.refChart.x0 + (this.refX[i] * this.refChart.dX),this.refChart.y0 - (this.refOut[i] * this.refChart.dY));
	}
	this.refChart.out.stroke();
	this.refChart.rec.clearRect(0, 0, this.refChart.width, this.refChart.yMax);
	this.refChart.out.clearRect(0, 0, this.refChart.width, this.refChart.yMax);
};
LUTInfoBox.prototype.updateStopChart = function() { // Stop Against IRE
	this.stopChart.rec.clearRect(0, 0, this.stopChart.width, this.stopChart.height);
	this.stopChart.out.clearRect(0, 0, this.stopChart.width, this.stopChart.height);
	this.stopChart.clip.clearRect(0, 0, this.stopChart.width, this.stopChart.height);
	this.stopChart.rec.font = '28pt "Avant Garde", Avantgarde, "Century Gothic", CenturyGothic, "AppleGothic", sans-serif';
	this.stopChart.rec.textBaseline = 'middle';
	this.stopChart.rec.textAlign = 'left';
	this.stopChart.rec.beginPath();
	this.stopChart.rec.strokeStyle='rgba(240, 0, 0, 0.75)';	
	this.stopChart.rec.fillStyle = 'rgba(240, 0, 0, 0.75)';
	this.stopChart.rec.fillText('In: ' + this.gammaInName, 140,85);
	this.stopChart.rec.lineWidth = 4;
	this.stopChart.rec.moveTo(this.stopChart.x0,this.stopChart.y0 - (this.stopIn[0] * this.stopChart.dY));
	var max = this.stopX.length;
	for (var i=1; i<max; i++) {
		this.stopChart.rec.lineTo(this.stopChart.x0 + ((this.stopX[i] + 9) * this.stopChart.dX),this.stopChart.y0 - (this.stopIn[i] * this.stopChart.dY));
	}
	this.stopChart.rec.stroke();
	this.stopChart.out.font = '28pt "Avant Garde", Avantgarde, "Century Gothic", CenturyGothic, "AppleGothic", sans-serif';
	this.stopChart.out.textBaseline = 'middle';
	this.stopChart.out.textAlign = 'left';
	this.stopChart.out.beginPath();
	this.stopChart.out.strokeStyle='rgba(0, 0, 240, 0.75)';	
	this.stopChart.out.fillStyle = 'rgba(0, 0, 240, 0.75)';
	this.stopChart.out.fillText('Out: ' + this.gammaOutName, 140,135);
	this.stopChart.out.lineWidth = 4;
	this.stopChart.out.moveTo(this.stopChart.x0,this.stopChart.y0 - (this.stopOut[0] * this.stopChart.dY));
	for (var i=1; i<max; i++) {
		this.stopChart.out.lineTo(this.stopChart.x0 + ((this.stopX[i] + 9) * this.stopChart.dX),this.stopChart.y0 - (this.stopOut[i] * this.stopChart.dY));
	}
	this.stopChart.out.stroke();
	this.stopChart.rec.clearRect(0, 0, this.stopChart.width, this.stopChart.yMax);
	this.stopChart.out.clearRect(0, 0, this.stopChart.width, this.stopChart.yMax);
	this.stopChart.clip.beginPath();
	this.stopChart.clip.strokeStyle='rgba(128, 128, 128, 0.1)';	
	this.stopChart.clip.fillStyle = 'rgba(128, 128, 128, 0.1)';
	this.stopChart.clip.lineWidth = 0;
	var wclip = this.inputs.wclip;
	this.stopChart.clip.fillRect(this.stopChart.x0 + ((wclip+9) * this.stopChart.dX), this.stopChart.yMax, (9-wclip) * this.stopChart.dX, this.stopChart.y0 - this.stopChart.yMax);
	var bclip = this.inputs.bclip;
	this.stopChart.clip.fillRect(this.stopChart.x0, this.stopChart.yMax, (9+bclip) * this.stopChart.dX, this.stopChart.y0 - this.stopChart.yMax);
	this.stopChart.clip.stroke();
	var stopZero = parseFloat(this.inputs.stopShift.value);
	if (Math.abs(stopZero) > 0.001) {
		stopZero = 9 - stopZero;
		this.stopChart.clip.beginPath();
		this.stopChart.clip.strokeStyle='rgba(240, 180, 180, 0.75)';	
		this.stopChart.clip.lineWidth = 5;
		this.stopChart.clip.moveTo(this.stopChart.x0 + (stopZero*this.stopChart.dX), this.stopChart.yMax);
		this.stopChart.clip.lineTo(this.stopChart.x0 + (stopZero*this.stopChart.dX), this.stopChart.y0);
		this.stopChart.clip.stroke();
	}
};
LUTInfoBox.prototype.updateLutChart = function() { // Gamma In Against Gamma Out
	var xMin = this.lutChart.x0 + (64*876/1023);
	var dX = this.lutChart.dX*1023/876;
	this.lutChart.out.clearRect(0, 0, this.lutChart.width, this.lutChart.height);
	this.lutChart.out.font = '28pt "Avant Garde", Avantgarde, "Century Gothic", CenturyGothic, "AppleGothic", sans-serif';
	this.lutChart.out.textBaseline = 'middle';
	this.lutChart.out.textAlign = 'left';
	this.lutChart.out.beginPath();
	this.lutChart.out.strokeStyle='rgba(128, 128, 128, 0.75)';	
	this.lutChart.out.fillStyle = 'rgba(0, 0, 0, 1)';
	this.lutChart.out.fillText(this.gammaInName + ' -> ' + this.gammaOutName, 220,90);
	this.lutChart.out.lineWidth = 4;
	this.lutChart.out.moveTo(this.lutChart.x0,this.lutChart.y0 - (this.lutOut[0] * this.lutChart.dY));
	var max = this.lutIn.length;
	for (var i=1; i<max; i++) {
//		this.lutChart.out.lineTo( xMin + (((this.lutIn[i]*1023)-64)/876)*this.lutChart.dX,this.lutChart.y0 - (this.lutOut[i] * this.lutChart.dY));
		this.lutChart.out.lineTo( this.lutChart.x0 + (this.lutIn[i]*dX),this.lutChart.y0 - (this.lutOut[i] * this.lutChart.dY));
	}
	this.lutChart.out.stroke();
	this.lutChart.out.clearRect(0, 0, this.lutChart.width, this.lutChart.yMax);
	var yMin = this.lutChart.h / 15;
	this.lutChart.out.clearRect(0, this.lutChart.h - yMin, this.lutChart.width, this.lutChart.h);
};
LUTInfoBox.prototype.updateRGBChart = function(d) {
	var rIn = new Float64Array(d.rIn);
	var gIn = new Float64Array(d.gIn);
	var bIn = new Float64Array(d.bIn);
	var rOut = new Float64Array(d.rOut);
	var gOut = new Float64Array(d.gOut);
	var bOut = new Float64Array(d.bOut);
	var m = rIn.length;
	var xMin = this.lutChart.x0 + (64*876/1023);
	this.lutChart.rgb.clearRect(0, 0, this.lutChart.width, this.lutChart.height);
// Red
	this.lutChart.rgb.beginPath();
	this.lutChart.rgb.strokeStyle='rgba(240, 0, 0, 0.75)';	
	this.lutChart.rgb.fillStyle = 'rgba(0, 0, 0, 1)';
	this.lutChart.rgb.lineWidth = 4;
	this.lutChart.rgb.moveTo(this.lutChart.x0 + ((rIn[0]*this.lutChart.dX)*1023/876),this.lutChart.y0 - (rOut[0] * this.lutChart.dY));
	for (var j=1; j<m; j++) {
		this.lutChart.rgb.lineTo( this.lutChart.x0 + ((rIn[j]*this.lutChart.dX)*1023/876),this.stopChart.y0 - (rOut[j] * this.lutChart.dY));
	}
	this.lutChart.rgb.stroke();
// Green
	this.lutChart.rgb.beginPath();
	this.lutChart.rgb.strokeStyle='rgba(0, 240, 0, 0.75)';	
	this.lutChart.rgb.fillStyle = 'rgba(0, 0, 0, 1)';
	this.lutChart.rgb.lineWidth = 4;
	this.lutChart.rgb.moveTo(this.lutChart.x0 + ((gIn[j]*this.lutChart.dX)*1023/876),this.lutChart.y0 - (gOut[0] * this.lutChart.dY));
	for (var j=1; j<m; j++) {
		this.lutChart.rgb.lineTo( this.lutChart.x0 + ((gIn[j]*this.lutChart.dX)*1023/876),this.stopChart.y0 - (gOut[j] * this.lutChart.dY));
	}
	this.lutChart.rgb.stroke();
// Blue
	this.lutChart.rgb.beginPath();
	this.lutChart.rgb.strokeStyle='rgba(0, 0, 240, 0.75)';	
	this.lutChart.rgb.fillStyle = 'rgba(0, 0, 0, 1)';
	this.lutChart.rgb.lineWidth = 4;
	this.lutChart.rgb.moveTo(this.lutChart.x0 + ((bIn[j]*this.lutChart.dX)*1023/876),this.lutChart.y0 - (bOut[0] * this.lutChart.dY));
	for (var j=1; j<m; j++) {
		this.lutChart.rgb.lineTo( this.lutChart.x0 + ((bIn[j]*this.lutChart.dX)*1023/876),this.stopChart.y0 - (bOut[j] * this.lutChart.dY));
	}
	this.lutChart.rgb.stroke();
// Tidy
	this.lutChart.rgb.clearRect(0, 0, this.lutChart.width, this.lutChart.yMax);
	var yMin = this.lutChart.h / 15;
	this.lutChart.rgb.clearRect(0, this.lutChart.h - yMin, this.lutChart.width, this.lutChart.h);
};
LUTInfoBox.prototype.updateGamma = function() {
	this.messages.gaTx(this.p,10,null);
	this.messages.gaTx(this.p,11,null);
};
LUTInfoBox.prototype.gotChartVals = function(d) {
	this.refX = new Float64Array(d.refX);
	this.refIn = new Float64Array(d.refIn);
	this.refOut = new Float64Array(d.refOut);
	this.stopX = new Float64Array(d.stopX);
	this.stopIn = new Float64Array(d.stopIn);
	this.stopPreVals = new Float64Array(d.stopPreVals);
	this.stopVals = new Float64Array(d.stopVals);
	this.stopOut = new Float64Array(d.stopOut);
	this.lutIn = new Float64Array(d.lutIn);
	this.lutOut = new Float64Array(d.lutOut);
	this.tableIREVals = new Float64Array(d.table);
	this.updateRefChart();
	this.updateStopChart();
	this.updateLutChart();
	this.updateTables();
	this.updatePrintTables();
};
