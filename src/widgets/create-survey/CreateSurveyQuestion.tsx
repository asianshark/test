import { Input, Select, Space, Switch } from "antd"
import { useEffect, useState } from "react";
import SurveyTableTab from "../../shared/surveys/SurveyTableTab";
import CreateSurveyQuestionRadioCheckbox from "../../shared/create-survey/CreateSurveyQuestionRadioCheckbox";
import { SettingOutlined, CopyOutlined, DeleteOutlined } from "@ant-design/icons";
import { Answer, Question } from "../../entities/Survey";
import CreateSurveyOpenQuestion from "../../shared/create-survey/CreateSurveyOpenQuestion";
import CreateSurveyScale from "../../shared/create-survey/CreateSurveyScale";
const CreateSurveyQuestion = ({ multilang, type, questionP, setQuestionP, deleteQuestionP, duplicateQuestion, selectedAns, valid }: { multilang?: boolean, valid?: { valid: boolean, questionId: number | undefined }, type: string, questionP: Question, setQuestionP?: (question: Question) => void, duplicateQuestion?: () => void, deleteQuestionP?: () => void, selectedAns?: (ans: number[]) => void }) => {

    const [lang, setLang] = useState("Рус")
    const [question, setQuestion] = useState<Question>(questionP)
    const [answers, setAnswers] = useState<Answer[]>([{ nameRu: "", nameKz: "", correct: true, key: 0 }]);
    const [questionType, setQuestionType] = useState(questionP.multipleAns ? 'multiplechoices' : 'singlechoice')
    const [isRequired, setIsRequired] = useState(questionP.required)
    const handleChange = (value: string) => {
        if (value === 'singlechoice')
            setQuestionType(value)
    };
    const options = [
        {
            labelRu: 'Текст',
            labelKz: 'Мәтін',
            value: 'text'
        },
        {
            labelRu: "Один из списка",
            labelKz: "Тізімнен біреу",
            value: 'singlechoice'
        },
        {
            labelRu: "Несколько из списка",
            labelKz: "Тізімнен бірнешеу",
            value: "multiplechoices"
        },
        {
            labelRu: 'Шкала',
            labelKz: "Шкала",
            value: "scale"
        }
    ]

    useEffect(() => {
        if (setQuestionP)
            setQuestionP({ multipleAns: questionType === 'multiplechoices', required: isRequired, nameRu: question?.nameRu, nameKz: question?.nameKz, active: true, answers: answers })
    }, [question, answers, isRequired, questionType])

    const deleteQuestion = () => {
        if (deleteQuestionP)
            deleteQuestionP()
    }
    return (
        <div className={"bg-white rounded-[10px] border-1 p-5 flex flex-col gap-4 w-3/4 " + (valid && !valid?.valid && valid?.questionId === questionP.id ? 'border-red-500 border-2' : 'border-[#E6EBF1]')}>
            <div className="flex gap-2">
                <div className="flex gap-2 w-full text-[16px] text-[#455560] items-center">
                    {type === 'create' ?
                        (lang === "Рус" ?
                            <Input style={{ fontFamily: 'Roboto' }} size={'large'} value={question?.nameRu} placeholder="Вопрос" onChange={e => setQuestion({ nameRu: e.target.value, nameKz: question?.nameKz, required: question?.required })} /> :
                            <Input style={{ fontFamily: 'Roboto' }} size={'large'} value={question?.nameKz} placeholder="Сұрақ" onChange={e => setQuestion({ nameRu: question?.nameRu, nameKz: e.target.value, required: question?.required })} />)
                        :
                        <div className="flex gap-1">{lang === "Рус" ? question?.nameRu : question?.nameKz} <p className={isRequired ? 'text-red-500' : 'hidden'}>*</p></div>}
                    <Select
                        style={{ width: '100%', display: type !== 'create' ? 'none' : 'block' }}
                        size={'large'}
                        value={questionType}
                        defaultValue={'multiplechoices'}
                        onChange={handleChange}
                        options={options}
                        optionRender={(option) => (
                            <Space>
                                <span role="img" aria-label={lang === "Рус" ? option.data.labelRu : option.data.labelKz}>
                                    {lang === "Рус" ? option.data.labelRu : option.data.labelKz}
                                </span>
                            </Space>
                        )}
                    />
                </div>
                <SurveyTableTab disabled={multilang === false} tabs={["Рус", "Қаз"]} onChange={setLang} activeTab={lang} />
            </div>
            {questionType === "text" ? <CreateSurveyOpenQuestion /> : (
                questionType === "scale" ? <CreateSurveyScale /> :
                    <CreateSurveyQuestionRadioCheckbox surveyType={type} setSelectedAns={selectedAns} answersP={question?.answers} lang={lang} type={questionType} getAnswer={setAnswers} />
            )}
            {
                type !== 'create' ? <></> :
                    <div className="flex justify-end">
                        <div className="flex gap-6 items-center justify-between">
                            <div>
                                <div className="text-2xl flex gap-6">
                                    <SettingOutlined />
                                    <CopyOutlined onClick={duplicateQuestion} />
                                    <DeleteOutlined onClick={deleteQuestion} />
                                </div>
                            </div>
                            <hr className="w-[24px] text-[#E6EBF1] rotate-90" />
                            <div className="flex items-center gap-4">
                                <div>
                                    {lang === "Рус" ? 'Обязательный вопрос' : 'Міндетті сұрақ'}
                                </div>
                                <Switch onChange={e => setIsRequired(e)} />
                            </div>
                        </div>
                    </div>
            }

        </div>)
}

export default CreateSurveyQuestion