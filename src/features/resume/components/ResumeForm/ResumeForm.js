import React, { useState } from "react";
import Input from '../../../../components/common/Input/Input';
import TextArea from "../../../../components/common/TextArea/TextArea";
import Button from "../../../../components/common/Button/Button";
import ModalExample from "../../../../ModalExample";
import '../../../../styles/ResumeForm.css'
import { Link } from "react-router-dom";

export default function ResumeForm() {
    const [formData, setFormData] = useState({
        lastName: '',
        firstName: '',
        lastNameKana: '',
        firstNameKana: '',
        birthDate: '',
        gender: '',
        email: '',
        telNo: '',
        postalCode: '',
        address1: '',
        address2: '',
        addressKana: '',
        spareEmail: '',
        spareTelNo: '',
        sparePostalCode: '',
        spareAddress1: '',
        spareAddress2: '',
        spareAddressKana: '',
        education: {
            education1: {
                year: '',
                month: '',
                schoolName: '',
                department: '',
                status: '',
            },
        },
        workExperience: {
            workExperience1: {
                year: '',
                month: '',
                companyName: '',
                status: '',
                jobDescription: '',
            },
        },
        certification: {
            certification1: {
                year: '',
                month: '',
                certification: '',
                status: '',
            },
        },
        motivation: '',
        selfPromotion: '',
        freeSpace: '',
        submissionDate: '',

    });
    const [textCount, setTextCount] = useState({
        motivation: 0,
        selfPromotion: 0,
        freeSpace: 0,
    });
    const [currentForm, setCurrentForm] = useState(0);
  
    //履歴書情報変更ハンドラー
    const handleFormData = (e) => {
        if( e.target.name === 'motivation' || e.target.name === 'selfPromotion' ){
            if( e.target.value.length <= 400 ){
                setFormData({ ...formData, [e.target.name]: e.target.value});
                setTextCount({ ...textCount, [e.target.name]: e.target.value.length});
            }
        }else if( e.target.name === 'freeSpace' ){
            if( e.target.value.length <= 150 ){
                setFormData({ ...formData, [e.target.name]: e.target.value});
                setTextCount({ ...textCount, [e.target.name]: e.target.value.length});
            }
        }else{
            setFormData({ ...formData, [e.target.name]: e.target.value});
        };
    };

    //学歴情報変更ハンドラー
    const handleFormGroup = (fieldGroup, key, field, value) => {
        setFormData({ ...formData, [fieldGroup]: 
            { ...formData[fieldGroup],
                [key]: {
                    ...formData[fieldGroup][key],
                    [field]: value,
                },
            },
        });
    };

    //学歴情報追加ハンドラー
    const addEducation = () => {
        const nextKey = `education${Object.keys(formData.education).length + 1}`;
        setFormData({ ...formData, education: 
            { ...formData.education,
                [nextKey]: {
                year: '',
                month: '',
                schoolName: '',
                department: '',
                status: '',
                },
            },
        });
    };

    //職歴情報追加ハンドラー
    const addWorkExperience = () => {
        const nextKey = `workExperience${Object.keys(formData.workExperience).length + 1}`;
        setFormData({ ...formData, workExperience: 
            { ...formData.workExperience,
                [nextKey]: {
                year: '',
                month: '',
                companyName: '',
                status: '',
                jobDescription: '',
                },
            },
        });
    };

    //資格情報追加ハンドラー
    const addCertification = () => {
        const nextKey = `certification${Object.keys(formData.certification).length + 1}`;
        setFormData({ ...formData, certification: 
            { ...formData.certification,
                [nextKey]: {
                year: '',
                month: '',
                certification: '',
                status: '',
                },
            },
        });
    };
        
    const NextForm = () => {
        setCurrentForm(currentForm + 1);
    };

    const PrevForm = () => {
        setCurrentForm(currentForm - 1);
    };
 
    const handleSubmit = async () => {
        try {
            console.log(formData);
            const response = await fetch('https://ai-assistant.core-akita.ac.jp/api/api-test-resume.php', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
            });

            const result = await response.json();
            
            console.log(result);

            if (response.ok) {
                console.log('フォームが送信されました！');
            } else {
                console.log('送信に失敗しました。');
            }
        } catch (error) {
          console.error('送信エラー:', error);
        }
      };
      
    return ( 

        <div className="resume-form">
            <ModalExample />
            {currentForm === 0 && <ResumeForm1 data={formData} handleFormData={handleFormData} onNext={NextForm} />}
            {currentForm === 1 && <ResumeForm2 data={formData} handleFormData={handleFormData} onNext={NextForm} onPrev={PrevForm} />}
            {currentForm === 2 && <ResumeForm3 data={formData} handleFormGroup={handleFormGroup} addFunction={addEducation} onNext={NextForm} onPrev={PrevForm} />}
            {currentForm === 3 && <ResumeForm4 data={formData} handleFormGroup={handleFormGroup} addFunction={addWorkExperience} onNext={NextForm} onPrev={PrevForm} />}
            {currentForm === 4 && <ResumeForm5 data={formData} handleFormGroup={handleFormGroup} addFunction={addCertification} onNext={NextForm} onPrev={PrevForm} />}
            {currentForm === 5 && <ResumeForm6 data={formData} textCount={textCount} handleFormData={handleFormData} onNext={NextForm} onPrev={PrevForm} />}
            {currentForm === 6 && <ResumeForm7 data={formData} textCount={textCount} handleFormData={handleFormData} onNext={NextForm} onPrev={PrevForm} submit={handleSubmit} />}
            {currentForm === 7 && <PreviewWindow data={formData} onPrev={PrevForm} />}
        </div>
    );
}

function ResumeForm1({ data, handleFormData, onNext }) {
    return (
        <div>
            <div className='form-group'>
                <Input type='text' label="姓" name="lastName" value={data.lastName} onChange={handleFormData} required helperText="例: 秋田" />
            </div>
            <div>
                <Input type='text' label="名" name="firstName" value={data.firstName} onChange={handleFormData} required helperText="例: 心愛" />
            </div>
            <div>
                <Input type='text' label="姓（かな）" name="lastNameKana" value={data.lastNameKana} onChange={handleFormData} required helperText="例: あきた" />
            </div>
            <div>
                <Input type='text' label="名（かな）" name="firstNameKana" value={data.firstNameKana} onChange={handleFormData} required helperText="例: こあ" />
            </div>
            <div>
                <Input type='text' label="生年月日" name="birthDate" value={data.birthDate} onChange={handleFormData} required helperText="例: " />
            </div>
            <div>
                <Input type='text' label="性別（任意）" name="gender" value={data.gender} onChange={handleFormData} required helperText="例: 女" />
            </div>
            <Button onClick={onNext}>次へ</Button>
        </div>
    );
}

function ResumeForm2({ data, handleFormData, onNext, onPrev}) {

    const [isChecked, setChecked ] = useState( false );

    const handleCheckChange = ( e ) => {
      setChecked(e.target.checked);
    };

    const IsCheckContents = () => {
        return (
            <div className='isCheckContents'>
                <div>
                    <label className="address-text">本人以外の連絡先</label>
                </div>
                <div className='form-group'>
                    <Input type='text' label="メールアドレス" name="spareEmail" value={data.spareEmail} onChange={handleFormData} required helperText="例: koa2@sample.com" />
                </div>
                <div>
                    <Input type='text' label="電話番号" name="spareTelNo" value={data.spareTelNo} onChange={handleFormData} required helperText="例: 08011112222" />
                </div>
                <div>
                    <Input type='text' label="郵便番号" name="sparePostalCode" value={data.sparePostalCode} onChange={handleFormData} required helperText="例: 0100001" />
                </div>
                <div>
                    <Input type='text' label="住所" name="spareAddress1" value={data.spareAddress1} onChange={handleFormData} required helperText="例: " />
                </div>
                <div>
                    <Input type='text' label="住所（番地・建物名）" name="spareAddress2" value={data.spareAddress2} onChange={handleFormData} required helperText="例: " />
                </div>
                <div>
                    <Input type='text' label="住所（かな）" name="spareAddressKana" value={data.spareAddressKana} onChange={handleFormData} required helperText="例: " />
                </div>
            </div>
        );
    }
  
    return (
        <div>
            <div className='form-group'>
                <Input type='text' label="メールアドレス" name="email" value={data.email} onChange={handleFormData} required helperText="例: koa1@sample.com" />
            </div>
            <div>
                <Input type='text' label="電話番号" name="telNo" value={data.telNo} onChange={handleFormData} required helperText="例: 08000001111" />
            </div>
            <div>
                <Input type='text' label="郵便番号" name="postalCode" value={data.postalCode} onChange={handleFormData} required helperText="例: 0100001" />
            </div>
            <div>
                <Input type='text' label="住所" name="address1" value={data.address1} onChange={handleFormData} required helperText="例: " />
            </div>
            <div>
                <Input type='text' label="住所（番地・建物名）" name="address2" value={data.address2} onChange={handleFormData} required helperText="例: " />
            </div>
            <div>
                <Input type='text' label="住所（かな）" name="addressKana" value={data.addressKana} onChange={handleFormData} required helperText="例: " />
            </div>

            <div>
              <input type='checkbox' checked={isChecked} onChange={handleCheckChange} />
              <label className="address-text">現住所以外に連絡を希望する場合</label>

              {isChecked && <IsCheckContents />}
            </div>

            <Button onClick={onNext}>次へ</Button>
            <Button onClick={onPrev}>戻る</Button>
        </div>
    );
}

function ResumeForm3({ data, handleFormGroup, addFunction, onNext, onPrev }) {
    return (
        <div>
            {Object.keys(data.education).map( (key, index) => (
                <div key={key}>
                    <div className='form-group'>
                        <Input type='text' label={`学歴 ${index + 1}  年`} name="year" value={data.education[key].year} onChange={(e) => handleFormGroup('education', key, 'year', e.target.value)} required helperText="例: 2024" />
                    </div>
                    <div>
                        <Input type='text' label={`学歴${index + 1}  月`} name="month" value={data.education[key].month} onChange={(e) => handleFormGroup('education', key, 'month', e.target.value)} required helperText="例: 4" />
                    </div>
                    <div>
                        <Input type='text' label={`学歴${index + 1}  学校名`} name="schoolName" value={data.education[key].schoolName} onChange={(e) => handleFormGroup('education', key, 'schoolName', e.target.value)} required helperText="例: 学校法人コア学園　秋田コアビジネスカレッジ" />
                    </div>
                    <div>
                        <Input type='text' label={`学歴${index + 1}  学科名`} name="department" value={data.education[key].department} onChange={(e) => handleFormGroup('education', key, 'department', e.target.value)} required helperText="例: 情報システム科　IT・アプリコース" />
                    </div>
                    <div>
                        <Input type='text' label={`学歴${index + 1}  ステータス`} name="status" value={data.education[key].status} onChange={(e) => handleFormGroup('education', key, 'status', e.target.value)} required helperText="例: 入学" />
                    </div>
                </div>
            ))}
            <Button onClick={addFunction}>学歴を追加</Button>
            <Button onClick={onNext}>次へ</Button>
            <Button onClick={onPrev}>戻る</Button>
        </div>
    );
};

function ResumeForm4({ data, handleFormGroup, addFunction, onNext, onPrev }) {
    return (
        <div>
            {Object.keys(data.workExperience).map( (key, index) => (
                <div key={key}>
                    <div className='form-group'>
                        <Input type='text' label={`職歴${index + 1}  年`} name="year" value={data.workExperience[key].year} onChange={(e) => handleFormGroup('workExperience', key, 'year', e.target.value)} required helperText="例: 2024" />
                    </div>
                    <div>
                        <Input type='text' label={`職歴${index + 1}  月`} name="month" value={data.workExperience[key].month} onChange={(e) => handleFormGroup('workExperience', key, 'month', e.target.value)} required helperText="例: 4" />
                    </div>
                    <div>
                        <Input type='text' label={`職歴${index + 1}  会社名`} name="companyName" value={data.workExperience[key].companyName} onChange={(e) => handleFormGroup('workExperience', key, 'companyName', e.target.value)} required helperText="例: 株式会社情報カンパニー" />
                    </div>
                    <div>
                        <Input type='text' label={`職歴${index + 1}  ステータス`} name="status" value={data.workExperience[key].status} onChange={(e) => handleFormGroup('workExperience', key, 'status', e.target.value)} required helperText="例: 入社" />
                    </div>
                    <div>
                        <Input type='text' label={`職歴${index + 1}  職務内容`} name="jobDescription" value={data.workExperience[key].jobDescription} onChange={(e) => handleFormGroup('workExperience', key, 'jobDescription', e.target.value)} required helperText="例: " />
                    </div>
                </div>
            ))}
            <Button onClick={addFunction}>職歴を追加</Button>
            <Button onClick={onNext}>次へ</Button>
            <Button onClick={onPrev}>戻る</Button>

        </div>
    );
};

function ResumeForm5({ data, handleFormGroup, addFunction, onNext, onPrev }) {
    return (
        <div>
            {Object.keys(data.certification).map( (key, index) => (
                <div key={key}>
                    <div className='form-group'>
                        <Input type='text' label={`免許・資格${index + 1}  年`} name="year" value={data.certification[key].year} onChange={(e) => handleFormGroup('certification', key, 'year', e.target.value)} required helperText="例: 2024" />
                    </div>
                    <div>
                        <Input type='text' label={`免許・資格${index + 1}  月`} name="month" value={data.certification[key].month} onChange={(e) => handleFormGroup('certification', key, 'month', e.target.value)} required helperText="例: 4" />
                    </div>
                    <div>
                        <Input type='text' label={`免許・資格${index + 1}  免許・資格名称`} name="certification" value={data.certification[key].certification} onChange={(e) => handleFormGroup('certification', key, 'certification', e.target.value)} required helperText="例: 経済産業省情報処理技術者試験　基本情報技術者" />
                    </div>
                    <div>
                        <Input type='text' label={`免許・資格${index + 1}  ステータス`} name="status" value={data.certification[key].status} onChange={(e) => handleFormGroup('certification', key, 'status', e.target.value)} required helperText="例: 合格" />
                    </div>
                </div>
            ))}
            <Button onClick={addFunction}>免許・資格を追加</Button>
            <Button onClick={onNext}>次へ</Button>
            <Button onClick={onPrev}>戻る</Button>
        </div>
    );
};

function ResumeForm6({ data, textCount, handleFormData, onNext, onPrev }) {
    
    // const remainingMotivation = 400 - textCount.motivation;
    // const remainingSelfPromotion = 400 - textCount.selfPromotion;

    return (
        <div>
            <div className='form-group'>
                <TextArea type='text' label="志望動機" name="motivation" value={data.motivation} onChange={handleFormData} required />
                <div>{textCount.motivation} / 400</div>
                {/* <p><div style={{ color: remainingMotivation < 10 ? 'yellow' : 'black' }}>{textCount.selfPromotion}</div> / 400</p> */}
            </div>
            <div>
                <TextArea type='text' label="自己ＰＲ" name="selfPromotion" value={data.selfPromotion} onChange={handleFormData} required />
                <div>{textCount.selfPromotion} / 400</div>
                {/* <p><div style={{ color: remainingSelfPromotion < 10 ? 'yellow' : 'black' }}>{textCount.selfPromotion}</div> / 400</p> */}
            </div>

            <Button onClick={onNext}>次へ</Button>
            <Button onClick={onPrev}>戻る</Button>
        </div>
    );
};

function ResumeForm7({ data, textCount, handleFormData, onNext, onPrev, submit }) {
    return (
        <div>
            <div className='form-group'>
                <TextArea type='text' label="本人希望欄" name="freeSpace" value={data.freeSpace} onChange={handleFormData} required helperText="例: 貴社の規定に従います。" />
                <div>{textCount.freeSpace} / 150</div>
            </div>
            <div>
                <Input type='text' label="履歴書提出日付" name="submissionDate" value={data.submissionDate} onChange={handleFormData} required helperText="例: " />
            </div>

            <Button onClick={onNext}>プレビュー画面へ</Button>
            <Button onClick={submit}>送信</Button>
            <Button onClick={onPrev}>戻る</Button>
        </div>
    );
};

function PreviewWindow({ data, onPrev}) {

    return (
        <div>
            <Button variant="secondary">ダウンロード</Button>
            <Button onClick={onPrev}>フォーム入力へ戻る</Button>
            <Link to="/">
                <Button>モード選択へ</Button>
            </Link>
        </div>
    );
}