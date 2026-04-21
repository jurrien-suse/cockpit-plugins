document.addEventListener("DOMContentLoaded", function() {
    
    // 1. Check ptp4l service status using systemctl
    cockpit.spawn(["systemctl", "status", "ptp4l", "--no-pager"])
        .done(function(data) {
            document.getElementById("service-status").textContent = data;
        })
        .fail(function(error) {
            document.getElementById("service-status").textContent = 
                "Error or Service Stopped: " + error.message;
        });

    // 2. Query live PTP data using PMC (PTP Management Client)
    // -u uses Unix domain sockets, -b 0 targets the local node
    cockpit.spawn(["pmc", "-i", "enp0s5", "-b", "0", "GET CURRENT_DATA_SET"])
        .done(function(data) {
            document.getElementById("pmc-data").textContent = data;
        })
        .fail(function(error) {
            document.getElementById("pmc-data").textContent = 
                "Failed to run pmc. Is ptp4l running? Error: " + error.message;
        });

    // 3. Read the PTP configuration file directly
    cockpit.file("/etc/ptp4l.conf").read()
        .done(function(content) {
            if (content) {
                document.getElementById("ptp-config").textContent = content;
            } else {
                document.getElementById("ptp-config").textContent = "Config file is empty.";
            }
        })
        .fail(function(error) {
            document.getElementById("ptp-config").textContent = 
                "Error reading /etc/ptp4l.conf: " + error.message;
        });
});
