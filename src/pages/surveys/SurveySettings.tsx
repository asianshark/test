import { Checkbox, Select } from "antd"
import axios from "axios";
import { useEffect, useState } from "react"
const style: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    color: '#1A3353'
};
const SurveySettings = ({surveySettings, setSurveySettings }: {surveySettings: string[], setSurveySettings: (settings: string[]) => void }) => {
    const options = [
        {
            value: 'type',
            label: 'Анонимный опрос'
        },
        {
            value: 'multilang',
            label: 'Вариант на казахском языке'
        },
        {
            value: 'feedback',
            label: 'Отчетность'
        },
        {
            value: 'randomQuestions',
            label: 'Перемешивать вопросы'
        }
        
    ]

    const [divisions, setDivisions] = useState<{ value: string, label: string }[]>([{ value: '', label: '' }])
    useEffect(() => {
        axios.get('/divisions').then((res) => {
            console.log(res.data.content);
            const opt = []
            res.data.content.map(item => {
                opt.push({ value: item.id, label: item.divisionName })
            })
            setDivisions(opt)
        })
    }, [])
    const [checkBoxAns, setCheckBoxAns] = useState<string[]>(surveySettings)
    useEffect(()=>{
        setSurveySettings(checkBoxAns)
    }, [checkBoxAns])
    return (
        <div className="flex flex-col items-center overflow-y-auto gap-6 pt-3">
            <div className="bg-white rounded-[10px] border-[#E6EBF1] border-1 p-5 flex flex-col gap-4 w-3/4">
                <div className="font-bold text-lg">Настройка опроса</div>
                <div className="text-md font-normal">
                    <Checkbox.Group
                        style={style}
                        onChange={e => setCheckBoxAns(e)}
                        value={checkBoxAns}
                        options={options} />
                </div>
            </div>
            <div className="bg-white rounded-[10px] border-[#E6EBF1] border-1 p-5 flex flex-col gap-4 w-3/4">
                <div className="font-bold text-lg">Юрисдикция</div>
                <div>Опрос проводится для:</div>
                <Select
                    defaultValue={divisions[0].value}
                    options={divisions}>
                </Select>
            </div>
        </div>
    )
}

export default SurveySettings