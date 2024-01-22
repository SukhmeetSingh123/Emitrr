const questionBankModel=require('../Models/questionBankModel');
const fetchQuestions=(async(req,res)=>{
    try{
        const questions=await questionBankModel.find({user:req.user});
        res.json(questions);
    }catch(error){
        console.log(error)
        res.status(500).send("Internal Server Error");
    }
})
const addQuestions=(async(req,res)=>{
    try {
        const { question,option1,option2,option3,option4,difficulty,languageType,correctAnswer } = req.body;
        const newQuestion = new questionBankModel({question,option1,option2,option3,option4,difficulty,languageType,correctAnswer})
        const saveQuestion = await newQuestion.save()
        res.json(saveQuestion)
     } catch (error) {
        console.log(error)
        res.status(500).send("Internal Server Error");
     }
})

const fetchQuestionsByLanguageType = async (req, res) => {
    try {
        const { languageType } = req.params;
        const questions = await questionBankModel.find({ user: req.user, languageType });
        
        if (questions.length === 0) {
            return res.status(404).json({ message: 'No questions found for the specified language type.' });
        }

        res.json(questions);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
};

module.exports={
    fetchQuestions,
    addQuestions,
    fetchQuestionsByLanguageType
}