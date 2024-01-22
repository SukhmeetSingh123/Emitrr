const progressReportModel=require('../Models/progressReportModel')
const fetchReport = async (req, res) => {
    try {
        const report = await progressReportModel.find({ user: req.user.id });
        console.log(report)
        res.json(report);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
};
const addReport = async (req, res) => {
    try {
        const { choosenLanguages } = req.body;
        const existingReport = await progressReportModel.findOne({ user: req.user.id });
        if (existingReport) {
          console.log("Report already exists for this user")
            res.status(400).json({ error: 'Report already exists for this user' });
        } else {
            const newReport = new progressReportModel({
                user: req.user.id,
                choosenLanguages:choosenLanguages
            });

            const saveReport = await newReport.save();
            res.json(saveReport);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
};


const updateReport = async (req, res) => {
  const { correctAnswers, wrongAnswers, choosenLanguages } = req.body;
  console.log(req.body);
  try {
      const newReport = {};
      if (correctAnswers) { newReport.correctAnswers = correctAnswers; }
      if (wrongAnswers) { newReport.wrongAnswers = wrongAnswers; }
      
      let report = await progressReportModel.findById(req.params.id);
      if (!report) { return res.status(404).send("Not Found"); }
      if (report.user.toString() !== req.user.id) {
          return res.status(401).send("Not Allowed");
        }
      if (choosenLanguages && !report.choosenLanguages.includes(choosenLanguages[0])) {
          newReport.choosenLanguages = [...report.choosenLanguages, choosenLanguages[0]];
      }
      report = await progressReportModel.findByIdAndUpdate(req.params.id, { $set: newReport }, { new: true });
      res.json({ report });
  } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server Error");
  }
};
module.exports={
    fetchReport,
    addReport,
    updateReport
}