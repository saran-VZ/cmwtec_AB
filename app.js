const express = require("express");
const { ControllerManager } = require("st-ethernet-ip");
const plcConfig = require("./tags"); 
const tags = require("./tags");

const app = express();
const cm = new ControllerManager();
const plc = cm.addController(plcConfig.ip, plcConfig.slot, plcConfig.polling_interval);     

const allTags = [...plcConfig.tags.scale_in];
allTags.forEach(tagName => {
    plc.addTag(tagName);
});

    //event based logging 
 plc.on("TagChanged", (tag, prevValue) => {
    if (tag.name !== "Scale_In_Data_Transfer_Bit") return;

    // Trigger only when bit becomes TRUE
    if (prevValue === false && tag.value === true) {
        console.log("Data transfer started...!!")
        plc.tags.forEach(t => {
            if (t.name !== "Scada_Communication" && t.name !== "Scale_In_Data_Transfer_Bit") {
                console.log(`${t.name}: ${t.value}`);
            }
        });
    }
});


plc.on("Connected", () => {
    SCADA_Toggle(plc);
    console.log(`Connected to PLC at ${plcConfig.ip}`)});

plc.on("Disconnected", () => console.warn("Disconnected from PLC.. Reconnecting..."));
plc.on("Error", (err) => console.error("PLC Error:", err));

plc.connect(false);

function SCADA_Toggle(plc) {
    const tag = plc.tags.find(t => t.name === "Scada_Communication");

    if (tag) {
        tag.value = true;
        setInterval(async () => {
            tag.value = !tag.value;
            await plc.writeTag(tag)
        }, 500);
        console.log("SCADA Comm bit toggling started");
    } else {
        console.warn("SCADA Comm bit not found");
    }
}


app.listen(3000, () => {
    console.log("Server started on port 3000");
});
