const express = require("express");
const { ControllerManager } = require("st-ethernet-ip");
const plcConfig = require("./tags"); 

const app = express();
const cm = new ControllerManager();
const plc = cm.addController(plcConfig.ip, plcConfig.slot, plcConfig.polling_interval);     

const allTags = [...plcConfig.tags.scale_in];
allTags.forEach(tagName => {
    plc.addTag(tagName);
});

    //event based logging 
plc.on("TagChanged", (tag, prevValue) => {
    console.log(`[${new Date().toLocaleTimeString()}] CHANGE DETECTED:`);
    console.log(`   Tag:   ${tag.name}`);
    console.log(`   Value: ${prevValue} -> ${tag.value}`);
});

plc.on("Connected", () => console.log(`Connected to PLC at ${plcConfig.ip}`));
plc.on("Disconnected", () => console.warn("Disconnected from PLC.. Reconnecting..."));
plc.on("Error", (err) => console.error("PLC Error:", err));

plc.connect();

function SCADA_Toggle(plc) {
    const tag = plc.tags.find(t => t.name === "Scada_Communication");

    if (tag) {
        tag.value = true;
        setInterval(() => {
            tag.value = !tag.value;
        }, 500);
        console.log("SCADA Comm bit toggling started");
    } else {
        console.warn("SCADA Comm bit not found");
    }
}

SCADA_Toggle(plc);

app.listen(3000, () => {
    console.log("Server started on port 3000");
});
