import React, { useState } from "react";

function ResumeForm1({ data, setFormData, onNext }) {
    return (
        <div>
            <div className='form-group'>
                <label>姓</label>
                <input type='text' placeholder=''
                onChange={(e) => setFormData({ ...FormData, name: e.target.value })}
                />
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

function ResumeForm2() {

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

            {/* <button onClick={onNext}>次へ</button>
            <button onClick={onBack}>戻る</button> */}
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

export function ResumeForm() {
    const [formData, setFormData] = useState({});
    const [currentForm, setCurrentForm] = useState(0);
  
    const NextForm = () => {
        setCurrentForm(currentForm + 1);
    };
 
    return ( 
        <div>
            {currentForm === 0 && <ResumeForm1 data={formData} setFormData={setFormData} onNext={NextForm} />}
            {currentForm === 1 && <ResumeForm2 data={formData} setFormData={setFormData} onNext={NextForm} />}
        </div>
    );
}