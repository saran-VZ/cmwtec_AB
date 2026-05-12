const express = require("express");
const { ControllerManager } = require("st-ethernet-ip");
const plcConfig = require("./tags"); 

const app = express();
const cm = new ControllerManager();
const plc = cm.addController(plcConfig.ip, plcConfig.slot, plcConfig.polling_interval);     

const allTags = [...plcConfig.tags.scale_in, ...plcConfig.tags.scale_out];
allTags.forEach(tagName => {
    plc.addTag(tagName);
});

//event based logging 
plc.on("TagChanged", (tag, prevValue) => {
    console.log(`[${new Date().toLocaleTimeString()}] CHANGE DETECTED:`);
    console.log(`   Tag:   ${tag.name}`);
    console.log(`   Value: ${prevValue} -> ${tag.value}`);

    if (tag.name === "Scale_In_Data_Transfer_Bit" && tag.value === true) {
        console.log(">>> Processing Scale In Record...");
    }
});

plc.on("Connected", () => console.log(`Connected to PLC at ${plcConfig.ip}`));
plc.on("Disconnected", () => console.warn("Disconnected from PLC. Retrying..."));
plc.on("Error", (err) => console.error("PLC Error:", err));

plc.connect();

app.listen(3000, () => {
    console.log("Server started on port 3000");
});
