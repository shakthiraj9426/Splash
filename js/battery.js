
///Functions to get battery percentage
navigator.getBattery().then(function(battery) {
function updateAllBatteryInfo(){
updateChargeInfo();
updateLevelInfo();
updateChargingInfo();
updateDischargingInfo();
}
updateAllBatteryInfo();
battery.addEventListener('chargingchange', function(){
updateChargeInfo();
location.reload(true);
});
function updateChargeInfo(){
console.log("Battery charging? "
+ (battery.charging ? "Yes" : "No"));
}
isCharging = battery.charging;
console.log(isCharging);
if (isCharging)
{
$('#battery').css('color','#ADFF2F');
$('#time').css('color','#ADFF2F');
$('#battery').html('Charge:ON');



}
else
{
$('#battery').css('color','#FFFFFF');
$('#time').css('color','#FFFFFF');
$('#battery').html('Charge:OFF');

}
battery.addEventListener('levelchange', function(){
updateLevelInfo();

});
function updateLevelInfo(){
console.log("Battery level: "
+ battery.level * 100 + "%");
batteryPercentage = Math.floor(battery.level * 100);
console.log(batteryPercentage);




if (batteryPercentage == 100) 
{
$('#bt').html('Fully Charged');


}
else
{
$('#bt').html(batteryPercentage+'%');	
}


}
battery.addEventListener('chargingtimechange', function(){
updateChargingInfo();
});
function updateChargingInfo(){
console.log("Battery charging time: "
+ battery.chargingTime + " seconds");
}
battery.addEventListener('dischargingtimechange', function(){
updateDischargingInfo();
});
function updateDischargingInfo(){
console.log("Battery discharging time: "
+ battery.dischargingTime + " seconds");
}
});