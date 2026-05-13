module.exports = {
    ip: "127.0.0.1",
    slot: 0,
    polling_interval: 500,
    tags: {
      scale_in: [
        "Scale_In_Barcode", "Model_Name", "Scale_In_Empty_Weight", "Scale_In_Result",
        "Scale_In_Min_Limit", "Scale_In_Max_Limit", "Scale_In_Pass_Count", 
        "Scale_In_Fail_Count", "Scale_In_Total_Count", "Station_1_ON", 
        "Station_2_ON", "Station_3_ON", "Station_4_ON", "Machine_In_Auto_Mode", 
        "Scada_Communication", "Scale_In_Data_Transfer_Bit", "Identifier", "Scada_Communication_Error"
      ]
      // scale_out: [
      //   "Scale_Out_Barcode", "Model_Name", "Acid_Temperature", "Station_No", 
      //   "Scale_Out_Empty_Weight", "Scale_Out_Acid_Weight", "Scale_Out_Total_Weight", 
      //   "Scale_Out_Result", "Scale_Out_Min_Limit", "Scale_Out_Max_Limit", 
      //   "Scale_Out_Pass_Count", "Scale_Out_Fail_Count", "Scale_Out_Total_Count", 
      //   "Station_1_ON", "Station_2_ON", "Station_3_ON", "Station_4_ON", 
      //   "Machine_In_Auto_Mode", "Scada_Communication", "Scale_Out_Data_Transfer_Bit", 
      //   "Identifier", "Scada_Communication_Error"
      // ]
    }
  }