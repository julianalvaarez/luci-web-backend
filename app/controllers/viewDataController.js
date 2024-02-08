import { viewDataModel } from "../models/viewDataModel.js";


export const viewDataController = async (req, res) => {
    try {
        const { busyShifts, error } = await viewDataModel();
    
        if (error) {
          return res.status(500).json({ error });
        }
    
        return res.status(200).json({ busyShifts });
      } catch (error) {
        console.error('Error general', error);
        return res.status(500).json({ error: 'Error general' });
      }
}