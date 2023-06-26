initBattery();

/**
 * Initializes the battery monitoring functionality.
 * Updates the battery status and liquid level in the UI.
 */
function initBattery() {
    // Get the DOM elements
    const liquid = document.querySelector('.liquid');
    const status = document.querySelector('.status');
    const percentage = document.querySelector('.percentage');
    
    // Get the battery object
    navigator.getBattery().then((battery) => {
        // Function to update the battery status and liquid level
        updateBattery = () => {
            // Calculate the battery level as a percentage
            let level = Math.floor(battery.level * 100);
            percentage.innerHTML = level + '%';
            liquid.style.height = `${parseInt(battery.level * 100)}%`;
            
            // Update the status based on the battery level and charging state
            if (level == 100){
                status.innerHTML = `Charged <i class="ri-battery-2-fill green-color"></i>`;
                liquid.style.height = '100%';
            } else if (level <=20 & !battery.charging){
                status.innerHTML = `Low Battery <i class="ri-plug-line animated-red animated-red"></i>`;
            } else if (battery.charging){
                status.innerHTML = `Charging... <i class="ri-flashlight-line animated-green"></i>`;
            } else {
                status.innerHTML = "";
            }

            // Update the liquid color gradient based on the battery level
            if (level <= 20) {
                liquid.classList.add("gradient-color-red");
                liquid.classList.remove("gradient-color-green", "gradient-color-orange", "gradient-color-yellow");
            } else if (level <= 48) {
                liquid.classList.add("gradient-color-orange");
                liquid.classList.remove("gradient-color-green", "gradient-color-red", "gradient-color-yellow");
            } else if (level <= 80) {
                liquid.classList.add("gradient-color-yellow");
                liquid.classList.remove("gradient-color-green", "gradient-color-orange", "gradient-color-red");
            } else {
                liquid.classList.add("gradient-color-green");
                liquid.classList.remove("gradient-color-red", "gradient-color-orange", "gradient-color-yellow");
            }
        }

        // Initial update of battery status
        updateBattery();

        // Event listeners for battery status changes
        battery.addEventListener("chargingchange", () => {updateBattery()});
        battery.addEventListener("levelchange", () => {updateBattery()});
    });
}