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
    });
    const [currentForm, setCurrentForm] = useState(0);
  
    const handleFormData = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value})
    }

    const NextForm = () => {
        setCurrentForm(currentForm + 1);
    };

    const PrevForm = () => {
        setCurrentForm(currentForm - 1);
    }
 
    // 最終的にPHPに送信する
    // const handleSubmit = () => {

    // }

    return ( 
        <div>
            {currentForm === 0 && <ResumeForm1 data={formData} handleFormData={handleFormData} onNext={NextForm} />}
            {currentForm === 1 && <ResumeForm2 data={formData} handleFormData={handleFormData} onNext={NextForm} onPrev={PrevForm} />}
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

function ResumeForm3({ data, handleFormData, onNext, onPrev }) {
    return (
        <div>
            <div className='form-group'>
                <label>学歴１ 年</label>
                <input type='text' name="lastname" placeholder=''
                value={data.lastname} onChange={handleFormData} />
            </div>
            <div>
                <label>学歴１ 月</label>
                <input type='text' placeholder=''></input>
            </div>
            <div>
                <label>学歴１ 学校名</label>
                <input type='text' placeholder=''></input>
            </div>
            <div>
                <label>学歴１ 学科名</label>
                <input type='text' placeholder=''></input>
            </div>
            <button>学歴を追加</button>
            <button>次へ</button>
        </div>
    );
}
function AddForm({  }) {

}