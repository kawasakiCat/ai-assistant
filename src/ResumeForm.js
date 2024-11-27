import React, { useState } from "react";

export function ResumeForm() {
    const [formData, setFormData] = useState({
        lastname: '',
        firstname: '',
        lastname_kana: '',
        firstname_kana: '',
        birthdate: '',
        gender: '',
        email: '',
        telno: '',
        postalcode: '',
        address_1: '',
        address_2: '',
        address_kana: '',
        education: {
            education_1: {
                year: '',
                month: '',
                schoolName: '',
                department: '',
                status: '',
            },
        },
        workExperience: {
            workExperience_1: {
                year: '',
                month: '',
                companyName: '',
                status: '',
                jobDescription: '',
            },
        },
        certification: {
            certification_1: {
                year: '',
                month: '',
                certification: '',
                status: '',
            },
        },
    });
    const [currentForm, setCurrentForm] = useState(0);
  
    //履歴書情報変更ハンドラー
    const handleFormData = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value})
    }

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
        const nextKey = `education_${Object.keys(formData.education).length + 1}`;
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
        const nextKey = `workExperience_${Object.keys(formData.workExperience).length + 1}`;
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
        const nextKey = `certification_${Object.keys(formData.certification).length + 1}`;
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
        <div>
            {currentForm === 0 && <ResumeForm1 data={formData} handleFormData={handleFormData} onNext={NextForm} />}
            {currentForm === 1 && <ResumeForm2 data={formData} handleFormData={handleFormData} onNext={NextForm} onPrev={PrevForm} />}
            {currentForm === 2 && <ResumeForm3 data={formData} handleFormGroup={handleFormGroup} addFunction={addEducation} onNext={NextForm} onPrev={PrevForm} />}
            {currentForm === 3 && <ResumeForm4 data={formData} handleFormGroup={handleFormGroup} addFunction={addWorkExperience} onNext={NextForm} onPrev={PrevForm} />}
            {currentForm === 4 && <ResumeForm5 data={formData} handleFormGroup={handleFormGroup} addFunction={addCertification} onNext={NextForm} onPrev={PrevForm} submit={handleSubmit} />}
        </div>
    );
}

function ResumeForm1({ data, handleFormData, onNext }) {
    return (
        <div>
            <div className='form-group'>
                <label>姓</label>
                <input type='text' name="lastname" placeholder=''
                value={data.lastname} onChange={handleFormData} />
            </div>
            <div>
                <label>名</label>
                <input type='text' placeholder=''></input>
            </div>
            <div>
                <label>姓（かな）</label>
                <input type='text' placeholder=''></input>
            </div>
            <div>
                <label>名（かな）</label>
                <input type='text' placeholder=''></input>
            </div>
            <div>
                <label>生年月日</label>
                <input type='text' placeholder=''></input>
            </div>
            <div>
                <label>性別（任意）</label>
                <input type='text' placeholder=''></input>
            </div>
            <button onClick={onNext}>次へ</button>
        </div>
    );
}

function ResumeForm2({ data, handleFormData, onNext, onPrev}) {

    const [isChecked, setChecked ] = useState( false );

    const handleCheckChange = ( e ) => {
      setChecked(e.target.checked);
    };
  
    return (
        <div>
            <div className='form-group'>
                <label>メールアドレス</label>
                <input type='text' placeholder=''></input>
            </div>
            <div>
                <label>電話番号</label>
                <input type='text' placeholder=''></input>
            </div>
            <div>
                <label>郵便番号</label>
                <input type='text' placeholder=''></input>
            </div>
            <div>
                <label>住所</label>
                <input type='text' placeholder=''></input>
            </div>
            <div>
                <label>住所（番地・建物名）</label>
                <input type='text' placeholder=''></input>
            </div>
            <div>
                <label>住所（かな）</label>
                <input type='text' placeholder=''></input>
            </div>

            <div>
              <input type='checkbox' checked={isChecked} onChange={handleCheckChange}></input>
              <label>現住所以外に連絡を希望する場合</label>

              {isChecked && <IsCheckContents />}
            </div>

            <button onClick={onNext}>次へ</button>
            <button onClick={onPrev}>戻る</button>
        </div>
    );
}

function IsCheckContents() {
    return (
      <div className='isCheckContents'>
        <div>
          <label>本人以外の連絡先</label>
        </div>
  
        <div className='form-group'>
            <label>メールアドレス</label>
            <input type='text' placeholder=''></input>
        </div>
        <div>
            <label>電話番号</label>
            <input type='text' placeholder=''></input>
        </div>
        <div>
            <label>郵便番号</label>
            <input type='text' placeholder=''></input>
        </div>
        <div>
            <label>住所</label>
            <input type='text' placeholder=''></input>
        </div>
        <div>
            <label>住所（番地・建物名）</label>
            <input type='text' placeholder=''></input>
        </div>
        <div>
            <label>住所（かな）</label>
            <input type='text' placeholder=''></input>
        </div>
      </div>
    );
}

function ResumeForm3({ data, handleFormGroup, addFunction, onNext, onPrev }) {
    return (
        <div>
            {Object.keys(data.education).map( (key, index) => (
                <div key={key}>
                    <div className='form-group'>
                        <label>学歴{index + 1} 年</label>
                        <input type='text' name="year" placeholder=''
                        value={data.education[key].year} onChange={(e) => handleFormGroup('education', key, 'year', e.target.value)} />
                    </div>
                    <div>
                        <label>学歴{index + 1} 月</label>
                        <input type='text' placeholder=''></input>
                    </div>
                    <div>
                        <label>学歴{index + 1} 学校名</label>
                        <input type='text' placeholder=''></input>
                    </div>
                    <div>
                        <label>学歴{index + 1} 学科名</label>
                        <input type='text' placeholder=''></input>
                    </div>
                    <div>
                        <label>学歴{index + 1} ステータス</label>
                        <input type='text' placeholder=''></input>
                    </div>
                </div>
            ))}
            <button onClick={addFunction}>学歴を追加</button>
            <button onClick={onNext}>次へ</button>
            <button onClick={onPrev}>戻る</button>
        </div>
    );
};

function ResumeForm4({ data, handleFormGroup, addFunction, onNext, onPrev }) {
    return (
        <div>
            {Object.keys(data.workExperience).map( (key, index) => (
                <div key={key}>
                    <div className='form-group'>
                        <label>職歴{index + 1} 年</label>
                        <input type='text' name="year" placeholder=''
                        value={data.workExperience[key].year} onChange={(e) => handleFormGroup('workExperience', key, 'year', e.target.value)} />
                    </div>
                    <div>
                        <label>職歴{index + 1} 月</label>
                        <input type='text' placeholder=''></input>
                    </div>
                    <div>
                        <label>職歴{index + 1} 会社名</label>
                        <input type='text' placeholder=''></input>
                    </div>
                    <div>
                        <label>職歴{index + 1} ステータス</label>
                        <input type='text' placeholder=''></input>
                    </div>
                    <div>
                        <label>職歴{index + 1} 職務内容</label>
                        <input type='text' placeholder=''></input>
                    </div>
                </div>
            ))}
            <button onClick={addFunction}>職歴を追加</button>
            <button onClick={onNext}>次へ</button>
            <button onClick={onPrev}>戻る</button>

        </div>
    );
};

function ResumeForm5({ data, handleFormGroup, addFunction, onNext, onPrev, submit }) {
    return (
        <div>
            {Object.keys(data.certification).map( (key, index) => (
                <div key={key}>
                    <div className='form-group'>
                        <label>免許・資格{index + 1} 年</label>
                        <input type='text' name="year" placeholder=''
                        value={data.certification[key].year} onChange={(e) => handleFormGroup('certification', key, 'year', e.target.value)} />
                    </div>
                    <div>
                        <label>免許・資格{index + 1} 月</label>
                        <input type='text' placeholder=''></input>
                    </div>
                    <div>
                        <label>免許・資格{index + 1} 免許・資格名称</label>
                        <input type='text' placeholder=''></input>
                    </div>
                    <div>
                        <label>免許・資格{index + 1} ステータス</label>
                        <input type='text' placeholder=''></input>
                    </div>
                </div>
            ))}
            <button onClick={addFunction}>免許・資格を追加</button>
            <button onClick={onNext}>次へ</button>
            <button onClick={onPrev}>戻る</button>
            <button onClick={submit}>送信</button>

        </div>
    );
};

// function ResumeForm6({ data, handleFormData, onNext, onPrev, submit }) {
//     return (
//         <div>
//             <div className='form-group'>
//                 <label>志望動機</label>
//                 <input type='text' name="lastname" placeholder=''
//                 value={data.} onChange={handleFormData} />
//             </div>
//             <div>
//                 <label>自己PR</label>
//                 <input type='text' placeholder=''></input>
//             </div>
//             <div>
//                 <label>姓（かな）</label>
//                 <input type='text' placeholder=''></input>
//             </div>

//             <button onClick={onNext}>次へ</button>
//             <button onClick={onPrev}>戻る</button>
//             <button onClick={submit}>送信</button>

//         </div>
//     );
// };
